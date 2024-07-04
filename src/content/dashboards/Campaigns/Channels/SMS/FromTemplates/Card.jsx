import React from "react";
import "./index.scss";

const Card = (props) => {
  return (
      <>
      {props.details.map((value, index)=>(
    <div className="cardsms" key={index}>
      <p className="heading">{value.heading}</p>
      <p className="content">{value.content}</p>
      <button id="preview">Preview</button>
      <br />
      <button id="template">Use this template</button>
    </div>
    ))};
    </>
  );
};

export default Card;
