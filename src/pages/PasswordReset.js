import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import NavbarHomepage from "../components/NavbarAuth";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function PasswordReset() {
    const navigate = useNavigate();

    const [successOpen, setSuccessOpen] = useState(false);
    const [failureOpen, setFailureOpen] = useState(false);

    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        setSuccessOpen(false);
        setFailureOpen(false);
    };


    useEffect(() => { }, [navigate]);


    return (
        <div>
            {/* <NavbarHomepage /> */}
            <div className="loginSection min-h-screen h-full flex justify-center">
                <div className="w-full max-w-2xl lg:w-1/2 flex flex-col items-center justify-center gap-1 pb-10 pt-20 px-5">
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
                    <div className="text-2xl w-full max-w-2xl lg:w-2/3 text-left text-bold">Password reset link was send to you email</div>
                    <div className="pr-10 py-5 w-full md:w-2/3 max-w-2xl text-primary-light text-primary-light-font">
                        You will receive an e-mail from us in the next few minutes. Click on the link in the email to change your password.
                    </div>
                    <div className="w-full md:w-2/3 max-w-2xl text-left tracking-tight text-sm md:text-md">
                        <span><Link to="/forgot-password" className="text-primary underline">
                            Resend an email
                        </Link></span>
                    </div>
                </div>
                <div className="lg:flex hidden w-1/2 h-screen max-h-screen flex flex-col justify-center items-center py-10 px-5 bg-sidebar right-sidebar">

                    <div className="pt-3 our-partners-logo">
                        <div className="flex justify-end items-center">
                            <Link className="flex items-center justify-center" to="/">
                                <img
                                    className="w-44 my-4 text-center mx-auto" alt={"Convertml"}
                                    src={"/images/convertmlLogo.png"}
                                />
                            </Link>
                        </div>
                        <div className="gap-3 w-full lg:w-2/3">
                            ConvertML - the ultimate customer retention platform. Convert leads with AI powered insights and engagement in minutes.
                        </div>
                        <img src={"/images/authImage.png"} alt='convertml' className="py-3 img-sidebar" />
                        <div className="gap-3 w-full md:w-3/3 py-3 text-center">
                            Our Partners
                        </div>
                        <div className="gap-3 w-full">
                            <div class="grid grid-flow-col grid-rows-1 grid-cols-5 gap-2 mb-2">
                                <div className="px-4 py-4 grid justify-center items-center border-sidebar rounded-xl">
                                    <img src={"/images/partners/typeform.svg"}  alt='convertml' style={{ maxHeight: '100px', margin: '0 auto' }} />
                                </div>
                                <div className="px-4 py-4 grid justify-center items-center border-sidebar rounded-xl">
                                    <img src={"/images/partners/hubspot.svg"}  alt='convertml' style={{ maxHeight: '100px', margin: '0 auto' }} />
                                </div>
                                <div className="px-4 py-4 grid justify-center items-center border-sidebar rounded-xl">
                                    <img src={"/images/partners/salesforce.svg"}  alt='convertml' style={{ maxHeight: '100px', margin: '0 auto' }} />
                                </div>
                                <div className="px-4 py-4 grid justify-center items-center border-sidebar rounded-xl">
                                    <img src={"/images/partners/google-bigquery.svg"}  alt='convertml' style={{ maxHeight: '100px', margin: '0 auto' }} />
                                </div>
                                <div className="px-4 py-4 grid justify-center items-center border-sidebar rounded-xl">
                                    <img src={"/images/partners/couchdb.svg"}  alt='convertml' style={{ maxHeight: '100px', margin: '0 auto' }} />
                                </div>
                            </div>

                            <div class="grid grid-flow-col grid-rows-1 grid-cols-5 gap-2">
                                <div className="px-4 py-4 grid justify-center items-center border-sidebar rounded-xl">
                                    <img src={"/images/partners/google-bigquery.svg"}  alt='convertml' style={{ maxHeight: '100px', margin: '0 auto' }} />
                                </div>
                                <div className="px-4 py-4 grid justify-center items-center border-sidebar rounded-xl">
                                    <img src={"/images/partners/couchdb.svg"}  alt='convertml' style={{ maxHeight: '100px', margin: '0 auto' }} />
                                </div>
                                <div className="px-4 py-4 grid justify-center items-center border-sidebar rounded-xl">
                                    <img src={"/images/partners/hubspot.svg"}  alt='convertml' style={{ maxHeight: '100px', margin: '0 auto' }} />
                                </div>
                                <div className="px-4 py-4 grid justify-center items-center border-sidebar rounded-xl">
                                    <img src={"/images/partners/salesforce.svg"}  alt='convertml' style={{ maxHeight: '100px', margin: '0 auto' }} />
                                </div>
                                <div className="px-4 py-4 grid justify-center items-center border-sidebar rounded-xl">
                                    <img src={"/images/partners/typeform.svg"}  alt='convertml' style={{ maxHeight: '100px', margin: '0 auto' }} />
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default PasswordReset;
