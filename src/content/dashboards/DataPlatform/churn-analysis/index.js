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
import overall_churn_rate from "../../../../assets/icons/overallChurnrate.svg";
import cltv from "../../../../assets/icons/cltv.svg";
import totalResponsePerceny from "../../../../assets/img/totalResponsePerceny.png";
import overall_impact_on_revenue from "../../../../assets/icons/overallImpactonRevenue.svg";
import nps from "../../../../assets/icons/nps.svg";




import { gridDataForGridRowData } from "../../../../assets/data/data";

function getWeeksAfter(date, amount) {
  return date ? addWeeks(date, amount) : undefined;
}

export default function ChurnAnalysisResult({ resultData }) {
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

  
  const [filterBox, setfilterBox] = useState(false);

  const [chartHalfCR, setIschartHalfCR] = useState(4);
  const [chartBoxHeightCR, setIschartBoxHeightCR] = useState(250);
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

  const handleChange = (e) => {
    const {
      target: { value },
    } = e;
    setsurveyNames(typeof value === "string" ? value.split(",") : value);
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

  const gridGridColumns = [
    {
      field: "name",
      headerName: "Name & Customer ID",
      flex: 1,
      minWidth: 100,
      editable: true,
      renderCell: (data) => {
        return (
          <div className="cell-template">
            <img src={userIcon}  alt='convertml' /> <br />
            <div className="float-left">{data.row.name} </div>
          </div>
        );
      },
    },
    {
      field: "sat_category",
      headerName: "Customer Satisfaction",
      flex: 1,
      minWidth: 100,
      editable: true,
      headerAlign: "left",
      renderCell: (data) => {
        return (
          <div className="cell-template ">
            {data.row.sat_category != undefined &&
              data.row.sat_category.toLowerCase() == "neutral" && (
                <>
                  <span className="medium">{data.row.sat_category}</span>
                </>
              )}
            {data.row.sat_category != undefined &&
              data.row.sat_category.toLowerCase() == "positive" && (
                <>
                  <span className="high">{data.row.sat_category}</span>
                </>
              )}
            {data.row.sat_category != undefined &&
              data.row.sat_category.toLowerCase() == "negative" && (
                <>
                  <span className="low">{data.row.sat_category}</span>
                </>
              )}
          </div>
        );
      },
    },
    {
      field: "purchase_frequency",
      headerName: "Purchase Frequency",
      flex: 1,
      minWidth: 60,
      editable: true,
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
      field: "newTopics",
      headerName: "Topics",
      flex: 1,
      minWidth: 250,
      editable: true,
      renderCell: (data) => {
        return (
          <div className="cell-template">
            {/* <span className={data.row.hightLightclass}> */}
            {/* {data.row.hightLighttext} */}
            {/* </span> */}
            {data.row.topics == undefined
              ? ""
              : data.row.topics.replace(/_/g, " ").replace(/'/g, "")}
            {/* .split("_").join(" ") */}
          </div>
        );
      },
    },
    {
      field: "age",
      headerName: "Age, Gender",
      flex: 1,
      minWidth: 100,
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
      minWidth: 100,
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

  const hideFilterBox = (e) => {
    setfilterBox(true);
  };

  const closeFilterBox = (e) => {
    setfilterBox(false);
  };

  const [isHidePositiveSatisfaction, setIsHidePositiveSatisfaction] =
    useState(true);
  const [companyConsidration, setCompanyConsidration] = useState({ 
    chartSeries: [{
      name: "0",
      data: [
      [-0.2, 0.1], [-0.1, 0.1], [0.3, 0.1], [0.2, -0.0], [0.4, 0.1]]
    },{
      name: "1",
      data: [
      [-0.3, 0.1], [0.4, 0.2], [0.2, 0.1], [0.2, 0.1], [0.1, 0.0]]
    } ],
    labels: [],
    overall: "",
    gridData: [],
    gridDataCols: [],
  });
  const [companyTrustMatrix, setCompanyTrustMatrix] = useState({
    chartSeries: [{  data: [10, 30, 50] }, ],
    labels: [],
    overall: "",
    gridData: [],
    gridDataCols: [],
  });

  const [correspondenceAnalysis, setCorrespondenceAnalysis] = useState({
    chartSeries:  [{
      name: 'High',
      type: 'column',
      data: [23, 11, 22, 27, 99,  ]
    }, {
      name: 'Medium',
      type: 'area',
      data: [44, 55, 41, 67, 100,   ]
    }, {
      name: 'Low',
      type: 'line',
      data: [75, 25, 36, 30, 45,   ]
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
      displayName:'Total Contacts', 
  },
  {
    label: 'overall_churn_rate',
    count: 5,
    displayName:'Overall Churn Rate', 
},
{
  label: 'cltv',
  count: 0,
  displayName:'CLTV', 
},
{
  label: 'nps_score',
  count: 0.76,
  displayName:'NPS Score', 
},
{
  label: 'overall_impact_on_revenue',
  count: 8,
  displayName:'Overall Impact On Revenue', 
}
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
      data: [44, 55, 41, 37, 22, 43, ]
    },
    {
      // name: resultData.template=="Net Promoter Score"?"Passive":"Neutral",
      // data: newNeutralList,
      name: 'Passive',
      data: [53, 32, 33, 52, 13, 43, ]
    },
    {
      // name: resultData.template=="Net Promoter Score"?"Detractor":"Negative",
      // data: newNegativeList,
      name: 'Detractor',
      data: [12, 17, 11, 9, 15, 11, ]
    },
  ]);

  const [positiveSatisfactionTable, setpositiveSatisfactionTable] =
    useState("");
  const [showLoder, setLoaderShow] = useState(false);

  const [topicSentimentLabel, settopicSentimentLabel] = useState([]);

  const [positiveSatisfactionResult, setpositiveSatisfactionResult] = useState({
    filterdRow: [
      { id: '001', name: 'Hanna',  churnStatus: 'high', engagementScore: '0.1', recencyFM:'L/L/L' },
      { id: '002', name: 'Giana Franci', churnStatus: 'medium', engagementScore: '3', recencyFM:'M/M/M' },
      { id: '003', name: 'Lydia', churnStatus: 'low', engagementScore: '8', recencyFM:'H/H/H' }, 
      { id: '004', name: 'Hanna',  churnStatus: 'high', engagementScore: '0.1', recencyFM:'L/L/L' },
      { id: '005', name: 'Giana Franci', churnStatus: 'medium', engagementScore: '3', recencyFM:'M/M/M' },
      { id: '006', name: 'Lydia', churnStatus: 'low', engagementScore: '8', recencyFM:'H/H/H' },
      { id: '007', name: 'Hanna',  churnStatus: 'high', engagementScore: '0.1', recencyFM:'L/L/L' },
      { id: '008', name: 'Giana Franci', churnStatus: 'medium', engagementScore: '3', recencyFM:'M/M/M' },
      { id: '009', name: 'Lydia', churnStatus: 'low', engagementScore: '8', recencyFM:'H/H/H' }, 
      { id: '010', name: 'Hanna',  churnStatus: 'high', engagementScore: '0.1', recencyFM:'L/L/L' },
      { id: '011', name: 'Giana Franci', churnStatus: 'medium', engagementScore: '3', recencyFM:'M/M/M' },
      { id: '012', name: 'Lydia', churnStatus: 'low', engagementScore: '8', recencyFM:'H/H/H' },
      { id: '013', name: 'Hanna',  churnStatus: 'high', engagementScore: '0.1', recencyFM:'L/L/L' },
      { id: '014', name: 'Giana Franci', churnStatus: 'medium', engagementScore: '3', recencyFM:'M/M/M' },
      { id: '015', name: 'Lydia', churnStatus: 'low', engagementScore: '8', recencyFM:'H/H/H' }, 
      { id: '016', name: 'Hanna',  churnStatus: 'high', engagementScore: '0.1', recencyFM:'L/L/L' },
      { id: '017', name: 'Giana Franci', churnStatus: 'medium', engagementScore: '3', recencyFM:'M/M/M' },
      { id: '018', name: 'Lydia', churnStatus: 'low', engagementScore: '8', recencyFM:'H/H/H' },
  ],
    filterdCol: [
      { field: 'id', headerName: 'ID', width: 90 },
      {
        field: 'name',
        headerName: 'Name',
        width: 150,
        editable: true, 
      },
     
      {
        field: 'engagementScore',
        headerName: 'Engagement Score', 
        width: 200,
        editable: true,
      },
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
      {
        field: 'recencyFM',
        headerName: 'Recency/Frequency/Monetary',  
        width: 250, 
      },
    ],
  });

  const [demographicsResult, setdemographicsResult] = useState({
    chartSeries:  [44, 55, 13, 43, 22],
    labels: ['Team A', 'Team B', 'Team C', 'Team D', 'Team E'],
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
   labels: ['10-20', '31-40', '21-30', '51-60', '41-50'],
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
    legend:false,
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
    grid: {height:10, width:10,
      show: true,
      borderColor: '#dcdcdc',
      strokeDashArray: 4,
      position: 'back',
      yaxis: {
        height:15,
        lines: { height:10,
          show: false,
          opacity: 0.2,
        },
      },
      xaxis: {
        height:15,
        lines: {height:10,
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

    xaxis: { maxWidth: 200,
      maxHeight: 20,
      categories:['Active on Media','Comfortable','Consistent Performance','Inncvator','Know a lot','Make life Easier'] //companyConsidration.labels,
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

  const chartOptions2 =   {
    chart: {
      height: 320,
      type: 'line',
      stacked: false, 
      toolbar: {
        show: false,
      },
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

 

  const series4= [{
    name: 'Series 1',
    data: [10, 20, 30, 20, 10, 20],
  }];
 
  const   regressionSeries4= {
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
    xaxis: {  labels: {
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
      categories: ['Know a lot','Comfortable','Active on media','Excellent Reputation','Innovator',
'Different & brands','Make life easier','Consistent performance','Recommend',]
    },
    yaxis: {
      tickAmount: 7,
      labels: {
        formatter: function(val, i) {
          if (i % 2 === 0) {
            return val
          } else {
            return ''
          }
        }
      }
    }
  }

  const chartOptions4={
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
        formatter: function(val) {
          return val
        }
      }
    },
    xaxis: {  labels: {
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
      categories: ['Know a lot','Comfortable','Active on media','Excellent Reputation','Innovator',
'Different from other brands','Make life easier','Consistent performance','Recommend',]
    },
    yaxis: {
      tickAmount: 7,
      labels: {
        formatter: function(val, i) {
          if (i % 2 === 0) {
            return val
          } else {
            return ''
          }
        }
      }
    }
  };

  const chartOptions5={ 
    chart: {
      height: 350,
      type: 'scatter',
      zoom: {
        enabled: true,
        type: 'xy'
      }
    },
    xaxis: {
      min:-1,
      max:1,
      tickAmount: 5,
      labels: {
        formatter: function(val) {
          return parseFloat(val).toFixed(1)
        }
      }
    },
    yaxis: {
      min:-1,
      max:1,opposite:"right",
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

  const chartOptions6 ={
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
      fill:'#ffffff'
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
        trim: true,  color:'#ffffff',
        minHeight: undefined,
        width: 50,
        maxWidth: 50,
        maxHeight: 120,
  
        style: {
          //colors: 'red',
          // fontSize:'7px',
          with: '100px',
          color:'#ffffff',
          wordWrap: 'break-word',
          fontWeight: 400,
          // cssClass: 'apexcharts-xaxis-label',
        },
      },
      categories: [ 'High','Medium','Low'],
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
    getSatisfactionResult(positiveSatisfactionTable, wherequery);

  };

  const getSatisfactionResult = async (tableDetails, wherequery) => {
    let newTableDetail = tableDetails.split(".");
    setLoaderShow(true);
    await axios
      .post(`${process.env.REACT_APP_API_URL}/survey/getSurveyAthena`, {
        databaseName: newTableDetail[0],
        query:
          "SELECT name, sat_category, average_purchase_value,purchase_frequency , cart_drop_rate , topics , age,  gender, churn_risk,pc1, pc2,mean,  cluster, email FROM " +
          newTableDetail[1],
        whereQuery: wherequery
      })
      .then((response1) => {
        setLoaderShow(false);
        if (response1.data.success) {

          let newArrr1 = response1.data.data.map((ele, ind) => ({
            ...ele,
            id: ind + 1,
            newTopics: ele.topics,
          }));
          setpositiveSatisfactionResult({
            filterdRow: newArrr1,
            filterdCol: gridGridColumns,
          });

          if (wherequery == null) {
            let getAllCluster = response1.data.data.map(ele => ele.cluster);
            const listAllCluster = [...new Set(getAllCluster)];
            const seriesData = [];
            listAllCluster.forEach(ele => {
              let matchedCluster = {
                name: ele,
                data: response1.data.data.filter(
                  (ele1) => ele1.cluster == ele
                ).map(ele2 => ([parseFloat(ele2.mean).toFixed(3), parseFloat(ele2.pc2).toFixed(3)])),
              }
              seriesData.push(matchedCluster);
            })

            const seriesData1 = [];
            listAllCluster.forEach(ele => {
              let matchedCluster = {
                name: ele,
                data: response1.data.data.filter(
                  (ele1) => ele1.cluster == ele
                ).map(ele2 => ({ "average_purchase_value": ele2.average_purchase_value, "purchase_frequency": ele2.purchase_frequency, "mean": ele2.mean, "pc1": parseFloat(ele2.pc1).toFixed(3), "pc2": parseFloat(ele2.pc2).toFixed(3) })),
              }
              seriesData1.push(matchedCluster);
            })

            setCorrespondenceAnalysis({
              chartSeries: seriesData,
              labels: [],
              overall: "",
              gridData: [],
              gridDataCols: [],
              tootltipProp: seriesData1
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
        console.log("resultttoooooooooo", res);
        // setLoderVisual(false)
        if (res.success === true && res.data.length!=0) {
          let mappingResult = res.data[0].analysis_result;
          let newKpi = Object.keys(mappingResult.kpis);
          let newKpi1 = newKpi.map((ele) => ({
            label: ele,
            count: mappingResult.kpis[ele],
            displayName: ele.split("_").join(" "),
          }));
          setkpiResult(newKpi1);
            if(resultData.template=="Net Promoter Score"){
              setsatisfactionResultResult({
                overall: 0,
                positive: mappingResult.overall_satisfaction.positive,
                negative: mappingResult.overall_satisfaction.negative,
                neutral: mappingResult.overall_satisfaction.neutral,
              });
            }else{
              setsatisfactionResultResult({
                overall: 0,
                positive: 0,
                negative: 0,
                neutral: 0,
              });
            }
 

          let newTopic = Object.keys(mappingResult.topic_sentiment);
          let newTopic1 = newTopic.map((ele) => ({
            topic: ele.split("_").join(" "),
            positive: mappingResult.topic_sentiment[ele].positive,
            neutral: mappingResult.topic_sentiment[ele].neutral,
            negative: mappingResult.topic_sentiment[ele].negative,
          }));

          let newPositiveList = newTopic1.map((ele) => ele.positive);
          let newNeutralList = newTopic1.map((ele) => ele.neutral);
          let newNegativeList = newTopic1.map((ele) => ele.negative);
          settopicSentimentResult([
            {
              // name: resultData.template=="Net Promoter Score"?"Promoter":"Heigh",
              // data: newPositiveList,
              name: 'Promoter',
              data: [44, 55, 41, 37, 22, 43, ]
            },
            {
              // name: resultData.template=="Net Promoter Score"?"Passive":"Neutral",
              // data: newNeutralList,
              name: 'Passive',
              data: [53, 32, 33, 52, 13, 43, ]
            },
            {
              // name: resultData.template=="Net Promoter Score"?"Detractor":"Negative",
              // data: newNegativeList,
              name: 'Detractor',
              data: [12, 17, 11, 9, 15, 11, ]
            },
          ]);

          // let newTopic2 = newTopic1.map((ele, ind) => ({
          //   ...ele,
          //   id: ind + 1,
          // }));
          settopicSentimentLabel(newTopic);

          let withoutoverAll = { ...mappingResult.company_consideration };
          delete withoutoverAll["overall"];
          let newCompaneyCosidLable = Object.keys(withoutoverAll);
          let newCompaneyCosidValue = Object.values(withoutoverAll);

          setCompanyConsidration({
            chartSeries: [
              {
                name: "Company Considration",
                data: newCompaneyCosidValue,
              },
            ],
            // labels: (resultData.template=="Net Promoter Score"?newTopic:newCompaneyCosidLable),
            labels: ['sss','ass'],
            overall: mappingResult.company_consideration?.overall + "%",
            gridData: newCompaneyCosidValue.map((ele, ind) => ({
              id: ind + 1,
              attribute: newCompaneyCosidLable[ind],
              score: newCompaneyCosidValue[ind],
            })),
            gridDataCols: [
              {
                field: "attribute",
                headerName: "Attribute",
                width: 350,
                editable: true,
              },
              {
                field: "score",
                headerName: "Score",
                width: 200,
                editable: true,
              },
            ],
          });

          let withoutoverAllTrust = { ...mappingResult.trust };
          delete withoutoverAllTrust["overall"];
          let newAllTrustLable = Object.keys(withoutoverAllTrust);
          let newAllTrustValue = Object.values(withoutoverAllTrust);

          setCompanyTrustMatrix({
            chartSeries: [
              {
                name: "Company Trust Matrix",
                data: newAllTrustValue,
              },
            ],
            labels: newAllTrustLable,
            overall: mappingResult.trust?.overall + "%",
            gridData: newAllTrustValue.map((ele, ind) => ({
              id: ind + 1,
              attribute: newAllTrustLable[ind],
              score: newAllTrustValue[ind],
            })),
            gridDataCols: [
              {
                field: "attribute",
                headerName: "Attribute",
                width: 350,
                editable: true,
              },
              {
                field: "score",
                headerName: "Score",
                width: 200,
                editable: true,
              },
            ],
          });

          let withoutoverAllChurnData = { ...mappingResult.churn_data };
          delete withoutoverAllChurnData["overall_churn"];
          let newAllChurnDataLable = Object.keys(withoutoverAllChurnData);
          let newAllChurnDataValue = Object.values(withoutoverAllChurnData);

          setChurnRate({
            chartSeries: [
              {
                name: "Potential Churn Rate",
                data: newAllChurnDataValue,
              },
            ],
            labels: (newAllChurnDataLable.map(ele => (ele = ele.split("_").join(" ").toUpperCase()))),
            labels1: (newAllChurnDataLable),
            overall: mappingResult.churn_data.overall_churn + "%",
          });

          // let newDemographicDataLable = Object.keys(mappingResult?.demographics);
          // let newDemographicDataValue = Object.values(
          //   mappingResult.demographics
          // );
          
          setdemographicsResult({
            // chartSeries: newDemographicDataValue,
            // labels: newDemographicDataLable,
            series: [44, 55, 13, 43, 22],
            labels: ['Team A', 'Team B', 'Team C', 'Team D', 'Team E'],
          });
          // setpositiveSatisfactionTable(
          //   mappingResult.positive_satisfaction_db_tbl
          // );
          // getSatisfactionResult(
          //   mappingResult.positive_satisfaction_db_tbl,
          //   null
          // );

        } else {
          // setToastObject({
          //   message: t(`${res.message}`),
          //   severity: "error",
          //   open: true,
          // });
        }
      });
  };

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
      setIschartHalfPC(4);setIschartFontSize("7px")
      setIschartBoxHeightPC(250);
      setIschartHeightPC(250);
      setIshideButtonPC("d-none");
      setIsshowButtonPC("d-blok");
      setIschartThree("d-block");
      setIschartThreeCopy("d-none");  
    }
  };

  const churnDrivers=[ 
   {
    label:'Active On Media',
    promoter:10,
    passive:40,
    detractor:50,
  },
  {
    label:'Comfortable',
    promoter:40,
    passive:40,
    detractor:20,
  },
  {
    label:'Consistent Performance',
    promoter:20,
    passive:40,
    detractor:40,
  } ,
  {
    label:'Innovator',
    promoter:20,
    passive:40,
    detractor:40,
  },
  {
    label:'Know a lot',
    promoter:20,
    passive:40,
    detractor:40,
  },
  {
    label:'Make life Easier',
    promoter:20,
    passive:40,
    detractor:40,
  }, 
  ]

  useEffect(() => {
    // fetchSurveyResult();
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

  const hideDataTable = (e) =>{
    setDataTable(!dataTable);   
  }


  return (
    <div className="section-green result-pages">
       <div className="float-right">
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
          <a  onClick={(e) => closeFilterBox(e)} className='fa fa-close float-right'></a>
            <h4 className="m-0"><i className="fa fa-filter"> </i> Filter Dashboard</h4>
          
          <label>Survey Filter</label>
            <FormControl sx={{ mt:0.5, mb:1, minWidth: "100%" }}>
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
            <FormControl sx={{ mt:0.5,mb:2,  minWidth: "100%" }}>
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
                    {item.label == "total_contacts" && (
                      <>
                        <CardContent className="cardContent">
                        <span className="capitalize small-text mr-1">
                            {/* {item.displayName} */} Total Contacts
                          </span>
                          <Tooltip title={'Count of unique Email IDs ingested from Hubspots.'}>
                            <i className="fa fa-info-circle icon-size"></i>
                          </Tooltip>
                          <br />
                          <img src= {total_contacts}  alt='convertml' />
                          <span className="count-number"> 0 </span>
                        </CardContent>
                      </>
                    )}
                    {item.label == "overall_churn_rate" && (
                      <>
                        <CardContent className="cardContent">
                        <span className="capitalize small-text mr-1">
                              {item.displayName}  
                          </span>
                          <Tooltip title={'Count of unique responses ingested from Typeform surveys.'}>
                            <i className="fa fa-info-circle icon-size"></i>
                          </Tooltip>
                          <br />
                          <img src= {overall_churn_rate}  alt='convertml' />
                          <span className="count-number">5</span>
                        </CardContent>
                      </>
                    )}
                    {item.label == "cltv" && (
                      <>
                        <CardContent className="cardContent">
                        <span className="capitalize small-text mr-1">
                             {item.displayName}  
                          </span>
                          <Tooltip title={'Customer Lifetime Value (CLV) is a metric that calculates the total expected revenue a business can generate from a customer throughout their entire relationship. It helps businesses assess the long-term profitability of acquiring and retaining customers, guiding strategic decisions for marketing and customer engagement.'}>
                            <i className="fa fa-info-circle icon-size"></i>
                          </Tooltip>
                          <br />
                          <img src={cltv}  alt='convertml' />
                          <span className="count-number"> 0 </span>
                        </CardContent>
                      </>
                    )}
                    {(item.label == "nps_score") && (
                      <>
                        <CardContent className="cardContent">
                          <span className="capitalize small-text mr-2">
                            {item.displayName}  
                          </span>
                          <Tooltip title={'An aggregated score ranging from 0-1 indicating the overall sentiment based over all the sentiment related questions.'}>
                            <i className="fa fa-info-circle icon-size"></i>
                          </Tooltip>
                          <br />
                          <img src={nps}  alt='convertml'/>
                          <span className="count-number">  0.76 </span>
                        </CardContent>
                      </>
                    )}
                    {item.label == "overall_impact_on_revenue" && (
                      <>
                        <CardContent className="cardContent">
                          <span className="capitalize small-text">
                            {/* {item.displayName.toUpperCase()} */}Impact on Revenue 
                          </span> <Tooltip title={'Net Promoter Score (NPS) is a customer satisfaction metric that quantifies the willingness of customers to recommend a product, service, or brand to others.'}>
                            <i className="fa fa-info-circle icon-size"></i>
                          </Tooltip>
                          <br />
                          <img src={overall_impact_on_revenue}  alt='convertml' />
                          <span className="count-number"> 8 </span>
                        </CardContent>
                      </>
                    )}

                  </div>
                ))}
              </div>
              <Grid container spacing={1}>
                <Grid item xs={4}>
                  <Card className={selectedGridBox == "positive" ? 'cardBox selectCard' : 'cardBox '}>
                    <CardContent
                      onClick={() => {
                        getFilteredResult(" WHERE sat_category = 'positive'");
                      }}
                    >
                       <img
                        src={positivechart}
                        width={"55%"}
                        alt="Positive"
                        className="float-right"
                      />  
                      {/* <img src={positiveIcons} width={50} alt="Positive" /> */}
                      <br/> <b className="capitalize small-text mr-1">{resultData.template=="Net Promoter Score"?"High":"High"}</b>  &nbsp;  
                       <Tooltip title={"Highly satisfied respondents express contentment and positive sentiment towards their overall experience."}>
                        <i className="fa fa-info-circle icon-size"></i>
                      </Tooltip>
                      <div className="count-number">
                        {/* {satisfactionResult?.positive}% */}
                        60.00%
                      </div>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={4}>
                  <Card className={selectedGridBox == "neutral" ? 'cardBox selectCard' : 'cardBox'}>
                    <CardContent
                      // onClick={() => {
                      //   getFilteredResult(" WHERE sat_category = 'neutral'");
                      // }}
                    >
                        <img
                        src={neutralchart}
                        width={"55%"}
                        alt="Positive"
                        className="float-right"
                      /> 
                      {/* <img src={neutralIcons} width={50} alt="Neutral" /> */}
                      <br /> <b className="capitalize small-text mr-1">{resultData.template=="Net Promoter Score"?"Medium":"Medium"}</b>  &nbsp;
                       <Tooltip title={"Moderate contentment with the overall experience, neither exceptionally pleased nor dissatisfied."}>
                        <i className="fa fa-info-circle icon-size"></i>
                      </Tooltip>
                      <div className="count-number">
                        {/* {satisfactionResult?.neutral}% */}
                        20.00%
                      </div>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={4}>
                  <Card
                    className={selectedGridBox == "negative" ? 'cardBox selectCard' : 'cardBox'}
                    // onClick={() => {
                    //   getFilteredResult(" WHERE sat_category = 'negative'");
                    // }}
                  >
                    <CardContent>
                    <img
                        src={negativechart}
                        width={"55%"}
                        alt="Positive"
                        className="float-right"
                      />  
                      {/* <img src={negativeIcons} width={50} alt="Negative" /> */}
                      <br /> <b className="capitalize small-text mr-1">{resultData.template=="Net Promoter Score"?"Low":"Low"} </b>    &nbsp;
                        <Tooltip title={"Survey respondents expressed dissatisfaction with the provided service, citing various concerns and shortcomings."}>
                        <i className="fa fa-info-circle icon-size"></i>
                      </Tooltip>
                      <div className="count-number">
                        {/* {satisfactionResult?.negative}% */}
                        20.00%
                      </div>
                    </CardContent>
                  </Card>
                </Grid>
                <div style={{height:10}}></div> 
                <Grid item xs={4}>
                  <Card className="cardBox pb-2">
                    <CardContent>
                      <h3 className="float-left mr-2">Churn Drivers - Topics/Attributes </h3> 
                      <Tooltip title={"This chart gives a breakdown of count Positive, Negative and Neutral sentiments at a topic level. This would help in drilling down to specific subset of respondents and taking the necessary actions to address their concerns."}>
                        <i className="fa fa-info-circle icon-size"></i>
                      </Tooltip>
                      <Box
                        sx={{ height: 230,  width: "100%" }}
                        > <br/><br/> 
  <section className="custom-chart" style={{height: 230}}>
    {churnDrivers.map((baritem)=>(
      <>
      <label>{baritem.label}</label> 
      <div className="bars">
      <div className="promoter" style={{width:baritem.promoter+'%'}}><span>{baritem.promoter+'%'}</span></div>
      <div className="passive" style={{width:baritem.passive+'%'}}><span>{baritem.passive+'%'}</span></div>
      <div className="detractor" style={{width:baritem.detractor+'%'}}><span>{baritem.detractor+'%'}</span></div>
    </div>
      </>
    ))} 
  </section><br/><br/>

                         {/* <Chart
                          height={300}
                          options={sentimentBasedOptions}
                          series={topicSentimentResult}
                          type="bar"
                        />   */}
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>

                <Grid item xs={4}>
                  <Card className="cardBox">
                    <CardContent>
                      <h3 className="float-left mr-2"> Churn Demography </h3>
                      <Tooltip title={"This chart gives a breakdown of count Positive, Negative and Neutral sentiments at a topic level. This would help in drilling down to specific subset of respondents and taking the necessary actions to address their concerns."}>
                        <i className="fa fa-info-circle icon-size"></i>
                      </Tooltip>
                      <Box
                        sx={{ height: 230,   }}
                      ><br/> <div id="chart122">  
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
                </Grid>
                <Grid item xs={chartHalfCR} className={chartThree}>
                  <Card className="cardBox">
                    <CardContent>
                      <h3 className="float-left mr-2" title="Churn Across Customer Journey">
                        {/* Clustering Analysis {correspondenceAnalysis.overall} */}
                        Churn Across Customer Journey
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
                <Grid item xs={chartHalfPC} className={chartFour}>
                  <Card className="cardBox">
                    <CardContent>
                      <h3 className="float-left mr-2">
                        {/* Potential Churn Rate : {churnRate.overall} */}
                        Regression
                      </h3>
                      <Tooltip title={"The churn rate is a critical metric as it directly impacts a company’s profitability. It’s the percentage of customers who stop using a product or service within a given time period. A high churn rate could indicate customer dissatisfaction, cheaper and/or better offers from competitors, more successful sales and/or marketing by competitors, or dissatisfaction with customer service."}>
                        <i className="fa fa-info-circle icon-size"></i>
                      </Tooltip>
                      <i
                        className={
                          "fa fa-expand float-right mt-1 " + showButtonPC
                        }
                        onClick={(e) => chartenlarge("companyPC")}
                      ></i>
                      <i
                        className={
                          "fa fa-compress float-right mt-1 " + hideButtonPC
                        }
                        onClick={(e) => closeenlarge("companyPC")}
                      ></i>

                      <Box sx={{ height: chartBoxHeightPC, width: "100%" }}>
                        <div id="chart11">  
                        <Chart id='nechart' height={chartHeightPC} width={'100%'}  options={regressionSeries4}  series={series4} type="radar" /> 
                        </div>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={chartHalf} className={chartOne}>
                  <Card className="cardBox">
                    <CardContent>
                      <h3 className="float-left mr-2">
                        {/* Company Consideration: {companyConsidration.overall} */}
                        Clustering
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
                          <Chart
                            height={chartHeight}
                            width={"100%"}
                            options={chartOptions5}
                            series={companyConsidration.chartSeries}
                            type="scatter"
                          />  
                        </div>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>

                <Grid item xs={chartHalfTM} className={chartTwo}>
                  <Card className="cardBox">
                    <CardContent> 
                      <h3 className="float-left mr-2">
                        {/* Company Trust Metric: {companyTrustMatrix.overall} */}
                        Revenue  ARR by Category
                      </h3>
                      <Tooltip title={"Revenue ARR by category refers to the annual recurring revenue (ARR) generated by a business segmented according to Net Promoter Score (NPS) categories. The NPS categories, including Promoters (loyal customers), Detractors (unhappy customers), and Passives (neutral customers), help analyze how different customer segments contribute to the company's overall revenue. This metric provides insights into the financial impact of customer satisfaction levels."}>
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
                        {/* <div id="chart12a">  */}
                          <Chart
                            height={chartHeightTM}
                            width={"100%"}
                            options={chartOptions6}
                            series={companyTrustMatrix.chartSeries}
                            type="bar"
                          />  
                        {/* </div> */}
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={chartHalf} className={chartOneCopy}>
                  <Card className="cardBox">
                    <CardContent>
                      <h3 className="float-left mr-2">
                        Company Consideration: {companyConsidration.overall}
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
                          <br />
                          <Chart
                            height={chartHeight}
                            width={"100%"}
                            options={chartOptions}
                            series={companyConsidration.chartSeries}
                            type="radar"
                          />
                        </div>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
            
                <Grid item xs={chartHalfCR} className={chartThreeCopy}>
                  <Card className="cardBox">
                    <CardContent>
                      <h3 className="float-left mr-2">
                        Clustering Analysis {correspondenceAnalysis.overall}
                      </h3>
                      <Tooltip title={"Clustering analysis in market analysis involves grouping survey responses based on shared characteristics or preferences, revealing distinct customer segments for targeted marketing strategies and product offerings. This method uncovers valuable insights for tailoring marketing efforts and enhancing customer satisfaction."}>
                        <i className="fa fa-info-circle icon-size"></i>
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
                      <Box sx={{ height: chartBoxHeightCR, width: "100%" }} onClick={(e) => chartenlarge("companyCR")}>
                        <div id="chart12b">
                        <img src={chart3ac}  alt='convertml'   width={'100%'}/>
                          {/* <Chart
                            height={chartHeightCR}
                            options={chartOptions2}
                            series={correspondenceAnalysis.chartSeries}
                            type="scatter"
                          /> */}
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
            <Box sx={{ height: "calc(100vh - 18em)", width: "100%", background: "#ffffff" }}>
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
