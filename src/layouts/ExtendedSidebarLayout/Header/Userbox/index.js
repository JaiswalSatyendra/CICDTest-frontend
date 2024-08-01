import { useRef, useState, useContext, } from "react";
import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";
import { SessionContext } from "../../../../contexts/SessionContext";
import React, { useEffect, } from "react";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, } from "@mui/material";

import TextField from '@mui/material/TextField';
import {
  Avatar,
  Box,
  Button,
  Divider,
  MenuList,
  alpha,
  IconButton,
  MenuItem,
  ListItemText,
  Popover,
  Typography,
  styled,
  useTheme,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import LockOpenTwoToneIcon from "@mui/icons-material/LockOpenTwoTone";
import AssignmentIcon from '@mui/icons-material/Assignment';
import RateReviewIcon from '@mui/icons-material/RateReview';
import ChevronRightTwoToneIcon from "@mui/icons-material/ChevronRightTwoTone";
import Chart from "react-apexcharts";
import ArticleIcon from '@mui/icons-material/Article';
import Text from "../../../../components/Text";
import MonetizationOnTwoToneIcon from "@mui/icons-material/MonetizationOnTwoTone";
import { useDispatch, useSelector } from "../../../../store";
import axios from "axios";



const UserBoxButton = styled(IconButton)(
  ({ theme }) => `
  width: ${theme.spacing(4)};
  padding: 0;
  height: ${theme.spacing(4)};
  margin-left: ${theme.spacing(1)};
  border-radius: ${theme.general.borderRadiusLg};
  
  &:hover {
    background: ${theme.colors.primary.main};
  }
`
);


const UserAvatar = styled(Avatar)(
  ({ theme }) => `
        height: 90%;
        width: 90%;
        border-radius: ${theme.general.borderRadiusLg};
`
);

const MenuListWrapperPrimary = styled(MenuList)(
  ({ theme }) => `
  padding: ${theme.spacing(2)};

  & .MuiMenuItem-root {
      border-radius: 50px;
      padding: ${theme.spacing(1, 1, 1, 2.5)};
      min-width: 200px;
      margin-bottom: 2px;
      position: relative;
      color: ${theme.colors.alpha.black[100]};

      &.Mui-selected,
      &:hover,
      &.MuiButtonBase-root:active {
          background: ${theme.colors.primary.lighter};
          color: ${theme.colors.primary.main};
      }

      &:last-child {
          margin-bottom: 0;
      }
    }
`
);

const MenuUserBox = styled(Box)(
  ({ theme }) => `
        background: ${alpha(theme.colors.alpha.black[100], 0.08)};
        padding: ${theme.spacing(2)};
`
);

const UserBoxText = styled(Box)(
  ({ theme }) => `
        text-align: left;
        padding-left: ${theme.spacing(1)};
`
);

const UserBoxLabel = styled(Typography)(
  ({ theme }) => `
        font-weight: ${theme.typography.fontWeightBold};
        color: ${theme.palette.secondary.main};
        display: block;
`
);

const UserBoxDescription = styled(Typography)(
  ({ theme }) => `
        color: ${theme.palette.secondary.light}
`
);

function HeaderUserbox() {
  const { t } = useTranslation();
  const theme = useTheme();
  const [openpopUP, setopenpopUP] = React.useState(false);
  const [feedbackopenpopUP, setfeedbackopenpopUP] = React.useState(false);

  const [scroll, setScroll] = React.useState("paper");

  // const handleClickOpen = (scrollType) => () => {
  //   setopenpopUP(true);
  //   setScroll(scrollType);
  // };
  const handleClickOpen = () => {
    setopenpopUP(true);
  };

  const handlePopupClose = () => {
    setopenpopUP(false);
    setfeedbackopenpopUP(false);
  };

  const feedbackClickOpen = () => {
    setfeedbackopenpopUP(true);
  };

  const goprojectPage = () => {
    navigate("/dashboard/data-platform/project-management");
  }


  const navigate = useNavigate();
  const [session, , logout, updateSession, , , userImg, updateImg] = useContext(SessionContext);
  const { user } = session;
  const ref = useRef(null);
  const [isOpen, setOpen] = useState(false);

  const [userDetail, setUserDetail] = useState({ username: "", company_name: "" });
  const [defaultImg, selectedImg] = useState("");

  useEffect(async () => {
    await axios
      .post(`${process.env.REACT_APP_API_URL}/user/updateFirstTimeLogin`, {
        user_id: user._id,
      }, {
        headers: {
          "Content-type": "application/json",
          "token": Cookies.get("token")
        },
        withCredentials: true,
      })
      .then((response) => {
        if (response.data.success) {
          setopenpopUP(true);
        } else {
          setopenpopUP(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    await updateSession()
    await updateImg()
  }, []);

  useEffect(async () => {
    const res = userImg.user
    selectedImg(res == undefined ? "/json-media/img/user-profile.png" : "data:" + res.profile_image.imageType + ";base64," + res.profile_image.image)
  }, [userImg]);


  useEffect(async () => {
    localStorage.setItem("loggedInUser", user.username)
    setUserDetail({ username: user.username, company_name: user.company_name })
  }, [user]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleLogout = async () => {
    try {
      await logout();
      handleClose();
      navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };

  const Box1Options = {
    chart: {
      background: "transparent",
      toolbar: {
        show: false,
      },
      sparkline: {
        enabled: true,
      },
      zoom: {
        enabled: false,
      },
    },
    labels: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
      "Last Week",
      "Last Month",
      "Last Year",
      "Last Decade",
    ],
    theme: {
      mode: theme.palette.mode === "dark" ? "light" : "dark",
    },
    stroke: {
      colors: [theme.colors.error.main],
      curve: "smooth",
      width: 3,
    },
    grid: {
      padding: {
        right: 5,
        left: 5,
        bottom: 5,
      },
    },
    tooltip: {
      fixed: {
        enabled: true,
      },
      x: {
        show: false,
      },
      y: {
        title: {
          formatter() {
            return "Orders:";
          },
        },
      },
      marker: {
        show: true,
      },
    },
    colors: [theme.colors.error.main],
  };
  const Box1Data = [
    {
      name: "Revenue",
      data: [465, 546, 234, 576, 554, 338, 427, 348, 586, 254, 348],
    },
  ];

  return (
    <>
      <UserBoxButton color="primary" ref={ref} onClick={handleOpen}>
        <UserAvatar alt={user.username} src={defaultImg} />
      </UserBoxButton>
      <Popover
        disableScrollLock
        anchorEl={ref.current}
        onClose={handleClose}
        open={isOpen}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuUserBox
          sx={{
            minWidth: 210,
          }}
          display="flex"
        ><Link to='/user-profile'>
            <Avatar
              variant="rounded"
              alt={user.username}
              src={defaultImg}
              className='float-left'
            />
            <UserBoxText className='float-right'>
              <UserBoxLabel variant="body1">{userDetail.username}</UserBoxLabel>
              <UserBoxDescription variant="body2">
                {userDetail.company_name}
              </UserBoxDescription>
            </UserBoxText></Link>
        </MenuUserBox>
        {/* <Divider
          sx={{
            mb: 0,
          }}
        /> */}
        {/* <MenuListWrapperPrimary disablePadding>
          <MenuItem
            component={Link}
            to={`/dashboard/users/${user._id}`}
            onClick={() => {
              handleClose();
            }}
          >
            <ListItemText
              primaryTypographyProps={{
                variant: "h5",
              }}
              primary={t("Profile")}
            />
            <ChevronRightTwoToneIcon
              sx={{
                color: `${theme.colors.alpha.black[30]}`,
                opacity: 0.8,
              }}
            />
          </MenuItem>

          {/* <MenuItem
            component={Link}
            to="/dashboard/projects"
            onClick={() => {
              handleClose();
            }}
          >
            <ListItemText
              primaryTypographyProps={{
                variant: "h5",
              }}
              primary={t("Projects")}
            />
            <ChevronRightTwoToneIcon
              sx={{
                color: `${theme.colors.alpha.black[30]}`,
                opacity: 0.8,
              }}
            />
          </MenuItem>  /}

          <MenuItem
            component={Link}
            to="/dashboard/campaigns"
            onClick={() => {
              handleClose();
            }}
          >
            <ListItemText
              primaryTypographyProps={{
                variant: "h5",
              }}
              primary={t("Campaigns")}
            />
            <ChevronRightTwoToneIcon
              sx={{
                color: `${theme.colors.alpha.black[30]}`,
                opacity: 0.8,
              }}
            />
          </MenuItem>
        </MenuListWrapperPrimary> */}
        {/* <Button color="primary" fullWidth to={"/dashboard/data-platform/project-management"}><AssignmentIcon sx={{ mr: 1, }} />   Projects </Button><br/> */}
        <div className="text-left">
          <Button color="primary" onClick={(e) => goprojectPage(e)} className="text-left"><ArticleIcon sx={{ mr: 1, }} />   Projects    <div className="pr-2 ">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div></Button><br />
          <Button color="primary" onClick={(e) => handleClickOpen(e)}><AssignmentIcon sx={{ mr: 1, }} />   Guided Workflow </Button><br />
          <Button color="primary" onClick={(e) => feedbackClickOpen(e)}><RateReviewIcon sx={{ mr: 1, }} />   Submit Feedback </Button>
          <Divider />
        </div>

        {/* <Box m={1}>
          <Box px={2} pt={1} pb={0.5} display="flex" alignItems="flex-start">
            <Text color="warning">
              <MonetizationOnTwoToneIcon fontSize="large" />
            </Text>
            <Box ml={1}>
              <Typography variant="h3">$14,264</Typography>
              <Typography noWrap variant="subtitle2">
                {t("total value")}
              </Typography>
            </Box>
          </Box>
          <Chart
            options={Box1Options}
            series={Box1Data}
            type="line"
            height={60}
          />
        </Box>
        <Divider /> */}
        <Box m={1}>
          <Button color="primary" fullWidth onClick={handleLogout}>
            <LockOpenTwoToneIcon
              sx={{
                mr: 1,
              }}
            />
            {t("Sign out")}
          </Button>
        </Box>
      </Popover>

      {/* ----------------- Demo -----------------  */}
      <Dialog
        open={openpopUP}
        onClose={handlePopupClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        minWidth="full"
        maxWidth="full"
      >
        <DialogContent dividers={scroll === "paper"}>
          <DialogContentText id="alert-dialog-description">
            <iframe width="1600" height="750" src="https://app.storylane.io/share/phd5kqcsjogo" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
            {/* <iframe src="https://app.storylane.io/demo/phd5kqcsjogo" data-testid="share-embed-demo" allow="fullscreen; camera; microphone" name="sl-embed" style="position: absolute; top: 0px; left: 0px; width: 100%; height: 100%; border: none;"></iframe> */}
            {/* <div>
              <script src="https://js.storylane.io/js/v1/storylane.js"></script>
              <div class="sl-embed-container" style="position:relative;display:flex;align-items:center;justify-content:center;border: 1px solid rgba(63,95,172,0.35);box-shadow: 0px 0px 18px rgba(26, 19, 72, 0.15);border-radius:10px">
                <div class="sl-preview-heading" style="position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;background-color:rgba(40, 37, 54, 0.9);z-index:999999;font-family:Poppins, Arial, sans-serif;font-size:clamp(22px, 2.664vw, 30px);font-weight:500;line-height:normal;text-align:center;border-radius:10px;">
                <div style="color:#fff;margin-bottom:clamp(18px, 1.776vw, 20px);text-shadow: 0px 1px 2px rgba(26, 19, 72, 0.40);max-width:53%;">Take a tour of product</div>
                  <button onclick="Storylane.Play({type: 'preview_embed',demo_type: 'image', width: 2560, height: 1240.888888888889, element: this, demo_url: 'https://app.storylane.io/demo/phd5kqcsjogo'})" class="sl-preview-cta" style="background-color:#9939EB;border:none;border-radius:8px;box-shadow:0px 0px 15px rgba(26, 19, 72, 0.45);color:#FFFFFF;cursor:pointer;display:inline-block;font-family:Poppins, Arial, sans-serif;font-size:clamp(18px, 1.599vw, 22px);font-weight:600;height:clamp(45px, 3.996vw, 55px);line-height:1.2;padding:0 clamp(15px, 1.776vw, 20px);text-overflow:ellipsis;transform:translateZ(0);transition:background 0.4s;white-space:nowrap;width:auto;z-index:999999">VIEW DEMO<div class="sl-preview-cta-ripple" style="position:absolute;border:1px solid #9939EB;inset:0;border-radius:inherit;pointer-events:none"><div class="sl-preview-cta-ripple-shadow" style="box-shadow:#9939EB 0px 0px 4px 4px;opacity:0;border-radius:inherit;position:absolute;inset:0"></div></div></button><style>.sl-preview-cta:hover .sl-preview-cta-ripple{transition:all 1s cubic-bezier(0,0,.2,1);inset:-0.75em!important;opacity:0!important}.sl-preview-cta:hover .sl-preview-cta-ripple-shadow{opacity:0.125!important;}</style>
                  </div>
                <div class="sl-embed" data-sl-demo-type="image" style="position:relative;padding-bottom:calc(48.47% + 27px);width:100%;height:0;transform:scale(1);overflow:hidden;">
                  <div class="sl-preview" style="width:100%;height:100%;z-index:99999;position:absolute;background:url('https://storylane-prod-uploads.s3.us-east-2.amazonaws.com/company/company_01f6e0c7-5984-4c5e-bc1f-552505566f88/project/project_333cf79f-c17b-49ee-81c5-969e33fddc8e/page/1698828453204.png') no-repeat;background-size:100% 100%;border-radius:inherit;"></div>
                  <iframe class="sl-demo" src="" name="sl-embed" allow="fullscreen; camera; microphone" style="display:none;position:absolute;top:0;left:0;width:100%;height:100%;border:none;"></iframe>
                </div>
              </div>
          </div> */}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handlePopupClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
      {/* ----------------- Demo -----------------  */}

      {/* ----------------- Demo -----------------  */}
      <Dialog
        open={feedbackopenpopUP}
        onClose={handlePopupClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        fullWidth
      >
        <DialogTitle id="alert-dialog-title">
          {"Submit Feedback"}
        </DialogTitle>
        <DialogContent dividers={scroll === "paper"}>
          <DialogContentText id="alert-dialog-description">
            <form autoComplete="off" noValidate  >

              <TextField
                id="detail"
                label="What is the problem you are facing, describe in detail?"
                multiline
                rows={10}
                defaultValue="Description" fullWidth
              />
              <br />  <br />
              <TextField
                id="platformDo"
                label="What more would you like the platform to do? "
                multiline
                rows={10}
                defaultValue="Description" fullWidth
              />

              <br />
            </form>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button >Submit</Button>
          <Button onClick={handlePopupClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
      {/* ----------------- Demo -----------------  */}
    </>
  );
}

export default HeaderUserbox;
