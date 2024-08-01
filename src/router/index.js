import React from "react";
import { Suspense, lazy } from "react";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import sqlTheme from "../theme/sqlTheme";
import ExtendedSidebarLayout from "../layouts/ExtendedSidebarLayout";
import DocsLayout from "../layouts/DocsLayout";
import SuspenseLoader from "../components/SuspenseLoader";
import docsRoutes from "./docs";
import helpRoutes from "./help";


import HomePage from "../pages/webpages/HomePage";
import ChurnPage  from "../pages/webpages/solutions/analysis/churn";
import NPSPage  from "../pages/webpages/solutions/analysis/nps";
import CustomerSatisfaction  from "../pages/webpages/solutions/analysis/customer-satisfaction";


import CustomerSuccess  from "../pages/webpages/solutions/roles/customer-success";  
import Marketing  from "../pages/webpages/solutions/roles/marketing";
import MarketInsights  from "../pages/webpages/solutions/roles/market-insights";

 

import PricingPlan from "../pages/webpages/pricing-plan"; 

import Blogs from "../pages/webpages/blogs/";
import AboutUs from "../pages/webpages/about-us";
import PrivacyPolicyPage from "../pages/webpages/privacy-policy";
import LegalPage from "../pages/webpages/legal"


import TypeformIntegrationPage from "../pages/webpages/help-guide/typeform-integration";

import ConvertMLUserGuidePage from "../pages/webpages/help-guide/convertML-user-guide";



 
import MlResultsConnection from "../content/dashboards/DataPlatform/ML-result"; 

import SurveyDataAnalytics from "../pages/webpages/blogs/2023/survey-data-analytics";

import Surveyto1000customers from "../pages/webpages/blogs/2023/survey-to-1000-customers";

import WaysPredictiveAnalytics from "../pages/webpages/blogs/2023/7Ways-Predictive-Analytics";

import EmotionalQuotientMeetsMetrics from "../pages/webpages/blogs/2023/emotional-Quotient-Meets-Metrics";

import TryingtoMaximizeProfits from "../pages/webpages/blogs/2023/trying-to-maximize-profits";

import DontGetleftBehind from "../pages/webpages/blogs/2023/dont-get-left-behind";
import BetaTesterPage from "../pages/webpages/beta-tester";
import Combiningthebestofquantitative from "../pages/webpages/blogs/2024/feb/combining-the-best-of-quantitative";
import HiddenfieldsSuperenhance from "../pages/webpages/blogs/2024/feb/hidden-fields-Super-enhance-your-ConvertML-analysis";

import UserProfile from "../components/DataConnection/DatasetForm/user-profile";
import AiInNPSAnalysis from "../pages/webpages/blogs/2024/march/ai-In-NPS-Analysis";

import AnticipatingCustomer from "../pages/webpages/blogs/2024/march/anticipatingcustomer";
import AttentionTypeform from "../pages/webpages/blogs/2024/april/attentionTypeform";
import Theonlywinwinstrategy from "../pages/webpages/blogs/2024/april/the-only-win-win-strategy-for-survey-data-analytics";
import IntegrationMultiplePlatforms from "../pages/webpages/integration-multiple-platforms";
import ScheduleDemo from "../pages/webpages/schedule-demo";
import LeadGenerationAnalysis from "../pages/webpages/solutions/roles/lead-generation-analysis";
import BrandLoyalty from "../pages/webpages/solutions/roles/brand-loyalty";
import MarketResearch from "../pages/webpages/solutions/roles/market-research";
import LeadGenration from "../pages/webpages/lead-generation";
import LeadGenerationFrom from "../pages/webpages/lead-generation";
// import HiddenfieldsSuperenhance from "../pages/webpages/blogs/2024/feb/hidden-fields-Super-enhance-your-ConvertML-analysis";




const Loader = (Component) => (props) =>
  (
    <Suspense fallback={<SuspenseLoader />}>
      <Component {...props} />
    </Suspense>
  );
const LoginPage = Loader(lazy(() => import("../pages/LoginPage")));
const SignupPage = Loader(lazy(() => import("../pages/SignupPage")));
const ErrorPage = Loader(lazy(() => import("../pages/webpages/ErrorPage")));
const PricingPage = Loader(lazy(() => import("../pages/PricingPage")));
const AboutusPage = Loader(lazy(() => import("../pages/AboutusPage"))); 



