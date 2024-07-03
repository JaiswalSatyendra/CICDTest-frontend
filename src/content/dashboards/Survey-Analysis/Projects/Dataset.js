import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Tooltip,
  tooltipClasses,
} from "@mui/material";
import { SessionContext } from "../../../../contexts/SessionContext";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { Link } from "react-router-dom";
import { styled } from "@mui/system";
import { useTranslation } from "react-i18next";

function Dataset({table}) {
  const [session, ,] = useContext(SessionContext);
  const { user } = session;
  const [dataset, setDataset] = useState("");
  const [item, setItem] = useState([{ title: "sample", _id: undefined }]);

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

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/dataset/list`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setItem((prevState) => {
          var n = data.data.map((e) => {
            return { title: e.title, _id: e._id };
          });
          return [...prevState, ...n];
        });
      });
  }, [user._id]);

  const handleChange = (event) => {
    setDataset(event.target.value);
    let selectedDataset = item.filter(ele=>ele._id==event.target.value);
    let newVal = selectedDataset[0].title;
    table(newVal)
  };

  const { t } = useTranslation();

  return (
    <Grid container sx={{ my: 2, px: 4 }}>
      <Grid item xs={9} sm={10.5}>
        <FormControl fullWidth size="small">
          <InputLabel id="demo-simple-select-label">Select Dataset</InputLabel>
          <Select
            labelId="demo-select-small"
            id="demo-select-small"
            value={dataset}
            label="Select Dataset"
            onChange={handleChange}
            sx={{
              backgroundColor: "white",
              borderRadius: "5px",
            }}
          >
            {item.map((e) => {
              return (
                <MenuItem value={e._id} name={e.title} key={e.title}>
                  {e.title}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={3} sm={1.5}>
        <TooltipWrapper title={t("Download Sample Data")} arrow placement="top">
          <Link
            to="/sampleData/customer_churn_data.csv"
            download
            target="_blank" rel="noopener noreferrer"
            style={{
              textDecoration: "none",
            }}
          >
            <Button
              variant="contained"
              sx={{ ml: 1, mt: 0.1, py: 0.6, borderRadius: "5px" }}
            >
              <FileDownloadIcon />
            </Button>
          </Link>
        </TooltipWrapper>
      </Grid>
    </Grid>
  );
}

export default Dataset;
