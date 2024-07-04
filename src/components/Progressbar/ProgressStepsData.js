import { Box, Grid, Typography } from "@mui/material";
import React from "react";

function ProgressStepsData() {
  const stepsData = [
    {
      title: "Data Transfer Initiated",
      status: "Done",
      color: "#3ab97b",
    },
    {
      title: "Data Transfer Completed",
      status: "",
      color: "red",
    },
    {
      title: "Data Validation",
      status: "",
      color: "red",
    },
    {
      title: "Feature Engineering",
      status: "",
      color: "red",
    },
  ];
  return (
    <>
      {stepsData.map((item) => (
        <Grid item xs={12} sm={6} md={3}>
          <Box style={{ height: "4rem" }} sx={{ p: 1 }} key={item.title}>
            <Box
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                height: "50%",
              }}
            >
              <Typography sx={{ color: "black", fontSize: "14px" }}>
                {item.title}
              </Typography>
              <Typography sx={{ color: "#3ab97b", fontSize: "12px" }}>
                {item.status}
              </Typography>
            </Box>
            <Box
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "50%",
              }}
            >
              <Box
                style={{
                  height: "0.5rem",
                  backgroundColor: item.color,
                  width: "100%",
                  borderRadius: "25px",
                }}
              ></Box>
            </Box>
          </Box>
        </Grid>
      ))}
    </>
  );
}

export default ProgressStepsData;
