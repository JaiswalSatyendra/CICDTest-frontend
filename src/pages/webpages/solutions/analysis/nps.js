import React, { useEffect } from "react";
import Navbar from "../../../../components/molecules/Navbar";
import churnAnalysis from "../../../../assets/img/solutions/NpsTopdesign.png";
import { Grid } from "@mui/material"; 
import multiChannelNPSIcon from "../../../../assets/icons/multiChannelNPSIcon.svg";
import customerSegmentationIcon from "../../../../assets/icons/customerSegmentationIcon.png";
import recencyFrequency from "../../../../assets/icons/recencyFrequency.svg"; 
import salesforce from "../../../../assets/icons/salesforce.png";
import hubsport from "../../../../assets/icons/hubsport.png";
import zendesk from "../../../../assets/icons/zendesk.png";
import surveyFrom from "../../../../assets/icons/surveyFrom.png";
import capterra from "../../../../assets/icons/capterra.png";
import customdataSource from "../../../../assets/icons/customdataSource.png";
import typeform from "../../../../assets/icons/typeform.png";
import googleForms from "../../../../assets/icons/googleForms.png";
import surveymonkey from "../../../../assets/icons/surveymonkey.png"; 
import productDevelopment from "../../../../assets/img/solutions/npsproductdevelopment.png";
import customerSuccess from "../../../../assets/img/solutions/npscustomersucess.png";
import marketing from "../../../../assets/img/solutions/NpsMarketing.png";
import HomeFooter from "../../../../components/home-footer";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router";
import { netPromoterScoreData } from "../../../../assets/data/schema-markup";
import { NPSinsights } from "../../../../assets/data/metadata-list";

