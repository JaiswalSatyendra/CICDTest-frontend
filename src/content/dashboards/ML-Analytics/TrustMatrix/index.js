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
  CircularProgress,
  Button
} from '@mui/material';
import Chart from 'react-apexcharts';
import PageTitleWrapper from "../../../../components/PageTitleWrapper";
import PageHeader from "./PageHeader";
import SupersetForm from "./SupersetForm";
import SupersetTable from "./SupersetTable";
import { SessionContext } from "../../../../contexts/SessionContext";
import { useTranslation } from "react-i18next";
import Multiselect from 'multiselect-react-dropdown';
import axios from "axios";

let filterTypeList = []
let filterBrandList = []

function TrustMatrix({ setResultDataForTrustMatrix, itemBrand2 }) {
  // const [datasets, setDatasets] = useState([]);
  // const [supersetData, setSupersetData] = useState([]);

  // const [resultDataForGraph, setResultDataForGraph] = useState([]);
  // const [resultFilterDataForGraph1, setResultFilterDataForGraph] = useState([]);
  // const [columns, setColumns] = useState([]);
  // const [isLoaded, setIsLoaded] = useState(false);
  const [session, , , ,] = useContext(SessionContext);
  const { user } = session;
  const [brandData, setbrandData] = useState([]);
  const [typeData, settypeData] = useState([]);


  const [scatDataForCu, setscatDataForTrust] = useState({
    series: [],
    showLoder: false,
  });
  const [itemType, setItemType] = useState([{ displayName: "Consumer", value: "consumer" }, { displayName: "Professional", value: "professional" }]);
  const [itemBrand, setItemBrand] = useState([]);
  const [selectedDataset, setselectedDataset1] = useState({});

  const theme = useTheme();
  const { t } = useTranslation();

  const chartOptions2 = {
    chart: {
      height: 350,
      type: 'scatter',
      zoom: {
        enabled: false,
        type: 'xy'
      }
    },
    plotOptions: {
      scatter: {
        maxItems: 100,
        hideOverflowingLabels: true,
      }
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
      title: {
        text: 'Preference Drivers',
        align: 'left',
        margin: 0,
        offsetX: 0,
        offsetY: 100,
      },
      tickAmount: 10,
      position: 'bottom',
      axisBorder: {
        show: true,
        offsetX: 0,
        offsetY: -100,
        dashArray: 2,
        stroke: {
          coloupr: '#b6b6b6',
          width: 4,
          dashArray: 2,
        }
      },
      labels: {
        show: false,
        offsetX: 100,
        offsetY: 0,
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
      title: {
        text: 'Trust Drivers',
      },
      axisBorder: {
        show: true,
        offsetX: 500,
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
        offsetX: 10,
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
          // "<span>Type: " +
          // w.config.series[seriesIndex].name +
          // "</span><br/>" +
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
    let newData = []
    if(num.length!==0){
    newData.push({ data: num.data, color: colorList[0] })
    }
    await setscatDataForTrust({
      series: newData,
      showLoder: false
    })

  };




  const onSelectType = (event) => {
    filterTypeList = event
    // filterGraph()
  }
  const onRemoveType = (event) => {
    filterTypeList = event
    // filterGraph()

  }
  const onSelectBrand = (event) => {
    filterBrandList = event
    // filterGraph()
  }
  const onRemoveBrand = (event) => {
    filterBrandList = event
    // filterGraph();

  }


  useEffect(() => {
    if (setResultDataForTrustMatrix) {
      setselectedDataset1(setResultDataForTrustMatrix)
    }
  }, [setResultDataForTrustMatrix]);

  useEffect(() => {
    if(selectedDataset.analysisName!=undefined){
    filterGraph();
    setItemBrand(itemBrand2)
    }
  }, [selectedDataset])

  const filterGraph = () => {
    if (selectedDataset.analysisName!==undefined && selectedDataset.analysisName.indexOf("trustmatrix") != -1) {
      let newBodyObj = {
        "analysis": "trustmatrix",
        "schema": user._id,
        "project": selectedDataset.projectid,
        "table": selectedDataset.tablename,
        "filter": {
          "brand": filterBrandList.map(ele => ele.displayName),
          "type": filterTypeList.map(ele => ele.displayName)
        }
      }
      setscatDataForTrust({ showLoder: true });
      axios
        .post("https://alb2qwvg6e.execute-api.us-east-1.amazonaws.com/api/data", newBodyObj)
        .then((data) => {
          updateGraphData(data.data.data);
        })
        .catch((err) => {
          console.log(err);
          setscatDataForTrust({ series: [],showLoder: false });
        });
    }
    else {
      setscatDataForTrust({ series: [],showLoder: false });
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

          <Grid item xs={12} sx={{
            mx: 3,
          }}>
            <Card>
              <CardHeader title={t('Trust')} action={
                <Box component="span" className={`${selectedDataset.projectid === "" ? "hidden" : "flex"
                  }`}>

                  <Multiselect
                    options={itemBrand} // Options to display in the dropdown
                    selectedValues={filterBrandList} // Preselected value to persist in dropdown
                    onSelect={onSelectBrand} // Function will trigger on select event
                    onRemove={onRemoveBrand}
                    placeholder="Brand"
                    displayValue="displayName" // Property name to display in the dropdown options
                  />

                  <Box component="span" sx={{
                    mx: 1,
                  }}>
                    <Multiselect
                      options={itemType} // Options to display in the dropdown
                      selectedValues={filterTypeList} // Preselected value to persist in dropdown
                      onSelect={onSelectType} // Function will trigger on select event
                      onRemove={onRemoveType}
                      placeholder="Type"
                      displayValue="displayName" // Property name to display in the dropdown options
                    />
                  </Box>

                  <Button
                    sx={{
                      mt: 0,
                    }}
                    color="primary"
                    size="medium"
                    variant="contained"
                    onClick={filterGraph}
                  // startIcon={<AddIcon />}
                  >
                    {t("Filter")}
                  </Button>
                </Box>
              } />
              <Divider />
              <CardContent>
                <div style={{ "height": "50vh", "textAlign": "center" }}>
                  {scatDataForCu.showLoder &&
                    <CircularProgress />

                  }
                  {!scatDataForCu.showLoder &&
                    <Chart
                      height={328}
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

export default TrustMatrix;
