import {
  Avatar,
  Button,
  Dialog,
  Grid,
  Slide,
  TextField,
  Tooltip,
  tooltipClasses,
  Typography,
} from "@mui/material";
import React, { forwardRef, useState } from "react";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import SaveIcon from "@mui/icons-material/Save";
import { Box } from "@mui/system";
import styled from "@emotion/styled";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const DialogWrapper = styled(Dialog)(
  () => `
      .MuiDialog-paper {
        overflow: visible;
      }
`
);
const AvatarSuccess = styled(Avatar)(
  ({ theme }) => `
      width: ${theme.spacing(12)};
      height: ${theme.spacing(12)};
      .MuiSvgIcon-root {
        font-size: ${theme.typography.pxToRem(45)};
      }
`
);
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
const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

function ModelStatus() {
  const { t } = useTranslation();
  let navigate = useNavigate();
  const [datasetName, setDatasetName] = useState("");
  const [openConfirmDelete, setOpenConfirmDelete] = useState(false);
  const [error, setError] = useState(false);

  const handleConfirmDelete = () => {
    setOpenConfirmDelete(true);
  };

  const closeConfirmDelete = () => {
    setOpenConfirmDelete(false);
    setError(false);
  };

  const handleSaveDataSet = () => {
    if (datasetName === "") {
      setError(true);
    } else {
      setOpenConfirmDelete(false);
      setDatasetName("");
    }
  };

  return (
    <>
      <Grid
        container
        direction={{ xs: "column", sm: "row" }}
        sx={{ p: 2 }}
        spacing={2}
      >
        <Grid item sm={12} md={8.5}>
          <Typography variant="h6" gutterBottom sx={{ fontSize: "13px" }}>
            Model Status
          </Typography>
          <Box display="flex" flexDirection="row">
            <Typography
              variant="h1"
              gutterBottom
              sx={{ fontSize: "50px", fontWeight: "bold" }}
            >
              97.9
            </Typography>
            <Typography variant="h3" gutterBottom sx={{ fontSize: "23px" }}>
              %
            </Typography>
            {/* <TooltipWrapper title={t("Some Info")} arrow placement="top">
              <InfoOutlinedIcon fontSize="small" sx={{ ml: 0.5 }} />
            </TooltipWrapper> */}
          </Box>
          <Typography
            variant="h4"
            gutterBottom
            sx={{ fontSize: "18px", lineHeight: "inherit" }}
          >
            The model predicts the correct results with 97.9% of the time with
            Logistic Regression.
          </Typography>
        </Grid>
        <Grid
          item
          display="flex"
          sx={{ flexDirection: "column" }}
          alignItems={{ sm: "flex-start", md: "flex-end" }}
          justifyContent={{ sm: "flex-start", md: "flex-end" }}
          sm={12}
          md={3.5}
        >
          <Button
            variant="contained"
            sx={{
              width: "15rem",
              mb: 0.8,
              borderRadius: "4px",
              py: 0.5,
              px: 2,
            }}
            onClick={() => {
              handleConfirmDelete();
            }}
          >
            Save Results
          </Button>
          <Button
            variant="outlined"
            sx={{
              width: "15rem",
              mb: 0.4,
              borderRadius: "4px",
              py: 0.5,
              px: 2,
            }}
            onClick={() => {
              navigate("/dashboard/channels/email");
            }}
          >
            Take Action
          </Button>

          <DialogWrapper
            open={openConfirmDelete}
            maxWidth="sm"
            fullWidth
            TransitionComponent={Transition}
            keepMounted
            onClose={closeConfirmDelete}
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
                  setDatasetName(e.target.value);
                  setError(false);
                }}
                variant="outlined"
                autoComplete="off"
                value={datasetName}
                error={error}
                helperText={error ? "Dataset name is required!" : " "}
                sx={{ width: "100%" }}
              />
              <Box>
                <Button
                  variant="text"
                  size="large"
                  sx={{
                    mx: 1,
                  }}
                  onClick={closeConfirmDelete}
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
          </DialogWrapper>
        </Grid>
      </Grid>
    </>
  );
}

export default ModelStatus;
