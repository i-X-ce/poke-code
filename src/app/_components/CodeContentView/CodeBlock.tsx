"use client"
import useCopyClipboard from '@/lib/hooks/useCopyClipboard'
import { CodeBlockModel } from '@/lib/model/CodeDataModel'
import { Box, Grid, GridProps, Stack, SxProps, Theme, Typography } from '@mui/material'
import React from 'react'
import CopyButton from '../CopyButton'
import { GoogleSansCode } from '@/lib/util/fonts'

const num2Hex = (num: number, pad: number) => {
    return num.toString(16).toUpperCase().padStart(pad, "0");
}

const cellStyle: GridProps = {
    py: .5,
    pl: 1,
};

interface BorderExist {
    x: boolean,
    y: boolean
}

const CELL_TYPES = {
    NORMAL: "normal",
    HOVERED: "hovered",
    SELECTED: "selected",
} as const;
type CellType = typeof CELL_TYPES[keyof typeof CELL_TYPES];

// 共通のセルのスタイル
const commonCellSx = (border: BorderExist): SxProps<Theme> => {
    return {
        borderRight: theme => `${border.x ? 1 : 0}px ${theme.palette.divider} solid`,
        borderBottom: theme => `${border.y ? 1 : 0}px ${theme.palette.divider} solid`,
        color: theme => theme.palette.text.secondary,
    }
}

// セルのスタイル
const cellSx = (cellType: CellType, notBorder: BorderExist): SxProps<Theme> => {
    return {
        ...commonCellSx(notBorder),
        ...(() => {
            if (cellType === CELL_TYPES.NORMAL) {
                return {};
            } else if (cellType === CELL_TYPES.HOVERED) {
                return { backgroundColor: theme => theme.palette.action.hover };
            } else if (cellType === CELL_TYPES.SELECTED) {
                return { backgroundColor: theme => theme.palette.action.selected };
            }
        })()
    }
}

// 端のセルのスタイル
const markCellSx = (cellType: CellType, notBorder: BorderExist): SxProps<Theme> => {
    return {
        ...commonCellSx(notBorder),
        fontWeight: 'bold',
        ...(() => {
            if (cellType === CELL_TYPES.NORMAL) {
                return { backgroundColor: theme => theme.palette.action.hover };
            } else if (cellType === CELL_TYPES.HOVERED) {
                return {
                    color: theme => theme.palette.background.default,
                    backgroundColor: theme => theme.palette.primary.main,
                };
            } else if (cellType === CELL_TYPES.SELECTED) {
                return {};
            }
        })(),
    }
}

function CodeBlock({ block }: { block: CodeBlockModel }) {
    const { handleCopy, copied } = useCopyClipboard(block.code);

    const codeLength = Math.floor(block.code.length / 2);
    const startAddress = block.address ? parseInt(block.address, 16) : 0;
    const startRange = block.address ? parseInt(block.address, 16) & 0xFFF0 : 0;
    const endRange = (startAddress + codeLength - 1) | 0xF;
    const addressRange = endRange - startRange;

    return (
        <Stack position={"relative"} gap={1}>
            <Box
                borderRadius={1}
                py={.5}
                px={2}
                sx={{
                    // borderEndStartRadius: 0,
                    // borderEndEndRadius: 0,
                    backgroundColor: theme => theme.palette.text.disabled,
                    alignSelf: "start"
                }}
            >
                <Typography color='var(--background)' fontSize={"small"}>
                    {block.title}
                </Typography>
            </Box>
            <Box
                sx={{
                    border: theme => `1px ${theme.palette.divider} solid`,
                    borderRadius: 1,
                    // borderStartStartRadius: 0
                }}
            >
                <Grid container columns={18} fontFamily={GoogleSansCode.style.fontFamily}>
                    {/* 上端の数値 */}
                    {
                        Array.from({ length: 17 }).map((_, i) => (
                            <Grid
                                size={i === 0 ? 2 : 1}
                                key={i}
                                {...cellStyle}
                                sx={markCellSx(CELL_TYPES.NORMAL, { x: i !== 16, y: true })}
                            >
                                {i === 0 ? "" : num2Hex(i - 1, 2)}
                            </Grid>
                        ))
                    }
                    {/* アドレスとコード部 */}
                    {
                        Array.from({ length: Math.ceil(addressRange / 16) }).map((_, addressIndex) => (
                            <React.Fragment key={addressIndex}>
                                {/* アドレス部 */}
                                <Grid
                                    size={2}
                                    key={startRange + addressIndex * 16}
                                    {...cellStyle}
                                    sx={markCellSx(CELL_TYPES.NORMAL, { x: true, y: startRange + addressIndex * 16 <= endRange - 16 })}
                                >
                                    {num2Hex(startRange + addressIndex * 16, 4)}
                                </Grid>

                                {/* コード部 */}
                                {
                                    Array.from({ length: 16 }).map((_, byteIndex) => {
                                        const address = startRange + addressIndex * 16 + byteIndex;
                                        const sub = address - startAddress;
                                        return (
                                            <Grid size={1} key={address}
                                                {...cellStyle}
                                                sx={cellSx(CELL_TYPES.NORMAL, { x: byteIndex !== 15, y: startRange + addressIndex * 16 <= endRange - 16 })}
                                            >
                                                {
                                                    sub < 0 || sub >= codeLength
                                                        ? ""
                                                        : block.code.substring(sub * 2, (sub + 1) * 2)
                                                }
                                            </Grid>
                                        )
                                    })
                                }
                            </React.Fragment>
                        ))
                    }
                </Grid>
                {/* {block.code} */}
            </Box>

            {/* コピーボタン */}
            <Box position={"absolute"} top={0} right={0}>
                <CopyButton copied={copied} onClick={handleCopy} />
            </Box>
        </Stack>
    )
}

export default CodeBlock