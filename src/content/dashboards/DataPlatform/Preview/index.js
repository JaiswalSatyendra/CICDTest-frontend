import { useState, useEffect, useContext } from "react";
import { Box, Grid, Paper, Stack } from "@mui/material";
import { Helmet } from "react-helmet-async";
import Select from "react-select";
import { useTranslation } from "react-i18next";
import Description from "./review/Description";
import OverviewTable from "./review/OverviewTable";
import PageTitleWrapper from "../../../../components/PageTitleWrapper";
import PageHeader from "./PageHeader";
import { SessionContext } from "../../../../contexts/SessionContext";
import QueryResult from "../QueryEngine/QueryResult";
import SuspenseLoader from "../../../../components/SuspenseLoader";
import ToastMessage from "./ToastMessage";
import { useNavigate } from "react-router-dom";

function Preview() {
  const [datasets, setDatasets] = useState([]);
  const [selectedDataset, setSelectedDataset] = useState("");
  const [datasetDetails, setDatasetDetails] = useState(null);
  const [queryResult, setQueryResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [toastObject, setToastObject] = useState({});
  const [session, , , ,] = useContext(SessionContext);
  const { t } = useTranslation();
  const { user } = session;
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/dataset/list`, {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((res) => {
        setDatasets(res.data);
      })
      .catch((error) => {
        setDatasets([]);
        console.log(error);
      });
  }, [user]);

  // useEffect(() => {
   
  //   fetch(`${process.env.REACT_APP_API_URL}/dataset/saveNewDataSetCollection`, {
  //     method: "POST",
  //     credentials: "include",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({

  //     databaseName:"convertml",
  //     collectionName:"datasets",
  //     document:[
  //       {"user":"879", "title":"rules in1"},
  //       {"user":"880", "title":"rules in2"}
  //       ],
  //     }),
  //   }).then((res) => res.json())
  //   .then((res) => {
  //     console.log("dataset");
  //     console.log(res);
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //   })

  //   if (!selectedDataset) {
  //     return;
  //   }
  
   
  //   setIsLoading(true);
  //   fetch(`${process.env.REACT_APP_API_URL}/datasetPreview`, {
  //     method: "POST",
  //     credentials: "include",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       user: user,
  //       datasetId: selectedDataset.id,
  //     }),
  //   })
  //     .then((res) => res.json())
  //     .then((res) => {
  //       if (res.success === true) {
  //         setDatasetDetails(res.data);
  //         setQueryResult({
  //           rows: res.queryResult.Items,
  //           table: res.queryResult.tableName,
  //           metaData: res.queryResult.metaData,
  //         });
  //         setToastObject({
  //           message: t(`${res.message}`),
  //           severity: "success",
  //           open: true,
  //         });
  //       } else {
  //         setDatasetDetails(null);
  //         setQueryResult(null);
  //         setToastObject({
  //           message: t(`${res.message}`),
  //           severity: "error",
  //           open: true,
  //         });
  //       }
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       setDatasetDetails(null);
  //       setQueryResult(null);
  //       setToastObject({
  //         message: t(`${error.message}`),
  //         severity: "error",
  //         open: true,
  //       });
  //     })
  //     .finally(() => {
  //       setIsLoading(false);
  //     });
  // }, [selectedDataset]);
  let navigate = useNavigate();
  return (
    <>
      <Helmet>
        <title>Dashboard</title>
      </Helmet>
      <PageTitleWrapper>
        <PageHeader />
      </PageTitleWrapper>

      {isLoading && <SuspenseLoader />}
      <Grid container direction="row">
        <Grid item xs={12} md={4}>
          <Stack>
            <Box sx={{ ml: 3, mr: 1.5 }}>
              <Box sx={{ mb: 2 }}>
                <Select
                  options={datasets.map((dataset) => ({
                    id: dataset._id,
                    value: dataset.title,
                    label: dataset.title,
                  }))}
                  placeholder={"Select Dataset"}
                  onChange={setSelectedDataset}
                  sx={{ width: "100%" }}
                />
              </Box>
              <Box sx={{ mb: 2 }}>
              
                <Description
                  totalRows={datasetDetails ? datasetDetails.totalRows : "NA"}
                  totalColumns={
                    datasetDetails ? datasetDetails.totalColumns : "NA"
                  }
                />
              </Box>
              <Box
                sx={{
                  mb: 2,
                  mx: "auto",
                  height: "8.5rem",
                  width: "22rem",
                  borderRadius: "10px",
                  cursor: "pointer",
                  backgroundImage: `url("/createDataModel/icon.png")`,
                  backgroundSize: "contain",
                  transition: "0.3s",
                  "&:hover": {
                    backgroundImage: `url("/createDataModel/blue_icon.png")`,
                    backgroundSize: "contain",
                  },
                }}
                onClick={() => {
                  navigate("/dashboard/ml-analytics/projects");
                }}
              ></Box>
            </Box>
          </Stack>
        </Grid>
        <Grid item xs={12} md={8}>
          <Box sx={{ ml: 1.5, mr: 3 }}>
            <OverviewTable
              totalRows={datasetDetails ? datasetDetails.totalRows : 0}
              totalColumns={datasetDetails ? datasetDetails.totalColumns : 0}
              columnDetails={
                datasetDetails ? datasetDetails.columnDetails : null
              }
            />
          </Box>
        </Grid>
      </Grid>
      <Box sx={{ m: 2.3 }}>
        <QueryResult data={queryResult} name={"Preview Result"} />
      </Box>
      <ToastMessage toastObject={toastObject} setToastObject={setToastObject} />
    </>
  );
}

export default Preview;
