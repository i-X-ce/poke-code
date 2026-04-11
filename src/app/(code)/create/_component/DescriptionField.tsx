import { CodeDataInput } from "@/lib/types/CodeDataModel";
import React from "react";
import { useController, useFormContext } from "react-hook-form";
import CreateFormTextField from "./CreateFormTextField";
import DropzoneWrapper from "@/components/DropzoneWrapper";
import { Button, ButtonGroup, Stack, Typography } from "@mui/material";
import { AddPhotoAlternate, YouTube } from "@mui/icons-material";
import { useImageUpload } from "@/hooks/images/useImage";
import { useSnackbar } from "notistack";
import { INIT_CODE_DATA } from "../_util/initValues";
import { IMAGE_FOLDER } from "@/lib/constant/paths";

// YouTubeの埋め込み動画を降る幅で表示するためにテキストをフォーマットする
const formatYoutubeEmbedFullWidth = (text: string) => {
  const youtubeUrlRegex = /<iframe\s+[^>]*?src="[^"]*?youtube\.com[^"]*?"[^>]*?>/g;

  return text.replace(youtubeUrlRegex, (match) => {
    const cleanedTag = match.replace(/\s(width|height)="\d+"/g, "");
    return cleanedTag.replace("<iframe", '<iframe style="width: 100%; aspect-ratio: 16 / 9;"');
  });
};

const DescriptionField = () => {
  const { control, getValues } = useFormContext<CodeDataInput>();
  const {
    field: { value, onChange },
  } = useController({ control, name: "description" });
  const { isLoading, uploadImageFetcher } = useImageUpload();
  const { enqueueSnackbar } = useSnackbar();

  const onDrop = async (acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return;

    try {
      const { id } = getValues();

      const imageSrc = acceptedFiles
        .map(async (file) => {
          try {
            const imageUrl = await uploadImageFetcher(
              file,
              id === INIT_CODE_DATA.id ? undefined : id,
            );
            return `![${file.name}](${IMAGE_FOLDER}/${imageUrl})  `;
          } catch (error) {
            return null;
          }
        })
        .filter((url) => url !== null);
      onChange([value, ...(await Promise.all(imageSrc))].join("\n"));
    } catch (error) {
      console.error(error);
      enqueueSnackbar("画像のアップロードに失敗しました", { variant: "error" });
    }
  };

  const handleYoutubeEmbedFullWidth = () => {
    onChange(formatYoutubeEmbedFullWidth(value));
  };

  return (
    <>
      <DropzoneWrapper
        dropzoneProps={{ accept: { "image/*": [] }, onDrop }}
        dragActiveElement={
          <Stack gap={1} alignItems={"center"} justifyContent={"center"}>
            <AddPhotoAlternate fontSize="large" color="action" />
            <Typography color="textSecondary">ここに画像をドロップ</Typography>
          </Stack>
        }
        loading={isLoading}
      >
        <CreateFormTextField
          fieldName="description"
          minRows={10}
          multiline
          value={value}
          onChange={onChange}
          disabled={isLoading}
        />
      </DropzoneWrapper>
      <ButtonGroup>
        <Button onClick={handleYoutubeEmbedFullWidth} startIcon={<YouTube />}>
          full width
        </Button>
      </ButtonGroup>
    </>
  );
};

export default DescriptionField;
