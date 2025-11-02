"use client"
import { CodeDataModel } from '@/lib/model/CodeDataModel';
import { InsertEmoticon } from '@mui/icons-material';
import { Box, Button, FormControl, IconButton, Popover, Stack, TextField } from '@mui/material';
import EmojiPicker, { Emoji } from 'emoji-picker-react';
import React from 'react'
import { Controller, useForm } from 'react-hook-form';

const CREATE_LABELS: { [K in keyof CodeDataModel]: string } = {
    id: 'ID',
    icon: 'アイコン',
    title: 'タイトル',
    date: '作成日時',
    tags: 'タグ(カンマ区切り)',
    detail: '概要',
    description: '説明(Markdown)',
    content: 'コード内容'
};

const Date2String = (date: Date): string => date.toISOString().split('T')[0];

function CreateForm() {
    const { register, handleSubmit, formState: { errors }, control } = useForm<CodeDataModel>({ mode: "onChange", defaultValues: { date: Date2String(new Date()) } });
    const [emojiPickerAnchorEl, setEmojiPickerAnchorEl] = React.useState<HTMLElement | null>(null);

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
                <TextField variant='filled' fullWidth label={CREATE_LABELS.title} slotProps={{ inputLabel: { shrink: true } }} {...register("title", { required: "タイトルは必須です" })} error={!!errors.title?.message} helperText={errors.title?.message} />
            </Stack>
            <Stack gap={2}>
                <Stack direction={"row"} gap={2} flexWrap={'wrap'}>
                    <TextField fullWidth={false} type='date' label={CREATE_LABELS.date} slotProps={{ inputLabel: { shrink: true } }}  {...register("date", { required: "日時は必須です" })} error={!!errors.date?.message} helperText={errors.date?.message} />
                    <TextField sx={{ flex: 1 }} label={CREATE_LABELS.tags} slotProps={{ inputLabel: { shrink: true } }} {...register("tags")} />
                </Stack>
                <TextField multiline minRows={3} label={CREATE_LABELS.detail} slotProps={{ inputLabel: { shrink: true } }} {...register("detail", { required: "概要は必須です" })} error={!!errors.detail?.message} helperText={errors.detail?.message} />
            </Stack>
            <TextField multiline minRows={10} label={CREATE_LABELS.description} slotProps={{ inputLabel: { shrink: true } }} {...register("description", { required: "説明は必須です" })} error={!!errors.description?.message} helperText={errors.description?.message} />
            <Button variant='contained' type='submit'>送信</Button>
        </Stack>
    )
}

export default CreateForm