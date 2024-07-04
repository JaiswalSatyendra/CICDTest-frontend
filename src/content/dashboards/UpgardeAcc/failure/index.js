import React from "react";
import { useNavigate } from "react-router-dom";
import "./index.scss";


const UpgradeFailure = () => {


    let navigate = useNavigate();

    return (
        <div className="bowl">
            <h1>Unsuccessful Payment</h1>
            <p>Sorry, your account was not upgraded due to invalid payment id.</p>
            <button onClick={() => {
                navigate("/dashboard/upgardeacc");
            }}>Try again</button>
        </div>
    )
}

export default UpgradeFailure;