import React, { useState, useEffect } from "react";
import HeroSection from "../../../components/HeroSection";
import NavigationLinkSection from "../../../components/NavigationLinkSection";
import ConvertMLMarketingSection from "../../../components/ConvertMLMarketingSection";
import ConvertMLretainAndGrow from "../../../components/ConvertMLretainAndGrow";
import Footer from "../../../components/Footer";
import Navbar from "../../../components/molecules/Navbar";
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
 
import bannerImge from "../../../assets/img/blogbanner.png";
import HomeFooter from "../../../components/home-footer"; 
import aboutus from "../../../assets/img/aboutus.png";
import { blogListData} from "../../../assets/data/blog";
import { Helmet } from "react-helmet";
import { blogLandingPage } from "../../../assets/data/metadata-list";

function Blogs() {   
  useEffect(() => { }, []); 
  const blogList= blogListData
  const navigate = useNavigate();
  const getstartedClick = () => navigate('/signup');
  return (
    <> 
      <Helmet> 
        <title>{blogLandingPage.title}  </title>
        <meta name="description" content={blogLandingPage.description } data-react-helmet="true" />
        <meta name="keywords"  content={blogLandingPage.keywords} />
        <meta property="image" content={blogLandingPage.image} />
        <meta property="url" content={blogLandingPage.url} />
        <meta property="publisher" content={blogLandingPage.publisher} />
        <meta property="author " content={blogLandingPage.author} />
        <meta property="site_name" content={blogLandingPage.site_name} />
        <meta property="locale" content={blogLandingPage.locale} />
        <meta property="type" content={blogLandingPage.type}/>
        <link rel="canonical" href={blogLandingPage.canonical} />
      </Helmet>

      <Navbar />
      {/* ------------------- banner   ------------------- */}
      <div className="blog-banner">
        <section className="container-home text-center"> <br/> 
        <h1 className="m-0" style={{fontSize:'40px'}}> Stay Curious  </h1> 
        <h2 className="d-none">ConvertML Blogs Landing Pages</h2>
        <h3 style={{color:'#E947AD', fontSize:'60px'}}>ConvertML<br/> <b>Blogs</b></h3> 
      
         
          <br />
          <button  onClick={getstartedClick} className="link-btn">
            <i className="fa fa-play-circle"> </i> Get Started  
    </button> <br/>
          <img src={bannerImge} alt="churn Analysis" className="bannerimg"  />
        </section>
      </div>
      {/* ------------------- banner   ------------------- */}
      <div className="container-home postbloglist">  
          <div className="text-center">
            <h2>Our Post</h2> 
          </div>  
          <Grid
            container
            spacing={2}
            direction="row"
            justifyContent="left"
            alignItems="center"
          >
           {blogList.map((blog) => (
              <Grid item xs={12} md={4} lg={4}>
               <Link to={blog.path} >   
               <div  className="blogBox">  
                        <div className="imgbox">
                        <img src={'/json-media/img/blogs/'+blog.thumbnail+'.png'} alt={blog.thumbnail} />  
                        </div>
                        <div className="clearfix"></div>
                        <span className="name">{blog.name}</span>
                        <Link to={blog.path} className='readmore'>  Read more </Link>
                      
                </div>  </Link> 
              </Grid>
            ))} 
          </Grid>  
        <br />
      </div>
      <br />
      <br />
      <HomeFooter /> 
    </>
  );
}

export default Blogs;
