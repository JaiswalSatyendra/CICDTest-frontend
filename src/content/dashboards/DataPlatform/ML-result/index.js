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
  InputLabel,
  MenuItem,
  Select,
  CardHeader,
  Divider,
  Tooltip,
  OutlinedInput,
  Popover,
  IconButton,
  Popper,
  Stack,
  Menu,
  FormControlLabel,
} from "@mui/material";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import {
  DataGridPro,
  gridClasses,
  gridColumnsTotalWidthSelector,
} from "@mui/x-data-grid-pro";
import ClearIcon from "@mui/icons-material/Clear";
import { useTranslation } from "react-i18next";
import { useContext, useEffect, useState } from "react";
import { SessionContext } from "../../../../contexts/SessionContext";
import { SnackbarProvider, useSnackbar } from "notistack";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Chip from "@mui/material/Chip";
import "tippy.js/dist/tippy.css";
import "tippy.js/animations/scale.css";
// import CardActions from "@mui/material/CardActions";
import CardMedia from "@mui/material/CardMedia";
import CheckIcon from "@mui/icons-material/Check";
import ListItemIcon from "@mui/material/ListItemIcon";
import Collapse from "@mui/material/Collapse";
import Switch from "@mui/material/Switch";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import PieChartIcon from "@mui/icons-material/PieChart";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import Chart from "react-apexcharts";
import axios from "axios";

import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Accordion from "@mui/material/Accordion";
import AccordionActions from "@mui/material/AccordionActions";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import NetPromoterScoreComingSoon from "../../../../assets/img/NetPromoterScoreComingSoon.jpg";
import stackedBarChartsComingSoon from "../../../../assets/img/stackedBarChartsComingSoon.jpg";
import HistogramsComingSoon from "../../../../assets/img/HistogramsComingSoon.jpg";
import cmllogo from "../../../../assets/icons/cml-logo.png";
import userPic from "../../../../assets/icons/usericon.png";
import arrowIcons from "../../../../assets/icons/usericon.png";

import { CSVLink, CSVDownload } from "react-csv";
// import DatabasesDialog from '../dialog/DatabasesDialog';
import positiveIcons from "../../../../assets/icons/positive.svg";
import neutralIcons from "../../../../assets/icons/neutral.svg";
import negativeIcons from "../../../../assets/icons/negative.svg";
import positivechart from "../../../../assets/icons/positivechart.png";
import neutralchart from "../../../../assets/icons/neutralchart.png";
import negativechart from "../../../../assets/icons/negativechart.png";
import demographyChart from "../../../../assets/icons/demographyChart.png";
import userIcon from "../../../../assets/icons/usericon.png";
import SplitterLayout from "react-splitter-layout";
import "react-splitter-layout/lib/index.css";
import DateFnsAdapter from "@mui/lab/AdapterDateFns";
import { DataGrid } from "@mui/x-data-grid";
import {
  churnRateRows,
  companyConsiderationColumnsData,
  companyConsiderationRows,
  companyTrustMetricColumnsData,
  companyTrustMetricRows,
  contactLevelRowsData,
  correspondenceRateRows,
  positiveSatisfactionColumnsData,
  positiveSatisfactionRowsData,
  sentimentResultColumnsData,
  sentimentResultRowsData,
  totalResultCountData,
} from "../../../../assets/data/result";
import { useTheme } from "@emotion/react";
import total_contacts from "../../../../assets/icons/usericon.svg";
import totalResponded from "../../../../assets/icons/totalResponded.svg";
import totalResponsePercent from "../../../../assets/icons/totalResponsePercent.svg";
import cltv from "../../../../assets/icons/cltv.svg";
import nps from "../../../../assets/icons/nps.svg";
import InsightIcons from "../../../../assets/icons/insightIcons.svg";
import SegmentationIcons from "../../../../assets/icons/segmentationIcons.svg";
import Recentsicons from "../../../../assets/icons/recents-icons.svg";
import ChatIcons from "../../../../assets/icons/chat-icons.svg";
import Insightsicons from "../../../../assets/icons/insights-icons.svg";
import alertactionIcons from "../../../../assets/icons/alertactionIcons.svg";

import slacklogo from "../../../../assets/icons/slacklogo.svg";
import zendesklogo from "../../../../assets/icons/zendesk.svg";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Checkbox from "@mui/material/Checkbox";
import addWeeks from "date-fns/addWeeks";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateRangePicker from "@mui/lab/DateRangePicker";
import { gridDataForGridRowData } from "../../../../assets/data/data";
import ReactWordcloud from "react-wordcloud";
import { de } from "date-fns/locale";
import {
  DateRangePickerComponent,
  PresetsDirective,
  PresetDirective,
} from "@syncfusion/ej2-react-calendars";
import InsightSegmentation from "../insight-segemetation";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { v4 as uuidv4 } from "uuid";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import CloseIcon from "@mui/icons-material/Close";
import { useMemo } from "react";
import {
  NPSAlertList,
  brandLoyaltyAlertList,
  churnPredictionAlertList,
  customerSatisfactionAlertList,
  marketResearchAlertList,
} from "../../../../assets/data/alerts-trigger";
import { AiChat } from "@nlux/react";
import "@nlux/themes/nova.css";
import { streamAdapter } from "./adapter";
import { personas } from "./personas";
import CustomChart from "../custom-chart/custom-chart";

function getWeeksAfter(date, amount) {
  return date ? addWeeks(date, amount) : undefined;
}

