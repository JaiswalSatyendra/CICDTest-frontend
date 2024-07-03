import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import DoneIcon from "@mui/icons-material/Done";
import "./index.scss";

function UpgradeAccount() {

  const [loading, setLoading] = useState(false);
  let navigate = useNavigate();

  async function loadRazorpay2() {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onerror = () => {
      alert("Razorpay SDK failed to load. Are you online?");
    };
    script.onload = async () => {
      try {
        setLoading(true);

        const order = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/payment/create_order?subscription_type=Enterprise`,
          { withCredentials: true }
        );
        console.log(order);
        var options = {
          key: order.data.rzpy_key,
          name: "ConvertML",
          description: order.data.payment.product_name + " Membership",
          image: "https://www.convertml.ai/images/convertmlLogo.png",
          order_id: order.data.payment.order_id,
          handler: async function (response) {
            const result = await axios.post(`${process.env.REACT_APP_API_URL}/api/payment/order/complete`, {
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
            }, { withCredentials: true });
            if (typeof result.data.payment.id== 'undefined' || result.data.payment.id < 1) {
              navigate("/dashboard/upgardeacc/failurepage");
            } else {
              navigate("/dashboard/upgardeacc/successpage");
            }
          },
          prefill: {
            name: order.data.username,
            email: order.data.email,
            contact: order.data.phone_number,
          },
          theme: {
            color: "#3399cc",
          },
        };

        setLoading(false);
        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
      } catch (err) {
        console.log(err);
        alert(err);
        setLoading(false);
      }
    };
    document.body.appendChild(script);
  }

  async function loadRazorpay3() {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onerror = () => {
      alert("Razorpay SDK failed to load. Are you online?");
    };
    script.onload = async () => {
      try {
        setLoading(true);
        const order = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/payment/create_order?subscription_type=Premium`,
          { withCredentials: true }
        );
        console.log(order);
        var options = {
          key: order.data.rzpy_key,
          name: "ConvertML",
          description: order.data.payment.product_name + " Membership",
          image: "https://www.convertml.ai/images/convertmlLogo.png",
          order_id: order.data.payment.order_id,
          handler: async function (response) {
            const result = await axios.post(`${process.env.REACT_APP_API_URL}/api/payment/order/complete`, {
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
            }, { withCredentials: true });
            if (typeof result.data.payment.id == 'undefined' ||  result.data.payment.id < 1) {
              navigate("/dashboard/upgardeacc/failurepage");
            } else {
              alert("Payment id : " + result.data.payment.id);
              navigate("/dashboard/upgardeacc/successpage");
            }
          },
          prefill: {
            name: order.data.username,
            email: order.data.email,
            contact: order.data.phone_number,
          },
          theme: {
            color: "#3399cc",
          },
        };

        setLoading(false);
        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
      } catch (err) {
        console.log(err);
        alert(err);
        setLoading(false);
      }
    };
    document.body.appendChild(script);
  }

  const stickRef = useRef();

  useEffect(() => {
    const handleSticky = () => {
      var rect = stickRef.current.getBoundingClientRect();

      var scrollPosition =
        document.documentElement.scrollTop || document.body.scrollTop;
      if (scrollPosition > 3200) {
        stickRef.current.style.display = "none";
      } else if (scrollPosition <= 3100 && rect.top < 90 && rect.top > -1975) {
        stickRef.current.style.position = "sticky";
        stickRef.current.style.display = "table";
        stickRef.current.style.top = "80px";
        stickRef.current.style.backgroundColor = "white";
      } else {
        stickRef.current.style.position = "initial";
        stickRef.current.style.display = "block";
        stickRef.current.style.top = "0px";
      }
    };
    window.addEventListener("scroll", handleSticky);
    return () => {
      window.removeEventListener("scroll", handleSticky);
    };
  });

  return (
    <div>
      <div className="bg-darkBlue min-h-full px-5 py-5 pricing">
        <div className="container text-white max-w-screen-xl mx-auto min-h-full md:px-5 flex flex-col justify-center items-center">
          <h1 className="text-3xl text-center md:text-5xl font-bold pt-5 md:pt-8">
            Plans scale with your growth
          </h1>
          <h4 className="text-xl py-10">Which plan is right for you?</h4>
          <div className="w-full flex flex-col md:flex-row justify-center items-center gap-10 md:gap-16">
            <div
              id="plan-1"
              className="w-full max-w-md md:w-1/4 flex flex-col items-center justify-center bg-blackBlue rounded-xl"
            >
              <div className="bg-pink p-3 w-full text-center text-2xl font-semibold rounded-tl-xl rounded-tr-xl">
                Basic
              </div>
              <div className="py-5 text-3xl font-bold">
                $0<span className="text-sm font-medium">/mo</span>
              </div>
              <div className="space-y-3 py-5">
                <div className="flex gap-2 items-center">
                  <DoneIcon color="success" fontSize="medium" />
                  <div>Includes 1,000 visitors/mo</div>
                </div>
                <div className="flex gap-2 items-center">
                  <DoneIcon color="success" fontSize="medium" />
                  <div>2 Sources</div>
                </div>
                <div className="flex gap-2 items-center">
                  <DoneIcon color="success" fontSize="medium" />
                  <div>Email Action Manager</div>
                </div>
              </div>
            </div>
            <div
              id="plan-2"
              className="w-full max-w-lg md:w-1/3 flex flex-col items-center justify-center bg-blackBlue rounded-xl"
            >
              <div value={loading} className="bg-blue p-3 w-full text-center text-3xl font-semibold rounded-tl-xl rounded-tr-xl">
                Enterprise
              </div>
              <div className="py-10 text-5xl font-bold">
                $750<span className="text-sm font-medium">/mo</span>
              </div>
              <div className="space-y-4 text-xl py-5">
                <div className="flex gap-2 items-center">
                  <DoneIcon color="success" fontSize="large" />
                  <div>10,000 visitors/mo</div>
                </div>
                <div className="flex gap-2 items-center">
                  <DoneIcon color="success" fontSize="large" />
                  <div>10+ Sources</div>
                </div>
                <div className="flex gap-2 items-center">
                  <DoneIcon color="success" fontSize="large" />
                  <div>Includes 1 Data Warehouse</div>
                </div>
                <div className="flex gap-2 items-center">
                  <DoneIcon color="success" fontSize="large" />
                  <div>Includes 1000 Queries</div>
                </div>
              </div>
              <button
                onClick={loadRazorpay2}
                className="bg-blue p-1 my-4 w-11/12 text-center text-lg font-normal rounded-md"
              >
                Upgrade Account
              </button>
            </div>
            <div
              id="plan-3"
              className="w-full max-w-md md:w-1/4 flex flex-col items-center justify-center bg-blackBlue rounded-xl"
            >
              <div value={loading} className="border-blue border-4 p-3 w-full text-center text-2xl font-semibold rounded-tl-xl rounded-tr-xl">
                Premium
              </div>
              <div className="py-3 text-3xl font-bold">
                $940<span className="text-sm font-medium">/mo</span>
              </div>
              <div className="space-y-1 px-2 py-5">
                <div className="flex gap-2 items-center">
                  <DoneIcon color="success" fontSize="medium" />
                  <div>Custom Volume</div>
                </div>
                <div className="flex gap-2 items-center">
                  <DoneIcon color="success" fontSize="medium" />
                  <div>Single View of customer</div>
                </div>
                <div className="flex gap-2 items-center">
                  <DoneIcon color="success" fontSize="medium" />
                  <div>Data Governance</div>
                </div>
                <div className="flex gap-2 items-center">
                  <DoneIcon color="success" fontSize="medium" />
                  <div>Advanced Roles and permissions</div>
                </div>
                <div className="flex gap-2 items-center">
                  <DoneIcon color="success" fontSize="medium" />
                  <div>Unlimited Queries</div>
                </div>
              </div>
              <button
                onClick={loadRazorpay3}
                className="border-blue border-2 p-1 my-2 w-11/12 text-center text-lg font-normal rounded-md"
              >
                Upgrade Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpgradeAccount;
