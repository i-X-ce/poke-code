"use client";
import { Box, Button, ButtonGroup } from "@mui/material";
import CreateForm from "./CreateForm";
import { Clear, Edit, Public, RemoveRedEye, Save } from "@mui/icons-material";
import {
  CreateViewModes,
  useCreateViewMode,
} from "../_hooks/useCreateViewMode";
import { CodeDataInput, CodeDataSchema } from "@/lib/types/CodeDataModel";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { INIT_CODE_DATA } from "../_util/initValues";
import { CREATE_FORM_ID } from "../_consts/formId";
import { memo, useEffect, useMemo, useState } from "react";
import { useDialog } from "@/hooks/useDialog";
import ErrorDialogContent from "./ErrorDialogContent";
import { useSnackbar } from "notistack";
import { useUpdateCode } from "@/hooks/codes/useUpdateCode";
import { useCreateCode } from "@/hooks/codes/useCreateCode";
import { useSaveCode } from "@/hooks/codes/useSaveCode";
import CodeViewWrapper from "./CodeViewWrapper";
import { useRouter } from "next/navigation";
import { PATH } from "@/lib/constant/paths";
import ClearDialogContent from "./ClearDialogContent";

interface CreateViewProps {
  mode: "create" | "edit";
  initData?: Partial<CodeDataInput>;
  errorMessage?: string;
}

const CreateView = memo(({ mode, initData, errorMessage }: CreateViewProps) => {
  const formProps = useForm<CodeDataInput>({
    resolver: zodResolver(CodeDataSchema),
    mode: "onChange",
    defaultValues: initData || INIT_CODE_DATA,
  });
  const { viewMode, toggleViewMode } = useCreateViewMode();
  const { openDialog } = useDialog();
  const { enqueueSnackbar } = useSnackbar();
  const { createCodeFetcher } = useCreateCode();
  const { isSaving, saveCodeFetcher } = useSaveCode();
  const { updateCodeFetcher } = useUpdateCode();
  const router = useRouter();
  const [resetFlag, setResetFlag] = useState(false); // クリア後にフォームの内容をリセットするためのフラグ

  const {
    getValues,
    handleSubmit,
    reset,
    formState: { isSubmitting, isSubmitSuccessful, isDirty },
  } = formProps;

  const actionName = useMemo(
    () => (mode === "create" ? "投稿" : "更新"),
    [mode],
  );

  const checkSubmitErrors = (data = getValues()) => {
    const parsed = CodeDataSchema.safeParse(data);
    if (parsed.success) return;
    console.error("コードデータのバリデーションエラー:", parsed.error);

    const { issues } = parsed.error;
    const errorMessages = issues.map((issue) => issue.message);
    openDialog(<ErrorDialogContent errors={errorMessages} />);
    throw new Error("データに不備があります");
  };

  const onSubmit = async (data: CodeDataInput) => {
    try {
      if (isSubmitting || isSubmitSuccessful) return;
      checkSubmitErrors(data);

      const {
        ok,
        data: id,
        message,
      } = await (async () => {
        switch (mode) {
          case "edit":
            return updateCodeFetcher(data.id, data);
          case "create":
            return createCodeFetcher(data);
          default:
            return createCodeFetcher(data);
        }
      })();

      if (!ok) {
        throw new Error(message || `コードデータの${actionName}に失敗しました`);
      }

      enqueueSnackbar(`コードデータを${actionName}しました: ${id}`, {
        variant: "success",
      });
      router.push(PATH.DETAIL(id));
    } catch (error) {
      console.error(error);
      enqueueSnackbar((error as Error).message, { variant: "error" });
      throw error;
    }
  };

  const onSave =
    mode === "create"
      ? async () => {
          try {
            const data = getValues();
            const { ok, message } = await saveCodeFetcher(data);

            if (!ok) {
              throw new Error(
                message || "コードデータの一時保存に失敗しました",
              );
            }

            enqueueSnackbar("コードデータを一時保存しました", {
              variant: "success",
            });
          } catch (error) {
            console.error(error);
            enqueueSnackbar((error as Error).message, { variant: "error" });
            throw error;
          }
        }
      : () => {};

  const onToggleViewMode = () => {
    try {
      checkSubmitErrors();
      toggleViewMode();
    } catch {}
  };

  const onClear = () => {
    const onReset = () => {
      setResetFlag((prev) => !prev); // フォームの内容をリセットするためにフラグを切り替える
      reset(INIT_CODE_DATA);
      enqueueSnackbar("内容をクリアしました", { variant: "success" });
    };

    if (!isDirty) {
      onReset();
      return;
    }
    openDialog(<ClearDialogContent onClear={onReset} />);
  };

  // ショートカットキーの登録
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "s") {
        // Ctrl+S or Cmd+S で保存
        e.preventDefault();
        if (mode === "create") {
          onSave();
        } else if (mode === "edit") {
          checkSubmitErrors();
          handleSubmit(onSubmit)();
        }
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
    <>
      {viewMode === CreateViewModes.EDIT && (
        <CreateForm key={String(resetFlag)} formProps={formProps} />
      )}
      {viewMode === CreateViewModes.PREVIEW && (
        <CodeViewWrapper key={String(resetFlag)} formProps={formProps} />
      )}

      {/* アクション */}
      <Box
        my={4}
        position={"sticky"}
        bottom={16}
        display={"flex"}
        justifyContent={"end"}
      >
        <ButtonGroup size="large" sx={{ backgroundColor: "background.paper" }}>
          <Button
            onClick={onToggleViewMode}
            startIcon={
              viewMode === CreateViewModes.EDIT ? <RemoveRedEye /> : <Edit />
            }
            variant="outlined"
          >
            {viewMode === CreateViewModes.EDIT ? "プレビュー" : "編集に戻る"}
          </Button>
          {mode === "create" && (
            <>
              <Button onClick={onClear} startIcon={<Clear />}>
                クリア
              </Button>
              <Button
                onClick={onSave}
                startIcon={<Save />}
                variant="outlined"
                loading={isSaving}
              >
                一時保存
              </Button>
            </>
          )}
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
            loading={isSubmitting}
            disabled={isSubmitSuccessful}
          >
            {actionName}する
          </Button>
        </ButtonGroup>
      </Box>
    </>
  );
});

export default CreateView;
