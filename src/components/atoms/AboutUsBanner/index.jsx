import React from "react";
import "./index.scss";

function AboutUsBanner() {
  const moveTo = () => {
    window.open("https://calendly.com/convertml", "_blank");
    return;
  };
  return (
    <div className="team-header">
      <div className="team-header_info">
        <h1>Meet the ConvertML team</h1>
        <div>
          See how we're helping some of the world's largest buisness transform
          their raw data into value using machine learning
        </div>

        <button
          onClick={moveTo}
          className="btn btn-primary bg-pink py-3 my-10 px-5 rounded-full text-white"
        >
          Get a Demo
        </button>
      </div>
    </div>
  );
}

export default AboutUsBanner;
