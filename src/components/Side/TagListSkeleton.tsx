import { Stack, Box, Chip } from "@mui/material";

const TagListSkeleton = () => {
  return (
    <Stack direction={"row"} flexWrap={"wrap"} gap={1} mt={2}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Chip key={i} label={<Box width={50 * Math.random() + 30} />} />
      ))}
    </Stack>
  );
};

export default TagListSkeleton;
