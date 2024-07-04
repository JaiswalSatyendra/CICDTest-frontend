import React, { useState, useEffect } from "react";
import HeroSection from "../../components/HeroSection";
import NavigationLinkSection from "../../components/NavigationLinkSection";
import ConvertMLMarketingSection from "../../components/ConvertMLMarketingSection";
import ConvertMLretainAndGrow from "../../components/ConvertMLretainAndGrow";
import Footer from "../../components/Footer";
import Navbar from "../../components/molecules/Navbar";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Link } from "react-router-dom";
import {
  Button,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid, TextField,
  IconButton,
  Typography,
  Box,
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
import { faqsList, faqsListdp, faqsListp, faqsListPricing, faqsListResources, faqsListTypeform } from "../../assets/data/fasq";
import { HelpResources } from "../../assets/data/metadata-list";
import { HelpResourcesMetaData } from "../../assets/data/schema-markup";

function FaqsPages() {
  const [scroll, setScroll] = useState(false);
  const [faqListp, setfaqListp] = React.useState([]);
  const [faqListdp, setfaqListdp] = React.useState([]);
  const [faqListPricing, setfaqListPricing] = React.useState([]);
  const [faqListResources, setfaqListResources] = React.useState([]);
  const [faqListTypeform, setfaqListTypeform] = React.useState([]);
  const sections = document.querySelectorAll("section[id]");
  window.addEventListener("scroll", navHighlighter);
  const [isSubmit, setisSubmit] = useState(false);

  const [data, setData] = useState({
    fname: '',
    lname: '',
    email: '',
    company: '',
    contactno: '',
    supporttypes: '',
    helptext: ''
  })


  function submitForm() {
    sendMail(data.fname, data.email, null)
  }
  function handle(e) {
    let newData = { ...data }
    newData[e.target.id] = e.target.value
    setData(newData)
    console.log(newData)

  }

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
      ) {
        document.querySelector(".localPageNav a[href*=" + sectionId + "]").classList.add("active");
      } else {
        document.querySelector(".localPageNav a[href*=" + sectionId + "]").classList.remove("active");
      }
    });
  }


  function sendMail(userName, userEmail, mailtype) {

    fetch(`${process.env.REACT_APP_API_URL}/survey/sendMailSheduleDemo`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ "userName": userName, "userEmail": userEmail, mailType: mailtype })
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res)
        setisSubmit(true);
        setData({
          fname: '',
          lname: '',
          email: '',
          company: '',
          contactno: '',
          supporttypes: '',
          helptext: ''
        })

      })
  }

  useEffect(() => {
    setfaqListp(faqsListp);
    setfaqListdp(faqsListdp);
    setfaqListPricing(faqsListPricing);
    setfaqListResources(faqsListResources);
    setfaqListTypeform(faqsListTypeform);


  }, []);

  return (
    <>
     <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(HelpResourcesMetaData),
        }}
      />
      <Helmet> 
        <title>{HelpResources.title}  </title>
        <meta name="description" content={HelpResources.description } data-react-helmet="true" />
        <meta name="keywords"  content={HelpResources.keywords} />
        <meta property="image" content={HelpResources.image} />
        <meta property="url" content={HelpResources.url} />
        <meta property="publisher" content={HelpResources.publisher} />
        <meta property="author " content={HelpResources.author} />
        <meta property="site_name" content={HelpResources.site_name} />
        <meta property="locale" content={HelpResources.locale} />
        <meta property="type" content={HelpResources.type}/>
        <link rel="canonical" href={HelpResources.canonical} />
      </Helmet>

      <Navbar />
      {/* ------------------- banner   ------------------- */}
      <div className="banner-onlyheading">
      <section className="container-home ">
          {/* <div className="bedcurms">
            <Link to="/">Home</Link>»  
            <b> Help Resources</b>
          </div> */}
          <h1 className="m-0 d-none">
          Help Resources
          </h1>
          <div className="heading3 m-0">
          Help <b>Resources</b>
          </div>
        </section> 
      </div>
      {/* ------------------- banner   ------------------- */}
      <br />
      <div className="container-home faqs">
        <Grid
          container
          spacing={2}
          direction="row"
        // justifyContent="center"
        // alignItems="center"
        >
          <Grid item xs={12} md={4} lg={4}>
            <div className={scroll ? "page-local-nav-fixed" : "page-local-nav"}>
              <ul className="localPageNav">
                <li className="selected"><Link to="../faqs">FAQ</Link></li>
                <li><Link to="../contactus"> Contact Us</Link></li>
                <li><Link to="../support"> Support </Link></li>
              </ul>
            </div>
          </Grid>
          <Grid item xs={12} md={8} lg={8}>
            <h2 className="d-none">Product</h2>
          <div className='heading4'>Product</div>
            {faqListp.map((value) => (
              <>
                <Accordion value={value} key={value._id}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                  >
                    <Typography>{value.title}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>  {value.content} <br />
                      {value?.contentList?.heading}
                      <ul>  {value.contentList != null && value.contentList.lilist.map((item) => (
                        <li>{item}</li>
                      ))
                      } </ul>
                      <br />
                      {value?.contentList?.content} </Typography>
                  </AccordionDetails>
                </Accordion>
              </>
            ))}
            <h2 className="d-none">Data Privacy </h2>
            <div className='heading4'>Data Privacy</div>
            {faqListdp.map((value) => (
              <>
                <Accordion value={value} key={value._id}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                  >
                    <Typography>{value.title}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                      {value.content}
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              </>
            ))}
            <h3 className="d-none">Pricing </h3>
            <div className='heading4'>Pricing</div>
            {faqsListPricing.map((value) => (
              <>
                <Accordion value={value} key={value._id}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                  >
                    <Typography>{value.title}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                      {value.content} <a href={value.link} className='link-text' target={'_blank'}>{value.linktext}</a>
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              </>
            ))}
            <h3 className="d-none">Resources  </h3>
            <div className='heading4'>Resources</div>
            {faqListResources.map((value) => (
              <>
                <Accordion value={value} key={value._id}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                  >
                    <Typography>{value.title}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                      {value.content}   <a href={value.link} className='link-text' target={'_blank'}>{value.linktext}</a>
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              </>
            ))}



