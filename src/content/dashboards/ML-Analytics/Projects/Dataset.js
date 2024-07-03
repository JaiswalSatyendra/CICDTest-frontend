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
  Autocomplete, TextField
} from "@mui/material";
import { SessionContext } from "../../../../contexts/SessionContext";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { Link } from "react-router-dom";
import { styled } from "@mui/system";
import { useTranslation } from "react-i18next";
import { ThemeProvider, createTheme, makeStyles } from "@mui/styles";
// import {  } from "formik-mui";
// import { getTablesMockData } from "../../../../utils/SqlEditor/mockData";


const useStyles = makeStyles((theme) => ({
  clearIndicator: {
    "&.MuiButtonBase-root.MuiAutocomplete-clearIndicator": {
      // color: "blue",
      // backgroundColor:"red",
      // visibility: "visible",
    },
  },
}));

function Dataset({ table, selectedModel, selectedDatasetName }) {

  const [dataset, setDataset] = useState("");
  const [inputValue, setInputValue] = useState('');
  const [item, setItem] = useState([]);

  const [session, , , tablesData, setTablesData] = useContext(SessionContext);
  const { user } = session;

  const classes = useStyles();


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

  const handleChange = (event,selectedVal) => {
    if (event != null && selectedVal!=null) {
      let selectedDataset = item.filter(ele => ele.title == selectedVal);
      let newVal = selectedDataset[0].title;
      setDataset(newVal);
      table(newVal)
    } else {
      setDataset("");
      table("")
    }
  }

  useEffect(() => {
    handleChange(null)
  }, [selectedModel])


  const { t } = useTranslation();

  return (
    <Grid container sx={{ my: 2, px: 4 }}>
      <Grid item xs={9} sm={10.5}>
        <FormControl fullWidth size="small">
      
          <Autocomplete
            disablePortal
            value={dataset==""?null:dataset}
            onChange={handleChange}
            classes={classes}
            // inputValue={inputValue}
            // onInputChange={(event, newInputValue) => {
            //   setInputValue(newInputValue);
            // }}
           
            id="combo-box-demo"
            options={item.map((option) => option.title)}
            renderInput={(params) => <TextField {...params} label="Select Dataset" />}
          />
  
          {/* <InputLabel id="demo-simple-select-label">Select Dataset</InputLabel>
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
          </Select> */}
        </FormControl>
      </Grid>
      <Grid item xs={3} sm={1.5}>
        <TooltipWrapper title={t("Download Sample Data")} arrow placement="top">
        
            {/* ----{selectedModel.key===""} */}
            <Button
              disabled={selectedModel.key === undefined ? true : false}
              variant="contained"
              sx={{ ml: 1, mt: 0.1, py: 0.6, borderRadius: "5px" }}
            >
                <Link
            to={selectedModel.key === undefined ? "" : selectedModel.filepath}
            download
            target="_blank" rel="noopener noreferrer"
            style={{
              textDecoration: "none",
            }}
          >
              <FileDownloadIcon />
          </Link>
            </Button>
        </TooltipWrapper>
      </Grid>
    </Grid>
  );
}

export default Dataset;
