import { useState } from "react";
import {
  Box,
  Drawer,
  List,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import clsx from "clsx";
import Proptypes from "prop-types";
import BookIcon from "@mui/icons-material/Book";
import EmptyState from "../EmptyState";
import SidebarListItem from "../SideBar/SidebarListItem";
import {
  DEFAULT_STRINGS,
  DRAWER_WIDTH,
} from "../../../utils/SqlEditor/constants/Common";

// SideBar Styles
const useStyles = makeStyles((theme) => ({
  drawerPaper: {
    [theme.breakpoints.up("sm")]: {
      position: "relative",
    },
    whiteSpace: "nowrap",
    height: "100%",
    width: DRAWER_WIDTH,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.short,
    }),
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.short,
    }),
    width: 0,
  },
}));

// SideBar Component
const SideBar = ({ showDrawer = true, items = [] }) => {
  const classes = useStyles();

  return (
    <Drawer
      variant="permanent"
      classes={{
        paper: clsx(
          classes.drawerPaper,
          !showDrawer && classes.drawerPaperClose
        ),
      }}
      sx={{
        "& .MuiDrawer-root": {
          position: "relative",
        },
        "& .MuiPaper-root": {
          position: "relative",
        },
      }}
      open={showDrawer}
    >
      <Box p={2}>
        <Typography variant="h6">Tables</Typography>
      </Box>
      {items.length === 0 ? (
        <EmptyState
          title={DEFAULT_STRINGS.NO_TABLES_EXIST}
          titleVariant="h6"
          subtitle={DEFAULT_STRINGS.IMPORT_NEW_DATA_MESSAGE}
        />
      ) : (
        <List>
          {items.map((item, index) => (
            <SidebarListItem
              key={`${item.tableName}-${index}-table-metadata`}
              listItem={item}
            />
          ))}
        </List>
      )}
    </Drawer>
  );
};

export default SideBar;

SideBar.propTypes = {
  items: Proptypes.array,
  showDrawer: Proptypes.bool.isRequired,
};
