import { useState, useEffect, useCallback, useContext } from "react";
import { Helmet } from "react-helmet-async";
import { Grid } from "@mui/material";
import PageTitleWrapper from "../../../components/PageTitleWrapper";
import useRefMounted from "../../../hooks/useRefMounted";

import PageHeader from "./PageHeader";

import Results from "./Results";
import { SessionContext } from "../../../contexts/SessionContext";
import axios from "axios";

function ManagementProjects() {
  const isMountedRef = useRefMounted();
  const [datasets, setDataSets] = useState([]);
  const [session, ,] = useContext(SessionContext);
  const { user } = session;


  useEffect(() => {
    fetchDataSetList()
  }, []);

  const fetchDataSetList = () => {
    fetch(`${process.env.REACT_APP_API_URL}/crmData/exportCrmDataList`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      credentials: "include",
     
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("nnnn",data);
        let newData = [];
        data.data.forEach(element => {
          if (element.status == "running") {
            element.status = "progress"
          }
          else if (element.status == "fail") {
            element.status = "failed"
          }
          newData.push(element)
        });

        let newData1 = newData.map((obj, ind) => ({ ...obj, "id": ind + 1 }))
        setDataSets(newData1);

      }).catch((error) => {
        
        console.log(error);
      });

  }

  


  return (
    <>
      <Helmet>
        <title>Datasets - Management</title>
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
          {/* fetchDatasets={fetchDataSetList} */}
          <Results datasets={datasets} fetchDatasets={fetchDataSetList} getDataAnalysis={fetchDataSetList} />
        </Grid>
      </Grid>
    </>
  );
}

export default ManagementProjects;
