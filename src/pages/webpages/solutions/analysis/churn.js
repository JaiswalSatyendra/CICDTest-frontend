import React, { useEffect } from "react";  
import Navbar from "../../../../components/molecules/Navbar";
import churnAnalysis from "../../../../assets/img/solutions/churntopdesign.png"; 
import { Grid } from "@mui/material"; 

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

import productDevelopment from "../../../../assets/img/solutions/churnproductdevelopment.png";
import customerSuccess from "../../../../assets/img/solutions/churncustomersuccess.png";
import marketing from "../../../../assets/img/solutions/churnmarketing.png";
import HomeFooter from "../../../../components/home-footer";
import { Helmet } from "react-helmet";
import { dataSourceListChurn, insightsActionData } from "../../../../assets/data/roles";
import { useNavigate } from "react-router";
import { churnAnalysisData } from "../../../../assets/data/schema-markup";

import { churnMeta } from "../../../../assets/data/metadata-list";


function ChurnPage() {
  useEffect(() => {}, []);
  const navigate = useNavigate();
  const getstartedClick = () => navigate('/signup');

   

  return (
    <>
    <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(churnAnalysisData),
        }}
      />
      <Helmet> 
        <title>{churnMeta.title}  </title>
        <meta name="description" content={churnMeta.description } data-react-helmet="true" />
        <meta name="keywords"  content={churnMeta.keywords} />
        <meta property="image" content={churnMeta.image} />
        <meta property="url" content={churnMeta.url} />
        <meta property="publisher" content={churnMeta.publisher} />
        <meta property="author " content={churnMeta.author} />
        <meta property="site_name" content={churnMeta.site_name} />
        <meta property="locale" content={churnMeta.locale} />
        <meta property="type" content={churnMeta.type}/>
        <link rel="canonical" href={churnMeta.canonical} />
      </Helmet>  

      <Navbar />

      {/* ------------------- banner   ------------------- */}
      <div className="new-banner">
        <section className="container-home text-center">
        <div className="banner-top-heading">Churn Analysis</div> <br />
        <h1 className="m-0 d-none">
              Pinpoint at-risk customers swiftly, and fortify your   customer
                base Blending Zero   Party Data with Transactions 
              </h1>
              <div className="m-0 heading3">
              Pinpoint at-risk customers swiftly, and fortify your   <b>customer
                base Blending Zero </b> Party Data with Transactions 
              </div>

              <p>
                Categorize churn status, assess engagement levels with RFM
                analysis, and delve into detailed metrics. Swiftly identify and
                mitigate risks at scale, boost product stickiness, and foster
                cross-team alignment for a robust and scalable retention
                approach.
              </p><br/>
              <button  onClick={getstartedClick} className="link-btn">
            <i className="fa fa-play-circle"> </i> Get Started  
    </button>  <br/>  
          <img src={churnAnalysis} alt="predictive Churn Analysis" className="bannerimg" />
          <br/>  
        </section>
      </div>
      {/* ------------------- banner   ------------------- */}

      <div className="container-home">
        <section className="banner-content-section">
          <Grid
            container
            spacing={2}
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <Grid item xs={12} md={4} lg={4}>
              <h2>Tackle the Complexity of Churn Management!</h2>
              <a href="#getStarted" className="link-btn">
                Read More
              </a>
            </Grid>
            <Grid item xs={12} md={8} lg={8}>
              <p>
                Organizations are facing the challenge of seamlessly integrating
                diverse data sources and channels to categorize churn status,
                assess engagement levels, and dive deep into detailed metrics
                like "Too expensive" or "Switch." ConvertML makes this happen in
                seconds, this dual analysis ensures that strategic
                decision-making is enriched with a holistic view of customer
                sentiments and behaviors, offering a nuanced understanding that
                goes beyond numerical metrics alone.
              </p>

              <p>
                ConvertML’s code-free Churn Analysis further enables
                organizations to categorize customers based on Churn Risk,
                Behavior, and Preferences. This capability not only refines the
                Churn Analysis process but also contributes to the creation of
                personalized experiences and solutions. The efficiency gained
                through these features ensures that organizations don't just
                manage churn but do so with precision, saving resources and
              </p>
            </Grid>
          </Grid>
        </section>

        <section className="am-section">
          <Grid
            container
            spacing={2}
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <Grid item xs={12} md={6} lg={6}>
              <h2 className="text-center fw-600">
                How ConvertML gets you from insights to action <br />{" "}
              </h2>
            </Grid>
          </Grid>
          <Grid container spacing={2} direction="row">
            {insightsActionData.map((action) => (
              <>
                <Grid item xs={12} md={4} lg={4} key={action.id}>
                  <div className="content-box" style={{ height: 420 }}>
                  <img src={'/json-media/icons/'+action.img+'churn'+'.svg'} alt={action.img} title={action.img} width={100} /> 
                    <h3> 
                      {action.title} <br />
                      {action.title1}{" "}
                    </h3>
                    <p> {action.content} </p>
                  </div>
                </Grid>
              </>
            ))}
          </Grid>
        </section>

        <section className="getStarted">
          <Grid
            container
            spacing={2}
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <Grid item xs={12} md={6} lg={6}>
              <h3>Get started today</h3>
              <p>
                ConvertML collects events from 100+ data sources and provides a
                complete ML toolkit to every team in your company{" "}
              </p>
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <a href="#getStarted" className="white-btn float-right">
                Request a demo
              </a>
            </Grid>
          </Grid>
        </section>

        <div className="am-section">
          <div>
            <Grid
              container
              spacing={2}
              direction="row"
              justifyContent="center"
              alignItems="center"
            >
              <Grid item xs={12} md={6} lg={6}>
                <h2 className="text-center fw-600">Data Sources</h2>
              </Grid>
            </Grid>
            <Grid
              container
              spacing={2}
              direction="row"
              justifyContent="center"
              alignItems="center"
            >
             {dataSourceListChurn.map((action) => (
                <>
                  <Grid item xs={12} md={4} lg={4} key={action.id}>
                  <div
                      className="content-box text-center"
                      style={{minHeight:80, height:80, padding: 10, display: "block" }}
                    >
                      <img
                        // src={action.img}
                        src={
                          "./json-media/icons/" + action.img + ".png"
                        } 
                        alt={action.img}
                        className="img-responsive"
                        height={30}
                        width={150}
                      /> 
                    </div>
                  </Grid>
                </>
              ))}
            </Grid>
          </div>
        </div>
      </div>
      <br />
      <br />
      <br />
      <div className="container-home">
        <Grid
          container
          spacing={8}
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <Grid item xs={12} md={7} lg={7}>
            <h2 className="text-center fw-600">
              Empowering the Team for Proactive Churn Management
            </h2>
          </Grid>
        </Grid>
      </div>  <br />
      <br /> 
      <section >
        <div className="container-home">
          <Grid
            container
            spacing={8}
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <Grid item xs={12} md={6} lg={6}>
              <h2>Marketing</h2>
              <p>
                <h4 className="check-heading mb-1">Holistic Data Integration:</h4>
                Integrate surveys, user feedback, and transactional data for
                immediate, comprehensive churn insights. Streamline marketing
                decisions with targeted insights.
              </p>
              <p>
                <h4 className="check-heading mb-1">Micro-Level Insights:</h4>
                Drill down into micro-level details, providing names, sentiment
                analysis, and trust scores. Leverage topic-based sentiment
                analysis for a deeper marketing understanding.
              </p>
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <img
                src={marketing}
                alt="Customer Satisfaction Analysis"
                className="img-responsive"
              />
            </Grid>
          </Grid>
        </div>
      </section>
      <br />
      <br />
      <br />
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
                src={customerSuccess}
                alt="customerSuccess"
                className="img-responsive"
              />
            </Grid>

            <Grid item xs={12} md={6} lg={6}>
              <h2>Customer Success</h2>
              <p>
                <h4 className="check-heading mb-1">Swift Risk Identification:</h4>
                Cut down the time to pinpoint at-risk customers. Utilize
                insights for strategic marketing and product development
                strategies.
              </p>
              <p>
                <h4 className="check-heading mb-1">Satisfaction Dashboard:</h4>
                Utilize an intuitive dashboard for a 360-degree view of
                satisfaction levels. Identify positives, neutrals, and negatives
                at a glance for targeted improvements.
              </p>
            </Grid>
            <Grid item xs={12} md={6} lg={6} className="d-xs-block">
              <img
                src={customerSuccess}
                alt="customerSuccess"
                className="img-responsive"
              />
            </Grid>
          </Grid>
        </div>
      </section>
      <br />
      <br />
      <br />
      <section >
        <div className="container-home">
          <Grid
            container
            spacing={8}
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <Grid item xs={12} md={6} lg={6}>
              <h2>Product Development</h2>
              <p>
                <h4 className="check-heading  mb-1">
                  RFM Analysis and Engagement Score:
                </h4>
                Utilize RFM metrics for precise insights into customer behavior,
                ensuring effective retention and increased loyalty. Glean
                insights into marketing strategy effectiveness based on customer
                engagement levels.
              </p>
              <p>
                <h4 className="check-heading mb-1" >
                  Transformative Data Integration:{" "}
                </h4>
                Unify insights from various sources for a more informed approach
                to development efforts and bug detection.
              </p>
            </Grid>
            <Grid item xs={12} md={6} lg={6}  >
              <img
                src={productDevelopment}
                alt="productDevelopment"
                className="img-responsive"
              />
            </Grid>
          </Grid>
        </div>
      </section>
      <br /> 
      <HomeFooter/>
    </>
  );
}

export default ChurnPage;
