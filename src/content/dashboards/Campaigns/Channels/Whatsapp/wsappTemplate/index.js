import React, { useReducer } from "react";
import "./index.scss";
import Logo from "./logo.png";
// import Search from "./search.png";
import Footer from "../../../../../../components/DashboardFooter";
import RecipientsInfoSms from "../../../../../../components/atoms/RecipentInfoWhatsapp";
import { useNavigate } from "react-router-dom";
import Card from "./Card";
import CardData from "./CardData";

function reducer(state, action) {
  switch (action.type) {
    case "from":
      return { ...state, from: action.payload };
    case "recipient":
      return { ...state, recipient: action.payload };
    case "subject":
      return { ...state, subject: action.payload };
    default:
      return { ...state };
  }
}

const initialState = {
  from: "",
  recipient: "",
  subject: "",
};

const WhatsappTemplate = () => {
  let navigate = useNavigate();
  const [formData, dispatch] = useReducer(reducer, initialState);
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="wsappContainer">
      <div className="headingws">
        <img id="logo" src={Logo}  alt='convertml' />
        <h1 id="title">Design Whatsapp Campaign</h1>
      </div>
      <hr /> <br />
      <RecipientsInfoSms dispatch={dispatch} formData={formData} />
      <div className="choiceHeaderwsapps">
        <div className="choiceHeaderoptsws">
          <a
            onClick={() => {
              navigate("/dashboard/channels/whatsapp/wsappscratch");
            }}
            className="activews"
            onChange={handleChange}
            aria-label="lab API tabs example"
            value="11"
          >
            Start from scratch
          </a>
          <a
            onClick={() => {
              navigate("/dashboard/channels/whatsapp/wsapptemplates");
            }}
          >
            Templates
          </a>

          <a href="/emailtemplate">
            Draft templates
          </a>
        </div>
        <div className="buttonswss">
          <button>Preview</button>
          <button>Save</button>
          <button>Send Test</button>
          <button>Download</button>
          <button>Delete</button>
        </div>
      </div>
      <div className="screenModewsappscratch">
        <button>Add attachment</button>
      </div>
      <div className="searchet">
        <input
          type="text"
          placeholder="Search templates here..."
        />
        <button>Search</button>
      </div>
      <div className="optionstemplate">
        <div className="line1">
          <div className="someoptions">
            <button>Welcome Email</button>
            <button>Newsletter Email</button>
            <button>Free Gifts Email</button>
            <button>Hiring</button>
            <button>New product launch</button>
          </div>
          <div className="sorting">
            <label htmlFor="options">Sort by: </label>
            <select name="options" id="choice">
              <option value="most popular">Most popular</option>
              <option value="last updated">Last updated</option>
            </select>
          </div>
        </div>
        <div className="line2">
          <button>Sales Session Email</button>
          <button>Event Email</button>
          <button>Cart abandoned Email</button>
        </div>
      </div>
      <div className="cards">
      <Card details={CardData}/>
      </div>
      <Footer />
    </div>
  );
};

export default WhatsappTemplate;
