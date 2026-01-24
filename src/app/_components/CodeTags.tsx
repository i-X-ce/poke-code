import { CodeData } from "@/lib/model/CodeDataModel";
import { Chip, Stack } from "@mui/material";

interface CodeTagsProps {
  tags: CodeData["tags"];
}

function CodeTags({ tags }: CodeTagsProps) {
  return (
    <Stack direction={"row"} gap={1}>
      {tags.map((tag) => (
        <Chip key={tag} label={tag} variant="outlined" />
      ))}
    </Stack>
  );
}

export default CodeTags;
