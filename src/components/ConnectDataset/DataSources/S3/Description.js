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
import CopyBucketPolicy from "./CopyBucketPolicy";

export default function Description({ bucketName }) {
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
                Requirements
              </Typography>
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton>
              <ListItemIcon>
                <CheckCircleIcon style={{ color: "#00bfa5" }} />
              </ListItemIcon>
              <ListItemText
                primary="File size should not exceed 5TB"
                style={{ color: "#000" }}
                primaryTypographyProps={{
                  fontSize: 13,
                }}
              />
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton>
              <ListItemIcon>
                <CheckCircleIcon style={{ color: "#00bfa5" }} />
              </ListItemIcon>
              <ListItemText
                primary="Column headers must not contain any special characters or spaces"
                style={{ color: "#000" }}
                primaryTypographyProps={{
                  fontSize: 13,
                }}
              />
            </ListItemButton>
          </ListItem>
        </List>
      </nav>
      <Divider />

      <nav>
        {bucketName && (
          <List>
            <ListItem>
              <ListItemButton>
                <ListItemText
                  primary="Copy following bucket policy to your S3 bucket"
                  style={{ color: "#000" }}
                  primaryTypographyProps={{
                    fontSize: 13,
                  }}
                />
              </ListItemButton>
            </ListItem>
            <CopyBucketPolicy bucketName={bucketName} />
          </List>
        )}
      </nav>
    </Box>
  );
}
