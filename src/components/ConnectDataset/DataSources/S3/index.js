import { useState } from "react";
import { Grid, Alert, AlertTitle } from "@mui/material";
import Description from "./Description";
import Action from "./Action";
import HorizontalLoading from "../../../Progressbar/HorizontalLoading";

function S3({ updateConnectorDetails }) {
  const [bucketName, setBucketName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [response, setResponse] = useState(null);

  const loadingStart = () => {
    setIsLoading(true);
  };

  const loadingEnd = () => {
    setIsLoading(false);
  };

  const loadingResponse = (response) => {
    setIsLoaded(true);
    setResponse(response);
  };

  return (
    <>
      <Grid container direction="row" alignItems="stretch">
        <Grid item xs={12} md={3} sx={{ m: 1 }}>
          <Description bucketName={bucketName} />
          {isLoading && <HorizontalLoading />}
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
            loadingStart={loadingStart}
            loadingEnd={loadingEnd}
            loadingResponse={loadingResponse}
            updateConnectorDetails={updateConnectorDetails}
            updateBucketName={setBucketName}
          />
        </Grid>
      </Grid>
    </>
  );
}

export default S3;
