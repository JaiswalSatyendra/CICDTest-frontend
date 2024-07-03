import React from "react";
import "./RightAlignImage.scss";
function RightAlignImage({
  data: {
    image,
    information: { name, pos, about, company },
  },
}) {
  return (
    <div className="rightprofile desktop">
      <div className="rightprofile-about">
        <h1>{name}</h1>
        <span>{pos}</span>
        <div>{about}</div>
      </div>
      <div className="rightprofile-avatar">
        <img src={image}  alt='convertml' />
      </div>
    </div>
  );
}

export default RightAlignImage;
