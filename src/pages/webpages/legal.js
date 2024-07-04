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
import kunalSondhi from "../../assets/img/team/kunalSondhi.png";
import gustav from "../../assets/img/team/gustav.png";
import hardevSahu from "../../assets/img/team/hardevSahu.png";
import deepakSondhi from "../../assets/img/team/deepakSondhi.png";
import zahidSheikh from "../../assets/img/team/zahidSheikh.png";
import harshvardhan from "../../assets/img/team/harshvardhan.png";
import satwikMishra from "../../assets/img/team/satwikMishra.png";
import swati from "../../assets/img/team/swati.png";
import charles from "../../assets/img/team/charles.png";
import sunnySingh from "../../assets/img/team/sunnySingh.png";
import rishiPatel from "../../assets/img/team/rishiPatel.png";
import khemChand from "../../assets/img/team/khemchand.png";

import legalSecurity from "../../assets/img/legal-security.png";
import HomeFooter from "../../components/home-footer";

import aboutus from "../../assets/img/aboutus.png";
import {
  advisorsListData,
  teamMemberListData,
  teamMemberadvisorsListData,
} from "../../assets/data/data";
import { Helmet } from "react-helmet";
import { LegalMeta } from "../../assets/data/metadata-list";
import { HelmetData } from "react-helmet-async";

