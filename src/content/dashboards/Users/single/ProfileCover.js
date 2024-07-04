/* eslint-disable jsx-a11y/label-has-for */
import PropTypes from "prop-types";
import React, { useContext, useEffect, useState } from "react";

import {
  Box,
  Typography,
  Card,
  Tooltip,
  Avatar,
  CardMedia,
  Button,
  IconButton,
  styled,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import ArrowBackTwoToneIcon from "@mui/icons-material/ArrowBackTwoTone";
import { useNavigate } from "react-router-dom";
import UploadTwoToneIcon from "@mui/icons-material/UploadTwoTone";
import axios from "axios";
import { Buffer } from 'buffer';

import { useDispatch, useSelector } from "../../../../store";
// import {  getEvents1} from "../../../../slices/get_user_img";

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

const CardCover = styled(Card)(
  ({ theme }) => `
    position: relative;

    .MuiCardMedia-root {
      height: ${theme.spacing(26)};
    }
`
);

const CardCoverAction = styled(Box)(
  ({ theme }) => `
    position: absolute;
    right: ${theme.spacing(2)};
    bottom: ${theme.spacing(2)};
`
);

const ProfileCover = ({ user,userImg }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  

  const handleBack = () => {
    return navigate(`/dashboard`);
  };

  //image upload
  const [defaultImg, selectedImg] = useState("");
  const [defaultCover, selectedCover] = useState("");
  
  
  const dispatch = useDispatch();
  const { userProfileImg } = useSelector(
    (state) => state.userImg
  );

  useEffect(async () => {
    const res = userProfileImg//await updateSession();
    selectedImg(res.profile_image==""?"/images/user.jpeg":"data:" + res.profile_image.imageType + ";base64," + res.profile_image.image)
    selectedCover(res.cover_image==""?"/images/profile_cover_3.jpeg":"data:" + res.cover_image.imageType + ";base64," + res.cover_image.image)
  }, [userProfileImg]);




  const imageHandler = async (e) => {
    console.log(user);
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
    uploadUserImg(formData, "updateLoggedUserImages");
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
      .then((data) => {
        console.log(data)
        // dispatch(getEvents1());
      })
      .catch((err) => {
        console.log(err);
      });
  }


  const imageHandler2 = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        selectedCover(reader.result)
      }
    }
    reader.readAsDataURL(e.target.files[0])

    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('title', e.target.files[0].name);
    formData.append('file', file)
    uploadUserImg(formData, "updateLoggedUserCoverImages")
  }

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  return (
    <>
      <Box display="flex" mb={3}>
        <Tooltip arrow placement="top" title={t("Go back")}>
          <IconButton
            onClick={handleBack}
            color="primary"
            sx={{
              p: 2,
              mr: 2,
            }}
          >
            <ArrowBackTwoToneIcon />
          </IconButton>
        </Tooltip>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            verticalAlign: "middle",
          }}
        >
          <Typography variant="h3" component="h3" gutterBottom>
            {t("Profile for")} {user.username}
          </Typography>
        </Box>
      </Box>
      <CardCover>
        <CardMedia
          // style={{
          //   height: 0,
          //   paddingTop: "56.25%", // 16:9,
          //   marginTop: "30",
          // }}
          image={defaultCover}
        />
        <CardCoverAction>
          <Input onChange={imageHandler2} accept="image/*" id="change-cover" multiple type="file" />
          <label htmlFor="change-cover">
            <Button
              startIcon={<UploadTwoToneIcon />}
              variant="contained"
              component="span"
            >
              {t("Change cover")}
            </Button>
          </label>
        </CardCoverAction>
      </CardCover>
      <AvatarWrapper>
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
            onChange={imageHandler}
          />
          <label htmlFor="icon-button-file">
            <IconButton component="span" color="primary">
              <UploadTwoToneIcon />
            </IconButton>
          </label>
        </ButtonUploadWrapper>
      </AvatarWrapper>
      <Box py={2} pl={2} mb={3}>
        <Typography gutterBottom variant="h4">
          {user.username}
        </Typography>
        <Typography variant="subtitle2">{user.description}</Typography>
        <Typography
          sx={{
            py: 2,
          }}
          variant="subtitle2"
          color="text.primary"
        >
          {user.company_name}
        </Typography>
        <Box
          display={{ xs: "block", md: "flex" }}
          alignItems="center"
          justifyContent="space-between"
        >
          <Box>
            {/* <Button size="small" variant="contained">
              {t("Follow")}
            </Button> */}
            <IconButton
              color="primary"
              sx={{
                p: 0.5,
              }}
            ></IconButton>
          </Box>
        </Box>
      </Box>
    </>
  );
};

ProfileCover.propTypes = {
  user: PropTypes.object.isRequired,
};

export default ProfileCover;
