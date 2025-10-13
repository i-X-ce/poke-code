import { CodeDataModel, createMockCodeData } from "@/lib/model/CodeDataModel";
import { Grid } from "@mui/material";
import CodeCard from "./(view)/_components/CodeCard";

const MAX_CARD_PER_PAGE = 12;

export default function Home() {
  const codeData: CodeDataModel[] = Array.from({ length: MAX_CARD_PER_PAGE * 3 + 1 }).map((_, i) => (createMockCodeData(i)))

  return (
    <Grid container spacing={2} padding={2}>
      {codeData.map((data) => (
        <Grid key={data.id} size={{ xs: 12, sm: 6, md: 6, lg: 6, xl: 6 }}>
          <CodeCard data={data} />
        </Grid>
      ))}
    </Grid>
  );
}
