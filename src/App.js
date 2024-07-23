import { useRoutes } from "react-router-dom";
import {
  Alert,
  CssBaseline,
  Dialog,
  DialogContent,
  DialogContentText,
  Snackbar,
} from "@mui/material";
import {LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { SnackbarProvider } from "notistack";
import ThemeProvider from "./theme/ThemeProvider";
import router from "./router";
import { SessionProvider } from "./contexts/SessionContext";
//import { Detector, Offline, Online } from "react-detect-offline";

function App() {
  const content = useRoutes(router);
  // return ["/dashboard", "/docs", "/help"].indexOf(
  //   content.props.value.matches[0].route.path
  // ) >= 0 ?
  return (
    <SessionProvider>
      <ThemeProvider>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <SnackbarProvider
            maxSnack={6}
            anchorOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
          >
            {/* <CssBaseline /> */}
            {/* ------------------- Check Internet Connection -------------------  */} 

              {/* ------------------- Check Internet Connection end -------------------  */}
            {content}
          </SnackbarProvider>
        </LocalizationProvider>
      </ThemeProvider>
    </SessionProvider>
    // ) : (
    //   <SessionProvider> <ThemeProvider>{content} </ThemeProvider></SessionProvider>
  );
}

export default App;
