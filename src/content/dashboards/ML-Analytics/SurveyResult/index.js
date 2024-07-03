import { useState, useEffect, useContext, useRef } from "react";
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
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Autocomplete,
  TextField
} from '@mui/material';
import Chart from 'react-apexcharts';
import PageTitleWrapper from "../../../../components/PageTitleWrapper";
import PageHeader from "./PageHeader";
import SupersetForm from "./SupersetForm";
import SupersetTable from "./SupersetTable";
import { SessionContext } from "../../../../contexts/SessionContext";
import { useTranslation } from "react-i18next";
import TrustMatrix from "../TrustMatrix/index";
import RelationshipMonitor from "../RelationshipMonitoring/index";
import CorrespondenceAnalysis from "../CorrespondenceAnalysis";
import ChurnAnalysis from "../ChurnAnalysis";
import Demographic from "../Demographics";
import axios from "axios";
import Multiselect from "multiselect-react-dropdown";
import { DataGrid } from "@mui/x-data-grid";
import { useLocation, useNavigate } from "react-router";
import { DataGridPro } from "@mui/x-data-grid-pro";
// import { TextField } from "formik-mui";
// import { Autocomplete } from "formik-mui";

let filterQuestionList = []
let filterBrandList = []


function VisualizeData() {
  // const [datasets, setDatasets] = useState([]);
  // const [supersetData, setSupersetData] = useState([]);
  // const [columns, setColumns] = useState([]);
  // const [isLoaded, setIsLoaded] = useState(false);
  const [selectedDataset, setselectedDataset1] = useState({});
  const [session, , , ,] = useContext(SessionContext);
  const { user } = session;

  const [itemBrand, setItemBrand] = useState([]);
  const [itemQuestion, setItemQuestion] = useState([]);
  const [itemType, setItemType] = useState([]);
  const [showLoder, setLoaderShow] = useState(false);
  
  const [showLoder1, setLoaderShow1] = useState(false);

  const navigate = useNavigate();
  const { state } = useLocation();

  // const [isCallFromSubmit, setCallFromCreate] = useState(false);
  const [surveyPojectList, setSurveyPojectList] = useState([]);
  const [selectedSurveyPojectList, setselectedSurveyPojectList] = useState({ projectid: "", tablename: "", analysisName: new Array() });
  const [formTemplateData, setFormTemplateData] = useState({
    columns: new Array(
      { field: "surveyName", headerName: "Name", sortable: true, width: 180, },
      { field: "age", headerName: "Age", sortable: true, width: 100, },
      { field: "gender", headerName: "Gender", sortable: true, width: 100, },
      { field: "region", headerName: "Region", sortable: true, width: 100, }),
    rows: [],
    showName: false
  })

  const [paginationModel, setPaginationModel] = useState({
    pageSize: 5,
    page: 0,
  });


  const theme = useTheme();
  const { t } = useTranslation();

  const [lineDataForRelationshipM1, setLineDataForRelationshipM1] = useState({
    chartSeries: [],
    category: []
  });
  const [lineDataForRelationshipM2, setLineDataForRelationshipM2] = useState({
    chartSeries: [],
    labels: []
  });

  const chartOptions1 = {
    chart: {
      events: {
        dataPointSelection: function (event, chartContext, config) {
          let newBodyObj = {
            "analysis": "names",
            "schema": user._id,//"63750f4975c4cae2547d353c",//
            "project": selectedSurveyPojectList.projectid,
            "table": selectedSurveyPojectList.tablename,
            "filter": {
              "brand": filterBrandList.map(ele => ele.displayName),
              "type": [config.w.config.xaxis.categories[config.dataPointIndex]],//filterQuestionList.map(ele => ele.displayName),
              "category": [config.w.config.series[config.seriesIndex].name],
              "ques": filterQuestionList.map(ele => ele.displayName)
            }
          }
          setLoaderShow1(true);
          axios
            .post("https://alb2qwvg6e.execute-api.us-east-1.amazonaws.com/api/data", newBodyObj)
            .then((response) => {
              console.log(response.data.data);
              let array = []
              response.data.data.forEach((ele, index) => {
                let model = { "id": index, "surveyName": ele.name, "age": ele.age, "gender": ele.gender, "region": ele.region }
                array.push(model)
              })
              setFormTemplateData((prevState) => {
                return {
                  ...prevState,
                  rows: array,
                  showName: true
                };
              });
              setLoaderShow1(false);
            })
            .catch((err) => {
              setLoaderShow1(false);
            });

          // let newGridObj = { ...gridDataForChurn }
          // let filterdData = newGridObj.rows.filter(ele => ele.status === config.w.config.labels[config.dataPointIndex]);
          // setGridFilterDataForChurn({
          //   columns: newGridObj.columns,
          //   rows: filterdData
          // })
        }
      },
      type: 'bar',
      height: 350,
      stacked: true,
      stackType: '100%'
    },
    plotOptions: {
      bar: {
        columnWidth: '20%',
        borderRadius: 4,
        horizontal: false,
        dataLabels: {
          enabled: true,
          total: {
            enabled: true,
            style: {
              fontSize: '13px',
              fontWeight: 900
            }
          },

          // formatter: function (val) {
          //   if (val > 5) {
          //     return val.toFixed(2) + "%";
          //   }
          // },
          offsetY: 0,
          style: {
            fontSize: '12px',
            colors: ["#fff"]
          }
        },
      }
    },
    xaxis: {
      position: 'bottom',
      categories: lineDataForRelationshipM1.category,
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
      // show: false,
      title: {
        text: undefined
      },
      // labels: {
      //   formatter: function (val) {
      //     return parseInt(val) + "%"
      //   }
      // }
    },
    tooltip: {
      x: {
        formatter: function (val) {
          return "" + val
        }
      },
      y: {
        formatter: function (value, { series, seriesIndex, dataPointIndex, w }) {
          return ""
        },
        title: {
          formatter: (seriesName) => seriesName,
        },
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
      categories: lineDataForRelationshipM2.labels,
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


  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/dataset/surveyprojectlist`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        userid: user._id,
        status: "success"
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        let newProjectList = [];
        data.data.forEach(ele => {
          let index = newProjectList.findIndex(x => x.projectid === ele.projectid);
          if (index == -1) {
            newProjectList.push({ projectid: ele.projectid, tablename: ele.tablename, analysisName: new Array(ele.analysisName) })
          } else {
            newProjectList[index].analysisName.push(ele.analysisName)
          }

        })
        setSurveyPojectList(newProjectList)
        if (state != undefined) {
          let selectedProj = newProjectList.filter(ele => ele.projectid == state.projectid)
          if (selectedProj.length != 0) {
            setselectedSurveyPojectList(selectedProj[0]);
          }

        }
      });

  }, []);



  const updateGraphData = async num => {
    // 👇️ take parameter passed from Child component
    console.log("=====");
    console.log(num);
    let seriesData1 = [];
    num.question.y.forEach(element => {
      seriesData1.push({
        name: element.name,
        data: element.value.map((o) => ((o * 100).toFixed(2))),
      })
    });

    await setLineDataForRelationshipM1({
      chartSeries: seriesData1,
      category: num.question.x
    })

    let seriesData = [];
    num.store.y.forEach(element => {
      seriesData.push({
        name: element.name,
        data: (element.value.map((o) => ((o * 100).toFixed(2))))
      })
    })
    await setLineDataForRelationshipM2({
      chartSeries: seriesData,
      labels: num.store.x
    })
  };


  const onSelectQuestion = (event) => {
    filterQuestionList = event
    // filterGraph()
  }
  const onRemoveQuestion = (event) => {
    filterQuestionList = event
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


  const handleChangeProjectName = async (event, newVal) => {
    if (newVal != null) {
      let selectedVal = surveyPojectList.filter(ele => ele.projectid == newVal)
      await axios.post(`${process.env.REACT_APP_API_URL}/s3/read`, {
        bucket: user._id,
        key: newVal + "/metadata.json"
      })
        .then((data) => {
          if (data.data.success) {
            const templateJson = JSON.parse(data.data.data);
            setItemBrand(templateJson.brand.map((o) => ({ displayName: o, value: (o.toLowerCase()) })))
            setItemQuestion(templateJson.question.map((o) => ({ displayName: o, value: (o.toLowerCase()) })))
            setItemType(templateJson.type.map((o) => ({ displayName: o, value: (o.toLowerCase()) })))
          }
        })
        .catch((err) => {
          console.log(err);
        });
      if (selectedVal.length != 0) {
        setselectedSurveyPojectList(selectedVal[0]);
      }
    } else {
      setselectedSurveyPojectList({ projectid: "", tablename: "", analysisName: new Array() });
    }
  }


  const filterGraph = () => {
    if (selectedSurveyPojectList.projectid !== "") {
      let newBodyObj = {
        "analysis": "surveyresult",
        "schema": user._id,
        "project": selectedSurveyPojectList.projectid,
        "table": selectedSurveyPojectList.tablename,
        "filter": {
          "brand": filterBrandList.map(ele => ele.displayName),
          "ques": filterQuestionList.map(ele => ele.displayName),
          "category": [],
          "type": []
        }
      }
      setLoaderShow(true);
      axios
        .post("https://alb2qwvg6e.execute-api.us-east-1.amazonaws.com/api/data", newBodyObj)
        .then((data) => {
          updateGraphData(data.data.data);
          setLoaderShow(false);
        })
        .catch((err) => {
          setLineDataForRelationshipM1({
            chartSeries: [],
            category: []
          })

          setLineDataForRelationshipM2({
            chartSeries: [],
            labels: []
          })
          setLoaderShow(false);
        });
    }
  };

  useEffect(() => {
    filterGraph()

  }, [selectedSurveyPojectList])



  return (
    <>
      <PageTitleWrapper>
        <PageHeader />
      </PageTitleWrapper>

      <Grid container direction={{ xs: "column", md: "row" }} spacing={2}>
        <Grid item xs={12}>
          <Box sx={{ px: 3, width: '30vw' }}>
            <FormControl fullWidth >

              <Autocomplete
                disablePortal
                value={selectedSurveyPojectList.projectid == "" ? null : selectedSurveyPojectList.projectid}
                onChange={handleChangeProjectName}
                id="select-survey-project-name"
                options={surveyPojectList.map((option) => option.projectid)}
                renderInput={(params) => <TextField {...params} label="Select Project Name" />}
              />
              {/* <InputLabel id="demo-simple-select-label3">
                Select Project Name
              </InputLabel>
              <Select
                labelId="demo-simple-select-label3"
                id="demo-simple-select3"
                value={selectedSurveyPojectList}
                label="Select Prediction Variable1"
                onChange={(e) => {
                  handleChangeProjectName(e);
                }}
                sx={{
                  backgroundColor: "white",
                  borderRadius: "5px",
                }}
              >
                {surveyPojectList.map((e) => {
                  return (
                    <MenuItem value={e} key={e.projectid}>
                      {e.projectid}
                    </MenuItem>
                  );
                })}
              </Select> */}
            </FormControl>
          </Box>
          {/* <SupersetForm
              datasets={datasets}
              updateSupersetData={setSupersetData}
              updateColumns={setColumns}
              setResultDataForGraph={clickOnCreateButton}
              setSelectedDataset1={setselectedDataset1}
            /> */}
        </Grid>
        <Grid item xs={12} sx={{
          mx: 3,
        }}>
          {/* {surveyPojectList.analysisName!==undefined&& */}
          <Card>
            <CardHeader title={t('Survey Result')}

              action={
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
                    zIndex: 1000
                  }}>
                    <Multiselect
                      options={itemQuestion} // Options to display in the dropdown
                      selectedValues={filterQuestionList} // Preselected value to persist in dropdown
                      onSelect={onSelectQuestion} // Function will trigger on select event
                      onRemove={onRemoveQuestion}
                      placeholder="Question"
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
              <div style={{ "height": "55vh", "textAlign": "center" }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    {showLoder &&
                      <CircularProgress />
                    }
                    {!showLoder &&

                      <Chart
                        height={328}
                        options={chartOptions1}
                        series={lineDataForRelationshipM1.chartSeries}
                        type="bar"
                      />
                    }
                  </Grid>

                  <Grid item xs={12} md={5.9}>
                    <div style={{ "height": "50vh", "textAlign": "center" }}>
                      <Box sx={{ height: 400 }}>
                        {showLoder1 &&
                          <CircularProgress />
                        }
                        {!showLoder1 &&
                          <Box sx={{ height: 400 }}>
                            <DataGridPro
                              rows={formTemplateData.rows}
                              columns={formTemplateData.columns}
                              pageSizeOptions={[5, 10, 50, 100]}
                              checkboxSelection={true}
                              pagination={true}
                              disableSelectionOnClick
                              paginationModel={paginationModel}
                              onPaginationModelChange={setPaginationModel}
                            />
                          </Box>
                          // <DataGrid
                          //   rows={formTemplateData.rows}
                          //   columns={formTemplateData.columns}
                          //   pageSize={5}
                          //   rowsPerPageOptions={[5]}
                          //   checkboxSelection
                          //   disableSelectionOnClick
                          //   experimentalFeatures={{ newEditingApi: true }}
                          // />
                        }
                      </Box>
                    </div>
                  </Grid>
                </Grid>
              </div>
            </CardContent>
          </Card>
          {/* } */}
        </Grid>

        <Grid item xs={12} sx={{
          mx: 3,
        }}>
          {/* {surveyPojectList.analysisName!==undefined && */}
          <Card>
            <CardHeader title={t('Store Considration')} />
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
                    series={lineDataForRelationshipM2.chartSeries}
                    type="bar"
                  />
                }
              </div>
            </CardContent>
          </Card>
          {/* } */}
        </Grid>

        <Grid item xs={12}>
          <TrustMatrix setResultDataForTrustMatrix={selectedSurveyPojectList} itemBrand2={itemBrand} />
        </Grid>
        {/* <Grid item xs={12}>
            <RelationshipMonitor setResultDataForRm={selectedSurveyPojectList} itemBrand2={itemBrand} />
          </Grid> */}
        <Grid item xs={12}>
          <CorrespondenceAnalysis setResultDataForRm={selectedSurveyPojectList} itemBrand2={itemBrand} />
        </Grid>
        <Grid item xs={12}>
          <ChurnAnalysis setResultDataForRm={selectedSurveyPojectList} itemBrand2={itemBrand} />

        </Grid>

        <Grid item xs={12}>
          <Box p={2} sx={{
            mx: 2,
            my: 0
          }}>
            <Typography variant="h5">{t("Demographic")}</Typography>
            <Divider />
          </Box>
          <Demographic setResultDataForRm={selectedSurveyPojectList} />
        </Grid>


      </Grid>

    </>
  );
}

export default VisualizeData;
