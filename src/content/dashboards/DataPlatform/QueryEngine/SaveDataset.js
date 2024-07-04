import React, { useState } from "react";
import SaveIcon from "@mui/icons-material/Save";
import {
  Box,
  Button,
  Dialog,
  Avatar,
  Typography,
  TextField,
} from "@mui/material";
import styled from "@emotion/styled";
import { useTranslation } from "react-i18next";

const SaveDataset = ({ open, handleOpenDialog, handleDataSetName }) => {
  const [error, setError] = useState(false);
  const [name, setName] = useState("");
  const handleSaveDataSet = () => {
    if (name === "") {
      setError(true);
    } else {
      handleDataSetName(name);
      handleOpenDialog(false);
      setName("");
    }
  };

  const { t } = useTranslation();

  const AvatarSuccess = styled(Avatar)(
    ({ theme }) => `
        width: ${theme.spacing(12)};
        height: ${theme.spacing(12)};
        .MuiSvgIcon-root {
          font-size: ${theme.typography.pxToRem(45)};
        }
  `
  );
  return (
    <>
      <Dialog
        open={open}
        maxWidth="sm"
        fullWidth
        keepMounted
        onClose={() => {
          handleOpenDialog(false);
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
          <AvatarSuccess>
            <SaveIcon />
          </AvatarSuccess>

          <Typography
            align="center"
            sx={{
              pt: 4,
              px: 6,
              pb: 4,
            }}
            variant="h3"
          >
            {t("Do you want to save this result as dataset")}?
          </Typography>
          <TextField
            id="outlined-basic"
            label="Name of Dataset"
            onChange={(e) => {
              setName(e.target.value);
              setError(false);
            }}
            autoComplete="off"
            variant="outlined"
            value={name}
            error={error}
            helperText={error ? "Dataset name is reqired!" : " "}
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
                handleOpenDialog(false);
                setError(false);
              }}
            >
              {t("Cancel")}
            </Button>
            <Button
              onClick={handleSaveDataSet}
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

export default SaveDataset;
