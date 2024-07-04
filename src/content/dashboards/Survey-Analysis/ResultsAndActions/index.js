import PageHeader from "./PageHeader";
import PageTitleWrapper from "../../../../components/PageTitleWrapper";
import { Helmet } from "react-helmet-async";
import { Box, Divider, Grid } from "@mui/material";
import ModelStatus from "./ModelStatus";
import ColumnImpact from "./ColumnImpact";
import ImpactChart from "./ImpactChart";
import ViewResults from "./ViewResults";

function Project() {
  return (
    <>
      <Helmet>
        <title>Dashboard</title>
      </Helmet>
      <PageTitleWrapper>
        <PageHeader />
      </PageTitleWrapper>
      <Grid container sx={{ backgroundColor: "white", mt: "-36px" }}>
        <Grid item xs={12}>
          <ModelStatus />
          <Divider />
        </Grid>
        <Grid item xs={12} sm={12} md={4.9}>
          <ColumnImpact />
        </Grid>
        <Divider orientation="vertical" flexItem />
        <Grid item xs={12} sm={12} md={7}>
          <ImpactChart />
        </Grid>
        <Grid item xs={12}>
          <ViewResults name={"View Results"} />
        </Grid>
      </Grid>
    </>
  );
}

export default Project;
