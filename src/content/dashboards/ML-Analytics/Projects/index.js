import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import PageTitleWrapper from "../../../../components/PageTitleWrapper";
import PageHeader from "./PageHeader";
import Usecase from "./Usecase";
import Dataset from "./Dataset";
import {
  Box,
  Button,
  Card,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  TextField,
  Typography,
  Select,
  Autocomplete,
  Paper,
  Popper
} from "@mui/material";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import PredictionValue from "./PredictionValue";
import { SessionContext } from "../../../../contexts/SessionContext";
import { getAthenaTables, getAthenaSelectedTableColumn } from "../../../../utils/QueryEngine";
import ToastMessage from "../TrustMatrix/ToastMessage";
// import { Autocomplete } from "formik-mui";
const CustomPaper = (props) => {
  return <Popper {...props} placement="top" />;
};

function Project() {
  const { t } = useTranslation();
  const [value, setValue] = useState("");
  const [session, , , tablesData, setTablesData] = useContext(SessionContext);
  const [selectedDatasetVal, setDatasetVal] = useState("");
  const [columnList, setColumnList] = useState([]);
  const [predictedPojectList, setpredictedPojectList] = useState([]);
  const [selectedModel, setselectedModel] = useState([]);
  const [toastObject, setToastObject] = useState({});


  const { user } = session;
  const [createNewProject, setcreateNewProject] = useState({
    datasetName: '',
    projectName: '',
    idColumn: '',
    targetColumn: '',
    dateColumn: '',
    amountColumn: '',
    quantityColumn: '',
    model: '',
  });




  useEffect(() => {
    getAthenaSelectedTableColumn(user._id, selectedDatasetVal.toLowerCase() + "_data")
      .then((data) => {
        setColumnList(data);
        // setIsLoaded(true);
        setcreateNewProject((prevState) => {
          return {
            ...prevState,
            datasetName: selectedDatasetVal,
            idColumn: '',
            targetColumn: '',
            dateColumn: '',
            amountColumn: '',
            quantityColumn: '',
          };
        });

        // setValue("training")
      })
      .catch((err) => {
        // setIsLoaded(true);
      });
  }, [selectedDatasetVal]);

  useEffect(() => {
    setValue("training");
    let newObj = {
      datasetName: '',
      projectName: '',
      idColumn: '',
      targetColumn: '',
      dateColumn: '',
      amountColumn: '',
      quantityColumn: '',
      model: selectedModel.key,
    }

    setcreateNewProject(newObj);

  }, [selectedModel]);

  useEffect(() => {
    if (value !== "training") {
      fetch(`${process.env.REACT_APP_API_URL}/dataset/trainedProject`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          model_name: createNewProject.model,
          user_id: user._id,
          status: "success"
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          var n = data.data.map((e) => {
            return { name: e.project_id };
          });
          setpredictedPojectList(n)

        });
    }
    let newArr = { ...createNewProject };
    newArr.projectName = ""
    setcreateNewProject(newArr);
  }, [value]);





  const handleChangeId = (event, selectedVal) => {
    let newArr = { ...createNewProject };
    newArr.idColumn = selectedVal == null ? "" : selectedVal;;
    setcreateNewProject(newArr);
  };

  const handleChangeTarget = (event, selectedVal) => {
    let newArr = { ...createNewProject };
    newArr.targetColumn = selectedVal == null ? "" : selectedVal;;
    setcreateNewProject(newArr);
  };

  // const handleChange = (event,selectedVal) => {
  //   if (event != null && selectedVal!=null) {

  const handleChangeProjectName1 = (event, selectedVal) => {
    let newArr = { ...createNewProject };
    newArr.projectName = event.target.value;
    setcreateNewProject(newArr);
  };

  const handleChangeProjectName = (event, selectedVal) => {
    let newArr = { ...createNewProject };
    newArr.projectName = selectedVal == null ? "" : selectedVal;
    setcreateNewProject(newArr);
  };




  const handleChangeDate = (event, selectedVal) => {
    let newArr = { ...createNewProject };
    newArr.dateColumn = selectedVal == null ? "" : selectedVal;;
    setcreateNewProject(newArr);
  };

  const handleChangeAmount = (event, selectedVal) => {
    let newArr = { ...createNewProject };
    newArr.amountColumn = selectedVal == null ? "" : selectedVal;;
    setcreateNewProject(newArr);
  };


  const handleChangeQuantity = (event, selectedVal) => {
    let newArr = { ...createNewProject };
    newArr.quantityColumn = selectedVal == null ? "" : selectedVal;;
    setcreateNewProject(newArr);
  };



  const handleSubmit = () => {
    console.log(createNewProject);
    if (createNewProject.model === undefined) {
      setToastObject({
        message: t("Please choose use case"),
        severity: "error",
        open: true,
      });
    }
    else if (createNewProject.datasetName === '' || createNewProject.projectName === '') {
      setToastObject({
        message: t("Please fill all required field"),
        severity: "error",
        open: true,
      });
    }
    else if ((selectedModel.key == 'churn' && value === "training" && (createNewProject.idColumn === '' || createNewProject.targetColumn === '')) || (selectedModel.key == 'lead_scoring' && value === "training" && (createNewProject.idColumn === '' || createNewProject.targetColumn === ''))) {
      setToastObject({
        message: t("Please Select Identifier/Target variable"),
        severity: "error",
        open: true,
      });
    }

    else if ((selectedModel.key == 'churn' && value === "training" && (createNewProject.idColumn === createNewProject.targetColumn)) || (selectedModel.key == 'lead_scoring' && value === "training" && (createNewProject.idColumn === createNewProject.targetColumn))) {
      setToastObject({
        message: t("Identifier and Target variable name can not be same"),
        severity: "error",
        open: true,
      });
    }

    else if ((selectedModel.key == 'rfm' && value === "training" && (createNewProject.idColumn === '' || createNewProject.dateColumn === '' || createNewProject.amountColumn === ''))) {
      setToastObject({
        message: t("Please Select Identifier/Amount/Date variable"),
        severity: "error",
        open: true,
      });
    }

    else {
      fetch(`${process.env.REACT_APP_API_URL}/dataset/saveproject`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          model_name: createNewProject.model,
          user_id: user._id,
          project_id: createNewProject.projectName,
          table_name: createNewProject.datasetName,
          id_column: createNewProject.idColumn,
          target_column: createNewProject.targetColumn,
          date_column: createNewProject.dateColumn,
          amount_column: createNewProject.amountColumn,
          quantity_column: createNewProject.quantityColumn,
          status: "running",
          type: value,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data)
          if (data.success) {
            setToastObject({
              message: t("Project created successfully"),
              severity: "success",
              open: true,
            });
          } else {
            setToastObject({
              message: t(data.message),
              severity: "error",
              open: true,
            });
          }
        }).catch((err) => {
          console.log(err);
        });
    }
  };




  return (
    <>
      <Helmet>
        <title>Dashboard</title>
      </Helmet>
      <PageTitleWrapper>
        <PageHeader />
      </PageTitleWrapper>

      <Box
        component="form"
        noValidate
        autoComplete="off"
        style={{ width: "100%", backgroundColor: "white", marginTop: "-36px" }}
      >
        <Grid container>
          <Grid item xs={12}>
            <FormControl sx={{ width: 1, my: 2, px: 4 }}>
              <FormLabel
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Typography
                  variant="h5"
                  sx={{ fontWeight: "bold", color: "black" }}
                >
                  Choose your Use-Case
                </Typography>
              </FormLabel>
              <Box
                sx={{
                  mt: 3,
                }}
              >
                <Usecase selectedModel={setselectedModel} />
              </Box>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={7.15}>
            <Dataset table={setDatasetVal} selectedModel={selectedModel} />
          </Grid>
          <Grid container spacing={4} sx={{ px: 4, mb: 4 }}>
            <Grid item xs={12} md={7}>

              <FormControl>
                <RadioGroup
                  aria-labelledby="demo-controlled-radio-buttons-group"
                  name="controlled-radio-buttons-group"
                  value={value}
                  onChange={(event) => {
                    setValue(event.target.value);
                  }}
                >
                  <FormControlLabel
                    value="training"
                    control={<Radio />}
                    label="Training Dataset"
                  />
                  {selectedModel.key == 'churn' || selectedModel.key == 'lead_scoring' ?
                    (
                      <FormControlLabel
                        value="predicted"
                        control={<Radio />}
                        label="Prediction Dataset"
                      />) : null}
                </RadioGroup>
              </FormControl>
              <br />

              <Card variant="outlined">

                <Box
                  p={2.5}
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Typography gutterBottom variant="h4">
                    {t("Project Details*")}
                  </Typography>
                </Box>
                <Divider />
                {value === "training" ?
                  (
                    <Box
                      sx={{
                        maxWidth: "100%",
                        height: "25vh",
                        padding: "1.5rem",
                      }}
                    >
                      <FormControl sx={{ width: 1 }}>
                        <TextField
                          fullWidth
                          label="Project Name"
                          id="project-name"
                          value={createNewProject.projectName}
                          onChange={handleChangeProjectName1}
                        />
                      </FormControl>

                    </Box>) :

                  <Box
                    sx={{
                      maxWidth: "100%",
                      zIndex: 1000,
                      height: "25vh",
                      padding: "1.5rem",
                    }}
                  >
                    <FormControl fullWidth >
                      <Autocomplete
                        disablePortal
                        value={createNewProject.projectName == "" ? null : createNewProject.projectName}
                        onChange={handleChangeProjectName}
                        // classes={classes}
                        // inputValue={inputValue}
                        // onInputChange={(event, newInputValue) => {
                        //   setInputValue(newInputValue);
                        // }}

                        id="select-project-name"
                        options={predictedPojectList.map((option) => option.name)}
                        renderInput={(params) => <TextField {...params} label="Select Project Name" />}
                      />
                      {/*  <InputLabel id="demo-simple-select-label3">
                        Select Project Name
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label3"
                        id="demo-simple-select3"
                        value={createNewProject.projectName}
                        label="Select Prediction Variable1"
                        onChange={handleChangeProjectName}
                        sx={{
                          backgroundColor: "white",
                          borderRadius: "5px",
                        }}
                      >
                        {predictedPojectList.map((e) => {
                          return (
                            <MenuItem value={e.name} key={e.name}>
                              {e.name}
                            </MenuItem>
                          );
                        })}
                      </Select> */}
                    </FormControl>
                  </Box>
                }

              </Card>

            </Grid>
            {(selectedModel.key == 'churn' && value === "training") || (selectedModel.key == 'lead_scoring' && value === "training") || (selectedModel.key == 'rfm') ?
              (
                <Grid item xs={12} md={5}>
                  <br /><br />
                  <Card sx={{
                    minHeight: "300px"
                  }}>

                    <Box


                      p={2.5}
                      display="flex"
                      alignItems="center"
                      justifyContent="space-between"
                    >
                      <Typography gutterBottom variant="h4">
                        {t("Input Details*")}
                      </Typography>
                    </Box>
                    <Divider />

                    <Box
                      sx={{
                        maxWidth: "100%",
                        zIndex: 1000,
                        paddingX: "1.5rem",
                        paddingY: "0.6rem",
                      }}
                    >
                      <FormControl fullWidth>
                        <Autocomplete
                          disablePortal
                          value={createNewProject.idColumn == "" ? null : createNewProject.idColumn}
                          ListboxProps={{ style: { maxHeight: 150 } }}
                          PopperComponent={CustomPaper}
                          onChange={handleChangeId}
                          id="select-prediction-variable"
                          options={columnList.map((option) => option.name)}
                          renderInput={(params) => <TextField {...params} label="Select Identifier Variable" />}
                        />
                        {/* <InputLabel id="demo-simple-select-label1">
                            Select Identifier Variable
                          </InputLabel>
                          <Select
                            labelId="demo-simple-select-label1"
                            id="demo-simple-select1"
                            value={createNewProject.idColumn}
                            label="Select Prediction Variable"
                            onChange={handleChangeId}
                            sx={{
                              backgroundColor: "white",
                              borderRadius: "5px",
                            }}
                          >
                            {columnList.map((e) => {
                              return (
                                <MenuItem value={e.name} key={e.name}>
                                  {e.name}
                                </MenuItem>
                              );
                            })}
                          </Select> */}
                      </FormControl>
                      {/* <PredictionValue /> */}
                    </Box>
                    {selectedModel.key !== 'rfm' ?
                      (<>
                        <Box
                          sx={{
                            width: "100%",
                            zIndex: 1000,
                            paddingX: "1.5rem",
                            paddingY: "0.6rem",
                          }}
                        >
                          <FormControl fullWidth >
                            <Autocomplete
                              disablePortal
                              value={createNewProject.targetColumn == "" ? null : createNewProject.targetColumn}
                              onChange={handleChangeTarget}
                              ListboxProps={{ style: { maxHeight: 150 } }}
                              PopperComponent={CustomPaper}
                              id="select-prediction-variable1"
                              options={columnList.map((option) => option.name)}
                              renderInput={(params) => <TextField {...params} label="Select Target Variable" />}
                            />
                            {/* <InputLabel id="demo-simple-select-label2">
                                Select Target Variable
                              </InputLabel>
                              <Select
                                labelId="demo-simple-select-label2"
                                id="demo-simple-select1"
                                value={createNewProject.targetColumn}
                                label="Select Prediction Variable"
                                onChange={handleChangeTarget}
                                sx={{
                                  backgroundColor: "white",
                                  borderRadius: "5px",
                                }}
                              >
                                {columnList.map((e) => {
                                  return (
                                    <MenuItem value={e.name} key={e.name}>
                                      {e.name}
                                    </MenuItem>
                                  );
                                })}
                              </Select> */}
                          </FormControl>
                          {/* <PredictionValue /> */}
                        </Box></>) : null
                    }

                    {selectedModel.key === 'rfm' ?
                      (<>
                        <Box
                          sx={{
                            width: "100%",
                            zIndex: 1000,
                            paddingX: "1.5rem",
                            paddingY: "0.6rem",
                          }}
                        >
                          <FormControl fullWidth >
                            <Autocomplete
                              disablePortal
                              value={createNewProject.dateColumn == "" ? null : createNewProject.dateColumn}
                              onChange={handleChangeDate}
                              ListboxProps={{ style: { maxHeight: 150 } }}
                              PopperComponent={CustomPaper}
                              id="select-date-variable"
                              options={columnList.map((option) => option.name)}
                              renderInput={(params) => <TextField {...params} label="Select Date Variable" />}
                            />
                            {/* <InputLabel id="demo-date-select-label2">
                                Select Date Variable
                              </InputLabel>
                              <Select
                                labelId="demo-date-select-label2"
                                id="demo-date-select1"
                                value={createNewProject.dateColumn}
                                label="Select Date Variable"
                                onChange={handleChangeDate}
                                sx={{
                                  backgroundColor: "white",
                                  borderRadius: "5px",
                                }}
                              >
                                {columnList.map((e) => {
                                  return (
                                    <MenuItem value={e.name} key={e.name}>
                                      {e.name}
                                    </MenuItem>
                                  );
                                })}
                              </Select> */}
                          </FormControl>
                        </Box>
                        <Box
                          sx={{
                            width: "100%",
                            zIndex: 1000,
                            paddingX: "1.5rem",
                            paddingY: "0.6rem",
                          }}
                        >
                          <FormControl fullWidth >
                            <Autocomplete
                              disablePortal
                              value={createNewProject.amountColumn == "" ? null : createNewProject.amountColumn}
                              onChange={handleChangeAmount}
                              ListboxProps={{ style: { maxHeight: 150 } }}
                              PopperComponent={CustomPaper}
                              id="select-amount-variable"
                              options={columnList.map((option) => option.name)}
                              renderInput={(params) => <TextField {...params} label="Select Amount Variable" />}
                            />
                            {/* <InputLabel id="demo-amount-select-label2">
                                Select Amount Variable
                              </InputLabel>
                              <Select
                                labelId="demo-amount-select-label2"
                                id="demo-amount-select1"
                                value={createNewProject.amountColumn}
                                label="Select Amount Variable"
                                onChange={handleChangeAmount}
                                sx={{
                                  backgroundColor: "white",
                                  borderRadius: "5px",
                                }}
                              >
                                {columnList.map((e) => {
                                  return (
                                    <MenuItem value={e.name} key={e.name}>
                                      {e.name}
                                    </MenuItem>
                                  );
                                })}
                              </Select> */}
                          </FormControl>
                          {/* <PredictionValue /> */}
                        </Box>
                        <Box
                          sx={{
                            width: "100%",
                            zIndex: 1000,
                            paddingX: "1.5rem",
                            paddingY: "0.6rem",
                          }}
                        >
                          <FormControl fullWidth >
                            <Autocomplete
                              disablePortal
                              value={createNewProject.quantityColumn == "" ? null : createNewProject.quantityColumn}
                              onChange={handleChangeQuantity}
                              ListboxProps={{ style: { maxHeight: 150 } }}
                              PopperComponent={CustomPaper}
                              id="select-quantity-variable"
                              options={columnList.map((option) => option.name)}
                              renderInput={(params) => <TextField {...params} label="Select Quantity Variable" />}
                            />

                            {/* <InputLabel id="demo-quantity-select-label2">
                                Select Quantity Variable
                              </InputLabel>
                              <Select
                                labelId="demo-quantity-select-label2"
                                id="demo-quantity-select1"
                                value={createNewProject.quantityColumn}
                                label="Select Quantity Variable"
                                onChange={handleChangeQuantity}
                                sx={{
                                  backgroundColor: "white",
                                  borderRadius: "5px",
                                }}
                              >
                                {columnList.map((e) => {
                                  return (
                                    <MenuItem value={e.name} key={e.name}>
                                      {e.name}
                                    </MenuItem>
                                  );
                                })}
                              </Select> */}
                          </FormControl>
                          {/* <PredictionValue /> */}
                        </Box></>) : null
                    }


                  </Card>

                </Grid>) : null
            }
          </Grid>
          <Box
            style={{
              width: "100%",
              height: "80px",
              boxShadow:
                "0px 2px 8px -3px rgb(34 51 84 / 20%), 0px 5px 22px -4px rgb(34 51 84 / 10%)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Button
              sx={{ py: 0.7, px: 1.5, borderRadius: 0.5 }}
              color="primary"
              size="large"
              variant="contained"

              onClick={handleSubmit}
            >
              {t("Submit")}
            </Button>
          </Box>
        </Grid>
      </Box>

      <ToastMessage toastObject={toastObject} setToastObject={setToastObject} />

    </>
  );
}

export default Project;
