import React from "react";

import Chart from "react-apexcharts";
import { useContext, useEffect, useState } from "react";
import { Button, linearProgressClasses, Stack } from "@mui/material";
import { set } from "nprogress";
function CustomChart(customchartData) {
  const [customChartType, setcustomChartType] = useState("bar");

  const [options, setOptions] = useState({
    chart: {},
    plotOptions: {
      bar: {
        borderRadius: 4,
        borderRadiusApplication: "end",
        horizontal: true,
      },
    },
    xaxis: {
      categories: [],
    },
  });

  const [series, setSeries] = useState([
    {
      name: "series-1",
      data: [],
    },
  ]);

  useEffect(() => {
    if (
      customchartData.customchartData != undefined &&
      customchartData.customchartData != null
    ) {
      setOptions({
        ...options,
        xaxis: {
          ...options.xaxis,
          categories: customchartData.customchartData.xaxis.categories,
        },
      });
      setSeries([
        {
          name: "series-1",
          data: customchartData.customchartData.series[0].data,
        },
      ]);
    }
  }, [customchartData]);
  return (
    <>
      <Stack spacing={1} direction="row">
        <Button
          color="primary"
          variant={customChartType == "bar" ? "contained" : "outlined"}
          size="small"
          onClick={() => setcustomChartType("bar")}
        >
          <i className="fa fa fa-bar-chart mr-1" /> Bar
        </Button>
        <Button
          disabled={true}
          color="primary"
          variant={customChartType == "line" ? "contained" : "outlined"}
          size="small"
          onClick={() => setcustomChartType("line")}
        >
          <i className="fa  fa-line-chart mr-1" /> Line
        </Button>
      </Stack>

      {customChartType == "bar" ? (
        <Chart options={options} series={series} type="bar" height={300} />
      ) : null}
      {/* {customChartType == "line" ? (
        <Chart options={options} series={series} type="line" height={300} />
      ) : null} */}
    </>
  );
}

export default CustomChart;
