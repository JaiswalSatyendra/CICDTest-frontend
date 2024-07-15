import React, { useEffect, useState } from "react";
import HeroSection from "../../components/HeroSection";
import Navbar from "../../components/molecules/Navbar";
import { Button, Grid } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

import zeroPartyData from "../../assets/img/home-pagebanner/zeropartyData-banner.png";
import marketInsights from "../../assets/img/home-pagebanner/marketInsights.svg";
import customerSuccess from "../../assets/img/home-pagebanner/customerSuccess.svg";
import copilotBanner from "../../assets/img/home-pagebanner/copilot-banner.png";
import diversePlatforms from "../../assets/img/home-pagebanner/diversePlatforms.svg";
import advancedAnalytics from "../../assets/img/home-pagebanner/advancedAnalytics.png";
import crossTabAnalysis from "../../assets/img/home-pagebanner/crossTabAnalysis.png";
import AIGeneratedInsights from "../../assets/img/home-pagebanner/AIGeneratedInsights.svg";
import marketResearch from "../../assets/icons/home-page-icons/marketResearch.svg";
import brandLoyalty from "../../assets/icons/home-page-icons/brandLoyalty.svg";
import netPromoterScore from "../../assets/icons/home-page-icons/netPromoterScore.svg";
import churnPrediction from "../../assets/icons/home-page-icons/churnPrediction.svg";
import customerSatisfaction from "../../assets/icons/home-page-icons/customerSatisfaction.svg";
import leadGeneration from "../../assets/icons/home-page-icons/leadGeneration.svg";
import marketing from "../../assets/img/home-pagebanner/marketing.svg";
import whyConvertML from "../../assets/img/home-pagebanner/Why-ConvertML.png";
import HomeFooter from "../../components/home-footer";
import { Helmet } from "react-helmet";
import { homeStructuredData } from "../../assets/data/schema-markup";
import { blogListData } from "../../assets/data/blog";
import { homepage } from "../../assets/data/metadata-list";

