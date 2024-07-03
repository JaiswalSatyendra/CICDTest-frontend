import { Snackbar, Alert } from "@mui/material";
import { makeStyles } from "@mui/styles";
import PropTypes from "prop-types";

import {
  DEFAULT_TOAST_POSITION,
  getToastProps,
  TOAST_POSITION,
} from "../../../utils/SqlEditor/constants/ToastConstants";

const useStyles = makeStyles((theme) => ({
  alert: {
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: theme.spacing(1),
    boxShadow: theme.shadows[3],
  },
}));

// Toast to show Dismissable Alerts
const Toast = ({
  show = false,
  containerProps = {},
  alertProps = {},
  type,
  message,
  position = DEFAULT_TOAST_POSITION,
}) => {
  const classes = useStyles();
  const tabProps = getToastProps(type);
  return (
    show && (
      <Snackbar
        open={show}
        anchorOrigin={TOAST_POSITION[position]}
        {...containerProps}
        style={{ marginTop: "15vh" }}
      >
        <Alert
          className={classes.alert}
          {...alertProps}
          {...tabProps.alertProps}
        >
          {message}
        </Alert>
      </Snackbar>
    )
  );
};

export default Toast;

Toast.propTypes = {
  show: PropTypes.bool,
  containerProps: PropTypes.object,
  alertProps: PropTypes.object,
  type: PropTypes.string,
  message: PropTypes.string,
  position: PropTypes.string,
};
