import React, { useEffect, useState } from "react";
import Navbar from "../../../components/molecules/Navbar";
import typeformIntegrationBanner from "../../../assets/img/customer-success.png";
import { Link } from "react-router-dom";
import HomeFooter from "../../../components/home-footer";
import { Helmet } from "react-helmet"; 
import { Grid } from "@mui/material";
import { TypeformIntegration } from "../../../assets/data/metadata-list";
import { TypeformIntegrationMetaData } from "../../../assets/data/schema-markup";

function TypeformIntegrationPage() {
    const [scroll, setScroll] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      setScroll(window.scrollY > 175);
    });
  }, []);
   


const sections = document.querySelectorAll("section[id]");
window.addEventListener("scroll", navHighlighter);

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

  return (
    <>
    <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(TypeformIntegrationMetaData),
        }}
      />
      <Helmet> 
        <title>{TypeformIntegration.title}  </title>
        <meta name="description" content={TypeformIntegration.description } data-react-helmet="true" />
        <meta name="keywords"  content={TypeformIntegration.keywords} />
        <meta property="image" content={TypeformIntegration.image} />
        <meta property="url" content={TypeformIntegration.url} />
        <meta property="publisher" content={TypeformIntegration.publisher} />
        <meta property="author " content={TypeformIntegration.author} />
        <meta property="site_name" content={TypeformIntegration.site_name} />
        <meta property="locale" content={TypeformIntegration.locale} />
        <meta property="type" content={TypeformIntegration.type}/>
        <link rel="canonical" href={TypeformIntegration.canonical} />
      </Helmet>
      <Navbar />
      {/* ------------------- banner   ------------------- */}
      <div className="banner-onlyheading">
        <section className="container-home ">
          {/* <div className="bedcurms">
            <Link to="/">Home</Link>»  
            <b>Help Guide for Typeform Integration with ConvertML</b>
          </div> */}
          <h1 className="m-0 d-none">
            Help Guide for <b>Typeform Integration </b>with ConvertML
          </h1>
          <div className="heading3 m-0">
            Help Guide for <b>Typeform Integration </b>with ConvertML
          </div>
        </section>
      </div>
      {/* ------------------- banner   ------------------- */}
      

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
            <h3>Table of contents</h3>
            <ul className="localPageNav">
              <li><a href="#signuponConvertML">Sign up on ConvertML</a></li>
              <li><a href="#createproject"> Create your first project</a></li>
              <li><a href="#connecttoTypeform"> Connect to Typeform</a></li>
              <li><a href="#chooseTypeform">Choose Typeform workspace and specific form for analysis</a></li>
              <li>
              <a href="#previewintegration">Preview form, view answers, and complete Typeform data
                integration</a>
              </li>
              <li> <a href="#selectanalysis"> Select the analysis you want to run View your results</a></li>
              <li> <a href="../faqs/#typeformfaqs"> Typeform FAQ</a></li>
            </ul>
            </div>
          </Grid>
          <Grid item xs={12} md={8} lg={8}>
            <p>
              <h3>You will learn</h3>
              Learn how to integrate with Typeform, a tool that allows users to
              create engaging and conversational online forms, surveys, quizzes,
              landing pages, and more.
            </p>
            <p>
              From Typeform, ConvertML pulls in:
              <ul>
                <li>When someone filled out a form</li>
                <li>The name & ID of the form the user filled out</li>
                <li>Data collected from form fields</li>
              </ul>
            </p> 
            <section id='signuponConvertML'>
            <p>
              <h3>Before you begin</h3>
              In order to sync subscribers into ConvertML, your Typeform forms
              must include a single email input field. If your Typeform form
              lacks an email field, ConvertML won’t be able to sync your
              Typeform subscribers. The email field here acts as a unique
              identifier for each customer that you have surveyed.
            </p> 
            <h2 className="d-none">Sign Up on ConvertML</h2>
            <div className="heading3">Sign Up on ConvertML </div>
            <div className="product-screen-placeholder">
 <img
              src={"/json-media/img/helps/signup.png"}
              alt="signup"
              className="img-responsive"
            /> 
            </div>
           
            </section>
            <section id='createproject'> 
            <h2 className="d-none">Create your first project</h2>
            <div className="heading3">Create your first project</div>
            
            <div className="product-screen-placeholder"><img
              src={"/json-media/img/helps/createproject.png"}
              alt="signup"
              className="img-responsive"
            /></div> 
            </section>
            <section id='connecttoTypeform'>  
            <h2 className="d-none">Connect to Typeform</h2>
            <div className="heading3">Connect to Typeform</div>
            <p>We connect to typeform using OAuth. </p>
            <div className="product-screen-placeholder"><img
              src={"/json-media/img/helps/connecttypeform.png"}
              alt="signup"
              className="img-responsive"
            /></div>
            
            </section> 
            <section id="chooseTypeform">
            <h3 >
              Choose Typeform workspace and the specific form for analysis
            </h3>
            <p>
              1. Typeform workspaces are areas that you use for managing forms
              specific to each project or team. Select the workspace you want to
              work with.
            </p>
            <div className="product-screen-placeholder"> <img
              src={"/json-media/img/helps/chooseTypeform.png"}
              alt="signup"
              className="img-responsive"
            /></div>
            </section>
            <p>
              2. Each workspace has all the forms related to a specific topic or
              team. You can select one or more forms you want to analyze.
            </p>
            <div className="product-screen-placeholder">  <img
              src={"/json-media/img/helps/eachworkspace.png"}
              alt="signup"
              className="img-responsive"
            /></div>
            <section id='previewintegration'> 
            <h3>Preview form and complete your Typeform data integration</h3> 
            <ol>
              <li>
                Once you’ve selected one or more forms from the workspace, you
                can view the questions in each form and its metadata.
              </li>
              <li>
                You can choose to unselect questions you may not require for
                analysis.
              </li>
              <li>After this, click on proceed.</li>
            </ol>
            <div className="product-screen-placeholder">   <img
              src={"/json-media/img/helps/typeformdataintegration.png"}
              alt="typeformdataintegration"
              className="img-responsive"
            /></div>
            </section>
            <section id='selectanalysis'>  
            <h3>Select the analysis you want to run</h3>
            <ol>
              <li>
                Based on your requirement, you can choose between different
                options for analysis. ConvertML provides a wide range of
                options, ranging from CSAT, NPS, Brand Loyalty, Customer
                Segmentation to predictive modeling capabilities such as Churn
                Prediction and Cross-sell/Up-sell Strategizing. Note that you
                can choose one analysis at a time.{" "}
              </li>
              <li>
                After you’ve selected the type of analysis, ConvertML uses an
                LLM to smartly map your question to a category and assign it
                with a weightage. Note that the weights are editable. ConvertML
                uses these weights to determine the importance of each question
                in the form. You may choose to add a custom category and
                weightage for a question based on your business use-case.
              </li>
            </ol>
            <div className="product-screen-placeholder">   <img
              src={"/json-media/img/helps/analysisyou1.png"}
              alt="typeformdataintegration"
              className="img-responsive"
            /></div>
            {/* <br /> */}
            {/* <img
              src={"/json-media/img/helps/analysisyou2.png"}
              alt="typeformdataintegration"
              className="img-responsive"
            /> */}
            <h3>View your results </h3>
            <p>
              Voilà! And your dashboard is ready. All of this in seconds!
            </p>{" "}
            <div className="product-screen-placeholder">  <img
              src={"/json-media/img/helps/yourresults.png"}
              alt="typeformdataintegration"
              className="img-responsive"
            /></div>
            <p>The dashboard is interactive and dynamic, allowing you to:</p>
            <ul>
              <li>
                Choose filters such as single-select and multiselect drop-downs,
                time period, and more to get both micro-and-macro-level
                analysis.
              </li>
              <li>
                Get a 360-degree view of your customers across different
                demographics, sentiment type, revenue, and other segmentable
                variables.{" "}
              </li>
              <li>
                Get a unified view of your customer base based on the filters
                you select, helping you get detailed insights both at a
                high-level and at the granular/customer-level.{" "}
              </li>
            </ul>
            <b>
              ConvertML considers both quantitative and qualitative data, along
              with custom AutoML models, to:
            </b>
            <ul>
              <li>
                Segment customers into different clusters based on their
                behavior and sentiment.{" "}
              </li>
              <li>
                Predict the likelihood of a customer to churn and the factors
                that influence their decision.{" "}
              </li>
              <li>
                Run regression models to identify hidden patterns or
                relationships in your data to help you make better decisions!
              </li>
            </ul></section><br/><br/><br/>
          </Grid>
        </Grid>
      </div>

      <HomeFooter />
    </>
  );
}

export default TypeformIntegrationPage;
