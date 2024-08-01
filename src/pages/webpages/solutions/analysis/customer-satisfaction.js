import React, { useEffect } from "react";
import HeroSection from "../../../../components/HeroSection";
import NavigationLinkSection from "../../../../components/NavigationLinkSection";
import ConvertMLMarketingSection from "../../../../components/ConvertMLMarketingSection";
import ConvertMLretainAndGrow from "../../../../components/ConvertMLretainAndGrow";
import Footer from "../../../../components/Footer";
import Navbar from "../../../../components/molecules/Navbar";
import churnAnalysis from "../../../../assets/img/solutions/satisfactiontopdesign.png";
import { Link, useNavigate } from "react-router-dom";
import { Grid } from "@mui/material";
import { Container } from "postcss";


import dataDrivenDecisionMaking from "../../../../assets/icons/dataDrivenDecisionMaking.svg";
import mixedMethodAnalysis from "../../../../assets/icons/mixedMethodAnalysis.svg";
import productEnhancementPrioritization from "../../../../assets/icons/productEnhancementPrioritization.svg";
import policyImpactAssessment from "../../../../assets/icons/policyImpactAssessment.svg";
import competitiveAnalysis from "../../../../assets/icons/competitiveAnalysis.svg";





import multiChannelNPSIcon from "../../../../assets/icons/multiChannelNPSIcon.svg"; 
import multicustomerSegmentationIcons from "../../../../assets/icons/customerSegmentationIcon.svg";
import recencyFrequency from "../../../../assets/icons/recencyFrequency.svg";

import advancedPatternRecognition from "../../../../assets/icons/advancedPatternRecognition.svg";
import pinpointSatisfactionLevels from "../../../../assets/icons/pinpointSatisfactionLevels.svg";
import predictiveChurnAnalysisforProactiveStrategies from "../../../../assets/icons/predictiveChurnAnalysisforProactiveStrategies.svg";
import sentimentAnalysisbasedontopics from "../../../../assets/icons/sentimentAnalysisbasedontopics.svg";
import microLevelInsights from "../../../../assets/icons/microLevelInsights.png";
import realtimeNPS from "../../../../assets/icons/realtimeNPS.png";
import engagementScore from "../../../../assets/icons/engagementScore.svg";
 

import productDevelopment from "../../../../assets/img/solutions/satisfactionproductdevelopment.png";
import customerSuccess from "../../../../assets/img/solutions/statisfactioncustomersuccess.png";
import marketing from "../../../../assets/img/solutions/satisfactionanalysisMarketing.png";
import HomeFooter from "../../../../components/home-footer";
import { Helmet } from "react-helmet";
import { customerSatisfactionAnalysisData } from "../../../../assets/data/schema-markup";
import { customerSatisfactionAnalysis } from "../../../../assets/data/metadata-list";
import { dataSourceList, insightsAction } from "../../../../assets/data/roles";

