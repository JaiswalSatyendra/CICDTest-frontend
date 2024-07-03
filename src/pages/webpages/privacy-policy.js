import React, { useState, useEffect } from "react";
import HeroSection from "../../components/HeroSection";
import NavigationLinkSection from "../../components/NavigationLinkSection";
import ConvertMLMarketingSection from "../../components/ConvertMLMarketingSection";
import ConvertMLretainAndGrow from "../../components/ConvertMLretainAndGrow";
import Footer from "../../components/Footer";
import Navbar from "../../components/molecules/Navbar";
import { Link, useNavigate } from "react-router-dom";
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

import CloseIcon from "@mui/icons-material/Close";

import multiChannelNPSIcon from "../../assets/icons/multiChannelNPSIcon.svg";
import customerSegmentationIcon from "../../assets/icons/customerSegmentationIcon.png";
import recencyFrequency from "../../assets/icons/recencyFrequency.svg";
import unlimitedicons from "../../assets/icons/unlimitedicons.png";
import realtimeNPS from "../../assets/icons/realtimeNPS.png";
import engagementScore from "../../assets/icons/engagementScore.svg";

import salesforce from "../../assets/icons/salesforce.png";
import hubsport from "../../assets/icons/hubsport.png";
import zendesk from "../../assets/icons/zendesk.png";
import surveyFrom from "../../assets/icons/surveyFrom.png";
import capterra from "../../assets/icons/capterra.png";
import customdataSource from "../../assets/icons/customdataSource.png";
import typeform from "../../assets/icons/typeform.png";
import googleForms from "../../assets/icons/googleForms.png";
import surveymonkey from "../../assets/icons/surveymonkey.png";

import productDevelopment from "../../assets/img/solutions/satisfactionproductdevelopment.png";
 

import privacyPolicy from "../../assets/img/privacyPolicy.png";
import HomeFooter from "../../components/home-footer";

