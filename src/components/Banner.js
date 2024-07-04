import React, { useState } from "react";
import ClearIcon from "@mui/icons-material/Clear";

function Banner() {
  const [bannerHide, setBannerhide] = useState(false);

  return (
    <div
      className={
        " banner bg-blue sticky top-0 z-20 " +
        (bannerHide === true ? "hidden " : " ")
      }
    >
      <div className="container font-medium max-w-screen-xl mx-auto min-h-full px-10 py-3 text-center text-white tracking-normal">
        No-Code Product Led Growth(PLG) CDP from economists and
        technologists that has worked Live at Mckinsey, Adobe, Salesforce, Zurich.
      </div>
      <ClearIcon
        fontSize="large"
        className="absolute top-1 right-2 lg:right-5 cursor-pointer"
        style={{ color: "white" }}
        onClick={() => setBannerhide(true)}
      />
    </div>
  );
}

export default Banner;
