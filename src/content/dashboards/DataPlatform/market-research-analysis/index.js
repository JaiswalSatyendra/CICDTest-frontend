import * as React from "react";
import {
  Autocomplete,
  Box,
  Button,
  Checkbox,
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
  Popover,
} from "@mui/material";
import { DataGridPro, gridClasses } from "@mui/x-data-grid-pro";
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

import addWeeks from "date-fns/addWeeks";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateRangePicker from "@mui/lab/DateRangePicker";


import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

// import DatabasesDialog from '../dialog/DatabasesDialog';

import positiveIcons from "../../../../assets/icons/positive.svg";
import neutralIcons from "../../../../assets/icons/neutral.svg";
import negativeIcons from "../../../../assets/icons/negative.svg";

import positivechart from "../../../../assets/icons/positivechart.png";
import neutralchart from "../../../../assets/icons/neutralchart.png";
import negativechart from "../../../../assets/icons/negativechart.png";

import demographyChart from "../../../../assets/icons/demographyChart.png";
import userIcon from "../../../../assets/icons/usericon.png";

import InsightIcons from "../../../../assets/icons/insightIcons.svg";
import SegmentationIcons from "../../../../assets/icons/segmentationIcons.svg";

import chart1ac from "../../../../assets/img/chart1-ca.png";
import chart2ac from "../../../../assets/img/chart2-ca.png";
import chart3ac from "../../../../assets/img/chart3-ca.png";
import chart4ac from "../../../../assets/img/chart4-ca.png";
import chart5ac from "../../../../assets/img/chart5-ca.png";
import chart6ac from "../../../../assets/img/chart6-ca.png";

import SplitterLayout from "react-splitter-layout";
import "react-splitter-layout/lib/index.css";

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
import averageSpend from "../../../../assets/icons/averageSpendicons.svg";
import overallSentimentMR from "../../../../assets/icons/overallSentimentMR.svg";
import totalResponsePercent from "../../../../assets/icons/totalResponsePercent.svg";
import overall_impact_on_revenue from "../../../../assets/icons/overallImpactonRevenue.svg";
import nps from "../../../../assets/icons/nps.svg";

import NetPromoterScoreComingSoon from "../../../../assets/img/NetPromoterScoreComingSoon.jpg";
import stackedBarChartsComingSoon from "../../../../assets/img/stackedBarChartsComingSoon.jpg";
import HistogramsComingSoon from "../../../../assets/img/HistogramsComingSoon.jpg";




import { gridDataForGridRowData } from "../../../../assets/data/data";
import { churnRateWclData, GridDataMR, sentimentByTopicData } from "../../../../assets/data/market-researchAnalysis";
import ReactWordcloud from "react-wordcloud";
import InsightSegmentation from "../insight-segemetation";
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';



function getWeeksAfter(date, amount) {
  return date ? addWeeks(date, amount) : undefined;
}

