import { useState, useCallback, useContext, useEffect } from "react";
import {
  Box,
  IconButton,
  Tab,
  Stack,
  TextField,
  CircularProgress,
  Button,
} from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import axios from "axios";
import SaveIcon from "@mui/icons-material/Save";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import LazyEditor from "./LazyEditor";
import { SessionContext } from "../../../../../contexts/SessionContext";

export default function Editor({
  databaseName,
  setQueryResults,
  query,
  setQuery,
  setToastObject,
  setSavedQueries,
  loading,
  setLoading,
}) {
  const [, , , tablesData] = useContext(SessionContext);

  const [value, setValue] = useState("2");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleSaveQuery = () => {
    const newSavedQueries = JSON.parse(
      localStorage.getItem("savedQueries") || "[]"
    );
    newSavedQueries.push({ id: newSavedQueries.length, value: query });
    localStorage.setItem("savedQueries", JSON.stringify(newSavedQueries));
    setSavedQueries(newSavedQueries);
  };

  const handleOnQueryRun = useCallback(async () => {
    setLoading(true);
    axios
      .post(`${process.env.REACT_APP_API_URL}/athena/execute`, {
        databaseName,
        query: query,
      })
      .then((res) => {
        if (res.data.success === true) {
          setQueryResults({
            rows: res.data.result.Items,
            table: res.data.result.tableName,
            metaData: res.data.result.metaData,
          });
          setToastObject((prevState) => ({
            ...prevState,
            message: "Query executed successfully",
            severity: "success",
            open: true,
          }));
        } else {
          setQueryResults({});
          setToastObject((prevState) => ({
            ...prevState,
            message: "Query execution failed! Please check your query.",
            severity: "error",
            open: true,
          }));
        }
        setLoading(false);
      })
      .catch((err) => {
        setQueryResults({});
        setToastObject((prevState) => ({
          ...prevState,
          message: "Query execution failed! Please check your query.",
          severity: "error",
          open: true,
        }));
        setLoading(false);
      });
  }, [query, tablesData]);

  return (
    <>
      <Box
        sx={{
          typography: "body1",
          bgcolor: "background.paper",
          m: 1,
          p: 1,
          border: "1px solid rgba(224, 224, 224, 1)",
          borderRadius: "10px",
          height: "410px",
        }}
      >
        {/* <Box sx={{ bgcolor: "background.paper", pt: 0.5, m: 1 }}>
          <Stack
            direction="row"
            justifyContent="flex-start"
            alignItems="center"
            spacing={1}
            sx={{ m: 1 }}
          >
            <TextField
              id="database-name"
              label="Database"
              variant="outlined"
              value={databaseName}
              disabled
              sx={{ width: "100%" }}
            />
            <IconButton
              color="primary"
              aria-label="save"
              onClick={handleSaveQuery}
            >
              <SaveIcon />
            </IconButton>
            <IconButton
              color="primary"
              aria-label="run"
              onClick={handleOnQueryRun}
            >
              <PlayArrowIcon />
            </IconButton>
          </Stack>
        </Box> */}
        <TabContext value={value} sx={{ padding: "20px" }}>
          <Box>
            <TabList onChange={handleChange} aria-label="editor-tabs">
              {/* <Tab label="English to SQL Query" value="1" /> */}
              <Tab label="SQL Query" value="2" />
            </TabList>
          </Box>
          {/* <TabPanel value="1" sx={{ padding: "20px", height: "300px" }}>
            <LazyEditor
              aria-label="nlp query editor input"
              mode="markdown"
              theme="tomorrow"
              name={"nlp"}
              fontSize={16}
              maxLines={15}
              minLines={15}
              width="100%"
              showPrintMargin={false}
              showGutter
              highlightActiveLine={false}
              placeholder={"Enter English SQL Query here"}
              editorProps={{ $blockScrolling: true }}
              setOptions={{
                enableBasicAutocompletion: false,
                enableLiveAutocompletion: false,
                enableSnippets: false,
              }}
              value={query}
              onChange={(newValue) => {
                setQuery(newValue);
              }}
              className={undefined}
              showLineNumbers
            />
          </TabPanel> */}
          <TabPanel value="2" sx={{ padding: "20px", height: "300px" }}>
            <LazyEditor
              aria-label="sql query editor input"
              mode="mysql"
              theme="tomorrow"
              name={"sql"}
              fontSize={16}
              maxLines={15}
              minLines={15}
              width="100%"
              showPrintMargin={false}
              showGutter
              highlightActiveLine={false}
              placeholder={"Enter SQL query here"}
              editorProps={{ $blockScrolling: true }}
              setOptions={{
                enableBasicAutocompletion: true,
                enableLiveAutocompletion: true,
                enableSnippets: true,
              }}
              value={query}
              onChange={(newQuery) => {
                setQuery(newQuery);
              }}
              className={undefined}
              showLineNumbers
            />
          </TabPanel>
        </TabContext>
        <Box
          sx={{
            display: "flex",
            justifyContent: "right",
          }}
        >
          <Button
            variant="contained"
            endIcon={<PlayArrowIcon />}
            onClick={handleOnQueryRun}
            aria-label="run"
            sx={{
              borderRadius: "4px",
              px: 2.5,
              py: 0.7,
            }}
          >
            Execute
          </Button>
        </Box>
      </Box>
    </>
  );
}
