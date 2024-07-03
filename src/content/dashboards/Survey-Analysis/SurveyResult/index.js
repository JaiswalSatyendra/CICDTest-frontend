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
  Paper
} from '@mui/material';
import Chart from 'react-apexcharts';
import PageTitleWrapper from "../../../../components/PageTitleWrapper";
import PageHeader from "./PageHeader";
import SupersetForm from "./SupersetForm";
import SupersetTable from "./SupersetTable";
import { SessionContext } from "../../../../contexts/SessionContext";
import { useTranslation } from "react-i18next";


function VisualizeData() {
  const [datasets, setDatasets] = useState([]);
  const [supersetData, setSupersetData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [session, , , ,] = useContext(SessionContext);
  const { user } = session;

  const theme = useTheme();
  const { t } = useTranslation();

  const [lineDataForRelationshipM1, setLineDataForRelationshipM1] = useState({
    chartSeries: []
  });
  const [lineDataForRelationshipM2, setLineDataForRelationshipM2] = useState({
    chartSeries: [],
    labels: []
  });

  const chartOptions1 = {
    chart: {
      type: 'bar',
      height: 350,
      stacked: true,
      stackType: "100%"
    },
    plotOptions: {
      bar: {
        columnWidth: '20%',
        borderRadius: 4,
        horizontal: false,
      }
    },
    dataLabels: {
      enabled: true,
      formatter: function (val) {
        if(val>5){
        return val + "%";
        }
      },
      offsetY: 0,
      style: {
        fontSize: '12px',
        colors: ["#fff"]
      }
    },
    xaxis: {
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
  const chartOptions2 = {
    chart: {
      type: 'bar',
      height: 350
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
        horizontal: false,
      }
    },
    dataLabels: {
      enabled: false
    },
    xaxis: {
      
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

  let seriesData1 = [];
  seriesData1.push({
    name: 'Agree',
    data: num.survey_result.map((o) => ({o,x:o.type,y:(o.agree * 100).toFixed(2)}))
  },{
    name: 'Disagree',
    data: num.survey_result.map((o) => ({o,x:o.type,y:(o.disagree * 100).toFixed(2)}))
  },{
    name: 'Stongly agree',
    data: num.survey_result.map((o) => ({o,x:o.type,y:(o.strongly_agree * 100).toFixed(2)}))
  },{
    name: 'Strongly Disagree',
    data: num.survey_result.map((o) => ({o,x:o.type,y:(o.strongly_disagree * 100).toFixed(2)}))
  },{
    name: 'Niether agree nor disagree',
    data: num.survey_result.map((o) => ({o,x:o.type,y:(o.niether_agree_nor_disagree * 100).toFixed(2)})) 
    })

  await setLineDataForRelationshipM1({
    chartSeries: seriesData1
  })
  
  let seriesData = [];
  seriesData.push({
    name: 'Consumer',
    data: num.store.map((o) => ({o,x:o.store,y:(o.consumer * 100).toFixed(2)}))
  },{
    name: 'Professional',
    data: num.store.map((o) => ({o,x:o.store,y:(o.professional * 100).toFixed(2)}))
  })
  await setLineDataForRelationshipM2({
    chartSeries: seriesData
  })
    
  };

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/dataset/list`, {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((res) => {
        setDatasets(res.data);
      })
      .catch((error) => {
        console.log(error);
        setDatasets([]);
      })
      .finally(() => {
        setIsLoaded(true);
      });
    fetch(`${process.env.REACT_APP_API_URL}/superset/list`, {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((res) => {
        let filterData = res.data.filter(ele=>ele.type==="surveyresult")
        setSupersetData(filterData);
        setColumns(res.columns);
      })
      .catch((error) => {
        setSupersetData([]);
        setColumns([]);
      })
      .finally(() => {
        setIsLoaded(true);
      });
  }, [user]);

  return (
    <>
      <PageTitleWrapper>
        <PageHeader />
      </PageTitleWrapper>
      {isLoaded && (
        <Grid container direction={{ xs: "column", md: "row" }} spacing={2}>
          <Grid item xs={12}>
            <SupersetForm
              datasets={datasets}
              updateSupersetData={setSupersetData}
              updateColumns={setColumns}
              setResultDataForGraph={updateGraphData}
            />
          </Grid>

          <Grid item xs={12} sx={{
            mx: 3,
          }}>
            <Card>
              <CardHeader title={t('Survey Result for EXCELLENT_REPUTATION')} />
              <Divider />
              <CardContent>
                <Chart
                  height={328}
                  options={chartOptions1}
                  series={lineDataForRelationshipM1.chartSeries}
                  type="bar"
                />
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sx={{
            mx: 3,
          }}>
            <Card>
              <CardHeader title={t('Store Considration for Minwax')} />
              <Divider />
              <CardContent>
                <Chart
                  height={328}
                  options={chartOptions2}
                  series={lineDataForRelationshipM2.chartSeries}
                  type="bar"
                />
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12}>
            {/* <SupersetTable projects={supersetData} columns={columns} /> */}
          </Grid>
        </Grid>
      )}
    </>
  );
}

export default VisualizeData;
