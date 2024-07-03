import React from "react";
import "./index.scss";
import { useReducer } from "react";

function reducer(state, action) {
  switch (action.type) {
    case "from":
      return { ...state, from: action.payload };
    case "recipient":
      return { ...state, recipient: action.payload };
    case "ccbcc":
      return { ...state, ccbcc: action.payload };
    case "subject":
      return { ...state, subject: action.payload };
    default:
      return { ...state };
  }
}

function RecipientsInfoWhatsapp({ formData: { from, recipient, ccbcc, subject }, dispatch }) {
  // const senderInfo = useState();

  const initialState = {
    from: "",
    recipient: "",
    ccbcc: "",
    subject: "",
  };
  const [formData] = useReducer(reducer, initialState);


  return (
    <div>
      <div className="msgsendinginfo">
        {/* <label htmlFor="from">From</label> */}
        <input
          className="input1ws"
          htmlFor="from"
          id="from"
          name="from"
          type="number"
          placeholder="Sender's mobile number"
          onChange={(event) =>
            dispatch({ type: "from", payload: event.target.value })
          }
          value={from}
        />

        {/* <label htmlFor="Recipient Email Fields">Recipient Email Fields</label> */}
        <input
          className="input2ws"
          htmlFor="Recipient Email Fields"
          id="Recipient Email Fields"
          name="Recipient Email Fields"
          type="number"
          placeholder="Recipient's mobile number"
          onChange={(event) =>
            dispatch({ type: "recipient", payload: event.target.value })
          }
          value={recipient}
        />
      </div>
      <br />
      <div className="ccInfo">
        <input
          htmlFor="ccbcc"
          id="ccbcc"
          name="ccbcc"
          type="text"
          placeholder="CC, BCC"
          onChange={(event) =>
            dispatch({ type: "ccbcc", payload: event.target.value })
          }
          value={ccbcc}
        />
      </div>
      <br />
      {/* <label htmlFor="Subject">Subject</label> */}
      <div className="buttonInfoWsapp">
        <input
          htmlFor="Subject"
          id="Subject"
          name="Subject"
          type="text"
          placeholder="Subject"
          onChange={(event) =>
            dispatch({ type: "subject", payload: event.target.value })
          }
          value={subject}
        />
        <button
          onClick={() => console.log(formData)}
          variant="contained"
        >
          Send Message
        </button>
      </div>
    </div>
  );
}

export default RecipientsInfoWhatsapp;
