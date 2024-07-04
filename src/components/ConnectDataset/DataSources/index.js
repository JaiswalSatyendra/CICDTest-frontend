import { useEffect, useState } from "react";
import { Box, Grid, Button, useTheme, Typography, Radio } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import { ReactComponent as Csv } from "../../../svg_icons/csv.svg";
import { ReactComponent as S3 } from "../../../svg_icons/s3.svg";
import { ReactComponent as GCP } from "../../../svg_icons/gcp.svg";
import { ReactComponent as Azure } from "../../../svg_icons/azure.svg";
import axios from "axios";

function DataSources({ handleDataSource, selectAll }) {
  const { t } = useTranslation();
  const [selectedDataSource, setSelectedDataSource] = useState(null);
  let [loggedUserId, setloggedUserId] = useState("5596");
  const [isSignedIn, setSignedIn] = useState({status:false,access_token:"",refresh_token:""});

  // let loggedUserId = "2525"

  const dataSources = [
    {
      title: "Csv/Xlsx",
      value: "upload",
      icon: (props) => <Csv {...props} />,
      checked: selectAll,
      disable: false,
    },
    {
      title: "S3 Bucket",
      value: "s3",
      icon: (props) => <S3 {...props} />,
      checked: false,
      disable: selectAll,
    },
    {
      title: "GCP BigQuery",
      value: "gcp",
      icon: (props) => <GCP {...props} />,
      checked: false,
      disable: selectAll,
    },
    // {
    //   title: "API Endpoint",
    //   value: "api",
    //   icon: "",
    // },
    {
      title: "Azure",
      value: "azure",
      icon: (props) => <Azure {...props} />,
      checked: false,
      disable: selectAll,
    },
  ];



  // setloggedUserId = (id) => {
  //   loggedUserId = id;
   
  // }


  
  useEffect(async () => {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/user/getUser`, { withCredentials: true });
    // console.log("ammmiittt",response.data)
    if (response.data.user.access_token == undefined) {
      let newObj = {status:false,access_token:"",refresh_token:""}
      setSignedIn(newObj)
    } else {
      let newObj = {status:true,access_token:response.data.user.access_token,refresh_token:response.data.user.refresh_token}
      setSignedIn(newObj)
    }
    setloggedUserId(response.data.user._id)
    if (selectAll) {
      setSelectedDataSource("Csv/Xlsx");
      handleDataSource("upload");
    }
  }, [selectAll],[loggedUserId]);

  return (
    <Grid container direction={{ xs: "column", sm: "row" }} spacing={1}>
      {dataSources.map((item) => (
        <Grid item key={item.value}>
          <Box>
            <Button
              sx={{
                "&:hover": {
                  bgcolor: "transparent",
                },
              }}
              onClick={() => {
                setSelectedDataSource(item.title);
                handleDataSource(item.value);
              }}
              variant="outlined"
              style={{ borderColor: "#e0e1dd", borderRadius: "5px" }}
            >
              <Box
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Box
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <item.icon
                    style={{
                      height: "25px",
                      width: "25px",
                      marginRight: "5px",
                    }}
                  />
                  <Typography
                    variant="h6"
                    sx={{
                      whiteSpace: "nowrap",
                      mr: 2,
                      ml: 1,
                    }}
                  >
                    {t(item.title)}
                  </Typography>
                </Box>
                <Radio
                  disabled={item.disable}
                  sx={{
                    "&:hover": {
                      bgcolor: "transparent",
                    },
                  }}
                  disableRipple
                  checked={selectedDataSource === item.title || item.checked}
                  size="small"
                  name="radio-buttons"
                  style={{
                    color: selectedDataSource === item.title ? "" : "#e0e1dd",
                  }}
                  
                />
              </Box>
            </Button>
          </Box>
        </Grid>
      ))}
      
      <Box
        sx={{
          m: 1.2,
        }}
      >
         <a 
              href={"http://34.93.41.55:81/v2/login-sd/convertml?loggedUserId="+loggedUserId+"&type=all&typeformToken=" + isSignedIn.access_token}
              target="_blank" rel="noopener noreferrer" 
              className="headContent"
            >
        <Button
          sx={{
            width: "150px",
            height: "52px",
          }}
          variant="contained"
          style={{ borderRadius: "5px" }}
        >
          <Typography
            variant="h6"
            sx={{
              whiteSpace: "nowrap",
              mr: 2,
              ml: 1,
            }}
          >
           
              {"More..."}
           
          </Typography>
        </Button>
        </a>
      </Box>
    </Grid>
  );
}

export default DataSources;
