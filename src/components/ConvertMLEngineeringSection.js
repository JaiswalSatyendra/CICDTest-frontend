import React, { useState } from "react";
import "./ConvertMLProductionSection.scss";

function ConvertMLEngineeringSection() {
  const [activeData, setActiveData] = useState(0);

  const engineeringTeamsData = [
    {
      id: 1,
      heading: "One-click Integration",
      description:
        "ConvertML has in-built integrations for 100+ sources to scale your data as required.",
      image: "/images/engImg1.png",
    },
    {
      id: 2,
      heading: "Business Query",
      description:
        "Have a question? Just ask it in plain English to get an answer– anywhere, anytime. No more sifting through data, tinkering with spreadsheets, or waiting on reports.",
      image: "/images/engImg2.png",
    },
    {
      id: 3,
      heading: "Execute Auto-ML trained AI models",
      description:
        "With Auto-ML trained AI models, you can track critical operational metrics that matter for customer retention using rich visualization and dashboards to derive revenue insights.",
      image: "/images/engImg3.png",
    },
  ];

  return (
    <div className="engineeringSection py-4 engSec" id="engineeringSection">
      <div className="container max-w-screen-xl mx-auto min-h-full px-5 py-10 flex justify-between items-center gap-10 flex-col lg:flex-row">
        <div className="textContainer lg:w-2/5 flex flex-col gap-6">
          <div className="text-xl tracking-wide font-bold text-pink">
            Developers hub
          </div>
          <h3 className="text-5xl font-semibold tracking-wide text-black">
            {engineeringTeamsData[activeData].heading}
          </h3>
          <div className="text-lg font-medium pt-10">
            {engineeringTeamsData[activeData].description}
          </div>
        </div>
        <div className="toggleImageContainer w-full lg:w-1/2 flex flex-col">
          <div className="m-5">
            <div className="h-118 flex items-center justify-center imgContainer">
              <img id="imageHeight" src={engineeringTeamsData[activeData].image} alt="Engineering Teams Data" />
            </div>
          </div>
          <div className="buttons tracking-normal text-black text-center flex justify-between text-sm md:text-md tabs">
            <span
              className={
                "cursor-pointer pb-2 hover:text-pink hover:border-b-2 " +
                (activeData === 0 ? "text-pink border-b-2 font-semibold" : "")
              }
              onClick={() => setActiveData(0)}
            >
              {engineeringTeamsData[0].heading}
            </span>
            <span
              className={
                "cursor-pointer pb-2 hover:text-pink hover:border-b-2 " +
                (activeData === 1 ? "text-pink border-b-2 font-semibold" : "")
              }
              onClick={() => setActiveData(1)}
            >
              {engineeringTeamsData[1].heading}
            </span>
            <span
              className={
                "cursor-pointer pb-2 hover:text-pink hover:border-b-2 " +
                (activeData === 2 ? "text-pink border-b-2 font-semibold" : "")
              }
              onClick={() => setActiveData(2)}
            >
              {engineeringTeamsData[2].heading}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConvertMLEngineeringSection;
