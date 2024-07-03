import { useTranslation } from "react-i18next";
import { styled } from "@mui/material/styles";
import {
  Avatar,
  Divider,
  Box,
  ListItem,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import { useDropzone } from "react-dropzone";
import { useSnackbar } from "notistack";
import AddTwoToneIcon from "@mui/icons-material/AddTwoTone";
import CloudUploadTwoToneIcon from "@mui/icons-material/CloudUploadTwoTone";
import CloseTwoToneIcon from "@mui/icons-material/CloseTwoTone";
import CheckTwoToneIcon from "@mui/icons-material/CheckTwoTone";

const BoxUploadWrapper = styled(Box)(
  ({ theme }) => `
    border-radius: ${theme.general.borderRadius};
    padding: ${theme.spacing(3)};
    background: ${theme.colors.alpha.black[5]};
    border: 1px dashed ${theme.colors.alpha.black[30]};
    outline: none;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    transition: ${theme.transitions.create(["border", "background"])};

    &:hover {
      background: ${theme.colors.alpha.white[100]};
      border-color: ${theme.colors.primary.main};
    }
`
);
const AvatarWrapper = styled(Avatar)(
  ({ theme }) => `
    background: ${theme.colors.primary.lighter};
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
function DataUpload() {
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const theme = useTheme();
  const {
    acceptedFiles,
    isDragActive,
    isDragAccept,
    isDragReject,
    getRootProps,
    getInputProps,
  } = useDropzone({
    accept: "image/jpeg, image/png",
  });

  const files = acceptedFiles.map((file, index) => (
    <ListItem disableGutters component="div" key={index}>
      <ListItemText primary={file.name} />
      <b>{file.size} bytes</b>
      <Divider />
    </ListItem>
  ));
  return (
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
            {t("Drop the files to start uploading")}
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
            {t("You cannot upload these file types")}
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
            {t("Drag & drop files here")}
          </Typography>
        </>
      )}
    </BoxUploadWrapper>
  );
}

export default DataUpload;
