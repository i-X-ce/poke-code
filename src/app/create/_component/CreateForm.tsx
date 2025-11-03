"use client"
import CodeContentView from '@/app/_components/CodeContentView';
import VersionChip from '@/app/_components/VersionChip';
import { CodeBlockModel, CodeContentModel, CodeDataModel } from '@/lib/model/CodeDataModel';
import { PokeVersions, PokeVersionType } from '@/lib/model/PokeVersion';
import { Add, Delete, InsertEmoticon } from '@mui/icons-material';
import { Box, Button, Chip, IconButton, Popover, PopoverProps, Stack, TextField } from '@mui/material';
import EmojiPicker from 'emoji-picker-react';
import React from 'react'
import { Controller, useForm } from 'react-hook-form';

const CODE_DATA_LABELS: { [K in keyof CodeDataModel]: string } = {
    id: 'ID',
    icon: 'アイコン',
    title: 'タイトル',
    date: '作成日時',
    tags: 'タグ(カンマ区切り)',
    detail: '概要',
    description: '説明(Markdown)',
    content: 'コード内容'
} as const;
const CODE_BLOCK_LABELS: { [K in keyof CodeBlockModel]: string } = {
    title: 'タイトル',
    address: '開始アドレス',
    code: 'コード'
} as const;

const CODE_DATA_PLACEHOLDERS: { [K in keyof CodeDataModel]: string } = {
    id: '',
    icon: '',
    title: 'バイナリエディタ',
    date: '',
    tags: 'ツール、便利',
    detail: 'バイナリエディタを起動するコードです。メモリを自由に書き換えることが可能になります。',
    description: `## 使い方
1. なかよしバッヂを入手する
2. そだてやに「てEん」を預け、すぐに引き出す
3. なかよしバッヂを使用する
    `,
    content: ''
} as const;

const CODE_BLOCK_PLACEHOLDERS: { [K in keyof CodeBlockModel]: string } = {
    title: 'コードブロックのタイトル',
    address: 'DA00',
    code: '// ここにコードを記述します。\n00 01 02 03 04 05 06 07\n08 09 0A 0B 0C 0D 0E 0F'
}

const INIT_SELECTED_VERSION = PokeVersions.G1;
const INIT_CODE_BLOCK: CodeBlockModel = { title: '', address: 'DA00', code: '' } as const;
const INIT_CODE_CONTENT = (version: PokeVersionType): CodeContentModel => ({ version, blocks: INIT_SELECTED_VERSION === version ? [INIT_CODE_BLOCK] : [] }) as const;

const Date2String = (date: Date): string => date.toISOString().split('T')[0];

