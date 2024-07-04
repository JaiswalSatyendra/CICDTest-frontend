import { useState } from "react";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Checkbox,
} from "@mui/material";

export default function TableList({ tables, selectedTable, setSelectedTable }) {
  const handleToggle = (value) => () => {
    setSelectedTable(value);
  };

  return (
    <List
      sx={{
        width: "100%",
        // maxWidth: 360,
        bgcolor: "background.paper",
        minHeight: 200,
        maxHeight: 300,
        overflow: "auto",
      }}
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          Tables
        </ListSubheader>
      }
    >
      {tables.length > 0 ? (
        tables.map((value) => {
          const labelId = `checkbox-list-label-${value}`;

          return (
            <ListItem key={value} disablePadding>
              <ListItemButton
                role={undefined}
                onClick={handleToggle(value)}
                dense
              >
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={selectedTable === value}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ "aria-labelledby": labelId }}
                  />
                </ListItemIcon>
                <ListItemText id={labelId} primary={`${value}`} />
              </ListItemButton>
            </ListItem>
          );
        })
      ) : (
        <></>
      )}
    </List>
  );
}