function HomePage() {
  useEffect(() => {}, []);
  const [selectTab, setselectTab] = useState("gainDeeper");
  const navigate = useNavigate();
  const getstartedClick = () => navigate("/signup");
  const analyticalTabs = (selTabs) => {
    if (selTabs == "gainDeeper") {
      setselectTab("gainDeeper");
    } else if (selTabs == "identifyAt") {
      setselectTab("identifyAt");
    } else if (selTabs == "predictBuying") {
      setselectTab("predictBuying");
    }
  };
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(homeStructuredData),
        }}
      />
      <Helmet>
        <title>{homepage.title} </title>
        <meta
          name="description"
          content={homepage.description}
          data-rh="true"
        />
        <meta
          name="og:description"
          content={homepage.description}
          data-rh="true"
        />
        <meta name="keywords" content={homepage.keywords} data-rh="true" />
        <meta property="og:title" content={homepage.title} data-rh="true" />
        <meta property="og:image" content={homepage.image} data-rh="true" />
        <meta property="og:url" content={homepage.url} data-rh="true" />
        <meta
          property="og:publisher"
          content={homepage.publisher}
          data-rh="true"
        />
        <meta property="og:author " content={homepage.author} data-rh="true" />
        <meta
          property="og:site_name"
          content={homepage.site_name}
          data-rh="true"
        />
        <meta property="og:locale" content={homepage.locale} data-rh="true" />
        <meta property="og:type" content={homepage.type} data-rh="true" />
        <link rel="canonical" href={homepage.canonical} data-rh="true" />
      </Helmet>
      <h1 className="d-none">The Ultimate Customer Insights Platform</h1>
      <Navbar />
      <HeroSection />
      <div className="web-view">
        <br />
        <br />
      </div> 
      <br /> 
      <section className="section-skyblue">
        <div className="container-home text-center">
          <h2 className="text-center">
            <b> Why ConvertML?</b>
          </h2>
          <Grid
            container
            spacing={8}
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <Grid item xs={12} md={9} lg={9}>
              <img
                src={whyConvertML}
                alt="why ConvertML"
                className="img-responsive"
              />
              <h3>Gain unparalleled understanding of your customers!</h3>
              <p>
                Struggling with data coming from diverse sources and not able to
                derive actionable insights quickly? Our GenAI engine seamlessly
                integrates and standardizes data from diverse sources,
                empowering you with rich predictive and prescriptive insights
                for immediate action and future strategies. Think of it as
                having an in-house analytics team performing your CSAT, NPS,
                Churn Prediction, Lead Generation and more at a fraction of cost
                and time!
                <br />
                <br />
              </p>
            </Grid>
          </Grid>
        </div>
      </section>
      <div className="home-roles-page">
        <div className="container-home">
          <h2 className="text-center">
            <b>
              <h2 className="text-center">
                <b> Built for Customer-Centric Teams!</b>
              </h2>
            </b>
          </h2>
          <div className="web-view"> <br />
          <br /></div> 
          <br />
          <Grid
            container
            spacing={4}
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <Grid item xs={12} md={3} lg={3}>
              <div className="skybluebox">
                <img src={marketInsights} alt="Market Insights" />
                <div className="heading  mb-2">Market Insights</div>
                <p>
                  Uncover & predict market trends with precision with cross-tab
                  segmentation, sentiment analysis, customizable charts and
                  GenAI insights.
                </p>

                <Link to="/solutions/roles/market-insights">Learn more</Link>
              </div>{" "}
            </Grid>
            <Grid item xs={12} md={3} lg={3}>
              <div className="skybluebox">
                <img src={customerSuccess} alt="Customer Success" />
                <div className="heading  mb-2">Customer Success</div>
                <p>
                  Uncover insights by merging qualitative and quantitative data
                  to get a micro and macroscopic view of customers’ journeys!
                </p>

                <Link to="/solutions/roles/market-insights">Learn more</Link>
              </div>{" "}
            </Grid>
            <Grid item xs={12} md={3} lg={3}>
              <div className="skybluebox">
                <img src={marketing} alt="Marketing" />
                <div className="heading mb-2">Marketing</div>
                <p>
                  Hyper-personalize marketing effortlessly with a 360° customer
                  view with granular segmentation and prescriptive insights.
                </p>

                <Link to="/solutions/roles/market-insights">Learn more</Link>
              </div>{" "}
            </Grid>
          </Grid>
        </div>
      </div>
      <br />
      <section className="section-skyblue mt-4">
        <div className="container-home">
          <Grid
            container
            spacing={8}
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <Grid item xs={12} md={5} lg={5}>
              <h2>
                Meet <b className="brandtext-color">ConvertML Copilot</b> Like
                ChatGPT but much more.{" "}
              </h2>
              <p>
                Through Copilot, you can converse with data like you’d talk to
                an expert and get instant answers all through a simple chat
                interface. You can then ask follow-up questions without
                providing additional context each time, with all your chat
                histories saved and backed up for future conversations or
                referencing.
              </p>
              <br />
              <Link to="/contactus" className="link-btn">
                Contact us
              </Link>
              <br />
              <br />
              <br />
            </Grid>
            <Grid item xs={12} md={7} lg={7}>
              <img
                src={copilotBanner}
                alt="why ConvertML"
                className="img-responsive"
              />
            </Grid>
          </Grid>
        </div>
      </section>
      <div className="banner-content-section">
        <div className="container-home">
          <Grid
            container
            spacing={8}
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <Grid item xs={12} md={6} lg={6}>
              <h2>Go Deep by Connecting Diverse Platforms</h2>
              <p>
                Integrate data from diverse platforms with just a few clicks and
                get actionable insights! Get the best of both the worlds by
                combining Qualitative and Quantitative data. From data cleaning
                and processing, our powerful AI is working for you to streamline
                your workflow and access a comprehensive suite of analytical
                models — all in one place.
              </p>
              <p>
                Quantitative metrics + Qualitative insights = Data Brilliance!
              </p>
              <br />
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <img
                src={diversePlatforms}
                alt="sitting in Goldmine"
                className="img-responsive"
              />
            </Grid>
          </Grid>
        </div>
        <br /> <br />  
        <section className="section-gray">
          <div className="container-home">
            <Grid
              container
              spacing={8}
              direction="row"
              justifyContent="center"
              alignItems="center"
            >
              <Grid item xs={12} md={6} lg={6} className="d-md-block">
                <img
                  src={advancedAnalytics}
                  alt="Your Competitive Advantage"
                  className="img-responsive"
                />
              </Grid> 
              <Grid item xs={12} md={6} lg={6}>
                <h2>All-in-One Dashboard for Advanced Analytics</h2>
                <p>
                Simplify your analysis process with ConvertML's intuitive dashboard. Unlock new levels of customer and market insights and get a holistic view of your customer sentiments and behavior in real-time. Customize plots to your business case. Run the plots through ConvertML CoPilot to not only identify shifts in trends and themes but also get a curated action plan to stay ahead of your competition!
                </p>
              </Grid>
              <Grid item xs={12} md={6} lg={6} className="d-xs-block">
                <img
                  src={advancedAnalytics}
                  alt="Your Competitive Advantage"
                  className="img-responsive"
                />
              </Grid>
            </Grid>
          </div>
        </section>
        <br /> <br />  
        <div className="container-home">
          <Grid
            container
            spacing={8}
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <Grid item xs={12} md={6} lg={6}>
              <h2>Instant Clarity Instant Reports</h2>
              <p>
              Say goodbye to manually digging through data or waiting on ad hoc reports and get the answers you need instantly. With ConvertML, get quick, insightful answers about your customers just by asking questions. Work complete? Automate report generation with a single click so you can focus more on your data storytelling! With ConvertML, spend less time figuring out complex insights and repetitive report-making and more time on the 'why' and 'how.'
              </p>
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <img
                src={AIGeneratedInsights}
                alt="ConvertML’s Unique Zero-Party Data Approach"
                className="img-responsive"
              />
            </Grid>
          </Grid>
        </div>
        <div className="web-view"> <br />
          <br />
          <br /></div> 
        <section className="section-gray">
          <div className="container-home">
            <Grid
              container
              spacing={8}
              direction="row"
              justifyContent="center"
              alignItems="center"
            >
              <Grid item xs={12} md={6} lg={6} className="d-md-block">
                <img
                  src={crossTabAnalysis}
                  alt="Cross-Tab Analysis"
                  className="img-responsive"
                />
              </Grid>

              <Grid item xs={12} md={6} lg={6}>
                <h2>Intelligent Cross-Tab Analysis</h2>
                <p>
                Effortlessly analysis of how specific groups of respondents answered various questions in the survey and how it compares to the rest of the population. Discover the correlation between different sets of features to understand complex relationships. Use the insights uncovered to make business decisions, develop marketing strategies, or refine product offerings.
                </p>
              </Grid>
              <Grid item xs={12} md={6} lg={6} className="d-xs-block">
                <img
                  src={advancedAnalytics}
                  alt="Your Competitive Advantage"
                  className="img-responsive"
                />
              </Grid>
            </Grid>
          </div>
        </section>
        <div className="web-view"> <br />  <br /></div> 
        <section className="section-skyblue">
          <div className="container-home">
            <Grid
              container
              spacing={8}
              direction="row"
              justifyContent="center"
              alignItems="center"
            >
              <Grid item xs={12} md={5} lg={5}>
                <h2>
                  Unique{" "}
                  <b className="brandtext-color"> Zero-Party Data</b> 
                  Approach{" "}
                </h2>
                <p>
                Are you relying on third-party data for customer insights? Warning: It’s turning obsolete. 90% of the companies are headed toward the ultimate source of truth: Zero Party Data.
                </p><br/>
                <p> 
