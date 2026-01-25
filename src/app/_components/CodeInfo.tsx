import { CodeData } from "@/lib/model/CodeDataModel";
import { Stack } from "@mui/material";
import IconAndText from "./IconAndText";
import { CalendarMonth, Straighten } from "@mui/icons-material";
import { displayDate } from "@/lib/util/date";

interface CodeInfoProps {
  date?: CodeData["date"];
  content?: CodeData["content"];
  size?: "small" | "medium";
}

function CodeInfo({ date, content, size = "medium" }: CodeInfoProps) {
  const codeLength = content
    ? Math.max(
        ...content.map((c) =>
          c.blocks.reduce((acc, b) => acc + b.code.length / 2, 0),
        ),
      )
    : 0;

  return (
    <Stack direction={"row"} gap={2}>
      <IconAndText
        size={size}
        icon={<CalendarMonth fontSize={size} />}
        text={date ? displayDate(date) : "不明"}
      />
      <IconAndText
        size={size}
        icon={<Straighten fontSize={size} />}
        text={`${codeLength} Byte`}
      />
    </Stack>
  );
}

export default CodeInfo;
