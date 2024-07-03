import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import InfoIcon from "@mui/icons-material/Info";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
// import "./Plans.scss";
function createData(
  name,
  calories,
  fat,
  carbs,
  protein,
  price,
  internalList,
  info
) {
  return {
    name,
    calories,
    fat,
    carbs,
    protein,
    price,
    info,
    internalList: internalList,
    history: [
      {
        date: "2020-01-05",
        customerId: "11091700",
        amount: 3,
      },
      {
        date: "2020-01-02",
        customerId: "Anonymous",
        amount: 1,
      },
    ],
  };
}

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const StyledInternalTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: "#F4F4FC",
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const CustomWidthTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} placement="right" />
))({
  [`& .${tooltipClasses.tooltip}`]: {
    maxWidth: 300,
  },
  [`& .${tooltipClasses.arrow}`]: {
    color: "black",
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "black",
  },
});

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  console.log(row);
  return (
    <React.Fragment>
      <StyledTableRow
        sx={{ "& > *": { borderBottom: "unset" } }}
        onClick={() => setOpen(!open)}
      >
        <TableCell
          className="tableCell"
          style={{ minWidth: "496px", maxWidth: "496px", width: "496px" }}
        >
          {!!row.internalList.length ? (
            <IconButton aria-label="expand row" size="small">
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          ) : (
            <span style={{ paddingLeft: "30px" }}> </span>
          )}
          {row.name}

          {row.info ? (
            <CustomWidthTooltip title={row.info} style={{ marginLeft: "10px" }}>
              <InfoIcon color="black" />
            </CustomWidthTooltip>
          ) : (
            ""
          )}
        </TableCell>
        <TableCell
          className="tableCell"
          align="center"
          style={{ minWidth: "248px", maxWidth: "248px", width: "248px" }}
        >
          {row.calories !== "true" ? (
            row.calories
          ) : (
            <CheckCircleIcon color="success" fontSize="large" />
          )}
        </TableCell>
        <TableCell
          className="tableCell"
          align="center"
          style={{
            borderLeft: "2px solid black",
            minWidth: "248px",
            maxWidth: "248px",
            width: "248px",
          }}
        >
          {row.fat !== "true" ? (
            row.fat
          ) : (
            <CheckCircleIcon color="success" fontSize="large" />
          )}
        </TableCell>
        <TableCell
          className="tableCell"
          align="center"
          style={{
            borderLeft: "2px solid black",
            minWidth: "248px",
            maxWidth: "248px",
            width: "248px",
          }}
        >
          {row.carbs !== "true" ? (
            row.carbs
          ) : (
            <CheckCircleIcon color="success" fontSize="large" />
          )}
        </TableCell>
      </StyledTableRow>
      <TableCell className="tableCell" style={{ padding: 0 }} colSpan={6}>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
              <TableHead>
                {row.internalList.map((eachrow) => (
                  <StyledInternalTableRow>
                    <TableCell
                      className="tableCell"
                      style={{
                        paddingLeft: "80px",
                        minWidth: "496px",
                        maxWidth: "496px",
                        width: "496px",
                      }}
                    >
                      {eachrow.name}
                      <CustomWidthTooltip
                        style={{
                          marginLeft: "10px",
                        }}
                        title={eachrow.info}
                      >
                        <InfoIcon color="black" />
                      </CustomWidthTooltip>
                    </TableCell>
                    <TableCell
                      className="tableCell"
                      style={{
                        minWidth: "248px",
                        maxWidth: "248px",
                        width: "248px",
                      }}
                      align="center"
                    >
                      {eachrow.first !== "true" ? (
                        eachrow.first
                      ) : (
                        <CheckCircleIcon color="success" fontSize="large" />
                      )}
                    </TableCell>
                    <TableCell
                      className="tableCell"
                      style={{
                        borderLeft: "2px solid black",
                        minWidth: "248px",
                        maxWidth: "248px",
                        width: "248px",
                      }}
                      align="center"
                    >
                      {eachrow.second !== "true" ? (
                        eachrow.second
                      ) : (
                        <CheckCircleIcon color="success" fontSize="large" />
                      )}
                    </TableCell>
                    <TableCell
                      className="tableCell"
                      style={{
                        borderLeft: "2px solid black",
                        minWidth: "248px",
                        maxWidth: "248px",
                        width: "248px",
                      }}
                      align="center"
                    >
                      {eachrow.third !== "true" ? (
                        eachrow.third
                      ) : (
                        <CheckCircleIcon color="success" fontSize="large" />
                      )}
                    </TableCell>
                  </StyledInternalTableRow>
                ))}
              </TableHead>
              <TableBody></TableBody>
            </Table>
          </TableContainer>
        </Collapse>
      </TableCell>
    </React.Fragment>
  );
}

