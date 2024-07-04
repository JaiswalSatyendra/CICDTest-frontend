import { styled, alpha } from "@mui/material/styles";
import {
  Avatar,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Tooltip,
  tooltipClasses,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { useTranslation } from "react-i18next";
import SearchIcon from "@mui/icons-material/Search";

const TooltipWrapper = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.colors.alpha.trueWhite[100],
    color: theme.palette.getContrastText(theme.colors.alpha.trueWhite[100]),
    fontSize: theme.typography.pxToRem(12),
    fontWeight: "bold",
    borderRadius: theme.general.borderRadiusSm,
    boxShadow:
      "0 .2rem .8rem rgba(7,9,25,.18), 0 .08rem .15rem rgba(7,9,25,.15)",
  },
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.colors.alpha.trueWhite[100],
  },
}));

const Search = styled("div")(() => ({
  position: "relative",
  borderRadius: "5px",
  border: "1px solid #cccccc",
  width: "100%",
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "grey",
}));
const colData = [
  {
    title: "InternetService_Fiber optic",
    percentage: 0.326867,
  },
  {
    title: "Contract_Month-to-month",
    percentage: 0.309004,
  },
  {
    title: "PaperlessBilling",
    percentage: 0.165872,
  },
  {
    title: "StreamingTV_Yes",
    percentage: 0.134275,
  },
  {
    title: "StreamingMovies_Yes",
    percentage: 0.131698,
  },
  {
    title: "OnlineSecurity_No",
    percentage: 0.118931,
  },
  {
    title: "PaymentMethod_Electronic check",
    percentage: 0.113855,
  },
  {
    title: "TechSupport_No",
    percentage: 0.095824,
  },
  {
    title: "MultipleLines_Yes",
    percentage: 0.090564,
  },
  {
    title: "SeniorCitizen",
    percentage: 0.07922,
  },
  {
    title: "OnlineBackup_No",
    percentage: 0.053561,
  },
  {
    title: "DeviceProtection_Yes",
    percentage: 0.04904,
  },
  {
    title: "DeviceProtection_No",
    percentage: 0.023,
  },
  {
    title: "OnlineBackup_Yes",
    percentage: 0.017002,
  },
  {
    title: "PhoneService",
    percentage: 0.001901,
  },
  {
    title: "MultipleLines_No phone service",
    percentage: -0.001901,
  },
  {
    title: "Partner",
    percentage: -0.008257,
  },
  {
    title: "PaymentMethod_Bank transfer (automatic)",
    percentage: -0.027987,
  },
  {
    title: "TechSupport_Yes",
    percentage: -0.029537,
  },
  {
    title: "PaymentMethod_Mailed check",
    percentage: -0.035253,
  },
  {
    title: "gender",
    percentage: -0.041183,
  },
  {
    title: "Contract_One year",
    percentage: -0.043893,
  },
];
function ColumnImpact() {
  const { t } = useTranslation();
  const [query, setQuery] = useState("");

  const handleQueryChange = (event) => {
    event.persist();
    setQuery(event.target.value);
  };

  const applyFilters = (colData, query) => {
    return colData.filter((data) => {
      let matches = true;

      if (query) {
        const properties = ["title"];
        let containsQuery = false;

        properties.forEach((property) => {
          if (data[property].toLowerCase().includes(query.toLowerCase())) {
            containsQuery = true;
          }
        });

        if (!containsQuery) {
          matches = false;
        }
      }
      return matches;
    });
  };
  const filteredDatasets = applyFilters(colData, query);

  return (
    <>
      <Box sx={{ p: 1.5 }}>
        <Box display="flex">
          <Typography variant="h6" sx={{ fontSize: "13px", mb: 2 }}>
            Column Impact
          </Typography>
          {/* <TooltipWrapper title={t("Some Info")} arrow placement="top">
            <InfoOutlinedIcon sx={{ ml: 0.5, mt: "2px", fontSize: "1rem" }} />
          </TooltipWrapper> */}
        </Box>
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <input
            type="text"
            placeholder="Search columns..."
            onChange={handleQueryChange}
            value={query}
            style={{
              border: "none",
              outline: "none",
              width: "100%",
              padding: "9px 9px 9px 50px",
              borderRadius: "5px",
            }}
          />
        </Search>
      </Box>
      <Divider />
      <Box sx={{ height: "80vh", overflow: "scroll" }}>
        <List sx={{ p: 0 }}>
          {filteredDatasets.map((column, index) => {
            let percentage = column.percentage * 100;
            if (percentage < 10) percentage = percentage.toPrecision(3);
            else percentage = percentage.toPrecision(4);
            return (
              <ListItem
                key={index}
                secondaryAction={
                  <Box style={{ color: "grey" }}>{percentage}%</Box>
                }
              >
                <ListItemAvatar>
                  <Avatar
                    sx={{
                      backgroundColor: "white",
                      border: "2px solid #EEEEEE",
                    }}
                  >
                    <Box sx={{ color: "black" }}>{index + 1}</Box>
                  </Avatar>
                </ListItemAvatar>
                <Box
                  display="flex"
                  flexDirection="column"
                  sx={{ width: "100%" }}
                >
                  <ListItemText primary={column.title} />
                  <Box
                    sx={{
                      backgroundColor: "#3B9AE1",
                      height: "3px",
                      width: percentage > 0 ? `${percentage}%` : "0px",
                      mt: 0.8,
                    }}
                  ></Box>
                </Box>
              </ListItem>
            );
          })}
        </List>
      </Box>
    </>
  );
}

export default ColumnImpact;
