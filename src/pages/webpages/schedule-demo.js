import React, { useState, useEffect } from "react"; 
import Navbar from "../../components/molecules/Navbar"; 
import {
  Button,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Link,
  TextField,
  IconButton,
  Typography,
  Box,
  CardMedia,
} from "@mui/material"; 
 
import integrationBanner from "../../assets/img/integrationBanner.png";
import HomeFooter from "../../components/home-footer"; 
import { Helmet } from "react-helmet";
import { 
  faqsListdp,
  faqsListp,
  faqsListPricing,
  faqsListResources,
  faqsListTypeform,
} from "../../assets/data/fasq";
import { scheduleDemo } from "../../assets/data/metadata-list";
import { scheduleDemoMarkup } from "../../assets/data/schema-markup"; 

export default  function ScheduleDemo () {
  const url = "";
  const [data, setData] = useState({
    fname: '',
    lname: '',
    email: '',
    phone: ''
  })
  const [subsibeEmail, setSubsibeEmail] = useState("")
  const [isSubmitShedule, setisSubmitShedule] = useState(false);
  const [isSubmitSubscribe, setisSubmitSubscribe] = useState(false); 

  function sendMail(userName,userLastName,userEmail, userPhone, mailtype) {
    fetch(`${process.env.REACT_APP_API_URL}/survey/sendMailSheduleDemo`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ "userName": userName,"userLastName": userLastName, "userEmail": userEmail, "userPhone": userPhone, mailType: mailtype })
    })
      .then((res) => res.json())
      .then((res) => {

        console.log(res)

      })
  }

  function submitForm() {
    sendMail(data.fname, data.lname,data.email,data.phone, "shedule_demo");
    setData({
      fname: '',
      lname: '',
      email: '',
      phone: ''
    })
    setisSubmitShedule(true);
  }

  function handle(e) {
    let newData = { ...data }
    newData[e.target.id] = e.target.value
    setData(newData)
    console.log(newData) 
  }

  useEffect(() => {}, []);

  return (
    <>
      <div id="Survey"> </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(scheduleDemoMarkup),
        }}
      />
      <Helmet>
        <title>{scheduleDemo.title} </title>
        <meta
          name="description"
          content={scheduleDemo.description}
          data-react-helmet="true"
        />
        <meta name="keywords" content={scheduleDemo.keywords} />
        <meta property="image" content={scheduleDemo.image} />
        <meta property="url" content={scheduleDemo.url} />
        <meta
          property="publisher"
          content={scheduleDemo.publisher}
        />
        <meta property="author " content={scheduleDemo.author} />
        <meta
          property="site_name"
          content={scheduleDemo.site_name}
        />
        <meta property="locale" content={scheduleDemo.locale} />
        <meta property="type" content={scheduleDemo.type} />
        <link rel="canonical" href={scheduleDemo.canonical} />
      </Helmet>

      <Navbar />
      {/* ------------------- banner   ------------------- */}
      <div className="pinkbanner-onlyheading">
        <section className="container-home ">
        <Grid
          container
          spacing={3}
          direction="row" 
        >
          <Grid item xs={12} md={6} lg={6}>
            <span  className="web-view"><br/><br/><br/></span>
            <h2 className="m-3">
            Get an in-depth
product demo
              </h2>
              <p>Want to see how convertML can help your team build better products? Schedule a live demo with our product analytics experts.</p>
              <div className="clearfix"></div><br/>
               
              </Grid>
          <Grid item xs={12} md={6} lg={6}><br/>
          <div className="schedule-demo-form">
          <h3 className="m-0 text-center">  Schedule your demo</h3> 
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
                          spacing={2}
                          container
                          direction="row"
                          justifyContent="center"
                          alignItems="center"
                        >  
                          <Grid item xs={12} sm={6} lg={6}>
                            <input type="text" placeholder="First Name" onChange={(e) => handle(e)} name="fname" value={data.fname} id="fname" required />
                          </Grid>
                          <Grid item xs={12} sm={6} lg={6}>
                            <input type="text" placeholder="Last Name" onChange={(e) => handle(e)} name="lname" value={data.lname} id="lname" />
                          </Grid>
                          <Grid item xs={12} sm={6} lg={6}>
                            <input type="text" placeholder="Email Address" onChange={(e) => handle(e)} name="email" value={data.email} id="email" required />
                          </Grid>
                          <Grid item xs={12} sm={6} lg={6}>
                            <input type="text" placeholder="Phone" onChange={(e) => handle(e)} name="phone" value={data.phone} id="phone" required />
                          </Grid>
                          <Grid item xs={12} sm={12} lg={12}>
                          <p> <input type={'checkbox'} name='check' className="mr-2" /> 
                          I  Yes, I’d like to receive occasional emails about products, content, events and news from ConvertML. </p>
                          </Grid>  
                          <Grid item xs={12} sm={12} lg={12}><div className="text-center"> 
                            <button type="submit" disabled={data.fname != "" && data.lname != "" && data.email != "" ? false : true} onClick={(e) => { submitForm() }}>Submit</button></div><br/>
                            <p>By submitting this form, you consent to convertML storing and processing the personal information provided in accordance with our Privacy Policy</p>
                          </Grid> 
                         
                        </Grid>
                      </from>
                    </>
                  )
                } 
              </div>
          </div> 
            </Grid>
            
            </Grid>
        </section>
      </div>
      {/* ------------------- banner   ------------------- */}
<section className="whathappens">
<div className="container-home"> 
        <Grid
          container
          spacing={2}
          direction="row"
          // justifyContent="center"
          // alignItems="center"
        >
          <Grid item xs={12} md={12} lg={12}>
           <div className="heading">What happens next?<br/><span className="sub-heading">Someone from our team will reach out so:</span>
           <img src="/json-media/img/convertmlLogoicon.png" alt='logo' width={70}/>
           </div>
          </Grid>
          <Grid item xs={12} md={4} lg={4}>
          <img src="/json-media/img/speak-team.png" alt='logo'/>
          <h3>Speak to our team</h3>
          <p>So we better understand your
current needs and requirements.</p>
            </Grid>
            <Grid item xs={12} md={4} lg={4}>
          <img src="/json-media/img/see-platfrom.png" alt='logo'/>
          <h3>See the platform</h3>
          <p>You can see the ConvertML
 platform in action.</p>
            </Grid>
            <Grid item xs={12} md={4} lg={4}>
          <img src="/json-media/img/explor-together.png" alt='logo'/>
          <h3>Explore together</h3>
          <p>We explore together how ConvertML would
  work for you and answer any questions.</p>
            </Grid>
        </Grid><br/><br/>
      </div>
</section>
      
      <HomeFooter />
    </>
  );
}
 
