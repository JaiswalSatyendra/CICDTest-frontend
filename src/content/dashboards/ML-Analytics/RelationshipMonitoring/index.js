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
  Button,
  CircularProgress
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
let itemBrand = []


function RelationshipMonitor({ setResultDataForRm, itemBrand2}) {
  // const [datasets, setDatasets] = useState([]);
  // const [supersetData, setSupersetData] = useState([]);
  const [itemBrand, setItemBrand] = useState([]);

  // const [columns, setColumns] = useState([]);
  // const [isLoaded, setIsLoaded] = useState(false);
  const [showLoder, setLoaderShow] = useState(false);
  const [session, , , ,] = useContext(SessionContext);
  const { user } = session;

  const [lineDataForDemographics, setLineDataForDemographics] = useState({
    chartSeries: [],
    labels: []
  });

  const [selectedDataset, setselectedDataset1] = useState({});

  const theme = useTheme();
  const { t } = useTranslation();

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
    }
  }

  const updateGraphData = async num => {
    // 👇️ take parameter passed from Child component
    console.log("=====");
    console.log(num);

    let seriesData = [];
    num.data.y.forEach(ele => {
      seriesData.push({
        name: ele.name,
        data: ele.value
      })
    })

    setLineDataForDemographics({
      chartSeries: seriesData,
      labels: num.data.x
    })
  };

  const onSelectBrand = (event) => {
    filterBrandList = event
    // filterGraph()
  }
  const onRemoveBrand = (event) => {
    filterBrandList = event
    // filterGraph()

  }

  useEffect(() => {
    if (setResultDataForRm) {
      setselectedDataset1(setResultDataForRm)
    }
  }, [setResultDataForRm]);

  useEffect(() => {
    if(selectedDataset.analysisName!=undefined){
    filterGraph();
    setItemBrand(itemBrand2)
    }
  }, [selectedDataset])


  const filterGraph = () => {
    if (selectedDataset.analysisName!==undefined && selectedDataset.analysisName.indexOf("rm") != -1) {
      let newBodyObj = {
        "analysis": "rm",
        "schema": user._id,
        "project": selectedDataset.projectid,
        "table": selectedDataset.tablename,
        "filter": {
          "brand": filterBrandList.map(ele => ele.displayName),
          "type": filterTypeList.map(ele => ele.displayName)
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
              setSelectedDataset1={setselectedDataset1}
            />
          </Grid> */}
          <Grid item xs={12} sx={{
            mx: 3,
          }}>
            <Card>
              <CardHeader title={t('Relationship monitoring')} action={
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

export default RelationshipMonitor;
