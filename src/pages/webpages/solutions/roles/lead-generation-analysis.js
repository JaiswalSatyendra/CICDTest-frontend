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

import productDevelopment from "../../../../assets/img/solutions/churnproductdevelopment.png"; 
import marketing from "../../../../assets/img/solutions/churnmarketing.png";
import HomeFooter from "../../../../components/home-footer";
import { Helmet } from "react-helmet";
import {
  CustomerSuccessMeta,
  insightsActionDataCS,
  mainHeading,
  midContentDataCS,
} from "../../../../assets/data/roles";
import { customerSuccessData } from "../../../../assets/data/schema-markup";
import { customerSuccess } from "../../../../assets/data/metadata-list";

function CustomerSuccessPage() {
  useEffect(() => {}, []);
  const navigate = useNavigate();
  const getstartedClick = () => navigate('/signup');
  return (
    <>
     <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(customerSuccessData),
        }}
      />

<Helmet> 
        <title>{customerSuccess.title}  </title>
        <meta name="description" content={customerSuccess.description } data-react-helmet="true" />
        <meta name="keywords"  content={customerSuccess.keywords} />
        <meta property="image" content={customerSuccess.image} />
        <meta property="url" content={customerSuccess.url} />
        <meta property="publisher" content={customerSuccess.publisher} />
        <meta property="author " content={customerSuccess.author} />
        <meta property="site_name" content={customerSuccess.site_name} />
        <meta property="locale" content={customerSuccess.locale} />
        <meta property="type" content={customerSuccess.type}/>
        <link rel="canonical" href={customerSuccess.canonical} />
      </Helmet> 
      <Navbar />
      {/* ------------------- banner   ------------------- */}
      <div className="new-banner">
        <section className="container-home text-center">
          <div className="banner-top-heading">Customer Success</div> <br />
          <h1 className="m-0 d-none">
            Navigate Satisfaction Dynamics with Agility &  Actionable Insights 
          </h1>
          <div className="m-0 heading3">
            Navigate Satisfaction Dynamics with Agility &{" "}
            <b>Actionable Insights </b>
          </div>
          <p>
            Elevate customer success with ConvertML’s Real-time NPS, seamless
            integration, and swift risk identification. Our intuitive dashboard
            offers a 360-degree view for targeted improvements, transforming
            customer success into a proactive, data-driven powerhouse.
          </p>
          <br />
          <button  onClick={getstartedClick} className="link-btn">
            <i className="fa fa-play-circle"> </i> Get Started  
    </button> 
          <br />
          <img src={customerSuccessBanner} alt="churn Analysis" className="bannerimg" /> 
        </section>
      </div>
      {/* ------------------- banner   ------------------- */} 
      <section>
        <div className="container-home">
        <h2 className="text-center fw-600">{mainHeading}</h2>
          {midContentDataCS.map((content) => (
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
                  alt="sitting in Goldmine"
                  className="img-responsive"
                /> </Grid>  <Grid item xs={12} md={7} lg={7}><div className="heading2"> {content.heading}</div>
                {content.listContent.map((content) => (
                  <>
                    <div className="check-heading mb-1"><b>{content.heading}</b> </div>
                    <p> {content.content}</p>
                  </>
                ))} 
                </Grid>
                </>:<>  <Grid item xs={12} md={7} lg={7}><div className="heading2"> {content.heading}</div>
                {content.listContent.map((content) => (
                  <>
                    <div className="check-heading mb-1"> <b> {content.heading}</b> </div>
                    <p> {content.content}</p>
                  </>
                ))} 
                </Grid>
                <Grid item xs={12} md={5} lg={5}> <img
                 src={'/json-media/img/'+content.bannerName+'.png'}
                  alt="sitting in Goldmine"
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
                    <h4 className="check-heading mb-1"> {content.heading}</h4>
                    <p> {content.content}</p>
                  </>
                ))} 
                </Grid>
                <Grid item xs={12} md={5} lg={5}> <img
                 src={'/json-media/img/'+content.bannerName+'.png'}
                  alt="sitting in Goldmine"
                  className="img-responsive"
                /> </Grid>
                 </Grid>  

</div>

               

                {/* {content.bannerdirection=='left'?<><Grid item xs={12} md={5} lg={5}> <img
                 src={'/json-media/img/'+content.bannerName+'.png'}
                  alt="sitting in Goldmine"
                  className="img-responsive"
                /> </Grid></>:<> <Grid item xs={12} md={7} lg={7}><h2> {content.heading}</h2>
                {content.listContent.map((content) => (
                  <>
                    <h4 className="check-heading mb-1"> {content.heading}</h4>
                    <p> {content.content}</p>
                  </>
                ))} </Grid> </>}   */}

                {/* {content.bannerdirection=='left'?<><Grid item xs={12} md={7} lg={7}> <h2> {content.heading}</h2>
                  {content.listContent.map((content) => (
                    <>
                      <h4 className="check-heading mb-1"> {content.heading}</h4>
                      <p> {content.content}</p>
                    </>
                  ))}</Grid></>:<> <Grid item xs={12} md={5} lg={5}>
                   <img 
                  src={'/json-media/img/'+content.bannerName+'.png'}
                  alt="sitting in Goldmine"
                  className="img-responsive"
                /></Grid></>}   */}
             
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
            {insightsActionDataCS.map((action) => (
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

export default CustomerSuccessPage;
