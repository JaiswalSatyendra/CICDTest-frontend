import React from "react";
import "./index.scss";

const Card = (props) => {
  return (
      <>
      {props.details.map((value, index)=>(
    <div className="cardnoti" key={index}>
      <p>{value.heading}</p>
      <img src={value.img}  alt='convertml'></img>
      <button id="previewbtn">Preview</button>
      <br />
      <button id="templatebtn">Use this template</button>
    </div>
    ))};
    </>
  );
};

export default Card;