function NPSPage() {
  useEffect(() => {}, []);
  const navigate = useNavigate();
  const getstartedClick = () => navigate('/signup');
  const insightsAction = [
    {
      id: 1,
      img: multiChannelNPSIcon,
      title: "Multi-Channel",
      title1: "NPS Data Insights",
      content:
        "Combine qualitative and quantitative data for insights from surveys, social media, email, call center interactions, and relevant sources. Analyze these diverse data streams for an instant and comprehensive understanding of customer loyalty.",
    },
    {
      id: 2,
      img: customerSegmentationIcon,
      title: "Customer",
      title1: "Segmentation",
      content:
        'Segment customers based on NPS scores, ARRs, country, gender, service usage, and more. Pinpoint the "Persuadables" ripe for a shift from "Passive" to "Promoters," empowering strategic and personalized engagement.',
    },
    {
      id: 3,
      img: recencyFrequency,
      title: "Real-time",
      title1: "NPS Tracking",
      content:
        "Monitor NPS scores and sentiment trends in real-time, enabling swift and proactive responses to customer engagement. From insights to action, ConvertML's Real-time NPS Tracking empowers you to navigate customer satisfaction with agility.",
    },
  ];

  const dataSourceList = [
    { id: 1, img: typeform },
    { id: 2, img: salesforce },
    { id: 3, img: hubsport },
    { id: 4, img: googleForms },
    { id: 5, img: surveyFrom },
    { id: 6, img: surveymonkey },
    { id: 7, img: capterra },
    { id: 8, img: zendesk },
    { id: 9, img: customdataSource },
  ];

  return (
    <>
    <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(netPromoterScoreData),
        }}
      />
     <Helmet> 
        <title>{NPSinsights.title}  </title>
        <meta name="description" content={NPSinsights.description } data-react-helmet="true" />
        <meta name="keywords"  content={NPSinsights.keywords} />
        <meta property="image" content={NPSinsights.image} />
        <meta property="url" content={NPSinsights.url} />
        <meta property="publisher" content={NPSinsights.publisher} />
        <meta property="author " content={NPSinsights.author} />
        <meta property="site_name" content={NPSinsights.site_name} />
        <meta property="locale" content={NPSinsights.locale} />
        <meta property="type" content={NPSinsights.type}/>
        <link rel="canonical" href={NPSinsights.canonical} />
      </Helmet>
      <Navbar />
      {/* ------------------- banner   ------------------- */}
      <div className="new-banner">
        <section className="container-home text-center">
          <div className="banner-top-heading">
            {" "}
            Net Promoter Score (NPS) Analysis
          </div>{" "}
          <br />
          <h1 className="d-none"> Multi-channel analysis with a few simple clicks for true{" "}
             NPS insights </h1>
          <div className="m-0 heading3">
            Multi-channel analysis with a few simple clicks for true{" "}
            <b>NPS insights</b>
          </div>
          <p>
            Harness insights from combined strength of qualitative and
            quantitative data for Advanced Sentiment Analysis, Customer
            Segmentation, and pattern identification helping you stay ahead of
            your detractors.
          </p>
          <br />
          <button  onClick={getstartedClick} className="link-btn">
            <i className="fa fa-play-circle"> </i> Get Started  
    </button> {" "}
          <br />
          <img src={churnAnalysis} alt="churn Analysis" className="bannerimg" />
          <br />
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
              <h2>
                Explore the Full Potential of NPS with mixed method analysis!{" "}
              </h2>
              <h2 className="d-none">Transform Complex Customer Data into Customer Satisfaction</h2>
              <h2 className="d-none"> Integrations that enable Insights</h2>
              <h2 className="d-none">Real-world Business Scenarios</h2>
              <h3 className="d-none"> Harmonization of All Customer Satisfaction Data</h3>
              <h3 className="d-none"> Drill Down at Contact-Leve</h3>
              <h3 className="d-none">Pinpoint Satisfaction Levels</h3>
              <h3 className="d-none">Sentiment Analysis based on topics</h3>
              <h3 className="d-none">Advanced pattern recognition</h3>
              <h3 className="d-none">Predictive Churn Analysis for Proactive Strategies</h3>
              <h3 className="d-none">Predict Customer Churn</h3>
              <h3 className="d-none">Enhance Marketing Campaigns</h3>
              <h3 className="d-none">Proactive Support and Ticket Management</h3>
              <h3 className="d-none">Product Enhancement Prioritization</h3>
              <h3 className="d-none">Competitive Analysis</h3>
              <h3 className="d-none">Data-Driven Decision-Making</h3>
              <h3 className="d-none">  Mixed Method Analysis</h3>
              <h3 className="d-none">  Policy Impact Assessment</h3>

              <a href="#getStarted" className="link-btn">
                Read More
              </a>
            </Grid>
            <Grid item xs={12} md={8} lg={8}>
              <p>
                Relying solely on user-generated feedback is akin to navigating
                todays complex customer experience. Mapping financial
                transactions, product usage, customer journey, and engagement
                metrics to user generated feedback is crucial for NPS
                improvement initiatives.
              </p>

              <p>
                ConvertML’s code-free customer insights platform goes beyond
                basics NPS analysis. We help you gain insights from every nuance
                of your customers emotions, transactional history, demographics,
                interactions and trends over time. Develop precise targeting
                strategies by understanding true business impact so you can
                focus the right resources.
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
                How ConvertML gets you from insights to action <br />
              </h2>
            </Grid>
          </Grid>
          <Grid container spacing={2} direction="row">
            {insightsAction.map((action) => (
              <>
                <Grid item xs={12} md={4} lg={4} key={action.id}>
                  <div className="content-box" style={{ height: 420 }}>
                    <img src={action.img} alt="cross sell" width={100} />
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
              <Grid item xs={12} md={5} lg={5}>
                <h2 className="text-center fw-600">
                  Data Sources for Predictive NPS <br /> <br />
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
                      style={{
                        minHeight: 80,
                        height: 80,
                        padding: 10,
                        display: "block",
                      }}
                    >
                      <img
                        src={action.img}
                        alt="crosssell"
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
          {" "}
          <Grid
            container
            spacing={8}
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <Grid item xs={12} md={6} lg={6}>
              <h2 className="text-center fw-600">
                Empowering the Team with Real-Time NPS <br />
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
                <h4 className="check-heading">
                  Multi-Channel NPS Data Insights:
                </h4>
                Combine qualitative and quantitative data seamlessly for
                insights from surveys, social media, email, call center
                interactions, and relevant sources. Attain an instant and
                comprehensive understanding of customer loyalty to drive
                targeted marketing strategies.
              </p>
              <p>
                <h4 className="check-heading">Customer Segmentation</h4>
                Segment customers based on NPS scores, ARRs, country, gender,
                service usage, and more. Identify "Persuadables" ready for a
                shift from "Passive" to "Promoters," enabling strategic and
                personalized engagement strategies.
              </p>
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <img
                src={marketing}
                alt="sitting in Goldmine"
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
                <h4 className="check-heading">Real-time NPS Tracking:</h4>
                Monitor NPS scores and sentiment trends in real-time, allowing
                swift and proactive responses to customer engagement.
                ConvertML's Real-time NPS Tracking empowers the customer support
                team to navigate satisfaction dynamics with agility, turning
                insights into actionable improvements.
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
                <h4 className="check-heading">Comprehensive Insights:</h4>
                Unify diverse data streams for an immediate and comprehensive
                understanding of customer loyalty. This facilitates more
                informed product development efforts aligned with customer
                sentiments and expectations.
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
      <HomeFooter />
    </>
  );
}

export default NPSPage;
