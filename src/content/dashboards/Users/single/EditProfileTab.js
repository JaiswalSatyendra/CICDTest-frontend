import {
  Grid,
  Typography,
  CardContent,
  Card,
  Box,
  Divider,
  Button,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import DoneTwoToneIcon from "@mui/icons-material/DoneTwoTone";
import Text from "../../../../components/Text";
import Label from "../../../../components/Label";
import PropTypes from "prop-types";
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import "./EditProfile.scss";
import React, { useEffect,useContext } from "react";
import axios from "axios";
import { SessionContext } from "../../../../contexts/SessionContext";

function rand() {
  return Math.round(Math.random() * 20) - 10;
}
function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();
  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles(theme => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 1000,
    height: 300,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function EditProfileTab({ user }) {
  const { t } = useTranslation();
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const [session, , ,updateSession, , ,  ] = useContext(SessionContext);
  const handleOpen = () => {
    setOpen(true);
  };

  
  const [defaultRevenue, setRevenue] = React.useState("0");//14,264
  const [defaultAddress, setAddress] = React.useState("https://www.convertml.ai");
  const handleClose = () => {
   
    axios.post(
      `${process.env.REACT_APP_API_URL}/user/updateLoggedUser`,
      {
        annual_rev: defaultRevenue, web_address: defaultAddress
      },
      {
        headers: {
          "Content-type": "application/json",
        },
        withCredentials: true,
      } 
      
    )
      .then(async(response) => {
      })
      .catch((error) => {

        console.log(error);
      });
    setOpen(false);
  };

  useEffect(async () => {
    const res = await updateSession();
        setRevenue(res.annual_rev===undefined?0:res.annual_rev)
        setAddress(res.web_address===undefined?"":res.web_address)
  }, []);

  return (
    <Grid className="profileContainer" container spacing={3}>
      <Grid item xs={12}>
        <Card>
          <Box
            p={3}
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Box>
              <Typography variant="h4" gutterBottom>
                {t("Personal Details")}
              </Typography>
              <Typography variant="subtitle2">
                {t("Manage information related to your personal details")}
              </Typography>
            </Box>
            <Button variant="text" startIcon={<EditTwoToneIcon />} onClick={handleOpen} >
              {t("Edit")}
            </Button>
            <Modal
              aria-labelledby="simple-modal-title"
              aria-describedby="simple-modal-description"
              open={open}
              onClose={handleClose}
            >
              <div style={modalStyle} className={classes.paper}>
                <Typography variant="subtitle2">
                  <Grid container spacing={0}>
                    <div className="flexElement">
                      <div className="gridTitle">
                        <Grid item xs={12} sm={4} md={3} textAlign={{ sm: "right" }}>
                          <Box pr={5} pb={2}>
                            <div className="modalHeadingTitle">{t("Est. Annual Revenue")}:</div>
                          </Box>
                        </Grid>
                      </div>
                      <div className="gridInput">
                        <Grid item xs={12} sm={8} md={9}>
                          <input className="modalInput" placeholder="Enter New Data" type="text" onChange={(e) => setRevenue(e.target.value)} />
                        </Grid>
                      </div>
                    </div>
                    <div className="flexElement">
                      <div className="gridTitle">
                        <Grid item xs={12} sm={4} md={3} textAlign={{ sm: "right" }} className="gridTitle">
                          <Box pr={5} pb={2}>
                            <div className="modalHeadingTitle">{t("Official Website")}:</div>
                          </Box>
                        </Grid>
                      </div>
                      <div className="gridInput">
                        <Grid item xs={12} sm={8} md={9}>
                          <Box
                            sx={{
                              maxWidth: { xs: "auto", sm: 300 },
                            }}
                          >
                            <input className="modalInput" placeholder="Enter New Address" type="text" onChange={(e) => setAddress(e.target.value)} />
                          </Box>
                        </Grid>
                      </div>
                    </div>
                    <div className="flexElement">
                      <button className="modalButton" variant="text" startIcon={<EditTwoToneIcon />} onClick={handleClose}>Update</button>
                    </div>
                  </Grid>
                </Typography>
              </div>
            </Modal>
          </Box>
          <Divider />
          <CardContent
            sx={{
              p: 4,
            }}
          >
            <Typography variant="subtitle2">
              <Grid container spacing={0}>
                <Grid item xs={12} sm={4} md={3} textAlign={{ sm: "right" }}>
                  <Box pr={3} pb={2}>
                    {t("Name")}:
                  </Box>
                </Grid>
                <Grid item xs={12} sm={8} md={9}>
                  <Text color="black">
                    <b>{user.username}</b>
                  </Text>
                </Grid>
                <Grid item xs={12} sm={4} md={3} textAlign={{ sm: "right" }}>
                  <Box pr={3} pb={2}>
                    {t("Est. Annual Revenue")}:
                  </Box>
                </Grid>
                <Grid item xs={12} sm={8} md={9}>
                  <Text color="black">
                    <b>{defaultRevenue}</b>
                  </Text>
                </Grid>
                <Grid item xs={12} sm={4} md={3} textAlign={{ sm: "right" }}>
                  <Box pr={3} pb={2}>
                    {t("Official Website")}:
                  </Box>
                </Grid>
                <Grid item xs={12} sm={8} md={9}>
                  <Box
                    sx={{
                      maxWidth: { xs: "auto", sm: 300 },
                    }}
                  >
                    <Text color="black">
                      {defaultAddress}
                    </Text>
                  </Box>
                </Grid>
              </Grid>
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Card>
          <Box
            p={3}
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Box>
              <Typography variant="h4" gutterBottom>
                {t("Account Settings")}
              </Typography>
              <Typography variant="subtitle2">
                {t("Manage details related to your account")}
              </Typography>
            </Box>
          </Box>
          <Divider />
          <CardContent
            sx={{
              p: 4,
            }}
          >
            <Typography variant="subtitle2">
              <Grid container spacing={0}>
                <Grid item xs={12} sm={4} md={3} textAlign={{ sm: "right" }}>
                  <Box pr={3} pb={2}>
                    {t("Language")}:
                  </Box>
                </Grid>
                <Grid item xs={12} sm={8} md={9}>
                  <Text color="black">
                    <b>English (US)</b>
                  </Text>
                </Grid>
                <Grid item xs={12} sm={4} md={3} textAlign={{ sm: "right" }}>
                  <Box pr={3} pb={2}>
                    {t("Timezone")}:
                  </Box>
                </Grid>
                <Grid item xs={12} sm={8} md={9}>
                  <Text color="black">
                    <b>GMT +2</b>
                  </Text>
                </Grid>
                <Grid item xs={12} sm={4} md={3} textAlign={{ sm: "right" }}>
                  <Box pr={3} pb={2}>
                    {t("Account status")}:
                  </Box>
                </Grid>
                <Grid item xs={12} sm={8} md={9}>
                  <Label color="success">
                    <DoneTwoToneIcon fontSize="small" />
                    <b>{t("Active")}</b>
                  </Label>
                </Grid>
              </Grid>
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Card>
          <Box
            p={3}
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Box>
              <Typography variant="h4" gutterBottom>
                {t("Email Address")}
              </Typography>
              <Typography variant="subtitle2">
                {t("Manage details related to your associated email address")}
              </Typography>
            </Box>
          </Box>
          <Divider />
          <CardContent
            sx={{
              p: 4,
            }}
          >
            <Typography variant="subtitle2">
              <Grid container spacing={0}>
                <Grid item xs={12} sm={4} md={3} textAlign={{ sm: "right" }}>
                  <Box pr={3} pb={2}>
                    {t("Email ID")}:
                  </Box>
                </Grid>
                <Grid item xs={12} sm={8} md={9}>
                  <Text color="black">
                    <b>{user.company_email}</b>
                  </Text>
                  <Box pl={1} component="span">
                    <Label color="success">{t("Primary")}</Label>
                  </Box>
                </Grid>
              </Grid>
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

EditProfileTab.propTypes = {
  user: PropTypes.object.isRequired,
};

export default EditProfileTab;
