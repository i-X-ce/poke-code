"use client";
import { Box, Button, ButtonGroup, Stack } from "@mui/material";
import CreateForm from "./CreateForm";
import { Edit, Public, RemoveRedEye, Save } from "@mui/icons-material";
import {
  CreateViewModes,
  useCreateViewMode,
} from "../_hooks/useCreateViewMode";
import CodeView from "../../_components/CodeView";
import { CodeDataInput, CodeDataSchema } from "@/lib/model/CodeDataModel";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { INIT_CODE_DATA } from "../_util/initValues";
import { CREATE_FORM_ID } from "../_consts/formId";
import { useMemo } from "react";
import { useDialog } from "@/app/_hooks/useDialog";
import ErrorDialogContent from "./ErrorDialogContent";

function CreateView() {
  const formProps = useForm<CodeDataInput>({
    resolver: zodResolver(CodeDataSchema),
    mode: "onChange",
    defaultValues: INIT_CODE_DATA,
  });
  const { viewMode, toggleViewMode } = useCreateViewMode();
  const { openDialog } = useDialog();

  const { watch, handleSubmit } = formProps;
  const values = watch();
  const parsed = useMemo(() => CodeDataSchema.safeParse(values), [values]);
  const parsedData = parsed.success ? parsed.data : null;

  const onSubmit = (data: CodeDataInput) => {
    console.log("Submitted Data:", data);
  };

  const onToggleViewMode = () => {
    if (!parsed.success) {
      const { issues } = parsed.error;
      const errorMessages = issues.map((issue) => issue.message);
      openDialog(<ErrorDialogContent errors={errorMessages} />);
      return;
    }

    toggleViewMode();
  };

  return (
    <Box flex={1}>
      {viewMode === CreateViewModes.EDIT && (
        <CreateForm formProps={formProps} />
      )}
      {viewMode === CreateViewModes.PREVIEW && parsedData && (
        <CodeView data={parsedData} />
      )}

      {/* アクション */}
      <Box
        my={4}
        position={"sticky"}
        bottom={16}
        display={"flex"}
        justifyContent={"end"}>
        <ButtonGroup size="large" sx={{ backgroundColor: "background.paper" }}>
          <Button
            onClick={onToggleViewMode}
            startIcon={
              viewMode === CreateViewModes.EDIT ? <RemoveRedEye /> : <Edit />
            }
            variant="outlined">
            {viewMode === CreateViewModes.EDIT ? "プレビュー" : "編集に戻る"}
          </Button>
          <Button startIcon={<Save />} variant="outlined">
            一時保存
          </Button>
          <Button
            form={CREATE_FORM_ID}
            onSubmit={handleSubmit(onSubmit)}
            type="submit"
            startIcon={<Public />}
            variant="contained">
            投稿する
          </Button>
        </ButtonGroup>
      </Box>
    </Box>
  );
}

export default CreateView;
