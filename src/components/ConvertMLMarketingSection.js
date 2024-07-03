import { Grid,Link, Container } from "@mui/material";
import React, { useState } from "react";
import "./ConvertMLProductionSection.scss";
import zeropartyData from "../assets/img/home-pagebanner/zeropartyData.png";
import competitiveadvantage from "../assets/img/home-pagebanner/competitiveadvant.png";
import sittingingoldine from "../assets/img/home-pagebanner/sittingingold-ine.png"; 

import arrown from "../assets/icons/arrown.svg";

import { Box } from "@mui/system";

function ConvertMLMarketingSection() {
  const [activeData, setActiveData] = useState(0);

  const marketingTeamsData = [
    {
      id: 1,
      imageTitle: "Complete view of the customer",
      heading: "Know your customer to retain your customer",
      description:
        "Drive recurring sales at a higher value with ConvertML’s AI that filters through the integrated dataset to highlight key customer behavior and events. With one-click automation powered by customer data, you can now deeply understand your audience and increase brand loyalty and customer retention.",
      image: "/images/1.png",
    },
    {
      id: 2,
      imageTitle: "Predictive lead scoring",
      heading: "Predictive Lead scoring",
      description:
        "Using convertML’s in-built lead scoring model identify marketing automation patterns and evaluate prospects. Free-up teams from low-value activities to focus on customer-centric KPIs. Having all the data seamlessly integrated, track critical Lead scoring metrics that matter using rich visualization and dashboards.",
      image: "/images/2.png",
    },
    {
      id: 3,
      imageTitle: "Customer segmentation",
      heading: "Segment customers accurately",
      description:
        "Perform predictive segmentation of your customers by using an in-built RFM model. To identify consumer behavior and engagement readiness, RFM metrics - recency, frequency and monetary value score are critical indicators upon which customers can be graded. ",
      image: "/images/3.png",
    },
  ];

  return (
    // <div className="marketingSection py-4 marksec" id="marketingSection">
    //   <div className="container max-w-screen-xl mx-auto min-h-full px-5 py-10 flex justify-between items-center gap-10 flex-col lg:flex-row">
    //     <div className="textContainer lg:w-2/5 flex flex-col gap-6">
    //       <div className="text-xl tracking-wide font-bold text-pink">
    //       Identify Leads
    //       </div>
    //       <h3 className="text-5xl font-semibold tracking-wide text-black">
    //         {marketingTeamsData[activeData].heading}
    //       </h3>
    //       <div className="text-lg font-medium pt-10">
    //         {marketingTeamsData[activeData].description}
    //       </div>
    //     </div>
    //     <div className="toggleImageContainer w-full lg:w-1/2 flex flex-col">
    //       <div className="h-128 flex items-center justify-center imgContainer">
    //         <img src={marketingTeamsData[activeData].image} alt="" />
    //       </div>
    //       <div className="buttons flex tracking-normal justify-between text-black text-center text-sm md:text-md tabs">
    //         <span
    //           className={
    //             "cursor-pointer pb-2 hover:text-pink hover:border-b-2 " +
    //             (activeData === 0 ? "text-pink border-b-2 font-semibold " : "")
    //           }
    //           onClick={() => setActiveData(0)}
    //         >
    //           {marketingTeamsData[0].imageTitle}
    //         </span>
    //         <span
    //           className={
    //             "cursor-pointer pb-2 hover:text-pink hover:border-b-2 " +
    //             (activeData === 1 ? "text-pink border-b-2 font-semibold " : "")
    //           }
    //           onClick={() => setActiveData(1)}
    //         >
    //           {marketingTeamsData[1].imageTitle}
    //         </span>
    //         <span
    //           className={
    //             "cursor-pointer pb-2 hover:text-pink hover:border-b-2 " +
    //             (activeData === 2 ? "text-pink border-b-2 font-semibold" : "")
    //           }
    //           onClick={() => setActiveData(2)}
    //         >
    //           {marketingTeamsData[2].imageTitle}
    //         </span>
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <div>
      <div className="home-content-section">
        <Grid
          container
          spacing={2}
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
            <Grid item xs={12} md={6} lg={6}>
            <br />
            <h2>You’re Sitting on a Goldmine of Untapped Potential</h2> 
            <p>
              As a high-growth company, you have data that is unique to you and
              it’s being unused. This is zero-party data that is buried deep in
              your surveys, comments, and user generated content just waiting to
              be harnessed. If used properly, this is data that could elevate
              CLTV, enhance revenue predictability, bolster investor confidence,
              and give you a competitive advantage in your market.
            </p> 
            <p>
              However, given the complexity and multifaceted nature of
              connecting zero-party data with transactional data, there was no
              tool powerful enough without breaking the bank for nimble teams
              like yours to access. Until now.
            </p>
            <br />
          </Grid> 
          <Grid item xs={12} md={6} lg={6}>

            <img src={sittingingoldine} alt="sitting in Goldmine" className="img-responsive"/>
            {/* <div className="img-placeholder float-right">


            </div> */}
          </Grid>
        </Grid>   
        <br />
        <br />
        <br />
        <Grid
          container
          spacing={1}
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <Grid item  xs={12} md={8} lg={8} className="d-md-block">
          <img src={competitiveadvantage} alt="Your Competitive Advantage" className="img-responsive" />
          </Grid> 

          <Grid item   xs={12} md={4} lg={4} > 
            <h2>Your Competitive Advantage</h2>  
            <p>
              ConvertML was specifically designed to empower nimble marketing
              teams by leveraging zero-party data and data from places like web
              analytics, CRM, Social Media, Point-of-Sales Systems, and Surveys
              - all at once - so you can predict customer behavior and build
              your competitive advantage.
            </p> 
            <b>No data scientist or coding required</b>
          </Grid>
          <Grid item  xs={12} md={6} lg={6}  className="d-xs-block" >
          <img src={competitiveadvantage} alt="Your Competitive Advantage" className="img-responsive" />
          </Grid>
        </Grid>

        <br />
        <br />
        <br />
        <Grid
          container
          spacing={1}
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <Grid item   xs={12} md={4} lg={4} > 
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
          <Grid item   xs={12} md={8} lg={8} >
          <img src={zeropartyData} alt="ConvertML’s Unique Zero-Party Data Approach" className="img-responsive"/>
          
             {/* <div className="img-placeholder float-right"></div>   */}
          </Grid>
        </Grid>
      </div>

      <div className="howitworks ">
        <h2>How it works</h2>
        <div className="clearfix"></div>
        <Grid
          container
          spacing={1}
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <Grid xs={12} md={3} lg={3} > 
          <div className="box">
        <img src={"/images/connect.png"} alt="companylogo" />
          <span className="heading">Connect</span>
          <p>
            Connect to multiple sources at once, from surveys and transactions
            to CRMs, with a few short clicks
          </p>
        </div>
          </Grid>
          <Grid xs={12} md={1} lg={1}>
          <div className="text-center">  <img src={arrown} alt="convertml" className="d-inline"/></div> 
          </Grid>
          <Grid xs={12} md={3} lg={3}> 
          <div className="box middleBox"> 
        <img src={"/images/predict.png"} alt="convertml" />
          <span className="heading">Predict</span>
          <p>
            Connect to multiple sources at once, from surveys and transactions
            to CRMs, with a few short clicks
          </p>
        </div>
          </Grid>
          <Grid xs={12} md={1} lg={1} > 
          <div className="text-center">  <img src={arrown} alt="convertml" className="d-inline"/></div> 
          </Grid>
          <Grid xs={12} md={3} lg={3}> 
          <div className="box">
        <img src={"/images/convert.png"} alt="convertml" />
          <span className="heading">Convert</span>
          <p>
            Leverage the data-driven insights from ConvertML to swiftly target
            customers who are most likely to churn by delivering personalized
            promotions tailored to their specific needs.
          </p>
        </div>
          </Grid>
          </Grid> 
        <div className="clearfix"></div><br/><br/>
        <div className="text-center">
        <a   href="#getStarted"   className='link-btn' >Get started</a> 
        </div>
      </div>

      
    </div>
  );
}

export default ConvertMLMarketingSection;
