import React from "react";
import "./LeftAlignImage.scss";
function LeftAlignImage({
  data: {
    image,
    information: { name, pos, about, company },
  },
}) {
  return (
    <div className="leftprofile desktop">
      <div className="leftprofile-avatar">
        <img src={image}  alt='convertml' />
      </div>
      <div className="leftprofile-about">
        <h1>{name}</h1>
        <span>{pos}</span>
        <div>{about}</div>
      </div>
    </div>
  );
}

export default LeftAlignImage;
