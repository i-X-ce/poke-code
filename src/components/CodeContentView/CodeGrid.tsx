import { PosType } from '@/lib/model/PosType';
import { Box, SxProps, Theme } from '@mui/material';
import { Grid } from '@mui/material';
import React from 'react'

export const CELL_STATES = {
    NORMAL: "normal",
    HOVERED: "hovered",
    SELECTED: "selected",
} as const;
type CellStateType = typeof CELL_STATES[keyof typeof CELL_STATES];


const cellSx = (state: CellStateType, pos: PosType): SxProps<Theme> => {
    const isColumnEdge = pos.x === 0;
    const isRowEdge = pos.y === 0;

    return {
        display: 'flex',
        color: theme => theme.palette.text.secondary,
        border: theme => `1px ${theme.palette.divider} solid`,
        ...(() => {
            if (state === CELL_STATES.NORMAL) {
                if (isColumnEdge || isRowEdge) {
                    return {
                        backgroundColor: theme => theme.palette.action.hover,
                    }
                } else {
                    return {
                        backgroundColor: theme => theme.palette.background.paper,
                    }
                }
            } else if (state === CELL_STATES.HOVERED) {
                if (isColumnEdge || isRowEdge) {
                    return {
                        color: theme => theme.palette.background.default,
                        backgroundColor: theme => theme.palette.primary.main,
                    }
                } else {
                    return {
                        backgroundColor: theme => theme.palette.action.selected,
                    }
                }
            } else if (state === CELL_STATES.SELECTED) {
                if (isColumnEdge || isRowEdge) {
                    return {
                        color: theme => theme.palette.background.default,
                        backgroundColor: theme => theme.palette.primary.main,
                    };
                } else {
                    return {
                        backgroundColor: theme => theme.palette.action.focus,
                    }
                }
            }
        })()
    }
}

function CodeGrid({ pos, mousePos, children, onMouseEnter: onMouseEnter, onMouseLeave }: { pos: PosType, mousePos: PosType, children: React.ReactNode, onMouseEnter?: (pos: PosType) => void, onMouseLeave?: () => void }) {
    const isColumnEdge = pos.x === 0;

    const state = (() => {
        if (pos.x === mousePos.x && pos.y === mousePos.y) {
            return CELL_STATES.SELECTED;
        } else if (pos.x === mousePos.x || pos.y === mousePos.y) {
            return CELL_STATES.HOVERED;
        } else {
            return CELL_STATES.NORMAL;
        }
    })();

    return (
        <Grid
            size={isColumnEdge ? 2 : 1}
            sx={cellSx(state, pos)}
        >
            <Box
                flex={1}
                px={isColumnEdge ? 1 : 0}
                py={.5}
                display={isColumnEdge ? 'start' : 'flex'}
                alignItems={"stretch"}
                justifyContent={'center'}
                onMouseEnter={() => onMouseEnter?.(pos)}
                onMouseLeave={onMouseLeave}
            >
                {children}
            </Box>
        </Grid>
    )
}

export default CodeGrid