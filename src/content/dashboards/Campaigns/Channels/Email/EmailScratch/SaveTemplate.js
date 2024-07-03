import React, { useEffect, useRef, useState } from "react";
import SaveIcon from "@mui/icons-material/Save";
import {
  Box,
  Button,
  Dialog,
  Typography,
  TextField,
  Fab,
  CircularProgress,
} from "@mui/material";
import { green } from "@mui/material/colors";
import { useTranslation } from "react-i18next";
import axios from "axios";
import CancelIcon from "@mui/icons-material/Cancel";
import DoneIcon from "@mui/icons-material/Done";
import { uploadFile } from "../../../../../../utils/emailTemplate.js";
import { convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";

const SaveTemplate = ({ open, setOpenDialog, editorState }) => {
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [fault, setFault] = useState(false);
  const timer = useRef();
  const [bucketAndKey, setBucketAndKey] = useState({
    bucketName: "",
    fileKey: "",
  });

  useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

  const createHtmlFileObject = () => {
    let head = `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>HTML</title>
      </head>
      <body>`;
    let end = `</body></html>`;
    let fileData = draftToHtml(convertToRaw(editorState.getCurrentContent()));
    fileData = head + fileData + end;
    console.log(fileData);
    var myBlob = new Blob([fileData], { type: "text/plain" });
    console.log(myBlob);
    const file = new File([myBlob], "index.html", { type: "text/plain" });
    console.log(file);
    let bucketName = bucketAndKey.bucketName;
    let fileKey = bucketAndKey.fileKey;
    uploadFile({ file, bucketName, fileKey });
  };

  const handleTempalteName = async () => {
    if (name === "") {
      setError(true);
      setErrorMsg("Template name is required");
    } else {
      setLoading(true);
      console.log(name);
      await axios
        .post(
          `${process.env.REACT_APP_API_URL}/userEmailTemplates/create`,
          {
            title: name,
            unlayer: false,
          },
          {
            headers: {
              "Content-type": "application/json",
            },
            withCredentials: true,
          }
        )
        .then((response) => {
          setSuccess(true);
          setLoading(false);
          console.log(response);
          bucketAndKey.bucketName = response.data.data.bucketName;
          bucketAndKey.fileKey = response.data.data.fileKey + "/index.html";
          createHtmlFileObject();
          timer.current = window.setTimeout(() => {
            setOpenDialog(false);
            setSuccess(false);
            setName("");
          }, 3000);
        })
        .catch((error) => {
          if (error.response.status == 400) {
            setError(true);
            setErrorMsg(error.response.data.message);
            setLoading(false);
            setFault(true);
          } else {
            timer.current = window.setTimeout(() => {
              setLoading(false);
              setFault(true);
            }, 5000);
          }
        });
    }
  };

  const { t } = useTranslation();

  const buttonSx = {
    ...(success && {
      bgcolor: green[500],
      "&:hover": {
        bgcolor: green[700],
      },
    }),
  };
  return (
    <>
      <Dialog
        open={open}
        maxWidth="sm"
        fullWidth
        keepMounted
        onClose={() => {
          setOpenDialog(false);
          setError(false);
        }}
      >
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          flexDirection="column"
          p={5}
        >
          <Box sx={{ m: 1, position: "relative" }}>
            <Fab aria-label="save" sx={buttonSx}>
              {success ? (
                <DoneIcon style={{ fontSize: "30px", color: "white" }} />
              ) : fault ? (
                <CancelIcon style={{ color: "red", fontSize: "80px" }} />
              ) : (
                <SaveIcon />
              )}
            </Fab>
            {loading && (
              <CircularProgress
                size={68}
                sx={{
                  color: "#d9d9d9",
                  position: "absolute",
                  top: -6,
                  left: -6,
                  zIndex: 1,
                }}
              />
            )}
          </Box>

          <Typography
            align="center"
            sx={{
              pt: 2,
              px: 6,
              pb: 2,
            }}
            variant="h3"
          >
            {t("Do you want to save this email template")}?
          </Typography>
          <TextField
            id="outlined-basic"
            label="Name of Template"
            onChange={(e) => {
              setName(e.target.value);
              setError(false);
              setFault(false);
            }}
            autoComplete="off"
            variant="outlined"
            value={name}
            error={error}
            helperText={error ? errorMsg : " "}
            sx={{ width: "100%" }}
          />
          <Box>
            <Button
              variant="text"
              size="large"
              sx={{
                mx: 1,
              }}
              onClick={() => {
                setOpenDialog(false);
                setError(false);
                setName("");
                setFault(false);
              }}
            >
              {t("Cancel")}
            </Button>
            <Button
              onClick={handleTempalteName}
              size="large"
              sx={{
                mx: 1,
                px: 3,
              }}
              variant="contained"
            >
              {t("Save")}
            </Button>
          </Box>
        </Box>
      </Dialog>
    </>
  );
};

export default SaveTemplate;
