import React, { useEffect } from "react";
import HeroSection from "../../../../components/HeroSection";
import NavigationLinkSection from "../../../../components/NavigationLinkSection";
import ConvertMLMarketingSection from "../../../../components/ConvertMLMarketingSection";
import ConvertMLretainAndGrow from "../../../../components/ConvertMLretainAndGrow";
import Footer from "../../../../components/Footer";
import Navbar from "../../../../components/molecules/Navbar";
import customerSuccessBanner from "../../../../assets/img/solutions/marketinsights-banner.png";
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

import productDevelopment from "../../../../assets/img/solutions/churnproductdevelopment.png"; 
import marketing from "../../../../assets/img/solutions/churnmarketing.png";
import HomeFooter from "../../../../components/home-footer";
import { Helmet } from "react-helmet";
import {
    mainHeading, 
    insightsActionDatamarIn,
    midContentDatamarIn,
  } from "../../../../assets/data/roles";
import { marketInsightsData } from "../../../../assets/data/schema-markup";
import { marketInsights } from "../../../../assets/data/metadata-list";
  
function MarketInsightsPage() {
  useEffect(() => {}, []);
  const navigate = useNavigate();
  const getstartedClick = () => navigate('/signup');
  return (
    <>
     <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(marketInsightsData),
        }}
      />
      
<Helmet> 
        <title>{marketInsights.title}  </title>
        <meta name="description" content={marketInsights.description } data-react-helmet="true" />
        <meta name="keywords"  content={marketInsights.keywords} />
        <meta property="image" content={marketInsights.image} />
        <meta property="url" content={marketInsights.url} />
        <meta property="publisher" content={marketInsights.publisher} />
        <meta property="author " content={marketInsights.author} />
        <meta property="site_name" content={marketInsights.site_name} />
        <meta property="locale" content={marketInsights.locale} />
        <meta property="type" content={marketInsights.type}/>
        <link rel="canonical" href={marketInsights.canonical} />
      </Helmet> 
    <Navbar />
    {/* ------------------- banner   ------------------- */}
    <div className="new-banner">
      <section className="container-home text-center">
        <div className="banner-top-heading">Market Insights</div> <br />
        <h1 className="m-0 d-none">
        Navigate Market Dynamics with Agility & 
          <b> Predictive Insights</b>
        </h1>
        <div className="heading3 m-0">
        Navigate Market Dynamics with Agility & 
          <b> Predictive Insights</b>
        </div>
        <p>
        Enhance your market insights with ConvertML’s zero-party data approach, seamless integrations, and no-code analysis. Discover new insights and opportunities by combining qualitative and quantitative data from sources, including CRMs, surveys, and social media channels. 
        </p>
        <br />
        <button  onClick={getstartedClick} className="link-btn">
            <i className="fa fa-play-circle"> </i> Get Started  
    </button>
        <br />
        <img src={customerSuccessBanner} alt="Customer Insights platform" className="bannerimg" /> 
      </section>
    </div>
    {/* ------------------- banner   ------------------- */} 
    <section>
      <div className="container-home">
      <h2 className="text-center fw-600">{mainHeading}</h2>
        {midContentDatamarIn.map((content) => (
          <section>
               <div className="web-view">
               <Grid
                container
                spacing={8}
                direction="row"
                justifyContent="center"
                alignItems="center"
              > 
                {content.bannerdirection=='left'?<><Grid item xs={12} md={5} lg={5}> <img
                 src={'/json-media/img/'+content.bannerName+'.png'}
                 alt={content.altText}
                  className="img-responsive"
                /> </Grid>  <Grid item xs={12} md={7} lg={7}><div className="heading2"> {content.heading}</div>
                {content.listContent.map((content) => (
                  <>
                    <div className="check-heading mb-1"> {content.heading}</div>
                    <p> {content.content}</p>
                  </>
                ))} <p>{content.description}</p>
                </Grid>
                </>:<>  <Grid item xs={12} md={7} lg={7}><div className="heading2"> {content.heading}</div>
                {content.listContent.map((content) => (
                  <>
                    <div className="check-heading mb-1"> {content.heading}</div>
                    <p> {content.description}</p>
                  </>
                ))} 
                <p>{content.description}</p>
                </Grid>
                <Grid item xs={12} md={5} lg={5}> <img
                 src={'/json-media/img/'+content.bannerName+'.png'}
                 alt={content.altText}
                  className="img-responsive"
                /> </Grid> </>}
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
<Grid item xs={12} md={7} lg={7}><h2> {content.heading}</h2>
                {content.listContent.map((content) => (
                  <>
                    <div className="check-heading mb-1"> {content.heading}</div>
                    <p> {content.content}</p>
                  </>
                ))} <p>{content.description}</p>
                </Grid>
                <Grid item xs={12} md={5} lg={5}> <img
                 src={'/json-media/img/'+content.bannerName+'.png'}
                 alt={content.altText}
                  className="img-responsive"
                /> </Grid>
                 </Grid>  

</div> 
          </section>
        ))} 

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
            Use Cases
            </h2>
          </Grid>
        </Grid>
        <Grid container spacing={2} direction="row">
          {insightsActionDatamarIn.map((action) => (
            <>
              <Grid item xs={12} md={4} lg={4} key={action.id}>
                <div className="content-box" style={{ height: 420 }}>
                  <img src={'/json-media/icons/'+action.img+'.svg'} alt={action.img} title={action.img} width={100} />
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
      </div>
    </section> 

    <HomeFooter />
  </>
  );
}

export default MarketInsightsPage;
