import { useState } from "react";
import {
  TextareaAutosize,
  Button,
  Box,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useParams } from "react-router-dom";
import Axios from "axios";
function SQLEditor() {
  const [sql, setSql] = useState("");
  const [result, setResult] = useState("");
  const { databaseName, tableName } = useParams();

  const executeQuery = () => {
    setResult("Loading ...");
    Axios.post(`${process.env.REACT_APP_API_URL}/athena/execute/`, {
      databaseName: databaseName,
      query: sql,
    }).then((response) => {
      console.log(response);
      //   json stringify
      setResult(JSON.stringify(response.data.result.Items, null, 2));
    });
  };

  return (
    <Grid container spacing={3} sx={{ m: 3 }}>
      <Grid item xs={12}>
        <Box>
          <TextField
            disabled
            id="database-name"
            label="Database"
            defaultValue={databaseName}
          />
          <TextField
            disabled
            id="table-name"
            label="Table"
            defaultValue={tableName}
          />
        </Box>
      </Grid>
      <Grid item xs={12}>
        <TextareaAutosize
          aria-label="empty textarea"
          placeholder="Enter sql query here"
          minRows={15}
          style={{ width: "70vw" }}
          onChange={(e) => setSql(e.target.value)}
        />
      </Grid>
      <Grid item xs={12}>
        <Button
          variant="contained"
          endIcon={<SendIcon />}
          onClick={executeQuery}
        >
          Execute
        </Button>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h6">Output</Typography>
        <TextareaAutosize
          aria-label="empty output"
          minRows={15}
          style={{ width: "70vw" }}
          value={result}
        />
      </Grid>
    </Grid>
  );
}

export default SQLEditor;
