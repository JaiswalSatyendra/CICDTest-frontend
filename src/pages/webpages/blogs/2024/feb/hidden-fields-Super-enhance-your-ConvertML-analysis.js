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
import { blogGuidetoHiddenFields } from "../../../../../assets/data/metadata-list";
 
export default function HiddenfieldsSuperenhance() {
  useEffect(() => {}, []);
  const blogList = blogListData;
  return (
    <>
        <Helmet> 
        <title>{blogGuidetoHiddenFields.title}  </title>
        <meta name="description" content={blogGuidetoHiddenFields.description } data-react-helmet="true" />
        <meta name="keywords"  content={blogGuidetoHiddenFields.keywords} />
        <meta property="image" content={blogGuidetoHiddenFields.image} />
        <meta property="url" content={blogGuidetoHiddenFields.url} />
        <meta property="publisher" content={blogGuidetoHiddenFields.publisher} />
        <meta property="author " content={blogGuidetoHiddenFields.author} />
        <meta property="site_name" content={blogGuidetoHiddenFields.site_name} />
        <meta property="locale" content={blogGuidetoHiddenFields.locale} />
        <meta property="type" content={blogGuidetoHiddenFields.type}/>
        <link rel="canonical" href={blogGuidetoHiddenFields.canonical} />
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
              Guide to Hidden Fields: Boost Your ConvertML Analysis
              </b>
            </div>
            <h1 className="d-none">
            Convertml  Boost Your ConvertML Analysis
            </h1>
            <h2>
            Guide to Hidden Fields: Boost Your ConvertML Analysis
            </h2> <br/>
            <img  src={"/json-media/img/blogs/blog-post/hiddenfieldsSuper-enhance.png"}
          alt="manusing bowand arror image"
          className="img-responsive" />
            <p>
            Before we get started on what hidden fields mean and why it’s super important for you to incorporate them as part of your survey, we’ll look at an example.<br />
              <br />
              Let’s say a company runs an anonymous survey to understand what the users like about the product. They use Typeform, a leading survey platform, to send out the surveys to their customers. Below is a snapshot of the data collected from Typeform after the survey period. 
              <br />    <br />
              <div>
              <div class="table-responsive">
                <table className="table table-bordered">
                <caption className="d-none">  Guide to Hidden Fields: Boost Your ConvertML Analysis </caption>
              <thead>
                <tr>
                  <th>No</th>
                  <th>Feedback Score</th>
                  <th>Features Liked</th>
                  <th>Ease of Use</th>
                  <th>Would Recommend</th>
                  <th>HubSpot Data (Segmentation)</th> 
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1017</td>
                  <td>8</td>
                  <td>Task Management, Integration Options</td>
                  <td>8</td>
                  <td>Yes</td>
                  <td>Not linked  </td>
                </tr>
                <tr>
                  <td>1025 </td>
                  <td>4 </td>
                  <td>Gantt Charts </td>
                  <td>4 </td>
                  <td>No </td>
                  <td>Not linked </td>
                </tr>
                <tr>
                  <td>1038 </td>
                  <td>9 </td>
<td>Mobile App, Notifications </td>
<td>9 </td>
<td>Yes </td>
<td>Not linked  </td>
                </tr>
                <tr>
                  <td>1046</td>
                  <td>7</td>
                  <td>File Sharing</td>
                  <td>7</td>
                  <td>Yes</td>
                  <td>Not linked</td>
                </tr>
                <tr>
                  <td>1059 </td>
                  <td>9 </td>
                  <td>Integration Options, Reporting </td>
                  <td>9 </td>
                  <td>Yes </td>
                  <td>Not linked </td>
                  </tr>
                  
              </tbody>
            </table>
            </div>
              </div>
            </p>
            
            <p><h3>Table 1: A partial view of just the survey/Typeform data</h3><a href="https://convertml.ai/" target={'_blank'}>ConvertML</a> maps the customer details between surveys and CRMs with the use of a common identifier. Often, this is a unique field that’s present in both Typeform and HubSpot: email-id or name. This can also be a combination of one or more fields, which together form a common element that can uniquely represent a user.</p>
            <p>
            And oftentimes, people want to remain anonymous when taking these surveys. You can see a snapshot of this in the above table. In that case, it becomes really challenging to link the users across the two platforms—both the survey platform and CRM. 
            </p>
            <p>Let’s take a look at an extension of the first example. Let’s say we have access to the email. Then this is how the table is going to look like:  </p> 
            <p>
            <div class="table-responsive">
                <table className="table table-bordered">
                <caption className="d-none"> Table 1: A partial view of just the survey/Typeform data </caption>
              <thead>
                <tr>
                  <th>No </th>
                  <th>Feedback Score </th>
                  <th>Features Liked </th>
                  <th>Ease of Use </th>
                  <th>Would Recommend </th>
                  <th>Email </th>
 <th>Plan </th>
 <th>Sector </th>
 <th>Active User </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1017</td>
                  <td>8</td>
                  <td>Task Management, Integration Options</td>
                  <td>8</td>
                  <td>Yes</td>
                  <td>user101@company.com</td>
<td>Enterprise</td>
<td>Tech</td>
<td>Active User</td>
                </tr>
                <tr>
                  <td>1025 </td>
                  <td>4 </td>
                  <td>Gantt Charts </td>
                  <td>4 </td>
                  <td>No </td>
                  <td>user102@company.com </td>
 <td>Basic </td>
 <td>Manufacturing </td>
 <td>Infrequent User 
 </td>
                </tr>
                <tr>
                  <td>1038</td>
                  <td>9</td>
                  <td>Mobile App, Notifications</td>
                  <td>9</td>
                  <td>Yes</td>
                  <td>user103@company.com</td>
<td>Pro</td>
<td>Consulting</td>
<td>Active User 
</td>
                </tr>
                <tr>
                  <td>1046</td>
                  <td>7</td>
                  <td>File Sharing</td>
                  <td>7</td>
                  <td>Yes</td>
                  <td>user104@company.com</td>
<td>Basic</td>
<td>Education</td>
<td>Infrequent User </td>
                </tr>
                <tr>
                  <td>1059 </td>
                  <td>9 </td>
                  <td>Integration Options, Reporting </td>
                  <td>9 </td>
                  <td>Yes </td>
                  <td>user105@company.com </td>
 <td>Enterprise </td>
 <td>Tech </td>
 <td>Very Active User 
 </td></tr>   </tbody>
            </table>
            </div>
            </p>
           
            <p> <h4>Table 2: Unified view of survey and CRM data - Typeform + HubSpot</h4>
            Table 2 shows how ConvertML brings together both the survey and CRM data to present a unified view of the customers. And how would you do this? Through the use of “hidden fields”. </p> <p>
            Hidden fields in Typeform can help you with data personalization and tracking without altering the user's experience of the form. You’d be able to attach relevant data like user IDs, email addresses, or any specific information to each form submission for anonymous surveys that you send out. This is important for maintaining anonymity in surveys that you ask your customers to take.  </p> <p>
            Why exactly would you want to use hidden fields in your surveys? Why would you even want to include HubSpot or another CRM data as part of your analysis?  
            </p>
 
            <p>Though this has been covered extensively in   we’ll have a quick look at it:  </p> 
 <p><h4> What you’re missing out on 
 </h4>No more “contact-level precision”. With no details of the customers or the inability to map this data across sources, you’ll only have a high-level overview of all your users (as a whole). With marketing strategies increasingly becoming hyper-personalized, you’d need “contact-level” insights. If not, you’d have to resort to a one-size-fits-all approach that no longer works for most use cases.</p>
   <p><b>No granular-level segmentation.</b> Without HubSpot data, you’d hardly have a handful of columns that you can segment your customer base on.</p>
   <p><b>Generic insights.</b> Your insights will most likely be frothy, only limited to overall sentiment analysis, NPS score, and some more. This is enough, but “enough” doesn’t cut it anymore.</p>
        
            <p> <h4>What you’ll have </h4>
            <b>Granular-level customer segmentation.</b> Without the advanced segmentation, you’d end up overlooking the specific needs and preferences of different user groups (e.g., Enterprise Tech Sector vs. Basic Plan Manufacturing Sector) [from Table 2]. This can lead to one-size-fits-all product improvements and marketing strategies that don’t meet the needs of your diverse user base. 
            </p>
            <p>
            Go back to the two tables. The high-level overview doesn't tell you that users in the Manufacturing sector find Gantt Charts less usable. You’re missing out on a critical insight for prioritizing development resources to enhance features for specific segments.
            </p>
            <p><b>A clear understanding of user engagement.</b> The broad feedback metrics will never tell you this. Do you notice how engagement levels (e.g., Very Active Users in the Tech sector giving high scores) correlate with satisfaction and recommendation likelihood? There you go. You’re missing out on identifying key drivers of loyalty and advocacy.</p>
            <p><b>Strategic planning for customer support.</b> Without proper segmentation, it'd be really difficult for you to allocate support resources efficiently. For instance, you’ll see that Basic Plan users in Education need more guidance on file sharing. You’re not getting this insight from Table 1. 
</p>
<b>Let’s quickly summarize this. Through hidden fields you’ll be able to:  </b>
<ul>
    <li>Segment your audience based on the hidden fields you select. This can be location, age, or product interest for targeted analysis.</li>
    <li>Better understand what “excites”, “meh(s)”, or “disappoints” your customers. </li>
    <li>Allocate resources towards product development, customer support, and other areas more efficiently. 
</li>
</ul>
            <p>
              <h3>
              How would you go about creating hidden fields?  
              </h3>
              <p>Here are the steps to create a survey form with hidden fields:</p>
           
 <b>Step 1: Add hidden fields to your survey form.
 </b>
 <p>Start by creating the survey form<br/>
 <img  src={"/json-media/img/blogs/blog-post/hidden-fields-Superscreen1.png"}
          alt="manusing bowand arror image"
          className="img-responsive" /></p>
          <p>Then, set up the logic for the survey.<br/>
 <img  src={"/json-media/img/blogs/blog-post/hidden-fields-Superscreen2.png"}
          alt="manusing bowand arror image"
          className="img-responsive" /></p>

<p>Personalize the survey with data as needed.<br/>
 <img  src={"/json-media/img/blogs/blog-post/hidden-fields-Superscreen3.png"}
          alt="manusing bowand arror image"
          className="img-responsive" /></p>

<p>Next, include hidden fields in the survey. <br/>
 <img  src={"/json-media/img/blogs/blog-post/hidden-fields-Superscreen3.png"}
          alt="manusing bowand arror image"
          className="img-responsive" /></p>

          
<p>Add the necessary hidden fields such as name, email, phone number, etc. <br/>
 <img  src={"/json-media/img/blogs/blog-post/hidden-fields-Superscreen4.png"}
          alt="manusing bowand arror image"
          className="img-responsive" /></p>

       
<h3>Step 2: After adding the hidden fields, publish your survey form.</h3> 
 <img  src={"/json-media/img/blogs/blog-post/hidden-fields-Superscreen5.png"}
          alt="manusing bowand arror image"
          className="img-responsive" />


                 
<p><h3>Step 3: Go to share and then click: “Embed in an email.”</h3>
 <img  src={"/json-media/img/blogs/blog-post/hidden-fields-Superscreen6.png"}
          alt="manusing bowand arror image"
          className="img-responsive" /></p> 
<p>
<h3><b>Step 4: Obtain the token from HubSpot. </b></h3> 
Here, our objective is to obtain the token from HubSpot. The token, a pivotal key, contains essential values such as name, email, phone number, and more.<br/>
Navigate to HubSpot and access the Marketing section.<br/>
<img  src={"/json-media/img/blogs/blog-post/hidden-fields-Superscreen16.png"}
          alt="manusing bowand arror image"
          className="img-responsive" /><br/> 
          Proceed to Create an Email.<br/> 
          Edit the email template as required.<br/> 
<img  src={"/json-media/img/blogs/blog-post/hidden-fields-Superscreen17.png"}
          alt="manusing bowand arror image"
          className="img-responsive" /><br/>
          Personalize the email by incorporating contact details such as name, email, etc.<br/>
<img  src={"/json-media/img/blogs/blog-post/hidden-fields-Superscreen18.png"}
          alt="manusing bowand arror image"
          className="img-responsive" /><br/>
Access the Settings and opt for Plain text format.<br/>
<img  src={"/json-media/img/blogs/blog-post/hidden-fields-Superscreen19.png"}
          alt="manusing bowand arror image"
          className="img-responsive" /><br/>
          Click on Customize to access token customization.<br/>
      
<img  src={"/json-media/img/blogs/blog-post/hidden-fields-Superscreen20.png"}
          alt="manusing bowand arror image"
          className="img-responsive" /><br/>
          Copy the token.<br/>
<img  src={"/json-media/img/blogs/blog-post/hidden-fields-Superscreen21.png"}
          alt="manusing bowand arror image"
          className="img-responsive" />

</p>
<p>A token should look something like this: <br/> #name = &#123;&#123;contact.firstname&#125;&#125;, #email = &#123; &#123;personalization_token('contact.email','No email')&#125;&#125;
           <br/> 
</p>  
<p><h4>Step 5: Copy the token from HubSpot and paste it into the TypeForm's Hidden Field Box.</h4>   
Perform the following steps:<br/>
Access TypeForm and navigate to the Share option.<br/>

<img  src={"/json-media/img/blogs/blog-post/hidden-fields-Superscreen22.png"}
          alt="manusing bowand arror image"
          className="img-responsive" />
          <br/>
          Locate and access the <b>Discover Hidden Field</b> Box. <br/>
          <img  src={"/json-media/img/blogs/blog-post/hidden-fields-Superscreen23.png"}
          alt="manusing bowand arror image"
          className="img-responsive" /><br/>
          Copy the token obtained from HubSpot. 
          <br/>
          <img  src={"/json-media/img/blogs/blog-post/hidden-fields-Superscreen24.png"}
          alt="manusing bowand arror image"
          className="img-responsive" /><br/>
          Paste the copied token into the Hidden Field Box within TypeForm.<br/>
          <img  src={"/json-media/img/blogs/blog-post/hidden-fields-Superscreen25.png"}
          alt="manusing bowand arror image"
          className="img-responsive" /><br/> 
</p>
<p>
<h4>Step 6: Proceed with embedding your form in an email. </h4>
<img  src={"/json-media/img/blogs/blog-post/hidden-fields-Superscreen26.png"}
          alt="manusing bowand arror image"
          className="img-responsive" />  
</p>
<p>
<h4>Step 7: Open HubSpot Edit Email. </h4>
<b>Do the following in sequence: </b>
<ul>
    <li>Access the HubSpot platform.</li>
    <li>Edit the email you intend to modify.</li>
    <li>Navigate to the Content section within the email editor.</li>
    <li>Select More options. </li>
</ul>
<img  src={"/json-media/img/blogs/blog-post/hidden-fields-Superscreen27.png"}
          alt="manusing bowand arror image"
          className="img-responsive" />  <br/>
          Add a module, specifically an HTML module.<br/>
<img  src={"/json-media/img/blogs/blog-post/hidden-fields-Superscreen28.png"}
          alt="manusing bowand arror image"
          className="img-responsive" />  <br/>Paste the code you copied from the TypeForm into the HTML section of the module.
          <br/>
<img  src={"/json-media/img/blogs/blog-post/hidden-fields-Superscreen29.png"}
          alt="manusing bowand arror image"
          className="img-responsive" />  <br/>
</p>


<p>
<h4>Step 8: Create/Import contacts.  </h4> 
After pasting the code from TypeForm into the HTML section, save the email in HubSpot.<br/>
Access Contacts to add Contact lists.<br/>
I. To create Contacts: <br/>
If you don’t have any contacts, you can manually create them by adding required details such as name, email, phone number, etc.<br/> 
<img  src={"/json-media/img/blogs/blog-post/hidden-fields-Superscreen30.png"}
          alt="manusing bowand arror image"
          className="img-responsive" />  <br/>
          II. To Import Contacts: <br/>
          Import contacts from an external file or database into HubSpot. Make sure the format aligns with HubSpot's requirements for importing contacts.<br/> 
<img  src={"/json-media/img/blogs/blog-post/hidden-fields-Superscreen31.png"}
          alt="manusing bowand arror image"
          className="img-responsive" />   
    </p>

    <p>
<h4>Step 9: Return to HubSpot Marketing Email.   </h4> 
We’re reaching the final stage of the activity at this point. Complete this process by following these steps:<br/>
 <ul>
    <li>Edit the email by navigating to the email editor.</li>
    <li>Review and finalize the email content.</li>
    <li>Select recipients from the contact list that you created/imported.</li>
    <li>Ensure the subject line is appropriate and relevant.</li>
    <li>Proceed to send the email after reviewing and confirming all details.
</li>
 </ul>
<img  src={"/json-media/img/blogs/blog-post/hidden-fields-Superscreen32.png"}
          alt="manusing bowand arror image"
          className="img-responsive" /><br/>

<img  src={"/json-media/img/blogs/blog-post/hidden-fields-Superscreen33.png"}
          alt="manusing bowand arror image"
          className="img-responsive" /><br/>
Once a user responds to the form automatically the name and email will be recorded in hidden fields.
    </p>  
    
    <p>
<h4>Step 10:View the hidden fields.    </h4> 
If you want to view the hidden fields you can: 
<br/>
 <ul>
    <li>Log in to TypeForm.<br/>
<img  src={"/json-media/img/blogs/blog-post/hidden-fields-Superscreen34.png"}
          alt="manusing bowand arror image"
          className="img-responsive" /> </li> 
    <li>Navigate to the Form section.</li>
          <li>Select the specific form you want to view results for. </li>
          <li>Go to the results tab.<br/>
          <br/>
<img  src={"/json-media/img/blogs/blog-post/hidden-fields-Superscreen35.png"}
          alt="manusing bowand arror image"
          className="img-responsive" /> 
</li>
<li>Click on the responses to view detailed responses and analysis.<br/>
<img  src={"/json-media/img/blogs/blog-post/hidden-fields-Superscreen36.png"}
          alt="manusing bowand arror image"
          className="img-responsive" />
</li> 
 </ul> 
    </p> 
    
    <p>
<h4>Step 11: Track the performance.     </h4> 
If you want to know how well your campaign performed, you can follow these steps: 
<br/>
 <ul>
    <li> Log in to HubSpot.</li>  
    <li> Navigate to the Marketing section.</li> 
    <li> Access the Emails tool.</li> 
    <li> Locate and select the specific email you want to analyze. <img  src={"/json-media/img/blogs/blog-post/hidden-fields-Superscreen37.png"}
          alt="manusing bowand arror image"
          className="img-responsive" />
</li> 
<li>Click on the Performance tab or section.<img  src={"/json-media/img/blogs/blog-post/hidden-fields-Superscreen38.png"}
          alt="manusing bowand arror image"
          className="img-responsive" /><img  src={"/json-media/img/blogs/blog-post/hidden-fields-Superscreen39.png"}
          alt="manusing bowand arror image"
          className="img-responsive" /> </li>
          <li>Review the metrics provided, which typically include data on email opens, click-through rates, and recipient engagement.<br/><img  src={"/json-media/img/blogs/blog-post/hidden-fields-Superscreen40.png"}
          alt="manusing bowand arror image"
          className="img-responsive" /></li>
 </ul> 
    </p> 
    <p>
<h4>Step 12:  Track recipients     </h4> 
If you want to understand the engagement levels, you can:  
<br/>
 <ul> 
    <li> Find and select the Recipients section.<br/>   <img  src={"/json-media/img/blogs/blog-post/hidden-fields-Superscreen41.png"}
          alt="manusing bowand arror image"
          className="img-responsive" /><br/>
          <img  src={"/json-media/img/blogs/blog-post/hidden-fields-Superscreen42.png"}
          alt="manusing bowand arror image"
          className="img-responsive" />
</li> 
<li>In the Recipients section, you can view all recipients who received your emails and track actions such as Clicked, Opened, and Delivered next to each recipient.<br/>
          <img  src={"/json-media/img/blogs/blog-post/hidden-fields-Superscreen43.png"}
          alt="manusing bowand arror image"
          className="img-responsive" /></li>
 </ul> 
    </p> 

    
    <p><h2>Ways in which ConvertML will use hidden fields.    </h2> 
<p>Here are some ways in which ConvertML can enhance your analysis if you include hidden fields: 
</p>

<p><b>CSAT analysis</b><br/>
Hidden fields can automatically attach specific context to each survey response, such as the product or service feature being evaluated. ConvertML can use this to perform a much better CSAT analysis. For example, it can help you identify satisfaction levels with particular aspects of your offering.<br/><br/>
By incorporating hidden fields that track the customer's journey stage or recent interactions (e.g., support ticket resolution), ConvertML can also provide in-depth insights into satisfaction at different touchpoints and this will help you pinpoint areas for improvement across the customer experience.</p>
</p>
<p><b>NPS analysis</b><br/>
ConvertML can use hidden fields to segment respondents by demographic information, user type, or purchase history. Remember that you wouldn’t have to bother the user for any additional details that they don’t want to share in the survey. This segmentation allows ConvertML to deliver deeper insights into which segments are Promoters, Passives, or Detractors. 
</p>
<p>You can also get a clear picture of whether a change in your campaign worked. Or perhaps did the new UI appeal to your users?  Let’s say you send out a survey after specific events or milestones (e.g., after a major update or marketing campaign). Once you have the NPS scores, you can tie them back to the purpose of the survey i.e. whether you’d sent it after a product upgrade or to ask your users what they thought of the new customer service ticketing system. </p>
<p>From the above example, you’ll also be able to track which groups of users found your new upgrade interesting and which ones did not. Remember that you have the email and names in the hidden fields, so you’ll be able to merge their responses with additional attributes such as age, location etc. from HubSpot. So, ultimately, ConvertML does all this for you to present a clear picture of what’s going on. 
</p>

<p><b>Brand loyalty analysis</b><br/>
You can use hidden fields to include identifiers that allow for tracking the same customers' responses over time. This longitudinal data is really important for ConvertML to analyze changes in brand loyalty and can help assess the effectiveness of loyalty programs or customer retention strategies.
</p>
    
    <p><b>In-depth segmentation </b><br/>
By capturing just the email or name as hidden fields in Typeform and merging it with existing HubSpot data, ConvertML can create unified customer profiles. This consolidation provides a comprehensive view of each customer's interactions, preferences, and history across your platforms. With this merged data, ConvertML can then segment your audience with greater precision. Attributes from HubSpot, such as purchase history, engagement levels, and demographic details, when combined with survey responses from Typeform, allow ConvertML to create highly targeted customer segments. So now you can get a hyper-granular level picture of all your users! 
</p>
<p>This can now help you create segments for users who showed interest in a specific product in your Typeform survey and have a history of similar purchases in HubSpot. You’ll also be able to send them much more personalized recommendations and run granular-level marketing strategies. </p>
<p>If you go back to Table 2 at the beginning of the blog, you can see how adding hidden fields can have multi-fold benefits. 
</p>
<h4>Segment by Plan and Sector</h4>
<p><b>Enterprise Tech Sector:</b> Customers like user101 and user105, who are on the Enterprise plan and in the Tech sector, highly value "Integration Options." Through this, you get an idea that there’s a demand for advanced integration capabilities in tech industries. </p>

<p><b>Basic Manufacturing Sector:</b> User102, on the Basic plan in the Manufacturing sector, shows lower feedback scores and a preference for "Gantt Charts." This indicates a specific need for project management tools within manufacturing. </p>
<h4>Segment by User Activity and Feedback Score</h4>
<p><b>Very Active Users with High Scores:</b> User105, a "Very Active User" with a high feedback score, indicates a highly engaged and satisfied segment. Your marketing team can target this segment with referral programs or upsell opportunities.</p>
<p><b>Infrequent Users with Low Scores:</b> User102, an "Infrequent User" with lower scores, represents a segment that may require engagement boost strategies, such as onboarding refreshers or targeted communications highlighting features like "Gantt Charts" to enhance their product experience.</p>

<p>Note that this table is small and we’re doing all our analyses manually. ConvertML will work on a unified view (Typeform + HubSpot) that can have hundreds of thousands of rows and give you visual plots that help you understand this in a matter of seconds! </p>
<h4>Churn prediction  </h4>
<p>You can read more about how ConvertML helps you proactively detect churn and churn drivers <a href="https://www.convertml.ai/blogs/2024/feb/combining-the-best-of-quantitative" target={'_blank'}>here.</a> </p>
    <br />  
            </p>
 <p>You’ve already seen how hidden fields are really important to the merging of survey data from Typeform with comprehensive customer data in HubSpot. By using a common identifier like an email address, ConvertML can create enriched customer profiles that combine behavioural data, transaction history, and personal feedback. This is what we commonly refer to as the “power of quantitative and qualitative data”. </p>

 <p>ConvertML now uses predictive modelling to identify the likelihood of churn along with the churn drivers. The model can analyze patterns across various data points, such as product usage, customer support interactions, survey responses, and engagement metrics, to predict which customers are at risk of leaving, along with how likely they are to leave. So you’re getting not only the what and how but also the why. Once you have a list of low-risk, mid-risk, and high-risk customers bucketed clearly you can focus on developing retention strategies for the high-risk customers. </p>
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