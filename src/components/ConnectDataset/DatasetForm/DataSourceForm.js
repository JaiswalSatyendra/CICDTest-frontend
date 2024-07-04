import { useState, useMemo, useRef, useContext } from "react";
import {
  Alert,
  Avatar,
  Button,
  IconButton,
  TextField,
  Typography,
  FormControlLabel,
  Box,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  Grid,
  Dialog,
  DialogContent,
  useTheme,
} from "@mui/material";
import { DateTimePicker } from "@mui/lab";
import { CloudUploadOutlined } from "@mui/icons-material";
import CloudUploadTwoToneIcon from "@mui/icons-material/CloudUploadTwoTone";
import { styled } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";
import countryList from "react-select-country-list";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import DataSources from "../DataSources";
import CSV from "../DataSources/CSV";
import S3 from "../DataSources/S3";
import DataTypes from "../DataTypes";
import { ConnectDataSource } from "../../../utils/ConnectDataSource";
import { SessionContext } from "../../../contexts/SessionContext";
import ProgressSection from "./ProgressSection";
import axios from "axios";

const Input = styled("input")({
  display: "none",
});

const AvatarWrapper = styled(Box)(
  ({ theme }) => `

    position: relative;

    .MuiAvatar-root {
      width: ${theme.spacing(16)};
      height: ${theme.spacing(16)};
    }
`
);
const ButtonUploadWrapper = styled(Box)(
  ({ theme }) => `
    position: absolute;
    width: ${theme.spacing(6)};
    height: ${theme.spacing(6)};
    bottom: -${theme.spacing(2)};
    right: -${theme.spacing(2)};

    .MuiIconButton-root {
      border-radius: 100%;
      background: ${theme.colors.primary.main};
      color: ${theme.palette.primary.contrastText};
      box-shadow: ${theme.colors.shadows.primary};
      width: ${theme.spacing(6)};
      height: ${theme.spacing(6)};
      padding: 0;
  
      &:hover {
        background: ${theme.colors.primary.dark};
      }
    }
`
);