<h4 className="d-none">Typeform  FAQ </h4>
<div className='heading4' id="typeformfaqs">Typeform  FAQ </div>
            {faqListTypeform.map((value) => (
              <>
                <Accordion value={value} key={value._id}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                  >
                    <Typography>{value.title}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                      {value.content}
                      <ul>  {value.list != null && value.list.map((item) => (
                        <li>{item}</li>
                      ))
                      } </ul>
                      <a href={value.link} className='btn btn-link' >{value.linktext} </a>
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              </>
            ))}


<h4 className="d-none">Support</h4>
<div className='heading4'>Support   </div>
            <ol>
              <li>Is there a user guide I can refer to?
              </li>
              <li>Where do I reach out if I have queries?
              </li>
            </ol>
            {
              isSubmit ? (
                <Box className="emailsuccessfulsubmit"> 
                  <p>Thank you for reaching out to ConvertML Support! Your inquiry is important to us. Our team will review your message and get back to you within 24 hours. In the meantime, feel free to check the <Link to={'/help-guide/convertML-user-guide'}><b>ConvertML Guide</b></Link> for immediate assistance. We appreciate your patience and look forward to resolving your issue.
                  </p>
                </Box>
              ) : (
                <>
                  <form autoComplete="off" noValidate className="supportPages">
                    <Grid
                      container
                      spacing={2}
                      direction="row"
                    // justifyContent="center"
                    // alignItems="center"
                    >
                      <Grid item xs={12} md={6} lg={6}>
                        <TextField
                          required
                          autoComplete="new-password"
                          className="inputBox"
                          id="fname"
                          autoFocus
                          label="First Name"
                          type="text"
                          placeholder="First name"
                          value={data.fname}
                          onChange={(e) => handle(e)}
                        />
                        {/* {
                     data.fname=="" && 
                  <div className="mt-1 text-xs font-medium text-validation">  Enter First Name </div>
                  } */}
                      </Grid>
                      <Grid item xs={12} md={6} lg={6}>
                        <TextField
                          required
                          autoComplete="new-password"
                          className="inputBox"
                          id="lname"
                          autoFocus
                          label="Last name"
                          type="text"
                          placeholder="Last name"
                          value={data.lname}
                          onChange={(e) => handle(e)}
                        />
                        {/* {
                     data.lname=="" && 
                  <div className="mt-1 text-xs font-medium text-validation">   Enter Last Name  </div>
                  } */}
                      </Grid>
                      <Grid item xs={12} md={6} lg={6}>
                        <TextField
                          required
                          autoComplete="new-password"
                          className="inputBox"
                          id="email"
                          autoFocus
                          label="Enter your email"
                          type="text"
                          placeholder="Enter your email"
                          value={data.email}
                          onChange={(e) => handle(e)}
                        />
                        {/* {
                     data.company=="" && 
                  <div className="mt-1 text-xs font-medium text-validation">  Enter Last Email </div>
                  } */}
                      </Grid>
                      <Grid item xs={12} md={6} lg={6}>
                        <TextField
                          required
                          autoComplete="new-password"
                          className="inputBox"
                          id="company"
                          autoFocus
                          label="Company Name"
                          type="text"
                          placeholder="Company Name"
                          value={data.company}
                          onChange={(e) => handle(e)}
                        />
                        {/* {
                    data.company=="" && 
                  <div className="mt-1 text-xs font-medium text-validation">  Enter Company Name </div>
                  } */}
                      </Grid>
                      <Grid item xs={12} md={6} lg={6}>
                        <TextField
                          required
                          autoComplete="new-password"
                          className="inputBox"
                          id="contactno"
                          autoFocus
                          label="Contact Number"
                          type="text"
                          placeholder="Contact Number"
                          value={data.contactno}
                          onChange={(e) => handle(e)}
                        />
                        {/* {
                    
                    data.contactno=="" && 
                  <div className="mt-1 text-xs font-medium text-validation"> Enter Contact NUmber  </div>
                  } */}
                      </Grid>
                      <Grid item xs={12} md={6} lg={6}>
                        <TextField
                          required
                          autoComplete="new-password"
                          className="inputBox"
                          autoFocus
                          label="Support Types"
                          type="text"
                          placeholder="Support Type"
                          id="supporttypes"
                          value={data.supporttypes}
                          onChange={(e) => handle(e)}
                        />
                        {/* {
                    data.supporttypes == "" &&
                    <div className="mt-1 text-xs font-medium text-validation">   Enter Support Types </div>
                  } */}
                      </Grid>
                      <Grid item xs={12} md={12} lg={12}>
                        <TextField
                          multiline
                          required
                          autoComplete="new-password"
                          className="inputBox"
                          autoFocus
                          label="How can we help you?"
                          type="text"
                          placeholder="How can we help you?"
                          id="helptext"
                          value={data.helptext}
                          onChange={(e) => handle(e)}
                        />
                        {/* {
                    data.helptext == "" &&
                    <div className="mt-1 text-xs font-medium text-validation">  Enter Message </div>
                  } */}
                      </Grid>
                      <Grid item xs={12} md={4} lg={4}>

                        <Button variant="contained" className=" d-block w-full" disabled={data.fname != "" && data.lname != "" && data.email != "" && data.company != "" && data.contactno != "" && data.supporttypes != "" && data.helptext != "" ? false : true} onClick={(e) => { submitForm() }} size="large">Submit</Button>


                      </Grid>
                    </Grid>

                  </form></>
              )
            }


          </Grid >
        </Grid >
      </div >
      <br />
      <HomeFooter />
    </>
  );
}

export default FaqsPages;
