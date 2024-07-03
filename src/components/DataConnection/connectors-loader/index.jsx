import {
  Box,
  Card,
  Container,
  Link,
  Typography,
  styled,
  Grid,
} from "@mui/material";
import { useTranslation } from "react-i18next";

import connectionloaderimg1 from "../../../assets/img/connection-loader-img1.png";
import connectionloaderimg2 from "../../../assets/img/connection-loader-img2.png";
import { useEffect } from "react";

function ConnectorsLoader({ processListStatus }) {
  const { t } = useTranslation();

  useEffect(async () => {
  console.log("MMMMM",processListStatus)
  }, [processListStatus]);


  return (
    <section className="connectorsLoader">
      <div className="loader-container"> 
        <Grid container spacing={2} direction="row"  >
          <Grid xs={3} md={3}>
             <img src={connectionloaderimg1} alt="Your Competitive Advantage" className="banner-img" />  
          </Grid>
          <Grid xs={3} md={6}>
            <div style={{marginLeft:'40px', marginTop:'140px'}}> 
            <Grid
              container
              spacing={2}
              direction="row"
              justifyContent="center"
              alignItems="center"
            >
              <Grid xs={10} md={10}> 
              <div className="text-center">
              <img
                  src={"/json-media/img/convertmlLogo.png"}
                  alt="Your Competitive Advantage"
                  width={250}
                />
                <br /> <br />
                Enables you to integrate diverse data sources with a few simple
                clicks.
              </div>
                
               
              </Grid>
              <Grid xs={10} md={10}> 
              <br /> <br />
                <Grid
              container
              spacing={3}
              direction="row" 
            > 
              
              {/* <Grid xs={6} md={6}>
              <i className={'fa fa-check-circle mr-1 float-left'}></i>   <span className="name">dddddddddddddd dsd  sddeferr</span>  <br/>
                    </Grid> */}
                    
           {processListStatus.map((dataLabel, index) => {
                  return (
                    <Grid xs={6} md={6}>
                      <i className={dataLabel.progress=="True"?"fa fa-check-circle processListsucess mr-1 float-left":"fa fa-check-circle mr-1 float-left"}></i>  <span className="name">{dataLabel.message}</span>  <br/>
                    </Grid>
                  );
                })}    
              
              {/* <Grid xs={6} md={6}>
              <i className="fa fa-check-circle"></i>  Connectors Done
              </Grid>
              <Grid xs={6} md={6}>
              <i className="fa fa-check-circle"></i> Connectors Done
              </Grid>
              <Grid xs={6} md={6}>
              <i className="fa fa-check-circle"></i>  Connectors Done
              </Grid> */}
            </Grid>
                <br /> <br />
              </Grid>
              </Grid>
             
            </div>
            
          </Grid>
          <Grid xs={3} md={3}>
            <img src={connectionloaderimg2}  alt='convertml' className="banner-img"  />  
          </Grid>
        </Grid> 
      </div>
    </section>
  );
}

export default ConnectorsLoader;