function CreateForm() {
    const { register, handleSubmit, formState: { errors }, control } = useForm<CodeDataModel>({
        mode: "onChange",
        defaultValues: {
            date: Date2String(new Date()),
            content: Object.values(PokeVersions).map(v => INIT_CODE_CONTENT(v))
        }
    });

    const [emojiPickerAnchorEl, setEmojiPickerAnchorEl] = React.useState<HTMLElement | null>(null);
    const [selectedVersion, setSelectedVersion] = React.useState<PokeVersionType>(INIT_SELECTED_VERSION);

    const handleEmojiPickerOpen = (event: React.MouseEvent<HTMLElement>) => {
        setEmojiPickerAnchorEl(event.currentTarget);
    }

    const handleEmojiPickerClose = () => {
        setEmojiPickerAnchorEl(null);
    }

    return (
        <Stack component={"form"} gap={4} onSubmit={handleSubmit((data) => console.log(data))}>
            <Stack direction={"row"} alignItems={"center"} gap={2}>
                <Controller
                    name='icon'
                    control={control}
                    rules={{ required: "アイコンは必須です" }}

                    render={({ field, fieldState }) => (
                        <>
                            <IconButton size='large' onClick={handleEmojiPickerOpen} color={field.value ? 'primary' : fieldState.error ? 'error' : 'default'}>
                                {field.value || <InsertEmoticon />}
                            </IconButton>
                            <Popover open={Boolean(emojiPickerAnchorEl)} anchorEl={emojiPickerAnchorEl} onClose={handleEmojiPickerClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}>
                                <EmojiPicker onEmojiClick={(emojiObject) => {
                                    field.onChange(emojiObject.emoji)
                                    handleEmojiPickerClose();
                                }} />
                            </Popover>
                        </>
                    )}
                />
                <TextField variant='filled' fullWidth label={CODE_DATA_LABELS.title} placeholder={CODE_DATA_PLACEHOLDERS.title} slotProps={{ inputLabel: { shrink: true } }} {...register("title", { required: "タイトルは必須です" })} error={!!errors.title?.message} helperText={errors.title?.message} />
            </Stack>
            <Stack gap={2}>
                <Stack direction={"row"} gap={2} flexWrap={'wrap'}>
                    <TextField fullWidth={false} type='date' label={CODE_DATA_LABELS.date} slotProps={{ inputLabel: { shrink: true } }}  {...register("date", { required: "日時は必須です" })} error={!!errors.date?.message} helperText={errors.date?.message} />
                    <TextField sx={{ flex: 1 }} label={CODE_DATA_LABELS.tags} placeholder={CODE_DATA_PLACEHOLDERS.tags} slotProps={{ inputLabel: { shrink: true } }} {...register("tags")} />
                </Stack>
                <TextField multiline minRows={3} label={CODE_DATA_LABELS.detail} placeholder={CODE_DATA_PLACEHOLDERS.detail} slotProps={{ inputLabel: { shrink: true } }} {...register("detail", { required: "概要は必須です" })} error={!!errors.detail?.message} helperText={errors.detail?.message} />
            </Stack>
            <TextField multiline minRows={10} label={CODE_DATA_LABELS.description} placeholder={CODE_DATA_PLACEHOLDERS.description} slotProps={{ inputLabel: { shrink: true } }} {...register("description", { required: "説明は必須です" })} error={!!errors.description?.message} helperText={errors.description?.message} />

            <Controller
                name='content'
                control={control}
                render={({ field }) => (
                    <>
                        <CodeContentView
                            // key={selectedVersion}
                            content={field.value}
                            mode="edit"
                            selectedVersion={selectedVersion}
                            onChangeVersion={(_, v) => setSelectedVersion(v)}
                        >
                            {
                                field.value.find(c => c.version === selectedVersion)?.blocks.map((b, bi) => (
                                    <Stack
                                        key={`${selectedVersion}-${bi}`}
                                        position={"relative"}
                                        gap={2}
                                        p={2}
                                        borderRadius={1}
                                        sx={{ border: theme => `1px solid ${theme.palette.divider}` }}
                                    >
                                        <Stack direction={"row"} gap={2}>
                                            <TextField
                                                value={b.title}
                                                label={CODE_BLOCK_LABELS.title}
                                                placeholder={CODE_BLOCK_PLACEHOLDERS.title}
                                                slotProps={{ inputLabel: { shrink: true } }}
                                                onChange={(e) => {
                                                    const newBlocks = [...field.value.find(c => c.version === selectedVersion)!.blocks];
                                                    newBlocks[bi] = { ...newBlocks[bi], title: e.target.value };
                                                    const newContent = field.value.map(c => c.version === selectedVersion ? { ...c, blocks: newBlocks } : c);
                                                    field.onChange(newContent);
                                                }}
                                            />
                                            <TextField
                                                value={b.address}
                                                label={CODE_BLOCK_LABELS.address}
                                                placeholder={CODE_BLOCK_PLACEHOLDERS.address}
                                                slotProps={{ inputLabel: { shrink: true } }}
                                            />
                                        </Stack>
                                        <TextField
                                            value={b.code}
                                            label={CODE_BLOCK_LABELS.code}
                                            placeholder={CODE_BLOCK_PLACEHOLDERS.code}
                                            slotProps={{ inputLabel: { shrink: true } }}
                                            fullWidth
                                            multiline
                                            minRows={4}
                                        />
                                        <Box position={"absolute"} top={0} right={0} p={2}>
                                            <IconButton
                                                color='error'
                                                onClick={() => {
                                                    const newBlocks = field.value.find(c => c.version === selectedVersion)!.blocks.filter((_, i) => i !== bi);
                                                    const newContent = field.value.map(c => c.version === selectedVersion ? { ...c, blocks: newBlocks } : c);
                                                    field.onChange(newContent);
                                                }}
                                            >
                                                <Delete />
                                            </IconButton>
                                        </Box>
                                    </Stack>
                                ))
                            }
                            <Box
                                display={"flex"}
                                justifyContent={"center"}
                                bottom={0}
                            >
                                <Chip
                                    label="コードブロックを追加 +"
                                    variant='outlined'
                                    clickable
                                    color='primary'
                                    sx={{
                                        px: 2,
                                        backgroundColor: theme => theme.palette.background.paper,
                                    }}
                                    onClick={() => {
                                        const newBlocks = [...field.value.find(c => c.version === selectedVersion)!.blocks, INIT_CODE_BLOCK];
                                        const newContent = field.value.map(c => c.version === selectedVersion ? { ...c, blocks: newBlocks } : c);
                                        field.onChange(newContent);
                                    }}
                                />
                            </Box>
                        </CodeContentView>
                    </>
                )
                }
            />
            < Button variant='contained' type='submit' >作成</Button >
        </Stack >
    )
}

const VersionsSelectorPopover = ({ enableVersions, onClickVersion, ...popoverProps }: { enableVersions: PokeVersionType[], onClickVersion?: (version: PokeVersionType) => void } & PopoverProps) => {
    return (
        <Popover {...popoverProps}>
            <Stack direction={"row"} gap={1} p={2} alignItems={"center"}>
                {
                    Object.values(PokeVersions).map(version => (
                        <VersionChip key={version} version={version} disable={!enableVersions.some(v => v === version)} onClick={() => onClickVersion?.(version)} />
                    ))
                }
            </Stack>
        </Popover>
    )
}

export default CreateForm