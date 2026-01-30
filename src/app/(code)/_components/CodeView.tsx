import CodeContentView from "@/app/_components/CodeContentView";
import CodeInfo from "@/app/_components/CodeInfo";
import CodeTags from "@/app/_components/CodeTags";
import CustomMarkdown from "@/app/_components/CustomMarkdown";
import { CodeData } from "@/lib/model/CodeDataModel";
import { codeSize } from "@/lib/util/codeDataFormat";
import { Typography, Stack, Divider } from "@mui/material";

interface CodeViewProps {
  data: Partial<CodeData>;
}

function CodeView({ data }: CodeViewProps) {
  const { title, tags, date, detail, description, content } = data;

  return (
    <div>
      <Typography
        variant="h4"
        fontWeight={"500"}
        gutterBottom
        color="textPrimary">
        {title}
      </Typography>
      <Stack gap={2}>
        <CodeTags tags={tags} />
        <CodeInfo date={date} codeSize={codeSize(content)} />
        <Typography color="textSecondary">{detail}</Typography>
        <Divider />
      </Stack>
      <CustomMarkdown>{description}</CustomMarkdown>
      <CodeContentView content={content} />
    </div>
  );
}

export default CodeView;
