import { CodeData } from "@/lib/model/CodeDataModel";
import { Stack } from "@mui/material";
import IconAndText from "./IconAndText";
import { CalendarMonth, Straighten } from "@mui/icons-material";
import { displayDate } from "@/lib/util/date";

function CodeInfo({
  data,
  size = "medium",
}: {
  data: CodeData;
  size?: "small" | "medium";
}) {
  const codeLength = Math.max(
    ...data.content.map((c) =>
      c.blocks.reduce((acc, b) => acc + b.code.length / 2, 0),
    ),
  );
  const { date } = data;

  return (
    <Stack direction={"row"} gap={2}>
      <IconAndText
        size={size}
        icon={<CalendarMonth fontSize={size} />}
        text={displayDate(date)}
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
