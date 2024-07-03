import React, { useState } from "react";
import Slider from "@mui/material/Slider";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
//import DoneIcon from "@mui/icons-material/Done";
import "./PredictionSlider.scss";
const rowMarks = [
  {
    value: 1,
    label: "1000",
  },
  {
    value: 100,
    label: "100k",
  },
];

function PredictionSlider() {
  const [rowValue, setRowValue] = useState(20);
  const [devTime, setDevTime] = useState("6 Months");
  const [predictionTime, setPredictionTime] = useState("100 Minutes");
  const [buildCost, setBuildCost] = useState(60000);
  const [predictionCost, setPredictionCost] = useState(8000);

  const handleRowsChange = (event, newValue) => {
    if (typeof newValue === "number") {
      setRowValue(newValue);
      setBuildCost(newValue * 3000);
      setPredictionCost(newValue * 400);
      if (newValue > 5 && newValue <= 10) {
        setDevTime("4 Months");
        setPredictionTime("5 Minutes");
      }
      if (newValue > 10 && newValue <= 20) {
        setDevTime("6 Months");
        setPredictionTime("10 Minutes");
      }
      if (newValue > 30 && newValue <= 40) {
        setDevTime("8 Months");
        setPredictionTime("20 Minutes");
      }
      if (newValue > 40 && newValue <= 60) {
        setDevTime("10 Months");
        setPredictionTime("30 Minutes");
      }
      if (newValue > 60 && newValue <= 80) {
        setDevTime("12 Months");
        setPredictionTime("45 Minutes");
      }
      if (newValue > 80) {
        setDevTime("1+ Year");
        setPredictionTime("< 1 Hour");
      }
    }
  };

  return (
    <div className="predictionSlider py-10" style={{ backgroundColor : "rgb(223, 214, 241)"}}>
      <div className="container max-w-screen-xl mx-auto min-h-full px-5 lg:px-10  flex flex-row justify-between ">
        <div className="aligncenter">
          <h2 className=" text-5xl font-bold">
            Save time building complex<br/> AI models
          </h2>
          <div className="text-lg pt-5 opacity-70">Eliminate high cost & hours of routine work with <br/>
            automated data transfers, data preparation, and <br/>
            reporting. How much time & cost would you want <br/>
            to save today?</div>
        </div>
        <div className="group">
          {/* <img src="/images/home/img123.png" alt="anything"/> */}
        </div>
      </div>
      <div className="container max-w-screen-xl mx-auto min-h-full px-5 lg:px-10 py-2 flex flex-col lg:flex-row gap-20 justify-center items-center">
        <div className="lg:w-1/2">
          {/* <div className="text-xl font-medium mb-8 tracking-normal">
            ConvertML has saved 200K hours of time each month waiting on data
            science teams or learning to code. How much time & cost would you
            want to save today?
          </div> */}
          <div className="text-4xl py-4 font-semibold">
            {rowValue}k<span className="text-xl"> rows</span>
          </div>

          <Slider
            value={rowValue}
            min={1}
            step={1}
            max={100}
            onChange={handleRowsChange}
            aria-labelledby="non-linear-slider"
            marks={rowMarks}
            style={{ height: "7px", width: "90%", color: "#EA48AE" }}
          />
        </div>
        <div className=" w-full lg:w-1/2 bg-pink text-white rounded-lg px-5 lg:px-10 py-5">
          <div className="text-lg font-bold py-2">
            Time Taken to build algorithm in-house
          </div>
          <div className="flex items-center">
            <CalendarTodayIcon fontSize="large" />
            <div className="text-4xl pl-2">{devTime}</div>
          </div>
          <div className="text-xl pt-2 pb-6 pl-2">
            $ {buildCost.toLocaleString()} / solution
          </div>

          <div className="text-lg font-bold py-2">Using ConvertML</div>
          <div className="flex items-center">
            <AccessTimeIcon fontSize="large" />
            <div className="text-4xl pl-2">{predictionTime}</div>
          </div>
          <div className="text-xl py-2 pl-2">
            $ {predictionCost.toLocaleString()} / year
          </div>
        </div>
      </div>
      {/* <div className="max-w-screen-xl mx-auto min-h-full flex flex-col md:flex-row md:items-center gap-5 md:gap-12 font-normal text-md px-5">
        <div className="flex gap-2 items-center">
          <DoneIcon color="success" fontSize="large" />
          <div>No Data Science Team</div>
        </div>
        <div className="flex gap-2 items-center">
          <DoneIcon color="success" fontSize="large" />
          <div>No Background in machine Learning</div>
        </div>
        <div className="flex gap-2 items-center">
          <DoneIcon color="success" fontSize="large" />
          <div>No Programming Knowledge</div>
        </div>
      </div> */}
    </div>
  );
}

export default PredictionSlider;
