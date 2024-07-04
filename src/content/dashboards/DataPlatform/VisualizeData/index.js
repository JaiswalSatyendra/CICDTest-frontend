import { useState, useEffect, useContext } from "react";
import { Grid } from "@mui/material";
import PageTitleWrapper from "../../../../components/PageTitleWrapper";
import PageHeader from "./PageHeader";
import SupersetForm from "./SupersetForm";
import SupersetTable from "./SupersetTable";
import { SessionContext } from "../../../../contexts/SessionContext";

function VisualizeData() {
  const [datasets, setDatasets] = useState([]);
  const [supersetData, setSupersetData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [session, , , ,] = useContext(SessionContext);
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
        console.log(error);
        setDatasets([]);
      })
      .finally(() => {
        setIsLoaded(true);
      });
    fetch(`${process.env.REACT_APP_API_URL}/superset/list`, {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((res) => {
        let filterData = res.data.filter(ele=>ele.type==="simpledata")
        setSupersetData(filterData);
        setColumns(res.columns);
      })
      .catch((error) => {
        setSupersetData([]);
        setColumns([]);
      })
      .finally(() => {
        setIsLoaded(true);
      });
  }, [user]);
  return (
    <>
      <PageTitleWrapper>
        <PageHeader />
      </PageTitleWrapper>
      {isLoaded && (
        <Grid container direction={{ xs: "column", md: "row" }} spacing={2}>
          <Grid item xs={12}>
            <SupersetForm
              datasets={datasets}
              updateSupersetData={setSupersetData}
              updateColumns={setColumns}
            />
          </Grid>
          <Grid item xs={12}>
            <SupersetTable projects={supersetData} columns={columns} />
          </Grid>
        </Grid>
      )}
    </>
  );
}

export default VisualizeData;
