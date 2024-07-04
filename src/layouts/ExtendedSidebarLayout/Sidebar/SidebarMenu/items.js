import BackupTableTwoToneIcon from "@mui/icons-material/BackupTableTwoTone";
import StorageIcon from "@mui/icons-material/Storage";
import HubIcon from "@mui/icons-material/Hub";
import EmailIcon from "@mui/icons-material/Email";
import AssessmentIcon from "@mui/icons-material/Assessment";
import ImageIcon from "@mui/icons-material/Image";
import GraphicEqIcon from "@mui/icons-material/GraphicEq";
import { Campaign } from "@mui/icons-material";
import CableIcon from '@mui/icons-material/Cable';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import DocumentScannerIcon from '@mui/icons-material/DocumentScanner';
import DvrIcon from '@mui/icons-material/Dvr';
import InsightsIcon from '@mui/icons-material/Insights';
import DisplaySettingsOutlinedIcon from '@mui/icons-material/DisplaySettingsOutlined';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import PsychologyIcon from '@mui/icons-material/Psychology';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CampaignIcon from '@mui/icons-material/Campaign';
import CollectionsBookmark from '@mui/icons-material/CollectionsBookmark';
import PostAddIcon from '@mui/icons-material/PostAdd';
import AddchartIcon  from '@mui/icons-material/Addchart';
import IosShareOutlinedIcon from '@mui/icons-material/IosShareOutlined';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import AirlineStopsIcon from '@mui/icons-material/AirlineStops';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import StackedBarChartIcon from '@mui/icons-material/StackedBarChart';
/*
{
            name: "Connect Data",
            icon: CableIcon,
            link: "/dashboard/data-platform/connect-to-dataset",
            // badge: "",
            // badgeTooltip: "",
          },
          {
            name: "Preview Data",
            icon: DocumentScannerIcon,
            link: "/dashboard/data-platform/preview-data",
            // badge: "",
            // badgeTooltip: "",
          },
          {
            name: "Query Data",
            icon: CodeOffIcon,
            link: "/dashboard/data-platform/query-engine",
            // badge: "",
            // badgeTooltip: "",
          },
          {
            name: "Visualize Data",
            icon: SubtitlesOutlinedIcon,
            link: "/dashboard/data-platform/visualize-data",
            // badge: "",
            // badgeTooltip: "",
          },
          {
            name: "Export to CRM",
            icon: IosShareOutlinedIcon,
            link: "/dashboard/data-platform/export-to-crm",
            // badge: "",
            // badgeTooltip: "",
          },
*/ 
const menuItems = [
  // {
  //   heading: "General",
  //   items: [
  //     {
  //       name: "Business Dashboard",
  //       icon: BackupTableTwoToneIcon,
  //       link: "/dashboard",
  //       // badge: "",
  //       badgeTooltip: "",
  //     },
  //   ],
  // },
  // {
  //   heading: "Market & Competition",
  //   items: [
  //     {
  //       name: "Market Dynamics",
  //       icon: BackupTableTwoToneIcon,
  //       link: "/dashboard/market-map",
  //       badge: "",
  //       badgeTooltip: "",
  //     },
  //   ],
  // },
  
  // {
  //   heading: "Data Integration",
  //   items: [
  //     // {
  //     //   name: "Connect Data",
  //     //   icon: CableIcon,
  //     //   link: "/dashboard/data-platform/connect-to-dataset",
  //     //   // badge: "",
  //     //   // badgeTooltip: "",
  //     // },
  //     {
  //       name: "Connect Data",
  //       icon: CableIcon,
  //       link: "/dashboard/data-platform/create-data-connection",
  //       // badge: "",
  //       // badgeTooltip: "",
  //     },
      // {
      //   name: "Export to CRM",
      //   icon: OpenInNewIcon,
      //   link: "/dashboard/data-platform/export-to-crm",
      //   // badge: "",
      //   // badgeTooltip: "",
      // },
      // {
      //   name: "Data Insights",
      //   icon: StorageIcon,
      //   link: "/data-insights",
      //   items: [
      //     {
      //       name: "Data Profiling",
      //       icon: DocumentScannerIcon,
      //       link: "/dashboard/data-platform/data-profiling",
      //       // badge: "",
      //       // badgeTooltip: "",
      //     },
      //     {
      //       name: "Pipeline Monitoring",
      //       icon: DvrIcon,
      //       link: "/dashboard/data-platform/pipeline-monitoring",
      //     },
      //   ],
      // },
  //   ],
  // },
  // {
  //   heading: "Anaytics Use Cases",
  //   items: [
  //     {
  //       name: "Market Sentiment",
  //       icon: InsightsIcon,
  //       link: "/dashboard/market-sentiment",
  //       // badge: "",
  //       badgeTooltip: "",
  //       // items: [
  //       //   {
  //       //     name: "Create Project",
  //       //     link: "/dashboard/ml-analytics/projects",
  //       //     badge: "",
  //       //     badgeTooltip: "",
  //       //   },
  //       //   {
  //       //     name: "Results & Actions",
  //       //     link: "/dashboard/ml-analytics/results-reporting",
  //       //     badge: "",
  //       //     badgeTooltip: "",
  //       //   },
  //       // ],
  //     },
  //     {
  //       name: "Market Dynamics",
  //       icon: DisplaySettingsOutlinedIcon,
  //       link: "/dashboard/market-map",
  //       // badge: "",
  //       //badgeTooltip: "",
  //     },
  //     // {
  //     //   name: "Market Sentiment ",
  //     //   icon: LanIcon,
  //     //   link: "/anaytics-us-cases/market-sentiment",
  //     //   badge: "",
  //     //   badgeTooltip: "", 
  //     // }, 
  //     {
  //       name: "Survey Analysis",
  //       icon: TrendingUpIcon,
  //       link: "/dashboard/survey-analysis",
  //       // badge: "",
  //       // badgeTooltip: "",
  //       items: [
  //         {
  //           name: "Create Project",
  //           icon: AddCircleOutlineIcon,
  //           link: "/dashboard/survey-analysis/createprojects",
  //           // badge: "",
  //           // badgeTooltip: "",
  //         },
  //         {
  //           name: "Survey Result",
  //           icon: AssessmentIcon,
  //           link: "/dashboard/data-platform/visualize-data-survey",
  //           // badge: "",
  //           // badgeTooltip: "",
  //         },
  //         // {
  //         //   name: "Trust Matrix",
  //         //   icon: DragIndicatorIcon,
  //         //   link: "/dashboard/data-platform/visualize-data-survey1",
  //         //   // badge: "",
  //         //   // badgeTooltip: "",
  //         // },
  //         // {
  //         //   name: "Relationship Monitoring",
  //         //   icon: AirlineStopsIcon,
  //         //   link: "/dashboard/data-platform/visualize-data-survey2",
  //         //   // badge: "",
  //         //   // badgeTooltip: "",
  //         // },
  //         // {
  //         //   name: "Correspondence Analysis",
  //         //   icon: AnalyticsIcon,
  //         //   link: "/dashboard/data-platform/visualize-data-survey3",
  //         //   // badge: "",
  //         //   // badgeTooltip: "",
  //         // },
  //         // {
  //         //   name: "Demographics",
  //         //   icon: AppRegistrationIcon,
  //         //   link: "/dashboard/data-platform/visualize-data-survey4",
  //         //   // badge: "",
  //         //   // badgeTooltip: "",
  //         // },
  //         // {
  //         //   name: "Churn Analysis",
  //         //   icon: StackedBarChartIcon,
  //         //   link: "/dashboard/data-platform/visualize-data-survey5",
  //         //   // badge: "",
  //         //   // badgeTooltip: "",
  //         // },
  //       ],

  //       // items: [
  //       //   {
  //       //     name: "Survey Result",
  //       //     link: "/dashboard/data-platform/visualize-data-survey",
  //       //     badge: "",
  //       //     badgeTooltip: "",
  //       //   },
  //       //   {
  //       //     name: "Trust Matrix",
  //       //     link: "/dashboard/data-platform/visualize-data-survey1",
  //       //     badge: "",
  //       //     badgeTooltip: "",
  //       //   },
  //       //   {
  //       //     name: "Relationship Monitoring",
  //       //     link: "/dashboard/data-platform/visualize-data-survey2",
  //       //     badge: "",
  //       //     badgeTooltip: "",
  //       //   },
  //       //   {
  //       //     name: "Correspondence Analysis",
  //       //     link: "/dashboard/data-platform/visualize-data-survey3",
  //       //     badge: "",
  //       //     badgeTooltip: "",
  //       //   },
  //       //   {
  //       //     name: "Demographics",
  //       //     link: "/dashboard/data-platform/visualize-data-survey4",
  //       //     badge: "",
  //       //     badgeTooltip: "",
  //       //   },
  //       //   {
  //       //     name: "Churn Analysis",
  //       //     link: "/dashboard/data-platform/visualize-data-survey5",
  //       //     badge: "",
  //       //     badgeTooltip: "",
  //       //   },
  //       // ],
  //     },
  //     {
  //       name: "ML Projects",
  //       icon: PsychologyIcon,
  //       link: "/ml-projects",
  //       // badge: "",
  //       // badgeTooltip: "",
  //       items: [
  //         {
  //           name: "Create Project",
  //           icon: AddCircleOutlineIcon,
  //           link: "/dashboard/ml-analytics/projects",
  //           // badge: "",
  //           // badgeTooltip: "",
  //         },
  //         {
  //           name: "Results",
  //           icon: AssessmentIcon,
  //           link: "/dashboard/ml-analytics/results-reporting",
  //           // badge: "",
  //           // badgeTooltip: "",
  //         },
  //       ],
  //     },
  //   ],
  // },
  // {
  //   heading: "Campaign Manager",
  //   items: [
  //     {
  //       name: "Marketing Channels",
  //       icon: HubIcon,
  //       link: "/dashboard/channels",
  //       items: [
  //         {
  //           name: "Email Marketing",
  //           icon: EmailIcon,
  //           link: "/dashboard/channels/email",
  //           badge: "",
  //           badgeTooltip: "",
  //         },
  //       ],
  //     },
  //     {
  //       name: "Content Studio",
  //       icon: GraphicEqIcon,
  //       items: [
  //         {
  //           name: "Image Editor",
  //           icon: ImageIcon,
  //           link: "/dashboard/content-studio/graphics-editor/image-editor",
  //           // badge: "",
  //           // badgeTooltip: "Image Editor",
  //         },
  //       ],
  //     },
  //     {
  //       name: "Launch Campaign",
  //       icon: CampaignIcon,
  //       link: "/dashboard/campaign/create",
  //       // badge: "",
  //       // badgeTooltip: "",
  //     },

  //   ],
  // },
  // {
  //   heading: "Campaign Manager",
  //   items: [

  //     {
  //       name: "Campaign Analytics",
  //       icon: AssessmentIcon,
  //       link: "/dashboard/campaign/metrics",
  //       badge: "",
  //       badgeTooltip: "",
  //     },
  //   ],
  // },
  // {
  //   heading: "Management & Governance",

  //   items: [
  //     // {
  //     //   name: "Users",
  //     //   icon: GroupIcon,
  //     //   link: "/dashboard/users",
  //     //   badge: "",
  //     //   badgeTooltip: "",
  //     // },
  //     {
  //       name: "Campaigns",
  //       icon: Campaign,
  //       link: "/dashboard/campaigns",
  //       // badge: "",
  //       // badgeTooltip: "",
  //     },
  //     // {
  //     //   name: "Projects",
  //     //   icon: AppsIcon,
  //     //   link: "/dashboard/projects",
  //     //   badge: "",
  //     //   badgeTooltip: "",
  //     // },
  //     {
  //       name: "Datasets",
  //       icon: CollectionsBookmark,
  //       link: "/dashboard/datasets",
  //       // badge: "",
  //       // badgeTooltip: "",
  //     },
  //     {
  //       name: "Models",
  //       icon: PostAddIcon,
  //       link: "/dashboard/models",
  //       // badge: "",
  //       // badgeTooltip: "",
  //     },
  //     {
  //       name: "Survey",
  //       icon: AddchartIcon,
  //       link: "/dashboard/survey",
  //       // badge: "",
  //       // badgeTooltip: "",
  //     },
  //     {
  //       name: "Crm",
  //       icon: AddchartIcon,
  //       link: "/dashboard/expCrm",
  //       // badge: "",
  //       // badgeTooltip: "",
  //     }

      
  //   ],
  // },
];

export default menuItems;