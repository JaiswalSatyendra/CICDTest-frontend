import { Grid } from "@mui/material";
import ErrorBoundary from "../../../components/SqlEditor/ErrorBoundary";
import Home from "./Home";
import { AppContextProvider } from "../../../contexts/SqlContext";
function App() {
  return (
    <ErrorBoundary>
      <AppContextProvider>
        <Home />
      </AppContextProvider>
    </ErrorBoundary>
  );
}

export default App;
