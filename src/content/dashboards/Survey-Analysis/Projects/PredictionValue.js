import React, { useContext, useEffect, useState } from "react";
import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { SessionContext } from "../../../../contexts/SessionContext";

function PredictionValue() {
  const [session, ,] = useContext(SessionContext);
  const { user } = session;
  const [dataset, setDataset] = useState("");
  const [item, setItem] = useState([{ title: "sample", _id: undefined }]);
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
  };
  return (
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">
        Select Prediction Variable
      </InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={dataset}
        label="Select Prediction Variable"
        onChange={handleChange}
        sx={{
          backgroundColor: "white",
          borderRadius: "5px",
        }}
      >
        {item.map((e) => {
          return (
            <MenuItem value={e._id} key={e.title}>
              {e.title}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
}

export default PredictionValue;
