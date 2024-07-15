import React, { useCallback, useEffect, useRef, useState, useContext } from "react";
// import MenuIcon from "@mui/icons-material/Menu";
// import CloseIcon from "@mui/icons-material/Close";
import ProductModal from "./../../atoms/ProductModal";
import CompanyModal from "./../../atoms/CompanyModal";
import VideoModal from "../../atoms/VideoModal";
import TechnologyModal from "../../atoms/TechnologyModal";
import { LazyLoadImage } from "react-lazy-load-image-component";
import LanguageSwitcher from "../../../layouts/ExtendedSidebarLayout/Header/Buttons/LanguageSwitcher";
import { Box } from "@mui/system";
import SolutionModal from "../../atoms/solutionModal";
//import { useTheme } from "@emotion/react";
//import { Box } from "@mui/material";

import { Link, useNavigate } from "react-router-dom";
import { Button, Grid } from "@mui/material";
import { SessionContext } from "../../../contexts/SessionContext";
import HeaderButtons from "../../../layouts/ExtendedSidebarLayout/Header/Buttons";
import HeaderUserbox from "../../../layouts/ExtendedSidebarLayout/Header/Userbox";

const Navbar = () => {
  const [activeComponentName, setActiveComponent] = useState(null);
  const [modal, setModal] = useState(false);
  const [menuClosed, setMenuClosed] = useState(true);
  const [solutionSubmenu, IssolutionSubmenu] = useState(false);
  const [pricingSubmenu, IspricingSubmenu] = useState(false);
  const [resourcesSubmenu, IsresourcesSubmenu] = useState(false);

  const [announcement, Isannouncement] = useState(true);

  
  const navigate = useNavigate();
  const getstartedClick = () => navigate('/signup');

  const [session, login] = useContext(SessionContext);

  const ref = useRef(null);
  const toggleModal = () => {
    setActiveComponent(null);
    setModal(!modal);
  };
  //const theme = useTheme();

  const hideannouncementBar=()=>{
    Isannouncement(false);
  }
  const handleMouseEnter = useCallback((componentName) => {
    window.clearTimeout(ref.current);
    setActiveComponent(componentName);
  }, []);

  const closeModal = useCallback(() => {
    ref.current = setTimeout(() => {
      setActiveComponent(null);
    }, 200);
  }, []);

  const [isShown, setIsShown] = useState(true);

  const [isNav, setisNav] = useState(false);

  const handleClick = (event) => {
    // 👇️ toggle visibility
    setIsShown((current) => !current);
  };

  const showMenu = (e) => {
    // 👇️ toggle visibility
    setisNav((isNav) => !isNav);
  };

  const queryParameters = new URLSearchParams(window.location.search);
  const pageUrlOpen = window.location.origin+window.location.pathname;  


  useEffect(() => {
     /* ---------- url read property ---------- */
     let urlinfo =  {utm_campaign:queryParameters.get("utm_campaign"),utm_medium:queryParameters.get("utm_medium"), utm_source:queryParameters.get("utm_source"),utm_url:pageUrlOpen};   
     if(urlinfo.utm_campaign!=null&&urlinfo.utm_medium!=null&&urlinfo.utm_source!=null&&urlinfo.utm_url!=null){  
       fetch(`${process.env.REACT_APP_API_URL}/survey/saveTypeformUserRecord`,{
         method:'POST',
         headers:{'Content-Type':'application/json'},
         body:JSON.stringify(urlinfo), 
        }) 
     }     
     /* ---------- url read property end ---------- */ 

    const closeNavBarPopUpModal = (activeComponentName) => {
      if (activeComponentName !== null) {
        setActiveComponent(null);
      }
    };
    document.addEventListener("scroll", closeNavBarPopUpModal);
    return () => {
      document.removeEventListener("scroll", closeNavBarPopUpModal);
    };



  }, [activeComponentName]);

  const openSubmenu = (e, item) => {
    if (item == "solutions") {
      IssolutionSubmenu(!solutionSubmenu);
      IspricingSubmenu(false);
      IsresourcesSubmenu(false);

    } else if (item == "pricing") {
      IspricingSubmenu(!pricingSubmenu);
      IssolutionSubmenu(false);
      IsresourcesSubmenu(false);
    } else if (item == "resources") {
      IsresourcesSubmenu(!resourcesSubmenu);
      IspricingSubmenu(false);
      IssolutionSubmenu(false);
    }
  };

  
  /*  ----------- out side click close menu  ----------- */
  const boxOneRef = useRef(null);
  const useClickOutside = (targetRef, callbackFn) => {
    useEffect(() => {  
      const onDocumentClick = (event) => {
        const withinBoundaries = event.composedPath().includes(targetRef.current)
        if (!withinBoundaries) callbackFn();
      };
      document.addEventListener('click', onDocumentClick);
      return () => {
        document.removeEventListener('click', onDocumentClick);
      };
    }, [targetRef, callbackFn]);
  };

  const onClickOutsideBoxOneCallback = useCallback(() => {
    IspricingSubmenu(false);
    IssolutionSubmenu(false);
    IsresourcesSubmenu(false);
  });

  useClickOutside(boxOneRef, onClickOutsideBoxOneCallback);
  /*  ----------- out side click close menu  ----------- */

  return (
    <>
   


      <nav className="top-navbar" ref={boxOneRef}>
{announcement?<> <div class="announcement"><a className="fa fa-times-circle close-icon" onClick={()=>hideannouncementBar()}></a>
      <div class="container">
        <div class="announcement-text">
        <Link to="/power-user-program-convertml">  <b> Pioneer with the 20 leaders! Join the <strong>Power User Program</strong> for exclusive benefits.</b></Link>
         </div> </div></div></>:<> </>} 
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Grid item xs={6} md={3} lg={3}>
            <Link to="/">
              <LazyLoadImage
                className="logo" alt={"Convertml"}
                src={"/images/convertmlLogo.png"}
              />
            </Link>
          </Grid>
          <Grid item xs={1} md={6} lg={6}>
            <div class="toggle_hamburger">
              {isNav ? (
                <>
                  <a className="fa fa-close" onClick={(e) => showMenu(e)}>

                  </a>
                </>
              ) : (
                <>
                  <a className="fa fa-navicon" onClick={(e) => showMenu(e)}>

                  </a>
                </>
              )}
            </div>
            <div className="top-nav-list web-nav">
              <ul>
                <li>
                  <span onClick={(e) => openSubmenu(e, "solutions")} > Solutions  <i
                    className={
                      solutionSubmenu
                        ? "fa fa-angle-up payrentMenu"
                        : "fa fa-angle-down payrentMenu"
                    }
                  >

                  </i>
                    <span
                      className={solutionSubmenu ? "greyarrow" : ""}
                    ></span> </span>
                  {solutionSubmenu ? (
                    <>
                      <div className="payrentsubMenu">
                        <div className="subMenu">
                          <div className="container-home">
                            <b>Key Initiative </b>
                            <hr />
                            <Grid
                              container
                              direction="row" spacing={5}
                              justifyContent="space-between"
                              alignItems="center"
                            >
                              <Grid item xs={12} md={4} lg={4}>
                                <Link to="/customer-satisfaction-analysis">

                                  <b>
                                    <img
                                      src={"/json-media/img/nav/csa.svg"}
                                      alt="test"
                                    />
                                    Customer Satisfaction Analysis
                                  </b>
                                  <p>
                                    Combine sentiments from user generated
                                    feedback and transactional systems (CRM)
                                    for truly comprehensive insights.
                                  </p>
                                </Link>
                              </Grid>
                              <Grid item xs={12} md={4} lg={4}>
                                <Link to="/net-promoter-score">

                                  <b>
                                    <img
                                      src={"/json-media/img/nav/npsa.svg"}
                                      alt="test"
                                    />
                                    NPS Analysis
                                  </b>
                                  <p>
                                    Stay ahead of your detractors by
                                    harnessing advanced customer insights by
                                    combining qualitative and quantitative
                                    data.
                                  </p>
                                </Link>
                              </Grid>
                              <Grid item xs={12} md={4} lg={4}>
                                <Link to="/churn-analysis">

                                  <b>
                                    <img
                                      src={"/json-media/img/nav/pca.svg"}
                                      alt="test"
                                    />
                                    Predictive Churn Analysis
                                  </b>
                                  <p>
                                    Combine sentiments from user generated
                                    feedback and transactional systems (CRM)
                                    for truly comprehensive insights.
                                  </p>
                                </Link>
                              </Grid>
                            </Grid>
                            <br />
                            <b>Roles </b>
                            <hr />
                            <Grid
                              container
                              direction="row" spacing={5}
                              justifyContent="space-between"
                              alignItems="center"
                            >
                              <Grid item xs={12} md={4} lg={4}>
                                <Link to="/solutions/roles/customer-success-software">

                                  <b>
                                    <img
                                      src={
                                        "/json-media/img/nav/customersuccess.svg"
                                      }
                                      alt="test"
                                    />
                                    Customer Success
                                  </b>
                                  <p>
                                    Lift success with NPS insights, tackle
                                    risks through Churn Analysis, and blend
                                    user feedback for a comprehensive view.
                                  </p>
                                </Link>
                              </Grid>
                              <Grid item xs={12} md={4} lg={4}>
                                <Link to="/solutions/roles/marketing">

                                  <b>
                                    <img
                                      src={
                                        "/json-media/img/nav/marketing.svg"
                                      }
                                      alt="test"
                                    />
                                    Marketing
                                  </b>
                                  <p>
                                    Hyper-personalize marketing effortlessly
                                    with a 360° customer view—no scripts, no
                                    codes, less data scientist reliance.
                                  </p>
                                </Link>
                              </Grid>
                              <Grid item xs={12} md={4} lg={4}>
                                <Link to="/solutions/roles/market-insights">

                                  <b>
                                    <img
                                      src={
                                        "/json-media/img/nav/marketingInsight.svg"
                                      }
                                      alt="test"
                                    />
                                    Market Insights
                                  </b>
                                  <p>
                                    Uncover insights by merging qualitative
                                    and quantitative data from CRMs, surveys,
                                    and social media for new opportunities.
                                  </p>
                                </Link>
                              </Grid>
                            </Grid>
                          </div>

                        </div>
                      </div>
                    </>
                  ) : (
                    <> </>
                  )}
                </li>
                <li> <Link to='/pricing-plan'><span onClick={(e) => openSubmenu(e, "pricing")}>  Pricing  <i
                  className={
                    pricingSubmenu ? "fa fa-angle-up" : "fa fa-angle-down"
                  }
                >
                </i>
                  <span
                    className={pricingSubmenu ? "greyarrow" : ""}
                  ></span> </span></Link>
                  {pricingSubmenu ? (
                    <>
                      <div className="subMenu price-plans">
                        <div className="container-home" style={{ zIndex: 10 }} >
                          <Grid
                            container
                            direction="row"
                            justifyContent="space-between"
                            spacing={2}
                          >
                            <Grid item xs={12} md={4} lg={7}>
                              <Grid
                                container
                                direction="row"
                                justifyContent="space-between"
                                alignItems="center"
                                spacing={3}
                              >
                                <Grid item xs={12} md={5} lg={5}>
                                  <b>
                                    <img
                                      src={"/json-media/img/nav/basic.svg"}
                                      alt="basic"
                                    />
                                    Basic
                                  </b>
                                  <p>
                                    For individuals and teams that need quick insights into the customer base.
                                  </p>
                                </Grid>

                                <Grid item xs={12} md={5} lg={5}>
                                  <b>
                                    <img
                                      src={
                                        "/json-media/img/nav/enterprise.svg"
                                      }
                                      alt="Enterprise"
                                    />
                                    Enterprise
                                  </b>
                                  <p>
                                    Everything your enterprise teams need to manage multiple projects
                                  </p>
                                </Grid>
                              </Grid>
                              <div className="freePlan-nav">
                                <b>
                                  <img
                                    src={
                                      "/json-media/img/nav/freePlan.svg"
                                    }
                                    alt="Free Plan"
                                  />
                                  Free Plan
                                </b>
                                <button  onClick={getstartedClick} className="link-btn">
            <i className="fa fa-play-circle"> </i> Get started free
    </button> 
                                <p>
                                  For individuals or small teams looking to run basic customer analytics
                                </p>
                              </div>
                            </Grid>

                            <Grid item xs={12} md={4} lg={4}>
                              <div className='grey-box-nav'>
                                <b>Compare plans & pricing</b>
                                <hr />
                                <p>
                                  Whether you’re a team 2 or 2,000,
                                  ConvertML flexible model means you only
                                  pay for what you need.
                                </p>
                                <Link className="greybtn" to='/pricing-plan'>View ConvertML pricing</Link>
                              </div>
                            </Grid>
                          </Grid>
                        </div>
                      </div>
                    </>
                  ) : (
                    <> </>
                  )}
                </li>
                <li> <span onClick={(e) => openSubmenu(e, "resources")}>Resources  <i
                  className={
                    resourcesSubmenu
                      ? "fa fa-angle-up"
                      : "fa fa-angle-down"
                  }
                >  </i>
                  <span
                    className={resourcesSubmenu ? "greyarrow" : ""}
                  ></span> </span>
                  {resourcesSubmenu ? (
                    <>
                      <div className="contanior">
                        <div className="subMenu price-plans">
                          <div className="container-home" style={{ zIndex: 10 }} >
                            <Grid
                              container
                              direction="row"
                              justifyContent="space-between"
                              alignItems="center" spacing={2}
                            >
                              <Grid item xs={12} md={4} lg={8}>
                                <Grid
                                  container
                                  direction="row"
                                  justifyContent="space-between"
                                  alignItems="top"
                                >
                                  <Grid item xs={12} md={3} lg={3}>
                                    <Link to='/help-guide/convertML-user-guide'>  <b>
                                      <img
                                        src={"/json-media/img/nav/convertMLGuide.svg"}
                                        alt="Pro"
                                      />
                                      ConvertML Guide
                                    </b>
                                      <p>
                                      Comprehensive guide, designed to enhance your understanding and utilization of ConvertML 
                                      </p></Link>
                                  </Grid>
                                  <Grid item xs={12} md={3} lg={3}>
                                    <Link to='/help-guide/typeform-integration'>  <b>
                                      <img
                                        src={"/json-media/img/nav/typeformguideicon.svg"}
                                        alt="Pro"
                                      />
                                      Typeform Guide
                                    </b>
                                      <p>
                                      Elevate survey intelligence with ConvertML's tailored analytics guide for Typeform data.
                                      </p></Link>
                                  </Grid>
                                  <Grid item xs={12} md={3} lg={3}>
                                    <Link to='/faqs'>
                                      <b>
                                        <img
                                          src={
                                            "/json-media/img/nav/helpResources.svg"
                                          }
                                          alt="proplus"
                                        />
                                        Help Resources
                                      </b>
                                      <p>
                                        Need help? Articles and FAQs to get you
                                        unstuck
                                      </p></Link>
                                  </Grid>
                                </Grid>


                              </Grid>

                              <Grid item xs={12} md={4} lg={4}>
                                <div className='grey-box-nav'>
                                  <b>Latest From ConvertML world</b> <hr />
                                  <p>
                                    You sent out a survey to 1000 customers
                                    but hardly got any responses. Now what ?
                                  </p>
                                  <Link className="greybtn" to='/blogs'>Blogs  </Link>
                                </div>
                              </Grid>
                            </Grid>
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <> </>
                  )}
                </li>
                <li>
                  <Link to="/about-us">About Us</Link>
                </li>
                <li>
                  <Link to="/integration-multiple-platforms">Integration</Link>
                </li>
              </ul>
            </div>
            {!isNav ? (
              <> </>
            ) : (<>
              <div className="top-nav-list">
                <ul>
                  <li>
                    <span onClick={(e) => openSubmenu(e, "solutions")} > Solutions  <i
                      className={
                        solutionSubmenu
                          ? "fa fa-angle-up payrentMenu"
                          : "fa fa-angle-down payrentMenu"
                      }
                    >

                    </i>
                      <span
                        className={solutionSubmenu ? "greyarrow" : ""}
                      ></span> </span>
                    {solutionSubmenu ? (
                      <>
                        <div className="payrentsubMenu">
                          <div className="subMenu">
                            <div className="container-home">
                              <b>Key Initiative </b>
                              <hr />
                              <Grid
                                container
                                direction="row" spacing={5}
                                justifyContent="space-between"
                                alignItems="center"
                              >
                                <Grid item xs={12} md={4} lg={4}>
                                  <Link to="/customer-satisfaction-analysis">

                                    <b>
                                      <img
                                        src={"/json-media/img/nav/csa.svg"}
                                        alt="test"
                                      />
                                      Customer Satisfaction Analysis
                                    </b>
                                    <p>
                                      Combine sentiments from user generated
                                      feedback and transactional systems (CRM)
                                      for truly comprehensive insights.
                                    </p>
                                  </Link>
                                </Grid>
                                <Grid item xs={12} md={4} lg={4}>
                                  <Link to="/net-promoter-score">

                                    <b>
                                      <img
                                        src={"/json-media/img/nav/npsa.svg"}
                                        alt="test"
                                      />
                                      NPS Analysis
                                    </b>
                                    <p>
                                      Stay ahead of your detractors by
                                      harnessing advanced customer insights by
                                      combining qualitative and quantitative
                                      data.
                                    </p>
                                  </Link>
                                </Grid>
                                <Grid item xs={12} md={4} lg={4}>
                                  <Link to="/churn-analysis">

                                    <b>
                                      <img
                                        src={"/json-media/img/nav/pca.svg"}
                                        alt="test"
                                      />
                                      Predictive Churn Analysis
                                    </b>
                                    <p>
                                      Combine sentiments from user generated
                                      feedback and transactional systems (CRM)
                                      for truly comprehensive insights.
                                    </p>
                                  </Link>
                                </Grid>
                              </Grid>
                              <br />
                              <b>Roles </b>
                              <hr />
                              <Grid
                                container
                                direction="row" spacing={5}
                                justifyContent="space-between"
                                alignItems="center"
                              >
                                <Grid item xs={12} md={4} lg={4}>
                                  <Link to="/solutions/roles/customer-success-software">

                                    <b>
                                      <img
                                        src={
                                          "/json-media/img/nav/customersuccess.svg"
                                        }
                                        alt="test"
                                      />
                                      Customer Success
                                    </b>
                                    <p>
                                      Lift success with NPS insights, tackle
                                      risks through Churn Analysis, and blend
                                      user feedback for a comprehensive view.
                                    </p>
                                  </Link>
                                </Grid>
                                <Grid item xs={12} md={4} lg={4}>
                                  <Link to="/solutions/roles/marketing">

                                    <b>
                                      <img
                                        src={
                                          "/json-media/img/nav/marketing.svg"
                                        }
                                        alt="test"
                                      />
                                      Marketing
                                    </b>
                                    <p>
                                      Hyper-personalize marketing effortlessly
                                      with a 360° customer view—no scripts, no
                                      codes, less data scientist reliance.
                                    </p>
                                  </Link>
                                </Grid>
                                <Grid item xs={12} md={4} lg={4}>
                                  <Link to="/solutions/roles/market-insights">

                                    <b>
                                      <img
                                        src={
                                          "/json-media/img/nav/marketingInsight.svg"
                                        }
                                        alt="test"
                                      />
                                      Market Insights
                                    </b>
                                    <p>
                                      Uncover insights by merging qualitative
                                      and quantitative data from CRMs, surveys,
                                      and social media for new opportunities.
                                    </p>
                                  </Link>
                                </Grid>
                              </Grid>
                            </div>

                          </div>
                        </div>
                      </>
                    ) : (
                      <> </>
                    )}
                  </li>
                  <li> <Link to='/pricing-plan'><span onClick={(e) => openSubmenu(e, "pricing")}>  Pricing  <i
                    className={
                      pricingSubmenu ? "fa fa-angle-up" : "fa fa-angle-down"
                    }
                  >
                  </i>
                    <span
                      className={pricingSubmenu ? "greyarrow" : ""}
                    ></span> </span></Link>
                    {pricingSubmenu ? (
                      <>
                        <div className="subMenu price-plans">
                          <div className="container-home" style={{ zIndex: 10 }} >
                            <Grid
                              container
                              direction="row"
                              justifyContent="space-between"
                              spacing={3}
                            >
                              <Grid item xs={12} md={4} lg={8}>
                                <Grid
                                  container
                                  direction="row"
                                  justifyContent="space-between"
                                  alignItems="center"
                                  spacing={3}
                                >
                                  <Grid item xs={12} md={5} lg={5}>
                                    <b>
                                      <img
                                        src={"/json-media/img/nav/basic.svg"}
                                        alt="basic"
                                      />
                                      Basic
                                    </b>
                                    <p>
                                      For individuals and teams that need quick insights into the customer base.
                                    </p>
                                  </Grid>

                                  <Grid item xs={12} md={5} lg={5}>
                                    <b>
                                      <img
                                        src={
                                          "/json-media/img/nav/enterprise.svg"
                                        }
                                        alt="Enterprise"
                                      />
                                      Enterprise
                                    </b>
                                    <p>
                                      Everything your enterprise teams need to manage multiple projects
                                    </p>
                                  </Grid>
                                </Grid>
                                <div className="freePlan-nav">
                                  <b>
                                    <img
                                      src={
                                        "/json-media/img/nav/freePlan.svg"
                                      }
                                      alt="Free Plan"
                                    />
                                    Free Plan
                                  </b>

                                  <p>
                                    For individuals or small teams looking to run basic customer analytics
                                  </p>
                                  <button  onClick={getstartedClick} className="link-btn">
            <i className="fa fa-play-circle"> </i> Get started free
    </button> 
                                </div>
                              </Grid>

                              <Grid item xs={12} md={4} lg={3}>
                                <div className='grey-box-nav'>
                                  <b>Compare plans & pricing</b>
                                  <hr />
                                  <p>
                                    Whether you’re a team 2 or 2,000,
                                    ConvertML flexible model means you only
                                    pay for what you need.
                                  </p>
                                  <Link className="greybtn" to='/pricing-plan'>View ConvertML pricing</Link>
                                </div>
                              </Grid>
                            </Grid>
                          </div>
                        </div>
                      </>
                    ) : (
                      <> </>
                    )}
                  </li>
                  <li> <span onClick={(e) => openSubmenu(e, "resources")}>Resources  <i
                    className={
                      resourcesSubmenu
                        ? "fa fa-angle-up"
                        : "fa fa-angle-down"
                    }
                  >  </i>
                    <span
                      className={resourcesSubmenu ? "greyarrow" : ""}
                    ></span> </span>
                    {resourcesSubmenu ? (
                      <>
                        <div className="contanior">
                          <div className="subMenu price-plans">
                            <div className="container-home" style={{ zIndex: 10 }} >
                              <Grid
                                container
                                direction="row"
                                justifyContent="space-between"
                                alignItems="top" spacing={2}
                              >
                                <Grid item xs={12} md={4} lg={9}>
                                  <Grid
                                    container
                                    direction="row"
                                    justifyContent="space-between"
                                    alignItems="top"
                                  >
                                    <Grid item xs={12} md={3} lg={3}>
                                      <Link to='/help-guide/convertML-user-guide'>  <b>
                                        <img
                                          src={"/json-media/img/nav/convertMLGuide.svg"}
                                          alt="Pro"
                                        />
                                        ConvertML Guide
                                      </b>
                                        <p>
                                        Comprehensive guide, designed to enhance your understanding and utilization of ConvertML 
                                        </p></Link>
                                    </Grid>
                                    <Grid item xs={12} md={3} lg={3}>
                                      <Link to='/help-guide/typeform-integration'>  <b>
                                        <img
                                          src={"/json-media/img/nav/convertMLGuide.svg"}
                                          alt="Pro"
                                        />
                                        Typeform Guide
                                      </b>
                                        <p>
                                        Elevate survey intelligence with ConvertML's tailored analytics guide for Typeform data.
                                        </p></Link>
                                    </Grid>
                                    <Grid item xs={12} md={3} lg={3}>
                                      <Link to='/faqs'>
                                        <b>
                                          <img
                                            src={
                                              "/json-media/img/nav/helpResources.svg"
                                            }
                                            alt="proplus"
                                          />
                                          Help Resources
                                        </b>
                                        <p>
                                          Need help? Articles and FAQs to get you
                                          unstuck
                                        </p></Link>
                                    </Grid>
                                  </Grid>


                                </Grid>

                                <Grid item xs={12} md={4} lg={3}>
                                  <div className='grey-box-nav'>
                                    <b>Latest From ConvertML world</b> <hr />
                                    <p>
                                      You sent out a survey to 1000 customers
                                      but hardly got any responses. Now what ?
                                    </p>
                                    <Link className="greybtn" to='/blogs'>Blogs  </Link>
                                  </div>
                                </Grid>
                              </Grid>
                            </div>
                          </div>
                        </div>
                      </>
                    ) : (
                      <> </>
                    )}
                  </li>
                  <li>
                    <Link to="/about-us">About Us</Link>
                  </li>
                  <li>
                  <Link to="/integration-multiple-platforms">Integration</Link>
                </li>
                  <li>
                  <Box display="flex">
              {session.token ? (<>
              <Link to={"/dashboard/data-platform/project-management"} className="link-btn btn-small mr-2 w150 text-center"> Projects</Link></>) : <>   <Link to="/login" className="link-btn btn-small w150 text-center"> Sign In </Link></>}
                  <HeaderButtons />
                  {
                    session.token != undefined &&
                    <HeaderUserbox />
                  }
                </Box>
                  </li>
                </ul>
              </div>
            </>
            )}
          </Grid>
          <Grid item xs={12} md={3} lg={3}>
            <div className="right-button-section">
              <div className="float-right">
                <Box display="flex">
              {session.token ? (<><Link to={"/dashboard/data-platform/project-management"} className="link-btn btn-small mr-2"> Projects</Link></>) : <>   <Link to="/login" className="link-btn btn-small"> Sign In </Link></>}
                  <HeaderButtons />
                  {
                    session.token != undefined &&
                    <HeaderUserbox />
                  }
                </Box>
              </div>
            </div>
          </Grid>
        </Grid>
      </nav>

      {/* {modal ? <VideoModal toggleModal={toggleModal} /> : null} */}
      {/* DESKTOP NAVBAR */}

      {/* <nav className="bg-white shadow-md-temp  top-nav  xl:block fixed top-navbar"> 
        <div className="container-full pl-3  pr-3 flex justify-between items-center text-md font-semibold text-black h-20">
          <Link to="/">
            <LazyLoadImage
              className="logo"
              src={"/images/convertmlLogo.png"}
            />
          </Link>
          <button onClick={handleClick} className='menuicons'></button>

          {/* 👇️ show elements on click /}
          <div className="menu-list">
            <Link
              to="/"
              id="navLink-product"
              className="hover:text-pink hover:font-bold cursor-pointer hover:border-b-2 p-2 m-1"
              onMouseEnter={() => handleMouseEnter("product")}
              onMouseLeave={() => closeModal()}
            >
              Product
            </Link> 
            
            <Link
              to="/customers"
              className="hover:text-pink cursor-pointer hover:font-bold hover:border-b-2 p-3 p-2 m-1"
              onMouseEnter={() => handleMouseEnter(null)}
              onMouseLeave={() => closeModal()}
            >
              Customers
            </Link>
            <Link
              to="/"
              id="navLink-product"
              className="hover:text-pink hover:font-bold cursor-pointer hover:border-b-2 p-2 m-1"
              onMouseEnter={() => handleMouseEnter("solution")}
              onMouseLeave={() => closeModal()}
            >
              Solutions
            </Link>
            <Link
              to="/pricing"
              className="hover:text-pink cursor-pointer hover:font-bold hover:border-b-2 p-3 p-2 m-1"
              onMouseEnter={() => handleMouseEnter(null)}
              onMouseLeave={() => closeModal()}
            >
              Pricing
            </Link>
            <Link
              to="/"
              className="hover:text-pink cursor-pointer hover:font-bold hover:border-b-2 p-3 p-2 m-1"
              onMouseEnter={() => handleMouseEnter("company")}
              onMouseLeave={() => closeModal()}
            >
              Company
            </Link>
            {/* <Link
              to="/"
              className="hover:text-pink cursor-pointer hover:font-bold hover:border-b-2 p-3 p-2 m-1"
              onMouseEnter={() => handleMouseEnter("technology")}
              onMouseLeave={() => closeModal()}
            >
              Technology
            </Link>  /}
          </div>

          <div style={{ display: isShown ? 'none' : 'block' }} className="menu-list">
            <Link
              to="/"
              id="navLink-product"
              className="hover:text-pink hover:font-bold cursor-pointer hover:border-b-2 p-2 m-1"
              onMouseEnter={() => handleMouseEnter("product")}
              onMouseLeave={() => closeModal()}
            >
              Product
            </Link>
            <Link
              to="/customers"
              className="hover:text-pink cursor-pointer hover:font-bold hover:border-b-2 p-3 p-2 m-1"
              onMouseEnter={() => handleMouseEnter(null)}
              onMouseLeave={() => closeModal()}
            >
              Customers
            </Link>
            <Link
              to="/pricing"
              className="hover:text-pink cursor-pointer hover:font-bold hover:border-b-2 p-3 p-2 m-1"
              onMouseEnter={() => handleMouseEnter(null)}
              onMouseLeave={() => closeModal()}
            >
              Pricing
            </Link>
            <Link
              to="/"
              className="hover:text-pink cursor-pointer hover:font-bold hover:border-b-2 p-3 p-2 m-1"
              onMouseEnter={() => handleMouseEnter("company")}
              onMouseLeave={() => closeModal()}
            >
              Company
            </Link>
            {/* <Link
              to="/"
              className="hover:text-pink cursor-pointer hover:font-bold hover:border-b-2 p-3 p-2 m-1"
              onMouseEnter={() => handleMouseEnter("technology")}
              onMouseLeave={() => closeModal()}
            >
              Technology
            </Link>  /}
          </div>


          {/* 👇️ show component on click */}
      {/* {isShown && <Box />} */}

      {/* --  /}

          <div>
            <Link to="/login" className='outline-btn mr-3'>Sign In </Link>
            <Link to="/" className='link-btn' >View Demo</Link>
            {/* <LanguageSwitcher />
            <Link to="/login">Login</Link>
            <Link 
              to="/signup"
              className="signup-btn bg-pink rounded-full text-white"
            >
              Free Account
            </Link> /}
          </div>
        </div>
        <div>
          {activeComponentName === "product" ? (
            <ProductModal
              toggleModal={toggleModal}
              handleMouseEnter={handleMouseEnter}
              closeModal={closeModal}
            />
          ) : null}

{activeComponentName === "solution" ? (
            <SolutionModal
              toggleModal={toggleModal}
              handleMouseEnter={handleMouseEnter}
              closeModal={closeModal}
            />
          ) : null}



          {activeComponentName === "company" ? (
            <CompanyModal
              handleMouseEnter={handleMouseEnter}
              closeModal={closeModal}
            />
          ) : null}
          {activeComponentName === "technology" ? (
            <TechnologyModal
              handleMouseEnter={handleMouseEnter}
              closeModal={closeModal}
            />
          ) : null}
        </div>
      </nav>  /}
      <br/>
      {/* MOBILE NAVBAR */}
      {/* <nav className="flex xl:hidden fixed shadow-md z-20 w-screen  justify-between items-center bg-white px-5">
        <Link to="/">
          <LazyLoadImage
            className="w-44 my-4"
            src={"/images/convertmlLogo.png"}
          />
        </Link>
        {menuClosed ? (
          <MenuIcon
            fontSize="large"
            className="cursor-pointer"
            onClick={() => setMenuClosed(!menuClosed)}
          />
        ) : (
          <CloseIcon
            fontSize="large"
            className="cursor-pointer"
            onClick={() => setMenuClosed(!menuClosed)}
          />
        )}
        <div
          className={
            menuClosed
              ? "hidden "
              : "flex absolute h-screen top-full left-0 right-0 bottom-0 z-10 bg-lightGray flex-col pt-10 items-center text-lg px-5 space-y-10 font-medium"
          }
        >
          <div className="cursor-pointer" onClick={() => setMenuClosed(true)}>
            Products
          </div>
          <div className="cursor-pointer" onClick={() => setMenuClosed(true)}>
            <Link to="/customers">Customers</Link>
          </div>
          <div className="cursor-pointer" onClick={() => setMenuClosed(true)}>
            <Link to="/pricing">Pricing</Link>
          </div>
          <div className="cursor-pointer" onClick={() => setMenuClosed(true)}>
            Company
          </div>
          <div className="cursor-pointer" onClick={() => setMenuClosed(true)}>
            Technology
          </div>
          <div className="cursor-pointer w-full flex justify-center items-center font-semibold gap-2">
            <div className="py-1 w-1/4 text-center min-w-max px-4 rounded-full border-2 border-pink">
              <LanguageSwitcher />
            </div>
            <div className="py-1 w-1/4 text-center min-w-max px-4 rounded-full border-2 border-pink">
              <Link to="/login">Login</Link>
            </div>
            <div className="py-1 w-1/4 min-w-max px-4 text-center bg-pink rounded-full text-white">
              <Link to="/signup">Free Account</Link>
            </div>
          </div>
        </div>
      </nav> */}
    </>
  );
};

export default Navbar;
