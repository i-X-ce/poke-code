import { CodeDataHeaderJson } from "@/lib/types/CodeDataModel";
import { Box, CardActionArea, Stack, Typography } from "@mui/material";
import CodeInfo from "../CodeInfo";
import { PATH } from "@/lib/constant/paths";
import Link from "next/link";
import MoreButton from "@/app/_components/MoreButton";
import { useSetAtom } from "jotai";
import { closeSideAtom } from "@/atoms/ui/side";

function SideItemChild({ data }: { data: CodeDataHeaderJson }) {
  const { id, date, codeSize } = data;
  const closeSidebar = useSetAtom(closeSideAtom);

  return (
    <Box
      position={"relative"}
      display={"flex"}
      alignItems={"center"}
      // ml={2}
      sx={(theme) => ({
        // bgcolor: theme.palette.background.paper,
        borderTop: `1px solid ${theme.palette.divider}`,
      })}
    >
      <Box width={16} alignSelf={"stretch"} sx={{ bgcolor: "divider" }} />

      <CardActionArea
        LinkComponent={Link}
        href={PATH.DETAIL(data.id)}
        sx={{ flex: 1 }}
        onClick={closeSidebar}
      >
        <Stack
          direction={"row"}
          p={1}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Stack gap={0.5} minWidth={0} pr={4}>
            <Typography noWrap>{data.title}</Typography>
            <CodeInfo date={date} codeSize={codeSize} size="small" />
          </Stack>
        </Stack>
      </CardActionArea>
      <Box position={"absolute"} right={0} p={1}>
        <MoreButton id={id} />
      </Box>
    </Box>
  );
}

export default SideItemChild;
