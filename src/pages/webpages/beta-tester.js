import React, { useContext, useEffect, useState }from "react"; 
import HeroSection from "../../components/HeroSection";
import NavigationLinkSection from "../../components/NavigationLinkSection";
import ConvertMLMarketingSection from "../../components/ConvertMLMarketingSection";
import ConvertMLretainAndGrow from "../../components/ConvertMLretainAndGrow";
import Footer from "../../components/Footer";
import Navbar from "../../components/molecules/Navbar";
import customerSuccessBanner from "../../assets/img/beta-tester-banner.png";
import { Link, useNavigate } from "react-router-dom";
import { Grid,Dialog,IconButton,
  DialogTitle,TextField,Button,
  DialogContent, } from "@mui/material";
  
import CloseIcon from "@mui/icons-material/Close";
import { Container } from "postcss";


import salesforce from "../../assets/icons/salesforce.png";
import hubsport from "../../assets/icons/hubsport.png";
import zendesk from "../../assets/icons/zendesk.png";
import marketo from "../../assets/icons/marketo.png";
import freshdesk from "../../assets/icons/freshdesk.png";
import stripe from "../../assets/icons/stripe.png";
import recurly from "../../assets/icons/recurly.png";
import mixpanel from "../../assets/icons/mixpanel.png";
import hootsuite from "../../assets/icons/hootsuite.png";
import typeform from "../../assets/icons/typeform.png";
import googleForms from "../../assets/icons/googleForms.png";
import surveymonkey from "../../assets/icons/surveymonkey.png";

import productDevelopment from "../../assets/img/solutions/churnproductdevelopment.png"; 
import marketing from "../../assets/img/solutions/churnmarketing.png";
import HomeFooter from "../../components/home-footer";
import { Helmet } from "react-helmet";
import { 
  insightsActionDatamar,
  mainHeading,
  midContentDatamar, midContentbetaTester
} from "../../assets/data/roles";
import { SessionContext } from "../../contexts/SessionContext";
import { betaTester } from "../../assets/data/metadata-list";

