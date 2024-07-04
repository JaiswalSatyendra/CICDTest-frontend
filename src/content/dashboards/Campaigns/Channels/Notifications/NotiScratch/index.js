import React, { useState, useReducer } from "react";
// import EmailEditor from "../../../../../../components/organisms/FromScratchEmailEditor";
import RichTextEditor from "../../../../../../components/organisms/RichTextEditor";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import DOMPurify from "dompurify";
import { convertToHTML } from "draft-convert";
import { EditorState } from "draft-js";
import "./index.scss";
import Logo from "./logo.png";
import Footer from "../../../../../../components/DashboardFooter";
import RecipientsInfoNoti from "../../../../../../components/atoms/RecipentInfoNoti";
import { useNavigate } from "react-router-dom";

function reducer(state, action) {
  switch (action.type) {
    case "from":
      return { ...state, from: action.payload };
    case "recipient":
      return { ...state, recipient: action.payload };
    case "subject":
      return { ...state, subject: action.payload };
    case "richText":
      return { ...state, richText: action.payload };
    case "emailEditor":
      return { ...state, emailEditor: action.payload };
    default:
      return { ...state };
  }
}

const initialState = {
  from: "",
  recipient: "",
  subject: "",
  richText: "",
  emailEditor: "",
};

const NotificationTextEditor = () => {
  let navigate = useNavigate();
  const [formData, dispatch] = useReducer(reducer, initialState);
  const [value, setValue] = React.useState("1");
  const [childValue, setChildValue] = React.useState("11");
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChild = (event, newValue) => {
    setChildValue(newValue);
  };

  const [convertedContent, setConvertedContent] = useState(null);
  const convertContentToHTML = (content) => {
    let currentContentAsHTML = convertToHTML(content);
    dispatch({ type: "richText", payload: currentContentAsHTML });
    setConvertedContent(currentContentAsHTML);
  };

  const createMarkup = (html) => {
    return {
      __html: DOMPurify.sanitize(html),
    };
  };

  return (
    <div className="emailscratchnoti">
      <div className="headingnoti">
        <img src={Logo}  alt='convertml' />
        <h1>Design Notification Campaign</h1>
      </div>
      <hr /> <br />
      <RecipientsInfoNoti dispatch={dispatch} formData={formData} />
      <div className="choiceHeaderns">
        <div className="choiceHeaderoptsns">
          <a
            onClick={() => {
              navigate("/dashboard/channels/web-notifications");
            }}
            className="activens"
            onChange={handleChange}
            aria-label="lab API tabs example"
            value="11"
          >
            Start from scratch
          </a>
          <a
            onClick={() => {
              navigate("/dashboard/channels/notifications/notitemplate");
            }}
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
        <div className="functionbtns">
          <button>Preview</button>
          <button>Save</button>
          <button>Send Test</button>
          <button>Download</button>
          <button>Delete</button>
          <button
            className="sendmsgbtnns"
            onClick={() => console.log(formData)}
            variant="contained"
          >
            Send Message
          </button>
        </div>
      </div>
      <RichTextEditor
        editorState={editorState}
        setEditorState={setEditorState}
        convertContentToHTML={convertContentToHTML}
      />
      <Footer />
    </div>
  );
};

export default NotificationTextEditor;
