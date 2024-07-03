import { Box, alpha, lighten, useTheme } from "@mui/material";
import { Outlet } from "react-router-dom";
import ThemeSettings from "../../components/ThemeSettings";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { useContext, useEffect } from "react";
import { SessionContext } from "../../contexts/SessionContext";

const ExtendedSidebarLayout = () => {
  const theme = useTheme();
  // const [, , , , , , userImg,updateImg] = useContext(SessionContext);

  //   useEffect(async () => {
  //     await updateImg();
  // }, []);
  return (
    <>
      <Box
        sx={{
          flex: 1,
          height: "100%",
          ".MuiPageTitle-wrapper": {
            background:
              theme.palette.mode === "dark"
                ? theme.colors.alpha.trueWhite[5]
                : theme.colors.alpha.white[50],
            marginBottom: `${theme.spacing(4)}`,
            boxShadow:
              theme.palette.mode === "dark"
                ? `0 1px 0 ${alpha(
                  lighten(theme.colors.primary.main, 0.7),
                  0.15
                )}, 0px 2px 4px -3px rgba(0, 0, 0, 0.2), 0px 5px 12px -4px rgba(0, 0, 0, .1)`
                : `0px 2px 4px -3px ${alpha(
                  theme.colors.alpha.black[100],
                  0.1
                )}, 0px 5px 12px -4px ${alpha(
                  theme.colors.alpha.black[100],
                  0.05
                )}`,
          },
        }}
      >

        <Box display={'flex'} justifyContent={'space-between'}>
          {/* <Header /> Dashboard payrent pages */} 
        </Box> 
        {/* <Sidebar /> */}
        <Box
          sx={{
            position: "relative",
            zIndex: 5,
            display: "block",
            flex: 1,
            // pt: `${theme.header.height}`,
            [theme.breakpoints.up("lg")]: {
              ml: `${theme.sidebar.width}`,
            },
          }}
          style={{ display: 'block' }}
        >
          <Box display="block">
            <Outlet />
          </Box>
          <ThemeSettings />
        </Box>
      </Box>
    </>
  );
};

export default ExtendedSidebarLayout;
