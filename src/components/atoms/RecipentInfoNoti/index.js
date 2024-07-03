import React from "react";
import "./index.scss";
function RecipientsInfoSms({ formData: { from, recipient, subject }, dispatch }) {
  // const senderInfo = useState();

  return (
    <div className="recipientsnoti">
      {/* <label htmlFor="from">From</label> */}
      <input
        htmlFor="from"
        className="senderchild"
        id="from"
        name="from"
        type="number"
        placeholder="Sender's address"
        onChange={(event) =>
          dispatch({ type: "from", payload: event.target.value })
        }
        value={from}
      />

      {/* <label htmlFor="Recipient Email Fields">Recipient Email Fields</label> */}
      <input
        htmlFor="Recipient Email Fields"
        className="recevierchild"
        id="Recipient Email Fields"
        name="Recipient Email Fields"
        type="number"
        placeholder="Recipient's address"
        onChange={(event) =>
          dispatch({ type: "recipient", payload: event.target.value })
        }
        value={recipient}
      />
    </div>
  );
}

export default RecipientsInfoSms;
