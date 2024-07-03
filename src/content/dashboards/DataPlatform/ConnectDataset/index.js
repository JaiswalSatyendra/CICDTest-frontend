import { Grid } from "@mui/material";
import { Helmet } from "react-helmet-async";
import DataUpload from "../../../../components/ConnectDataset/DatasetForm/DataUpload";
import PageHeader from "./PageHeader";
import PageTitleWrapper from "../../../../components/PageTitleWrapper/index";

function ConnectDataset() {
  return (
    <>
      <Helmet>
        <title>Dashboard</title>
      </Helmet>
      <PageTitleWrapper>
        <PageHeader />
      </PageTitleWrapper>
      <Grid
        container
        // spacing={4}
        sx={{
          // px: 4,
          backgroundColor: "white",
          width: "100%",
        }}
        direction="row"
      >
        <Grid item sx={12}>
          <DataUpload />
          {/* <DatasetForm /> */}
        </Grid>
      </Grid>
    </>
  );
}

export default ConnectDataset;
