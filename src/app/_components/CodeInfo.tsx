import { CodeDataHeaderJson } from "@/lib/model/CodeDataModel";
import { Stack } from "@mui/material";
import IconAndText from "./IconAndText";
import { CalendarMonth, Straighten } from "@mui/icons-material";
import { displayDate } from "@/lib/util/date";

interface CodeInfoProps {
  date?: CodeDataHeaderJson["date"];
  codeSize?: CodeDataHeaderJson["codeSize"];
  size?: "small" | "medium";
}

function CodeInfo({ date, codeSize, size = "medium" }: CodeInfoProps) {
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
        text={`${codeSize} Byte`}
      />
    </Stack>
  );
}

export default CodeInfo;
