import React, { useState } from "react";
import { Dialog, DialogContent,} from "@mui/material";
import "../styles/heroSection.css"; 

import silder1 from "../assets/img/home-pagebanner/startingimg1.webp";
import silder2 from "../assets/img/home-pagebanner/startingimg2.webp";
import { useNavigate } from 'react-router-dom';

 
import Carousel from "./Carousel.js";

function HeroSection() {
  const [openVideo, setOpenVideo] = useState(false);

  const closeOpenVideo = () => {
    setOpenVideo(false);
  };

  const items = [
    {id:1, name: silder1, link: 'pizza-begin.co.il' },
    {id:2, name: silder2, link: 'mia-luz.com' }  
  ];
  const navigate = useNavigate();
  const handleClick = () => navigate('/signup');

  return (
    <div className="new-banner">
      <section className="container-home text-center">  
        <div className="h1-heading">
          The Ultimate  Customer <b><br/> Insights  Platform</b>
        </div>  
        <p>
              ConvertML is a predictive customer insights platform specifically
              designed to predict customer behavior for fast growing companies.
            </p> <br /> 
            <button  onClick={handleClick} className="link-btn">
            <i className="fa fa-play-circle"> </i> Get started
    </button>  
        <Carousel showArrows={false} showThumbs={false} autoPlay={true} dynamicHeight={false} infiniteLoop={true} interval={3000}>
        {items.map((item, i) => (
          <>
            <img src={item.name} alt={item.name} />
          </>
        ))}
      </Carousel>   
      </section>    
      <Dialog open={openVideo} onClose={closeOpenVideo} fullWidth maxWidth="lg"> 
        <DialogContent sx={{ mb: 2 }}>
          <video controls autoPlay>
            <source src="/videos/ConvertML.m4v" type="video/mp4" />
          </video>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default HeroSection;
