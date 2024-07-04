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



  // const getDatasets = useCallback(async () => {
  //   try {
     
  // }, [isMountedRef]);

  useEffect(() => {
    fetchDataSetList()
  }, []);

  const fetchDataSetList = () =>{
    fetch(`${process.env.REACT_APP_API_URL}/dataset/trainedProject`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        model_name: null,
        user_id: user._id,
        status: "all"
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        let newData = [];
        data.data.forEach(element => {
          if(element.status=="running"){
            element.status = "progress"
          }
          else if(element.status=="fail"){
            element.status = "failed"
          }
          newData.push(element)
        });
        let newData1 = newData.map((obj, ind) => ({ ...obj, "id": ind + 1 }))
        setDataSets(newData1);

      }).catch((error) => {
        setDataSets([]);
        console.log(error);
      });

  }

  const getDataPredict = () =>{
    fetch(`${process.env.REACT_APP_API_URL}/dataset/predicatedProject`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        user_id: user._id, project_id: null
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        let newData = [];
        data.data.forEach(element => {
          if(element.status=="running"){
            element.status = "progress"
          }
          else if(element.status=="fail"){
            element.status = "failed"
          }
          newData.push(element)
        });
        let newData1 = newData.map((obj, ind) => ({ ...obj, "id": ind + 1,"table_name": obj.predict_data_source }))
        setDataSets(newData1);

      }).catch((error) => {
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
          <Results datasets={datasets} fetchDatasets={fetchDataSetList} getDataAnalysis={fetchDataSetList} getDataPredict={getDataPredict} />
        </Grid>
      </Grid>
    </>
  );
}

export default ManagementProjects;
