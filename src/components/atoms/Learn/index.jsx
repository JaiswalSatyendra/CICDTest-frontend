import React from "react";
import "./index.scss";

function Learn() {
  const moveTo = () => {
    window.open("https://calendly.com/convertml", "_blank");
    return;
  };

  return (
    <div className="learn">
      <h1>Learn How ConvertML Works</h1>
      <hr></hr>
      <p>
        See how we are helping one of the world largest buisnesses transform
        their raw data into value using machine learning
      </p>
      <button
        onClick={moveTo}
        className="btn btn-primary bg-pink py-1 my-2 px-5 rounded-full text-white leandemo"
      >
        Get a Demo
      </button>
    </div>
  );
}
export default Learn;
