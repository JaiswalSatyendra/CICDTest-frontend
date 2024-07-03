import React, { useEffect, useState } from "react";
import HeroSection from "../../components/HeroSection";
import NavigationLinkSection from "../../components/NavigationLinkSection";
import ConvertMLMarketingSection from "../../components/ConvertMLMarketingSection";
import ConvertMLretainAndGrow from "../../components/ConvertMLretainAndGrow";
import Footer from "../../components/Footer";
import Navbar from "../../components/molecules/Navbar";
import churnAnalysis from "../../assets/img/solutions/satisfactiontopdesign.png";
import { Link } from "react-router-dom";
import { Button, Card, CardContent, Grid, Typography } from "@mui/material";
import { Container } from "postcss";

import multiChannelNPSIcon from "../../assets/icons/multiChannelNPSIcon.svg";
import customerSegmentationIcon from "../../assets/icons/customerSegmentationIcon.png";
import recencyFrequency from "../../assets/icons/recencyFrequency.svg";
import unlimitedicons from "../../assets/icons/unlimitedicons.png";
import realtimeNPS from "../../assets/icons/realtimeNPS.png";
import engagementScore from "../../assets/icons/engagementScore.svg";

import salesforce from "../../assets/icons/salesforce.png";
import hubsport from "../../assets/icons/hubsport.png";
import zendesk from "../../assets/icons/zendesk.png";
import surveyFrom from "../../assets/icons/surveyFrom.png";
import capterra from "../../assets/icons/capterra.png";
import customdataSource from "../../assets/icons/customdataSource.png";
import typeform from "../../assets/icons/typeform.png";
import googleForms from "../../assets/icons/googleForms.png";
import surveymonkey from "../../assets/icons/surveymonkey.png";

import productDevelopment from "../../assets/img/solutions/satisfactionproductdevelopment.png";
import customerSuccess from "../../assets/img/solutions/statisfactioncustomersuccess.png";
import marketing from "../../assets/img/solutions/satisfactionanalysisMarketing.png";
import HomeFooter from "../../components/home-footer";
import { Helmet } from "react-helmet";
import { princing } from "../../assets/data/metadata-list";
import { princingMetaData } from "../../assets/data/schema-markup";

