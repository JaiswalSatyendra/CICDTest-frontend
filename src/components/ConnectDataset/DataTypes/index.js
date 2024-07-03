import React, { useEffect } from "react";
import { useState } from "react";
import {
  Box,
  Grid,
  Button,
  Typography,
  Tooltip,
  tooltipClasses,
  styled,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { ReactComponent as Customer } from "../../../svg_icons/customer.svg";
import { ReactComponent as Marketing } from "../../../svg_icons/marketing.svg";
import { ReactComponent as ProductUsage } from "../../../svg_icons/product_usage.svg";
import { ReactComponent as Payment } from "../../../svg_icons/payment.svg";
import { ReactComponent as ThirdParty } from "../../../svg_icons/third_party.svg";
import { ReactComponent as OtherData } from "../../../svg_icons/other_data.svg";
import { ReactComponent as Tick } from "../../../svg_icons/tick.svg";

function DataTypes({ handleDataType, selectAll }) {
  const { t } = useTranslation();
  const [selectedDataType, setSelectedDataType] = useState(null);

  const dataTypes = [
    {
      title: "Customer",
      value: "customer",
      icon: (props) => <Customer {...props} />,
      description:
        "All available details about the customer such as customer id, email domain, zip code etc.",
      filepath: "/sampleData/Sample_Customer.csv",
      alt: "Customer",
    },
    {
      title: "Sales",
      value: "sales",
      icon: (props) => <ProductUsage {...props} />,
      description:
        "All available data about the users’ interaction with the product. e.g. In-App user clicks or events.",
      filepath: "/sampleData/Sample_Sales.csv",
      alt: "Sales",
    },
    {
      title: "Lead Scoring",
      value: "lead-scoring",
      icon: (props) => <Payment {...props} />,
      description:
        "All available transaction related data such as plan type, payment mode, auto-recurring etc.",
      filepath: "/sampleData/Sample_Leadscore.csv",
      alt: "Lead Scoring",
    },
    {
      title: "Logs/Other Data",
      value: "labelled-data",
      icon: (props) => <OtherData {...props} />,
      description:
        "All available data related to application logs or alerts or any other collected data.",
      filepath: "",
      alt: "Logs/Other Data",
    },
    {
      title: "Campaign",
      value: "campaign",
      icon: (props) => <ProductUsage {...props} />,
      description:
        "All available data about the users’ interaction with the product. e.g. In-App user clicks or events.",
      filepath: "/sampleData/Sample_Campaign.csv",
      alt: "Campaign",
    },
  ];
  useEffect(() => {
    if (selectAll) {
      setSelectedDataType("All_data_types_selected");
      handleDataType("All_data_types");
    }
  }, [selectAll]);

  const LightTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: theme.palette.common.white,
      color: "rgba(0, 0, 0, 0.87)",
      boxShadow: theme.shadows[1],
      fontSize: 11,
    },
    [`& .${tooltipClasses.arrow}`]: {
      color: theme.colors.alpha.trueWhite[100],
    },
  }));

  return (
    <Grid container spacing={1}>
      {dataTypes.map((item) => (
        <Grid item key={item.value}>
          <Box
            onClick={() => {
              setSelectedDataType(item.title);
              handleDataType(item.value);
            }}
          >
            <Button
              sx={{
                height: 210,
                width: 175,
                border: "none",
                backgroundColor:
                  selectedDataType === item.title || selectAll
                    ? "#0053fb"
                    : "#f3f3f3",
                "&:hover": {
                  border: "none",
                  backgroundColor:
                    selectedDataType === item.title || selectAll
                      ? "#0053fb"
                      : "#f3f3f3",
                },
                borderRadius: 0.5,
              }}
              variant={
                selectedDataType === item.title || selectAll
                  ? "contained"
                  : "outlined"
              }
            >
              <Box
                style={{
                  height: "100%",
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <Box
                  style={{
                    height: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <item.icon
                    style={{
                      height: "30px",
                      width: "30px",
                      fill:
                        selectedDataType === item.title || selectAll
                          ? "#fff"
                          : "#5e71fe",
                    }}
                  />
                  {selectedDataType === item.title || selectAll ? (
                    <Tick style={{ height: "25px" }} />
                  ) : null}
                </Box>
                <Box
                  style={{
                    paddingTop: "20px",
                    height: "50%",
                    display: "flex",
                    alignItems: "flex-start",
                    flexDirection: "column",
                  }}
                >
                  <Box
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{
                        whiteSpace: "nowrap",
                        color:
                          selectedDataType === item.title || selectAll
                            ? ""
                            : "black",
                      }}
                    >
                      {t(item.title)}
                    </Typography>
                    <LightTooltip
                      placement="top-start"
                      title={item.description}
                      arrow
                    >
                      <HelpOutlineIcon
                        sx={{ pl: 1 }}
                        style={{ fontSize: "25px" }}
                      />
                    </LightTooltip>
                  </Box>
                  <Link
                    to={item.filepath}
                    target="_blank" rel="noopener noreferrer"
                    download
                    style={{
                      paddingTop: "20px",
                      textDecoration: "underline",
                      fontSize: "11px",
                    }}
                  >
                    Sample Data
                  </Link>
                </Box>
              </Box>
            </Button>
          </Box>
        </Grid>
      ))}
    </Grid>
  );
}

export default DataTypes;
