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

import aboutusbanner from "../../assets/img/aboutusbanner.png";
import HomeFooter from "../../components/home-footer";

import aboutus from "../../assets/img/aboutus.png";
import {
  advisorsListData,
  teamMemberListData,
  teamMemberadvisorsListData,
} from "../../assets/data/data";
import { Helmet } from "react-helmet";
import { AboutUsMeta } from "../../assets/data/metadata-list";
import { AboutUsMetaData } from "../../assets/data/schema-markup";

function AboutUs() {
  const imgpath = "../../assets/img/team/"; 

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
      name: "Swati Jain",
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
  const navigate = useNavigate();
  const getstartedClick = () => navigate('/signup');
  useEffect(() => {
    console.log(selectTeamMember) 
    updateteamList()}, []);

  return (
    <> 
    <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(AboutUsMetaData),
        }}
      /> 
     <Helmet> 
        <title>{AboutUsMeta.title}  </title>
        <meta name="description" content={AboutUsMeta.description } data-react-helmet="true" />
        <meta name="keywords"  content={AboutUsMeta.keywords} />
        <meta property="image" content={AboutUsMeta.image} />
        <meta property="url" content={AboutUsMeta.url} />
        <meta property="publisher" content={AboutUsMeta.publisher} />
        <meta property="author " content={AboutUsMeta.author} />
        <meta property="site_name" content={AboutUsMeta.site_name} />
        <meta property="locale" content={AboutUsMeta.locale} />
        <meta property="type" content={AboutUsMeta.type}/>
        <link rel="canonical" href={AboutUsMeta.canonical} />
      </Helmet>

      <Navbar />
      {/* ------------------- banner   ------------------- */}
      <div className="new-banner">
        <section className="container-home text-center">
          {/* <div className="banner-top-heading">Pricing </div> <br /> */}
          <h1 className="d-none">  Meet The <b>ConvertML Team </b></h1>
          <div className="m-0 heading3">
            Meet The <b>ConvertML Team </b>
          </div>
          <p>
            ConvertML is a predictive customer insights platform specifically
            designed to predict customer behavior for fast growing companies.
          </p>
          <br />
          <button  onClick={getstartedClick} className="link-btn">
            <i className="fa fa-play-circle"> </i> Get Started  
    </button> 
          <img src={aboutus} alt="Churn Analysis" className="bannerimg" />
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
            <Grid item xs={12} md={6} lg={6}>
              <h3>About Us</h3>
              <h2>Data Superheroes: ConvertML's Game-Changing Solution</h2>
              <p>
                We specialize in turning data into superheroes, seamlessly
                merging the worlds of qualitative and quantitative information
                to provide you with predictive insights. Picture enhancing your
                Customer Lifetime Value (CLTV), streamlining revenue
                predictions, instilling investor confidence, and gaining that
                competitive edge – all by tapping into your untapped zero-party
                data reserves.<br/> <br/> We understand the complexity, but worry not!
                ConvertML brings you a robust and cost-effective solution
                tailor-made for nimble teams like yours.
              </p>
             
              <br />
              <a href="#getStarted" className="link-btn">
                Get Started
              </a>
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <img
                src={aboutusbanner}
                alt="aboutusbanner"
                className="bannerimg img-responsive"
              />
            </Grid>
          </Grid>
        </section>

        <section className="am-section">
          <div className="text-center">
            <h2>Our Expert Team</h2>
            <p>
              Meet the people who make predictive insights shine bright! They’re
              a lovely bunch.
            </p>
          </div>
          <br />
          <br />

          
          <Grid
            container
            spacing={2}
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            {teamMemberList.map((member) => (
              <Grid item xs={12} md={3} lg={3}>
                <div
                  className="team-memberview"
                  onClick={(e) => selectmemberView(member)}
                > 
                 <div>
                        <div className="imgbox">
                          <img src={member.photo} alt="Team Member List" />
                        </div>
                        <div className="clearfix"></div>
                        <span className="name">{member.name}</span>
                        <span className="designation">
                          {member.designation}
                        </span>
                      </div>  
                </div> 
              </Grid>
            ))}
          </Grid>
          <div className="text-center">
            <h2>Our Advisors</h2>
          </div>
          <br />
          <br />

          <Grid
            container
            spacing={2}
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            {advisorsList.map((member) => (
              <Grid item xs={12} md={3} lg={3}>
                <div className="team-memberview"  onClick={(e) => selectmemberView(member)}>
                  <div> 
                        <div className="imgbox">
                          <img src={member.photo} alt="team Member List" />
                        </div>
                        <div className="clearfix"></div>
                        <span className="name">{member.name}</span>
                        <span className="designation">
                          {member.designation}
                        </span> 
                  </div>
                </div>
                <br />
                <br />
              </Grid>
            ))}
          </Grid>
        </section>
        <br />
      </div>
      <br />
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

export default AboutUs;
