import {
    Box, Button, CircularProgress, Grid, ListItemIcon, ListItemText, MenuList, MenuItem, Typography, TextField, Card, CardContent, Avatar,
    CardMedia,
    IconButton,
    styled,
    Tooltip,
    InputAdornment,
    OutlinedInput,
    InputLabel,
    FormControl,
    Stack
} from "@mui/material";
import {
    Link,
    Routes,
    Route,
    useNavigate,
  } from 'react-router-dom';
import { Helmet } from "react-helmet-async"; 
import React, { useContext, useEffect, useState } from "react";
import { SessionContext } from "../../../contexts/SessionContext";
import axios from "axios"; 
import { LazyLoadImage } from "react-lazy-load-image-component";
import HeaderButtons from "../../../layouts/ExtendedSidebarLayout/Header/Buttons";
import HeaderUserbox from "../../../layouts/ExtendedSidebarLayout/Header/Userbox";
import UploadFileRoundedIcon from '@mui/icons-material/UploadFileRounded';

import DeleteIcon from '@mui/icons-material/Delete';
 
// import { Flare, Visibility, VisibilityOff } from "@mui/icons-material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Buffer } from 'buffer';

import { useDispatch, useSelector } from "../../../store";
import { data } from "browserslist";



const Input = styled("input")({
    display: "none",
});

const AvatarWrapper = styled(Card)(
    ({ theme }) => `
  
      position: relative;
      overflow: visible;
      display: inline-block;
      margin-top: -${theme.spacing(9)};
      margin-left: ${theme.spacing(2)};
  
      .MuiAvatar-root {
        width: ${theme.spacing(16)};
        height: ${theme.spacing(16)};
      }
  `
);

const ButtonUploadWrapper = styled(Box)(
    ({ theme }) => `
      position: absolute;
      width: ${theme.spacing(4)};
      height: ${theme.spacing(4)};
      bottom: -${theme.spacing(1)};
      right: -${theme.spacing(1)};
  
      .MuiIconButton-root {
        border-radius: 100%;
        background: ${theme.colors.primary.main};
        color: ${theme.palette.primary.contrastText};
        box-shadow: ${theme.colors.shadows.primary};
        width: ${theme.spacing(4)};
        height: ${theme.spacing(4)};
        padding: 0;
    
        &:hover {
          background: ${theme.colors.primary.dark};
        }
      }
  `
);

