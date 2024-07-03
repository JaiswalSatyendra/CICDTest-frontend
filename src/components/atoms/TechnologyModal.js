import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "./../../styles/navbar.css";

const TechnologyModal = ({ handleMouseEnter, closeModal }) => {
  return (
    <div
      className={
        "navItem-box navItem-technology w-1/5 max-w-3xl bg-white rounded-xl p-5 shadow-xl "
      }
      style={{ zIndex: 100 }}
      onMouseEnter={() => handleMouseEnter("technology")}
      onMouseLeave={() => closeModal()}
    >
      <div className="text-lg pb-5 font-semibold">Growth Caffeine </div>
      <div className="space-y-2 text-lg">
        <div className="flex items-center gap-4 hover:text-green">
          <LazyLoadImage
            className="h-8 w-8 rounded-lg"
            src={"/images/tech_CreativeAI.png"}
          />
          <div>Creative AI</div>
        </div>
        <div className="flex items-center gap-4 hover:text-green">
          <LazyLoadImage
            className="h-8 w-8 rounded-lg"
            src={"/images/tech_GovernanceAI.png"}
          />
          <div>Economic AI</div>
        </div>
        <div className="flex items-center gap-4 hover:text-green">
          <LazyLoadImage
            className="h-8 w-8 rounded-lg"
            src={"/images/tech_TargetAi.png"}
          />
          <div>Targeting AI</div>
        </div>
      </div>
    </div>
  );
};

export default TechnologyModal;
