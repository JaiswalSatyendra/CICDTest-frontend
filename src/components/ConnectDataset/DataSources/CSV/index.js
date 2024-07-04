import { useState } from "react";
import { Grid, Alert, AlertTitle } from "@mui/material";
import Description from "./Description";
import Action from "./Action";

function CSV({ updateConnectorDetails, updateFiles }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [response, setResponse] = useState(null);
  const loadingResponse = (response) => {
    setIsLoaded(true);
    setResponse(response);
  };
  return (
    <Grid container direction="row" alignItems="stretch">
      <Grid item xs={12} md={3} sx={{ m: 1 }}>
        <Description />
        {isLoaded && response && response.data.success === true && (
          <Alert severity="success">
            <AlertTitle>Success</AlertTitle>
            Dataset has been successfully connected.
          </Alert>
        )}
        {isLoaded && response && response.data.success === false && (
          <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            Error while connecting dataset.
          </Alert>
        )}
      </Grid>
      <Grid item xs={12} md={8} sx={{ m: 1 }}>
        <Action
          loadingResponse={loadingResponse}
          updateConnectorDetails={updateConnectorDetails}
          updateFiles={updateFiles}
        />
      </Grid>
    </Grid>
  );
}

export default CSV;