const rows = [
  createData(
    "Sources",
    "2 Sources",
    "Unlimited",
    "Unlimited",
    3.99,
    "Unlimited",
    [
      {
        name: "Web",
        info:
          "Collect customer data from your mobile apps with SDKs for iOS, Android, and more",
        first: "true",
        second: "true",
        third: "true",
      },
      {
        name: "Mobile",
        info:
          "Collect customer data from your website with the Segment javascript library",
        first: "true",
        second: "true",
        third: "true",
      },
      {
        name: "Server",
        info: "Send customer data directly from your servers",
        first: "true",
        second: "true",
        third: "true",
      },
      {
        name: "Cloud Apps",
        info:
          "Connect platforms like Salesforce, Stripe, Facebook Ads, and more",
        first: "true",
        second: "true",
        third: "true",
      },
    ],
    "Use a single API to capture and send customer data exactly where you need it."
  ),
  createData(
    "Destinations",
    "Unlimited",
    "Unlimited",
    "Unlimited",
    4.3,
    "Unlimited",
    [],
    "Send your data to 300+ tools for product analytics, advertising, email, and more"
  ),
  createData(
    "Functions",
    "50hrs",
    "50hrs",
    "Custom",
    4.3,
    "Custom",
    [],
    "Create your own sources and destinations directly within your workspace. This is an optional feature subject to additional terms."
  ),
  createData(
    "Warehouses",
    "1 Warehouse",
    "1 Warehouse",
    "1 Warehouse",
    "Unlimited",
    "Unlimited",
    [
      {
        name: "Sync Frequency",
        info: "Choose how often and when you load data into your warehouse",
        first: "1 per day",
        second: "2 per day",
        third: "Custom Schedule",
      },
      {
        name: "Mobile",
        info: "Choose which events and properties sync to your warehouse",
        first: "----",
        second: "----",
        third: "true",
      },
    ],
    "Transform and load your data into Redshift, BigQuery, Postgres, Snowflake, or IBM DB2"
  ),
  createData(
    "Developer Tools",
    "true",
    "true",
    "true",
    "Unlimited",
    "Unlimited",
    [
      {
        name: "Central View of Data schema",
        info:
          "See a list of all events, traits, and more you've sent to Segment",
        first: "true",
        second: "true",
        third: "true",
      },
      {
        name: "Live data view and debugger",
        info:
          "View live data passing through Segment to test your tracking code",
        first: "true",
        second: "true",
        third: "true",
      },
    ],
    "Set up, test, and swap new tools with a common UI and data observability"
  ),
  createData(
    "Public API",
    "---",
    "true",
    "true",
    "Unlimited",
    "Unlimited",
    [],
    "Programmatically manage Segment workspaces, sources, destinations, and more"
  ),
];

const rows0 = [
  createData(
    "Data Privacy Controls",
    "true",
    "true",
    "true",
    3.99,
    "Unlimited",
    [
      {
        name: "User deletion",
        info: "Manage user deletion across Segment and supported destinations",
        first: "true",
        second: "true",
        third: "true",
      },
      {
        name: "User suppression",
        info:
          "Block data collection for specific users with one-click suppression",
        first: "true",
        second: "true",
        third: "true",
      },
      {
        name: "Customer data discovery and inventory",
        info:
          "Automatically detect and classify personal information in real time",
        first: "true",
        second: "true",
        third: "true",
      },
      {
        name: "Destination filters",
        info: "Activate the data flowing into each destination",
        first: "---",
        second: "---",
        third: "true",
      },
      {
        name: "Replay historical data",
        info: "Load all of your historical data into new tools",
        first: "---",
        second: "---",
        third: "+Add-on",
      },
    ],
    "Take a proactive approach to privacy and easily control where your data flows"
  ),
  createData(
    "Advanced data governance: Protocols",
    "---",
    "---",
    "+Add-on",
    3.99,
    "Unlimited",
    [
      {
        name: "Integrated tracking plan",
        info: "Create and manage a data tracking plan in your workspace",
        first: "---",
        second: "---",
        third: "+Add-on",
      },
      {
        name: "Data validation",
        info:
          "QA your implementation with automated data validation and violation reporting",
        first: "---",
        second: "---",
        third: "+Add-on",
      },
      {
        name: "Enforcement",
        info:
          "Automatically prevent unplanned or invalid data from being sent to Segment",
        first: "---",
        second: "---",
        third: "+Add-on",
      },
      {
        name: "Transformations",
        info: "Transform events without code",
        first: "---",
        second: "---",
        third: "+Add-on",
      },
    ],
    "Automatically enforce data quality"
  ),
];

