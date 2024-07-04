import React from "react";
import "./main.scss";
import Logo from "./logo.png";
import Icon2 from "./icon2.png";
import Icon1 from "./icon1.png";
import { useNavigate } from "react-router-dom";

const EmailInitial = () => {
  let navigate = useNavigate();
  return (
    <div className="emailContainer">
      <div className="heading">
        <img id="emailoverviewlogo" src={Logo}  alt='convertml' />
        <h1 id="emailoverviewtitle">Design Email Campaign</h1>
      </div>
      <hr />

      <div className="flexcontainer">
        <div className="emailSecondContainer">
          <div
            id="box1"
            onClick={() => {
              navigate("/dashboard/channels/email/emailscratch");
            }}
          >
            <img src={Icon1}  alt='convertml' />
            <h2>Start from scratch</h2>
          </div>

          <div
            id="box2"
            onClick={() => {
              navigate("/dashboard/channels/email/emailtemplate");
            }}
          >
            <img src={Icon2}  alt='convertml' />
            <h2>Use a template</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailInitial;