function DataSourceForm() {
  const { t } = useTranslation();
  const theme = useTheme();
  const formStartRef = useRef();
  const [title, setTitle] = useState("");
  const [formattedTitle, setFormattedTitle] = useState("");
  const [datasetImage, setDatasetImage] = useState({
    preview: null,
    data: null,
  });
  const [description, setDescription] = useState("");
  const [dataClassification, setDataClassification] = useState("public");
  const [dataTerritory, setDataTerritory] = useState([]);
  const [dataFrequency, setDataFrequency] = useState({
    type: "one-time",
    param: {
      frequency: "",
      startTime: "",
    },
  });
  const [dataFormat, setDataFormat] = useState("");
  const [dataSize, setDataSize] = useState("");
  const [tags, setTags] = useState([]);
  const [dataSource, setDataSource] = useState("");
  const [dataType, setDataType] = useState("");

  const [inputErrors, setInputErrors] = useState([]);
  const [dataSourceOpen, setDataSourceOpen] = useState(false);

  const [dataConnectorDetails, setDataConnectorDetails] = useState({
    type: "",
    data: {},
    status: false,
  });

  // for local files uploading
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const [progress, setProgress] = useState(0);

  const [session, ,] = useContext(SessionContext);
  const { user } = session;

  const countryOptions = useMemo(() => countryList().getData(), []);
  const dataFormatOptions = useMemo(() => [
    { value: "json", label: "JSON" },
    { value: "csv", label: "CSV" },
    { value: "xml", label: "XML" },
    { value: "xlsx", label: "XLSX" },
    { value: "zip", label: "ZIP" },
  ]);

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

  const handleCreateDataSourceClose = () => {
    setDataSourceOpen(false);
  };

  const handleDataSourceConnect = () => {
    if (dataSource !== "") {
      setDataSourceOpen(true);
    }
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

    // validation start
    setInputErrors([]);
    let error = false;

    if (!formattedTitle) {
      setInputErrors((errors) => [...errors, "Title field is required"]);
      error = true;
    }

    const titleExists = await checkDatasetTitle(formattedTitle);
    console.log(titleExists);
    if (titleExists) {
      setInputErrors((errors) => [
        ...errors,
        "Title already exists. Try another one",
      ]);
      error = true;
    }

    if (!description) {
      setInputErrors((errors) => [...errors, "Description field is required"]);
      error = true;
    }
    if (!dataClassification) {
      setInputErrors((errors) => [
        ...errors,
        "Data Classification field is required",
      ]);
      error = true;
    }
    if (dataTerritory.length === 0) {
      setInputErrors((errors) => [
        ...errors,
        "Data Territory field is required",
      ]);
      error = true;
    }
    if (dataFrequency.type === "incremental") {
      if (!dataFrequency.param.frequency) {
        setInputErrors((errors) => [
          ...errors,
          "Incremental Frequency field is required",
        ]);
        error = true;
      }
      if (!dataFrequency.param.startTime) {
        setInputErrors((errors) => [
          ...errors,
          "Incremental Start Date field is required",
        ]);
        error = true;
      }
    }
    if (!dataFormat) {
      setInputErrors((errors) => [...errors, "Data Format field is required"]);
      error = true;
    }
    if (!dataType) {
      setInputErrors((errors) => [...errors, "Data Type field is required"]);
      error = true;
    }
    if (!dataSource) {
      setInputErrors((errors) => [...errors, "Data Source is not selected"]);
      error = true;
    }
    if (dataSource && !dataConnectorDetails.status) {
      setInputErrors((errors) => [
        ...errors,
        "Selected data Source is not connected",
      ]);
      error = true;
    }

    // validation end

    if (error === true) {
      formStartRef.current.scrollIntoView({ behavior: "smooth" });
      return;
    } else {
      const data = {
        user: user._id,
        title: formattedTitle,
        description,
        dataClassification,
        dataTerritory: dataTerritory.map((item) => item.label),
        dataFrequency: JSON.stringify(dataFrequency),
        dataFormat: dataFormat.value,
        dataType,
        dataSource,
        tags: tags.map((item) => item.value),
        dataSize,
        dataConnectorDetails,
        updateUploading,
        updateUploaded,
        updateProgress,
        updateFiles,
      };
      const response = await ConnectDataSource(data);
    }
  };
  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

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
  return (
    <>
      <Box component="form" noValidate autoComplete="off" ref={formStartRef}>
        <Box>
          {/* loop through errors and show alert */}
          {inputErrors.map((error, index) => (
            <Alert
              key={index}
              severity="error"
              sx={{
                m: 1,
              }}
            >
              {error}
            </Alert>
          ))}
        </Box>
        <FormControl
          sx={{
            width: 1,
            my: 2,
          }}
        >
          <FormLabel
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <img alt='convertml' 
              src="/images/icons/title.png"
              sx={{
                width: 25,
                height: 25,
              }}
            />
            <Typography sx={{ ml: 1, fontWeight: "bold", color: "black" }}>
              Title*
            </Typography>
          </FormLabel>
          <Grid container>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                margin="normal"
                name="title"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                  // change text to small case, remove special characters and replace spaces with underscores
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
            </Grid>
            <Grid item xs={12} md={6} sx={{ mt: -3 }}>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                flexDirection="column"
                mt={3}
              >
                <AvatarWrapper>
                  <Avatar
                    variant="rounded"
                    alt={user.username}
                    src={
                      datasetImage.preview == null
                        ? "/images/default-dataset-image.jpeg"
                        : datasetImage.preview
                    }
                  />
                  <ButtonUploadWrapper>
                    <Input
                      accept="image/*"
                      id="dataset-image"
                      name="dataset-image"
                      type="file"
                      onChange={async (e) => {
                        const base64 = await toBase64(e.target.files[0]);
                        setDatasetImage({
                          preview: URL.createObjectURL(e.target.files[0]),
                          data: base64,
                        });
                      }}
                    />
                    <label htmlFor="dataset-image">
                      <IconButton component="span" color="primary">
                        <CloudUploadTwoToneIcon />
                      </IconButton>
                    </label>
                  </ButtonUploadWrapper>
                </AvatarWrapper>
              </Box>
            </Grid>
          </Grid>
        </FormControl>
        <FormControl
          sx={{
            width: 1,
            my: 2,
          }}
        >
          <FormLabel
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <img alt='convertml' 
              src="/images/icons/long_desc.png"
              sx={{
                width: 25,
                height: 25,
              }}
            />
            <Typography sx={{ ml: 1, fontWeight: "bold", color: "black" }}>
              Description*
            </Typography>
          </FormLabel>

          <ReactQuill
            theme="snow"
            value={description}
            onChange={setDescription}
          />
        </FormControl>
        <FormControl sx={{ width: 1, my: 2 }}>
          <FormLabel
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <img alt='convertml' 
              src="/images/icons/data_class.png"
              sx={{
                width: 25,
                height: 25,
              }}
            />
            <Typography sx={{ ml: 1, fontWeight: "bold", color: "black" }}>
              Data Classification*
            </Typography>
          </FormLabel>
          <RadioGroup
            row
            name="dataClassification"
            value={dataClassification}
            onChange={(e) => setDataClassification(e.target.value)}
            sx={{
              p: 1,
              my: 1,
            }}
          >
            <FormControlLabel
              value="sensitive"
              control={<Radio />}
              label="Sensitive"
            />
            <FormControlLabel
              value="confidential"
              control={<Radio />}
              label="Confidential"
            />
            <FormControlLabel
              value="public"
              control={<Radio />}
              label="Public"
            />
          </RadioGroup>
        </FormControl>
        <FormControl sx={{ width: 1, my: 2 }}>
          <FormLabel
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          > 
            <img alt='convertml' 
              src="/images/icons/data_territory.png"
              sx={{
                width: 25,
                height: 25,
              }}
            />
            <Typography sx={{ ml: 1, fontWeight: "bold", color: "black" }}>
              Data Territory*
            </Typography>
          </FormLabel>
          <Select
            closeMenuOnSelect={true}
            isMulti
            options={countryOptions}
            value={dataTerritory}
            onChange={(value) => {
              setDataTerritory(value);
            }}
          />
        </FormControl>
        <FormControl sx={{ width: 1, my: 2 }}>
          <FormLabel
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <img alt='convertml' 
              src="/images/icons/data_freq.png"
              sx={{
                width: 25,
                height: 25,
              }}
            />
            <Typography sx={{ ml: 1, fontWeight: "bold", color: "black" }}>
              Data Frequency*
            </Typography>
          </FormLabel>
          <RadioGroup
            row
            name="dataFrequency"
            value={dataFrequency.type}
            onChange={(e) => {
              setDataFrequency({
                type: e.target.value,
                param: {},
              });
            }}
            sx={{
              p: 1,
              my: 1,
            }}
          >
            <FormControlLabel
              value="one-time"
              control={<Radio />}
              label="One Time"
            />
            <FormControlLabel
              value="incremental"
              control={<Radio />}
              label="Incremental"
            />
          </RadioGroup>

          {dataFrequency.type === "incremental" && (
            <Grid container spacing={2}>
              <Grid item xs={12} md={6} mt={1}>
                <Select
                  placeholder="Select Frequency"
                  closeMenuOnSelect={true}
                  options={[
                    { value: "daily", label: "Daily" },
                    { value: "weekly", label: "Weekly" },
                    { value: "monthly", label: "Monthly" },
                  ]}
                  value={dataFrequency.param.frequency}
                  onChange={(value) => {
                    setDataFrequency({
                      ...dataFrequency,
                      param: {
                        ...dataFrequency.param,
                        frequency: value.value,
                      },
                    });
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <DateTimePicker
                  label="Date&Time picker"
                  value={dataFrequency.param.startTime}
                  onChange={(value) => {
                    setDataFrequency({
                      ...dataFrequency,
                      param: {
                        ...dataFrequency.param,
                        startTime: value,
                      },
                    });
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </Grid>
            </Grid>
          )}
        </FormControl>
        <FormControl sx={{ width: 1, my: 2 }}>
          <FormLabel
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <img alt='convertml' 
              src="/images/icons/data_format.png"
              sx={{
                width: 25,
                height: 25,
              }}
            />
            <Typography sx={{ ml: 1, fontWeight: "bold", color: "black" }}>
              Data Format*
            </Typography>
          </FormLabel>
          <Select
            closeMenuOnSelect={true}
            options={dataFormatOptions}
            value={dataFormat}
            onChange={(value) => {
              setDataFormat(value);
            }}
          />
        </FormControl>
        <FormControl sx={{ width: 1, my: 2 }}>
          <FormLabel
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <img alt='convertml' 
              src="/images/icons/data_size.png"
              sx={{
                width: 25,
                height: 25,
              }}
            />
            <Typography sx={{ ml: 1, fontWeight: "bold", color: "black" }}>
              Data Size
            </Typography>
          </FormLabel>
          <RadioGroup
            row
            name="dataSize"
            value={dataSize}
            onChange={(e) => setDataSize(e.target.value)}
            sx={{
              p: 1,
              my: 1,
            }}
          >
            <FormControlLabel
              value="0<=5GB"
              control={<Radio />}
              label="0<=5GB"
            />
            <FormControlLabel
              value="5GB-5TB"
              control={<Radio />}
              label="5GB-5TB"
            />
            <FormControlLabel value=">5TB" control={<Radio />} label=">5TB" />
          </RadioGroup>
        </FormControl>
        <FormControl sx={{ width: 1, my: 2 }}>
          <FormLabel
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <img alt='convertml' 
              src="/images/icons/smart_tag.png"
              sx={{
                width: 25,
                height: 25,
              }}
            />
            <Typography sx={{ ml: 1, fontWeight: "bold", color: "black" }}>
              Tags
            </Typography>
          </FormLabel>
          <CreatableSelect
            closeMenuOnSelect={true}
            isMulti
            options={tags}
            value={tags}
            onChange={(value) => {
              setTags(value);
            }}
            components={{
              Menu: () => null,
              MenuList: () => null,
              DropdownIndicator: () => null,
              IndicatorSeparator: () => null,
            }}
          />
        </FormControl>
        <FormControl sx={{ width: 1, my: 2 }}>
          <FormLabel
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <img alt='convertml' 
              src="/images/icons/dataset.png"
              sx={{
                width: 25,
                height: 25,
              }}
            />
            <Typography sx={{ ml: 1, fontWeight: "bold", color: "black" }}>
              Select Data Type*
            </Typography>
          </FormLabel>
          <Box
            sx={{
              p: 1,
              my: 1,
            }}
          >
            <DataTypes handleDataType={handleDataType} />
          </Box>
        </FormControl>

        <FormControl sx={{ width: 1, my: 2 }}>
          <FormLabel
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <img alt='convertml' 
              src="/images/icons/dataset.png"
              sx={{
                width: 25,
                height: 25,
              }}
            />
            <Typography sx={{ ml: 1, fontWeight: "bold", color: "black" }}>
              Select Data Source*
            </Typography>
          </FormLabel>
          <Box
            sx={{
              p: 1,
              my: 1,
            }}
          >
            <DataSources handleDataSource={handleDataSource} />
            <Button
              sx={{
                mt: 3,
              }}
              color="primary"
              size="medium"
              variant="contained"
              onClick={handleDataSourceConnect}
              startIcon={<CloudUploadOutlined />}
              disabled={dataSource === "" ? true : false}
            >
              {t("Connect Dataset")}
            </Button>
          </Box>
        </FormControl>

        {files && (
          <Box>
            <ProgressSection
              files={files}
              uploaded={uploaded}
              uploading={uploading}
              progress={progress}
            />
          </Box>
        )}

        <Button
          sx={{
            mt: 3,
            background:
              "linear-gradient(92deg, rgb(188, 122, 255) 0%, rgb(105, 0, 213) 100%)",
          }}
          color="primary"
          fullWidth
          size="large"
          variant="contained"
          onClick={handleSubmit}
        >
          {t("Create data source12")}
        </Button>
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
    </>
  );
}

export default DataSourceForm;
