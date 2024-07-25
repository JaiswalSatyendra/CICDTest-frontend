import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate, Navigate } from "react-router-dom";
import NavbarHomepage from "../components/NavbarAuth";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import MuiPhoneNumber from "material-ui-phone-number";
import { FormControlLabel, Radio, RadioGroup, Typography,   } from "@mui/material";
import Cookies from "js-cookie";
import validator from "validator";
import { SessionContext } from "../contexts/SessionContext";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import { useTranslation } from "react-i18next";
import { Grid } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { fontSize } from "@mui/system";
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip'; 
import axios from "axios";
 
import { signupMetaData } from "../assets/data/metadata-list";
import { Helmet } from "react-helmet-async";
 


const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function SignupPage() {



  const { t } = useTranslation();
  const navigate = useNavigate();
  const [session, login] = useContext(SessionContext);

  const [successOpen, setSuccessOpen] = useState(false);
  const [failureOpen, setFailureOpen] = useState(false);

  const [afterSendMessage, setafterSendMessage] = useState(false);
  

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSuccessOpen(false);
    setFailureOpen(false);
  };

  const [name, setName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [companyEmail, setCompanyEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isValidPhoneNumber, setIsValidPhoneNumber] = useState(false);
  const [password, setPassword] = useState("");
  const [isAgree, setIsAgree] = useState(false);

  const [strengthMeter, setStrengthMeter] = useState(false);
  // const [passwordIsWeak, setPasswordIsWeak] = useState(false)
  const [passwordIsMedium, setPasswordIsMedium] = useState(true);
  const [passwordIsStrong, setPasswordIsStrong] = useState(false);

  const [validatename, setValidateName] = useState("");
  const [validatecompanyName, setValidateCompanyName] = useState("");
  const [validatecompanyEmail, setValidateCompanyEmail] = useState("");
  const [validatepassword, setValidatePassword] = useState("");
  const [validatePhonNumber, setValidatePhonNumber] = useState("");

  const [signupActive, setSignupActive] = useState(true);

  const [q1Active, setQ1Active] = useState(false);
  const [q2Active, setQ2Active] = useState(false);
  const [q3Active, setQ3Active] = useState(false);
  const [q4Active, setQ4Active] = useState(false);

  const [ans1, setAns1] = useState("");
  const [ans1Other, setAns1Other] = useState("");
  const [ans2, setAns2] = useState("");
  const [ans3, setAns3] = useState("");
  const [ans3Other, setAns3Other] = useState("");
  const [ans4, setAns4] = useState("");
  const [validateEmailPattern, setValidateEmailPattern] = useState(
    /^[a-zA-Z]+[A-Z0-9._-]+@[A-Z0-9._-]+\.([a-zA-Z]+)$/i
  );
  // const validPassword = new RegExp('^(?=.*?[A-Za-z])(?=.*?[0-9]).{6,}$');
  ///^[a-zA-Z]+[A-Z0-9._-]+@[A-Z0-9._-]+\.(com|in)$/i
  const [errorMessages, seterrorMessages] = useState("");

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState("paper");

  
  const queryParameters = new URLSearchParams(window.location.search);
  const pageUrlOpen = window.location.origin+window.location.pathname;  

    useEffect(() => {  
      /* ---------- url read property ---------- */
      let urlinfo =  {utm_campaign:queryParameters.get("utm_campaign"),utm_medium:queryParameters.get("utm_medium"), utm_source:queryParameters.get("utm_source"),utm_url:pageUrlOpen};  
      console.log(urlinfo)
      if(urlinfo.utm_campaign!=null&&urlinfo.utm_medium!=null&&urlinfo.utm_source!=null&&urlinfo.utm_url!=null){  
        fetch(`${process.env.REACT_APP_API_URL}/survey/saveTypeformUserRecord`,{
          method:'POST',
          headers:{'Content-Type':'application/json',"token":Cookies.get("token")},
          body:JSON.stringify(urlinfo), 
         }) 
      }     
      /* ---------- url read property end ---------- */ 
     }, [navigate]);

 

const  saveUrlData = async(param)=> {
  try {
    const responseUrl = await axios.post(process.env.REACT_APP_API_URL + '/survey/saveTypeformUserRecord',param);
    return responseUrl; 
  }
  catch (error) {
    return error.response;
  }
}

  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handlePopupClose = () => {
    setOpen(false);
  };

  const passwordStrengthCheck = (value,event) => {
    // event.preventDefault();
    // const re = new RegExp("^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,32}$");
    // const isOk = re.test(value); 
    // console.log(isOk) 

    // if(!isOk) {
    //   // return alert('weak!');
    // code done } 
    const re = new RegExp("^(?=.*[0-9])(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$");
    const isOk = re.test(value);  
    if (value == '') {
      setValidatePassword("Required Field");
     } 
     
    else if(!isOk) {
      setValidatePassword(" Ensure password complies with rules"); 
   }  
   else {
    setValidatePassword(" ");
   } 

    //else if (password.length < 8) {
    //   setValidatePassword("Password not correct");
    // } 


  // alert('A password was submitted that was ' + value.length + ' characters long.');

    // if (
    //   validator.isStrongPassword(value, {
    //     minLength: 10,
    //     minLowercase: 1,
    //     minUppercase: 1,
    //     minNumbers: 1,
    //     minSymbols: 1,
    //   })
    // ) {
    //   setPasswordIsStrong(true);
    //   setPasswordIsMedium(true);
    // } else if (value.length > 6) {
    //   setPasswordIsStrong(false);
    //   setPasswordIsMedium(true);
    // } else {
    //   setPasswordIsMedium(false);
    //   setPasswordIsStrong(false);
    // }

  };

  

  const changePhoneNumber = async (ev,val) => {
    let aa = "+"+val.dialCode;
    let validNumber = ev.split(aa);
    let validNumber1 = validNumber[1].match(/\d+/g).join("");
    setIsValidPhoneNumber((validNumber1.length==10?true:false))
    setPhoneNumber(ev);
  }

  const submitForm = async (e) => {
    e.preventDefault();
    setValidateName("");
    setValidateCompanyName("");
    setValidateCompanyEmail("");
    setValidatePassword("");
    setValidatePhonNumber("");

    if (name.length === 0) { 
      setValidateName("Required Field");
    } 
    else if (companyName.length === 0) {
      setValidateCompanyName("Required Field");
    }
    else if (companyEmail.length === 0) {
      setValidateCompanyEmail("Enter work email, e.g. name@company.com");
    }
    else if (companyEmail.length === 0) {
      setValidateCompanyEmail("Enter work email, e.g. name@company.com");
    }

    else if (password.length === 0) {
      setValidatePassword("Required Field");
    } else if (password.length < 8) {
      setValidatePassword(" Ensure password complies with rules");
    }   else if (phoneNumber!=""&&!isValidPhoneNumber) {
      setValidatePhonNumber("Phone Number should be equal to 10 digit");
    } 
    else {
      // if (validateEmailPattern.test(companyEmail)) {
      if (companyEmail.match(new RegExp(validateEmailPattern)) != null) {
        // let aa = {
        //   username: name,
        //   company_name: companyName,
        //   company_email: companyEmail,
        //   phone_number: phoneNumber,
        //   password: password,
        //   isAgree:isAgree
        // }
        // console.log(aa);

        await fetch(process.env.REACT_APP_API_URL + "/auth/signup", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            username: name,
            company_name: companyName,
            company_email: companyEmail,
            phone_number: phoneNumber,
            password: password,
            isAgree: isAgree,
            isVerified:false,
            isFirstTimeLogged:false,
          }),
        })
          .then((response) => response.json())
          .then(async (data) => {
            if (data.isLoggedIn === true) {
              setSuccessOpen(true);

              const hostname = window.location.hostname;
              let domain = "";
              if (hostname.includes("localhost")) {
                domain = "localhost";
              } else if (
                hostname.includes(
                  "test.convertml.ai"
                )
              ) {
                domain = "test.convertml.ai";
              } else {
                domain = "convertml.ai";
              }

              Cookies.set("token", data.token, {
                expires: 2,
                domain: domain,
              });
              seterrorMessages(data.message);
              setafterSendMessage(true)
              // navigate("/");
            }
            else if(data.message=='Email is already registered'){ 
              setValidateCompanyEmail(data.message);
            } 
            else {
              setCompanyEmail("");
              seterrorMessages(data.message);
              setFailureOpen(true);
            }
          })
          .catch((err) => {
            seterrorMessages(
              `User could not be registered, please contact technical support team`
            );
            setFailureOpen(true);
          });
      } else {
        setValidateCompanyEmail(
          "Enter your valid Email (eg. name@company.com)"
        );
      }
    }



    // if (companyEmail.length === 0) {
    //   setValidateCompanyEmail("Enter work email, e.g. name@company.com");
    // } else if (password.length === 0) {
    //   setValidatePassword("Required field");
    // } else if (password.length < 8) {
    //   setValidatePassword("Password not correct");
    // } else if (name.length === 0) {
    //   setValidateName("Required field");
    // } else if (companyName.length === 0) {
    //   setValidateCompanyName("Required field");
    // } else if (phoneNumber!=""&&!isValidPhoneNumber) {
    //   setValidatePhonNumber("Phone Number should be equal to 10 digit");
    // } 
    // else {
    //   // if (validateEmailPattern.test(companyEmail)) {
    //   if (companyEmail.match(new RegExp(validateEmailPattern)) != null) {
    //     // let aa = {
    //     //   username: name,
    //     //   company_name: companyName,
    //     //   company_email: companyEmail,
    //     //   phone_number: phoneNumber,
    //     //   password: password,
    //     //   isAgree:isAgree
    //     // }
    //     // console.log(aa);

    //     await fetch(process.env.REACT_APP_API_URL + "/auth/signup", {
    //       method: "POST",
    //       headers: {
    //         "Content-type": "application/json",
    //       },
    //       body: JSON.stringify({
    //         username: name,
    //         company_name: companyName,
    //         company_email: companyEmail,
    //         phone_number: phoneNumber,
    //         password: password,
    //         isAgree: isAgree,
    //       }),
    //     })
    //       .then((response) => response.json())
    //       .then(async (data) => {
    //         if (data.isLoggedIn === true) {
    //           setSuccessOpen(true);

    //           const hostname = window.location.hostname;
    //           let domain = "";
    //           if (hostname.includes("localhost")) {
    //             domain = "localhost";
    //           } else if (
    //             hostname.includes(
    //               "test.convertml.ai"
    //             )
    //           ) {
    //             domain = "test.convertml.ai";
    //           } else {
    //             domain = "convertml.ai";
    //           }

    //           Cookies.set("token", data.token, {
    //             expires: 2,
    //             domain: domain,
    //           });
    //           seterrorMessages(data.message);

    //           navigate("/");
    //         } else {
    //           setCompanyEmail("");
    //           seterrorMessages(data.message);
    //           setFailureOpen(true);
    //         }
    //       })
    //       .catch((err) => {
    //         seterrorMessages(
    //           `User could not be registered, please contact technical support team`
    //         );
    //         setFailureOpen(true);
    //       });
    //   } else {
    //     setValidateCompanyEmail(
    //       "Enter your valid Email (eg. name@company.com)"
    //     );
    //   }
    // }
  };

  return (
    <>
    <h1 className="d-none"> Convertml Signup</h1>
                    <h2 className="d-none"> Convertml User Signup</h2>
    <Helmet> 
        <title>{signupMetaData.title}  </title>
        <meta name="og:description" content={signupMetaData.description } data-react-helmet="true" />
        <meta name="keywords"  content={signupMetaData.keywords} /> 
        <meta property="og:title" content={signupMetaData.title } data-react-helmet="true" />
        <meta property="og:image" content={signupMetaData.image} />
        <meta property="og:url" content={signupMetaData.url} />
        <meta property="og:publisher" content={signupMetaData.publisher} />
        <meta property="og:author " content={signupMetaData.author} />
        <meta property="og:site_name" content={signupMetaData.site_name} />
        <meta property="og:locale" content={signupMetaData.locale} />
        <meta property="og:type" content={signupMetaData.type}/>
        <link rel="canonical" href={signupMetaData.canonical} />
      </Helmet>
      {/* {session.token ? (
        <Navigate to="/dashboard/data-platform/create-data-connection" />
      ) : ( */}

{/* URLread   <div>
      <p>utm_source: {source}</p> 
      <p>utm_campaign: {camname}</p>
      <p>utm_medium: {medium}</p> 
      <p>landingPage: {pageUrlOpen}</p> 
    </div>   */}
        <div className="loginPage signUpPages container-fluid">
          {/* <NavbarHomepage /> */}
          <Grid
            container
            spacing={2}
            justifyContent="center"
            alignItems="center"
          >
            <Grid item xs={12} lg={3} sm={12}>
              <div className="loginSection">
                {/* <Snackbar
                  open={successOpen}
                  autoHideDuration={6000}
                  onClose={handleClose}
                >
                  <Alert
                    onClose={handleClose}
                    severity="success"
                    sx={{ width: "100%" }}
                  >
                    Login Successfull!
                  </Alert>
                </Snackbar> */}
                {/* <Snackbar
                  open={failureOpen}
                  autoHideDuration={6000}
                  onClose={handleClose}
                >
                  {/* <Alert
              onClose={handleClose}
              severity="error"
              sx={{ width: "100%" }}
            >
              {failureMessage}
            </Alert>  *
                </Snackbar> */}
                <div className="text-center">
                  <Link to="/">
                    <img className=" logo" src={"/images/convertmlLogo.png"} alt='convertml' />
                  </Link>
                </div>
                <div className="mt-4">
                  {" "}
                  <br />{" "}
                </div>
                {afterSendMessage?<> </>:<><span className="switchBtn">
                  <Link to="/login" className="unselected">Sign In</Link>
                  <Link to="/signup" className="selected">Sign Up</Link>
                </span></> }
                <br/><br/>

                {/* <Snackbar
                  open={successOpen}
                  autoHideDuration={6000}
                  onClose={handleClose}
                >
                  <Alert
                    onClose={handleClose}
                    severity="success"
                    sx={{ width: "100%" }}
                  >
                    User Successfully Registered!
                  </Alert>
                </Snackbar> */}
                {/* <Snackbar
                  open={failureOpen}
                  autoHideDuration={6000}
                  onClose={handleClose}
                >
                  <Alert
                    onClose={handleClose}
                    severity="error"
                    sx={{ width: "100%" }}
                  >
                    {errorMessages}
                  </Alert>
                </Snackbar> */}

{afterSendMessage?<><div className="afterSend-message-show">
 <div className="emailsuccessfulsubmit"><h2 style={{paddingTop:'7px'}} >Thank you!</h2></div>
<br/>

<p>
Thank you! Please verify  your email ID to gain access to The ConvertML World! </p>

<p>If you have any question, feel free to reach out to <a href="mailto:support@convertml.ai">support@convertml.ai</a></p>
</div></>:<>  <div 
                  className={`w-full :   ${signupActive ? " " : "hidden "}  `}
                >
                  {/* <AccountCircleIcon
                style={{ color: "#790191", fontSize: "3rem" }}
              /> */}
                  <div className="flex flex-col items-center justify-top"></div>
                  <form autoComplete="off" noValidate onSubmit={submitForm}>
                    <TextField
                      required
                      autoComplete="new-password"
                      className="inputBox"
                      id="name"
                      autoFocus
                      label="Name"
                      type="text"
                      placeholder="Enter your name"
                      onChange={(e) => setName(e.target.value)}
                      value={name}
                    />  
                    <div className="mt-1 text-xs font-medium text-validation">
                      {validatename}
                    </div>
                    <br />
                    <TextField
                      required
                      autoComplete="new-password"
                      className="inputBox"
                      id="companyname"
                      label="Company name"
                      type="text"
                      placeholder="Enter your company name"
                      onChange={(e) => setCompanyName(e.target.value)}
                      value={companyName}
                    />
                    <div className="mt-1 text-xs font-medium text-validation">
                      {validatecompanyName}
                    </div>
                    <br />
                    <TextField
                      className="inputBox"
                      required
                      id="outlined-required" 
                      label="Email"
                      type="email"
                      placeholder="example@company.com"
                      onChange={(e) => setCompanyEmail(e.target.value)}
                      value={companyEmail}
                    />  
                    <div className="mt-1 text-xs font-medium text-validation">
                      {validatecompanyEmail} 
                    </div>
                    <br /> 
                     <FormControl variant="outlined" className="inputBox">  
                      <InputLabel
                        htmlFor="outlined-adornment-password"
                        className="inputBox"
                        required
                      >
                        Password  
                      </InputLabel>
                       <OutlinedInput
                        className="inputBox"
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
                              {showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}{" "}
                              <small style={{ fontSize: "12px" }}>
                                &nbsp;{showPassword ? "Hide" : "Show"}
                              </small>
                            </IconButton>
                          </InputAdornment>
                        }
                        label="Password"
                        onChange={(e) => {
                          setPassword(e.target.value);
                          setStrengthMeter(true);
                          passwordStrengthCheck(e.target.value);
                        }}
                        value={password}
                      /> 
                    </FormControl> 
                    <span className={validatepassword=='Password correct'?'mt-1 text-xs font-mediumn valid-text':'mt-1 text-xs font-medium text-validation'}>
                      {validatepassword}
                    </span>
                         <Tooltip style={{ float:'right',  marginTop:'5px'}} title={
          <>
             <ol className="m-0 ml-2 p-2">
             <li> Minimum 8 maximum 16 Characters  </li>
              <li> At least 1 Lowercase Characters (a-z)</li>
              <li> At least 1 Uppercase Characters (A-Z)</li>
              <li> At least 1 Digits (0-9)</li>
              <li> At least 1 Special Characters (*$@#)</li>
             </ol> 
          </>
        }
      >
   <span className="error-text"> Password Rules  <i className="fa fa-info-circle icon-size"></i></span>
      </Tooltip> 
      <div className="clearfix"> </div>
                   
                    <br />
                    <div
                      className={`w-full flex  gap-1  ${
                        strengthMeter === true ? "flex" : "hidden"
                      }  gap-1 `}
                    >
                      <div className={`bg-red h-2 rounded-full w-1/3`}></div>
                      <div
                        className={`${
                          passwordIsMedium === true
                            ? "bg-yellow h-2 rounded-full w-1/3"
                            : "bg-shadowBlack"
                        }  h-2 rounded-full`}
                      ></div>
                      <div
                        className={`${
                          passwordIsStrong === true
                            ? "bg-green h-2 rounded-full w-1/3"
                            : "bg-shadowBlack"
                        }  h-2 rounded-full`}
                      ></div>
                    </div>
                    <br />

                    <MuiPhoneNumber
                      className="w-full"
                      defaultCountry={"us"}
                      variant="outlined"
                      label="Phone number (optional)" 
                      onChange={(ev,val)=>{changePhoneNumber(ev,val)}}
                      value={phoneNumber}
                      placeholder="Phone number (optional)"
                    />
                    <div className="mt-1 text-xs font-medium text-validation">
                      {validatePhonNumber}
                    </div>
                    <br />
                    <div className="mt-1 flex justify-between tracking-tight text-sm md:text-md items-center">
                      <span>
                        <FormControlLabel
                          required
                          onChange={(e) => {
                            setIsAgree(e.target.checked);
                          }}
                          className="text-primary text-primary-light-font float-left"
                          style={{ marginRight: "4px" }}
                          control={<Checkbox />}
                          label="I agree to"
                        />
                        <Link  
                          to=""
                          className="text-link float-left"
                          style={{display:'block', padding:'12px 10px 5px 0px', fontSize:'15px'}}
                          onClick={handleClickOpen("paper")}
                        >
                         <b>Terms and Conditions</b>
                        </Link>
                      </span>
                    </div>
<div className="clearfix"></div>
{/* <div className="font-medium text-validation">{errorMessages}</div>  */}
                    <div className="py-1">
                    {/* <Button
                      className="button-primary d-block w-full"
                      disabled={!isAgree}
                        type="submit"
                        size="large"
                      >
                        Sign Up
                      </Button> */}<br />
                      <Button variant="contained"  type="submit" className=" d-block w-full" disabled={!isAgree} size="large">Sign Up</Button>

                    </div>
                  </form>
                  {/* <div className="pr-5 text-center">
                    <span className="text-primary-light text-primary-light-font">
                      Already have an account?{" "}
                      <Link
                        to="/login"
                        className="text-primary underline text-md tracking-tight"
                      >
                        <u>Sign In</u>
                      </Link>
                    </span>
                  </div> */}
                </div></>}



              
              </div>
            </Grid>
            <Grid item xs={12} lg={1} sm={12}>
             
            </Grid>
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
      {/* )} */}

      {/* ----------------- Terms and Conditions -----------------  */}

      <Dialog
        open={open}
        onClose={handlePopupClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description" 
        maxWidth="lg"
      >
        <DialogTitle id="scroll-dialog-title">
          CONVERTML TERMS OF SERVICE
        </DialogTitle>
        <DialogContent dividers={scroll === "paper"}>
          <DialogContentText id="alert-dialog-description">
            <p>
              PLEASE CAREFULLY READ THESE TERMS OF USE BEFORE ACCESSING,
              ACTIVATING OR OTHERWISE USING ConvertML’S WEBSITES AND WEB PAGES
              AND/OR ITS CLOUD-BASED, NO-CODE PLATFORM REFERRED TO HEREIN AS
              “ConvertML” OR ANY OF ConvertML’S CLOUD SERVICES. BY CLICKING THE
              “I ACCEPT” BUTTON WHEN YOU REGISTER ON ConvertML, OR OTHERWISE BY
              USING ConvertML’S SERVICES, YOU AGREE THAT YOU HAVE THE RIGHT,
              AUTHORITY AND CAPACITY TO ENTER INTO THIS AGREEMENT FOR YOURSELF
              OR ON BEHALF OF ANY BUSINESS ENTITY FOR WHICH YOU HAVE REGISTERED
              AN ACCOUNT. ON BEHALF OF YOURSELF AND ANY SUCH BUSINESS ENTITY,
              YOU ALSO AGREE TO BE BOUND BY THESE TERMS OF USE (COLLECTIVELY,
              THE “AGREEMENT” OR “TERMS OF USE”), INCLUDING ConvertML’S
              PROCESSING AND USE OF ALL DATA COLLECTED THROUGH THE ConvertML
              SERVICES, AND AGREE TO RECEIVE AND RESPOND ELECTRONICALLY FOR ALL
              COMMUNICATIONS IN RELATION TO THE SERVICES.
            </p>
            <uL>
              <li>
                1. Definitions and Construction
                <ol>
                  <li>
                    1. Definitions. The terms “You”, “Your” or “Company” refer
                    to whomever is entering into this Agreement and the company
                    they are representing. ConvertML shall be referred to as
                    “ConvertML” throughout the Agreement, each is a “party” to
                    this Agreement and together are referred to as the
                    “Parties.”
                  </li>
                  <li>
                    2. For the purposes of this Agreement, the following
                    initially highlighted words have the following meanings:
                  </li>
                </ol>
              </li>
            </uL>
            <p>
              “Administrative User” means any individual who is an employee or
              independent contractor of Customer, its Affiliates, or its or
              their Customer Service Providers, and who is authorised by
              Customer to use the administrative features and functions of the
              ConvertML Platform to administer access to and use of Customer
              Applications.
            </p>
            <p>
              “Affiliate” means any person, partnership, joint venture, company
              or other form of venture or enterprise, domestic or foreign,
              including subsidiaries, which directly or indirectly Control, are
              Controlled by, or are under common Control with a party. “Control”
              means the possession, directly or indirectly, of the power to
              direct or cause the direction of the management and operating
              policies of the entity in respect of which the determination is
              being made, through the ownership of more than fifty percent (50%)
              of its voting or equity securities, contract, voting trust or
              otherwise.{" "}
            </p>
            <p>
              “Customer Application” means an application or web-based service
              developed or used by Customer or its Affiliates (including its
              APIs), and which connects with or provides Customer Data to the
              ConvertML Platform to program a machine learning model to uncover
              new data patterns and provide advanced data analytics. Customer
              Applications are provided by Customer or its Affiliates, and not
              by ConvertML; “Customer Application” does not include the
              ConvertML Platform.{" "}
            </p>
            <p>
              “Customer Data” means any data that Customer or its Users input
              into, or allow to be integrated with, the ConvertML Platform for
              Processing as part of the Services, including any Personal Data
              forming part of such data.{" "}
            </p>
            <p>
              “Customer Service Provider” means a third party, to the extent the
              third party is providing services to Customer.{" "}
            </p>
            <p>
              “Documentation” means the software, user and administrator
              documents published by ConvertML, regarding use of the ConvertML
              Platform, including additional, updated or revised documentation,
              if any.“Documentation” means the software, user and administrator
              documents published by ConvertML, regarding use of the ConvertML
              Platform, including additional, updated or revised documentation,
              if any.{" "}
            </p>
            <p>
             
              “Free Trial” means use of the Subscription Services for trial
              purposes pursuant to a Sales Order that specifies that Customer’s
              use is for a Free Trial.
            </p>
            <p>
              “ConvertML Platform” means the computer software applications,
              tools, application programming interfaces (APIs), connectors,
              programs, networks and equipment that ConvertML uses to make the
              Subscription Services available to its customers.
            </p>
            <p>
              “Intellectual Property Rights” means all trade secrets, patents
              and patent applications, trademarks (whether registered or
              unregistered and including any goodwill acquired in such
              trademarks), service marks, trade names, copyrights, moral rights,
              database rights, design rights, rights in know-how, rights in
              Confidential Information, rights in inventions (whether patentable
              or not) and all other intellectual property and proprietary rights
              (whether registered or unregistered, any application for the
              foregoing, and all rights to enforce the foregoing), and all other
              equivalent or similar rights which may subsist anywhere in the
              world.{" "}
            </p>
            <p>
              “Professional Services” means the professional services (typically
              consulting and advice concerning optimum utilisation of the
              Subscription Services), to be performed by ConvertML that are
              specified in the applicable Sales Order. Professional Services are
              not required for use of the Subscription Services.{" "}
            </p>
            <p>
             
              “Sales Order” means any mutually agreed, written sales order,
              executed on behalf of ConvertML and Customer, including its
              exhibits and addenda, describing the Subscription Services,
              Support Program, Professional Services (if applicable), fees, and
              any special terms for using the Services that Customer has
              ordered. Each Sales Order becomes effective when executed by both
              ConvertML and Customer, and is made part of this Agreement as
              described in Section 1.2.
            </p>
            <p>
              “Services” means the Subscription Services and the Professional
              Services.{" "}
            </p>
            <p>
              “Subscription Services” means the ConvertML Platform service
              offerings to which Customer subscribes, together with any
              applicable support, each as specified in the applicable Sales
              Order, and the Documentation.{" "}
            </p>
            <p>
              “Subscription Term” has the meaning ascribed to it in the Sales
              Order{" "}
            </p>
            <p>“User” means any Administrative User or End User. </p>
            <ul>
              <li>
                Provision and Use of Services; Operational considerations
                <ul>
                  <li>
                    Provision of Subscription Services. During the Subscription
                    Term, Customer may access and use the ConvertML Platform in
                    accordance with this Agreement. ConvertML will make the
                    ConvertML Platform available to Customer and provide any
                    necessary support.
                    <li>
                     
                      Customer’s Account. Customer will designate one or more of
                      its employees to be the point of contact with ConvertML
                      for the management and support of the Subscription
                      Services, and who will be responsible for establishing and
                      managing Customer’s use of the Subscription Services
                      (“Account”), including the creation of authentication
                      credentials to access Customer’s Account. Customer is
                      solely responsible for maintaining the status of its User
                      base. Customer will safeguard all Administrative User
                      authentication credentials in its possession or under its
                      control. Customer is responsible for all activities that
                      occur under the Account.{" "}
                    </li>
                    <li>
                      Customer’s General Responsibilities. Customer and its
                      Users are solely responsible for obtaining and maintaining
                      their Internet access to the Subscription Services.
                      Customer is solely responsible for the accuracy, quality
                      and integrity of the Customer Data that Customer or its
                      Users input into, or allow to be integrated with, the
                      ConvertML Platform. Customer must comply, and will ensure
                      that its Administrative Users comply, with the terms of
                      the Agreement. Customer is responsible for acts and
                      omissions of its Administrative Users relating to this
                      Agreement as though they were Customer’s own.
                    </li>
                    <li>
                     
                      Customer Application. Customer is solely responsible for
                      the development, implementation, operation, support,
                      maintenance and security of each Customer Application.
                    </li>
                    <li>
                     
                      Connection to Customer Applications. The ConvertML
                      Platform includes functionality that enables Customer, at
                      Customer’s option, to connect with certain Customer
                      Applications, via public facing APIs provided and
                      controlled by the Customer Application. Any information
                      transmitted to or accessed by the ConvertML Platform from
                      Customer Application is considered Customer Data under
                      this Agreement and, to the extent within ConvertML’s
                      possession or under ConvertML’s control, is subject to the
                      data protection provisions of Section 7. If a Customer
                      Application modifies its APIs or equivalents so that they
                      no longer interoperate with the ConvertML’s Platform, or
                      imposes requirements on interoperability that are
                      unreasonable for ConvertML, and if after applying
                      reasonable efforts ConvertML is unable to overcome such
                      modifications or requirements then, upon reasonable notice
                      to Customer, ConvertML may cease or suspend its provision
                      of interoperability between the ConvertML Platform and the
                      affected Customer Application, without liability to
                      ConvertML. Except for ConvertML’s obligations to protect
                      information obtained by the ConvertML Platform from a
                      Customer Application, ConvertML has no responsibility for
                      the acquisition, development, implementation, operation,
                      support, maintenance or security of any Customer
                      Application.
                    </li>
                  </li>
                </ul>
              </li>
            </ul>
            License Grants and proprietary Rights
            <ul>
              <li>
                License by ConvertML. Subject to the terms and conditions of
                this Agreement, ConvertML hereby grants to Customer a
                non-exclusive, non-transferable (except in accordance with
                Section 13.11 – Assignment), royalty-free, worldwide license,
                without right to sub-license, for the Subscription Term, to (a)
                access and use, and to permit its Users to access and use, the
                ConvertML Platform, in accordance with the Documentation, and
                (b) reproduce, modify, and distribute and display the
                Documentation, in each case solely for Customer’s operations in
                its ordinary course of business. ConvertML reserves all other
                rights not expressly granted in this Agreement.{" "}
              </li>
              <li>
                License by Customer. Customer hereby grants to ConvertML a
                non-exclusive, non-transferable (except in accordance with
                Section 13.11 – Assignment), royalty-free license, without right
                to sub-license (except to its sub-processors, as required for
                the provision of the Subscription Services), to use the Customer
                Data, solely as necessary to perform the Services and as
                otherwise may be agreed in writing by Customer. Customer
                reserves all other rights not expressly granted in this
                Agreement.
              </li>
              <li>
                Ownership of Intellectual Property Rights.
                <ul>
                  <li>
                   
                    Ownership and Use of Customer Data. Customer retains all of
                    its rights, title and iinterest and Intellectual Property
                    Rights in and to the Customer Data and Customer Confidential
                    Information. No ownership interest in the Customer Data or
                    Customer Confidential Information is transferred or conveyed
                    to ConvertML by virtue of this Agreement. ConvertML will use
                    Customer Data and Customer Confidential Information only for
                    purposes of providing the Services, unless otherwise
                    authorised in writing by Customer.
                    <ul>
                      <li>
                        ConvertML’s Intellectual Property and Ownership Rights.
                        As between Customer and ConvertML, ConvertML retains and
                        owns all right, title and interest and all Intellectual
                        Property Rights in and to the Subscription Services,
                        ConvertML’s Confidential Information, and all
                        enhancements or improvements to, or derivative works of
                        any of the foregoing created or developed by or on
                        behalf of ConvertML (collectively, “ConvertML
                        Intellectual Property”). Nothing in this Agreement
                        transfers or conveys to Customer any ownership interest
                        in or to the ConvertML Intellectual Property.
                      </li>
                    </ul>
                  </li>
                  <li>
                   
                    Restrictions. Customer will not: (i) except to the extent,
                    if any, permitted by applicable law or required by
                    ConvertML, reverse assemble, reverse engineer, decompile or
                    otherwise attempt to derive source code from any of the
                    ConvertML Platform; (ii) reproduce, modify, or prepare
                    derivative works of the ConvertML Platform; or (iii) share,
                    rent or lease the Subscription Services, or use the
                    Subscription Services to operate any timesharing, service
                    bureau or similar business or to provide the ConvertML
                    Platform as a standalone offering.
                  </li>
                </ul>
              </li>
            </ul>
            <ul>
              <li>
               
                Compensation
                <ul>
                  <li>
                   
                    Subscription Plans. Customer’s subscription plan for the
                    Subscription Services is specified in the applicable Sales
                    Order. Customer may not reduce Customer’s commitment under
                    the subscription plan specified in the Sales Order during
                    the Subscription Term.{" "}
                  </li>
                  <li>
                   
                    Payment of Services Fees. Customer will pay ConvertML the
                    fees for the Services as specified in the applicable Sales
                    Order. ConvertML invoices in advance for use of the
                    Services. Unless specified otherwise in the applicable Sales
                    Order, Customer will make all payments within thirty (30)
                    days of receipt of ConvertML’s invoice. Unless otherwise
                    specified in the applicable Sales Order, all Fees are stated
                    and payable in Euros.
                  </li>
                  <li>
                   
                    Sales Taxes, Etc. Customer will be responsible for any
                    applicable sales, value-added, use and similar taxes,
                    together with all customs and import duties, and similar
                    levies and impositions (“Taxes”) payable with respect to its
                    acquisition of Services, or otherwise arising out of or in
                    connection with this Agreement, other than taxes based upon
                    ConvertML’s personal property ownership or net income.
                    Unless expressly specified otherwise in any Sales Order, all
                    fees, rates and estimates exclude Taxes. If Customer has
                    tax-exempt status, Customer will provide written evidence of
                    such status with its purchase orders or upon request by
                    ConvertML.
                  </li>
                  <li>
                   
                    Withholding. If Customer is required to withhold taxes
                    imposed upon ConvertML for any payment under this Agreement
                    by virtue of the statutes, laws, codes or governmental
                    regulations of a country in which any Subscription Services
                    are delivered or obtained, then such payments will be made
                    by Customer on behalf of ConvertML by deducting them from
                    the payment then due ConvertML and remitting such taxes to
                    the proper authorities on a timely basis, and the payments
                    provided for under this Agreement will be adjusted upwards
                    appropriately so that ConvertML actually receives the full
                    amount of the fees set forth in the applicable Sales Order.
                    Customer will provide ConvertML with official documentation
                    or tax receipts on such withholdings supporting such taxes
                    and such payments as may be required by ConvertML for its
                    tax records as soon as reasonably possible following payment
                    to the applicable tax authority, and in any event no later
                    than when required by applicable law.
                  </li>
                </ul>
              </li>
              <li>
                Warranties. ConvertML warrants to Customer that:
                <ul>
                  <li>
                   
                    Performance Warranty. During the Subscription Term, the
                    ConvertML Platform, in the form provided by ConvertML, will
                    conform in all material respects to its applicable
                    specifications set forth in the Documentation.
                  </li>
                  <li>
                   
                    Viruses. ConvertML will use commercially reasonable efforts,
                    using applicable current industry practices, to ensure that
                    the ConvertML Platform, in the form provided by ConvertML to
                    Customer under this Agreement, contains no computer virus,
                    Trojan horse, worm or other similar malicious code.
                  </li>
                  <li>
                   
                    Infringement. ConvertML’s provision to Customer of the
                    Subscription Services does not infringe any third party
                    patent existing under the laws of any member state of the
                    European Economic Area, the United Kingdom, the United
                    States, Canada, Australia, New Zealand, Singapore, Brazil,
                    South Korea, India or Japan, or infringe any third party
                    copyright, trademark or service mark, or result from
                    misappropriation by ConvertML of any third party’s trade
                    secrets (collectively, an “ConvertML Infringement”).
                  </li>
                  <li>
                   
                    Compliance with Law. The Services, in the form provided or
                    made available by ConvertML, will comply with all laws
                    applicable to ConvertML and its provision of Services.{" "}
                  </li>
                </ul>
              </li>
              <li>
               
                Performance Remedy. If the ConvertML Platform fails to conform
                to the warranty set forth in Section 5.1.1 and Customer provides
                written notice of the non-conformance to ConvertML within the
                applicable Subscription Term then, as Customer’s exclusive
                remedy and ConvertML’s sole obligation: ConvertML will either
                repair or, at its option, replace the non-conforming ConvertML
                Platform or, if ConvertML is unable to correct the
                non-conformance within 30 days of receipt of such written notice
                from Customer, Customer may terminate the applicable
                Subscription Services, and ConvertML will refund to Customer a
                pro-rata amount of any Subscription Services fees prepaid to
                ConvertML and applicable to the unutilised portion of the
                Subscription Term for the terminated Subscription Services.
              </li>
              <li>
                Infringement Remedy. Customer’s sole and exclusive remedy for
                any non-conformance with the warranty in Section 5.1.3 above
                will be Customer’s defense and indemnification rights under
                Section 9.1 below, and Customer’s termination rights under
                Section 8 below.{" "}
              </li>
              <li>
               
                Bugs and Abatement; Scope. Without limiting the express
                warranties in this Section 5, ConvertML does not warrant that
                the ConvertML Platform or Services are completely free from all
                bugs, errors, or omissions, or will ensure complete security.
                The warranties in Sections 5.1.1 do not apply to any Free Trial.
                The warranties in this Agreement are for the sole benefit of the
                Customer and may not be extended to any other person or entity.
              </li>
              <li>
                Disclaimer Of Implied Warranties. Neither party makes any
                representation or warranty in connection with the Services,
                except as expressly warranted in this Agreement or the
                Additional Terms of Service. TO THE MAXIMUM EXTENT PERMITTED BY
                APPLICABLE LAW, EXCEPT AS SPECIFICALLY WARRANTED IN THIS SECTION
                5, EACH PARTY DISCLAIMS ALL IMPLIED WARRANTIES, INCLUDING ANY
                IMPLIED WARRANTY OF MERCHANTABILITY OR FITNESS FOR A PARTICULAR
                PURPOSE, ANY IMPLIED WARRANTY OF NON-INFRINGEMENT OR IMPLIED
                OBLIGATION TO INDEMNIFY FOR INFRINGEMENT, ANY IMPLIED WARRANTY
                ARISING FROM COURSE OF PERFORMANCE, COURSE OF DEALING, OR USAGE
                OF TRADE, AND ANY STATUTORY REMEDY.
              </li>

              <li>
               
                Confidential Information
                <ul>
                  <li>
                   
                    Restrictions on use and Disclosure. Neither ConvertML nor
                    Customer will disclose to any third party any information
                    provided by the other party pursuant to or in connection
                    with this Agreement that the disclosing party identifies as
                    being proprietary or confidential or that, by the nature of
                    the circumstances surrounding the disclosure, ought in good
                    faith to be treated as proprietary or confidential (such
                    information, “Confidential Information”), and will make no
                    use of such Confidential Information, except under and in
                    accordance with this Agreement. The receiving party will
                    take reasonable precautions (using no less than a reasonable
                    standard of care) to protect the disclosing party’s
                    Confidential Information from unauthorised access or use.
                    Each party may disclose Confidential Information to its
                    Affiliates and service providers, and its Affiliates and
                    service providers may use such information, in each case
                    solely for purposes of this Agreement. Each party will be
                    liable for any breach of its obligations under this Section
                    6 that is caused by an act, error, or omission of any such
                    Affiliate or service provider. Confidential Information
                    includes information disclosed by the disclosing party with
                    permission from a third party, and combinations of or with
                    publicly known information where the nature of the
                    combination is not publicly known. ConvertML’s Confidential
                    Information includes information regarding ConvertML
                    Platform, ConvertML’s processes, methods, techniques, and
                    know-how relating to artificial intelligence and machine
                    learning, Documentation, roadmaps, pricing, marketing and
                    business plans, financial information, information security
                    information, and Personal Data of ConvertML personnel.
                    Customer’s Confidential Information includes information
                    input into, or integrated with, the ConvertML Platform for
                    Processing as part of the Services, its proprietary
                    workflows and processes, systems architecture, marketing and
                    business plans, financial information, information security
                    information, information pertaining to Customer’s other
                    suppliers, and Personal Data of Customer’s personnel. This
                    Section 6 does not apply to ConvertML’s obligations
                    regarding use and protection of Customer Data; those
                    obligations are specified in Section 7 (Data Protection).
                  </li>

                  <li>
                   
                    Exclusions. Except with respect to Personal Data,
                    Confidential Information does not include information that
                    the receiving party can establish: (i) has entered the
                    public domain without the receiving party’s breach of any
                    obligation owed to the disclosing party; (ii) has been
                    rightfully received by the receiving party from a third
                    party without confidentiality restrictions; (iii) is known
                    to the receiving party without any restriction as to use or
                    disclosure prior to first receipt by the receiving party
                    from the disclosing party; or (iv) has been independently
                    developed by the receiving party without use of or reference
                    to the disclosing party’s Confidential Information.{" "}
                  </li>
                  <li>
                    Disclosure Required By Law. If any applicable law,
                    regulation or judicial or administrative order requires the
                    receiving party to disclose any of the disclosing party’s
                    Confidential Information (a “Disclosure Order”) then, unless
                    otherwise required by the Disclosure Order, the receiving
                    party will promptly notify the disclosing party in writing
                    prior to making any such disclosure, in order to facilitate
                    the disclosing party’s efforts to protect its Confidential
                    Information. Following such notification, the receiving
                    party will cooperate with the disclosing party, at the
                    disclosing party’s reasonable expense, in seeking and
                    obtaining protection for the disclosing party’s Confidential
                    Information.
                  </li>
                  <li>
                    Independent Development. The terms of confidentiality under
                    this Agreement will not limit either party’s right to
                    independently develop or acquire products, software or
                    services without use of or reference to the other party’s
                    Confidential Information.{" "}
                  </li>
                </ul>
              </li>
            </ul>
            <p>
              <b> Data Protection </b>
              <ul>
                <li>
                 
                  Regulatory Issues.
                  <ul>
                    <li>
                     
                      Personal Data – Compliance with Applicable Law. Customer
                      may select the Personal Data it elects to input into and
                      Process using the ConvertML Platform in its sole
                      discretion; ConvertML has no control over the nature,
                      scope, or origin of, or the means by which Customer
                      acquires, Personal Data Processed by the Subscription
                      Services. Subject to the Customer Legal Basis Assurance
                      (defined in Section 7.1.3 below), ConvertML will comply,
                      and will ensure that its personnel comply, with the
                      requirements of EU privacy laws and regulations governing
                      Customer Personal Data in ConvertML’s possession or under
                      its control and applicable to ConvertML’s provision of
                      Services. Customer is solely responsible for ensuring that
                      it complies with any legal, regulatory or similar
                      restrictions applicable to the types of data Customer
                      elects to Process with the ConvertML Platform.
                    </li>
                    <li>
                     
                      ePHI. If Customer is subject to US healthcare data
                      protection laws (e.g., HIPAA), Customer may not use the
                      ConvertML Platform to Process “electronic Protected Health
                      Information” unless the applicable Sales Order specifies
                      that it intends to do so.
                    </li>
                    <li>
                     
                      Data Consents. Customer is solely responsible for
                      obtaining, and represents and covenants that it has
                      obtained or will obtain prior to Processing by ConvertML,
                      all necessary consents, licenses and approvals for the
                      Processing, or otherwise has a valid legal basis under EU
                      Data Protection Laws for the Processing of, any Personal
                      Data provided by Customer or its Users as part of the
                      Services (the “Customer Legal Basis Assurance”).{" "}
                    </li>
                    <li>
                     
                      Regulator Inquiries and Court Orders. If any regulator, or
                      any subpoena, warrant or other court or administrative
                      order, requires ConvertML to disclose or provide Customer
                      Data to a regulator or to any third party, or to respond
                      to inquiries concerning the Processing of Customer Data,
                      ConvertML will promptly notify Customer, unless prohibited
                      by applicable law. Following such notification, ConvertML
                      will reasonably cooperate with Customer in its response,
                      except to the extent otherwise required by applicable law.
                    </li>
                  </ul>
                </li>
                <li>
                 
                  Instructions. ConvertML will Process Customer Data only as
                  necessary to provide the Services, and in accordance with
                  Customer’s instructions. This Agreement, and Customer’s use of
                  the ConvertML Platform’s features and functionality, are
                  Customer’s instructions to ConvertML in relation to the
                  Processing of Customer Data.
                  <br /> Customer data input or import responsibilities.
                  Customer shall not import or allow others to import into the
                  Solution any:
                  <ul>
                    <li>
                     
                      trojan horse, worm, virus or other code which does not
                      serve a legitimate purpose, and which is designed to be
                      destructive, disabling or harmful or enables unauthorised
                      access to, or disclosure or corruption of information or
                      software;{" "}
                    </li>
                    <li>
                     
                      data regulated by the Payment Card Industry Data Security
                      Standards, or other financial account numbers or
                      credentials;{" "}
                    </li>
                    <li>
                     
                      information regulated by the U.S. Health Insurance
                      Portability and Accountability Act;{" "}
                    </li>
                    <li>
                      social security numbers (or local equivalent), driver’s
                      license numbers or other government ID numbers;
                    </li>
                    <li>
                     
                      sensitive personal data (including special categories of
                      personal data defined under Article 9 and criminal offence
                      data defined under Article 10 of the E.U. and U.K. General
                      Data Protection Regulation);{" "}
                    </li>
                    <li> personal data of individuals under 16 years old; </li>
                    <li>
                     
                      information subject to regulation or protection under the
                      U.S. Gramm-Leach-Bliley Act, U.S. Children’s Online
                      Privacy Protection Act or similar foreign or domestic
                      laws; or content that violates a third party’s
                      intellectual property rights.{" "}
                    </li>
                    <li>
                     
                      Personal data listed in (b)-(g) that has been anonymised
                      in accordance with the applicable regulatory regime may be
                      imported.
                    </li>
                    <li>
                      Information Security. ConvertML will implement and
                      maintain commercially reasonable technical and
                      organisational security measures designed to meet the
                      following objectives: (i) ensure the security and
                      confidentiality of Customer Data in the custody and under
                      the control of ConvertML; (ii) protect against any
                      anticipated threats or hazards to the security or
                      integrity of such Customer Data; (iii) protect against
                      unauthorised access to or use of such Customer Data; and
                      (iv) ensure that ConvertML’s return or disposal of such
                      Customer Data is performed in a manner consistent with
                      ConvertML’s obligations under items (i)-(iii) above.{" "}
                    </li>
                    <li>
                      Data Export, Retention, Deletion and Return. Customer may
                      export Customer Data from the ConvertML Platform at any
                      time during the Subscription Term, using the ConvertML
                      Platform’s then existing features and functionality, at no
                      additional charge. Customer is solely responsible for its
                      data retention obligations with respect to Customer Data.
                      ConvertML is not obligated to delete copies of Customer
                      Data retained in automated backup copies generated by
                      ConvertML, which ConvertML will retain for up to 18 months
                      from their creation. Such backup copies will remain
                      subject to this Agreement until the copy, or the Customer
                      Data in the copy, is destroyed. ConvertML’s obligations to
                      return Customer Data upon termination of a Subscription
                      Term may be fulfilled by permitting Customer to export
                      Customer Data as specified above.
                    </li>
                    <li>
                     
                      Sub-Processors. Customer consents to ConvertML’s use of
                      sub-processors to provide aspects of the Subscription
                      Services, and to ConvertML’s disclosure and provision of
                      Customer Data to those sub-processors. ConvertML will
                      require its sub-processors to comply with terms that are
                      substantially no less protective of Customer Data than
                      those imposed on ConvertML in this Agreement (to the
                      extent applicable to the services provided by the
                      sub-processor).
                    </li>
                    <li>
                     
                      Access by ConvertML Personnel. ConvertML will ensure that
                      its personnel access Personal Data only when authorised by
                      ConvertML, and in accordance with ConvertML’s applicable
                      controls. Access is typically required only in connection
                      with ConvertML’s provision of the Services. ConvertML will
                      ensure that its personnel are subject to obligations of
                      confidentiality with respect to Customer Data.{" "}
                    </li>
                    <li>
                     
                      User Requests. If any User requests ConvertML to provide
                      them with information relating to Processing of their
                      Personal Data, or to make changes to their Personal Data,
                      then ConvertML will promptly notify Customer of the
                      request, unless otherwise required by applicable law.
                      Customer may make changes to User data using the features
                      and functionality of the ConvertML Platform. ConvertML
                      will not make changes to User data except as agreed in
                      writing with Customer.
                    </li>
                    <li>
                      Breach Notification. ConvertML will notify Customer of any
                      breach of security leading to the accidental or unlawful
                      destruction, loss, alteration, unauthorised disclosure of,
                      or access to Customer Data in ConvertML’s possession or
                      under its control (a “Security Breach”) within 2 working
                      days of ConvertML’s confirmation of the nature and extent
                      of the same or when required by applicable law, whichever
                      is earlier. Each party will reasonably cooperate with the
                      other with respect to the investigation and resolution of
                      any Security Breach including, in the case of ConvertML,
                      prompt provision of the following, to the extent then
                      known to ConvertML: (i) the possible cause and
                      consequences of the Security Breach; (ii) the categories
                      of Personal Data involved; (iii) a summary of the possible
                      consequences for the relevant Users; (iv) a summary of the
                      unauthorised recipients of the Customer Data; and (v) the
                      measures taken by ConvertML to mitigate any damage. Upon
                      confirmation of any vulnerability or breach of ConvertML’s
                      security affecting Customer Data in ConvertML’s custody
                      and control, ConvertML will modify its processes and
                      security program as necessary to mitigate the effects of
                      the vulnerability or breach upon such Customer Data.
                      Insofar as the Security Breach relates to Customer, and
                      except to the extent required otherwise by applicable law,
                      Customer will have approval rights on notifying its Users
                      and any third-party regulatory authority of the Security
                      Breach. All security breach or security compromise
                      notifications will be via the ConvertML Platform dashboard
                      or account center, and via email to the persons designated
                      by Customer to receive notices in the ConvertML Platform
                      dashboard or account center.{" "}
                    </li>
                    <li>
                     
                      Territorial Restrictions. ConvertML will Process Customer
                      Data within the AWS platform infrastructure located in the
                      European Union. ConvertML personnel may access Customer
                      Data from any location for purposes of providing the
                      Services (subject to the restrictions described in Section
                      7.7 above).
                    </li>
                  </ul>
                </li>
                <li>
                 
                  Term and Termination
                  <ul>
                    <li>
                     
                      General. This Agreement will commence on the Effective
                      Date and will continue in effect until terminated in
                      accordance with Section 8.2 or 8.3 below.
                    </li>
                    <li>
                     
                      Termination On Breach. In the event of a material breach
                      of the Agreement by either party, the non-breaching party
                      may terminate the Agreement or any Sales Order affected by
                      the breach by giving the breaching party written notice of
                      the breach and the non-breaching party’s intention to
                      terminate. If the breach has not been cured within the
                      period ending 30 days after such notice, and if the
                      non-breaching party provides written notice of termination
                      to the breaching party (“Termination Notice”), then this
                      Agreement or any such Sales Order will terminate within
                      the time period specified in the Termination Notice.
                      Notwithstanding the foregoing, Customer’s failure to pay
                      any overdue fees and expenses within 30 days of ConvertML
                      notifying Customer of the overdue payment will constitute
                      a material breach of this Agreement. If Customer has not
                      cured a material breach within the applicable cure period,
                      then ConvertML may, on not less than 5 business days’
                      prior written notice to Customer, in its sole discretion,
                      and without prejudice to its other rights following
                      material breach and failure to cure, until such breach has
                      been cured in full, suspend performance of some or all of
                      ConvertML’s obligations to provide Services under this
                      Agreement. If Customer terminates this Agreement or any
                      Sales Order for breach in accordance with this Section
                      8.2, then ConvertML will refund to Customer a pro-rata
                      amount of any affected Subscription Services fees prepaid
                      to ConvertML and applicable to the unutilised portion of
                      the Subscription Term for terminated Subscription
                      Services, and any affected unutilised Professional
                      Services fees prepaid to ConvertML.
                    </li>
                    <li>
                     
                      Termination Without Cause. Either party may terminate the
                      Agreement for any reason, without cause, by providing
                      written notice to the other party at least 1 month in
                      advance of the intended termination date. Either party may
                      terminate a Free Trial at any time, for any reason,
                      effective upon delivery of notice to that effect.
                    </li>
                    <li>
                      Subscription Term and Renewal. Each subscription term for
                      Subscription Services will commence on the Subscription
                      Start Date and will continue for the period specified in
                      the Sales Order or, if not so specified, one year (an
                      “Initial Term”). Upon expiration of the Initial Term the
                      parties may renew the Subscription Services term for
                      successive periods of at least one year each (each, a
                      “Renewal Term”) at such rates as may be mutually agreed in
                      writing between them. If the parties do not renew the
                      Subscription Services term and the Customer continues to
                      use the Subscription Services, the agreement is deemed to
                      auto-renew for a further renewal term, until formally
                      renewed or cancelled by the Parties. The Initial Term and
                      each Renewal Term are individually referred to in these
                      Terms as the “Subscription Term”.{" "}
                    </li>
                    <li>
                      Fulfillment of Obligations on Termination. Except as
                      otherwise specified in this Agreement or any Additional
                      Terms of Service, termination of the Agreement or of any
                      Services will not entitle Customer to any refund of or
                      relief from payment of any Services fees paid or payable
                      under this Agreement.{" "}
                    </li>
                    <li>
                      Post Termination Obligations. Following any termination of
                      the Agreement or any Sales Order, each party will, within
                      30 days of such termination, (i) immediately cease use of
                      any Confidential Information of the other communicated for
                      the purposes of this Agreement or such Sales Order, and
                      (ii) return or destroy (and certify destruction of) all
                      copies of any Confidential Information of the other party
                      disclosed under the Agreement or such Sales Order within
                      30 days of such termination, subject to each party’s
                      customary backup and archival processes.
                    </li>
                    <li>
                     
                      Suspension – Critical Threats. If ConvertML, acting
                      reasonably in the circumstances then known to ConvertML,
                      determines that Customer’s or any of its Users’ use of the
                      Subscription Services poses an imminent threat to (i) the
                      security or integrity of any Customer Data or the data of
                      any other ConvertML customer, or (ii) the availability of
                      the ConvertML Platform to Customer or any other ConvertML
                      customer (collectively, a “Critical Threat”), then
                      ConvertML will immediately attempt to contact Customer to
                      resolve the Critical Threat. If ConvertML is unable to
                      immediately contact Customer, or if ConvertML contacts
                      Customer but Customer is unable to immediately remediate
                      the Critical Threat, then ConvertML may suspend Customer’s
                      and its Users’ use of the ConvertML Platform until the
                      Critical Threat is resolved and ConvertML is able to
                      restore the Subscription Services for Customer.
                    </li>
                    <li>
                     
                      Survival. The provisions of Sections 1, 3.3-3.4, 4.3-4.4,
                      6, 7, 8.5-8.8, 9-10 and 12 of this Agreement will survive
                      any termination or expiration of this Agreement.
                    </li>
                  </ul>
                </li>
                <li>
                 
                  Indemnification
                  <b> ConvertML’s Infringement Indemnification.</b>
                  <ul>
                    <li>
                     
                      Defense and Indemnity. If any third party makes any claim
                      against Customer that alleges a ConvertML Infringement
                      (defined in Section 5.1.3) then, upon notification of such
                      claim, ConvertML will, at its sole cost and expense,
                      defend Customer against such claim and any related
                      proceeding brought by such third party against Customer,
                      and indemnify Customer from and against all damages, fines
                      and penalties finally awarded against Customer or agreed
                      to be paid by Customer in a written settlement approved in
                      writing by ConvertML, and resulting from the ConvertML
                      Infringement. ConvertML’s obligations under this Section
                      9.1.1 are subject to Customer’s compliance with the
                      “Indemnification Conditions” (defined below).
                    </li>
                  </ul>
                </li>
              </ul>
            </p>
            <p>
              “Indemnification Conditions” means the following conditions with
              which a party must comply in order to be entitled to defence or
              indemnification under the Agreement by the other party: (i) the
              indemnified party notifies the indemnifying party in writing of
              any claim that might be the subject of indemnification promptly
              after any executive officer of the indemnified party or member of
              the indemnified party’s legal department first knows of the claim,
              provided, however, that no failure to so notify an indemnifying
              party will relieve the indemnifying party of its obligations under
              this Agreement except to the extent that such failure materially
              prejudices defence of the claim, and except to the extent of
              damages incurred by the indemnifying party as a result of the
              delay; (ii) the indemnifying party is given primary control over
              the defence and settlement of the claim (subject to the foregoing,
              the indemnified party may nonetheless participate in the defence
              at its sole cost and expense); (iii) the indemnified party makes
              no admission of liability (except as required by applicable law)
              nor enters into any settlement without the indemnifying party’s
              prior written agreement (not to be unreasonably withheld); (iv)
              the indemnified party provides such assistance in defence of the
              proceeding as the indemnifying party may reasonably request, at
              the indemnifying party’s reasonable expense; and (v) the
              indemnified party uses all commercially reasonable efforts to
              mitigate its losses.{" "}
            </p>
            <p>
             
              ConvertML’s Mitigation Rights. If any Subscription Services become
              (or in ConvertML’s opinion are likely to become) the subject of
              any infringement or misappropriation claim, ConvertML may, and if
              Customer’s use of the Subscription Services is enjoined, ConvertML
              must, at its sole expense, either: (i) procure for Customer the
              right to continue using the relevant Subscription Services; (ii)
              replace or modify the relevant Subscription Services in a
              functionally equivalent manner so that they no longer infringe; or
              (iii) terminate the applicable Sales Order or Customer’s rights to
              use affected Subscription Services, and refund to Customer a
              pro-rata amount of any subscription fees prepaid to ConvertML and
              applicable to the unutilised portion of the Subscription Term for
              the terminated Subscription Services.
            </p>
            <p>
             
              Exclusions. Notwithstanding the foregoing, ConvertML will have no
              obligation with respect to any infringement or misappropriation
              claim to the extent based upon (i) any use of the Subscription
              Services not in accordance with their applicable license rights,
              (ii) the combination of the Subscription Services with other
              products, equipment, software, services or data not supplied by
              ConvertML where the infringement would not have occurred but for
              such combination, or (iii) any Customer Data.
              <b> Customer’s Consent Indemnification. </b>
              <ul>
                <li>
                 
                  Defense and Indemnity. If any third party makes any claim
                  against ConvertML that alleges a non-conformance with the
                  Customer Legal Basis Assurance (defined in Section 7.1.4)
                  then, upon notification of such claim, Customer will, at its
                  sole cost and expense, defend ConvertML against such claim and
                  any related proceeding or investigation brought by such third
                  party against ConvertML, and Customer will indemnify ConvertML
                  from and against all damages, fines and penalties finally
                  awarded against ConvertML or agreed to be paid by ConvertML in
                  a written settlement approved in writing by Customer, and
                  resulting from the non-conformance. Customer’s obligations
                  under this Section 9.2.1 are subject to ConvertML’s compliance
                  with the Indemnification Conditions.
                </li>
                <li>
                 
                  Mitigation Rights. If Customer Data is, or in Customer’s
                  reasonable opinion is likely to become, the subject of a claim
                  of non-conformance with the Customer Legal Basis Assurance,
                  then Customer will have the right to: (i) procure the rights
                  necessary for Customer and ConvertML to continue to Process
                  the affected Customer Data; (ii) modify the Customer Data so
                  that there is no longer a non-conformance; or (iii) delete or
                  otherwise remove the non-conforming Customer Data from the
                  ConvertML Platform.{" "}
                </li>
                <li>
                 
                  Exclusions. Notwithstanding the foregoing, Customer will have
                  no obligation under this Section 9.2 or otherwise with respect
                  to any claim of non-conformance with the Customer Legal Basis
                  Assurance to the extent based upon ConvertML’s Processing of
                  the affected Customer Data other than in accordance with this
                  Agreement.
                </li>
              </ul>
              <b> Limitations and Exclusions of Liability </b>
              <ul>
                <li>
                 
                  Exclusion of Certain Claims. SUBJECT TO SECTION 10.3, IN NO
                  EVENT WILL EITHER PARTY BE LIABLE TO THE OTHER PARTY OR TO ANY
                  THIRD PARTY FOR ANY CONSEQUENTIAL, INDIRECT, SPECIAL,
                  INCIDENTAL, PUNITIVE OR EXEMPLARY DAMAGES, WHETHER FORESEEABLE
                  OR UNFORESEEABLE, EVEN IF SUCH PARTY HAS BEEN ADVISED OF THE
                  POSSIBILITY OF SUCH DAMAGES, ARISING OUT OF (i) THE
                  PERFORMANCE OR NON-PERFORMANCE OF THIS AGREEMENT OR ANY
                  RELATED AGREEMENT, OR ANY SOFTWARE, PRODUCTS OR SERVICES
                  PROVIDED HEREUNDER, OR (ii) ANY CLAIM, CAUSE OF ACTION, BREACH
                  OF CONTRACT OR ANY EXPRESS OR IMPLIED WARRANTY, UNDER THIS
                  AGREEMENT, ANY RELATED AGREEMENT OR OTHERWISE,
                  MISREPRESENTATION, NEGLIGENCE, STRICT LIABILITY, OR OTHER
                  TORT.
                </li>
                <li>
                 
                  Limitation of Liability. Subject to Section 10.3, neither
                  party’s maximum aggregate liability arising out of this
                  Agreement or any related agreement will in any event exceed
                  the fees paid to ConvertML under the Sales Order giving rise
                  to the claim during the 12 month period immediately preceding
                  the aggrieved party’s first assertion of any claim against the
                  other, regardless of whether any action or claim is based in
                  contract, misrepresentation, warranty, indemnity, negligence,
                  strict liability or other tort or otherwise.{" "}
                </li>
                <li>
                 
                  Exceptions. Sections 10.1 and 10.2 do not apply to either
                  party’s (i) willful misconduct or gross negligence, (ii)
                  infringement or misappropriation of any of the other’s
                  Intellectual Property Rights, or (iii) liability or loss which
                  may not be limited by applicable law. Any amounts payable by
                  an indemnified party to a third party pursuant to a judgment
                  or to a settlement agreement approved in writing by an
                  indemnifying party, liability for which falls within the
                  indemnifying party’s indemnification obligations under this
                  Agreement, and all fees payable by Customer under this
                  Agreement, will be deemed direct damages for purposes of this
                  Section 10. Section 10.2 does not apply to (i) each party’s
                  defence and indemnification obligations, (ii) Customer’s
                  obligations to pay fees and expenses when due and payable
                  under this Agreement, nor (iii) either party’s obligations
                  under Section 6 (Confidential Information) or Section 7 (Data
                  Protection), provided, however, that except to the extent of
                  willful misconduct or gross negligence of ConvertML,
                  ConvertML’s maximum aggregate liability under Section 7 will
                  not exceed the fees paid by Customer to ConvertML under the
                  affected Sales Order in the 12 month period immediately
                  preceding Customer’s first assertion of its claim.
                </li>
                <li>
                  Free Trial. With respect to any Free Trial, ConvertML’s
                  aggregate liability will in no event exceed one hundred Euros,
                  regardless of any theory of liability, and notwithstanding any
                  provision of this Agreement to the contrary, including
                  Sections 10.1-10.3.
                </li>
                <li>
                 
                  General. Each party agrees that these exclusions and
                  limitations apply even if the remedies are insufficient to
                  cover all of the losses or damages of such party, or fail of
                  their essential purpose and that without these limitations the
                  fees for the Services would be significantly higher. Neither
                  party may commence any action or proceeding under this
                  Agreement more than two years after the occurrence of the
                  applicable cause of action.
                </li>
              </ul>
              <b> Notices </b>
              <ul>
                <li>
                  Format. All notices required to be given under this Agreement
                  shall be in writing and delivered by hand, email, first class
                  prepaid mail or recorded delivery mail.{" "}
                </li>
                <li>
                 
                  ConvertML. Notices for ConvertML shall be sent to
                  support@convertml.ai or ConvertML One Pierce Place Suite 455E,
                  Itasca, IL 60143 USA.{" "}
                </li>
                <li>
                 
                  Customer. Notices for Customer shall be sent to the email
                  address of the user who created this account.
                </li>
                <li>
                 
                  Time. Notice will be deemed given: <br />
                  when received, if delivered by hand or email; or <br />
                  a. the next business day after it is sent, if sent by first
                  class prepaid mail or recorded delivery; <br />
                  a. five business days following postage if sent
                  internationally. <br />
                </li>
              </ul>
            </p>
            <p>
             
              Miscellaneous Provisions
              <ul>
                <li>
                 
                  Affiliates. This Agreement set forth the general terms and
                  conditions under which ConvertML will provide Services to
                  Customer and its Affiliates. Sales Orders may be entered into
                  under this Agreement by either the entity designated above as
                  “Customer” or any of Customer’s Affiliates. The entity that
                  executes a Sales Order in the position of services recipient
                  will be considered the “Customer” for all purposes of the
                  Sales Order; and the Sales Order will be considered a
                  two-party agreement between ConvertML and such “Customer”
                  under this Agreement.
                </li>
                <li>
                 
                  Publicity; References. Unless otherwise specified in the
                  applicable Sales Order, ConvertML may refer to Customer as one
                  of ConvertML’s customers and use Customer’s logo as part of
                  such reference, provided that ConvertML complies with any
                  trademark usage requirements notified to it by Customer. With
                  Customer’s prior written approval, including if so specified
                  in the applicable Sales Order, (i) ConvertML may either (a)
                  issue a press release announcing the relationship between
                  ConvertML and Customer, or (b) submit a joint press release to
                  Customer for Customer’s approval, such approval not to be
                  unreasonably withheld or delayed; and (ii) Customer will be a
                  reference account for ConvertML, provided, however, that
                  ConvertML will provide Customer with reasonable notice and
                  obtain Customer’s consent before scheduling any reference
                  calls or site visits.{" "}
                </li>
                <li>
                 
                  Compliance With Laws. Each party will comply with all laws and
                  regulations applicable to it, including applicable export
                  control laws. Neither party will have any liability to the
                  other for any non-performance of their obligations under this
                  Agreement to the extent that the non-performance is mandated
                  by applicable law. Each party represents and warrants to the
                  other that neither it nor its Affiliates, nor any of its or
                  their users, officers or directors, are persons, entities or
                  organisations with whom the other party is prohibited from
                  dealing (including provision of software, products or
                  services) by virtue of any applicable law, regulation, or
                  executive order, including applicable export control laws, and
                  names appearing on the U.S. Department of the Treasury’s
                  Office of Foreign Assets Control’s Specially Designated
                  Nationals and Blocked Persons List.{" "}
                </li>
                <li>
                  Equitable Relief. Each of Customer and ConvertML acknowledges
                  that damages will be an inadequate remedy if the other
                  violates the terms of this Agreement pertaining to protection
                  of a party’s Intellectual Property Rights, Confidential
                  Information or Personal Data. Accordingly, each of them will
                  have the right, in addition to any other rights each of them
                  may have, to seek in any court of competent jurisdiction,
                  temporary, preliminary and permanent injunctive relief to
                  restrain any breach, threatened breach, or otherwise to
                  specifically enforce any of the obligations in this Agreement.
                </li>
                <li>
                 
                  Force Majeure. If the performance of this Agreement is
                  adversely restricted or if either party is unable to conform
                  to any warranty or obligation by reason of any Force Majeure
                  Event then, except with respect to obligations to pay any fees
                  or expenses, the party affected, upon giving prompt written
                  notice to the other party, will be excused from such
                  performance on a day-to-day basis to the extent of such
                  restriction (and the other party will likewise be excused from
                  performance of its obligations on a day-to-day basis to the
                  extent such party’s obligations relate to the performance so
                  restricted); provided, however, that the party so affected
                  will use all commercially reasonable efforts to avoid or
                  remove such causes of non-performance and both parties will
                  proceed whenever such causes are removed or cease. “Force
                  Majeure Event” means any failure or delay caused by or the
                  result of causes beyond the reasonable control of a party or
                  its service providers that could not have been avoided or
                  corrected through the exercise of reasonable diligence,
                  including natural catastrophe, internet access or related
                  problems beyond the demarcation point of the party’s or its
                  applicable infrastructure provider’s facilities,
                  state-sponsored malware or state-sponsored cyber-attacks,
                  terrorist actions, laws, orders, regulations, directions or
                  actions of governmental authorities having jurisdiction over
                  the subject matter hereof, or any civil or military authority,
                  national emergency, insurrection, riot or war, or other
                  similar occurrence. If a party fails to perform its
                  obligations as a result of such restriction for a period of
                  more than 30 days, then the other party may terminate the
                  affected Services without liability.{" "}
                </li>
                <li>
                 
                  Service Enhancement Analysis. ConvertML may use Customer’s and
                  its Users’ Subscription Services usage history, statistics and
                  telemetry (“Enhancement Data”) for ConvertML’s internal
                  analytical purposes related to its provision of Services,
                  including to improve and enhance the Subscription Services and
                  the ConvertML Platform. ConvertML may make information derived
                  from its analysis of Enhancement Data publicly available on an
                  aggregated and anonymised basis, provided that such
                  information does not contain any Personal Data. For the sake
                  of clarity, aggregated and anonymised data is not Confidential
                  Information of Customer.{" "}
                </li>
                <li>
                  Captions and Headings. The captions and headings are inserted
                  in this Agreement for convenience only and will not be deemed
                  to limit or describe the scope or intent of any provision of
                  this Agreement.
                </li>
                <li>
                 
                  Severability; Invalidity. If any provision of this Agreement
                  is held to be invalid, such invalidity will not render invalid
                  the remainder of this Agreement or the remainder of which such
                  invalid provision is a part. If any provision of this
                  Agreement is so broad as to be held unenforceable, such
                  provision will be interpreted to be only so broad as is
                  enforceable.
                </li>
                <li>
                 
                  Waiver. No waiver of or with respect to any provision of this
                  Agreement, nor consent by a party to the breach of or
                  departure from any provision of this Agreement, will in any
                  event be binding on or effective against such party unless it
                  be in writing and signed by such party, and then such waiver
                  will be effective only in the specific instance and for the
                  purpose for which given.{" "}
                </li>
                <li>
                 
                  Third Party Beneficiaries. Except as expressly set forth in
                  this Agreement, no provisions of this Agreement are intended
                  nor will be interpreted to provide or create any third-party
                  beneficiary rights or any other rights of any kind in any
                  other party.
                </li>
                <li>
                 
                  Assignment. Neither party may assign any of its rights or
                  obligations under this Agreement without the prior written
                  consent of the other, which will not be unreasonably withheld,
                  provided, however that, subject to any restrictions specified
                  in any applicable Sales Order, either party may assign all,
                  but not some of its rights and obligations under this
                  Agreement to any of its Affiliates, or to any entity into or
                  with which it is merged, or that acquires all or substantially
                  all of its assets, upon notice to the other party, but without
                  requiring consent. Subject to the foregoing restriction on
                  assignment, this Agreement will be binding upon, inure to the
                  benefit of and be enforceable by the parties and their
                  respective successors and assigns.{" "}
                </li>
                <li>
                  Governing Law. The provisions of this Agreement shall be
                  governed by and construed in accordance with the laws of the
                  Republic of Ireland whose courts shall be the courts of sole
                  jurisdiction in relation to this Agreement.
                </li>
                <li>
                 
                  Entire Agreement; Amendments. This Agreement constitutes and
                  embodies the entire agreement and understanding between the
                  parties with respect to the subject matter hereof and
                  supersedes all prior or contemporaneous written, electronic or
                  oral communications, representations, agreements or
                  understandings between the parties with respect thereto. This
                  Agreement may not be modified or amended except by a written
                  instrument executed by both parties. With the exception of the
                  Additional Terms of Service, any additional, supplementary or
                  conflicting terms supplied by either party (whether in hard
                  copy or electronic form), including those contained on or
                  within any invoice, purchase order, or standard terms of
                  purchase, or any click through license agreement or terms of
                  use, are specifically and expressly rejected by each party. In
                  the event of any conflict between the provisions of this
                  Agreement and any Sales Order, the provisions of this
                  Agreement will prevail.{" "}
                </li>
                <li> 
                  Counterparts. Sales Orders, this Agreement, and any amendments
                  to this Agreement may be executed in one or more counterparts,
                  which taken together will constitute a single agreement
                  between the parties participate in the defence at its sole
                  cost and expense); (iii) the indemnified party makes no
                  admission of liability (except as required by applicable law)
                  nor enters into any settlement without the indemnifying
                  party’s prior written agreement (not to be unreasonably
                  withheld); (iv) the indemnified party provides such assistance
                  in defence of the proceeding as the indemnifying party may
                  reasonably request, at the indemnifying party’s reasonable
                  expense; and (v) the indemnified party uses all commercially
                  reasonable efforts to mitigate its losses.
                </li>
              </ul>
            </p>
            <p> 	ConvertML’s Mitigation Rights. If any Subscription Services become (or in ConvertML’s opinion are likely to become) the subject of any infringement or misappropriation claim, ConvertML may, and if Customer’s use of the Subscription Services is enjoined, ConvertML must, at its sole expense, either: (i) procure for Customer the right to continue using the relevant Subscription Services; (ii) replace or modify the relevant Subscription Services in a functionally equivalent manner so that they no longer infringe; or (iii) terminate the applicable Sales Order or Customer’s rights to use affected Subscription Services, and refund to Customer a pro-rata amount of any subscription fees prepaid to ConvertML and applicable to the unutilised portion of the Subscription Term for the terminated Subscription Services.</p>
            <p> Exclusions. Notwithstanding the foregoing, ConvertML will have no obligation with respect to any infringement or misappropriation claim to the extent based upon (i) any use of the Subscription Services not in accordance with their applicable license rights, (ii) the combination of the Subscription Services with other products, equipment, software, services or data not supplied by ConvertML where the infringement would not have occurred but for such combination, or (iii) any Customer Data.  </p>
            <p>
            	Customer’s Consent Indemnification. 
              <ul>
                <li> Defense and Indemnity. If any third party makes any claim against ConvertML that alleges a non-conformance with the Customer Legal Basis Assurance (defined in Section 7.1.4) then, upon notification of such claim, Customer will, at its sole cost and expense, defend ConvertML against such claim and any related proceeding or investigation brought by such third party against ConvertML, and Customer will indemnify ConvertML from and against all damages, fines and penalties finally awarded against ConvertML or agreed to be paid by ConvertML in a written settlement approved in writing by Customer, and resulting from the non-conformance.   Customer’s obligations under this Section 9.2.1 are subject to ConvertML’s compliance with the Indemnification Conditions.</li>
                <li>	Mitigation Rights. If Customer Data is, or in Customer’s reasonable opinion is likely to become, the subject of a claim of non-conformance with the Customer Legal Basis Assurance, then Customer will have the right to: (i) procure the rights necessary for Customer and ConvertML to continue to Process the affected Customer Data; (ii) modify the Customer Data so that there is no longer a non-conformance; or (iii) delete or otherwise remove the non-conforming Customer Data from the ConvertML Platform. </li>
<li>	Exclusions. Notwithstanding the foregoing, Customer will have no obligation under this Section 9.2 or otherwise with respect to any claim of non-conformance with the Customer Legal Basis Assurance to the extent based upon ConvertML’s Processing of the affected Customer Data other than in accordance with this Agreement.
</li>
              </ul>
             </p>
            <p><b> 	Limitations and Exclusions of Liability </b>
            <ul>
              <li> 	Exclusion of Certain Claims. SUBJECT TO SECTION 10.3, IN NO EVENT WILL EITHER PARTY BE LIABLE TO THE OTHER PARTY OR TO ANY THIRD PARTY FOR ANY CONSEQUENTIAL, INDIRECT, SPECIAL, INCIDENTAL, PUNITIVE OR EXEMPLARY DAMAGES, WHETHER FORESEEABLE OR UNFORESEEABLE, EVEN IF SUCH PARTY HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES, ARISING OUT OF (i) THE PERFORMANCE OR NON-PERFORMANCE OF THIS AGREEMENT OR ANY RELATED AGREEMENT, OR ANY SOFTWARE, PRODUCTS OR SERVICES PROVIDED HEREUNDER, OR (ii) ANY CLAIM, CAUSE OF ACTION, BREACH OF CONTRACT OR ANY EXPRESS OR IMPLIED WARRANTY, UNDER THIS AGREEMENT, ANY RELATED AGREEMENT OR OTHERWISE, MISREPRESENTATION, NEGLIGENCE, STRICT LIABILITY, OR OTHER TORT. </li>
              <li>	Limitation of Liability. Subject to Section 10.3, neither party’s maximum aggregate liability arising out of this Agreement or any related agreement will in any event exceed the fees paid to ConvertML under the Sales Order giving rise to the claim during the 12 month period immediately preceding the aggrieved party’s first assertion of any claim against the other, regardless of whether any action or claim is based in contract, misrepresentation, warranty, indemnity, negligence, strict liability or other tort or otherwise. </li>
<li>	Exceptions. Sections 10.1 and 10.2 do not apply to either party’s (i) willful misconduct or gross negligence, (ii) infringement or misappropriation of any of the other’s Intellectual Property Rights, or (iii) liability or loss which may not be limited by applicable law. Any amounts payable by an indemnified party to a third party pursuant to a judgment or to a settlement agreement approved in writing by an indemnifying party, liability for which falls within the indemnifying party’s indemnification obligations under this Agreement, and all fees payable by Customer under this Agreement, will be deemed direct damages for purposes of this Section 10.  Section 10.2 does not apply to (i) each party’s defence and indemnification obligations, (ii) Customer’s obligations to pay fees and expenses when due and payable under this Agreement, nor (iii) either party’s obligations under Section 6 (Confidential Information) or Section 7 (Data Protection), provided, however, that except to the extent of willful misconduct or gross negligence of ConvertML, ConvertML’s maximum aggregate liability under Section 7 will not exceed the fees paid by Customer to ConvertML under the affected Sales Order in the 12 month period immediately preceding Customer’s first assertion of its claim.</li>
<li>	Free Trial. With respect to any Free Trial, ConvertML’s aggregate liability will in no event exceed one hundred Euros, regardless of any theory of liability, and notwithstanding any provision of this Agreement to the contrary, including Sections 10.1-10.3.</li>
<li>	General. Each party agrees that these exclusions and limitations apply even if the remedies are insufficient to cover all of the losses or damages of such party, or fail of their essential purpose and that without these limitations the fees for the Services would be significantly higher. Neither party may commence any action or proceeding under this Agreement more than two years after the occurrence of the applicable cause of action.
</li>
            </ul>
             </p>
            <p><b> 	Notices </b> 
            <ul>
              <li> 	Format.  All notices required to be given under this Agreement shall be in writing and delivered by hand, email, first class prepaid mail or recorded delivery mail. </li>
              <li>ConvertML.  Notices for ConvertML shall be sent to support@convertml.ai   or ConvertML One Pierce Place Suite 455E, Itasca, IL 60143 USA. </li>
              <li>	Customer.  Notices for Customer shall be sent to the email address of the user who created this account. </li>
              <li>Time.  Notice will be deemed given: 
a.	  when received, if delivered by hand or email; or 
a.	the next business day after it is sent, if sent by first class prepaid mail or recorded delivery; 
a.	 five business days following postage if sent internationally. 
</li>
            </ul>
            
            </p>
            <p><b> 	Miscellaneous Provisions </b>
            
            <ul>
              <li> 
              Affiliates. This Agreement set forth the general terms and conditions under which ConvertML will provide Services to Customer and its Affiliates. Sales Orders may be entered into under this Agreement by either the entity designated above as “Customer” or any of Customer’s Affiliates. The entity that executes a Sales Order in the position of services recipient will be considered the “Customer” for all purposes of the Sales Order; and the Sales Order will be considered a two-party agreement between ConvertML and such “Customer” under this Agreement. </li>
              <li>	Publicity; References. Unless otherwise specified in the applicable Sales Order, ConvertML may refer to Customer as one of ConvertML’s customers and use Customer’s logo as part of such reference, provided that ConvertML complies with any trademark usage requirements notified to it by Customer. With Customer’s prior written approval, including if so specified in the applicable Sales Order, (i) ConvertML may either (a) issue a press release announcing the relationship between ConvertML and Customer, or (b) submit a joint press release to Customer for Customer’s approval, such approval not to be unreasonably withheld or delayed; and (ii) Customer will be a reference account for ConvertML, provided, however, that ConvertML will provide Customer with reasonable notice and obtain Customer’s consent before scheduling any reference calls or site visits. </li>
<li>	Compliance With Laws. Each party will comply with all laws and regulations applicable to it, including applicable export control laws. Neither party will have any liability to the other for any non-performance of their obligations under this Agreement to the extent that the non-performance is mandated by applicable law. Each party represents and warrants to the other that neither it nor its Affiliates, nor any of its or their users, officers or directors, are persons, entities or organisations with whom the other party is prohibited from dealing (including provision of software, products or services) by virtue of any applicable law, regulation, or executive order, including applicable export control laws, and names appearing on the U.S. Department of the Treasury’s Office of Foreign Assets Control’s Specially Designated Nationals and Blocked Persons List. </li>
<li>	Equitable Relief. Each of Customer and ConvertML acknowledges that damages will be an inadequate remedy if the other violates the terms of this Agreement pertaining to protection of a party’s Intellectual Property Rights, Confidential Information or Personal Data. Accordingly, each of them will have the right, in addition to any other rights each of them may have, to seek in any court of competent jurisdiction, temporary, preliminary and permanent injunctive relief to restrain any breach, threatened breach, or otherwise to specifically enforce any of the obligations in this Agreement.</li>
<li>	Force Majeure. If the performance of this Agreement is adversely restricted or if either party is unable to conform to any warranty or obligation by reason of any Force Majeure Event then, except with respect to obligations to pay any fees or expenses, the party affected, upon giving prompt written notice to the other party, will be excused from such performance on a day-to-day basis to the extent of such restriction (and the other party will likewise be excused from performance of its obligations on a day-to-day basis to the extent such party’s obligations relate to the performance so restricted); provided, however, that the party so affected will use all commercially reasonable efforts to avoid or remove such causes of non-performance and both parties will proceed whenever such causes are removed or cease. “Force Majeure Event” means any failure or delay caused by or the result of causes beyond the reasonable control of a party or its service providers that could not have been avoided or corrected through the exercise of reasonable diligence, including natural catastrophe, internet access or related problems beyond the demarcation point of the party’s or its applicable infrastructure provider’s facilities, state-sponsored malware or state-sponsored cyber-attacks, terrorist actions, laws, orders, regulations, directions or actions of governmental authorities having jurisdiction over the subject matter hereof, or any civil or military authority, national emergency, insurrection, riot or war, or other similar occurrence. If a party fails to perform its obligations as a result of such restriction for a period of more than 30 days, then the other party may terminate the affected Services without liability. </li>
<li>	Service Enhancement Analysis. ConvertML may use Customer’s and its Users’ Subscription Services usage history, statistics and telemetry (“Enhancement Data”) for ConvertML’s internal analytical purposes related to its provision of Services, including to improve and enhance the Subscription Services and the ConvertML Platform. ConvertML may make information derived from its analysis of Enhancement Data publicly available on an aggregated and anonymised basis, provided that such information does not contain any Personal Data. For the sake of clarity, aggregated and anonymised data is not Confidential Information of Customer. </li>
<li>	Captions and Headings. The captions and headings are inserted in this Agreement for convenience only and will not be deemed to limit or describe the scope or intent of any provision of this Agreement.</li>
<li>	Severability; Invalidity. If any provision of this Agreement is held to be invalid, such invalidity will not render invalid the remainder of this Agreement or the remainder of which such invalid provision is a part. If any provision of this Agreement is so broad as to be held unenforceable, such provision will be interpreted to be only so broad as is enforceable.</li>
<li>	Waiver. No waiver of or with respect to any provision of this Agreement, nor consent by a party to the breach of or departure from any provision of this Agreement, will in any event be binding on or effective against such party unless it be in writing and signed by such party, and then such waiver will be effective only in the specific instance and for the purpose for which given.</li>
<li>	Third Party Beneficiaries. Except as expressly set forth in this Agreement, no provisions of this Agreement are intended nor will be interpreted to provide or create any third-party beneficiary rights or any other rights of any kind in any other party.</li> 
<li>Assignment. Neither party may assign any of its rights or obligations under this Agreement without the prior written consent of the other, which will not be unreasonably withheld, provided, however that, subject to any restrictions specified in any applicable Sales Order, either party may assign all, but not some of its rights and obligations under this Agreement to any of its Affiliates, or to any entity into or with which it is merged, or that acquires all or substantially all of its assets, upon notice to the other party, but without requiring consent. Subject to the foregoing restriction on assignment, this Agreement will be binding upon, inure to the benefit of and be enforceable by the parties and their respective successors and assigns.</li> 
<li>Governing Law. The provisions of this Agreement shall be governed by and construed in accordance with the laws of the Republic of Ireland whose courts shall be the courts of sole jurisdiction in relation to this Agreement.</li>
<li>	Entire Agreement; Amendments. This Agreement constitutes and embodies the entire agreement and understanding between the parties with respect to the subject matter hereof and supersedes all prior or contemporaneous written, electronic or oral communications, representations, agreements or understandings between the parties with respect thereto. This Agreement may not be modified or amended except by a written instrument executed by both parties. With the exception of the Additional Terms of Service, any additional, supplementary or conflicting terms supplied by either party (whether in hard copy or electronic form), including those contained on or within any invoice, purchase order, or standard terms of purchase, or any click through license agreement or terms of use, are specifically and expressly rejected by each party.  In the event of any conflict between the provisions of this Agreement and any Sales Order, the provisions of this Agreement will prevail. </li>
<li>	Counterparts. Sales Orders, this Agreement, and any amendments to this Agreement may be executed in one or more counterparts, which taken together will constitute a single agreement between the parties.
</li></ul> </p>
            <p>If you have any questions about these ConvertML Terms of Service, please email <a href="mailto:support@convertml.ai">support@convertml.ai</a> </p>
            <p className="text-right">This document was last updated on 02/20/2024. </p>

          </DialogContentText>
        </DialogContent>
        <DialogActions> 
          <Button onClick={handlePopupClose}>OK</Button>
        </DialogActions>
      </Dialog>
      {/* ----------------- Terms and Conditions -----------------  */}
    </>
  );
}

export default SignupPage;
