import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import NavbarHomepage from "../components/NavbarAuth";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import { Grid } from "@mui/material"; 
import { Helmet } from "react-helmet";
import { fotgotPasswordMeta } from "../assets/data/metadata-list";


const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function ForgetPassword() {
  const navigate = useNavigate();

  const [successOpen, setSuccessOpen] = useState(false);
  const [failureOpen, setFailureOpen] = useState(false);
  
  const [activeButton, setactiveButton] = useState(true);
  

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSuccessOpen(false);
    setFailureOpen(false);
  };

  const [companyEmail, setCompanyEmail] = useState("");

  const [validateEmail, setValidateEmail] = useState("");

  useEffect(() => {}, [navigate]);

  const buttonactive=(value,event)=>{ 
    const isEmailValid = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value); // use any validator you want  
    if(isEmailValid){ 
      setactiveButton(false) 
     }
     else{
      setactiveButton(true) 
     }
     
  }

  const forgotPassword = async (e) => {
    e.preventDefault();

    // navigate('/forgot-password-success');

    setValidateEmail("");

    if (companyEmail.length === 0) {
      setValidateEmail("Required field*");
    } else if (
      companyEmail.indexOf("@gmail.com") !== -1 ||
      companyEmail.indexOf("@yahoo.com") !== -1 ||
      companyEmail.indexOf("@hotmail.com") !== -1 ||
      companyEmail.indexOf("@outlook.com") !== -1
    ) {
      setValidateEmail("Enter work email, e.g. name@company.com*");
    } else if (
      companyEmail.indexOf("@") === -1 ||
      companyEmail.indexOf(".") === -1
    ) {
      setValidateEmail("Enter work email, e.g. name@company.com*");
    } else {
      await fetch(process.env.REACT_APP_API_URL + "/password/forgot", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          company_email: companyEmail,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.status === "success") {
            setCompanyEmail("");
            setSuccessOpen(true);
          } else {
            setFailureOpen(true);
          }
        });
    }
  };

  return (
    <>
    <h1 className="d-none"> Convertml forgotPassword</h1>
                    <h2 className="d-none"> Convertml User Not forgot Password</h2>
      <Helmet> 
        <title>{fotgotPasswordMeta.title}  </title>
        <meta name="og:description" content={fotgotPasswordMeta.description } data-react-helmet="true" />
        <meta name="keywords"  content={fotgotPasswordMeta.keywords} data-react-helmet="true"/> 
        <meta property="og:title" content={fotgotPasswordMeta.title } data-react-helmet="true" />
        <meta property="og:image" content={fotgotPasswordMeta.image} data-react-helmet="true"/>
        <meta property="og:url" content={fotgotPasswordMeta.url} data-react-helmet="true"/>
        <meta property="og:publisher" content={fotgotPasswordMeta.publisher} data-react-helmet="true"/>
        <meta property="og:author " content={fotgotPasswordMeta.author} data-react-helmet="true" />
        <meta property="og:site_name" content={fotgotPasswordMeta.site_name} data-react-helmet="true" />
        <meta property="og:locale" content={fotgotPasswordMeta.locale} data-react-helmet="true" />
        <meta property="og:type" content={fotgotPasswordMeta.type} data-react-helmet="true"/>
        <link rel="canonical" href={fotgotPasswordMeta.canonical} data-react-helmet="true" />
      </Helmet>
      <div className="loginPage container-fluid">
        <Grid container spacing={2} justifyContent="center" alignItems="center">
          <Grid item xs={12} lg={3} sm={12}>
            <div className="text-center">
              <Link to="/">
                <img className=" logo"  src={"/images/convertmlLogo.png"}  alt='convertml' />
              </Link>
            </div>
            <div className="mt-4">
              <br />
            </div>
            <h3> Forgot Password</h3>
            <p>
            Enter your email ID to receive a link for password reset.
            </p><br/>
            <Snackbar
             anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}
              open={successOpen}
              autoHideDuration={6000}
              onClose={handleClose}
            >
              <Alert
                onClose={handleClose}
                severity="success"
                sx={{ width: "100%" }}
              >
                Reset Link Sent, Check your Email!
              </Alert>
            </Snackbar>
            <Snackbar
              open={failureOpen}
              autoHideDuration={6000}
              onClose={handleClose}
            >
              <Alert
                onClose={handleClose}
                severity="error"
                sx={{ width: "100%" }}
              >
                Email is not registered, please sign up
              </Alert>
            </Snackbar>
            {/* <AccountCircleIcon
            style={{ color: "#790191", fontSize: "3rem" }}
            fontSize="large"
          /> */}
            {/* <div className="flex flex-col items-center justify-top gap-2 py-10 px-5">
            <Link className="flex items-center justify-center" to="/">
              <img
                className="w-44 my-4 text-center mx-auto"
                src={"/images/convertmlLogo.png"}
              />
            </Link>
          </div> */}

            <form autoComplete="off" noValidate onSubmit={forgotPassword}>
              <TextField
                required
                autoFocus
                className="inputBox"
                id="outlined-required"
                label="Work email"
                type="email"
                placeholder="Work email"
                onChange={(e) => {
                  setCompanyEmail(e.target.value)  
                  buttonactive(e.target.value)
                }}  
                value={companyEmail}
                
              />
              <br />
              <div className="mt-2 text-xs font-medium text-validation">
                {validateEmail}
              </div>
              <div className="mt-4"> </div>
              <Button
                className="w-full"
                variant="contained"
                type="submit"
                size="large"
                disabled={activeButton}
              >
                Send  
              </Button>
              <br /><br />
              <div className="text-center tracking-tight text-sm md:text-md">
                <span className="text-primary-light text-primary-light-font">
                  Return to &nbsp;
                  <Link to="/login" className="text-primary underline">
                    <u>Sign In</u>
                  </Link>
                </span>
              </div>
            </form>
          </Grid>
          <Grid item xs={12} lg={1} sm={12}></Grid>
          <Grid item xs={12} lg={7} sm={12}>
              <div className="bg-sidebar right-sidebar">
                <div className="pt-3 our-partners-logo">
                  <img
                    src={"/images/authImage.png"}
                    alt='convertml' 
                    className="img-sidebar"
                  />
                   {/* <div>
                    <br />
                    ConvertML - the ultimate customer retention platform.
                    Convert leads with AI powered insights and engagement in
                    minutes.
                  </div> 
                  <br />
                  <br />*/}

                  <div className="mt-1">
                    <div className="text-center">   <h3>Our Partners</h3>   
                    <Grid container
                      direction="row"
                      justifyContent="center"
                      alignItems="center" spacing={2}>
                    <Grid item xs={12} lg={9} sm={12}>
                    <Grid container
                      direction="row"
                      justifyContent="center"
                      alignItems="center" spacing={2}>
                      <Grid xs={6} lg={4} sm={4}>
                        <img
                          src={"/images/partners/typeform.svg"}
                          alt='convertml' 

                        />
                      </Grid>
                      <Grid xs={6} lg={4} sm={4}>
                        <img
                          src={"/images/partners/salesforce.svg"}
                          alt='convertml' 

                        />
                      </Grid>
                      <Grid xs={6} lg={4} sm={4}>
                      <img
                          src={"/images/partners/couchdb.svg"}
                          alt='convertml' 

                        />
                      </Grid>
                      </Grid>
                      <Grid container
                      direction="row"
                      justifyContent="space-around"
                      alignItems="center" spacing={2}>
                          <Grid xs={6} lg={3} sm={3}>
                      <img
                          src={"/images/partners/hubspot.svg"}
                          alt='convertml' 

                        />
                      </Grid>
                      <Grid xs={6} lg={3} sm={3}>
                        <img
                          src={"/images/partners/google-bigquery.svg"}
                          alt='convertml' 
                        />
                      </Grid> 
                    </Grid>
                    </Grid>  </Grid> </div>  
                  </div>
                </div>
              </div>
            </Grid>
        </Grid>
      </div>
    </>
  );
}

export default ForgetPassword;
