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
import React, { useEffect, useState } from "react";
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
const colData = [];
function ColumnImpact(props) {
  const { t } = useTranslation();
  const [query, setQuery] = useState("");
  const [filteredDatasets, setFilteredDatasets] = useState([]);

  const handleQueryChange = (event) => {
    event.persist();
    setQuery(event.target.value);
  };
  useEffect(() => {
    if (props.modelName !== undefined) {
      let filteredDatasets1 = []
      if (props.modelName === "rfm") {
        filteredDatasets1 = props.impactData.filter(o => o["category"].toLowerCase().includes(query.toLowerCase()));
      }
      else if (props.modelName === "cross_sell") {
        filteredDatasets1 = props.impactData.filter(o => o["item"].toLowerCase().includes(query.toLowerCase()));
      } else {
        filteredDatasets1 = props.impactData.filter(o => o["feature"].toLowerCase().includes(query.toLowerCase()));
      }
      setFilteredDatasets(filteredDatasets1)
    }

  }, [query]);

  useEffect(() => {
    setFilteredDatasets(props.impactData);
    setQuery("");
  }, [props.impactData]);


  // const applyFilters = (colData, query) => {
  //   return colData.filter((data) => {
  //     let matches = true;

  //     if (query) {
  //       const properties = ["title"];//category
  //       let containsQuery = false;

  //       properties.forEach((property) => {
  //         if (data[property].toLowerCase().includes(query.toLowerCase())) {
  //           containsQuery = true;
  //         }
  //       });

  //       if (!containsQuery) {
  //         matches = false;
  //       }
  //     }
  //     return matches;
  //   });
  // };
  // const filteredDatasets = applyFilters(props.impactData, query);


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
      <Box sx={{ height: "70vh", overflow: "scroll" }}>
        {props.impactData !== undefined && props.modelName !== "cross_sell" && props.modelName !== "rfm" &&
          (<List sx={{ p: 0 }}>
            {filteredDatasets.map((column, index) => {
              let percentage = column.importance === undefined ? 0 :column.importance.toFixed(2);
              // if (percentage < 10) percentage = percentage.toPrecision(3);
              // else percentage = percentage.toPrecision(4);
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
                    <ListItemText primary={column.feature} />
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
          </List>)
        }
        {props.impactData != undefined && props.modelName == "cross_sell" &&
          (<List sx={{ p: 0 }}>
            {filteredDatasets.map((column, index) => {
              let percentage = column.perc === undefined ? 0 : column.perc.toFixed(2);
              return (
                <ListItem
                  key={index}
                  secondaryAction={
                    <Box style={{ color: "grey" }}>{column.sales}</Box>
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
                    <ListItemText primary={column.item} />
                    <Box
                      sx={{
                        backgroundColor: "#3B9AE1",
                        height: "3px",
                        width: (percentage * 100) + "%",
                        mt: 0.8,
                      }}
                    ></Box>
                  </Box>
                </ListItem>
              );
            })}
          </List>)
        }
        {props.impactData != undefined && props.modelName == "rfm" &&
          (<List sx={{ p: 0 }}>
            {filteredDatasets.map((column, index) => {
              let percentage = column.perc === undefined ? 0 : column.perc.toFixed(2);
              return (
                <ListItem
                  key={index}
                  onClick={() => props.selectedImpactCol(column.category)}
                  secondaryAction={
                    <Box style={{ color: "grey" }}>{column.count}</Box>
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
                    <ListItemText primary={column.category} />
                    <Box
                      sx={{
                        backgroundColor: "#3B9AE1",
                        height: "3px",
                        width: (percentage * 100) + "%",
                        mt: 0.8,
                      }}
                    ></Box>
                  </Box>
                </ListItem>
              );
            })}
          </List>)
        }
      </Box>
    </>
  );
}

export default ColumnImpact;
