import React, { useRef, useState } from "react";
import EmailEditor from "react-email-editor";
import axios from "axios";
import { useEffect } from "react";
import SaveTemplate from "./Component/SaveTemplate";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  LinearProgress,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import ToastMessage from "./ToastMessage";

const SavedTemplateEmailEditor = () => {
  const emailEditorRef = useRef(null);
  const [savedTemplateS3Location, setSavedTemplateS3Location] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [HTML, setHTML] = useState("");
  const [unlayerJson, setUnalyerJson] = useState({});
  const [mergeTags, setMergeTags] = useState({}); // DO not remove this state!!
  const [datasets, setDatasets] = useState([]);
  const [selectedDatasetId, setSelectedDatasetId] = useState(null);
  const [toastObject, setToastObject] = useState({
    message: "",
    severity: "",
    open: false,
  });
  const [loading, setLoading] = useState(false);
  const alreadySaved = true;

  useEffect(() => {
    setSavedTemplateS3Location(localStorage.getItem("savedTemplateS3Location"));
    // console.log(savedTemplateS3Location);
  }, [savedTemplateS3Location]);

  window.onbeforeunload = (event) => {
    const e = event || window.event;
    // Cancel the event
    e.preventDefault();
    if (e) {
      e.returnValue = ""; // Legacy method for cross browser support
    }
    return ""; // Legacy method for cross browser support
  };

  const onDesignLoad = (data) => {
    // console.log("onDesignLoad", data);
  };

  const getSavedTemplateJSON = async () => {
    const bucketName = String(savedTemplateS3Location.slice(5, 29));
    const S3Key = String(savedTemplateS3Location.slice(30, 69));
    // console.log(bucketName, S3Key + "/index.json");
    await axios
      .post(`${process.env.REACT_APP_API_URL}/s3/read`, {
        bucket: bucketName,
        key: S3Key + "/index.json",
      })
      .then((data) => {
        const templateJson = JSON.parse(data.data.data);
        // console.log(templateJson);
        emailEditorRef.current.editor.addEventListener(
          "design:loaded",
          onDesignLoad
        );
        emailEditorRef.current.editor.loadDesign(templateJson);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onLoad = () => {
    // console.log("onLoad");
    if (savedTemplateS3Location) {
      getSavedTemplateJSON();
    }
  };

  const exportHtml = () => {
    emailEditorRef.current.editor.exportHtml((data) => {
      const { html } = data;
      setHTML(html);
      // console.log("exportHtml", html);
      // alert("Output HTML has been logged in your developer console.");
    });
    setOpenDialog(true);
  };

  const saveDesign = (value) => {
    emailEditorRef.current.editor.saveDesign((design) => {
      setUnalyerJson(design);
      if (value) {
        const fileData = JSON.stringify(design);
        const blob = new Blob([fileData], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.download = "index.json";
        link.href = url;
        link.click();
      }
      // console.log(unlayerJson);
      // console.log("saveDesign", design);
      // alert("Design JSON has been logged in your developer console.);
    });
  };

  const onReady = () => {
    // console.log("onReady");
  };

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
  }, []);

  useEffect(() => {
    // console.log(selectedDatasetId);
    if (selectedDatasetId) {
      setLoading(true);
      fetch(
        `${process.env.REACT_APP_API_URL}/dataset/mergeTags/${selectedDatasetId}`,
        {
          method: "GET",
          credentials: "include",
        }
      )
        .then((res) => res.json())
        .then((res) => {
          setLoading(false);
          if (res.success) {
            emailEditorRef.current.editor.setMergeTags(res.data);
            setToastObject((prevState) => ({
              ...prevState,
              message: "Merge tags activated successfully",
              severity: "success",
              open: true,
            }));
          } else {
            setToastObject((prevState) => ({
              ...prevState,
              message: "Error in activating merge tags",
              severity: "error",
              open: true,
            }));
          }
          // console.log(res.data);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
          setToastObject((prevState) => ({
            ...prevState,
            message: "Error in activating merge tags",
            severity: "success",
            open: true,
          }));
        });
    }
  }, [selectedDatasetId]);

  return (
    <>
      <Box display="flex" flexDirection="column" sx={{ height: "100%" }}>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          sx={{
            px: 2,
            height: "60px",
            background: "linear-gradient(120deg, #0cf9e5, #5a84eb)",
            fontFamily: "Maven Pro",
            color: "white",
          }}
        >
          <Typography variant="h6">ConvertML Email Editor</Typography>
          <Box display="flex" justifyContent="center" alignItems="center">
            <FormControl sx={{ mr: 1, width: 200 }} size="small">
              <InputLabel id="demo-select-small" sx={{ color: "white" }}>
                Select dataset
              </InputLabel>
              <Select
                sx={{
                  color: "#fff",
                  "& .MuiSvgIcon-root": {
                    color: "white",
                  },
                }}
                labelId="demo-select-small"
                id="demo-select-small"
                defaultValue=""
                label="Select dataset"
                onChange={(e) => {
                  setSelectedDatasetId(e.target.value._id);
                }}
              >
                {datasets.map((value) => (
                  <MenuItem value={value} key={value._id}>
                    {value.title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button
              variant="outlined"
              onClick={() => {
                saveDesign(true);
              }}
              style={{
                color: "white",
                border: "1px solid white",
                textTransform: "none",
                marginRight: "9px",
              }}
            >
              Download JSON
            </Button>
            <Button
              variant="outlined"
              onClick={() => {
                exportHtml();
                saveDesign(false);
              }}
              style={{
                color: "white",
                border: "1px solid white",
                textTransform: "none",
              }}
            >
              Save Template
            </Button>
          </Box>
        </Box>
        {loading ? <LinearProgress /> : ""}
        <EmailEditor
          ref={emailEditorRef}
          minHeight={"91vh"}
          onReady={onReady}
          onLoad={onLoad}
          options={{
            editor: {
              mergeTags: {
                first_name: {
                  name: "First Name",
                  value: "{{first_name}}",
                  sample: "John",
                },
                last_name: {
                  name: "Last Name",
                  value: "{{last_name}}",
                  sample: "Doe",
                },
              },
            },
          }}
        />
      </Box>
      <SaveTemplate
        open={openDialog}
        alreadySaved={alreadySaved}
        setOpenDialog={setOpenDialog}
        HTML={HTML}
        unlayerJson={unlayerJson}
      />
      <ToastMessage toastObject={toastObject} setToastObject={setToastObject} />
    </>
  );
};

export default SavedTemplateEmailEditor;
