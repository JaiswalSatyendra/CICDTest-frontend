import { useState } from "react";

import {
  List,
  ListItemText,
  ListItem,
  ListItemIcon,
  ListSubheader,
  Typography,
  Box,
  Tooltip,
  Collapse,
  Checkbox,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import TableChartOutlinedIcon from "@mui/icons-material/TableChartOutlined";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ViewColumnIcon from "@mui/icons-material/ViewColumn";
import clsx from "clsx";
import PropTypes from "prop-types";

import { DEFAULT_STRINGS } from "../../../utils/SqlEditor/constants/Common";
import useAppContext from "../../../hooks/SqlEditor/useAppContext";

const useStyles = makeStyles((theme) => ({
  nested: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  primaryTextColor: {
    color: theme.palette.text.primary,
  },
  columnNameText: {
    paddingLeft: theme.spacing(1),
    overflowX: "hidden",
    textOverflow: "ellipsis",
  },
}));

//  Collapsible ListItem Component for  SideBar
const SidebarListItem = ({ listItem, subtitle, icon }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { selectedTable, setSelectedTable } = useAppContext();

  const classes = useStyles();
  const toggleListItem = () => {
    setIsOpen((value) => !value);
  };
  const { aliasName, tableName, columns } = listItem;

  return (
    <>
      <Box ml={2}>
        {"Select: "}
        <Checkbox
          checked={selectedTable.tableName === tableName}
          onChange={() =>
            setSelectedTable((selectedTable) => ({
              ...selectedTable,
              tableName,
              aliasName,
            }))
          }
          value={tableName}
          sx={{
            color: "#19857b",
            "&.Mui-checked": {
              color: "#19857b",
            },
          }}
        />
      </Box>
      <ListItem button component="li" onClick={toggleListItem}>
        <ListItemIcon>
          {icon ? icon : <TableChartOutlinedIcon fontSize="small" />}
        </ListItemIcon>
        <ListItemText>
          <Typography variant="body1">
            <Box
              component="span"
              fontWeight={isOpen ? "fontWeightBold" : "fontWeightRegular"}
            >
              {aliasName}
            </Box>
          </Typography>
        </ListItemText>
        {isOpen ? <ExpandMoreIcon /> : <ChevronLeftIcon />}
      </ListItem>
      <Collapse component="li" in={isOpen} timeout="auto" unmountOnExit>
        <List
          component="ul"
          disablePadding
          subheader={
            <ListSubheader
              className={clsx(classes.nested, classes.primaryTextColor)}
            >
              {subtitle || DEFAULT_STRINGS.HEADING_COLUMNS}
            </ListSubheader>
          }
          className={classes.nested}
        >
          {columns.map((column, index) => (
            <ListItem dense key={`${tableName}-${column.name}-${index}-column`}>
              <ViewColumnIcon />
              <Tooltip
                title={`${column.name} ${
                  column.type ? " (" + column.type + ")" : ""
                } `}
              >
                <ListItemText className={classes.columnNameText}>
                  <Typography variant="subtitle2" component="span">
                    {column.name}
                  </Typography>
                  {column.type && (
                    <Typography variant="caption">{` (${column.type})`}</Typography>
                  )}
                </ListItemText>
              </Tooltip>
            </ListItem>
          ))}
        </List>
      </Collapse>
    </>
  );
};

export default SidebarListItem;

SidebarListItem.propTypes = {
  listItem: PropTypes.object.isRequired,
  subtitle: PropTypes.string,
  icon: PropTypes.element,
};
