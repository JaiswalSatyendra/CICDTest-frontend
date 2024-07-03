import { useContext, useEffect, useState } from "react";
import { Grid, Typography, Avatar, useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";
import { format } from "date-fns";
import { SessionContext } from "../../../../contexts/SessionContext";
import { useSelector } from "react-redux";
function PageHeader() {
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
    <Grid container alignItems="center">
      <Grid item>
        <Avatar
          sx={{
            mr: 2,
            width: theme.spacing(8),
            height: theme.spacing(8),
          }}
          variant="rounded"
          alt={user.username}
          src={defaultImg}
        />
      </Grid>
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          {t("Welcome")}, {user.username}!
        </Typography>
        <Typography variant="subtitle2">
          {t("These are your Email analytics stats till today")},{" "}
          <b>{format(new Date(), "MMMM dd yyyy")}</b>
        </Typography>
      </Grid>
    </Grid>
  );
}

export default PageHeader;