With ConvertML you can integrate zero-party data with other first-party data sources like surveys, and feedback forms–to understand the who, what, where, how, and why of your customers. We call it the Code Free Quant + Qual Magic!

                </p>
              </Grid>
              <Grid item xs={12} md={7} lg={7}>
                <img
                  src={zeroPartyData}
                  alt="why ConvertML"
                  className="img-responsive"
                />
              </Grid>
            </Grid>
          </div>
        </section>
      </div>
      <section className="no-CodeAnalytical mt-3">
        <div className="container-home">
          <h2 className="text-center"> Our No-Code Analytical Models</h2>
          <Grid
            container
            spacing={2}
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <Grid item xs={12} md={4} lg={4}>
              <div className="panel-box">
                <img
                  src={marketResearch}
                  alt="Your Competitive Advantage"
                  className="img-responsive"
                />
                <div className="heading">Market Research </div>
                <p>
                  <hr className="hr1" /> Get actionable insights from market research data to optimize customer engagement and data-driven decisions.
                </p>
              </div>
            </Grid>
            <Grid item xs={12} md={4} lg={4}>
              <div className="panel-box">
                <img
                  src={brandLoyalty}
                  alt="Your Competitive Advantage"
                  className="img-responsive"
                />
                <div className="heading">Brand Loyalty </div>
                <p>
                  <hr className="hr2" />Measure your brand perception to understand customer loyalty to the brand

                </p>
              </div>
            </Grid>
            <Grid item xs={12} md={4} lg={4}>
              <div className="panel-box">
                <img
                  src={netPromoterScore}
                  alt="Net Promoter Score"
                  className="img-responsive"
                />
                <div className="heading">Net Promoter Score  </div>
                <p>
                  <hr className="hr3" /> Segment detractors and promoters based on their loyalty, lifetime value, and other critical metrics.
                </p>
              </div>
            </Grid>
            <Grid item xs={12} md={4} lg={4}>
              <div className="panel-box">
                <img
                  src={customerSatisfaction}
                  alt="Customer Satisfaction"
                  className="img-responsive"
                />
                <div className="heading">Customer Satisfaction </div>
                <p>
                  <hr className="hr4" /> Stay ahead of customer satisfaction based on interactions and feedback

                </p>
              </div>
            </Grid>
            <Grid item xs={12} md={4} lg={4}>
              <div className="panel-box">
                <img
                  src={leadGeneration}
                  alt="Lead Generation"
                  className="img-responsive"
                />
                <div className="heading">Lead Generation  </div>
                <p>
                  <hr className="hr5" /> Measure your brand perception to understand customer loyalty to the brand

                </p>
              </div>
            </Grid>
            <Grid item xs={12} md={4} lg={4}>
              <div className="panel-box">
                <img
                  src={churnPrediction}
                  alt="Churn Prediction"
                  className="img-responsive"
                />
                <div className="heading">Churn Prediction</div>
                <p>
                  <hr className="hr3" />Identify at-risk customers before they churn using factors such as financial transactions, feedback, product/service usage, and much more 
                </p>
              </div>
            </Grid>
          </Grid>
        </div>
      </section><div className="web-view"> <br /> <br /> <br /></div>  
      <HomeFooter />
    </>
  );
}
export default HomePage;