import aboutus from "../../assets/img/aboutus.png"; 
import { Helmet } from "react-helmet"; 
import { privacyPolicyMeta } from "../../assets/data/metadata-list";
function PrivacyPolicy() {
  const imgpath = "../../assets/img/team/";

  
 

  const [open, setOpen] = React.useState(false);
  const [teamMemberList, setteamMemberList] = React.useState([]);
  const [advisorsList, setadvisorsList] = React.useState([]);
  const [selectTeamMember, setselectTeamMemberpopup] = React.useState([]);
  
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const navigate = useNavigate();
  const getstartedClick = () => navigate('/signup');

 

  

 
  
  useEffect(() => {
    console.log(selectTeamMember) 
  }, []);

  return (
    <>
     <Helmet> 
        <title>{privacyPolicyMeta.title}  </title>
        <meta name="description" content={privacyPolicyMeta.description } data-rh="true" />
        <meta name="og:description" content={privacyPolicyMeta.description } data-rh="true" />
        <meta name="keywords"  content={privacyPolicyMeta.keywords} data-rh="true" /> 
        <meta property="og:title" content={privacyPolicyMeta.title } data-rh="true" />
        <meta property="og:image" content={privacyPolicyMeta.image} data-rh="true" />
        <meta property="og:url" content={privacyPolicyMeta.url} data-rh="true"/>
        <meta property="og:publisher" content={privacyPolicyMeta.publisher} data-rh="true" />
        <meta property="og:author " content={privacyPolicyMeta.author} data-rh="true" />
        <meta property="og:site_name" content={privacyPolicyMeta.site_name} data-rh="true" />
        <meta property="og:locale" content={privacyPolicyMeta.locale} data-rh="true" />
        <meta property="og:type" content={privacyPolicyMeta.type} data-rh="true"/>
        <link rel="canonical" href={privacyPolicyMeta.canonical} data-rh="true" />
      </Helmet>  
      <Navbar />
      {/* ------------------- banner   ------------------- */}
      <div className="new-banner">
        <section className="container-home text-center">
          {/* <div className="banner-top-heading">Pricing </div> <br /> */}
          <h1 className="m-0 d-none"> CML Privacy Policy           </h1>
          <h2 className="m-0 d-none">  The Company  Privacy Policy           </h2>
          <h3 className="m-0">
          Privacy Policy 
          </h3>
          <p>
          The Company is concerned and committed to protecting and maintaining the privacy of all its Users  and has published this privacy policy statement (the “Privacy Policy” or “PP”) to familiarize You with  the way the Company collects, stores, uses, discloses, alters, and/or deletes Your personally  identifiable information (“PII”) collected during your usage of the ConvertML Services. 

          </p>
          <br />
          <button  onClick={getstartedClick} className="link-btn">
            <i className="fa fa-play-circle"> </i> Get Started  
    </button> 
         <img src={privacyPolicy} alt="privacy Policy" className="bannerimg" />  
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
            <Grid item xs={12} md={12} lg={12}> 
              <h3>Purpose  </h3>
              The purpose of this PP is to ensure that: 
              <ol>
                <li> 
You are aware of and have complete control over what Customer Data you  
provide to the Company, and how the same is and will be used by the Company; </li>
<li>You are always aware of the rights available to you with respect to your Customer Data; </li>
<li>The information provided by you is processed, stored, and used in accordance  with the applicable laws, including with respect to maintaining appropriate data protection and privacy infrastructure. 
</li>
              </ol>
              We insist upon the highest standards for securing Customer Data and maintaining  customer information privacy. 
<h3> Information We Collect </h3> 
<ol>
  <li>“Customer Data” means all electronic data, information, or other content (including  information pertaining to End-Users and the content of any Messages), submitted or  provided by or on behalf of a customer to be stored, collected or processed by us in  connection with a customer’s authorized use of the ConvertML Services; </li>
  <li> “Data Point” or “Event” means a session start, session end, custom event, purchase  recorded, or any other custom recording (a billable event) on the ConvertML Service.  For the sake of clarity, data and events automatically collected by the ConvertML  Services including, for example device information, location data and all campaign  engagement tracking events, such as email opens and push notification clicks, are not  counted as Data Points. </li>
  <li>We have already specified (under points 3 and 4 above) the kind of Customer Data (PII  and otherwise) that we require, collect, access, and store during the period of account  creation and thereafter during your usage of the ConvertML Services. Both You and  your End-Users (through you) have the right, at any time, to choose not to provide us  with any of this information and to ask us to delete the same, if required. However,  doing so may result in the subsequent suspension/hampering of all or a part of the  ConvertML Services. </li>
  <li> Cookies: Cookies are pieces of information that are stored on Your computer when the  You accesses the Platform. The Platform may use temporary cookies to help you  access some of the special functions within the database driven areas of the Platform.  Once you leave our Platform, these cookies expire. Cookies do not collect personal  identifying information about the user.</li>
</ol>

<h3>Information Storage and Security</h3>
<ol>
  <li>All the information that we collect from You during your usage of ConvertML is stored  on third-party servers, located in United States of America. We access the information  on the cloud. Our third-party service provider uses globally accepted standards for  ensuring and maintaining the protection, security, confidentiality, and privacy of all  data on its servers. </li>
  <li>We work hard to protect You from unauthorized access or unauthorized alteration,  disclosure or destruction of any Customer Data we hold. Pursuant to the same, we  have implemented globally accepted standards and procedures to maintain ongoing  data protection and privacy by ensuring the following: 

<ul>
  <li>The encryption of all data (both Customer Data and ConvertML Content) using  secure server software, which is among the best software available today for  secure transactions. </li>
  <li>The pseudonymization of all data collected by us, by ensuring that all PII is  kept/stored separately from all the remaining information, to ensure that the  remaining data cannot be attributed to an identified or identifiable natural  person, unless actively merged or joined with the PII; </li>
  <li> The constant review of our information collection, storage and processing  practices, including this PP, and the physical security measures to guard  
against unauthorized access to systems; 
</li>
</ul>

  </li>
  <li>The constant upgradation and/or alteration of our policies as may be  
necessary to ensure the ongoing confidentiality, protection, privacy, security,  and accessibility of all data and systems; 
h.Limiting the disclosure of PII to Our employees, independent contractors  including vendors, affiliates, consultants, business associates, service  
providers and distributors of Our services, only on a “need-to-know” basis, and  only if the disclosure will enable that person/entity to provide Us with  
business, professional, or technical support or fulfill Your request and  
requirements under the services. 
</li>
</ol>
<h3>Information We Share  </h3>
<ol>
  <li>In addition to any third-party service providers who, subject to your prior consent, we  may share some or all parts of the Customer Data with, we may disclose any  information provided by You on the Platform as may be deemed to be necessary or  appropriate: (a) under applicable law, including laws outside Your country of  residence; (b) to comply with legal process; (c) to respond to requests from public and  government authorities including public and government authorities outside Your  country of residence; (d) to enforce Our Terms of Use; or (e) to allow Us to pursue  available remedies or limit the damages that We may sustain. </li>
  <li> By agreeing to this PP, you also explicitly understand and consent to the fact that we  may share Customer Data with other corporate entities and affiliates only for the  purposes of: 
i. Using their assistance to detect and prevent identity theft, fraud and other  potentially illegal acts; or
j. Correlating related or multiple accounts to prevent abuse of the ConvertML  services 
</li>
</ol>
<h3>Rights Available to You </h3>
<ul>
  <li>Once you start using the ConvertML Services, both you and your End-Users (together  the “Data Subjects”) shall have the below mentioned rights. If any of your End-Users  wish to exercise the below rights, it will be your responsibility to receive the relevant  written request from them, and then communicate/transfer the same to us so that we  
may take the appropriate action: 
<ol>
  <li>Delete/erase all PII (or all data) pertaining to a Data Subject that we may have  on our systems. This provision will not apply to any data or PII that we may  need to retain pursuant to any applicable law or any request/requirement of a  public/government body, whether in your country of residence or not;</li>
  <li>Rectify, modify, or alter any of the PII or other data pertaining to a Data  
Subject, if you have identified any mistake, error or inaccuracy in the same. m. Restrict or limit the manner and ways in which a particular Data  
Subjects information/data is processed or used by us; 
</li>
<li>Export and provide a Data Subject with a copy of all his/her data, including the  PII, that we may have on our servers. This includes all data and server logs  pertaining to activities and behaviour on the Platform as well.</li>
</ol>

</li>
<li>We will make all commercially reasonable best efforts to comply with all the above  requests (when received) as soon as possible. If as a Customer, you wish to exercise  any of your above rights, or if you wish to convey a request on behalf of an End-User,  kindly send an email to legal@convertml.ai. </li>
</ul>
<h3>Services provided to the customers </h3>
<p>The Company reserves the right, in its sole discretion, to add, change, suspend, or  discontinue all or any part of the ConvertML Services at any time by posting a notice  on the Platform and by sending You an email. Your continued use of ConvertML  Services following the posting of any changes to the same (including the addition or  removal of features) constitutes Your acceptance of those changes. Any information  You provide to us for the purposes of registering and setting up your account (as  specified below) shall be considered as accurate, complete and updated. You are  solely responsible for the activity that occurs on Your account (including those of  other authorised to access and operate your account) and for maintaining the security  of your account and any information You input. We are not responsible for the  accuracy or legitimacy of any information, data, or Customer Data uploaded, posted,  or downloaded by you or any of your employees/agents on the Platform during your  usage of the services. For the purposes of clarity, if your account is accessed with the  correct username and password and unless you notify us of any unauthorised access,  the Company is not and will not be responsible for verifying the nature of the  individual/entity accessing your account, including if that person exports/downloads  any Customer Data, and then shares the same with any third-party. </p>

<h3>Registration and Account Integrity</h3>
<p>As part of the registration process, you will need to accept our PP, and provide us with  your name (or the name of your organization/company) and your email ID. You will be  required to create a password in order to secure and limit access to your account. We  do not have access to and do not at any time request you to provide us with access to  your password, unless you have given us explicit written permission to access your  account pursuant to a request for assistance or support.</p>

<p> It is Your responsibility to ensure that the information You provide is accurate, secure,  and not misleading. You cannot create an account username and password using (i)  the names and information of another person; or (ii) using words that are the  trademarks or the property of another party (including ours); or (iii) words that are  vulgar, obscene or in any other way inappropriate. At the time of creation and each  time you access your account thereafter, we track your IP address solely for the  purposes of determining the geographical location from which you are accessing the  Platform. </p>
<h3>Use of Your Information and Content</h3>
<p>All Customer Data that you create, transmit, transfer to us, submit, display or  otherwise make available while using the ConvertML Services, should only be  information that You own or have the right to use or share (as may be applicable). If  you transfer any End-User information or data to us (including any End-User PII), we  will assume that you have informed the End-User and procured the necessary consent  for such transferring, sharing, processing and/or using the information in the way  envisaged under the ConvertML Services (including for the purposes of sending  Messages). Such End-User information may include: </p>

<ul>
  <li>.Location data; </li>
  <li>Device details and status (used by the End-User to access your application  and/or website); </li>
  <li>Session information; </li>
  <li> Acquisition details; </li>
  <li>End-User activity like email opens, clicks, items viewed, items purchased etc.  and any other activity that you track as per your business use cases; </li>
  <li> End-User details like name, email ID, phone number, gender, etc. and any  other attributes specific to the business-like Total Purchases, Order status etc.</li>
  <li>We may use the above information for as long as your account is active and in use, and  only as specified/permitted by our Privacy Policy and by applicable law. For example,  we will never share personally identifiable information pertaining to You or your End Users, without the relevant prior explicit disclosure and permission. 
</li>
<li>While we make commercially reasonable efforts to ensure that the data stored on our  servers is persistent and always available to our customers, we will not be responsible  in the event of failure of the third-party servers or any other factors outside our  reasonable control, that may cause the Customer Data to be permanently deleted,  irretrievable, or temporarily inaccessible.</li>
</ul>
<h3>Change in Privacy Policy </h3>
<p>You acknowledge that becoming a user of the ConvertML Services signifies your assent to this  PP. In the event there are any changes to this PP or in the way we treat any Customer Data, we  shall intimate you of the same via email at least 1 week prior to the enforcement of such  change. We will also display a notice on the Platform regarding the above. If after your receipt  of a notice of change to the PP you do not object to the same and/or continue to use the  ConvertML Services, you will be assumed to have provided your consent to the changes. </p>

<h3>Choice/Opt-Out</h3>
<p>As stated previously, we provide all Customers with the option and choice of opting-out of  receiving certain third-party services and/or the ConvertML Services in general, at any time. </p>

<h3>Questions </h3>
<p>Questions regarding this Privacy Policy should be directed to the following email ID:  legal@convertml.ai </p>

<h3>Disclaimer </h3>
<p>We shall not be liable for any loss or damage sustained by reason of any disclosure  (inadvertent or otherwise) of any Customer Data, if the same is either (a) required  under point 4.1 above; or (b) was affected through no fault, act, or omission of the  Company. </p>  

<p> We reserve our right to offer our services to any other client/prospective client without  restriction.  </p>
<p> By registering or by using the Platform, you explicitly accept, without limitation or  qualification, the collection, use and transfer of the Customer Data in the manner  described herein.  </p>
<p> Please read this Privacy Policy carefully as it affects your rights and liabilities under  law. </p>
<p className="text-right">This document was last updated on 02/20/2024. </p>
            </Grid> 
          </Grid>
        </section>

        
        <br />
      </div>
      <br /> 
      <HomeFooter /> 
    </>
  );
}

export default PrivacyPolicy;
