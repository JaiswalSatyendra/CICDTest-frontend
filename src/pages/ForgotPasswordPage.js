import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Navbar from "../components/NavbarAuth";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
//import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';

import { Alert, Grid, Snackbar, Tooltip } from "@mui/material";
import { Helmet } from "react-helmet";
import { fotgotPasswordMeta } from "../assets/data/metadata-list";

function ForgotPasswordPage() {
  const { id, token } = useParams();

  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [confirmvalidatePassword, setConfirmvalidatePassword] = useState(""); 
  const [validatePassword, setvalidatePassword] = useState("");
  const [activeButton, setactiveButton] = useState(true);
  

  const [newPasswordShow, setNewPasswordShow] = React.useState(false);
  const [confirmPasswordShow, setConfirmPasswordShow] = React.useState(false);

  const handleClickNewPassword = () => setNewPasswordShow((show) => !show);
  const handleClickConfirmPassword = () => setConfirmPasswordShow((show1) => !show1);

  
  const [successOpen, setSuccessOpen] = useState(false);


  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    } 
    setSuccessOpen(false); 
  };

  useEffect(() => { }, [navigate]);

  const submitNewPassword = async (e) => {
    e.preventDefault();
    setvalidatePassword("");
    if (newPassword.length<=0) { 
      setvalidatePassword("Please enter password");
    } 
   else if (newPassword.length < 8) {
      setNewPassword("");
      setConfirmPassword("");
      setvalidatePassword("Password not vaild.");
    } 
    else if (newPassword !== confirmPassword) {
      setConfirmPassword("");
      setConfirmvalidatePassword("Password doesn't match! Try Again");
    }  
     else if (newPassword == confirmPassword) {
      setConfirmPassword("");
      setNewPassword("");  
      await fetch(
        `${process.env.REACT_APP_API_URL}/password/forgot-password/${id}/${token}`,
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            new_password: newPassword,
          }),
        }
      )
        .then((response) => response.json())
        .then((data) => {
          setSuccessOpen(true); 
          setTimeout(() => { 
            if (data.isLoggedIn === true) 
          {
            navigate("/login");
           
        }
          }, 3000)
          
        })
        .catch((err) => console.log(err));
    }
  };

  const passwordStrengthCheck = (value,event) => { 
    // const re = new RegExp("^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).(?=.*[0-9]).{8,32}$");
    // const isOk = re.test(value); 
    // if(!isOk) {
    //   setvalidatePassword(" Ensure password complies with rules"); 
    // }
    // else {
    //   setvalidatePassword(" ");
    // } 
    // if (newPassword.length === 0) {
    //   setvalidatePassword("Required Field");
    // }
    
    const re = new RegExp("^(?=.*[0-9])(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$");
    const isOk = re.test(value);  
    if (value == '') {
      setvalidatePassword("Required Field");
     }  
    else if(!isOk) {
       setvalidatePassword(" Ensure password complies with rules"); 
       setConfirmvalidatePassword(" Ensure password complies with rules"); 
   } 
   else {
    setvalidatePassword(" ");
   }  
  };

  const buttonactive=(value,event)=>{
    if(value == newPassword){ 
      setactiveButton(false)  
      setConfirmvalidatePassword("");
     }
     else{
      setactiveButton(true)  
      setConfirmvalidatePassword("Password doesn't match! Try Again");
     }
     
  }

  return (
    <>
    <Helmet> 
        <title>{fotgotPasswordMeta.title}  </title>
        <meta name="og:description" content={fotgotPasswordMeta.description } data-react-helmet="true" />
        <meta name="keywords"  content={fotgotPasswordMeta.keywords} /> 
        <meta property="og:title" content={fotgotPasswordMeta.title } data-react-helmet="true" />
        <meta property="og:image" content={fotgotPasswordMeta.image} />
        <meta property="og:url" content={fotgotPasswordMeta.url} />
        <meta property="og:publisher" content={fotgotPasswordMeta.publisher} />
        <meta property="og:author " content={fotgotPasswordMeta.author} />
        <meta property="og:site_name" content={fotgotPasswordMeta.site_name} />
        <meta property="og:locale" content={fotgotPasswordMeta.locale} />
        <meta property="og:type" content={fotgotPasswordMeta.type}/>
        <link rel="canonical" href={fotgotPasswordMeta.canonical} />
      </Helmet>
      <div className="loginPage container-fluid">
        <Grid container spacing={2} justifyContent="center" alignItems="center">
          <Grid item xs={12} lg={3} sm={12}>
          <div className="text-center">
              <Link to="/">
                <img className=" logo" src={"/images/convertmlLogo.png"}  alt='convertml' />
              </Link>
            </div>
            <div className="mt-4">
              <br />
            </div>
            <h3> Reset Password</h3>
           
    <br/>
          {successOpen?<><div className="afterSend-message-show">
 <div className="emailsuccessfulsubmit"><h2 style={{paddingTop:'7px'}} >Thank you!</h2></div>
<br/>

<p>
Thank you! Your password has been update.   </p>

<p>If you have any question, feel free to reach out to <a href="mailto:support@convertml.ai">support@convertml.ai</a></p>
</div></>:<>  
         
    <form
      className="my-4"
      autoComplete="off"
      onSubmit={submitNewPassword}
    > 
 
<FormControl variant="outlined"  style={{width:'100%'}}>
        <InputLabel htmlFor="outlined-adornment-password" required>New password</InputLabel>
        <OutlinedInput  
          autoFocus
          id="outlined-adornment-password"
          placeholder="New password"
          type={newPasswordShow ? 'text' : 'password'}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickNewPassword}
                edge="end"
              >
                {newPasswordShow ? <VisibilityOff /> : <Visibility />} <small style={{ fontSize: '12px' }}>&nbsp;{newPasswordShow ? 'Hide' : 'Show'}</small>
              </IconButton>
            </InputAdornment>
          }
          label="New password"  
          onChange={(e) => {
            setNewPassword(e.target.value) 
            passwordStrengthCheck(e.target.value);
          }}
          value={newPassword}
          
        />
      </FormControl> 
      <span className={validatePassword=='Password correct'?'mt-1 text-xs font-mediumn valid-text-t':'mt-1 text-xs font-medium text-validation'}>
                      {validatePassword}
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
      <div className="clearfix"></div>
      <br/><br/>
     
     <FormControl variant="outlined"  style={{width:'100%'}}>
        <InputLabel htmlFor="outlined-adornment-password" required>Confirm new password</InputLabel> 
         <OutlinedInput
          id="outlined-adornment-password"
          placeholder="Confirm new password"
          type={confirmPasswordShow ? 'text' : 'password'}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickConfirmPassword}
                edge="end"
              >
                {confirmPasswordShow ? <VisibilityOff /> : <Visibility />} <small style={{ fontSize: '12px' }}>&nbsp;{confirmPasswordShow ? 'Hide' : 'Show'}</small>
              </IconButton>
            </InputAdornment>
          }
          label="Confirm new password" 
          onChange={(e) => {
            setConfirmPassword(e.target.value) 
            passwordStrengthCheck(e.target.value); 
            buttonactive(e.target.value)
          }}  
          value={confirmPassword}
        />
      </FormControl>  
     <span className={validatePassword=='Password correct'?'mt-1 text-xs font-mediumn valid-text-t':'mt-1 text-xs font-medium text-validation'}>
                      {confirmvalidatePassword}
                    </span> <br/><br/>
      <div className="py-3">
        <Button
          className="w-full" 
          variant='contained'
          type="submit"
          size="large"
          disabled={activeButton}
        >
          Reset Password  
        </Button>
        
      </div>
    </form>
    </>}
    <div className="text-center tracking-tight text-sm md:text-md">
                <span className="text-primary-light text-primary-light-font">
                  Return to &nbsp;
                  <Link to="/login" className="text-primary underline">
                    <u>Sign In</u>
                  </Link>
                </span>
              </div>
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

                  <div className="mt-2">
                    <div className="text-center">   <h3>Our Partners</h3> </div>    
                    <Grid container
                      direction="row"
                      justifyContent="space-around"
                      alignItems="center" spacing={2}>
                    <Grid item xs={12} lg={7} sm={12}>
                    <Grid container
                      direction="row"
                      justifyContent="space-around"
                      alignItems="center" spacing={2}>
                      <Grid xs={6} lg={3} sm={3}>
                        <img
                          src={"/images/partners/typeform.svg"}
                          alt='convertml' 

                        />
                      </Grid>
                      <Grid xs={6} lg={3} sm={3}>
                        <img
                          src={"/images/partners/salesforce.svg"}
                          alt='convertml' 

                        />
                      </Grid>
                      <Grid xs={6} lg={3} sm={3}>
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
                    </Grid>  </Grid> 
                  </div>
                </div>
              </div>
            </Grid>
            </Grid> 
            </div>
             
    </>

  );
}

export default ForgotPasswordPage;
