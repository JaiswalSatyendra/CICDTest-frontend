//redirect to updated dashboard with no upgarde account button for premium and upgrade account button for enterprise
//show membership name in each case basic, enterprise and premium

import React from "react";
import { useNavigate } from "react-router-dom";
import "./index.scss";

const UpgradeSuccess = () => {
    let navigate = useNavigate();

    return (
        <div className="bowl1">
            <h1>Successful Payment</h1>
            <p>You can now access benefits of your purchased membership</p>
            {/* <ul>
                <li>Payment id: {razorpayPaymentId} </li>
                <li>Order id: {razorpayOrderId} </li>
                <li>Signature: {razorpaySignature} </li>
            </ul> */}
            <button onClick={() => {
                navigate("/dashboard");
            }}>Upgraded account</button>
        </div>
    )
}

export default UpgradeSuccess;