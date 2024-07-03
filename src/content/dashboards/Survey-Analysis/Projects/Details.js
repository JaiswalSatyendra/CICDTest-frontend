import {
  Box,
  Card,
  Typography,
  Divider,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  OutlinedInput,
  Chip
} from "@mui/material";
import { useTheme } from "@mui/styles";
import React from "react";

import { useTranslation } from "react-i18next";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const tags = [
  'Oliver',
  'Van',
  'April',
  'Ralph',
  'Omar',
  'Carlos',
  'Miriam',
  'Bradley',
  'Virginia',
  'Kelly',
];

function getStyles(tag, tagName, theme) {
  return {
    fontWeight:
      tagName.indexOf(tag) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

function Block7() {
  const { t } = useTranslation();
  const theme = useTheme();
  const [tagName, setTagName] = React.useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setTagName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  return (
    <Card style={{ width: "inherit" }}>
      <Box
        p={2.5}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <Typography gutterBottom variant="h4">
          {t("Project Details")}
        </Typography>
      </Box>
      <Divider />
      <Box
        sx={{
          height: 350,
          maxWidth: '100%',
          padding: "1.5rem",
          '& .MuiTextField-root': { my: 1 },
        }}
      >
        <TextField fullWidth label="Project Name" id="project-name" />
        <TextField
          id="project-description"
          label="Project Description"
          multiline
          fullWidth
          rows={4}
        />
        <FormControl fullWidth>
          <InputLabel id="demo-multiple-chip-label">Tags</InputLabel>
          <Select
            labelId="demo-multiple-chip-label"
            id="demo-multiple-chip"
            multiple
            value={tagName}
            onChange={handleChange}
            input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
            renderValue={(selected) => (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip key={value} label={value} />
                ))}
              </Box>
            )}
            MenuProps={MenuProps}
          >
            {tags.map((tag) => (
              <MenuItem
                key={tag}
                value={tag}
                style={getStyles(tag, tagName, theme)}
              >
                {tag}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </Card>
  );
}

export default Block7;
