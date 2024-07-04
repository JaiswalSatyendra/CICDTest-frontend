import { CloudUploadOutlined } from "@mui/icons-material";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  FormControl,
  FormLabel,
  Grid,
  styled,
  TextField,
  Tooltip,
  tooltipClasses,
  Typography,
} from "@mui/material";
import DataSources from "../DataSources";
import DataTypes from "../DataTypes";
import { useTranslation } from "react-i18next";
import { useContext, useEffect, useState } from "react";
import CSV from "../DataSources/CSV";
import S3 from "../DataSources/S3";
import { SessionContext } from "../../../contexts/SessionContext";
import { ConnectDataSource } from "../../../utils/ConnectDataSource";
import ProgressSection from "./ProgressSection";
import { SnackbarProvider, useSnackbar } from "notistack";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { Link } from "react-router-dom";
import ProgressStatus from "../DataSources/S3/ProgressStatus";

function DataUpload() {
  const { t } = useTranslation();

  const [title, setTitle] = useState("");
  const [formattedTitle, setFormattedTitle] = useState("");
  const [dataType, setDataType] = useState("");
  const [dataSource, setDataSource] = useState("");
  const [dataSourceOpen, setDataSourceOpen] = useState(false);
  const [selectAll, setSelectAll] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

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
  const [dataConnectorDetails, setDataConnectorDetails] = useState({
    type: "",
    data: {},
    status: false,
  });
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const [progress, setProgress] = useState(0);

  const [session, ,] = useContext(SessionContext);
  const { user } = session;

  const handleCreateDataSourceClose = () => {
    setDataSourceOpen(false);
  };
  const handleDataSourceConnect = () => {
    console.log("nnnnnn");
    if (dataSource !== "") {
      setDataSourceOpen(true);
    }
  };
  const handleDataSource = (value) => {
    setDataSource(value);
    setDataConnectorDetails({
      type: "",
      data: {},
      status: false,
    });
    updateFiles([]);
  };

  const handleDataType = (value) => {
    setDataType(value);
  };

  const handleOpen = (value) => {
    setDialogOpen(value);
  };

  const updateConnectorDetails = (type, data) => {
    setDataConnectorDetails({
      type,
      data,
      status: true,
    });
  };

  const checkDatasetTitle = (title) => {
    return new Promise((resolve, reject) => {
      fetch(`${process.env.REACT_APP_API_URL}/dataset/checkTitle`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          title: title,
          user: user._id,
        }),
      })
        .then((res) => res.json())
        .then((res) => {
          resolve(res.success === false);
        })
        .catch((err) => {
          reject(true);
        });
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // validation star
    let error = false;

    if (!formattedTitle) {
      error = true;
      handleClickVariant("Title field is required", "error");
    }

    else if (formattedTitle) {
      if (formattedTitle.length > 100) {
        error = true;
        handleClickVariant("Title crossed maximum character size.", "error");
      }
      else {
        const titleExists = await checkDatasetTitle(formattedTitle);
        if (titleExists) {
          error = true;
          handleClickVariant("Title already exists. Try another one", "error");
        }
      }
    }

    else if (!dataType) {
      error = true;
      handleClickVariant("Data Type field is required", "error");
    }
    else if (!dataSource) {
      error = true;
      handleClickVariant("Data Source is not selected", "error");
    }
    else if (dataSource && !dataConnectorDetails.status && !selectAll) {
      error = true;
      handleClickVariant("Selected data Source is not connected", "error");
    }

    // validation end

    if (error === true) {
      return;
    } else {
      const data = {
        user: user._id,
        title: formattedTitle,
        dataType,
        dataSource,
        dataConnectorDetails,
        updateUploading,
        updateUploaded,
        updateProgress,
        updateFiles,
      };
      setDialogOpen(true);
      const response = await ConnectDataSource(data);
    }
  };

  const createFileObjectForStaticFile = () => {
    fetch(`/sampleData/customer_churn_data.csv`)
      .then((res) => res.blob())
      .then((blob) => {
        const file = new File([blob], "customer_churn_data.csv", {
          type: "text/csv",
        });
        setFiles([file]);
        updateConnectorDetails("upload", {
          file: file,
        });
      });
  };
  useEffect(() => {
    if (selectAll) {
      createFileObjectForStaticFile();
    } else {
      setDataType("");
      setDataSource("");
      setFiles([]);
    }
  }, [selectAll]);
  const handleSelectAll = () => {
    setSelectAll(!selectAll);
  };

  // for local files uploading
  const updateFiles = (files) => {
    setFiles(files);
  };

  const updateUploading = (uploading) => {
    setUploading(uploading);
  };

  const updateProgress = (progress) => {
    setProgress(progress);
  };

  const updateUploaded = (uploaded) => {
    setUploaded(uploaded);
  };
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

  return (
    <>
      <Box
        component="form"
        noValidate
        autoComplete="off"
        style={{ width: "100%", backgroundColor: "white", marginTop: "-36px" }}
      >
        <FormControl
          sx={{
            width: 1,
            my: 2,
            px: 4,
          }}
        >
          <FormLabel
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Typography
              variant="h5"
              sx={{ fontWeight: "bold", color: "black" }}
            >
              Title/Data Identifier
            </Typography>
          </FormLabel>
          <TextField
            fullWidth
            margin="normal"
            name="title"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              //   change text to small case, remove special characters and replace spaces with underscores
              setFormattedTitle(
                e.target.value
                  .toLowerCase()
                  .replace(/[^a-zA-Z0-9 ]/g, "")
                  .replace(/ /g, "_")
              );
            }}
            variant="outlined"
            helperText={"Saved as: " + formattedTitle}
          />
        </FormControl>
        <FormControl sx={{ width: 1, my: 2, px: 4 }}>
          {/* <Box sx={{ display: "flex" }}>
            <FormLabel
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <Typography
                variant="h5"
                sx={{ fontWeight: "bold", color: "black" }}
              >
                Select Data Type
              </Typography>
            </FormLabel>
            <Button
              variant="contained"
              sx={{ ml: 2, borderRadius: "5px" }}
              onClick={handleSelectAll}
            >
              Use Sample Data
            </Button>
            <TooltipWrapper
              title={t("Download Sample Data")}
              arrow
              placement="top"
            >
              <Link
                to="/sampleData/customer_churn_data.csv"
                download
                target="_blank" rel="noopener noreferrer"
                style={{
                  textDecoration: "none",
                }}
              >
                <Button variant="contained" sx={{ ml: 1, borderRadius: "5px" }}>
                  <FileDownloadIcon />
                </Button>
              </Link>
            </TooltipWrapper>
          </Box> */}
          <Box
            sx={{
              p: 1,
              my: 1,
            }}
          >
            <DataTypes handleDataType={handleDataType} selectAll={selectAll} />
          </Box>
        </FormControl>

        {/* Select Data Source*/}

        <FormControl sx={{ width: 1, my: 2, px: 4 }}>
          <FormLabel
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Typography sx={{ fontWeight: "bold", color: "black" }}>
              Data Source
            </Typography>
          </FormLabel>
          <Box

            sx={{
              p: 1,
              my: 1,
            }}
          >
            <DataSources
              handleDataSource={handleDataSource}
              selectAll={selectAll}
            />
            <Button
              sx={{
                mt: 3,
                px: 3,
                marginRight: 3,
                borderRadius: 0.5,
                float: "left"
              }}
              color="primary"
              size="medium"
              variant="contained"
              onClick={handleDataSourceConnect}
              startIcon={<CloudUploadOutlined />}
              disabled={dataSource === "" || selectAll ? true : false}
            >
              {t("Upload")}
            </Button>
            <Box
              component="div"
              sx={{
                px: 10,
                mt: 4,
                mx: 2


              }}
            > {dataConnectorDetails.status ? dataConnectorDetails.data.file.path : null}</Box>

          </Box>
        </FormControl>

        <Box
          style={{
            width: "100%",
            height: "100px",
            boxShadow:
              "0px 2px 8px -3px rgb(34 51 84 / 20%), 0px 5px 22px -4px rgb(34 51 84 / 10%)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button
            sx={{ py: 1, px: 2, borderRadius: 0.5 }}
            disabled={files.length==0 ? true : false}
            color="primary"
            size="large"
            variant="contained"
            type="submit"
            onClick={handleSubmit}
          >
            {t("Create data source")}
          </Button>
        </Box>
      </Box>
      <Dialog
        fullWidth
        maxWidth="lg"
        open={dataSourceOpen}
        onClose={handleCreateDataSourceClose}
      >
        <DialogContent>
          {dataSource == "upload" && (
            <CSV
              updateConnectorDetails={updateConnectorDetails}
              updateFiles={updateFiles}
            />
          )}
          {dataSource == "s3" && (
            <S3 updateConnectorDetails={updateConnectorDetails} />
          )}
        </DialogContent>
      </Dialog>

      {dataSource == "upload" && (
        <Dialog
          fullWidth
          maxWidth="lg"
          open={dialogOpen}
          onClose={() => {
            setDialogOpen(false);
          }}
        >
          <DialogContent>
            <Grid
              container
              direction={{ xs: "column", sm: "row" }}
              sx={{
                border: "1px solid #c3c3c3",
                minHeight: "10rem",
              }}
            >
              <ProgressSection
                files={files}
                uploaded={uploaded}
                uploading={uploading}
                progress={progress}
                handleOpen={handleOpen}
              />
            </Grid>
          </DialogContent>
        </Dialog>
      )}
      {dataSource == "s3" && (
        <ProgressStatus isopen={dialogOpen} handleOpen={handleOpen} />
      )}
    </>
  );
}

export default function IntegrationNotistack() {
  return (
    <SnackbarProvider maxSnack={3}>
      <DataUpload />
    </SnackbarProvider>
  );
}
