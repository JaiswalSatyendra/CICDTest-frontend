import { useState, useEffect, useContext } from "react";
import {
  Grid,
  Box,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Tooltip,
  tooltipClasses,
} from "@mui/material";
import PageTitleWrapper from "../../../../components/PageTitleWrapper";
import PageHeader from "./PageHeader";
import SchemaList from "./SchemaList";
import Editor from "./Editor";
import QueryResult from "./QueryResult";
import { SessionContext } from "../../../../contexts/SessionContext";
import { getAthenaTables } from "../../../../utils/QueryEngine";
import SuspenseLoader from "../../../../components/SuspenseLoader";
import ToastMessage from "./ToastMessage";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import CsvDownload from "react-json-to-csv";
import styled from "@emotion/styled";
import { useTranslation } from "react-i18next";
import SaveDataset from "./SaveDataset";

function QueryEngine() {
  const [isLoaded, setIsLoaded] = useState(true);
  const [queryResultLoading, setQueryResultLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedTable, setSelectedTable] = useState("");
  const [queryResults, setQueryResults] = useState({});
  const [open, setOpen] = useState(false);
  const [datasetName, setDatasetName] = useState("");

  const [toastObject, setToastObject] = useState({
    message: "",
    severity: "",
    open: false,
  });
  const [session, , , tablesData, setTablesData] = useContext(SessionContext);
  const { user } = session;
  useEffect(() => {
    console.log("amittt");
    getAthenaTables(user._id)
      .then((data) => {
        setTablesData(data);
        setIsLoaded(true);
      })
      .catch((err) => {
        setIsLoaded(true);
      });
  }, []);

  // useEffect(() => {
  //   const savedQueries = JSON.parse(
  //     localStorage.getItem("savedQueries") || "[]"
  //   );
  //   setSavedQueries(savedQueries);
  // }, []);

  const handleDownloadQueryResult = () => {
    if (Object.keys(queryResults).length === 0) {
      setToastObject((prevState) => ({
        ...prevState,
        message: "No Querydata available.",
        severity: "error",
        open: true,
      }));
    }
  };

  const handleOpenDialog = (value) => {
    setOpen(value);
  };

  const handleDataSetName = (value) => {
    setDatasetName(value);
  };

  const { t } = useTranslation();

  const TooltipWrapper = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: theme.colors.alpha.trueWhite[100],
      color: theme.palette.getContrastText(theme.colors.alpha.trueWhite[100]),
      fontSize: theme.typography.pxToRem(12),
      fontWeight: "bold",
      borderRadius: theme.general.borderRadiusSm,
      boxShadow:
        "0 .2rem .8rem rgba(7,9,25,.18), 0 .08rem .15rem rgba(7,9,25,.15)",
    },
    [`& .${tooltipClasses.arrow}`]: {
      color: theme.colors.alpha.trueWhite[100],
    },
  }));
  return (
    <>
      <PageTitleWrapper>
        <PageHeader />
      </PageTitleWrapper>
      {isLoaded === true ? (
        <Grid container direction={{ xs: "column", md: "row" }}>
          <Grid item component="div" xs={12} sm={6}>
            <Box mx={1}>
              <FormControl sx={{ width: "70%", my: 0.8 }} size="small">
                <InputLabel id="demo-select-small">Select Dataset</InputLabel>
                <Select
                  labelId="demo-select-small"
                  id="demo-select-small"
                  label="Select Dataset"
                  defaultValue=""
                  onChange={(e) => {
                    setSelectedTable(e.target.value);
                  }}
                  sx={{
                    backgroundColor: "white",
                    borderRadius: "5px",
                  }}
                >
                  {Object.keys(tablesData).map((value) => (
                    <MenuItem value={value} key={value}>
                      {value}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Button
                variant="contained"
                sx={{ mx: 1, my: 0.8, py: 0.6, borderRadius: "5px" }}
                onClick={() => {
                  handleOpenDialog(true);
                }}
              >
                Save
              </Button>
              <TooltipWrapper
                title={t("Download Query Results")}
                arrow
                placement="top"
              >
                <Button
                  variant="contained"
                  sx={{ mx: 1, my: 0.8, py: 0.6, borderRadius: "5px" }}
                  onClick={handleDownloadQueryResult}
                >
                  <CsvDownload
                    data={queryResults.rows}
                    filename="Query_data.csv"
                  >
                    <FileDownloadIcon />
                  </CsvDownload>
                </Button>
              </TooltipWrapper>
              <SaveDataset
                open={open}
                handleOpenDialog={handleOpenDialog}
                handleDataSetName={handleDataSetName}
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={8}>
            <Editor
              databaseName={user._id}
              selectedTable={selectedTable}
             
              setQueryResults={setQueryResults}
              query={query}
              setQuery={setQuery}
              setToastObject={setToastObject}
              // setSavedQueries={setSavedQueries}
              loading={queryResultLoading}
              setLoading={setQueryResultLoading}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <SchemaList
             
              schema={
                tablesData[selectedTable]
                  ? tablesData[selectedTable].metaData.columns
                  : []
              }
            />
          </Grid>
          <Grid item xs={12}>
            <QueryResult data={queryResults} name={"Query Result"} />
          </Grid>
        </Grid>
      ) : (
        <SuspenseLoader />
      )}
      <ToastMessage toastObject={toastObject} setToastObject={setToastObject} />
      {queryResultLoading && <SuspenseLoader />}
    </>
  );
}

export default QueryEngine;
