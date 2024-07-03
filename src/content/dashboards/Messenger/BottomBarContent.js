/* eslint-disable jsx-a11y/accessible-emoji */
/* eslint-disable jsx-a11y/label-has-for */
import { useContext, useEffect, useState } from "react";
import {
  Avatar,
  Tooltip,
  IconButton,
  Box,
  Button,
  styled,
  InputBase,
  useTheme,
} from "@mui/material";

import { useTranslation } from "react-i18next";
import AttachFileTwoToneIcon from "@mui/icons-material/AttachFileTwoTone";
import SendTwoToneIcon from "@mui/icons-material/SendTwoTone";
import { SessionContext } from "../../../contexts/SessionContext";
import { useSelector } from "react-redux";

const MessageInputWrapper = styled(InputBase)(
  ({ theme }) => `
    font-size: ${theme.typography.pxToRem(18)};
    padding: ${theme.spacing(1)};
    width: 100%;
`
);

const Input = styled("input")({
  display: "none",
});

function BottomBarContent() {
  const { t } = useTranslation();
  const [session, ,] = useContext(SessionContext);
  const { user } = session;
  const theme = useTheme();

  const [defaultImg, selectedImg] = useState("");
  const { userProfileImg } = useSelector(
    (state) => state.userImg
  );

  useEffect(async () => {
    const res = userProfileImg//await updateSession();
    selectedImg(res.profile_image==""?"/images/user.jpeg":"data:" + res.profile_image.imageType + ";base64," + res.profile_image.image)
  }, [userProfileImg]);

  

  return (
    <Box
      sx={{
        background: theme.colors.alpha.white[50],
        display: "flex",
        alignItems: "center",
        p: 2,
      }}
    >
      <Box flexGrow={1} display="flex" alignItems="center">
        <Avatar
          sx={{ display: { xs: "none", sm: "flex" }, mr: 1 }}
          alt={user.username}
          src={defaultImg}
        />
        <MessageInputWrapper
          autoFocus
          placeholder={t("Write your message here...")}
          fullWidth
        />
      </Box>
      <Box>
        <Tooltip arrow placement="top" title={t("Choose an emoji")}>
          <IconButton
            sx={{ fontSize: theme.typography.pxToRem(16) }}
            color="primary"
          >
            😀
          </IconButton>
        </Tooltip>
        <Input accept="image/*" id="messenger-upload-file" type="file" />
        <Tooltip arrow placement="top" title={t("Attach a file")}>
          <label htmlFor="messenger-upload-file">
            <IconButton sx={{ mx: 1 }} color="primary" component="span">
              <AttachFileTwoToneIcon fontSize="small" />
            </IconButton>
          </label>
        </Tooltip>
        <Button startIcon={<SendTwoToneIcon />} variant="contained">
          {t("Send")}
        </Button>
      </Box>
    </Box>
  );
}

export default BottomBarContent;
