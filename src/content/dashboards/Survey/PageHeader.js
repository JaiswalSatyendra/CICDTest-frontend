import { useTranslation } from "react-i18next";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";
import "react-quill/dist/quill.snow.css";

import { Grid, Box, Typography, Avatar, Button } from "@mui/material";

import AddTwoToneIcon from "@mui/icons-material/AddTwoTone";

function PageHeader() {
  const { t } = useTranslation();
  return (
    <>
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item>
          <Typography variant="h3" component="h3" gutterBottom>
            {t("Survey")}
          </Typography>
          <Typography variant="subtitle2">
            {t("These are your active models")}
          </Typography>
        </Grid>
        <Grid item>
          <Button
            sx={{
              mt: { xs: 2, sm: 0 },
            }}
            component={Link}
            to="/dashboard/survey-analysis/createprojects"
            variant="contained"
            startIcon={<AddTwoToneIcon fontSize="small" />}
          >
            {t("Create Survey")}
          </Button>
        </Grid>
      </Grid>
    </>
  );
}

export default PageHeader;
