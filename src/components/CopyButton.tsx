"use client";
import useCopyClipboard from "@/hooks/useCopyClipboard";
import { Check, ContentCopy } from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";

interface CopyButtonProps {
  copyValue?: HTMLElement | string;
}

function CopyButton({ copyValue }: CopyButtonProps) {
  const { copied, handleCopy } = useCopyClipboard(copyValue || undefined);

  return (
    <Tooltip title={copied ? "コピーしました" : "コピー"}>
      <IconButton color={copied ? "success" : "default"} onClick={handleCopy}>
        {copied ? <Check fontSize="small" /> : <ContentCopy fontSize="small" />}
      </IconButton>
    </Tooltip>
  );
}

export default CopyButton;
