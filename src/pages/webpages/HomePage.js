import React, { useEffect, useState } from "react";
import HeroSection from "../../components/HeroSection";
import Navbar from "../../components/molecules/Navbar";
import { Button, Grid } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import marketResearchInsights from "../../assets/icons/marketResearchInsights.svg";

import customerSuccess from "../../assets/icons/customerSuccess.svg";
import marketing from "../../assets/icons/marketing.svg";
import productManagement from "../../assets/icons/productManagement.svg";

import zeropartyData from "../../assets/img/home-pagebanner/zeropartyData.webp";
import competitiveadvantage from "../../assets/img/home-pagebanner/competitiveadvant.webp";
import sittingingoldine from "../../assets/img/home-pagebanner/sittingingold-ine.webp";

import arrown from "../../assets/icons/arrown.svg";

import analyticalmodel1 from "../../assets/img/home-pagebanner/analyticalmodel1.png";
import analyticalmodel2 from "../../assets/img/home-pagebanner/analyticalmodel2.png";
import analyticalmodel3 from "../../assets/img/home-pagebanner/analyticalmodel3.png";
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
        <title>{homepage.title}  </title>
        <meta name="description" content={homepage.description } data-rh="true" />
        <meta name="og:description" content={homepage.description } data-rh="true" />
        <meta name="keywords"  content={homepage.keywords} data-rh="true" /> 
        <meta property="og:title" content={homepage.title } data-rh="true" />
        <meta property="og:image" content={homepage.image} data-rh="true" />
        <meta property="og:url" content={homepage.url} data-rh="true"/>
        <meta property="og:publisher" content={homepage.publisher} data-rh="true" />
        <meta property="og:author " content={homepage.author} data-rh="true" />
        <meta property="og:site_name" content={homepage.site_name} data-rh="true" />
        <meta property="og:locale" content={homepage.locale} data-rh="true" />
        <meta property="og:type" content={homepage.type} data-rh="true"/>
        <link rel="canonical" href={homepage.canonical} data-rh="true" />
      </Helmet>
      <h1 className="d-none">The Ultimate Customer Insights  Platform</h1>
      <Navbar />
      <HeroSection />
      <div className="container-home">
        <div className="builtfor-section">
          <h2 className="fw-600"> Built For</h2>
          <Link to="../solutions/roles/market-insights">
            <img src={marketResearchInsights} alt={marketResearchInsights} />{" "}
            Market Insights{" "}
          </Link>
          <Link to="../solutions/roles/customer-success-software">
            <img src={customerSuccess} alt={customerSuccess} /> Customer Success{" "}
          </Link>
          <Link to="../solutions/roles/marketing">
            <img src={marketing} alt={marketing} /> Marketing
          </Link>
          <Link to="#">
            <img src={productManagement} alt={productManagement} /> Product
            Management{" "}
          </Link>
        </div>
      </div>
      <div className="banner-content-section">
        <div className="container-home">
          <Grid
            container
            spacing={8}
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <Grid item  xs={12} md={6} lg={6}> 

              <h2>You’re Sitting on a Goldmine of Untapped Potential</h2>
              <p>
                As a high-growth company, you have data that is unique to you
                and it’s being unused. This is zero-party data that is buried
                deep in your surveys, comments, and user generated content just
                waiting to be harnessed. If used properly, this is data that
                could elevate CLTV, enhance revenue predictability, bolster
                investor confidence, and give you a competitive advantage in
                your market.
              </p>
              <p>
                However, given the complexity and multifaceted nature of
                connecting zero-party data with transactional data, there was no
                tool powerful enough without breaking the bank for nimble teams
                like yours to access. Until now.
              </p>
              <br />
            </Grid>
            <Grid item  xs={12} md={6} lg={6}>
              <img
                src={sittingingoldine}
                alt="sitting in Goldmine"
                className="img-responsive"
              />
            </Grid>
          </Grid>
        </div>
        <br /> <br /> <br />
        <section className="section-gray">
          <div className="container-home">
            <Grid
              container
              spacing={8}
              direction="row"
              justifyContent="center"
              alignItems="center"
            >
              <Grid  item xs={12} md={7} lg={7} className="d-md-block">
                <img
                  src={competitiveadvantage}
                  alt="Your Competitive Advantage"
                  className="img-responsive"
                />
              </Grid>

              <Grid item  xs={12} md={5} lg={5}>
                <h2>Your Competitive Advantage</h2>
                <p>
                  ConvertML was specifically designed to empower nimble
                  marketing teams by leveraging zero-party data and data from
                  places like web analytics, CRM, Social Media, Point-of-Sales
                  Systems, and Surveys - all at once - so you can predict
                  customer behavior and build your competitive advantage.
                </p>
                <b>No data scientist or coding required</b>
              </Grid>
              <Grid item  xs={12} md={6} lg={6} className="d-xs-block">
                <img
                  src={competitiveadvantage}
                  alt="Your Competitive Advantage"
                  className="img-responsive"
                />
              </Grid>
            </Grid>
          </div>
        </section>
        <br /> <br /> <br />
        <div className="container-home">
          <Grid
            container
            spacing={8}
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <Grid item  xs={12} md={5} lg={5}>
              <h2>ConvertML’s Unique Zero-Party Data Approach</h2>
              <p>
                Zero-party data is an invaluable asset that offers unparalleled
                insights into your customers. Unfortunately, it is frequently
                overlooked and undervalued.
              </p>
              <p>
                ConvertML is the only platform to harness Zero-Party data at
                scale, along with other types of customer data, consolidating
                proprietary insights within a unified platform, enabling you to
                gain insights on your customers at an unprecedented level.
              </p>
            </Grid>
            <Grid item  xs={12} md={7} lg={7}>
              <img
                src={zeropartyData}
                alt="ConvertML’s Unique Zero-Party Data Approach"
                className="img-responsive"
              />
            </Grid>
          </Grid>
        </div>
      </div>
      <br />
      <br />
      <br />
      <div className="container-home">
        <div className="howitworks">
          <h2>How it works</h2>
          <Grid
            container
            direction="row"
            justifyContent="space-around"
            alignItems="center"
          >
            <Grid item xs={12} md={3} lg={3}>
              <div className="box">
                <img
                  src={"/images/connect.png"}
                  alt="convertml"
                  className="float-left mr-2"
                />
                <span className="heading">Connect</span>
                <p>
                  Connect to multiple sources at once, from surveys and
                  transactions to CRMs, with a few short clicks
                </p>
              </div>
            </Grid>
            <Grid item xs={12} md={1} lg={1}>
              <div className="text-center">
                {" "}
                <img src={arrown} alt="convertml" className="d-inline" />
              </div>
            </Grid>
            <Grid xs={12} md={3} lg={3}>
              <div className="box middleBox">
                <img
                  src={"/images/predict.png"}
                  alt="convertml"
                  className="float-left mr-2"
                />
                <span className="heading">Predict</span>
                <p>
                  Leverage advanced, code-free, predictive insights about your
                  customers on one dashboard. Stay one step ahead so you can
                  take the right intervention steps and know what customers what
                  they want before they want it.
                </p>
              </div>
            </Grid>
            <Grid item xs={12} md={1} lg={1}>
              <div className="text-center">
                <img src={arrown} alt="convertml" className="d-inline" />
              </div>
            </Grid>
            <Grid item xs={12} md={3} lg={3}>
              <div className="box">
                <img
                  src={"/images/convert.png"}
                  alt="convertml"
                  className="float-left mr-2"
                />
                <span className="heading">Convert</span>
                <p>
                  Leverage the data-driven insights from ConvertML to swiftly
                  target customers who are most likely to churn by delivering
                  personalized promotions tailored to their specific needs.
                </p>
              </div>
            </Grid>
          </Grid>
          <div className="clearfix"></div>
          <br />
          <br />
          <div className="text-center">
            <button onClick={getstartedClick} className="link-btn">
              <i className="fa fa-play-circle"> </i> Get Started
            </button>
          </div>
        </div>
      </div>

      <br />
      <br />
      <br />

      <section className="section-gray">
        <div className="am-section container-home">
          <h2 className="text-center  fw-600">Our No-Code Analytical Models</h2>
          <Grid
            container
            spacing={8}
            direction="row"
            justifyContent="center"
            alignItems="top"
          >
            <Grid  item xs={12} md={5} lg={5}>
              <div className="d-md-block">
                <br />
                <br />
                <br />
                <br />
              </div>
              <Button
                className={
                  selectTab == "gainDeeper"
                    ? "selected-button"
                    : "default-button"
                }
                onClick={(e) => analyticalTabs("gainDeeper")}
              >
                Gain Deeper Customer Understanding
              </Button>{" "}
              <br />
              <br />
              <Button
                className={
                  selectTab == "identifyAt"
                    ? "selected-button"
                    : "default-button"
                }
                onClick={(e) => analyticalTabs("identifyAt")}
              >
                Identify At-Risk Customers
              </Button>
              <br /> <br />
              <Button
                className={
                  selectTab == "predictBuying"
                    ? "selected-button"
                    : "default-button"
                }
                onClick={(e) => analyticalTabs("predictBuying")}
              >
                Predict Buying Behavior
              </Button>
            </Grid>
            <Grid item  xs={12} md={7} lg={7}>
              {selectTab == "gainDeeper" ? (
                <div>
                  {" "}
                  <img
                    src={analyticalmodel1}
                    alt="analyticalModels"
                    className="img-responsive"
                  />{" "}
                  <br />
                </div>
              ) : (
                ""
              )}

              {selectTab == "identifyAt" ? (
                <div>
                  <img
                    src={analyticalmodel2}
                    alt="analyticalModels2"
                    className="img-responsive"
                  />{" "}
                  <br />
                </div>
              ) : (
                ""
              )}

              {selectTab == "predictBuying" ? (
                <div>
                  <img
                    src={analyticalmodel3}
                    alt="analyticalModels3"
                    className="img-responsive"
                  />{" "}
                  <br />
                </div>
              ) : (
                ""
              )}
            </Grid>
          </Grid>
        </div>
      </section>
      <br />
      <br /> 
      <section className="blog-home-list">
        <div className="container-home postbloglist">
          <div className="text-center">
            <h2 className="fw-600">Blogs</h2>
          </div>
          <Grid
            container
            spacing={2}
            direction="row"
            justifyContent="left"
            alignItems="center"
          >
            {blogListData.map(
              (blog, index) =>
                index < 4 && (
                  <Grid item  xs={12} md={3} lg={3}>
                    <Link to={blog.path}>
                      <div className="blogBox">
                        <div className="imgbox">
                          <img
                            src={
                              "/json-media/img/blogs/" + blog.thumbnail + ".png"
                            }
                            alt={blog.thumbnail}
                          />
                        </div>
                        <div className="clearfix"></div>
                        <span className="name">{blog.name}</span>
                        <Link to={blog.path} className="readmore">
                          {" "}
                          Read more{" "}
                        </Link>
                      </div>{" "}
                    </Link>
                  </Grid>
                )
            )}
          </Grid><br/>
          <Link to={"./blogs"} className="float-right">
            see more blogs
          </Link><br/>
        </div>
      </section>

      <br />
      <div className="am-section container-home">
        <h2 className="text-center  fw-600">
          Our Complete List of No-Code Models
        </h2>
        <Grid
          container
          spacing={2}
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <Grid item  xs={12} md={4} lg={4}>
            <div className="content-box">
              <img src={"/images/crosssell.png"} alt="crosssell" />
              <h3>Cross sell & up sell Analysis</h3>
              <p>
                Cross sell and upsell are ways to increase customer value. The
                magic of successful cross sell is to make a relevant offer to
                the right customer at the right time and using the right
                communication channel. A solution to this problem is not easy
                and involves a lot of analytics.
              </p>
            </div>
          </Grid>

          <Grid  item xs={12} md={4} lg={4}>
            <Link to={"../net-promoter-score"}>
              <div className="content-box">
                <img src={"/images/netPromoter.png"} alt="netPromoter" />
                <h3>Net Promoter Score Analysis</h3>
                <p>
                  NPS is a customer experience metric that shows how likely
                  clients are to recommend a given service or product. But it
                  can be even more valuable if you perform diligent analysis of
                  qualitative feedback.
                </p>
              </div>
            </Link>
            <br />

            <Link to={"../churn-analysis"}>
              <div className="content-box">
                <img
                  src={"/images/predictiveChurn.png"}
                  alt="predictiveChurn"
                />
                <h3>Predictive Churn Analysis</h3>
                <p>
                  Churn Prediction Model is a predictive model that calculates,
                  on an individual customer basis, the likelihood (or
                  susceptibility) that a customer will stop doing business with
                  the company.
                </p>
              </div>
            </Link>
            <br />

            <Link to={"../customer-satisfaction-analysis"}>
              <div className="content-box">
                <img
                  src={"/images/customerSatisfaction.png"}
                  alt="customerSatisfaction"
                />
                <h3>Customer Satisfaction Analysis</h3>
                <p>
                  A CSAT (short for customer satisfaction) survey is a feedback
                  survey used to measure customers' satisfaction levels with
                  your company's product, service, or a particular interaction.
                </p>
              </div>{" "}
            </Link>
          </Grid>
          <Grid item  xs={12} md={4} lg={4}>
            <div className="content-box">
              <img src={"/images/leadScoring.png"} alt="leadScoring" />
              <h3>Lead Scoring</h3>
              <p>
                Lead scoring is a methodology used by sales and marketing
                departments to determine the worthiness of leads, or potential
                customers, by attaching values to them based on their behavior
                relating to their interest in products or services.
              </p>
            </div>
            <br />
            <div className="dark-box">
              <h5>Get started today</h5>
              <p>
                ConvertML collects events from 100+ data sources and provides a
                complete ML toolkit to every team in your company
              </p>
              <br />
              <a className="white-btn" href="#getStarted">
                Request a demo
              </a>
            </div>
          </Grid>
        </Grid>
      </div>
      <br />
      <br />
      <br />
      <HomeFooter />
    </>
  );
}
export default HomePage;
