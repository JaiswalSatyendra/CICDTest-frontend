import * as React from "react";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Typography,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

export default function Description({ totalRows, totalColumns }) {
  return (
    <Box
      sx={{
        width: "100%",
        bgcolor: "background.paper",
        boxShadow: 1,
      }}
    >
      <nav>
        <List>
          <ListItem>
            <ListItemButton>
              <Typography
                variant="h6"
                component="div"
                gutterBottom
                style={{ fontWeight: "bold" }}
              >
                Review
              </Typography>
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton>
              <ListItemIcon>
                <CheckCircleIcon style={{ color: "#00bfa5" }} />
              </ListItemIcon>
              <ListItemText
                primary="Dataset is fit for Machine Learning Models"
                style={{ color: "#00bfa5" }}
                primaryTypographyProps={{
                  fontSize: 13,
                  fontWeight: "bold",
                }}
              />
            </ListItemButton>
          </ListItem>
        </List>
      </nav>
      <Divider />
      <nav>
        <List>
          <ListItem style={{ paddingTop: 0, paddingBottom: 0 }}>
            <ListItemButton>
              <ListItemIcon>
                <CheckCircleIcon style={{ color: "#212121" }} />
              </ListItemIcon>
              <ListItemText
                primary="Total Rows"
                secondary={totalRows}
                primaryTypographyProps={{
                  fontSize: 13,
                  fontWeight: "bold",
                }}
              />
            </ListItemButton>
          </ListItem>
          <ListItem style={{ paddingTop: 0, paddingBottom: 0 }}>
            <ListItemButton>
              <ListItemIcon>
                <CheckCircleIcon style={{ color: "#212121" }} />
              </ListItemIcon>
              <ListItemText
                primary="Total Columns"
                secondary={totalColumns}
                primaryTypographyProps={{
                  fontSize: 13,
                  fontWeight: "bold",
                }}
              />
            </ListItemButton>
          </ListItem>
        </List>
      </nav>
    </Box>
  );
}
