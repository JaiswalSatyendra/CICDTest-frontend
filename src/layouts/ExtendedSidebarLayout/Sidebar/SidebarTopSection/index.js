import { useRef, useState, useContext, useEffect } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { SessionContext } from "../../../../contexts/SessionContext";

import {
  Avatar,
  Box,
  Button,
  Divider,
  alpha,
  List,
  ListItem,
  ListItemText,
  Popover,
  IconButton,
  Typography,
  styled,
  useTheme,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import UnfoldMoreTwoToneIcon from "@mui/icons-material/UnfoldMoreTwoTone";
import AccountBoxTwoToneIcon from "@mui/icons-material/AccountBoxTwoTone";
import LockOpenTwoToneIcon from "@mui/icons-material/LockOpenTwoTone";
import AccountTreeTwoToneIcon from "@mui/icons-material/AccountTreeTwoTone";
import { Campaign } from "@mui/icons-material";
import { useDispatch, useSelector } from "../../../../store";


const MenuUserBox = styled(Box)(
  ({ theme }) => `
    background: ${theme.colors.alpha.black[5]};
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
    color: ${theme.sidebar.menuItemColor};
    display: block;

    &.popoverTypo {
      color: ${theme.palette.secondary.main};
    }
`
);

const UserBoxDescription = styled(Typography)(
  ({ theme }) => `
    color: ${alpha(theme.sidebar.menuItemColor, 0.6)};

    &.popoverTypo {
      color: ${theme.palette.secondary.light};
    }
`
);

function SidebarTopSection() {
  const { t } = useTranslation();
  const theme = useTheme();

  const navigate = useNavigate();
  const [session, , logout] = useContext(SessionContext);
  const location = useLocation();

  const ref = useRef(null);
  const [isOpen, setOpen] = useState(false);
  const [user] = useState(session.user);

  const [defaultImg, selectedImg] = useState("");
  const { userProfileImg } = useSelector(
    (state) => state.userImg
  );

  useEffect(async () => {
    const res = userProfileImg//await updateSession();
    selectedImg(res.profile_image==""?"/images/user.jpeg":"data:" + res.profile_image.imageType + ";base64," + res.profile_image.image)
  }, [userProfileImg]);


  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleLogout = async () => {
    try {
      handleClose();
      await logout();
      navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Box
      sx={{
        textAlign: "center",
        mx: 2,
        pt: 1,
        position: "relative",
      }}
    >
      <Avatar
        sx={{
          width: 68,
          height: 68,
          mb: 2,
          mx: "auto",
        }}
        alt={user.username}
        src={defaultImg}
      />

      <Typography
        variant="h4"
        sx={{
          color: `${theme.colors.alpha.trueWhite[100]}`,
        }}
      >
        {user.username}
      </Typography>
      <Typography
        variant="subtitle1"
        sx={{
          color: "#ec407a",
        }}
      >
        {user.company_name}
      </Typography>
      <IconButton
        size="small"
        sx={{
          position: "absolute",
          right: theme.spacing(0),
          color: `${theme.colors.alpha.trueWhite[70]}`,
          top: theme.spacing(0),
          background: `${theme.colors.alpha.trueWhite[10]}`,

          "&:hover": {
            color: `${theme.colors.alpha.trueWhite[100]}`,
            background: `${alpha(theme.colors.alpha.trueWhite[100], 0.2)}`,
          },
        }}
        ref={ref}
        onClick={handleOpen}
      >
        <UnfoldMoreTwoToneIcon fontSize="small" />
      </IconButton>
      <Popover
        disableScrollLock
        anchorEl={ref.current}
        onClose={handleClose}
        open={isOpen}
        anchorOrigin={{
          vertical: "center",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "center",
          horizontal: "center",
        }}
      >
        <MenuUserBox
          sx={{
            minWidth: 210,
          }}
          display="flex"
        >
          <Avatar
            variant="rounded"
            alt={user.username}
            src={defaultImg}
          />
          <UserBoxText>
            <UserBoxLabel className="popoverTypo" variant="body1">
              {user.username}
            </UserBoxLabel>
            <UserBoxDescription className="popoverTypo" variant="body2">
              {user.company_name}
            </UserBoxDescription>
          </UserBoxText>
        </MenuUserBox>
        <Divider
          sx={{
            mb: 0,
          }}
        />
        <List
          sx={{
            p: 1,
          }}
          component="nav"
        >
          <ListItem
            onClick={() => {
              handleClose();
            }}
            button
            to={`/${location.pathname.split("/")[1]}/users/${user._id}`}
            component={NavLink}
          >
            <AccountBoxTwoToneIcon fontSize="small" />
            <ListItemText primary={t("Profile")} />
          </ListItem>
          {/* <ListItem
            onClick={() => {
              handleClose();
            }}
            button
            to={`/${location.pathname.split("/")[1]}/projects`}
            component={NavLink}
          >
            <AccountTreeTwoToneIcon fontSize="small" />
            <ListItemText primary={t("Projects")} />
          </ListItem> */}
          <ListItem
            onClick={() => {
              handleClose();
            }}
            button
            to={`/${location.pathname.split("/")[1]}/campaigns`}
            component={NavLink}
          >
            <Campaign fontSize="small" />
            <ListItemText primary={t("Campaigns")} />
          </ListItem>
        </List>
        <Divider />
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
    </Box>
  );
}

export default SidebarTopSection;
