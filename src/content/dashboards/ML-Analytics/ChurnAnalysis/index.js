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
  Button,
  CircularProgress
} from '@mui/material';
import Chart from 'react-apexcharts';
import { DataGrid } from "@mui/x-data-grid";
import PageTitleWrapper from "../../../../components/PageTitleWrapper";
import PageHeader from "./PageHeader";
import SupersetForm from "./SupersetForm";
import SupersetTable from "./SupersetTable";
import { SessionContext } from "../../../../contexts/SessionContext";
import { useTranslation } from 'react-i18next';
import Multiselect from 'multiselect-react-dropdown';
import axios from "axios";


let filterTypeList = []
let filterBrandList = []

function ChurnAnalysis({ setResultDataForRm, itemBrand2 }) {
  const [showLoder, setLoaderShow] = useState(false);
  const [pieDataForChurn, setPieDataForChurn] = useState({
    chartSeries: [],
    labels: []
  });
  const [gridDataForChurn, setGridDataForChurn] = useState({
    columns: [],
    rows: []
  });

  const [gridFilterDataForChurn, setGridFilterDataForChurn] = useState({
    columns: [],
    rows: []
  });

  const [selectedDataset, setselectedDataset1] = useState({});
  const [itemBrand, setItemBrand] = useState([]);

  const [columns, setColumns] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [session, , , ,] = useContext(SessionContext);
  const { user } = session;
  const pageSettings = { pageSize: 10 };

  const theme = useTheme();
  const { t } = useTranslation();


  const chartOptions = {
    chart: {
      events: {
        dataPointSelection: function (event, chartContext, config) {
          let newGridObj = { ...gridDataForChurn }
          let filterdData = newGridObj.rows.filter(ele => ele.status === config.w.config.labels[config.dataPointIndex]);
          setGridFilterDataForChurn({
            columns: newGridObj.columns,
            rows: filterdData
          })
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
    labels: pieDataForChurn.labels,
    legend: {
      position: 'bottom',
      offsetX: -10,
      offsetY: 0,
      labels: pieDataForChurn.labels,
      show: true
    },
    stroke: {
      width: 0
    },
    theme: {
      mode: theme.palette.mode
    }
  };


  const updateGraphData = async num => {
    // 👇️ take parameter passed from Child component
    console.log("=====");
    console.log(num);

    num.pie.y.forEach(element => {
      element = (element * 100);
    });
    setPieDataForChurn({
      chartSeries: num.pie.y,
      labels: num.pie.x
    });

    let colData = (Object.keys(num.table[0])).map(v => ({ v, field: v, headerName: v.toUpperCase(), description: v, sortable: true, width: 250, }))
    let rowData = (num.table).map((v, ind) => ({ ...v, id: ind }))

    setGridDataForChurn({
      columns: colData,
      rows: rowData
    })

    setGridFilterDataForChurn({
      columns: colData,
      rows: rowData
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
    if (selectedDataset.analysisName != undefined) {
      filterGraph();
      setItemBrand(itemBrand2)
    }
  }, [selectedDataset])


  const filterGraph = () => {
    if (selectedDataset.analysisName !== undefined && selectedDataset.analysisName.indexOf("churn") != -1) {
      let newBodyObj = {
        "analysis": "churn",
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
          setPieDataForChurn({
            chartSeries: [],
            labels: []
          });
          setGridDataForChurn({
            columns: [],
            rows: []
          })
          setGridFilterDataForChurn({
            columns: [],
            rows: []
          })
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
        <Grid item xs={12}>
          <Card
            sx={{
              mx: 3,
            }}
          >
            <CardHeader title={t('Churn Analysis')} action={
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
                    options={chartOptions}
                    series={pieDataForChurn.chartSeries}
                    type="pie"
                  />
                }
              </div>
            </CardContent>
            {/* <AccumulationChartComponent id='pie-chart'
                title=''
                legendSettings={{ visible: false }}
                enableSmartLabels={true}
                enableAnimation={false}
                center={{ x: '50%', y: '50%' }}
                enableBorderOnMouseMove={false}
                tooltip={{ enable: true, format: '<b>${point.x}</b><br><b>${point.y}%</b>', header: "" }}

              >
                <Inject services={[AccumulationLegend, PieSeries, AccumulationTooltip, AccumulationDataLabel]} />
                <AccumulationSeriesCollectionDirective>
                  <AccumulationSeriesDirective dataSource={resultDataForGraph} name='Browser' xName='x' yName='y'
                    explode={true} explodeOffset='10%' explodeIndex={0} startAngle={30}
                    dataLabel={{
                      visible: true,
                      position: 'Outside', name: 'text',
                      font: {
                        fontWeight: '600'
                      }
                    }}
                    radius='70%'
                  >
                  </AccumulationSeriesDirective>
                </AccumulationSeriesCollectionDirective>
              </AccumulationChartComponent> */}

          </Card>

        </Grid>

        <Grid item xs={12}>
          <Card
            sx={{
              mx: 3,
            }}
          >
            <CardHeader title={t('')} />
            <Divider />
            <CardContent>
              <div style={{ "height": "50vh", "textAlign": "center" }}>
                {showLoder &&
                  <CircularProgress />

                }
                {!showLoder &&
                  <Box sx={{ height: 400, width: '100%' }}>
                    <DataGrid
                      rows={gridFilterDataForChurn.rows}
                      columns={gridFilterDataForChurn.columns}
                      pageSize={5}
                      rowsPerPageOptions={[5]}
                      checkboxSelection
                      disableSelectionOnClick
                      experimentalFeatures={{ newEditingApi: true }}
                    />
                  </Box>
                }
              </div>
            </CardContent>
            {/* filterSettings={this.state.filterSettings}  ref={g => this.grid1 = g} */}
            {/* <GridComponent dataSource={resultDataForGraph1} allowPaging={true}>
                <ColumnsDirective>
                  <ColumnDirective field='name' headerText='Name' />
                  <ColumnDirective field='brand' headerText='Brand' />
                  <ColumnDirective field='status' headerText='Status' />
                </ColumnsDirective>
                <Inject services={[Page, Sort, Filter, Group]} />
              </GridComponent> */}
          </Card>

          {/* <SupersetTable projects={supersetData} columns={columns} /> */}
        </Grid>
      </Grid>

    </>
  );
}

export default ChurnAnalysis;