const CustomersPage = Loader(lazy(() => import("../pages/CustomersPage")));
const ForgotPage = Loader(lazy(() => import("../pages/ForgotPasswordPage")));
const ProfilePage = Loader(lazy(() => import("../pages/ProfilePage")));
const ContactUsPage = Loader(lazy(() => import("../pages/webpages/contactus"))); 


const FaqsPages = Loader(lazy(() => import("../pages/webpages/faqs"))); 


const SupportPages = Loader(lazy(() => import("../pages/webpages/support")));
// const PrivacyPolicyPage = Loader(lazy(() => import("../pages/PrivacyPolicyPage"))); 

const ForgetPasswordPage = Loader(
  lazy(() => import("../pages/ForgetPassword"))
);
const PasswordReset = Loader(lazy(() => import("../pages/PasswordReset")));
const Pipeline = Loader(lazy(() => import("../pages/Pipeline")));

// const ConnectDataset = Loader(
//   lazy(() => import("../content/dashboards/DataPlatform/ConnectDataset"))
// );
const ProjectManagement = Loader(
  lazy(() => import("../../src/components/DataConnection/DatasetForm/ProjectManagement"))
);
// import CreateDataConnection from "../../../../components/DataConnection/DatasetForm/CreateDataConnection"
// const CreateDataConnection = Loader(
//   lazy(() => import("../content/dashboards/DataPlatform/DataConnection"))
// );

const CreateDataConnection = Loader(
  lazy(() => import("../../src/components/DataConnection/DatasetForm/CreateDataConnection"))
);

const Users = Loader(lazy(() => import("../content/dashboards/Users")));
const SingleUser = Loader(
  lazy(() => import("../content/dashboards/Users/single"))
);
const RequireAuth = Loader(lazy(() => import("../components/RequireAuth")));