function LegalPage() {
  const imgpath = "../../assets/img/team/";
  const navigate = useNavigate();
  const getstartedClick = () => navigate('/signup');
   

  const teamMemberadvisorsList = [
    {
      id: 1,
      type: "team",
      name: "Gustav Toppenberg",
      photo: gustav,
      designation: "Co-Founder",
      details:
        "Our Strategic Advisor Gustav Toppenberg, PhD in Technology Strategy, brings extensive experience from over two decades in Fortune 100 and high growth organizations. Notably, he served as Senior Director - IT at AON and Chief Technology Officer at Boston Consulting Group. Gustav's expertise lies in developing enterprise-wide technology strategies, driving digital transformation, and leading initiatives that enhance operational efficiency and client services.",
    },
    {
      id: 2,
      type: "team",
      name: "Kunal Sondhi",
      photo: kunalSondhi,
      designation: "Co-Founder",
      details:
        "Lead product engineering and user experience teams to successfully create and sell uniquely positioned offerings for B-Raja (video streaming platform), Rawcubes (data management software) and Infosys (consulting) firms. In his professional career, he has overseen all product management activities relating to research, design, feature prioritization, and product marketing. He brings a natural tendency to be curious to ensure the creation of quality products that customers would want to buy.",
    },
    {
      id: 3,
      type: "team",
      name: "Hardev Sahu",
      photo: hardevSahu,
      designation: "Co-Founder",
      details:
        "Career spans 25 years of leadership in both established companies and entrepreneurship. Hardev's valiant and ethical approach to work and life has unprecedented success in a diverse business domain that includes information technology, marble and granite mining, healthcare, e-governance, and hospitality.",
    },
    {
      id: 4,
      type: "team",
      name: "Deepak Sondhi",
      photo: deepakSondhi,
      designation: "Co-Founder",
      details:
        "Scaled $200M+ different business transformation efforts across prominent Fortune 500 companies in the US, Latin America, Europe, India, and the Asia-Pacific region. He brings industry thought leadership and extensive project experience. He has helped several companies formulate and roll out complex projects, including project conceptualizing, roll-out, and scaling.",
    },
    {
      id: 5,
      type: "team",
      name: "Khem Chand",
      photo: khemChand,
      designation: "Chief Technology Officer",
      details:
        "20+ years of strong experience with more than $100M revenue impact in Product Offerings, AI/Machine Learning and data products for fortune 500 companies. A specialist in providing Knowledge Graph based domain centric solution for Manufacturing, Financial Services and Post Market Product performance analysis. Subject Matter Expert in implementation of multi-cloud and cloud native strategy for Data Products.",
    },
    {
      id: 6,
      type: "team",
      name: "Zahid Sheikh",
      photo: zahidSheikh,
      designation: "Director, Sales",
      details: "",
    },
    {
      id: 7,
      type: "team",
      name: "Harshvardhan",
      photo: harshvardhan,
      designation: "Director, Marketing",
      details: "",
    },
    {
      id: 8,
      type: "team",
      name: "Satwik Mishra",
      photo: satwikMishra,
      designation: "Content Strategist",
      details: "",
    },
    {
      id: 9,
      type: "advisors",
      name: "Swati Jain  Advisor",
      photo: swati,
      designation: "Advisor - Product & GTM",
      details:"Swati Jain is a seasoned SAAS and Digital Transformation executive known for innovation and brings invaluable guidance to ConvertML. With a successful track record in Product leadership at companies like Gallup, Cprime, Inxeption, and Bolt Today, Swati's expertise in product thinking, customer journeys, and emerging technologies is unmatched. Her strategic vision has been crucial in establishing product-market fit and go-to-market strategy, empowering us to navigate challenges and seize growth opportunities. As a strategic advisor, Swati is driving our startup towards a bright and prosperous future.",
    },
    {
      id: 10,
      type: "advisors",
      name: "Charles Bachmann",
      photo: charles,
      designation: "Advisor - Sales & Marketing",
      details:"15 years of experience in Sales leadership, software development, and with a global service delivery background, he has extensive thought leadership around growth initiatives and driving business outcomes. Specifically, Charles brings passion and expertise in aiding companies alignment of their strategic vision and unique assets with the power of cloud solutions to achieve operational benefit and enable new revenue streams. His focus on client and partner relationships matched with his drive to push differentiated and measured results will be key for our team and more importantly our ConvertML clients.",
    },
    {
      id: 11,
      type: "advisors",
      name: "Sunny Singh",
      photo: sunnySingh,
      designation: "Advisor Marketing",
      details:
        "Sunny Singh has worn many hats throughout his professional career, from being a technology consultant, serving Fortune 500 clients to holding a director-level position at a multicultural advertising agency. He has extensive experience working with B2B and B2C companies creating marketing campaigns, segmentation, go-to-market, PPC, SEO, lead generation, and much more. Sunny has done his MBA from Duke University.",
    },
    {
      id: 12,
      type: "advisors",
      name: "Rishi Patel",
      photo: rishiPatel,
      designation: "Finance & Investment",
      details:"Rishi Patel, a seasoned Financial Advisor with a Bachelor of Science in Finance, brings over a decade of experience navigating high-growth finance. Specializing in guiding companies through hyper-growth trajectories, Rishi has a track record of success with both late-stage and pre-IPO firms. Certified with Series 7 and Series 63, his commitment to excellence shines in providing top-tier financial guidance. Beyond finance, Rishi is a well-rounded individual, enjoying books, the gym, sports, and quality time with family. With a passion for finance and unwavering dedication, Rishi continues to impact the world of finance, one growth story at a time.",
    },
  ];

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

   

  const nextmemberView = (e) => {
    console.log(e);
    let selectpush = [];
    for (let i = 0; i < teamMemberadvisorsList.length; i++) {
      if (e == teamMemberadvisorsList[i].id) {
        selectpush.push(teamMemberadvisorsList[i]); 
      } 
      setselectTeamMemberpopup(selectpush);
      console.log(teamMemberList);
    } 
  };

  const previousmemberView = (e) => {
    console.log(e);
    let selectpush = [];
    for (let i = 0; i < teamMemberadvisorsList.length; i++) {
      if (e == teamMemberadvisorsList[i].id) {
        selectpush.push(teamMemberadvisorsList[i]); 
      } 
      setselectTeamMemberpopup(selectpush);
      console.log(teamMemberList);
    } 

  };

  

  const updateteamList=()=>{
    let selectteam = [];
    let selectadvisors = [];
    for (let i = 0; i < teamMemberadvisorsList.length; i++) {  
      if (teamMemberadvisorsList[i].type == "team") { 
        selectteam.push(teamMemberadvisorsList[i]);  
      }
       else if (teamMemberadvisorsList[i].type == "advisors") {
        selectadvisors.push(teamMemberadvisorsList[i]); 
      } 
    }
    setteamMemberList(selectteam); 
    setadvisorsList(selectadvisors);  
  }
  
  useEffect(() => {
    console.log(selectTeamMember) 
    updateteamList()}, []);

  return (
    <>
     <Helmet> 
        <title>{LegalMeta.title}  </title>
        <meta name="description" content={LegalMeta.description } data-rh="true" />
        <meta name="og:description" content={LegalMeta.description } data-rh="true" />
        <meta name="keywords"  content={LegalMeta.keywords} data-rh="true" /> 
        <meta property="og:title" content={LegalMeta.title } data-rh="true" />
        <meta property="og:image" content={LegalMeta.image} data-rh="true" />
        <meta property="og:url" content={LegalMeta.url} data-rh="true"/>
        <meta property="og:publisher" content={LegalMeta.publisher} data-rh="true" />
        <meta property="og:author " content={LegalMeta.author} data-rh="true" />
        <meta property="og:site_name" content={LegalMeta.site_name} data-rh="true" />
        <meta property="og:locale" content={LegalMeta.locale} data-rh="true" />
        <meta property="og:type" content={LegalMeta.type} data-rh="true"/>
        <link rel="canonical" href={LegalMeta.canonical} data-rh="true" />
      </Helmet> 
      <Navbar />
      {/* ------------------- banner   ------------------- */}
      <div className="new-banner">
        <section className="container-home text-center">
          {/* <div className="banner-top-heading">Pricing </div> <br /> */}
          <h1 className="d-none"> Legal & Security Overview</h1>
          <div className="heading3 m-0">
          Legal & Security Overview
          </div>
          <p>
          Security is one of our biggest priorities here at ConvertML. On this page we have provided information about the security of your data, our general security practices, and how you can reach a member of the security team if you have questions that haven’t been answered below.

          </p>
          <br />
          <button  onClick={getstartedClick} className="link-btn">
            <i className="fa fa-play-circle"> </i> Get Started  
    </button> 
         <img src={legalSecurity} alt="legal security" className="bannerimg" />  
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
              <h2>The ConvertML platform safeguards customer data using a variety of controls:
</h2>
              <p>
                 
              ConvertML application data is secured in transit using TLS, and encrypted at rest in ConvertML’s proprietary analytics database format. </p><p>

The ConvertML application logically separates user data, and access to your data is protected by strong authentication and authorization controls.
ConvertML audits changes to the application throughout the development lifecycle: architecture reviews are performed as well as stringent automated and manual code review processes. </p><p>

ConvertML monitors application servers, infrastructure, and the ConvertML network environment to detect potential abuse.
ConvertML maintains a native and active SOC 2 type II attestation and is Cloud Star Alliance (CSA) Star Level 1 certified. Both documents are available by writing to grc@ConvertML.com. </p><p>

Additionally, our Cloud Service Provider AWS regularly undergoes independent verification of security, privacy, and compliance controls against the following standards: ISO/IEC 27001, ISO/IEC 27017, SOC 1, SOC 2, SOC 3, PCI DSS, HIPAA, CSA Star, FedRAMP and many others. 

              </p>
              <br />
             <h3> European Union’s General Data Protection Regulation (GDPR)</h3>   <p>
ConvertML is committed to complying with GDPR so that our customer’s and their end user’s rights and obligations are met under GDPR, which took effect on Dec 20, 2023. As explained in our GDPR article, we created many tools and implemented new processes to ensure we can assist our customers with their compliance with GDPR requirements. Our customers can programmatically delete end-user data, or submit deletion or export requests via the privacy portal in their account settings. We also help our customers support data subject rights by providing options for data retention periods. For more information on our tools and processes, see our GDPR page.   </p>

<h3>Privacy overview</h3>
ConvertML & GDPR

<h3>GDPR Compliant Analytics</h3>
Powerful analytics that complies with the GDPR.

<h4>Protecting your data</h4>
<p>ConvertML is a first-party analytics provider. When you use ConvertML, you collect and control the data. All we do is provide powerful tools that help you understand and act on your data. As a first-party analytics provider, ConvertML helps you maintain the confidentiality and security of your data because it remains under your control.</p>

<h4>Meeting GDPR requirements for data subject requests</h4>
<p>
ConvertML has invested in simplifying data subject access requests. Customers have access to a suite of dedicated APIs that allow for quick, accurate, and verifiable deletion and access requests from within the ConvertML application. Visit our Export or Delete End User Data help page for more information on how our deletion and retrieval APIs can help you meet your GDPR compliance obligations.
International data transfers</p>
<p>
ConvertML understands the importance of managing international transfers of personal data. Our Privacy Program executes standard contractual clauses coupled with additional security assurance to ensure that data you share with us receives legal protections equivalent to those found in Europe.</p>

<h4>European data residency</h4>
<p>ConvertML’s European Data Residency Program allows you to process and store personal data you collect entirely within our Netherlands-based data center. Our Data Residency Program gives you all of ConvertML’s power while helping you meet your GDPR compliance goals at no additional cost.
Helping you meet your compliance obligations</p><p>
Looking to meet GDPR compliance obligations? We are here to help. When you use ConvertML to collect or process personal data, we act as a “data processor,” and have an Article 28 compliant contractual addendum governing our data processing. You can view our GDPR Data Processing Addendum here.</p>

<h4>ConvertML is Built for Privacy and Security</h4>
<p>ConvertML’s platform, interface, and systems are designed around privacy and security.
Consent management</p>
<p>ConvertML helps you meet your privacy obligations by not tracking or collecting information from data subjects unless they opt-in to tracking or collection. Our SDKs also make it easy for data subjects to opt-out of being tracked on your website or product at any time. You can read more about these features here.</p>

<h4>Custom data collection</h4>
<p>ConvertML’s flexible implementation features allow you to customize, or limit, the amount and extent of data you collect from data subjects. Our Data help page can provide you with more information on tracking and identity management.</p>

<h4>Strong encryption</h4>
<p> 
ConvertML protects personal information by using platform wide cryptographic controls. All data is secured in transit using TLS, and encrypted at rest in our proprietary analytics database.</p>
<p className="text-right">This document was last updated on 02/20/2024. </p>

            </Grid> 
          </Grid>
        </section>

        
        <br />
      </div>
      <br /> 
      <HomeFooter />

      <Dialog
        className="popUpteamView"
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Our Expert Team
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <div> 
          {selectTeamMember.map((member) => ( 
              <div className="team-memberview" id={member.id}>
              <div className="imgbox">
                        <img src={member.photo} alt="team Member List" />
                      </div>
                      <span className="name">{member.name}</span>
                      <span className="designation">{member.designation}</span>
                      <p>{member.details}</p> 
              </div>  
          ))}
          </div>
          
        </DialogContent>
        <DialogActions>
 
       <div className="popupactionbar">  
       {selectTeamMember[0]?.id == selectTeamMember.length ? <> </>:<>  <button className="previous" onClick={(e)=>previousmemberView(selectTeamMember[0].id-1)}><i class="fa fa-angle-left"></i></button></>} 
          <div className="pointdiv">
          {teamMemberadvisorsList.map((member) => (<span id={member.id} className={selectTeamMember[0]?.id==member.id?'selected':''}></span>))} 
         
           </div> 
           {selectTeamMember[0]?.id  == teamMemberadvisorsList.length  ? <>  </>:<> <button className="next" onClick={(e)=>nextmemberView(selectTeamMember[0].id+1)}><i className="fa fa-angle-right"></i></button> </>} 

          
           </div> 
        </DialogActions>
      </Dialog>
    </>
  );
}

export default LegalPage;
