import { Button, Dialog, DialogContent, Grid } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import ProgressStepsData from "../../../Progressbar/ProgressStepsData";
import { useNavigate } from "react-router-dom";

const ProgressStatus = ({ isopen, handleOpen }) => {
  let navigate = useNavigate();

  return (
    <>
      <Dialog
        fullWidth
        maxWidth="lg"
        open={isopen}
        onClose={() => {
          handleOpen(false);
        }}
      >
        <DialogContent>
          <Grid
            direction={{ xs: "column", sm: "row" }}
            sx={{
              border: "1px solid #c3c3c3",
            }}
          >
            <Grid
              container
              sx={{
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
          </Grid>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProgressStatus;