function CustomerSatisfaction() {
  useEffect(() => {}, []);
  const navigate = useNavigate();
  const getstartedClick = () => navigate('/signup');
  
  const insightsAction1 = [
    {
      id: 1,
      img: multiChannelNPSIcon,
      title: "Predict ",
      title1: "Customer Churn",
      content: "Identify early indicators of customer churn and implement strategies to ensure lasting loyalty and lifetime value.",
    },
    {
      id: 2,
      img: multicustomerSegmentationIcons,
      title: "Enhance",
      title1: "Marketing Campaigns",
      content: 'Identify strengths based on insights to create targeted campaigns and tailor messaging to resonate with customer sentiment.',
    },
    {
      id: 3,
      img: recencyFrequency,
      title: "Proactive Support ",
      title1: "and Ticket Management",
      content: "Flag at-risk users and understand their concerns, proactively engage and prioritize 3effectively.",
    },
    {
        id: 4,
        img: productEnhancementPrioritization,
        title: "Product Enhancement",
        title1: "Prioritization",
        content: "Analyze feedback and sentiment to pinpoint areas with the most significant improvement potential, guiding development efforts.",
      }, 
      {
        id: 5,
        img: competitiveAnalysis,
        title: "Competitive",
        title1: " Analysis",
        content: "Analyzing sentiment based on topics to understand competitor performance, informing competitive strategies, and identifying areas for differentiation.",
      },
      {
        id: 6,
        img: dataDrivenDecisionMaking,
        title: "Data-Driven",
        title1: "  Decision-Making",
        content: "Data-driven decision-making for informed choices and prioritize actions that enhance customer satisfaction.",
      },
      {
        id: 6,
        img: mixedMethodAnalysis,
        title: "Mixed",
        title1: "  Method Analysis",
        content: "Perform mixed method analysis (Quant+Qual), providing a holistic understanding of satisfaction and loyalty through advanced analytics.",
      },
      {
        id: 7,
        img: policyImpactAssessment,
        title: "Policy",
        title1: "  Impact Assessment",
        content: "Analytics capabilities help anticipate the effects of policy changes on customer satisfaction before implementation, enabling informed decisions.",
      },
  ];
 

  return (
    <>
     <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(customerSatisfactionAnalysisData),
        }}
      />
       <Helmet>  
        <title>{customerSatisfactionAnalysis.title}  </title> 
        <meta name="description" content={customerSatisfactionAnalysis.description } data-react-helmet="true" />
        <meta name="og-description" content={customerSatisfactionAnalysis.description } data-rh="true" />
        <meta name="keywords"  content={customerSatisfactionAnalysis.keywords} />
        <meta property="image" content={customerSatisfactionAnalysis.image} />
        <meta property="url" content={customerSatisfactionAnalysis.url} />
        <meta property="publisher" content={customerSatisfactionAnalysis.publisher} />
        <meta property="author " content={customerSatisfactionAnalysis.author} />
        <meta property="site_name" content={customerSatisfactionAnalysis.site_name} />
        <meta property="locale" content={customerSatisfactionAnalysis.locale} />
        <meta property="type" content={customerSatisfactionAnalysis.type}/>
        <link rel="canonical" href={customerSatisfactionAnalysis.canonical} />
      </Helmet> 
      <Navbar />
      {/* ------------------- banner   ------------------- */}
      <div className="new-banner">
        <section className="container-home text-center">
        <div className="banner-top-heading">Customer Satisfaction Analysis   </div> <br />
        <h1 className="m-0 d-none">
              Get Contact-Level Precision with Predictive, <b>Customer Satisfaction Analysis</b>
              </h1>
              <div className="m-0 heading3">
              Get Contact-Level Precision with Predictive, <b>Customer Satisfaction Analysis</b>
              </div>
              <p>
              Uncover valuable insights and go beyond analyzing surveys, reading reviews or monitoring social media. Combine sentiments from user generated feedback and transactional systems (CRM) for truly comprehensive insights. 

              </p>
              <br />  
              <button  onClick={getstartedClick} className="link-btn">
            <i className="fa fa-play-circle"> </i> Get Started  
    </button> 
              <br />   <br /> 
          <img src={churnAnalysis} alt="Predicting Customer Churn" className="bannerimg" />
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
              <h2>Transform Complex Customer Data into Customer Satisfaction
