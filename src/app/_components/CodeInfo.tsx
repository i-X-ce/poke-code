import { CodeDataModel } from "@/lib/model/CodeDataModel"
import { Stack } from "@mui/material"
import IconAndText from "./IconAndText"
import { CalendarMonth, Straighten } from "@mui/icons-material"



function CodeInfo({ data, size = "medium" }: { data: CodeDataModel, size?: "small" | "medium" }) {
    const codeLength = Math.max(...data.content.map(c => c.blocks.reduce((acc, b) => acc + (b.code.length / 2), 0)));

    return (
        <Stack direction={"row"} gap={2}>
            <IconAndText size={size} icon={<CalendarMonth fontSize={size} />} text={typeof data.date === "string" ? data.date : data.date.toLocaleDateString()} />
            <IconAndText size={size} icon={<Straighten fontSize={size} />} text={`${codeLength} Byte`} />
        </Stack>
    )
}

export default CodeInfo