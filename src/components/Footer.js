import React from "react";
import PhoneCallbackIcon from "@mui/icons-material/PhoneCallback";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import {
  FaFacebookSquare,
  FaInstagramSquare,
  FaLinkedin,
  FaTwitterSquare,
  FaYoutubeSquare,
} from "react-icons/fa";
import "./Footer.scss";
import pdf from "./Privacy Policy-ConvertML (1).pdf";

import footerBanner from "../assets/img/footer-banner.png"; 
import { Button, Container, Grid } from "@mui/material";

function Footer() {
  return (
    <div className="footerContainer-new" id="getStarted">
      <div className="container-home">  
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
                  target="_blank"   rel="noopener noreferrer"  
                > 
                  <img src={"/images/linkden.png"} alt="linkden convertml" />
                  <a />
                </a>
                <a
                  href="https://www.facebook.com/profile.php?id=100086044424562"
                  target="_blank"   rel="noopener noreferrer"  className="ml-3 mr-3"
                > 
                  <img src={"/images/fbicon.png"} alt="fbicon convertml" />
                </a>

                <a href="#" target="_blank"     rel="noopener noreferrer" > 
                  <img src={"/images/twitter.png"} alt="twitter convertml" />
                </a>

                <a
                  href="https://instagram.com/convertml.ai?igshid=YmMyMTA2M2Y="
                  target="_blank" rel="noopener noreferrer" className="ml-3 mr-3"
                > 
                  <img src={"/images/instagram.png"} alt="instagram convertml" />
                </a>

                <a href="" target="_blank" rel="noopener noreferrer"  > 
                  <img src={"/images/youtube.png"} alt="youtube convertml" />
                </a>
              </div>
            </Grid>
            <Grid xs={12} md={3}>
              <h4>Pages</h4>
              <a>Home page</a> <br />
              <br />
              <a>Contact Us</a>
            </Grid>
            <Grid xs={12} md={3}>
              <h4>Contact</h4>
              <div className="pb-3 headContent" id="fontColor">
              <img src={"/images/phone.png"} alt="phone convertml" className="float-left mr-3" />
               <a> +17084154811</a>
              </div>  <br />
              <div className="headContent" id="fontColor">
              <img src={"/images/email.png"} alt="email convertml"  className="float-left mr-3" />
              <a href='mailto:support@convertml.ai'> support@convertml.ai</a>
              </div>
            </Grid>
            <Grid xs={12} md={3}>
              <h4>Subscribe Now</h4>
              <from className='subscribeform'>
                <input type="text" value="" placeholder="Enter your email" />
                <input type="button" value="Subscribe" />
              </from>
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
              © Copyright 2024. ConvertML All Right Reserved
            </Grid>
            <Grid xs={12} md={6} className='text-right'>
              <a>Legal</a> | <a>Privacy and Service terms documents</a>
            </Grid>
          </Grid>
        </div>
      </div>
     
    </div>
  );
}

export default Footer;
