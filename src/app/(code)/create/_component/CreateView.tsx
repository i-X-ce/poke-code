"use client";
import { Box, Button, ButtonGroup } from "@mui/material";
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
import { useEffect, useMemo } from "react";
import { useDialog } from "@/app/_hooks/useDialog";
import ErrorDialogContent from "./ErrorDialogContent";
import { createCode, saveCodeData } from "../../actions";
import { useSnackbar } from "notistack";
import { useLoading } from "@/lib/hooks/useLoading";

interface CreateViewProps {
  initData?: Partial<CodeDataInput>;
  errorMessage?: string;
}

function CreateView({ initData, errorMessage }: CreateViewProps) {
  const formProps = useForm<CodeDataInput>({
    resolver: zodResolver(CodeDataSchema),
    mode: "onChange",
    defaultValues: initData || INIT_CODE_DATA,
  });
  const { viewMode, toggleViewMode } = useCreateViewMode();
  const { openDialog } = useDialog();
  const { enqueueSnackbar } = useSnackbar();
  const { isLoading: isSaving, startLoading: startSaving } = useLoading();

  const {
    watch,
    handleSubmit,
    formState: { isSubmitting },
  } = formProps;
  const values = watch();
  const parsed = useMemo(() => CodeDataSchema.safeParse(values), [values]);
  const parsedData = parsed.success ? parsed.data : null;

  const checkSubmitErrors = (data = values) => {
    const parsed = CodeDataSchema.safeParse(data);
    if (parsed.success) return;

    const { issues } = parsed.error;
    const errorMessages = issues.map((issue) => issue.message);
    openDialog(<ErrorDialogContent errors={errorMessages} />);
    throw new Error("データに不備があります");
  };

  const onSubmit = async (data: CodeDataInput) => {
    try {
      checkSubmitErrors(data);

      const { ok, data: id, message } = await createCode(data);
      if (!ok) {
        throw new Error(message || "コードデータの投稿に失敗しました");
      }
      enqueueSnackbar(`コードデータを投稿しました: ${id}`, {
        variant: "success",
      });
    } catch (error) {
      console.error(error);
      enqueueSnackbar((error as Error).message, { variant: "error" });
      throw error;
    }
  };

  const onSave = async () => {
    startSaving(async () => {
      try {
        const data = watch();
        const { ok, message } = await saveCodeData(data);

        if (!ok) {
          throw new Error(message || "コードデータの一時保存に失敗しました");
        }

        enqueueSnackbar("コードデータを一時保存しました", {
          variant: "success",
        });
      } catch (error) {
        console.error(error);
        enqueueSnackbar((error as Error).message, { variant: "error" });
        throw error;
      }
    });
  };

  const onToggleViewMode = () => {
    try {
      checkSubmitErrors();
      toggleViewMode();
    } catch {}
  };

  // ショートカットキーの登録
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "s") {
        // Ctrl+S or Cmd+S で保存
        e.preventDefault();
        onSave();
      } else if ((e.ctrlKey || e.metaKey) && e.key === "q") {
        // Ctrl+Q or Cmd+Q で表示切替
        e.preventDefault();
        onToggleViewMode();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onSave, onToggleViewMode]);

  useEffect(() => {
    if (!errorMessage) return;
    enqueueSnackbar(errorMessage, { variant: "error" });
  }, []);

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
          <Button
            onClick={onSave}
            startIcon={<Save />}
            variant="outlined"
            loading={isSaving}>
            一時保存
          </Button>
          <Button
            form={CREATE_FORM_ID}
            type="submit"
            startIcon={<Public />}
            variant="contained"
            onClick={(e) => {
              // CodeContentEditorの方のエラーが見えない場合があるので、ここで明示的にエラー内容を出力する
              // handleSubmitだと入力内容に問題があってもonSubmitが呼ばれないため、ここでチェックする
              handleSubmit(onSubmit)(e);
              checkSubmitErrors();
            }}
            loading={isSubmitting}>
            投稿する
          </Button>
        </ButtonGroup>
      </Box>
    </Box>
  );
}

export default CreateView;
