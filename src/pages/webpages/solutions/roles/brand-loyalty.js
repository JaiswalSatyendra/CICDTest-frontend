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
import brandLoyaltyBanner from "../../../../assets/img/brandLoyalty.png";
import productDevelopment from "../../../../assets/img/solutions/churnproductdevelopment.png";
import marketing from "../../../../assets/img/solutions/churnmarketing.png";
import HomeFooter from "../../../../components/home-footer";
import { Helmet } from "react-helmet";
import {
  CustomerSuccessMeta,
  DataSourcesList,brandLoyaltyData
} from "../../../../assets/data/roles";
import { customerSuccessData } from "../../../../assets/data/schema-markup";
import { customerSuccess } from "../../../../assets/data/metadata-list";

export default function BrandLoyalty() {
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
              <div className="banner-top-heading">Brand Loyalty</div> 
              <br />
              <h4> 
              Superpower Loyalty with AI-Driven Loyalty Scoring and Engagement Tracking
              </h4>
              <p>
              With ConvertML’s Brand Loyalty template you’re well positioned to understand, measure, and enhance customer loyalty towards your brand: you don’t need more tools in your bag, you need ConvertML. With a bundle of features including loyalty score calculation, customer engagement tracking across social media channels, sentiment analysis, and our star offering “CoPilot” you’re sure to up those loyalty numbers in no time!
              </p>
              <div className="clearfix"></div> <br />
              <button onClick={getstartedClick} className="link-btn">
                <i className="fa fa-play-circle mr-1"> </i> Get Started
              </button>
            </Grid>
            <Grid item xs={12} md={7} lg={7}>
              <br />
              <img
                src={brandLoyaltyBanner}
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

      {brandLoyaltyData.map((content) => (
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
                          src={"/json-media/img/solutions/brandLoyalty/" + content.bannerName + ".png"}
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
                            <p> {content.content}<div className="mt-3"></div></p>
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
                            <p> {content.content}<div className="mt-3"></div> </p>
                          </>
                        ))}
                      </Grid>
                      <Grid item xs={12} md={6} lg={6}>
                        {" "}
                        <img
                          src={"/json-media/img/solutions/brandLoyalty/" + content.bannerName + ".png"}
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
                            content.heading == null ? "" : "check-heading mb-1 mt-1"
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
                      src={"/json-media/img/solutions/brandLoyalty/" + content.bannerName + ".png"}
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
