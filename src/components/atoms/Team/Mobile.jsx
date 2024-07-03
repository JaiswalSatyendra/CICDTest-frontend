import React from "react";
import "./Mobile.scss";
function MobileAlignImage({
  data: {
    image,
    information: { name, pos, about },
  },
}) {
  return (
    <div className="mobileprofile">
      <div className="mobileprofile-avatar">
        <img src={image}  alt='convertml' />
      </div>
      <div className="mobileprofile-about">
        <h1>{name}</h1>
        <span>{pos}</span>
        <div>{about}</div>
      </div>
    </div>
  );
}

export default MobileAlignImage;
