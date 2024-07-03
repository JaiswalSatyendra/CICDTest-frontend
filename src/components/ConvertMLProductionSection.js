import React, { useState } from "react";
import "./ConvertMLProductionSection.scss";

function ConvertMLProductionSection() {
  const [activeData, setActiveData] = useState(0);

  const productTeamData = [
    {
      id: 1,
      imageTitle: "Targeted Campaign",
      heading: "Craft the right retention campaign",
      description:
        "Drag-and-drop your retention campaign design and level-up your content with our patented content paraphrase tool to charm repeat buyers or new customers. In just a few clicks, your highly targeted campaign is ready to send to the focused audience to maximize the lifetime value of your customers.",
      image: "/images/engage2.png",
    },
    {
      id: 2,
      imageTitle: "AI Graphics Editor",
      heading: "AI Graphics Editor",
      description:
        "Leverage ConvertML’s Graphics editor for maximum impact to design. Reshape your choice of words using ConvertML’s fast AI writer and draft impactful emails campaign.",
      image: "/images/engage1.png",
    },
    {
      id: 3,
      imageTitle: "Re-engage",
      heading: "Keep the conversation going",
      description:
        "Re-engage with the inactive customers using the volumes of past interactions data. Automate precise retargeting for customers to actualize high ROI.",
      image: "/images/engage3.png",
    },
  ]; 

  return (
    <div className="marketingSection py-4 bg-black prodsec" id="productSection">
      <div className="container max-w-screen-xl mx-auto min-h-full px-5 py-10 flex justify-around items-center gap-10 flex-col lg:flex-row">
        <div className="textContainer lg:w-1/3 flex flex-col gap-6">
          <div className="text-xl tracking-wide font-bold text-pink">
          Engage Customer
          </div>
          <h3 className="text-5xl font-semibold tracking-wide text-black">
            {productTeamData[activeData].heading}
          </h3>
          <div className="text-lg pt-10 font-medium text-black">
            {productTeamData[activeData].description}
          </div>
        </div>
        <div className="toggleImageContainer w-full lg:w-1/2 flex flex-col">
          <div className="h-118 flex items-center justify-center imgContainer">
            <img src={productTeamData[activeData].image} alt="convertml" />
          </div>
          <div className="buttons flex tracking-normal justify-between text-black text-center text-sm md:text-md tabs">
            <span
              className={
                "cursor-pointer pb-2 hover:text-pink hover:border-b-2 " +
                (activeData === 0 ? "text-pink border-b-2 font-semibold" : "")
              }
              onClick={() => setActiveData(0)}
            >
              {productTeamData[0].imageTitle}
            </span>
            <span
              className={
                "cursor-pointer pb-2 hover:text-pink hover:border-b-2 " +
                (activeData === 1 ? "text-pink border-b-2 font-semibold" : "")
              }
              onClick={() => setActiveData(1)}
            >
              {productTeamData[1].imageTitle}
            </span>
            <span
              className={
                "cursor-pointer pb-2 hover:text-pink hover:border-b-2 " +
                (activeData === 2 ? "text-pink border-b-2 font-semibold" : "")
              }
              onClick={() => setActiveData(2)}
            >
              {productTeamData[2].imageTitle}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConvertMLProductionSection;
