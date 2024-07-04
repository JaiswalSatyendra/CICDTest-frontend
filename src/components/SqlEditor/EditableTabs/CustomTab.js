import { Box, Tab } from "@mui/material";
import { makeStyles } from "@mui/styles";
import CloseIcon from "@mui/icons-material/Close";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import NoteOutlinedIcon from "@mui/icons-material/NoteOutlined";
import { grey } from "@mui/material/colors";
import { noop } from "../../../utils/SqlEditor/constants/Common";
import PropTypes from "prop-types";

// Styles for custom tab
const useStyles = makeStyles((theme) => ({
  tabItemWrapper: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  selectedTabItem: {
    backgroundColor: theme.palette.primary.main,
    borderRight: "4px solid #7cc3c6 !important",
  },
  tabItem: {
    minWidth: 0,
    [theme.breakpoints.up("md")]: {
      minWidth: 0,
    },
    "&+&": {
      borderLeft: `1px solid ${theme.palette.divider}`,
    },
  },
  tabIcon: {
    marginBottom: "0 !important",
    marginRight: theme.spacing(1),
  },
  tabDeleteIcon: {
    marginLeft: theme.spacing(1),
  },
}));

/** Custom Tab Component with Delete Button */
export const CustomTab = ({ tab, onDelete = noop, ...props }) => {
  const classes = useStyles();
  return (
    <Tab
      classes={{
        root: classes.tabItem,
        wrapper: classes.tabItemWrapper,
        selected: classes.selectedTabItem,
      }}
      icon={
        tab.id === "home_tab" ? (
          <HomeRoundedIcon
            classes={{
              root: classes.tabIcon,
            }}
            fontSize="small"
            style={{
              color: grey[700],
            }}
          />
        ) : (
          <NoteOutlinedIcon
            classes={{
              root: classes.tabIcon,
            }}
            fontSize="small"
            style={{
              color: grey[700],
            }}
          />
        )
      }
      label={<TabLabel classes={classes} tab={tab} onDelete={onDelete} />}
      value={tab.value}
      {...props}
    />
  );
};

// Tab Label
const TabLabel = ({ classes, tab, onDelete }) => {
  return tab.canDelete ? (
    <Box display="flex" alignItems="center" style={{ color: grey[700] }}>
      {tab.name}
      <CloseIcon
        classes={{
          root: classes.tabDeleteIcon,
        }}
        fontSize="small"
        onClick={(e) => {
          onDelete(e, tab.id);
        }}
        style={{
          color: grey[700],
        }}
      />
    </Box>
  ) : (
    <Box style={{ color: grey[700] }}>{tab.name}</Box>
  );
};
export default CustomTab;

CustomTab.propTypes = {
  tab: PropTypes.object.isRequired,
  onDelete: PropTypes.func,
};
