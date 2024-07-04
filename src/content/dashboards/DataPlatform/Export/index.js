import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Autocomplete
} from "@mui/material";
import { Helmet } from "react-helmet-async";
import PageTitleWrapper from "../../../../components/PageTitleWrapper";
import PageHeader from "./PageHeader";
import { ReactComponent as Hubspot } from "../../../../svg_icons/hubspot.svg";
import { ReactComponent as Salesforce } from "../../../../svg_icons/salesforce.svg";
import styled from "@emotion/styled";
import ToastMessage from "./ToastMessage";

import { useDispatch, useSelector } from "../../../../store";
import {
  getEvents
} from "../../../../slices/get_user_img";
  // useEffect(() => {
  //   console.log("ssss"+events.length);
  //   console.log("ssss"+isDrawerOpen);
  //  // dispatch(getEvents());
  // }, [dispatch]);

function Export() {
  const [dataset, setDataset] = useState("");
  const [item, setItem] = useState([]);
  const [selectedExport, setselectedExport] = useState();
  const [toastObject, setToastObject] = useState({
    message: "",
    severity: "",
    open: false,
  });

  const [paramsForSalesForce, setparamsForSalesForce] = useState({
    datasetName: "",
    objectLabel: "",
    userName: "",
    password: "",
    token: "",
  });

  const [validateEmailPattern, setValidateEmailPattern] = useState(/^[/\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g);

  const dispatch = useDispatch();
  const { userProfileImg } = useSelector(
    (state) => state.userImg
  );

  const SvgWrapper = styled(({ ...props }) => <Paper {...props} />)(() => ({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "20rem",
    height: "11rem",
    margin: "18px 0 18px 0",
    cursor: "pointer",
  }));
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/dataset/list`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setItem((prevState) => {
          var n = data.data.map((e) => {
            return { title: e.title, _id: e._id };
          });
          return [...prevState, ...n];
        });
        // console.log(item);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleDataSetChange = (event, newVal) => {
    if (newVal != null) {
      let getSelectedId = item[event.target.dataset.optionIndex]._id
      setDataset(getSelectedId);
      setparamsForSalesForce((prevState) => {
        return {
          ...prevState,
          datasetName: newVal,
        };
      });
    }else{
      setDataset("");
      setparamsForSalesForce((prevState) => {
        return {
          ...prevState,
          datasetName: newVal,
        };
      });
    }
  };

  const handleObjectNameChange = (event) => {
    setparamsForSalesForce((prevState) => {
      return {
        ...prevState,
        objectLabel: event.target.value,
      };
    });
  };

  const handleUserNameChange = (event) => {
    setparamsForSalesForce((prevState) => {
      return {
        ...prevState,
        userName: event.target.value,
      };
    });
  };

  const handlePasswordChange = (event) => {
    setparamsForSalesForce((prevState) => {
      return {
        ...prevState,
        password: event.target.value,
      };
    });
  };

  const handleTokenChange = (event) => {
    setparamsForSalesForce((prevState) => {
      return {
        ...prevState,
        token: event.target.value,
      };
    });
  };



  const handleExport = () => {
    console.log("ddddddd");
    if (dataset) {
      if (selectedExport === "hubspot") {
        fetch(`${process.env.REACT_APP_API_URL}/user/dataset/export`, {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          credentials: "include"
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
          });
      } else {
        if (paramsForSalesForce.objectLabel === "" || paramsForSalesForce.userName === "" || paramsForSalesForce.password === "" || paramsForSalesForce.token === "") {
          setToastObject((prevState) => ({
            ...prevState,
            message: "Please fill all required field",
            severity: "error",
            open: true,
          }));
        }
        else {
          if ((paramsForSalesForce.userName.match(validateEmailPattern))) {
            fetch(`${process.env.REACT_APP_API_URL}/crmData/exportSalesForceData`, {
              method: "POST",
              headers: {
                "Content-type": "application/json",
              },
              credentials: "include",
              body: JSON.stringify(paramsForSalesForce),
            })
              .then((res) => res.json())
              .then((data) => {
                setToastObject((prevState) => ({
                  ...prevState,
                  message: data.message,
                  severity: data.success?"success":"error",
                  open: true,
                }));
              });
          } else {
            setToastObject((prevState) => ({
              ...prevState,
              message: "Please Enter valid email",
              severity: "error",
              open: true,
            }));
            //openSignInWindow();
          }
        }
      }
    } else {
      setToastObject((prevState) => ({
        ...prevState,
        message: "Please select dataset first",
        severity: "error",
        open: true,
      }));
    }
  };


  useEffect(() => {
    console.log("ssss",userProfileImg);
  
  }, []);

  // useEffect(() => {
  //   console.log("ssss"+events.length);
  //   console.log("ssss"+isDrawerOpen);
  //  // dispatch(getEvents());
  // }, [dispatch]);


  useEffect(() => {
    const params = window.location.search;
    if (window.opener) {
      window.opener.postMessage(params);
      window.close();
    }
  });
  const receiveMessage = (event) => {
    const { data } = event;
    if (typeof data === "string" && data.startsWith("?code=")) {
      const queryParams = new URLSearchParams(data);
      fetch(`${process.env.REACT_APP_API_URL}/user`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          platform: queryParams.get("platform"),
          instanceUrl: queryParams.get("instanceUrl"),
          accessToken: queryParams.get("code"),
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
        });
    }
  };

  let windowObjectReference = null;
  let previousUrl = null;
  const openSignInWindow = () => {
    window.removeEventListener("message", receiveMessage);
    const strWindowFeatures =
      "toolbar=no, menubar=no, width=600, height=700, top=100, left=100";
    if (windowObjectReference === null || windowObjectReference.closed) {
      windowObjectReference = window.open(
        process.env.REACT_APP_API_URL + "/auth/salesforce/login",
        "name",
        strWindowFeatures
      );
    } else if (
      previousUrl !==
      process.env.REACT_APP_API_URL + "/auth/salesforce/login"
    ) {
      windowObjectReference = window.open(
        process.env.REACT_APP_API_URL + "/auth/salesforce/login",
        "name",
        strWindowFeatures
      );
      windowObjectReference.focus();
    } else {
      windowObjectReference.focus();
    }

    window.addEventListener("message", (event) => receiveMessage(event), false);
    previousUrl = process.env.REACT_APP_API_URL + "/auth/salesforce/login";
  };

  const handleChangeProjectName = (event) => {
    // setprojectName(event.target.value);
  };


  return (
    <>
      <Helmet>
        <title>Dashboard</title>
      </Helmet>
      <PageTitleWrapper>
        <PageHeader />
      </PageTitleWrapper>
      <Box
        component="form"
        noValidate
        autoComplete="off"
        sx={{ mt: 2, p: 1 }}
        style={{ width: "100%", backgroundColor: "white", marginTop: "-36px" }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} md={6} >
            <FormControl fullWidth >
              <Autocomplete
                disablePortal
                // value={selectedPoject.selectedDataset == "" ? null : selectedPoject.selectedDataset}
                onChange={handleDataSetChange}
                id="select-Dataset-crmproject-name"
                options={item.map((option) => option.title)}
                renderInput={(params) => <TextField {...params} label="Select Dataset" />}
              />
              {/* <InputLabel id="demo-simple-select-label">Select Dataset</InputLabel>
              <Select
                labelId="demo-select-small"
                id="demo-select-small"
                label="Select Dataset*"
                onChange={handleDataSetChange}

              >
                {item.map((e) => {
                  return (
                    <MenuItem value={e} key={e._id}>
                      {e.title.toUpperCase()}
                    </MenuItem>
                  );
                })}
              </Select> */}
            </FormControl>
          </Grid>

          {selectedExport === "salesforce" &&
            <>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth size="small">
                  <TextField
                    fullWidth
                    label="Object Label*"
                    id="object-name"
                    onChange={handleObjectNameChange}
                  />

                </FormControl>
              </Grid>
              <Grid item xs={12} md={4}>
                <FormControl fullWidth size="small">
                  <TextField
                    fullWidth
                    label="User Name*"
                    id="user-name"
                    onChange={handleUserNameChange}
                  />

                </FormControl>
              </Grid>
              <Grid item xs={12} md={4}>
                <FormControl fullWidth size="small">
                  <TextField
                    fullWidth
                    label="Password*"
                    id="password-name"
                    onChange={handlePasswordChange}
                  />

                </FormControl>
              </Grid>

              <Grid item xs={12} md={4}>
                <FormControl fullWidth size="small">
                  <TextField
                    fullWidth
                    label="Token*"
                    id="token-name"
                    onChange={handleTokenChange}
                  />

                </FormControl>
              </Grid>
            </>
          }

        </Grid>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          sx={{ mt: 2, p: 1 }}
        >
          <Box
            variant="outlined"
            sx={{
              width: "10rem",
              color: "#808080",
              px: 1.5,
              py: 0.8,
              border: "1px solid #cccccc",
              borderRadius: "5px",
              background: "#fff",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            Export Using
          </Box>
        </Box>
        <Grid
          container
          direction={{ xs: "column", sm: "row" }}
          display="flex"
          justifyContent="space-evenly"
          alignItems="center"
          mt={1}
        >
          <Grid item>
            <SvgWrapper
              variant="outlined"
              style={{
                border: selectedExport === "hubspot" ? "1px solid #5569ff" : "",
              }}
              onClick={() => {
                setselectedExport("hubspot");
              }}
            >
              <Hubspot style={{ height: "13rem", width: "13rem" }} />
            </SvgWrapper>
          </Grid>
          <Grid item>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              style={{ fontSize: "22px", color: "#BBBBBB", fontWeight: "600" }}
            >
              OR
            </Box>
          </Grid>
          <Grid item>
            <SvgWrapper
              variant="outlined"
              style={{
                border:
                  selectedExport === "salesforce" ? "1px solid #5569ff" : "",
              }}
              onClick={() => {
                setselectedExport("salesforce");
              }}
            >
              <Salesforce style={{ height: "10rem", width: "10rem" }} />
            </SvgWrapper>
          </Grid>
        </Grid>
        <Box display="flex" justifyContent="center" alignItems="center" mt={1}>
          <Button
            variant="contained"
            onClick={handleExport}
            sx={{ borderRadius: "5px" }}
          >
            Export
          </Button>
        </Box>
      </Box>

      <ToastMessage toastObject={toastObject} setToastObject={setToastObject} />
    </>
  );
}

export default Export;