function BetaTesterPage() {
  useEffect(() => {}, []);
  const navigate = useNavigate();
  const getstartedClick = () => navigate('/signup');

  const [session, ,] = useContext(SessionContext);
  const { user } = session;
  
  const [emailpopupopen, setemailpopupopen] = React.useState(false);
  const [dataSourceMailObj, setdataSourceMailObj] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phoneNo:"",
    isSubmit: false
  });
  const changeDataSourceMailObj = (key, val) => {
    let tmpObj = { ...dataSourceMailObj };
    tmpObj[key] = val;
    setdataSourceMailObj(tmpObj);
  }
  const sendDataSourceMail = () => {
    let tmpObj = { ...dataSourceMailObj };
    tmpObj["isSubmit"] = true;
    setdataSourceMailObj(tmpObj);
    console.log(dataSourceMailObj);
    fetch(`${process.env.REACT_APP_API_URL}/survey/sendMailToPowseUser`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(dataSourceMailObj)
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res)
      })
  }
  const emailpopupClose = () => { 
    setemailpopupopen(false);
  };
  const emailpopupOpen = (dataSourceName) => {
    let newObj = {
      first_name: user==undefined?"":user.username,
      last_name: "",
      email: user==undefined?"":user.company_email,
      phoneNo:user==undefined?"":user.phone_number,
      isSubmit: false
    }
    setdataSourceMailObj(newObj);
    setemailpopupopen(true);
  };
  return (
    <>
        <Helmet> 
        <title>{betaTester.title}  </title>
        <meta name="description" content={betaTester.description }   />
        <meta name="keywords"  content={betaTester.keywords} />
        <meta property="image" content={betaTester.image} />
        <meta property="url" content={betaTester.url} />
        <meta property="publisher" content={betaTester.publisher} />
        <meta property="author " content={betaTester.author} />
        <meta property="site_name" content={betaTester.site_name} />
        <meta property="locale" content={betaTester.locale} />
        <meta property="type" content={betaTester.type}/>
        <link rel="canonical" href={betaTester.canonical} />
      </Helmet>  
      <Navbar />
      {/* ------------------- banner   ------------------- */}
      <div className="new-banner">
        <section className="container-home beta-test-banner" > 
        <Grid
                container
                spacing={1}
                direction="row"
                justifyContent="center"
                alignItems="center"
              >  
              <Grid item xs={12} md={6} lg={6}> 
              <h1 className="d-none"> Power User Program</h1>
              <h2 className="d-none"> Unlock Exclusive Benefits! Limited Spots Available</h2>

              <h3 className="m-0">
          Unlock Exclusive Benefits! Limited Spots Available for Power User Program
          </h3>
          <p>
          Shape the Next Wave of Customer Insights with ConvertML! Secure Your Spot for Exclusive Early Access to Revolutionary Insights and Predictive Analytics. Limited Availability, Act Now! 
          </p>
          <br />
          <button  onClick={(e)=>emailpopupOpen(e)} className="link-btn">
            <i className="fa fa-play-circle"> </i> Join Now! 
    </button> 
          <br />
              </Grid>
              <Grid item xs={12} md={6} lg={6}> 
              <img src={customerSuccessBanner} alt="churn Analysis" className="bannerimg" /> 
              </Grid>
              </Grid>
         
         
        </section>
      </div>
      {/* ------------------- banner   ------------------- */} 
      <section>
        <div className="container-home">
          
        <h2 className="text-center fw-600">Benefits</h2>
        <section className="benefits"> 
               <Grid
                container
                spacing={8}
                direction="row"
                justifyContent="center"
                alignItems="center"
              >  
              <Grid item xs={12} md={4} lg={4}> 
<div className="exclusive">
<svg xmlns="http://www.w3.org/2000/svg" width="119" height="119" viewBox="0 0 119 119" fill="none">
  <g clip-path="url(#clip0_20_83)">
    <path d="M59.5 119C92.3609 119 119 92.3609 119 59.5C119 26.6391 92.3609 0 59.5 0C26.6391 0 0 26.6391 0 59.5C0 92.3609 26.6391 119 59.5 119Z" fill="#121212"/>
    <path d="M119 59.5C119 59.9044 118.995 60.3112 118.988 60.7132C118.342 28.4136 91.9554 2.42648 59.5 2.42648C27.0446 2.42648 0.657754 28.4136 0.0116211 60.7132C0.00464844 60.3112 0 59.9044 0 59.5C0 26.6379 26.6379 0 59.5 0C92.3621 0 119 26.6379 119 59.5ZM106.282 62.7539C106.282 88.5923 85.3383 109.536 59.5 109.536C33.6617 109.536 12.7158 88.5923 12.7158 62.7539C12.7158 62.3518 12.7204 61.9474 12.7297 61.5476C13.3782 86.8212 34.0707 107.107 59.5 107.107C84.9293 107.107 105.619 86.8212 106.268 61.5476C106.277 61.9474 106.282 62.3518 106.282 62.7539Z" fill="#121212"/>
    <path d="M59.4999 107.107C85.3368 107.107 106.282 86.162 106.282 60.3251C106.282 34.4882 85.3368 13.5432 59.4999 13.5432C33.663 13.5432 12.718 34.4882 12.718 60.3251C12.718 86.162 33.663 107.107 59.4999 107.107Z" fill="#242424"/>
    <path d="M106.282 60.3251C106.282 61.1502 106.259 61.973 106.217 62.7864C104.936 38.0963 84.5086 18.4659 59.4977 18.4659C34.4868 18.4659 14.0615 38.0963 12.7809 62.7864C12.7391 61.9706 12.7158 61.1502 12.7158 60.3251C12.7158 34.4891 33.6617 13.5432 59.4977 13.5432C85.3337 13.5432 106.28 34.4891 106.28 60.3251H106.282Z" fill="#4A4A4A"/>
    <path d="M71.5231 61.0445C69.8218 60.0613 67.7672 59.1293 65.3663 58.2438V46.7552C65.4197 46.7993 65.4778 46.8388 65.529 46.8853C66.8212 48.0474 67.4674 49.6837 67.4674 51.7941H79.9182C79.9182 48.6401 79.1001 45.8348 77.4638 43.3804C75.8276 40.926 73.5336 39.0341 70.5795 37.707C68.9572 36.9772 67.2187 36.4496 65.3663 36.1219V29.5397H60.9944V35.7198C60.8526 35.7198 60.7085 35.7151 60.5667 35.7151C60.1112 35.7151 59.6626 35.7244 59.2187 35.7407V29.5374H54.8468V36.2241C53.2292 36.5286 51.6975 36.9679 50.2495 37.5466C47.1909 38.7692 44.8248 40.4751 43.1514 42.6692C41.4803 44.8633 40.6435 47.3943 40.6435 50.2647C40.6435 56.0288 43.9997 60.5587 50.7121 63.8544C51.8951 64.4401 53.2733 65.0351 54.8468 65.6441V78.3483C54.4401 78.1205 54.0729 77.8625 53.7545 77.5697C52.3204 76.2542 51.6022 74.2088 51.6022 71.4337H39.0793C39.0793 74.848 39.9393 77.8672 41.6592 80.4866C43.3792 83.1083 45.9404 85.1699 49.3431 86.6759C51.0746 87.4429 52.9084 88.0124 54.8468 88.3889V95.1105H59.2187V88.9002C59.7207 88.9235 60.2297 88.9351 60.7457 88.9351C60.8294 88.9351 60.9131 88.9328 60.9967 88.9328V95.1129H65.3686V88.6399C69.178 88.1239 72.3226 86.9339 74.7979 85.0606C78.2122 82.4761 79.9205 78.9177 79.9205 74.3878C79.9205 68.719 77.1222 64.2728 71.5254 61.0468L71.5231 61.0445ZM60.2809 45.1422C60.5249 45.1422 60.762 45.1515 60.9944 45.1654V56.7516C60.3599 56.5285 59.7672 56.3054 59.2164 56.0823V45.1863C59.5604 45.1584 59.9113 45.1398 60.2809 45.1398V45.1422ZM53.0595 50.3717C53.0595 48.9167 53.6568 47.7058 54.8445 46.7412V53.7023C53.6545 52.6959 53.0595 51.5872 53.0595 50.3717ZM60.7434 79.5429C60.2088 79.5429 59.7021 79.522 59.2164 79.4871V67.2036C59.8486 67.4221 60.4412 67.6406 60.9944 67.8568V79.5359C60.9107 79.5359 60.8294 79.5429 60.7434 79.5429ZM65.6359 78.2088C65.5499 78.2716 65.4569 78.3297 65.3663 78.3878V70.0903C65.4081 70.1229 65.4523 70.1554 65.4941 70.1856C66.7864 71.2059 67.4325 72.6284 67.4325 74.4552C67.4325 76.0682 66.8328 77.3186 65.6359 78.2088Z" fill="#FD90FF"/>
  </g>
  <defs>
    <clipPath id="clip0_20_83">
      <rect width="119" height="119" fill="white"/>
    </clipPath>
  </defs>
</svg>
    <h4>Unlock Exclusive Benefits</h4>
    <p>Gain Exclusive Access to Advanced Customer Insights and Analytics Models. Enjoy priority access to our latest features!
</p>
    </div>
              </Grid>
              <Grid item xs={12} md={4} lg={4}> 
              <div className="prioritySupport">
              <svg width="119" height="119" viewBox="0 0 119 119" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M59.5 119C92.3609 119 119 92.3609 119 59.5C119 26.6391 92.3609 0 59.5 0C26.6391 0 0 26.6391 0 59.5C0 92.3609 26.6391 119 59.5 119Z" fill="#121212"/>
<path d="M119 59.5C119 59.9044 118.995 60.3112 118.988 60.7132C118.342 28.4136 91.9554 2.42648 59.5 2.42648C27.0446 2.42648 0.657754 28.4136 0.0116211 60.7132C0.00464844 60.3112 0 59.9044 0 59.5C0 26.6379 26.6379 0 59.5 0C92.3621 0 119 26.6379 119 59.5ZM106.282 62.7539C106.282 88.5923 85.3383 109.536 59.5 109.536C33.6617 109.536 12.7158 88.5923 12.7158 62.7539C12.7158 62.3518 12.7204 61.9474 12.7297 61.5476C13.3782 86.8212 34.0707 107.107 59.5 107.107C84.9293 107.107 105.619 86.8212 106.268 61.5476C106.277 61.9474 106.282 62.3518 106.282 62.7539Z" fill="#121212"/>
<path d="M59.4999 107.107C85.3368 107.107 106.282 86.162 106.282 60.3251C106.282 34.4882 85.3368 13.5432 59.4999 13.5432C33.663 13.5432 12.718 34.4882 12.718 60.3251C12.718 86.162 33.663 107.107 59.4999 107.107Z" fill="#242424"/>
<path d="M106.282 60.3251C106.282 61.1502 106.259 61.973 106.217 62.7864C104.936 38.0963 84.5086 18.4659 59.4977 18.4659C34.4868 18.4659 14.0615 38.0963 12.7809 62.7864C12.7391 61.9706 12.7158 61.1502 12.7158 60.3251C12.7158 34.4891 33.6617 13.5432 59.4977 13.5432C85.3337 13.5432 106.28 34.4891 106.28 60.3251H106.282Z" fill="#4A4A4A"/>
<g clip-path="url(#clip0_0_1)">
<path d="M81.8978 38.102C75.1269 31.2993 64.0842 31.2993 57.3132 38.102C52.6619 42.7216 51.0482 49.5561 53.0732 55.7575C45.9226 62.8767 40.5939 68.2055 33.4747 75.3563C33.1582 75.6409 33 76.0523 33 76.4636V85.418C33 85.8609 33.1582 86.2404 33.4747 86.5253C33.7594 86.8417 34.1391 87 34.582 87H43.5364C43.9478 87 44.3591 86.8417 44.6438 86.5253C45.4664 85.7343 46.0676 85.1015 46.8903 84.3105C47.2384 83.9624 47.3965 83.4878 47.3333 83.0133C47.2383 82.1273 47.1435 81.4629 47.0484 80.6086C48.2508 80.4822 49.1683 80.3871 50.4023 80.2923C51.1617 80.1973 51.7311 79.6278 51.8262 78.8685C51.921 77.6661 52.016 76.7169 52.1425 75.5146C52.9969 75.641 53.6613 75.7044 54.5472 75.7992C55.4332 75.9259 56.2874 75.1981 56.2874 74.2489V71.2852H59.1984C59.6098 71.2852 60.0209 71.1797 60.3058 70.8632C61.7613 69.4078 62.7869 68.4138 64.2425 66.9268C70.4439 68.9517 77.2784 67.3381 81.8978 62.6868C88.7007 55.9156 88.7007 44.8732 81.8978 38.102ZM77.4366 49.2712C75.6014 51.1381 72.5639 51.1381 70.7288 49.2712C68.8619 47.436 68.8619 44.3987 70.7288 42.5634C72.5639 40.6965 75.6014 40.6965 77.4366 42.5634C79.3033 44.3987 79.3033 47.4361 77.4366 49.2712Z" fill="#BD89FF"/>
<path d="M81.8977 62.6868C77.2783 67.3381 70.4438 68.9516 64.2424 66.9268C62.7868 68.4138 61.7612 69.4079 60.3056 70.8632C60.0209 71.1797 59.6098 71.2852 59.1984 71.2852H56.2874V74.2487C56.2874 75.198 55.4332 75.9258 54.5472 75.7991C53.6613 75.7043 52.9968 75.6409 52.1425 75.5145C52.016 76.7168 51.921 77.666 51.8262 78.8684C51.7311 79.6278 51.1616 80.1972 50.4023 80.2922C49.1684 80.387 48.2508 80.4821 47.0484 80.6085C47.1435 81.4629 47.2383 82.1272 47.3333 83.0132C47.3965 83.4877 47.2383 83.9624 46.8903 84.3104C46.0677 85.1014 45.4665 85.7342 44.6437 86.5252C44.3591 86.8415 43.9478 86.9999 43.5364 86.9999H34.5819C34.139 86.9999 33.7593 86.8416 33.4746 86.5252L70.7288 49.2711C72.5639 51.138 75.6014 51.138 77.4366 49.2711C79.3033 47.4359 79.3033 44.3986 77.4366 42.5633L81.8978 38.1019C88.7006 44.8732 88.7006 55.9156 81.8977 62.6868Z" fill="#BD89FF"/>
</g>
<defs>
<clipPath id="clip0_0_1">
<rect width="54" height="54" fill="white" transform="translate(33 33)"/>
</clipPath>
</defs>
</svg>

    <h4>Priority Support</h4>
    <p>Experience priority support, personalized guidance, and a dedicated support team to ensure you make the most of ConvertML
</p>
    </div>
</Grid>

<Grid item xs={12} md={4} lg={4}> 
<div className="recognition">
<svg xmlns="http://www.w3.org/2000/svg" width="119" height="119" viewBox="0 0 119 119" fill="none">
  <path d="M59.5 119C92.3609 119 119 92.3609 119 59.5C119 26.6391 92.3609 0 59.5 0C26.6391 0 0 26.6391 0 59.5C0 92.3609 26.6391 119 59.5 119Z" fill="#121212"/>
  <path d="M119 59.5C119 59.9044 118.995 60.3112 118.988 60.7132C118.342 28.4136 91.9554 2.42648 59.5 2.42648C27.0446 2.42648 0.657754 28.4136 0.0116211 60.7132C0.00464844 60.3112 0 59.9044 0 59.5C0 26.6379 26.6379 0 59.5 0C92.3621 0 119 26.6379 119 59.5ZM106.282 62.7539C106.282 88.5923 85.3383 109.536 59.5 109.536C33.6617 109.536 12.7158 88.5923 12.7158 62.7539C12.7158 62.3518 12.7204 61.9474 12.7297 61.5476C13.3782 86.8212 34.0707 107.107 59.5 107.107C84.9293 107.107 105.619 86.8212 106.268 61.5476C106.277 61.9474 106.282 62.3518 106.282 62.7539Z" fill="#121212"/>
  <path d="M59.4999 107.107C85.3368 107.107 106.282 86.162 106.282 60.3251C106.282 34.4882 85.3368 13.5432 59.4999 13.5432C33.663 13.5432 12.718 34.4882 12.718 60.3251C12.718 86.162 33.663 107.107 59.4999 107.107Z" fill="#242424"/>
  <path d="M106.282 60.3251C106.282 61.1502 106.259 61.973 106.217 62.7864C104.936 38.0963 84.5086 18.4659 59.4977 18.4659C34.4868 18.4659 14.0615 38.0963 12.7809 62.7864C12.7391 61.9706 12.7158 61.1502 12.7158 60.3251C12.7158 34.4891 33.6617 13.5432 59.4977 13.5432C85.3337 13.5432 106.28 34.4891 106.28 60.3251H106.282Z" fill="#4A4A4A"/>
  <path d="M91.2317 62.5063C91.3326 64.9173 90.473 67.2698 88.8416 69.0478C87.2102 70.8258 84.9401 71.8841 82.5293 71.9905C82.3884 71.997 82.2476 72.0003 82.1072 72.0003C81.4666 71.9998 80.828 71.9305 80.2023 71.7935C78.3457 74.66 75.9113 77.1075 73.0548 78.9793C70.1982 80.8512 66.9824 82.1062 63.6131 82.6641C63.2145 83.8349 62.4195 84.8296 61.3653 85.4764C60.3112 86.1231 59.0642 86.3812 57.8399 86.2061C56.6156 86.031 55.491 85.4336 54.6605 84.5173C53.8299 83.6009 53.3456 82.4232 53.2913 81.1876C53.237 79.9521 53.6161 78.7364 54.363 77.7507C55.1099 76.765 56.1778 76.0712 57.382 75.7893C58.5862 75.5075 59.851 75.6552 60.9579 76.2069C62.0647 76.7587 62.944 77.6798 63.4437 78.8111C68.1873 77.9338 72.4726 75.4198 75.5528 71.7072C78.633 67.9945 80.3127 63.3188 80.2992 58.4948C80.2992 47.0981 71.0274 37.8263 59.6308 37.8263C48.2341 37.8263 38.9623 47.0981 38.9623 58.4948C38.9617 62.0188 39.8623 65.4845 41.5786 68.5623C41.6368 68.6639 41.6804 68.7731 41.7083 68.8868C41.8741 69.3476 41.8564 69.8544 41.6588 70.3025C41.4613 70.7506 41.099 71.1055 40.647 71.2939C39.5403 71.7597 38.3516 71.9996 37.1508 71.9994C37.0095 71.9994 36.8679 71.9961 36.7259 71.9896C34.3162 71.8818 32.0476 70.8229 30.4174 69.0451C28.7873 67.2672 27.9287 64.9154 28.0299 62.5054C28.0706 61.5444 28.0479 60.6869 28.0257 59.8577C28.005 59.077 27.9834 58.2697 28.0189 57.4272C28.1247 55.0741 29.1369 52.8532 30.8436 51.2297C32.5502 49.6062 34.8188 48.706 37.1743 48.7177C40.9567 40.0636 49.5982 34 59.6308 34C69.6634 34 78.305 40.0636 82.0874 48.7178C84.4431 48.7044 86.7125 49.6038 88.4194 51.2273C90.1263 52.8509 91.1381 55.0724 91.2425 57.4258C91.2781 58.2695 91.2567 59.0768 91.2357 59.8575C91.2138 60.6868 91.191 61.5446 91.2317 62.5063ZM75.6764 58.4948C75.6755 60.953 75.11 63.3782 74.0235 65.5832C72.937 67.7883 71.3586 69.7144 69.41 71.213C67.4614 72.7115 65.1946 73.7425 62.7845 74.2265C60.3744 74.7104 57.8854 74.6343 55.5093 74.0041L49.0147 77.7548C48.687 77.944 48.3105 78.0319 47.9329 78.0071C47.5553 77.9824 47.1935 77.8462 46.8933 77.6159C46.593 77.3855 46.3679 77.0713 46.2463 76.713C46.1246 76.3546 46.112 75.9683 46.21 75.6027L47.8698 69.4108C45.121 66.4396 43.5915 62.5425 43.5858 58.4948C43.5858 49.6448 50.7832 42.4454 59.6308 42.4454C68.4784 42.4454 75.6764 49.6448 75.6764 58.4948ZM55.1699 58.4948C55.1699 57.9874 54.9684 57.5008 54.6096 57.142C54.2508 56.7832 53.7642 56.5816 53.2568 56.5816H53.2536C52.8753 56.5823 52.5058 56.6951 52.1917 56.9058C51.8775 57.1164 51.6329 57.4155 51.4886 57.7651C51.3443 58.1148 51.307 58.4993 51.3812 58.8702C51.4554 59.2411 51.6379 59.5816 51.9056 59.8489C52.1733 60.1161 52.5142 60.2979 52.8852 60.3714C53.2562 60.445 53.6407 60.4069 53.9901 60.262C54.3395 60.1171 54.6381 59.8718 54.8481 59.5573C55.0582 59.2428 55.1703 58.873 55.1703 58.4948H55.1699ZM61.5443 58.4948C61.5441 58.4322 61.5407 58.3696 61.5341 58.3073C61.5281 58.2448 61.5188 58.1826 61.5062 58.1211C61.4947 58.0598 61.4794 57.9993 61.4601 57.94C61.4424 57.88 61.4207 57.8214 61.3978 57.7627C61.3748 57.704 61.3467 57.6492 61.3174 57.5943C61.2883 57.5392 61.2563 57.4855 61.2217 57.4336C61.1869 57.3812 61.1494 57.3305 61.1094 57.2818C61.0701 57.2331 61.028 57.1867 60.9832 57.1428C60.9399 57.0982 60.8927 57.0561 60.8442 57.0153C60.7956 56.977 60.7446 56.9388 60.6923 56.9043C60.6404 56.8697 60.5868 56.8378 60.5317 56.8087C60.4768 56.7793 60.4195 56.7525 60.362 56.7283C60.3045 56.7043 60.2458 56.6834 60.1861 56.6658C60.0668 56.6275 59.9436 56.6027 59.8188 56.5918C59.6314 56.5738 59.4424 56.5828 59.2576 56.6186C59.196 56.6312 59.1352 56.6469 59.0753 56.6658C59.0155 56.6834 58.9568 56.7042 58.8993 56.7283C58.8419 56.7525 58.7845 56.7793 58.7297 56.8087C58.6748 56.838 58.6213 56.8699 58.5688 56.9043C58.4641 56.9738 58.3668 57.0537 58.2782 57.1428C58.2334 57.1867 58.1912 57.2331 58.1518 57.2818C58.1123 57.3305 58.0753 57.3812 58.0409 57.4336C58.0059 57.4855 57.9735 57.5391 57.944 57.5943C57.9146 57.649 57.8881 57.7052 57.8648 57.7627C57.8406 57.8207 57.8193 57.8798 57.801 57.94C57.7833 57.9986 57.768 58.0599 57.7552 58.1211C57.7426 58.1826 57.7332 58.2448 57.727 58.3073C57.7208 58.3698 57.7181 58.4323 57.7181 58.4948C57.7181 58.5573 57.7208 58.6211 57.727 58.6836C57.7333 58.7456 57.7427 58.8074 57.7552 58.8685C57.768 58.9297 57.7833 58.9909 57.801 59.0509C57.8193 59.1106 57.8406 59.1693 57.8648 59.2269C57.8881 59.2848 57.9146 59.3414 57.944 59.3965C57.9732 59.4514 58.0065 59.5049 58.0409 59.5572C58.0753 59.6093 58.1123 59.6595 58.1518 59.7077C58.1915 59.7566 58.2337 59.8034 58.2782 59.848C58.3228 59.8914 58.3687 59.9348 58.4185 59.9743C58.4664 60.0141 58.5166 60.0512 58.5688 60.0853C58.6213 60.1197 58.6747 60.1529 58.7297 60.1822C58.8404 60.2399 58.9561 60.2877 59.0753 60.325C59.1351 60.3429 59.1964 60.3582 59.2576 60.371C59.3805 60.3961 59.5058 60.4085 59.6313 60.4079C60.1381 60.4066 60.6239 60.2054 60.9832 59.848C61.0714 59.7585 61.1512 59.6612 61.2217 59.5572C61.2562 59.5049 61.2881 59.4514 61.3174 59.3965C61.3467 59.3417 61.3735 59.2843 61.3978 59.2269C61.422 59.1695 61.4424 59.1096 61.4601 59.0509C61.4792 58.9911 61.4946 58.9302 61.5062 58.8685C61.5187 58.8074 61.528 58.7456 61.5341 58.6836C61.5406 58.6208 61.5439 58.5577 61.5439 58.4945L61.5443 58.4948ZM67.9215 58.4948C67.9215 57.9874 67.7199 57.5008 67.3611 57.142C67.0024 56.7832 66.5157 56.5816 66.0083 56.5816H66.0046C65.6264 56.5824 65.2569 56.6952 64.9428 56.9059C64.6286 57.1165 64.384 57.4156 64.2398 57.7652C64.0955 58.1149 64.0582 58.4994 64.1324 58.8703C64.2066 59.2412 64.3891 59.5817 64.6568 59.8489C64.9245 60.1161 65.2654 60.2979 65.6365 60.3714C66.0075 60.445 66.392 60.4069 66.7413 60.262C67.0907 60.117 67.3893 59.8718 67.5993 59.5573C67.8094 59.2428 67.9215 58.873 67.9215 58.4948Z" fill="#779DFF"/>
</svg>
    <h4>Recognition & Appreciation</h4>
    <p>Receive public acknowledgment as a key contributor to ConvertML's success, showcasing your commitment to innovation.
</p>
    </div>
</Grid>
              </Grid>
              </section>
        <section> 
               <Grid
                container
                spacing={8}
                direction="row"
                justifyContent="center"
                alignItems="center"
              > 
             
              <Grid item xs={12} md={5} lg={5}> <div className="web-view"> <img
                 src={'/json-media/img/whyjoin.png'}
                  alt="sitting in Goldmine"
                  className="img-responsive border-radius15"
                /></div> </Grid>
                 <Grid item xs={12} md={7} lg={7}><h2> Why join the Power User Program?</h2>
                 <p> As a valued member of our Power User Program, you'll be at the forefront of revolutionizing the way you analyze customer data with ConvertML. Here's why you should join:</p>
                 <ul className="ulchecklist">
                    <li><b>Influence the Final Product:</b> Your feedback is invaluable. Help shape ConvertML to align with your unique needs and expectations.</li>
                    <li><b>Early Adopter Advantage:</b> Be among the pioneers to explore the full potential of ConvertML. Gain exclusive access well before the official launch.</li>
                    <li><b>Exclusive Benefits:</b> Enjoy special privileges tailored for our early adopters, including discounts, additional features, and personalized support. 
</li>
                 </ul>
                </Grid> 
                 <Grid item xs={12} md={5} lg={5}> <div className="mobile-view"> <img
                 src={'/json-media/img/whyjoin.png'}
                  alt="sitting in Goldmine"
                  className="img-responsive border-radius15"
                /></div> </Grid>
                </Grid>  
           
            <h2 className="text-center fw-600">Program Expectations</h2>
            <Grid
                container
                spacing={8}
                direction="row"
                justifyContent="center"
                alignItems="top"
              > 
              <Grid item xs={12} md={6} lg={6}>
              <ul className="ulchecklist">
                    <li><b>Weekly Collaboration Meetings:</b> Engage in a 1-hour virtual meeting every week to discuss your experiences, challenges, and suggestions.</li>
                    <li><b>Product Usage Video:</b> Provide weekly screen recordings while using ConvertML to highlight specific functionalities, workflows, or areas of improvement.</li>
                    <li><b>Feature Wishlist:</b> Contribute to shaping ConvertML's roadmap by sharing your wishlist of functionalities and improvements you believe would enhance the platform's utility.</li>
                </ul>

                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                <ul className="ulchecklist">
                    <li><b>Bug Reporting and Issue Tracking:</b> Actively report any bugs, glitches, or unexpected behavior encountered during your usage.</li>
                    <li><b>Feedback Surveys: </b>Complete periodic feedback surveys to provide structured insights on specific aspects of ConvertML to share the platform’s future.</li>
                    <li><b>Participation in Future Planning:</b> Engage in discussions regarding the future trajectory of ConvertML, offering insights into potential market trends and user needs.</li>
                </ul>

                </Grid>
                </Grid> 
            </section>

            <section>
            <Grid
                container
                spacing={8}
                direction="row"
                justifyContent="center"
                alignItems="center"
              >  
                 <Grid item xs={12} md={7} lg={7}><h2>How to Join the Power User Program</h2>
                 
                 <ul className="ulchecklist">
                    <li>  <b>Sign Up:</b>  Click the "Join Power User Program" button to sign up. Our team will promptly connect with you for the onboarding process. </li>
                    <li><b>Explore ConvertML:</b> Dive into the world of ConvertML and start exploring its features. </li>
                    <li> <b>Provide Feedback:</b>  Share your thoughts, suggestions, and experiences to help us enhance ConvertML. </li>
                    <li> <b>Enjoy Exclusive Benefits:</b> As an early adopter, you'll receive exclusive perks and privileged access.   
</li>
                 </ul>
                </Grid>   <Grid item xs={12} md={5} lg={5}> <img
                 src={'/json-media/img/howtoJoin.png'}
                  alt="sitting in Goldmine"
                  className="img-responsive border-radius15"
                /> </Grid>
                
                </Grid>  
            </section>
          
 
        </div>
      </section> 

       {/* ------------------ send email popup  ------------------  */}
       <Dialog
          open={emailpopupopen}
          onClose={emailpopupClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          className="popup-form"
        >
          <DialogTitle id="alert-dialog-title">
          Power User Program
            <IconButton
              aria-label="close"
              onClick={emailpopupClose}
              sx={{
                position: 'absolute',
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent>
          {

!dataSourceMailObj.isSubmit && (<>
            <span>Experience exclusive data intergration tailored to your needs! Please provide your details below, and our team will connect with you get started.</span><br /><br />
         
            <form>
            <Grid
              container
              spacing={2}
            >
              <Grid item xs={6}>

                <TextField
                  required
                  autoComplete="new-password"
                  className="inputBox"
                  id="name"
                  autoFocus
                  label="First name"
                  type="text"
                  value={dataSourceMailObj.first_name}
                  onChange={(event, val) => changeDataSourceMailObj("first_name", event.target.value)}
                  placeholder="First name"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField 
                  autoComplete="new-password"
                  className="inputBox"
                  id="name"
                  autoFocus
                  label="Last name"
                  type="text"
                  value={dataSourceMailObj.last_name}
                  onChange={(event, val) => changeDataSourceMailObj("last_name", event.target.value)}
                  placeholder="Last name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  autoComplete="new-password"
                  className="inputBox"
                  id="name"
                  autoFocus
                  label="Email"
                  type="text"
                  value={dataSourceMailObj.email}
                  onChange={(event, val) => changeDataSourceMailObj("email", event.target.value)}
                  placeholder="Email"
                />
              </Grid>
              <Grid item xs={12}>
              
              <TextField 
                  className="inputBox"
                  id="name"
                  autoFocus
                  label="Phone"
                  type="text"  
                  value={dataSourceMailObj.phoneNo}
                  onChange={(event, val) => changeDataSourceMailObj("phoneNo", event.target.value)}
                  placeholder="Phone"
                />
              </Grid>
            </Grid><br />
            <Button variant="contained" disabled={dataSourceMailObj.first_name=="" || dataSourceMailObj.email=="" || dataSourceMailObj.phoneNo==""}  className="pink-btn d-block w-full" onClick={(e) => { sendDataSourceMail() }} size="large">Submit</Button>
            </form> 
            </>)
            }
            
            {
              dataSourceMailObj.isSubmit &&
              (<div className="text-center">
                <div className="emailsuccessfulsubmit" style={{ width: '280px', margin: 'auto' }}><h1>Thank you!</h1></div><br />
                Our team will be in touch shortly to kickstart your ConvertMl Journey<br /><br />
                <hr className="blue-hr" style={{ width: '100px', margin: 'auto' }} />
              </div>)
            }
          </DialogContent>
        </Dialog>
        {/* ------------------ send email popup  ------------------   */}
  
      <HomeFooter />
    </>
  );
}

export default BetaTesterPage;
