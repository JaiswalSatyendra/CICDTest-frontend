import { useState, useContext, useEffect } from "react";
import { Box, Button, Card, Typography, Divider, Paper } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Select from "react-select";
import { useTranslation } from "react-i18next";
import { SessionContext } from "../../../../contexts/SessionContext";
import ToastMessage from "./ToastMessage";

function SupersetForm({ datasets, updateSupersetData, updateColumns }) {
  const [selectedDataset, setSelectedDataset] = useState({});
  const [toastObject, setToastObject] = useState({});
  const [session, ,] = useContext(SessionContext);
  const { user } = session;
  const { t } = useTranslation();

  const handleDatasetChange = (selectedOption) => {
    setSelectedDataset((prevState) => {
      return {
        ...prevState,
        name: selectedOption.value,
        id: selectedOption.id,
      };
    });
  };

  const handleSubmit = () => {
    if (selectedDataset.id) {
      fetch(`${process.env.REACT_APP_API_URL}/superset/create`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          user: user,
          dataset: selectedDataset.name,
          datasetId: selectedDataset.id,
          databaseName: user._id,
          tableName: selectedDataset.name,
          newType:"simpledata",
        }),
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.success === true) {
            setToastObject({
              message: t("Superset created successfully"),
              severity: "success",
              open: true,
            });
          } else {
            setToastObject({
              message: t(`${res.error}`),
              severity: "error",
              open: true,
            });
          }
        })
        .finally(() => {
          fetch(`${process.env.REACT_APP_API_URL}/superset/list`, {
            method: "GET",
            credentials: "include",
          })
            .then((res) => res.json())
            .then((res) => {
              let filterData = res.data.filter(ele=>ele.type==="simpledata")
              updateSupersetData(filterData);
              updateColumns(res.columns);
            })
            .catch((error) => {
              updateSupersetData([]);
              updateColumns([]);
            });
        });
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
