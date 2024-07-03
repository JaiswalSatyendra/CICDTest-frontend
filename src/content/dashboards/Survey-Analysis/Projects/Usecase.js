import React, { useState } from "react";
import { Button, Grid, IconButton, Tooltip, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { ReactComponent as Tick } from "../../../../svg_icons/tick.svg";
import { ReactComponent as LeadScoring } from "../../../../svg_icons/lead-scoring.svg";
import { ReactComponent as ReduceChurn } from "../../../../svg_icons/reduce-churn.svg";
import { ReactComponent as Segmentation } from "../../../../svg_icons/segmentation.svg";
import { ReactComponent as UpSell } from "../../../../svg_icons/Up-Sell.svg";
import { ReactComponent as Custom } from "../../../../svg_icons/marketing.svg";
import DriveFileMoveIcon from '@mui/icons-material/DriveFileMove';
import "./style.css";

import { useTranslation } from "react-i18next";

function Usecase({ selectedModel, loggedUserId, formSchema, isSignedIn }) {
  const { t } = useTranslation();
  const [selectedUseCase, setSelectedUseCase] = useState();

  const usecases = [
    {
      key: "customer_retention",
      title: "Customer Retention",
      value: "Customer Retention",
      icon: (props) => <ReduceChurn fontSize="large" {...props} />,
      description:
        "Determine which users are most at risk of cancelling their subscription or at risk of leaving your products.",
    },
    {
      key: "produce_pricing",
      title: "Produce Pricing",
      value: "Produce Pricing",
      icon: (props) => <Segmentation {...props} />,
      description:
        "Determine which users are most likely to have similar set of preferences.",
    },
    {
      key: "product_upsell",
      title: "Product Upsell",
      value: "Product Upsell",
      icon: (props) => <UpSell fontSize="large" {...props} />,
      description:
        "Determine which users are most likely to upgrade to the next tier of service or to find another product offering useful.",
    },

    {
      key: "employee_retention",
      title: "Employee Retention",
      value: "Employee Retention",
      icon: (props) => <LeadScoring fontSize="large" {...props} />,
      description:
        "Prioritize your users or features based on engagement or activities.",
    },
    {
      key: "data_driven_assessment",
      title: "Data Driven Assessment",
      value: "Data Driven Assessment",
      icon: (props) => <LeadScoring fontSize="large" {...props} />,
      description:
        "Data Driven Assessment.",
    },
    {
      key: "custom",
      title: "Custom",
      value: "custom",
      icon: (props) => <Custom fontSize="large" {...props} />,
      description:
        "custom",
    },
  ];


  const setSelectedUseCaseBlock = (ev) => {
    setSelectedUseCase(ev.title)
    selectedModel(ev)
  }

  const getFormSchema = () => {
    formSchema()
  }

  return (
    <>
      {/* <a
              href={"http://34.93.41.55:81/v2/login-sd/convertml?loggedUserId="+loggedUserId+"&type=all"}
              target="_blank" rel="noopener noreferrer"
              rel="noreferrer"
              className="headContent"
            ></a> */}
      <Grid container spacing={2.5}>

        {usecases.map((item) => (
          <Grid item key={item.key}>
            <Box
              onClick={(ev) => {
                ev.stopPropagation()
                setSelectedUseCaseBlock(item);
                // handleUseCase(item.value);
              }}
            >
              <Button
                sx={{
                  height: 260,
                  width: 275,
                  p: 2,
                  border: "none",
                  backgroundColor:
                    selectedUseCase === item.title ? "#0053fb" : "#f3f3f3",
                  "&:hover": {
                    border: "none",
                    backgroundColor:
                      selectedUseCase === item.title ? "#0053fb" : "#f3f3f3",
                  },
                  borderRadius: 0.5,
                }}
                variant={
                  selectedUseCase === item.title ? "contained" : "outlined"
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
                      height: "30%",
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <item.icon
                      style={{
                        fontSize: "3rem",
                        fill:
                          selectedUseCase === item.title ? "white" : "#6270F5",
                      }}
                    />
                    {selectedUseCase === item.title ? (
                      <Tick style={{ height: "25px" }} />
                    ) : null}
                  </Box>
                  <Box
                    style={{
                      height: "70%",
                      display: "flex",
                      alignItems: "flex-start",
                      flexDirection: "column",
                      paddingTop: "25px",
                    }}
                  >
                    <Box sx={{ mb: 1.5 }}>
                      <Typography
                        variant="h3"
                        sx={{
                          color:
                            selectedUseCase === item.title ? "white" : "black",
                          fontWeight: "bold !important",
                          textAlign: "left",
                          fontFamily: "Manrope",
                        }}
                      >
                        {t(item.title)}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography
                        sx={{
                          color:
                            selectedUseCase === item.title ? "white" : "black",
                          opacity: "0.8",
                          lineHeight: "24px",
                          fontWeight: "500 !important",
                          fontSize: "15px",
                          textAlign: "left",
                          fontFamily: "Manrope",
                        }}
                      >
                        {t(item.description)}
                      </Typography>
                      {
                        item.title == 'Custom' && selectedUseCase === 'Custom' &&
                        <a
                          href={"http://34.93.41.55:81/v2/login-sd/convertml?loggedUserId=" + loggedUserId + "&type=Typeform&typeformToken=" + isSignedIn.access_token}
                          target="_blank" rel="noopener noreferrer"
                          rel="noreferrer"
                          className="headContent"
                        >
                          <Button

                            disabled={isSignedIn.status ? false : true}
                            sx={{
                              position: 'absolute',
                              right: 2,
                              bottom: 2,
                              background: (theme) => theme.palette.grey[500], borderRadius: 0.5
                            }}
                            size="large"
                            variant="contained"
                          >
                            {t("Get data")}
                          </Button>
                        </a>
                      }

                      {/* {
                        item.key === 'customer_retention' && selectedUseCase === 'Customer Retention' &&

                        <Tooltip title={t("Ingest Data3")} arrow>
                          <IconButton
                            onClick={(ev) => {
                              ev.stopPropagation()
                              getFormSchema()
                            }}
                            
                            style={{
                              fontSize: "3rem",
                              fill:"white",
                              position: 'absolute',
                              right: 0,
                              bottom: 0,

                            }}
                          >
                            <DriveFileMoveIcon style={{
                              fill:"white",
                            }} fontSize="large" />
                          </IconButton>
                        </Tooltip>


                      } */}
                    </Box>
                  </Box>
                </Box>
              </Button>

            </Box>

          </Grid>
        ))}

      </Grid>
    </>
  );
}

export default Usecase;
