import { BurstModeTwoTone } from "@mui/icons-material";
import {
  Box,
  Typography,
  Divider,
  List,
  Alert,
  LinearProgress,
  ListItem,
  ListItemText,
  Button,
  Grid,
} from "@mui/material";
import { useEffect, useState } from "react";
import ProgressStepsData from "../../Progressbar/ProgressStepsData";
import { useNavigate } from "react-router-dom";

function LinearProgressWithLabel(props) {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ width: "100%", mr: 3, ml: 4 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">
          {`${Math.round(props.value)}%`}
        </Typography>
      </Box>
    </Box>
  );
}

function ProgressSection({ files, uploading, uploaded, progress, handleOpen }) {
  const [show, setShow] = useState(false);
  let navigate = useNavigate();
  useEffect(() => {
    if (files.length > 0 && uploaded) {
      setInterval(() => {
        setShow(true);
      }, 3000);
    }
  });
  return (
    <>
      {files.length > 0 && uploading && !show && (
        <Grid item xs={12}>
          <Box p={2}>
            <LinearProgressWithLabel value={progress} />
            {/* <Divider /> */}
            <Box p={2}>
              <Alert
                sx={{
                  py: 0,
                }}
                severity="warning"
              >
                {"Uploading in progress. Don't leave this window."}
              </Alert>
            </Box>
          </Box>
        </Grid>
      )}
      {files.length > 0 && uploaded && !show && (
        <>
          {/* <Divider /> */}
          <Grid item xs={12} p={2}>
            <Box p={2}>
              <Alert
                sx={{
                  py: 0,
                }}
                severity="success"
              >
                {/* {"You have uploaded"} <b>{files.length}</b> {"files"}! */}
                Data Source Created Successfully!
              </Alert>
              <List
                disablePadding
                sx={{
                  mt: 2,
                }}
                component="div"
              >
                {files.map((file) => (
                  <ListItem key={file.name}>
                    <ListItemText primary={file.name} />
                  </ListItem>
                ))}
              </List>
            </Box>
          </Grid>
        </>
      )}
      {show ? (
        <>
          <Grid
            container
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              pt: 4,
            }}
          >
            <ProgressStepsData />
          </Grid>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
            }}
          >
            <Button
              variant="contained"
              sx={{ m: 1, py: 0.7, borderRadius: 0.5 }}
              onClick={() => {
                handleOpen(false);
              }}
            >
              Skip
            </Button>
            <Button
              variant="contained"
              sx={{ m: 1, py: 0.7, borderRadius: 0.5 }}
              onClick={() => {
                handleOpen(false);
                navigate("/dashboard/datasets");
              }}
            >
              Check Dataset Status
            </Button>
          </Box>
        </>
      ) : (
        ""
      )}
    </>
  );
}

export default ProgressSection;
