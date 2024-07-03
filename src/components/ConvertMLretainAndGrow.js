import { Button, Grid,Link } from "@mui/material";
import React, { useState } from "react";
import "./ConvertMLProductionSection.scss";

import analyticalmodel1 from "../assets/img/home-pagebanner/analyticalmodel1.png";
import analyticalmodel2 from "../assets/img/home-pagebanner/analyticalmodel2.png";
import analyticalmodel3 from "../assets/img/home-pagebanner/analyticalmodel3.png";

function ConvertMLretainAndGrow() {
  const [activeData, setActiveData] = useState(0);
  const [selectTab, setselectTab] = useState('gainDeeper');

  const marketingTeamsData = [
    {
      id: 1,
      imageTitle: "Reduce Churn",
      heading: "Zero customer loss",
      description:
        "Identify high-risk customers and stop their unwanted departure. With ConvertML’s Intelligent churn prediction model, compute the highest possible benefit price for your customers and set up triggers so customers receive automated emails when they haven’t been using your product. Using CSAT and other customer success metrics, turn dissatisfied customers into loyal ones.",
      image: "/images/grow1.png",
    },
    {
      id: 2,
      imageTitle: "Improve Average Order value",
      heading: "Make users buy more",
      description:
        "Leverage every customer using this dominant metric to assess your pricing strategy and balance the customer acquisition costs to bring indirect revenue,and further, reduce the payback time and surge your profits.",
      image: "/images/grow2.png",
    },
    {
      id: 3,
      imageTitle: "Smart Upsell",
      heading: "Think Potential Up and Cross-sell",
      description:
        "Get your customers to purchase a better version of what they came in for and increase revenue with upsells. Using ConvertML’s smart Upsell and cross-sell model built on successful use of the past purchases, you can add value to your purchase and post-purchase flow by sending automated emails to existing customers. End-to-end lifecycle of the customers.",
      image: "/images/grow3.png",
    },
  ];
  
  const analyticalTabs = (selTabs) => { 
    if (selTabs == "gainDeeper") { 
      setselectTab("gainDeeper");
    }
    else if (selTabs == "identifyAt") {
      setselectTab("identifyAt");
    }

    else if (selTabs == "predictBuying") {
      setselectTab("predictBuying");
    }

    
  }
  return (
    // <div className="marketingSection py-4 marksec" id="retainSection">
    //   <div className="container max-w-screen-xl mx-auto min-h-full px-5 py-10 flex justify-between items-center gap-10 flex-col lg:flex-row">
    //     <div className="textContainer lg:w-2/5 flex flex-col gap-6">
    //       <div className="text-xl tracking-wide font-bold text-pink">
    //       Retain & Grow
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
    <>
      <div className="am-section">
        <div className="heading">Our No-Code Analytical Models</div>
        <Grid
          container
          spacing={1}
          direction="row"
          justifyContent="center"
          alignItems="top"
        >
          <Grid item xs={12} md={5} lg={5}>
             <div className="d-md-block"><br/><br/><br/><br/></div>
            <Button  className={selectTab=='gainDeeper'? 'selected-button' :'default-button'}  onClick={(e) => analyticalTabs("gainDeeper")}>
              Gain Deeper Customer Understanding
            </Button>   <br />
            <br />
            <Button className={selectTab=='identifyAt'? 'selected-button' :'default-button'} onClick={(e) => analyticalTabs("identifyAt")}>
              Identify At-Risk Customers
            </Button>
            <br />   <br />
            <Button className={selectTab=='predictBuying'? 'selected-button' :'default-button'} onClick={(e) => analyticalTabs("predictBuying")}>Predict Buying Behavior</Button>
          </Grid> 
          <Grid item xs={12}  md={7} lg={7}>
          {selectTab=='gainDeeper'?<div>  <img src={analyticalmodel1} alt="Analytical Models" className="img-responsive" /> <br />
            {/* <p>
              Quantifiably gauge customers' trust through our Customer Trust
              Analysis, providing deeper insights into their emotional
              connections and preferences.
            </p>
            <br />
            <Link  to="/signup"   className='link-btn' >Get started</Link>  */}
            </div>:''}

{selectTab=='identifyAt'?<div> 
<img src={analyticalmodel2} alt="analytical Models" className="img-responsive" /> <br /> 
{/* <p>
              Quantifiably gauge customers' trust through our Customer Trust
              Analysis, providing deeper insights into their emotional
              connections and preferences.
            </p>
            <br />
            <Link  to="/signup"   className='link-btn' >Get started</Link>  */}

</div>:''}

{selectTab=='predictBuying'?<div> 
<img src={analyticalmodel3} alt="analytical Models" className="img-responsive" /> <br /> 
{/* <p>
              Quantifiably gauge customers' trust through our Customer Trust
              Analysis, providing deeper insights into their emotional
              connections and preferences.
            </p>
            <br />
            <Link  to="/signup"   className='link-btn' >Get started</Link>  */}
</div>:''}

           
          </Grid>
        </Grid>
      </div>
<br/><br/>



      <div className="am-section">
        <div className="heading">Our Complete List of No-Code Models</div>
        <Grid
          container
          spacing={2}
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <Grid item xs={12} md={4} lg={4}>
            <div className="content-box"> 
            <img src={"/images/crosssell.png"} alt="Cross sell"  />  
              <h3>Cross sell & up sell Analysis</h3> 
            <p>Cross sell and upsell are ways to increase customer value. The magic of successful cross sell is to make a relevant offer to the right customer at the right time and using the right communication channel. A solution to this problem is not easy and involves a lot of analytics.</p></div>
          </Grid>
          
          <Grid item xs={12} md={4} lg={4}>
          <div className="content-box"> 
            <img src={"/images/netPromoter.png"} alt="Net Promoter"  /> 
              <h3>Net Promoter Score Analsyis</h3> 
            <p>NPS is a customer experience metric that shows how likely clients are to recommend a given service or product. But it can be even more valuable if you perform diligent analysis of qualitative feedback.</p></div>
            <br /> 
            <div className="content-box"> 
            <img src={"/images/predictiveChurn.png"} alt="Predictive Churn"  />  
              <h3>Predictive Churn Analysis</h3> 
            <p>Churn Prediction Model is a predictive model that calculates, on an individual customer basis, the likelihood (or susceptibility) that a customer will stop doing business with the company.</p></div>
            <br /> 
            <div className="content-box"> 
            <img src={"/images/customerSatisfaction.png"} alt="Customer Satisfaction"  /> 
              <h3>Customer Satisfaction Analysis</h3> 
            <p>A CSAT (short for customer satisfaction) survey is a feedback survey used to measure customers' satisfaction levels with your company's product, service, or a particular interaction.</p></div>
          </Grid>
          <Grid item xs={12} md={4} lg={4}>
          <div className="content-box"> 
            <img src={"/images/leadScoring.png"} alt="lead Scoring"  />  
              <h3>Lead Scoring</h3> 
            <p>Lead scoring is a methodology used by sales and marketing departments to determine the worthiness of leads, or potential customers, by attaching values to them based on their behavior relating to their interest in products or services.</p></div>
            <br /> 
            <div className="dark-box">  
              <h3>Get started today</h3> 
            <p>ConvertML collects events from 100+ data sources and provides a complete ML toolkit to every team in your company</p><br />
            <a className="white-btn" href='#getStarted'>Request a demo</a>
            </div>
           </Grid>
        </Grid>
      </div>
    </>
  );
}

export default ConvertMLretainAndGrow;
