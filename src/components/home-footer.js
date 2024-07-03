import React, { useState } from "react"; 
import "./Footer.scss"; 

import getstartedBanner from "../assets/img/getstarted-banner.png";
import footerBanner from "../assets/img/footer-banner.png";
import { Box,Grid } from "@mui/material";
import { Link } from "react-router-dom"; 

function HomeFooter() {
  const url = "";
  const [data, setData] = useState({
    fname: '',
    lname: '',
    email: ''
  })
  const [subsibeEmail, setSubsibeEmail] = useState("")
  const [isSubmitShedule, setisSubmitShedule] = useState(false);
  const [isSubmitSubscribe, setisSubmitSubscribe] = useState(false);


  function submitForm() {
    sendMail(data.fname, data.email, "shedule_demo");
    setData({
      fname: '',
      lname: '',
      email: ''
    })
    setisSubmitShedule(true);
  }

  function subscribeEmail() {
    sendMail(null, subsibeEmail, "subscribe_email")
    setSubsibeEmail('');
    setisSubmitSubscribe(true)
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

      })
  }


  function handle(e) {
    let newData = { ...data }
    newData[e.target.id] = e.target.value
    setData(newData)
    console.log(newData)

  }
  return (
    <div className="footerContainer-home" id="getStarted">
      <div className="container-home">
        <div className="footerBanner">
          <img src={footerBanner} alt="convertml" /> </div>
        <div className="subscription-section">
          <Grid
            container
            spacing={1}
            direction="row"
          >
            <Grid item xs={12} sm={4} lg={4} >
             <img src={getstartedBanner} alt='img' className="img-responsive" />
            </Grid>
            <Grid item xs={12} sm={8} lg={8}> <h2 className="m-0">Get Started</h2>
              <p >
                Leverage the data-driven insights from ConvertML to swiftly
                target customers who are most likely to churn by delivering
                personalized promotions tailored to their specific needs.
              </p>
              <div className='from'>
                {
                  isSubmitShedule ? (
                    <div className="emailsuccessfulsubmitfooter">
                      Thanks. We’ll get back to you shortly. In the meantime, feel free to check out  <Link to={'/blogs'}><b>our blog</b></Link> for the latest marketing and trends updates.

                    </div>
                  ) : (
                    <>
                      <from>
                        <Grid
                          container
                          spacing={1}
                          direction="row"
                        >
                          <Grid item xs={12} sm={6} lg={6}>
                            <input type="text" placeholder="First Name" onChange={(e) => handle(e)} name="fname" value={data.fname} id="fname" required />
                          </Grid>
                          <Grid item xs={12} sm={6} lg={6}>
                            <input type="text" placeholder="Last Name" onChange={(e) => handle(e)} name="lname" value={data.lname} id="lname" />
                          </Grid>
                          <Grid item xs={12} sm={12} lg={12}>
                            <input type="text" placeholder="Email Address" onChange={(e) => handle(e)} name="email" value={data.email} id="email" required />
                          </Grid>
                          <Grid item xs={12} sm={12} lg={12}>
                            <button type="submit" disabled={data.fname != "" && data.lname != "" && data.email != "" ? false : true} onClick={(e) => { submitForm() }}>Contact Us</button>
                          </Grid>
                        </Grid>
                      </from>
                    </>
                  )
                }

              </div>
            </Grid> 
          </Grid>
        </div>
        <div className="footer-link-section">
          <Grid
            container
            spacing={1}
            direction="row"
            justifyContent="center"
            alignItems="top"
          >
            <Grid xs={12} md={3}>
              <img src={"/images/footerlogo.png"} alt="convertml" />  <br />
              <p>
                Stay at the top-of-mind of the consumers <br /> <br />
                One Pierce Place Suite 455E,
                <br />
                Itasca, IL 60143 USA.
              </p>

              <div className="socialMediaIcons" >
                <a
                  href="https://www.linkedin.com/company/convertml/"
                  target="_blank" rel="noopener noreferrer" 
                >
                  <img src={"/images/linkden.png"} alt="linkden convertml" />
                  <a />
                </a> 
              </div>
            </Grid>
            <Grid xs={12} md={3}>
              <h4>Pages</h4>
              <a href="./">Home page</a> <br />
              <br />
              <Link to="/about-us">About Us</Link>
            </Grid>
            <Grid xs={12} md={3}>
              <h4>Contact</h4>
              <div className="pb-3 headContent" id="fontColor">
                <img src={"/images/phone.png"} alt="phone convertml" className="float-left mr-3" />
                <a href="phone:+17084154811"> +17084154811</a>
              </div>  <br />
              <div className="headContent" id="fontColor">
                <img src={"/images/email.png"} alt="email convertml" className="float-left mr-3" />
                <a href="mailto:support@convertml.ai"> support@convertml.ai</a>
              </div>
            </Grid>
            <Grid xs={12} md={3}>
              <h4>Subscribe Now</h4>
              {
                isSubmitSubscribe?(<Box className="emailsuccessfulsubmitfooter">
                  Thank you! You are a subscriber to the World of ConvertML!
                </Box>):(
                  <>
                   <from className='subscribeform'>
                <input type="text" value={subsibeEmail} onChange={(e) => setSubsibeEmail(e.target.value)} placeholder="Enter your email" />
                <input type="button" disabled={subsibeEmail!=''?false:true} onClick={(e) => { subscribeEmail() }} value="Subscribe" />
              </from>
                  </>
                )
              }
             
            </Grid>
          </Grid>
        </div>
      </div>
      <div className="copyright">
        <div className="container-home">
          <Grid
            container
            spacing={1}
            direction="row"
            justifyContent="center"
          >
            <Grid xs={12} md={6}>
              © Copyright 2023. ConvertML All Right Reserved
            </Grid>
            <Grid xs={12} md={6}>
              <div className='text-right'>
                <Link to="/legal">Legal</Link> |
                <Link to="/privacy-policy">&nbsp;Privacy and Service terms documents</Link>
              </div>
            </Grid>
          </Grid>
        </div>
      </div> 
    </div>
  );
}

export default HomeFooter;
