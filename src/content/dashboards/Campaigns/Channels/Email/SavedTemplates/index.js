import React, { useState, useEffect, useCallback, useContext } from "react";
import "../../Email/main.scss";
import axios from "axios";
import useRefMounted from "../../../../../../hooks/useRefMounted";
import "../EmailScratch/index.scss";
import Button from "@mui/material/Button";
import { S3LocationContext } from "../../../../../../contexts/S3LocationContext";
import { Grid, LinearProgress, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";

const SavedTemplates = () => {
  const [isSavedTemplatesLoaded, setisSavedTemplatesLoaded] = useState(false);
  const isMountedRef = useRefMounted();
  const [defaultTemplate, setDefaultTemplate] = useState([]);
  const [location, setLocation] = useState();
  const [selectCard, setSelectCard] = useState();
  const { sets3Location } = useContext(S3LocationContext);

  const getTemplates = useCallback(async () => {
    try {
      if (isMountedRef.current) {
        setisSavedTemplatesLoaded(true);
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/userEmailTemplates/list`,
          { withCredentials: true }
        );
        setDefaultTemplate(response.data.data);
        setisSavedTemplatesLoaded(false);
      }
    } catch (err) {
      console.log(err);
    }
  }, [isMountedRef]);

  useEffect(() => {
    getTemplates();
  }, [getTemplates]);
  return (
    <>
      {isSavedTemplatesLoaded ? (
        <LinearProgress />
      ) : defaultTemplate.length === 0 ? (
        <Typography variant="h4" style={{ textAlign: "center" }}>
          No saved templates
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {defaultTemplate.map((value, index) => (
            <Grid item xs={12} sm={4} key={index}>
              <Paper
                sx={{
                  p: 3,
                  border: selectCard === index ? "1px solid #6ceaea" : "",
                }}
                className="paper"
              >
                <p
                  style={{ color: selectCard === index ? "#6ceaea" : "black" }}
                >
                  {value.title}
                </p>
                <Box display="flex" sx={{ mt: 2 }}>
                  <Button
                    value={location}
                    variant="contained"
                    id={selectCard === index ? "greenButton" : "selectButton"}
                    sx={{
                      mr: 3,
                    }}
                    onClick={() => {
                      sets3Location(value.s3Location);
                      setSelectCard(index);
                      setLocation(`${value.s3Location}/index.html`);
                    }}
                  >
                    {selectCard === index ? "Selected" : "Select"}
                  </Button>
                  <Button
                    variant="contained"
                    disabled={!value.unlayer}
                    id={!value.unlayer ? "editButton" : "templatesaved"}
                    onClick={() => {
                      window.open("/emaileditor-savedTemplate", "_blank");
                      localStorage.setItem(
                        "savedTemplateS3Location",
                        value.s3Location
                      );
                    }}
                  >
                    Edit
                  </Button>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      )}
    </>
  );
};

export default React.memo(SavedTemplates);