const rows2 = [
  createData(
    "Unified customer data",
    "true",
    "true",
    "true",
    3.99,
    "Unlimited",
    [],
    "Take a proactive approach to privacy and easily control where your data flows"
  ),
  createData(
    "Audiencing and identity resolution: Personas",
    "---",
    "---",
    "+Add-on",
    3.99,
    "Unlimited",
    [
      {
        name: "Identity resolution",
        info:
          "Unify user history across devices and channels into one comprehensive profile",
        first: "---",
        second: "---",
        third: "+Add-on",
      },
      {
        name: "Trait and audience building",
        info:
          "Synthesize raw data into traits and audiences at the user or account level",
        first: "---",
        second: "---",
        third: "+Add-on",
      },
      {
        name: "Journeys",
        info: "Activate audiences in your favorite marketing tools",
        first: "---",
        second: "---",
        third: "+Add-on",
      },
      {
        name: "Activation",
        info: "Activate audiences in your favorite marketing tools",
        first: "---",
        second: "---",
        third: "+Add-on",
      },
      {
        name: "Profile API Access",
        info:
          "Programmatic access to Personas for in-app and onsite personalization",
        first: "---",
        second: "---",
        third: "+Add-on",
      },
    ],
    "Create real-time audiences and profiles"
  ),
  // createData(
  //   "Warehouses",
  //   "1 Warehouse",
  //   "1 Warehouse",
  //   "1 Warehouse",
  //   "Unlimited",
  //   "Unlimited",
  //   [
  //     {
  //       name: "Sync Frequency",
  //       info: "1 per day",
  //       first: "1 per day",
  //       second: "2 per day",
  //       third: "Custom Schedule",
  //     },
  //     {
  //       name: "Mobile",
  //       info: "Collect sustomer data",
  //       first: "----",
  //       second: "----",
  //       third: "true",
  //     },
  //   ]
  // ),
  // createData(
  //   "Developer Tools",
  //   "true",
  //   "true",
  //   "true",
  //   "Unlimited",
  //   "Unlimited",
  //   [
  //     {
  //       name: "Central View of Data schema",
  //       info: "true",
  //       first: "true",
  //       second: "true",
  //       third: "true",
  //     },
  //     {
  //       name: "Live data view and debugger",
  //       info: "View live data passing through segment",
  //       first: "true",
  //       second: "true",
  //       third: "true",
  //     },
  //   ]
  // ),
  // createData("Public Api", "---", "true", "true", "Unlimited", "Unlimited", []),
  // createData("", "", , 6.0, 3.79),
  // createData("Cupcake", 305, 3.7, 67, 4.3, 2.5),
  // createData("Gingerbread", 356, 16.0, 49, 3.9, 1.5),
];

const rows3 = [
  createData(
    "Sources",
    "2 Sources",
    "Unlimited",
    "Unlimited",
    3.99,
    "Unlimited",
    [
      {
        name: "Web",
        info: "Collect sustomer data",
        first: "true",
        second: "true",
        third: "true",
      },
      {
        name: "Mobile",
        info: "Collect sustomer data",
        first: "true",
        second: "true",
        third: "true",
      },
      {
        name: "Server",
        info: "Collect sustomer data",
        first: "true",
        second: "true",
        third: "true",
      },
      {
        name: "Cloud Apps",
        info: "Collect sustomer data",
        first: "true",
        second: "true",
        third: "true",
      },
    ]
  ),
  createData(
    "Destinations",
    "Unlimited",
    "Unlimited",
    "Unlimited",
    4.3,
    "Unlimited",
    []
  ),
  createData("Functions", "50hrs", "50hrs", "Custom", 4.3, "Custom", []),
  createData(
    "Warehouses",
    "1 Warehouse",
    "1 Warehouse",
    "1 Warehouse",
    "Unlimited",
    "Unlimited",
    [
      {
        name: "Sync Frequency",
        info: "1 per day",
        first: "1 per day",
        second: "2 per day",
        third: "Custom Schedule",
      },
      {
        name: "Mobile",
        info: "Collect sustomer data",
        first: "----",
        second: "----",
        third: "true",
      },
    ]
  ),
  createData(
    "Developer Tools",
    "true",
    "true",
    "true",
    "Unlimited",
    "Unlimited",
    [
      {
        name: "Central View of Data schema",
        info: "true",
        first: "true",
        second: "true",
        third: "true",
      },
      {
        name: "Live data view and debugger",
        info: "View live data passing through segment",
        first: "true",
        second: "true",
        third: "true",
      },
    ]
  ),
  createData("Public Api", "---", "true", "true", "Unlimited", "Unlimited", []),
  // createData("", "", , 6.0, 3.79),
  // createData("Cupcake", 305, 3.7, 67, 4.3, 2.5),
  // createData("Gingerbread", 356, 16.0, 49, 3.9, 1.5),
];