export default function MlResultsConnection({ resultData }) {
  const totalResultCount = totalResultCountData;
  const positiveSatisfactionColumns = positiveSatisfactionColumnsData;
  const positiveSatisfactionRows = positiveSatisfactionRowsData;
  const theme = useTheme();
  const [isSelectedPanel, setIsSelectedPanel] = useState(
    "companyConsideration"
  );
  const intervalForAnalysis1 = React.useRef();
  const [chartHalf, setIschartHalf] = useState(4);
  const [chartHalfTs, setIschartHalfTs] = useState(4);
  const [chartBoxHeight, setIschartBoxHeight] = useState(230);
  const [chartHeight, setIschartHeight] = useState(230);
  const [showButton, setIsshowButton] = useState("d-inline-block");
  const [hideButton, setIshideButton] = useState("d-none");
  const [chartOne, setIschartOne] = useState("d-inline-block");
  const [chartOneCopy, setIschartOneCopy] = useState("d-none");

  const [chartHalfheat, setIschartHalfheat] = useState(4); 
  const [chartBoxHeightheat, setIschartBoxHeightheat] = useState(230); 
  const [hideButtonheat, setIshideButtonheat] = useState("d-none"); 
  const [showButtonheat, setIsshowButtonheat] = useState("d-inline-block");  
  
  
  const [chartHalfdonutChart, setIschartHalfdonutChart] = useState(4); 
  const [chartBoxHeightdonutChart, setIschartBoxHeightdonutChart] = useState(230); 
  const [hideButtondonutChart, setIshideButtondonutChart] = useState("d-none"); 
  const [showButtondonutChart, setIsshowButtondonutChart] = useState("d-inline-block");
  

  const [chartHalfTM, setIschartHalfTM] = useState(4);
  const [chartBoxHeightTM, setIschartBoxHeightTM] = useState(250);
  const [chartHeightTM, setIschartHeightTM] = useState(250);
  const [showButtonTM, setIsshowButtonTM] = useState("d-inline-block");
  const [hideButtonTM, setIshideButtonTM] = useState("d-none");
  const [chartTwo, setIschartTwo] = useState("d-inline-block");
  const [labelHide, setlabelHide] = useState(false);
  const [chartHalfCR, setIschartHalfCR] = useState(4);
  const [chartBoxHeightCR, setIschartBoxHeightCR] = useState(230);
  const [chartHeightCR, setIschartHeightCR] = useState(230);
  const [showButtonCR, setIsshowButtonCR] = useState("d-inline-block");
  const [hideButtonCR, setIshideButtonCR] = useState("d-none");
  const [chartThree, setIschartThree] = useState("d-inline-block");
  const [chartThreeCopy, setIschartThreeCopy] = useState("d-none");
  const [chartHalfST, setIschartHalfST] = useState(4);
  const [chartBoxHeightST, setIschartBoxHeightST] = useState(340);
  const [chartHeightST, setIschartHeightST] = useState(230);
  const [showButtonST, setIsshowButtonST] = useState("d-inline-block");
  const [hideButtonST, setIshideButtonST] = useState("d-none");
  const [chartHalfPC, setIschartHalfPC] = useState(4);
  const [chartBoxHeightPC, setIschartBoxHeightPC] = useState(250);
  const [chartHeightPC, setIschartHeightPC] = useState(250);
  const [showButtonPC, setIsshowButtonPC] = useState("d-inline-block");
  const [hideButtonPC, setIshideButtonPC] = useState("d-none");
  const [chartFour, setIschartFour] = useState("d-inline-block");
  const [chartFontSize, setIschartFontSize] = useState("7px");
  const [dataTable, setDataTable] = useState(true);
  const [filterBox, setfilterBox] = useState(false);
  const [errorFilterBox, seterrorFilterBox] = useState({
    message: "",
    show: false,
  });
  const [showLoderVisual, setLoderVisual] = useState(false);
  const [filterForBoxString, setfilterForBoxString] = useState("");
  const [selectedGridBox, setIsselectedGridBox] = useState("");
  const [isFilteredChurn, setisFilteredChurn] = useState("");
  const [loggedInUser, setLoggedInUser] = useState("");
  const [mappingResultdata, setMappingResultdata] = useState([]);
  const [dataInsights, setDataInsights] = useState("insights");
  const [chatHistoryData, setChatHistoryData] = useState([]);
  const [chatbotresponse, setChatbotresponse] = useState([]);
  const [text, setText] = useState("");
  const [isSliderHide, setIsSliderHide] = useState(false);
  const [promptResult, setPromptResult] = useState(false);
  const [featureImportanceData, setFeatureImportanceData] = useState({
    chartSeries: [],
    labels: [],
  });
  // const [timeframeSeriesList, settimeframeSeriesList] = useState([]);

  const [nrrBreakdownData, setNrrBreakdownData] = useState({
    chartSeries: [],
    labels: [],
  });

  const [filterPopup, setfilterPopup] = useState({
    xPosition: 0,
    yPosition: 0,
  });

  const [s3listOfkey, sets3listOfkey] = useState([]);
  // let s3listOfkey = []

  const promptResultData = [
    "1. What age groups are most actively purchasing CCG products, and how does this correlate with their spending habits on single cards, sealed products, and digital assets?",
    "2. How do preferences for premium or exclusive cards (like foils, alt art, etc.) vary across different demographics such as age and country?",
    "3. What are the common factors that motivate consumers to try new CCGs or card releases?",
    "4. How do consumers feel about the frequency of CCG set releases and the pricing of single cards?",
    "5. What are the predominant methods of acquiring CCG products (online, in-store, etc.), and how does this preference vary by demographic factors?",
    "6. What are the general attitudes towards digital asset collecting and card grading among different demographic groups?",
  ];

  const chatbot = [
    {
      user: "Explain How Quantum computing works?",
      text: "Quantum computing works by utilizing the principles of quantum mechanics ",
    },
    {
      user: "Explain How Quantum computing works?",
      text: "Quantum computing works by utilizing the principles of quantum mechanics to perform calculations in a fundamentally different way than classical computers.  ",
    },
    {
      user: "Explain How Quantum computing works?",
      text: "Quantum computing works by utilizing the principles of quantum mechanics to perform calculations in a fundamentally different way than classical computers. In classical computing, information is processed and stored in binary form using bits, which can be either a 0 or a 1. Quantum computing, on the other hand, uses quantum bits or qubits, which can exist in multiple states simultaneously due to the phenomenon of superposition. This allows quantum computers to explore many possible solutions to a problem at the same time.",
    },
  ];

  const chatHistory = [
    {
      id: 1,
      question:
        "What are the key drivers influencing customer satisfaction in our latest product release as per typeform survey data?",
      date: "6 April 2024",
    },
    {
      id: 2,
      question:
        "Identify the most common customer pain points based on this typeform survey data.",
      date: "1 Feb 2024",
    },
    {
      id: 3,
      question:
        "Which customer segments are most likely to churn in the next quarter, and what factors contribute to their attrition?",
      date: "6 March 2024",
    },
    {
      id: 4,
      question:
        "Provide insights into the demographic characteristics of our most loyal customers.",
      date: "6 April 2024",
    },
    {
      id: 5,
      question:
        "What are the emerging trends in customer sentiment based on social media mentions over the past month?",
      date: "6 April 2024",
    },
    {
      id: 6,
      question:
        "Which marketing campaigns have the highest ROI based on conversion rates and customer feedback?",
      date: "6 April 2024",
    },
    {
      id: 7,
      question:
        "Recommend personalized product recommendations for different customer segments based on their purchase history.",
      date: "6 April 2024",
    },
    {
      id: 8,
      question:
        "Identify opportunities for cross-selling or upselling based on patterns in customer behavior.",
      date: "6 April 2024",
    },
    {
      id: 9,
      question:
        "What are the most frequently mentioned features in customer reviews, and how do they impact overall satisfaction?",
      date: "6 April 2024",
    },
    {
      id: 10,
      question:
        "Predict customer demand for new product features or enhancements based on historical sales data.",
      date: "6 April 2024",
    },
    {
      id: 11,
      question:
        "Segment our customer base by geographic region and provide insights into regional preferences and trends.",
      date: "6 April 2024",
    },
    {
      id: 12,
      question:
        "Analyze customer feedback from recent surveys to identify areas for improvement in our service delivery.",
      date: "6 April 2024",
    },
    {
      id: 13,
      question:
        "Compare the performance of our brand against competitors in terms of customer loyalty and brand perception.",
      date: "6 April 2024",
    },
    {
      id: 14,
      question:
        "Recommend pricing adjustments for specific product lines based on price sensitivity analysis.",
      date: "6 April 2024",
    },
    {
      id: 15,
      question:
        "Identify influencers or brand advocates within our customer base for targeted marketing campaigns.",
      date: "6 April 2024",
    },
    {
      id: 16,
      question:
        "Analyze customer journey data to optimize touchpoints and improve overall customer experience.",
      date: "6 April 2024",
    },
    {
      id: 17,
      question:
        "Predict customer lifetime value based on historical transaction data and engagement metrics.",
      date: "6 April 2024",
    },
    {
      id: 18,
      question:
        "Provide insights into the effectiveness of our customer onboarding process and suggest areas for refinement.",
      date: "6 April 2024",
    },
    {
      id: 19,
      question:
        "Segment customers based on their engagement level with our loyalty program and tailor rewards accordingly.",
      date: "6 April 2024",
    },
    {
      id: 20,
      question:
        "Forecast demand for our products in different market segments based on economic indicators and industry trends.",
      date: "6 April 2024",
    },
  ];

  const [alertsListData, setalertsListData] = useState([]);
  const [messagedetailsData, setMessagedetailsData] = useState({});
  const [openAlertsDialog, setopenAlertsDialog] = useState(false);
  // const [finalClickInfo, setFinalClickInfo] = useState(null); 

  const gridGridColumns = [
    {
      field: "name",
      headerName: "Name & Customer ID",
      flex: 1,
      minWidth: 120,
      editable: true,
      renderCell: (data) => {
        return (
          <div className="cell-template">
            <div className="float-left">{data.row.name} </div>
          </div>
        );
      },
    },
    {
      field: "sat_category",
      headerName:
        resultData.template == "Net Promoter Score"
          ? "Category"
          : "Customer Satisfaction",
      flex: 1,
      minWidth: 120,
      editable: true,
      headerAlign: "left",
      renderCell: (data) => {
        return (
          <div className="cell-template ">
            {(data.row.sat_category != undefined &&
              data.row.sat_category.toLowerCase() == "neutral") ||
              (data.row.sat_category != undefined &&
                data.row.sat_category.toLowerCase() == "passive") ? (
              <>
                <span className="medium">{data.row.sat_category}</span>
              </>
            ) : (
              ""
            )}
            {(data.row.sat_category != undefined &&
              data.row.sat_category.toLowerCase() == "positive") ||
              (data.row.sat_category != undefined &&
                data.row.sat_category.toLowerCase() == "promoter") ? (
              <>
                <span className="high">{data.row.sat_category}</span>
              </>
            ) : (
              ""
            )}
            {(data.row.sat_category != undefined &&
              data.row.sat_category.toLowerCase() == "negative") ||
              (data.row.sat_category != undefined &&
                data.row.sat_category.toLowerCase() == "detractor") ? (
              <>
                <span className="low">{data.row.sat_category}</span>
              </>
            ) : (
              ""
            )}
          </div>
        );
      },
    },
    {
      field: "purchase_frequency",
      headerName: "Purchase Frequency",
      flex: 1,
      minWidth: 120,
      editable: true,
      hideable: true,
    },
    {
      field: "average_purchase_value",
      headerName: "Average Purchase Amount",
      flex: 1,
      minWidth: 100,
      editable: true,
    },
    {
      field: "cart_drop_rate",
      headerName: "Days Since Last Purchase",
      width: 100,
      editable: true,
    },
    {
      field: "age",
      headerName: "Age, Gender",
      flex: 1,
      minWidth: 120,
      editable: true,
      renderCell: (data) => {
        return (
          <div className="cell-template">
            <span className={data.row.hightLightclass}>
              {data.row.hightLighttext}
            </span>
            {data.row.gender}, {data.row.age}
          </div>
        );
      },
    },
    {
      field: "frequency",
      headerName: "Purchase Frequency",
      width: 110,
      editable: true,
    },
    {
      field: "churn_bucket",
      headerName: "Churn Risk",
      flex: 1,
      minWidth: 120,
      editable: true,
      renderCell: (data) => {
        return (
          <div className="cell-template">
            {data.row.churn_bucket != undefined &&
              data.row.churn_bucket.toLowerCase() == "medium" && (
                <>
                  <span className="churnMedium">{data.row.churn_bucket}</span>
                </>
              )}
            {data.row.churn_bucket != undefined &&
              data.row.churn_bucket.toLowerCase() == "high" && (
                <>
                  <span className="churnHigh">{data.row.churn_bucket}</span>
                </>
              )}
            {data.row.churn_bucket != undefined &&
              data.row.churn_bucket.toLowerCase() == "low" && (
                <>
                  <span className="churnLow">{data.row.churn_bucket}</span>
                </>
              )}
          </div>
        );
      },
    },
    {
      field: "email",
      headerName: "Email",
      width: 160,
      editable: true,
    },
    {
      field: "cluster",
      headerName: "Cluster",
      width: 75,
      editable: true,
    },
    {
      field: "recency",
      headerName: "Recency",
      width: 75,
      editable: true,
    },
    {
      field: "monetary_value",
      headerName: "Monetary Value",
      width: 130,
      editable: true,
    },
    {
      field: "topics",
      headerName: "Topics",
      flex: 1,
      minWidth: 250,
      editable: true,
      renderCell: (data) => {
        return (
          <div className="cell-template" title={data.row.topics}>
            <p
              onClick={(event, value) => {
                data.row.ptag = !data.row.ptag;
              }}
              className={data.row.ptag ? "" : "ptag"}
            >
              {data.row.topics == undefined
                ? ""
                : data.row.topics.replace(/_/g, " ").replace(/'/g, "")}
            </p>
          </div>
        );
      },
    },
  ];
  const gridGridColumnswithoutHubspot = [
    {
      field: "name",
      headerName: "Name & Customer ID",
      flex: 1,
      minWidth: 120,
      editable: true,
      renderCell: (data) => {
        return (
          <div className="cell-template">
            {/* <img src={userIcon} alt="user" /> <br /> */}
            <div className="float-left">{data.row.name} </div>
          </div>
        );
      },
    },
    {
      field: "sat_category",
      headerName:
        resultData.template == "Net Promoter Score"
          ? "Category"
          : "Customer Satisfaction",
      flex: 1,
      minWidth: 120,
      editable: true,
      headerAlign: "left",
      renderCell: (data) => {
        return (
          <div className="cell-template ">
            {(data.row.sat_category != undefined &&
              data.row.sat_category.toLowerCase() == "neutral") ||
              (data.row.sat_category != undefined &&
                data.row.sat_category.toLowerCase() == "passive") ? (
              <>
                <span className="medium">{data.row.sat_category}</span>
              </>
            ) : (
              ""
            )}
            {(data.row.sat_category != undefined &&
              data.row.sat_category.toLowerCase() == "positive") ||
              (data.row.sat_category != undefined &&
                data.row.sat_category.toLowerCase() == "promoter") ? (
              <>
                <span className="high">{data.row.sat_category}</span>
              </>
            ) : (
              ""
            )}
            {(data.row.sat_category != undefined &&
              data.row.sat_category.toLowerCase() == "negative") ||
              (data.row.sat_category != undefined &&
                data.row.sat_category.toLowerCase() == "detractor") ? (
              <>
                <span className="low">{data.row.sat_category}</span>
              </>
            ) : (
              ""
            )}
          </div>
        );
      },
    },
    {
      field: "topics",
      headerName: "Topics",
      flex: 1,
      minWidth: 250,
      editable: true,
      renderCell: (data) => {
        return (
          <div className="cell-template" title={data.row.topics}>
            <p
              onClick={(event, value) => {
                data.row.ptag = !data.row.ptag;
              }}
              className={data.row.ptag ? "" : "ptag"}
            >
              {data.row.topics == undefined
                ? ""
                : data.row.topics.replace(/_/g, " ").replace(/'/g, "")}
            </p>
          </div>
        );
      },
    },
    {
      field: "age",
      headerName: "Age, Gender",
      flex: 1,
      minWidth: 120,
      editable: true,
      renderCell: (data) => {
        return (
          <div className="cell-template">
            <span className={data.row.hightLightclass}>
              {data.row.hightLighttext}
            </span>
            {data.row.gender}, {data.row.age}
          </div>
        );
      },
    },
    {
      field: "churn_bucket",
      headerName: "Churn Risk",
      flex: 1,
      minWidth: 120,
      editable: true,
      renderCell: (data) => {
        return (
          <div className="cell-template">
            {data.row.churn_bucket != undefined &&
              data.row.churn_bucket.toLowerCase() == "medium" && (
                <>
                  <span className="churnMedium">{data.row.churn_bucket}</span>
                </>
              )}
            {data.row.churn_bucket != undefined &&
              data.row.churn_bucket.toLowerCase() == "high" && (
                <>
                  <span className="churnHigh">{data.row.churn_bucket}</span>
                </>
              )}
            {data.row.churn_bucket != undefined &&
              data.row.churn_bucket.toLowerCase() == "low" && (
                <>
                  <span className="churnLow">{data.row.churn_bucket}</span>
                </>
              )}
          </div>
        );
      },
    },
    {
      field: "frequency",
      headerName: "Purchase Frequency",
      width: 110,
      editable: true,
    },
    {
      field: "email",
      headerName: "Email",
      width: 160,
      editable: true,
    },
    {
      field: "cluster",
      headerName: "Cluster",
      width: 80,
      editable: true,
    },
    {
      field: "recency",
      headerName: "Recency",
      width: 80,
      editable: true,
    },
    {
      field: "monetary_value",
      headerName: "Monetary Value",
      width: 130,
      editable: true,
    },
  ];

  const [isHidePositiveSatisfaction, setIsHidePositiveSatisfaction] =
    useState(true);
  const [companyConsidration, setCompanyConsidration] = useState({
    chartSeries: [],
    labels: [],
    overall: "",
    gridData: [],
    gridDataCols: [],
  });
  const [companyTrustMatrix, setCompanyTrustMatrix] = useState({
    chartSeries: [],
    labels: [],
    overall: "",
    categoriesList: [],
    selectedCat: "",
    originalData: null,
  });

  const [correspondenceAnalysis, setCorrespondenceAnalysis] = useState({
    chartSeries: [],
    labels: [],
    overall: "",
    xLable: "",
    xAxisMinMax: [0, 5],
    yLable: "",
    colList: [],
    gridData: [],
    gridDataCols: [],
    tootltipProp: [],
  });

  const [churnRate, setChurnRate] = useState({
    chartSeries: [],
    labels: [],
    overall: "",
    originalData: [],
    selectedChurnCat: "",
  });

  const [kpiResult, setkpiResult] = useState([]);

  const [satisfactionResult, setsatisfactionResultResult] = useState({
    overall: "",
    positive: "",
    negative: "",
    neutral: "",
  });

  const [churnSatisfactionResult, setchurnSatisfactionResultResult] = useState({
    high_Risk: "",
    low_Risk: "",
  });

  const [heatMapDataForResult, setHeatMapDataForResult] = useState({
    chartSeries: [],
    labels: []
  });

  const [timeSeriesData, settimeSeriesData] = useState({
    chartSeries: [],
    labels: [],
    originalData: [],
    selectedTimeSeriesCat: [],
    selectedTimeSeriesTime: "",
    selectedTimeSeriesTimeOption: [],
    yaxisList: [],
  });

  const [topicSentimentResult, settopicSentimentResult] = useState([]);
  const [topicSentimentResult1, settopicSentimentResult1] = useState([]);
  const [positiveSatisfactionTable, setpositiveSatisfactionTable] =
    useState("");
  const [isHubspotMerge, setisHubspotMerge] = useState(false);
  const [showLoder, setLoaderShow] = useState(false);
  const [showLoderSegmentation, setLoaderShowSegmentation] = useState(false);
  const [showLoderGlobalFilterStatus, setshowLoderGlobalFilterStatus] =
    useState(false);
  const intervalForSegmentationFilter = React.useRef();
  const [topicSentimentLabel, settopicSentimentLabel] = useState([]);
  const [selectionTool, setselectionTool] = useState([true]);
  const [positiveSatisfactionResult, setpositiveSatisfactionResult] = useState({
    filterdRow: [],
    filterdCol: [],
  });

  const [demographicsResult, setdemographicsResult] = useState({
    chartSeries: [],
    labels: [],
    chartData: null,
    categoriesList: [],
    selectedCat: "",
  });

  const [revenueARRResult, setrevenueARRResult] = useState({
    chartSeries: [],
    labels: [],
  });

  const [optionSurveyListForFilter, setoptionSurveyListForFilter] = useState(
    []
  );
  const [selectedSurveyListForFilter, setselectedSurveyListForFilter] =
    useState({ form_ids: [] });
  const [openSegmentation, setopenSegmentation] = useState(false);
  const [mappingCrossTabQuestion, setMappingCrossTabQuestion] = useState([]);
  const [mappingListCrossTab, setMappingListCrossTab] = useState({});
  const [openInsight, setopenInsight] = useState(false);
  const [openAlerts, setopenAlerts] = useState(false);
  const [openAlertsSetting, setopenAlertsSetting] = useState(false);
  const [generativeInsights, setGenerativeInsights] = useState("");

  // const dataColumns = [
  //   {
  //     id: 1,
  //     name: "Praesent.",
  //   },
  //   {
  //     id: 2,
  //     name: "Fix Styling",
  //   },
  // ];
  const [isCreateOpenSegmentation, setIsCreateOpenSegmentation] =
    useState(false);
  const [iscreateOverflow, setIscreateOverflow] = useState("hidden");
  const [selectedSegmentationOption, setselectedSegmentationOption] = useState(
    {}
  );
  // const [selectedSegmentationcolumns, setselectedSegmentationcolumns] = useState({
  //   'abcd': {
  //      items: dataColumns,
  //    },
  //    'ss': {
  //      items: [],
  //    },
  //   });

  const [segmentationCategoryMapping, setsegmentationCategoryMapping] =
    useState([{ ques: "Overall Response", tab_name: "Overall Response" }]);



  const chartOptionsTimeSeries = {
    chart: {
      zoom: { enabled: false },
      animations: {
        enabled: false, // Set this to false
      },
      height: 350,
      type: "line",
      dropShadow: {
        enabled: false,
        color: "#000",
        top: 18,
        left: 7,
        blur: 10,
        opacity: 0.2,
      },

      toolbar: {
        show: true,
        offsetX: 0,
        offsetY: 0,
        tools: {
          download: false,
          selection: false,
          zoom: false,
          zoomin: false,
          zoomout: false,
          pan: false,
          reset:
            false |
            '<img src="/static/icons/reset.png"  alt="convertml" width="20">',
          customIcons: [],
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    markers: {
      size: 1,
    },
    // colors: ["#FF1654", "#247BA0"],
    stroke: {
      curve: "smooth",
    },
    xaxis: {
      type: "datetime",
      categories: timeSeriesData.labels,
      title: {
        text: "Date",
      },
    },
    yaxis: timeSeriesData.yaxisList,
    tooltip: {
      shared: false,
      intersect: true,
      x: {
        show: false,
      },
    },
    legend: {
      horizontalAlign: "left",
    },
  };
  const chartOptionsTimeSerieschurn = {
    chart: {
      zoom: { enabled: false },
      animations: {
        enabled: false, // Set this to false
      },
      height: 350,
      type: "line",
      dropShadow: {
        enabled: false,
        color: "#000",
        top: 18,
        left: 7,
        blur: 10,
        opacity: 0.2,
      },

      toolbar: {
        show: true,
        offsetX: 0,
        offsetY: 0,
        tools: {
          download: false,
          selection: false,
          zoom: false,
          zoomin: false,
          zoomout: false,
          pan: false,
          reset:
            false |
            '<img src="/static/icons/reset.png"  alt="convertml" width="20">',
          customIcons: [],
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    markers: {
      size: 1,
    },
    // colors: ["#FF1654", "#247BA0"],
    stroke: {
      curve: "smooth",
    },
    xaxis: {
      type: "Months",
      categories: timeSeriesData.labels,
      title: {
        text: "Date",
      },
    },
    yaxis: {
      title: { text: "No of Churned" },
      categories: timeSeriesData.yaxisList,
    },
    tooltip: {
      shared: false,
      intersect: true,
      x: {
        show: false,
      },
    },
    legend: {
      horizontalAlign: "left",
    },
  };

  var revenue_ARR_by_category = {
    series: nrrBreakdownData.chartSeries,
    colors: [
      function ({ value, seriesIndex }) {
        let colorInd = nrrBreakdownData.chartSeries[seriesIndex].data.findIndex(
          (ele) => ele == value
        );
        if (colorInd == 0) {
          return "#44C662";
        } else if (colorInd == 1) {
          return "#FA3E00";
        } else {
          return "#00C3FF";
        }
      },
    ],
    chart: {
      type: "bar",
      height: 430,
      events: {
        dataPointSelection: (event, chartContext, config) => {
          let whereCondition = ` WHERE s."churn_risk" = '${revenueARRResult.labels[config.dataPointIndex]
            }'`;
          getResultFromS3(
            isHubspotMerge,
            mappingResultdata.query_list,
            whereCondition
          );
        },
      },
    },
    plotOptions: {
      bar: {
        borderRadius: 7,
        horizontal: true,
        dataLabels: {
          position: "top",
        },
      },
    },
    dataLabels: {
      enabled: true,
      offsetX: -6,
      style: {
        fontSize: "10px",
        colors: ["#fff"],
      },
    },
    stroke: {
      show: true,
      width: 1,
      colors: ["#fff"],
    },
    tooltip: {
      x: {
        show: false
      },
      y: {
        title: {
          formatter: function (val, opts) {
            return opts.w.globals.labels[opts.dataPointIndex]
          }
        }
      }
    },
    xaxis: {
      categories: nrrBreakdownData.labels,
      labels: {
        show: true,
        rotate: -23,
        rotateAlways: true,
        minHeight: undefined,
        style: {
          width: "250px",
          wordWrap: "break-word",
          fontWeight: 400,
          cssClass: "apexcharts-xaxis-label",
        },
      },
    },
  };

  const polarAreachartOptions = {
    chart: {
      foreColor: "#ffffff",
      type: "donut",

      events: {
        dataPointSelection: function (event, chartContext, config) {
          // event.stopPropagation();
          let whereCondition = ` WHERE s."${demographicsResult.selectedCat
            }" = '${config.w.config.labels[config.dataPointIndex]}'`;
          getResultFromS3(
            isHubspotMerge,
            mappingResultdata.query_list,
            whereCondition
          );
        },
      },
    },
    labels: demographicsResult.labels,
    // labels: ['Rose A', 'Rose B', 'Rose C', 'Rose D', 'Rose E'],
    fill: {
      opacity: 1,
    },
    stroke: {
      width: 2,
      colors: ["#ffffff"],
    },
    yaxis: {
      show: false,
    },

    legend: { 
      show: showButtondonutChart=='d-none'?true:false,
      position: 'bottom',
      fontSize: '14px',
      labels: {
        colors: '#000000',
        useSeriesColors: false
      },
    },
    plotOptions: {
      pie: {
        donut: {
          size: "60%",
          expandOnClick: true,
        },
      },
    },
    theme: {
      monochrome: {
        //    enabled: true,
        shadeTo: "dark",
        shadeIntensity: 0.9,
      },
    },
  };

  // '#3AD475', '', '#FC495C'
  const sentimentBasedOptionsNps = {
    chart: {
      type: "bar",
      height: 350,
      events: {
        dataPointSelection: async (event, chartContext, config) => {
          console.log(revenueARRResult.chartSeries);
          // revenueARRResult.chartSeries
          let categoryCols =
            resultData.template == "Net Promoter Score"
              ? "nps_category"
              : "sat_category";
          let whereCondition = ` WHERE s."${categoryCols}" = '${revenueARRResult.labels[config.dataPointIndex]
            }'`;
          getResultFromS3(
            isHubspotMerge,
            mappingResultdata.query_list,
            whereCondition
          );
        },
      },
    },
    colors: [
      function ({ value, seriesIndex, dataPointIndex, w }) {
        let colorInd = revenueARRResult.chartSeries[seriesIndex].data.findIndex(
          (ele) => ele == value
        );
        if (colorInd == 0) {
          return "#FA3E00";
        } else if (colorInd == 1) {
          return "#00C6E7";
        } else {
          return "#00E938";
        }
      },
    ],
    plotOptions: {
      bar: {
        borderRadius: 5,
        barHeight: "70%",
        horizontal: true,
      },
    },
    stroke: {
      width: 1,
      colors: ["#fff"],
    },
    title: {
      //text: ' '
    },
    dataLabels: {
      enabled: false,
    },

    tooltip: {
      fixed: {
        enabled: true,
        position: "topRight",
        offsetX: 0,
        offsetY: 0,
      },
      y: {
        // formatter: function (val) {
        //   return val + "K"
        // }
      },
    },
    fill: {
      opacity: 1,
    },
    legend: {
      position: "bottom",
      horizontalAlign: "center",
      // offsetX: 40,
    },

    xaxis: {
      categories: revenueARRResult.labels,
      labels: {
        show: true,
        rotate: -35,
        rotateAlways: true,
        // hideOverlappingLabels: true,
        // showDuplicates: false,
        // trim: true,
        minHeight: undefined,
        // width: 350,
        // maxWidth: 550,

        style: {
          width: "250px",
          wordWrap: "break-word",
          fontWeight: 400,
          cssClass: "apexcharts-xaxis-label",
        },
        formatter: function (value) {
          if (value >= 1000000000) {
            return (value / 1000000000).toFixed(1).replace(/\.0$/, "") + "G";
          }
          if (value >= 1000000) {
            return (value / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
          }
          if (value >= 1000) {
            return (value / 1000).toFixed(1).replace(/\.0$/, "") + "K";
          }
          return value;
        },
      },
    },
    toolbar: {
      show: true,
    },
    yaxis: {
      labels: {
        show: true,
        align: "left",
        maxWidth: 200,
        style: {
          // colors: '#f00f00',
          fontFamily: "Helvetica, Arial, sans-serif",
          fontWeight: 400,
          cssClass: "apexcharts-yaxis-label",
        },
        offsetX: 0,
        offsetY: 0,
        rotate: 0,
      },
    },
  };

  const featureImportancechart = {
    chart: {
      type: "bar",
      height: 350,
    },
    colors: [
      function ({ value, seriesIndex, dataPointIndex, w }) {
        let colorInd = featureImportanceData.chartSeries[
          seriesIndex
        ].data.findIndex((ele) => ele == value);
        return "#896bfe";
        // if (colorInd == 0) {
        //   return "#FA3E00";
        // } else if (colorInd == 1) {
        //   return "#00C6E7";
        // } else {
        //   return "#00E938";
        // }
      },
    ],
    plotOptions: {
      bar: {
        borderRadius: 5,
        barHeight: "70%",
        horizontal: false,
      },
    },
    stroke: {
      width: 1,
      colors: ["#fff"],
    },
    title: {
      //text: ' '
    },
    dataLabels: {
      enabled: false,
    },

    tooltip: {
      fixed: {
        enabled: true,
        position: "topRight",
        offsetX: 0,
        offsetY: 0,
      },
      y: {
        // formatter: function (val) {
        //   return val + "K"
        // }
      },
    },
    fill: {
      opacity: 1,
    },
    legend: {
      position: "bottom",
      horizontalAlign: "center",
      // offsetX: 40,
    },

    xaxis: {
      categories: featureImportanceData.labels,
      labels: {
        show: true,
        rotate: -70,
        rotateAlways: true,
        minHeight: undefined,
        style: {
          width: "250px",
          wordWrap: "break-word",
          fontWeight: 400,
          cssClass: "apexcharts-xaxis-label",
        },
      },
    },
    toolbar: {
      show: true,
    },
    yaxis: {
      min: 0,
      max: 0.2,
      labels: {
        show: true,
        align: "left",
        maxWidth: 200,
        formatter: function (val) {
          return val.toFixed(2);
        },
        style: {
          fontFamily: "Helvetica, Arial, sans-serif",
          fontWeight: 400,
          cssClass: "apexcharts-yaxis-label",
        },
        offsetX: 0,
        offsetY: 0,
        rotate: 0,
      },
    },
  };

  const [radarmaxValue, setradarmaxValue] = useState([]);
  const chartOptions1 = {
    chart: {
      events: {
        dataPointSelection: function (event, chartContext, config) {
          console.log("ssssss+++++++++++");
          // let newGridObj = { ...gridDataForChurn }
          // let filterdData = newGridObj.rows.filter(ele => ele.status === config.w.config.labels[config.dataPointIndex]);
          // setGridFilterDataForChurn({
          //   columns: newGridObj.columns,
          //   rows: filterdData
          // })
        },
      },
      background: "transparent",
      width: 400,
      height: "auto",
      stacked: true,
      toolbar: {
        show: false,
      },
    },
    zoom: { enabled: false },
    fill: {
      colors: ["#9B86EF", "#9B86EF", "#9B86EF"],
    },
    xaxis: {
      categories: companyTrustMatrix.labels,
      labels: {
        show: labelHide,
        rotate: -45,
        rotateAlways: true,
        hideOverlappingLabels: false,
        showDuplicates: false,
        trim: true,
        minHeight: undefined,
        width: 50,
        maxWidth: 50,
        maxHeight: 120,

        style: {
          //colors: 'red',
          // fontSize: chartFontSize,
          width: "100px",
          wordWrap: "break-word",
          fontWeight: 400,
          cssClass: "apexcharts-xaxis-label",
        },
      },
    },
    yaxis: {
      min: -1.5,
      max: radarmaxValue,
      labels: {
        formatter: function (val) {
          return val.toFixed(2);
        },
      },
    },
  };

  const chartOptions2 = {
    chart: {
      animations: {
        enabled: false, // Set this to false
      },
      height: 350,
      type: "scatter",
      selection: {
        enabled: selectionTool,
        type: "xy",
        fill: {
          color: "#24292e",
          opacity: 0.4,
        },
        stroke: {
          width: 1,
          dashArray: 3,
          color: "#24292e",
          opacity: 0.4,
        },
        xaxis: {
          min: 0,
          max: 0,
        },
        yaxis: {
          min: 0,
          max: 0,
        },
      },
      toolbar: {
        show: true,
        tools: {
          download: true,
          selection: true,
          zoom: false,
          zoomin: false,
          zoomout: false,
          pan: false,
          reset: false,
          customIcons: [
            {
              icon: "",
              index: 1,
              title: "Refresh",
              class: "cursor-pointer fa fa-refresh",
              click: function (chart, options, e) {
                setselectionTool(false);
                setTimeout(() => {
                  setselectionTool(true);
                }, 1);
              },
            },
          ],
        },
      },
      zoom: {
        enabled: true,
        type: "xy",
        autoScaleYaxis: true,
        zoomedArea: {
          fill: {
            color: "#90CAF9",
            opacity: 0.4,
          },
          stroke: {
            color: "#0D47A1",
            opacity: 0.4,
            width: 1,
          },
        }, //CAST(mean as DOUBLE) BETWEEN
      },
      autoSelected: "zoom",
      events: {
        selection: function (chartContext, { xaxis, yaxis }) {
          let aa1 = {
            xmin: xaxis.min,
            xmax: xaxis.max,
            ymin: yaxis.min,
            ymax: yaxis.max,
          };
          if (
            aa1.xmin != null &&
            aa1.xmax != null &&
            aa1.ymin != null &&
            aa1.ymax != null
          ) {
            // getResultFromS3(isHubspotMerge, mappingResultdata.query_list, `WHERE CAST(s."${baritem.topic}" as FLOAT) BETWEEN 4 AND 5 `)
            let whereCondition = ` WHERE CAST(s."mean" as FLOAT) BETWEEN ${aa1.xmin} AND ${aa1.xmax} AND CAST(s."PC2" as FLOAT) BETWEEN ${aa1.ymin} AND ${aa1.ymax}`;
            getResultFromS3(
              isHubspotMerge,
              mappingResultdata.query_list,
              whereCondition
            );
            // getSatisfactionResult(
            //   positiveSatisfactionTable,
            //   aa2,
            //   isHubspotMerge,
            //   mappingResultdata.query_list
            // );
          }
        },
      },
    },
    // states: {
    //   normal: {
    //     filter: {
    //       type: "none",
    //       value: 0,
    //     },
    //   },
    //   hover: {
    //     filter: {
    //       type: "lighten",
    //       value: 0.15,
    //     },
    //   },
    //   active: {
    //     allowMultipleDataPointsSelection: true,
    //     filter: {
    //       type: "darken",
    //       value: 0.35,
    //     },
    //   },
    // },
    // dataLabels: {
    //   enabled: false,
    //   textAnchor: "middle",
    //   offsetX: 0,
    //   offsetY: 10,
    //   background: {
    //     enabled: false,
    //   },
    // },
    grid: {
      show: false,
    },
    xaxis: {
      type: "numeric",
      min: correspondenceAnalysis.xAxisMinMax[0],
      max: correspondenceAnalysis.xAxisMinMax[1],
      tickAmount: 5,
      labels: {
        formatter: function (val) {
          return parseInt(val);
        },
      },
      title: {
        text: correspondenceAnalysis.xLable,
      },
    },

    yaxis: {
      // min: -3,
      // max: 4,
      // tickAmount: 5,
      labels: {
        formatter: function (val) {
          return parseInt(val);
        },
      },
      title: {
        text: correspondenceAnalysis.yLable//"PC2",
      },
    },

    tooltip: {
      show: false,
      // tooltipData:{"average_purchase_value":average_purchase_value,"purchase_frequency":purchase_frequency},
      custom: function ({ series, seriesIndex, dataPointIndex, w }) {
        if (isHubspotMerge) {
          if (resultData.template === "Churn Prediction") {
            return (
              '<div class="arrow_box py-2 px-2 bg-blue text-white">' +
              "<span>PC1: " +
              correspondenceAnalysis.tootltipProp[seriesIndex].data[
                dataPointIndex
              ].pc1 +
              "</span><br/>" +
              "</div>"
            );
          } else {
            return (
              '<div class="arrow_box py-2 px-2 bg-blue text-white">' +
              "<span>Average Purchase Value: " +
              correspondenceAnalysis.tootltipProp[seriesIndex].data[
                dataPointIndex
              ].average_purchase_value +
              "</span><br/>" +
              "<span>Purchase Frequency: " +
              correspondenceAnalysis.tootltipProp[seriesIndex].data[
                dataPointIndex
              ].purchase_frequency +
              "</span><br/>" +
              "<span>Mean: " +
              correspondenceAnalysis.tootltipProp[seriesIndex].data[
                dataPointIndex
              ].mean +
              "</span><br/>" +
              "</div>"
            );
          }
        } else {
          return (
            '<div class="arrow_box py-2 px-2 bg-blue text-white">' +
            "<span>Mean: " +
            correspondenceAnalysis.tootltipProp[seriesIndex].data[
              dataPointIndex
            ].mean +
            "</span><br/>" +
            "</div>"
          );
        }
      },
    },
  };

  const heatmapChartOption = {
    chart: {
      height: 450,
      type: 'heatmap',
    },
    plotOptions: {
      heatmap: {
        shadeIntensity: 0.5,
        radius: 20,
        useFillColorAsStroke: true,
        colorScale: {
          ranges: [{
            from: -30,
            to: 5,
            color: '#00A100',
            name: 'low',
          },
          {
            from: 6,
            to: 20,
            color: '#128FD9',
            name: 'medium',
          },
          {
            from: 21,
            to: 45,
            color: '#FFB200',
            name: 'high',
          }
          ]
        }
      }
    },
    dataLabels: {
      enabled: true,
      style: {
        colors: ['#fff'],
        fontSize: "15px"
      }
    },
    legend: {
      show: false,
    },

    xaxis: {
      type: 'category',
      title: { text: "Months since subscription" },
      categories: heatMapDataForResult.labels,
    },
    yaxis: {
      title: { text: "Month of subscription" },
    },

    title: {
      text: ''
    },
    grid: {
      padding: {
        right: 20
      }
    }
  }

  const optionsWordCloud = {
    enableTooltip: true,
    deterministic: true,
    fontFamily: "Manrope",
    fontSizes: [18, 32],
    padding: 4,
    rotations: 3,
    rotationAngles: [0, -90],
    scale: "sqrt",
    spiral: "archimedean",
    transitionDuration: 1000,
  };

  const callbacks = {
    getWordColor: (word) => word.color,
    onWordClick: fetchSelectedWordCloudInfo("onWordClick"),
    // onWordMouseOver: console.log,
    getWordTooltip: (word) => `${word.text} (${word.value})`,
  };

  function fetchSelectedWordCloudInfo(callback) {
    return function (word, event) {
      let newresponsId = word.responseIds.map((x) => `'${x}'`).toString();
      if (word.responseIds != undefined && word.responseIds.length != 0) {
        getResultFromS3(
          isHubspotMerge,
          mappingResultdata.query_list,
          `WHERE response_id IN( ${newresponsId} )`
        );
        // getFilteredResult(` WHERE response_id IN( ${newresponsId} )`)
      }
    };
  }

  const getSatisfactionResult = async (
    tableDetails,
    wherequery,
    hubspotMergeStatus,
    queryList
  ) => {
    let newTableDetail = tableDetails.split(".");
    setLoaderShow(true);
    let categoryCols =
      resultData.template == "Net Promoter Score"
        ? "nps_category"
        : "sat_category";

    await axios
      .post(`${process.env.REACT_APP_API_URL}/survey/getSurveyAthena`, {
        databaseName: newTableDetail[0],
        query:
          "SELECT " +
          queryList.join(",").toLowerCase() +
          " FROM " +
          newTableDetail[1],
        whereQuery: wherequery,
      })
      .then(async (response1) => {
        setLoaderShow(false);
        if (response1.data.success) {
          let newArrr1 = response1.data.data.map((ele, ind) => ({
            ...ele,
            id: ind + 1,
            ptag: false,
            sat_category:
              categoryCols == "nps_category"
                ? ele.nps_category
                : ele.sat_category,
          }));
          let csCol = gridGridColumns.filter(
            (ele) => queryList.indexOf(ele.field) != -1
          );
          let npsCols = gridGridColumnswithoutHubspot.filter(
            (ele) => queryList.indexOf(ele.field) != -1
          );

          setpositiveSatisfactionResult({
            filterdRow:
              csCol.length == 0 || npsCols.length == 0 ? [] : newArrr1,
            filterdCol: hubspotMergeStatus ? csCol : npsCols,
          });

          console.log(setpositiveSatisfactionResult)

          // console.log(Object.keys(positiveSatisfactionResult.filterdRow))
          if (wherequery == null && queryList.indexOf("PC1") != -1) {
            let getAllCluster = response1.data.data.map((ele) => ele.cluster);
            const listAllCluster = [...new Set(getAllCluster)];
            const seriesData = [];
            const seriesData1 = [];
            await listAllCluster.forEach((ele) => {
              let matchedCluster = {
                name: ele,
                color: ele == 1 ? "#FEAC00" : ele == 2 ? "#FA586C" : "#10BA5C",
                data: response1.data.data
                  .filter((ele1) => ele1.cluster == ele)
                  .map((ele2) => [
                    parseFloat(ele2.mean).toFixed(3),
                    parseFloat(ele2.pc2).toFixed(3),
                  ]),
              };
              seriesData.push(matchedCluster);
            });

            await listAllCluster.forEach((ele) => {
              let matchedCluster = {
                name: ele,
                data: response1.data.data
                  .filter((ele1) => ele1.cluster == ele)
                  .map((ele2) => ({
                    average_purchase_value: ele2.average_purchase_value,
                    purchase_frequency: ele2.purchase_frequency,
                    mean: ele2.mean,
                    pc1: parseFloat(ele2.pc1).toFixed(3),
                    pc2: parseFloat(ele2.pc2).toFixed(3),
                  })),
              };
              seriesData1.push(matchedCluster);
            });

            let clusterAnalysisXlable =
              resultData.template == "Net Promoter Score"
                ? "Likelihood in clustering analysis."
                : "Satisfaction";
            setCorrespondenceAnalysis({
              chartSeries: seriesData,
              labels: [],
              overall: "",
              xLable: clusterAnalysisXlable,
              xAxisMinMax: [0, 5],
              yLable: "",
              colList: [],
              gridData: [],
              gridDataCols: [],
              tootltipProp: seriesData1,
            });
          }
        } else {
          //  setToastObject({
          //     message: t(`${res.message}`),
          //     severity: "error",
          //     open: true,
          //   });
        }
      })
      .catch((err) => { });
  };

  const fetchSurveyResult = () => {
    fetch(`${process.env.REACT_APP_API_URL}/survey/viewResult`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        project_name: resultData.project_name, //'churn_heatmap_test', //resultData.project_name,
        user_id: resultData.user_id, //'660d1550e7c1463e26b94592', //resultData.user_id,
        template: resultData.template, //"Churn Prediction" //resultData.template,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success === true && res.data.length != 0) {
          let mappingResult = res.data[res.data.length - 1].analysis_result;
          setMappingResultdata(mappingResult);

          let mappingCrossTab1 = res.data[res.data.length - 1].cross_tab;
          let mappingCrossTab =
            typeof mappingCrossTab1 == "string"
              ? JSON.parse(mappingCrossTab1)
              : mappingCrossTab1;
          let mappingInsight =
            res.data[res.data.length - 1].generative_insights;
          if (mappingCrossTab != undefined) {
            // setMappingCrossTabQuestion(res.data.crosstab);
            if (mappingCrossTab.mapping_list != undefined) {
              if (mappingCrossTab.mapping_list.length == 0) {
                let mappingCrossTabQuestion = Object.keys(
                  Object.assign({}, ...mappingCrossTab.crosstab)
                );
                let newMappingCorssObj = mappingCrossTabQuestion.map(
                  (ele, ind) => ({
                    tableHeader: [ele, "Respondent"],
                    tableRow:
                      mappingCrossTab.crosstab[ind][ele] == undefined
                        ? []
                        : Object.entries(mappingCrossTab.crosstab[ind][ele]),
                  })
                );
                setMappingCrossTabQuestion(newMappingCorssObj);
              } else {
                setMappingCrossTabQuestion(mappingCrossTab.crosstab);
              }
              let tmpMappingObj = {};
              mappingCrossTab.mapping_list.forEach((ele) => {
                tmpMappingObj[ele.tab_name] = ele.ques;
              });
              setMappingListCrossTab(tmpMappingObj);
              let tmpsegmentationCategoryMapping = mappingCrossTab.mapping_list;
              tmpsegmentationCategoryMapping.push({
                ques: "Overall Response",
                tab_name: "Overall Response",
              });
              setsegmentationCategoryMapping(tmpsegmentationCategoryMapping);
            } else {
              let mappingCrossTabQuestion = Object.keys(
                Object.assign({}, ...mappingCrossTab)
              );
              let newMappingCorssObj = mappingCrossTabQuestion.map(
                (ele, ind) => ({
                  tableHeader: [ele, "Respondent"],
                  tableRow: Object.entries(mappingCrossTab[ind][ele]),
                })
              );
              setMappingCrossTabQuestion(newMappingCorssObj);
            }
          }

          if (mappingInsight != undefined) {
            setGenerativeInsights(mappingInsight);
          }

          if (mappingResult.kpis !== undefined) {
            let newKpi = Object.keys(mappingResult.kpis);
            let newKpi1 = newKpi
              .filter(function (value) {
                return mappingResult.kpis[value] != "null";
              })
              .map((ele) => ({
                label: ele,
                count: mappingResult.kpis[ele],
                displayName: ele.split("_").join(" "),
              }));
            setkpiResult(newKpi1);
          }

          //////for heatmap/////////

          if (
            mappingResult.heatmap != undefined &&
            mappingResult.heatmap != "null"
          ) {
            let heatmapl = [];
            mappingResult.heatmap.forEach((el, index) => {
              if (index == 0) {
                el.data.forEach((item) => {
                  heatmapl.push(item.x)
                })
              }
            });
            setHeatMapDataForResult({
              chartSeries: mappingResult.heatmap,
              labels: heatmapl
            })
          }


          //////for time series/////////
          if (
            mappingResult.timeseries != undefined &&
            mappingResult.timeseries != "null"
          ) {
            let tmpTimeSeriesData1 =
              mappingResult.timeseries == undefined
                ? []
                : Object.values(mappingResult.timeseries);
            let tmpTimeSeriesData = [];
            let newTimeKey =
              tmpTimeSeriesData1.length == 0
                ? []
                : Object.keys(tmpTimeSeriesData1[0].data);
            tmpTimeSeriesData1.forEach((ele) => {
              let newData = {};
              newTimeKey.forEach((el) => {
                let timeSt = [];
                let timeVal = [];
                ele.data[el].values.forEach((eel1, ind) => {
                  if (eel1 != null) {
                    timeVal.push(eel1);
                    timeSt.push(ele.data[el].timestamp[ind]);
                  }
                });
                newData[el] = { timestamp: timeSt, values: timeVal };
              });
              tmpTimeSeriesData.push({ data: newData, label: ele.label });
            });
            let newOption = newTimeKey.map((ele) => ({
              name: ele.charAt(0).toUpperCase() + ele.slice(1),
              value: ele,
            }));
            let tmpSeriesData = [];
            // let nullInd = []  .map(elenotNull=>elenotNull!=null)
            tmpTimeSeriesData.forEach((ele) => {
              tmpSeriesData.push({
                name: ele.label,
                data: ele.data[newTimeKey[0]].values,
              });
            });

            let newTimeSeriesDataObj = {
              chartSeries: tmpSeriesData.slice(0, 5),
              labels: tmpTimeSeriesData[0].data[newTimeKey[0]].timestamp,
              originalData: tmpTimeSeriesData,
              selectedTimeSeriesCat: tmpTimeSeriesData
                .slice(0, 5)
                .map((ele) => ele.label),
              selectedTimeSeriesTime: newTimeKey[0],
              selectedTimeSeriesTimeOption: newOption,
              yaxisList: [
                {
                  opposite: true,
                  axisTicks: {
                    show: true,
                  },
                  axisBorder: {
                    show: true,
                    color: "#FF1654",
                  },
                  labels: {
                    style: {
                      colors: "#FF1654",
                    },
                  },
                  title: {
                    text: "Responses over times",
                    style: {
                      color: "#FF1654",
                    },
                  },
                  tooltip: {
                    enabled: true,
                  },
                },
                {
                  opposite: false,
                  axisTicks: {
                    show: true,
                  },
                  axisBorder: {
                    show: true,
                    color: "#247BA0",
                  },
                  labels: {
                    style: {
                      colors: "#247BA0",
                    },
                  },
                  title: {
                    text: "Average Score",
                    style: {
                      color: "#247BA0",
                    },
                  },
                  tooltip: {
                    enabled: true,
                  },
                },
              ],
            };
            settimeSeriesData(newTimeSeriesDataObj);
          }
          //////for time series/////////

          if (
            resultData.template == "Churn Prediction" &&
            resultData.template != "null"
          ) {
            setchurnSatisfactionResultResult({
              high_Risk: mappingResult?.percentage_breakdown?.High,
              low_Risk: mappingResult?.percentage_breakdown?.Low,
            });
          }

          if (
            resultData.template == "Net Promoter Score" &&
            resultData.template != "null"
          ) {
            setsatisfactionResultResult({
              overall: 0,
              positive: mappingResult.overall_satisfaction.positive,
              negative: mappingResult.overall_satisfaction.negative,
              neutral: mappingResult.overall_satisfaction.neutral,
            });
          } else {
            if (mappingResult.overall_satisfaction !== undefined) {
              setsatisfactionResultResult({
                overall:
                  mappingResult.overall_satisfaction.overall == undefined
                    ? 0
                    : mappingResult.overall_satisfaction.overall.toFixed(2),
                positive:
                  mappingResult.overall_satisfaction.positive.toFixed(2),
                negative:
                  mappingResult.overall_satisfaction.negative.toFixed(2),
                neutral: mappingResult.overall_satisfaction.neutral.toFixed(2),
              });
            }
          }

          if (
            mappingResult.topic_sentiment != undefined &&
            mappingResult.topic_sentiment != "null"
          ) {
            let newTopic = Object.keys(mappingResult.topic_sentiment);
            let newTopic1 = newTopic.map((ele) => ({
              topic: ele.split("_").join(" "),
              positive: mappingResult.topic_sentiment[ele].positive,
              neutral: mappingResult.topic_sentiment[ele].neutral,
              negative: mappingResult.topic_sentiment[ele].negative,
            }));
            settopicSentimentResult1(newTopic1);
            settopicSentimentResult(newTopic1);
            settopicSentimentLabel(newTopic);
            setSelected(newTopic);
          }

          //////for Regression/////////
          if (
            mappingResult.regression != undefined &&
            mappingResult.regression != "null"
          ) {
            let withoutoverAllTrust = { ...mappingResult.regression };
            let listOfCategory = Object.keys(withoutoverAllTrust);
            let selectedChartData1 = { ...withoutoverAllTrust };
            let selectedChartData = selectedChartData1[listOfCategory[0]];
            const cloneselectedChartData = (({ overall, ...o }) => o)(
              selectedChartData
            );
            let newAllTrustLable = Object.keys(cloneselectedChartData);
            let newAllTrustValue = Object.values(cloneselectedChartData);
            let maxValue = newAllTrustValue.reduce(
              (a, b) => Math.max(a, b),
              -Infinity
            );
            setradarmaxValue(maxValue);
            setCompanyTrustMatrix({
              chartSeries: [
                {
                  name: selectedChartData.overall.label,
                  data: newAllTrustValue,
                },
              ],
              labels: newAllTrustLable,
              overall: selectedChartData.overall.value + "%",
              categoriesList: listOfCategory,
              selectedCat: listOfCategory[0],
              originalData: withoutoverAllTrust,
            });
          }
          //////for Regression/////////

          //////for Churn/////////

          if (
            mappingResult.word_cloud != undefined &&
            mappingResult.word_cloud != "null"
          ) {
            let withoutoverAllChurnData = { ...mappingResult.word_cloud };
            let listOfCategory = Object.keys(withoutoverAllChurnData);
            let selectedChartData1 = { ...withoutoverAllChurnData };
            let overAll = listOfCategory.filter((ele) => ele == "Overall");
            let selectedChartData =
              selectedChartData1[
              overAll == 0
                ? listOfCategory[0]
                : listOfCategory.filter((ele) => ele == "Overall")
              ];
            // let sortedLabel = selectedChartData.data.sort((a, b) => parseFloat(a) - parseFloat(b));
            let chartData = selectedChartData.labels.map((ele, ind) => ({
              text: ele,
              value: selectedChartData.data[ind],
              color:
                selectedChartData.color == undefined
                  ? "#000"
                  : selectedChartData.color[ind],
              responseIds:
                selectedChartData.response_id == undefined
                  ? []
                  : selectedChartData.response_id[ind],
            }));
            let chartData1 = chartData
              .sort((a, b) => parseFloat(b.value) - parseFloat(a.value))
              .slice(0, 20);
            // console.log(chartData1)

            setChurnRate({
              chartSeries: chartData1,
              labels: listOfCategory,
              originalData: withoutoverAllChurnData,
              selectedChurnCat:
                overAll == 0
                  ? listOfCategory[0]
                  : listOfCategory.filter((ele) => ele == "Overall"),
            });
          }

          //////for Churn/////////

          //////for Demographic/////////
          if (
            mappingResult.demographics != undefined &&
            mappingResult.demographics != "null"
          ) {
            let newDemographicDataLable = Object.keys(
              mappingResult.demographics
            );
            let newDemographicDataValue = Object.values(
              mappingResult.demographics
            );
            setdemographicsResult({
              chartSeries: newDemographicDataValue,
              labels: newDemographicDataLable,
              chartData: null,
              categoriesList: [],
              selectedCat: newDemographicDataLable[0],
            });
          }

          if (
            mappingResult.pie_chart != undefined &&
            mappingResult.pie_chart != "null"
          ) {
            let listOfCategory = Object.keys(mappingResult.pie_chart);
            let listOfCategoryData = mappingResult.pie_chart[listOfCategory[0]];
            setdemographicsResult({
              chartSeries: listOfCategoryData.series,
              labels: listOfCategoryData.labels,
              chartData: mappingResult.pie_chart,
              categoriesList: listOfCategory,
              selectedCat: listOfCategory[0],
            });
          }
          //////for Demographic/////////

          if (
            mappingResult.category_revenue != undefined &&
            mappingResult.category_revenue != "null"
          ) {
            let newRevenueArrLable = Object.keys(
              mappingResult.category_revenue
            );
            let newRevenueArrValue = Object.values(
              mappingResult.category_revenue
            );
            setrevenueARRResult({
              chartSeries: [
                {
                  name: "Revenue ARR",
                  data: newRevenueArrValue,
                },
              ],
              labels: newRevenueArrLable,
            });
          }

          if (
            mappingResult.feature_importance !== undefined &&
            mappingResult.feature_importance !== "null"
          ) {
            let feaImpArrLable = Object.keys(mappingResult.feature_importance);
            let feaImpArrValue = Object.values(
              mappingResult.feature_importance
            );
            setFeatureImportanceData({
              chartSeries: [
                {
                  name: "Feature Importance",
                  data: feaImpArrValue,
                },
              ],
              labels: feaImpArrLable,
            });
          }

          if (
            mappingResult.nrr_breakdown !== undefined &&
            mappingResult.nrr_breakdown !== "null"
          ) {
            let nrrBreakdownLable = Object.keys(mappingResult.nrr_breakdown);
            let nrrBreakdownValue = Object.values(mappingResult.nrr_breakdown);
            setNrrBreakdownData({
              chartSeries: [
                {
                  name: "Revenue ARR by Category",
                  data: nrrBreakdownValue,
                },
              ],
              labels: nrrBreakdownLable,
            });
          }

          setpositiveSatisfactionTable(
            mappingResult.positive_satisfaction_db_tbl
          );
          setisHubspotMerge(
            res.data[res.data.length - 1].hubspot_merged_status
          );
          getResultFromS3(res.data[res.data.length - 1].hubspot_merged_status,
            mappingResult.query_list, "", mappingResult.clustering);
        } else {
          // setToastObject({
          //   message: t(`${res.message}`),
          //   severity: "error",
          //   open: true,
          // });
        }
      });
  };
  const [selected, setSelected] = useState([]);
  const isAllSelected =
    topicSentimentLabel.length > 0 &&
    selected.length === topicSentimentLabel.length;

  const handleChangefilter = (event) => {
    const value = event.target.value;
    if (value[value.length - 1] === "all") {
      setSelected(
        selected.length === topicSentimentLabel.length
          ? []
          : topicSentimentLabel
      );
      return;
    }
    setSelected(value);
    console.log(setSelected);
  };

  const chartenlarge = (selectChart) => {
    if (selectChart == "companyTs") {
      setIschartHalfTs(12);
      setIschartHalf(12);
      setIschartBoxHeight(600);
      setIschartHeight(600);
      setIshideButton("d-inline-block");
      setIsshowButton("d-none");
      setIschartFontSize("12px");
    } else if (selectChart == "companyC") {
      setIschartHalf(12);
      setIschartBoxHeight(600);
      setIschartHeight(600);
      setIshideButton("d-inline-block");
      setIsshowButton("d-none");
      setIschartFontSize("12px");
    }
    else if (selectChart == "heatMap") {
      setIschartHalfheat(12);
      setIschartBoxHeightheat(600);
      setIshideButtonheat("d-inline-block");
      setIsshowButtonheat("d-none");
      setIschartFontSize("12px");
    }
    else if (selectChart == "donutChart") {
      setIschartHalfdonutChart(12);
      setIschartBoxHeightdonutChart(600);
      setIshideButtondonutChart("d-inline-block");
      setIsshowButtondonutChart("d-none");
      setIschartFontSize("12px");
    } 
    else if (selectChart == "companyTM") {
      setlabelHide(true);
      setIschartHalfTM(12);
      setIschartBoxHeightTM(600);
      setIschartHeightTM(600);
      setIshideButtonTM("d-inline-block");
      setIsshowButtonTM("d-none");
      setIschartOneCopy("d-inline-block");
      setIschartFontSize("12px");
    } else if (selectChart == "companyCR") {
      setIschartHalfCR(12);
      setIschartBoxHeightCR(600);
      setIschartHeightCR(600);
      setIshideButtonCR("d-inline-block");
      setIsshowButtonCR("d-none");
    }
    else if (selectChart == "companyPC") {
      if (
        mappingResultdata.word_cloud != undefined &&
        mappingResultdata.word_cloud != "null"
      ) {
        let withoutoverAllChurnData = { ...mappingResultdata.word_cloud };
        let listOfCategory = Object.keys(withoutoverAllChurnData);
        let selectedChartData1 = { ...withoutoverAllChurnData };
        let overAll = listOfCategory.filter((ele) => ele == "Overall");
        let selectedChartData =
          selectedChartData1[
          overAll == 0
            ? listOfCategory[0]
            : listOfCategory.filter((ele) => ele == "Overall")
          ];
        let chartData = selectedChartData.labels.map((ele, ind) => ({
          text: ele,
          value: selectedChartData.data[ind],
          color:
            selectedChartData.color == undefined
              ? "#000"
              : selectedChartData.color[ind],
          responseIds:
            selectedChartData.response_id == undefined
              ? []
              : selectedChartData.response_id[ind],
        }));
        let chartData1 = chartData
          .sort((a, b) => parseFloat(b.value) - parseFloat(a.value))
          .slice(0, 100);
        console.log(chartData1);

        setChurnRate({
          chartSeries: chartData1,
          labels: listOfCategory,
          originalData: withoutoverAllChurnData,
          selectedChurnCat:
            overAll == 0
              ? listOfCategory[0]
              : listOfCategory.filter((ele) => ele == "Overall"),
        });
      }

      setIschartHalfPC(12);
      setIschartBoxHeightPC(600);
      setIschartHeightPC(600);
      setIshideButtonPC("d-inline-block");
      setIsshowButtonPC("d-none");
      setIschartThree("d-none");
      setIschartThreeCopy("d-inline-block");
    } else if (selectChart == "sentimentByTopic") {
      setIschartHalfST(12);
      setIschartBoxHeightST(600);
      setIschartHeightST(600);
      setIshideButtonST("d-inline-block");
      setIsshowButtonST("d-none");
    }
  };

  const hideDataTable = (e) => {
    if (positiveSatisfactionResult.filterdRow.length != 0) {
      setDataTable(!dataTable);
    }
  };

  const openFilterBox = (e, dialogHeader) => {
    e.stopPropagation();
    setfilterBox(true);
    setfilterPopup({
      xPosition: e.pageX - 250,
      yPosition: e.pageY + 10,
    });
    setfilterForBoxString(dialogHeader);
  };

  const closeFilterBox = () => {
    setfilterBox(false);
  };

  const openSegmentaionDialogBox = (e, dialogHeader) => {
    e.stopPropagation();
    setopenSegmentation(true);
    setfilterPopup({
      xPosition: e.pageX - 250,
      yPosition: e.pageY + 10,
    });
    setfilterForBoxString(dialogHeader);
    // getResultFromS3()

    /*---------- excel download ---------- */
    let exlheader = segmentationCategoryMapping.map((item, ind1) => {
      if (item.ques == "Overall Response") {
        return item.tab_name.split("\n")[0];
      } else {
        return item.tab_name.split("% ")[0] + "\n" + item.ques.split("\n")[0];
      }
    });
    exlheader.unshift("");
    setexcelHeader(exlheader);

    let newdata = [];
    mappingCrossTabQuestion.forEach((item, ind2) => {
      newdata.push(
        item.tableHeader.map((itemn1, ii) => {
          if (ii != 0 && itemn1.split("\n").length != 0) {
            return itemn1.split("\n")[2];
          } else {
            return itemn1;
          }
        })
      );
      item.tableRow.forEach((item1, i) => {
        newdata.push(item1);
      });
    });
    setexcelRowData(newdata);
    /*---------- excel download end ---------- */
  };

  const closeSegmentaionDialogBox = () => {
    setopenSegmentation(false);
  };

  const getResultFromS3 = (hubspotMergeStatus, queryList, wherCondition, clustringData) => {
    console.log(mappingResultdata.query_list);
    let categoryCols =
      resultData.template == "Net Promoter Score"
        ? "nps_category"
        : "sat_category";
    axios
      .post(`${process.env.REACT_APP_API_URL}/s3/read`, {
        bucket: "convertml-test-data",
        key: `${resultData.user_id}/gold/contact_satisfaction_${resultData._id}.csv`,
        whereClouse: wherCondition,
      })
      .then(async (responsee) => {
        setLoderVisual(false);
        seterrorFilterBox({ message: "", show: false });
        closeFilterBox();
        if (responsee.data.success) {
          let response1a = JSON.parse(responsee.data.data); //CSVToJSON(responsee.data.data, wherCondition,s3listOfkey);
          let response1 = response1a.filter((ele) => ele.response_id != "");
          let newArrr1 = response1.map((ele, ind) => ({
            ...ele,
            id: ind + 1,
            ptag: false,
            sat_category:
              categoryCols == "nps_category"
                ? ele.nps_category
                : ele.sat_category,
          }));
          let csCol = gridGridColumns.filter(
            (ele) => queryList.indexOf(ele.field) != -1
          );
          let npsCols = gridGridColumnswithoutHubspot.filter(
            (ele) => queryList.indexOf(ele.field) != -1
          );

          setpositiveSatisfactionResult({
            filterdRow:
              csCol.length == 0 || npsCols.length == 0 ? [] : newArrr1,
            filterdCol: hubspotMergeStatus ? csCol : npsCols,
          });

          setrowgridData(newArrr1)
          let keysvalue = (Object.keys(newArrr1[0]))
          setresultvalueKeys(keysvalue)
          // wherequery == null && queryList.indexOf("PC1") != -1
          if (wherCondition == "") {
            if (clustringData == undefined) {
              if (resultData.template === "Churn Prediction") {
                await createObjectForCluster(response1, ["PC1", "PC2"], []);
              } else {
                await createObjectForCluster(response1, ["mean", "PC2"], []);
              }
            } else {
              await createObjectForCluster(response1, clustringData.default_pair, clustringData.factor_list);
            }
          }
        } else {
          console.log(responsee.data.error.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };



  const createObjectForCluster = async (response1, clustringDefaultAxis, clustringFactorList) => {
    let getAllCluster = response1
      .slice(1, 1000)
      .map((ele) => ele.cluster);
    const listAllCluster = [...new Set(getAllCluster)];
    const seriesData = [];
    const seriesData1 = [];
    await listAllCluster.forEach((ele) => {
      let matchedCluster = {
        name: ele,
        color:
          ele == 1 ? "#FEAC00" : ele == 2 ? "#FA586C" : ele == 0 ? "#10BA5C" : "#008FFB",
        data: response1
          .slice(1, 1000)
          .filter((ele1) => ele1.cluster == ele)
          .map((ele2) => [
            parseFloat(ele2[clustringDefaultAxis[0]]).toFixed(3),
            parseFloat(ele2[clustringDefaultAxis[1]]).toFixed(3),
          ]),
      };
      seriesData.push(matchedCluster);
      // if (resultData.template === "Churn Prediction") {
      //   let matchedCluster = {
      //     name: ele,
      //     color:
      //       ele == 1 ? "#FEAC00" : ele == 2 ? "#FA586C" : ele == 0 ? "#10BA5C" : "#008FFB",
      //     data: response1
      //       .slice(1, 1000)
      //       .filter((ele1) => ele1.cluster == ele)
      //       .map((ele2) => [
      //         parseFloat(ele2.PC1).toFixed(3),
      //         parseFloat(ele2.PC2).toFixed(3),
      //       ]),
      //   };
      //   seriesData.push(matchedCluster);
      // } else {
      //   let matchedCluster = {
      //     name: ele,
      //     color:
      //       ele == 1 ? "#FEAC00" : ele == 2 ? "#FA586C" : ele == 0 ? "#10BA5C" : "#008FFB",
      //     data: response1
      //       .slice(1, 1000)
      //       .filter((ele1) => ele1.cluster == ele)
      //       .map((ele2) => [
      //         parseFloat(ele2.mean).toFixed(3),
      //         parseFloat(ele2.PC2).toFixed(3),
      //       ]),
      //   };
      //   seriesData.push(matchedCluster);
      // }
    });

    await listAllCluster.forEach((ele) => {
      let matchedCluster = {
        name: ele,
        data: response1
          .slice(1, 1000)
          .filter((ele1) => ele1.cluster == ele)
          .map((ele2) => ({
            average_purchase_value: ele2.average_purchase_value,
            purchase_frequency: ele2.purchase_frequency,
            mean: ele2.mean,
            pc1: parseFloat(ele2[clustringDefaultAxis[0]]).toFixed(3),
            pc2: parseFloat(ele2[clustringDefaultAxis[1]]).toFixed(3),
          })),
      };
      seriesData1.push(matchedCluster);
    });

    let clusterAnalysisXlable =
      resultData.template == "Net Promoter Score"
        ? "Likelihood in clustering analysis."
        : clustringDefaultAxis[0]//"Satisfaction";
    let tmpxMin = Math.min(...response1.map(o => o[clustringDefaultAxis[0]]));
    let tmpxMax = Math.max(...response1.map(o => o[clustringDefaultAxis[0]]));
    setCorrespondenceAnalysis({
      chartSeries: seriesData,
      labels: [],
      overall: "",
      xLable: clusterAnalysisXlable,
      xAxisMinMax: [tmpxMin, tmpxMax],
      yLable: clustringDefaultAxis[1],
      colList: clustringFactorList,
      gridData: [],
      gridDataCols: [],
      tootltipProp: seriesData1,
    });
  };

  const openInsightDialogBox = (e, dialogHeader) => {
    e.stopPropagation();
    setopenInsight(true);
    getPromptData();
    setDataInsights("insights");
    setfilterPopup({
      xPosition: e.pageX - 100,
      yPosition: e.pageY - 2,
    });
    setfilterForBoxString(dialogHeader);
    if (generativeInsights == "" || generativeInsights == "null") {
      fetch(`${process.env.REACT_APP_API_URL}/survey/viewResult`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          project_name: resultData.project_name,
          user_id: resultData.user_id,
          template: resultData.template,
        }),
      })
        .then((res) => res.json())
        .then((res) => {
          // setLoderVisual(false)
          if (res.success === true && res.data.length != 0) {
            let mappingInsight =
              res.data[res.data.length - 1].generative_insights;
            if (mappingInsight != undefined) {
              setGenerativeInsights(mappingInsight);
            }
          } else {
            // setToastObject({
            //   message: t(`${res.message}`),
            //   severity: "error",
            //   open: true,
            // });
          }
        });
    }
  };

  const closeInsightDialogBox = () => {
    setopenInsight(false);
  };

  const getRecentHistory = () => {
    setDataInsights("history");
  };

  const getInsights = () => {
    setDataInsights("insights");
  };

  const openChanHistory = () => {
    setDataInsights("chat");
  };

  const openCloseSlider = () => {
    if (!isSliderHide) {
      setIsSliderHide(true);
    } else {
      setIsSliderHide(false);
    }
  };

  const openAlertsDialogBox = (e, templateType) => {
    console.log(templateType);
    e.stopPropagation();
    setopenAlerts(true);
    setDataInsights("insights");
    setfilterPopup({
      xPosition: e.pageX - 300,
      yPosition: e.pageY + 10,
    });
    if (templateType == "Market Research") {
      setalertsListData(marketResearchAlertList);
    } else if (templateType == "Customer Satisfaction") {
      setalertsListData(customerSatisfactionAlertList);
    } else if (templateType == "Brand Loyalty") {
      setalertsListData(brandLoyaltyAlertList);
    } else if (templateType == "Net Promoter Score") {
      setalertsListData(NPSAlertList);
    } else if (templateType == "Churn Prediction") {
      setalertsListData(churnPredictionAlertList);
    }
  };
  const messagedetails = (alert, index) => {
    setopenAlertsDialog(true);
    let dailogData = { ...alert };
    setMessagedetailsData(dailogData);
  };

  const closeAlertsDialog = () => {
    setopenAlertsDialog(false);
  };

  const resetSegmentation = () => {
    let resetSegmentList = {};
    let obej1 = Object.values(columns);
    let obej2 = obej1.map((ele) => ele.items).flat();
    obej2.forEach((ele) => {
      resetSegmentList[ele.qus + "_" + ele.name] = {
        items: new Array({
          id: ele.qus + ele.name,
          name: ele.name,
          qus: ele.qus,
        }),
      };
    });

    setColumns(resetSegmentList);
  };

  const checkedSelectedSegmentation = (ques, option) => {
    let isSelected = Object.values(columns)
      .map((ele) => ele.items)
      .flat()
      .filter((ele) => ele.qus == ques && ele.name == option);
    if (isSelected.length == 0) {
      return false;
    } else {
      return true;
    }
  };

  const handleSelectSegmentOption = (ischecked, questionName, Options, ind) => {
    let newSelectedSeg = { ...columns };
    let obej2 = Object.keys(columns);
    if (ischecked) {
      newSelectedSeg[questionName + "_" + Options] = {
        items: new Array({
          id: questionName + Options,
          name: Options,
          qus: questionName,
        }),
      };
    } else if (ind != null) {
      let deleteInd = obej2[ind];
      delete newSelectedSeg[deleteInd];
    } else {
      obej2.forEach((ele) => {
        newSelectedSeg[ele].items = newSelectedSeg[ele].items.filter(
          (elefilter) => elefilter.id != questionName + Options
        );
        if (newSelectedSeg[ele].items.length == 0) {
          delete newSelectedSeg[ele];
        }
      });
    }
    setColumns(newSelectedSeg);
  };

  const handleDeleteSegmentOption = (event, itemHeader, catInd) => {
    let newSelectedSeg = { ...columns };
    handleSelectSegmentOption(
      false,
      itemHeader.ques,
      itemHeader.tab_name.split("\n")[1].trim(),
      catInd
    );
    let tmpsegmentationCategoryMapping = [...segmentationCategoryMapping];
    let tmpmappingCrossTabQuestion = [...mappingCrossTabQuestion];
    tmpmappingCrossTabQuestion.forEach((ele) => {
      ele.tableHeader.splice(catInd + 1, 1);
      ele.tableRow.forEach((ele1) => {
        ele1 = ele1.splice(catInd + 1, 1);
      });
    });
    tmpsegmentationCategoryMapping.splice(catInd, 1);
    setMappingCrossTabQuestion(tmpmappingCrossTabQuestion);
    setsegmentationCategoryMapping(tmpsegmentationCategoryMapping);

    let updateSegmentation = { crosstab: [], mapping_list: [] };

    let tmpSegList = [];
    if (tmpsegmentationCategoryMapping.length == 1) {
      tmpmappingCrossTabQuestion.forEach((ele) => {
        let newObj = {};
        let newObj1 = {};
        ele.tableRow.forEach((ele1) => {
          newObj1[ele1[0]] = ele1[1];
        });
        newObj[ele.tableHeader[0]] = newObj1;
        tmpSegList.push(newObj);
      });
      updateSegmentation.crosstab = tmpSegList;
      updateSegmentation.mapping_list = [];
    } else {
      updateSegmentation.crosstab = tmpmappingCrossTabQuestion;
      updateSegmentation.mapping_list = tmpsegmentationCategoryMapping.filter(
        (ele) => ele.ques != "Overall Response"
      );
    }

    let newObj = {
      project_name: resultData.project_name,
      user_id: resultData.user_id,
      template: resultData.template,
      corssTabData: JSON.stringify(updateSegmentation),
    };

    fetch(`${process.env.REACT_APP_API_URL}/survey/deleteSegmentation`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(newObj),
    })
      .then((res) => res.json())
      .then((res) => {
        // console.log(res);
        if (res.success) {
          console.log(res.message);
        }
      })
      .catch((err) => {
        // setLoaderShowSegmentation(false);
      });
  };

  const handleubmitSegmentOptionFilter = (ev) => {
    let newObj = {
      project_name: resultData.project_name,
      project_id: resultData._id,
      user_id: resultData.user_id,
      template: resultData.template,
      mapping_json: resultData.mapping_json,
      segments: columns,
      filters: "null",
    };

    fetch(`${process.env.REACT_APP_API_URL}/survey/filterSegmentation`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(newObj),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        if (res.success) {
          setLoaderShowSegmentation(true);
        }
      })
      .catch((err) => {
        setLoaderShowSegmentation(false);
      });
  };

  const closeenlarge = (selectChart) => {
    if (selectChart == "companyTs") {
      setIschartHalfTs(4);
      setIschartHalf(4);
      setIschartBoxHeight(230);
      setIschartHeight(230);
      setIshideButton("d-none");
      setIsshowButton("d-blok");
      setIschartFontSize("6px");
    } else if (selectChart == "companyC") {
      setIschartHalf(4);
      setIschartBoxHeight(250);
      setIschartHeight(250);
      setIshideButton("d-none");
      setIsshowButton("d-blok");
      setIschartFontSize("6px");
    } else if (selectChart == "companyTM") {
      setIschartHalfTM(4);
      setIschartBoxHeightTM(250);
      setIschartHeightTM(250);
      setIshideButtonTM("d-none");
      setIsshowButtonTM("d-blok");
      setIschartOne("d-inline-block");
      setIschartOneCopy("d-none");
      setIschartFontSize("6px");
      setlabelHide(false);
    } else if (selectChart == "companyCR") {
      setIschartHalfCR(4);
      setIschartBoxHeightCR(230);
      setIschartHeightCR(230);
      setIshideButtonCR("d-none");
      setIsshowButtonCR("d-blok");
      setIschartFontSize("6px");
    }
    else if (selectChart == "heatMap") {
      setIschartHalfheat(4);
      setIschartBoxHeightheat(230);
      setIshideButtonheat("d-none");
      setIsshowButtonheat("d-blok");
      setIschartFontSize("6px");
    }
    else if (selectChart == "donutChart") {
      setIschartHalfdonutChart(4);
      setIschartBoxHeightdonutChart(230);
      setIshideButtondonutChart("d-none");
      setIsshowButtondonutChart("d-blok");
      setIschartFontSize("6px");
    }
    
    else if (selectChart == "companyPC") {
      if (
        mappingResultdata.word_cloud != undefined &&
        mappingResultdata.word_cloud != "null"
      ) {
        let withoutoverAllChurnData = { ...mappingResultdata.word_cloud };
        let listOfCategory = Object.keys(withoutoverAllChurnData);
        let selectedChartData1 = { ...withoutoverAllChurnData };
        let overAll = listOfCategory.filter((ele) => ele == "Overall");
        let selectedChartData =
          selectedChartData1[
          overAll == 0
            ? listOfCategory[0]
            : listOfCategory.filter((ele) => ele == "Overall")
          ];
        let chartData = selectedChartData.labels.map((ele, ind) => ({
          text: ele,
          value: selectedChartData.data[ind],
          color:
            selectedChartData.color == undefined
              ? "#000"
              : selectedChartData.color[ind],
          responseIds:
            selectedChartData.response_id == undefined
              ? []
              : selectedChartData.response_id[ind],
        }));
        let chartData1 = chartData
          .sort((a, b) => parseFloat(b.value) - parseFloat(a.value))
          .slice(0, 20);
        console.log(chartData1);

        setChurnRate({
          chartSeries: chartData1,
          labels: listOfCategory,
          originalData: withoutoverAllChurnData,
          selectedChurnCat:
            overAll == 0
              ? listOfCategory[0]
              : listOfCategory.filter((ele) => ele == "Overall"),
        });
      }
      setIschartHalfPC(4);
      setIschartBoxHeightPC(250);
      setIschartHeightPC(250);
      setIshideButtonPC("d-none");
      setIsshowButtonPC("d-blok");
      setIschartThree("d-inline-block");
      setIschartThreeCopy("d-none");
      setIschartFontSize("6px");
    } else if (selectChart == "sentimentByTopic") {
      setIschartHalfST(4);
      setIschartBoxHeightST(250);
      setIschartHeightST(250);
      setIshideButtonST("d-none");
      setIsshowButtonST("d-block");
    }
  };

  // const timeframeList = [
  //   { name: "Yearly", value: "Yearly" },
  //   { name: "Quarterly", value: "Quarterly" },
  //   { name: "Monthly", value: "Monthly" },
  //   { name: "Custom Period", value: "Custom Period" },
  // ];

  // const timeframeSeriesList = [
  //   { name: "Hourly", value: "hourly" },
  //   { name: "Daily", value: "day" },
  //   { name: "Monthly", value: "month" },
  //   { name: "Quarterly", value: "quarter" },
  //   { name: "Yearly", value: "year" },
  // ];

  const [filterDateRange, setfilterDateRange] = React.useState([null, null]);
  const [activeTopButton, setactiveTopButton] = useState(false);
  const [surveyNames, setsurveyNames] = React.useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setsurveyNames(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split("/") : value
    );
  };

  const selectSurveyForGlobalFilter = (e, value, isTime) => {
    let tmpselectedSurveyListForFilter = { ...selectedSurveyListForFilter };
    // let tmp1 = optionSurveyListForFilter.filter(ele => ele.value==value)

    if (tmpselectedSurveyListForFilter.form_ids.indexOf(value) == -1) {
      tmpselectedSurveyListForFilter.form_ids.push(value);
    } else {
      tmpselectedSurveyListForFilter.form_ids.splice(
        tmpselectedSurveyListForFilter.form_ids.indexOf(value),
        1
      );
    }
    setselectedSurveyListForFilter(tmpselectedSurveyListForFilter);
  };

  const filterGlobalFilterOk = (selFitler) => {
    setLoderVisual(true);
    seterrorFilterBox({ message: "", show: false });
    let getSelectedFormId = optionSurveyListForFilter.filter(
      (ele) => selectedSurveyListForFilter.form_ids.indexOf(ele.label) != -1
    );
    let tmpGlobalGloblTmp = {};
    if (selFitler == "globelFilter") {
      tmpGlobalGloblTmp = "null";
    } else {
      tmpGlobalGloblTmp = {
        form_ids: getSelectedFormId.map((ele) => ele.value),
        date_filter: filterDateRange,
      };
      setactiveTopButton(true);
    }

    fetch(`${process.env.REACT_APP_API_URL}/survey/createSurvey`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        projectName: resultData.project_name,
        form_id: getSelectedFormId,
        user_id: resultData.user_id,
        template: resultData.template,
        mapping_json: resultData.mapping_json,
        saveAsDraft: true,
        savedScreen: resultData.savedScreen,
        selectedProjectId: resultData._id,
        filters: tmpGlobalGloblTmp,
        selectedSurvey: selectedSurveyListForFilter.form_ids,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          setshowLoderGlobalFilterStatus(true);
          // console.log(filterDateRange)
          // let lastselectedDate=filterDateRange;
          //  setfilterDateRange(lastselectedDate);
        } else {
          setLoderVisual(false);
          let newMessg = JSON.parse(res.message);

          let newfilterMessg =
            newMessg.error == undefined
              ? newMessg[0].error.short_text +
              ":\r\n\r" +
              newMessg[0].error.message
              : newMessg.error.message;
          seterrorFilterBox({ message: newfilterMessg, show: true });
        }
      });
  };

  const clearfilter = (selFilter) => {
    if (selFilter == "globelFilter") {
      setfilterDateRange(null, null);
      setactiveTopButton(false);
      filterGlobalFilterOk("globelFilter");
    } else if (selFilter == "Sentiment By Topic") {
      let filtertopicSentimentResult1 = topicSentimentResult;
      settopicSentimentResult1(filtertopicSentimentResult1);
      setfilterBox(false);
    } else if (selFilter == "Demography") {
      console.log(demographicsResult);
      let tmpdemographicsResult = { ...demographicsResult };
      let item = tmpdemographicsResult.categoriesList[0];
      let catList = tmpdemographicsResult.chartData[item];
      tmpdemographicsResult.selectedCat = item;
      tmpdemographicsResult.chartSeries = catList.series;
      tmpdemographicsResult.labels = catList.labels;
      setdemographicsResult(tmpdemographicsResult);
      setfilterBox(false);
    } else if (selFilter == "timeseries") {
      let tmpTimeSeriesData1 = Object.values(mappingResultdata.timeseries);
      let tmpTimeSeriesData = [];
      let newTimeKey = Object.keys(tmpTimeSeriesData1[0].data);
      tmpTimeSeriesData1.forEach((ele) => {
        let newData = {};
        newTimeKey.forEach((el) => {
          let timeSt = [];
          let timeVal = [];
          ele.data[el].values.forEach((eel1, ind) => {
            if (eel1 != null) {
              timeVal.push(eel1);
              timeSt.push(ele.data[el].timestamp[ind]);
            }
          });
          newData[el] = { timestamp: timeSt, values: timeVal };
        });
        tmpTimeSeriesData.push({ data: newData, label: ele.label });
      });
      let newOption = newTimeKey.map((ele) => ({
        name: ele.charAt(0).toUpperCase() + ele.slice(1),
        value: ele,
      }));
      let tmpSeriesData = [];
      tmpTimeSeriesData1.forEach((ele) => {
        tmpSeriesData.push({
          name: ele.label,
          data: ele.data[newTimeKey[0]].values,
        });
      });

      let newTimeSeriesDataObj = {
        chartSeries: tmpSeriesData.slice(0, 5),
        labels: tmpTimeSeriesData[0].data[newTimeKey[0]].timestamp,
        originalData: tmpTimeSeriesData,
        selectedTimeSeriesCat: tmpTimeSeriesData
          .slice(0, 5)
          .map((ele) => ele.label),
        selectedTimeSeriesTime: newTimeKey[0],
        selectedTimeSeriesTimeOption: newOption,
        yaxisList: [
          {
            opposite: true,
            axisTicks: {
              show: true,
            },
            axisBorder: {
              show: true,
              color: "#FF1654",
            },
            labels: {
              style: {
                colors: "#FF1654",
              },
            },
            title: {
              text: "Responses over times",
              style: {
                color: "#FF1654",
              },
            },
            tooltip: {
              enabled: true,
            },
          },
          {
            opposite: false,
            axisTicks: {
              show: true,
            },
            axisBorder: {
              show: true,
              color: "#247BA0",
            },
            labels: {
              style: {
                colors: "#247BA0",
              },
            },
            title: {
              text: "Average Score",
              style: {
                color: "#247BA0",
              },
            },
            tooltip: {
              enabled: true,
            },
          },
        ],
      };
      settimeSeriesData(newTimeSeriesDataObj);
      setfilterBox(false);
    } else if (selFilter == "Churn") {
      let withoutoverAllChurnData = { ...mappingResultdata.word_cloud };
      let listOfCategory = Object.keys(withoutoverAllChurnData);
      let selectedChartData1 = { ...withoutoverAllChurnData };
      let overAll = listOfCategory.filter((ele) => ele == "Overall");
      let selectedChartData =
        selectedChartData1[
        overAll == 0
          ? listOfCategory[0]
          : listOfCategory.filter((ele) => ele == "Overall")
        ];
      // let sortedLabel = selectedChartData.data.sort((a, b) => parseFloat(a) - parseFloat(b));
      let chartData = selectedChartData.labels.map((ele, ind) => ({
        text: ele,
        value: selectedChartData.data[ind],
        color:
          selectedChartData.color == undefined
            ? "#000"
            : selectedChartData.color[ind],
        responseIds:
          selectedChartData.response_id == undefined
            ? []
            : selectedChartData.response_id[ind],
      }));
      let chartData1 = chartData
        .sort((a, b) => parseFloat(b.value) - parseFloat(a.value))
        .slice(0, 20);
      // console.log(chartData1)

      setChurnRate({
        chartSeries: chartData1,
        labels: listOfCategory,
        originalData: withoutoverAllChurnData,
        selectedChurnCat:
          overAll == 0
            ? listOfCategory[0]
            : listOfCategory.filter((ele) => ele == "Overall"),
      });
      setfilterBox(false);
    }
  };
  const selectCatTimeSeries = (e, value, isTime) => {
    let tmptimeSeriesData = { ...timeSeriesData };
    if (isTime) {
      tmptimeSeriesData.selectedTimeSeriesTime = value;
    } else {
      if (tmptimeSeriesData.selectedTimeSeriesCat.indexOf(value) == -1) {
        tmptimeSeriesData.selectedTimeSeriesCat.push(value);
      } else {
        tmptimeSeriesData.selectedTimeSeriesCat.splice(
          tmptimeSeriesData.selectedTimeSeriesCat.indexOf(value),
          1
        );
      }
    }
    settimeSeriesData(tmptimeSeriesData);
  };

  const selectAxisForCluster = (e, value, keyName) => {
    let tmpCorrespondenceAnalysis = { ...correspondenceAnalysis };
    tmpCorrespondenceAnalysis[keyName] = value;
    let newDefaultVal = [tmpCorrespondenceAnalysis.xLable, tmpCorrespondenceAnalysis.yLable]
    createObjectForCluster(positiveSatisfactionResult.filterdRow, newDefaultVal, tmpCorrespondenceAnalysis.colList);
  };

  const selecttopicSentiment = (e, value, isTime) => {
    let tmptimeSeriesData = { ...timeSeriesData };
    if (isTime) {
      tmptimeSeriesData.selectedTimeSeriesTime = value;
    } else {
      if (tmptimeSeriesData.selectedTimeSeriesCat.indexOf(value) == -1) {
        tmptimeSeriesData.selectedTimeSeriesCat.push(value);
      } else {
        tmptimeSeriesData.selectedTimeSeriesCat.splice(
          tmptimeSeriesData.selectedTimeSeriesCat.indexOf(value),
          1
        );
      }
    }
    settimeSeriesData(tmptimeSeriesData);
  };

  const filterTimeSeries = (e) => {
    setfilterBox(false);
    let tmpSeriesData = [];
    timeSeriesData.originalData.forEach((ele) => {
      if (timeSeriesData.selectedTimeSeriesCat.indexOf(ele.label) != -1) {
        tmpSeriesData.push({
          name: ele.label,
          data: ele.data[timeSeriesData.selectedTimeSeriesTime].values,
        });
      }
    });
    settimeSeriesData((prev) => ({
      ...timeSeriesData,
      chartSeries: tmpSeriesData,
      labels:
        timeSeriesData.originalData.length == 0
          ? []
          : timeSeriesData.originalData[0].data[
            timeSeriesData.selectedTimeSeriesTime
          ].timestamp,
      yaxisList:
        timeSeriesData.selectedTimeSeriesCat.indexOf("Responses over times") ==
          -1
          ? [
            {
              opposite: false,
              axisTicks: {
                show: true,
              },
              axisBorder: {
                show: true,
                color: "#247BA0",
              },
              labels: {
                style: {
                  colors: "#247BA0",
                },
              },
              title: {
                text: "Average Score",
                style: {
                  color: "#247BA0",
                },
              },
              tooltip: {
                enabled: true,
              },
            },
          ]
          : [
            {
              opposite: true,
              axisTicks: {
                show: true,
              },
              axisBorder: {
                show: true,
                color: "#FF1654",
              },
              labels: {
                style: {
                  colors: "#FF1654",
                },
              },
              title: {
                text: "Responses over times",
                style: {
                  color: "#FF1654",
                },
              },
              tooltip: {
                enabled: true,
              },
            },
            {
              opposite: false,
              axisTicks: {
                show: true,
              },
              axisBorder: {
                show: true,
                color: "#247BA0",
              },
              labels: {
                style: {
                  colors: "#247BA0",
                },
              },
              title: {
                text: "Average Score",
                style: {
                  color: "#247BA0",
                },
              },
              tooltip: {
                enabled: true,
              },
            },
          ],
    }));
  };

  const selectCatDemographyAndReg = (e, value, selectedCatFor) => {
    e.stopPropagation();
    if (selectedCatFor == "Demography") {
      let tmpdemographicsResult = { ...demographicsResult };
      tmpdemographicsResult.selectedCat = value;
      setdemographicsResult(tmpdemographicsResult);
    } else if (selectedCatFor == "Regression") {
      let tmpdemographicsResult = { ...companyTrustMatrix };
      tmpdemographicsResult.selectedCat = value;
      setCompanyTrustMatrix(tmpdemographicsResult);
    } else if (selectedCatFor == "Churn") {
      let tmpchurnRateResult = { ...churnRate };
      tmpchurnRateResult.selectedChurnCat = value;
      setChurnRate(tmpchurnRateResult);
    }
  };

  const filterDemographyAndReg = (selectedCatFor) => {
    setfilterBox(false);
    if (selectedCatFor == "Demography") {
      let listOfCategoryData =
        demographicsResult.chartData[demographicsResult.selectedCat];
      setdemographicsResult((prev) => ({
        ...demographicsResult,
        chartSeries: listOfCategoryData.series,
        labels: listOfCategoryData.labels,
      }));
    } else if (selectedCatFor == "Churn") {
      let withoutoverAllChurnData = { ...churnRate.originalData };
      let selectedChartData1 = { ...withoutoverAllChurnData };
      let selectedChartData = selectedChartData1[churnRate.selectedChurnCat];
      let chartData = selectedChartData.labels.map((ele, ind) => ({
        text: ele,
        value: selectedChartData.data[ind],
        color:
          selectedChartData.color == undefined
            ? "#000"
            : selectedChartData.color[ind],
        responseIds:
          selectedChartData.response_id == undefined
            ? []
            : selectedChartData.response_id[ind],
      }));
      let chartData1 = chartData
        .sort((a, b) => parseFloat(b.value) - parseFloat(a.value))
        .slice(0, 20);

      setChurnRate((prev) => ({
        ...churnRate,
        chartSeries: chartData1,
      }));
    } else if (selectedCatFor == "Regression") {
      let selectedChartData1 = { ...companyTrustMatrix.originalData };
      let selectedChartData =
        selectedChartData1[companyTrustMatrix.selectedCat];
      const cloneselectedChartData = (({ overall, ...o }) => o)(
        selectedChartData
      );
      let newAllTrustLable = Object.keys(cloneselectedChartData);
      let newAllTrustValue = Object.values(cloneselectedChartData);
      setCompanyTrustMatrix((prev) => ({
        ...companyTrustMatrix,
        chartSeries: [
          {
            name: selectedChartData.overall.label,
            data: newAllTrustValue,
          },
        ],
        labels: newAllTrustLable,
        overall: selectedChartData.overall.value + "%",
        selectedCat: companyTrustMatrix.selectedCat,
      }));
    } else if ("Sentiment By Topic") {
      let filtertopicSentimentResult1 = topicSentimentResult;
      let filtersetSelected = selected;
      let filterset = [];
      filtersetSelected.forEach((ele) => {
        const value = filtertopicSentimentResult1.filter((p) => p.topic == ele);
        if (value.length > 0) {
          filterset.push(value[0]);
        }
      });
      settopicSentimentResult1(filterset);
      console.log(filterset);
    }
  };

  const weekStart = new Date(
    new Date(
      new Date().setDate(new Date().getDate() - ((new Date().getDay() + 7) % 7))
    ).toDateString()
  );
  const weekEnd = new Date(
    new Date(
      new Date().setDate(
        new Date(
          new Date().setDate(
            new Date().getDate() - ((new Date().getDay() + 7) % 7)
          )
        ).getDate() + 6
      )
    ).toDateString()
  );

  const lastweekStart = new Date(
    new Date(
      new Date().setDate(
        new Date(
          new Date().setDate(
            new Date().getDate() - ((new Date().getDay() + 7) % 7)
          )
        ).getDate() - 7
      )
    ).toDateString()
  );
  const lastweekEnd = new Date(
    new Date(
      new Date().setDate(new Date().getDate() - ((new Date().getDay() + 8) % 7))
    ).toDateString()
  );

  const monthStart = new Date(new Date(new Date().setDate(1)).toDateString());
  const monthEnd = new Date(
    new Date(
      new Date(new Date().setMonth(new Date().getMonth() + 1)).setDate(0)
    ).toDateString()
  );
  const lastStart = new Date(
    new Date(
      new Date(new Date().setMonth(new Date().getMonth() - 1)).setDate(1)
    ).toDateString()
  );
  const lastEnd = new Date(new Date(new Date().setDate(0)).toDateString());
  const yearStart = new Date(
    new Date(new Date().getFullYear() - 1, 0, 1).toDateString()
  );
  const yearEnd = new Date(
    new Date(new Date().getFullYear() - 1, 11, 31).toDateString()
  );

  useEffect(() => {
    let loggedInUser = localStorage.getItem("loggedInUser");
    setLoggedInUser(loggedInUser);
    fetchSurveyResult();

    if (resultData.mapping_json != undefined) {
      let surveyList = JSON.parse(resultData.mapping_json);
      let tmpSurveyList = surveyList
        .filter((ele1) => ele1.dataType == "Typeform")
        .map((el) => el.survey);
      let hubspotConnectedListFeedback = surveyList
        .filter(
          (ele) => ele.dataType == "Hubspot" && ele.hs_object === "feedback"
        )
        .map((el) => el.survey);
      let newOptionList =
        tmpSurveyList.length == 0
          ? hubspotConnectedListFeedback
          : tmpSurveyList;
      setoptionSurveyListForFilter(newOptionList);
      let newListSelectedSurvey = {
        form_ids:
          tmpSurveyList.length == 0
            ? hubspotConnectedListFeedback.map((ele) => ele.label)
            : tmpSurveyList.map((ele) => ele.label),
      };
      let getSelectedSurveyList = {
        form_ids:
          resultData.analysis_name == undefined ||
            resultData.analysis_name.length == 0
            ? newListSelectedSurvey.form_ids
            : resultData.analysis_name,
      };
      setselectedSurveyListForFilter(getSelectedSurveyList);
    }
  }, []);

  useEffect(() => {
    setChatHistoryData(chatHistory);
    setChatbotresponse(chatbot);
    setPromptResult(promptResultData);

    if (isFilteredChurn != "") {
      getResultFromS3(
        isHubspotMerge,
        mappingResultdata.query_list,
        `WHERE s."churn_risk" = '${isFilteredChurn}'`
      );
      // getFilteredResult(" WHERE churn_risk = " + "'" + isFilteredChurn + "'");
    }
  }, [isFilteredChurn]);

  useEffect(async () => {
    if (showLoderSegmentation) {
      intervalForSegmentationFilter.current = setInterval(() => {
        checkedSegmentsFilterStatusMongo();
      }, 3000);
    } else {
      clearInterval(intervalForSegmentationFilter.current);
    }
  }, [showLoderSegmentation]);

  useEffect(async () => {
    if (showLoderGlobalFilterStatus) {
      intervalForAnalysis1.current = setInterval(() => {
        checkedAnalysisStatusMongo();
      }, 3000);
      // setTimeout(function () { clearInterval(intervalForAnalysis.current); }, 30000);
    } else {
      clearInterval(intervalForAnalysis1.current);
    }
  }, [showLoderGlobalFilterStatus]);

  const checkedSegmentsFilterStatusMongo = async () => {
    fetch(`${process.env.REACT_APP_API_URL}/survey/viewResult`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        project_name: resultData.project_name,
        user_id: resultData.user_id,
        template: resultData.template,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log("resultttoooooooooo", res);
        if (res.success === true && res.data.length != 0) {
          let mappingCrossTab1 = res.data[res.data.length - 1].cross_tab;
          let mappingCrossTab =
            typeof mappingCrossTab1 == "string"
              ? JSON.parse(mappingCrossTab1)
              : mappingCrossTab1;
          let crossTabStatus = res.data[res.data.length - 1].cross_tab_status;
          // let findInprogressIngestionerror = response1.data.data.filter((ele) => ele.message != "");

          setLoaderShowSegmentation(
            crossTabStatus == "completed" ? false : true
          );
          if (crossTabStatus == "completed") {
            setMappingCrossTabQuestion(mappingCrossTab.crosstab);
            let tmpMappingObj = {};
            mappingCrossTab.mapping_list.forEach((ele) => {
              tmpMappingObj[ele.tab_name] = ele.ques;
            });
            setMappingListCrossTab(tmpMappingObj);
            let tmpsegmentationCategoryMapping = mappingCrossTab.mapping_list;
            tmpsegmentationCategoryMapping.push({
              ques: "Overall Response",
              tab_name: "Overall Response",
            });
            setsegmentationCategoryMapping(tmpsegmentationCategoryMapping);
            setIsCreateOpenSegmentation(false);

            /*---------- excel download ---------- */
            let exlheader = tmpsegmentationCategoryMapping.map((item, ind1) => {
              // return item.tab_name.split("\n")[0]+'\n'+item.ques.split("\n")[0]
              if (item.ques == "Overall Response") {
                return item.tab_name.split("\n")[0];
              } else {
                return (
                  item.tab_name.split("% ")[0] + "\n" + item.ques.split("\n")[0]
                );
              }
            });
            exlheader.unshift("");
            setexcelHeader(exlheader);

            let newdata = [];
            mappingCrossTab.crosstab.forEach((item, ind2) => {
              newdata.push(
                item.tableHeader.map((itemn1, ii) => {
                  if (ii != 0 && itemn1.split("\n").length != 0) {
                    return itemn1.split("\n")[2];
                  } else {
                    return itemn1;
                  }
                })
              );

              item.tableRow.forEach((item1, i) => {
                newdata.push(item1);
              });
            });
            setexcelRowData(newdata);
            /*---------- excel download ---------- */

            // }
            // else {
            //   setisRunningIngestion(false)
            // let errorListitem = findInprogressIngestionerror.map((ele) => ({ ...ele, short_text: 'Filter Error', message: (ele.message.split(/[,|;]+/)), alertType: 'error-message', isCollapsable: true }));
            // seterrorListDisplay(errorListitem);
            // let tmpwithouterror = selected.filter((elem) => elem.label != "Typeform")
            // let tmpremoveprogress = checkProgressDatasetStatus.filter((elem) => elem.dataSource != "typeform");
            // setcheckProgressDatasetStatus(tmpremoveprogress)
            // setSelected(tmpwithouterror);
          }
        }
      })
      .catch((err) => {
        console.log("Error: " + err);
      });
  };

  const checkedAnalysisStatusMongo = async () => {
    await axios
      .post(
        `${process.env.REACT_APP_API_URL}/survey/getAnalysisProcessStatus`,
        {
          user_id: resultData.user_id,
          project_name: resultData.project_name,
        }
      )
      .then(async (response1) => {
        // setLoderVisual(false);
        if (response1.data.success && response1.data.data.message.body == "") {
          let findInprogressIngestion = response1.data.data.status_list.filter(
            (ele) => ele.progress == "False"
          );
          if (findInprogressIngestion.length == 0) {
            setshowLoderGlobalFilterStatus(false);
            fetchSurveyResult();
          } else {
            setshowLoderGlobalFilterStatus(true);
          }
        } else {
          setLoderVisual(false);
          setshowLoderGlobalFilterStatus(false);
          let newRes = JSON.parse(response1.data.data.message.body);
          let wariningListitem = newRes.map((ele) => ele["suggestion"]);
          let errorListitemTmp = newRes.map((ele) => ele["error"]);
          let errorListitem = errorListitemTmp.map((ele) => ({
            ...ele,
            message: ele.message.split(/[,|;]+/),
            alertType: "error-message",
            isCollapsable: true,
          }));
          seterrorFilterBox({ message: errorListitem[0].message, show: true });
        }
      })
      .catch((err) => {
        console.log("Error: " + err);
      });
  };

  /* ------------------------ drag and drop   ------------------------ */
  const [columns, setColumns] = useState({});
  const onDragEnd = (result, columns, setColumns) => {
    if (!result.destination) return;
    const { source, destination } = result;
    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);
      let aa = {
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems,
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems,
        },
      };
      if (sourceItems.length == 0) {
        delete aa[source.droppableId];
      }
      setColumns(aa);
    } else {
      const column = columns[source.droppableId];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          items: copiedItems,
        },
      });
    }
  };
  /* ------------------------ drag and drop   ------------------------ */

  const [excelHeader, setexcelHeader] = useState([]);
  const [excelRowData, setexcelRowData] = useState([]);
  const getPromptData = async () => {
    localStorage.setItem("selectedUser_Id", resultData.user_id);
    localStorage.setItem("selectedProjectId", resultData._id);
    let url = resultData.user_id + "/" + resultData._id;
    await axios
      .get(`http://54.84.56.97/questions/` + url)
      .then(async (resp) => {
        if (resp !== undefined && resp.status === 200) {
          setPromptResult(resp.data.questions);
          setIsSliderHide(false);
        }
      })
      .catch((err) => {
        console.log("Error: " + err);
      });
  };

  const adapter = useMemo(() => streamAdapter, []);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => { setAnchorEl(null); };

  /* _____________________ Custom chart genrate  _____________________ */

  const [colorPatternList, setcolorPatternList] = useState(false);
  const [resultvalueKeys, setresultvalueKeys] = useState([false]);
  const [rowgridData, setrowgridData] = useState({})
  const [customChartOpertaion, setcustomChartOpertaion] = useState([
    {name:'Sum',  calby:'x'},
    {name:'Average',  calby:'x'} 
  ])
  const [customChartDataGen, setcustomChartDataGen] = useState({
    series: [{
    data: [400, 430, 448, 470, 540, 580, 690, 1100, 1200, 1380]
  }],
    chart: {
    type: 'bar',
    height: 350
  },
  plotOptions: {
    bar: {
      borderRadius: 4,
      borderRadiusApplication: 'end',
      horizontal: true,
    }
  },
  dataLabels: {
    enabled: false
  },
  xaxis: {
    categories: ['South Korea', 'Canada', 'United Kingdom', 'Netherlands', 'Italy', 'France', 'Japan',
      'United States', 'China', 'Germany'
    ],
  }
  }) 


  const [filtercustomChartRange, setfiltercustomChartRange] = React.useState([null, null]);
  const [customaxis, setcustomaxis] = useState({
    project_name: resultData.project_name,
    xaxis: '',
    yaxis: '',
    operationName: '', 
    // colorPattern:selectedcolorspattern,
  });

  const colorspatternList = [
    {
      id: 1,
      name: 'color1',
      colorspattern: ['#546E7A',]
    },
  ]
  const showcolorpattern = () => { setcolorPatternList(!colorPatternList) }
  const [customchartData, setcustomchartData] = useState([{ data:null }]);
  
  const [customchartloader, setcustomchartloader] = useState(false);


  const selectChartaxis = (e, val, label) => {
    let tmpcustomaxis = { ...customaxis, }
    tmpcustomaxis[label] = val  
    setcustomaxis(tmpcustomaxis);
    console.log(customaxis)
  }

  const applyCustomChart = async () => {
    // let daterang = {'operation':customaxis.operationName, 'axis': customaxis.xaxis}
    let daterang = { "operation": "sum", "axis": "x" }
    let requestCustomchart = {
      project_name: resultData.project_name,
      project_id: resultData._id,
      user_id: resultData.user_id,
      template: resultData.template,
      mapping_json: resultData.mapping_json,
      graph_id: 'customaxis' + customaxis.xaxis,
      xaxis: customaxis.xaxis,
      yaxis:customaxis.yaxis,
      operationName:daterang,
        // operationName: {"operation": "sum", "axis": "x"},
      timerange:filtercustomChartRange,
      colorPattern: "null",
      chart_type: "bar",
    } 
    fetch(`${process.env.REACT_APP_API_URL}/survey/createCustomGraph`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(requestCustomchart),
    }) 
    .then((res) => res.json()) 
     .then((res) => {
        if (res.success==true) {
          setcustomchartloader(false)  
          let customdatares = JSON.parse(res.data); 
          let  customdataresn=JSON.parse(customdatares);    
          setcustomchartData(customdataresn)       
        } 
        else{ 
          console.log("fesdfdfgfd")
        }
        
      })
      .catch((err) => {
        setcustomchartloader(true) 
        setTimeout(() => {
          setcustomchartloader(false) 
        }, 5000);
        console.log("Error: " + err);
      });
  };
  /* _____________________ Custom chart genrate  _____________________ */



  return (
    <div className="section-green result-pages">
      <div className="float-right">
        {/* {
          generativeInsights != "" && generativeInsights != "null" && */}
        <Button
          size="small"
          color="primary"
          variant="outlined"
          onClick={(e) => openInsightDialogBox(e, "Dashboard")}
          className="mr-2"
        >
          <img src={InsightIcons} alt="Insight" className="mr-1" />
          Insight
        </Button>
        {mappingCrossTabQuestion.length != 0 && (
          <Button
            size="small"
            color="primary"
            variant="outlined"
            onClick={(e) => openSegmentaionDialogBox(e, "Dashboard")}
            className="mr-2"
          >
            <img src={SegmentationIcons} alt="Insight" className="mr-1" />
            Segmentation
          </Button>
        )}

        <Button
          size="small"
          color="primary"
          variant="outlined"
          onClick={(e) => hideDataTable(e)}
          className="mr-2"
        >
          <i
            className={dataTable ? "fa fa-indent mr-1" : "fa fa-dedent  mr-1"}
          ></i>
          Table
        </Button>

        <Button
          onClick={(e) => openFilterBox(e, "Dashboard")}
          color="primary"
          variant={activeTopButton ? "contained" : "outlined"}
          className="icon-btn-sm mr-2"
        >
          <i className="fa fa-filter"></i>
        </Button>
        <Button
          onClick={(e) => openAlertsDialogBox(e, resultData.template)}
          color="primary"
          variant="outlined"
          className="icon-btn-sm"
        >
          <i className="fa fa-bell"></i>
        </Button>
      </div>
      <div className="clearfix"></div>

      {/* ------------filter box ------------ */}
      <Popover
        open={filterBox}
        close={(e) => closeFilterBox()}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        style={{ left: filterPopup.xPosition, top: filterPopup.yPosition }}
      >
        <div className="filterBox">
          <a
            onClick={(e) => closeFilterBox()}
            className="fa fa-close float-right"
          ></a>{" "}
          <h4 className="m-0">
            <i className="fa fa-filter"> </i> Filter
            {filterForBoxString == "Churn" ? "Word Cloud" : filterForBoxString}
          </h4>
          {filterForBoxString == "Time Series" ? (
            <>
              <label>Category</label>
              <FormControl
                sx={{ mt: 0.5, mb: 1, minWidth: "100%", maxWidth: "100%" }}
              >
                <Select
                  labelId="survey-filter"
                  id="survey-filter"
                  multiple
                  value={timeSeriesData.selectedTimeSeriesCat}
                  onChange={handleChange}
                  renderValue={(selected) => selected.join(",")}
                >
                  {timeSeriesData.originalData.map((item, i) => (
                    <MenuItem
                      key={item.label}
                      value={item.label}
                      onClick={(e) => {
                        selectCatTimeSeries(e, item.label, false);
                      }}
                    >
                      <Checkbox
                        checked={
                          timeSeriesData.selectedTimeSeriesCat.indexOf(
                            item.label
                          ) == -1
                            ? false
                            : true
                        }
                      />
                      <ListItemText primary={item.label} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <label>Time Frame</label>
              <FormControl sx={{ mt: 0.5, mb: 2, minWidth: "100%" }}>
                <Select
                  labelId="time-frame"
                  id="time-frame"
                  value={timeSeriesData.selectedTimeSeriesTime}
                >
                  {timeSeriesData.selectedTimeSeriesTimeOption.map(
                    (item, i) => (
                      <MenuItem
                        key={item.value}
                        value={item.value}
                        onClick={(e) => {
                          selectCatTimeSeries(e, item.value, true);
                        }}
                      >
                        {/* <Checkbox /> */}
                        <ListItemText primary={item.name} />
                      </MenuItem>
                    )
                  )}
                </Select>
              </FormControl>
              <br />
              <Stack direction="row" spacing={1}>
                <Button
                  sx={{ mt: { xs: 2, sm: 0 } }}
                  color="primary"
                  variant="outlined"
                  onClick={() => {
                    filterTimeSeries();
                  }}
                >
                  Apply Filter
                </Button>
                <Button
                  color="primary"
                  variant="text"
                  onClick={() => {
                    clearfilter("timeseries");
                  }}
                  className="clearbtn"
                >
                  Clear
                </Button>
              </Stack>
            </>
          ) : filterForBoxString == "Demography" ||
            filterForBoxString == "Regression" ||
            filterForBoxString == "Churn" ||
            filterForBoxString == "Sentiment By Topic" ? (
            <>
              <label>Category</label>
              <FormControl
                sx={{ mt: 0.5, mb: 1, minWidth: "100%", maxWidth: "100%" }}
              >
                {filterForBoxString == "Demography" && (
                  <>
                    <Select
                      labelId="survey-filter"
                      id="survey-filter"
                      value={demographicsResult.selectedCat}
                    >
                      {demographicsResult.categoriesList.map((item, i) => (
                        <MenuItem
                          key={item}
                          value={item}
                          onClick={(e) => {
                            selectCatDemographyAndReg(e, item, "Demography");
                          }}
                        >
                          <ListItemText primary={item} />
                        </MenuItem>
                      ))}
                    </Select>
                  </>
                )}
                {filterForBoxString == "Churn" && (
                  <>
                    <Select
                      labelId="survey-filter"
                      id="survey-filter"
                      value={churnRate.selectedChurnCat}
                    >
                      {churnRate.labels.map((item, i) => (
                        <MenuItem
                          key={item}
                          value={item}
                          onClick={(e) => {
                            selectCatDemographyAndReg(e, item, "Churn");
                          }}
                        >
                          <ListItemText primary={item} />
                        </MenuItem>
                      ))}
                    </Select>
                  </>
                )}
                {filterForBoxString == "Regression" && (
                  <>
                    <Select
                      labelId="survey-filter"
                      id="survey-filter-reg"
                      value={companyTrustMatrix.selectedCat}
                    >
                      {companyTrustMatrix.categoriesList.map((item, i) => (
                        <MenuItem
                          key={item}
                          value={item}
                          onClick={(e) => {
                            selectCatDemographyAndReg(e, item, "Regression");
                          }}
                        >
                          <ListItemText primary={item} />
                        </MenuItem>
                      ))}
                    </Select>
                  </>
                )}
                {filterForBoxString == "Sentiment By Topic" && (
                  <>
                    {/* <FormControl sx={{ mt: 0.5, mb: 1, minWidth: "100%", maxWidth: "100%" }}>
                    <Select labelId="survey-filter" id="survey-filter" multiple value={topicSentimentLabel} onChange={handleChange} renderValue={(selected) => selected.join(',')}
                    >
                      {topicSentimentResult1.map((item, i) => (
                        <MenuItem key={item.label} value={item.label} onClick={(e) => { selecttopicSentiment(e, item.topic, false) }}>
                          <Checkbox checked={timeSeriesData.selectedTimeSeriesCat.indexOf(item.topic) == -1 ? false : true} />
                          <ListItemText primary={item.topic} />
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>   */}
                    <FormControl>
                      <Select
                        labelId="mutiple-select-label"
                        multiple
                        value={selected}
                        onChange={handleChangefilter}
                        renderValue={(selected) => selected.join(", ")}
                      >
                        <MenuItem value="all">
                          <ListItemIcon>
                            <Checkbox
                              checked={isAllSelected}
                              indeterminate={
                                selected.length > 0 &&
                                selected.length < topicSentimentLabel.length
                              }
                            />
                          </ListItemIcon>
                          <ListItemText primary="Select All" />
                        </MenuItem>
                        {topicSentimentLabel.map((option) => (
                          <MenuItem key={option} value={option}>
                            <ListItemIcon>
                              <Checkbox
                                checked={selected.indexOf(option) > -1}
                              />
                            </ListItemIcon>
                            <ListItemText primary={option} />
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </>
                )}
              </FormControl>
              <br />
              <Stack direction="row" spacing={1}>
                <Button
                  color="primary"
                  variant="outlined"
                  onClick={() => {
                    filterDemographyAndReg(filterForBoxString);
                  }}
                >
                  Apply Filter
                </Button>
                <Button
                  color="primary"
                  variant="text"
                  onClick={() => {
                    clearfilter(filterForBoxString);
                  }}
                  className="clearbtn"
                >
                  Clear
                </Button>
              </Stack>
            </>
          ) : (
            <>
              <label>Survey Filter</label>
              {/* <FormControl sx={{ mt: 1.5, mb: 2, minWidth: "100%", maxWidth: "100%" }}>
                <InputLabel id="demo-multiple-name-label">Survey Filter</InputLabel>
                  <Select labelId="survey-filter" id="survey-filter" input={<OutlinedInput label="Survey Filter" />} multiple value={selectedSurveyListForFilter.form_ids} onChange={handleChange} renderValue={(selected) => selected.join(',')}
                  >
                      {optionSurveyListForFilter.map((item, i) => (
                      <MenuItem key={item.label} value={item.value} onClick={(e) => { selectSurveyForGlobalFilter(e, item.value, false) }}>
                        <Checkbox checked={selectedSurveyListForFilter.form_ids.indexOf(item.value) != -1} />
                        <ListItemText primary={item.label} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl> */}

              <FormControl
                sx={{ mt: 1.2, mb: 1, minWidth: "100%", maxWidth: "100%" }}
              >
                {/* <InputLabel id="survey-filter1">Survey Filter</InputLabel> */}
                {/* label="Survey Filter" */}
                <Select
                  labelId="survey-filter1"
                  id="survey-filter111"
                  multiple
                  value={selectedSurveyListForFilter.form_ids}
                  renderValue={(selected) => selected.join(",")}
                >
                  {optionSurveyListForFilter.map((item, i) => (
                    <MenuItem
                      key={item.label}
                      value={item.value}
                      onClick={(e) => {
                        selectSurveyForGlobalFilter(e, item.label, false);
                      }}
                    >
                      <Checkbox
                        checked={
                          selectedSurveyListForFilter.form_ids.indexOf(
                            item.label
                          ) != -1
                        }
                      />
                      <ListItemText primary={item.label} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <br />
              <label>Time Frame</label>
              <br />
              <Box sx={{ mt: 2 }}>
                <DateRangePickerComponent
                  placeholder="Select Time range"
                  cssClass="e-outline"
                  value={filterDateRange}
                  change={(ev) => {
                    setfilterDateRange(ev.value);
                  }}
                >
                  <PresetsDirective>
                    <PresetDirective
                      label="Current Week"
                      start={weekStart}
                      end={weekEnd}
                    ></PresetDirective>
                    <PresetDirective
                      label="Last Week"
                      start={lastweekStart}
                      end={lastweekEnd}
                    ></PresetDirective>
                    <PresetDirective
                      label="Current Month"
                      start={monthStart}
                      end={monthEnd}
                    ></PresetDirective>
                    <PresetDirective
                      label="Last Month"
                      start={lastStart}
                      end={lastEnd}
                    ></PresetDirective>
                    <PresetDirective
                      label="Last Year"
                      start={yearStart}
                      end={yearEnd}
                    ></PresetDirective>
                  </PresetsDirective>
                </DateRangePickerComponent>
              </Box>
              <br />
              {/* || filterDateRange[0] == null || filterDateRange[1] == null */}
              <Stack direction="row" spacing={1}>
                <Button
                  disabled={
                    showLoderVisual ||
                    selectedSurveyListForFilter.form_ids.length == 0 || filterDateRange[0] == null
                  }
                  color="primary"
                  variant={activeTopButton ? "contained" : "outlined"}
                  onClick={() => {
                    filterGlobalFilterOk("filter");
                  }}
                >
                  Apply Filter
                </Button>
                <Button
                  disabled={
                    showLoderVisual ||
                    selectedSurveyListForFilter.form_ids.length == 0
                  }
                  color="primary"
                  variant="text"
                  onClick={(e) => clearfilter("globelFilter")}
                  className="clearbtn"
                >
                  Clear
                </Button>
              </Stack>
              {errorFilterBox.show && (
                // <span className="error-text"></span>
                <p className="error-text">{errorFilterBox.message}</p>
              )}
              {showLoderVisual && (
                <Box sx={{ textAlign: "center" }}>
                  <CircularProgress />
                </Box>
              )}
            </>
          )}
        </div>
      </Popover>

      <Popover
        open={openSegmentation}
        close={(e) => closeSegmentaionDialogBox()}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        style={{
          left: 0,
          top: filterPopup.yPosition,
          overflow: iscreateOverflow,
          width: "100%",
        }}
        segmentation
      >
        <div className="p-3">
          <Button
            sx={{ mb: 1 }}
            size="small"
            color="primary"
            variant="contained"
            onClick={(e) => setIsCreateOpenSegmentation(true)}
          >
            <i className="fa fa-plus mr-2"></i>
            Create Segmentation
            <span className="add-edit-btn"></span>
          </Button>

          {isCreateOpenSegmentation && (
            <div
              style={{
                position: "absolute",
                left: 15,
                width: "50%",
                height: "50vh",
                zIndex: 2,
              }}
            >
              <Card>
                <Button
                  size="small"
                  color="primary"
                  variant="outlined"
                  className="float-right"
                  style={{ margin: "5px" }}
                  onClick={(e) => setIsCreateOpenSegmentation(false)}
                >
                  <i className="fa fa-close mr-2"></i>
                  Close
                </Button>
                <CardHeader title={"All Survey Question"}></CardHeader>
                <CardContent>
                  <div className="segmentionlist">
                    <div>
                      {mappingCrossTabQuestion.map((item, i) => (
                        <>
                          {item.tableHeader.map((itemHeader, ii) => (
                            <>
                              {ii == 0 && (
                                <Accordion className="accodion-style">
                                  <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls={"panel" + i + "-content"}
                                    id={"panel" + i + "-header"}
                                  >
                                    {i + 1}. {itemHeader}
                                  </AccordionSummary>
                                  <AccordionDetails>
                                    {item.tableRow.map((itemBody, ind1) => (
                                      <>
                                        {itemBody.map((itemBodydata, iii) => (
                                          <>
                                            {iii == 0 && (
                                              <div className="checkbox-list">
                                                <FormControlLabel control={<Checkbox checked={checkedSelectedSegmentation(
                                                  itemHeader,
                                                  itemBodydata
                                                )}
                                                  onChange={(event) => {
                                                    handleSelectSegmentOption(
                                                      event.target.checked,
                                                      itemHeader,
                                                      itemBodydata,
                                                      null
                                                    );
                                                  }}
                                                />} label={itemBodydata} />
                                              </div>
                                            )}
                                          </>
                                        ))}
                                      </>
                                    ))}
                                  </AccordionDetails>
                                </Accordion>
                              )}
                            </>
                          ))}
                        </>
                      ))}
                    </div>
                  </div>
                  <div className="selectedSegmention">
                    <div className="heading">
                      Selected Segmentation - Drag and Drop to Combine
                      <Button
                        size="small"
                        color="primary"
                        variant="contained"
                        className="float-right"
                        // disabled={Object.keys(selectedSegmentationOption).length <= 0}
                        style={{
                          margin: "-5px -2px",
                          float: "right",
                          color: "#fff",
                          cursor: "pointer",
                        }}
                        onClick={(e) => {
                          resetSegmentation();
                        }}
                      >
                        Reset
                      </Button>
                    </div>
                    <div className="list-scroll">
                      <DragDropContext
                        onDragEnd={(result) =>
                          onDragEnd(result, columns, setColumns)
                        }
                      >
                        <section style={{ display: "flex", padding: "0px" }}>
                          <div style={{ width: "100%" }}>
                            {Object.entries(columns).map(
                              ([columnId, column], index) => {
                                return (
                                  <Droppable
                                    key={columnId}
                                    droppableId={columnId}
                                  >
                                    {(provided, snapshot) => (
                                      <div
                                        className="taskList"
                                        ref={provided.innerRef}
                                        {...provided.droppableProps}
                                      >
                                        <div className="dragchipsul">
                                          {column.items.map((item, index) => (
                                            <Draggable
                                              key={item.id}
                                              draggableId={item.id}
                                              index={index}
                                            >
                                              {(provided) => (
                                                <span
                                                  className="dragchips"
                                                  ref={provided.innerRef}
                                                  {...provided.draggableProps}
                                                  {...provided.dragHandleProps}
                                                >
                                                  <div
                                                    className="dragchipslabel"
                                                    title={item.qus}
                                                  >
                                                    {item.name}
                                                  </div>
                                                </span>
                                              )}
                                            </Draggable>
                                          ))}
                                        </div>
                                        {provided.placeholder}
                                      </div>
                                    )}
                                  </Droppable>
                                );
                              }
                            )}
                          </div>
                        </section>
                      </DragDropContext>
                    </div>
                  </div>
                </CardContent>
                <Button disabled={true}>
                  {
                    Object.values(columns)
                      .map((ele) => ele.items)
                      .flat().length
                  }{" "}
                  selected
                </Button>

                {showLoderSegmentation ? (
                  <>
                    {" "}
                    <CircularProgress
                      size="1.5rem"
                      className="float-right m-2"
                    />{" "}
                  </>
                ) : (
                  <>
                    {" "}
                    <Button
                      size="small"
                      color="primary"
                      variant="contained"
                      className="float-right"
                      // disabled={Object.keys(selectedSegmentationOption).length <= 0}
                      style={{ margin: "5px" }}
                      onClick={(e) => handleubmitSegmentOptionFilter()}
                    >
                      Save
                    </Button>{" "}
                  </>
                )}
              </Card>
            </div>
          )}

          <Button
            size="small"
            color="primary"
            variant="outlined"
            className="float-right"
            onClick={(e) => closeSegmentaionDialogBox()}
          >
            {" "}
            <i className="fa fa-close mr-2"></i> Close{" "}
          </Button>
          {/*---------- Don't delete */}
          <Button
            sx={{ mb: 1 }}
            size="small"
            className="float-right mr-2"
            color="primary"
            variant="outlined"
          >
            <CSVLink
              filename={"survey-question-reports.csv"}
              target="_blank"
              data={excelRowData}
              headers={excelHeader}
            >
              <i className="fa fa-file-excel-o"></i> &nbsp; Download
              Segmentation
            </CSVLink>
          </Button>
          <div style={{ width: "100%", height: "70vh", overflow: "auto" }}>
            {mappingCrossTabQuestion.map((item, ind2) => (
              <>
                <table
                  align="left"
                  width={"100%"}
                  className="segmentation-table"
                  cellspacing="0"
                  cellpadding="0"
                >
                  <tr className="table-head">
                    {ind2 == 0 &&
                      segmentationCategoryMapping.map(
                        (tableTopHeader, catInd) => (
                          <>
                            {catInd == 0 && <th></th>}
                            <th
                              style={{
                                textAlign: "center",
                                background: "#0355F9",
                                borderRight: " #fff solid 2px",
                                color: "#ffffff",
                                position: "relative",
                              }}
                            >
                              {tableTopHeader.tab_name != "Overall Response" ? (
                                <span
                                  onClick={(event) => {
                                    handleDeleteSegmentOption(
                                      event,
                                      tableTopHeader,
                                      catInd
                                    );
                                  }}
                                  className=" small-close-td small-close-btn"
                                ></span>
                              ) : (
                                ""
                              )}
                              <div className="customtooltip">
                                {tableTopHeader.tab_name.split("% ")[0]}
                                <span class="tooltiptext">
                                  {tableTopHeader.ques}
                                </span>
                              </div>{" "}
                              <div></div>
                            </th>
                          </>
                        )
                      )}
                  </tr>

                  <tbody>
                    <tr className="table-head">
                      {item.tableHeader.map((itemHeader, i) => (
                        <th
                          width={i != 0 ? 250 : "auto"}
                          style={{ "text-align": i == 0 ? `left` : "center" }}
                        >
                          {" "}
                          {i == 0 ? `${ind2 + 1}.` : ""}{" "}
                          <div className="customtooltip">
                            {" "}
                            <b>
                              {i != 0 && itemHeader != "Respondent"
                                ? itemHeader.split("\n")[2]
                                : itemHeader}
                            </b>
                            {i != 0 && itemHeader != "Respondent" ? (
                              mappingListCrossTab[itemHeader] != undefined &&
                                mappingListCrossTab[itemHeader].length <= 0 ? (
                                <div class="tooltiptext">
                                  {i != 0 && itemHeader != "Respondent"
                                    ? mappingListCrossTab[itemHeader]
                                    : ""}
                                </div>
                              ) : (
                                ""
                              )
                            ) : (
                              ""
                            )}
                          </div>
                        </th>
                      ))}
                    </tr>
                    {item.tableRow.map((itemBody, iii) => (
                      <tr>
                        {itemBody.map((itemBodydata, ii) => (
                          <td
                            width={ii != 0 ? 250 : 550}
                            style={{
                              "text-align": ii == 0 ? `left` : "center",
                            }}
                          >
                            <div
                              style={{
                                width: ii == 0 ? 450 : "100%",
                                "text-align": ii == 0 ? `left` : "center",
                              }}
                            >
                              <span className={itemBodydata == '100.0%' ? 'text-highlighter' : ''}> {itemBodydata} </span>
                            </div>
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </>
            ))}
          </div>
        </div>
      </Popover>
      <Popover
        open={openInsight}
        close={(e) => closeInsightDialogBox()}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        style={{
          left: filterPopup.xPosition,
          top: filterPopup.yPosition,
          overflow: "scroll",
        }}
      >
        {openInsight ? (
          <div className="custom-popover">
            <Grid container alignItems="center" justifyContent="space-between">
              <div>
                <span
                  onClick={(e) => getRecentHistory()}
                  className={
                    dataInsights === "history"
                      ? "cursorpointer selectedcopilot"
                      : "cursorpointer"
                  }
                >
                  <img src={Recentsicons} alt="img" title="Recent History" />
                </span>
                <span
                  onClick={(e) => getInsights()}
                  className={
                    dataInsights === "insights"
                      ? "cursorpointer selectedcopilot ml-2 mr-2"
                      : "cursorpointer ml-2 mr-2"
                  }
                >
                  <img src={Insightsicons} alt="img" title="Insights" />
                </span>
                <span
                  onClick={(e) => openChanHistory()}
                  className={
                    dataInsights === "chat"
                      ? "cursorpointer selectedcopilot"
                      : "cursorpointer "
                  }
                >
                  <img src={ChatIcons} alt="img" title="Chat bots" />
                </span>

                {/* <span
                  onClick={(e) => onClickPrompt()}
                >
                  <img src={ChatIcons} alt="img" />
                </span> */}
              </div>
              <div
                style={{ cursor: "pointer" }}
                onClick={(e) => closeInsightDialogBox()}
              >
                <CloseIcon />
              </div>
            </Grid>
            <div className="text-center">
              <div className="copilot-heading">
                {" "}
                <img
                  src="/json-media/img/convertmlLogoicon.png"
                  width={40}
                  className="mr-2"
                />
                Copilot
              </div>
            </div>

            <div className="cleafix"></div>
            {/* <h4 className="text-grey">Some Key takeaways fron this dashboard insights</h4> */}
            {/* <div style={{ width: "100%", height: "70vh", overflow: 'auto' }} ></div> */}

            {dataInsights === "insights" ? (
              // <div className="filterBox" style={{ width: "500px", height: "63vh", overflow: 'auto' }} dangerouslySetInnerHTML={{
              //   __html: (generativeInsights == "" || generativeInsights == "null" ? "Data insights is being generated, Try again in sometime to view the results" : generativeInsights)
              // }} />

              <div className="App chartBots">
                <h1>Hello, {loggedInUser}</h1>
                <h2>Take a look at the top insights?</h2>
                <br />
                <div
                  className="filterBox"
                  style={{ width: "100%", height: "57vh", overflow: "auto" }}
                  dangerouslySetInnerHTML={{
                    __html:
                      generativeInsights == "" || generativeInsights == "null"
                        ? "Data insights is being generated, Try again in sometime to view the results"
                        : generativeInsights,
                  }}
                />

                {/* <div className="questionlist">
                    <div className="q-list">
                      <div className="ques">
                        {" "}
                        <img src={cmllogo} alt="Insight" />{" "}
                        <span>
                          How improve satisfaction through varied user experiences?
                        </span>{" "}
                      </div>
                      <div className="aws">
                        <ul>
                          <li>
                            Customers in Cluster 0 are generally satisfied with
                            the service and product quality but find the ease of
                            use to be lacking. This indicates a user experience
                            issue that could be hindering higher satisfaction
                            levels.
                          </li>
                          <li>
                            Cluster 1 represents a group of customers who are
                            dissatisfied across the board, except for the ease
                            of use. This suggests that while the product may be
                            user-friendly, other aspects are not meeting
                            customer expectations.
                          </li>
                          <li>
                            Customers in Cluster 2 show a good balance of
                            satisfaction, with particularly high marks for ease
                            of use. This group seems to value user experience
                            highly and is fairly satisfied with the service and
                            product quality.
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="q-list">
                      <div className="ques">
                        <img src={cmllogo} alt="Insight" />{" "}
                        <span>
                          How improve satisfaction through varied user experiences?
                        </span>{" "}
                      </div>
                      <div className="aws">
                        <ul>
                          <li>
                            Customers in Cluster 0 are generally satisfied with
                            the service and product quality but find the ease of
                            use to be lacking. This indicates a user experience
                            issue that could be hindering higher satisfaction
                            levels.
                          </li>
                          <li>
                            Cluster 1 represents a group of customers who are
                            dissatisfied across the board, except for the ease
                            of use. This suggests that while the product may be
                            user-friendly, other aspects are not meeting
                            customer expectations.
                          </li>
                          <li>
                            Customers in Cluster 2 show a good balance of
                            satisfaction, with particularly high marks for ease
                            of use. This group seems to value user experience
                            highly and is fairly satisfied with the service and
                            product quality.
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="q-list">
                      <div className="ques">
                        <img src={cmllogo} alt="Insight" />{" "}
                        <span>
                          How improve satisfaction through varied user experiences?
                        </span>{" "}
                      </div>
                      <div className="aws">
                        <ul>
                          <li>
                            Customers in Cluster 0 are generally satisfied with
                            the service and product quality but find the ease of
                            use to be lacking. This indicates a user experience
                            issue that could be hindering higher satisfaction
                            levels.
                          </li>
                          <li>
                            Cluster 1 represents a group of customers who are
                            dissatisfied across the board, except for the ease
                            of use. This suggests that while the product may be
                            user-friendly, other aspects are not meeting
                            customer expectations.
                          </li>
                          <li>
                            Customers in Cluster 2 show a good balance of
                            satisfaction, with particularly high marks for ease
                            of use. This group seems to value user experience
                            highly and is fairly satisfied with the service and
                            product quality.
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>  */}
              </div>
            ) : dataInsights === "history" ? (
              <>
                <div>
                  <div>
                    <Button
                      sx={{ mb: 1, mr: 1 }}
                      size="small"
                      color="primary"
                      variant="contained"
                      onClick={(e) => openChanHistory()}
                    >
                      <i className="fa fa-plus mr-1" /> New chat
                    </Button>
                  </div>
                  Recents
                  <div className="chartHistroy">
                    {chatHistoryData.map((itemBodydata, iii) => (
                      <>
                        {
                          <>
                            <div className="qus-box">
                              <div className="qus">{itemBodydata.question}</div>
                              <span className="date">{itemBodydata.date}</span>
                              <span className="action">
                                <a className="fa fa-pencil mr-2"></a>
                                <a className="fa fa-trash"></a>
                              </span>
                              <div className="clearfix"></div>
                            </div>
                            <div className="clearfix"></div>
                          </>
                        }
                      </>
                    ))}
                  </div>
                </div>
              </>
            ) : dataInsights === "chat" ? (
              // <div className="filterBox" style={{ width: "466px", height: "70vh", overflow: 'auto' }} dangerouslySetInnerHTML={{
              //   __html: ("This is Live chat")
              // }} />
              <>
                <div className="chartBots">
                  <h1>Hello, {loggedInUser}</h1>
                  <h2>How can I help you today?</h2>
                  <br />
                  {/* <div className="chat-container">
                      {chatbotresponse.map((message, i) => (
                        <>
                          <div className="cml-chart" key={i}>
                            <img src={cmllogo} alt="Insight" />{" "}
                            <strong>{message.user} </strong>
                          </div>
                          <br />
                          <div className="client-chart">
                            <img src={userPic} alt="Insight" />{" "}
                            <div dangerouslySetInnerHTML={{ __html: message.text }} />
                          </div>
                        </>
                      ))}
                    </div>
                    <div className="pre-question">
                      <span
                        onClick={(e) => openCloseSlider()}
                        className="baricons"
                      ></span>
                      {isSliderHide === false ? (
                        <Grid container spacing={3}>
                          {promptResult.map((prompt) => (
                            <Grid
                              item
                              xs={4}
                              onClick={(e) => onClickPrompt(prompt)}
                            >
                              <div className="ques">
                                <a>
                                  {prompt}{" "}
                                </a>
                              </div>{" "}
                            </Grid>
                          ))}
                        </Grid>
                      ) : (
                        ""
                      )}
                      <div className="cleafix"></div>
                    </div> */}
                  {/* <input
                      autoComplete="off"
                      type="text"
                      id="prompt"
                      value={text}
                      onChange={(e) => onChangeText(e)}
                    />
                    <button onClick={(e) => onClickQues(e)} type="button">
                      {" "}
                      <i class="fa fa-paper-plane" aria-hidden="true"></i>
                    </button> */}

                  <AiChat
                    adapter={adapter}
                    personaOptions={personas}
                    layoutOptions={{
                      height: "55vh",
                      width: 600,
                      bottom: 0,
                    }}
                  />
                </div>
              </>
            ) : (
              ""
            )}
          </div>
        ) : null}
      </Popover>

      {/* <Popover
        open={openInsight}
        close={(e) => closeInsightDialogBox()}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        style={{ "left": filterPopup.xPosition, "top": filterPopup.yPosition, overflow: "scroll" }}>
        <div className="p-3">
          <h2 className="float-left m-0"><img src="/json-media/img/convertmlLogoicon.png" alt='convertml' width={40} className="float-left mr-2" />Dashboard Insight</h2>
          <Button
            size="small"
            color="primary"
            variant="outlined"
            className="float-right"
            onClick={(e) => closeInsightDialogBox()}
          >
            <i className="fa fa-close mr-2"></i>
            Close
          </Button><div className="cleafix"></div><br />
          <h4 className="text-grey">Some Key takeaways from this dashboard insights</h4>
        
          <div className="filterBox" style={{ width: "100%", height: "70vh", overflow: 'auto' }} dangerouslySetInnerHTML={{
            __html: (generativeInsights == "" || generativeInsights == "null" ? "Data insights is being generated, Try again in sometime to view the results" : generativeInsights)
          }} />
        </div>
      </Popover> */}

      {/* -------------------------------- Alerts / Triggers  -------------------------------- */}
      {openAlerts ? (
        <>
          <div className="background-overlay-blur"></div>
          <div className="alertsList">
            <span
              className="float-right cursorpointer"
              onClick={(e) => setopenAlerts(false)}
            >
              <CloseIcon />
            </span>
            <span
              className="float-right cursorpointer"
              onClick={(e) => setopenAlertsSetting(true)}
            >
              <i className="fa fa-gear" />
            </span>
            <h2>Alerts</h2>
            <div className="list">
              {alertsListData.map((alert, i) => (
                <div
                  className={alert.messageStatus + " alert-messge"}
                  key={i}
                  onClick={(e) => messagedetails(alert, i)}
                >
                  <img
                    src={"/json-media/icons/alerts/" + alert.icons + ".svg"}
                    alt={alert.icons}
                  />
                  {/* <img src={alert.icons} alt={alert.icons} /> */}
                  <p title={alert.message}>
                    {" "}
                    <h4 className="m-0">{alert.title}</h4> {alert.message}
                  </p>
                  <span className="messgetime">{alert.messgetime}</span>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : null}

      {openAlertsSetting ? (
        <div className="alert-Setting">
          <div className="formbox">
            <h3 className="m-0">
              <svg
                width="30"
                height="30"
                className="mr-1 ml-1 float-left"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.10547 9.04659L7.86664 11.3948L11.389 6.69836"
                  stroke="#49C392"
                  stroke-width="2"
                  stroke-linecap="round"
                />
                <circle
                  cx="8.45366"
                  cy="9.04656"
                  r="7.2188"
                  stroke="#49C392"
                  stroke-width="2"
                />
              </svg>{" "}
              Trigger
            </h3>
            <hr />
            <Box sx={{ display: "inline-flex", lineHeight: "55px" }}>
              <div className="w150">Notify based on </div>
              <div>
                <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                  <InputLabel id="demo-select-small-label">Topics</InputLabel>
                  <Select
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    label="Topics"
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={10}>Topics</MenuItem>
                  </Select>
                </FormControl>
                <button className="splite-btn-label">
                  <label className="selected-label">All</label>
                  <label>Specific</label>{" "}
                </button>
              </div>
              <div>measured by feedback count </div>
            </Box>
            <Box sx={{ display: "inline-flex", lineHeight: "55px" }}>
              <div className="w150">Trigger when </div>
              <div>
                <FormControl sx={{ m: 1, width: 50 }} size="small">
                  <TextField id="outlined-size-small" value="15" size="small" />
                </FormControl>
              </div>
              <div>
                <FormControl sx={{ m: 1, minWidth: 100 }} size="small">
                  <InputLabel id="demo-select-small-label">Percent</InputLabel>
                  <Select
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={10}>Percent</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div>
                <FormControl sx={{ m: 1, minWidth: 70 }} size="small">
                  <InputLabel id="demo-select-small-label">Up</InputLabel>
                  <Select
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                  >
                    <MenuItem value="Up">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={10}>Up</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div>
                {" "}
                exceeding by
                <FormControl sx={{ m: 1, width: 50 }} size="small">
                  <TextField id="outlined-size-small" value="20" size="small" />
                </FormControl>
              </div>
            </Box>
            <Box sx={{ display: "inline-flex", lineHeight: "55px" }}>
              <div className="d-flex w150">
                <span className="float-left mr-1" style={{ marginTop: "5px" }}>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      cx="9.00773"
                      cy="8.45524"
                      r="7.35979"
                      stroke="#646464"
                      stroke-width="2"
                    />
                    <path
                      d="M8.63379 5.0883V8.82935L10.8784 11.074"
                      stroke="#646464"
                      stroke-width="2"
                      stroke-linecap="round"
                    />
                  </svg>
                </span>{" "}
                Over{" "}
              </div>
              <div>
                <FormControl sx={{ m: 1, minWidth: 150 }} size="small">
                  <InputLabel id="demo-multiple-name-label">
                    Day to Day
                  </InputLabel>
                  <Select
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    label="Day to Day"
                  >
                    <MenuItem value={10}>Day to Day</MenuItem>
                  </Select>
                </FormControl>
              </div>
            </Box>
          </div>
          <div className="formbox mt-2">
            <h3 className="m-0">
              <img
                src={alertactionIcons}
                width={25}
                alt="Negative"
                className="float-left mr-2"
              />
              Action{" "}
              <span className="heading-small">
                ConvertML channel must be selected
              </span>
            </h3>
            <hr />
            <Box sx={{ display: "inline-flex", lineHeight: "55px" }}>
              <div className="w150">Integrated </div>
              <div>
                <Button
                  id="basic-button"
                  aria-controls={open ? "basic-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  onClick={handleClick}
                >
                  <img src={slacklogo} alt="cmllogo" width={25} />
                </Button>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    "aria-labelledby": "basic-button",
                  }}
                >
                  <MenuItem>
                    {" "}
                    <img
                      src={zendesklogo}
                      alt="cmllogo"
                      width={25}
                      className="float-left mt-3"
                    />
                  </MenuItem>
                </Menu>

                <FormControl sx={{ m: 1, minWidth: 300 }} size="small">
                  <InputLabel id="demo-select-small-label">
                    Select ConvertML channel...
                  </InputLabel>
                  <Select
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    label="Topics"
                  >
                    <MenuItem value="">
                      <em>Select ConvertML channel...</em>
                    </MenuItem>
                    <MenuItem value={10}>Select ConvertML channel...</MenuItem>
                  </Select>
                </FormControl>
              </div>
            </Box>
          </div>
          <br />
          <Button
            size="small"
            color="primary"
            variant="contained"
            className="mr-2"
          >
            {" "}
            Save
          </Button>
          <Button
            size="small"
            color="primary"
            variant="outlined"
            onClick={(e) => setopenAlertsSetting(false)}
          >
            Close
          </Button>
        </div>
      ) : (
        ""
      )}

      <Dialog
        open={openAlertsDialog}
        onClose={closeAlertsDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <h2 className="m-0">
            <img
              src={
                "/json-media/icons/alerts/" + messagedetailsData.icons + ".svg"
              }
              alt={messagedetailsData.icons}
              className="float-left mr-2"
            />

            {messagedetailsData.title}
          </h2>
          <IconButton
            aria-label="close"
            onClick={closeAlertsDialog}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {messagedetailsData.description}
            <br />
            <br />
            <b> Suggestion:</b> {messagedetailsData.suggestion}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <button className="askcopilot-btn">
            <img src={cmllogo} alt="Insight" /> Ask Copilot
          </button>
        </DialogActions>
      </Dialog>

      {/* -------------------------------- Alerts / Triggers end  -------------------------------- */}

      {/* ------------filter box ------------ */}

      <div className="splitter-container">
        <SplitterLayout
          primaryIndex={1}
          secondaryInitialSize={65}
          percentage
          primaryMinSize={20}
          secondaryMinSize={50}
        >
          <div>
            <Box sx={{ height: "63vh", width: "100%" }}>
              <div
                className={
                  kpiResult.length > 5
                    ? "total-countlistNps"
                    : "total-countlist"
                }
              >
                {kpiResult.map((item, i) => (
                  <div className="custom-card" key={i}>
                    {item.label == "total_contacts" && (
                      <>
                        <CardContent className="cardContent">
                          <span
                            className="capitalize float-left small-text mr-1"
                            title={item.displayName}
                          >
                            {item.displayName}
                          </span>
                          <Tooltip
                            title={
                              "Count of unique Email IDs ingested from Hubspots."
                            }
                          >
                            <i className="fa fa-info-circle small-md-icons float-left"></i>
                          </Tooltip>
                          <br /> <img src={total_contacts} alt="convertml" />
                          <span className="count-number" title={item.count}>
                            {" "}
                            {item.count}{" "}
                          </span>
                        </CardContent>
                      </>
                    )}
                    {item.label == "total_clv" && (
                      <>
                        <CardContent className="cardContent">
                          <span
                            className="capitalize float-left small-text mr-1"
                            title={item.displayName}
                          >
                            {item.displayName}
                          </span>
                          <Tooltip
                            title={
                              "Average revenue generated by the customer during their lifetime"
                            }
                          >
                            <i className="fa fa-info-circle small-md-icons float-left"></i>
                          </Tooltip>
                          <br /> <img src={total_contacts} alt="convertml" />
                          <span
                            className="count-number"
                            title={item.count.toFixed(2)}
                          >
                            {" "}
                            {item.count.toFixed(2)}{" "}
                          </span>
                        </CardContent>
                      </>
                    )}
                    {item.label == "churn_rate" && (
                      <>
                        <CardContent className="cardContent">
                          <span
                            className="capitalize float-left small-text mr-1"
                            title={item.displayName}
                          >
                            {item.displayName}
                          </span>
                          <Tooltip
                            title={
                              "The rate at which customers have churned in the given time period."
                            }
                          >
                            <i className="fa fa-info-circle small-md-icons float-left"></i>
                          </Tooltip>
                          <br /> <img src={total_contacts} alt="convertml" />
                          <span
                            className="count-number"
                            title={item.count.toFixed(2)}
                          >
                            {" "}
                            {item.count.toFixed(2)}{" "}
                          </span>
                        </CardContent>
                      </>
                    )}

                    {item.label == "total_responded" && (
                      <>
                        <CardContent className="cardContent">
                          <span
                            className="capitalize small-text mr-1 float-left"
                            title={item.displayName}
                          >
                            {item.displayName}
                          </span>
                          <Tooltip
                            title={
                              "Count of unique responses ingested from Typeform surveys."
                            }
                          >
                            <i className="fa fa-info-circle small-md-icons float-left"></i>
                          </Tooltip>
                          <br />
                          <img src={totalResponded} alt="convertml" />
                          <span className="count-number" title={item.count}>
                            {" "}
                            {item.count}{" "}
                          </span>
                        </CardContent>
                      </>
                    )}
                    {item.label == "response_percent" && (
                      <>
                        <CardContent className="cardContent">
                          <span
                            className="capitalize small-text float-left  mr-1"
                            title={item.displayName}
                          >
                            {item.displayName}
                          </span>
                          <Tooltip
                            title={
                              "Response percentage indicates the proportion of participants who answered a particular question or expressed a specific sentiment, relative to the total number of respondents."
                            }
                          >
                            <i className="fa fa-info-circle float-left small-md-icons"></i>
                          </Tooltip>
                          <br />
                          <img src={totalResponsePercent} alt="convertml" />
                          <span
                            className="count-number"
                            title={item.count + "%"}
                          >
                            {" "}
                            {item.count}%{" "}
                          </span>
                        </CardContent>
                      </>
                    )}
                    {(item.label == "overall_sentiment" ||
                      item.label == "cltv") && (
                        <>
                          <CardContent className="cardContent">
                            <span
                              className="capitalize small-text float-left mr-1"
                              title={
                                item.displayName == "cltv"
                                  ? "CLTV"
                                  : item.displayName
                              }
                            >
                              {item.displayName == "cltv"
                                ? "CLTV"
                                : item.displayName}
                            </span>
                            <Tooltip
                              title={
                                item.displayName == "cltv"
                                  ? "Customer Lifetime Value (CLV) is a metric that calculates the total expected revenue a business can generate from a customer throughout their entire relationship. It helps businesses assess the long-term profitability of acquiring and retaining customers, guiding strategic decisions for marketing and customer engagement."
                                  : "An aggregated score ranging from 0-1 indicating the overall sentiment based over all the sentiment related questions."
                              }
                            >
                              <i className="fa fa-info-circle float-left small-md-icons"></i>
                            </Tooltip>
                            <br />
                            <img src={cltv} alt="convertml" />
                            <span className="count-number" title={item.count}>
                              {" "}
                              {item.count}{" "}
                            </span>
                          </CardContent>
                        </>
                      )}
                    {item.label == "nps" && (
                      <>
                        <CardContent className="cardContent">
                          <span
                            className="capitalize small-text float-left mr-1"
                            title={item.displayName.toUpperCase()}
                          >
                            {item.displayName.toUpperCase()}
                          </span>
                          <Tooltip
                            title={
                              "Net Promoter Score (NPS) is a customer satisfaction metric that quantifies the willingness of customers to recommend a product, service, or brand to others."
                            }
                          >
                            <i className="fa fa-info-circle float-left small-md-icons"></i>
                          </Tooltip>
                          <br />
                          <img src={nps} alt="convertml" />
                          <span
                            className="count-number"
                            title={item.count + "100"}
                          >
                            {item.count}/100
                          </span>
                        </CardContent>
                      </>
                    )}
                  </div>
                ))}
              </div>
              {resultData.template !== "Churn Prediction" &&
                resultData.template != "Market Research" && (
                  <Grid container spacing={1}>
                    <Grid item xs={4}>
                      <Card
                        className={
                          selectedGridBox ==
                            ` WHERE s."sat_category" = 'positive'` ||
                            selectedGridBox ==
                            ` WHERE s."sat_category" = 'Promoter'`
                            ? "cardBox selectCard"
                            : "cardBox "
                        }
                      >
                        <CardContent
                          onClick={() => {
                            resultData.template == "Net Promoter Score"
                              ? getResultFromS3(
                                isHubspotMerge,
                                mappingResultdata.query_list,
                                ` WHERE s."nps_category" = 'Promoter'`
                              )
                              : getResultFromS3(
                                isHubspotMerge,
                                mappingResultdata.query_list,
                                ` WHERE s."sat_category" = 'positive'`
                              );
                          }}
                        >
                          <img
                            src={positivechart}
                            alt="Positive"
                            className="float-right"
                          />
                          <div
                            className="float-left"
                            style={{ width: "145px" }}
                          >
                            <img
                              src={positiveIcons}
                              width={30}
                              alt="Positive"
                              className="float-left"
                              style={{ marginTop: "-5px" }}
                            />{" "}
                            &nbsp;
                            <b>
                              {resultData.template == "Net Promoter Score"
                                ? "Promoter"
                                : "Positive"}
                            </b>
                            &nbsp;
                            <Tooltip
                              title={
                                "Highly satisfied respondents express contentment and positive sentiment towards their overall experience."
                              }
                            >
                              <i className="fa fa-info-circle small-md-icons"></i>
                            </Tooltip>
                            <div className="clearfix"></div>
                            <div className="count-number">
                              {satisfactionResult?.positive}%
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </Grid>
                    <Grid item xs={4}>
                      <Card
                        className={
                          selectedGridBox ==
                            ` WHERE sat_category = 'neutral'` ||
                            selectedGridBox == ` WHERE sat_category = 'Passive'`
                            ? "cardBox selectCard"
                            : "cardBox"
                        }
                      >
                        <CardContent
                          onClick={() => {
                            resultData.template == "Net Promoter Score"
                              ? getResultFromS3(
                                isHubspotMerge,
                                mappingResultdata.query_list,
                                `WHERE s."nps_category" = 'Passive'`
                              )
                              : getResultFromS3(
                                isHubspotMerge,
                                mappingResultdata.query_list,
                                ` WHERE s."sat_category" = 'neutral'`
                              );
                          }}
                        >
                          <img
                            src={neutralchart}
                            alt="Positive"
                            className="float-right"
                          />
                          <div
                            className="float-left"
                            style={{ width: "145px" }}
                          >
                            <img
                              src={neutralIcons}
                              width={30}
                              alt="Neutral"
                              className="float-left"
                              style={{ marginTop: "-5px" }}
                            />{" "}
                            &nbsp;
                            <b>
                              {resultData.template == "Net Promoter Score"
                                ? "Passive"
                                : "Neutral"}
                            </b>{" "}
                            <Tooltip
                              title={
                                "Moderate contentment with the overall experience, neither exceptionally pleased nor dissatisfied."
                              }
                            >
                              <i className="fa fa-info-circle small-md-icons"></i>
                            </Tooltip>
                            <div className="clearfix"></div>
                            <div className="count-number">
                              {satisfactionResult?.neutral}%
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </Grid>
                    <Grid item xs={4}>
                      {/* {(data.row.sat_category != undefined &&
              data.row.sat_category.toLowerCase() == "negative") ||
              (data.row.sat_category != undefined &&
                data.row.sat_category.toLowerCase() == "detractor") ? */}
                      <Card
                        className={
                          selectedGridBox ==
                            ` WHERE sat_category = 'negative'` ||
                            selectedGridBox == ` WHERE sat_category = 'Detractor'`
                            ? "cardBox selectCard"
                            : "cardBox"
                        }
                        onClick={() => {
                          resultData.template == "Net Promoter Score"
                            ? getResultFromS3(
                              isHubspotMerge,
                              mappingResultdata.query_list,
                              ` WHERE s."nps_category" = 'Detractor'`
                            )
                            : getResultFromS3(
                              isHubspotMerge,
                              mappingResultdata.query_list,
                              ` WHERE s."sat_category" = 'negative'`
                            );
                        }}
                      >
                        <CardContent>
                          <img
                            src={negativechart}
                            alt="Positive"
                            className="float-right"
                          />
                          <div
                            className="float-left"
                            style={{ width: "145px" }}
                          >
                            <img
                              src={negativeIcons}
                              width={30}
                              alt="Negative"
                              className="float-left"
                              style={{ marginTop: "-5px" }}
                            />
                            &nbsp;
                            <b>
                              {resultData.template == "Net Promoter Score"
                                ? "Detractor"
                                : "Negative"}
                            </b>
                            &nbsp;
                            <Tooltip
                              title={
                                "Survey respondents expressed dissatisfaction with the provided service, citing various concerns and shortcomings."
                              }
                            >
                              <i className="fa fa-info-circle small-md-icons"></i>
                            </Tooltip>
                            <div className="clearfix"></div>
                            <div className="count-number">
                              {satisfactionResult?.negative}%
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </Grid>
                  </Grid>
                )}

              {resultData.template === "Churn Prediction" && (
                <Grid container spacing={1}>
                  <Grid item xs={4}>
                    <Card
                      className={
                        selectedGridBox == ` WHERE sat_category = 'positive'` ||
                          selectedGridBox == ` WHERE sat_category = 'Promoter'`
                          ? "cardBox selectCard"
                          : "cardBox "
                      }
                    >
                      <CardContent>
                        <img
                          src={positivechart}
                          alt="Positive"
                          className="float-right"
                        />
                        <div className="float-left" style={{ width: "145px" }}>
                          <img
                            src={neutralIcons}
                            width={30}
                            alt="Positive"
                            className="float-left"
                            style={{ marginTop: "-5px" }}
                          />{" "}
                          &nbsp;
                          <b>{"High"}</b>
                          &nbsp;
                          <Tooltip
                            title={
                              "Percentage of customers who are at predicted to have a high risk of Churning."
                            }
                          >
                            <i className="fa fa-info-circle small-md-icons"></i>
                          </Tooltip>
                          <div className="clearfix"></div>
                          <div className="count-number">
                            {churnSatisfactionResult?.high_Risk}%
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={4}>
                    <Card
                      className={
                        selectedGridBox == ` WHERE sat_category = 'neutral'` ||
                          selectedGridBox == ` WHERE sat_category = 'Passive'`
                          ? "cardBox selectCard"
                          : "cardBox"
                      }
                    >
                      <CardContent>
                        <img
                          src={neutralchart}
                          alt="Positive"
                          className="float-right"
                        />
                        <div className="float-left" style={{ width: "145px" }}>
                          <img
                            src={positiveIcons}
                            width={30}
                            alt="Neutral"
                            className="float-left"
                            style={{ marginTop: "-5px" }}
                          />{" "}
                          &nbsp;
                          <b>{"Low"}</b>{" "}
                          <Tooltip
                            title={
                              "Percentage of customers who are at a low risk of churning."
                            }
                          >
                            <i className="fa fa-info-circle small-md-icons"></i>
                          </Tooltip>
                          <div className="clearfix"></div>
                          <div className="count-number">
                            {churnSatisfactionResult?.low_Risk}%
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              )}

              <div style={{ height: 9 }}></div>
              {/* ---------------- custom chart  ----------------  */}
              <Grid container spacing={1}>
                <Grid item xs={8}>
                  <Card className="cardBox">
                    <CardContent>
                      <Grid container spacing={1}>
                        <Grid item xs={6}>
                          <Stack spacing={2}>
                            <h4 className="m-0">Custom</h4>
                            <FormControl sx={{ minWidth: '100%' }} size="small">
                              <InputLabel id="cxaxis">X-axis</InputLabel>
                              <Select
                                labelId="cxaxis"
                                id="cxaxis"
                                value={setcustomaxis.xaxis}
                                label="X-axis"
                              >
                                {resultvalueKeys.map(
                                  (item, i) => (
                                    <MenuItem
                                      key={item}
                                      value={item}
                                      onClick={(e) => {
                                        selectChartaxis(e, item, 'xaxis');
                                      }}
                                    >
                                      <ListItemText primary={item} />
                                    </MenuItem>
                                  )
                                )}
                              </Select>
                            </FormControl>

                            <FormControl sx={{ minWidth: '100%' }} size="small">
                              <InputLabel id="cyaxis">Y-axis</InputLabel>
                              <Select
                                labelId="cxaxis"
                                id="cxaxis"
                                value={setcustomaxis.yaxis}
                                label="X-axis"
                              >
                                {resultvalueKeys.map(
                                  (item, i) => (
                                    <MenuItem
                                      key={item}
                                      value={item}
                                      onClick={(e) => {
                                        selectChartaxis(e, item, 'yaxis');
                                      }}
                                    >
                                      <ListItemText primary={item} />
                                    </MenuItem>
                                  )
                                )}
                              </Select>
                            </FormControl>

                            <FormControl sx={{ minWidth: '100%' }} size="small">
                              <InputLabel id="cyaxis">Data Operation</InputLabel>
                              <Select
                                labelId="cxaxis"
                                id="cxaxis"
                                value={setcustomaxis.operationName}
                                label="X-axis"
                              >
                                {customChartOpertaion.map(
                                  (item, i) => (
                                    <MenuItem
                                      key={item}
                                      value={item}
                                      onClick={(e) => {
                                        selectChartaxis(e, item,'operation');
                                      }}
                                    >
                                      <ListItemText primary={item} />
                                    </MenuItem>
                                  )
                                )}
                              </Select>
                            </FormControl>
                            <Box sx={{ mt: 2 }}>
                              <DateRangePickerComponent
                                placeholder="Select Time range"
                                cssClass="e-outline"
                                value={filtercustomChartRange}
                                change={(ev) => {
                                  setfiltercustomChartRange(ev.value);
                                }}
                              >
                                <PresetsDirective>
                                  <PresetDirective
                                    label="Current Week"
                                    start={weekStart}
                                    end={weekEnd}
                                  ></PresetDirective>
                                  <PresetDirective
                                    label="Last Week"
                                    start={lastweekStart}
                                    end={lastweekEnd}
                                  ></PresetDirective>
                                  <PresetDirective
                                    label="Current Month"
                                    start={monthStart}
                                    end={monthEnd}
                                  ></PresetDirective>
                                  <PresetDirective
                                    label="Last Month"
                                    start={lastStart}
                                    end={lastEnd}
                                  ></PresetDirective>
                                  <PresetDirective
                                    label="Last Year"
                                    start={yearStart}
                                    end={yearEnd}
                                  ></PresetDirective>
                                </PresetsDirective>
                              </DateRangePickerComponent>
                            </Box>
                          </Stack><br />
                          <Stack direction="row" spacing={1}>
                            <Button
                              color="primary"
                              variant="outlined"
                              onClick={() => {
                                clearfilter("timeseries");
                              }}

                            >
                              <i className="fa fa-close mr-1" />  Clear All
                            </Button>
                            <Button
                              color="primary"
                              variant="outlined"
                              onClick={() => {
                                clearfilter("timeseries");
                              }}
                            >
                              <i className="fa fa-exchange mr-1" />  Swap
                            </Button>
                            <Button
                              sx={{ mt: { xs: 2, sm: 0 } }}
                              color="primary"
                              variant="contained"
                              onClick={(e) => applyCustomChart()}
                            >
                              Apply
                            </Button>
                          </Stack>


                        </Grid>
                        <Grid item xs={6}>
                          <Box sx={{ height: 300, width: "100%" }}>
                            {customchartloader?<div className="text-center"><br/><br/><br/><br/><CircularProgress /><br/> <br/>Thank you for your patience...</div>:<><CustomChart customchartData={customchartData} /></>}
                          
                          </Box>

                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>
                {featureImportanceData.chartSeries.length != 0 ? (
                  <>
                    {" "}
                    <Grid item xs={4}>
                      <Card className="cardBox">
                        <CardContent>
                          <h3
                            style={{ letterSpacing: 0.6 }}
                            title={"Feature Importance"}
                          >
                            Feature Importance
                          </h3>
                          <div className="result-toolbar">
                            <Tooltip
                              title={
                                "A list of important features which impact churn behaviour in customers. The values denote the relative importance of each feature on the churn behaviour."
                              }
                            >
                              <i className="fa fa-info-circle small-md-icons"></i>
                            </Tooltip>
                          </div>
                          <div className="clearfix"></div>
                          <Box sx={{ height: 290, width: "100%" }}>
                            <div id="chart122a1">
                              <Chart
                                height={290}
                                width={"100%"}
                                options={featureImportancechart}
                                series={featureImportanceData.chartSeries}
                                type="bar"
                              />
                            </div>
                          </Box>
                        </CardContent>
                      </Card>
                    </Grid>
                  </>
                ) : null}

                {nrrBreakdownData.chartSeries.length != 0 ? (
                  <Grid item xs={4}>
                    <Card className="cardBox">
                      <CardContent>
                        <h3
                          style={{ letterSpacing: 0.6 }}
                          title={"Revenue ARR by Category"}
                        >
                          Revenue ARR by Category
                        </h3>
                        <div className="result-toolbar">
                          <Tooltip
                            title={
                              "The net revenue generated by customers belonging to each Churn bucket."
                            }
                          >
                            <i className="fa fa-info-circle small-md-icons"></i>
                          </Tooltip>
                        </div>
                        <div className="clearfix"></div>
                        <Box sx={{ height: 230, width: "100%" }}>
                          <div id="chart122a112">
                            <Chart
                              height={230}
                              width={"100%"}
                              options={revenue_ARR_by_category}
                              series={nrrBreakdownData.chartSeries}
                              type="bar"
                            />
                          </div>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                ) : null}

                {heatMapDataForResult.chartSeries.length != 0 ? (
                  <>
                    <Grid item xs={chartHalfheat} className={chartOne}>
                      <Card className="cardBox">
                        <CardContent>
                          <h3
                            title={"HeatMap"}
                          >
                            HeatMap
                          </h3>
                          <div className="result-toolbar">
                            <Tooltip
                              title={
                                "Track your important variables over time to understand customer behaviour."
                              }
                            >
                              <i className="fa fa-info-circle small-md-icons"></i>
                            </Tooltip>
                            <a
                              className={"-  " + hideButtonheat}
                              onClick={(e) => closeenlarge("heatMap")}
                            >
                              <i className="fa fa-compress"> </i>
                            </a>
                            <a
                              className={"-  " + showButtonheat}
                              onClick={(e) => chartenlarge("heatMap")}
                            >
                              <i className="fa fa-expand"> </i>
                            </a>
                            {/* <a>
                              <i
                                className="fa fa-filter"
                                onClick={(e) => openFilterBox(e, "heatMap")}
                              ></i>
                            </a> */}
                          </div>
                          <div className="clearfix"></div>
                          <Box sx={{ height: chartBoxHeightheat, width: "100%" }}>
                            <div id="chart11er1">
                              <Chart
                                height={chartBoxHeightheat}
                                width={"100%"}
                                options={heatmapChartOption}
                                series={heatMapDataForResult.chartSeries}
                                type="heatmap"
                              />
                            </div>
                          </Box>
                        </CardContent>
                      </Card>
                    </Grid>
                  </>
                ) : null}

                {/* <div style={{ height: 10 }}></div> */}
                {/* <Grid container spacing={1}> */}
                {topicSentimentResult1.length != 0 && (
                  <Grid
                    item
                    xs={chartHalfST}
                  // xs={resultData.template == "Net Promoter Score" ? 6 : 8}
                  >
                    <Card className="cardBox">
                      <CardContent>
                        <h3
                          title={
                            resultData.template == "Net Promoter Score"
                              ? "Analysis based on Topic"
                              : "Sentiment By Topic"
                          }
                        >
                          {resultData.template == "Net Promoter Score"
                            ? "Analysis based on Topic"
                            : "Sentiment By Topic"}
                        </h3>
                        <div className="result-toolbar">
                          <Tooltip
                            title={
                              "Identify what your customers are talking about and their tone. Find out the most frequently used topics or phrases in your customer feedback. "
                            }
                          >
                            <i className="fa fa-info-circle small-md-icons"></i>
                          </Tooltip>
                          <a
                            className={"-  " + hideButtonST}
                            onClick={(e) => closeenlarge("sentimentByTopic")}
                          >
                            <i className="fa fa-compress"> </i>{" "}
                          </a>
                          <a
                            className={"-  " + showButtonST}
                            onClick={(e) => chartenlarge("sentimentByTopic")}
                          >
                            <i className="fa fa-expand"> </i>
                          </a>
                          <a>
                            <i
                              className="fa fa-filter"
                              onClick={(e) =>
                                openFilterBox(e, "Sentiment By Topic")
                              }
                            ></i>
                          </a>
                          
                        </div>
                        <div className="clearfix"></div>

                        {/* overflowY:"scroll" */}
                        <Box
                          sx={{
                            maxHeight: chartBoxHeightST,
                            minHeight: chartHalfST == 4 ? "292px" : "auto",
                            width: "100%",
                            overflow: "auto",
                          }}
                        >
                          <section
                            className="custom-chart"
                            style={{ maxHeight: chartBoxHeightST }}
                          >
                            {topicSentimentResult1.map((baritem) => (
                              <>
                                <label title={baritem.topic}>
                                  {baritem.topic}
                                </label>
                                <div className="bars">
                                  <div
                                    onClick={(e) =>
                                      getResultFromS3(
                                        isHubspotMerge,
                                        mappingResultdata.query_list,
                                        `WHERE CAST(s."${baritem.topic}" as FLOAT) BETWEEN 4 AND 5 `
                                      )
                                    }
                                    className="promoter"
                                    style={{ width: baritem.positive + "%" }}
                                  >
                                    <span>{baritem.positive + "%"}</span>
                                  </div>
                                  <div
                                    onClick={(e) =>
                                      getResultFromS3(
                                        isHubspotMerge,
                                        mappingResultdata.query_list,
                                        `WHERE CAST(s."${baritem.topic}" as FLOAT) BETWEEN 2 AND 3.9999`
                                      )
                                    }
                                    className="passive"
                                    style={{ width: baritem.neutral + "%" }}
                                  >
                                    <span>{baritem.neutral + "%"}</span>
                                  </div>
                                  <div
                                    onClick={(e) =>
                                      getResultFromS3(
                                        isHubspotMerge,
                                        mappingResultdata.query_list,
                                        `WHERE CAST(s."${baritem.topic}" as FLOAT) < 2`
                                      )
                                    }
                                    className="detractor"
                                    style={{ width: baritem.negative + "%" }}
                                  >
                                    <span>{baritem.negative + "%"}</span>
                                  </div>
                                </div>
                              </>
                            ))}
                          </section>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                )}
                {resultData.template == "Net Promoter Score" ? (
                  <>
                    {" "}
                    {revenueARRResult.chartSeries.length != 0 ? (
                      <>
                        {" "}
                        <Grid item xs={4}>
                          <Card className="cardBox">
                            <CardContent>
                              <h3
                                style={{ letterSpacing: 0.6 }}
                                title={"Revenue ARR by Category"}
                              >
                                Revenue ARR by Category
                              </h3>
                              <div className="result-toolbar">
                                <Tooltip
                                  title={
                                    "Revenue ARR by category refers to the annual recurring revenue (ARR) generated by a business segmented according to Net Promoter Score (NPS) categories. The NPS categories, including Promoters (loyal customers), Detractors (unhappy customers), and Passives (neutral customers), help analyze how different customer segments contribute to the company's overall revenue. This metric provides insights into the financial impact of customer satisfaction levels."
                                  }
                                >
                                  <i className="fa fa-info-circle small-md-icons"></i>
                                </Tooltip>
                              </div>
                              <div className="clearfix"></div>
                              <Box sx={{ height: 230, width: "100%" }}>
                                <div id="chart122a">
                                  <Chart
                                    height={230}
                                    width={"100%"}
                                    options={sentimentBasedOptionsNps}
                                    series={revenueARRResult.chartSeries}
                                    type="bar"
                                  />
                                </div>
                              </Box>
                            </CardContent>
                          </Card>
                        </Grid>
                      </>
                    ) : null}
                  </>
                ) : (
                  <> 
                    {demographicsResult.chartSeries.length != 0 ? (
                      <>
                        <Grid item xs={chartHalfdonutChart}>
                          <Card className="cardBox">
                            <CardContent>
                              <h3 title={`${demographicsResult.selectedCat}`}>
                                {demographicsResult.selectedCat}
                              </h3>
                              <div className="result-toolbar">
                                <Tooltip
                                  title={
                                    "Get granular-level insights into your customers by segmenting them by age, gender, region, and other demographic variables."
                                  }
                                >
                                  <i className="fa fa-info-circle small-md-icons"></i>
                                </Tooltip>
                               
                                <a
                              className={"-  " + hideButtondonutChart}
                              onClick={(e) => closeenlarge("donutChart")}
                            >
                              <i className="fa fa-compress"> </i>{" "}
                            </a>
                            <a
                              className={"-  " + showButtondonutChart}
                              onClick={(e) => chartenlarge("donutChart")}
                            >
                              <i className="fa fa-expand"> </i>
                            </a>
                            <a
                                  onClick={(e) =>
                                    openFilterBox(e, "Demography")
                                  }
                                >
                                  <i className="fa fa-filter"></i>
                                </a>
                              </div>
                              
                              <div className="clearfix"></div>
                              <Box
                                sx={{
                                  height: chartBoxHeightdonutChart,
                                  width: "100%",
                                  margin: "auto",
                                }}
                              >
                                <div
                                  id="chart122"
                                  style={{ margin: "auto", width: "100%" }}
                                >
                                  <Chart
                                    height={chartBoxHeightdonutChart}
                                    width={"100%"}
                                    options={polarAreachartOptions}
                                    series={demographicsResult.chartSeries}
                                    type="donut"
                                  />
                                </div>
                              </Box>
                            </CardContent>
                          </Card>
                        </Grid>
                      </>
                    ) : null}{" "}
                  </>
                )}

                {timeSeriesData.chartSeries.length != 0 &&
                  resultData.template !== "Churn Prediction" ? (
                  <>
                    <Grid item xs={chartHalfTs} className={chartOne}>
                      <Card className="cardBox">
                        <CardContent>
                          <h3
                            title={`Time Series: ${timeSeriesData.selectedTimeSeriesTimeOption.filter(
                              (ele) =>
                                ele.value ==
                                timeSeriesData.selectedTimeSeriesTime
                            )[0].name
                              }`}
                          >
                            Time Series:{" "}
                            {
                              timeSeriesData.selectedTimeSeriesTimeOption.filter(
                                (ele) =>
                                  ele.value ==
                                  timeSeriesData.selectedTimeSeriesTime
                              )[0].name
                            }
                            {/* {resultData.template == "Net Promoter Score"
                          ? "Likely to recommend per question"
                          : "Company Consideration"} 
                        : {companyConsidration.overall}*/}
                          </h3>
                          <div className="result-toolbar">
                            <Tooltip
                              title={
                                "Better understand your core variables by tracking them over time, such as by months, quarters, years, or a specific time period. "
                              }
                            >
                              <i className="fa fa-info-circle small-md-icons"></i>
                            </Tooltip>
                            <a
                              className={"-  " + hideButton}
                              onClick={(e) => closeenlarge("companyTs")}
                            >
                              <i className="fa fa-compress"> </i>{" "}
                            </a>
                            <a
                              className={"-  " + showButton}
                              onClick={(e) => chartenlarge("companyTs")}
                            >
                              <i className="fa fa-expand"> </i>
                            </a>
                            <a>
                              <i
                                className="fa fa-filter"
                                onClick={(e) => openFilterBox(e, "Time Series")}
                              ></i>
                            </a>
                          </div>
                          <div className="clearfix"></div>
                          <Box sx={{ height: chartBoxHeight, width: "100%" }}>
                            <div id="chart11">
                              <Chart
                                height={chartHeight}
                                width={"100%"}
                                options={chartOptionsTimeSeries}
                                series={timeSeriesData.chartSeries}
                                type="line"
                              />
                            </div>
                          </Box>
                        </CardContent>
                      </Card>
                    </Grid>
                  </>
                ) : null}

                {timeSeriesData.chartSeries.length != 0 &&
                  resultData.template == "Churn Prediction" ? (
                  <>
                    <Grid item xs={chartHalfTs} className={chartOne}>
                      <Card className="cardBox">
                        <CardContent>
                          <h3
                            title={`Churn Across Customer Journey: ${timeSeriesData.selectedTimeSeriesTimeOption.filter(
                              (ele) =>
                                ele.value ==
                                timeSeriesData.selectedTimeSeriesTime
                            )[0].name
                              }`}
                          >
                            Churn Across Customer Journey:
                            {
                              timeSeriesData.selectedTimeSeriesTimeOption.filter(
                                (ele) =>
                                  ele.value ==
                                  timeSeriesData.selectedTimeSeriesTime
                              )[0].name
                            }
                            {/* {resultData.template == "Net Promoter Score"
                          ? "Likely to recommend per question"
                          : "Company Consideration"} 
                        : {companyConsidration.overall}*/}
                          </h3>
                          <div className="result-toolbar">
                            <Tooltip
                              title={
                                "Better understand your core variables by tracking them over time, such as by months, quarters, years, or a specific time period. "
                              }
                            >
                              <i className="fa fa-info-circle small-md-icons"></i>
                            </Tooltip>
                            <a
                              className={"-  " + hideButton}
                              onClick={(e) => closeenlarge("companyTs")}
                            >
                              <i className="fa fa-compress"> </i>{" "}
                            </a>
                            <a
                              className={"-  " + showButton}
                              onClick={(e) => chartenlarge("companyTs")}
                            >
                              <i className="fa fa-expand"> </i>
                            </a>
                            <a>
                              <i
                                className="fa fa-filter"
                                onClick={(e) => openFilterBox(e, "Time Series")}
                              ></i>
                            </a>
                          </div>
                          <div className="clearfix"></div>
                          <Box sx={{ height: chartBoxHeight, width: "100%" }}>
                            <div id="chart11">
                              <Chart
                                height={chartHeight}
                                width={"100%"}
                                options={chartOptionsTimeSerieschurn}
                                series={timeSeriesData.chartSeries}
                                type="bar"
                              />
                            </div>
                          </Box>
                        </CardContent>
                      </Card>
                    </Grid>
                  </>
                ) : null}

                {companyTrustMatrix.chartSeries.length != 0 ? (
                  <>
                    {" "}
                    <Grid item xs={chartHalfTM} className={chartTwo}>
                      <Card className="cardBox">
                        <CardContent>
                          <h3
                            title={
                              companyTrustMatrix.chartSeries[0].name +
                              " " +
                              companyTrustMatrix.overall
                            }
                          >
                            {companyTrustMatrix.chartSeries[0]?.name}:
                            {companyTrustMatrix.overall}
                          </h3>
                          <div className="result-toolbar">
                            <Tooltip
                              title={
                                "Understand how the overall customer satisfaction varies in relation to your products, customer care, and other services."
                              }
                            >
                              <i className="fa fa-info-circle small-md-icons"></i>
                            </Tooltip>
                            <a
                              className={"- " + showButtonTM}
                              onClick={(e) => chartenlarge("companyTM")}
                            >
                              <i className="fa fa-expand"></i>
                            </a>
                            <a
                              className={"- " + hideButtonTM}
                              onClick={(e) => closeenlarge("companyTM")}
                            >
                              <i className="fa fa-compress"></i>
                            </a>
                            <a onClick={(e) => openFilterBox(e, "Regression")}>
                              <i className="fa fa-filter"></i>
                            </a>
                          </div>
                          <Box sx={{ height: chartBoxHeightTM, width: "100%" }}>
                            <div id="chart12a">
                              <br />
                              <Chart
                                height={chartHeightTM}
                                width={"100%"}
                                options={chartOptions1}
                                series={companyTrustMatrix.chartSeries}
                                type="radar"
                              />
                            </div>
                          </Box>
                        </CardContent>
                      </Card>
                    </Grid>
                  </>
                ) : null}

                {timeSeriesData.chartSeries.length != 0 ? (
                  <>
                    <Grid item xs={chartHalf} className={chartOneCopy}>
                      <Card className="cardBox">
                        <CardContent>
                          <h3
                            title={
                              resultData.template == "Net Promoter Score"
                                ? "Likely to recommend per question"
                                : "Company Consideration"
                            }
                          >
                            {resultData.template == "Net Promoter Score"
                              ? "Likely to recommend per question"
                              : "Company Consideration"}
                            : {companyConsidration.overall}
                          </h3>
                          <div className="result-toolbar">
                            <Tooltip
                              title={
                                "This metric assesses the level of interest and value attributed to different topics that a potential customer is thinking of regarding your company."
                              }
                            >
                              <i className="fa fa-info-circle small-md-icons"></i>
                            </Tooltip>
                            <a
                              className={"- " + showButton}
                              onClick={(e) => chartenlarge("companyC")}
                            >
                              <i className="fa fa-expand"></i>
                            </a>
                            <a
                              className={"- " + hideButton}
                              onClick={(e) => closeenlarge("companyC")}
                            >
                              <i className="fa fa-compress"></i>
                            </a>
                          </div>
                          <Box sx={{ height: chartBoxHeight, width: "100%" }}>
                            <div id="chart11">
                              <Chart
                                height={chartHeight}
                                width={"100%"}
                                options={chartOptionsTimeSeries}
                                series={timeSeriesData.chartSeries}
                                type="line"
                              />
                            </div>
                          </Box>
                        </CardContent>
                      </Card>
                    </Grid>
                  </>
                ) : null}
                {correspondenceAnalysis.chartSeries.length != 0 ? (
                  <>
                    <Grid item xs={chartHalfCR} className={chartThree}>
                      <Card className="cardBox">
                        <CardContent>
                          <Stack direction="row" justifyContent="space-between" alignItems="flex-start" spacing={1}>
                            <div><h3 style={{ minWidth: 250 }}
                              title={
                                "Clustering Analysis" +
                                correspondenceAnalysis?.overall
                              }
                            >
                              Clustering Analysis
                              {correspondenceAnalysis?.overall}
                            </h3>
                            </div>
                            <div>{
                              showButtonCR == "d-none" ? <>
                                <Grid container spacing={2}>
                                  <Grid item xs={6} md={6}>
                                    <FormControl size="small" sx={{ minWidth: 250, width: "100%" }} >
                                      <InputLabel id="X-axis-label">X-axis</InputLabel>
                                      <Select
                                        labelId="X-axis-label"
                                        id="X-axis-label"
                                        label="X-axis"
                                        value={correspondenceAnalysis.xLable}
                                      >
                                        {correspondenceAnalysis.colList.map(
                                          (item, i) => (
                                            <MenuItem
                                              key={item}
                                              value={item}
                                              onClick={(e) => {
                                                selectAxisForCluster(e, item, "xLable");
                                              }}
                                            >
                                              {/* <Checkbox /> */}
                                              <ListItemText primary={item} />
                                            </MenuItem>
                                          )
                                        )}
                                      </Select>
                                    </FormControl>
                                  </Grid>
                                  <Grid item xs={6} md={6}>
                                    <FormControl size="small" sx={{ minWidth: 250, width: "100%" }}>
                                      <InputLabel id="Y-axis-label">X-axis</InputLabel>
                                      <Select
                                        labelId="Y-axis-label"
                                        id="Y-axis-label"
                                        label="Y-axis"
                                        value={correspondenceAnalysis.yLable}
                                      >
                                        {correspondenceAnalysis.colList.map(
                                          (item, i) => (
                                            <MenuItem
                                              key={item}
                                              value={item}
                                              onClick={(e) => {
                                                selectAxisForCluster(e, item, "yLable");
                                              }}
                                            >
                                              {/* <Checkbox /> */}
                                              <ListItemText primary={item} />
                                            </MenuItem>
                                          )
                                        )}
                                      </Select>
                                    </FormControl>
                                  </Grid>
                                </Grid>
                              </> : ""
                            } </div>
                            <div className="result-toolbar" >
                              <Tooltip
                                title={
                                  "Clustering analysis in market analysis involves grouping survey responses based on shared characteristics or preferences, revealing distinct customer segments for targeted marketing strategies and product offerings. This method uncovers valuable insights for tailoring marketing efforts and enhancing customer satisfaction."
                                }
                              >
                                <i className="fa fa-info-circle cursorpointer small-md-icons mr-1"></i>
                              </Tooltip>
                              <i
                                className={"fa fa-expand cursorpointer " + showButtonCR}
                                onClick={(e) => chartenlarge("companyCR")}
                              ></i>
                              <i
                                className={"fa fa-compress cursorpointer " + hideButtonCR}
                                onClick={(e) => closeenlarge("companyCR")}
                              ></i>
                            </div>
                          </Stack>

                          <Grid container spacing={2}>
                            <Grid item xs={3} md={showButtonCR ? 8 : 3}>

                            </Grid>

                            <Grid item xs={3} md={showButtonCR ? 4 : 3}>

                            </Grid>
                          </Grid>
                          <div className="clearfix"></div>
                          <Box sx={{ height: chartBoxHeightCR, width: "100%" }}>
                            <div id="chart12b">
                              <Chart
                                height={chartHeightCR}
                                options={chartOptions2}
                                series={correspondenceAnalysis.chartSeries}
                                type="scatter"
                              />
                            </div>
                          </Box>
                        </CardContent>
                      </Card>
                    </Grid>
                  </>
                ) : null}

                {churnRate.chartSeries.length != 0 ? (
                  <>
                    <Grid item xs={chartHalfPC} className={chartFour}>
                      <Card className="cardBox">
                        <CardContent>
                          <h3
                            title={"Word Cloud: " + churnRate.selectedChurnCat}
                          >
                            Word Cloud: {churnRate.selectedChurnCat}
                          </h3>
                          <div className="result-toolbar">
                            <Tooltip
                              title={
                                "Word clouds visually represent the most frequently mentioned words in the customer feedback."
                              }
                            >
                              <i className="fa fa-info-circle small-md-icons"></i>
                            </Tooltip>
                            <a>
                              {" "}
                              <i
                                className={"fa fa-expand " + showButtonPC}
                                onClick={(e) => chartenlarge("companyPC")}
                              ></i>
                            </a>
                            <a>
                              <i
                                className={"fa fa-compress " + hideButtonPC}
                                onClick={(e) => closeenlarge("companyPC")}
                              ></i>{" "}
                            </a>
                            {churnRate.chartSeries.length != 0 && (
                              <a>
                                <i
                                  className="fa fa-filter"
                                  onClick={(e) => openFilterBox(e, "Churn")}
                                ></i>
                              </a>
                            )}
                          </div>
                          <Box sx={{ height: chartBoxHeightPC, width: "100%" }}>
                            {" "}
                            <br />
                            <ReactWordcloud
                              callbacks={callbacks}
                              options={optionsWordCloud}
                              words={churnRate.chartSeries}
                            />
                            {/* <Chart
                          id='potentialChurnRate'
                          height={chartHeightPC}
                          options={chartOptions3}
                          series={churnRate.chartSeries}
                          type="boxPlot"
                        /> */}
                          </Box>
                        </CardContent>
                      </Card>
                    </Grid>
                  </>
                ) : null}

              </Grid>
              {/* ---------------- custom chart  ----------------  */}
              <div className="clearfix"></div>
            </Box>
          </div>
          {dataTable && (
            <div>
              <Box
                sx={{
                  height: "calc(100vh - 18em)",
                  width: "99%",
                  background: "#ffffff",
                }}
              >
                {showLoder && (
                  <Box sx={{ textAlign: "center" }}>
                    <div style={{ paddingTop: 250 }}>
                      {" "}
                      <CircularProgress />
                    </div>
                  </Box>
                )}
                {!showLoder && (
                  <DataGridPro
                    className="table"
                    sx={{
                      height: "calc(100vh - 13.8em)",
                      width: "100%",
                      background: "#ffffff",
                    }}
                    rows={positiveSatisfactionResult.filterdRow}
                    columns={positiveSatisfactionResult.filterdCol}
                    pagination={true}
                    pageSizeOptions={[20, 50, 100]}
                    checkboxSelection={false}
                    disableSelectionOnClick
                    getRowHeight={() => "auto"}
                    initialState={{
                      pagination: {
                        paginationModel: {
                          pageSize: 20,
                        },
                      },
                    }}
                    hideFooterRowCount={true}
                    hideFooter={false}
                    editable
                  />
                )}
              </Box>
            </div>
          )}
        </SplitterLayout>
      </div>
    </div>
  );
}
