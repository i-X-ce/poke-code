import CodeContentView from "@/components/CodeContentView";
import CodeInfo from "@/components/CodeInfo";
import CodeTags from "@/components/CodeTags";
import CustomMarkdown from "@/components/CustomMarkdown";
import { CodeData } from "@/lib/types/CodeDataModel";
import { codeSize } from "@/lib/util/codeDataFormat";
import { Typography, Stack, Divider, Box } from "@mui/material";

interface CodeViewProps {
  data: Partial<CodeData>;
}

function CodeView({ data }: CodeViewProps) {
  const { title, tags, date, detail, description, content, blocks, isPublic } =
    data;

  return (
    <Box position={"relative"}>
      <Typography
        variant="h4"
        fontWeight={"500"}
        paddingRight={{ xs: 0, md: 12 }}
        gutterBottom
        color="textPrimary">
        {title}
      </Typography>

      <Stack gap={2} mb={4}>
        <CodeTags tags={tags} isPublic={isPublic} open />
        <CodeInfo date={date} codeSize={codeSize(blocks)} />
        <Typography color="textSecondary">{detail}</Typography>
        <Divider />
      </Stack>

      <CustomMarkdown>{description}</CustomMarkdown>
      <CodeContentView content={content} blocks={blocks} />
    </Box>
  );
}

export default CodeView;