</h2>
              <a href="#getStarted" className="link-btn">
                Read More
              </a>
            </Grid>
            <Grid item xs={12} md={8} lg={8}>
              <p>
              Organizations are grappling with the challenge of unifying insights from a variety of satisfaction data across various customer touchpoints.The absence of granular contact-level details further impedes their capacity to craft personalized strategies for retention and engagement. Without a code-free customer insights platform, these professionals face the daunting task of juggling various tools, and data sources to gauge overall satisfaction, identify patterns and topics that contribute to dissatisfaction, and predict churn accurately. 
              </p>

              <p>
              ConvertML addresses these challenges head-on, providing a holistic, intuitive and code-free solution that unlocks the full potential of your customer data at every touchpoint, driving strategic decision-making and saving time and resources for organizations.

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
              How ConvertML gets you from insights to action
              </h2>
            </Grid>
          </Grid>
          <Grid container spacing={2} direction="row">
            {insightsAction.map((action) => (
              <>
                <Grid item xs={12} md={4} lg={4} key={action.id}>
                  <div className="content-box" style={{ height: 440 }}>
                    <img   src={
                          "./json-media/icons/solutions/" + action.img + ".svg"
                        }   alt={action.img} width={100} />
                    <h3>
                      {action.title} <br />
                      {action.title1}
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
                complete ML toolkit to every team in your company
              </p>
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <a href="#getStarted" className="white-btn">
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
                <h2 className="text-center fw-600">
                Integrations that enable Insights
                </h2>
              </Grid>
            </Grid>
            <Grid
              container
              spacing={2}
              direction="row"
              justifyContent="center"
              alignItems="center"
            >
              {dataSourceList.map((action) => (
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
      <section>
        <div className="container-home"> 
          <Grid
            container
            spacing={8}
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <Grid item xs={12} md={8} lg={8}>
              <h2 className="text-center fw-600">
              Empowering the Team by Maximizing Efficiency, Minimizing Manual Efforts 
              </h2>
            </Grid>
          </Grid>
        </div>
      </section>
      <section>
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
                <h4 className="check-heading  mb-1"> Harmonization of Customer Satisfaction Data  </h4>
                <p> Integrate survey, user feedback, and transactional data effortlessly.  <br/> Obtain instant, comprehensive insights for targeted marketing decisions.</p> 
              </p> <br/>
              <p>
                <h4 className="check-heading  mb-1"> Contact-Level Precision  </h4>
                <p> Access personalized details, including names and sentiments.   <br/>  Leverage topic-based sentiment analysis for a deeper understanding.</p> 
              </p> <br/>
              <p>
                <h4 className="check-heading  mb-1"> Comprehensive Brand Perception Metrics  </h4>
                <p> Gain insights into brand consideration, trust, responsiveness, and churn rates. <br/>  <br/> Drive data-driven decisions and proactively address customer support issues.</p> 
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
                <h4 className="check-heading  mb-1">Satisfaction Dashboard</h4>
                <p>Utilize an intuitive dashboard for a 360-degree view of satisfaction levels.<br/>Identify positives, neutrals, and negatives at a glance for strategic marketing improvements.
</p>

              </p>
              <p>
                <h4 className="check-heading  mb-1">Seamless NPS Integration</h4>
                <p>Identify promoters, passives, and detractors seamlessly.<br/>
Track sentiment and loyalty over time for enhanced customer support strategies.
</p>
              </p>
              <p>
                <h4 className="check-heading  mb-1">Predictive Churn Analysis</h4>
                <p>Proactively strategize by predicting churn and personalized retention strategies.<br/>
Prioritize with contact level categorization with sentiment and topic-based sentiment analysis.
</p>
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
      <section>
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
                <h4 className="check-heading mb-1">Transforming Complex Customer Data</h4>
                <p>Unify insights from a variety of satisfaction data across various customer touch points in seconds.<br/>
Identify areas with the most significant improvement potential and align development efforts and bug detections using all data sources.
</p>
              </p>
              <p>
                <h4 className="check-heading mb-1">Cross-Selling Opportunities</h4>
                <p>Identify opportunities for cross-selling and recommend complementary products.<br/>
                Pinpoint at-risk users efficiently, gaining insights into potential product dissatisfaction reasons.
</p>
              </p>
            </Grid>
            <Grid item xs={12} md={6} lg={6} >
              <img
                src={productDevelopment}
                alt="productDevelopment"
                className="img-responsive"
              />
            </Grid>
          </Grid>
        </div>
      </section>

      <section className="am-section">
      <div className="container-home"> 
          <Grid
            container
            spacing={2}
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <Grid item xs={12} md={8} lg={8}>
              <h2 className="text-center fw-600">
              Real-World Business Scenarios 
              </h2>
            </Grid>
          </Grid>
          <Grid container spacing={2} direction="row">
            {insightsAction1.map((i) => (
              <>
                <Grid item xs={12} md={4} lg={4} key={i.id}>
                  <div className="content-box" style={{ height: 420 }}>
                    <img src={i.img} alt="cross sell" width={100} />
                    <h3>
                      {i.title} <br />
                      {i.title1}
                    </h3>
                    <p> {i.content} </p>
                  </div>
                </Grid>
              </>
            ))} 
          </Grid>
          </div>
        </section>
      <br />
      <br />
      <br /> <br />
      <br />
      <br />
      {/* <div className="footerContainer-new">
        <div className="container-home">
          <div className="blueBox-section">
            <Grid container spacing={1} direction="row">
              <Grid item xs={12} sm={12} lg={12}>
                <div className="text-center">
                  <h2 className="m-0">Elevate Customer Satisfaction Today!</h2>
                  <p>
                    Experience Seamless Integration and Instant Analysis with
                    ConvertML!
                  </p>
                  <br />
                  <a href="./contact">Get a Demo</a>
                </div>
              </Grid>
            </Grid>
          </div>
        </div>
        <Footer />
      </div> */}
       <HomeFooter/>
    </>
  );
}

export default CustomerSatisfaction;
