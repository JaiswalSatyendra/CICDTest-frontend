import { useState } from "react";
import { List, ListItem, ListItemText, ListSubheader } from "@mui/material";
import { Box } from "@mui/system";

export default function SchemaList({ table, schema }) {
  return (
    <Box
      sx={{
        m: 1,
        border: "1px solid rgba(224, 224, 224, 1)",
        borderRadius: "10px",
      }}
    >
      <List
        sx={{
          bgcolor: "background.paper",
          height: "410px",
          borderRadius: "10px",
          // overflow: "scroll",
        }}
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            Schema Info
          </ListSubheader>
        }
      >
        <Box sx={{ overflow: "scroll", height: "330px" }}>
          {schema.map((column, index) => {
            const labelId = `checkbox-list-label-${index}`;
            return (
              <ListItem key={column.name}>
                <ListItemText
                  id={labelId}
                  primary={`${column.name} : ${column.type}`}
                />
              </ListItem>
            );
          })}
        </Box>
      </List>
    </Box>
  );
}
