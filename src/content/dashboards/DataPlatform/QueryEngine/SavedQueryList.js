import { useState, useEffect } from "react";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Checkbox,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { red } from "@mui/material/colors";

export default function TableList({ setQuery, savedQueries, setSavedQueries }) {
  const [selectedQuery, setSelectedQuery] = useState("");
  const handleToggle = (value) => () => {
    setQuery(value);
    setSelectedQuery(value);
  };

  const handleDelete = (value, id) => () => {
    const queries = JSON.parse(localStorage.getItem("savedQueries") || "[]");
    const newQueries = queries.filter((query) => query.id !== id);
    localStorage.setItem("savedQueries", JSON.stringify(newQueries));

    setSavedQueries(newQueries);
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
          Saved Queries
        </ListSubheader>
      }
    >
      {savedQueries.length > 0 ? (
        savedQueries.map((query, index) => {
          const labelId = `checkbox-list-label-${index}`;

          return (
            <ListItem key={index} disablePadding>
              <ListItemButton
                role={undefined}
                onClick={handleToggle(query.value)}
                dense
              >
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={selectedQuery === query.value}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ "aria-labelledby": labelId }}
                  />
                </ListItemIcon>
                <ListItemText id={labelId} primary={`${query.value}`} />
              </ListItemButton>
              <IconButton
                aria-label="delete"
                onClick={handleDelete(query.value, query.id)}
                sx={{
                  color: red[700],
                }}
              >
                <DeleteIcon />
              </IconButton>
            </ListItem>
          );
        })
      ) : (
        <></>
      )}
    </List>
  );
}
