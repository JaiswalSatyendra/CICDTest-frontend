import React, { useReducer } from "react";
import "./index.scss";
import Logo from "./logo.png";
// import Search from "./search.png";
import Footer from "../../../../../../components/DashboardFooter";
import RecipientsInfoNoti from "../../../../../../components/atoms/RecipentInfoNoti";
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

const DashBoardNotiTemplate = () => {
  let navigate = useNavigate();
  const [formData, dispatch] = useReducer(reducer, initialState);
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="templatenoti">
      <div className="headingnt">
        <img src={Logo}  alt='convertml' />
        <h1>Design Notification Campaign</h1>
      </div>
      <hr /> <br />
      <RecipientsInfoNoti dispatch={dispatch} formData={formData} />
      <div className="choiceHeadentemp">
      <div className="choiceHeaderoptntemp">
        <a
          onClick={() => {
            navigate("/dashboard/channels/web-notifications");
          }}
        >
          Start from scratch
        </a>
        <a
          className="activent"
          onClick={() => {
            navigate("/dashboard/channels/notifications/notitemplate");
          }}
          onChange={handleChange}
          aria-label="lab API tabs example"
          value={value}
        >
          Templates
        </a>
        <a
          onClick={() => {
            navigate("/dashboard/channels/notifications/notitemplate/saved");
          }}
        >
          Saved templates
        </a>
        </div>
        <div className="choiceHeaderbtnsntemp">
          <button>Preview</button>
          <button>Save</button>
          <button>Send Test</button>
          <button>Download</button>
          <button>Delete</button>
          <button
            className="sendmsgbtn"
            onClick={() => console.log(formData)}
            variant="contained"
          >
            Send Message
          </button>
        </div>

      </div>
      <div className="editornt">
          <button>Add attachment</button>
          <button>Send test</button>
      </div>
      <div className="searchntemp">
        {/* <img id="searchicon" src={Search} alt="searchicon" /> */}
        <input
          type="text"
          placeholder="Search templates here..."
        />
        <button>Search</button>
      </div>
      <div className="optionstemplatenoti">
        <div className="line1noti">
          <div className="someoptionsnoti">
            <button>Welcome Email</button>
            <button>Newsletter Email</button>
            <button>Free Gifts Email</button>
            <button>Hiring</button>
            <button>New product launch</button>
          </div>
          <div className="sortingnoti">
            <label htmlFor="options">Sort by: </label>
            <select name="options" id="choice">
              <option value="most popular">Most popular</option>
              <option value="last updated">Last updated</option>
            </select>
          </div>
        </div>
        <div className="line2noti">
          <button>Sales Session Email</button>
          <button>Event Email</button>
          <button>Cart abandoned Email</button>
        </div>
      </div>
      <div className="cardsnt">
        <Card details={CardData} />
      </div>
      <Footer />
    </div>
  );
};

export default DashBoardNotiTemplate;
