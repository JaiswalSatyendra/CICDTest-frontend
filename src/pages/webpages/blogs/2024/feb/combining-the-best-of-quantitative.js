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
import { blogFollowthisguide } from "../../../../../assets/data/metadata-list";
 
export default function Combiningthebestofquantitative() {
  useEffect(() => {}, []);
  const blogList = blogListData;
  return (
    <>
       <Helmet> 
        <title>{blogFollowthisguide.title}  </title>
        <meta name="description" content={blogFollowthisguide.description } data-react-helmet="true" />
        <meta name="keywords"  content={blogFollowthisguide.keywords} />
        <meta property="image" content={blogFollowthisguide.image} />
        <meta property="url" content={blogFollowthisguide.url} />
        <meta property="publisher" content={blogFollowthisguide.publisher} />
        <meta property="author " content={blogFollowthisguide.author} />
        <meta property="site_name" content={blogFollowthisguide.site_name} />
        <meta property="locale" content={blogFollowthisguide.locale} />
        <meta property="type" content={blogFollowthisguide.type}/>
        <link rel="canonical" href={blogFollowthisguide.canonical} />
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
              Follow this guide to understand customer churn inside out!
              </b>
            </div>
            <h1 className="d-none">
            Follow this guide to understand customer churn inside out! CML
            </h1>
            <h2>
            Follow this guide to understand customer churn inside out!
            </h2><br/>
            <img  src={"/json-media/img/blogs/blog-post/combiningthebestofquantitative.png"}
          alt="manusing bowand arror image"
          className="img-responsive" />
            <p>
              If you look for “Sleep Paralysis” you’ll come across a famous
              painting “The Nightmare” by Swiss artist Henry Fuseli. A demon,
              having taken the shape and form of a sleeper’s worst nightmare,
              readies to gnaw into the sleeper’s soul. The sleeper, awake and in
              a state of disbelief, looks into the demon’s evil eyes, and can do
              nothing but wish this demon away; neither scream, nor run, nor
              fall back to sleep. A state of helplessness. <br />
              <br />
              In the business world, marketers feel something similar when they
              see rising customer churn rates. Out of nowhere. All of a sudden.
              Without warning?
              <br />
              <br />
              But we like to believe that the phenomenon of customers leaving a
              business is corrosive rather than explosive. It happens over time.
              Slowly. Like the demon that inched its way towards the sleeper in
              the dark. The sleeper was helpless, but you don’t have to be.
            </p>
            <p>Customer churn is preventable. Such an obvious statement?</p>
            <p>
              After all,{" "}
              <a
                href="https://www.slideshare.net/ekolsky/cx-for-executives"
                target={"_blank"}
              >
                85% of consumers churn because of poor service that could have
                been prevented.
              </a>{" "}
              And yet, customer churn continues to daunt marketers. Feel the
              same?{" "}
            </p>
            <p>We have a solution. And it works. </p>
            <h2>Don’t shoot arrows in the dark</h2>
            <p>
              There are several sure-shot techniques that many marketers swear
              by to analyze and avoid customer churn. The most common ones we’ve
              heard:{" "}
            </p>
            <p>
              <ol>
                <li>Why not offer bigger discounts? </li>
                <li>Increase communication with customers, maybe? </li>
                <li>Run frequent email campaigns! </li>
                <li>Copy what the competitor is doing and do it better! </li>
                <li>
                  Focus on acquisition, ignore churn. It’s part of the game.{" "}
                </li>
              </ol>
            </p>
           
<p>None of these sure-shot techniques have a way of working
                  unless there’s a clear indication as to “why” the customer is
                  churning.</p>
            <h3>Case 1: Quantitative data used in isolation</h3>
            <p>
            <div class="table-responsive">
                <table className="table table-bordered">
                <caption className="d-none"> Case 1: Quantitative data used in isolation </caption>
              <thead>
                <tr>
                  <th>Customer ID</th>
                  <th>CLV</th>
                  <th>Purchase Frequency</th>
                  <th>Cart Abandonment Rate (%)</th>
                  <th>Average Order Value ($)</th>
                  <th>Returns ($)</th>
                  <th>Loyalty Points Earned</th>
                  <th>Churn </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>001</td>
                  <td>1000</td>
                  <td>10</td>
                  <td>15%</td>
                  <td>100</td>
                  <td>20</td>
                  <td>50</td>
                  <td>No</td>
                </tr>
                <tr>
                  <td>002 </td>
                  <td>1500 </td>
                  <td>3 </td>
                  <td>20% </td>
                  <td>150 </td>
                  <td>10 </td>
                  <td> 30 </td>
                  <td>Yes </td>
                </tr>
                <tr>
                  <td>002 </td>
                  <td>1500 </td>
                  <td>3 </td>
                  <td>20% </td>
                  <td>150 </td>
                  <td>10 </td>
                  <td> 30 </td>
                  <td>Yes </td>
                </tr>
                <tr>
                  <td>003</td>
                  <td>900</td>
                  <td>7</td>
                  <td>10%</td>
                  <td>90</td>
                  <td>40</td>
                  <td>70</td>
                  <td>Yes</td>
                </tr>
                <tr>
                  <td>004</td>
                  <td>500</td>
                  <td>2</td>
                  <td>25%</td>
                  <td>100</td>
<td>5</td>
<td>20</td>
<td>No </td>
                  </tr>
                  <tr>
                  <td>005</td>
                  <td>1200</td>
                  <td>6</td>
                  <td>12%</td>
                  <td>120</td>
<td>25</td>
<td>60</td>
<td>Yes</td>
 
                  </tr>
                  <tr>
                  <td>006</td>
                  <td>1000</td>
                  <td>1</td>
                  <td>30%</td>
                  <td>100</td>
<td>0</td>
<td>10</td>
<td>No  </td>
                  </tr>
                  <tr>
                  <td>007</td>
                  <td>1000</td>
                  <td>4</td>
                  <td>18%</td>
                  <td>100</td>
<td>15</td>
<td>40</td>
<td>Yes
</td>
                  </tr>
              </tbody>
            </table>
            </div>
            </p>
            <p>
            Let’s look at the purchase frequency. Customer 001 has a high purchase frequency, which probably indicates active engagement. A great way to keep them engaged would be to offer them rewards and additional benefits.  </p> <p>
Next, you can see that customer 006 has the highest cart abandonment rate. Maybe they have a bad buying experience? They try checking prices on multiple applications and get better rates elsewhere. (We all do that, right?) Maybe offer free shipping for a few orders, or improve their shopping experience? </p> <p>
Note that this is a very small sample we’re looking at, making it easier for us to observe what’s happening. In a larger sample, with data collected from multiple sources, you’ll need a tool that helps you load, clean, analyze, and visualize all this data on a dashboard. We definitely have some answers, but not all.  
            </p>
 
            <p> We want to understand why 002, 003, 005, and 007 churned. Look at customer 002, for instance. They have a great average order value (i.e., 150) which is the highest among all customers, and the highest CLV score. And yet, churn. Customer 005, despite a high purchase frequency and loyalty points earned, also leaves. Customer 007, with decent purchase frequency, also churned. </p> <p>
Though we know the customers left, the data that we’re seeing is in no way indicative of this. Quantitative data tells only half the story. Customer churn is often driven by other factors, such as customer sentiment, preferences, and feedback, which is missing above. Let’s see if we can get better insights considering qualitative data for the same customers in isolation. </p>
 
<h2>Case 2: Qualitative data used in isolation </h2>
<p>
<div class="table-responsive">
                <table className="table table-bordered">
                <caption className="d-none">Case 2: Qualitative data used in isolation </caption>
              <thead>
                <tr>
                  <th>Customer ID</th>
                  <th>Feedback</th>
                  <th>Preferences</th>
                  <th>Survey Response </th>
                  <th>Churn</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>001</td>
                  <td> I like the product variety!</td>
                  <td>Fast shipping</td>
                  <td>Satisfied with service</td>
                  <td>No </td>
                </tr>
                <tr>
                  <td>002</td>
                  <td> The shipping is decent but it’s so hard to look for items.
 
</td>
                  <td>Quality products</td>
                  <td>Dissatisfied with service</td>
                  <td>Yes </td>
                </tr>
                <tr>
                  <td>003</td>
                  <td>Shipping has been slower lately.</td>
                  <td>Frequent discounts</td>
                  <td>Quite satisfied with service </td>
                  <td>Yes </td>
                </tr>
                <tr>
                  <td>004</td>
                  <td>The customer service was good!</td>
                  <td>Variety of payment options</td>
                  <td>Quite satisfied with service </td>
                  <td>No </td>
                </tr>
                <tr>
                  <td>005</td>
                  <td>I faced some issues with the payment process. Minor delays in shipping too.</td>
                  <td>Detailed product descriptions</td>
                  <td>Quite satisfied with service </td>
                  <td>Yes </td>
                </tr>
                <tr>
                  <td>006</td>
                  <td>Facing some financial difficulties.</td>
                  <td>Quality products</td>
                  <td>Dissatisfied with service </td>
                  <td>No </td>
                </tr>
                <tr>
                  <td>007</td>
                  <td>Overall, it was an excellent experience, but I’m relocating soon.</td>
                  <td>Variety of payment options</td>
                  <td>Satisfied with service </td>
                  <td>Yes </td>
                </tr>
                </tbody>
                </table>
                </div>
                </p>
         
            <p>
            We want to understand why 002, 003, 005, and 007 churned. Customer 002 mentions difficulty in searching, expressing dissatisfaction with the website UI. The decision to churn wasn’t obvious when going through the quantitative metrics, but now it makes sense. The same applies to customer 003. Also, notice how customer 007 mentions “relocation” as the reason which isn’t reflected in the quantitative dataset.
            </p>
            <p>
            But notice how 005 mentions issues in payment and shipping. This is obviously a problem, and yet the qualitative data doesn’t seem to quantify the impact of their decision to stay.
            </p>
            <p>Qualitative data is great for understanding customer sentiment. Even when used in isolation, that is not in combination with quantitative data, you can do plenty of things with it. For example, you could do a word cloud analysis to see the most frequently occurring keywords, or themes (such as “eco-friendly” or “fast shipping). Or you can cluster customers based on their characteristics and sentiments and run different marketing campaigns for each.</p>
            <p>By now, it’s evident that quantitative data or qualitative data are very useful in understanding different aspects of customer behavior, but when used in isolation aren’t enough to predict if a customer may churn. Churn, being a much more complex phenomenon, can be better predicted by combining the best of quantitative and qualitative data. Let’s explore this in our final step.
</p>
<b>Customer churn: Neither driven alone by numerical metrics nor sentiment, but by a blend of both. </b>
            <p>
              <h2>
              Case 3: Quantitative data and qualitative data used in combination
              </h2>
              <p>   <div class="table-responsive">
                <table className="table table-bordered">
                <caption className="d-none">Case 3: Quantitative data and qualitative data used in combination </caption>                
              <thead>
                <tr>
                  <th>Customer ID</th>
                  <th>CLV</th>
                  <th>Purchase Frequency </th>
                  <th>Cart Abandonment Rate </th>
                  <th>Average Order Value () </th>
                  <th>Returns ($) </th>
                  <th>Loyalty Points Earned </th>
                  <th>Feedback </th>
 <th>Preferences </th>
 <th>Survey Response </th>
                  <th>Churn</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>001</td>
                  <td> 1000</td>
                  <td>5</td>
                  <td>15%</td>
                  <td>100</td>
                  <td>50</td>
                  <td>20</td>
<td>I like the product variety!</td>
<td>Fast shipping</td>
<td>Very satisfied with service</td>
<td>No
</td>
                </tr>
                <tr>
                  <td>  002 </td>
                  <td>1500 </td>
                  <td>3 </td>
                  <td>25% </td>
                  <td>150 </td>
                  <td>30 </td>
 <td>10 </td>
 <td>The shipping is decent, but it’s so hard to look for items. </td>
 <td>Quality products </td>
 <td>Dissatisfied with service </td>
 <td>Yes   </td>
                </tr>
                <tr>
                  <td>  003 </td>
                  <td>
                  900  </td>
                  <td>7  </td>
                  <td>10%  </td>
                  <td>90  </td>
                  <td>40  </td>
                  <td>70  </td>
  <td>Shipping has been slower lately.  </td>
  <td>Frequent discounts  </td>
  <td>Quite satisfied with service  </td>
  <td>Yes </td>
                  </tr>
                  <tr>
                  <td>  004 </td>
                  <td>500</td>
                  <td>2</td>
                  <td>25%</td>
                  <td>100</td>
                  <td>50</td>
                  <td>20</td>
<td>The customer service was good!</td>
<td>Variety of payment options</td>
<td>Quite satisfied with service</td>
<td>No </td>
                  </tr>
                  <tr>
                  <td>  005 </td>
                  <td>1200</td>
                  <td>6</td>
                  <td>12%</td>
                  <td>120</td>
                  <td>25</td>
                  <td>60</td>
<td>I faced some issues with the payment process. Minor delays.</td>
<td>Detailed product descriptions</td>
<td>Quite satisfied with service</td>
<td>Yes </td>
                  </tr>
                  <tr>
                  <td>  006 </td>
                  <td>1000</td>
                  <td>1</td>
                  <td>30%</td>
                  <td>100</td>
                  <td>0</td>
                  <td>10</td>
<td>Facing some financial difficulties.</td>
<td>Quality products</td>
<td>Dissatisfied with service</td>
<td>No </td>
                  </tr>
                  <tr>
                  <td>  007 </td>
                  <td>1000 </td>
                  <td>4 </td>
<td>18% </td>
<td>100 </td>
<td>15 </td>
<td>40 </td>
<td>Overall, it was an excellent experience, but I’m relocating soon. </td>
<td>Variety of payment options </td>
<td>Satisfied with service </td>
<td>Yes </td>
                  </tr>
 
                </tbody>
                </table>
                </div>
                </p>
 <p>Let’s jump straight to some observations: </p>
                <p><b>Customer 001</b><br/>
Customer 001 has a relatively low Cart Abandonment Rate (15%) and a high CLV of $1,000. This may indicate loyalty. There is a lower churn risk because of their loyalty and positive feedback. </p>
           
           <p> <b>Customer 002</b><br/>
The feedback clearly points to dissatisfaction with service despite quality products. Also, note how their cart abandonment rate is quite high (25%!). Since they had a high CLV and average order value, it’s possible that their experience deteriorated because of changes in UI or search functionality.
</p>
<p><b>Customer 003 </b><br/>
Customer 003 is tricky to understand. They have high CLV and claim they’re quite satisfied with the service. The decision to churn may have been due to slower shipping/delays over a period.
</p>
<p>
<b>Customer 004</b><br/>
Customer 004 has a high card abandonment rate and claims they’re quite satisfied with the service. It is possible that a positive experience in customer support and quick resolution prevented churn in this case.
</p>
           
           <p>
           <b>Customer 005</b><br/>
Despite having a high CLV, customer 005 churned because of payment problems and shipping delays (probably over a period). This is clear in their feedback.
</p>
           
           <p>
           <b>Customer 006</b><br/>
Customer 006 expressed “financial difficulties” in their feedback and has a relatively high cart abandonment rate. It’s possible that they may have temporarily stopped purchasing online but may resume soon. Such scenarios require another round of investigation!
</p>
           
           <p>
           <b>Customer 007</b><br/>
Finally, a case where external factors led to churn. Despite the feedback being positive and the higher number of loyalty points, the churn could not have been prevented. As we mentioned before, churn is a very complex phenomenon and relies on both internal and external factors.
 
</p>
<h3>Predictive modeling: Retain, engage, revive</h3>
<p>In larger datasets, these observations are not noticeable! Imagine a group of marketers going through hundreds if not thousands of columns and a million rows and predicting if a customer would churn or not! Impossible! </p>
<p>AI to the rescue!
</p>
<p>A <b>predictive model</b> trained on historical data (both quantitative and qualitative) can learn patterns and make connections that would have been impossible to identify manually. The AI model, once trained, can predict how likely a customer may churn! Not only this, it also provides you with “churn drivers” or variables that have a maximum influence on a customer’s decision to churn. For example, the model trained on a much larger version of the combined table may reveal that cart abandonment rate and feedback have the highest influence on customer churn. </p>
<p>With this model, you can determine churn probabilities for each customer in real time. </p>
 
<p>Once you have the probability numbers, you can generate a list of customers who are likely to churn and how likely they are to. Group these customers into three categories:<b> High risk, medium risk, and low risk.</b> You can then design retention strategies for different groups based on the potential issues they may be facing.  </p> <p>
The model can also give you phrases or words that influence churn. For instance, you may discover that “delayed shipping”, “no refund” and “bad customer support” rank higher on the list of phrases that contribute to deciding whether a customer churns.
</p>
<h3>Interesting! How can I get started? </h3>
 
<b>Simple. Choose a tool that: </b>
              <br />
              <ul>
                <li>Makes it easier to source data from multiple sources, be it structured or unstructured, and merge it to provide you with a unified view. </li>
                <li>Let’s you customize and streamline your customer data pipeline.</li>
                <li>Enables you to get richer customer insights through interactive dashboards, live reports, and advanced analytics, without having to write a single line of code.</li>
                <li>Protects your data integrity and enables you to stay compliant with GDPR and CCPA. </li>
                <li>Provides in-depth insights into customer behavior so you can maximize your efforts toward improving customer engagement.</li>
                <li>Predicts customer churn and guides you and your team in developing the right retention strategies.
</li>
              </ul>
               
              <br />
              Choose ConvertML. <a href="https://calendly.com/convertml" target={'_blank'}> Schedule a demo</a> with us to learn how we help businesses realize the true potential of customer data. And a guaranteed 10X ROI!  
            </p>
 
            <br />
            <br />
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