const router = [
  {
    path: "/",
    exact: true,
    element: <HomePage />,
  },

  {
    path: "/churn-analysis",
    exact: true,
    element: <ChurnPage />,
  },
  {
    path: "/net-promoter-score",
    exact: true,
    element: <NPSPage />,
  },

  {
    path: "/customer-satisfaction-analysis",
    exact: true,
    element: <CustomerSatisfaction />,
  },
  {
    path: "/solutions/roles/customer-success-software",
    exact: true,
    element: <CustomerSuccess />,
  }, 
  {
    path: "/solutions/roles/marketing",
    exact: true,
    element: <Marketing/>,
  }, 
  {
    path: "/solutions/roles/market-insights",
    exact: true,
    element: <MarketInsights />,
  },
  {
    path: "/solutions/roles/leadGenerationAnalysis",
    exact: true,
    element: <LeadGenerationAnalysis />,
  }, 
  {
    path: "/solutions/roles/marketResearch",
    exact: true,
    element: <MarketResearch />,
  },   
  
  {
    path: "/solutions/roles/brandLoyalty",
    exact: true,
    element: <BrandLoyalty />,
  }, 
  {
    path: "/pricing-plan",
    exact: true,
    element: <PricingPlan />,
  }, 
  {
    path: "/about-us",
    exact: true,
    element: <AboutUs />,
  },
  {
    path: "/integration-multiple-platforms",
    exact: true,
    element: <IntegrationMultiplePlatforms />,
  },
  {
    path: "/lead-generation",
    exact: true,
    element: <LeadGenerationFrom />,
  },
  {
    path: "/power-user-program-convertml",
    exact: true,
    element: <BetaTesterPage />,
  },
  {
    path: "/help-guide/convertML-user-guide",
    exact: true,
    element: <ConvertMLUserGuidePage />,
  },
  {
    path: "/help-guide/typeform-integration",
    exact: true,
    element: <TypeformIntegrationPage />,
  },
  {
    path: "/scheduleDemo",
    exact: true,
    element: <ScheduleDemo />,
  }, 
  {
    path: "/privacy-policy",
    exact: true,
    element: <PrivacyPolicyPage />,
  },

  {
    path: "/legal",
    exact: true,
    element: <LegalPage />,
  },

  
  {
    path: "/about-us",
    exact: true,
    element: <AboutUs />,
  }, 
  {
    path: "/blogs",
    exact: true,
    element: <Blogs />,
  }, 
  {
    path: "/blogs/the-only-win-win-strategy-for-survey-data-analytics",
    exact: true,
    element: <Theonlywinwinstrategy/>,
  },
  {
    path: "/blogs/attention-typeform-and-hubspot-users-here-are-sureshot-ways-to-enhance-nps-analysis",
    exact: true,
    element: <AttentionTypeform/>,
  },
  {
    path: "/blogs/anticipating-customer-behavior-where-you-are-going-wrong-and-how-you-can-fix-it",
    exact: true,
    element: <AnticipatingCustomer/>,
  },
  {
    path: "/blogs/ai-in-nps-analysis-a-melange-of-quantitative-qualitative-data",
    exact: true,
    element: <AiInNPSAnalysis/>,
  },
 {
    path: "/blogs/guide-to-hidden-fields-boost-your-convertml-analysis",
    exact: true,
    element: <HiddenfieldsSuperenhance/>,
  },
  {
    path: "/blogs/guide-to-hidden-fields-boost-your-convertml-analysis",
    exact: true,
    element: <HiddenfieldsSuperenhance/>,
  },
  {
    path: "/blogs/follow-this-guide-to-understand-customer-churn-inside-out",
    exact: true,
    element: <Combiningthebestofquantitative />,
  },
  {
    path: "/blogs/people-are-bored-out-of-their-minds-when-taking-surveys",
    exact: true,
    element: <SurveyDataAnalytics />,
  },
  {
    path: "/blogs/you-sent-out-a-survey-to-1000-customers-but-hardly-got-any-responses",
    exact: true,
    element: <Surveyto1000customers />,
  },  
  {
    path: "/blogs/enhancing-customer-delight-7ways-predictive-analytics-improvescx",
    exact: true,
    element: <WaysPredictiveAnalytics/>,
  }, 
  {
    path: "/blogs/you-wonot-understand-customers-unless-you-step-into-their-shoes-incorporate-eq-in-your-marketing-efforts",
    exact: true,
    element: <EmotionalQuotientMeetsMetrics/>,
  },
  {
    path: "/blogs/trying-to-maximize-profits-with-cross-selling-and-up-selling-is-the-second-step",
    exact: true,
    element: <TryingtoMaximizeProfits/>,
  },
  {
    path: "/blogs/donot-get-left-behind-learn-how-you-can-use-zero-party-data",
    exact: true,
    element: <DontGetleftBehind/>,
  },
  

  {
    path: "/docs",
    exact: true,
    element: (
      <RequireAuth>
        <DocsLayout />
      </RequireAuth>
    ),
    children: docsRoutes,
  },
  {
    path: "/help",
    exact: true,
    element: (
      <RequireAuth>
        <DocsLayout />
      </RequireAuth>
    ),
    children: helpRoutes,
  },
  {
    path: "/login",
    exact: true,
    element: <LoginPage />,
  },
  {
    path: "/forgot-password-success",
    exact: true,
    element: <PasswordReset />,
  },
  {
    path: "/signup",
    exact: true,
    element: <SignupPage />,
  },
  {
    path: "/user-profile",
    exact: true,
    element: <UserProfile />,
  },
  
  {
    path: "/pricing",
    exact: true,
    element: <PricingPage />,
  },
  {
    path: "/customers",
    exact: true,
    element: <CustomersPage />,
  },
  {
    path: "/pipeline",
    exact: true,
    element: <Pipeline />,
  },
  {
    path: "/forgot-password",
    exact: true,
    element: <ForgetPasswordPage />,
  },
  {
    path: "/forgot-password/:id/:token",
    exact: true,
    element: <ForgotPage />,
  },

  {
    path: "/profile",
    exact: true,
    element: <ProfilePage />,
  },
  {
    path: "/aboutUs",
    exact: true,
    element: <AboutusPage />,
  },

  
  {
    path: "/contactus",
    exact: true,
    element: <ContactUsPage />,
  },
  
  {
    path: "/support",
    exact: true,
    element: <SupportPages />,
  },
  {
    path: "/faqs",
    exact: true,
    element: <FaqsPages />,
  },
  
  
  {
    path: "/dashboard",
    exact: true,
    element: (
      // <RequireAuth>
        <ExtendedSidebarLayout />
      // </RequireAuth>
    ),
    children: [
      
      {
        path: "data-platform/project-management",
        element: (<RequireAuth><ProjectManagement /></RequireAuth>)
      },
      {
        path: "data-platform/create-data-connection",
        element: (<RequireAuth><CreateDataConnection /></RequireAuth>)
      },
      {
        path: "data-platform/ml-result",
        element: (<RequireAuth><MlResultsConnection /></RequireAuth>)
      },
      
      
      {
        path: "users",
        children: [
          {
            path: "",
            element: <Users />,
          },
          {
            path: ":userId",
            element: <SingleUser />,
          },
        ],
      },
    ],
  }, 
  {
    path: "*",
    element: <ErrorPage />,
  },
];

export default router;
