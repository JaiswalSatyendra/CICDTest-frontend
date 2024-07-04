import { useState, useContext, useEffect } from "react";
import { Box, Button, Card, Typography, Divider, Paper } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Select from "react-select";
import { useTranslation } from "react-i18next";
import { SessionContext } from "../../../../contexts/SessionContext";
import ToastMessage from "./ToastMessage";
import axios from "axios";

function SupersetForm({ datasets, updateSupersetData, updateColumns,setResultDataForGraph }) {
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
        user: selectedOption.user,
        status: selectedOption.status
      };
    });
  };

  const handleSubmit = async() => {
    if (selectedDataset.id) {
       // if (selectedDataset.status === "completed") {
        // await axios
        //   .post(`${process.env.REACT_APP_API_URL}/s3/read`, {
        //     // bucket: selectedDataset.user,
        //     // key: selectedDataset.name + "/result/demographics_result.json"
        //     bucket: "6315c9ed2eb751886ca49572",
        //     key: "survey_result_update/result/demographics_result.json"
        //   })
        //   .then((data) => {
        //     const templateJson = JSON.parse(data.data.data);
        //     setResultDataForGraph(templateJson)

        //   })
        //   .catch((err) => {
        //     console.log(err);
        //   });
      // }
      //  else {
      fetch(`${process.env.REACT_APP_API_URL}/superset/createSurvey`, {
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
          newType:"demographics",
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
              message: t(`${res.error.message == undefined ? res.error : res.error.message}`),
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
               let filterData = res.data.filter(ele=>ele.type==="demographics")
              updateSupersetData(filterData);
              updateColumns(res.columns);
              axios
              .post(`${process.env.REACT_APP_API_URL}/s3/read`, {
                // bucket: selectedDataset.user,
              // key: selectedDataset.name + "/result/demographics_result.json"
              bucket: selectedDataset.user,
              key: "survey_result_update/result/demographics_result.json"
              })
              .then((data) => {
                const templateJson = JSON.parse(data.data.data);
                setResultDataForGraph(templateJson)
              })
              .catch((err) => {
                console.log(err);
              });
            })
            .catch((error) => {
              updateSupersetData([]);
              updateColumns([]);
            });
        });
      // }
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
