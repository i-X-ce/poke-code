import { CodeData } from "@/lib/types/CodeDataModel";
import { Chip, Stack } from "@mui/material";
import DevelopmentComponent from "./DevelopmentComponent";

interface CodeTagsProps {
  tags?: CodeData["tags"];
  isPublic?: CodeData["isPublic"];
}

function CodeTags({ tags, isPublic }: CodeTagsProps) {
  return (
    <Stack direction={"row"} gap={1}>
      <DevelopmentComponent>
        {isPublic ? (
          <Chip label="公開中" variant="outlined" color="success" />
        ) : (
          <Chip label="非公開" variant="outlined" color="error" />
        )}
      </DevelopmentComponent>
      {tags &&
        tags.map((tag) => <Chip key={tag} label={tag} variant="outlined" />)}
    </Stack>
  );
}

export default CodeTags;
