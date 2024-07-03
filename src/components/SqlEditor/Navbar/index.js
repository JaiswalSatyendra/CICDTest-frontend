import { Toolbar, AppBar, Typography, IconButton } from "@mui/material";
import { makeStyles } from "@mui/styles";
import MenuIcon from "@mui/icons-material/Menu";
import PropTypes from "prop-types";
import {
  DEFAULT_STRINGS,
  noop,
} from "../../../utils/SqlEditor/constants/Common";

// Navbar styles
const useStyles = makeStyles((theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  menuButton: {
    borderRadius: 0,
    marginRight: theme.spacing(1),
  },
  navTitle: {
    flexGrow: 1,
  },
}));

const Navbar = ({ onMenuButtonClick = noop }) => {
  const classes = useStyles();

  return (
    <AppBar position="relative" className={classes.appBar}>
      <Toolbar>
        <IconButton
          className={classes.menuButton}
          onClick={onMenuButtonClick}
          disableRipple
          edge="start"
          aria-label="sidebar menu"
        >
          <MenuIcon />
        </IconButton>
        <Typography
          className={classes.navTitle}
          color="textPrimary"
          variant="h6"
          ml={2}
        >
          {DEFAULT_STRINGS.APP_TITLE}
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

Navbar.propTypes = {
  onMenuButtonClick: PropTypes.func.isRequired,
};
