import React, { useState } from "react";
import { Button, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { ReactComponent as Tick } from "../../../../svg_icons/tick.svg";
import { ReactComponent as LeadScoring } from "../../../../svg_icons/lead-scoring.svg";
import { ReactComponent as ReduceChurn } from "../../../../svg_icons/reduce-churn.svg";
import { ReactComponent as Segmentation } from "../../../../svg_icons/segmentation.svg";
import { ReactComponent as UpSell } from "../../../../svg_icons/Up-Sell.svg";
import "./style.css";

import { useTranslation } from "react-i18next";

function Usecase({selectedModel}) {
  const { t } = useTranslation();
  const [selectedUseCase, setSelectedUseCase] = useState();

  const usecases = [
    {
      key: "churn",
      title: "Reduce Churn",
      value: "Reduce Churn",
      icon: (props) => <ReduceChurn fontSize="large" {...props} />,
      description:
        "Determine which users are most at risk of cancelling their subscription or at risk of leaving your products.",
        filepath: "/sampleData/Sample_Churn.csv",
    },
    {
      key: "rfm",
      title: "RFM Segmentation",
      value: "Segmentation",
      icon: (props) => <Segmentation {...props} />,
      description:
        "Determine which users are most likely to have similar set of preferences.",
        filepath: "/sampleData/Sample_Rfm.csv",
    },
    {
      key: "cross_sell",
      title: "Up-Sell/Cross Sell",
      value: "Up-Sell/Cross Sell",
      icon: (props) => <UpSell fontSize="large" {...props} />,
      description:
        "Determine which users are most likely to upgrade to the next tier of service or to find another product offering useful.",
        filepath: "/sampleData/Sample_Cross_Sell.csv",
    },
    {
      key: "lead_scoring",
      title: "Lead Scoring",
      value: "Lead Scoring",
      icon: (props) => <LeadScoring fontSize="large" {...props} />,
      description:
        "Prioritize your users or features based on engagement or activities.",
        filepath: "/sampleData/Sample_Leadscore.csv",
    },
  ];

  const setSelectedUseCaseBlock = (ev) => {
    console.log("amitt");
    setSelectedUseCase(ev.title)
    selectedModel(ev)
  }
  
  return (
    <>
      <Grid container spacing={2.5}>
        {usecases.map((item) => (
          <Grid item key={item.key}>
            <Box
              onClick={() => {
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
