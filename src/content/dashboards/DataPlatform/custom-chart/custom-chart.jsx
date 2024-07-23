import React from "react";

import Chart from "react-apexcharts";
import { useContext, useEffect, useState } from "react";
import { Button, linearProgressClasses, Stack } from "@mui/material";
import { set } from "nprogress";
function CustomChart(customchartData) {
  const [customChartType, setcustomChartType] = useState("bar");    

  const [customChartOption1, setcustomChartOption1] = useState({ 
    series: [{
      data:[]
  } 
  ],
    options: {
      chart: {
      type: "bar",
      height: 350
    }, 
      plotOptions: {}, 
      dataLabels: {},
      xaxis: { 
        categories: []
      }
    },  
  });

  
  useEffect(() => {    
  let seriestemp={...customChartOption1};
  seriestemp.series=customchartData.customchartData.series;
  seriestemp.options.plotOptions=customchartData.customchartData.plotOptions;
  seriestemp.options.dataLabels=customchartData.customchartData.dataLabels;
  seriestemp.options.xaxis=customchartData.customchartData.xaxis;
 

  setcustomChartOption1(
    seriestemp
  )
   
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
          color="primary"
          variant={customChartType == "line" ? "contained" : "outlined"}
          size="small"
          onClick={() => setcustomChartType("line")}
        >
          <i className="fa  fa-line-chart mr-1" /> Line
        </Button> 
      </Stack> 
    

     {customChartType=="bar" ? (   
     <Chart options={customChartOption1.options} series={customChartOption1.series} type={customChartOption1.options.chart.type}  height={300} /> ): null }
    {/* { customChartType=="line" ? (<Chart  id='chart2' options={customChartOption} series={customChartseries} type={'line'} height={300} />): null }     */}
    </>
  );
}

export default CustomChart;
