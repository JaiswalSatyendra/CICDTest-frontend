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
import { blogAnticipatingCustomer } from "../../../../../assets/data/metadata-list";

export default function Anticipatingcustomer() {
  useEffect(() => {}, []);
  const blogList = blogListData;
  return (
    <>
      <Helmet> 
      <title>{blogAnticipatingCustomer.title}  </title>
        <meta property="og:title" content={blogAnticipatingCustomer.title} />
        <meta name="description" content={blogAnticipatingCustomer.description } data-react-helmet="true" />
        <meta name="og:description" content={blogAnticipatingCustomer.description } data-react-helmet="true" />
        <meta name="og:keywords"  content={blogAnticipatingCustomer.keywords} />
        <meta property="og:image" content={blogAnticipatingCustomer.image} />
        <meta property="og:url" content={blogAnticipatingCustomer.url} />
        <meta property="og:publisher" content={blogAnticipatingCustomer.publisher} />
        <meta property="og:author " content={blogAnticipatingCustomer.author} />
        <meta property="og:site_name" content={blogAnticipatingCustomer.site_name} />
        <meta property="og:locale" content={blogAnticipatingCustomer.locale} />
        <meta property="og:type" content={blogAnticipatingCustomer.type}/>
        <link rel="canonical" href={blogAnticipatingCustomer.canonical} /> 
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
                Anticipating Customer Behavior: Where you’re going wrong and how
                you can fix it.
              </b>
            </div>
            <h1 className="d-none"> 
           CML Anticipating Customer Behavior: Where you’re going wrong and how
                you can fix it.
            </h1>
            <h2>
            Anticipating Customer Behavior: Where you’re going wrong and how
                you can fix it.
            </h2>{" "}
            <br />
            <img
              src={"/json-media/img/blogs/blog-post/anticipatingcustomer.png"}
              alt="anticipatingcustomer"
              className="img-responsive"
            />
            <p>
              Arte TV, a popular streaming platform amongst film enthusiasts and
              moviemakers, is in a tight spot. A steady slump in the numbers:
              subscribers, growth, and revenue. Unrest amongst investors.
              Back-and-forth meetings. Tense in the air.{" "}
            </p>{" "}
            <p>
              The marketing team did everything right: timely social media posts
              for engagement, constant updates to viewers on new releases,
              keyword-centric SEO strategies for content, and advertising, and
              the right metrics–and tool stacks to monitor them. Played by the
              book. What went wrong?
            </p>
            <p>
              We’ll tell you what. Yes, it had everything to do with–you guessed
              that right–Data & AI!{" "}
            </p>
            <p>
              We know what you’re thinking: This must be another definitive,
              how-to, or another listicle, chiming about data, AI, and their
              importance in marketing. Some clarification on that: It’s not.
              Read on and you’ll quickly realize why.{" "}
            </p>
            <p>
              The right term to use here would be “lacuna”–a gap–in marketing.
              What exactly is this gap that, when addressed, will magnify your
              marketing efforts? We promise you this: By the end of this article
              you’ll have discovered the secret to not only analyzing and
              understanding customer behaviour but predicting it!
            </p>
            <p>
              <h3>Customer behaviour: Almost predictable </h3>
              Here’s a stat to back up our bold title:{" "}
              <a href="https://shorturl.at/auM04">
                Human behaviour is 93% predictable.{" "}
              </a>
            </p>
            <p>
              Here’s a thought: If there’s a trove of data, various sources to
              ingest them from, and if this data can almost accurately predict
              customer behaviour, then where exactly is the gap? What could Arte
              TV do differently? We’ll see that shortly.{" "}
            </p>
            <p>
              We spoke to multiple marketing teams and market insight
              professionals over a period of three months to understand their
              primary concerns. This is compiled into a list below:{" "}
            </p>
            <ol>
              <li>
                Huge amounts of data are being collected from multiple sources,
                but there are limited ways to combine and make sense of them.
                According to a survey conducted by Adverity in September 2022,
              <a href="https://www.adverity.com/blog/67-of-cmos-say-they-are-overwhelmed-with-data">   67% of CMOs say they are overwhelmed with data.</a>
              </li>
              <li>
                Lack of insight due to using quantitative and qualitative data,
                often in isolation or ineffectively.{" "}
              </li>
              <li>
                A need for real-time insights to keep track of rapidly evolving
                customer preferences.{" "}
              </li>
              <li>
                Additional dimensions to consider when using customer data, such
                as privacy and compliance. Paradoxical indeed.  </li>
              <li>Growing number of
                competitors in the market with overlapping features led to
                saturation. 
              </li>
              <li>
                Lack of predictive analytics–due to budget and time constraints,
                limited resources, and lack of data science expertise–forcing
                market insight professionals to take a reactive instead of a
                proactive approach to understand customer behavior and market
                trends.
              </li>
            </ol>
            <p>
              {" "}
              <h3>
                Completing the puzzle: Combining the “what”, “how” and “why”{" "}
              </h3>{" "}
              Over a period of time, multiple tool offerings have mushroomed in
              the marketing. Juggling with a set of tools, marketers are able to
              gather a plethora of metrics that are important to understand how
              well the company’s products and services are performing. Some
              popular metrics include page views, social media impressions,
              keyword rankings, likes and follows, and sales numbers. These are
              examples of “quantitative data”. This is data that you can
              quantify and represent in numerical format.{" "}
            </p>
            <p>
              Market insight professionals also use customer reviews and
              testimonials, social media comments, interviews, and chat support
              logs to better understand customer behaviour. These are examples
              of “qualitative data”. This is data not representable in numeric
              format. This is usually textual, audio, and video data.
            </p>
            <p>
              {" "}
              Arte TV’s marketing team tracked them as part of their efforts to
              understand the platform’s growth better, assess brand visibility
              and popularity, and measure user engagement, among other things.
              They also used other tools to understand customer sentiment and
              behaviour by analyzing text, audio, and video data on social media
              posts, online surveys, interviews, and questionnaires. And yet,
              they had limited insight into customer behaviour, which led to a
              steady decline over a period.
            </p>
            <p>
              Why did Arte TV start to lose subscribers? Did the UI need to be
              more user-friendly? Did they want more classics to be added to the
              collection compared to contemporary works? Why did a platform with
              loyal subscribers start to see a steady decline in its numbers?
              What was the main reason for churning?{" "}
            </p>
            <p>
              We’ll address the problems that Arte TV was facing and show,
              through numerous examples, how they could have been addressed
              differently.
            </p>
            <p>
              Case 1: The use of quantitative data to understand performance{" "}
            </p>
            <div class="table-responsive">
              <table className="table table-bordered">
              <caption className="d-none">  Case 1: The use of quantitative data to understand performance </caption>
                <thead>
                  <tr>
                    <th>Month </th>
                    <th>User Engagement Score</th>
                    <th>Subscription Renewal Rate (%)</th>
                    <th>Churn Rate (%)</th>
                    <th>Avg. Viewing Time (minutes)</th>
                    <th>Content Variety Index</th>
                    <th>Customer Support Tickets</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td> 1</td>
                    <td>85</td>
                    <td>90</td>
                    <td>10</td>
                    <td>50</td>
                    <td>0.75</td>
                    <td>25 </td>
                  </tr>
                  <tr>
                    <td> 2</td>
                    <td>78</td>
                    <td>88</td>
                    <td>12</td>
                    <td>45</td>
                    <td>0.72</td>
                    <td>30 </td>
                  </tr>
                  <tr>
                    <td> 3</td>
                    <td> 75</td>
                    <td> 85</td>
                    <td> 15</td>
                    <td> 40</td>
                    <td> 0.7</td>
                    <td> 35 </td>
                  </tr>
                  <tr>
                    <td>4 </td>
                    <td>72 </td>
                    <td>84 </td>
                    <td>16 </td>
                    <td>38 </td>
                    <td>0.68 </td>
                    <td>40 </td>
                  </tr>
                  <tr>
                    <td> 5 </td>
                    <td>70 </td>
                    <td>82 </td>
                    <td>18 </td>
                    <td>35 </td>
                    <td>0.65 </td>
                    <td>45 </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>
              The above table indicates a growing concern: increasing customer
              churn and a reduction in subscription renewal rates. And despite
              having clear indicators of growing customer dissatisfaction,
              there’s no concrete reason this is happening.
            </p>
            <p>
              Case 2: The use of qualitative data to understand customer
              preferences, habits, and behavior
            </p>
            <p>
              <u>User comments</u>
            </p>
            <p>
              Month 1 - "Loving the unique content here! 😍, Diverse selection
              is lit 🔥, This platform's lineup is interesting 🙌"
            </p>
            <p>
              Month 2 - "Documentaries are a nice touch 👏, Cultural content is
              a win 🌍, They always keep things fresh! 🆕"
            </p>
            <p>
              Month 3 - "Something's different with the marketing lately 🤔,
              I've noticed some changes 🧐, There's something new in the air 🌬️"
            </p>
            <p>
              Month 4 - "Sometimes it's hard to find what I want 😕, Navigation
              could use some help 🗺️, Variety of content is impressive 🎉"
            </p>
            <p>
              Month 5 - "Content selection is diverse and exciting! 🌟, Loving
              the variety on this platform 📺, Keep the interesting lineup
              coming! 🎬"
            </p>
            <p>
              <u>Survey responses (from the suggestions section)</u>
            </p>
            <p>
              Month 1 - "Exploring new content avenues 🌐, Content discovery
              methods are interesting 🕵️, I prefer foreign films 🎥"
            </p>
            <p>
              Month 2 - "Influences shaping my choices 🤔, Content preferences
              vary 📺, Word-of-mouth recommendations matter 🗣️"
            </p>
            <p>
              Month 3 - "Preferred content genres 🎭, What do you enjoy the most
              🤩, Some changes noticed 🧐"
            </p>
            <p>
              Month 4 - "Overall satisfaction level 😃, How can we make your
              experience better 🤷, Need better navigation options 🗺️"
            </p>
            <p>
              Month 5 - "Suggestions for improvement 📝, Content variety and
              appeal 📈, The lineup keeps things fresh! 🆕"
            </p>
            <p>
              After going through the social media comments and survey
              responses, you might have a slightly better idea of what the
              customer wants. But marketing professionals find it challenging to
              trace back, let’s say, customer churn, to the insights they have
              gathered from performing a qualitative analysis.
            </p>
            <p>
              Also, note that the above examples (both qualitative and
              quantitative) are only samples. The real dataset could have
              anywhere between a few hundred to a thousand responses each month
              and a lot more metrics than what you see above. With enormous
              volumes of data being collected, market insight professionals
              would find it very overwhelming to merge heterogeneous data and
              make inferences from it in order to modify their marketing
              campaigns/strategies. Adding to this is the complexity of the data
              itself that is being ingested, ranging from text and audio to
              video data.{" "}
            </p>
            <p>
              Case 3: Connecting the dots: Combining qualitative and
              quantitative data{" "}
            </p>
            <div class="table-responsive">
              <table className="table table-bordered">
              <caption className="d-none"> Case 3: Connecting the dots: Combining qualitative and
              quantitative data </caption>
                <thead>
                  <tr>
                    <th>Customer ID</th>
                    <th>User Engagement Score</th>
                    <th>Average Viewing Time (minutes)</th>
                    <th>User Feedback</th>
                    <th>Survey Responses</th>
                    <th>Comments Under Movie Titles</th>
                    <th>Churn </th>
                  </tr> 
                </thead>
                <tbody>
                <tr>
                    <td>123</td>
                    <td>8550</td>
                    <td>Very Satisfied</td>
                    <td>Enjoying art movies, but less variety lately.</td>
                    <td>I loved the last art film, but we need more variety.</td>
<td>Just binged on some art films, but need more options!</td>
<td>No Churn  </td>
                  </tr>
                  <tr>
                    <td>456</td>
                    <td>7845</td>
                    <td>Slightly Unsatisfied</td>
                    <td>Technical issues are frustrating.</td>
                    <td>The app crashed during my movie, very frustrating. I’m switching to Blueberry TV! </td>
<td>Ugh, the app crashed on me again! 😡</td>
<td>Churn </td>
                  </tr>
                  <tr>
                    <td>789</td>
                    <td>7540</td>
                    <td>Satisfied</td>
                    <td>Love the documentary section, but some movies are hard to find.</td>
                    <td>Documentaries are great, but finding other movies can be tough.</td>
<td>I'm on a documentary marathon, but searching could be better.</td>
<td>No Churn </td></tr>
<tr>
                    <td>907</td>
                    <td>7238</td>
                    <td>Unsatisfied</td>
                    <td>Frustrated with the app's interface.</td>
                    <td>The user interface needs improvement</td>
                    <td>Add more filters to search movies</td>
<td>Churn </td></tr>
<tr>
                    <td>901 </td>
                    <td>7035 </td>
                    <td>Very Satisfied </td>
                    <td>Miss the rare film collection. </td>
                    <td>Bring back the rare films, please! </td>
                    <td>Make movies available for longer periods! </td>
 <td>No Churn  </td></tr>
                </tbody>
              </table>
            </div>
            <p> In the third scenario, there is a <b>combination of qualitative and quantitative data.</b> Again, note that this is only a sample, and the real dataset would have a far greater number of rows and columns. The rows here indicate the subscriber information, and the columns are the metrics/qualitative data per subscriber. Training an ML model on historical and real-time data can help identify patterns (in our case “make connections”) between variables that would not have been apparent to the human eye. In the above example, the target variable, to be predicted, is the churn rate. Arte TV could then leverage the output from the model in the following ways:<br/>
            <ul>
                <li>Clustering subscribers into different risk groups based on the churn score(output is a number, that is the probability that a customer will churn) and then sending them personalized offers, additional discounts, and customer support interventions.</li>
                <li>Identifying the reasons for churning across different churn groups and improving the overall marketing campaign.</li>
                <li>Identifying specific customer needs and working towards addressing them, helping increase engagement and revenue, as a result.
</li>
            </ul>
            </p>
            
            <p> Do you remember the challenges that we had listed above? Time to revisit them, in the context of Arte TV.  </p>
            <p>
            <b>Problem 1:</b> The data collection mechanism adopted by Arte TV was top-notch, but they didn’t have an effective strategy to combine/integrate them all in one place. Using a combination of quantitative and qualitative could have helped market insight professionals get a more comprehensive view of their subscribers. 
            </p>
            <p>
            <b>Problem 2:</b> They had vast amounts of quantitative and qualitative data, but in isolation, combining which could have gotten the marketing team a better picture of what factors were influencing subscriber behavior and what they could have done differently. 
            </p>
            <p>
            <b>Problem 3:</b> They took a reactive approach where they focused on the problems after they occurred. Using a predictive model could have helped them predict subscribers who were most likely at risk of churning, upon which they could have customized and improved their customer retention strategies per segment. </p>
            <p>
            <b>Problem 4:</b>The marketing professionals used multiple tools, often with overlapping functionalities and no clear privacy guidelines, to perform the analysis. This not only required them to learn multiple tools for similar activities but also led to increased costs of keeping the subscriptions. Using an all–in–one tool/solution would have been convenient and cost-effective.  </p> 
            <p><h3>CTA</h3>After going through the different challenges that the marketing team and market insight professionals face and exploring Arte TV’s use case one thing is certain: the need for a platform that: 
            <ul>
                <li>Makes it easier to source data from multiple sources, be it structured or unstructured, and merge it to provide you with a unified view.</li>
                <li>Lets you customize and streamline your customer data pipeline.</li>
<li>Enables you to get richer customer insights through interactive dashboards, live reports, and advanced analytics, without having to write a single line of code.</li>
<li>Protects your data integrity and enables you to stay compliant with GDPR and CCPA.</li>
<li>Provides in-depth insights into customer behaviour so you can maximize your efforts toward improving customer engagement.</li>
<li>Predicts customer churn and guides you and your team in developing the right retention strategies.</li>
</ul>
            </p>
            <p>Choose ConvertML and see your ROI grow 10X!<a href="https://calendly.com/convertml" target={'_blank'}> Schedule a demo</a> with us right away!  </p>
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
