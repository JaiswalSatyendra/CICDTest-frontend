import React, { useState, useEffect } from "react";
import HeroSection from "../../components/HeroSection";
import NavigationLinkSection from "../../components/NavigationLinkSection";
import ConvertMLMarketingSection from "../../components/ConvertMLMarketingSection";
import ConvertMLretainAndGrow from "../../components/ConvertMLretainAndGrow";
import Footer from "../../components/Footer";
import Navbar from "../../components/molecules/Navbar";
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

import aboutusbanner from "../../assets/img/aboutusbanner.png";
import HomeFooter from "../../components/home-footer";

import contactUsBanner from "../../assets/img/aboutus.png";
import {
  advisorsListData,
  teamMemberListData,
  teamMemberadvisorsListData,
} from "../../assets/data/data";
import { Helmet } from "react-helmet";
import { contactUsMeta } from "../../assets/data/metadata-list";

function ContactUs() {
  const imgpath = "../../assets/img/team/";

  // const advisorsList = [
  //   // {
  //   //   name: "Swati Jain  Advisor",
  //   //   photo: swati,
  //   //   designation: "Advisor - Product & GTM",
  //   //   details:"Swati Jain is a seasoned SAAS and Digital Transformation executive known for innovation and brings invaluable guidance to ConvertML. With a successful track record in Product leadership at companies like Gallup, Cprime, Inxeption, and Bolt Today, Swati's expertise in product thinking, customer journeys, and emerging technologies is unmatched. Her strategic vision has been crucial in establishing product-market fit and go-to-market strategy, empowering us to navigate challenges and seize growth opportunities. As a strategic advisor, Swati is driving our startup towards a bright and prosperous future.",
  //   // },
  //   // {
  //   //   name: "Charles Bachmann",
  //   //   photo: charles,
  //   //   designation: "Advisor - Sales & Marketing",
  //   //   details:"15 years of experience in Sales leadership, software development, and with a global service delivery background, he has extensive thought leadership around growth initiatives and driving business outcomes. Specifically, Charles brings passion and expertise in aiding companies alignment of their strategic vision and unique assets with the power of cloud solutions to achieve operational benefit and enable new revenue streams. His focus on client and partner relationships matched with his drive to push differentiated and measured results will be key for our team and more importantly our ConvertML clients.",
  //   // },
  //   // {
  //   //   name: "Sunny Singh",
  //   //   photo: sunnySingh,
  //   //   designation: "Advisor Marketing",
  //   //   details:"Sunny Singh has worn many hats throughout his professional career, from being a technology consultant, serving Fortune 500 clients to holding a director-level position at a multicultural advertising agency. He has extensive experience working with B2B and B2C companies creating marketing campaigns, segmentation, go-to-market, PPC, SEO, lead generation, and much more. Sunny has done his MBA from Duke University.",
  //   // },
  //   // {
  //   //   name: "Rishi Patel",
  //   //   photo: rishiPatel,
  //   //   designation: "Finance & Investment",
  //   //   details:"Rishi Patel, a seasoned Financial Advisor with a Bachelor of Science in Finance, brings over a decade of experience navigating high-growth finance. Specializing in guiding companies through hyper-growth trajectories, Rishi has a track record of success with both late-stage and pre-IPO firms. Certified with Series 7 and Series 63, his commitment to excellence shines in providing top-tier financial guidance. Beyond finance, Rishi is a well-rounded individual, enjoying books, the gym, sports, and quality time with family. With a passion for finance and unwavering dedication, Rishi continues to impact the world of finance, one growth story at a time.",
  //   // },
  // ];

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

  const [scroll, setScroll] = useState(false);
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

  const sections = document.querySelectorAll("section[id]");
  window.addEventListener("scroll", navHighlighter);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      setScroll(window.scrollY > 175);
    });
  }, []);

  function navHighlighter() {  
    let scrollY = window.pageYOffset;  
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 50;
      const sectionId = current.getAttribute("id");      
      if (
        scrollY > sectionTop &&
        scrollY <= sectionTop + sectionHeight
      ){
        document.querySelector(".localPageNav a[href*=" + sectionId + "]").classList.add("active");
      } else {
        document.querySelector(".localPageNav a[href*=" + sectionId + "]").classList.remove("active");
      }
    });
  }

  const selectmemberView = (selectM) => {
    setOpen(true);
    console.log(selectM);
    let selectpush = [];
    for (let i = 0; i < teamMemberadvisorsList.length; i++) {
      if (selectM.id == teamMemberadvisorsList[i].id) {
        selectpush.push(teamMemberadvisorsList[i]); 
      } 
      setselectTeamMemberpopup(selectpush);
      console.log(teamMemberList);
    }
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
        <title>{contactUsMeta.title}  </title>
        <meta name="description" content={contactUsMeta.description }   />
        <meta name="keywords"  content={contactUsMeta.keywords} />
        <meta property="image" content={contactUsMeta.image} />
        <meta property="url" content={contactUsMeta.url} />
        <meta property="publisher" content={contactUsMeta.publisher} />
        <meta property="author " content={contactUsMeta.author} />
        <meta property="site_name" content={contactUsMeta.site_name} />
        <meta property="locale" content={contactUsMeta.locale} />
        <meta property="type" content={contactUsMeta.type}/>
        <link rel="canonical" href={contactUsMeta.canonical} />
      </Helmet>  

      <Navbar />
        {/* ------------------- banner   ------------------- */}
        <div className="banner-onlyheading">
        <section className="container-home ">
          <div className="bedcurms"> GET IN TOUCH </div>
          <h3 className="m-0">
          Need Any Help For <b>Business & Consulting</b> 
          </h3>
        </section>
      </div>
      {/* ------------------- banner   ------------------- */}
      <br />
      <div className="container-home">  
        <Grid
          container
          spacing={2}
          direction="row"
          // justifyContent="center"
          // alignItems="center"
        >
          <Grid item xs={12} md={4} lg={4}>
            <div className={scroll ? "page-local-nav-fixed" : "page-local-nav"}> 
            <h3>Help Resources</h3>
            <ul className="localPageNav">
              <li><Link to="../faqs">FAQ</Link></li>
              <li className="selected"><Link to="../contactus"> Contact Us</Link></li>
              <li><Link to="../support"> Support </Link></li> 
            </ul>
            </div>
          </Grid>
          <Grid item xs={12} md={8} lg={8}>  
          <div className="ml-3">
          <h3>Just send us your questions or concerns by starting a new case and we will give you the help you need.</h3> 
         <h3> <i className="fa fa-phone"></i> <a href="tel:+17084154811">+1 7084154811</a></h3>
         <h3><i className="fa fa-envelope"></i> <a href="mailto:support@convertml.ai">support@convertml.ai</a></h3>
<h4><i className="fa fa-map-marker"></i>  One Pierce Place Suite 455E, Itasca, IL 60143 USA.</h4>

<iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d11862.308481818976!2d-88.016777!3d41.9878883!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x880fae0396d147a7%3A0xbe6e44eedd66da55!2sOne%20Pierce%20Place!5e0!3m2!1sen!2sin!4v1704191509680!5m2!1sen!2sin" width="100%" height="450" style={{border:0}} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
          </div>
          
          
          </Grid>
            </Grid>  
      </div>
      <br />
      <HomeFooter />

      
    </>
  );
}

export default ContactUs;
