import { Box } from "@mui/material";
import React from "react";

function ImpactChart() {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      style={{
        width: "100%",
        height: "100%",
      }}
    >
      <img
        src="/images/ImpactChart.png"
        alt="ImpactChart"
        style={{ height: 600, width: 600 }}
      />
    </Box>
  );
}

export default ImpactChart;
