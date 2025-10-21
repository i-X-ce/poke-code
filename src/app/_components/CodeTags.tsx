import { CodeDataModel } from "@/lib/model/CodeDataModel"
import { Chip, Stack } from "@mui/material"

function CodeTags({ data }: { data: CodeDataModel }) {
    return (
        <Stack direction={"row"} gap={1}>
            {
                data.tags.map(tag => (
                    <Chip key={tag} label={tag} variant="outlined" />
                ))
            }
        </Stack>
    )
}

export default CodeTags