export default function UserProfile() {

    const navigate = useNavigate();

    const [session, , , updateSession, , , userImg, updateImg] = useContext(SessionContext);
    const { user } = session;

    const [announcement, Isannouncement] = useState(true);
    const [tabsection, setTabsection] = useState('Your Profile');

    const [isEditable, setIsEditable] = useState(true);
    const [userDetail, setUserDetail] = useState({ username: "", last_name: "", company_email: "", phone_number: "", company_name: "", id: "" });

    const [userPassword, setUserPassword] = useState({ newPassword: "", confirmPassword: "" });
    const [validatePasswordMessage, setvalidatePasswordMessage] = useState({ isValid: false, message: "" });


    const hideannouncementBar = () => {
        Isannouncement(false);
    }
    const [showLoder, setLoaderShow] = useState(false);

 

    const [showPassword, setShowPassword] = React.useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const [showConfrmPassword, setShowConfrmPassword] = React.useState(false);
    const handleClickShowConfrmPassword = () => setShowConfrmPassword((show) => !show);


    const leftMenuItem = [
        {
            name: "Your Profile",
            link: "profile",
            iconClass: 'fa fa-user-circle-o',
            class: 'active'
        },
        // {
        //     name: "Your Plan",
        //     link: "plan",
        //     iconClass: 'fa fa-credit-card', 
        //     class:''
        // },
        // {
        //     name: "Support",
        //     link: "support",
        //     iconClass: 'fa fa-headphones',
        //     class:'' 
        // },
    ];



    //image upload
    const [defaultImg, selectedImg] = useState("");
      const [defaultCover, selectedCover] = useState("");


    // const dispatch = useDispatch();

    // const { userProfileImg } = useSelector(
    //     (state) => state.userImg
    // );

    // useEffect(async () => {
    //     const res = userProfileImg//await updateSession();
    //     selectedImg(res.profile_image == "" ? "/json-media/img/user-profile.png" : "data:" + res.profile_image.imageType + ";base64," + res.profile_image.image)
    //     selectedCover(res.cover_image == "" ? "/images/profile_cover_3.jpeg" : "data:" + res.cover_image.imageType + ";base64," + res.cover_image.image)
    // }, [userProfileImg]);

    

    useEffect(async () => { 
        await updateSession()
         await updateImg()
    }, []);


    const imageHandler = async (reqType,e) => {
      if(reqType=='false'){
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState === 2) {
                selectedImg(reader.result)
            }
        }
        reader.readAsDataURL(e.target.files[0]) 
        const file = e.target.files[0]; 
        const formData = new FormData();
        formData.append('title', e.target.files[0].name);
        formData.append('file', file)
        formData.append('userId', user._id);
        formData.append('imgremove', reqType);
        uploadUserImg(formData, "updateLoggedUserImages");
      }
      else{
        var f = new File([""], "filename.txt", {type: "text/plain", lastModified: new Date()})
        const formData = new FormData();
        formData.append('title',"");
        formData.append('file', f)
        formData.append('userId', user._id);
        formData.append('imgremove', reqType);
        uploadUserImg(formData, "updateLoggedUserImages");
        selectedImg("/json-media/img/user-profile.png");
        
      } 
        // console.log(formData)
    }

    const uploadUserImg = async (formData, routePth) => {
        await axios
            .post(`${process.env.REACT_APP_API_URL}/user/${routePth}`, formData,
                {
                    headers: {
                        "Content-type": "multipart/form-data",
                    },
                    withCredentials: true,
                })
            .then(async (data) => {
                await updateImg()
                console.log(data)
                // dispatch(getEvents1());
            })
            .catch((err) => {
                console.log(err);
            });

    }



    const selectTabs = (stab) => {
        setTabsection(stab)
    }

    const editUserInformation = async () => {
        let tmpEditable1 = !isEditable
        if (tmpEditable1) {
            await axios.post(
                `${process.env.REACT_APP_API_URL}/user/updateLoggedUser`,
                userDetail
            ).then(async (response) => {
                await updateSession()
                // console.log(response);
            })
                .catch((error) => {
                    console.log(error);
                });
        }
        setIsEditable(tmpEditable1)
    }

    useEffect(async () => {
        const res = userImg.user
        selectedImg(res == undefined && '' ? "/json-media/img/user-profile.png" : "data:" + res.profile_image.imageType + ";base64," + res.profile_image.image)
    }, [userImg]);

    useEffect(async () => {
        let newUserDetail = {
            username: user.username, last_name: user.last_name, company_email: user.company_email, phone_number: user.phone_number, company_name: user.company_name, id: user._id
        }
        setUserDetail(newUserDetail);
    }, [user]);


    const editUserPassword = async () => {
        const re = new RegExp("^(?=.*[0-9])(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$");
        const isOk = re.test(userPassword.confirmPassword);
        if (!isOk) {

            setvalidatePasswordMessage({ isValid: false, message: "Ensure password complies with rules" });
        }
        else if (userPassword.newPassword != userPassword.confirmPassword) {
            setvalidatePasswordMessage({ isValid: false, message: "Password doesn't match! Try Again " });
        }
        else {

            await axios.post(
                `${process.env.REACT_APP_API_URL}/user/updatePassword`,
                { newPassword: userPassword.newPassword, confirmPassword: userPassword.confirmPassword, id: user._id }
            ).then(async (response) => {
                if (response.data.success) {
                    setUserPassword({ newPassword: "", confirmPassword: "" })
                    setvalidatePasswordMessage({ isValid: true, message: response.data.message });
                }
                console.log(response);
            })
                .catch((error) => {
                    console.log(error);
                });
        }

    }








    return (
        <>
            <div className="container-full">
                {/* -------------------- header section -------------------- */}
                <div className="after-login-header" style={{ marginBottom: 0 }}>
                    {announcement ? <> <div class="announcement"><a className="fa fa-times-circle close-icon" onClick={() => hideannouncementBar()}></a>
                        <div class="container">
                            <div class="announcement-text">
                                <Link to="/power-user-program-convertml">  <b> Pioneer with the 20 leaders! Join the <strong>Power User Program</strong> for exclusive benefits.</b></Link>
                            </div> </div></div></> : <> </>}

                    <Grid container spacing={2}>
                        <Grid item xs={4}>
                            <Link to="/">
                                <LazyLoadImage
                                    className="logo"
                                    src={"/json-media/img/convertmlLogo.png"}
                                    alt={"Convertml"}
                                />
                            </Link>

                        </Grid>
                        <Grid item xs={4}>

                        </Grid>
                        <Grid item xs={4}>
                            <div className="float-right">
                                <Box display="flex">
                                    <HeaderButtons />
                                    <HeaderUserbox />
                                </Box>
                            </div>
                        </Grid>
                    </Grid>
                </div>

                {/* -------------------- header section end -------------------- */}
                <section className="left-navigation">
                    <div>
                        <img
                            src={defaultImg}
                            alt="user-profile"
                            width={40}
                            className='float-left mr-3'
                        />
                        <div><b className="capitalize">{userDetail.username}</b> <br /><small>  <a href={'mailto:' + '{user.company_email}'}>{userDetail.company_email}</a></small></div>
                    </div><br />
                    <ul>
                        {leftMenuItem.map((item) => <li onClick={(e) => selectTabs(item.name)}><a className={tabsection == item.name ? 'active' : ''}><i className={item.iconClass}></i> {item.name}</a></li>)}
                    </ul>
                </section>
                <section className="main-container">
                    {tabsection == 'Your Profile' ? <>
                        <Grid
                            direction="row"
                            justifyContent="space-between"
                            alignItems="baseline"
                            className="mb-3"
                        >
                            <Typography
                                variant="h4"
                                component="h4"
                                gutterBottom
                                style={{ fontSize: "20px" }}
                            >
                                Your Profile
                            </Typography>

                        </Grid>
                        <hr style={{ border: '1px solid #ddd' }} />
                        <Grid
                            container
                            spacing={2}
                            direction="row"
                            justifyContent="left"
                            alignItems="center"
                        >
                            <Grid item xs={12} md={3} lg={3}>
                                <img
                                    src={defaultImg}
                                    alt="user-profile"
                                    width={80}
                                    className='float-left mr-3'
                                />
                                <div className="mt-3">
                                    Upload your profile photo
                                </div>

                            </Grid>
                            <Grid item xs={12} md={3} lg={3}>

                                {/* <AvatarWrapper>
                                    <Avatar
                                        variant="rounded"
                                        alt={user.username}
                                        src={defaultImg}
                                    />
                                    <ButtonUploadWrapper>
                                        <Input
                                            accept="image/*"
                                            id="icon-button-file"
                                            name="icon-button-file"
                                            type="file"
                                            
                                        />
                                    </ButtonUploadWrapper>
                                </AvatarWrapper> */}
                                <Button
                                style={{width:'120px'}}
                                    variant="outlined"
                                    component="label"
                                    startIcon={<UploadFileRoundedIcon />}
                                >
                                    Upload
                                    <input
                                        accept="image/*"
                                        type="file"
                                        onChange={(e) => imageHandler('false', e)} 
                                        hidden
                                    />
                                </Button> 
                                <Button
                                style={{width:'120px',marginLeft:'10px'}}
                                    variant="outlined"
                                    component="label"
                                    startIcon={<DeleteIcon />}
                                >
                                    Remove
                                    <input
                                        accept="image/*"
                                        type="button"
                                        onClick={(e) => imageHandler('true', e)}   
                                        hidden
                                    />
                                </Button>



                            </Grid>
                        </Grid>
                        <h4>Your Personal detail</h4>
                        <form>
                            <Grid
                                container
                                spacing={2}
                                direction="row"
                                justifyContent="left"
                                alignItems="center"
                            >
                                <Grid item xs={12} md={4} lg={4}>
                                    <TextField
                                        autoComplete="Company Name"
                                        className="inputBox"
                                        autoFocus
                                        disabled={isEditable}
                                        value={userDetail.company_name}
                                        label="Company Name"
                                        type="text"
                                        placeholder="Company Name"
                                        id="companyName"
                                        onChange={(event) => {
                                            setUserDetail((prevState) => {
                                                return {
                                                    ...prevState,
                                                    company_name: event.target.value,
                                                };
                                            });
                                        }}
                                    />
                                </Grid>
                            </Grid> <br />
                            <Grid
                                container
                                spacing={2}
                                direction="row"
                                justifyContent="left"
                                alignItems="center"
                            >
                                <Grid item xs={12} md={4} lg={4}>
                                    <TextField required
                                        autoComplete="First Name"
                                        className="inputBox"
                                        autoFocus
                                        value={userDetail.username}
                                        disabled={isEditable}
                                        label="First Name"
                                        type="text"
                                        placeholder="First Name"
                                        id="FirstName"
                                        onChange={(event) => {
                                            setUserDetail((prevState) => {
                                                return {
                                                    ...prevState,
                                                    username: event.target.value,
                                                };
                                            });
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} md={4} lg={4}>
                                    <TextField
                                        autoComplete="Last Name"
                                        className="inputBox"
                                        autoFocus
                                        value={userDetail.last_name}
                                        disabled={isEditable}
                                        label="Last Name"
                                        type="text"
                                        placeholder="Last Name"
                                        id="LastName"
                                        onChange={(event) => {
                                            setUserDetail((prevState) => {
                                                return {
                                                    ...prevState,
                                                    last_name: event.target.value,
                                                };
                                            });
                                        }}
                                    />
                                </Grid>
                            </Grid> <br />
                            <Grid
                                container
                                spacing={2}
                                direction="row"
                                justifyContent="left"
                                alignItems="center"
                            >
                                <Grid item xs={12} md={4} lg={4}>
                                    <TextField
                                        required
                                        autoComplete="Email Id"
                                        className="inputBox"
                                        autoFocus
                                        value={userDetail.company_email}
                                        disabled={true}
                                        label="Email Id"
                                        type="text"
                                        placeholder="Email Id"
                                        id="emailId"

                                    />
                                </Grid>
                                <Grid item xs={12} md={4} lg={4}>
                                    <TextField
                                        autoComplete="Phone No."
                                        className="inputBox"
                                        autoFocus
                                        value={userDetail.phone_number}
                                        disabled={isEditable}
                                        label="Phone No."
                                        type="text"
                                        placeholder="Phone No."
                                        id="phoneNo"
                                        onChange={(event) => {
                                            setUserDetail((prevState) => {
                                                return {
                                                    ...prevState,
                                                    phone_number: event.target.value,
                                                };
                                            });
                                        }}
                                    />
                                </Grid>

                            </Grid>
                            <div className="clearfix"></div><br />
                            <Stack direction="row" spacing={1}>
                            <Button variant="outlined"    onClick={(e) => editUserInformation()}>{!isEditable ? "Update" : "Edit"}</Button>
                            <Button variant="outlined" onClick={() => setIsEditable(true)}>Cancel</Button>
                            </Stack>
                        </form>
                        <h4>Password Update</h4>
                        <form>
                            <Grid
                                container
                                spacing={2}
                                direction="row"
                                justifyContent="left"
                                alignItems="center"
                            >
                                <Grid item xs={12} md={4} lg={4}>
                                <FormControl variant="outlined" className="inputBox">
                                        <InputLabel htmlFor="outlined-newadornment-password" required>
                                        New Password
                                        </InputLabel>
                                        <OutlinedInput
                                            id="outlined-adornment-newpassword"
                                            placeholder="New Password"
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
                                            label="New Password"
                                            onChange={(event) => {
                                                setUserPassword((prevState) => {
                                                    return {
                                                        ...prevState,
                                                        newPassword: event.target.value,
                                                    };
                                                });
                                            }}
                                            value={userPassword.newPassword}
                                        />
                                    </FormControl>
                                    {/* <TextField
                                        autoComplete="New Password"
                                        className="inputBox"
                                        autoFocus
                                        label="New Password"
                                        type="password"
                                        placeholder="New Password"
                                        value={userPassword.newPassword}
                                        id="newPassword"
                                        onChange={(event) => {
                                            setUserPassword((prevState) => {
                                                return {
                                                    ...prevState,
                                                    newPassword: event.target.value,
                                                };
                                            });
                                        }}
                                    /> */}
                                </Grid>
                                <Grid item xs={12} md={4} lg={4}>

                                    <FormControl variant="outlined" className="inputBox">
                                        <InputLabel htmlFor="outlined-confadornment-password" required>
                                        Confirm Password
                                        </InputLabel>
                                        <OutlinedInput
                                            id="outlined-confadornment-password"
                                            placeholder="Confirm Password"
                                            type={showConfrmPassword ? "text" : "password"}
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={handleClickShowConfrmPassword}
                                                        edge="end"
                                                    >
                                                        {showConfrmPassword ? <VisibilityOff /> : <Visibility />}{" "}
                                                        <small style={{ fontSize: "12px" }}>
                                                            &nbsp;{showConfrmPassword ? "Hide" : "Show"}
                                                        </small>
                                                    </IconButton>
                                                </InputAdornment>
                                            }
                                            label="Confirm Password"
                                            onChange={(event) => {
                                                setUserPassword((prevState) => {
                                                    return {
                                                        ...prevState,
                                                        confirmPassword: event.target.value,
                                                    };
                                                });
                                            }}
                                            value={userPassword.confirmPassword}
                                        />
                                    </FormControl>

                                    {/* <TextField
                                        autoComplete="Confirm Password"
                                        className="inputBox"
                                        autoFocus
                                        label="Confirm Password"
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
                                        placeholder="Confirm Password"
                                        id="confirmPassword"
                                        value={userPassword.confirmPassword}
                                        onChange={(event) => {
                                            setUserPassword((prevState) => {
                                                return {
                                                    ...prevState,
                                                    confirmPassword: event.target.value,
                                                };
                                            });
                                        }}
                                    /> */}

                                </Grid>
                                <Tooltip style={{ float: 'right', marginTop: '5px', marginLeft: '10px' }} title={
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
                                    {/* Password Rules */}
                                    <span className="error-text">   <i className="fa fa-info-circle icon-size"></i></span>
                                </Tooltip>
                            </Grid>
                            {/* valid-text */}
                            <p className={validatePasswordMessage.isValid ? "valid-text m-0" : "error-text m-0"}>{validatePasswordMessage.message}</p>
                             
                            <div className="clearfix"></div><br />
                            <Button variant="outlined" className="mr-2" disabled={userPassword.newPassword != "" && userPassword.confirmPassword != "" ? false : true}   onClick={(e) => editUserPassword()}>Update Password</Button>
                            {/* <Button variant="contained" size="large" disabled={true}>Cancel</Button> */}
                        </form></> : ''}

                    {tabsection == 'Your Plan' ? <> <Grid
                        direction="row"
                        justifyContent="space-between"
                        alignItems="baseline"
                        className="mb-3"
                    >
                        <Typography
                            variant="h4"
                            component="h4"
                            gutterBottom
                            style={{ fontSize: "20px" }}
                        >
                            Your Plan
                        </Typography>

                    </Grid>
                        <hr style={{ border: '1px solid #ddd' }} />
                        <Grid
                            container
                            spacing={2}
                            direction="row"
                            justifyContent="left"
                            alignItems="center"
                        >
                            <Grid item xs={12} md={4} lg={4}>
                                <b> Billing Plan & Period</b>
                                <a className="text-link float-right">Change Plan</a>
                                <Card variant="outlined" className="grey-card mt-2">
                                    <CardContent>
                                        <h2 className="m-0">FREE Plan</h2>
                                        <div className="float-left">Best for Personal Use</div>
                                        <div className="float-right"><h1 className="float-left m-0 mt-n1">$0</h1>/3months</div>
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item xs={12} md={4} lg={4}>
                                <b>Payment Methord</b>
                                <a className="text-link float-right">Change Plan</a>
                                <Card variant="outlined" className="grey-card mt-2">
                                    <CardContent>
                                        <h2 className="m-0">FREE Plan</h2>
                                        <div className="float-left">Best for Personal Use</div>
                                        <div className="float-right"><h1 className="float-left m-0 mt-n1">$0</h1>/3months</div>
                                    </CardContent>
                                </Card>
                            </Grid>
                        </Grid>
                        <h3>Billing History</h3>
                        <Grid
                            container
                            spacing={2}
                            direction="row"
                            justifyContent="left"
                            alignItems="center"
                        >
                            <Grid item xs={12} md={8} lg={8}>
                                <div className="table-responsive">
                                    <table className="table ">
                                        <thead>
                                            <tr>
                                                <th>Date</th>
                                                <th>Invoice No.</th>
                                                <th>Amount</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>09 Feb 2023</td>
                                                <td>AT-001</td>
                                                <td>$150.00</td>
                                                <td> <a className="text-link float-right">Download Bill</a></td>
                                            </tr>
                                            <tr>
                                                <td>09 Feb 2023</td>
                                                <td>AT-001</td>
                                                <td>$150.00</td>
                                                <td> <a className="text-link float-right">Download Bill</a></td>
                                            </tr>
                                            <tr>
                                                <td>09 Feb 2023</td>
                                                <td>AT-001</td>
                                                <td>$150.00</td>
                                                <td> <a className="text-link float-right">Download Bill</a></td>
                                            </tr>
                                            <tr>
                                                <td>09 Feb 2023</td>
                                                <td>AT-001</td>
                                                <td>$150.00</td>
                                                <td> <a className="text-link float-right">Download Bill</a></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </Grid>
                        </Grid>
                    </> : ''}


                    {tabsection == 'Support' ? <>
                        <Grid
                            direction="row"
                            justifyContent="space-between"
                            alignItems="baseline"
                            className="mb-3"
                        >
                            <Typography
                                variant="h4"
                                component="h4"
                                gutterBottom
                                style={{ fontSize: "20px" }}
                            >
                                Support
                            </Typography>

                        </Grid>
                        <hr style={{ border: '1px solid #ddd' }} />
                    </> : ''}
                </section>
            </div>
        </>
    );
}

