import React from "react";
import { Link } from "react-router-dom";

import { LazyLoadImage } from "react-lazy-load-image-component";
import { Button, Grid } from "@mui/material";

function NavbarAuth() {
  return (
    <nav className="top-navbar">
        <Grid
           container
           direction="row"
           justifyContent="space-between"
           alignItems="center"
        >
          <Grid item xs={12} md={3} lg={3}>
            <Link to="https://convertml.ai/">
              <LazyLoadImage
                className="logo"
                src={"/images/convertmlLogo.png"}
                alt='cml'
              />
            </Link>
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
             
          </Grid>
          <Grid item xs={12} md={3} lg={3}> 
          <div className="float-right">
            <Link to="/login" className="mr-3">
              Sign In{" "}
            </Link>
            <Link to="/" className="link-btn ">
              View Demo
            </Link>
            </div>
          </Grid>
        </Grid>
      </nav>
  );
}

export default NavbarAuth;
