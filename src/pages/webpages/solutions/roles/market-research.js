import React, { useEffect } from "react";
import HeroSection from "../../../../components/HeroSection";
import NavigationLinkSection from "../../../../components/NavigationLinkSection";
import ConvertMLMarketingSection from "../../../../components/ConvertMLMarketingSection";
import ConvertMLretainAndGrow from "../../../../components/ConvertMLretainAndGrow";
import Footer from "../../../../components/Footer";
import Navbar from "../../../../components/molecules/Navbar";
import customerSuccessBanner from "../../../../assets/img/solutions/customer-success.png";
import { Link, useNavigate } from "react-router-dom";
import { Grid } from "@mui/material";
import { Container } from "postcss";

import salesforce from "../../../../assets/icons/salesforce.png";
import hubsport from "../../../../assets/icons/hubsport.png";
import zendesk from "../../../../assets/icons/zendesk.png";
import marketo from "../../../../assets/icons/marketo.png";
import freshdesk from "../../../../assets/icons/freshdesk.png";
import stripe from "../../../../assets/icons/stripe.png";
import recurly from "../../../../assets/icons/recurly.png";
import mixpanel from "../../../../assets/icons/mixpanel.png";
import hootsuite from "../../../../assets/icons/hootsuite.png";
import typeform from "../../../../assets/icons/typeform.png";
import googleForms from "../../../../assets/icons/googleForms.png";
import surveymonkey from "../../../../assets/icons/surveymonkey.png";
import marketResearchBanner from "../../../../assets/img/marketResearch.png";
import productDevelopment from "../../../../assets/img/solutions/churnproductdevelopment.png";
import marketing from "../../../../assets/img/solutions/churnmarketing.png";
import HomeFooter from "../../../../components/home-footer";
import { Helmet } from "react-helmet";
import {
  CustomerSuccessMeta,
  DataSourcesList,
  insightsActionDataCS, 
  mainHeading,
  marketResearchData,
  midContentDataCS,
} from "../../../../assets/data/roles";
import { customerSuccessData } from "../../../../assets/data/schema-markup";
import { customerSuccess } from "../../../../assets/data/metadata-list";

export default function MarketResearch() {
  useEffect(() => {}, []);
  const navigate = useNavigate();
  const getstartedClick = () => navigate("/signup");
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(customerSuccessData),
        }}
      />

      <Helmet>
        <title>{customerSuccess.title} </title>
        <meta
          name="description"
          content={customerSuccess.description}
          data-react-helmet="true"
        />
        <meta name="keywords" content={customerSuccess.keywords} />
        <meta property="image" content={customerSuccess.image} />
        <meta property="url" content={customerSuccess.url} />
        <meta property="publisher" content={customerSuccess.publisher} />
        <meta property="author " content={customerSuccess.author} />
        <meta property="site_name" content={customerSuccess.site_name} />
        <meta property="locale" content={customerSuccess.locale} />
        <meta property="type" content={customerSuccess.type} />
        <link rel="canonical" href={customerSuccess.canonical} />
      </Helmet>
      <Navbar />
      {/* ------------------- banner   ------------------- */}
      <div className="pinkbannercusve-onlyheading">
        <section className="container-home ">
          <Grid container spacing={3} direction="row">
            <Grid item xs={12} md={5} lg={5}>
              <div className="banner-top-heading">Market Research</div> 
              <br />
              <h4> 
              ConvertML: Revolutionize Your Market Insights with AI-Powered Precision
              </h4>
              <p>
              ConvertML’s Market Research template is a one-stop solution to all your marketing needs. Before you explore multipurpose model templates to suit your specific needs, the Market Research feature gets you a quick overview of your data. As part of this offering, you’re equipped with tons of features such as sentiment analytics, multidimensional cross-tab segmentation, customer segmentation, generative AI Data Insights, and our top-of-the-line offering, ConvertML Copilot.
              </p>
              <div className="clearfix"></div> <br />
              <button onClick={getstartedClick} className="link-btn">
                <i className="fa fa-play-circle mr-1"> </i> Get Started
              </button>
            </Grid>
            <Grid item xs={12} md={7} lg={7}>
              <br />
              <img
                src={marketResearchBanner}
                title={"banner"}
                alt={"banner"}
                className="img-responsive"
              />
            </Grid>
          </Grid>
        </section>
      </div>
      {/* ------------------- banner   ------------------- */}
      <section>
        <div className="container-home">
          <h4 className="text-center fw-600">
            All Your Data Sources In A Single Dashboard
          </h4>
          <Grid
            container
            spacing={2}
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            {DataSourcesList.map((item) => (
              <>
                <Grid item xs={3} md={1} lg={1}> 
                  <img
                    src={"/json-media/img/partners/" + item.imgname + "-sm.svg"}
                    alt={item.imgname}
                    title={item.imgname}
                    width={35}
                  /> 
                </Grid> 
              </>
            ))}
          </Grid> 
        </div> 
      </section>

      {marketResearchData.map((content) => (
            <section className={content.bannerdirection == "right"?'section-skyblue':''}>
              <div className="container-home">
              <div className="web-view">
                <Grid
                  container
                  spacing={8}
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                >
                  {content.bannerdirection == "left" ? (
                    <>
                      <Grid item xs={12} md={6} lg={6}>
                        {" "}
                        <img
                          src={"/json-media/img/solutions/marketResearch/" + content.bannerName + ".png"}
                          alt="sitting in Goldmine"
                          className="img-responsive"
                        />{" "}
                      </Grid>{" "}
                      <Grid item xs={12} md={6} lg={6}>
                        <div className="heading2"> {content.heading}</div>
                        {content.listContent.map((content) => (
                          <>
                            <div
                              className={
                                content.heading == null
                                  ? ""
                                  : "check-heading mb-1 mt-1"
                              }
                            >
                              <b>{content.heading}</b>{" "}
                            </div>
                            <p> {content.content}</p>
                          </>
                        ))}
                      </Grid>
                    </>
                  ) : (
                    <> 
                      <Grid item xs={12} md={6} lg={6}>
                        <div className="heading2"> {content.heading}</div>
                        {content.listContent.map((content) => (
                          <>
                            <div
                              className={
                                content.heading == null
                                  ? ""
                                  : "check-heading mb-1 mt-1"
                              }
                            >
                              <b>{content.heading}</b>{" "}
                            </div>
                            <p> {content.content}</p>
                          </>
                        ))}
                      </Grid>
                      <Grid item xs={12} md={6} lg={6}>
                        {" "}
                        <img
                          src={"/json-media/img/solutions/marketResearch/" + content.bannerName + ".png"}
                          alt="sitting in Goldmine"
                          className="img-responsive"
                        />{" "}
                      </Grid>{" "}
                    </>
                  )}
                </Grid>
              </div>

              <div className="mobile-view">
                <Grid
                  container
                  spacing={8}
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Grid item xs={12} md={6} lg={6}>
                    <h2> {content.heading}</h2>
                    {content.listContent.map((content) => (
                      <>
                        <h4
                          className={
                            content.heading == null ? "" : "check-heading mb-1"
                          }
                        >
                          {" "}
                          {content.heading}
                        </h4>
                        <p> {content.content}</p>
                      </>
                    ))}
                  </Grid>
                  <Grid item xs={12} md={6} lg={6}>
                    {" "}
                    <img
                      src={"/json-media/img/solutions/marketResearch/" + content.bannerName + ".png"}
                      alt="sitting in Goldmine"
                      className="img-responsive"
                    />{" "}
                  </Grid>
                </Grid>
              </div>
              </div>
            </section>
          ))}

      <HomeFooter />
    </>
  );
}
