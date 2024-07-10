import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Grid,
  Stack,
} from "@mui/material";
import "../styles/heroSection.css";

import silder1 from "../assets/img/home-pagebanner/startingimg1.webp";
import silder2 from "../assets/img/home-pagebanner/startingimg2.webp";
import { useNavigate } from "react-router-dom";

import Carousel from "./Carousel.js";
import { Box } from "@mui/system";

function HeroSection() {
  const [openVideo, setOpenVideo] = useState(false);

  const [scroll, setScroll] = React.useState("paper");
  const closeOpenVideo = () => {
    setOpenVideo(false);
  };

  const items = [
    { id: 1, name: silder1, link: "pizza-begin.co.il" },
    { id: 2, name: silder2, link: "mia-luz.com" },
  ];
  const navigate = useNavigate();
  const handleClick = () => navigate("/signup");

  return (
    <div className="new-banner">
      <section className="container-home text-center">
        <div className="h1-heading">
          The Ultimate Customer{" "}
          <b>
            <br /> Insights  Platform
          </b>
        </div>
        <p>
          ConvertML is a predictive customer insights platform specifically
          designed to predict customer behavior for fast growing companies.
        </p>
        <Carousel
          showArrows={false}
          showThumbs={false}
          autoPlay={true}
          dynamicHeight={false}
          infiniteLoop={true}
          interval={3000}
        >
          {items.map((item, i) => (
            <>
              <img src={item.name} alt={item.name} />
            </>
          ))}
        </Carousel>{" "}
        <br />
        <div className="survey-list-home">
          <Box sx={{ flexGrow: 1 }}>
            <Grid
              container
              spacing={2}
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Grid item xs={6} md={2} lg={2}>
                <input type='checkbox' className="float-left" name="marketResearch" />
                <div class="icons icon-Market-Research-Analysis fa-3x"></div>{" "}
                <h4>Market Research</h4>{" "}
              </Grid>
              <Grid item xs={6} md={2} lg={2}>
                <input type='checkbox' className="float-left" name="customerSatisfaction" />
                <div class="icons icon-Customer-Satisfaction fa-3x"></div>{" "}
                <h4>Customer Satisfaction</h4>{" "}
              </Grid>
              <Grid item xs={6} md={2} lg={2}>
              <input type='checkbox' className="float-left" name="brandLoyalty" />
                <div class="icons icon-Brand-Loyalty fa-3x"></div> 
                <h4>
                  Brand
                  <br /> Loyalty{" "}
                </h4>{" "}
              </Grid>
              <Grid item xs={6} md={2} lg={2}>
              <input type='checkbox' className="float-left" name="netPromoterScore" />
                <div class="icons icon-Net-Promoter-Score fa-3x"></div>{" "}
                <h4>Net Promoter Score</h4>{" "}
              </Grid>
              <Grid item xs={6} md={2} lg={2}>
              <input type='checkbox' className="float-left" name="churnPrediction" />
                <div class="icons icon-Churn-Prediction fa-3x"></div>{" "}
                <h4>Churn Prediction</h4>{" "}
              </Grid>
            </Grid>
          </Box>
        </div>
        <br/>
        <div className="banneraction-button"> 
            <button onClick={handleClick}    color="primary"
                  variant="contained" className="btn1">
              <b> Book Demo</b>
            </button>
            {/* <button    color="primary"
                  variant="outlined" onClick={(e) =>  setOpenVideo(true)} className="btn2">
              <b> Watch demo</b>
            </button>  */}
        </div>
      </section>

      {/* ----------------- Demo -----------------  */}
      <Dialog
        open={openVideo}
        onClose={closeOpenVideo}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        minWidth="full"
        maxWidth="full"
      >
        <DialogContent dividers={scroll === "paper"}>
          <DialogContentText id="alert-dialog-description">
            <iframe
              width="1600"
              height="750"
              src="https://app.storylane.io/share/phd5kqcsjogo"
              frameborder="0"
              allow="autoplay; encrypted-media"
              allowfullscreen
            ></iframe>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeOpenVideo}>Cancel</Button>
        </DialogActions>
      </Dialog>
      {/* ----------------- Demo -----------------  */}

      {/* <Dialog open={openVideo} onClose={closeOpenVideo} fullWidth maxWidth="lg"> 
        <DialogContent sx={{ mb: 2 }}>
          <video controls autoPlay>
            <source src="/videos/ConvertML.m4v" type="video/mp4" />
          </video>
        </DialogContent>
      </Dialog> */}
    </div>
  );
}

export default HeroSection;