function PricingPlan() {
  useEffect(() => {}, []);
  const [splan, setIssplan] = useState("annually");
  const [plancomparisonChart, setIsplancomparisonChart] = useState(true);
  
  const insightsAction = [
    {
      id: 1,
      img: multiChannelNPSIcon,
      title: "Harmonization of All ",
      title1: "Customer Satisfaction Data",
      content:
        "Integrate survey, user feedback, and transactional data effortlessly for instant, comprehensive customer insights. Cut manual effort to identify complex trends and patterns across large data sets and address root causes for customer dissatisfaction.",
    },
    {
      id: 2,
      img: customerSegmentationIcon,
      title: "Drill Down at Contact-Level ",
      title1: "Details and Insights",
      content:
        "Go beyond aggregates and get personal. ConvertML provides drill down contact-level details, giving you names, topic-based sentiment analysis, and trust scores for a truly micro level  ",
    },
    {
      id: 3,
      img: recencyFrequency,
      title: "Pinpoint ",
      title1: "Satisfaction Levels",
      content:
        "Intuitive dashboard offering a 360-degree view, revealing positives, neutrals, and negatives at a glance.",
    },
    {
      id: 4,
      img: recencyFrequency,
      title: "Sentiment Analysis",
      title1: "based on topics",
      content:
        "Uncover the nuances of customer sentiment with topic-based analysis. Filter data to focus on specific sentiments, empowering you to make targeted improvements where it matters most to your customers.",
    },
    {
      id: 5,
      img: recencyFrequency,
      title: "Advanced ",
      title1: "pattern recognition",
      content:
        "Analyze brand perception by uncovering patterns that contribute to Company Consideration, Trust, Correspondence. Harness the power of uncovering relationships between critical sentiments, topics, demographics and much more.",
    },
    {
      id: 6,
      img: recencyFrequency,
      title: "Predictive Churn Analysis ",
      title1: " for Proactive Strategies",
      content:
        "Predict potential churn by analyzing behavioral data and develop targeted retention campaigns; turning potential losses into victories.",
    },
  ];
  const insightsAction1 = [
    {
      id: 1,
      img: multiChannelNPSIcon,
      title: "Predict ",
      title1: "Customer Churn",
      content:
        "Identify early indicators of customer churn and implement strategies to ensure lasting loyalty and lifetime value.",
    },
    {
      id: 2,
      img: customerSegmentationIcon,
      title: "Enhance",
      title1: "Marketing Campaigns",
      content:
        "Identify strengths based on insights to create targeted campaigns and tailor messaging to resonate with customer sentiment.",
    },
    {
      id: 3,
      img: recencyFrequency,
      title: "Proactive Support ",
      title1: "and Ticket Management",
      content:
        "Flag at-risk users and understand their concerns, proactively engage and prioritize 3effectively.",
    },
    {
      id: 4,
      img: recencyFrequency,
      title: "Product Enhancement",
      title1: "Prioritization",
      content:
        "Analyze feedback and sentiment to pinpoint areas with the most significant improvement potential, guiding development efforts.",
    },
    {
      id: 5,
      img: recencyFrequency,
      title: "Competitive",
      title1: " Analysis",
      content:
        "Analyzing sentiment based on topics to understand competitor performance, informing competitive strategies, and identifying areas for differentiation.",
    },
    {
      id: 6,
      img: recencyFrequency,
      title: "Data-Driven",
      title1: "  Decision-Making",
      content:
        "Data-driven decision-making for informed choices and prioritize actions that enhance customer satisfaction.",
    },
    {
      id: 6,
      img: recencyFrequency,
      title: "Mixed",
      title1: "  Method Analysis",
      content:
        "Perform mixed method analysis (Quant+Qual), providing a holistic understanding of satisfaction and loyalty through advanced analytics.",
    },
    {
      id: 7,
      img: recencyFrequency,
      title: "Policy",
      title1: "  Impact Assessment",
      content:
        "Analytics capabilities help anticipate the effects of policy changes on customer satisfaction before implementation, enabling informed decisions.",
    },
  ];
  const datasourcesList = [
    
    {
      id: 1,
      name: "Data Sources",
      col1: 1,
      col2: 2,
      col3: 2,
      col4: "5",
      col5: "Unlimited",
    },
    {
      id: 2,
      name: "Export(s)",
      col1: '-',
      col2: '-',
      col3: '-',
      col4: "Unlimited",
      col5: "Unlimited",
    },
    {
      id: 3,
      name: "Analytical Models",
      col1: 1,
      col2: 1,
      col3: 3,
      col4: "Unlimited",
      col5: "Unlimited",
    },
    {
      id: 4,
      name: "Model Execution",
      col1: '5/month',
      col2: '10/month',
      col3: '25/month',
      col4: "50/month",
      col5: "Unlimited",
    },
    {
      id: 5,
      name: "Data History",
      col1: '-',
      col2: '3/month',
      col3: '6/month',
      col4: "1 Year",
      col5: "Unlimited",
    },
    {
      id: 6,
      name: "Data Volume",
      col1: '5 GB',
      col2: '10 GB',
      col3: '100 GB',
      col4: "500 GB",
      col5: "TBD",
    },
  ];

  const dataVolumeList = [ 
    {
      id: 1,
      name: "Survey data   (Typeform)",
      col1: true,
      col2: true,
      col3: true,
      col4: true,
      col5: true,
    }, 
    {
      id: 2,
      name: "Customer data ",
      col1: true,
      col2: true,
      col3: true,
      col4: true,
      col5: true,
    },
    {
      id: 3,
      name: "Financial Data",
      col1: false,
      col2: false,
      col3: true,
      col4: true,
      col5: true,
    },
    {
      id: 4,
      name: "Social Media",
      col1: false,
      col2: false,
      col3: true,
      col4: true,
      col5: true,
    },
    {
      id: 5,
      name: "Website/Mobile  App",
      col1: false,
      col2: false,
      col3: true,
      col4: true,
      col5: true,
    },
    {
      id: 6,
      name: " Customer Support",
      col1: false,
      col2: false,
      col3: true,
      col4: true,
      col5: true,
    },
    {
      id:7,
      name: "Micro/macro trends",
      col1: false,
      col2: false,
      col3: true,
      col4: true,
      col5: true,
    }, 
  ];
  

  
  const surveyAnalytiList = [ 
     
    {
      id: 1,
      name: "Customer Satisfaction",
      col1: true,
      col2: true,
      col3: true,
      col4: true,
      col5: true,
    }, 
    {
      id: 2,
      name: "Brand Loyalty",
      col1: true,
      col2: true,
      col3: true,
      col4: true,
      col5: true,
    },
    {
      id:3,
      name: "Net Promoter Score Analysis",
      col1: true,
      col2: true,
      col3: true,
      col4: true,
      col5: true,
    }, 
  ];

  const predictiveChurnAnalyticsList = [ 
     
    {
      id: 9,
      name: "Predictive Churn Analytics",
      col1: false,
      col2: false,
      col3: true,
      col4: true,
      col5: true,
    }, 
    {
      id: 10,
      name: "Predictive Upsell & Cross Sell",
      col1: false,
      col2: false,
      col3: true,
      col4: true,
      col5: true,
    },
    {
      id:11,
      name: "Predictive Customer LTV",
      col1: false,
      col2: false,
      col3: true,
      col4: true,
      col5: true,
    },
    {
      id: 12,
      name: "Predictive Lead Generation",
      col1: false,
      col2: false,
      col3: true,
      col4: true,
      col5: true,
    },
    {
      id: 13,
      name: "Predictive Segmentation",
      col1: false,
      col2: false,
      col3: true,
      col4: true,
      col5: true,
    },
  ];
  const showHidePlan=()=>{ 
    setIsplancomparisonChart(current => !current);
  }

  const selectedPlan = (selectplan) => {
    if (selectplan == "annually") {
      setIssplan("annually");
    } else if (selectplan == "monthly") {
      setIssplan("monthly");
    }
    console.log(splan);
  };

  return (
    <>
       <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(princingMetaData),
        }}
      />
    <Helmet> 
        <title>{princing.title}  </title>
        <meta name="description" content={princing.description } data-react-helmet="true" />
        <meta name="keywords"  content={princing.keywords} />
        <meta property="image" content={princing.image} />
        <meta property="url" content={princing.url} />
        <meta property="publisher" content={princing.publisher} />
        <meta property="author " content={princing.author} />
        <meta property="site_name" content={princing.site_name} />
        <meta property="locale" content={princing.locale} />
        <meta property="type" content={princing.type}/>
        <link rel="canonical" href={princing.canonical} />
      </Helmet>  
      <Navbar />
      {/* ------------------- banner   ------------------- */}
      <div className="new-banner">
        <section className="container-home text-center">
          {/* <div className="banner-top-heading">Pricing </div> <br /> */}
          <h1 className="d-none">  Explore <b>ConvertML Plans</b></h1>
          <div className="m-0 heading3">
            Explore <b>ConvertML Plans</b>
          </div>
          <p>
            Harness your untapped data potential with flexible packages for
            predictive insights
          </p>
          <br />
          <div className="custom-switch-btn">
            <a
              className={splan == "annually" ? "link-btn" : ""}
              onClick={(e) => selectedPlan("annually")}
            > 
              Bill Monthly 
            </a>
            <a
              className={splan == "annually" ? "" : "link-btn"}
              onClick={(e) => selectedPlan("monthly")}
            >
              Bill  Annually  
            </a>
          </div>
          {splan == "annually" ? (
            <div className="plan-cards">
                <Grid
                container
                spacing={2}
                direction="row"
                justifyContent="center"
                alignItems="center"
              >
                <Grid item xs={12}  md={3} lg={3}>
                  <Card className="card" style={{height:330}}>
                    <CardContent orientation="horizontal">
                      <div>
                        <Typography level="title-lg" variant="h4">
                          Free
                        </Typography>
                        <p className="text"> Best for personal use </p>
                        <h3 style={{lineHeight:'23px'}}> 
                          $0<span>/per month</span> <br/>
                          <span>(Free for 3 Months)</span>
                        </h3>
                        <ul>
                          <li>
                            <span className="checkBox"></span>Data sources: 
                            <b> 1</b>
                          </li>
                          <li>
                            <span className="checkBox"></span>Analytical models: 
                            <b> 1</b>
                          </li>
                          <li>
                            <span className="checkBox"></span>Model execution: 
                            <b> 5/month</b>
                          </li>
                        </ul>{" "}
                        <br /> 
                        <a href="#getStarted"  >Start free trial</a>  
                      </div>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12}  md={3} lg={3}>
                  <Card className="card" style={{height:330}}>
                    <CardContent orientation="horizontal">
                      <div>
                        <Typography level="title-lg" variant="h4">
                          Basic
                        </Typography>
                        <p className="text"> Best for the start </p>
                        <h3>
                          {" "}
                          $150<span>/per month</span>{" "}
                        </h3>
                        <ul>
                          <li>
                            <span className="checkBox"></span>Data sources:
                            <b> 2</b>
                          </li>
                          <li>
                            <span className="checkBox"></span>Analytical models:
                            <b> 1</b>
                          </li>
                          <li>
                            <span className="checkBox"></span>Model execution:
                            <b> 10/month</b>
                          </li>
                        </ul>{" "}
                        <br /> 
                        <a href="#getStarted"  >Get started</a> 
                      </div>
                    </CardContent>
                  </Card>
                </Grid> 
                <Grid item xs={12} md={3} lg={3}>
                  <Card className="card" style={{height:330}}>
                    <CardContent orientation="horizontal">
                      <div>
                        <Typography level="title-lg" variant="h4">
                          Enterprise
                        </Typography>
                        <p className="text">Best for big many large   </p>
                        <h3>  Custom  <span> </span> 
                        </h3>
                        <ul>
                          <li>
                            <span className="checkBox"></span>Data sources:
                            <b> Unlimited</b>
                          </li>
                          <li>
                            <span className="checkBox"></span>Analytical models:
                            <b> Unlimited</b>
                          </li>
                          <li>
                            <span className="checkBox"></span>Model execution:
                            <b> Unlimited</b>
                          </li>
                        </ul>{" "}
                        <br />
                        <a href="#getStarted"  >Contact sales</a> 
                      </div>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </div>
          ) : (
            <div className="plan-cards">
              <Grid
                container
                spacing={2}
                direction="row"
                justifyContent="center"
                alignItems="center"
              >
                <Grid item xs={12} md={3} lg={3}>
                  <Card className="card" style={{height:330}}>
                    <CardContent orientation="horizontal">
                      <div>
                        <Typography level="title-lg" variant="h4">
                          Free
                        </Typography>
                        <p className="text"> Best for personal use </p>
                        <h3 style={{lineHeight:'23px'}}> 
                          $0<span>/per month</span> <br/>
                          <span>(Free for 3 Months)</span>
                        </h3>
                        <ul>
                          <li>
                            <span className="checkBox"></span>Data sources:
                            <b> 1</b>
                          </li>
                          <li>
                            <span className="checkBox"></span>Analytical models:
                            <b> 1</b>
                          </li>
                          <li>
                            <span className="checkBox"></span>Model execution:
                            <b> 5/month</b>
                          </li>
                        </ul>{" "}
                        <br /> 
                        <a href="#getStarted"  >Start free trial</a>
                      </div>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} md={3} lg={3}>
                  <Card className="card" style={{height:330}}>
                    <CardContent orientation="horizontal">
                      <div>
                        <Typography level="title-lg" variant="h4">
                          Basic
                        </Typography>
                        <p className="text"> Best for the start </p>
                        <h3>
                          {" "}
                          $125<span>/per month</span>{" "}
                        </h3>
                        <ul>
                          <li>
                            <span className="checkBox"></span>Data sources:
                            <b> 2</b>
                          </li>
                          <li>
                            <span className="checkBox"></span>Analytical models:
                            <b> 1</b>
                          </li>
                          <li>
                            <span className="checkBox"></span>Model execution:
                            <b> 10/month</b>
                          </li>
                        </ul>{" "}
                        <br />
                        <a href="#getStarted" >Get started</a>
                      </div>
                    </CardContent>
                  </Card>
                </Grid> 
               
                <Grid item xs={12} md={3} lg={3}>
                  <Card className="card" style={{height:330}}>
                    <CardContent orientation="horizontal">
                      <div>
                        <Typography level="title-lg" variant="h4">
                          Enterprise
                        </Typography>
                        <p className="text">Best for big many large   </p>
                        <h3>
                          {" "}
                          Custom<span> </span>{" "}
                        </h3>
                        <ul>
                          <li>
                            <span className="checkBox"></span>Data sources:
                            <b> Unlimited</b>
                          </li>
                          <li>
                            <span className="checkBox"></span>Analytical models:
                            <b> Unlimited</b>
                          </li>
                          <li>
                            <span className="checkBox"></span>Model execution:
                            <b> Unlimited</b>
                          </li>
                        </ul>{" "}
                        <br />
                        <a href="#getStarted"  >Contact sales</a> 
                      </div>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </div>
          )}
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
              <h2>Interested in a proposal for enterprises?</h2>
            </Grid>
            <Grid item xs={12} md={8} lg={8}>
              <div className="unlimitedplanbox">
                <img src={unlimitedicons} alt='convertml' />
                <h4>Unlimited</h4>
                <br />
                <button>Model execution</button>
                <button>Data sources</button>
                <button>Analytical models</button>
              </div>

              <p>
                Please get in touch with our sales department and we will assist
                you properly with these questions. Package for enterprise gives
                you unlimited access to all tools you may need.
              </p>
              <br />
              <a href="#getStarted" className="link-btn">
                Contact sales
              </a>
            </Grid>
          </Grid>
        </section>

        <div className="am-section">
          