const rows4 = [
  createData(
    "Monthly Tracked Users",
    "Up to 1,000",
    "Base includes 10,000",
    "Custom volume",
    3.99,
    "Unlimited",
    [
      {
        name: "Throughput Limit",
        info:
          "Your customer data comes in the form of API Calls and Objects. Free and Team plans include up to 250 API Calls and Objects per MTU. The vast majority of Segment customers use well under these limits. Business plans are eligible for custom limits.",
        first: "Standard",
        second: "Standard",
        third: "Custom",
      },
    ],
    "The number of anonymous and logged-in visitors that you track with Segment"
  ),
  createData(
    "Price",
    "Free",
    "Starting at $120/month",
    "Custom",
    4.3,
    "Unlimited",
    [
      {
        name: "Additional 1,000 monthly tracked users (10K - 25K)",
        info: "Collect sustomer data",
        first: "---",
        second: "+$12",
        third: "---",
      },
      {
        name: "Additional 1,000 monthly tracked users (25K - 100K)",
        info: "Collect sustomer data",
        first: "---",
        second: "+$11",
        third: "---",
      },
      {
        name: "Additional 1,000 monthly tracked users (100K+)",
        info: "Collect sustomer data",
        first: "---",
        second: "+$10",
        third: "---",
      },
    ]
  ),
  createData(
    "Seats",
    "10",
    "10",
    "Unlimited",
    3.99,
    "Unlimited",
    "The number of teammates that can access your Segment workspace"
  ),
  createData(
    "Payment Method",
    "---",
    "Credit Card",
    "Invoice",
    4.3,
    "Unlimited",
    []
  ),
  createData(
    "Contract Length",
    "---",
    "Annual (save up to 20%) or Monthly",
    "Annual",
    4.3,
    "Unlimited",
    []
  ),
];

const rows5 = [
  createData(
    "Email support",
    "Basic",
    "Standard",
    "Premium",
    3.99,
    "Unlimited",
    []
  ),
  createData(
    "On-demand videos and documentation",
    "true",
    "true",
    "true",
    4.3,
    "Unlimited",
    []
  ),
  createData(
    "Dedicated support",
    "---",
    "---",
    "Available",
    3.99,
    "Unlimited",
    [
      {
        name: "Customer Success Manager",
        info:
          "Customer Success Manager may be included based on your annual agreement. Please ask your Account Executive for details.",
        first: "---",
        second: "---",
        third: "Available",
      },
      {
        name: "Enhanced Onboarding",
        info:
          "Dedicated onboarding support from an experienced Solutions Architect. Please ask your Account Executive for details",
        first: "---",
        second: "---",
        third: "+ Add-on",
      },
      {
        name: "Professional Services",
        info:
          "Custom professional services packages available. Please ask your Account Executive for details.",
        first: "---",
        second: "---",
        third: "+ Add-on",
      },
    ],
    "Get up-and-running quickly with developer documentation and on-demand training"
  ),
  createData(
    "Uptime SLA",
    "---",
    "---",
    "true",
    4.3,
    "Unlimited",
    [],
    "Guaranteed API uptime"
  ),
];

const rows6 = [
  createData(
    "Account Security",
    "true",
    "true",
    "true",
    3.99,
    "Unlimited",
    [
      {
        name: "Multi-factor authentication",
        info:
          "Provide an additional layer of security beyond your username and password. When logging into Segment, users will also enter a code from their mobile phone.",
        first: "true",
        second: "true",
        third: "true",
      },
      {
        name: "Single Sign-on",
        info:
          "Centrally manage your policies for access with Single Sign-On (SSO)",
        first: "---",
        second: "---",
        third: "true",
      },
      {
        name: "Granular roles and user permissions",
        info:
          "Control access to your sources and workspaces with fine-grained permissions to manage how your teammates interact with your data",
        first: "---",
        second: "---",
        third: "true",
      },
    ],
    "Protect your workspace with personalized security settings"
  ),
  createData(
    "Certifications",
    "true",
    "true",
    "true",
    4.3,
    "Unlimited",
    [],
    "To learn more about Segment's security and privacy program, and certifications and attestations, visit here"
  ),
];

export default function Plans() {
  return (
    <>
      <h1 className="plansHeading">Collect And send data anywhere</h1>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableBody>
            {rows.map((row) => (
              <Row key={row.name} row={row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <h1 className="plansHeading">Activate your data</h1>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableBody>
            {rows0.map((row) => (
              <Row key={row.name} row={row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <h1 className="plansHeading">Understand your customers</h1>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableBody>
            {rows2.map((row) => (
              <Row key={row.name} row={row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <h1 className="plansHeading">Usage and Billing</h1>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableBody>
            {rows5.map((row) => (
              <Row key={row.name} row={row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <h1 className="plansHeading">Support</h1>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableBody>
            {rows5.map((row) => (
              <Row key={row.name} row={row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <h1 className="plansHeading">Security</h1>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableBody>
            {rows6.map((row) => (
              <Row key={row.name} row={row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
