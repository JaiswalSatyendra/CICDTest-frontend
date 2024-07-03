import React, { useState, useEffect } from "react";
import HeroSection from "../../../../../components/HeroSection";
import NavigationLinkSection from "../../../../../components/NavigationLinkSection";
import ConvertMLMarketingSection from "../../../../../components/ConvertMLMarketingSection";
import ConvertMLretainAndGrow from "../../../../../components/ConvertMLretainAndGrow";
import Footer from "../../../../../components/Footer";
import Navbar from "../../../../../components/molecules/Navbar";
import { Link } from "react-router-dom";
import {
  Button,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import { Container } from "postcss";

import bannerImge from "../../../../../assets/img/blogbanner.png";
import HomeFooter from "../../../../../components/home-footer";
import aboutus from "../../../../../assets/img/aboutus.png";
import { blogListData } from "../../../../../assets/data/blog";
import { Helmet } from "react-helmet";
import RightNavbar from "../../right-nav";
import { blogAttentionTypeform } from "../../../../../assets/data/metadata-list";

export default function AttentionTypeform() {
  useEffect(() => {}, []);
  const blogList = blogListData;
  return (
    <>
        <Helmet> 
        <title>{blogAttentionTypeform.title}  </title>
        <meta property="og:title" content={blogAttentionTypeform.title} />
        <meta name="description" content={blogAttentionTypeform.description } data-react-helmet="true" />
        <meta name="og:description" content={blogAttentionTypeform.description } data-react-helmet="true" />
        <meta name="og:keywords"  content={blogAttentionTypeform.keywords} />
        <meta property="og:image" content={blogAttentionTypeform.image} />
        <meta property="og:url" content={blogAttentionTypeform.url} />
        <meta property="og:publisher" content={blogAttentionTypeform.publisher} />
        <meta property="og:author " content={blogAttentionTypeform.author} />
        <meta property="og:site_name" content={blogAttentionTypeform.site_name} />
        <meta property="og:locale" content={blogAttentionTypeform.locale} />
        <meta property="og:type" content={blogAttentionTypeform.type}/>
        <link rel="canonical" href={blogAttentionTypeform.canonical} /> 
      </Helmet>
      <Navbar /> <br />
      <br />
      <br />
      <hr />
      <div className="container-home postblogpost">
        <Grid
          container
          spacing={2}
          direction="row"
          justifyContent="top"
          alignItems="top"
        >
          <Grid item xs={12} md={8} lg={8}>
            <div className="bedcurms">
              <Link to="/">Home</Link>» <Link to="/blogs/">Blog</Link>»{" "}
              <b>
              Attention Typeform and HubSpot Users! Here are Sureshot Ways to Enhance NPS Analysis
              </b>
            </div>
            <h1 className="d-none">
           CML Attention Typeform and HubSpot Users! Here are Sureshot Ways to Enhance NPS Analysis
            </h1>
            <h2>
            Attention Typeform and HubSpot Users! Here are Sureshot Ways to Enhance NPS Analysis
            </h2>{" "}
            <br />
            <img
              src={"/json-media/img/blogs/blog-post/attentionTypeform.png"}
              alt="attentionTypeform"
              className="img-responsive"
            />
            <p>
            "Would you recommend our business to your friends?" Oh, the monotony of the same run-of-the-mill questions in customer surveys!
            </p>{" "}
            <p>
            As marketers, you are always navigating the turbulent waters of the market where the winds of customer opinion blow in every direction. Steering through the course requires a generous blend of quantitative and qualitative data to get a panoramic view of customer sentiments for your NPS analysis. In this article, we discuss how you can convert a seemingly ordinary act of asking, "Would you recommend us to a friend?" to the uncharted territories of meaningful dialogue. 
            </p>
            
            <p>
              <h4>Hiccups in NPS Analysis </h4> <div className="cleafix"></div>
              The analytical ride to navigate customer feedback is tricky. It's an emotional rollercoaster with frustrated criticism, enthusiastic praise, mixed signals, and everything in between. Below are some familiar problems you may have faced during NPS analysis: 
            </p>
            <p><h4>Lack of context</h4><div className="cleafix"></div>
            A big roadblock to analyzing NPS scores is understanding the nuances of customer sentiment. Though you get a numerical snapshot of customer satisfaction, you may struggle, say, if a customer is moderately satisfied (NPS score = 7) with your offering or if there are improvements to be made. This can make it tricky to address specific pain points and capitalize on strengths without additional context.
            </p>
            <p><h4>Limited actionable insights</h4><div className="cleafix"></div>
            Given the lack of depth and context, you may struggle with limited actionable insights from just quantitative data. For instance, if you have a high NPS score (e.g., 9), you may miss out on data on specific aspects or features (qualitative feedback) that are contributing to customer satisfaction. 
            </p><p>Another instance includes high NPS but declining engagement, where a disconnect between high scores and actual customer engagement could indicate a potential future churn risk. You require further insights into customer behavior, usage patterns, and reasons for reduced engagement.</p> 
            <p> 
              <h4> Data silos </h4> <div className="cleafix"></div>
              Quantitative data can be compartmentalized when not integrated with other customer data, limiting the ability to derive customer insights. For instance, if your NPS scores aren't integrated with CRM data and marketing analytics, you may lose out on data related to customer interactions and purchases, as well as insights into customer engagement and campaign success.
            </p>
            <p> </p>
            <p>
              <h3>What can you do to enhance NPS analysis?</h3><br/>With Typeform & HubSpot, you're already one step ahead to get the most out of your NPS analysis. Here's what you can do:
            </p>
            <ol>
                <li><b>Asking descriptive questions</b>
<p>Raw, unfiltered narrative of your customer base. Open-ended questions are the way to have meaningful dialogues with your customers and are the proverbial key to insights. Posing descriptive, open-ended questions to your customers after the initial NPS query helps you receive better feedback and understand the emotional nuances behind those numerical scores. </p>
<p>Using Typeform, you can create interactive surveys and feedback forms, integrating them with your NPS questions. Here's an example:</p>
<p><h4>NPS Question:</h4> On a scale of 0-10, how likely are you to recommend our product/service to a friend or colleague?</p>
<p><h4>Open-Ended Follow-Up:</h4> <i>What specifically influenced your score, and how can we improve your experience?</i><p>Open-ended questions offer deeper insights into customer sentiment, giving you context for decision-making. Customers tend to highlight the pain points in their responses, which can help you come up with new features or improvements in your offerings and tailor them to customer needs and preferences accordingly. Not to forget, the qualitative data from open-ended questions often complements the quantitative data, providing a more holistic view of customer sentiment.
</p><p>You can also incentivize your customers to respond to open-ended questions. Here's an instance:<br/><i>Earn 50 Loyalty Points by Completing Our Survey. Redeem for Exclusive Rewards!</i></p></p>

                </li>
                <li><b>Integrating with quant data</b>
                  <p>A diligent analysis of qualitative feedback works great and even more so when you integrate it with quant data. By integrating quantitative data from HubSpot into your NPS analysis, you can identify trends and patterns and in-depth understanding of customer segments. Let's take an example:</p>
                  <p><h4>Quantitative Data:</h4><div className="clearfix"></div>
                  NPS Score Distribution:<br/>
Promoters: 70%<br/>
Passives: 20%<br/>
Detractors: 10%<br/>
Average NPS Score: 65<br/><br/>
<b>Qualitative Themes: </b><div className="clearfix"></div>
<b>Theme 1: User Experience </b> <div className="clearfix"></div>
<p>Customer Quotes:<br/>
"Intuitive interface for seamless marketing automation."<br/>
"Some features are complex, impacting user experience."
</p>
<p><b>Theme 2: Customer Support</b><br/>
Customer Quotes:<br/>
"Responsive and knowledgeable support team."<br/>
"Long wait times for support calls." 
</p>
</p>
<p><b>Theme 3: Feature Requests</b><br/>Customer Quotes:<br/>
"Would love to see more analytics features."<br/>
"Customization options are limited."<br/>
</p>
<p>The HubSpot Reporting Tool helps you generate reliable quantitative insights and makes data visualization more accessible. It stores each data source's information in separate tables to make reporting more accurate. </p>
</li>
<li><b>Segmentation and trend analysis </b>
  <p>Upon integrating quantitative and qualitative data, you can use the segmentation capabilities of HubSpot to group customers based on their NPS scores and other parameters. The parameters could include demographic factors (e.g., age, gender, location), product usage (e.g., features used, frequency of use), or other factors such as customer lifecycle stage or support ticket history.
</p>
<p>Here's an instance to highlight this: </p>
<p>A company combines CRM data and survey responses and categorizes customers into age groups, frequency of use segments, and gender-based segments. It analyzes the NPS scores for each combined segment as part of a quantitative analysis:</p>
<p>Age 18-24, Occasional Users, Non-binary<br/>
Age 35-44, Regular Users, Female<br/>
Age 55+, Heavy Users, Male<br/>
</p>
<p>The company also performs qualitative analysis to understand customer feedback and identify trends for each segment. </p>

<p>Age 25-34, Occasional Users, Non-binary: Wants more inclusive marketing.<br/>
Age 45-54, Regular Users, Female: Positive comments about product features but concerns about customer service response times.<br/>
Age 55+, Heavy Users, Male: High satisfaction but wants personalized content.<br/>
</p>
<p>Adding gender as another segmentation category helps the company tailor their strategies and have a more nuanced understanding of customer preferences and feedback.</p>
</li>
<li><b>Longitudinal analysis</b>
<p>Tracking changes in NPS scores regularly and correlating them with specific changes lets you develop a framework to check in with your customers regularly and understand trends in customer sentiment. Longitudinal analysis, or the process of consistently collecting information and feedback from a group of people over a long period, lets you track changes in their opinions or behaviors. </p>
<p>By combining data from Typeform surveys and using HubSpot to track changes in NPS scores, you can see how your customers' sentiments evolve over time. For instance, a company can track NPS score changes within specific HubSpot customer segments, such as "New Customers". If it notices the NPS score to have significantly increased for the same segment, it can track the actions or changes that contributed to this improvement.</p></li>

            </ol>
            <p><h4>Conclusion</h4>Armed with Typeform and HubSpot, you can have meaningful dialogue with your customers and ultimately turn detractors into promoters.</p>
          </Grid> 
          <Grid item xs={12} md={4} lg={4}>
            <RightNavbar />
          </Grid>
        </Grid>
      </div>
      <HomeFooter />
    </>
  );
}
