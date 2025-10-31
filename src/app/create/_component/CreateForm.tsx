"use client"
import { CodeDataModel } from '@/lib/model/CodeDataModel';
import { InsertEmoticon } from '@mui/icons-material';
import { Box, Button, FormControl, IconButton, Stack, TextField } from '@mui/material';
import EmojiPicker, { Emoji } from 'emoji-picker-react';
import React from 'react'
import { useForm } from 'react-hook-form';

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
    const { register, handleSubmit, formState: { errors }, getValues, setValue } = useForm<CodeDataModel>({ mode: "onChange", defaultValues: { date: Date2String(new Date()) } });
    const [openEmojiPicker, setOpenEmojiPicker] = React.useState(false);

    const handleToggleEmojiPicker = () => {
        setOpenEmojiPicker(!openEmojiPicker);
    }

    const handlePickEmoji = (emoji: string) => {
        setOpenEmojiPicker(false);
        setValue("icon", emoji);
    }

    return (
        <Stack component={"form"} gap={4} onSubmit={handleSubmit((data) => console.log(data))}>
            <Stack direction={"row"} alignItems={"center"} gap={2}>
                <IconButton size='large' onClick={handleToggleEmojiPicker} color={getValues("icon") ? 'primary' : errors.icon ? 'error' : 'default'}>
                    {getValues("icon") || <InsertEmoticon />}
                </IconButton>
                <TextField variant='filled' fullWidth label={CREATE_LABELS.title} {...register("title", { required: "タイトルは必須です" })} error={!!errors.title?.message} helperText={errors.title?.message} />
                <Box position={"absolute"} zIndex={10}>
                    {openEmojiPicker && <EmojiPicker onEmojiClick={emojiData => handlePickEmoji(emojiData.emoji)} />}
                </Box>
            </Stack>
            <Stack gap={2}>
                <Stack direction={"row"} gap={2} flexWrap={'wrap'}>
                    <TextField fullWidth={false} type='date' label={CREATE_LABELS.date} slotProps={{ inputLabel: { shrink: true } }}  {...register("date", { required: "日時は必須です" })} error={!!errors.date?.message} helperText={errors.date?.message} />
                    <TextField sx={{ flex: 1 }} label={CREATE_LABELS.tags}  {...register("tags")} />
                </Stack>
                <TextField multiline minRows={3} label={CREATE_LABELS.detail} {...register("detail", { required: "概要は必須です" })} error={!!errors.detail?.message} helperText={errors.detail?.message} />
            </Stack>
            <Button variant='contained' type='submit'>送信</Button>
        </Stack>
    )
}

export default CreateForm