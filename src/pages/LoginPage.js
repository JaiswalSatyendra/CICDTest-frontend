import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate, Navigate } from "react-router-dom";
import NavbarHomepage from "../components/NavbarAuth";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { SessionContext } from "../contexts/SessionContext";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import "../assets/scss/style.scss";
import Cookies from "js-cookie";

import { useDispatch, useSelector } from "../store";
import { Grid } from "@mui/material";
import axios from "axios";
import { Helmet } from "react-helmet";
// import {
//   getEvents1
// } from "../slices/get_user_img";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function LoginPage() {
  const navigate = useNavigate();
  const [session, login] = useContext(SessionContext);

  const [activeButton, setactiveButton] = useState(true);

  const [successOpen, setSuccessOpen] = useState(false);
  const [failureOpen, setFailureOpen] = useState(false);

  const [emailVefirficationsuccessOpen, setEmailVefirficationsuccessOpen] = useState("");

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSuccessOpen(false);
    setFailureOpen(false);
  };

  const [companyEmail, setCompanyEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  const [validateEmail, setValidateEmail] = useState("");
  const [validatePassword, setValidatePassword] = useState("");

  const [validateEmailPattern, setValidateEmailPattern] = useState(
    /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g
  );

  const dispatch = useDispatch();

  const [failureMessage, setFailureMessage] = useState("");
  useEffect(() => {
    let search = window.location.search;
    let params = new URLSearchParams(search);
    let newToken = params.get("activateLoginToken");
    if (newToken != null) {
      Cookies.remove("token", { path: "", domain: "convertml.ai" });
      axios
        .post(process.env.REACT_APP_API_URL + "/auth/verifyfirsttime", {
          token:newToken,
        })
        .then((res) => {
          if(res.data.isLoggedIn){
            setEmailVefirficationsuccessOpen("Email successfully verified");
            setSuccessOpen(true)
          }else{
            setSuccessOpen(false)
            setEmailVefirficationsuccessOpen("");
          }
        })
        .catch((err) => {
          console.log("Incorrect URL");
        });
    }
    if (
      localStorage.getItem("loginData") != null &&
      localStorage.getItem("loginData") != undefined
    )
     {
      const res = JSON.parse(localStorage.getItem("loginData")); 

      setCompanyEmail(res.email);
      setPassword(res.password);
      buttonactive(res.email);  
    } 
    
  }, [navigate]);

  const buttonactive=(value,event)=>{ 
    console.log(value)
    const isEmailValid = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value); // use any validator you want  
    if(isEmailValid){ 
      setactiveButton(false) 
     }
     else{
      setactiveButton(true) 
     }
     
  }
  
  const handleRemember = () => {
    setRemember(!remember);
    console.log(!remember);
  };



  const submitForm = async (e) => {
    e.preventDefault();
    if (companyEmail.length === 0) {
      setValidateEmail("Required field");
      setValidatePassword("");
    } else if (password.length === 0) {
      setValidatePassword("Required field");
      setValidateEmail("");
    } else {
      if (remember) {
        const localData = localStorage.setItem(
          "loginData",
          JSON.stringify({ email: companyEmail, password: password })
        );
      }

      setEmailVefirficationsuccessOpen("");
      setValidatePassword("");
      setCompanyEmail("");
      setPassword("");

      const res = await login({
        email: companyEmail,
        password: password,
      });

      if (res.isLoggedIn === true) {
        setSuccessOpen(true);
        // dispatch(getEvents1());
        // navigate("/dashboard");
        navigate("/dashboard/data-platform/project-management");
        localStorage.setItem("selectedProjectName", "");
        localStorage.setItem("selectedProjectId", "");
      } 
      else {
        // setFailureMessage(res.message);
        // setFailureOpen(true);
        if (res.error == "emailError") {
          setValidateEmail(res.message);
          setValidatePassword("");
        } else {
          setValidatePassword(res.message);
          setValidateEmail("");
        }
      }
    }
  };

  return (
    <>
     <Helmet>  
     <title>{'ConvertML: AI Driven Customer Insights Platform | Code-Free'}</title>
     <meta name="description" content={"Get holistic customer insights seamlessly with the ultimate customer insights platform! Merge diverse data sets like Survey & CRM Data to gain comprehensive customer insights. 100+ pre-built connectors and multiple survey and behavioral analytical models."} data-react-helmet="true" />
      <meta name="keywords" content={"Customer Insights platform, Customer Behaviour Insights, predictive customer insights platform"} /> 
        <meta property="image" content="url_to_image"/>
        <meta property="url" content="https://convertml.ai/login" />
        <meta property="publisher" content={"ConvertML"} />
        <meta property="author " content={"ConvertML"} />
        <meta property="site_name" content={"ConvertML"} />
        <meta property="locale" content={"en_US"} />
        <meta property="type" content={"insights"} />  
        <link rel="canonical" href="https://convertml.ai/login"/>
      </Helmet> 
        <div className="loginPage container-fluid">
          {/* <NavbarHomepage /> */}
          <Grid
            container
            spacing={2}
            justifyContent="center"
            alignItems="center"
          >
            <Grid item xs={12} lg={3} sm={12}>
              <div className="loginSection">
                <Snackbar
                  open={successOpen}
                  autoHideDuration={6000}
                  onClose={handleClose}
                >
                  <Alert
                    onClose={handleClose}
                    severity="success"
                    sx={{ width: "100%" }}
                  >
                    {emailVefirficationsuccessOpen==""?"Login Successfull!":emailVefirficationsuccessOpen}
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
                    {failureMessage}
                  </Alert>
                </Snackbar>
                
                <div className="text-center">
                  <Link to="/">
                    <img className="logo" src={"/images/convertmlLogo.png"}  alt='convertml' />
                  </Link>
                </div>
                <div className="mt-4">
                  {" "}
                  <br />{" "}
                </div>
                <span className="switchBtn">
                  <Link to="/login" className="selected">Sign In</Link>
                  <Link to="/signup" className="unselected">Sign Up</Link>
                </span>  <br/><br/>
                <form autoComplete="off" noValidate onSubmit={submitForm}>
                  <TextField
                    required
                    autoFocus
                    id="outlined-required"
                    label="Work Email"
                    type="email"
                    className="inputBox"
                    placeholder="Work Email"  
                    onChange={(e) => {
                      setCompanyEmail(e.target.value)  
                      buttonactive(e.target.value)
                    }}  
                    value={companyEmail}
                  />
                  <div className="mt-1 text-xs font-medium text-validation">
                    {validateEmail}
                  </div>
                  <br />
                  <br />
                  <FormControl variant="outlined" className="inputBox">
                    <InputLabel htmlFor="outlined-adornment-password" required>
                      Password
                    </InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-password"
                      placeholder="Password"
                      type={showPassword ? "text" : "password"}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}{" "}
                            <small style={{ fontSize: "12px" }}>
                              &nbsp;{showPassword ? "Hide" : "Show"}
                            </small>
                          </IconButton>
                        </InputAdornment>
                      }
                      label="Password"
                      onChange={(e) => setPassword(e.target.value)}
                      value={password}
                    />
                  </FormControl>
                  <div className="text-xs font-medium text-validation">
                    {validatePassword}
                  </div>
                  <br />
                  <div>
                    <span className="float-left p-0">
                      <FormControlLabel
                        required
                        className="text-primary text-sm"
                        control={
                          <Checkbox
                            checked={remember}
                            onChange={handleRemember}
                          />
                        }
                        label="Remember me"
                      />
                    </span>
                    <Link
                      to="/forgot-password"
                      className="text-primary underline float-right text-sm forgot-password"
                    >
                      <u>  Forget Password?</u>
                    </Link>
                  </div>
                  <br />
                  <br />
                  <div className="py-3">
                    <Button
                     className="w-full"
                     variant="contained"
                     type="submit"
                     size="large"
                     disabled={activeButton}   
                    >
                      Sign In
                    </Button>
                  </div>
                </form>
                {/* <div className="text-center tracking-tight text-sm md:text-md">
                  <span className="text-primary-light text-primary-light-font">
                    Don't have an account?{" "}
                    <Link to="/signup" className="text-primary underline">
                      <u>Sign Up</u>
                    </Link>
                  </span>
                </div> */}
              </div>
            </Grid>
            <Grid item xs={12} lg={1} sm={12}>
            </Grid>
            <Grid item xs={12} lg={7} sm={12}>
              <div className="bg-sidebar right-sidebar">
                <div className="pt-1 our-partners-logo">
                  <img
                    src={"/images/authImage.png"}
                    alt='convertml' 
                    className="img-sidebar"
                  /> 
                  <div>
                    <h1 className="d-none"> Convertml Login</h1>
                    <h2 className="d-none"> Convertml User Access</h2>
                    <div className="text-center">   <h3 className="m-0 mb-2">Our Partners</h3>   
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
      {/* )} */}
    </>
  );
}

export default LoginPage;
