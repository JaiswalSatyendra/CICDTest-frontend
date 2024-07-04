import { useState, useEffect, useContext } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Grid,
  Divider,
  Box,
  useTheme,
  styled,
  Paper,
  CircularProgress
} from '@mui/material';
import Chart from 'react-apexcharts';
// import { DataGrid } from "@mui/x-data-grid";

import PageTitleWrapper from "../../../../components/PageTitleWrapper";
import PageHeader from "./PageHeader";
import SupersetForm from "./SupersetForm";
import SupersetTable from "./SupersetTable";
import { SessionContext } from "../../../../contexts/SessionContext";
import { useTranslation } from "react-i18next";
import axios from "axios";

let filterList = []
function Demographic({ setResultDataForRm}) {
  const [datasets, setDatasets] = useState([]);
  const [supersetData, setSupersetData] = useState([]);

  const [filterGraphData1, setfilterGraphData] = useState({ "brand": [], "type": [], "age": [], "gender": [], "region": [] });


  const [pieDataForDemographics, setPieDataForDemographics] = useState({
    chartSeries: [],
    labels: []
  });
  const [pieDataForDemographics1, setPieDataForDemographics1] = useState({
    chartSeries: [],
    labels: []
  });

  const [lineDataForDemographics, setLineDataForDemographics] = useState({
    chartSeries: [],
    labels: []
  });

  const [selectedDataset, setselectedDataset1] = useState({});
  const [showLoder, setLoaderShow] = useState(false);
  const [columns, setColumns] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [session, , , ,] = useContext(SessionContext);
  const { user } = session;

  const theme = useTheme();
  const { t } = useTranslation();

  const chartOptions = {
    chart: {
      events: {
        dataPointSelection: function (event, chartContext, config) {
          let newFilterObj = { "brand": [], "type": [], "age": new Array(config.w.config.labels[config.dataPointIndex]), "gender": [], "region": [] }//{...filterGraphData}
          handleClose(newFilterObj)
        }
      },
      background: 'transparent',
      width: 400,
      stacked: false,
      toolbar: {
        show: false,

      }
    },
    plotOptions: {
      pie: {
        donut: {
          size: '45%'
        }
      }
    },
    colors: [
      theme.palette.primary.main,
      theme.palette.success.main,
      theme.palette.warning.main,
      theme.palette.info.main
    ],
    dataLabels: {
      enabled: true,
      formatter(val) {
        return `${val.toFixed(1)}%`;
      },
      dropShadow: {
        enabled: true,
        top: 1,
        left: 1,
        blur: 1,
        color: theme.colors.alpha.black[50],
        opacity: 0.5
      }
    },
    fill: {
      opacity: 1
    },
    labels: pieDataForDemographics.labels,
    legend: {
      position: 'bottom',
      offsetX: 0,
      offsetY: 0,
      labels: pieDataForDemographics.labels,
      show: true
    },
    stroke: {
      width: 0
    },
    theme: {
      mode: theme.palette.mode
    }
  };
  const chartOptions1 = {
    chart: {
      events: {
        dataPointSelection: function (event, chartContext, config) {
          let newFilterObj = { "brand": [], "type": [], "age": [], "gender": [], "region": new Array(config.w.config.labels[config.dataPointIndex]) }//{...filterGraphData}
          // setfilterGraphData(newFilterObj)
          handleClose(newFilterObj)
        }
      },
      background: 'transparent',
      width: 400,
      stacked: false,
      toolbar: {
        show: false
      }
    },
    plotOptions: {
      pie: {
        donut: {
          size: '45%'
        }
      }
    },
    colors: [
      theme.palette.primary.main,
      theme.palette.success.main,
      theme.palette.warning.main,
      theme.palette.info.main
    ],
    dataLabels: {
      enabled: true,
      formatter(val) {
        return `${val.toFixed(1)}%`;
      },
      dropShadow: {
        enabled: true,
        top: 1,
        left: 1,
        blur: 1,
        color: theme.colors.alpha.black[50],
        opacity: 0.5
      }
    },
    fill: {
      opacity: 1
    },
    labels: pieDataForDemographics1.labels,
    legend: {
      position: 'bottom',
      offsetX: 10,
      offsetY: 0,
      labels: pieDataForDemographics1.labels,
      show: true
    },
    stroke: {
      width: 0
    },
    theme: {
      mode: theme.palette.mode
    }
  };
  const chartOptions2 = {
    chart: {
      events: {
        dataPointSelection: function (event, chartContext, config) {
          let newAA = [];
          newAA.push(config.w.config.xaxis.categories[config.dataPointIndex]);
          let newFilterObj = { "brand": [], "type": [], "age": [], "gender": newAA, "region": [] }
          handleClose(newFilterObj)
        }
      },
      type: 'bar',
      height: 350
    },
    plotOptions: {
      bar: {
        columnWidth: '20%',
        borderRadius: 4,
        horizontal: false,
      }
    },
    dataLabels: {
      enabled: false
    },
    xaxis: {
      categories: lineDataForDemographics.labels,
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
        formatter: function (val) {
          return parseInt(val) + "%"
        }
      }
    }
  }


  const updateGraphData = async num => {
    // 👇️ take parameter passed from Child component
    console.log("=====");
    console.log(num);
    let newPie1 = (num.age.y.map((o) => (o * 100)))
    let newPie1x = num.age.x
    await setPieDataForDemographics({
      chartSeries: newPie1,
      labels: newPie1x
    })
    let newPie2 = (num.region.y.map((o) => (o * 100)))
    let newPie2x = num.region.x
    await setPieDataForDemographics1({
      chartSeries: newPie2,
      labels: newPie2x
    })


    let seriesData = [];
    seriesData.push({
      name: 'Gender',
      data: (num.gender.y.map((o) => (o * 100)))
    })
    await setLineDataForDemographics({
      chartSeries: seriesData,
      labels: (num.gender.x)
    })
  };


  useEffect(() => {
    console.log("Demographic");
    if (setResultDataForRm) {
      setselectedDataset1(setResultDataForRm)
    }
  }, [setResultDataForRm]);



  useEffect(() => {
    if(selectedDataset.analysisName!=undefined){
      handleClose(filterGraphData1);
    }
  }, [selectedDataset])




  const handleClose = async (filterGraphData) => {
    if (selectedDataset.analysisName!==undefined && selectedDataset.analysisName.indexOf("demographics") != -1) {
      let newBodyObj = {
        "analysis": "demographics",
        "schema": user._id,
        "project": selectedDataset.projectid,
        "table": selectedDataset.tablename,
        "filter": filterGraphData
      }
      setLoaderShow(true)
      await axios
        .post("https://alb2qwvg6e.execute-api.us-east-1.amazonaws.com/api/data", newBodyObj)
        .then((data) => {
          updateGraphData(data.data.data);
          setLoaderShow(false)
        })
        .catch((err) => {
          console.log(err);
          setPieDataForDemographics({
            chartSeries: [],
            labels: []
          })
          setPieDataForDemographics1({
            chartSeries: [],
            labels: []
          })
          setLineDataForDemographics({
            chartSeries: [],
            labels: []
          })
          setLoaderShow(false)
        });
    }

  };

  
  return (
    <>
      {/* <PageTitleWrapper>
        <PageHeader />
      </PageTitleWrapper> */}
      
        <Grid container direction={{ xs: "column", md: "row" }} spacing={2}>
          {/* <Grid item xs={12}>
            <SupersetForm
              datasets={datasets}
              updateSupersetData={setSupersetData}
              updateColumns={setColumns}
              setResultDataForGraph={updateGraphData}
            />
          </Grid> */}
          <Grid item xs={12} sx={{
            mx: 3,
          }}>

            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
              <Grid item xs={6}>
                <Card>
                  <CardHeader title={t('Age Group')} />
                  <Divider />
                  <CardContent>
                  <div style={{ "height": "50vh", "textAlign": "center" }}>
                    {showLoder &&
                      <CircularProgress />

                    }
                    {!showLoder &&
                      <Chart
                        height={328}
                        options={chartOptions}
                        series={pieDataForDemographics.chartSeries}
                        type="pie"
                      />
                    }
                    </div>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={6}>
                <Card>
                  <CardHeader title={t('Region')} />
                  <Divider />
                  <CardContent>
                  <div style={{ "height": "50vh", "textAlign": "center" }}>
                    {showLoder &&
                      <CircularProgress />

                    }
                    {!showLoder &&
                      <Chart
                        height={328}
                        options={chartOptions1}
                        series={pieDataForDemographics1.chartSeries}
                        type="pie"
                      />
                    }
                    </div>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>

          </Grid>

          <Grid item xs={12} sx={{
            mx: 3,
          }}>
            <Card>
              <CardHeader title={t('Gender')} />
              <Divider />
              <CardContent>
              <div style={{ "height": "50vh", "textAlign": "center" }}>
                {showLoder &&
                  <CircularProgress />

                }
                {!showLoder &&
                  <Chart
                    height={328}
                    options={chartOptions2}
                    series={lineDataForDemographics.chartSeries}
                    type="bar"
                  />
                }
                </div>
              </CardContent>
            </Card>

          </Grid>
        </Grid>
     
    </>
  );
}

export default Demographic;
