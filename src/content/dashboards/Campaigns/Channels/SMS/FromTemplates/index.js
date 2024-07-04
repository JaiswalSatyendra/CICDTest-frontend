import React, { useReducer } from "react";
import "./index.scss";
import Logo from "./logo.png";
// import Search from "./search.png";
import Footer from "../../../../../../components/DashboardFooter";
import RecipientsInfoSms from "../../../../../../components/atoms/RecipentInfoSms";
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

const DashBoardSmsTemplate = () => {
  let navigate = useNavigate();
  const [formData, dispatch] = useReducer(reducer, initialState);
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="smsContainer">
      <div className="headingsms">
        <img src={Logo}  alt='convertml' />
        <h1>Design SMS Campaign</h1>
      </div>
      <hr /> <br />
      <RecipientsInfoSms dispatch={dispatch} formData={formData} />
      {/* <button
        className="sendemailbtn"
        onClick={() => console.log(formData)}
        variant="contained"
      >
        Send SMS
      </button> */}
      <div className="choiceHeadersms">
      <div className="choiceHeaderoptsms">
        <a
          onClick={() => {
            navigate("/dashboard/channels/sms");
          }}
        >
          Start from scratch
        </a>
        <a
          className="activesms"
          onClick={() => {
            navigate("/dashboard/channels/sms/fromtemplates");
          }}
          onChange={handleChange}
          aria-label="lab API tabs example"
          value={value}
        >
          Templates
        </a>
        <a
          onClick={() => {
            navigate("/dashboard/channels/sms/fromtemplates/saved");
          }}
        >
          Saved templates
        </a>
      </div>
        <div className="optionsms">
          <button>Preview</button>
          <button>Save</button>
          <button>Send Test</button>
          <button>Download</button>
          <button>Delete</button>
        </div>
      </div>
      <div className="searchsms">
        {/* <img id="searchicon" src={Search} alt="searchicon" /> */}
        <div className="searchsmst">
        <input
          type="text"
          placeholder="Search templates here..."
        />
        <button>Search</button>
      </div>
      <div className="optionsmstemplate">
        <div className="line1st">
          <div className="someoptionsst">
            <button>Welcome Email</button>
            <button>Newsletter Email</button>
            <button>Free Gifts Email</button>
            <button>Hiring</button>
            <button>New product launch</button>
          </div>
          <div className="sortingst">
            <label htmlFor="options">Sort by: </label>
            <select name="options" id="choice">
              <option value="most popular">Most popular</option>
              <option value="last updated">Last updated</option>
            </select>
          </div>
        </div>
        <div className="line2st">
          <button>Sales Session Email</button>
          <button>Event Email</button>
          <button>Cart abandoned Email</button>
        </div>
      </div>
      </div>
      <div className="cards">
      <Card details={CardData}/>
      </div>
      <Footer />
    </div>
  );
};

export default DashBoardSmsTemplate;
