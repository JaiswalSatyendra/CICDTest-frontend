import { useRoutes } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { SnackbarProvider } from "notistack"; 
import ThemeProvider from "./theme/ThemeProvider";
import router from "./router";
import { SessionProvider } from "./contexts/SessionContext";


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
              vertical: "bottom",
              horizontal: "right",
            }}
          >
            {/* <CssBaseline /> */}
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
