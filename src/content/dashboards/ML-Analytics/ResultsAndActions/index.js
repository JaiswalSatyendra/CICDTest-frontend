import PageHeader from "./PageHeader";
import PageTitleWrapper from "../../../../components/PageTitleWrapper";
import { Helmet } from "react-helmet-async";
import { Box, Button, Card, CardContent, CardHeader, CircularProgress, Divider, FormControl, Grid, InputLabel, MenuItem, TextField, Select, Autocomplete } from "@mui/material";
import ModelStatus from "./ModelStatus";
import ColumnImpact from "./ColumnImpact";
import ImpactChart from "./ImpactChart";
import ViewResults from "./ViewResults";
import { SessionContext } from "../../../../contexts/SessionContext";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { t } from "i18next";
import Multiselect from "multiselect-react-dropdown";
// import { TextField } from "formik-mui";
// import { Autocomplete } from "formik-mui";



function Project() {

  const [session, , , tablesData, setTablesData] = useContext(SessionContext);
  const { user } = session;
  const [predictedPojectList, setpredictedPojectList] = useState([]);
  const [predictedPredictedSourceList, setPredictedProjectSourceList] = useState([]);

  const [filterTypeList, setfilterTypeList] = useState([]);

  const [selectedPoject, setselectedPoject] = useState({
    imgUrl: "",
    imgTitle: "",
    modelStatus: "",
    modelDescription: "",
    impactData: [],
    resultData: [],
    selectedDataset: '',
    selectedAthenaTable: '',
  });

  const [showLoder, setLoaderShow] = useState(false);
  const [showFullLoder, setFullLoaderShow] = useState(false);

  const [selectedColumnImpact, setColumnImpact] = useState("");

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/dataset/trainedProject`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        model_name: null,
        user_id: user._id,
        status: "success"
      }),
    })
      .then((res) => res.json())
      .then((data) => {

        let newData = []
        data.data.forEach(ele => {
          let newPloatMap = typeof (ele.plot_map) === "object" ? (ele.plot_map)[0] : JSON.parse(ele.plot_map)[0]

          newData.push({
            imgUrl: newPloatMap.data,
            imgTitle: newPloatMap.title,
            modelStatus: ele.accuracy,
            modelDescription: ele.model_description,
            modelName: ele.model_name,
            impactData: JSON.parse(ele.impact_data),
            selectedDataset: ele.project_id,
            resultData: [],
            selectedAthenaTable: ele.athena_result,
          })
        })

        setpredictedPojectList(newData);
        if (newData.length != 0) {
          setselectedPoject(newData[0])
          handleChangeProjectName1(newData[0].selectedDataset, newData[0]);
        }

      });

  }, []);

  const handleChangeProjectName = (event, newVal) => {
    let selectedVal = predictedPojectList.filter(ele => ele.selectedDataset == newVal)
    let selectedObj = selectedVal[0];
    setselectedPoject(selectedObj)

    handleChangeProjectName1(newVal, selectedObj);
  }
  
  const handleChangeProjectName1 = (newVal, selectedObj) => {
    if (newVal != null) {
      // let selectedVal = predictedPojectList.filter(ele => ele.selectedDataset == newVal)
      // let selectedObj = selectedVal[0];
      if (selectedObj.modelName === "churn" || selectedObj.modelName === "lead_scoring") {
        // setFullLoaderShow(true)
        setLoaderShow(true);
        axios.post(
          `${process.env.REACT_APP_API_URL}/dataset/predicatedProject`,
          {
            user_id: user._id, project_id: selectedObj.selectedDataset
          },
          {
            headers: {
              "Content-type": "application/json",
            },
            withCredentials: true,
          }
        )
          .then((response) => {
            let sourceList = []
            response.data.data.forEach(element => {
              sourceList.push({ "displayName": element.source_name, "value": element.source_name })
            });
            setPredictedProjectSourceList(sourceList);
            selectedObj.selectedAthenaTable = response.data.data.length == 0 ? [] : response.data.data[0].athena_predict_table;
            // setFullLoaderShow(false)
            setLoaderShow(false);
          })
          .catch((error) => {
            // setFullLoaderShow(false)
            console.log(error);
          });
      } else {
        let sourceList = []
        setPredictedProjectSourceList(sourceList);
        handleChangePredictedSourceName(selectedObj, null);
      }
    } else {
      setselectedPoject({
        imgUrl: "",
        imgTitle: "",
        modelStatus: "",
        modelDescription: "",
        impactData: [],
        resultData: [],
        selectedDataset: '',
        selectedAthenaTable: '',
      });
    }
  };

  const selectPredictedSource = (event) => {
    setfilterTypeList(event.target.value);
  }

  const fetchPredictedSourceResult = (event) => {
    if (filterTypeList.length == 0) {
      setselectedPoject((prevState) => {
        return {
          ...prevState,
          resultData: [],
        };
      });
    } else {
      handleChangePredictedSourceName(selectedPoject, filterTypeList)
    }
  }


  const handleChangePredictedSourceName = (selectedProject, athenaSource) => {
    let newStr = JSON.stringify(athenaSource);
    setLoaderShow(true);
    // setFullLoaderShow(true)
    axios.post(
      `${process.env.REACT_APP_API_URL}/dataset/predicatedData`,
      {
        athena_predict_table: selectedProject.selectedAthenaTable,
        athena_source: athenaSource == null ? null : (newStr.substring(1, newStr.length - 1)),
      },
      {
        headers: {
          "Content-type": "application/json",
        },
        withCredentials: true,
      }
    )
      .then((response) => {
        selectedProject.resultData = response.data.data;
        setselectedPoject(selectedProject);
        setLoaderShow(false)
        // setFullLoaderShow(false)
      })
      .catch((error) => {
        setLoaderShow(false)
        // setFullLoaderShow(false)
        console.log(error);
      });


  }

  const selectedImpactCol = (ev) => {
    setColumnImpact(ev)
  }

  return (
    <>
      <Helmet>
        <title>Dashboard</title>
      </Helmet>
      <PageTitleWrapper>

        <PageHeader />
      </PageTitleWrapper>
      <Grid container sx={{ backgroundColor: "white", mt: "-36px" }}>
        <Grid item xs={12}>
          <Box sx={{ p: 1.5, width: '30vw' }}>
            <FormControl fullWidth >
              <Autocomplete
                disablePortal
                value={selectedPoject.selectedDataset == "" ? null : selectedPoject.selectedDataset}
                onChange={handleChangeProjectName}
                id="select-predicted-project-name"
                options={predictedPojectList.map((option) => option.selectedDataset)}
                renderInput={(params) => <TextField {...params} label="Select Project Name" />}
              />
              {/* <InputLabel id="demo-simple-select-label3">
                Select Project Name
              </InputLabel>
              <Select
                labelId="demo-simple-select-label3"
                id="demo-simple-select3"
                value={selectedPoject}
                label="Select Prediction Variable1"
                onChange={(e) => {
                  handleChangeProjectName(e);
                }}
                sx={{
                  backgroundColor: "white",
                  borderRadius: "5px",
                }}
              >
                {predictedPojectList.map((e) => {
                  return (
                    <MenuItem value={e} key={e.selectedDataset}>
                      {e.selectedDataset}
                    </MenuItem>
                  );
                })}
              </Select> */}
            </FormControl>
          </Box>
          <ModelStatus modelStatus={selectedPoject.modelStatus} modelDescription={selectedPoject.modelDescription} />
          <Divider />
        </Grid>
        <Grid item xs={12} sm={12} md={4.9}>
          <div style={{ "height": "85vh", "textAlign": "center" }}>
            {showLoder &&
              <CircularProgress />

            }
            {!showLoder &&
              <ColumnImpact modelName={selectedPoject.modelName} impactData={selectedPoject.impactData} selectedImpactCol={selectedImpactCol} />
            }
          </div>
        </Grid>
        <Divider orientation="vertical" flexItem />
        <Grid item xs={12} sm={12} md={7}>
          {/*  */}
          <div style={{ "height": "85vh", "textAlign": "center" }}>
            {showLoder &&
              <CircularProgress />

            }
            {!showLoder &&
              <ImpactChart imgDetails={selectedPoject.imgUrl} modelName={selectedPoject.modelName} />
            }
          </div>
        </Grid>

        <Grid item xs={12}>


          <Card>
            <CardHeader title={t('Prediction result')}
              // action={
              //   <Box component="span" className="flex">
              //     <Multiselect
              //       options={predictedPredictedSourceList} // Options to display in the dropdown
              //       selectedValues={filterTypeList} // Preselected value to persist in dropdown
              //       onSelect={onSelectType} // Function will trigger on select event
              //       onRemove={onRemoveType}
              //       placeholder="Select Predicted Source"
              //       displayValue="displayName" // Property name to display in the dropdown options
              //     />
              //   </Box>
              // }
              action={
                <Box component="span" sx={{ px: 2 }}className="flex">
                  {/* target.value.athena_predict_table */}
                  <FormControl sx={{ minWidth: 270,mx:2}}>
                    <InputLabel id="demo-simple-select-label4">
                      Select Predicted Source
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label4"
                      id="demo-simple-select4"
                      value={filterTypeList}
                      multiple
                      label="Select Prediction Variable2"
                      onChange={(e) => {
                        selectPredictedSource(e);
                      }}


                      MenuProps={{
                        sx: {
                          "&& .Mui-selected": {
                            backgroundColor: "rgb(1, 104, 250) !important",
                            color: "#fff !important"
                          }
                        }
                      }}
                    >
                      {predictedPredictedSourceList.map((e) => {
                        return (
                          <MenuItem value={e.value} key={e.displayName}>
                            {e.displayName}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                  <Button
                    variant="contained"
                    sx={{
                      width: "7rem",
                      mb: 0.8,
                      borderRadius: "4px",
                      py: 1,
                      px: 2,
                    }}
                    onClick={() => {
                      fetchPredictedSourceResult();
                    }}
                  >
                    Get Results
                  </Button>

                </Box>
              }
            />
            <Divider />
            <CardContent>
              <div style={{ "height": "85vh", "textAlign": "center" }}>
                {showLoder &&
                  <CircularProgress />

                }
                {!showLoder &&
                  // setImpactCol={setColumnImpact}
                  <ViewResults rowsData={selectedPoject.resultData} filterItm={selectedColumnImpact} />
                }
              </div>

            </CardContent>
          </Card>

        </Grid>
      </Grid>
    </>
  );
}

export default Project;
