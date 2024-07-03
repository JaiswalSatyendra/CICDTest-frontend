import { useCallback, useContext, useRef, useEffect, useState } from "react";
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
  FormGroup,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
  Typography,
  Checkbox,
  CardHeader,
  CardContent,
  InputLabel,
  MenuItem,
  Select,
  Tooltip,
  IconButton,
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  CircularProgress
} from "@mui/material";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import PredictionValue from "./PredictionValue";
import { SessionContext } from "../../../../contexts/SessionContext";
import ToastMessage from "../../ML-Analytics/TrustMatrix/ToastMessage";
import { DataGrid } from "@mui/x-data-grid";
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CloseIcon from '@mui/icons-material/Close';
import DisabledByDefaultIcon from '@mui/icons-material/DisabledByDefault';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CachedIcon from '@mui/icons-material/Cached';
import axios from "axios";
import { DataGridPro, GridFilterForm, GridToolbar } from "@mui/x-data-grid-pro";

function Project() {
  const { t } = useTranslation();
  const [value, setValue] = useState("");
  const [selectedModel, setselectedModel] = useState({});
  const [selectedAnalysis, setselectedAnalysis] = useState([]);
  const [selectedDatasetVal, setDatasetVal] = useState("");
  const [session, , , tablesData, setTablesData] = useContext(SessionContext);
  const [projectName, setprojectName] = useState("");
  const [tokenName, settokenName] = useState("");
  const [toastObject, setToastObject] = useState({});
  const [isSignedIn, setSignedIn] = useState({status:false,access_token:"",refresh_token:""});
  

  const { user } = session;

  const analysisModelList = [{ displayName: "Trust matrix", value: "trustmatrix" },
  { displayName: "Survey result", value: "surveyresult", color: "red" },
  { displayName: "Correspondence analysis", value: "ca" },
  { displayName: "Churn analysis", value: "churn" },
  { displayName: "Demographics", value: "demographics" },
  ]

  const [paginationModel, setPaginationModel] = useState({
    pageSize: 10,
    page: 0,
  });
  const [paginationModel1, setPaginationModel1] = useState({
    pageSize: 5,
    page: 0,
  });
  const [paginationModel2, setPaginationModel2] = useState({
    pageSize: 5,
    page: 0,
  });
  // const [rows, setRows] = useState([]);

  const [gridDataForChurn, setGridDataForChurn] = useState({
    columns: new Array(
      { field: "form", headerName: "Form Name", sortable: true, width: 230, },
      { field: "athena_table", headerName: "Dataset Name", sortable: true, width: 230, },
      { field: "template", headerName: "Template Name", sortable: true, width: 180, },
      { field: "form_url", headerName: "Form Url", sortable: true, width: 360, },
      { field: "created_on", headerName: "Created On", sortable: true, width: 220, },
      { field: "last_ingested", headerName: "Last Ingested", sortable: true, width: 220, },
      {
        field: "data_ingestion_button", headerName: "Ingest Data", sortable: true, align: "center", width: 100, renderCell: (data) => {
          let isShow = false;
          return (<div>
            {
              data.row.ingestion_status !== "running" &&
              (<Tooltip title={t("Ingest Data")} arrow>
                
                <IconButton
                  onClick={() => {
                    handleIngestData(data,isSignedIn.access_token,isSignedIn.refresh_token)
                  }}
                  color={data.row.ingestion_status === "success" ? "success" : (data.row.ingestion_status === "failed" ? "error" : "primary")}
                >
                  <ArrowCircleDownIcon fontSize="large" />
                </IconButton>
              </Tooltip>)
            }
            {
              (data.row.ingestion_status === "running") &&
              (<Tooltip title={t("Ingest Data")} arrow>
                <IconButton
                  color="primary"
                >
                  <CircularProgress fontSize="large" />
                </IconButton>
              </Tooltip>)
            }
          </div>)

        },
      },
      {
        field: "analysis", headerName: "Analysis Type", sortable: true, width: 180, renderCell: (data) => {
          return (
            <FormControl fullWidth size="small" disabled={data.row.ingestion_status === "success" ? false : true}>
              <InputLabel id={"demo-simple-select-label3" + data.id}>
                Select Analysis
              </InputLabel>
              <Select
                value={data.value}
                multiple
                labelId={"demo-simple-select-label3" + data.id}
                id={"demo-simple-select3" + data.id}
                label="Select Prediction Variable1"

                onChange={(e) => {
                  handleSurveyName(e, data);
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
                {analysisModelList.map((e) => {

                  return (
                    <MenuItem

                      disabled={(e.value === 'surveyresult' ? true : false)} value={e.value} key={e.value}>
                      {e.displayName}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          );
        },
      },
      {
        field: "analysis_button", headerName: "Start Analysis", sortable: true, align: "center", width: 120, renderCell: (data) => {

          return (
            // <Tooltip title={t("Start Analysis")} arrow>
            <IconButton disabled={data.row.ingestion_status === "success" ? false : true}
              onClick={() => {
                handleStartAnalysis(data.row)
              }}
              color="primary"
            >
              <PlayCircleIcon fontSize="large" />
            </IconButton>
            // </Tooltip>
          );
        },
      }
    ),
    rows: []
  });

  const [formTemplateData, setFormTemplateData] = useState({
    columns: new Array(
      { field: "template_name", headerName: "Template Name", sortable: true, width: 220, },
      { field: "industry", headerName: "Industry", sortable: true, width: 220, },
      // { field: "question", headerName: "Question", sortable: true, width: "auto", }
    ),
    rows: []
  })

  const [formTemplateQuestData, setFormTemplateQuesData] = useState({
    columns: new Array(
      { field: "displayName", headerName: "Question", sortable: true, width: 360, },
      {
        field: "hasInput", headerName: "Action", sortable: true, align: "right", width: 100, renderCell: (data) => {
          return (
            <IconButton disabled={data.row.hasInput ? false : true}
              onClick={() => {
                openQuestionBrandDialog(data.row)
              }}
              color="primary"
            >
              <AddCircleIcon fontSize="large" />
            </IconButton>
          );
        },
      }
    ),
    rows: []
  })

  const [showLoder, setLoaderShow] = useState(false);
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const [isOpenQuesBrandDialog, setIsOpenQuesBrandDialog] = useState(false);
  const [formId, setFormId] = useState("");
  const [workSpaceId, setWorkSpaceId] = useState("");
  const [listworkspaceName, getworkspaceName] = useState([]);
  const [listSelectedTemplate, setlistSelectedTemplate] = useState([]);
  const [selectedQuestionTemplate, setSelectedQuestionTemplate] = useState({});
  const [selectedIndustryName, setselectedIndustryName] = useState(null);
  const [questionInput, setQuestionInput] = useState("");


  const [counter, setCounter] = useState(0);



  const handleChangeProjectName = (event) => {
    setprojectName(event.target.value);
  };

  const handleChangeTokenName = (event) => {
    settokenName(event.target.value);
  };

  const handleSurveyName = (event, data) => {
    let ind = (data.id - 1)
    setGridDataForChurn((prevState) => {
      let newRow = prevState.rows;
      newRow[ind].analysis = event.target.value
      return {
        ...prevState,
        rows: newRow,
      };
    });
  }

  const handleIngestData = async (data) => {
    await axios.get(`${process.env.REACT_APP_API_URL}/user/getUser`, { withCredentials: true }).then((response)=>{
      if (response.data.user.access_token == undefined) {
        let newObj = {status:false,access_token:"",refresh_token:""}
        setSignedIn(newObj)
      } else {
        // let newObj1 = {status:true,access_token:response.data.user.access_token,refresh_token:response.data.user.refresh_token}
        // setSignedIn(newObj1)
        //getWorkspaceList({ "token": response.data.user.access_token }, response.data.user.refresh_token, 0, false)
        let newObj = {
          "user_id": data.row.user_id,
          "form_id": data.row.form_id,
          "form_name": data.row.form,
          "template_name": data.row.template,
          "analysis_name": data.row.analysis,
          "token": response.data.user.access_token,//tokenName,//data.row.token,
          "table_name": data.row.athena_table
        }
  
        axios.post(`${process.env.REACT_APP_API_URL}/dataset/dataIngestForSurvey`, newObj,
          {
            headers: {
              "Content-type": "application/json",
            },
            withCredentials: true,
          })
          .then((response) => {
  
          })
          .catch((err) => {
            // setLoaderShow(false)
          });
        let ind = (data.id - 1)
        setGridDataForChurn((prevState) => {
          let newRow = prevState.rows;
          newRow[ind].ingestion_status = "running"
          return {
            ...prevState,
            rows: newRow,
          };
        });
      }
    }).catch(err=>{
      console.log(err)
    })

    
  }

  useEffect(() => {
    let newList = [...selectedAnalysis];
    newList.forEach(ele => {
      ele.templateName = selectedModel.key
    })
    getSurveyListData()

  }, [selectedModel])

  // useEffect(async () => {
  //   let search = window.location.search;
  //   let params = new URLSearchParams(search);
  //   let newParam = params.get('code');
  //   if (newParam != null) {
  //     axios.post(`${process.env.REACT_APP_API_URL}/user/fetchTokenTypeform`, {
  //       grant_type: process.env.REACT_APP_TYPEFORM_GRANT_TYPE,
  //       refresh_token: "",
  //       code: newParam,
  //       client_id: process.env.REACT_APP_TYPEFORM_CLIENT_ID,
  //       client_secret: process.env.REACT_APP_TYPEFORM_CLIENT_SECRET,
  //       redirect_uri: process.env.REACT_APP_TYPEFORM_REDIRECT_URI,
  //       token_url: process.env.REACT_APP_TYPEFORMTOKEN_URL,
  //       user_id: user._id
  //     },
  //       {
  //         headers: {
  //           "Content-type": "application/json",
  //         },
  //         withCredentials: true,
  //       })
  //       .then((response) => {
  //         getWorkspaceList({ "token": response.data.access_token }, response.data.refresh_token, 0, true);
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //         // setLoaderShow(false)
  //       });
  //   }else{
  //     axios.get(`${process.env.REACT_APP_API_URL}/user/getUser`, { withCredentials: true }).then((response)=>{
  //       if (response.data.user.access_token == undefined) {
  //         let newObj = {status:false,access_token:"",refresh_token:""}
  //         setSignedIn(newObj)
  //       } else {
  //         let newObj = {status:true,access_token:response.data.user.access_token,refresh_token:response.data.user.refresh_token}
  //         setSignedIn(newObj)
  //       }
  //     }).catch(err=>{
  //       console.log(err)
  //     })
  //   }
     

  // }, [])

  const getSurveyListData = () => {
    let newObj = { user_id: user._id }
    let newgridDataForChurn = { ...gridDataForChurn };
    let newList1 = []
    axios.post(`${process.env.REACT_APP_API_URL}/dataset/getSurveyProject`, newObj,
      {
        headers: {
          "Content-type": "application/json",
        },
        withCredentials: true,
      })
      .then((response) => {
        response.data.data.forEach((ele, ind) => {
          newList1.push({
            "id": ind + 1,
            "form": ele.form_name,
            "user_id": ele.user_id,
            "token": ele.token,
            "form_id": ele.form_id,
            "template": ele.template,
            "created_on": ele.created_on,
            "last_ingested": ele.last_ingested,
            "analysis": ele.analysis_name.length == 0 ? ["surveyresult"] : ele.analysis_name,
            "ingestion_status": ele.ingestion_status,
            "athena_table": ele.athena_table,
            "form_url": "https://survey.typeform.com/to/" + ele.form_id
          })
        })
        setFormTemplateQuesData((prevState) => {
          return {
            ...prevState,
            rows: [],
          };
        });
        getTemplateSchemaData();
        setGridDataForChurn((prevState) => {
          return {
            ...prevState,
            rows: newList1,
          };
        });

      })
      .catch((err) => {
        // setLoaderShow(false)
      });
  }

  
  const openCreateSurveySignPop = async () => {
    window.location = 'https://admin.typeform.com/oauth/authorize?client_id=' + process.env.REACT_APP_TYPEFORM_CLIENT_ID + '&scope=offline+workspaces:read+workspaces:write+accounts:read+responses:read+responses:write+forms:write+forms:read+webhooks:read+webhooks:write&redirect_uri=' + process.env.REACT_APP_TYPEFORM_REDIRECT_URI + '&state=xyz789';
  }

  const openCreateSurveyPopWithAuth = async () => {
      // getWorkspaceList({ "token": isSignedIn.access_token }, isSignedIn.refresh_token, 0, true)
  }

  const getWorkspaceList = async (newBodyObj, refreshToken, count, isForCreate) => {
    count = count + 1
    if (isForCreate && isSignedIn.status) {
      setLoaderShow(true);
      setIsOpenDialog(true)
    }
    axios
      .post(`${process.env.REACT_APP_AMEZON_AWSAPI_URL}/workspace/`, newBodyObj)
      .then((response) => {
        console.log("here", response);
        setLoaderShow(false)
        if (response.data.data != null) {
          let newWorkspace = [];
          response.data.data.forEach(ele => {
            newWorkspace.push({ "displayName": ele.name, "value": ele.id, "count": ele.count })
          })
          settokenName(newBodyObj.token);
          getworkspaceName(newWorkspace);
          axios.get(`${process.env.REACT_APP_API_URL}/user/getUser`, { withCredentials: true }).then((response)=>{
            if (response.data.user.access_token == undefined) {
              let newObj = {status:false,access_token:"",refresh_token:""}
              setSignedIn(newObj)
            } else {
              let newObj = {status:true,access_token:response.data.user.access_token,refresh_token:response.data.user.refresh_token}
              setSignedIn(newObj)
            }
          }).catch(err=>{
            console.log(err)
          })
          // let newObj = {status:true,access_token:newBodyObj.token,refresh_token:refreshToken}
          // setSignedIn(newObj)
          // window.location = process.env.REACT_APP_TYPEFORM_REDIRECT_URI;
        } else {
          axios.post(`${process.env.REACT_APP_API_URL}/user/fetchTokenTypeform`, {
            grant_type: "refresh_token",
            refresh_token: refreshToken,
            code: "",
            client_id: process.env.REACT_APP_TYPEFORM_CLIENT_ID,
            client_secret: process.env.REACT_APP_TYPEFORM_CLIENT_SECRET,
            redirect_uri: process.env.REACT_APP_TYPEFORM_REDIRECT_URI,
            token_url: process.env.REACT_APP_TYPEFORMTOKEN_URL,
            user_id: user._id
          },
            {
              headers: {
                "Content-type": "application/json",
              },

              withCredentials: true,
            })
            .then((response) => {
              if (count == 1) {
                // getWorkspaceList({ "token": response.data.access_token }, response.data.refresh_token, count, true)
              }
            })
            .catch((err) => {
              console.log(err);
              getworkspaceName([]);
              setLoaderShow(false)
            });
        }
      })
      .catch((err) => {
        getworkspaceName([]);
        setLoaderShow(false)
      });
  }

  const openCreateSurveyPop = async () => {
    if (selectedModel.key === undefined) {
      setToastObject({
        message: t("Please choose use case"),
        severity: "error",
        open: true,
      });
    }
    else if (projectName === "") {
      setToastObject({
        message: t("Please fill all required field"),
        severity: "error",
        open: true,
      });
    } else if (formTemplateQuestData.rows.length == 0) {
      setToastObject({
        message: t("Please Select form template"),
        severity: "error",
        open: true,
      });
    }
    else {
      openCreateSurveyPopWithAuth();
    }
  }

  const closeDialog = () => {
    setIsOpenDialog(false);
  };


  const getTemplateSchemaData = async () => {
    let newObj = {
      "template_name": selectedModel.key,
      "user_id": user._id
    }
    if (selectedModel.key !== undefined) {
      await axios.post(`${process.env.REACT_APP_API_URL}/dataset/getFormTemp`, newObj,
        {
          headers: {
            "Content-type": "application/json",
          },
          withCredentials: true,
        })
        .then((response) => {
          console.log(response.data.data);
          let schemaGraphData = new Array();
          response.data.data.forEach((ele, ind) => {
            let questionList = JSON.parse(ele.template_json)
            schemaGraphData.push({ "id": ind + 1, "template_name": ele.template_name, "industry": ele.industry, "questionList": questionList })
            // questionList.forEach((ele1, ind) => {
            //   schemaGraphData.push({ "id": ind + 1, "template_name": ele.template_name, "industry": ele.industry, "question": ele1.title })
            // })
          })
          setlistSelectedTemplate(schemaGraphData);
          setFormTemplateData((prevState) => {
            return {
              ...prevState,
              rows: schemaGraphData,
            };
          });
        })
        .catch((err) => {
          // setLoaderShow(false)
        });
    }
  }

  const handleWorkSpaceName = async (ev) => {
    setWorkSpaceId(ev.target.value)
  }

  const handleCreateSurvey = async (ev) => {
    let newBodyObj1 = { "token": tokenName, "form_name": projectName, "template_name": "customer_retention", "workspace_id": workSpaceId, "industry": selectedIndustryName, "template_json": formTemplateQuestData.rows }
    setLoaderShow(true);
    await axios
      .post(`${process.env.REACT_APP_AMEZON_AWSAPI_URL}/create/`, newBodyObj1)
      .then((response) => {
        setLoaderShow(false)
        if (response.data.status === "success") {
          setFormId(response.data.message)
          let newBodyObj = {
            "form_name": projectName,
            "form_id": response.data.message,
            "user_id": user._id,
            "template": selectedModel.key,
            "token": tokenName,
            "athena_table": "",
            "ingestion_status": "notstarted",
            "error": null,
            "created_on": null,
            "last_ingested": null,
            "analysis_name": ["surveyresult"],
            "industry": selectedIndustryName,
            "template_json": JSON.stringify(formTemplateQuestData.rows),
          }

          closeDialog();
          axios
            .post(`${process.env.REACT_APP_API_URL}/dataset/createSurvey`, newBodyObj,
              {
                headers: {
                  "Content-type": "application/json",
                },
                withCredentials: true,
              })
            .then(async (response) => {
              if (response.data.success) {
                setToastObject({
                  message: t(response.data.message),
                  severity: "success",
                  open: true,
                });
                getSurveyListData()
              } else {
                setToastObject({
                  message: t(response.data.message),
                  severity: "error",
                  open: true,
                });
              }
            })
            .catch((err) => {
              setLoaderShow(false)
            });
        } else {
          setFormId("")
        }
      })
      .catch((err) => {
        setFormId("")
        setLoaderShow(false)
      });
  }

  const handleStartAnalysis = (data) => {
    let newList = []
    data.analysis.forEach(ele => {
      newList.push({
        projectid: data.form,
        userid: data.user_id,
        templateName: data.template,
        analysisName: ele,
        status: "running",
        tablename: data.athena_table,
        createdon: null,
        error: null
      })
    })

    fetch(`${process.env.REACT_APP_API_URL}/dataset/savesurveyproject`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(newList),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setToastObject({
            message: t("Analysis started successfully"),
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

  };

  const getTemplateData = async (params) => {
    let value = listSelectedTemplate.filter(p => p.id == params.row.id && p.industry == params.row.industry && p.template_name == params.row.template_name)
    let quest = []
    value[0].questionList.forEach((ele1, ind) => {
      let model = { "id": ind + 1, "displayName": ele1.displayName, "fieldProperties": ele1.fieldProperties, "fieldType": ele1.fieldType, "hasInput": ele1.hasInput, "input": ele1.input, "questionCode": ele1.questionCode, "ref": ele1.ref, "title": ele1.title }
      quest.push(model)
    })
    setselectedIndustryName(params.row.industry);
    setFormTemplateQuesData((prevState) => {
      return {
        ...prevState,
        rows: quest,
      };
    });
  }


  const closeQuestBrandDialog = () => {
    setIsOpenQuesBrandDialog(false);
    let selectedQues = selectedQuestionTemplate
    let myArray = questionInput.split('\n');
    formTemplateQuestData.rows.forEach(ele => {
      if (ele.id == selectedQues.id && ele.displayName == selectedQues.displayName && ele.hasInput) {
        ele.input = myArray.filter(p => p != "")
      }
    })
  };
  const openQuestionBrandDialog = (data) => {
    setQuestionInput(data.input === null ? "" : data.input.join('\n'))

    setIsOpenQuesBrandDialog(true);
    setSelectedQuestionTemplate(data);
  };

  const onChangeTextField = (event) => {
    console.log(event.target.value);
    setQuestionInput(event.target.value)
    // let selectedQues = selectedQuestionTemplate
    // let fieldValue = event.target.value
    // let myArray = fieldValue.split('\n');
    // formTemplateQuestData.rows.forEach(ele => {
    //   if (ele.id == selectedQues.id && ele.displayName == selectedQues.displayName && ele.hasInput) {
    //     ele.input = myArray.filter(p => p != "")
    //   }
    // })
  }

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
                  Step 1: Choose your template
                </Typography>
              </FormLabel>
              <Box
                sx={{
                  mt: 3,
                }}
              >
                <Usecase loggedUserId={user._id} selectedModel={setselectedModel} isSignedIn={isSignedIn}/>
                {/* <Usecase loggedUserId={user._id} selectedModel={setselectedModel} formSchema={getTemplateSchemaData} /> */}
              </Box>
            </FormControl>
          </Grid>
          <Divider />
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
                Step 2: Select Survey Industry
              </Typography>
            </FormLabel>
          </FormControl>
          <Card
            sx={{
              mx: 3,
              width: '100%'
            }}
          >
            <CardContent>
              <Grid container spacing={4} sx={{ px: 2, mb: 2 }}>
                <Grid item xs={6}>
                  <Box sx={{ height: 400, }}>
                    <DataGridPro
                      onRowClick={getTemplateData}{...formTemplateData}
                      rows={formTemplateData.rows}
                      columns={formTemplateData.columns}
                      pageSizeOptions={[5, 10, 50, 100]}
                      checkboxSelection={true}
                      disableSelectionOnClick
                      pagination
                      //filterModel={{ items: [{ field: 'category', operator: 'contains', value: filterItm }], }}
                      paginationModel={paginationModel1}
                      onPaginationModelChange={setPaginationModel1}

                    />
                    {/* <DataGrid
                      onRowClick={getTemplateData}{...formTemplateData}
                      rows={formTemplateData.rows}
                      columns={formTemplateData.columns}
                      pageSize={5}
                      rowsPerPageOptions={[5]}
                      // checkboxSelection
                      disableSelectionOnClick
                      experimentalFeatures={{ newEditingApi: true }}
                    /> */}
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box sx={{ height: 400, }}>

                    <DataGridPro
                      rows={formTemplateQuestData.rows}
                      columns={formTemplateQuestData.columns}
                      pageSizeOptions={[5, 10, 50, 100]}
                      checkboxSelection={true}
                      disableSelectionOnClick
                      pagination
                      //filterModel={{ items: [{ field: 'category', operator: 'contains', value: filterItm }], }}
                      paginationModel={paginationModel2}
                      onPaginationModelChange={setPaginationModel2}

                    />

                    {/* <DataGrid
                      rows={formTemplateQuestData.rows}
                      columns={formTemplateQuestData.columns}
                      pageSize={5}
                      rowsPerPageOptions={[5]}
                      checkboxSelection
                      disableSelectionOnClick
                      experimentalFeatures={{ newEditingApi: true }}
                    /> */}
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
          <Grid container spacing={4} sx={{ px: 4, mb: 2 }}>
            <Grid item xs={12}>

            </Grid>
            <Divider />

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
                  Step 3: Enter Project Details
                </Typography>
                {/* <Button
                  sx={{ wodth: "5px", py: 1, px: 1.5, borderRadius: 0.5, float: "left", backgroundColor: "#fff", height: "1px" }}
                  color="primary"
                  size="large"
                  variant="contained"
                  // type="submit"
                  onClick={openCreateSurveyPop1}
                >
                  {t("test")}
                </Button> */}
              </FormLabel>
            </FormControl>
            <Grid item xs={12} md={12}>
              {/* <Dataset table={setDatasetVal} /> */}
              <Card variant="outlined">
                <Box
                  p={1.5}
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Grid container spacing={4} sx={{ px: 1, mb: 2 }}>
                    <Grid item xs={12} md={12}>
                      <Typography gutterBottom variant="h4">
                        {t("Project Details*")}
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
                <Divider />
                <Box
                  sx={{
                    maxWidth: "100%",
                    padding: ".5rem",
                  }}
                > </Box>
                <Grid container spacing={4} sx={{ px: 1, mb: 2 }}>
                  <Grid item xs={12} md={5}>
                    <FormControl sx={{ width: 1 }}>

                      <TextField
                        fullWidth
                        label="Project/Form Name"
                        id="project-name"
                        onChange={handleChangeProjectName}
                      />

                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={2}>
                    {/* <FormControl sx={{ width: 1 }}>

                      <TextField
                        fullWidth
                        label="Access Token"
                        id="access-token"
                        onChange={handleChangeTokenName}
                      />
                    </FormControl> */}
                     <Button
                      sx={{ py: 1, px: 1, borderRadius: 0.5 }}
                      color="primary"
                      size="large"
                      variant="contained"
                      // type="submit"
                      disabled={isSignedIn.status? true : false}
                      onClick={openCreateSurveySignPop}
                    >
                      
                      {isSignedIn.status?t("Signed In"):t("Sign In")}
                    </Button>




                  </Grid>
                  <Grid item xs={12} md={2}>
                    <Button
                      disabled={isSignedIn.status? false : true}
                      sx={{ py: 1, px: 1.5, borderRadius: 0.5 }}
                      color="primary"
                      size="large"
                      variant="contained"
                      // type="submit"
                      onClick={openCreateSurveyPop}
                    >
                      {t("Create survey")}
                    </Button>

                    {/* <FormControl sx={{ width: 1, mt: 1 }}>
                <Card variant="outlined">
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
                      padding: "1.5rem",
                    }}
                  >
                    <FormGroup>
                      <Grid container spacing={4}>
                        {
                          analysisModelList.map((e) => {
                            if (e.value === 'surveyresult') {
                              return (<Grid item xs={12} md={4}><FormControlLabel key={e.value} control={<Checkbox checked={true} disabled={true} />} onChange={(event) => { handleChange(event) }} name={e.value} value={e.value} label={e.displayName} /></Grid>)
                            } else {
                              return (<Grid item xs={12} md={4}><FormControlLabel key={e.value} control={<Checkbox disabled={projectName === ""? true : false} />} onChange={(event) => { handleChange(event) }} name={e.value} value={e.value} label={e.displayName} /></Grid>)
                            }
                          })
                        }
                      </Grid>
                    </FormGroup>
                  </Box>

                </Card>
              </FormControl> */}
                  </Grid>
                </Grid>
              </Card>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Card
              sx={{
                mx: 3,
              }}
            >
              {/* <CardHeader title={t('dddd')} /> */}
              {/* <Divider /> */}
              <CardContent>
                <Tooltip title={t("Refresh graph")} arrow>
                  <IconButton
                    color="primary" onClick={getSurveyListData}
                    sx={{
                      py: 0,

                    }}
                  >
                    <CachedIcon fontSize="large" />
                  </IconButton>
                </Tooltip>
                <div style={{ "height": "50vh", "textAlign": "center" }}>

                  <Box sx={{ height: 400, width: '100%' }}>

                    <DataGridPro

                      rows={gridDataForChurn.rows}
                      columns={gridDataForChurn.columns}
                      pageSizeOptions={[5, 10, 50, 100]}
                      checkboxSelection={true}
                      disableSelectionOnClick
                      pagination
                      initialState={{ pinnedColumns: {right: ['data_ingestion_button','analysis','analysis_button'] } }}
                      
                      //filterModel={{ items: [{ field: 'category', operator: 'contains', value: filterItm }], }}
                      paginationModel={paginationModel}
                      onPaginationModelChange={setPaginationModel}

                    />


                    {/* <DataGrid
                      rows={gridDataForChurn.rows}
                      columns={gridDataForChurn.columns}
                      pageSize={5}
                      rowsPerPageOptions={[5, 10, 15]}
                      checkboxSelection
                      disableSelectionOnClick
                      experimentalFeatures={{ newEditingApi: true }}

                    /> */}
                  </Box>

                </div>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {isOpenDialog && (
          <Dialog
            fullWidth
            maxWidth="sm"
            open={true}
            onClose={closeDialog}
          >
            <DialogTitle sx={{ m: 0, p: 2 }}>
              <p>Workspace</p>
              <IconButton
                aria-label="close"
                onClick={closeDialog}
                sx={{
                  position: 'absolute',
                  right: 8,
                  top: 2,
                  color: (theme) => theme.palette.grey[500],
                }}
              >
                <CloseIcon />
              </IconButton>
            </DialogTitle>
            <DialogContent dividers>
              <div style={{ "height": "50vh", "textAlign": "center" }}>
                {showLoder &&
                  <CircularProgress />
                }
                {!showLoder && listworkspaceName.length !== 0 &&
                  <FormControl fullWidth size="small">
                    <InputLabel id={"demo-simple-select-work3"}>
                      Select Workspace
                    </InputLabel>
                    <Select
                      value={workSpaceId}
                      labelId={"demo-simple-select-work3"}
                      id={"demo-simple-work3"}
                      label="Select Workspace"
                      onChange={(e) => {
                        handleWorkSpaceName(e);
                      }}
                      sx={{
                        backgroundColor: "white",
                        borderRadius: "5px",
                      }}
                    >
                      {listworkspaceName.map((e) => {
                        return (
                          <MenuItem value={e.value} key={e.value}>
                            {e.displayName}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                }
                {!showLoder && listworkspaceName.length === 0 &&
                  <p>No data found</p>
                }
              </div>

            </DialogContent>
            <DialogActions>
              {/*  */}
              <Box
                style={{
                  width: "100%",
                  height: "80px",
                  boxShadow:
                    "0px 2px 8px -3px rgb(34 51 84 / 20%), 0px 5px 22px -4px rgb(34 51 84 / 10%)",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}>
                <Button autoFocus color="primary"
                  size="large"
                  variant="contained" onClick={handleCreateSurvey}>
                  Submit
                </Button>
              </Box>
            </DialogActions>
          </Dialog>
        )}

        {isOpenQuesBrandDialog && (
          <Dialog
            fullWidth
            maxWidth="xs"
            open={true}
            onClose={closeQuestBrandDialog}
          >
            <DialogTitle sx={{ m: 0, p: 2 }}>
              <p>Add choices</p>
              <small>NOTE: Write or paste your choices below. Each choice must be on a seperate line.</small>
              <IconButton
                aria-label="close"
                onClick={closeQuestBrandDialog}
                sx={{
                  position: 'absolute',
                  right: 8,
                  top: 2,
                  color: (theme) => theme.palette.grey[500],
                }}
              >
                <CloseIcon />
              </IconButton>
            </DialogTitle>
            <DialogContent dividers>
              <div style={{ "height": "30vh", "textAlign": "center" }}>
                <TextField sx={{
                  width: '100%'
                }}
                  id="standard-multiline-static"
                  multiline
                  value={questionInput}
                  onChange={onChangeTextField}
                  rows={11}
                  variant="standard"
                />
              </div>
            </DialogContent>
            <DialogActions>
              {/*  */}
              <Box
                style={{
                  width: "100%",
                  height: "80px",
                  boxShadow:
                    "0px 2px 8px -3px rgb(34 51 84 / 20%), 0px 5px 22px -4px rgb(34 51 84 / 10%)",
                  display: "flex",
                  justifyContent: "end",
                  alignItems: "center",
                }}>
                <Button autoFocus color="primary"
                  size="large"
                  variant="contained" onClick={closeQuestBrandDialog}>
                  Save
                </Button>
              </Box>
            </DialogActions>
          </Dialog>
        )}
      </Box>
      <ToastMessage toastObject={toastObject} setToastObject={setToastObject} />
    </>
  );
}

export default Project;