<div className="plan-cards" style={{margin:0}}> . 
        <Grid
            container
            spacing={2}
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <Grid item xs={12} md={4} lg={4}>
            <div className="web-view">
            <br />
              <br />
              <h3>Pricing</h3>
              <br />
               {/* <div
                className="custom-switch-btn text-center"
                style={{ margin: "10px 0px 0px 0px" }}
              >
               <a
                  className={splan == "annually" ? "link-btn" : ""}
                  // onClick={(e) => selectedPlan("annually")}
                >
                  {" "}
                    Annually 
                </a>
                <a
                  className={splan == "annually" ? "" : "link-btn"}
                  // onClick={(e) => selectedPlan("monthly")}
                >
                    Monthly 
                </a> 
              </div>*/}
</div>
          
                </Grid>
                 <Grid item xs={12} md={2} lg={2} > 
                 <div className="web-view"> 
                 <Card className="card">
                <CardContent orientation="horizontal">
                  <div>
                    <Typography level="title-lg" variant="h4">
                      Free
                    </Typography>
                    <p className="text">
                      {" "}
                      $0<span>/per month</span>{" "}
                    </p>
                    <a href="#getStarted"  >Start free trial</a>
                  </div>
                </CardContent>
              </Card></div>
               </Grid>
               <Grid item xs={12} md={2} lg={2}>
               <div className="web-view">
              <Card className="card">
                <CardContent orientation="horizontal">
                  <div>
                    <Typography level="title-lg" variant="h4">
                      Basic
                    </Typography>
                    <p className="text">
                      {" "}
                      $150<span>/per month</span>{" "}
                    </p>
                    <a href="#getStarted"  >Get started</a>
                  </div>
                </CardContent>
              </Card></div>
            </Grid>
           
            <Grid item xs={12} md={2} lg={2}> <div className="web-view">
              <Card className="card">
                <CardContent orientation="horizontal">
                  <div>
                    <Typography level="title-lg" variant="h4">
                      Enterprise
                    </Typography>
                    <p className="text"> Custom </p>
                    <a href="#getStarted" >Contact sales</a>
                  </div>
                </CardContent>
              </Card></div>
            </Grid><Grid item xs={3} md={2} lg={2} > </Grid>
          </Grid>

          </div> 
        </div> 

 {plancomparisonChart==true?<> <section>
          <b>
          <Grid
            container
            spacing={2}
            direction="row"
            justifyContent="center"
            alignItems="center"
            className="plan-table"
          > 
              <>
              <Grid item xs={5} md={4} lg={4}>
              <h4>Customer Analytics</h4>
                
              </Grid>
               <Grid item xs={2} md={2} lg={2} > 
               <span className="mobile-view"> Free</span>
             </Grid>
             <Grid item xs={2} md={2} lg={2} >  
             <span className="mobile-view"> Basic</span>
             </Grid>  
              <Grid item xs={2} md={2} lg={2} > 
              <span className="mobile-view">Enterprise</span>
            </Grid><Grid item xs={1} md={2} lg={2} > </Grid></>
       
          </Grid></b><br/> 
          <Grid
            container
            spacing={2}
            direction="row"
            justifyContent="center"
            alignItems="center"
            className="plan-table"
          >
            {datasourcesList.map((post) => (
              <>
              <Grid item xs={5} md={4} lg={4}>
                {post.name} 
                <hr />
              </Grid>
               <Grid item xs={2} md={2} lg={2} > 
               {post.col1} 
               <hr />
             </Grid>
             <Grid item xs={2} md={2} lg={2} >  
               {post.col2} 
               <hr />
             </Grid>  
              <Grid item xs={2} md={2} lg={2} > 
              {post.col5}
              <hr />
            </Grid><Grid item xs={1} md={2} lg={2} > </Grid></>
            ))}
          </Grid>
        </section>

        <section style={{margin:0}}  > 
          <b>
          <Grid
            container
            spacing={2}
            direction="row"
            justifyContent="center"
            alignItems="center"
            className="plan-table"
          > 
              <>
              <Grid item xs={5} md={4} lg={4}>
              <h4>Sources</h4>
                
              </Grid>
               <Grid item xs={2} md={2} lg={2} > 
               <span className="mobile-view"> Free</span>
             </Grid>
             <Grid item xs={2} md={2} lg={2} >  
             <span className="mobile-view"> Basic</span>
             </Grid>  
              <Grid item xs={2} md={2} lg={2} > 
              <span className="mobile-view"> Enterprise</span>
            </Grid><Grid item xs={1} md={2} lg={2} > </Grid></>
       
          </Grid></b><br/> 
          <Grid
            container
            spacing={2}
            direction="row"
            className="plan-table"
            justifyContent="center"
            alignItems="center"
          >
            {dataVolumeList.map((post) => (
              <>
              <Grid item xs={5} md={4} lg={4}>
                {post.name} 
                <hr />
              </Grid>
               <Grid item xs={2} md={2} lg={2} > 
               {post.col1==true?<span className="checkIcons"></span>:<>—</>} 
               <hr />
             </Grid>
             <Grid item xs={2} md={2} lg={2} > 
             
             {post.col2==true?<span className="checkIcons"></span>:<>—</>} 
               <hr />
             </Grid>
           
             <Grid item xs={2} md={2} lg={2} > 
             {post.col4==true?<span className="checkIcons"></span>:<>—</>} 
               <hr />
             </Grid><Grid item xs={1} md={2} lg={2} > </Grid></>
            ))}
          </Grid>
       
          
          <b>
          <Grid
            container
            spacing={2}
            direction="row"
            justifyContent="center"
            alignItems="center"
            className="plan-table"
          > 
              <>
              <Grid item xs={5} md={4} lg={4}>
              <h4>Survey Analytics </h4>
                
              </Grid>
               <Grid item xs={2} md={2} lg={2} > 
               <span className="mobile-view">  Free</span>
             </Grid>
             <Grid item xs={2} md={2} lg={2} >  
             <span className="mobile-view">Basic</span>
             </Grid>  
              <Grid item xs={2} md={2} lg={2} > 
              <span className="mobile-view">Enterprise</span>
            </Grid><Grid item xs={1} md={2} lg={2} > </Grid></>
       
          </Grid></b><br/> 
          <Grid
            container
            spacing={2}
            direction="row"
            className="plan-table"
            justifyContent="center"
            alignItems="center"
          >
            {surveyAnalytiList.map((post) => (
              <>
              <Grid item xs={5} md={4} lg={4}>
                {post.name} 
                <hr />
              </Grid>
               <Grid item xs={2} md={2} lg={2} > 
               {post.col1==true?<span className="checkIcons"></span>:<>—</>} 
               <hr />
             </Grid>
             <Grid item xs={2} md={2} lg={2} > 
             
             {post.col2==true?<span className="checkIcons"></span>:<>—</>} 
               <hr />
             </Grid> 
             <Grid item xs={2} md={2} lg={2} > 
             {post.col4==true?<span className="checkIcons"></span>:<>—</>} 
               <hr />
             </Grid><Grid item xs={1} md={2} lg={2} > </Grid></>
            ))}
          </Grid>

          <b>
          <Grid
            container
            spacing={2}
            direction="row"
            justifyContent="center"
            alignItems="center"
            className="plan-table"
          > 
              <>
              <Grid item xs={5} md={4} lg={4}>
              <h4>Behaviour Analytics </h4> 
              </Grid>
               <Grid item xs={2} md={2} lg={2} > 
             <span className="mobile-view">  Free</span>
             </Grid>
             <Grid item xs={2} md={2} lg={2} >  
             <span className="mobile-view"> Basic</span>
             </Grid>  
              <Grid item xs={2} md={2} lg={2} > 
              <span className="mobile-view">Enterprise</span>
            </Grid><Grid item xs={1} md={2} lg={2} > </Grid></>
       
          </Grid></b><br/>  
          <Grid
            container
            spacing={2}
            direction="row"
            className="plan-table"
            justifyContent="center"
            alignItems="center"
          >
            {predictiveChurnAnalyticsList.map((post) => (
              <>
              <Grid item xs={5} md={4} lg={4}>
                {post.name} 
                <hr />
              </Grid>
               <Grid item xs={2} md={2} lg={2} > 
               {post.col1==true?<span className="checkIcons"></span>:<>—</>} 
               <hr />
             </Grid>
             <Grid item xs={2} md={2} lg={2} > 
             
             {post.col2==true?<span className="checkIcons"></span>:<>—</>} 
               <hr />
             </Grid> 
             <Grid item xs={2} md={2} lg={2} > 
             {post.col4==true?<span className="checkIcons"></span>:<>—</>} 
               <hr />
             </Grid><Grid item xs={1} md={2} lg={2} > </Grid></>
            ))}
          </Grid>
        </section></>:<> </>} <br/>
        <div className="text-center"> 
        <Button sx={{ mt: { xs: 2, sm: 1 } }}
                                    color="primary"
                                    variant="outlined"
                                    onClick={(e) => {showHidePlan()}}
                                    
                                >
                                   {plancomparisonChart==true?'Hide plan comparison':'Show plan comparison'}   
                                </Button></div><br/><br/>
      </div>

      <HomeFooter />
    </>
  );
}

export default PricingPlan;
