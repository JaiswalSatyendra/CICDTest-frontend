import React, { useState } from "react";

import {
  Box,
  Card,
  Typography,
  List,
  Button,
  Divider,
  ToggleButton,
  ToggleButtonGroup,
  useTheme,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Grid,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";

import { useTranslation } from "react-i18next";

function Block8() {
  const { t } = useTranslation();
  const theme = useTheme();

  const [tabs, setTab] = useState("ongoing");

  const handleViewOrientation = (_event, newValue) => {
    setTab(newValue);
  };

  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <Card>
      <Box
        p={2.5}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <Box>
          <Typography gutterBottom variant="h4">
            {t("Model Parameters")}
          </Typography>
        </Box>
      </Box>
      <Divider />
      <Box mx={6} my={2.5}
        display="flex"
        alignItems="center"
        justifyContent="space-between">
        <Typography gutterBottom variant="h5">
          {t("Select Time Horizon")}
        </Typography>
        <ToggleButtonGroup
          size="small"
          value={tabs}
          exclusive
          onChange={handleViewOrientation}
        >
          <ToggleButton
            sx={{
              px: 2,
              py: 0.5,
              lineHeight: 1.5,
              fontSize: `${theme.typography.pxToRem(12)}`,
            }}
            disableRipple
            value="ongoing"
          >
            {t("Ongoing")}
          </ToggleButton>
          <ToggleButton
            sx={{
              px: 2,
              py: 0.5,
              lineHeight: 1.5,
              fontSize: `${theme.typography.pxToRem(12)}`,
            }}
            disableRipple
            value="first"
          >
            {t("First")}
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>
      {tabs === "ongoing" && (
        <>
          <Box
            px={4}
            py={2}
            sx={{
              height: 160,
            }}
          >
            <FormControl>
              <RadioGroup
                row
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="female"
                name="radio-buttons-group"
              >
                <Grid container
                  spacing={4}
                  sx={{
                    px: 4
                  }}
                  direction="row">
                  <Grid item md={6} xs={12}>
                    <FormControlLabel px={2} value="30" control={<Radio />} label="30 Days" />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <FormControlLabel value="60" control={<Radio />} label="60 Days" />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <FormControlLabel value="90" control={<Radio />} label="90 Days" />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <FormControlLabel value="c" control={<Radio />} label="Custom Time Horizon" />
                  </Grid>
                </Grid>
              </RadioGroup>
            </FormControl>
          </Box>
        </>
      )}
      {tabs === "first" && (
        <>
          <Box
            sx={{
              height: 160,
            }}
          >
            <List disablePadding>
            </List>
            <Box
              px={2}
              py={3}
              sx={{
                textAlign: "center",
              }}
            >
              <Typography variant="subtitle2">
                {t("Nothing to Display")}!
              </Typography>
            </Box>
          </Box>
        </>
      )}
      {!tabs && (
        <Box
          p={3}
          display="flex"
          alignItems="center"
          justifyContent="center"
          sx={{
            height: 422,
            textAlign: "center",
          }}
        >
          <Box>
            <Typography
              align="center"
              variant="h2"
              fontWeight="normal"
              color="text.secondary"
              sx={{
                mt: 3,
              }}
              gutterBottom
            >
              {t("Select one of the tabs to continue")}
            </Typography>
            <Button
              sx={{
                mt: 4,
              }}
            >
              Maybe, a button?
            </Button>
          </Box>
        </Box>
      )}
      <Box
        sx={{
          maxWidth: '100%',
          padding: "1.5rem",
          '& .MuiTextField-root': { my: 1 },
        }}
      >
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Dependent Variable</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={age}
            label="Dependent Variable"
            onChange={handleChange}
          >
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </Card>
  );
}

export default Block8;
