import { useState, useCallback, useEffect, useContext } from "react";

import { Helmet } from "react-helmet-async";

import { Box, Tabs, Tab, Grid, styled } from "@mui/material";
// import { useParams } from "react-router-dom";
// import useRefMounted from "../../../../hooks/useRefMounted";
import { useTranslation } from "react-i18next";
// import Axios from "axios";

import ProfileCover from "./ProfileCover";
import RecentActivity from "./RecentActivity";
/*
import Feed from "./Feed";
import PopularTags from "./PopularTags";
import MyCards from "./MyCards";
import Addresses from "./Addresses";
*/
import ActivityTab from "./ActivityTab";
import EditProfileTab from "./EditProfileTab";
/*
import NotificationsTab from "./NotificationsTab";
import SecurityTab from "./SecurityTab";
*/
import { SessionContext } from "../../../../contexts/SessionContext";

const TabsWrapper = styled(Tabs)(
  () => `
    .MuiTabs-scrollableX {
      overflow-x: auto !important;

      .MuiTabs-indicator {
        box-shadow: none;
      }
    }
`
);

function ManagementUsersView() {
  const [session, _, , , , , userImg] = useContext(SessionContext);
  const { t } = useTranslation();

  const [currentTab, setCurrentTab] = useState("activity");

  const [user] = useState(session.user);
  const [userImg1] = useState(userImg);

  const tabs = [
    { value: "activity", label: t("Activity") },
    { value: "edit_profile", label: t("Edit Profile") },
    // { value: "notifications", label: t("Notifications") },
    // { value: "security", label: t("Passwords/Security") },
  ];

  const handleTabsChange = (_event, value) => {
    console.log(user)
    setCurrentTab(value);
  };

  return (
    <>
      <Helmet>
        {/* <title>{`${user.username} - Profile Details`}</title> */}
        <title>Projects</title>
      </Helmet>
      <Box
        sx={{
          mt: 3,
        }}
      >
        {user && (
          <Grid
            sx={{
              px: 4,
            }}
            container
            direction="row"
            justifyContent="center"
            alignItems="stretch"
            spacing={4}
          >
            <Grid item xs={12} md={8}>
              <ProfileCover user={user} userImg={userImg1}/>
            </Grid>
            <Grid item xs={12} md={4}>
              {/* <RecentActivity /> */}
            </Grid>
            <Grid item xs={12}>
              <TabsWrapper
                onChange={handleTabsChange}
                value={currentTab}
                variant="scrollable"
                scrollButtons="auto"
                textColor="primary"
                indicatorColor="primary"
              >
                {tabs.map((tab) => (
                  <Tab key={tab.value} label={tab.label} value={tab.value} />
                ))}
              </TabsWrapper>
            </Grid>
            <Grid item xs={12}>
              {currentTab === "activity" && <ActivityTab />}
              {currentTab === "edit_profile" && <EditProfileTab user={user} />}
            </Grid>
          </Grid>
        )}
      </Box>
    </>
  );
}

export default ManagementUsersView;
