import { useState, useContext, useEffect } from "react";
import { Box, Button, Card, Typography, Divider, Paper } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Select from "react-select";
import { useTranslation } from "react-i18next";
import { SessionContext } from "../../../../contexts/SessionContext";
import ToastMessage from "./ToastMessage";
import axios from "axios";

function SupersetForm({ datasets, updateSupersetData, updateColumns, setResultDataForGraph,setSelectedDataset1 }) {
  const [selectedDataset, setSelectedDataset] = useState({});
  // const [resultDataForGraph, setResultDataForGraph] = useState([]);
  const [toastObject, setToastObject] = useState({});
  const [session, ,] = useContext(SessionContext);
  const { user } = session;
  const { t } = useTranslation();

  const handleDatasetChange = (selectedOption) => {
    setSelectedDataset1(selectedOption)
    setSelectedDataset((prevState) => {
      return {
        ...prevState,
        name: selectedOption.value,
        id: selectedOption.id,
        user: selectedOption.user,
        status: selectedOption.status
      };
    });
  };


  const handleSubmit = async () => {
    if (selectedDataset.id) {
      // let newBodyObj = {
      //   "analysis": "trustmatrix",
      //   "schema": user._id,
      //   "table": selectedDataset.name,
      //   "filter": {
      //     "brand": [],
      //     "type": []
      //   }
      // }
      // axios
      // .post("https://alb2qwvg6e.execute-api.us-east-1.amazonaws.com/api/data", newBodyObj)
      // .then((data) => {
      //   setResultDataForGraph(data.data.data)
      // })
      // .catch((err) => {
      //   console.log(err);
      // });
    } else {
      setToastObject((prevState) => {
        return {
          ...prevState,
          open: true,
          message: t("Please select a dataset"),
          severity: "error",
        };
      });
    }
  };

  return (
    <>
      <Paper
        sx={{
          mx: 3,
        }}
      >
        <Box p={2}>
          <Typography variant="h5">{t("Create Superset Instance")}</Typography>
          <Divider />
          <Box mt={3}>
            <Select
              options={datasets.map((dataset) => ({
                id: dataset._id,
                value: dataset.title,
                label: dataset.title,
                user: dataset.user,
                status: dataset.status

              }))}
              placeholder={t("Select Dataset")}
              onChange={handleDatasetChange}
            />
          </Box>

          <Button
            sx={{
              mt: 3,
            }}
            color="primary"
            size="medium"
            variant="contained"
            onClick={handleSubmit}
            startIcon={<AddIcon />}
          >
            {t("Create")}
          </Button>
        </Box>
      </Paper>
      <ToastMessage toastObject={toastObject} setToastObject={setToastObject} />
    </>
  );
}

export default SupersetForm;
