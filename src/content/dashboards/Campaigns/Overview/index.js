import React, { useState, useEffect, useCallback, useContext } from "react";
import TagsInput from "./TagsInput";
import Logo from "./logo.png";
import Edit from "./pencil.png";
import Type1 from "./type1.png";
import Type2 from "./type2.png";
import Type3 from "./type3.png";
import Type4 from "./type4.png";
import "./main.scss";
import useRefMounted from "../../../../hooks/useRefMounted";
import axios from "axios";
import { SnackbarProvider, useSnackbar } from "notistack";
import { SessionContext } from "../../../../contexts/SessionContext";
import {
  Box,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { uploadFile } from "./multiPartUpload";
import ToastMessage from "./ToastMessage";
import { LoadingButton } from "@mui/lab";

function Overview() {
  const isMountedRef = useRefMounted();
  const [defaultTemplate, setDefaultTemplate] = useState([]);
  const [templateId, setTemplateId] = useState("");
  const [campaignName, setCampaignName] = useState("");
  const [senderEmail, setSenderEmail] = useState("");
  const [subject, setSubject] = useState("");
  // const [selectedFile, setSelectedFile] = useState();
  // const hiddenFileInput = React.useRef(null);
  const { enqueueSnackbar } = useSnackbar();
  const [tags, setTags] = useState(["Cart abandoned Email"]);
  const [datasets, setDatasets] = useState([]);
  const [cloumns, setColumns] = useState([]);
  const [selectedDataset, setSelectedDataset] = useState("");
  const [selectedDatasetId, setsetSelectedDatasetId] = useState(null);
  const [selectedColumnName, setSelectedColumnName] = useState("");
  const [loading, setLoading] = useState(false);
  const [launchingCampaign, setLaunchingCampaign] = useState(false);
  const [toastObject, setToastObject] = useState({
    message: "",
    severity: "",
    open: false,
  });

  //saved templates api

  const getTemplates = useCallback(async () => {
    try {
      if (isMountedRef.current) {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/userEmailTemplates/list`,
          { withCredentials: true }
        );
        setDefaultTemplate(response.data.data);
      }
    } catch (err) {
      console.log(err);
    }
  }, [isMountedRef]);

  useEffect(() => {
    getTemplates();
  }, []);
  //api

  const [session, , , ,] = useContext(SessionContext);
  const { user } = session;
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/dataset/list`, {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((res) => {
        setDatasets(res.data);
      })
      .catch((error) => {
        setDatasets([]);
        console.log(error);
      });
  }, [user]);

  const [defaultType, setDefaultType] = useState("One Time");
  const [style, setStyle] = useState("activeType");
  const changeStyle = (event) => {
    setDefaultType(event.target.textContent);
  };

  const [style2, setStyle2] = useState("cptype");
  const changeStyle2 = (event) => {
    setDefaultType(event.target.textContent);
  };

  const [style3, setStyle3] = useState("cptype");
  const changeStyle3 = (event) => {
    setDefaultType(event.target.textContent);
  };

  const [style4, setStyle4] = useState("cptype");
  const changeStyle4 = (event) => {
    setDefaultType(event.target.textContent);
  };

  const [show, setShow] = useState(false);

  useEffect(async () => {
    if (selectedDatasetId) {
      setLoading(true);
      await axios
        .get(
          `${process.env.REACT_APP_API_URL}/dataset/columns/${selectedDatasetId}`,
          {
            withCredentials: true,
          }
        )
        .then((response) => {
          setLoading(false);
          setColumns(response.data.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [selectedDatasetId]);

  // const handleChangeAttachment = (event) => {
  //   setSelectedFile(event.target.files[0]);
  // };

  function handleClickVariant(msg, variant) {
    // variant could be success, error, warning, info, or default
    enqueueSnackbar(msg, {
      variant,
      anchorOrigin: {
        horizontal: "right",
        vertical: "bottom",
      },
    });
  }

  const reset = () => {
    setCampaignName("");
    setTags(["Cart abandoned Email"]);
    setSenderEmail("");
    setTemplateId("");
    setSubject("");
    setSelectedDataset("");
    setsetSelectedDatasetId("");
    setSelectedColumnName("");
  };

  const executeCampaign = async () => {
    //Step 1. Creating Object Id
    try {
      setLaunchingCampaign(true);
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/emailCampaign/createId`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      const json = await response.json();
      const objectId = json.data;

      //Step 2. Creating config.json file
      if (objectId) {
        let data = `{
          "bucketName": "${user._id}",
          "databaseName": "${user._id}",
          "tableName": "${selectedDataset}",
          "recipientMail": "${selectedColumnName}",
          "emailCampaign": "${objectId}"
        }`;
        // console.log(data);
        var myBlob = new Blob([data], { type: "text/plain" });
        const file = new File([myBlob], "config.json", {
          type: "text/plain",
        });
        console.log(file);

        // uploading config.json file
        await uploadFile({
          user,
          file: file,
          datasetId: selectedDatasetId,
          datasetTitle: selectedDataset,
          objectId: objectId,
        });

        //Step 3. Launching campaign
        await axios
          .post(
            `${process.env.REACT_APP_API_URL}/emailCampaign/create`,
            {
              id: objectId,
              name: campaignName,
              tags: tags, //array of tags that user enters
              type: "one-time",
              senderMail: senderEmail,
              subject: subject,
              template: templateId,
              dataset: selectedDatasetId,
              audienceCriteria: selectedColumnName,
            },
            {
              withCredentials: true,
            }
          )
          .then((response) => {
            if (response.data.success) {
              reset();
              setToastObject((prevState) => ({
                ...prevState,
                message: "Campaign launched successfully",
                severity: "success",
                open: true,
              }));
            }
            setLaunchingCampaign(false);
            console.log(response);
          })
          .catch((error) => {
            setLaunchingCampaign(false);
            setToastObject((prevState) => ({
              ...prevState,
              message: "Error while launching campaign",
              severity: "error",
              open: true,
            }));
            console.log(error);
          });
      }
    } catch (error) {
      setLaunchingCampaign(false);
      setToastObject((prevState) => ({
        ...prevState,
        message: "Error while launching campaign",
        severity: "error",
        open: true,
      }));
      console.log("error", error);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let error = false;
    if (selectedColumnName === "") {
      handleClickVariant("Column Name is required", "error");
      error = true;
    }
    if (selectedDataset === "") {
      handleClickVariant("Dataset is required", "error");
      error = true;
    }
    if (subject === "") {
      handleClickVariant("Subject is required", "error");
      error = true;
    }
    if (templateId === "") {
      handleClickVariant("Please select Email tempalte", "error");
      error = true;
    }
    if (senderEmail === "") {
      handleClickVariant("Sender Email is required", "error");
      error = true;
    }
    if (campaignName === "") {
      handleClickVariant("Campaign Name is required", "error");
      error = true;
    }
    if (!error) {
      executeCampaign();
    }
  };

  return (
    <div className="overviewContainer">
      <div className="heading">
        <img id="logo" src={Logo}  alt='convertml' />
        <p id="title">Launch Campaign</p>
      </div>
      <hr />
      <form className="flexOverview">
        <div id="child1">
          <h1>Campaign Name</h1>
          <input
            type="text"
            value={campaignName}
            onChange={(e) => {
              setCampaignName(e.target.value);
            }}
            name="campaignName"
          />
        </div>
        <div id="child2">
          <h1>Campaign Tags</h1>
          <div className="ootagsInput">
            <TagsInput tags={tags} setTags={setTags} />
          </div>
        </div>
        <div id="child3">
          <div className="campaignheading">
            <h1>Campaign Type</h1>
            <div className="flexitem">
              <div id="child31">
                <option>{defaultType}</option>
                <img
                  onClick={() => setShow(!show)}
                  id="edit"
                  src={Edit}
                  alt="options"
                />
              </div>
            </div>
          </div>
          {show ? (
            <div className="campaigntypes">
              <div className="containerforcampaigntypes">
                <div id="firstrow">
                  <div className={style}>
                    <h2
                      onClick={(e) => {
                        setStyle("activeType");
                        setStyle2("cptype");
                        setStyle3("cptype");
                        setStyle4("cptype");
                        changeStyle(e);
                      }}
                    >
                      One Time
                    </h2>
                    <img id="type1img" src={Type1}  alt='convertml' />
                    <p>Send the campaign only once</p>
                  </div>
                  <div className={style2}>
                    <h2
                      onClick={(e) => {
                        setStyle("cptype");
                        setStyle2("activeType");
                        setStyle3("cptype");
                        setStyle4("cptype");
                        changeStyle2(e);
                      }}
                    >
                      Triggered
                    </h2>
                    <img id="type2img" src={Type2}  alt='convertml' />
                    <p>Send the campaign on occurence of a custom event</p>
                  </div>
                </div>
                <div id="secondrow">
                  <div className={style3}>
                    <h2
                      onClick={(e) => {
                        setStyle("cptype");
                        setStyle2("cptype");
                        setStyle3("activeType");
                        setStyle4("cptype");
                        changeStyle3(e);
                      }}
                    >
                      Recurring
                    </h2>
                    <img id="type3img" src={Type3}  alt='convertml'/>
                    <p>Schedule the campaign to be sent at regular intervals</p>
                  </div>
                  <div className={style4}>
                    <h2
                      onClick={(e) => {
                        setStyle("cptype");
                        setStyle2("cptype");
                        setStyle3("cptype");
                        setStyle4("activeType");
                        changeStyle4(e);
                      }}
                    >
                      Transactional
                    </h2>
                    <img id="type4img" src={Type4}  alt='convertml' />
                    <p>Send critical messages through our transactional API</p>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </div>
        <div id="child1">
          <h1>Sender's Email </h1>
          <input
            type="email"
            value={senderEmail}
            onChange={(e) => {
              setSenderEmail(e.target.value);
            }}
            name="senderEmail"
          />
        </div>
        <div id="child4">
          <h1 htmlFor="templates">Email Template</h1>
          <Box style={{ width: "70%", marginBottom: "12px" }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Select a template
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Select a template"
                defaultValue=""
                onChange={(e) => {
                  setTemplateId(e.target.value._id);
                }}
                sx={{
                  backgroundColor: "white",
                  borderRadius: "5px",
                }}
              >
                {defaultTemplate.map((value, index) => (
                  <MenuItem value={value} key={index}>
                    {value.title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </div>
        <div id="child1">
          <h1>Subject </h1>
          <input
            type="text"
            value={subject}
            onChange={(e) => {
              setSubject(e.target.value);
            }}
            name="subject"
          />
        </div>
        {/* <div id="child1">
          <h1>Attachment </h1>
          <input
            type="file"
            placeholder="Add attachment"
            id="dialog"
            ref={hiddenFileInput}
            onChange={handleChangeAttachment}
          />
        </div> */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <h1 htmlFor="options" style={{ marginBottom: "0px" }}>
            Audience Criteria
          </h1>
          <Box
            sx={{
              display: "flex",
              width: "70%",
              justifyContent: "space-between",
            }}
          >
            <Box style={{ width: "45%" }}>
              <FormControl fullWidth>
                <InputLabel id="demo-select-small">Select Dataset</InputLabel>
                <Select
                  labelId="demo-select-small"
                  id="demo-select-small"
                  label="Select Dataset"
                  defaultValue=""
                  onChange={(e) => {
                    setSelectedDataset(e.target.value.title);
                    setsetSelectedDatasetId(e.target.value._id);
                  }}
                  sx={{
                    backgroundColor: "white",
                    borderRadius: "5px",
                  }}
                >
                  {datasets.map((value) => (
                    <MenuItem value={value} key={value._id}>
                      {value.title}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            <Box
              style={{
                width: "45%",
                display: "flex",
              }}
            >
              <Box sx={{ width: "85%" }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-select-small">Select Cloumn</InputLabel>
                  <Select
                    labelId="demo-select-small"
                    id="demo-select-small"
                    label="Select Cloumn"
                    defaultValue=""
                    onChange={(e) => {
                      setSelectedColumnName(e.target.value);
                    }}
                    sx={{
                      backgroundColor: "white",
                      borderRadius: "5px",
                    }}
                  >
                    {cloumns?.map((value, index) => (
                      <MenuItem value={value.row} key={index}>
                        {value.row}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                sx={{ width: "15%", pl: 1 }}
              >
                {loading ? <CircularProgress size="1.5rem" /> : ""}
              </Box>
            </Box>
          </Box>
        </Box>
        <LoadingButton
          onClick={handleSubmit}
          loading={launchingCampaign}
          variant="outlined"
        >
          Execute Campaign
        </LoadingButton>
      </form>
      <ToastMessage toastObject={toastObject} setToastObject={setToastObject} />
    </div>
  );
}

export default function IntegrationNotistack() {
  return (
    <SnackbarProvider maxSnack={6}>
      <Overview />
    </SnackbarProvider>
  );
}