export default function MarketResearchAnalysis({ resultData, segmentationData, insightData }) {
  const totalResultCount = totalResultCountData;
  const positiveSatisfactionColumns = positiveSatisfactionColumnsData;
  const positiveSatisfactionRows = positiveSatisfactionRowsData;
  const theme = useTheme();
  const [isSelectedPanel, setIsSelectedPanel] = useState(
    "companyConsideration"
  );


  const [chartHalf, setIschartHalf] = useState(4);
  const [chartBoxHeight, setIschartBoxHeight] = useState(280);
  const [chartHeight, setIschartHeight] = useState(280);
  const [showButton, setIsshowButton] = useState("d-block");
  const [hideButton, setIshideButton] = useState("d-none");
  const [chartOne, setIschartOne] = useState("d-block");
  const [chartOneCopy, setIschartOneCopy] = useState("d-none");

  const [chartHalfTM, setIschartHalfTM] = useState(4);
  const [chartBoxHeightTM, setIschartBoxHeightTM] = useState(280);
  const [chartHeightTM, setIschartHeightTM] = useState(280);
  const [showButtonTM, setIsshowButtonTM] = useState("d-block");
  const [hideButtonTM, setIshideButtonTM] = useState("d-none");
  const [chartTwo, setIschartTwo] = useState("d-block");


  const [selectionTool, setselectionTool] = useState([true]);

  const [filterBox, setfilterBox] = useState(false);

  const [chartHalfCR, setIschartHalfCR] = useState(4);
  const [chartBoxHeightCR, setIschartBoxHeightCR] = useState(280);
  const [chartHeightCR, setIschartHeightCR] = useState(280);
  const [showButtonCR, setIsshowButtonCR] = useState("d-block");
  const [hideButtonCR, setIshideButtonCR] = useState("d-none");
  const [chartThree, setIschartThree] = useState("d-block");
  const [chartThreeCopy, setIschartThreeCopy] = useState("d-none");

  const [chartHalfPC, setIschartHalfPC] = useState(4);
  const [chartBoxHeightPC, setIschartBoxHeightPC] = useState(280);
  const [chartHeightPC, setIschartHeightPC] = useState(280);
  const [showButtonPC, setIsshowButtonPC] = useState("d-block");
  const [hideButtonPC, setIshideButtonPC] = useState("d-none");
  const [chartFour, setIschartFour] = useState("d-block");
  const [chartFontSize, setIschartFontSize] = useState("7px");


  const [selectedGridBox, setIsselectedGridBox] = useState("");
  const [isFilteredCluster, setIsFilteredCluster] = useState({ xmin: null, xmax: null, ymin: null, ymax: null });
  const [isFilteredChurn, setisFilteredChurn] = useState("");
  const [value, setValue] = React.useState([null, null]);

  const [surveyNames, setsurveyNames] = React.useState([]);

  const [openSegmentation, setopenSegmentation] = useState(false);
  const [mappingCrossTabQuestion, setMappingCrossTabQuestion] = useState([]);
  const [mappingListCrossTab, setMappingListCrossTab] = useState({});
  const [showLoderSegmentation, setLoaderShowSegmentation] = useState(false);
  const [filterPopup, setfilterPopup] = useState({
    xPosition: 0,
    yPosition: 0,
  });
  const [filterForBoxString, setfilterForBoxString] = useState("");


  const [openInsight, setopenInsight] = useState(false);
  const [generativeInsights, setGenerativeInsights] = useState("");

  const [isCreateOpenSegmentation, setIsCreateOpenSegmentation] = useState(false);
  const [selectedSegmentationOption, setselectedSegmentationOption] = useState({});
  const [segmentationCategoryMapping, setsegmentationCategoryMapping] = useState([{ ques: 'Overall Response', tab_name: 'Overall Response' }]);

  const [isHubspotMerge, setisHubspotMerge] = useState(false);
  const [listOfColumnAthena, setlistOfColumnAthena] = useState([]);

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
      field: "churn_risk",
      headerName: "Churn Risk",
      flex: 1,
      minWidth: 120,
      editable: true,
      renderCell: (data) => {
        return (
          <div className="cell-template">
            {data.row.churn_risk != undefined &&
              data.row.churn_risk.toLowerCase() == "medium" && (
                <>
                  <span className="churnMedium">{data.row.churn_risk}</span>
                </>
              )}
            {data.row.churn_risk != undefined &&
              data.row.churn_risk.toLowerCase() == "high" && (
                <>
                  <span className="churnHigh">{data.row.churn_risk}</span>
                </>
              )}
            {data.row.churn_risk != undefined &&
              data.row.churn_risk.toLowerCase() == "low" && (
                <>
                  <span className="churnLow">{data.row.churn_risk}</span>
                </>
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
      field: "churn_risk",
      headerName: "Churn Risk",
      flex: 1,
      minWidth: 120,
      editable: true,
      renderCell: (data) => {
        return (
          <div className="cell-template">
            {data.row.churn_risk != undefined &&
              data.row.churn_risk.toLowerCase() == "medium" && (
                <>
                  <span className="churnMedium">{data.row.churn_risk}</span>
                </>
              )}
            {data.row.churn_risk != undefined &&
              data.row.churn_risk.toLowerCase() == "high" && (
                <>
                  <span className="churnHigh">{data.row.churn_risk}</span>
                </>
              )}
            {data.row.churn_risk != undefined &&
              data.row.churn_risk.toLowerCase() == "low" && (
                <>
                  <span className="churnLow">{data.row.churn_risk}</span>
                </>
              )}
          </div>
        );
      },
    },
  ];


  const [timeSeriesData, settimeSeriesData] = useState({
    chartSeries: [],
    labels: [],
    originalData: [],
    selectedTimeSeriesCat: [],
    selectedTimeSeriesTime: "",
    selectedTimeSeriesTimeOption: []
  });

  const [topicSentimentResult1, settopicSentimentResult1] = useState([]);
  const [revenueARRResult, setrevenueARRResult] = useState({
    chartSeries: [],
    labels: [],
  });
  const [radarmaxValue, setradarmaxValue] = useState([]); 
  

  

  const [churnRateWcl, setChurnRateWcl] = useState({
    chartSeries: churnRateWclData,
    labels: [],
    overall: "",
    originalData: [],
    selectedChurnCat: ""
  });
  const optionsWordCloud = {
    colors: ["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd", "#8c564b"],
    enableTooltip: false,
    deterministic: true,
    fontFamily: "Manrope",
    fontSizes: [25, 40],
    fontStyle: "normal",
    fontWeight: "normal",
    padding: 4,
    rotations: 1,
    rotationAngles: [0, 90],
    scale: "sqrt",
    spiral: "archimedean",
    transitionDuration: 500,
    zoom: { enabled: true, }
  };


  const surveyNamesList = [
    { name: "Survey 1", value: "Survey 1" },
    { name: "Survey 2", value: "Survey 2" },
    { name: "Survey 2", value: "Survey 2" },
  ];

  const timeframeList = [
    { name: "Yearly", value: "Yearly" },
    { name: "Quarterly", value: "Quarterly" },
    { name: "Monthly", value: "Monthly" },
    { name: "Custom Period", value: "Custom Period" },
  ];

  const [dataTable, setDataTable] = useState(true); 

  const hideFilterBox = (e) => {
    setfilterBox(true);
  };

  const closeFilterBox = (e) => {
    setfilterBox(false);
  };

  const timeChartseries= [{
    name: 'Sales',
    data: [4, 3, 10, 9, 29, 19, 22, 9, 12, 7, 19, 5, 13, 9, 17, 2, 7, 5]
  }]  ;

  const timeoptionsseries = {
    chart: {
      // height: 350,
      type: 'line',
      toolbar: {
        show: false,
      },
    },
    forecastDataPoints: {
      count: 7
    },  
    stroke: {
      width: 5,
      curve: 'smooth'
    },
  
    xaxis: {
      type: 'datetime',
      categories: ['1/11/2000', '2/11/2000', '3/11/2000', '4/11/2000', '5/11/2000', '6/11/2000', '7/11/2000', '8/11/2000', '9/11/2000', '10/11/2000', '11/11/2000', '12/11/2000', '1/11/2001', '2/11/2001', '3/11/2001','4/11/2001' ,'5/11/2001' ,'6/11/2001'],
      tickAmount: 10,
      labels: {
        formatter: function(value, timestamp, opts) {
          return opts.dateFormatter(new Date(timestamp), 'dd MMM')
        }
      }
    },
    // title: {
    //   text: 'Forecast',
    //   align: 'left',
    //   style: {
    //     fontSize: "16px",
    //     color: '#666'
    //   }
    // },
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'dark',
        gradientToColors: [ '#FDD835'],
        shadeIntensity: 1,
        type: 'horizontal',
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 100, 100, 100]
      },
    },
    yaxis: {
      min: -10,
      max: 40
    }
  };
  
  const [isHidePositiveSatisfaction, setIsHidePositiveSatisfaction] =
    useState(true);
  const [companyConsidration, setCompanyConsidration] = useState({
    chartSeries: [{
      name: "0",
      data: [
        [-0.2, 0.1], [-0.1, 0.1], [0.3, 0.1], [0.2, -0.0], [0.4, 0.1]]
    }, {
      name: "1",
      data: [
        [-0.3, 0.1], [0.4, 0.2], [0.2, 0.1], [0.2, 0.1], [0.1, 0.0]]
    }],
    labels: [],
    overall: "",
    gridData: [],
    gridDataCols: [],
  });

  const [clusteringAnalysis, setclusteringAnalysis] = useState({
    chartSeries: [{
      name: "0",
      data: [
        [16.4, 5.4], [21.7, 2], [25.4, 3], [19, 2], [10.9, 1], [13.6, 3.2], [10.9, 7.4], [10.9, 0], [10.9, 8.2], [16.4, 0], [16.4, 1.8], [13.6, 0.3], [13.6, 0], [29.9, 0], [27.1, 2.3], [16.4, 0], [13.6, 3.7], [10.9, 5.2], [16.4, 6.5], [10.9, 0], [24.5, 7.1], [10.9, 0], [8.1, 4.7], [19, 0], [21.7, 1.8], [27.1, 0], [24.5, 0], [27.1, 0], [29.9, 1.5], [27.1, 0.8], [22.1, 2]]
    }, {
      name: "1",
      data: [
        [36.4, 13.4], [1.7, 11], [5.4, 8], [9, 17], [1.9, 4], [3.6, 12.2], [1.9, 14.4], [1.9, 9], [1.9, 13.2], [1.4, 7], [6.4, 8.8], [3.6, 4.3], [1.6, 10], [9.9, 2], [7.1, 15], [1.4, 0], [3.6, 13.7], [1.9, 15.2], [6.4, 16.5], [0.9, 10], [4.5, 17.1], [10.9, 10], [0.1, 14.7], [9, 10], [12.7, 11.8], [2.1, 10], [2.5, 10], [27.1, 10], [2.9, 11.5], [7.1, 10.8], [2.1, 12]]
    }, {
      name: "2",
      data: [
        [21.7, 3], [23.6, 3.5], [24.6, 3], [29.9, 3], [21.7, 20], [23, 2], [10.9, 3], [28, 4], [27.1, 0.3], [16.4, 4], [13.6, 0], [19, 5], [22.4, 3], [24.5, 3], [32.6, 3], [27.1, 4], [29.6, 6], [31.6, 8], [21.6, 5], [20.9, 4], [22.4, 0], [32.6, 10.3], [29.7, 20.8], [24.5, 0.8], [21.4, 0], [21.7, 6.9], [28.6, 7.7], [15.4, 0], [18.1, 0], [33.4, 0], [16.4, 0]]
    }],
    labels: [],
    overall: "",
    gridData: [],
    gridDataCols: [],
  });
  const [companyTrustMatrix, setCompanyTrustMatrix] = useState({
    chartSeries: [{ data: [10, 30, 50] },],
    labels: [],
    overall: "",
    gridData: [],
    gridDataCols: [],
  });

  const [correspondenceAnalysis, setCorrespondenceAnalysis] = useState({
    chartSeries: [{
      name: 'High',
      type: 'column',
      data: [23, 11, 22, 27, 99,]
    }, {
      name: 'Medium',
      type: 'area',
      data: [44, 55, 41, 67, 100,]
    }, {
      name: 'Low',
      type: 'line',
      data: [75, 25, 36, 30, 45,]
    }],
    labels: [],
    overall: "",
    gridData: [],
    gridDataCols: [],
    tootltipProp: []
  });

  const [churnRate, setChurnRate] = useState({
    name: 'Series 1',
    data: [20, 100, 40, 30, 50, 80, 33],
    // labels: [],
    // labels1: [],
    // overall: "",
  });

  const [kpiResult, setkpiResult] = useState([
    {
      label: 'total_contacts',
      count: 500,
      displayName: 'Total Contacts',
      imgName: total_contacts
    },
    {
      label: 'total_Responded',
      count: 521,
      displayName: 'Total Responded',
      imgName: totalResponsePercent
    },
    {
      label: 'average_Spend',
      count: 50,
      displayName: 'Average Spend',
      imgName: averageSpend
    },
    {
      label: 'overall_sentiment',
      count: 0.76,
      displayName: 'Overall Sentiment',
      imgName: overallSentimentMR
    },
    {
      label: 'nps_score',
      count: 8,
      displayName: 'NPS Score',
      imgName: nps,
    },

  ]);

  const [satisfactionResult, setsatisfactionResultResult] = useState({
    overall: "",
    positive: "",
    negative: "",
    neutral: "",
  });

  const [topicSentimentResult, settopicSentimentResult] = useState([
    {
      // name: resultData.template=="Net Promoter Score"?"Promoter":"Heigh",
      // data: newPositiveList,
      name: 'Promoter',
      data: [44, 55, 41, 37, 22, 43,]
    },
    {
      // name: resultData.template=="Net Promoter Score"?"Passive":"Neutral",
      // data: newNeutralList,
      name: 'Passive',
      data: [53, 32, 33, 52, 13, 43,]
    },
    {
      // name: resultData.template=="Net Promoter Score"?"Detractor":"Negative",
      // data: newNegativeList,
      name: 'Detractor',
      data: [12, 17, 11, 9, 15, 11,]
    },
  ]);

  const [positiveSatisfactionTable, setpositiveSatisfactionTable] =
    useState("");
  const [showLoder, setLoaderShow] = useState(false);

  const [topicSentimentLabel, settopicSentimentLabel] = useState([]);

  const [positiveSatisfactionResult, setpositiveSatisfactionResult] = useState({
    filterdRow: GridDataMR,
    filterdCol: [
      { field: 'nameCustomerID', headerName: 'Name & Customer ID', width: 150 },
      { field: 'customerSatisfaction', headerName: 'Customer Satisfaction', width: 150, editable: true,
      renderCell: (data) => {
        return (
          <div className="cell-template">
            {data.row.churnStatus != undefined &&
              data.row.churnStatus.toLowerCase() == "medium" && (
                <>
                  <span className="churnMedium">{data.row.churnStatus}</span>
                </>
              )}
            {data.row.churnStatus != undefined &&
              data.row.churnStatus.toLowerCase() == "high" && (
                <>
                  <span className="churnLow">{data.row.churnStatus}</span>
                </>
              )}
            {data.row.churnStatus != undefined &&
              data.row.churnStatus.toLowerCase() == "low" && (
                <>
                  <span className="churnHigh">{data.row.churnStatus}</span>
                </>
              )}
          </div>
        );
      },
     },
      { field: 'purchaseFrequency', headerName: 'Purchase Frequency', width: 100, editable: true, },
      { field: 'averagePurchaseAmount', headerName: 'Average Purchase Amount', width: 150, },
      { field: 'daysSinceLastPurchase', headerName: 'Days Since Last Purchase', width: 150, },
      { field: 'customerSupportTickets', headerName: 'Customer Support Tickets', width: 150, },
      { field: 'countryAgeGender', headerName: 'Country Age, Gender', width: 150, },
      {
        field: 'churnStatus',
        headerName: 'Churn Status',
        width: 150,
        editable: true,
        editable: true,
        renderCell: (data) => {
          return (
            <div className="cell-template">
              {data.row.churnStatus != undefined &&
                data.row.churnStatus.toLowerCase() == "medium" && (
                  <>
                    <span className="churnMedium">{data.row.churnStatus}</span>
                  </>
                )}
              {data.row.churnStatus != undefined &&
                data.row.churnStatus.toLowerCase() == "high" && (
                  <>
                    <span className="churnLow">{data.row.churnStatus}</span>
                  </>
                )}
              {data.row.churnStatus != undefined &&
                data.row.churnStatus.toLowerCase() == "low" && (
                  <>
                    <span className="churnHigh">{data.row.churnStatus}</span>
                  </>
                )}
            </div>
          );
        },
      },
      { field: 'commentsandFeedback', headerName: 'Comments and Feedback', width: 150, },
    ],
  });

  const [demographicsResult, setdemographicsResult] = useState({
    chartSeries: [107,
      105,
      100,
      96,
      47,
      40],
    labels: ["31-40",
      "21-30",
      "51-60",
      "41-50",
      "61-70",
      "10-20"],
  });

  // const gridDataForGridRow = gridDataForGridRowData;

  const chartOptions = {
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
    dataLabels: {
      fontSize: '14px',
      fontFamily: 'Helvetica, Arial, sans-serif',
      fontWeight: 'bold',
      colors: ' #f00f00',
    },
    xaxis: {
      min: -1,
      max: 1,
      categories: companyConsidration.labels,
      labels: {
        show: true,
        rotate: -45,
        rotateAlways: true,
        hideOverlappingLabels: false,
        showDuplicates: false,
        trim: true,
        minHeight: undefined,
        width: 50,
        maxWidth: 50,
        maxHeight: 120,
        fill: '#000000',
        style: {
          fontSize: (chartFontSize),
          with: '150px',
          color: '#000000',
          colors: 'black',
          wordWrap: 'break-word',
          fontWeight: 400,
          cssClass: 'apexcharts-xaxis-label',
        },
      }
    },
    yaxis: {
      min: -1,
      max: 1,
    },
  };

  const polarAreachartOptions = {
    chart: {
      foreColor: '#ffffff',
      type: 'polarArea'
    },
    labels: ['10-20', '31-40'],
    fill: {
      opacity: 1
    },
    stroke: {
      width: 1,
      colors: undefined
    },
    yaxis: {
      show: false
    },
    legend: false,
    // legend: {
    //   position: 'bottom'
    // },
    plotOptions: {
      polarArea: {
        rings: {
          strokeWidth: 0
        }
      }
    },
    theme: {
      monochrome: {
        //    enabled: true,
        shadeTo: 'dark',
        shadeIntensity: 0.9
      }
    }
  };

  const sentimentBasedOptions = {
    chart: {
      type: "bar",
      height: 350,
      stacked: true,
      stackType: "100%",
    },
    grid: {
      height: 10, width: 10,
      show: true,
      borderColor: '#dcdcdc',
      strokeDashArray: 4,
      position: 'back',
      yaxis: {
        height: 15,
        lines: {
          height: 10,
          show: false,
          opacity: 0.2,
        },
      },
      xaxis: {
        height: 15,
        lines: {
          height: 10,
          show: false,
          opacity: 0.2,
        },
      },
    },
    colors: ['#3AD475', '#FAD557', '#FC495C'],
    plotOptions: {
      bar: {
        borderRadius: 5,
        barHeight: "50%",
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

    tooltip: {
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
      maxWidth: 200,
      maxHeight: 20,
      categories: ['Active on Media', 'Comfortable', 'Consistent Performance', 'Inncvator', 'Know a lot', 'Make life Easier'] //companyConsidration.labels,
    },
    toolbar: {
      show: true,
    },
    yaxis: {
      labels: {
        show: true,
        align: 'left',
        // minWidth: 200,
        maxWidth: 200,
        maxHeight: 20,
        // style: {
        //   // colors: '#f00f00', 
        //   fontFamily: 'Helvetica, Arial, sans-serif',
        //   fontWeight: 400,
        //   cssClass: 'apexcharts-yaxis-label',
        // },
        offsetX: 0,
        offsetY: 0,
        rotate: 0,
      }
    }
  };

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
    fill: {
      colors: ['#9B86EF', '#9B86EF', '#9B86EF']
    },
    xaxis: {
      categories: companyTrustMatrix.labels,
      labels: {
        show: true,
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
          fontSize: (chartFontSize),
          with: '150px',
          wordWrap: 'break-word',
          fontWeight: 400,
          cssClass: 'apexcharts-xaxis-label',
        },
      }
    },
    yaxis: {
      min: -0.8,
      max: 0.7,
      labels: {
        formatter: function (val) {
          return val.toFixed(2);
        },
      },
    },
  };

  const chartOptions2 = {
    chart: {
      height: 350,
      type: 'line',
      stacked: false,
    },
    stroke: {
      width: [0, 2, 5],
      curve: 'smooth'
    },
    plotOptions: {
      bar: {
        columnWidth: '50%'
      }
    },

    fill: {
      opacity: [0.85, 0.25, 1],
      gradient: {
        inverseColors: false,
        shade: 'light',
        type: "vertical",
        opacityFrom: 0.85,
        opacityTo: 0.55,
        stops: [0, 100, 100, 100]
      }
    },
    labels: ['Awareness', 'Interest', 'Purchase', 'Post-Purchase', 'Re-Purchase/Upselling'],
    markers: {
      size: 0
    },
    xaxis: {
      type: 'string'
    },
    yaxis: {
      title: {
        // text: 'Points',
      },
      min: 0
    },
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: function (y) {
          if (typeof y !== "undefined") {
            return y.toFixed(0) + " points";
          }
          return y;

        }
      }
    }



  };

  const chartOptions3 = {
    chart: {
      selection: {
        enabled: true,
        type: 'xy',
        fill: {
          color: '#24292e',
          opacity: 0.1
        },
        stroke: {
          width: 1,
          dashArray: 3,
          color: '#24292e',
          opacity: 0.4
        },
        xaxis: {
          categories: ['January', 'February', 'March', 'April', 'May', 'June'],
          min: undefined,
          max: undefined
        },
        yaxis: {
          min: undefined,
          max: undefined
        }
      },
      events: {
        click: function (chart, w, e) {
          console.log(chart, w, e)
          let newMatchVal = ""
          if ((churnRate.labels1[e.dataPointIndex]) == "low_churn") {
            newMatchVal = "low"
          } else if ((churnRate.labels1[e.dataPointIndex]) == "med_churn") {
            newMatchVal = "medium"
          } else {
            newMatchVal = "high"
          }

          setisFilteredChurn(newMatchVal)
        }
      },

      background: "transparent",
      width: 400,
      stacked: false,
      toolbar: {
        show: false,
      },
    },


    xaxis: {
      categories: churnRate.labels,
    },
  };



  const series4 = [{
    name: 'Series 1',
    data: [10, 20, 30, 20, 10, 20],
  }];

  const regressionSeries4 = {
    chart: {
      type: 'radar',
    },
    title: {
      // text: 'Basic Radar Chart'
    },
    colors: ['#8f4bda'],
    markers: {
      size: 4,
      colors: ['#fff'],
      strokeColor: '#8f4bda',
      strokeWidth: 2,
    },
    dataLabels: {
      fontSize: (chartFontSize),
      fontFamily: 'Helvetica, Arial, sans-serif',
      fontWeight: 'bold',
      colors: ' #f00f00',
    },
    xaxis: {
      labels: {
        show: true,
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
          fontSize: (chartFontSize),
          with: '100px',
          wordWrap: 'break-word',
          fontWeight: 400,
          cssClass: 'apexcharts-xaxis-label',
        },
      },
      categories: ['Know a lot', 'Comfortable', 'Active on media', 'Excellent Reputation', 'Innovator',
        'Different & brands', 'Make life easier', 'Consistent performance', 'Recommend',]
    },
    yaxis: {
      tickAmount: 7,
      labels: {
        formatter: function (val, i) {
          if (i % 2 === 0) {
            return val
          } else {
            return ''
          }
        }
      }
    }
  }

  const chartOptions4 = {
    chart: {
      height: 150,
      type: 'radar',
    },
    dataLabels: {
      enabled: true
    },
    plotOptions: {
      radar: {
        size: 140,
        polygons: {
          strokeColors: '#e9e9e9',
          fill: {
            colors: ['#f8f8f8', '#fff']
          }
        }
      }
    },
    // title: {
    //   text: 'Radar with Polygon Fill'
    // },
    colors: ['#8f4bda'],
    markers: {
      size: 4,
      colors: ['#fff'],
      strokeColor: '#8f4bda',
      strokeWidth: 2,
    },
    dataLabels: {
      fontSize: (chartFontSize),
      fontFamily: 'Helvetica, Arial, sans-serif',
      fontWeight: 'bold',
      colors: ' #f00f00',
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return val
        }
      }
    },
    xaxis: {
      labels: {
        show: true,
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
          fontSize: (chartFontSize),
          with: '100px',
          wordWrap: 'break-word',
          fontWeight: 400,
          cssClass: 'apexcharts-xaxis-label',
        },
      },
      categories: ['Know a lot', 'Comfortable', 'Active on media', 'Excellent Reputation', 'Innovator',
        'Different from other brands', 'Make life easier', 'Consistent performance', 'Recommend',]
    },
    yaxis: {
      tickAmount: 7,
      labels: {
        formatter: function (val, i) {
          if (i % 2 === 0) {
            return val
          } else {
            return ''
          }
        }
      }
    }
  };

  const clusteringAnalysisOptions = {
    chart: {
      height: 300,
      type: 'scatter',
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
              icon: '',
              index: 1,
              title: 'Refresh',
              class: 'cursor-pointer fa fa-refresh',
              click: function (chart, options, e) {
                setselectionTool(false)
                setTimeout(() => {
                  setselectionTool(true)
                }, 1)
              }
            }]
        }
      },
    },
    xaxis: {
      tickAmount: 10,
      labels: {
        formatter: function (val) {
          return parseFloat(val).toFixed(1)
        }
      }
    },
    yaxis: {
      tickAmount: 7
    },
    tooltip: {
      show: false,
      // tooltipData:{"average_purchase_value":average_purchase_value,"purchase_frequency":purchase_frequency},
      custom: function ({ series, seriesIndex, dataPointIndex, w }) {
        // if (isHubspotMerge) {
        //   return (
        //     '<div class="arrow_box py-2 px-2 bg-blue text-white">' +
        //     "<span>Average Purchase Value: " +
        //     correspondenceAnalysis.tootltipProp[seriesIndex].data[dataPointIndex].average_purchase_value +
        //     "</span><br/>" +
        //     "<span>Purchase Frequency: " +
        //     correspondenceAnalysis.tootltipProp[seriesIndex].data[dataPointIndex].purchase_frequency +
        //     "</span><br/>" +
        //     "<span>Mean: " +
        //     correspondenceAnalysis.tootltipProp[seriesIndex].data[dataPointIndex].mean +
        //     "</span><br/>" +

        //     "</div>"
        //   );
        // } else {
        return (
          '<div class="arrow_box py-2 px-2 bg-blue text-white">' +
          "<span>Mean: " +
          0 +
          "</span><br/>" +

          "</div>"
        );
        // }

      },
    },
  }

  const chartOptions5 = {
    chart: {
      height: 350,
      type: 'scatter',
      zoom: {
        enabled: true,
        type: 'xy'
      }
    },
    xaxis: {
      min: -1,
      max: 1,
      tickAmount: 5,
      labels: {
        formatter: function (val) {
          return parseFloat(val).toFixed(1)
        }
      }
    },
    yaxis: {
      min: -1,
      max: 1, opposite: "right",
      tickAmount: 5
    },
    tooltip: {
      show: false,
      // tooltipData:{"average_purchase_value":average_purchase_value,"purchase_frequency":purchase_frequency},
      custom: function ({ series, seriesIndex, dataPointIndex, w }) {
        // if (isHubspotMerge) {
        //   return (
        //     '<div class="arrow_box py-2 px-2 bg-blue text-white">' +
        //     "<span>Average Purchase Value: " +
        //     correspondenceAnalysis.tootltipProp[seriesIndex].data[dataPointIndex].average_purchase_value +
        //     "</span><br/>" +
        //     "<span>Purchase Frequency: " +
        //     correspondenceAnalysis.tootltipProp[seriesIndex].data[dataPointIndex].purchase_frequency +
        //     "</span><br/>" +
        //     "<span>Mean: " +
        //     correspondenceAnalysis.tootltipProp[seriesIndex].data[dataPointIndex].mean +
        //     "</span><br/>" +

        //     "</div>"
        //   );
        // } else {
        return (
          '<div class="arrow_box py-2 px-2 bg-blue text-white">' +
          "<span>Mean: " +
          0 +
          "</span><br/>" +

          "</div>"
        );
        // }

      },
    },
  }

  const chartOptions6 = {
    chart: {
      type: 'bar',
      height: 250,
      stacked: true,
      dropShadow: {
        enabled: true,
        blur: 1,
        opacity: 0.25
      }
    },
    plotOptions: {
      bar: {
        borderRadius: 5,
        barHeight: "70%",
        horizontal: true,
      },
    },
    dataLabels: {
      enabled: true
    },
    colors: [
      function ({ value, seriesIndex, dataPointIndex, w }) {
        let colorInd = companyTrustMatrix.chartSeries[seriesIndex].data.findIndex(ele => ele == value);
        if (colorInd == 0) {
          return '#00E938'
        } else if (colorInd == 1) {
          return '#00C6E7'
        } else {
          return '#FA3E00'
        }
      }],
    stroke: {
      width: 2,
      fill: '#ffffff'
    },
    // title: {
    //   text: 'Compare Sales Strategy'
    // },
    xaxis: {
      labels: {
        show: true,
        // rotate: -45,
        // rotateAlways: true,
        // hideOverlappingLabels: false,
        showDuplicates: false,
        trim: true, color: '#ffffff',
        minHeight: undefined,
        width: 50,
        maxWidth: 50,
        maxHeight: 120,

        style: {
          //colors: 'red',
          // fontSize:'7px',
          with: '100px',
          color: '#ffffff',
          wordWrap: 'break-word',
          fontWeight: 400,
          // cssClass: 'apexcharts-xaxis-label',
        },
      },
      categories: ['High', 'Medium', 'Low'],
    },
    yaxis: {

      title: {
        text: undefined
      },
    },
    tooltip: {
      shared: false,
      y: {
        formatter: function (val) {
          return val + "K"
        }
      }
    },
    // fill: {
    //   type: 'pattern',
    //   opacity: 1,
    //   pattern: {
    //     style: ['circles', 'verticalLines', 'slantedLines', 'horizontalLines'], // string or array of strings

    //   }
    // },
    states: {
      hover: {
        filter: 'none'
      }
    },
    legend: {
      position: 'right',
      offsetY: 40
    },


  }





  const sentimentResultColumns = sentimentResultColumnsData;
  const sentimentResultRows = sentimentResultRowsData;

  const contactLevelColumns = [
    {
      field: "id",
      headerName: "ID",
      width: 100,
      editable: true,
    },
    {
      field: "name",
      headerName: "Name",
      width: 350,
      editable: true,
    },
    {
      field: "sentiment",
      headerName: "Sentiment",
      width: 350,
      editable: true,
    },
    {
      field: "topicBasedSentiment",
      headerName: "Topic-Based Sentiment",
      sortable: false,
      width: 350,
    },
    {
      field: "churnAnalysis",
      headerName: "Churn Analysis",
      sortable: false,
      width: 250,
      renderCell: (params) => (
        <div className="chips-status">
          <span className={params.row.churnStatusclass}>
            {params.row.churnAnalysis}
          </span>
        </div>
      ),
    },
  ];

  const correspondenceRateData = [
    {
      field: "attribute",
      headerName: "Attribute",
      sortable: false,
      width: 250,
      renderCell: (params) => (
        <div className="chips-status">
          <span className={params.row.status}>{params.row.attribute}</span>
        </div>
      ),
    },
    {
      field: "score1",
      headerName: "Score 1",
      width: 350,
      editable: true,
    },
    {
      field: "score2",
      headerName: "Score 2",
      width: 350,
      editable: true,
    },
    {
      field: "score3",
      headerName: "Score 3",
      sortable: false,
      width: 350,
    },
  ];

  const churnRateColumns = [
    {
      field: "name",
      headerName: "Name",
      width: 350,
      editable: true,
    },
    {
      field: "gender",
      headerName: "Gender",
      width: 200,
      editable: true,
    },
    {
      field: "age",
      headerName: "Age",
      width: 200,
      editable: true,
    },
    {
      field: "score",
      headerName: "Score",
      sortable: false,
      width: 200,
    },
    {
      field: "category",
      headerName: "Category",
      sortable: false,
      width: 350,
      renderCell: (params) => (
        <div className="chips-status">
          <span className={params.row.status}>{params.row.category}</span>
        </div>
      ),
    },
  ];

  const contactLevelRows = contactLevelRowsData;

  const selectpanelBox = (row) => {
    setIsSelectedPanel(row);
  };

  const hidePositiveSatisfaction = (ev, isHide) => {
    ev.stopPropagation();
    setIsHidePositiveSatisfaction(isHide);
  };
  // WHERE 'column_name' = 'D'"
  const getFilteredResult = (wherequery) => {
    setIsselectedGridBox(wherequery);
    getSatisfactionResult(
      positiveSatisfactionTable,
      wherequery,
      isHubspotMerge,
      listOfColumnAthena
    );
  };

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
          let csCol = (gridGridColumns.filter(ele => queryList.indexOf(ele.field) != -1));
          let npsCols = (gridGridColumnswithoutHubspot.filter(ele => queryList.indexOf(ele.field) != -1));
          setpositiveSatisfactionResult({
            filterdRow: newArrr1,
            filterdCol: hubspotMergeStatus
              ? csCol : npsCols,
          });

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
        project_name: resultData.project_name,
        user_id: resultData.user_id,
        template: resultData.template,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success === true && res.data.length != 0) {
          let mappingResult = res.data[res.data.length - 1].analysis_result;
          let mappingCrossTab = res.data[res.data.length - 1].cross_tab;
          let mappingInsight = res.data[res.data.length - 1].generative_insights;
          if (mappingCrossTab != undefined) {
            let mappingCrossTabQuestion = Object.keys(Object.assign({}, ...mappingCrossTab));
            let newMappingCorssObj = mappingCrossTabQuestion.map((ele, ind) => ({ tableHeader: [ele, "Respondent"], tableRow: (Object.entries(mappingCrossTab[ind][ele])) }));
            setMappingCrossTabQuestion(newMappingCorssObj)
          }

          if (mappingInsight != undefined) {
            setGenerativeInsights(mappingInsight);
          }

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

          //////for time series/////////
          if (mappingResult.timeseries != undefined && mappingResult.timeseries != "null") {
            let tmpTimeSeriesData1 = mappingResult.timeseries == undefined ? [] : Object.values(mappingResult.timeseries);
            let tmpTimeSeriesData = [];
            let newTimeKey = tmpTimeSeriesData1.length == 0 ? [] : (Object.keys(tmpTimeSeriesData1[0].data));
            tmpTimeSeriesData1.forEach(ele => {
              let newData = {}
              newTimeKey.forEach(el => {
                let timeSt = [];
                let timeVal = []
                ele.data[el].values.forEach((eel1, ind) => {
                  if (eel1 != null) {
                    timeVal.push(eel1)
                    timeSt.push(ele.data[el].timestamp[ind])
                  }
                })
                newData[el] = { timestamp: timeSt, values: timeVal }
              })
              tmpTimeSeriesData.push({ data: newData, label: ele.label });
            })
            let newOption = newTimeKey.map(ele => ({ name: ele.charAt(0).toUpperCase() + ele.slice(1), value: ele }))
            let tmpSeriesData = [];
            // let nullInd = []  .map(elenotNull=>elenotNull!=null)
            tmpTimeSeriesData.forEach(ele => {
              tmpSeriesData.push({ name: ele.label, data: (ele.data[newTimeKey[0]].values) })
            })

            let newTimeSeriesDataObj = {
              chartSeries: tmpSeriesData,
              labels: tmpTimeSeriesData[0].data[newTimeKey[0]].timestamp,
              originalData: tmpTimeSeriesData,
              selectedTimeSeriesCat: tmpTimeSeriesData.map(ele => ele.label),
              selectedTimeSeriesTime: newTimeKey[0],
              selectedTimeSeriesTimeOption: newOption
            }
            settimeSeriesData(newTimeSeriesDataObj);
          }
          //////for time series/////////

          if (resultData.template == "Net Promoter Score" && resultData.template != 'null') {
            setsatisfactionResultResult({
              overall: 0,
              positive: mappingResult.overall_satisfaction.positive,
              negative: mappingResult.overall_satisfaction.negative,
              neutral: mappingResult.overall_satisfaction.neutral,
            });
          } else {
            setsatisfactionResultResult({
              overall:
                mappingResult.overall_satisfaction.overall == undefined
                  ? 0
                  : mappingResult.overall_satisfaction.overall.toFixed(2),
              positive: mappingResult.overall_satisfaction.positive.toFixed(2),
              negative: mappingResult.overall_satisfaction.negative.toFixed(2),
              neutral: mappingResult.overall_satisfaction.neutral.toFixed(2),
            });
          }

          let newTopic = Object.keys(mappingResult.topic_sentiment);
          let newTopic1 = newTopic.map((ele) => ({
            topic: ele.split("_").join(" "),
            positive: mappingResult.topic_sentiment[ele].positive,
            neutral: mappingResult.topic_sentiment[ele].neutral,
            negative: mappingResult.topic_sentiment[ele].negative,
          }));
          settopicSentimentResult1(newTopic1);

          settopicSentimentLabel(newTopic);

          //////for Regression/////////
          if (mappingResult.regression != undefined && mappingResult.regression != "null") {
            let withoutoverAllTrust = { ...mappingResult.regression };
            let listOfCategory = Object.keys(withoutoverAllTrust);
            let selectedChartData1 = { ...withoutoverAllTrust };
            let selectedChartData = selectedChartData1[listOfCategory[0]];
            const cloneselectedChartData = (({ overall, ...o }) => o)(selectedChartData);
            let newAllTrustLable = Object.keys(cloneselectedChartData);
            let newAllTrustValue = Object.values(cloneselectedChartData); 
let maxValue  = newAllTrustValue.reduce((a, b) => Math.max(a, b), -Infinity); 
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

          if (mappingResult.word_cloud != undefined && mappingResult.word_cloud != "null") {
            let withoutoverAllChurnData = { ...mappingResult.word_cloud };
            let listOfCategory = Object.keys(withoutoverAllChurnData);
            let selectedChartData1 = { ...withoutoverAllChurnData };
            let overAll = listOfCategory.filter(ele => ele == "Overall")
            let selectedChartData = selectedChartData1[overAll == 0 ? listOfCategory[0] : listOfCategory.filter(ele => ele == "Overall")];
            // let sortedLabel = selectedChartData.data.sort((a, b) => parseFloat(a) - parseFloat(b));
            let chartData = selectedChartData.labels.map((ele, ind) => ({ text: ele, value: selectedChartData.data[ind], color: (selectedChartData.color == undefined ? "#000" : selectedChartData.color[ind]), responseIds: (selectedChartData.response_id == undefined ? [] : selectedChartData.response_id[ind]) }))
            let chartData1 = (chartData.sort((a, b) => parseFloat(b.value) - parseFloat(a.value))).slice(0, 20)
            console.log(chartData1)
            
            setChurnRate({
              chartSeries: chartData1,
              labels: listOfCategory,
              originalData: withoutoverAllChurnData,
              selectedChurnCat: (overAll == 0 ? listOfCategory[0] : listOfCategory.filter(ele => ele == "Overall"))
            });

          }

          //////for Churn/////////

          //////for Demographic/////////
          if (mappingResult.demographics != undefined && mappingResult.demographics != "null") {
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
              selectedCat: newDemographicDataLable[0]
            });
          }

          if (mappingResult.pie_chart != undefined && mappingResult.pie_chart != 'null') {
            let listOfCategory = Object.keys(mappingResult.pie_chart);
            let listOfCategoryData = mappingResult.pie_chart[listOfCategory[0]];
            setdemographicsResult({
              chartSeries: listOfCategoryData.series,
              labels: listOfCategoryData.labels,
              chartData: mappingResult.pie_chart,
              categoriesList: listOfCategory,
              selectedCat: listOfCategory[0]
            });
          }
          //////for Demographic/////////

          if (mappingResult.category_revenue != undefined && mappingResult.category_revenue != "null") {
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

          setpositiveSatisfactionTable(mappingResult.positive_satisfaction_db_tbl);
          setisHubspotMerge(res.data[res.data.length - 1].hubspot_merged_status);
          setlistOfColumnAthena(mappingResult.query_list);

          getSatisfactionResult(
            mappingResult.positive_satisfaction_db_tbl,
            null,
            res.data[res.data.length - 1].hubspot_merged_status,
            mappingResult.query_list
          );
        } else {
          // setToastObject({
          //   message: t(`${res.message}`),
          //   severity: "error",
          //   open: true,
          // });
        }
      });
  };

  // const getFilteredResult = (wherequery) => {
  //   setIsselectedGridBox(wherequery);
  //   getSatisfactionResult(positiveSatisfactionTable, wherequery);

  // };

  // const getSatisfactionResult = async (tableDetails, wherequery) => {
  //   let newTableDetail = tableDetails.split(".");
  //   setLoaderShow(true);
  //   await axios
  //     .post(`${process.env.REACT_APP_API_URL}/survey/getSurveyAthena`, {
  //       databaseName: newTableDetail[0],
  //       query:
  //         "SELECT name, sat_category, average_purchase_value,purchase_frequency , cart_drop_rate , topics , age,  gender, churn_risk,pc1, pc2,mean,  cluster, email FROM " +
  //         newTableDetail[1],
  //       whereQuery: wherequery
  //     })
  //     .then((response1) => {
  //       setLoaderShow(false);
  //       if (response1.data.success) {

  //         let newArrr1 = response1.data.data.map((ele, ind) => ({
  //           ...ele,
  //           id: ind + 1,
  //           newTopics: ele.topics,
  //         }));
  //         // setpositiveSatisfactionResult({
  //         //   filterdRow: newArrr1,
  //         //   filterdCol: gridGridColumns,
  //         // });

  //         if (wherequery == null) {
  //           let getAllCluster = response1.data.data.map(ele => ele.cluster);
  //           const listAllCluster = [...new Set(getAllCluster)];
  //           const seriesData = [];
  //           listAllCluster.forEach(ele => {
  //             let matchedCluster = {
  //               name: ele,
  //               data: response1.data.data.filter(
  //                 (ele1) => ele1.cluster == ele
  //               ).map(ele2 => ([parseFloat(ele2.mean).toFixed(3), parseFloat(ele2.pc2).toFixed(3)])),
  //             }
  //             seriesData.push(matchedCluster);
  //           })

  //           const seriesData1 = [];
  //           listAllCluster.forEach(ele => {
  //             let matchedCluster = {
  //               name: ele,
  //               data: response1.data.data.filter(
  //                 (ele1) => ele1.cluster == ele
  //               ).map(ele2 => ({ "average_purchase_value": ele2.average_purchase_value, "purchase_frequency": ele2.purchase_frequency, "mean": ele2.mean, "pc1": parseFloat(ele2.pc1).toFixed(3), "pc2": parseFloat(ele2.pc2).toFixed(3) })),
  //             }
  //             seriesData1.push(matchedCluster);
  //           })

  //           setCorrespondenceAnalysis({
  //             chartSeries: seriesData,
  //             labels: [],
  //             overall: "",
  //             gridData: [],
  //             gridDataCols: [],
  //             tootltipProp: seriesData1
  //           });
  //         }
  //       } else {
  //         //  setToastObject({
  //         //     message: t(`${res.message}`),
  //         //     severity: "error",
  //         //     open: true,
  //         //   });
  //       }

  //     })
  //     .catch((err) => { });
  // };



  // const fetchSurveyResult = () => {
  //   fetch(`${process.env.REACT_APP_API_URL}/survey/viewResult`, {
  //     method: "POST",
  //     credentials: "include",
  //     headers: {
  //       "Content-type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       project_name: resultData.project_name,
  //       user_id: resultData.user_id,
  //       template: resultData.template,
  //     }),
  //   })
  //     .then((res) => res.json())
  //     .then((res) => {
  //       console.log("resultttoooooooooo", res);
  //       // setLoderVisual(false)
  //       if (res.success === true && res.data.length != 0) {
  //         let mappingResult = res.data[res.data.length - 1].analysis_result;
  //         let mappingCrossTab = res.data[res.data.length - 1].cross_tab;
  //         let mappingInsight = res.data[res.data.length - 1].generative_insights;
  //         if (mappingCrossTab != undefined) {
  //           let mappingCrossTabQuestion = Object.keys(Object.assign({}, ...mappingCrossTab));
  //           let newMappingCorssObj = mappingCrossTabQuestion.map((ele, ind) => ({ tableHeader: [ele, "Respondent"], tableRow: (Object.entries(mappingCrossTab[ind][ele])) }));
  //           setMappingCrossTabQuestion(newMappingCorssObj)
  //         }

  //         if (mappingInsight != undefined) {
  //           setGenerativeInsights(mappingInsight);
  //         }


  //       } else {
  //         // setToastObject({
  //         //   message: t(`${res.message}`),
  //         //   severity: "error",
  //         //   open: true,
  //         // });
  //       }
  //     });
  // };

  const seriescc = () => [44, 55, 13, 43, 22];



  const chartenlarge = (selectChart) => {
    if (selectChart == "companyC") {
      setIschartHalf(12);
      setIschartBoxHeight(600);
      setIschartHeight(600);
      setIshideButton("d-block");
      setIsshowButton("d-none");
      setIschartFontSize("12px")
    }
    else if (selectChart == "companyTM") {
      setIschartHalfTM(12);
      setIschartBoxHeightTM(600);
      setIschartHeightTM(600);
      setIshideButtonTM("d-block");
      setIsshowButtonTM("d-none");
      setIschartOne("d-none");
      setIschartOneCopy("d-block");
      setIschartFontSize("12px")
    }
    else if (selectChart == "companyCR") {
      setIschartHalfCR(12);
      setIschartBoxHeightCR(600);
      setIschartHeightCR(600);
      setIshideButtonCR("d-block");
      setIsshowButtonCR("d-none");
    } else if (selectChart == "companyPC") {
      setIschartHalfPC(12);
      setIschartFontSize("12px")
      setIschartBoxHeightPC(600);
      setIschartHeightPC(600);
      setIshideButtonPC("d-block");
      setIsshowButtonPC("d-none");
      setIschartThree("d-none");
      setIschartThreeCopy("d-block");
    }
  };

  const closeenlarge = (selectChart) => {
    if (selectChart == "companyC") {
      setIschartHalf(4);
      setIschartBoxHeight(350);
      setIschartHeight(250);
      setIshideButton("d-none");
      setIsshowButton("d-blok");
      setIschartFontSize("7px")
    } else if (selectChart == "companyTM") {
      setIschartHalfTM(4);
      setIschartBoxHeightTM(250);
      setIschartHeightTM(250);
      setIshideButtonTM("d-none");
      setIsshowButtonTM("d-blok");
      setIschartOne("d-block");
      setIschartOneCopy("d-none"); setIschartFontSize("7px")
    } else if (selectChart == "companyCR") {
      setIschartHalfCR(4);
      setIschartBoxHeightCR(250);
      setIschartHeightCR(250);
      setIshideButtonCR("d-none");
      setIsshowButtonCR("d-blok"); setIschartFontSize("7px")
    } else if (selectChart == "companyPC") {
      setIschartHalfPC(4); setIschartFontSize("7px")
      setIschartBoxHeightPC(250);
      setIschartHeightPC(250);
      setIshideButtonPC("d-none");
      setIsshowButtonPC("d-blok");
      setIschartThree("d-block");
      setIschartThreeCopy("d-none");
    }
  };


  useEffect(() => {
    fetchSurveyResult();
  }, []);

  useEffect(() => {
    // if(isFilteredCluster.xmin!=null){
    //   getFilteredResult(` WHERE CAST(mean as DOUBLE) BETWEEN ${isFilteredCluster.xmin} AND ${isFilteredCluster.xmax} AND CAST(pc2 as DOUBLE) BETWEEN ${isFilteredCluster.ymin} AND ${isFilteredCluster.ymax}`);
    // }
  }, [isFilteredCluster]);

  useEffect(() => {
    if (isFilteredChurn != "") {
      getFilteredResult(" WHERE churn_risk = " + "'" + isFilteredChurn + "'");
    }
  }, [isFilteredChurn]);

  const hideDataTable = (e) => {
    setDataTable(!dataTable);
  }


  const openFilterBox = (e, dialogHeader) => {
    e.stopPropagation();
    setfilterBox(true);
    setfilterPopup({
      xPosition: (e.pageX - (dialogHeader == "Dashboard" ? 250 : 200)),
      yPosition: (e.pageY + 10),
    })
    setfilterForBoxString(dialogHeader)
  };



  const openSegmentaionDialogBox = (e, dialogHeader) => {
    e.stopPropagation();
    setopenSegmentation(true);
    setfilterPopup({
      xPosition: (e.pageX - (dialogHeader == "Dashboard" ? 250 : 200)),
      yPosition: (e.pageY + 10),
    })
    setfilterForBoxString(dialogHeader)

  };

  const closeSegmentaionDialogBox = () => {
    setopenSegmentation(false);
  };

  const openInsightDialogBox = (e, dialogHeader) => {
    e.stopPropagation();
    setopenInsight(true);
    setfilterPopup({
      xPosition: (e.pageX - (dialogHeader == "Dashboard" ? 250 : 200)),
      yPosition: (e.pageY + 10),
    })
    setfilterForBoxString(dialogHeader)

    if (generativeInsights == "" || generativeInsights=="null") {
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
          // setLoderVisual(false)
          if (res.success === true && res.data.length != 0) {
            // let mappingCrossTab = res.data[res.data.length - 1].cross_tab;
            let mappingInsight = res.data[res.data.length - 1].generative_insights;
            // if (mappingCrossTab != undefined) {
            //   let mappingCrossTabQuestion = Object.keys(Object.assign({}, ...mappingCrossTab));
            //   let newMappingCorssObj = mappingCrossTabQuestion.map((ele, ind) => ({ tableHeader: [ele, "Respondent"], tableRow: (Object.entries(mappingCrossTab[ind][ele])) }));
            //   setMappingCrossTabQuestion(newMappingCorssObj)
            // }
  
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

  const handleSelectSegmentOption = (ev, questionName, Options) => {
    let tmpselectedSegmentationOption = { ...selectedSegmentationOption }
    if (ev.target.checked) {
      if (tmpselectedSegmentationOption[questionName] == undefined) {
        tmpselectedSegmentationOption[questionName] = [Options]
      } else {
        let newtmpVal = tmpselectedSegmentationOption[questionName];
        newtmpVal.push(Options);
        tmpselectedSegmentationOption[questionName] = newtmpVal;
      }
    } else {
      let newtmpVal = tmpselectedSegmentationOption[questionName];
      newtmpVal.splice(Options, 1)
      if (newtmpVal.length == 0) {
        delete tmpselectedSegmentationOption[questionName];
      } else {
        tmpselectedSegmentationOption[questionName] = newtmpVal
      }
    }
    setselectedSegmentationOption(tmpselectedSegmentationOption);
  };

  const handleubmitSegmentOptionFilter = (ev) => {
    setLoaderShowSegmentation(true);
    let newObj = {
      "project_name": resultData.project_name,
      "project_id": resultData._id,
      "user_id": resultData.user_id,
      "template": resultData.template,
      "mapping_json": resultData.mapping_json,
      "segments": selectedSegmentationOption,
    }

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
          setMappingCrossTabQuestion(res.data.crosstab);
          let tmpMappingObj = {}
          res.data.mapping_list.forEach(ele => {
            tmpMappingObj[ele.tab_name] = ele.ques;
          })
          setMappingListCrossTab(tmpMappingObj);
          let tmpsegmentationCategoryMapping = res.data.mapping_list;
          tmpsegmentationCategoryMapping.push({ ques: 'Overall Response', tab_name: 'Overall Response' })
          setsegmentationCategoryMapping(tmpsegmentationCategoryMapping);

          setIsCreateOpenSegmentation(false)
          setLoaderShowSegmentation(false);
        }

      });
  }


  return (
    <div className="section-green result-pages">
      <div className="float-right">
        {/* {
          generativeInsights != "" && generativeInsights != "null" && */}
        <Button
          sx={{ mb: 1, mr: 1, }}
          size="small"
          color="primary"
          variant="outlined"
          onClick={(e) => openInsightDialogBox(e, "Dashboard")}
        >
          <img src={InsightIcons} alt="Insight" className="mr-2" />
          Insight
        </Button>
        {/* } */}
        {
          mappingCrossTabQuestion.length != 0 &&
          <Button
            sx={{ mb: 1, mr: 1, }}
            size="small"
            color="primary"
            variant="outlined"
            onClick={(e) => openSegmentaionDialogBox(e, "Dashboard")}
          >
            <img src={SegmentationIcons} alt="Insight" className="mr-2" />
            Segmentation
          </Button>
        }
        <Button
          sx={{ mb: 1 }}
          size="small"
          color="primary"
          variant="outlined"
          onClick={(e) => hideFilterBox(e)}
        >
          {" "}
          <i className="fa fa-filter"></i>
          <i
            className={
              filterBox
                ? "fa fa-long-arrow-up mr-2"
                : "fa fa-long-arrow-down  mr-2"
            }
          ></i>{" "}
          Filter{" "}
        </Button>
        <Button
          sx={{ mb: 1 }}
          size="small"
          color="primary"
          variant="outlined"
          onClick={(e) => hideDataTable(e)}
          className="ml-2"
        >
          {" "}
          <i
            className={dataTable ? "fa fa-indent mr-2" : "fa fa-dedent  mr-2"}
          ></i>{" "}
          Table{" "}
        </Button>
      </div>
      <div className="clearfix"></div>

      {/* ------------filter box ------------ */}
      {filterBox ? (
        <>
          <div className="filterBox">
            <a onClick={(e) => closeFilterBox(e)} className='fa fa-close float-right'></a>
            <h4 className="m-0"><i className="fa fa-filter"> </i> Filter Dashboard</h4>

            <label>Survey Filter</label>
            <FormControl sx={{ mt: 0.5, mb: 1, minWidth: "100%" }}>
              {/* <InputLabel id="survey-filter">Survey Filter</InputLabel> */}
              <Select
                labelId="survey-filter"
                id="survey-filter"
                multiple
                value={surveyNames}
              // input={<OutlinedInput label="Survey Filter" />}
              >
                {surveyNamesList.map((item, i) => (
                  <MenuItem key={item.value} value={item.value}>
                    <Checkbox />
                    <ListItemText primary={item.name} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <label>Time frame</label>
            <FormControl sx={{ mt: 0.5, mb: 2, minWidth: "100%" }}>
              {/* <InputLabel id="time-frame">Time frame</InputLabel> */}
              <Select
                labelId="time-frame"
                id="time-frame"
                multiple
                value={surveyNames}
              // input={<OutlinedInput label="Time frame" />}
              >
                {timeframeList.map((item, i) => (
                  <MenuItem key={item.value} value={item.value}>
                    <Checkbox />
                    <ListItemText primary={item.name} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <br />
            <LocalizationProvider
              dateAdapter={AdapterDateFns}
              sx={{ mt: 2, minWidth: "100%" }}
            >
              <DateRangePicker
                disablePast
                value={value}
                maxDate={getWeeksAfter(value[0], 4)}
                onChange={(newValue) => {
                  setValue(newValue);
                }}
                renderInput={(startProps, endProps) => (
                  <React.Fragment>
                    <TextField {...startProps} />
                    <Box sx={{ mx: 2 }}> to </Box>
                    <TextField {...endProps} />
                  </React.Fragment>
                )}
              />
            </LocalizationProvider>
          </div>
        </>
      ) : (
        <> </>
      )}
      <Popover
        open={openSegmentation}
        close={(e) => closeSegmentaionDialogBox()}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        style={{ "left": 0, "top": filterPopup.yPosition, overflow: "scroll", width: '100%' }}
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
          </Button>
          {
            isCreateOpenSegmentation &&
            <Card style={{ position: 'absolute' }}>
              <Button
                size="small"
                color="primary"
                variant="outlined"
                className="float-right"
                style={{ margin: '5px', }}
                onClick={(e) => setIsCreateOpenSegmentation(false)}
              >
                <i className="fa fa-close mr-2"></i>
                Close
              </Button>
              <CardHeader title={"All Survey Question"}>
              </CardHeader>
              <CardContent style={{ height: '60vh', overflow: 'auto' }}>
                {mappingCrossTabQuestion.map((item, i) =>
                (
                  <>
                    {
                      item.tableHeader.map((itemHeader, ii) => (
                        <>
                          {ii == 0 &&
                            <Accordion className="accodion-style">
                              <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls={"panel" + i + "-content"}
                                id={"panel" + i + "-header"}
                              >
                                {i + 1}. {itemHeader}
                              </AccordionSummary>
                              <AccordionDetails>
                                {
                                  item.tableRow.map((itemBody, ind1) => (
                                    <>
                                      {
                                        itemBody.map((itemBodydata, iii) => (
                                          <>
                                            {
                                              iii == 0 &&
                                              <div className="checkbox-list"><Checkbox checked={selectedSegmentationOption[itemHeader] != undefined && (selectedSegmentationOption[itemHeader]).indexOf(itemBodydata) != -1 ? true : false} onChange={(event) => { handleSelectSegmentOption(event, itemHeader, itemBodydata) }} /> {itemBodydata}</div>
                                            }
                                          </>
                                        ))
                                      }
                                    </>
                                  ))
                                }

                              </AccordionDetails>
                            </Accordion>
                          }
                        </>
                      ))
                    }
                  </>
                ))}
              </CardContent>
              <Button disabled={true}>{((Object.values(selectedSegmentationOption)).flat()).length} Selected</Button> 

              {showLoderSegmentation ? <>  <CircularProgress size="1.5rem" className="float-right m-2" /> </> : <> <Button
                size="small"
                color="primary"
                variant="contained"
                className="float-right"
                disabled={Object.keys(selectedSegmentationOption).length <= 0}
                style={{ margin: '5px', }}
                onClick={(e) => handleubmitSegmentOptionFilter()}
              >
                Save
              </Button> </>}

            </Card>
          }  <Button
            size="small"
            color="primary"
            variant="outlined"
            className="float-right"
            onClick={(e) => closeSegmentaionDialogBox()}
          >
            <i className="fa fa-close mr-2"></i>
            Close
          </Button>
          <div style={{ width: "100%", height: "70vh", overflow: 'auto' }} >
            {mappingCrossTabQuestion.map((item, ind2) => (
              <>

                <table align='left' width={'100%'} className="segmentation-table" cellspacing='0' cellpadding='0' >

                  <tr className="table-head">
                    {
                      ind2 == 0 &&
                      segmentationCategoryMapping.map((tableTopHeader, catInd) => (
                        <>
                          {
                            catInd == 0 &&
                            <th></th>
                          }
                          <th style={{ textAlign: "center", background: '#0355F9', borderRight: ' #fff solid 2px', color: '#ffffff' }} title={tableTopHeader.ques}  >{tableTopHeader.tab_name.split("\n")[0]}</th>

                        </>
                      ))
                    }

                  </tr>

                  <tbody>
                    <tr className="table-head">
                      {
                        item.tableHeader.map((itemHeader, i) => (
                          <th width={i != 0 ? 250 : 'auto'} title={i != 0 && itemHeader != "Respondent" ? mappingListCrossTab[itemHeader] : ""} style={{ "text-align": i == 0 ? `left` : "center" }}> {i == 0 ? `${ind2 + 1}.` : ""} <b>{i != 0 && itemHeader != "Respondent" ? itemHeader.split("\n")[1] : itemHeader}</b></th>
                        ))
                      }
                    </tr>
                    {
                      item.tableRow.map((itemBody, iii) => (
                        <tr>
                          {
                            itemBody.map((itemBodydata, ii) => (
                              <td width={ii != 0 ? 250 : 'auto'} style={{ "text-align": ii == 0 ? `left` : "center" }}>{itemBodydata}</td>
                            ))
                          }
                        </tr>
                      ))
                    }
                  </tbody>
                </table>
              </>
            ))}
          </div>
        </div>

      </Popover >

      <Popover
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
            <h2 className="float-left m-0"><img src="/json-media/img/convertmlLogoicon.png" alt='convertml'  width={40} className="float-left mr-2" />Dashboard Insight</h2>
        <Button
          size="small"
          color="primary"
          variant="outlined"
          className="float-right"
          onClick={(e) => closeInsightDialogBox()}
        >
          <i className="fa fa-close mr-2"></i>
          Close
        </Button><br/><div className='clearfix'></div>
        <h4 className="text-grey">Some Key takeaways from this dashboard insights</h4>
        {/* <div style={{ width: "100%", height: "70vh", overflow: 'auto' }} ></div> */}
        <div className="filterBox" style={{ width: "100%", height: "70vh", overflow: 'auto' }} dangerouslySetInnerHTML={
          { __html: (generativeInsights=="" || generativeInsights=="null"?"Data insights is being generated, Try again in sometime to view the results": generativeInsights)}
        }>
        </div></div>
      </Popover>


      {/* ------------filter box ------------ */}

      <div className="splitter-container">
        <SplitterLayout
          primaryIndex={1}
          secondaryInitialSize={65}
          percentage
          primaryMinSize={20}
          secondaryMinSize={50}
        >
          <div className="pl-2 pr-2">
            <Box sx={{ height: "63vh", width: "100%" }}>
              <div className="total-countlist">
                {kpiResult.map((item, i) => (
                  <div className="custom-card" key={i}>
                    <>
                      <CardContent className="cardContent">
                        <span className="capitalize small-text mr-1">
                          {item.displayName}
                        </span>
                        <Tooltip title={'Count of unique Email IDs ingested from Hubspots.'}>
                          <i className="fa fa-info-circle icon-size"></i>
                        </Tooltip>
                        <br />
                        <img src={item.imgName} alt='convertml' />
                        <span className="count-number">  {item.count}    </span>
                      </CardContent>
                    </>

                  </div>
                ))}
              </div>
              <Grid container spacing={1}>
                <Grid item xs={4}>
                  <Card className="cardBox pb-2">
                    <CardContent>
                      <h3 className="float-left mr-2">Sentiment By Topic </h3>
                      <Tooltip title={"This chart gives a breakdown of count Positive, Negative and Neutral sentiments at a topic level. This would help in drilling down to specific subset of respondents and taking the necessary actions to address their concerns."}>
                        <i className="fa fa-info-circle icon-size"></i>
                      </Tooltip>
                      <Box
                        sx={{ height: 260, width: "100%" }}
                      > <br />
                        <section className="custom-chart" style={{ height: 260 }}>
                        {topicSentimentResult1.map((baritem) => (
                            <>
                              <label title={baritem.topic}>{baritem.topic}</label>
                              <div className="bars">
                                <div
                                  className="promoter"
                                  style={{ width: baritem.positive + "%" }}
                                >
                                  <span>{baritem.positive + "%"}</span>
                                </div>
                                <div
                                  className="passive"
                                  style={{ width: baritem.neutral + "%" }}
                                >
                                  <span>{baritem.neutral + "%"}</span>
                                </div>
                                <div
                                  className="detractor"
                                  style={{ width: baritem.negative + "%" }}
                                >
                                  <span>{baritem.negative + "%"}</span>
                                </div>
                              </div>
                            </>
                          ))}
                          {/* {sentimentByTopicData.map((baritem) => (
                            <>
                              <label>{baritem.label}</label>
                              <div className="bars">
                                <div className="promoter" style={{ width: baritem.promoter + '%' }}><span>{baritem.promoter + '%'}</span></div>
                                <div className="passive" style={{ width: baritem.passive + '%' }}><span>{baritem.passive + '%'}</span></div>
                                <div className="detractor" style={{ width: baritem.detractor + '%' }}><span>{baritem.detractor + '%'}</span></div>
                              </div>
                            </>
                          ))} */}
                        </section><br /><br />
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>

                {demographicsResult.chartSeries.length != 0 ? <>
                  <Grid item xs={4} >
                    <Card className="cardBox">
                      <CardContent>
                        <h3 title={`${demographicsResult.selectedCat}`}>{demographicsResult.selectedCat}</h3>
                        <div className="result-toolbar">
                          <Tooltip
                            title={
                              "Get granular-level insights into your customers by segmenting them by age, gender, region, and other demographic variables."
                            }
                          >
                            <i className="fa fa-info-circle icon-size"></i>
                          </Tooltip>
                          <a onClick={(e) => openFilterBox(e, "Demography")}>
                            <i className="fa fa-filter"></i>
                          </a>
                        </div><div className="clearfix"></div>
                        <Box
                          sx={{ height: 230, width: "100%", margin: "auto" }}
                        >
                          <div
                            id="chart122"
                            style={{ margin: "auto", width: "100%" }}
                          >
                            <Chart
                              height={230}
                              width={"100%"}
                              options={polarAreachartOptions}
                              series={demographicsResult.chartSeries}
                              type="polarArea"
                            />
                          </div>
                        </Box>
                      </CardContent></Card></Grid></> : null}
                {/* <Grid item xs={4}>
                  <Card className="cardBox">
                    <CardContent>
                      <h3 className="float-left mr-2">Demography: Age Range </h3>
                      <Tooltip title={"Get granular-level insights into your customers by segmenting them by age, gender, region, and other demographic variables."}>
                        <i className="fa fa-info-circle icon-size"></i>
                      </Tooltip>
                      <Box
                        sx={{ height: 260, }}
                      > <div id="chart122">
                          <Chart
                            height={260}
                            options={polarAreachartOptions}
                            series={demographicsResult.chartSeries}
                            type="polarArea"
                          />
                        </div>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid> */}
                <Grid item xs={chartHalfCR} className={chartThree}>
                  <Card className="cardBox">
                    <CardContent>
                      <h3 className="float-left mr-2" title="Clustering Analysis">
                        Clustering Analysis
                      </h3>
                      <div className="float-right">
                        <Tooltip title={"Clustering analysis in market analysis involves grouping survey responses based on shared characteristics or preferences, revealing distinct customer segments for targeted marketing strategies and product offerings. This method uncovers valuable insights for tailoring marketing efforts and enhancing customer satisfaction."}>
                          <i className="fa fa-info-circle icon-size mr-1"></i>
                        </Tooltip>
                        <a
                          className={
                            "fa fa-expand float-right mt-1 " + showButtonCR
                          }
                          onClick={(e) => chartenlarge("companyCR")}
                        ></a>
                        <a
                          className={
                            "fa fa-compress float-right mt-1 " + hideButtonCR
                          }
                          onClick={(e) => closeenlarge("companyCR")}
                        ></a>
                      </div>

                      <Box sx={{ height: chartBoxHeightCR, width: "100%" }}>
                        <div id="chart12b"><br />
                        <Chart
                            height={chartHeightCR}
                            options={chartOptions2}
                            series={correspondenceAnalysis.chartSeries}
                            type="scatter"
                          />
                          {/* <Chart
                            height={chartHeight}
                            width={"100%"}
                            options={clusteringAnalysisOptions}
                            series={clusteringAnalysis.chartSeries}
                            type="scatter"
                          /> */}
                        </div>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>



                <Grid item xs={chartHalfTM} className={chartTwo}>
                  <Card className="cardBox">
                    <CardContent>
                      <h3 className="float-left mr-2">
                        Word Cloud: Detractor
                      </h3>
                      <Tooltip title={"Word clouds visually represent the most frequently mentioned words in the customer feedback."}>
                        <i className="fa fa-info-circle icon-size"></i>
                      </Tooltip>
                      <a
                        className={
                          "fa fa-expand float-right mt-1 " + showButtonTM
                        }
                        onClick={(e) => chartenlarge("companyTM")}
                      ></a>
                      <a
                        className={
                          "fa fa-compress float-right mt-1 " + hideButtonTM
                        }
                        onClick={(e) => closeenlarge("companyTM")}
                      ></a>
                      <Box sx={{ height: chartBoxHeightTM, width: "100%" }}>
                        <ReactWordcloud
                          options={optionsWordCloud}
                          words={churnRateWcl.chartSeries}
                        />
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={chartHalf} className={chartOne}>
                  <Card className="cardBox">
                    <CardContent>
                      <h3 className="float-left mr-2">
                      Time Series 
                      </h3>
                      <Tooltip title={"This metric assesses the level of interest and value attributed to different topics that a potential customer is thinking of regarding your company."}>
                        <i className="fa fa-info-circle icon-size"></i>
                      </Tooltip>
                      <a
                        className={
                          "fa fa-expand float-right mt-1 " + showButton
                        }
                        onClick={(e) => chartenlarge("companyC")}
                      ></a>
                      <a
                        className={
                          "fa fa-compress float-right mt-1 " + hideButton
                        }
                        onClick={(e) => closeenlarge("companyC")}
                      ></a>

                      <Box sx={{ height: chartBoxHeight, width: "100%" }}>
                        <div id="chart11">
                        <Chart options={timeoptionsseries} series={timeChartseries} type="line" height={chartHeight} />
                        </div>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={chartHalf} className={chartOne}>
                  <Card className="cardBox">
                    <CardContent>
                      <h3 className="float-left mr-2">
                        Radar Graph
                      </h3>
                      <Tooltip title={"This metric assesses the level of interest and value attributed to different topics that a potential customer is thinking of regarding your company."}>
                        <i className="fa fa-info-circle icon-size"></i>
                      </Tooltip>
                      <a
                        className={
                          "fa fa-expand float-right mt-1 " + showButton
                        }
                        onClick={(e) => chartenlarge("companyC")}
                      ></a>
                      <a
                        className={
                          "fa fa-compress float-right mt-1 " + hideButton
                        }
                        onClick={(e) => closeenlarge("companyC")}
                      ></a>

                      <Box sx={{ height: chartBoxHeight, width: "100%" }}>
                        <div id="chart11">
                          <img src={NetPromoterScoreComingSoon} alt='convertml'  width={'100%'} />
                        </div>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={chartHalf} className={chartOne}>
                  <Card className="cardBox">
                    <CardContent>
                      <h3 className="float-left mr-2">
                        Popularity Comparison
                      </h3>
                      <Tooltip title={"This metric assesses the level of interest and value attributed to different topics that a potential customer is thinking of regarding your company."}>
                        <i className="fa fa-info-circle icon-size"></i>
                      </Tooltip>
                      <a
                        className={
                          "fa fa-expand float-right mt-1 " + showButton
                        }
                        onClick={(e) => chartenlarge("companyC")}
                      ></a>
                      <a
                        className={
                          "fa fa-compress float-right mt-1 " + hideButton
                        }
                        onClick={(e) => closeenlarge("companyC")}
                      ></a>

                      <Box sx={{ height: chartBoxHeight, width: "100%" }}>
                        <div id="chart11">
                          <img src={stackedBarChartsComingSoon} alt='convertml'  width={'100%'} />
                        </div>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={chartHalf} className={chartOne}>
                  <Card className="cardBox">
                    <CardContent>
                      <h3 className="float-left mr-2">
                        Spending Range
                      </h3>
                      <Tooltip title={"This metric assesses the level of interest and value attributed to different topics that a potential customer is thinking of regarding your company."}>
                        <i className="fa fa-info-circle icon-size"></i>
                      </Tooltip>
                      <a
                        className={
                          "fa fa-expand float-right mt-1 " + showButton
                        }
                        onClick={(e) => chartenlarge("companyC")}
                      ></a>
                      <a
                        className={
                          "fa fa-compress float-right mt-1 " + hideButton
                        }
                        onClick={(e) => closeenlarge("companyC")}
                      ></a>

                      <Box sx={{ height: chartBoxHeight, width: "100%" }}>
                        <div id="chart11">
                          <img src={HistogramsComingSoon} alt='convertml'  width={'100%'} />
                        </div>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>

              </Grid>
              <div className="clearfix"></div>
            </Box>
          </div>
          {dataTable &&
            (
              <div>
                <Box sx={{ height: "calc(100vh - 12em)", width: "99%", background: "#ffffff" }}>
                  {showLoder && (
                    <Box sx={{ textAlign: "center" }}>
                      <CircularProgress />
                    </Box>
                  )}
                  {!showLoder && (
                    <DataGridPro className="table"
                      sx={{
                        ".MuiDataGrid-cellContent": {
                          whiteSpace: "normal",
                          lineHeight: "normal",
                        },
                        "& .MuiDataGrid-columnHeaderTitle": {
                          whiteSpace: "normal",
                          lineHeight: "normal",
                        },
                        "& .MuiDataGrid-columnHeader": {
                          // Forced to use important since overriding inline styles
                          height: "unset !important",
                        },
                        "& .MuiDataGrid-columnHeaders": {
                          // Forced to use important since overriding inline styles
                          maxHeight: "250px !important",
                        },
                        "& .MuiDataGrid-cell--textRight": {
                          justifyContent: "flex-start",
                        },
                        "& .gridClasses.cell": {
                          padding: "2 0",
                        },
                        height: "calc(100vh - 12.5em)",
                      }}
                      rowHeight={40}
                      rows={positiveSatisfactionResult.filterdRow}
                      columns={positiveSatisfactionResult.filterdCol}
                      pageSizeOptions={[5, 10, 50, 100]}
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
                      pagination={false}
                      hideFooterRowCount={true}
                      hideFooter={true}
                      editable
                    />
                  )}
                </Box>
              </div>
            )
          }
        </SplitterLayout>
      </div>
    </div>
  );
}
