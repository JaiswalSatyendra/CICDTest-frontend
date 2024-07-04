import { Box, CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import Chart from 'react-apexcharts';
function ImpactChart(props) {
  const [heatMapDataForResult, setHeatMapDataForResult] = useState({
    chartSeries: [],
    labels: []
  });

  const [lineDataForCross, setlineDataForCross] = useState({
    chartSeries: [],
    labels: []
  });

  const [lineDataForRfm, setlineDataForRfm] = useState({
    chartSeries: [],
    labels: []
  });
  const [showLoderCoRelation, setshowLoderCoRelation] = useState(false);

  const chartOption = {
    chart: {
      height: 450,
      type: 'heatmap',
    },
    plotOptions: {
      heatmap: {
        shadeIntensity: 0.5,

        radius: 0,
        useFillColorAsStroke: true,
        colorScale: {
          inverse: true,
          ranges: [{
            from: -1.000000000000000000,
            to: 0.000000000000000000,
            name: '-1-(0)',
            color: '#F3B415'
          },
          {
            from: 0.000000000000000001,
            to: 1.000000000000000000,
            name: '0.00001-1',
            color: '#F27036'
          }
          ]
        }
      }
    },
    dataLabels: {
      enabled: false
    },

    xaxis: {
      type: 'category',
      categories: heatMapDataForResult.labels,
    },

    title: {
      text: 'Correlation Matrix'
    },
    grid: {
      padding: {
        right: 20
      }
    }
  }

  const chartOptions2 = {
    chart: {

      type: 'bar',
      height: 350
    },
    plotOptions: {
      bar: {
        columnWidth: '50%',
        borderRadius: 4,
        horizontal: false,
      }
    },
    dataLabels: {
      enabled: false
    },
    xaxis: {
      categories: lineDataForCross.labels,
      position: 'bottom',
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      },
      crosshairs: {
        fill: {
          type: 'gradient',
          gradient: {
            colorFrom: '#D8E3F0',
            colorTo: '#BED1E6',
            stops: [0, 100],
            opacityFrom: 0.4,
            opacityTo: 0.5,
          }
        }
      },
      tooltip: {
        enabled: true,
      }
    },
    yaxis: {
      title: {
        text: undefined
      },
      labels: {
        // formatter: function (val) {
        //   return parseInt(val) + "%"
        // }
      }
    }
  }


  const chartOptions1 = {
    chart: {
      type: 'bar',
      height: 350,
      stacked: true,
      stackType: "100%"
    },
    plotOptions: {
      bar: {
        columnWidth: '50%',
        borderRadius: 4,
        horizontal: false,
      }
    },
    dataLabels: {
      enabled: false,

      offsetY: 0,
      style: {
        fontSize: '12px',
        colors: ["#fff"]
      }
    },
    xaxis: {

      categories: lineDataForRfm.labels,
      position: 'bottom',
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      },
      crosshairs: {
        fill: {
          type: 'gradient',
          gradient: {
            colorFrom: '#D8E3F0',
            colorTo: '#BED1E6',
            stops: [0, 100],
            opacityFrom: 0.4,
            opacityTo: 0.5,
          }
        }
      },
      tooltip: {
        enabled: true,
      }
    },
    yaxis: {
      show: false,
      title: {
        text: undefined
      },
      labels: {
        formatter: function (val) {
          return val.toFixed(1)
        }
      }
    }
  }

  useEffect(() => {
    if (props.imgDetails !== "" && props.imgDetails !== undefined && props.modelName !== "cross_sell" && props.modelName !== "rfm") {
      // setshowLoderCoRelation(true)
      setTimeout(() => {
        setHeatMapDataForResult({
          chartSeries: props.imgDetails,
          labels: props.imgDetails.map(ele => ele.name)
        })
        // setshowLoderCoRelation(false)
      }, 200);

    } else if (props.imgDetails !== "" && props.imgDetails !== undefined && props.modelName === "cross_sell") {
      // setshowLoderCoRelation(true)
      setTimeout(() => {
        let newList = [];
        newList.push({ data: props.imgDetails.map(o => parseInt(o.count)) })
        setlineDataForCross({
          chartSeries: newList,
          labels: props.imgDetails.map(ele => ele.item)
        })
        // setshowLoderCoRelation(false)
      }, 200);
    }
    else if (props.imgDetails !== "" && props.imgDetails !== undefined && props.modelName === "rfm") {
      // setshowLoderCoRelation(true)
      setTimeout(() => {
        let seriesData1 = [];
        props.imgDetails.forEach(ele => {
          seriesData1.push({
            "name": ele.name,
            "data": ele.data.map(o => o[1])
          })
          // setshowLoderCoRelation(false)
        })
        setlineDataForRfm({
          chartSeries: seriesData1,
          labels: ["Recency", "Frequency", "Money"],
        })
      }, 200);
    } else {
    }
  }, [props]);


  // const [imgUrlData, setUrlForImg] = useState({imgUrl:"",imgDiscription:""});

  // useEffect(() => {
  //    setUrlForImg();
  // }, [imgUrlData]);

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


      {props.modelName !== undefined && props.modelName !== "cross_sell" && props.modelName !== "rfm" &&
        <div id="chart">
          <br/>
          {/* <div style={{ "height": "85vh", "textAlign": "center" }}>
          {showLoderCoRelation &&
            <CircularProgress size={48}/>

          }
          {!showLoderCoRelation && */}
            <ReactApexChart options={chartOption} series={heatMapDataForResult.chartSeries} type="heatmap" height={630} width={650} />
          {/* }
        </div>*/}
        </div> 
      }
      {
        props.modelName === "cross_sell" &&
        <div id="chart">
          {/* {showLoderCoRelation &&
            <CircularProgress />

          }
          {!showLoderCoRelation && */}
            <Chart
              height={500}
              width={550}
              options={chartOptions2}
              series={lineDataForCross.chartSeries}
              type="bar"
            />
          {/* } */}
        </div>
      }

      {
        props.modelName === "rfm" &&
        <div id="chart">
          {/* {showLoderCoRelation &&
            <CircularProgress />

          }
          {!showLoderCoRelation && */}
            <Chart
              height={500}
              width={550}
              options={chartOptions1}
              series={lineDataForRfm.chartSeries}
              type="bar"
            />
          {/* } */}
        </div>
      }





      {/* <img
        src={props.imgDetails==undefined?'':props.imgDetails}
        alt="ImpactChart"
        style={{ height: 600, width: 600 }}
      /> */}
    </Box >
  );
}

export default ImpactChart;
