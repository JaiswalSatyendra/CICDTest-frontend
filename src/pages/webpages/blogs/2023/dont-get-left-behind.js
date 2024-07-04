import React, { useState, useEffect } from "react";
import HeroSection from "../../../../components/HeroSection";
import NavigationLinkSection from "../../../../components/NavigationLinkSection";
import ConvertMLMarketingSection from "../../../../components/ConvertMLMarketingSection";
import ConvertMLretainAndGrow from "../../../../components/ConvertMLretainAndGrow";
import Footer from "../../../../components/Footer";
import Navbar from "../../../../components/molecules/Navbar";
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

import bannerImge from "../../../../assets/img/blogbanner.png";
import HomeFooter from "../../../../components/home-footer";
import aboutus from "../../../../assets/img/aboutus.png";
import { blogListData } from "../../../../assets/data/blog";
import { Helmet } from "react-helmet";
import RightNavbar from "../right-nav";
import { blogDontgetleftbehind } from "../../../../assets/data/metadata-list";

function SurveyDataAnalytics() {
  useEffect(() => {}, []);
  const blogList = blogListData;
  return (
    <>
     <Helmet> 
        <title>{blogDontgetleftbehind.title}  </title>
        <meta name="description" content={blogDontgetleftbehind.description } data-react-helmet="true" />
        <meta name="keywords"  content={blogDontgetleftbehind.keywords} />
        <meta property="image" content={blogDontgetleftbehind.image} />
        <meta property="url" content={blogDontgetleftbehind.url} />
        <meta property="publisher" content={blogDontgetleftbehind.publisher} />
        <meta property="author " content={blogDontgetleftbehind.author} />
        <meta property="site_name" content={blogDontgetleftbehind.site_name} />
        <meta property="locale" content={blogDontgetleftbehind.locale} />
        <meta property="type" content={blogDontgetleftbehind.type}/>
        <link rel="canonical" href={blogDontgetleftbehind.canonical} />
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
          <Link to="/">Home</Link>» <Link to="/blogs/">Blog</Link>» 
           <b>Don’t get left behind. Learn how you can use zero-party data right
            now! </b> 
        </div>

        <h1  className="d-none">
          Don’t get left behind. Learn how you can use zero-party data right
          now!{" "}
        </h1>
        <div className="heading3"> Don’t get left behind. Learn how you can use zero-party data right
          now!</div>
        <p>
          Marketers, we know it takes a lot for you to get the heebie-jeebies!
          During our discussions with market insight professionals and marketing
          experts, they said:
        </p>
        <img
          src={"/json-media/img/blogs/blog-post/dont-get-left-behind.png"}
          alt="emotional-Quotient-Meets-Metrics"
          className="img-responsive"
        />
        <p> These conversations and concerns seem very familiar, no? </p>

        <p>
          The word “zero-party” data has been floating in the ether for quite
          some time now unless you’re living under a rock. The term, coined by
          Forrester in 2022, is data that an individual wants to share with a
          business. The phenomenal shift empowers them to have complete autonomy
          over what they choose to share and with whom.{" "}
        </p>
        <p>
          {" "}
          This is a good thing after all, isn’t it? Companies have access to
          data that individuals proactively share with them–personal details,
          preferences, motivations, and needs–straight from the source. And yet,
          from the snatches of conversations that you saw above, a lot of
          marketing teams have been struggling to make use of it effectively.
          <br /> <br /> In fact, according to Forrester,
        </p>
        <img
          src={"/json-media/img/blogs/blog-post/dont-get-left-behind1.png"}
          alt="emotional-Quotient-Meets-Metrics"
          className="img-responsive"
        />

        <img
          src={"/json-media/img/blogs/blog-post/dont-get-left-behind2.png"}
          alt="emotional-Quotient-Meets-Metrics"
          className="img-responsive"
        />
        <p>
          {" "}
          In 2022, 90% of marketing firms plan to capture zero-party data within
          a year. But to stay ahead in the race, you’ll have to not only know
          how to capture zero-party data but also understand how you can
          integrate it with your data sources–first-party data, surveys,
          feedback forms, etc.–to speed up your efforts in deriving customer
          insights and customer intelligence. <br />
          We know you have plenty of questions and we think they’re best
          answered through an example.
        </p>

        <p>
          <b>
            {" "}
            From personalization to hyper-personalization: How zero-party data
            saved “Books For All” from losing customers{" "}
          </b>
          <br />
          “Books For All” is an online bookstore and digital library that ships
          books–used, like-new, new, exclusive, and rare prints–worldwide at
          bargain prices and allows people to read them online via a
          subscription model. Being amongst a few bookstores offering worldwide
          shipping at lower prices, it rose to success early on–becoming widely
          popular amongst different customer segments. And business continued to
          grow until recently. Let’s go through the timeline to learn more:
        </p>

        <p>
          <b> Year 2018: Inception </b>
          <br />
          Being one of the few online bookstores in the world offering worldwide
          shipping at lower costs and attractive subscription models for
          e-readers, the company became widely popular amongst readers.
        </p>
        <p>
          <b>Year 2019: The store becomes popular </b>
          <br />
          <p>
            The company promised shorter delivery times, improved its repository
            by making rare out-of-print books available, and provided early
            access to new works. Its revenue rose by roughly 9% at the end of
            2019.
          </p>
        </p>

        <p>
          <b>Year 2020: Continued success</b>
          <br />
          “Books For All” started the reading challenge, allowing readers to
          plan their reading schedule, update them, and share milestone badges
          on social media. There are collaborations with non-profit
          organizations to raise money through book sales. The popularity of the
          store is at an all-time high. There is no anticipation of decline.{" "}
        </p>

        <p>
          <b>Year 2021: Summer lull</b>
          <br />
          Sales are stagnating but are not a thing of concern yet. The sale of
          physical books sees a decline towards the second half of the year but
          slowly picks up during Christmas, owing to the exorbitant discounts
          offered by the company to retain its customers.
        </p>

        <p>
          <b>Year 2022: Decline </b> <br />
          There is a steady decline in sales. The marketing team launches
          multiple campaigns to revive sales, but in vain. By the middle of
          2022, the customer churn is up by 7%. They launch surveys to
          understand the reasons for the decline, but there is limited
          participation. The company, unable to offer large discounts (at a
          loss) resorts to improving its digital library collection with
          contemporary titles and self-published works.
        </p>
        <p>
          <b>Year 2023, Part I: Steady Decline–Intro of zero-party data </b><br/>
          Book sales are at an all-time low, and customer churn has increased
          further by 4%. Marketing teams propose collaboration with influencers
          around the world, but the initiative sees little success. The CMO
          decided to add zero-party data to understand the changing customer
          behavior. The team focuses on collecting this data through surveys,
          polls, and feedback forms. The result? The participation is limited,
          and the team has little idea of how to make use of this.
          <br />
          <br />
          <b>Year 2023, Part II: The promise of zero-party data</b>
          From here on, we’ll help the company fix its strategy, okay? Let’s do
          it!
        </p>

        <p>
          <b>
            Get to the heart of your audience: Keep your surveys short and
            relevant{" "}
          </b>{" "}
          <br />
          Many surveys are so poorly designed, irrelevant, or long that
          customers quickly lose interest. We all know we do. When collecting
          zero-party data, you must always keep them short, to the point,
          non-invasive, and relevant. Another great way to get more people to
          take the survey is to incentivize it. This is best done by offering
          discounts, prizes, or coupons. You can either provide an incentive at
          the end of the survey or throughout the survey in small, frequent
          quantities.
          <br />
          Let’s design a short sample survey for them:
        </p>
        <img
          src={"/json-media/img/blogs/blog-post/dont-get-left-behind3.png"}
          alt="emotional-Quotient-Meets-Metrics"
          className="img-responsive"
        />

        <p>
          <b>
            Too many tools in the stack: Choose a one-click integration tool{" "}
          </b>
          One of the primary challenges that overwhelm market insight
          professionals is the complexity of integrating data from multiple
          sources. After all, data in silos amount to nothing if not merged.
          However, there are so many tools in the market! (And often with
          overlapping features). Haven’t you heard the saying: “Too many tools
          spoil all the work.”
          <p>
            With our conversations with CMOs and marketing experts, we
            summarized the challenges they face when burdened with multiple
            tools:{" "}
          </p>
        </p>
        <img
          src={"/json-media/img/blogs/blog-post/dont-get-left-behind4.png"}
          alt="emotional-Quotient-Meets-Metrics"
          className="img-responsive"
        />

        <p>
          {" "}
          Upon using a one-click integration tool, it becomes easier to gather
          fragmented data across multiple sources. Some tools may also allow you
          to set up automated data pipelines to collect, ingest, preprocess, and
          integrate data into a unified format. This would look something like:
        </p>
        <img
          src={"/json-media/img/blogs/blog-post/dont-get-left-behind5.png"}
          alt="emotional-Quotient-Meets-Metrics"
          className="img-responsive"
        />
        <p>
          <b>
            The table above integrates and unifies data from multiple sources:
          </b>
          <ul>
            <li>
              First-party data: Customer satisfaction, Purchase frequency,
              Average purchase amount, Days since last purchase, Customer
              support ticket, Country, Age, Gender
            </li>
            <li> Zero-party data: Comments and feedback </li>
            <li>
              {" "}
              To be predicted: Churn or Not Churn (Note: The above example
              represents a snapshot of historical data){" "}
            </li>
          </ul>
          When you look closely, a few things are evident:{" "}
          <ul>
            <li>
              {" "}
              Customers 13 and 21 stopped buying because many of the books they
              wanted might have been out of stock for a long time or because of
              delays in delivery.{" "}
            </li>
            <li>
              {" "}
              Customers 14 & 15 may be at risk of churning, since the metric
              “customer satisfaction” is “Medium” and their feedback indicates
              errors in payment processing and a need for higher discounts on
              their purchases.{" "}
            </li>
            <li>
              {" "}
              Customers 19 & 20 are satisfied with the service. Here, the
              company can try to up-sell/cross-sell additional products and
              services. Some good ideas would be discounts on book bundles,
              merchandise, or monthly subscription plans.{" "}
            </li>
          </ul>
          <p>This is a sample dataset, so it’s easier to make connections between variables. But on a larger scale, a store can have hundreds of thousands of customers making purchases each month. It becomes impossible then for the marketing team to read each feedback to understand what each customer needs. It’s time to go one step further. </p> 
        </p>
        <p>
          <b>Have a crystal ball: Build a predictive model</b>
          <br />
          With huge amounts of data, sometimes as much as 10 million rows and more and 100s of columns, we’ll need to have a tool that not only helps in data collection and integration but also has AI capabilities to do the heavy lifting. The custom predictive model–our own “crystal ball”–when trained on historical data, can find patterns and connections that you didn’t even know existed! And these connections can help you learn “why” customers do what they do. And not only that, but it can also help predict if a customer may churn a month from now! And Voila! You have a list of customers who are likely to churn and how likely they are to. Group these customers into three categories:
        </p>
        <img
          src={"/json-media/img/blogs/blog-post/dont-get-left-behind6.png"}
          alt="emotional-Quotient-Meets-Metrics"
          className="img-responsive"
        />
        <p>
        You can then prepare different marketing strategies for different groups based on the potential issues they may be facing. </p> <p> 
Not only this, but you can also curate experiences for customers based on the insights you gather from the predictive model.
        </p>
        <img
          src={"/json-media/img/blogs/blog-post/dont-get-left-behind7.png"}
          alt="emotional-Quotient-Meets-Metrics"
          className="img-responsive"
        />
        <p>Now that we’ve helped “Books For All”, we’ll leave it to their marketing team to turn the tide.  </p>
        <p><b>How does all of this work? </b>“We want to hear how we marketers can use this in a real-world setting”. <br/>
Absolutely! But before that, here’s a simple equation that summarizes everything that we wanted to convey. No variables, we promise! 
</p>
<p>
<b>     Zero-party data integrated with other datasets + (one-click integration tool + predictive modeling) + Smart marketing strategy = Customer retention, engagement, and success</b><br/>
The one-click integration tool in the equation, what’s that? <b><br/>
Introducing to you: ConvertML: One tool to gather all your data, bind them together, and in the face of churn, or changing weather and customer needs, be your respite. </b><br/>

<b>Value Chain for True Customer Insights: How it would look like. </b><br/>
<img
          src={"/json-media/img/blogs/blog-post/dont-get-left-behind8.png"}
          alt="emotional-Quotient-Meets-Metrics"
          className="img-responsive"
        />
</p>

<p>
  <b> Typeform for collecting Zero-Party data</b><br/> 
You’ve surely heard of Typeform! It’s a no-nonsense, user-friendly, and versatile platform for creating surveys, forms, or questionnaires. So you create and send out a survey (remember, short and to the point) to your customers and have access to quality data that they willingly provide to you. 
<p>Want a 40% + survey response rate on Typeform? Click here to learn how! </p>
</p>
<p>
  <b>HubSpot for transactional data</b><br/>
HubSpot, your go-to CRM, helps store all the transactional data that you’d need for your analysis: Sales data, customer interaction history, your own customized metrics, you name it. 
<p>Without HubSpot data, your customer insights are going to be meh! </p> 
</p>

<p>     <b> ConvertML for integration, exploration, and in-depth insights</b><br/>
HubSpot assigns a unique identifier, such as a contact ID or email address. Typeform should also have a user identification, such as an email or unique user ID. After having mapped the IDs from HubSpot and Typeform, you can create a unified dataset with just a few clicks using convertML! You’re now sitting on a gold mine: a combination of customer behavioral and self-reported data. 
</p>
<h3>CTA</h3>
<img
          src={"/json-media/img/blogs/blog-post/dont-get-left-behind9.png"}
          alt="emotional-Quotient-Meets-Metrics"
          className="img-responsive"
        />
        <br/>
        <p>Choose ConvertML and see your ROI grow 10X, all while staying GDPR and CCPA-compliant! <a href="#getStarted" >  Schedule a demo</a> with us right away!  </p>
        </Grid>
                <Grid item xs={12} md={4} lg={4}>
                <RightNavbar/>
                </Grid>
                </Grid>
                 </div>
      <br />
      <br />
      <HomeFooter />
    </>
  );
}

export default SurveyDataAnalytics;
