import { CodeContent } from "@/lib/types/CodeDataModel";
import { sortVersions } from "@/lib/util/versionType";
import VersionTab from "./VersionTab";
import { CardActionArea, Stack } from "@mui/material";

type VersionTabGroupProps = {
  versions: CodeContent["versions"];
  selected: boolean;
  onClick: () => void;
};

const VersionTabGroup = ({
  versions,
  selected,
  onClick,
}: VersionTabGroupProps) => {
  return (
    <CardActionArea
      onClick={onClick}
      sx={{ borderTopLeftRadius: 4, borderTopRightRadius: 4 }}>
      <Stack direction={"row"} alignItems={"end"}>
        {versions.length === 0 ? (
          <VersionTab
            version={"N"}
            selected={selected}
            radius={{ L: true, R: true }}
          />
        ) : (
          sortVersions(versions).map((version, index) => (
            <VersionTab
              key={version}
              version={version}
              radius={{
                L: index === 0,
                R: index === versions.length - 1,
              }}
              selected={selected}
            />
          ))
        )}
      </Stack>
    </CardActionArea>
  );
};

export default VersionTabGroup;
