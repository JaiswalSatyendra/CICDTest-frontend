import React, { useState, useEffect, useRef } from "react";
//import axios from "axios";
import DoneIcon from "@mui/icons-material/Done";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Navbar from "../components/molecules/Navbar";
import Plans from "./Plans";
import Typography from "@mui/material/Typography";
//import { useNavigate } from "react-router-dom";
// import "./Pricing.scss";
// import PropTypes from "prop-types";
// import Box from "@mui/material/Box";
// import Collapse from "@mui/material/Collapse";
// import InfoIcon from "@mui/icons-material/Info";
// import IconButton from "@mui/material/IconButton";
// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
// import Paper from "@mui/material/Paper";
// import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
// import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
// import { styled } from "@mui/material/styles";
// import Button from "@mui/material/Button";
// import CheckCircleIcon from "@mui/icons-material/CheckCircle";
// import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";

function PricingPage() {
  const [activePlan, setActivePlan] = useState("free");
  const [expanded, setExpanded] = useState(false);
  useEffect(() => {}, []);
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  //const [loading, setLoading] = useState(false);
  // const [orderAmount, setOrderAmount] = useState(0);
  // const [orders, setOrders] = useState([]);

  // async function fetchOrders() {
  //   const { data } = await axios.get("/list-orders");
  //   setOrders(data);
  // }
  // useEffect(() => {
  //   fetchOrders();
  // }, []);

  // function loadRazorpay() {
  //   const script = document.createElement("script");
  //   script.src = "https://checkout.razorpay.com/v1/checkout.js";
  //   script.onerror = () => {
  //     alert("Razorpay SDK failed to load. Are you online?");
  //   };
  //   script.onload = async () => {
  //     try {
  //       setLoading(true);

  //       const order = await axios.get(
  //         `http://localhost:3001/api/payment/create_order?subscription_type=Basic`
  //       );
  //       console.log(order);
  //       var options = {
  //         key: order.data.rzpy_key,
  //         redirect: true,
  //         name: "Coinisky",
  //         description: order.data.payment.product_name + " Membership",
  //         image: "https://api.coinisky.com/static/images/coiniskyLogo.png",
  //         order_id: order.data.payment.order_id,
  //         callback_url: "http://localhost:3001/payment/order/complete",
  //         prefill: {
  //           name: order.data.username,
  //           email: order.data.email,
  //           contact: order.data.phone_number,
  //         },
  //         theme: {
  //           color: "#3399cc",
  //         },
  //       };

  //       setLoading(false);
  //       const paymentObject = new window.Razorpay(options);
  //       paymentObject.open();
  //     } catch (err) {
  //       console.log(err);
  //       alert(err);
  //       setLoading(false);
  //     }
  //   };
  //   document.body.appendChild(script);
  // }

  const stickRef = useRef();

  // let navigate = useNavigate();

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
      <Navbar />
      <div className="bg-darkBlue min-h-full px-5 py-10 pricing">
        <div className="container text-white max-w-screen-xl mx-auto min-h-full md:px-5 py-20 flex flex-col justify-center items-center">
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
                Free
              </div>
              {/* <div className="py-5 text-3xl font-bold">
                $0<span className="text-sm font-medium">/mo</span>
              </div> */}
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
              <Link
                to="/signup"
                className="bg-pink p-1 my-2 w-11/12 text-center text-lg font-normal rounded-md"
              >
                Create Account
              </Link>
            </div>
            <div
              id="plan-2"
              className="w-full max-w-lg md:w-1/3 flex flex-col items-center justify-center bg-blackBlue rounded-xl"
            >
              <div className="bg-blue p-3 w-full text-center text-3xl font-semibold rounded-tl-xl rounded-tr-xl">
                Startup & Mid-Market
              </div>
              {/* <div className="py-10 text-5xl font-bold">
                $750<span className="text-sm font-medium">/mo</span>
              </div> */}
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
              <a
                href="https://calendly.com/convertml"
                target="_blank" rel="noopener noreferrer"
                className="bg-blue p-1 my-4 w-11/12 text-center text-lg font-normal rounded-md"
                rel="noreferrer"
                style={{
                  fontSize: "15px",
                }}
              >
                Request a demo
              </a>
            </div>
            <div
              id="plan-3"
              className="w-full max-w-md md:w-1/4 flex flex-col items-center justify-center bg-blackBlue rounded-xl"
            >
              <div className="border-blue border-4 p-3 w-full text-center text-2xl font-semibold rounded-tl-xl rounded-tr-xl">
                Enterprise
              </div>
              {/* <div className="py-3 text-3xl font-bold">
                $1500<span className="text-sm font-medium">/mo</span>
              </div> */}
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
              <a
                href="https://calendly.com/convertml"
                target="_blank" rel="noopener noreferrer"
                className="border-blue border-2 p-1 my-2 w-11/12 text-center text-lg font-normal rounded-md"
                rel="noreferrer"
                style={{
                  fontSize: "15px",
                }}
              >
                Talk to our Growth Expert
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="container max-w-7xl mx-auto py-10 px-5">
        <div className="text-4xl font-bold text-center">
          Which plan is right for you?
        </div>
        <div className="flex justify-center items-center w-max mx-auto rounded-lg my-10 border-gray border-2 text-md md:text-xl">
          <div
            className={` ${
              activePlan === "free" ? "bg-lightGreen " : " "
            }  py-5 px-5 md:px-10 bg-white rounded-tl-lg rounded-bl-lg font-medium cursor-pointer`}
            onClick={() => setActivePlan("free")}
          >
            Free
          </div>
          <div
            className={` ${
              activePlan === "team" ? "bg-lightGreen " : " "
            }  py-5 px-5 md:px-10 bg-white font-medium border-gray border-x-2 cursor-pointer`}
            onClick={() => setActivePlan("team")}
          >
            Startup
          </div>
          <div
            className={` ${
              activePlan === "business" ? "bg-lightGreen " : " "
            } py-5 px-5 md:px-10 bg-white rounded-tr-lg rounded-br-lg font-medium cursor-pointer`}
            onClick={() => setActivePlan("business")}
          >
            Enterprise
          </div>
        </div>
      </div>
      <div
        className={`container max-w-7xl mx-auto py-10 px-5 ${
          activePlan === "free" ? "flex" : "hidden "
        } flex-col-reverse lg:flex-row justify-between items-center`}
      >
        <div>
          <div className="text-3xl font-semibold">Free plan:</div>
          <div className="space-y-4 text-lg mt-5">
            <div className="flex gap-2 items-center">
              <DoneIcon color="success" fontSize="medium" />
              <div>Collect data from 2 sources</div>
            </div>
            <div className="flex gap-2 items-center">
              <DoneIcon color="success" fontSize="medium" />
              <div>Send data to unlimited destinations</div>
            </div>
            <div className="flex gap-2 items-center">
              <DoneIcon color="success" fontSize="medium" />
              <div>Up to 1,000 monthly users</div>
            </div>
          </div>
          <div className="mb-10 pt-4 space-y-4 text-lg opacity-20">
            <div className="flex gap-2 items-center">
              <DoneIcon color="success" fontSize="medium" />
              <div>Activate audiences with Personas (Add-on)</div>
            </div>
            <div className="flex gap-2 items-center">
              <DoneIcon color="success" fontSize="medium" />
              <div>Enforce data quality with Protocols (Add-on)</div>
            </div>
            <div className="flex gap-2 items-center">
              <DoneIcon color="success" fontSize="medium" />
              <div>Transform and enrich your data</div>
            </div>
            <div className="flex gap-2 items-center">
              <DoneIcon color="success" fontSize="medium" />
              <div>Set granular user roles and permissions</div>
            </div>
          </div>
          <Link
            to="/signup"
            className="py-3 px-5 border-2 text-blue border-blue text-lg font-medium rounded-xl"
          >
            Create a free account
          </Link>
        </div>
        <div>
          <img src={"/images/pricing.png"}  alt='pricing' />
        </div>
      </div>

      <div
        className={`container max-w-7xl mx-auto py-10 px-5 ${
          activePlan === "team" ? "flex" : "hidden "
        } flex-col-reverse lg:flex-row justify-between items-center`}
      >
        <div>
          <div className="text-3xl font-semibold">Startup plan:</div>
          <div className="space-y-4 text-lg mt-5">
            <div className="flex gap-2 items-center">
              <DoneIcon color="success" fontSize="medium" />
              <div>
                Collect data from{" "}
                <span className="text-blue">unlimited sources</span>
              </div>
            </div>
            <div className="flex gap-2 items-center">
              <DoneIcon color="success" fontSize="medium" />
              <div>Send data to unlimited destinations</div>
            </div>
            <div className="flex gap-2 items-center">
              <DoneIcon color="success" fontSize="medium" />
              <div className="text-blue">10,000 monthly users</div>
            </div>
          </div>
          <div className="mb-10 pt-4 space-y-4 text-lg opacity-20">
            <div className="flex gap-2 items-center">
              <DoneIcon color="success" fontSize="medium" />
              <div>Activate audiences with Personas (Add-on)</div>
            </div>
            <div className="flex gap-2 items-center">
              <DoneIcon color="success" fontSize="medium" />
              <div>Enforce data quality with Protocols (Add-on)</div>
            </div>
            <div className="flex gap-2 items-center">
              <DoneIcon color="success" fontSize="medium" />
              <div>Transform and enrich your data</div>
            </div>
            <div className="flex gap-2 items-center">
              <DoneIcon color="success" fontSize="medium" />
              <div>Set granular user roles and permissions</div>
            </div>
          </div>
          <Link
            to="/signup"
            className="py-3 px-5 border-2 text-blue border-blue text-lg font-medium rounded-xl"
          >
            Create a free account
          </Link>
        </div>
        <div>
          <img src={"/images/pricing.png"} alt='pricing' />
        </div>
      </div>

      <div
        className={`container max-w-7xl mx-auto py-10 px-5 ${
          activePlan === "business" ? "flex" : "hidden "
        } flex-col-reverse lg:flex-row justify-between items-center`}
      >
        <div>
          <div className="text-3xl font-semibold">Business plan:</div>
          <div className="space-y-4 text-lg mt-5">
            <div className="flex gap-2 items-center">
              <DoneIcon color="success" fontSize="medium" />
              <div>
                Collect data from{" "}
                <span className="text-pink">unlimited sources</span>
              </div>
            </div>
            <div className="flex gap-2 items-center">
              <DoneIcon color="success" fontSize="medium" />
              <div>Send data to unlimited destinations</div>
            </div>
            <div className="flex gap-2 items-center">
              <DoneIcon color="success" fontSize="medium" />
              <div className="text-pink">Custom Volume</div>
            </div>
          </div>
          <div className="mb-10 pt-4 space-y-4 text-lg">
            <div className="flex gap-2 items-center">
              <DoneIcon color="success" fontSize="medium" />
              <div>Activate audiences with Personas (Add-on)</div>
            </div>
            <div className="flex gap-2 items-center">
              <DoneIcon color="success" fontSize="medium" />
              <div>Enforce data quality with Protocols (Add-on)</div>
            </div>
            <div className="flex gap-2 items-center">
              <DoneIcon color="success" fontSize="medium" />
              <div>Transform and enrich your data</div>
            </div>
            <div className="flex gap-2 items-center">
              <DoneIcon color="success" fontSize="medium" />
              <div>Set granular user roles and permissions</div>
            </div>
          </div>
          <Link
            to="/signup"
            className="py-3 px-5 border-2 text-blue border-blue text-lg font-medium rounded-xl"
          >
            Create a free account
          </Link>
        </div>
        <div>
          <img src={"/images/pricing.png"} alt='pricing' />
        </div>
      </div>

      <div className="container max-w-7xl mx-auto py-10 px-5 mobilePlans">
        <div ref={stickRef}>
          <TableRow
            sx={{ "& > *": { borderBottom: "unset" } }}
            style={{ height: "150px", width: "88rem" }}
          >
            <TableCell
              className="tableCell"
              style={{
                minWidth: "399px",
                maxWidth: "399px",
                width: "399px",
                border: "0px",
              }}
            ></TableCell>
            <TableCell
              className="tableCell"
              style={{
                border: "0px",
                minWidth: "344px",
                maxWidth: "344px",
                width: "344px",
              }}
              align="center"
            >
              <div style={{ padding: "18px" }}>Free</div>
              <Link
                to="/signup"
                className="py-3 px-5 border-2 text-blue border-blue text-lg font-medium rounded-xl my-5"
                style={{
                  fontSize: "15px",
                }}
              >
                Create a free Account
              </Link>
            </TableCell>
            <TableCell
              className="tableCell"
              style={{
                borderBottom: "0px",
                borderLeft: "2px solid black",
                minWidth: "248px",
                maxWidth: "248px",
                width: "248px",
              }}
              align="center"
            >
              <div style={{ padding: "18px" }}>Team</div>
              <Link
                to="/signup"
                className="py-3 px-5 border-2 text-blue border-blue text-lg font-medium rounded-xl my-5"
                style={{
                  fontSize: "15px",
                }}
              >
                Try for free
              </Link>
            </TableCell>
            <TableCell
              className="tableCell"
              style={{
                borderBottom: "0px",
                borderLeft: "2px solid black",
                minWidth: "248px",
                maxWidth: "248px",
                width: "248px",
              }}
              align="center"
            >
              <div style={{ padding: "18px" }}>Business</div>
              <a
                href="https://calendly.com/convertml"
                target="_blank" rel="noopener noreferrer"
                className="py-3 px-5 border-2 text-blue border-blue text-lg font-medium rounded-xl my-5"
                rel="noreferrer"
                style={{
                  fontSize: "15px",
                }}
              >
                Get a Demo
              </a>
            </TableCell>
          </TableRow>
        </div>
        <Plans />
      </div>

      <div className="container max-w-5xl mx-auto px-5 pt-10 pb-20">
        <div className="text-4xl font-bold pt-5 pb-14 text-center">
          Frequently asked questions
        </div>
        <Accordion
          expanded={expanded === "panel1"}
          sx={{ boxShadow: 0 }}
          onChange={handleChange("panel1")}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <Typography
              className=""
              variant="h6"
              sx={{ width: "95%", flexShrink: 0, fontSize: "20px" }}
            >
              How can I estimate my MTUs?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="h6" sx={{ color: "black", fontSize: "16px" }}>
              To get an idea of your MTU count, add your monthly active users to
              the number of anonymous visitors you get per month. Some tools
              also call this metric "Monthly Unique Visitors."
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === "panel2"}
          sx={{ boxShadow: 0 }}
          onChange={handleChange("panel2")}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2bh-content"
            id="panel2bh-header"
          >
            <Typography
              className=""
              variant="h6"
              sx={{ width: "95%", flexShrink: 0, fontSize: "20px" }}
            >
              What is the benefit of an annual plan?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="h6" sx={{ color: "black", fontSize: "16px" }}>
              If you are on the monthly billing plan, your bill may fluctuate
              each month based on your user activity. The annual plan allows you
              to purchase MTU at a lower rate. Exceeding the allotted MTU count
              on annual plans may incur additional charges.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === "panel3"}
          sx={{ boxShadow: 0 }}
          onChange={handleChange("panel3")}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3bh-content"
            id="panel3bh-header"
          >
            <Typography
              className=""
              variant="h6"
              sx={{ width: "95%", flexShrink: 0, fontSize: "20px" }}
            >
              Do I need to have a data warehouse to use Warehouses?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="h6" sx={{ color: "black", fontSize: "16px" }}>
              Yes! ConvertML connects to your existing data warehouse and pipes
              in data collected from your Sources. You don't have to worry about
              the ETL or maintaining the data pipeline.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === "panel4"}
          sx={{ boxShadow: 0 }}
          onChange={handleChange("panel4")}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3bh-content"
            id="panel3bh-header"
          >
            <Typography
              className=""
              variant="h6"
              sx={{ width: "95%", flexShrink: 0, fontSize: "20px" }}
            >
              Is there a free trial of the paid plans?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="h6" sx={{ color: "black", fontSize: "16px" }}>
              Yes! There is a 14-day free trial for the Team plan. To try the
              Business plan, please contact us.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === "panel5"}
          sx={{ boxShadow: 0 }}
          onChange={handleChange("panel5")}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3bh-content"
            id="panel3bh-header"
          >
            <Typography
              className=""
              variant="h6"
              sx={{ width: "95%", flexShrink: 0, fontSize: "20px" }}
            >
              Does ConvertML handle billing for my Sources or Destinations
              services?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="h6" sx={{ color: "black", fontSize: "16px" }}>
              No, you’re responsible for accounts that you register with
              Sources, Integrations, and Warehouse providers, whether they are
              paid or free.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === "panel6"}
          sx={{ boxShadow: 0 }}
          onChange={handleChange("panel6")}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3bh-content"
            id="panel3bh-header"
          >
            <Typography
              className=""
              variant="h6"
              sx={{ width: "95%", flexShrink: 0, fontSize: "20px" }}
            >
              How can I buy Protocols or Personas?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="h6" sx={{ color: "black", fontSize: "16px" }}>
              Protocols and Personas are offered as an add-on to your ConvertML
              plan. Contact us to learn more about what plan is best for you.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </div>
      <Footer />
    </div>
  );
}

export default PricingPage;
