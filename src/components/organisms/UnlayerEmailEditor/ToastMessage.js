import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function ToastMessage({ toastObject, setToastObject }) {
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setToastObject((prevState) => {
      return {
        ...prevState,
        message: "",
        open: false,
      };
    });
  };

  return (
    <Snackbar
      open={toastObject.open}
      autoHideDuration={10000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      sx={{
        mt: 8,
      }}
    >
      <Alert
       style={{whiteSpace: "pre-line"}}
        onClose={handleClose}
        severity={toastObject.severity}
        sx={{ width: "100%" }}
      >
        {toastObject.message}
      </Alert>
    </Snackbar>
  );
}
