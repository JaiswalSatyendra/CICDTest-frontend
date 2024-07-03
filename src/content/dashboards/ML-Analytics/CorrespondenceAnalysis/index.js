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
  InputLabel,
  MenuItem,
  FormControl, Select, CircularProgress, OutlinedInput, Button
} from '@mui/material';
import Chart from 'react-apexcharts';
import PageTitleWrapper from "../../../../components/PageTitleWrapper";
import PageHeader from "./PageHeader";
import SupersetForm from "./SupersetForm";
import SupersetTable from "./SupersetTable";
import { SessionContext } from "../../../../contexts/SessionContext";
import { useTranslation } from 'react-i18next';
import axios from "axios";
import Multiselect from 'multiselect-react-dropdown';


let selectedBrand = [];
let selectedType = [];
let question = ['KNOW_A_LOT', 'COMFORTABLE', 'LIKE_BRAND', 'ACTIVE_ON_MEDIA', 'EXCELLENT_REPUTATION', 'INNOVATOR', 'DIFFERENT_FROM_OTHER_BRANDS', 'MAKE_LIFE_EASIER', 'CONSISTENT_PERFORMANCE']
let filterList = []

function CorrespondenceAnalysis({ setResultDataForRm, itemBrand2 }) {
  // const [datasets, setDatasets] = useState([]);
  // const [supersetData, setSupersetData] = useState([]);
  // const [columns, setColumns] = useState([]);
  // const [isLoaded, setIsLoaded] = useState(false);
  const [session, , , ,] = useContext(SessionContext);
  const { user } = session;
  const [selectedDataset, setselectedDataset1] = useState({});


  const [brandData, setbrandData] = useState([]);
  const [typeData, settypeData] = useState([]);
  const [showLoder, setLoaderShow] = useState(false);
  const [itemBrand, setItemBrand] = useState([]);

  const [scatDataForCu, setscatDataForCu] = useState({
    series: []
  });
  // var aaa = ["consumer", "professional"]
  const [filterTypeList, setfilterTypeList] = useState([]);
  const [item, setItem] = useState([{ displayName: "Consumer", value: "consumer" }, { displayName: "Professional", value: "professional" }]);

  const theme = useTheme();
  const { t } = useTranslation();


  const chartOptions2 = {
    chart: {
      height: 350,
      type: 'scatter',
      zoom: {
        enabled: false,
        type: 'xy'
      },
      
    },
    dataLabels: {
      enabled: true,
      formatter: function (val, { series, seriesIndex, dataPointIndex, w }) {
        return (w.config.series[seriesIndex].data[dataPointIndex].label)
      },
      textAnchor: 'middle',
      offsetX: 0,
      offsetY: 10,
      background: {
        enabled: false
      }
    },
    colors: [function ({ value, seriesIndex, w }) {
      return scatDataForCu.series.map((o) => o.color)
    }],
    grid: {
      show: false,
    },
    xaxis: {
      tickAmount: 10,
      position: 'top',
      axisBorder: {
        show: true,
        borderType: 'dotted',
        offsetX: 0,
        offsetY: 130
      },
      labels: {
        show: false,
        offsetX: 100,
        offsetY: 100,
        formatter: function (val) {
          return val.toFixed(4)
        }
      },
      crosshairs: {
        show: false,
      },
      tooltip: {
        enabled: false,
      },
    },

    yaxis: {
      tickAmount: 7,
      axisBorder: {
        show: true,
        offsetX: 100,
        offsetY: 0,
        dashArray: 2,
        stroke: {
          color: '#b6b6b6',
          width: 4,
          dashArray: 2,
        }
      },
      labels: {
        show: false,
        offsetX: 400,
        offsetY: 0,
        formatter: function (val) {
          return val.toFixed(2)
        }
      },
      crosshairs: {
        show: false,
      },

    },

    tooltip: {
      show: false,

      custom: function ({ series, seriesIndex, dataPointIndex, w }) {
        return (
          '<div class="arrow_box py-2 px-2 bg-black text-white">' +
          "<span>Caption: " +
          w.config.series[seriesIndex].data[dataPointIndex].label +
          "</span><br/>" +
          "<span>Type: " +
          w.config.series[seriesIndex].name +
          "</span><br/>" +
          "<span>Average of x: " +
          w.config.series[seriesIndex].data[dataPointIndex].x.toFixed(4) +
          "</span><br/>" +
          "<span>Average of y: " +
          series[seriesIndex][dataPointIndex].toFixed(4) +
          "</span>" +
          "</div>"
        );
      }
    },
  };

  const updateGraphData = async num => {
    let colorList = ['#900000', '#40826d']
    await setscatDataForCu({
      series: num.map((o, ind) => ({ ...o, color: colorList[ind] }))
    })
  };

 const onSelect = (event) => {
    filterList = event
    // handleClose()
  }
  const onRemove = (event) => {
    filterList = event
    // handleClose()

  }

  useEffect(() => {
    if (setResultDataForRm) {
      setselectedDataset1(setResultDataForRm)
    }
  }, [setResultDataForRm]);

  useEffect(() => {
    if(selectedDataset.analysisName!=undefined){
    handleClose();
    setItemBrand(itemBrand2)
    }
  }, [selectedDataset])


  const handleClose = () => {
    if (selectedDataset.analysisName!==undefined && selectedDataset.analysisName.indexOf("trustmatrix") != -1) {
    let newBodyObj = {
      "analysis": "ca",
      "schema": user._id,
      "project": selectedDataset.projectid,
      "table": selectedDataset.tablename,
      "filter": {
        "brand": [],
        "type": filterList.map(ele => ele.value)
      }
    }
    setLoaderShow(true)
    axios
      .post("https://alb2qwvg6e.execute-api.us-east-1.amazonaws.com/api/data", newBodyObj)
      .then((data) => {
        updateGraphData(data.data.data);
        setLoaderShow(false)
      })
      .catch((err) => {
        console.log(err);
        setscatDataForCu({ series: []});
        setLoaderShow(false)
      });
    }
    else {
      setscatDataForCu({ series: []});
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
              setSelectedDataset1={setselectedDataset1}
            />
          </Grid> */}
          {/* <Grid item xs={12}> */}

          <Grid item xs={12} sx={{
            mx: 3,
          }}>

            <Card>
              <CardHeader title={t('Correspondance Analysis')}
                action={
                  <Box component="span" className={`${selectedDataset.projectid === "" ? "hidden" : "flex"
                    }`}>

                    <Multiselect
                      options={item} // Options to display in the dropdown
                      selectedValues={filterTypeList} // Preselected value to persist in dropdown
                      onSelect={onSelect} // Function will trigger on select event
                      onRemove={onRemove}
                      placeholder="Type"
                      displayValue="displayName" // Property name to display in the dropdown options
                    />
                  <Button
                    sx={{
                      mt: 0,
                    }}
                    color="primary"
                    size="medium"
                    variant="contained"
                    onClick={handleClose}
                  // startIcon={<AddIcon />}
                  >
                    {t("Filter")}
                  </Button>

                  </Box>
                } />

              <Divider />
              <CardContent>
              <div style={{"height" : "50vh","textAlign":"center"}}>
                  {showLoder &&
                    <CircularProgress />

                  }
                  {!showLoder &&
                    <Chart
                    height={350}
                    background="#e0e0e0"
                      options={chartOptions2}
                      series={scatDataForCu.series}
                      type="scatter"
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

export default CorrespondenceAnalysis;
