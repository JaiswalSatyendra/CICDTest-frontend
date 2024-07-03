import { useState, useEffect, useCallback, useContext } from "react";
import { Helmet } from "react-helmet-async";
import { Grid } from "@mui/material";
import PageTitleWrapper from "../../../components/PageTitleWrapper";
import useRefMounted from "../../../hooks/useRefMounted";

import PageHeader from "./PageHeader";

import Results from "./Results";
import { SessionContext } from "../../../contexts/SessionContext";

function ManagementProjects() {
  const isMountedRef = useRefMounted();
  const [campaigns, setCampaigns] = useState([]);
  const [session, ,] = useContext(SessionContext);
  const { user } = session;

  const getCampaigns = useCallback(async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/emailCampaign/list`,
        {
          method: "GET",
          headers: {
            "Content-type": "application/json",
          },
          credentials: "include",
        }
      ).then((res) => res.json());

      if (isMountedRef.current) {
        let newData = response.data.map((obj, ind) => ({ ...obj, "id": ind + 1 }))
        setCampaigns(newData);
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMountedRef]);

  useEffect(() => {
    getCampaigns();
  }, [getCampaigns]);

  return (
    <>
      <Helmet>
        <title>Campaigns - Management</title>
      </Helmet>
      <PageTitleWrapper>
        <PageHeader />
      </PageTitleWrapper>

      <Grid
        sx={{
          px: 4,
        }}
        container
        direction="row"
        justifyContent="center"
        alignItems="stretch"
        spacing={4}
      >
        <Grid item xs={12}>
          <Results campaigns={campaigns} fetchCampaigns={getCampaigns} />
        </Grid>
      </Grid>
    </>
  );
}

export default ManagementProjects;
