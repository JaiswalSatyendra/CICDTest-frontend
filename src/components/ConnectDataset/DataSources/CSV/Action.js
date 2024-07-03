import { useState, useCallback, useContext } from "react";

import {
  ListItemText,
  Avatar,
  Box,
  Typography,
  Divider,
  ListItem,
  List,
  CardHeader,
  Alert,
  Card,
  styled,
  useTheme,
  LinearProgress,
} from "@mui/material";
import { useDropzone } from "react-dropzone";

import CloudUploadTwoToneIcon from "@mui/icons-material/CloudUploadTwoTone";
import CloseTwoToneIcon from "@mui/icons-material/CloseTwoTone";
import CheckTwoToneIcon from "@mui/icons-material/CheckTwoTone";

const BoxUploadWrapper = styled(Box)(
  ({ theme }) => `
    border-radius: ${theme.general.borderRadius};
    padding: ${theme.spacing(2)};
    background: ${theme.colors.alpha.black[5]};
    border: 1px dashed ${theme.colors.alpha.black[30]};
    outline: none;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    transition: ${theme.transitions.create(["border", "background"])};
    height: 300px;

    &:hover {
      background: ${theme.colors.alpha.white[50]};
      border-color: ${theme.colors.primary.main};
    }
`
);

const AvatarWrapper = styled(Avatar)(
  ({ theme }) => `
    background: transparent;
    color: ${theme.colors.primary.main};
    width: ${theme.spacing(7)};
    height: ${theme.spacing(7)};
`
);

const AvatarSuccess = styled(Avatar)(
  ({ theme }) => `
    background: ${theme.colors.success.light};
    width: ${theme.spacing(7)};
    height: ${theme.spacing(7)};
`
);

const AvatarDanger = styled(Avatar)(
  ({ theme }) => `
    background: ${theme.colors.error.light};
    width: ${theme.spacing(7)};
    height: ${theme.spacing(7)};
`
);

function LinearProgressWithLabel(props) {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ width: "100%", mr: 3, ml: 4 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          props.value
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

function Action({ loadingResponse, updateConnectorDetails, updateFiles }) {
  const theme = useTheme();

  const onDrop = useCallback(async (acceptedFiles) => {
    updateFiles(acceptedFiles);
    updateConnectorDetails("upload", {
      file: acceptedFiles[0],
    });
    loadingResponse({
      data: {
        success: true,
      },
    });
  }, []);

  const {
    acceptedFiles,
    isDragActive,
    isDragAccept,
    isDragReject,
    getRootProps,
    getInputProps,
  } = useDropzone({
    onDrop,
    multiple: false,
    accept:
      "text/csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel, text/plain",
    maxSize: 5 * 1073741824,
  });

  const files = acceptedFiles.map((file, index) => (
    <ListItem disableGutters component="div" key={index}>
      <ListItemText primary={file.name} />
      <b>{file.size} bytes</b>
      <Divider />
    </ListItem>
  ));

  return (
    <Box>
      <Card
        sx={{
          m: 1,
        }}
      >
        <CardHeader title={"Data Source > CSV File"} />
        <Divider />
        <Box p={2}>
          <BoxUploadWrapper {...getRootProps()}>
            <input {...getInputProps()} />
            {isDragAccept && (
              <>
                <AvatarSuccess variant="rounded">
                  <CheckTwoToneIcon />
                </AvatarSuccess>
                <Typography
                  sx={{
                    mt: 2,
                  }}
                >
                  {"Drop the files to start uploading"}
                </Typography>
              </>
            )}
            {isDragReject && (
              <>
                <AvatarDanger variant="rounded">
                  <CloseTwoToneIcon />
                </AvatarDanger>
                <Typography
                  sx={{
                    mt: 2,
                  }}
                >
                  {"You cannot upload these file types"}
                </Typography>
              </>
            )}
            {!isDragActive && (
              <>
                <AvatarWrapper variant="rounded">
                  <CloudUploadTwoToneIcon />
                </AvatarWrapper>
                <Typography
                  sx={{
                    mt: 2,
                  }}
                >
                  {"Drag & drop files here"}
                </Typography>
              </>
            )}
          </BoxUploadWrapper>
        </Box>
        {files.length > 0 && (
          <>
            <Divider />
            <Box p={2}>
              <Alert
                sx={{
                  py: 0,
                }}
                severity="success"
              >
                {"You have connected"} <b>{files.length}</b> {"files"}!
              </Alert>
              <List
                disablePadding
                sx={{
                  mt: 2,
                }}
                component="div"
              >
                {files}
              </List>
            </Box>
          </>
        )}
      </Card>
    </Box>
  );
}

export default Action;
