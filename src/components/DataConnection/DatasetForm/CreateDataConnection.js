import * as React from "react";
import {
  Autocomplete,
  Box,
  Button,
  FormControl,
  FormLabel,
  Grid,
  styled,
  TextField,
  Typography,
  InputAdornment,
  CardContent,
  Card,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  ListItemButton,
  CircularProgress,
  LinearProgress,
  MenuItem,
  Select,
  InputLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  IconButton,
  Stack,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { useContext, useEffect, useState } from "react";
import { SessionContext } from "../../../contexts/SessionContext";
import { SnackbarProvider, useSnackbar } from "notistack";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Chip from "@mui/material/Chip";
import CardActions from "@mui/material/CardActions";
import CardMedia from "@mui/material/CardMedia";
import CheckIcon from "@mui/icons-material/Check";
import ListItemIcon from "@mui/material/ListItemIcon";
import Collapse from "@mui/material/Collapse";
import Switch from "@mui/material/Switch";

import refreshData from "../../../assets/icons/data-refresh.svg";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import PieChartIcon from "@mui/icons-material/PieChart";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { DataGridPro } from "@mui/x-data-grid-pro";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import Chart from "react-apexcharts";
import axios from "axios";
// import { uploadFile } from "./multiPartUpload";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import CloseIcon from "@mui/icons-material/Close";

import ConnectDialog from "../dialog/ConnectDialog";
import UploadDialog from "../dialog/UploadDialog";
import {
  categoriesData_cs,
  categoriesData_brand,
  categoriesData_nps,
  templateData,
} from "../../../assets/data/result";

import AddIcon from "@mui/icons-material/Add";
import ToastMessage from "../../organisms/UnlayerEmailEditor/ToastMessage";
import Cookies from "js-cookie";
import { useLocation, useNavigate } from "react-router";
import MlResultsConnection from "../../../content/dashboards/DataPlatform/ML-result";
import { DataGrid } from "@mui/x-data-grid";
import { debounce } from "lodash";
import ChurnAnalysisResult from "../../../content/dashboards/DataPlatform/churn-analysis";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { logDOM } from "@testing-library/react";
import HeaderButtons from "../../../layouts/ExtendedSidebarLayout/Header/Buttons";
import HeaderUserbox from "../../../layouts/ExtendedSidebarLayout/Header/Userbox";
import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import ConnectorsLoader from "../connectors-loader";
import { useRef } from "react";
import MarketResearchAnalysis from "../../../content/dashboards/DataPlatform/market-research-analysis";
import tr from "date-fns/locale/tr/index";
import { CRMListData, SurveyListData, customerServiceListData, dataWarehouseDatabaseListData, financialListData, macroMicroEconomics, reviewsListData, sassPlatform, socialmediaList, ecommerceListData } from "../../../assets/data/create-data-connection";

const steps = ["Name & Source", "Template", "Data Visualization"];

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}
const AvatarNotSuccess = styled(Avatar)(
  ({ theme }) => `
  background: ${theme.colors.alpha.black[8]};
    width: ${theme.spacing(4)};
    height: ${theme.spacing(4)};
`
);
const AvatarSuccess = styled(Avatar)(
  ({ theme }) => `
    background: ${theme.colors.success.light};
    width: ${theme.spacing(4)};
    height: ${theme.spacing(4)};
`
);

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function CreateDataConnection() {
  const location = useLocation();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const errorRef = useRef()
  const [emailpopupopen, setemailpopupopen] = React.useState(false);
  const [announcement, Isannouncement] = useState(true);
  const [session, ,] = useContext(SessionContext);
  const { user } = session;
  const [activeStep, setActiveStep] = React.useState(0);
  const [selectedProjectId, setSelectedProjectId] = React.useState("");
  const [value, setValue] = React.useState(0); //selected tab for integration and upload
  const [checked, setChecked] = React.useState(new Array());
  const [selected, setSelected] = React.useState(new Array());
  const [open, setOpen] = React.useState(false);
  const [openHubspot, setOpenHubspot] = React.useState(false);
  const [openZendesk, setOpenZendesk] = React.useState(false);
  const [isConnectedZendesk, setisConnectedZendesk] = React.useState(false);
  const [openFacebook, setOpenFacebook] = React.useState(false);
  const [openTwitter, setOpenTwitter] = React.useState(false);
  const [openFeshdesk, setOpenFeshdesk] = React.useState(false);
  const [openSalesforce, setOpenSalesforce] = React.useState(false);
  const [openbraze, setOpenbraze] = React.useState(false);
  const [openInstagram, setOpenInstagram] = React.useState(false);
  const [openKlaviyo, setOpenKlaviyo] = React.useState(false);
  const [openIntercom, setOpenIntercom] = React.useState(false);
  const [openShopify, setOpenShopify] = React.useState(false);

  const [errorMessgeDetais, seterrorMessgeDetais] = React.useState(false);
  const [warningMessgeDetais, setwarningMessgeDetais] = React.useState(false);
  const [isConnectedTypeForm, setisConnectedTypeForm] = React.useState(false);
  const [isOpenPopupTypeform, setisOpenPopupTypeform] = React.useState(false);
  const [isConnectedHubspot, setisConnectedHubspot] = React.useState(false);
  const [isOpenPopupHubspot, setisOpenPopupHubspot] = React.useState(false);
  const [isUpload, setIsUpload] = React.useState(false);
  const [isTypeform, setIsTypeform] = React.useState(false);
  const [showLoder, setLoaderShow] = useState(false);
  const [showLoderVisual, setLoderVisual] = useState(false);
  const [typeformIngestionStatus, setTypeformIngestionStatus] = useState({ status: false, percentage: 30 });
  const [paramsForFetchResult, setParamsForFetchResult] = React.useState({});
  const [selectedRows, setSelectedRows] = React.useState([]);
  const [selectionModel, setSelectionModel] = React.useState(() => []);
  const [gridDataForGrid, setGridDataForGrid] = useState({
    columns: [],
    rows: [],
    columns1: []
  });

  const [openConfirmDelete, setOpenConfirmDelete] = useState(false);
  const [isShowSurveyMapp, setIsShowSurveyMapp] = useState([]);
  const [listworkspaceName, getworkspaceName] = useState([]);
  const [listListOfContact, getlistListOfContact] = useState([]);
  const [tokenName, settokenName] = useState("");
  const [refreshtokenName, setRefreshtokenName] = useState("");
  const [hubspotTokenName, setHubspotTokenName] = useState("");
  const [hubspotRefreshtokenName, setHubspotRefreshtokenName] = useState("");
  const [projectName, setProjectName] = useState("");
  const [selectedDataSourceForSurvey, setselectedDataSourceForSurvey] = useState("");
  const [selectedSurvey, setSelectedSurvey] = useState({});
  const [openAddNewDatasource, setOpenAddNewDatasource] = useState(false);
  const [allSurveyListTypeForm, setallSurveyListTypeForm] = useState([]);
  const [selectedTypeSurveyList, setselectedTypeSurveyList] = useState([]);
  const [selectedTypeSurvey, setSelectedTypeSurvey] = useState([]);
  const [isModalDataTypeform, setIsModalDataTypeform] = useState([]);
  const [isModalDataHubspot, setIsModalDataHubspot] = useState([]);
  const [isModalDataFile, setIsModalDataFile] = useState([]);
  const [checkProgressDatasetStatus, setcheckProgressDatasetStatus] = useState([]);
  const [isRunningIngestion, setisRunningIngestion] = useState(false);
  const [isError, setisError] = useState(true)
  const interval = React.useRef();
  const [isRunningAnalysis, setisRunningAnalysis] = useState({ processList: [], status: false, sccessPercent: 10 });
  const intervalForAnalysis = React.useRef();
  const intervalForCategoryMapping = React.useRef();
  const [datarefreshloader, setdatarefreshloader] = useState(true);

  const [datarefreshupdated, setdatarefreshupdated] = useState(true);


  const [warningNotificationAlert, setwarningNotificationAlert] = useState({
    alertType: "",
    alertHeaderText: " ",
    alertTextMessage: " ",
    alertVisible: false,
  });

  const [projectNameValid, setprojectNameValid] = useState({
    isduplicate: false,
    isEmpty: false,
    inPatternMatch: false,
    textMessage: "",
  });

  const [errorListDisplay, seterrorListDisplay] = useState([]);
  const [dataSourceMailObj, setdataSourceMailObj] = useState({
    first_name: "",
    last_name: "",
    email: "",
    datasource: "",
    temmplateName: "",
    message: "",
    isSubmit: false
  });

  const [changeCatMappingData, setChangeCatMappingData] = useState({});

  const handleOpen = (ev, value) => {
    if (ev != null) {
      ev.stopPropagation();
    }
    ev.stopPropagation();
    if (value == "Typeform") {
      localStorage.setItem("hubspotMapping", JSON.stringify(isModalDataHubspot));
      setOpen(true);
    }
    else if (value == "Hubspot") {
      localStorage.setItem("typeformMapping", JSON.stringify(isModalDataTypeform));
      setOpenHubspot(true);
    }
    else if (value == "Zendesk") {
      localStorage.setItem("typeformMapping", JSON.stringify(isModalDataTypeform));
      setOpenZendesk(true);
    }
    else if (value == "Facebook") {
      localStorage.setItem("facebookMapping", JSON.stringify(isModalDataTypeform));
      setOpenFacebook(true);
    }
    else if (value == "Twitter") {
      localStorage.setItem("twitterMapping", JSON.stringify(isModalDataTypeform));
      setOpenTwitter(true);
    }
    else if (value == "Feshdesk") {
      localStorage.setItem("feshdeskMapping", JSON.stringify(isModalDataTypeform));
      setOpenFeshdesk(true);
    }
    else if (value == "Salesforce") {
      localStorage.setItem("salesforceMapping", JSON.stringify(isModalDataTypeform));
      setOpenSalesforce(true);
    }
    else if (value == "braze") {
      localStorage.setItem("salesforceMapping", JSON.stringify(isModalDataTypeform));
      setOpenbraze(true);
    }

    else if (value == "Instagram") {
      localStorage.setItem("instagramMapping", JSON.stringify(isModalDataTypeform));
      setOpenInstagram(true);
    }
    else if (value == "Klaviyo") {
      localStorage.setItem("KlaviyoMapping", JSON.stringify(isModalDataTypeform));
      setOpenKlaviyo(true);
    }
    else if (value == "Intercom") {
      localStorage.setItem("intercomMapping", JSON.stringify(isModalDataTypeform));
      setOpenIntercom(true);
    }
    else if (value == "Shopify") {
      localStorage.setItem("shopifyMapping", JSON.stringify(isModalDataTypeform));
      setOpenShopify(true);
    }

  };

  const emailpopupOpen = (objectkey, objectVal) => {
    let newObj = {
      first_name: user.username,
      last_name: "",
      email: user.company_email,
      datasource: objectkey == "datasource" ? objectVal : "",
      temmplateName: objectkey == "temmplateName" ? objectVal : "",
      isSubmit: false
    }
    setdataSourceMailObj(newObj);
    setemailpopupopen(true);
  };

  const emailpopupClose = () => {
    console.log("---bbbbb-", dataSourceMailObj)
    setdataSourceMailObj({
      first_name: "",
      last_name: "",
      email: "",
      datasource: "",
      temmplateName: "",
      isSubmit: false
    });
    setemailpopupopen(false);
  };

  const hideannouncementBar = () => {
    Isannouncement(false);
  }

  const collapseAndExpandError = (val, ind) => {
    let newObj = [...errorListDisplay];
    newObj[ind].isCollapsable = !newObj[ind].isCollapsable;
    seterrorListDisplay(newObj)
  }

  const checkedMappingForSurvey = (value) => {
    setIsModalDataTypeform(value);
    let listOfDataSource1 = [...checkProgressDatasetStatus];
    let connectedSourceType = [...selected];
    let tmpConnectedSourceType = connectedSourceType.filter(
      (ele) => ele.value != "typeform"
    );
    tmpConnectedSourceType.push({ label: "Typeform", value: "typeform" });
    setSelected(value.length == 0 ? [] : tmpConnectedSourceType);
    value.forEach(ele => {
      listOfDataSource1.push({
        dataSource: "typeform",
        dataSourceText: `${ele.formName}`,
        progress_percent: "40",
        status: "progress",
      });
    })
    setcheckProgressDatasetStatus(value.length == 0 ? [] : listOfDataSource1);
    setisRunningIngestion(value.length == 0 ? false : true);
  };

  const checkedMappingForHubspot = (value) => {
    // clearInterval(interval.current);
    // setTimeout(() => {

    // }, 1000);
    setIsModalDataHubspot(value);
    let connectedSourceType = [...selected];
    let tmpConnectedSourceType = connectedSourceType.filter((ele) => ele.value != "hubspot");
    tmpConnectedSourceType.push({ label: "Hubspot", value: "hubspot" });
    setSelected(value.length == 0 ? [] : tmpConnectedSourceType);
    let listOfDataSource1 = [...checkProgressDatasetStatus];
    value.forEach(ele => {
      // Hubspot ${ele.hs_object == 'contact' ? 'contact' : 'survey'} 
      listOfDataSource1.push({
        dataSource: "hubspot",
        dataSourceText: (`${ele.displayName}`),
        progress_percent: "40",
        status: "progress",
      });
    })
    setcheckProgressDatasetStatus(value.length == 0 ? [] : listOfDataSource1);
    setisRunningIngestion(value.length == 0 ? false : true);
  };

  const checkedMappingForFile = (value) => {
    setIsModalDataFile(value);
    let connectedSourceType = [...selected];
    let tmpConnectedSourceType = connectedSourceType.filter(
      (ele) => ele.value != "file"
    );
    tmpConnectedSourceType.push({ label: "File", value: "file" });
    setSelected(tmpConnectedSourceType);
  };

  const handleTypeformOpen = () => {
    setIsTypeform(true);
  };

  const handleTypeformClose = () => {
    setIsTypeform(false);
  };

  const handleUploadOpen = () => {
    setIsUpload(true);
  };

  const handleClose = () => {
    setOpen(false);
    setOpenFacebook(false);
    setOpenZendesk(false);
    setOpenTwitter(false);
    setOpenHubspot(false);
    setOpenFeshdesk(false);
    setOpenSalesforce(false);
    setOpenbraze(false);
    setOpenInstagram(false);
    setOpenKlaviyo(false);
    setOpenIntercom(false);
    setOpenShopify(false);
  };

  const handleUploadClose = () => {
    setIsUpload(false);
  };

  const handleConfirmDelete = () => {
    setOpenConfirmDelete(true);
  };

  const handleToggle = (ev, val, name) => {
    setOpenAddNewDatasource(false);
    seterrorListDisplay([])

    if (val == 1 || val == 2 || val == 3 || val == 4 || val == 5 || val == 6) {
      let newChecked = [...checked];
      if (newChecked.indexOf(val) == -1) {
        setChecked([val]);
      } else {
        newChecked.splice(newChecked.indexOf(val), 1);
        setChecked(newChecked);
      }

      if (val == 1 || val == 4 || val == 5 || val == 6) {
        setCatMappingOption(categoriesData_cs);
      } else if (val == 2) {
        setCatMappingOption(categoriesData_brand);
      } else if (val == 3) {
        setCatMappingOption(categoriesData_nps);
      }

      if (ev != null && ev.target.checked != false) {
        axios.post(`${process.env.REACT_APP_API_URL}/survey/setNewQuestionMapping`, {
          user_id: user._id,
          template: name
        }).then(async (response1) => {
          if (response1.data.success) {
            setisError(true)
          } else {
            setisError(false)
          }
        })

        handleApplyFetchSurvey(name);
      }
    }
    else {
      emailpopupOpen("temmplateName", name)
    }
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const isStepOptional = (step) => {
    return step === 1;
  };

  const handleNext = async () => {
    errorRef.current.scrollIntoView({ behavior: 'smooth' })
    setisError(true)
    if (activeStep == 0) {
      let checkDuplicate = await checkProjectNameExist();
      // if (projectName.match(/[^a-zA-Z0-9_]/) !== null) {
      //   let isValiedProject = { ...projectNameValid };
      //   setprojectNameValid((prev) => ({
      //     ...isValiedProject,
      //     inPatternMatch: true,
      //     textMessage:
      //       "Select a project name excluding special characters or spaces.",
      //   }));
      //   errorRef.current.scrollIntoView({ behavior: 'smooth' })
      // }
      if (!checkDuplicate) {
        let isValiedProject = { ...projectNameValid };
        setprojectNameValid((prev) => ({
          ...isValiedProject,
          isduplicate: true,
          textMessage: "Project name already in use. Choose a unique name.",
        }));
        errorRef.current.scrollIntoView({ behavior: 'smooth' })
      }

      if (projectName.trim() == "") {
        let isValiedProject = { ...projectNameValid };
        setprojectNameValid((prev) => ({
          ...isValiedProject,
          isEmpty: true,
          textMessage: `Enter project name`,
        }));
        errorRef.current.scrollIntoView({ behavior: 'smooth' })
      } else if (selected.length == 0) {
        setisError(false)
        seterrorListDisplay([{ alertType: 'error-message', isCollapsable: true, short_text: 'Data Source Connection Error', message: ['Select at least one data source'] }])

        errorRef.current.scrollIntoView({ behavior: 'smooth' })
      } else {
        localStorage.setItem('projectName', projectName.trim());
        seterrorListDisplay([])
        setcheckProgressDatasetStatus([]);
        setisRunningIngestion(false);
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      }
    } else {
      let typeFormConnectedList = isShowSurveyMapp.filter((ele) => ele.dataType == "Typeform");

    if (typeFormConnectedList.length > 1) {
      isShowSurveyMapp.forEach((ele) => {
        if (ele.dataType == "Typeform") {
          ele.listMapping = typeFormConnectedList[typeFormConnectedList.length-1].listMapping
        }
      });
    }
      let found1 = isShowSurveyMapp.map((ele) => ele.listMapping).flat();
      let found2 = found1.filter((ele) => {
        return !ele.is_mapped;
      });
      if (found2.length == 0) {
        seterrorListDisplay([])
        createSurvey(true);
      } else {
        setisError(false)
        seterrorListDisplay([{ alertType: 'error-message', isCollapsable: true, short_text: 'Category Mapping Error', message: ['Please map question with category'] }])

        errorRef.current.scrollIntoView({ behavior: 'smooth' })
      }
    }

  };

  const handleGetSurveyMapp = async (dataSource, formName, formId, templacteName, questions) => {
    let newList = [];
    // setLoaderShow(true);
    await axios
      .post(`${process.env.REACT_APP_API_URL}/survey/getQuestionMapping`, {
        data_source: dataSource,
        form_name: formName,
        form_id: formId,
        user_id: user._id,
        analysis_template: templacteName,
        questions: questions,
      })
      .then(async (response1) => {
        if (response1.data.success) {
          setisError(true)
          let newData = JSON.parse(response1.data.data);
          newList = newData.map((ele, ind) => ({ ...ele, id: ind + 1 }));

        } else {
          newList = [];
          setisError(false)
          seterrorListDisplay([{ alertType: 'error-message', isCollapsable: true, short_text: 'Category Mapping Error', message: [response1.data.message] }])
        }
      })
      .catch((err) => {
        newList = [];
      });

    return newList;
  };

  const checkedDatasetStatusMongo = async (listOfSurvey) => {
    await axios
      .post(
        `${process.env.REACT_APP_API_URL}/survey/getSelectedDataSourceStatus`,
        {
          selectedSouce: listOfSurvey,
        }
      )
      .then(async (response1) => {
        let listOfDataSource1 = [];
        if (response1.data.data.length != 0) {
          let findInprogressIngestion = response1.data.data.filter((ele) => ele.status == "progress");
          let findInprogressIngestionerror = response1.data.data.filter((ele) => ele.message != "");

          if (findInprogressIngestionerror.length == 0) {
            setisError(true)
            let getStatus = (findInprogressIngestion.length == 0 ? false : true);
            setisRunningIngestion(getStatus);
            response1.data.data.forEach((ele) => {
              // `Typeform data processing......`
              // : `Typeform data processing completed`
              //  `Hubspot ${ele.hs_object == 'contact' ? 'contact' : 'survey'} ${ele.title} ingestion inprogress......`
              // : `Hubspot ${ele.hs_object == 'contact' ? 'contact' : 'survey'} ${ele.title} ingestion completed`;
              let dataSourceTypeStatusText =
                ele.dataSource == "typeform"
                  ? ele.status == "progress"
                    ? `${ele.title}`
                    : `${ele.title}`
                  : ele.status == "progress"
                    ? `${ele.title}`
                    : `${ele.title}`;
              listOfDataSource1.push({
                dataSource: ele.dataSource,
                dataSourceText: dataSourceTypeStatusText,
                progress_percent: "40",
                status: ele.status,
              });
            });
            seterrorListDisplay([])
            setcheckProgressDatasetStatus(listOfDataSource1);
          } else {
            setisRunningIngestion(false)
            setisError(false)
            let errorListitem = findInprogressIngestionerror.map((ele) => ({ ...ele, short_text: 'Ingestion Error', message: (ele.message.split(/[,|;]+/)), alertType: 'error-message', isCollapsable: true }));
            seterrorListDisplay(errorListitem);
            let tmpwithouterror = selected.filter((elem) => elem.label != "Typeform")
            let tmpremoveprogress = checkProgressDatasetStatus.filter((elem) => elem.dataSource != "typeform");
            setcheckProgressDatasetStatus(tmpremoveprogress)
            setSelected(tmpwithouterror);
          }
        }
      })
      .catch((err) => {
        console.log("Error: " + err);
      });
  };

  const checkedAnalysisStatusMongo = async () => {
    await axios.post(
      `${process.env.REACT_APP_API_URL}/survey/getAnalysisProcessStatus`,
      {
        user_id: user._id, project_name: projectName
      }
    )
      .then(async (response1) => {
        if (response1.data.success && response1.data.data.message.body == "") {
          let findInprogressIngestion = response1.data.data.status_list.filter(
            (ele) => ele.progress == "True"
          );
          let tmpSccessPercent = (20 * parseInt(findInprogressIngestion.length));
          let tmpStatus = true;
          if (response1.data.data.status == "success") {
            tmpStatus = false;
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
            setLoderVisual(false);
          }
          let tmpAnalysisStatus = { processList: response1.data.data.status_list, status: tmpStatus, sccessPercent: tmpSccessPercent }
          setisRunningAnalysis(tmpAnalysisStatus);
        } else {
          setisRunningAnalysis((prev) => ({
            ...prev,
            status: false,
          }));
          setLoderVisual(false);
          let newRes = JSON.parse(response1.data.data.message.body);
          let wariningListitem = newRes.map((ele) => ele["suggestion"]);
          let errorListitemTmp = newRes.map((ele) => ele["error"]);

          let errorListitem = errorListitemTmp.map((ele) => ({ ...ele, message: (ele.message.split(/[,|;]+/)), alertType: 'error-message', isCollapsable: true }));
          seterrorListDisplay(errorListitem)
        }
      })
      .catch((err) => {
        setisRunningAnalysis((prev) => ({
          ...prev,
          status: true,
        }));
        console.log("Error: " + err);
      });
  };

  const checkedCategoryMappingsMongo = async () => {
    let selectedTemplacte = templateData.filter((ele) => ele.id == checked[0]);
    await axios.post(
      `${process.env.REACT_APP_API_URL}/survey/getCategoryMappingsStatus`,
      {
        user_id: user._id,
        analysis_template: selectedTemplacte[0].name,
      }
    ).then(async (response1) => {
      setTypeformIngestionStatus((response1.data.data.mapping_info.status == "completed" ? { status: false, percentage: response1.data.data.mapping_info.progress } : { status: true, percentage: response1.data.data.mapping_info.progress }));
      if (response1.data.data.mapping_info.status == "completed") {
        let newTypeFormData = JSON.parse(response1.data.data.typeform);
        let isFoundHidden = false;
        // newTypeFormData.forEach(ele1 => {
        //   let hiddenFieldSurvey = isModalDataTypeform.filter(ele => ele.formId == ele1.survey.value)
        //   hiddenFieldSurvey[0].formFields.forEach((ele, ind) => {
        //     if (((ele.module == "hidden" && ele.item.toLowerCase().match(/(utm|name|email)/) == null))) {
        //       ele1.listMapping.push({ item: ele.item, module: "", is_mapped: false, weightage: "L" });
        //       isFoundHidden = true;
        //     }
        //   })
        //   ele1.listMapping = ele1.listMapping.map((ele, ind) => ({ ...ele, id: ind + 1 }));
        //   ele1["checkedAllList"] = ele1.listMapping.map((elee) => elee.id);
        // })

        let surveyListMappingTmp = [];
        isModalDataTypeform.forEach((ele1) => {
          let tmpListMappingWithoutHidden = newTypeFormData[0].listMapping;
          ele1.formFields.forEach((ele, ind) => {
            if (((ele.module == "hidden" && ele.item.toLowerCase().match(/(utm|name|email)/) == null))) {
              tmpListMappingWithoutHidden.push({ item: ele.item, module: "", is_mapped: false, weightage: "L" });
              isFoundHidden = true;
            }
          })
          let tmpListMapping = tmpListMappingWithoutHidden.map((ele, ind) => ({ ...ele, id: ind + 1 }));
          let tmpListMappingId = tmpListMapping.map((elee) => elee.id);
          surveyListMappingTmp.push({ dataType: "Typeform", survey: { label: ele1.formName, value: ele1.formId }, listMapping: tmpListMapping, checkedAllList: tmpListMappingId });
        })

        if (isFoundHidden == true) {
          seterrorListDisplay([{ alertType: 'warning-message', isCollapsable: true, short_text: 'Hidden field', message: ['We noticed that you are bringing custom hidden fields which is great! However, due to the nature of these fields, we are unable to map them to appropriate categories. Here is an example of what you can do'] }])
        }

        let withoutTypeformList = [...isShowSurveyMapp];
        let withoutTypeformList1 = withoutTypeformList.filter(ele => ele.dataType != "Typeform");
        let newMergeList = [
          ...surveyListMappingTmp,
          ...withoutTypeformList1,
        ]
        setIsShowSurveyMapp(newMergeList);
      }
    })
      .catch((err) => {
        setTypeformIngestionStatus({ status: false, percentage: 30 })
        console.log("Error: " + err);
      });
  };

  const handleApplyFetchSurvey = async (templacteName) => {
    let newSelectedSurveyListHub = [];
    let newSelectedSurveyListType = [];
    let newSelectedSurveyListFile = [];
    let counter = 0;
    await selected.forEach(async (elem) => {
      if (elem.label == "Typeform") {

        isModalDataTypeform.forEach(async (element, ind) => {
          let savedMappingList = isShowSurveyMapp.filter((ele1) => ele1.dataType == elem.label);
          let savedQuestionList = savedMappingList.length == 0 ? [] : savedMappingList[0].listMapping.map((ele) => ele.item);
          let questionList = element.formFields.filter(ele => (ele.module != "hidden" || (ele.module == "hidden" && ele.item.toLowerCase().match(/(utm|name|email)/) != null))).map((ele) => ele.item);
          let symDifference = questionList.filter((x) => !savedQuestionList.includes(x)).concat(savedQuestionList.filter((x) => !questionList.includes(x)));
          if (symDifference.length == 0) {
            // newSelectedSurveyListType[ind] = savedMappingList[ind];
            counter = counter + 1;
          } else {
            setLoaderShow(true);
            let newMappedObj = await handleGetSurveyMapp(elem.value, element.formName, element.formId, templacteName, questionList);
            counter = counter + 1;
            // setLoaderShow(false);
            if (isModalDataTypeform.length + isModalDataHubspot.length == counter) {
              setLoaderShow(false);
              setTypeformIngestionStatus({ status: true, percentage: 30 });
            }
          }

        });
      } else if (elem.label == "Hubspot") {
        isModalDataHubspot.forEach(async (eleHub, ind) => {

          let savedMappingList = isShowSurveyMapp.filter((ele1) => ele1.dataType == elem.label);
          let savedQuestionList = savedMappingList.length == 0 ? [] : savedMappingList[0].listMapping.map((ele) => ele.item);
          let questionList = eleHub.colList.map((ele) => ele.displayName);

          let symDifference = questionList.filter((x) => !savedQuestionList.includes(x)).concat(savedQuestionList.filter((x) => !questionList.includes(x)));
          if (symDifference.length == 0) {
            newSelectedSurveyListHub[ind] = savedMappingList[ind];
            counter = counter + 1;
          } else {
            setLoaderShow(true);
            let newMappedObj = await handleGetSurveyMapp(elem.value, eleHub.displayName, eleHub.value, templacteName, questionList);
            counter = counter + 1;
            let lstQuesCat = newMappedObj.map((ele) => ({ ...ele, displayName: ele.item }));
            let lstSelectedQuesId = newMappedObj.map((elee) => elee.id);

            newSelectedSurveyListHub.push({
              dataType: "Hubspot",
              survey: {
                label: eleHub.displayName,
                value: eleHub.value,
              },
              hs_object: eleHub.hs_object,
              listMapping: lstQuesCat,
              checkedAllList: lstSelectedQuesId,
            });

            if (isModalDataTypeform.length + isModalDataHubspot.length == counter) {

              let withoutTypeformList = [...isShowSurveyMapp];
              let withoutTypeformList1 = withoutTypeformList.filter(ele => ele.dataType != "Hubspot");
              let mergeArray = [
                ...withoutTypeformList1,
                ...newSelectedSurveyListHub]

              setIsShowSurveyMapp(mergeArray);
              setLoaderShow(false);
              if (isModalDataTypeform.length > 0) {
                setTypeformIngestionStatus({ status: true, percentage: 30 });
              }
            }
          }
          // ...newSelectedSurveyListType

        });

      } else if (elem.label == "File") {
        isModalDataFile.forEach(async (eleHub) => {
          newSelectedSurveyListFile.push({
            dataType: "File",
            survey: {
              label: eleHub.list.displayName,
              value: eleHub.list.value,
            },
            listMapping: eleHub.colList,
            checkedAllList: eleHub.colList.map((elee) => elee.id),
          });
        });
        setIsShowSurveyMapp((prev) => [
          ...newSelectedSurveyListType,
          ...newSelectedSurveyListHub,
          ...newSelectedSurveyListFile,
        ]);
      }
    });



  };

  const handleApplyFetchSurvey1 = async () => {
    let isAlreadyExist = isShowSurveyMapp.findIndex(
      (ele) =>
        ele.dataType == selectedDataSourceForSurvey &&
        ele.survey.value == selectedSurvey.value &&
        ele.survey.label == selectedSurvey.label
    );
    if (isAlreadyExist == -1) {
      seterrorListDisplay([]);
      if (selectedDataSourceForSurvey == "Typeform") {
        setTypeformIngestionStatus({ status: true, percentage: 30 });
      } else if (selectedDataSourceForSurvey == "Hubspot") {

        let newSelectedSurveyListHub = [...isShowSurveyMapp];
        let newFilterSurveyObj = isModalDataHubspot.filter((element, ind) => selectedSurvey.value == element.value && selectedSurvey.label == element.displayName);
        let questionList = newFilterSurveyObj[0].colList.map((ele) => ele.displayName);
        let selectedTemplacte = templateData.filter((ele) => ele.id == checked[0]);
        setLoaderShow(true);
        let newMappedObj = await handleGetSurveyMapp("hubspot", selectedSurvey.label, selectedSurvey.value,
          selectedTemplacte[0].name,
          questionList
        );
        setLoaderShow(false);

        newSelectedSurveyListHub.push({
          dataType: "Hubspot",
          survey: { label: selectedSurvey.label, value: selectedSurvey.value },
          hs_object: newFilterSurveyObj[0].hs_object,
          listMapping: newMappedObj.map((ele) => ({ ...ele, displayName: ele.item })),
          checkedAllList: newMappedObj.map((elee) => elee.id),
        });
        setIsShowSurveyMapp(newSelectedSurveyListHub);
      } else if (selectedDataSourceForSurvey == "File") {
        let newSelectedSurveyListFile = [];
        isModalDataFile.forEach(async (eleHub) => {
          newSelectedSurveyListFile.push({
            dataType: "File",
            survey: {
              label: eleHub.list.displayName,
              value: eleHub.list.value,
            },
            listMapping: eleHub.colList,
            checkedAllList: eleHub.colList.map((elee) => elee.id),
          });
          setIsShowSurveyMapp((prevState) => [
            ...prevState,
            ...newSelectedSurveyListFile,
          ]);
        });
      }

      setOpenAddNewDatasource(false);
    } else {
      seterrorListDisplay([{ alertType: 'error-message', isCollapsable: true, short_text: 'Category Mapping Error', message: ['This Survey already mapped'] }]);
    }
  };

  const sendDataSourceMail = () => {
    let tmpObj = { ...dataSourceMailObj };
    tmpObj["isSubmit"] = true;
    setdataSourceMailObj(tmpObj);
    console.log(dataSourceMailObj);
    fetch(`${process.env.REACT_APP_API_URL}/survey/sendMailForDatasource`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(dataSourceMailObj)
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res)
      })
  }

  const changeDataSourceMailObj = (key, val) => {
    let tmpObj = { ...dataSourceMailObj };
    tmpObj[key] = val;
    setdataSourceMailObj(tmpObj);
  }

  const handleBack = () => {
    seterrorListDisplay([])
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleresultBack = (e, index) => {
    //setActiveStep((prevActiveStep) => prevActiveStep - 1);
    if (activeStep == 2) {
      seterrorListDisplay([])
      setActiveStep(index);
    }
    else if (activeStep == 1 && checked.length > 0) {
      setActiveStep(index);
    }
    else if (activeStep == 0 && checked.length == 0) {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    }
  };

  const handleReset = () => {
    setActiveStep(0);
    setProjectName("");
  };

  const onsaveAsDraft = async () => {
    if (projectName.trim() == "") {
      let isValiedProject = { ...projectNameValid };
      setprojectNameValid((prev) => ({
        ...isValiedProject,
        isEmpty: true,
        textMessage: `Enter project name`,
      }));
    }
    //  else if (projectName.match(/[^a-zA-Z0-9_]/) !== null) {
    //   let isValiedProject = { ...projectNameValid };
    //   setprojectNameValid((prev) => ({
    //     ...isValiedProject,
    //     inPatternMatch: true,
    //     textMessage:
    //       "Select a project name excluding special characters or spaces.",
    //   }));
    // }
    else if (await checkProjectNameExist()) {
      createSurvey(false);
      // setTimeout(function () { clearInterval(intervalForAnalysis.current); }, 1000);
    }
    //  else {
    // let isValiedProject = { ...projectNameValid };
    //   setprojectNameValid((prev) => ({
    //     ...isValiedProject,
    //     isduplicate: true,
    //     textMessage: "Project name already in use. Choose a unique name.",
    //   }));
    // }
  };

  const createSurvey = async (isDraft) => {
    let getSelectedFormId = isShowSurveyMapp.map((ele) => ele.survey);
    let selectedTemplacte = templateData.filter((ele) => ele.id == checked[0]);
    let hubspotConnectedListCotact = isShowSurveyMapp.filter((ele) => ele.dataType == "Hubspot" && ele.hs_object === "contact");
    let hubspotConnectedListFeedback = isShowSurveyMapp.filter((ele) => ele.dataType == "Hubspot" && ele.hs_object === "feedback");
    let typeFormConnectedList = isShowSurveyMapp.filter((ele) => ele.dataType == "Typeform");

    // if (typeFormConnectedList.length > 1) {
    //   isShowSurveyMapp.forEach((ele) => {
    //     if (ele.dataType == "Typeform") {
    //       ele.listMapping = typeFormConnectedList[0].listMapping
    //     }
    //   });
    // }

    // if ((typeFormConnectedList.length == 0 && hubspotConnectedListFeedback.length == 0 && hubspotConnectedListCotact.length != 0) &&
    //   activeStep == 1 &&
    //   isDraft
    // ) {
    //   seterrorListDisplay([{ alertType: 'error-message', isCollapsable: true, short_text: 'Survey Error', message: ['No survey Data is available for analysis, please try again with survey data'] }])
    // } else 
    if ((typeFormConnectedList.length != 0 && hubspotConnectedListFeedback.length != 0) &&
      activeStep == 1 &&
      isDraft
    ) {
      seterrorListDisplay([{ alertType: 'error-message', isCollapsable: true, short_text: 'Survey Error', message: ['Ensure that survey data is selected from a single source only'] }])
    } else {
      if (((typeFormConnectedList.length != 0 && hubspotConnectedListCotact.length == 0) || (hubspotConnectedListFeedback.length != 0 && hubspotConnectedListCotact.length == 0)) &&
        activeStep == 1 &&
        isDraft
      ) {
        if (selectedTemplacte.length != 0 && selectedTemplacte[0].name != "Market Research") {
          seterrorListDisplay([{ alertType: 'warning-message', isCollapsable: true, short_text: 'Hubspot Datasource', message: ['To ensure you maximize all the dashboards & analytics, we recommend you connect your customer data with a unique identifier to join customer data and survey response'] }])
        }
      }
      if (isDraft) {
        setLoderVisual(true);
      }

      fetch(`${process.env.REACT_APP_API_URL}/survey/createSurvey`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          projectName: projectName,
          form_id: getSelectedFormId,
          user_id: user._id,
          template:
            selectedTemplacte.length == 0 ? "" : selectedTemplacte[0].name,
          mapping_json: JSON.stringify(isShowSurveyMapp),
          saveAsDraft: isDraft,
          savedScreen: isDraft ? activeStep + 1 : activeStep,
          selectedProjectId: selectedProjectId,
          filters: "null"
        }),
      })
        .then((res) => res.json())
        .then((res) => {
          let messageList = [];
          // setLoderVisual(false);
          if (isDraft) {
            setisRunningAnalysis({ processList: [], status: true, sccessPercent: 10 });
          }

          if (res.success === true) {
            setSelectedProjectId(res.createdId);
            if (isDraft) {
              let selectedTemplacte = templateData.filter((ele) => ele.id == checked[0]);
              setParamsForFetchResult({
                project_name: projectName,
                user_id: user._id,
                _id: res.createdId,
                template:
                  selectedTemplacte.length == 0 ? "" : selectedTemplacte[0].name,
                mapping_json: JSON.stringify(isShowSurveyMapp)
              });
            }
            // seterrorListDisplay([]);

          } else {
            setSelectedProjectId(res.createdId);
            // let newRes = JSON.parse(res.message);
            // let wariningListitem = newRes.map((ele) => ele["suggestion"]);
            // let errorListitemTmp = newRes.map((ele) => ele["error"]);

            // let errorListitem = errorListitemTmp.map((ele) => ({ ...ele, message: (ele.message.split(/[,|;]+/)), alertType: 'error-message', isCollapsable: true }));
            // seterrorListDisplay(errorListitem)

          }
        });
    }
  };

  useEffect(() => {
    if (location?.state?.isViewResult) {
      setParamsForFetchResult(location?.state?.newObj);
    }
    if (location?.state?.newObj?.savedScreen != undefined) {
      setActiveStep(location?.state?.newObj?.savedScreen);
      setProjectName(location?.state?.newObj?.project_name);
      localStorage.setItem("selectedProjectName", location?.state?.newObj?.project_name);
      localStorage.setItem("selectedProjectId", location?.state?.newObj?._id);
      setSelectedProjectId(location?.state?.newObj?._id);
      let surveymapping = JSON.parse(location?.state?.newObj?.mapping_json);
      let selectedSurveyTypeForm = surveymapping
        .filter((ele1) => ele1.dataType == "Typeform")
        .map((el) => ({
          formName: el.survey.label,
          formId: el.survey.value,
          formFields: el.listMapping,
          isCollapse: false,
          selectedRow: el.checkedAllList

        }));
      let selectedSurveyHubspot = surveymapping
        .filter((ele1) => ele1.dataType == "Hubspot")
        .map((el) => ({
          displayName: el.survey.label,
          value: el.survey.value,
          hs_object: el.hs_object,
          selectedRow: el.checkedAllList,
          colList: (el.hs_object == "feedback" ? el.listMapping : el.listMapping.map(ele1 => ({ ...ele1, used: "True" }))),
        }));

      let selectedSurveyFile = surveymapping
        .filter((ele1) => ele1.dataType == "File")
        .map((el) => ({
          list: { displayName: el.survey.label, value: el.survey.value },
          colList: el.listMapping,
        }));

      if (selectedSurvey.length != 0) {
        let newSelectedSourceTypes = surveymapping.map((eel) => eel.dataType);
        let newSelectedSourceTypesUnique = Array.from(
          new Set(newSelectedSourceTypes)
        );

        let newSelectedSourceTypesUnique1 = newSelectedSourceTypesUnique.map(
          (eel) => ({ label: eel, value: eel.toLowerCase() })
        );
        setSelected(newSelectedSourceTypesUnique1);
        let selectedTemplacte = templateData.filter(
          (ele) => ele.name == location?.state?.newObj?.template
        );
        if (selectedTemplacte.length != 0) {
          handleToggle(null, selectedTemplacte[0].id, selectedTemplacte[0].name);
        }
        setIsModalDataTypeform(selectedSurveyTypeForm);
        setIsModalDataHubspot(selectedSurveyHubspot);
        setIsModalDataFile(selectedSurveyFile);
        if (surveymapping.length != 0) {
          setIsShowSurveyMapp(surveymapping);
        }
      }
    }

    axios.get(`${process.env.REACT_APP_API_URL}/user/getUser`, {
      params: { id: user._id },
    })
      .then((response) => {

        let checkConnectionSource = localStorage.getItem("userConnectionSourceType");

        if (response.data.user.access_token == undefined) {
          let search = window.location.search;
          let params = new URLSearchParams(search);
          let newParam = params.get("code");
          // &&checkConnectionSource == process.env.REACT_APP_TYPEFORM_CLIENT_ID
          if (newParam != null && response.data.user.connectionType == process.env.REACT_APP_TYPEFORM_CLIENT_ID) {
            let newValLocalStorage = localStorage.getItem("selectedProjectName");
            let newValLocalStorage1 = localStorage.getItem("selectedProjectId");
            let tmpHubspotMapping = localStorage.getItem("hubspotMapping");
            if (tmpHubspotMapping != null) {
              let tmpHubspotMapping1 = JSON.parse(tmpHubspotMapping);
              checkedMappingForHubspot(tmpHubspotMapping1)
            }

            setSelectedProjectId(newValLocalStorage1);
            setProjectName(newValLocalStorage);
            setisConnectedTypeForm(true);
            fetchTokenTypeform(null, newParam); 
          } 
          else {
            setisConnectedTypeForm(false);
          }
        } else {
          setisConnectedTypeForm(true);
          settokenName(response.data.user.access_token);
          setRefreshtokenName(response.data.user.refresh_token);
        }
        if (response.data.user.hubspot_access_token == undefined) {
          let search = window.location.search;
          let params = new URLSearchParams(search);
          let newParam = params.get("code");
          // && checkConnectionSource == process.env.REACT_APP_HUBSPOT_CLIENT_ID
          if (newParam != null && response.data.user.connectionType == process.env.REACT_APP_HUBSPOT_CLIENT_ID) {
            let newValLocalStorage = localStorage.getItem("selectedProjectName");
            let newValLocalStorage1 = localStorage.getItem("selectedProjectId");
            let tmpTypeformMapping = localStorage.getItem("typeformMapping");
            if (tmpTypeformMapping != null) {
              let tmpTypeformMapping1 = JSON.parse(tmpTypeformMapping);
              checkedMappingForSurvey(tmpTypeformMapping1)
            }

            setSelectedProjectId(newValLocalStorage1);
            setProjectName(newValLocalStorage);
            setisConnectedHubspot(true);
            fetchTokenHubspotList(null, newParam);
          } else {
            setisConnectedHubspot(false);
          }
        } else {
          setisConnectedHubspot(true);
          setHubspotTokenName(response.data.user.hubspot_access_token);
          setHubspotRefreshtokenName(response.data.user.hubspot_refresh_token);
        }
      })
      .catch((err) => {
        console.log(err);
      });


    let zUrlsearch = window.location.search;
    let zparams = new URLSearchParams(zUrlsearch);
    let znewParam = zparams.get("code");
    const fetchZendesktoken = (znewParam) => {
      if (znewParam.toSting().length > 2) {
        setisConnectedZendesk(true);
      }
      else {
        setisConnectedZendesk(false);
      }
      // axios.get(`https://cml5331.zendesk.com/oauth/tokens`, {
      //   grant_type: "authorization_code", 
      //   code: znewParam,
      //   client_id: "CMLNew", 
      //   client_secret: "5f14e76071f6ad71b19bf080ae4bbafdaddc513cb712ae6091dda988594383cf", 
      //   redirect_uri: "http://localhost:3000/dashboard/data-platform/create-data-connection", 
      //   scope: "organizations:write read" 
      //   })
      //   .then((response) => {   })
      // .catch((err) => {
      //   console.log(err);
      // });
    }
    fetchTokenklaviyo();
  }, []);

  const setCatMappingOption = (catOptionList) => {
    setGridDataForGrid({
      columns: new Array(
        { field: "item", headerName: "Item", width: 700, editable: false },
        {
          field: "is_mapped",
          headerName: "Mapped",
          width: 170,
          editable: false,
          renderCell: (data, indx) => {
            return (
              <div style={{ width: "100%" }} className="py-2">
                {data.row.is_mapped ? (
                  <AvatarSuccess variant="rounded">
                    <CheckCircleIcon />
                  </AvatarSuccess>
                ) : (
                  <AvatarNotSuccess variant="rounded">
                    <CheckCircleIcon />
                  </AvatarNotSuccess>
                )}
              </div>
            );
          },
        },
        {
          field: "module",
          headerName: "Category",
          sortable: true,
          editable: false,
          width: 350,
          renderCell: (data, indx) => {
            return (
              <div style={{ width: "100%" }} className="py-2">
                <Autocomplete
                  size="small"
                  freeSolo
                  id="combo-box-demo112"
                  options={catOptionList}
                  value={data.row.module}
                  // ListboxProps={{ style: { height: 180 } }}
                  // onChange={(event, value) => {
                  //   data.row.module = value;
                  //   data.row.is_mapped = data.row.module != null ? true : false;
                  // }}
                  // onBlur={(event) => {
                  //   if (event != null) {
                  //     event.stopPropagation();
                  //     ddd(data.row);
                  //   }
                  // }
                  // }
                  onInputChange={(event, value) => {
                    if (event != null) {
                      event.stopPropagation();
                      // console.log("yyy",data.row);
                      // setChangeCatMappingData(data.row)
                      // ddd(data.row);
                      //  isShowSurveyMapp.listMapping
                      data.row.module = value;
                      data.row.weightage = "L";
                      data.row.is_mapped =
                        data.row.module != null ? true : false;
                    }
                  }}
                  renderInput={(params) => (
                    <TextField {...params} label="Select Category" />
                  )}
                />
              </div>
            );
          },
        },
        {
          field: "weightage",
          headerName: "Weightage",
          sortable: true,
          editable: false,
          width: 350,
          renderCell: (data, indx) => {
            return (
              <div style={{ width: "100%" }} className="py-2">
                {/* <FormControl fullWidth size="small">
                <InputLabel id="combo-box-demo144a">Select Weightage</InputLabel>
                <Select
                
                  labelId="combo-box-demo144a"
                  id="combo-box-demo144"
                  value={data.row.weightage}
                  label="Select Weightage"
                  onChange={(event, value) => {
                    data.row.weightage = event.target.value;
                  }}
                >
                  <MenuItem value={"H"}>H</MenuItem>
                  <MenuItem value={"M"}>M</MenuItem>
                  <MenuItem value={"L"}>L</MenuItem>
                </Select>
                </FormControl> */}
                <Autocomplete
                  size="small"
                  freeSolo
                  clearIcon={false}
                  id="combo-box-demo144"
                  options={["H", "M", "L"]}
                  value={data.row.weightage}
                  onChange={(event, value) => {
                    data.row.weightage = value;
                  }}
                  // onBlur={(event, value) => {
                  //   data.row.weightage =( data.row.weightage==null?"L":data.row.weightage);
                  // }}
                  renderInput={(params) => (
                    <TextField {...params} label="Select Weightage" />
                  )}
                />
              </div>
            );
          },
        }
      ),
      columns1: new Array(
        {
          field: "item",
          headerName: "Item",
          width: 700,
          editable: false,
        },
        {
          field: "is_mapped",
          headerName: "Mapped",
          width: 170,
          editable: false,
          renderCell: (data, indx) => {
            return (
              <div style={{ width: "100%" }} className="py-2">
                {data.row.is_mapped ? (
                  <AvatarSuccess variant="rounded">
                    <CheckCircleIcon />
                  </AvatarSuccess>
                ) : (
                  <AvatarNotSuccess variant="rounded">
                    <CheckCircleIcon />
                  </AvatarNotSuccess>
                )}
              </div>
            );
          },
        },
        {
          field: "module",
          headerName: "Category",
          sortable: true,
          editable: false,
          width: 300,
          renderCell: (data, indx) => {
            return (
              <div style={{ width: "100%" }} className="py-2">
                <Autocomplete
                  size="small"
                  freeSolo
                  id="combo-box-demo11"
                  options={catOptionList}
                  value={data.row.module}
                  // onChange={(event, value) => {
                  //   data.row.module = value;
                  //   data.row.is_mapped = data.row.module != null ? true : false;
                  // }}
                  onInputChange={(event, value) => {
                    if (event != null) {
                      event.stopPropagation();
                      data.row.module = value;
                      data.row.weightage = "L";
                      data.row.is_mapped = data.row.module != null ? true : false;
                    }
                  }}
                  renderInput={(params) => (
                    <TextField {...params} label="Select Category" />
                  )}
                />
              </div>
            );
          },
        },
        {
          field: "weightage",
          headerName: "Weightage",
          sortable: true,
          editable: false,
          width: 300,
          renderCell: (data, indx) => {
            return (
              <div style={{ width: "100%" }} className="py-2">
                <Autocomplete
                  size="small"
                  freeSolo
                  id="combo-box-demo145a"
                  options={["H", "M", "L"]}
                  value={data.row.weightage}
                  onChange={(event, value) => {
                    data.row.weightage = value;
                  }}
                  renderInput={(params) => (
                    <TextField {...params} label="Select Weightage" />
                  )}
                />
              </div>
            );
          },
        }
      ),
      rows: [],
    });
  };

  //sass platform json

  //databases json

 

  //upload a file json



  //selected form data

  const selectedForm = [
    {
      id: 1,
      name: "Typeform",
      value: "typeform",
      description: "Build beautiful, interactive forms — get more responses",
      img: "/json-media/img/partners/typeform-sm.svg",
    },
    // { id: 2, name: 'Salesforce', description: 'Personalize every experience along the customer journey with the Customer 360', img: '/images/partners/salesforce.svg' },
    {
      id: 3,
      name: "Hubspot",
      value: "hubspot",
      description:
        "CRM platform with all the software, integrations, and resources",
      img: "/json-media/img/partners/hubspot-sm.svg",
    },
  ];

  //select data source

  const fetchTokenTypeform = async (ev, newParam) => {
    setOpen(true);
    setisOpenPopupTypeform(true);

    await axios
      .post(`${process.env.REACT_APP_API_URL}/user/fetchTokenTypeform`, {
        grant_type: process.env.REACT_APP_TYPEFORM_GRANT_TYPE,
        refresh_token: "",
        code: newParam,
        client_id: process.env.REACT_APP_TYPEFORM_CLIENT_ID,
        client_secret: process.env.REACT_APP_TYPEFORM_CLIENT_SECRET,
        redirect_uri: process.env.REACT_APP_TYPEFORM_REDIRECT_URI,
        token_url: process.env.REACT_APP_TYPEFORMTOKEN_URL,
        user_id: user._id,
      })
      .then((response) => {
        settokenName(response.data.access_token);
        setRefreshtokenName(response.data.refresh_token);
        getWorkspaceList(
          { token: response.data.access_token },
          response.data.refresh_token
        );
      })
      .catch((err) => {
        console.log(err);
        // setLoaderShow(false)
      });
  };

  const fetchTokenklaviyo = async (ev) => {

    let search = window.location.search;
    let params = new URLSearchParams(search);
    let newParam = params.get("code");
    await axios
    .post(`${process.env.REACT_APP_API_URL}/user/fetchTokenKlaviyo`, {
      grant_type: 'authorization_code', 
      code: newParam,
      code_verifier: 'code_challenge',
      redirect_uri: 'http://localhost:3000/dashboard/data-platform/create-data-connection',
    })
    .then((response) => {
      console.log(response)
      // settokenName(response.data.access_token);
      // setRefreshtokenName(response.data.refresh_token);
      // getWorkspaceList(
      //   { token: response.data.access_token },
      //   response.data.refresh_token
      // );
    })
    .catch((err) => {
      console.log(err);
      // setLoaderShow(false)
    });
    // await axios
    //   .post(`https://a.klaviyo.com/oauth/token`, {
    //     grant_type: 'authorization_code',
    //     code: newParam,
    //     code_verifier: 'code_challenge',
    //     redirect_uri: 'http://localhost:3000/dashboard/data-platform/create-data-connection',
    //   })
    //   .then((response) => {
    //     console.log(response + '11')
    //     // settokenName(response.data.access_token);
    //     // setRefreshtokenName(response.data.refresh_token);
    //     // getWorkspaceList(
    //     //   // { token: response.data.access_token },
    //     //   response.data.refresh_token
    //     // );
    //   })
    //   .catch((err) => {
    //     console.log(err + 'false');
    //     // setLoaderShow(false)
    //   });
  };

  const fetchTokenHubspotList = (ev, newParam) => {
    setOpenHubspot(true);
    setisOpenPopupHubspot(true);
    axios
      .post(`${process.env.REACT_APP_API_URL}/user/fetchHubspotTokenTypeform`, {
        grant_type: process.env.REACT_APP_TYPEFORM_GRANT_TYPE,
        refresh_token: "",
        code: newParam,
        client_id: process.env.REACT_APP_HUBSPOT_CLIENT_ID,
        client_secret: process.env.REACT_APP_HUBSPOT_CLIENT_SECRET,
        redirect_uri: process.env.REACT_APP_HUBSPOT_REDIRECT_URI,
        token_url: process.env.REACT_APP_HUBSPOT_REDIRECT_URI,
        user_id: user._id,
      })
      .then((response) => {
        setHubspotTokenName(response.data.hubspot_access_token);
        setHubspotRefreshtokenName(response.data.hubspot_refresh_token);
        getContactList(
          { token: response.data.hubspot_access_token },
          response.data.hubspot_refresh_token
        );
      })
      .catch((err) => {
        console.log(err);
        // setLoaderShow(false)
      });
  };

  const connectDataForIngestion = (ev, value) => {
    ev.stopPropagation();
    setChecked([]);
    if (value == "Typeform") {
      if (tokenName == "") {
        handleOpen(ev, value)
        // seterrorListDisplay([{ alertType: 'error-message', isCollapsable: true, short_text: 'Data Source Connection Error', message: ['Connection to the data source is required, connect your data source before moving forward'] }])
      } else {
        // token: "FcCmBqwFNAYWKtXv5F6g6CZtfmBQKgMnBP7vSMTYGshg"
        setOpen(true);
        setisOpenPopupTypeform(true);
        getWorkspaceList({ token: tokenName }, refreshtokenName);
      }
    } else if (value == "Hubspot") {
      if (hubspotTokenName == "") {
        handleOpen(ev, value)
        // seterrorListDisplay([{ alertType: 'error-message', isCollapsable: true, short_text: 'Data Source Connection Error', message: ['Connection to the data source is required, connect your data source before moving forward'] }])
      } else {
        setOpenHubspot(true);
        setisOpenPopupHubspot(true);
      }
    }
  }

  const clearDataForIngestion = async (ev, value) => {
    ev.stopPropagation()
    let newSelected = [...selected];
    let newcheckProgressDatasetStatus = [...checkProgressDatasetStatus];
    if (value == "Typeform") {
      setIsModalDataTypeform([]);
      newcheckProgressDatasetStatus = newcheckProgressDatasetStatus.filter((eleType) => eleType.dataSource !== value.toLowerCase())
      newSelected.splice(newSelected.findIndex((ele1) => ele1.label === value), 1);
      setcheckProgressDatasetStatus(newcheckProgressDatasetStatus);
      setSelected(newSelected);
    } else if (value == "Hubspot") {
      setIsModalDataHubspot([])
      newcheckProgressDatasetStatus = newcheckProgressDatasetStatus.filter(eleHub => eleHub.dataSource !== value.toLowerCase());
      newSelected.splice(newSelected.findIndex((ele1) => ele1.label === value), 1);
      setcheckProgressDatasetStatus(newcheckProgressDatasetStatus);
      setSelected(newSelected);
    }
    clearInterval(interval.current);
    setisRunningIngestion(false);
  }

  const getUpdateSurveyList = async (ev, value) => {
    // if (ev != null) {
    //   ev.stopPropagation();
    // }
    // let newSelected = [...selected];
    // let newcheckProgressDatasetStatus = [...checkProgressDatasetStatus];

    // setChecked([]);
    // if (value == "Typeform") {
    //   if (newSelected.findIndex((ele1) => ele1.label === value) != -1) {
    //     newcheckProgressDatasetStatus = newcheckProgressDatasetStatus.filter((eleType) => eleType.dataSource !== value.toLowerCase())
    //     newSelected.splice(newSelected.findIndex((ele1) => ele1.label === value), 1);
    //   } else {
    //     if (tokenName == "") {
    //       seterrorListDisplay([{ alertType: 'error-message', isCollapsable: true, short_text: 'Data Source Connection Error', message: ['Connection to the data source is required, connect your data source before moving forward'] }])
    //     } else {
    //       seterrorListDisplay([])
    //       setOpen(true);
    //       setisOpenPopupTypeform(true);
    //       getWorkspaceList({ token: tokenName }, refreshtokenName);
    //     }
    //   }
    // } else if (value == "Hubspot") {
    //   if (newSelected.findIndex((ele1) => ele1.label === value) != -1) {
    //     newcheckProgressDatasetStatus = newcheckProgressDatasetStatus.filter(eleHub => eleHub.dataSource !== value.toLowerCase())
    //     newSelected.splice(newSelected.findIndex((ele1) => ele1.label === value), 1);
    //   } else {
    //     if (hubspotTokenName == "") {
    //       seterrorListDisplay([{ alertType: 'error-message', isCollapsable: true, short_text: 'Data Source Connection Error', message: ['Connection to the data source is required, connect your data source before moving forward'] }])
    //     } else {
    //       setOpenHubspot(true);
    //       setisOpenPopupHubspot(true);
    //       getContactList({ token: hubspotTokenName }, hubspotRefreshtokenName);
    //     }
    //   }
    // }
    // setcheckProgressDatasetStatus(newcheckProgressDatasetStatus);
    // setSelected(newSelected);

  };

  const removeTypeformToken = async (ev, value) => {
    if (ev != null) {
      ev.stopPropagation();
    }
    clearDataForIngestion(ev, value);

    axios
      .post(`${process.env.REACT_APP_API_URL}/user/removeTypeformToken`, {
        user_id: user._id,
        isRemoveTypeForm: value == "Typeform" ? true : false,
      })
      .then((response) => {
        console.log(checkProgressDatasetStatus);
        if (value == "Typeform") {
          setOpen(false);
          setisOpenPopupTypeform(false);
          setisConnectedTypeForm(false);
          settokenName("");
          getworkspaceName([]);
        } else if (value == "Hubspot") {
          setOpenHubspot(false);
          setisOpenPopupHubspot(false);
          setisConnectedHubspot(false);
          setHubspotTokenName("");
          getlistListOfContact([]);
        }
        navigate("/dashboard/data-platform/create-data-connection");
      })
      .catch((err) => {
        console.log(err);
        getworkspaceName([]);
        getlistListOfContact([]);
        // setLoaderShow(false)
      });
  };

  const getContactList = async (newBodyObj, refreshToken) => {
    getlistListOfContact([]);
    axios
      .post(`${process.env.REACT_APP_API_URL}/user/fetchAllContactList`, {
        token: newBodyObj.token,
      })
      .then((response1) => {
        if (response1.data.success) {
          if (
            response1.data.list != undefined &&
            response1.data.list != null &&
            response1.data.list.length != 0
          ) {
            getlistListOfContact([response1.data.list]);
            setisError(true)
          } else {
            setOpenHubspot(false);
            setisOpenPopupHubspot(false);
            setisError(false)
            seterrorListDisplay([{ alertType: 'error-message', isCollapsable: true, short_text: 'Data Source Connection Error', message: ['No Contact List is found in this account'] }])
          }
        } else {
          axios
            .post(
              `${process.env.REACT_APP_API_URL}/user/fetchHubspotTokenTypeform`,
              {
                grant_type: "refresh_token",
                refresh_token: hubspotRefreshtokenName,
                code: "",
                client_id: process.env.REACT_APP_HUBSPOT_CLIENT_ID,
                client_secret: process.env.REACT_APP_HUBSPOT_CLIENT_SECRET,
                redirect_uri: process.env.REACT_APP_HUBSPOT_REDIRECT_URI,
                token_url: process.env.REACT_APP_HUBSPOT_REDIRECT_URI,
                user_id: user._id,
              }
            )
            .then((response) => {
              setHubspotTokenName(response.data.hubspot_access_token);
              setHubspotRefreshtokenName(response.data.hubspot_refresh_token);
              getContactList(
                { token: response.data.hubspot_access_token },
                response.data.hubspot_refresh_token
              );
            })
            .catch((err) => {
              console.log(err);
              getlistListOfContact([]);
            });
        }
      })
      .catch((err) => {
        getlistListOfContact([]);
        // setLoaderShow(false)
      });
  };

  const getWorkspaceList = async (newBodyObj, refreshToken) => {
    axios
      .post(`${process.env.REACT_APP_AMEZON_AWSAPI_URL}/workspace/`, newBodyObj)
      .then((response) => {
        console.log("here", response);
        // setLoaderShow(false)
        if (response.data.status != "failed") {
          let newWorkspace = [];
          response.data.data.forEach((ele) => {
            newWorkspace.push({
              displayName: ele.name,
              value: ele.id,
              count: ele.count,
            });
          });
          getworkspaceName(newWorkspace);
        } else {
          axios
            .post(`${process.env.REACT_APP_API_URL}/user/fetchTokenTypeform`, {
              grant_type: "refresh_token",
              refresh_token: refreshToken,
              code: "",
              client_id: process.env.REACT_APP_TYPEFORM_CLIENT_ID,
              client_secret: process.env.REACT_APP_TYPEFORM_CLIENT_SECRET,
              redirect_uri: process.env.REACT_APP_TYPEFORM_REDIRECT_URI,
              token_url: process.env.REACT_APP_TYPEFORMTOKEN_URL,
              user_id: user._id,
            })
            .then((response) => {
              // if (count == 1) {
              getWorkspaceList(
                { token: response.data.access_token },
                response.data.refresh_token
              );
              // }
            })
            .catch((err) => {
              console.log(err);
              getworkspaceName([]);
              // setLoaderShow(false)
            });
        }
      })
      .catch((err) => {
        getworkspaceName([]);
        // setLoaderShow(false)
      });
  };

  const onProjectententerKey = (event, val) => {
    if (event.target.value == "") {
      let isValiedProject = { ...projectNameValid };
      setprojectNameValid((prev) => ({
        ...isValiedProject,
        inPatternMatch: true,
        textMessage: "Enter project name",
      }));
    }
    // else if (event.target.value.match(/[^a-zA-Z0-9_]/) !== null) {
    //   let isValiedProject = { ...projectNameValid };
    //   setprojectNameValid((prev) => ({
    //     ...isValiedProject,
    //     inPatternMatch: true,
    //     textMessage:
    //       "Create a project name without using special characters or spaces.",
    //   }));
    // }
    else {
      let isValiedProject = { ...projectNameValid };
      setprojectNameValid((prev) => ({
        ...isValiedProject,
        inPatternMatch: true,
        textMessage: "",
      }));
    }
  };

  const onProjectName = (event, val) => {
    if (event.target.value.length < 31) {
      setProjectName(event.target.value);
      onProjectententerKey(event, val);
    } else {
      return;
    }
  };

  const onProjectName1 = async (event, val) => {
    if (await checkProjectNameExist()) {
      localStorage.setItem("selectedProjectName", projectName);
    }
    else {
      let isValiedProject = { ...projectNameValid };
      setprojectNameValid((prev) => ({
        ...isValiedProject,
        inPatternMatch: true,
        textMessage: "Project name already in use. Choose a unique name.",
      }));
    }
  };

  const checkProjectNameExist = async () => {
    let isExist = true;
    await axios
      .post(`${process.env.REACT_APP_API_URL}/survey/checkSurveyName`, {
        projectName: projectName,
        user_id: user._id,
        recordId: selectedProjectId,
      })
      .then(async (response1) => {
        isExist = response1.data.success;
      })
      .catch((err) => { });

    return isExist;
  };

  const changeDataForSurvey = (event, value) => {
    setselectedDataSourceForSurvey(value == null ? "" : value.label);
    setSelectedSurvey({});
    if (value.value == "typeform") {
      setselectedTypeSurveyList(isModalDataTypeform);
    } else if (value.value == "hubspot") {
      setselectedTypeSurveyList(isModalDataHubspot);
    } else if (value.value == "file") {
      setselectedTypeSurveyList(isModalDataFile);
    } else {
      setselectedTypeSurveyList([]);
    }
  };

  const changeSurvey = (event, value) => {
    setSelectedSurvey(
      value == null ? {} : { label: value.formName, value: value.formId }
    );
  };

  const changeSurvey1 = (event, value) => {
    setSelectedSurvey(
      value == null ? {} : { label: value.displayName, value: value.value }
    );
  };

  const handleRemoveSurvey = (ind) => {
    let newSelectedSurveyList = [...isShowSurveyMapp];
    newSelectedSurveyList.splice(ind, 1);
    setIsShowSurveyMapp(newSelectedSurveyList);
  };

  const handleAddNewDataSource = (ind) => {
    setOpenAddNewDatasource(true);
  };

  useEffect(async () => {
    if (isRunningIngestion) {
      interval.current = setInterval(() => {
        let newList11 = [];
        selected.forEach(async (elem) => {
          if (elem.label == "Typeform") {
            isModalDataTypeform.forEach((ele) => {
              let newSurvyNameFormateTmp = ele.formName.replace(/[^a-zA-Z0-9_ ]/g, "_").replace(/\s+/g, "_").toLowerCase();
              let newSurvyNameFormate = newSurvyNameFormateTmp.replace(/[_]{2,}/g, "_");
              let newStr = `${user._id}/${newSurvyNameFormate}/${ele.formId}`;
              newList11.push(newStr);
            });
          } else if (elem.label == "Hubspot") {
            isModalDataHubspot.forEach((ele) => {
              let newSurvyNameFormateTmp = ele.displayName.replace(/[^a-zA-Z0-9_ ]/g, "_").replace(/\s+/g, "_").toLowerCase();
              let newSurvyNameFormate = newSurvyNameFormateTmp.replace(/[_]{2,}/g, "_");
              let newStr = `${user._id}/${newSurvyNameFormate}/${ele.value}`;
              newList11.push(newStr);
            });
          }
        });
        checkedDatasetStatusMongo(newList11);
      }, 3000);
      // setTimeout(function () { clearInterval(interval.current); }, 30000);
    } else {
      clearInterval(interval.current);
    }
  }, [isRunningIngestion]);

  useEffect(async () => {
    if (isRunningAnalysis.status) {
      intervalForAnalysis.current = setInterval(() => {
        checkedAnalysisStatusMongo();
      }, 3000);
      // setTimeout(function () { clearInterval(intervalForAnalysis.current); }, 30000);
    } else {
      clearInterval(intervalForAnalysis.current);
    }
  }, [isRunningAnalysis.status]);

  useEffect(async () => {
    if (typeformIngestionStatus.status) {
      intervalForCategoryMapping.current = setInterval(() => {
        checkedCategoryMappingsMongo();
      }, 3000);
      setTimeout(function () { clearInterval(intervalForCategoryMapping.current); }, 30000);
    } else {
      clearInterval(intervalForCategoryMapping.current);
    }
  }, [typeformIngestionStatus.status]);

  // useEffect( () => {
  //   console.log(changeCatMappingData)
  //   console.log(isShowSurveyMapp)

  // }, [changeCatMappingData]);



  const gotoProjectManagementScreen = async () => {
    // setSelectedProjectId("");
    // navigate("/dashboard/data-platform/project-management");
    if (projectName.trim() == "") {
      let isValiedProject = { ...projectNameValid };
      setprojectNameValid((prev) => ({
        ...isValiedProject,
        isEmpty: true,
        textMessage: `Enter project name`,
      }));
    }
    else if (await checkProjectNameExist()) {
      if (activeStep !== 2) {
        createSurvey(false);
      }
      setSelectedProjectId("");
      navigate("/dashboard/data-platform/project-management");
    }
    else {
      let isValiedProject = { ...projectNameValid };
      setprojectNameValid((prev) => ({
        ...isValiedProject,
        inPatternMatch: true,
        textMessage: "Project name already in use. Choose a unique name.",
      }));
    }
  };

  function dataRefreshProject() {
    setdatarefreshloader(false)
    setTimeout(() => {
      setdatarefreshloader(true)
    }, 5000);
    setTimeout(() => {
      setdatarefreshloader(false)
      setdatarefreshupdated(false)
    }, 5000);
    setTimeout(() => {
      setdatarefreshloader(true)
      setdatarefreshupdated(true)
    }, 10000);
  }

  function CircularProgressWithLabel(props) {
    return (
      <Box sx={{ position: 'relative', display: 'inline-flex' }}>
        <CircularProgress variant="determinate" {...props} />
        <Box
          sx={{
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            position: 'absolute',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography variant="caption" component="div" color="text.secondary">
            {`${Math.round(props.value)}%`}
          </Typography>
        </Box>
      </Box>
    );
  }



  return (
    <>
      <div className="container-full">

        {/* -------------------- header section -------------------- */}
        <div className="after-login-header">
          {announcement ? <> <div class="announcement"><a className="fa fa-times-circle close-icon" onClick={() => hideannouncementBar()}></a>
            <div class="container">
              <div class="announcement-text">
                <Link to="/power-user-program-convertml">  <b> Pioneer with the 20 leaders! Join the <strong>Power User Program</strong> for exclusive benefits.</b></Link>
              </div> </div></div></> : <> </>}
          <Grid container spacing={2}>
            <Grid item xs={3} md={3} lg={3}>
              <Link to="/">
                <LazyLoadImage
                  className="logoicons"
                  src={"/json-media/img/convertmlLogoicon.png"}
                />
              </Link>

              <div className="projectName" title={location?.state?.newObj?.project_name == undefined
                ? (projectName + "(" + paramsForFetchResult.template + ")") : (location?.state?.newObj?.project_name) + ' (' + (location?.state?.newObj?.template) + ')'}>
                {activeStep + 1 == 3 ? <><span className='selectedservay'>{paramsForFetchResult.template}</span> <div className="clearfix"></div> {paramsForFetchResult.project_name} </> : <span className="createproject">Let’s Create Your Project</span>}
              </div>
            </Grid>
            <Grid item xs={6} md={6} lg={6}>
              <Stepper
                activeStep={activeStep}
                style={{ background: "transparent", padding: 0 }}
              >
                {steps.map((label, index) => {
                  const stepProps: { completed?: boolean } = {};
                  const labelProps: { optional?: React.ReactNode } = {};
                  return (
                    <Step
                      key={label}
                      {...stepProps}
                      className={index == activeStep ? "selected-tab" : ""}
                    >
                      <StepLabel {...labelProps} onClick={(e) => handleresultBack(e, index)}>{label}</StepLabel>
                    </Step>
                  );
                })}
              </Stepper>
            </Grid>
            <Grid item xs={3} md={3} lg={3}>
              <div className="float-right">
                <Box display="flex">
                  <Stack direction="row" spacing={1}>
                    {activeStep + 1 != 3 && (
                      <Button
                        color="primary"
                        variant="outlined"
                      // onClick={() => {
                      //   onsaveAsDraft();
                      // }}
                      >
                        Save Draft
                      </Button>
                    )}
                    {activeStep == 2 ? <Button
                      color={!datarefreshupdated ? 'success' : 'primary'}
                      variant="outlined"
                      className="icon-btn"
                      onClick={() => {
                        dataRefreshProject();
                      }}
                    >
                      {datarefreshloader ? <> <span class="icon-data-refresh fa-1x"></span></> : <>
                        {datarefreshupdated ? <><CircularProgress size="1.5rem" className="float-right" /></> : <><i class="fa fa-check-circle"></i></>}
                      </>}
                    </Button> : ''}
                    <Button
                      color="primary"
                      variant="outlined"
                      onClick={() => {
                        gotoProjectManagementScreen();
                      }}
                    >
                      Save & Close
                    </Button>
                  </Stack>
                  <HeaderButtons />
                  <HeaderUserbox />
                </Box>
              </div>
            </Grid>
          </Grid>
        </div>
        {/* -------------------- header section end -------------------- */}
        <Box ref={errorRef}
          component="form"
          noValidate
          autoComplete="off"
          style={{ padding: "0px 15px" }}
        >
          <Box sx={{ width: "100%" }}>
            {activeStep === steps.length ? (
              ""
            ) : (
              <React.Fragment>
                <Box>
                  {/* step1 code */}
                  {activeStep + 1 == 1 ? (
                    <Box display={"grid"} gap={4}  >

                      <Grid container spacing={2}>
                        <Grid item xs={4}>
                          <Typography variant="h6" component="h6">
                            Project Name
                            <Typography
                              variant="p"
                              component="span"
                              color="error"
                            >
                              *
                            </Typography>
                          </Typography>
                          <Typography
                            variant="p"
                            component="p"
                            color="text.secondary"
                          >
                            Enter a unique project name
                          </Typography>
                        </Grid>
                        <Grid item xs={8}>
                          <TextField
                            fullWidth

                            label="Enter Project Name"
                            value={projectName}
                            sx={{
                              "& .MuiOutlinedInput-notchedOutline": {
                                borderColor:
                                  projectName == "" ? "#D41E4A" : "#0051FA",
                              },
                              "&:hover .MuiOutlinedInput-notchedOutline": {
                                borderColor:
                                  projectName == "" ? "#D41E4A" : "#0051FA",
                              },
                              "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                              {
                                borderColor:
                                  projectName == "" ? "#D41E4A" : "#0051FA",
                              },
                            }}
                            //onKeyPress={(event, val) =>onProjectententerKey(event, val)}
                            onBlur={(event, val) => onProjectName1(event, val)}
                            onChange={(event, val) => onProjectName(event, val)}
                            id="projectName"
                          />
                          <span className="error-text">
                            {projectNameValid.textMessage}
                          </span>
                        </Grid>

                      </Grid>


                      <hr style={{ border: "1px solid #ddd", margin: 0 }} />

                      <Grid container item xs={12} display={"flex"}>
                        <Grid>
                          <Typography variant="h6" component="h6">
                            Data Source
                            <Typography
                              variant="p"
                              component="span"
                              color="error"
                            >
                              *
                            </Typography>
                          </Typography>
                          <Typography
                            variant="p"
                            component="p"
                            color="text.secondary"
                          >
                            Choose a data source you want to integrate
                          </Typography>
                        </Grid>
                      </Grid>

                      {
                        errorListDisplay.map(
                          (itemMessage, i) => (
                            <section
                              className={`message-box   ${itemMessage.alertType}`}
                            >
                              <span>{itemMessage.short_text}</span>
                              <a
                                onClick={(val, ind) => {
                                  collapseAndExpandError(val, i)
                                }
                                }
                              >
                                <i
                                  className={
                                    !itemMessage.isCollapsable
                                      ? "fa fa-angle-up"
                                      : "fa fa-angle-down"
                                  }
                                ></i>
                              </a>
                              {!itemMessage.isCollapsable ? (
                                <>
                                  <ul>
                                    {
                                      itemMessage.message.map((mssgList, ii) => (


                                        <li>{mssgList} </li>

                                      ))
                                    }
                                  </ul>
                                </>
                              ) : (
                                <> </>
                              )}

                            </section>
                          ))
                      }

                      {/* {errorNotificationAlert.alertVisible == true && (
                        <section
                          className={`message-box ml-4  ${errorNotificationAlert.alertType}`}
                        >
                          <span>{errorNotificationAlert.alertHeaderText}</span>
                          <a
                            onClick={() =>
                              seterrorMessgeDetais(!errorMessgeDetais)
                            }
                          >
                            <i
                              className={
                                errorMessgeDetais
                                  ? "fa fa-angle-up"
                                  : "fa fa-angle-down"
                              }
                            ></i>
                          </a>
                          {errorMessgeDetais ? (
                            <>
                              <ul>
                                {errorNotificationAlert.alertTextMessage.map(
                                  (itemMessage, i) => (
                                    <li>{itemMessage} </li>
                                  )
                                )}
                              </ul>
                            </>
                          ) : (
                            <> </>
                          )}
                        </section>
                      )} */}

                      <Box sx={{ width: "100%" }}>
                        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                          <Tabs
                            value={value}
                            onChange={handleChange}
                            aria-label="basic tabs example"
                          >
                            <Tab
                              label="Integrations"
                              {...a11yProps(0)}
                              color="text.primary"
                            />
                            {/* this tabs temp hide <Tab
                              label="Upload File"
                              {...a11yProps(1)}
                              color="text.primary"
                            /> */}
                          </Tabs>
                        </Box>
                        <CustomTabPanel value={value} index={0}>
                          <Grid container spacing={2}>
                            <Grid xs={12} md={12} lg={12}>
                              <Typography
                                variant="h6"
                                component="h6"
                                className="ml-4"
                              >
                                Available Integrations
                              </Typography>
                            </Grid>
                            {selectedForm.map((item, i) => (
                              <Grid
                                item
                                xs={12}
                                md={3}
                                lg={3}
                                key={i}
                                className="cursor-pointer"

                              >
                                <Card
                                  key={i}
                                  onClick={(ev) => {
                                    connectDataForIngestion(ev, item.name);
                                  }}
                                >
                                  {/* 
className={
                                    selected.findIndex(
                                      (ele1) => ele1.label === item.name
                                    ) == -1
                                      ? ""
                                      : "active-card"
                                  } */}

                                  <CardMedia
                                    sx={{
                                      height: 48,
                                      width: 48,
                                      margin: "10px 16px",
                                      backgroundSize: "70%",
                                      borderRadius: "4px",
                                      border: "1px solid #ddd",
                                    }}
                                    image={item.img}
                                    title={item.name}
                                  />
                                  {(isConnectedTypeForm == true &&
                                    ["Typeform"].indexOf(item.name) != -1) ||
                                    (isConnectedHubspot == true &&
                                      ["Hubspot"].indexOf(item.name) != -1) ? (
                                    // <span className="connected-label-top float-right">
                                    //   Connected
                                    // </span>
                                    <> <label class="switch" onClick={(ev) => {
                                      removeTypeformToken(ev, item.name);
                                    }}>
                                      <input type="checkbox" checked={true} />
                                      <span class="slider round"></span>
                                    </label> </>
                                  ) : (
                                    <> <label class="switch" onClick={(e) => {
                                      handleOpen(e, item.name);
                                    }}>
                                      <input type="checkbox" checked={false} />
                                      <span class="slider round"></span>
                                    </label> </>
                                  )}
                                  <CardContent>
                                    <Typography
                                      gutterBottom
                                      variant="h5"
                                      component="h5"
                                    >
                                      {item.name}
                                    </Typography>
                                    <Typography
                                      variant="body2"
                                      component="p"
                                      style={{ height: "50px" }}
                                      color="text.secondary"
                                    >
                                      {item.description}
                                    </Typography>
                                  </CardContent>
                                  <CardActions>
                                    {/* <button   onClick={(ev) => {
                                  getUpdateSurveyList(ev, item.name);
                                }}>servay connect</button> */}
                                    {/* <Button className='connect-btn' >Ingest New Form</Button>     getUpdateSurveyList(ev, item.name);*/}

                                    {(isConnectedTypeForm == true &&
                                      ["Typeform"].indexOf(item.name) !=
                                      -1) ||
                                      (isConnectedHubspot == true &&
                                        ["Hubspot"].indexOf(item.name) !=
                                        -1) ? (
                                      <>
                                        {(["Typeform"].indexOf(item.name) != -1 && isModalDataTypeform.length != 0) || ["Hubspot"].indexOf(item.name) != -1 && isModalDataHubspot.length != 0 ?
                                          (<div className="disconnect-btn">Dataset Connected <span className="float-right"><a className="fa fa-pencil mr-3" onClick={(ev) => {
                                            connectDataForIngestion(ev, item.name);
                                          }}></a>   <a className="fa fa-close" onClick={(ev) => {
                                            clearDataForIngestion(ev, item.name);
                                          }}></a></span></div>) : <Button className="connect-btn">Connect Dataset</Button>}


                                      </>
                                    ) : (
                                      <>
                                        <Button className="connect-btn">
                                          Connect Dataset
                                        </Button>
                                      </>
                                    )}

                                    {/* <Chip icon={<CheckIcon />} label="Connected" style={{ marginRight: '10px' }} />
                                        {item.name == "Typeform" ?
                                          <Chip icon={<CheckIcon />} onClick={(ev) => { getUpdateSurveyList(ev) }} variant='outlined' label="Update" style={{ marginLeft: '20px' }} /> : ''
                                        } */}

                                    {/* {item.name == "Typeform" ? <Grid display={'flex'}> <Button className='disconnect-btn mr-2'>Disconnect</Button> <Button className='connect-btn' onClick={(ev) => { getUpdateSurveyList(ev) }}>Ingest New Form</Button></Grid> : <><Button className='disconnect-btn mr-2'>Disconnect</Button></>} */}

                                  </CardActions>
                                </Card>
                              </Grid>
                            ))}
                          </Grid>
                          <br />
                          <Grid container spacing={2}>
                            <Grid xs={12} md={12} lg={12}>
                              <div className="mt-3"></div>
                              <Typography
                                variant="h6"
                                component="h6"
                                className="ml-4"
                              >
                                Survey
                              </Typography>
                            </Grid>
                            {SurveyListData.map((item, i) => (
                              <Grid
                                item
                                xs={12}
                                md={3}
                                lg={3}
                                key={i}
                                className="cursor-pointer" onClick={(ev) => {
                                  connectDataForIngestion(ev, item.name);
                                }}>
                                <Card
                                  key={i}
                                  className={item.connectionAvl ? '' : 'dataListcard'}>
                                  <CardMedia
                                    sx={{
                                      height: 48,
                                      width: 48,
                                      margin: "10px 16px",
                                      backgroundSize: "70%",
                                      borderRadius: "4px",
                                      border: "1px solid #ddd",
                                    }}
                                    className='cardMedia'
                                    image={item.img}
                                    title={item.name}
                                  />
                                  {(isConnectedTypeForm == true && ["Typeform"].indexOf(item.name) != -1) ||
                                    (isConnectedHubspot == true && ["Hubspot"].indexOf(item.name) != -1) || (isConnectedZendesk == true && ["Zendesk"].indexOf(item.name) != -1) ? (
                                    <> <label class="switch" onClick={(ev) => {
                                      removeTypeformToken(ev, item.name);
                                    }}>
                                      <input type="checkbox" checked={true} disabled={item.active} />
                                      <span class="slider round"></span>
                                    </label> </>
                                  ) : (
                                    <> <label class="switch" onClick={(e) => {
                                      handleOpen(e, item.name);
                                    }} >
                                      <input type="checkbox" checked={false} />
                                      <span class="slider round"></span>
                                    </label> </>
                                  )}
                                  <CardContent>
                                    <Typography
                                      gutterBottom
                                      variant="h5"
                                      component="h5"
                                    >
                                      {item.name}
                                    </Typography>
                                    <Typography
                                      variant="body2"
                                      component="p"
                                      color="text.secondary"
                                      style={{ height: "50px" }}
                                    >
                                      {item.description}
                                    </Typography>
                                  </CardContent>
                                  <CardActions>
                                    {item.connectionAvl ? (
                                      <>
                                        {(["Typeform"].indexOf(item.name) != -1 && isModalDataTypeform.length != 0) || ["Hubspot"].indexOf(item.name) != -1 && isModalDataHubspot.length != 0 ?
                                          (<div className="disconnect-btn">Dataset Connected  <div className="float-right"><a className="fa fa-pencil mr-3" onClick={(ev) => {
                                            connectDataForIngestion(ev, item.name);
                                          }}></a>   <a className="fa fa-close" onClick={(ev) => {
                                            clearDataForIngestion(ev, item.name);
                                          }}></a></div></div>) : <><Button
                                            className="connect-btn">Connect Source</Button></>}
                                      </>
                                    ) : (
                                      <>
                                        <Button
                                          className="connect-btn"
                                          onClick={(e) => { handleOpen(item.name) }}
                                        >
                                          Connect Dataset
                                        </Button>
                                        {
                                          (item.name != "Typeform" && item.name != "Hubspot") &&
                                          <Button className="getstart-btn" onClick={(e) => emailpopupOpen("datasource", item.name)}>
                                            Get Started
                                          </Button>
                                        }
                                      </>
                                    )}
                                    {/* <Grid display={"flex"}>
                                      {(isConnectedTypeForm == true &&
                                        ["Typeform"].indexOf(item.name) !=
                                        -1) ||
                                        (isConnectedHubspot == true &&
                                          ["Hubspot"].indexOf(item.name) !=
                                          -1) ? (
                                        <Grid display={"flex"}>
                                          {" "}
                                          <Button
                                            className="disconnect-btn mr-2"
                                            onClick={(ev) => {
                                              removeTypeformToken(
                                                ev,
                                                item.name
                                              );
                                            }}
                                          >
                                            Disconnect
                                          </Button>
                                        </Grid>
                                      ) : (
                                        <>
                                          <Button
                                            className="connect-btn"
                                            onClick={(e) => {
                                              handleOpen(e, item.name);
                                            }}
                                          >
                                            Connect
                                          </Button>
                                        </>
                                      )}
                                      {/* {item.name == "Typeform" ? <Grid display={'flex'}> <Button className='disconnect-btn mr-2'>Disconnect</Button> <Button className='connect-btn' onClick={(ev) => { getUpdateSurveyList(ev) }}>Ingest New Form</Button></Grid> : item.name == "Salesforce" ? <Button className='connect-btn'>Connect</Button> : <><Button className='disconnect-btn mr-2'>Disconnect</Button></>} */}
                                    {/* <Button className='connect-btn mr-2'>Connect</Button> *
                                    </Grid> */}

                                    {/* <Chip icon={<CheckIcon />} label="Connected" /> */}
                                    {/* {!isConnectedTypeForm && connectedType.indexOf(item.name) != -1 ?
                                        <Button variant='outlined' onClick={(e) => { handleOpen(item.name) }} size="small">Connect</Button> :
                                        <Chip icon={<CheckIcon />} label="Connected" />
                                      } */}
                                  </CardActions>
                                </Card>
                              </Grid>
                            ))}
                            <Grid xs={12} md={12} lg={12}>
                              <div className="mt-3"></div>
                              <Typography
                                variant="h6"
                                component="h6"
                                className="ml-4"
                              >
                                CRM
                              </Typography>
                            </Grid>
                            {CRMListData.map((item, i) => (
                              <Grid
                                item
                                xs={12}
                                md={3}
                                lg={3}
                                key={i}
                                className="cursor-pointer" onClick={(ev) => {
                                  connectDataForIngestion(ev, item.name);
                                }}>
                                <Card
                                  key={i}
                                  className={item.connectionAvl ? '' : 'dataListcard'}>
                                  <CardMedia
                                    sx={{
                                      height: 48,
                                      width: 48,
                                      margin: "10px 16px",
                                      backgroundSize: "70%",
                                      borderRadius: "4px",
                                      border: "1px solid #ddd",
                                    }}
                                    className='cardMedia'
                                    image={item.img}
                                    title={item.name}
                                  />
                                  {(isConnectedTypeForm == true && ["Typeform"].indexOf(item.name) != -1) ||
                                    (isConnectedHubspot == true && ["Hubspot"].indexOf(item.name) != -1) || (isConnectedZendesk == true && ["Zendesk"].indexOf(item.name) != -1) ? (
                                    <> <label class="switch" onClick={(ev) => {
                                      removeTypeformToken(ev, item.name);
                                    }}>
                                      <input type="checkbox" checked={true} disabled={item.active} />
                                      <span class="slider round"></span>
                                    </label> </>
                                  ) : (
                                    <> <label class="switch" onClick={(e) => {
                                      handleOpen(e, item.name);
                                    }} >
                                      <input type="checkbox" checked={false} />
                                      <span class="slider round"></span>
                                    </label> </>
                                  )}
                                  <CardContent>
                                    <Typography
                                      gutterBottom
                                      variant="h5"
                                      component="h5"
                                    >
                                      {item.name}
                                    </Typography>
                                    <Typography
                                      variant="body2"
                                      component="p"
                                      color="text.secondary"
                                      style={{ height: "50px" }}
                                    >
                                      {item.description}
                                    </Typography>
                                  </CardContent>
                                  <CardActions>
                                    {item.connectionAvl ? (
                                      <>
                                        {(["Typeform"].indexOf(item.name) != -1 && isModalDataTypeform.length != 0) || ["Hubspot"].indexOf(item.name) != -1 && isModalDataHubspot.length != 0 ?
                                          (<div className="disconnect-btn">Dataset Connected  <div className="float-right"><a className="fa fa-pencil mr-3" onClick={(ev) => {
                                            connectDataForIngestion(ev, item.name);
                                          }}></a>   <a className="fa fa-close" onClick={(ev) => {
                                            clearDataForIngestion(ev, item.name);
                                          }}></a></div></div>) : <><Button
                                            className="connect-btn">Connect Source</Button></>}
                                      </>
                                    ) : (
                                      <>
                                        <Button
                                          className="connect-btn"
                                          onClick={(e) => { handleOpen(item.name) }}
                                        >
                                          Connect Dataset
                                        </Button>
                                        {
                                          (item.name != "Typeform" && item.name != "Hubspot") &&
                                          <Button className="getstart-btn" onClick={(e) => emailpopupOpen("datasource", item.name)}>
                                            Get Started
                                          </Button>
                                        }
                                      </>
                                    )}
                                  </CardActions>
                                </Card>
                              </Grid>
                            ))}

                            <Grid xs={12} md={12} lg={12}>
                              <div className="mt-3"></div>
                              <Typography
                                variant="h6"
                                component="h6"
                                className="ml-4"
                              >
                                Customer Service
                              </Typography>
                            </Grid>
                            {customerServiceListData.map((item, i) => (
                              <Grid
                                item
                                xs={12}
                                md={3}
                                lg={3}
                                key={i}
                                className="cursor-pointer" onClick={(ev) => {
                                  connectDataForIngestion(ev, item.name);
                                }}>
                                <Card
                                  key={i}
                                  className={item.connectionAvl ? '' : 'dataListcard'}>
                                  <CardMedia
                                    sx={{
                                      height: 48,
                                      width: 48,
                                      margin: "10px 16px",
                                      backgroundSize: "70%",
                                      borderRadius: "4px",
                                      border: "1px solid #ddd",
                                    }}
                                    className='cardMedia'
                                    image={item.img}
                                    title={item.name}
                                  />
                                  {(isConnectedTypeForm == true && ["Typeform"].indexOf(item.name) != -1) ||
                                    (isConnectedHubspot == true && ["Hubspot"].indexOf(item.name) != -1) || (isConnectedZendesk == true && ["Zendesk"].indexOf(item.name) != -1) ? (
                                    <> <label class="switch" onClick={(ev) => {
                                      removeTypeformToken(ev, item.name);
                                    }}>
                                      <input type="checkbox" checked={true} disabled={item.active} />
                                      <span class="slider round"></span>
                                    </label> </>
                                  ) : (
                                    <> <label class="switch" onClick={(e) => {
                                      handleOpen(e, item.name);
                                    }} >
                                      <input type="checkbox" checked={false} />
                                      <span class="slider round"></span>
                                    </label> </>
                                  )}
                                  <CardContent>
                                    <Typography
                                      gutterBottom
                                      variant="h5"
                                      component="h5"
                                    >
                                      {item.name}
                                    </Typography>
                                    <Typography
                                      variant="body2"
                                      component="p"
                                      color="text.secondary"
                                      style={{ height: "50px" }}
                                    >
                                      {item.description}
                                    </Typography>
                                  </CardContent>
                                  <CardActions>
                                    {item.connectionAvl ? (
                                      <>
                                        {(["Typeform"].indexOf(item.name) != -1 && isModalDataTypeform.length != 0) || ["Hubspot"].indexOf(item.name) != -1 && isModalDataHubspot.length != 0 ?
                                          (<div className="disconnect-btn">Dataset Connected  <div className="float-right"><a className="fa fa-pencil mr-3" onClick={(ev) => {
                                            connectDataForIngestion(ev, item.name);
                                          }}></a>   <a className="fa fa-close" onClick={(ev) => {
                                            clearDataForIngestion(ev, item.name);
                                          }}></a></div></div>) : <><Button
                                            className="connect-btn">Connect Source</Button></>}
                                      </>
                                    ) : (
                                      <>
                                        <Button
                                          className="connect-btn"
                                          onClick={(e) => { handleOpen(item.name) }}
                                        >
                                          Connect Dataset
                                        </Button>
                                        {
                                          (item.name != "Typeform" && item.name != "Hubspot") &&
                                          <Button className="getstart-btn" onClick={(e) => emailpopupOpen("datasource", item.name)}>
                                            Get Started
                                          </Button>
                                        }
                                      </>
                                    )}
                                  </CardActions>
                                </Card>
                              </Grid>
                            ))}

                            <Grid xs={12} md={12} lg={12}>
                              <div className="mt-3"></div>
                              <Typography
                                variant="h6"
                                component="h6"
                                className="ml-4"
                              >
                                Social Media
                              </Typography>
                            </Grid>
                            {socialmediaList.map((item, i) => (
                              <Grid
                                item
                                xs={12}
                                md={3}
                                lg={3}
                                key={i}
                                className="cursor-pointer" onClick={(ev) => {
                                  connectDataForIngestion(ev, item.name);
                                }}>
                                <Card
                                  key={i}
                                  className={item.connectionAvl ? '' : 'dataListcard'}>
                                  <CardMedia
                                    sx={{
                                      height: 48,
                                      width: 48,
                                      margin: "10px 16px",
                                      backgroundSize: "70%",
                                      borderRadius: "4px",
                                      border: "1px solid #ddd",
                                    }}
                                    className='cardMedia'
                                    image={item.img}
                                    title={item.name}
                                  />
                                  {(isConnectedTypeForm == true && ["Typeform"].indexOf(item.name) != -1) ||
                                    (isConnectedHubspot == true && ["Hubspot"].indexOf(item.name) != -1) || (isConnectedZendesk == true && ["Zendesk"].indexOf(item.name) != -1) ? (
                                    <> <label class="switch" onClick={(ev) => {
                                      removeTypeformToken(ev, item.name);
                                    }}>
                                      <input type="checkbox" checked={true} disabled={item.active} />
                                      <span class="slider round"></span>
                                    </label> </>
                                  ) : (
                                    <> <label class="switch" onClick={(e) => {
                                      handleOpen(e, item.name);
                                    }} >
                                      <input type="checkbox" checked={false} />
                                      <span class="slider round"></span>
                                    </label> </>
                                  )}
                                  <CardContent>
                                    <Typography
                                      gutterBottom
                                      variant="h5"
                                      component="h5"
                                    >
                                      {item.name}
                                    </Typography>
                                    <Typography
                                      variant="body2"
                                      component="p"
                                      color="text.secondary"
                                      style={{ height: "50px" }}
                                    >
                                      {item.description}
                                    </Typography>
                                  </CardContent>
                                  <CardActions>
                                    {item.connectionAvl ? (
                                      <>
                                        {(["Typeform"].indexOf(item.name) != -1 && isModalDataTypeform.length != 0) || ["Hubspot"].indexOf(item.name) != -1 && isModalDataHubspot.length != 0 ?
                                          (<div className="disconnect-btn">Dataset Connected  <div className="float-right"><a className="fa fa-pencil mr-3" onClick={(ev) => {
                                            connectDataForIngestion(ev, item.name);
                                          }}></a>   <a className="fa fa-close" onClick={(ev) => {
                                            clearDataForIngestion(ev, item.name);
                                          }}></a></div></div>) : <><Button
                                            className="connect-btn">Connect Source</Button></>}
                                      </>
                                    ) : (
                                      <>
                                        <Button
                                          className="connect-btn"
                                          onClick={(e) => { handleOpen(item.name) }}
                                        >
                                          Connect Dataset
                                        </Button>
                                        {
                                          (item.name != "Typeform" && item.name != "Hubspot") &&
                                          <Button className="getstart-btn" onClick={(e) => emailpopupOpen("datasource", item.name)}>
                                            Get Started
                                          </Button>
                                        }
                                      </>
                                    )}
                                  </CardActions>
                                </Card>
                              </Grid>
                            ))}

                            <Grid xs={12} md={12} lg={12}>
                              <div className="mt-3"></div>
                              <Typography
                                variant="h6"
                                component="h6"
                                className="ml-4"
                              >
                                Reviews
                              </Typography>
                            </Grid>
                            {reviewsListData.map((item, i) => (
                              <Grid
                                item
                                xs={12}
                                md={3}
                                lg={3}
                                key={i}
                                className="cursor-pointer" onClick={(ev) => {
                                  connectDataForIngestion(ev, item.name);
                                }}>
                                <Card
                                  key={i}
                                  className={item.connectionAvl ? '' : 'dataListcard'}>
                                  <CardMedia
                                    sx={{
                                      height: 48,
                                      width: 48,
                                      margin: "10px 16px",
                                      backgroundSize: "70%",
                                      borderRadius: "4px",
                                      border: "1px solid #ddd",
                                    }}
                                    className='cardMedia'
                                    image={item.img}
                                    title={item.name}
                                  />
                                  {(isConnectedTypeForm == true && ["Typeform"].indexOf(item.name) != -1) ||
                                    (isConnectedHubspot == true && ["Hubspot"].indexOf(item.name) != -1) || (isConnectedZendesk == true && ["Zendesk"].indexOf(item.name) != -1) ? (
                                    <> <label class="switch" onClick={(ev) => {
                                      removeTypeformToken(ev, item.name);
                                    }}>
                                      <input type="checkbox" checked={true} disabled={item.active} />
                                      <span class="slider round"></span>
                                    </label> </>
                                  ) : (
                                    <> <label class="switch" onClick={(e) => {
                                      handleOpen(e, item.name);
                                    }} >
                                      <input type="checkbox" checked={false} />
                                      <span class="slider round"></span>
                                    </label> </>
                                  )}
                                  <CardContent>
                                    <Typography
                                      gutterBottom
                                      variant="h5"
                                      component="h5"
                                    >
                                      {item.name}
                                    </Typography>
                                    <Typography
                                      variant="body2"
                                      component="p"
                                      color="text.secondary"
                                      style={{ height: "50px" }}
                                    >
                                      {item.description}
                                    </Typography>
                                  </CardContent>
                                  <CardActions>
                                    {item.connectionAvl ? (
                                      <>
                                        {(["Typeform"].indexOf(item.name) != -1 && isModalDataTypeform.length != 0) || ["Hubspot"].indexOf(item.name) != -1 && isModalDataHubspot.length != 0 ?
                                          (<div className="disconnect-btn">Dataset Connected  <div className="float-right"><a className="fa fa-pencil mr-3" onClick={(ev) => {
                                            connectDataForIngestion(ev, item.name);
                                          }}></a>   <a className="fa fa-close" onClick={(ev) => {
                                            clearDataForIngestion(ev, item.name);
                                          }}></a></div></div>) : <><Button
                                            className="connect-btn">Connect Source</Button></>}
                                      </>
                                    ) : (
                                      <>
                                        <Button
                                          className="connect-btn"
                                          onClick={(e) => { handleOpen(item.name) }}
                                        >
                                          Connect Dataset
                                        </Button>
                                        {
                                          (item.name != "Typeform" && item.name != "Hubspot") &&
                                          <Button className="getstart-btn" onClick={(e) => emailpopupOpen("datasource", item.name)}>
                                            Get Started
                                          </Button>
                                        }
                                      </>
                                    )}
                                  </CardActions>
                                </Card>
                              </Grid>
                            ))}


                            <Grid xs={12} md={12} lg={12}>
                              <div className="mt-3"></div>
                              <Typography
                                variant="h6"
                                component="h6"
                                className="ml-4"
                              >
                                Financial
                              </Typography>
                            </Grid>
                            {financialListData.map((item, i) => (
                              <Grid
                                item
                                xs={12}
                                md={3}
                                lg={3}
                                key={i}
                                className="cursor-pointer" onClick={(ev) => {
                                  connectDataForIngestion(ev, item.name);
                                }}>
                                <Card
                                  key={i}
                                  className={item.connectionAvl ? '' : 'dataListcard'}>
                                  <CardMedia
                                    sx={{
                                      height: 48,
                                      width: 48,
                                      margin: "10px 16px",
                                      backgroundSize: "70%",
                                      borderRadius: "4px",
                                      border: "1px solid #ddd",
                                    }}
                                    className='cardMedia'
                                    image={item.img}
                                    title={item.name}
                                  />
                                  {(isConnectedTypeForm == true && ["Typeform"].indexOf(item.name) != -1) ||
                                    (isConnectedHubspot == true && ["Hubspot"].indexOf(item.name) != -1) || (isConnectedZendesk == true && ["Zendesk"].indexOf(item.name) != -1) ? (
                                    <> <label class="switch" onClick={(ev) => {
                                      removeTypeformToken(ev, item.name);
                                    }}>
                                      <input type="checkbox" checked={true} disabled={item.active} />
                                      <span class="slider round"></span>
                                    </label> </>
                                  ) : (
                                    <> <label class="switch" onClick={(e) => {
                                      handleOpen(e, item.name);
                                    }} >
                                      <input type="checkbox" checked={false} />
                                      <span class="slider round"></span>
                                    </label> </>
                                  )}
                                  <CardContent>
                                    <Typography
                                      gutterBottom
                                      variant="h5"
                                      component="h5"
                                    >
                                      {item.name}
                                    </Typography>
                                    <Typography
                                      variant="body2"
                                      component="p"
                                      color="text.secondary"
                                      style={{ height: "50px" }}
                                    >
                                      {item.description}
                                    </Typography>
                                  </CardContent>
                                  <CardActions>
                                    {item.connectionAvl ? (
                                      <>
                                        {(["Typeform"].indexOf(item.name) != -1 && isModalDataTypeform.length != 0) || ["Hubspot"].indexOf(item.name) != -1 && isModalDataHubspot.length != 0 ?
                                          (<div className="disconnect-btn">Dataset Connected  <div className="float-right"><a className="fa fa-pencil mr-3" onClick={(ev) => {
                                            connectDataForIngestion(ev, item.name);
                                          }}></a>   <a className="fa fa-close" onClick={(ev) => {
                                            clearDataForIngestion(ev, item.name);
                                          }}></a></div></div>) : <><Button
                                            className="connect-btn">Connect Source</Button></>}
                                      </>
                                    ) : (
                                      <>
                                        <Button
                                          className="connect-btn"
                                          onClick={(e) => { handleOpen(item.name) }}
                                        >
                                          Connect Dataset
                                        </Button>
                                        {
                                          (item.name != "Typeform" && item.name != "Hubspot") &&
                                          <Button className="getstart-btn" onClick={(e) => emailpopupOpen("datasource", item.name)}>
                                            Get Started
                                          </Button>
                                        }
                                      </>
                                    )}
                                  </CardActions>
                                </Card>
                              </Grid>
                            ))}




                            <Grid xs={12} md={12} lg={12}>
                              <div className="mt-3"></div>
                              <Typography
                                variant="h6"
                                component="h6"
                                className="ml-4"
                              >
                                Data Warehouse Database
                              </Typography>
                            </Grid>
                            {dataWarehouseDatabaseListData.map((item, i) => (
                              <Grid
                                item
                                xs={12}
                                md={3}
                                lg={3}
                                key={i}
                                className="cursor-pointer" onClick={(ev) => {
                                  connectDataForIngestion(ev, item.name);
                                }}>
                                <Card
                                  key={i}
                                  className={item.connectionAvl ? '' : 'dataListcard'}>
                                  <CardMedia
                                    sx={{
                                      height: 48,
                                      width: 48,
                                      margin: "10px 16px",
                                      backgroundSize: "70%",
                                      borderRadius: "4px",
                                      border: "1px solid #ddd",
                                    }}
                                    className='cardMedia'
                                    image={item.img}
                                    title={item.name}
                                  />
                                  {(isConnectedTypeForm == true && ["Typeform"].indexOf(item.name) != -1) ||
                                    (isConnectedHubspot == true && ["Hubspot"].indexOf(item.name) != -1) || (isConnectedZendesk == true && ["Zendesk"].indexOf(item.name) != -1) ? (
                                    <> <label class="switch" onClick={(ev) => {
                                      removeTypeformToken(ev, item.name);
                                    }}>
                                      <input type="checkbox" checked={true} disabled={item.active} />
                                      <span class="slider round"></span>
                                    </label> </>
                                  ) : (
                                    <> <label class="switch" onClick={(e) => {
                                      handleOpen(e, item.name);
                                    }} >
                                      <input type="checkbox" checked={false} />
                                      <span class="slider round"></span>
                                    </label> </>
                                  )}
                                  <CardContent>
                                    <Typography
                                      gutterBottom
                                      variant="h5"
                                      component="h5"
                                    >
                                      {item.name}
                                    </Typography>
                                    <Typography
                                      variant="body2"
                                      component="p"
                                      color="text.secondary"
                                      style={{ height: "50px" }}
                                    >
                                      {item.description}
                                    </Typography>
                                  </CardContent>
                                  <CardActions>
                                    {item.connectionAvl ? (
                                      <>
                                        {(["Typeform"].indexOf(item.name) != -1 && isModalDataTypeform.length != 0) || ["Hubspot"].indexOf(item.name) != -1 && isModalDataHubspot.length != 0 ?
                                          (<div className="disconnect-btn">Dataset Connected  <div className="float-right"><a className="fa fa-pencil mr-3" onClick={(ev) => {
                                            connectDataForIngestion(ev, item.name);
                                          }}></a>   <a className="fa fa-close" onClick={(ev) => {
                                            clearDataForIngestion(ev, item.name);
                                          }}></a></div></div>) : <><Button
                                            className="connect-btn">Connect Source</Button></>}
                                      </>
                                    ) : (
                                      <>
                                        <Button
                                          className="connect-btn"
                                          onClick={(e) => { handleOpen(item.name) }}
                                        >
                                          Connect Dataset
                                        </Button>
                                        {
                                          (item.name != "Typeform" && item.name != "Hubspot") &&
                                          <Button className="getstart-btn" onClick={(e) => emailpopupOpen("datasource", item.name)}>
                                            Get Started
                                          </Button>
                                        }
                                      </>
                                    )}
                                  </CardActions>
                                </Card>
                              </Grid>
                            ))}

 <Grid xs={12} md={12} lg={12}>
                              <div className="mt-3"></div>
                              <Typography
                                variant="h6"
                                component="h6"
                                className="ml-4"
                              >
                               E-commerce
                              </Typography>
                            </Grid>
                            {ecommerceListData.map((item, i) => (
                              <Grid
                                item
                                xs={12}
                                md={3}
                                lg={3}
                                key={i}
                                className="cursor-pointer" onClick={(ev) => {
                                  connectDataForIngestion(ev, item.name);
                                }}>
                                <Card
                                  key={i}
                                  className={item.connectionAvl ? '' : 'dataListcard'}>
                                  <CardMedia
                                    sx={{
                                      height: 48,
                                      width: 48,
                                      margin: "10px 16px",
                                      backgroundSize: "70%",
                                      borderRadius: "4px",
                                      border: "1px solid #ddd",
                                    }}
                                    className='cardMedia'
                                    image={item.img}
                                    title={item.name}
                                  />
                                  {(isConnectedTypeForm == true && ["Typeform"].indexOf(item.name) != -1) ||
                                    (isConnectedHubspot == true && ["Hubspot"].indexOf(item.name) != -1) || (isConnectedZendesk == true && ["Zendesk"].indexOf(item.name) != -1) ? (
                                    <> <label class="switch" onClick={(ev) => {
                                      removeTypeformToken(ev, item.name);
                                    }}>
                                      <input type="checkbox" checked={true} disabled={item.active} />
                                      <span class="slider round"></span>
                                    </label> </>
                                  ) : (
                                    <> <label class="switch" onClick={(e) => {
                                      handleOpen(e, item.name);
                                    }} >
                                      <input type="checkbox" checked={false} />
                                      <span class="slider round"></span>
                                    </label> </>
                                  )}
                                  <CardContent>
                                    <Typography
                                      gutterBottom
                                      variant="h5"
                                      component="h5"
                                    >
                                      {item.name}
                                    </Typography>
                                    <Typography
                                      variant="body2"
                                      component="p"
                                      color="text.secondary"
                                      style={{ height: "50px" }}
                                    >
                                      {item.description}
                                    </Typography>
                                  </CardContent>
                                  <CardActions>
                                    {item.connectionAvl ? (
                                      <>
                                        {(["Typeform"].indexOf(item.name) != -1 && isModalDataTypeform.length != 0) || ["Hubspot"].indexOf(item.name) != -1 && isModalDataHubspot.length != 0 ?
                                          (<div className="disconnect-btn">Dataset Connected  <div className="float-right"><a className="fa fa-pencil mr-3" onClick={(ev) => {
                                            connectDataForIngestion(ev, item.name);
                                          }}></a>   <a className="fa fa-close" onClick={(ev) => {
                                            clearDataForIngestion(ev, item.name);
                                          }}></a></div></div>) : <><Button
                                            className="connect-btn">Connect Source</Button></>}
                                      </>
                                    ) : (
                                      <>
                                        <Button
                                          className="connect-btn"
                                          onClick={(e) => { handleOpen(item.name) }}
                                        >
                                          Connect Dataset
                                        </Button>
                                        {
                                          (item.name != "Typeform" && item.name != "Hubspot") &&
                                          <Button className="getstart-btn" onClick={(e) => emailpopupOpen("datasource", item.name)}>
                                            Get Started
                                          </Button>
                                        }
                                      </>
                                    )}
                                  </CardActions>
                                </Card>
                              </Grid>
                            ))}
                          </Grid>
                        </CustomTabPanel>
                        <CustomTabPanel value={value} index={1}>
                          <Grid container xs={12} gap={3}>
                            <Grid
                              item
                              rowSpacing={3}
                              columnSpacing={3}
                              display={"flex"}
                            >
                              <Button
                                variant="outlined"
                                onClick={(e) => {
                                  handleUploadOpen();
                                }}
                                size="small"
                                style={{ marginRight: 20 }}
                              >
                                {" "}
                                Choose File
                              </Button>
                              <span>
                                {isModalDataFile[0]?.list?.displayName}
                              </span>
                              {/* <Button onClick={handleUploadOpen()}> */}
                              {/* <Typography
                                onClick={handleUploadOpen()}
                                  variant="h6"
                                  component="h6"
                                  color="text.primary"
                                >
                                  Upload File
                                </Typography> */}
                              {/* </Button> */}
                            </Grid>
                          </Grid>
                          {/*<Grid xs={12} gap={3} rowSpacing={3} columnSpacing={3} className='grid grid-cols-3 gap-3 grayscale-image'>
                              {uploadFile.map((item, i) => (
                                <Grid item xs={4} display={'contents'} className='cursor-pointer' onClick={(ev) => { getUpdateSurveyList(ev,item.name) }}>
                                  <Card sx={{ maxWidth: '100%' }} style={{ width: '100%', padding: '16px 0' }} key={i} className={selected.findIndex(ele1 => ele1.label === item.name) == -1 ? '' : 'active-card'}>
                                    <CardMedia
                                      sx={{ height: 80, width: 80, margin: '0px 16px', backgroundSize: '70%', borderRadius: '4px', border: '1px solid #ddd' }}
                                      image={item.img}
                                      title={item.name}
                                    />
                                    <CardContent>
                                      <Typography gutterBottom variant="h5" component="h5">
                                        {item.name}
                                      </Typography>
                                      <Typography variant="body2" component="p" color="text.secondary">
                                        {item.description}
                                      </Typography>
                                    </CardContent>
                                    <CardActions>
                                      {isConnectedTypeForm ?
                                        <Button variant='outlined' onClick={(e) => { handleOpen(item.name) }} size="small">Connect</Button> :
                                        <Chip icon={<CheckIcon />} label="Connected" />
                                      }
                                    </CardActions>
                                  </Card>
                                </Grid>
                              ))}
                            </Grid> */}
                        </CustomTabPanel>
                      </Box>
                    </Box>
                  ) : (
                    ""
                  )}
                  {/* end */}

                  {/* step2 code */}
                  {activeStep + 1 == 2 ? (<>
                    <Box display={"grid"} gap={4}>
                      <Grid container item xs={12} display={"flex"}>
                        <Grid item xs={12}>
                          <Typography variant="h6" component="h6">
                            Project Name:{" "}
                            <Typography
                              variant="span"
                              component="span"
                              color="text.secondary"
                            >
                              {projectName}
                            </Typography>
                          </Typography>
                        </Grid>
                      </Grid>

                      <Grid container item xs={12} display={"flex"}>
                        <Grid item xs={12}>
                          <Typography variant="h6" component="h6">
                            Choose a model template
                          </Typography>
                          <Typography
                            variant="p"
                            component="p"
                            color="text.secondary"
                          >
                            Based on your datasets we recommend to use following
                            model templates
                          </Typography>
                        </Grid>
                      </Grid>

                      <Grid display={"grid"} gap={2}>
                        {templateData.map((item, i) => (
                          <List
                            sx={{ width: "100%", padding: "0" }}
                            component="nav"
                            aria-labelledby="nested-list-subheader"
                            style={{
                              border: "1px solid #d0d0d0",
                              borderRadius: "4px",
                              overflow: 'auto'
                            }}
                            className={i < 5 ? 'active-servay' : ''}
                          >
                            <ListItemButton style={{ padding: "16px", width: '98%' }} >
                              <ListItemIcon >
                                <i
                                  className={item.icons}
                                  style={{ fontSize: "25px" }}
                                ></i>
                                {/* {i == 0 || i == 3 ? <CurrencyExchangeIcon /> : i == 1 || i == 4 ? <PieChartIcon /> : i == 2 || i == 5 ? <StarBorderIcon /> : ''} */}
                              </ListItemIcon>
                              <ListItemText>
                                <Typography variant="h6" component="h6">
                                  {item.name}
                                </Typography>
                                <Typography
                                  variant="p"
                                  component="p"
                                  color="text.secondary"
                                >
                                  {item.description}
                                </Typography>
                              </ListItemText>
                              <Switch
                                edge="end"
                                checked={
                                  checked.indexOf(item.id) == -1 ? false : true
                                }
                                onChange={(ev) => {
                                  handleToggle(ev, item.id, item.name);
                                }}
                                inputProps={{
                                  "aria-labelledby": "switch-list-label-wifi",
                                }}
                              />
                            </ListItemButton>

                            <Collapse
                              in={checked.indexOf(item.id) == -1 ? false : true}
                              timeout="auto"
                              unmountOnExit
                            >
                              <List component="div" disablePadding>
                                <div className="clearFix" />
                                <br />
                                <Grid container spacing={3}>
                                  {warningNotificationAlert.alertVisible ==
                                    true && (
                                      <Grid item xs={3}>
                                        <section
                                          className={`message-box ml-41 ${warningNotificationAlert.alertType}`}
                                        >
                                          <span>
                                            {
                                              warningNotificationAlert.alertHeaderText
                                            }
                                          </span>
                                          <a
                                            onClick={() =>
                                              setwarningMessgeDetais(
                                                !warningMessgeDetais
                                              )
                                            }
                                          >
                                            <i
                                              className={
                                                warningMessgeDetais
                                                  ? "fa fa-angle-up"
                                                  : "fa fa-angle-down"
                                              }
                                            ></i>
                                          </a>
                                          {warningMessgeDetais ? (
                                            <>
                                              <ul>
                                                {warningNotificationAlert.alertTextMessage.map(
                                                  (itemMessage, i) => (
                                                    <li>{itemMessage} </li>
                                                  )
                                                )}
                                              </ul>
                                            </>
                                          ) : (
                                            <> </>
                                          )}
                                        </section>
                                      </Grid>
                                    )} 
                                  {
                                    errorListDisplay.map(
                                      (itemMessage, i) => (
                                        <Grid item>
                                          <div style={{ height: (itemMessage.isCollapsable == true ? '50px' : 'auto') }}
                                            className={`message-box mb-3 ml-4   ${itemMessage.alertType}`}
                                          >
                                            <span>{itemMessage.short_text}</span>
                                            <a
                                              onClick={(val, ind) => {

                                                collapseAndExpandError(val, i)
                                              }
                                              }
                                            >
                                              <i
                                                className={
                                                  !itemMessage.isCollapsable
                                                    ? "fa fa-angle-up"
                                                    : "fa fa-angle-down"
                                                }
                                              ></i>
                                            </a>
                                            {!itemMessage.isCollapsable ? (
                                              <>
                                                <ul>
                                                  {
                                                    itemMessage.message.map((mssgList, ii) => (
                                                      <li>{mssgList} </li>
                                                    ))
                                                  }
                                                </ul>
                                              </>
                                            ) : (
                                              <> </>
                                            )}

                                          </div></Grid>
                                      ))
                                  }

                                  {/* {errorNotificationAlert.alertVisible ==
                                    true && (
                                      <Grid item xs={3} >
                                        <section
                                          className={`message-box ml-4 ${errorNotificationAlert.alertType}`}
                                        >
                                          <span>
                                            {
                                              errorNotificationAlert.alertHeaderText
                                            }
                                          </span>
                                          <a
                                            onClick={() =>
                                              seterrorMessgeDetais(
                                                !errorMessgeDetais
                                              )
                                            }
                                          >
                                            <i
                                              className={
                                                errorMessgeDetais
                                                  ? "fa fa-angle-up"
                                                  : "fa fa-angle-down"
                                              }
                                            ></i>
                                          </a>
                                          {errorMessgeDetais ? (
                                            <>
                                              <ul>
                                                {errorNotificationAlert.alertTextMessage.map(
                                                  (itemMessage, i) => (
                                                    <li>{itemMessage}</li>
                                                  )
                                                )}
                                              </ul>
                                            </>
                                          ) : (
                                            <> </>
                                          )}
                                        </section>
                                      </Grid>
                                    )} */}
                                </Grid>


                                {!showLoder && !typeformIngestionStatus.status ?
                                  isShowSurveyMapp.map((label, index) => ( 
                                    <> 
                                      <Typography  style={{margin:'15px'}}   
                                                variant="span"
                                                className="text-primary datasources"
                                              >
                                                <span className="datasources-type">
                                                  {label.dataType}
                                                </span>
                                                <span className="datasources-list">
                                                  {label.survey.label}
                                                </span>
                                                <Button
                                                  color="primary"
                                                  size="small"
                                                  variant="outlined"
                                                  onClick={() => {
                                                    handleRemoveSurvey(index);
                                                  }}
                                                >
                                                  <CloseIcon /> Remove
                                                </Button>
                                              </Typography> 

                                          {label.dataType == "Typeform" && label.survey.value == (isShowSurveyMapp.filter((ele) => ele.dataType == "Typeform")[isShowSurveyMapp.filter((ele) => ele.dataType == "Typeform").length-1]).survey.value ?
                                            <Box
                                              sx={{
                                                height: 520,
                                                width: "98.5%", 
                                                margin:'15px',
                                                paddingBottom: "10px",
                                              }}
                                            >
                                              <DataGrid
                                                rows={label.listMapping}
                                                columns={
                                                  label.dataType == "Typeform"
                                                    ? gridDataForGrid.columns
                                                    : gridDataForGrid.columns1
                                                }
                                                pageSizeOptions={[5, 10, 50, 100]}
                                                checkboxSelection={true}
                                                disableSelectionOnClick
                                                rowHeight={65}
                                                selectionModel={
                                                  label.checkedAllList
                                                }
                                                onSelectionModelChange={(
                                                  e
                                                ) => {
                                                  setSelectionModel(e);
                                                  const selectedIDs = new Set(e);
                                                  const selectedRows =
                                                    label.listMapping.filter(
                                                      (r) => selectedIDs.has(r.id)
                                                    );
                                                  setSelectedRows(selectedRows);
                                                }}
                                                onCellKeyDown={(
                                                  params,
                                                  event
                                                ) => {
                                                  event.stopPropagation();
                                                  event.defaultMuiPrevented = true;
                                                }}
                                                pagination={false}
                                                hideFooterRowCount={true}
                                                hideFooter={true}
                                                editable
                                              />
                                            </Box>
                                            : ""}

                                          {label.dataType !== "Typeform" ? <Box
                                            sx={{
                                              height: 520,
                                              width: "98.5%", 
                                              margin:'15px', 
                                            }}
                                          >
                                            <DataGrid
                                              rows={label.listMapping}
                                              columns={
                                                label.dataType == "Typeform"
                                                  ? gridDataForGrid.columns
                                                  : gridDataForGrid.columns1
                                              }
                                              pageSizeOptions={[5, 10, 50, 100]}
                                              checkboxSelection={true}
                                              disableSelectionOnClick
                                              rowHeight={65}
                                              selectionModel={
                                                label.checkedAllList
                                              }
                                              onSelectionModelChange={(
                                                e
                                              ) => {
                                                setSelectionModel(e);
                                                const selectedIDs = new Set(e);
                                                const selectedRows =
                                                  label.listMapping.filter(
                                                    (r) => selectedIDs.has(r.id)
                                                  );
                                                setSelectedRows(selectedRows);
                                              }}
                                              // rowSelectionModel={
                                              //   label.checkedAllList
                                              // }
                                              // onRowSelectionModelChange={(
                                              //   e
                                              // ) => {
                                              //   setSelectionModel(e);
                                              //   const selectedIDs = new Set(e);
                                              //   const selectedRows =
                                              //     label.listMapping.filter(
                                              //       (r) => selectedIDs.has(r.id)
                                              //     );
                                              //   setSelectedRows(selectedRows);
                                              // }}
                                              onCellKeyDown={(
                                                params,
                                                event
                                              ) => {
                                                event.stopPropagation();
                                                event.defaultMuiPrevented = true;
                                              }}
                                              pagination={false}
                                              hideFooterRowCount={true}
                                              hideFooter={true}
                                              editable
                                            />
                                          </Box>
                                            : ''} 
                                             
                                      </> 
                                  )) :
                                  <>
                                    <Box className='text-center'><br />
                                      <CircularProgressWithLabel value={typeformIngestionStatus.percentage} />
                                      {/* <CircularProgress /> */}
                                      <div className='ml-3'>
                                        <p>Sorting your questions into categories, thank you for your patience...</p> </div>
                                    </Box></>
                                }

                                <Grid
                                  container
                                  spacing={4}
                                  display="grid"
                                  alignItems="left"
                                >
                                  {openAddNewDatasource ? (
                                    <Grid item xs={12}>
                                      <Box
                                        sx={{ height: "auto", width: "100%" }}
                                      >
                                        <Grid
                                          item
                                          xs={12}
                                          display={"grid"}
                                          gap={2}
                                          style={{
                                            padding: "16px",
                                            background: "#f5f5f5",
                                            margin: "16px 16px 10px 16px",
                                          }}
                                        >
                                          <Grid item xs={12}>
                                            <Typography
                                              variant="h6"
                                              component="h6"
                                            >
                                              Data Sources
                                            </Typography>
                                          </Grid>
                                          <Grid
                                            item
                                            xs={12}
                                            display={"flex"}
                                            gap={3}
                                          >
                                            <Grid item xs={6}>
                                              <Autocomplete
                                                disablePortal
                                                id="combo-box-demo"
                                                options={selected}
                                                onChange={(event, value) =>
                                                  changeDataForSurvey(
                                                    event,
                                                    value
                                                  )
                                                }
                                                getOptionLabel={(option) =>
                                                  option.label
                                                }
                                                //value={selectedDataSourceForSurvey}
                                                sx={{ width: "100%" }}
                                                renderInput={(params) => (
                                                  <TextField
                                                    {...params}
                                                    label="Select data source"
                                                  />
                                                )}
                                              />
                                            </Grid>
                                            <Grid item xs={6}>
                                              {selectedDataSourceForSurvey ==
                                                "Typeform" ? (
                                                <Autocomplete
                                                  disablePortal
                                                  id="combo-box-demo1"
                                                  options={
                                                    selectedTypeSurveyList
                                                  }
                                                  sx={{ width: "100%" }}
                                                  onChange={(event, value) =>
                                                    changeSurvey(event, value)
                                                  }
                                                  getOptionLabel={(option) =>
                                                    option.formName
                                                  }
                                                  renderInput={(params) => (
                                                    <TextField
                                                      {...params}
                                                      label={
                                                        selectedDataSourceForSurvey.toLowerCase() ==
                                                          "hubspot"
                                                          ? "Select Entity"
                                                          : selectedDataSourceForSurvey.toLowerCase() ==
                                                            "file"
                                                            ? "Select File"
                                                            : "Select Survey"
                                                      }
                                                    />
                                                  )}
                                                />
                                              ) : (
                                                <Autocomplete
                                                  disablePortal
                                                  id="combo-box-demo1"
                                                  options={
                                                    selectedTypeSurveyList
                                                  }
                                                  sx={{ width: "100%" }}
                                                  onChange={(event, value) =>
                                                    changeSurvey1(event, value)
                                                  }
                                                  getOptionLabel={(option) =>
                                                    option.displayName
                                                  }
                                                  renderInput={(params) => (
                                                    <TextField
                                                      {...params}
                                                      label={
                                                        selectedDataSourceForSurvey.toLowerCase() ==
                                                          "hubspot"
                                                          ? "Select entity"
                                                          : "Select survey"
                                                      }
                                                    />
                                                  )}
                                                />
                                              )}
                                            </Grid>
                                          </Grid>
                                          <Grid item xs={12}>
                                            <Button
                                              disabled={showLoder}
                                              color="primary"
                                              variant="outlined"
                                              onClick={() => {
                                                handleApplyFetchSurvey1();
                                              }}
                                            >
                                              Apply
                                            </Button>
                                          </Grid>
                                        </Grid>
                                      </Box>
                                    </Grid>
                                  ) : (
                                    ""
                                  )}
                                  <Grid item xs={12}>
                                    <Button
                                      style={{ margin: "16px" }}
                                      color="primary"
                                      variant="outlined"
                                      onClick={handleAddNewDataSource}
                                    >
                                      <AddIcon /> Add Data Source
                                    </Button>
                                  </Grid>
                                </Grid>
                              </List>
                            </Collapse>
                          </List>
                        ))}
                      </Grid>
                      {/* {
                        isRunningAnalysis.processList.length != 0 && isRunningAnalysis.status && (<ConnectorsLoader processListStatus={isRunningAnalysis.processList} />)
                      } */}
                    </Box>

                  </>
                  ) : (
                    ""
                  )}
                  {/* end */}

                  {/* step3 code */}
                  {activeStep + 1 == 3 ? (
                    <>
                      {/* {checked[0] == 4 ? (
                        <ChurnAnalysisResult
                          resultData={paramsForFetchResult}
                        />
                      ) : ( */}


                      {/* ( */}

                      <MlResultsConnection
                        resultData={paramsForFetchResult}
                      />


                      {/* ) */}
                      {/* 
                      )} */}
                    </>
                  ) : (
                    ""
                  )}




                </Box>

                {activeStep + 1 != 3 ? <> <Box
                  sx={{ display: "flex", flexDirection: "row" }}
                  className="result-action-bottom-bar"
                >
                  {activeStep + 1 != 1 ? (
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={handleBack}
                      sx={{ mr: 1 }}
                    >
                      Previous Step
                    </Button>
                  ) : (
                    ""
                  )}
                  <Box sx={{ flex: "1 1 auto" }} />
                  {activeStep + 1 != 3 && (
                    <>
                      {checkProgressDatasetStatus.map((label11, index) => {
                        return (
                          <>
                            <Box className="dataprogressBar">
                              <img className="mr-2" src={`/json-media/img/partners/${label11.dataSource}-sm.svg`} width={20} height={20} />
                              {label11.status == "progress" ? (
                                ""
                              ) : (
                                <i className="fa fa-check-circle"></i>
                              )}{" "}
                              {label11.dataSourceText}
                              {label11.status == "progress" ? (
                                <LinearProgress
                                  color="secondary"
                                  style={{ marginTop: 5 }}
                                />
                              ) : (
                                <LinearProgress
                                  color="success"
                                  variant="determinate"
                                  value={100}
                                  style={{ marginTop: 5 }}
                                />
                              )}
                              {/* <CircularProgressWithLabel value={99} /> */}
                            </Box>
                          </>
                        );
                      })}

                      {showLoderVisual && (
                        <Box className="dataprogressBar">
                          {isRunningAnalysis.sccessPercent != 100 ? 'Survey data analysis processing...' : 'Survey data analysis completed'}
                          <LinearProgress
                            color="success"
                            variant="determinate"
                            value={isRunningAnalysis.sccessPercent}
                            style={{ marginTop: 5 }}
                          />
                        </Box>)
                      }
                      <Button color="inherit">
                        {selected.length} datasource(s) selected
                      </Button>
                      {/* {showLoderVisual && (
                        <Box sx={{ textAlign: "center" }}>
                          <CircularProgress />
                        </Box>
                      )} */}

                      <Button
                        color="primary"
                        sx={{ marginLeft: 2 }}
                        variant="outlined"
                        disabled={
                          (activeStep + 1 == 2 && showLoder == true) || (activeStep + 1 == 2 && checked.length == 0) ||
                          showLoderVisual == true ||
                          isRunningIngestion == true 
                        }
                        onClick={handleNext}
                      >
                        Next Step
                      </Button>
                    </>
                  )}

                </Box></> : ''}




                {/* )} */}
              </React.Fragment>
            )}
          </Box>
          {/*  */}
          <ConnectDialog
            open={open}
            handleClose={handleClose}
            openHubspot={openHubspot}
            openZendesk={openZendesk}
            openFacebook={openFacebook}
            openTwitter={openTwitter}
            openFeshdesk={openFeshdesk}
            openSalesforce={openSalesforce}
            openbraze={openbraze}
            openInstagram={openInstagram}
            openKlaviyo={openKlaviyo}
            openIntercom={openIntercom}
            openShopify={openShopify}
            token={tokenName}
            hubspotTokenName={hubspotTokenName}
            hubspotRefreshtokenName={hubspotRefreshtokenName}
            isOpenPopupTypeform={isOpenPopupTypeform}
            isOpenPopupHubspot={isOpenPopupHubspot}
            listOfWorkspace={listworkspaceName}
            listListOfContact={listListOfContact}
            checkedMappingForSurvey={checkedMappingForSurvey}
            checkedMappingForHubspot={checkedMappingForHubspot}
            isTypeFormEmptyData={isModalDataTypeform}
            isHubspotEmptyData={isModalDataHubspot}
          />
          {/* <DatabasesDialog open={open} handleClose={handleClose} />*/}
          <UploadDialog
            open={isUpload}
            handleClose={handleUploadClose}
            checkedMappingForFile={checkedMappingForFile}
          />
        </Box>


        {/* ------------------ send email popup  ------------------  */}
        <Dialog
          open={emailpopupopen}
          onClose={emailpopupClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          className="popup-form"
        >
          <DialogTitle id="alert-dialog-title"> Integration Inquiry
            <IconButton
              aria-label="close"
              onClick={emailpopupClose}
              sx={{
                position: 'absolute',
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            {

              !dataSourceMailObj.isSubmit && (<>
                <span>Experience exclusive data intergration tailored to your needs! Please provide your details below, and our team will connect with you get started.</span><br /><br />

                <form>
                  <Grid
                    container
                    spacing={2}
                  >
                    <Grid item xs={6}>

                      <TextField
                        required
                        autoComplete="new-password"
                        className="inputBox"
                        id="name"
                        autoFocus
                        label="First name"
                        type="text"
                        value={dataSourceMailObj.first_name}
                        onChange={(event, val) => changeDataSourceMailObj("first_name", event.target.value)}
                        placeholder="First name"
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        autoComplete="new-password"
                        className="inputBox"
                        id="name"
                        autoFocus
                        label="Last name"
                        type="text"
                        value={dataSourceMailObj.last_name}
                        onChange={(event, val) => changeDataSourceMailObj("last_name", event.target.value)}
                        placeholder="Last name"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        autoComplete="new-password"
                        className="inputBox"
                        id="name"
                        autoFocus
                        label="Email"
                        type="text"
                        value={dataSourceMailObj.email}
                        onChange={(event, val) => changeDataSourceMailObj("email", event.target.value)}
                        placeholder="Email"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        multiline
                        rows={4}
                        className="inputBox"
                        id="name"
                        autoFocus
                        label="Feedback (Optional)"
                        type="text"
                        value={dataSourceMailObj.message}
                        onChange={(event, val) => changeDataSourceMailObj("message", event.target.value)}
                        placeholder="Feedback (Optional)"
                      />
                    </Grid>
                  </Grid><br />
                  <Button variant="contained" disabled={dataSourceMailObj.first_name == "" || dataSourceMailObj.email == ""} className="pink-btn d-block w-full" onClick={(e) => { sendDataSourceMail() }} size="large">Submit</Button>
                </form> </>)
            }
            {
              dataSourceMailObj.isSubmit &&
              (<div className="text-center">
                <div className="emailsuccessfulsubmit" style={{ width: '280px', margin: 'auto' }}><h1>Thank you!</h1></div><br />
                Our team will be in touch shortly to kickstart your ConvertMl Journey<br /><br />
                <hr className="blue-hr" style={{ width: '100px', margin: 'auto' }} />
              </div>)
            }
          </DialogContent>
        </Dialog>
        {/* ------------------ send email popup  ------------------   */}
      </div >
    </>
  );
}

export default function IntegrationNotistack() {
  return (
    <SnackbarProvider maxSnack={3}>
      <CreateDataConnection />
    </SnackbarProvider>
  );
}
