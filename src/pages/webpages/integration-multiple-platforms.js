import React, { useState, useEffect } from "react"; 
import Cookies from "js-cookie";
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
import { useNavigate } from "react-router-dom";
import { IntegrationMultiplePlatform } from "../../assets/data/metadata-list";
import { IntegrationMultiplePlatformMarkup } from "../../assets/data/schema-markup";
import {
  CRMListData,
  customerServiceListData,
  dataWarehouseDatabaseListData,
  financialListData,
  reviewsListData,
  socialmediaList,
  SurveyListData,
} from "../../assets/data/create-data-connection";

function IntegrationMultiplePlatforms() {
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
    fname: "",
    lname: "",
    email: "",
    company: "",
    contactno: "",
    supporttypes: "",
    helptext: "",
  });

  function submitForm() {
    sendMail(data.fname, data.email, null);
  }
  function handle(e) {
    let newData = { ...data };
    newData[e.target.id] = e.target.value;
    setData(newData);
    console.log(newData);
  }

  useEffect(() => {
    window.addEventListener("scroll", () => {
      setScroll(window.scrollY > 300);
    });
  }, []);

  function navHighlighter() {
    let scrollY = window.pageYOffset;
    sections.forEach((current) => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 50;
      const sectionId = current.getAttribute("id");
      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        document
          .querySelector(".localPageNav a[href*=" + sectionId + "]")
          .classList.add("selected");
      } else {
        document
          .querySelector(".localPageNav a[href*=" + sectionId + "]")
          .classList.remove("selected");
      }
    });
  }

  function sendMail(userName, userEmail, mailtype) {
    fetch(`${process.env.REACT_APP_API_URL}/survey/sendMailSheduleDemo`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-type": "application/json",
        "token":Cookies.get("token")
      },
      body: JSON.stringify({
        userName: userName,
        userEmail: userEmail,
        mailType: mailtype,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setisSubmit(true);
        setData({
          fname: "",
          lname: "",
          email: "",
          company: "",
          contactno: "",
          supporttypes: "",
          helptext: "",
        });
      });
  }
  const navigate = useNavigate();
  const handleClick = () => navigate("/scheduleDemo");

  useEffect(() => {
    setfaqListp(faqsListp);
    setfaqListdp(faqsListdp);
    setfaqListPricing(faqsListPricing);
    setfaqListResources(faqsListResources);
    setfaqListTypeform(faqsListTypeform);
  }, []);

  return (
    <>
      <div id="Survey"> </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(IntegrationMultiplePlatformMarkup),
        }}
      />
      <Helmet>
        <title>{IntegrationMultiplePlatform.title} </title>
        <meta
          name="description"
          content={IntegrationMultiplePlatform.description}
          data-react-helmet="true"
        />
        <meta name="keywords" content={IntegrationMultiplePlatform.keywords} />
        <meta property="image" content={IntegrationMultiplePlatform.image} />
        <meta property="url" content={IntegrationMultiplePlatform.url} />
        <meta
          property="publisher"
          content={IntegrationMultiplePlatform.publisher}
        />
        <meta property="author " content={IntegrationMultiplePlatform.author} />
        <meta
          property="site_name"
          content={IntegrationMultiplePlatform.site_name}
        />
        <meta property="locale" content={IntegrationMultiplePlatform.locale} />
        <meta property="type" content={IntegrationMultiplePlatform.type} />
        <link rel="canonical" href={IntegrationMultiplePlatform.canonical} />
      </Helmet>

      <Navbar />
      {/* ------------------- banner   ------------------- */}
      <div className="banner-onlyheading">
        <section className="container-home ">
        <Grid
          container
          spacing={3}
          direction="row" 
        >
          <Grid item xs={12} md={6} lg={6}><br/>
          <img src={integrationBanner} title={'banner'} alt={'banner'} className="img-responsive" />
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
            <span  className="web-view"><br/><br/><br/></span>
            <h3 className="m-3">
            Seamless integration with multiple platforms
              </h3>
              <span>Richer insights with the synergized power of multiple data streams.</span>
              <div className="clearfix"></div><br/>
              <Button onClick={handleClick}    color="primary"
                  variant="contained" className="btn1">
              <b> Book Demo</b>
            </Button>
              </Grid>
            </Grid>
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
              <h3>All Integration</h3>
              <ul className="localPageNav">
                <li>
                  <a href="#Survey">Survey</a>
                </li>
                <li>
                  <a href="#CRM"> CRM</a>
                </li>
                <li>
                  <a href="#CustomerSupport"> Customer Support</a>
                </li>
                <li>
                  <a href="#Social">Social</a>
                </li>
                <li>
                  <a href="#Reviews">Reviews</a>
                </li>
                <li>
                  {" "}
                  <a href="#Financial"> Financial</a>
                </li>
                <li>
                  {" "}
                  <a href="#Database"> Database</a>
                </li>
              </ul>
            </div>
          </Grid>
          <Grid item xs={12} md={8} lg={8} className="integrationMultiple"> 
          
            <section id="Survey">
              <Grid container spacing={2}>
                <Grid xs={12} md={12} lg={12}>
                  <h3 className="heading">Survey</h3>{" "}
                </Grid>
                {SurveyListData.map((item, i) => (
                  <Grid item xs={12} md={4} lg={4} key={i}>
                    <Card className="cardbox" key={i}>
                      <div>
                        <img src={item.img} title={item.name} />
                        <h4> {item.name}</h4>
                        <span> {item.type}</span>
                      </div>
                      <div id="CRM"> </div>
                    </Card>
                  </Grid>
                ))} 
              </Grid>
            </section>
            <section id="CRM">
              <Grid container spacing={2}>
                <Grid xs={12} md={12} lg={12}>
                  <h3 className="heading">CRM</h3>{" "}
                </Grid>
                {CRMListData.map((item, i) => (
                  <Grid item xs={12} md={4} lg={4} key={i}>
                    <Card className="cardbox" key={i}>
                      <div>
                        <img src={item.img} title={item.name} />
                        <h4> {item.name}</h4>
                        <span> {item.type}</span>
                      </div>
                      <div id="CustomerSupport"> </div>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </section>

            <section id="CustomerSupport">
              <Grid container spacing={2}>
                <Grid xs={12} md={12} lg={12}>
                  <h3 className="heading">Customer Support</h3>{" "}
                </Grid>
                {customerServiceListData.map((item, i) => (
                  <Grid item xs={12} md={4} lg={4} key={i}>
                    <Card className="cardbox" key={i}>
                      <div>
                        <img src={item.img} title={item.name} />
                        <h4> {item.name}</h4>
                        <span> {item.type}</span>
                      </div>
                      <div id="Social"> </div>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </section>

            <section id="Social">
              <Grid container spacing={2}>
                <Grid xs={12} md={12} lg={12}>
                  <h3 className="heading">Social</h3>{" "}
                </Grid>
                {socialmediaList.map((item, i) => (
                  <Grid item xs={12} md={4} lg={4} key={i}>
                    <Card className="cardbox" key={i}>
                      <div>
                        <img src={item.img} title={item.name} />
                        <h4> {item.name}</h4>
                        <span> {item.type}</span>
                      </div>
                      <div id="Reviews"> </div>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </section>

            <section id="Reviews">
              <Grid container spacing={2}>
                <Grid xs={12} md={12} lg={12}>
                  <h3 className="heading">Reviews</h3>{" "}
                </Grid>
                {reviewsListData.map((item, i) => (
                  <Grid item xs={12} md={4} lg={4} key={i}>
                    <Card className="cardbox" key={i}>
                      <div>
                        <img src={item.img} title={item.name} />
                        <h4> {item.name}</h4>
                        <span> {item.type}</span>
                      </div>
                      <div id="Financial"> </div>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </section>
            <section id="Financial">
              <Grid container spacing={2}>
                <Grid xs={12} md={12} lg={12}>
                  <h3 className="heading">Financial</h3>{" "}
                </Grid>
                {financialListData.map((item, i) => (
                  <Grid item xs={12} md={4} lg={4} key={i}>
                    <Card className="cardbox" key={i}>
                      <div>
                        <img src={item.img} title={item.name} />
                        <h4> {item.name}</h4>
                        <span> {item.type}</span>
                      </div>
                      <div id="Database"> </div>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </section>
            <section id="Database">
              <Grid container spacing={2}>
                <Grid xs={12} md={12} lg={12}>
                  <h3 className="heading">Database</h3>{" "}
                </Grid>
                {dataWarehouseDatabaseListData.map((item, i) => (
                  <Grid item xs={12} md={4} lg={4} key={i}>
                    <Card className="cardbox" key={i}>
                      <div>
                        <img src={item.img} title={item.name} />
                        <h4> {item.name}</h4>
                        <span> {item.type}</span>
                      </div>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </section>
          </Grid>
        </Grid><br/><br/>
      </div>
      <HomeFooter />
    </>
  );
}

export default IntegrationMultiplePlatforms;
