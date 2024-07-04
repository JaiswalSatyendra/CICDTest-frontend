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
  const [datasets, setDataSets] = useState([]);
  const [session, ,] = useContext(SessionContext);
  const { user } = session;

  // const getDatasets = useCallback(async () => {
  //   try {

  // }, [isMountedRef]);

  useEffect(() => {
    fetchDataSetList()

  }, []);

  const fetchDataSetList = () => {
    fetch(
      `${process.env.REACT_APP_API_URL}/dataset/listAllStatus`,
      {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
        credentials: "include",
      }
    ).then((res) => res.json())
      .then((res) => {
        let newData = [];
        res.data.forEach(element => {
          if (element.status == "running") {
            element.status = "progress"
          }
          else if (element.status == "fail") {
            element.status = "failed"
          }
          if (element.createdTime !== undefined && element.createdTime !== null) {
            // let newDate = new Date(element.createdTime)
            element.createdTime = element.createdTime.replace(/T/, ' ').replace(/\..+/, '');
          }
          newData.push(element)
        });
        let newData2 = res.data.filter((obj, ind) => obj.title != undefined && obj.title != "")
        let newData1 = newData2.map((obj, ind) => ({ ...obj, "id": ind + 1, }))
        setDataSets(newData1);
      })
      .catch((error) => {
        setDataSets([]);
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
          <Results datasets={datasets} fetchDatasets={fetchDataSetList} />
        </Grid>
      </Grid>
    </>
  );
}

export default ManagementProjects;
