import { useContext, useEffect } from "react";

import {
  Box,
  alpha,
  Stack,
  lighten,
  Divider,
  IconButton,
  Tooltip,
  styled,
  useTheme,
} from "@mui/material";
import MenuTwoToneIcon from "@mui/icons-material/MenuTwoTone";
import { SidebarContext } from "../../../contexts/SidebarContext";
import CloseTwoToneIcon from "@mui/icons-material/CloseTwoTone";

import HeaderButtons from "./Buttons";
import HeaderUserbox from "./Userbox";
import HeaderSearch from "./Search";
import { useDispatch, useSelector } from "../../../store";
import { Button, Grid } from "@mui/material";
// import {
//   getEvents1
// } from "../../../slices/get_user_img";
import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";

        // padding: ${theme.spacing(0, 2)};
       // backdrop-filter: blur(3px);
      // background-color: ${alpha(theme.header.background, 0.95)};

const HeaderWrapper = styled(Box)(
  ({ theme }) => `
        height: ${theme.header.height};
        color: ${theme.header.textColor};
        padding:0;
        right: 0;
        z-index: 6;
        background-color: #ffffff;
        position: fixed;
        justify-content: space-between;
        width: 100%;
        @media (min-width: ${theme.breakpoints.values.lg}px) {
            //  left: ${theme.sidebar.width};
            left:0px;
            width: auto;
        }
`
);

function Header() {
  const { sidebarToggle, toggleSidebar } = useContext(SidebarContext);
  const theme = useTheme();

  // const dispatch = useDispatch();
  // useEffect(async () => {
  //   dispatch(getEvents1());
  // }, [dispatch]);

  return (
    <HeaderWrapper
      display="flex"
      alignItems="center"
      // sx={{
      //   boxShadow:
      //     theme.palette.mode === "dark"
      //       ? `0 1px 0 ${alpha(
      //         lighten(theme.colors.primary.main, 0.7),
      //         0.15
      //       )}, 0px 2px 8px -3px rgba(0, 0, 0, 0.2), 0px 5px 22px -4px rgba(0, 0, 0, .1)`
      //       : `0px 2px 8px -3px ${alpha(
      //         theme.colors.alpha.black[100],
      //         0.2
      //       )}, 0px 5px 22px -4px ${alpha(
      //         theme.colors.alpha.black[100],
      //         0.1
      //       )}`,
      // }}
    >
      <Stack
        direction="row"
        divider={<Divider orientation="vertical" flexItem />}
        alignItems="center"
        spacing={2}
      ></Stack>

      {/* <div className="container-full  after-login-header" style={{width:'100%'}}>
        <Box display={'flex'} width={'100%'} alignItems={'center'} justifyContent={'space-between'}>
          <div className="top-nav"> 
        <Link to="/">
            <LazyLoadImage
              className="logo"
              src={"/images/convertmlLogo.png"}
            />
          </Link>  
          </div>
          <Box display="flex" alignItems="center">
            <HeaderButtons />
            <HeaderUserbox />
            <Box
              component="span"
              sx={{
                ml: 2,
                display: { lg: "none", xs: "inline-block" },
              }}
            >
              <Tooltip arrow title="Toggle Menu">
                <IconButton color="primary" onClick={toggleSidebar}>
                  {!sidebarToggle ? (
                    <MenuTwoToneIcon fontSize="small" />
                  ) : (
                    <CloseTwoToneIcon fontSize="small" />
                  )}
                </IconButton>
              </Tooltip>
            </Box>
          </Box>
        </Box>
      </div> */}

<nav className="top-navbar after-login-header">
        <Grid
           container
           direction="row"
           justifyContent="space-between"
           alignItems="center"
        >
          <Grid item xs={6} md={3} lg={3}>
            <Link to="/">
              <LazyLoadImage
                className="logo" alt={"Convertml"}
                src={"/images/convertmlLogo.png"}
              />
            </Link>
          </Grid>
          
          <Grid item xs={6} md={9} lg={9}>  
        <div className="float-right">
        <Box display="flex">
          <HeaderButtons />
            <HeaderUserbox />
            <Box
              component="span"
              sx={{
                ml: 2,
                display: { lg: "none", xs: "inline-block" },
              }}
            >
              {/* <Tooltip arrow title="Toggle Menu">
                <IconButton color="primary" onClick={toggleSidebar}>
                  {!sidebarToggle ? (
                    <MenuTwoToneIcon fontSize="small" />
                  ) : (
                    <CloseTwoToneIcon fontSize="small" />
                  )}
                </IconButton>
              </Tooltip> */}
            </Box>
            </Box>
        </div>
        
          </Grid>
        </Grid>
      </nav>


    </HeaderWrapper>
  );
}

export default Header;
