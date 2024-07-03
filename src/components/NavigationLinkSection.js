import React from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
// import "./navlink.scss";
import marketResearchInsights from "../assets/icons/marketResearchInsights.svg";

import customerSuccess from "../assets/icons/customerSuccess.svg";
import marketing from "../assets/icons/marketing.svg";
import productManagement from "../assets/icons/productManagement.svg"; 

function NavigationLinkSection() {
  return (
    // <div className="navigationLinkSection py-5 bg-white">
    //   <div className="container max-w-screen-xl mx-auto min-h-full py-10 px-5 flex justify-center items-center text-black flex-col">
    //     <h2 className="text-4xl font-bold text-pink" style={{textAlign: "center"}}>
    //       Empower every business unit to achieve the ultimate retention goals with ConvertML
    //     </h2>
    //     <div className="text-xl font-medium px-5 lg:px-48 text-center">
    //       ConvertML collects events from 100+ data sources and provides a
    //       complete ML toolkit to every team in your company
    //     </div>
    //     <div className="flex flex-col lg:flex-row justify-center items-center py-2">
    //       {/* <img
    //         src={"/images/homeNavLinkLeft.png"}
    //         className="z-10 w-2/3 lg:w-1/3"
    //         alt=""
    //       />
    //       <img
    //         src={"/images/homeNavLinkCenter.png"}
    //         className="-ml-12 pt-10 pb-20 rotate-90 lg:rotate-0 w-full lg:w-3/5 -mr-4"
    //         alt=""
    //       /> */}
    //       <img 
    //         src={"/images/nav.png"}
    //         id="imageNavLink"
    //         className="-ml-12 rotate-90 lg:rotate-0 w-full lg:w-3/5 -mr-4"
    //         alt=""
    //       />
    //       <div className="flex flex-col justify-center items-center z-10 gap-4">
    //         {/* <a
    //           href="#marketingSection"
    //           className="bg-violet p-4 rounded-2xl w-80 cursor-pointer hover:shadow-dark hover:shadow-lg ease-in-out duration-300"
    //         >
    //           <div>
    //             <div className="flex justify-between items-center font-medium">
    //               <div className="text-xl font-bold pb-2 mobileview">
    //                 Identify Leads
    //               </div>
    //               <KeyboardArrowDownIcon fontSize="large" />
    //             </div>
    //             <div>Single view of the customer.</div>
    //             <div>Integrated Product Analytics.</div>
    //             <div>Complete view of the customer/Predictive lead scoring/ customer segmentation</div>
    //           </div>
    //         </a> */}

    //         <a
    //           href="#marketingSection"
    //           className="bg-blue p-4 rounded-2xl w-full cursor-pointer hover:shadow-dark hover:shadow-lg ease-in-out duration-300"
    //         >
    //           <div>
    //             <div className="flex justify-between items-center font-medium text-white">
    //               <div className="text-xl font-bold pb-2 mobileview text-white">
    //                 Identify Leads
    //               </div>
    //               <KeyboardArrowDownIcon fontSize="large" />
    //             </div>
    //             {/* <div>Get data right.</div>
    //             <div>Understand your accounts.</div> */}
    //             <div className="text-white">Complete view of the customer/Predictive <br/> lead scoring/ customer segmentation</div>
    //           </div>
    //         </a>

    //         <a
    //           href="#productSection"
    //           className="bg-blue p-4 rounded-2xl w-full cursor-pointer hover:shadow-dark hover:shadow-lg ease-in-out duration-300"
    //         >
    //           <div>
    //             <div className="flex justify-between items-center font-medium text-white">
    //               <div className="text-xl font-bold pb-2 mobileview text-white">
    //                 Engage Customer
    //               </div>
    //               <KeyboardArrowDownIcon fontSize="large" />
    //             </div>
    //             {/* <div>Get data right.</div>
    //             <div>Understand your accounts.</div> */}
    //             <div className="text-white">AI graphics Editor/ Targeted <br/> Campaign/ Re-engage</div>
    //           </div>
    //         </a>

    //         <a
    //           href="#retainSection"
    //           className="bg-blue p-4 rounded-2xl w-full cursor-pointer hover:shadow-dark hover:shadow-lg ease-in-out duration-300"
    //         >
    //           <div>
    //             <div className="flex justify-between items-center font-medium text-white">
    //               <div className="text-xl font-bold pb-2 mobileview text-white">
    //                 Retain & Grow
    //               </div>
    //               <KeyboardArrowDownIcon fontSize="large" />
    //             </div>
    //             {/* <div>One Click data integration.</div>
    //             <div>Inbuilt Image Editor</div> */}
    //             <div className="text-white">Smart Upsell/ Improve Average <br/> Order value/Reduce Churn</div>
    //           </div>
    //         </a>
    //         <a
    //           href="#engineeringSection"
    //           className="bg-blue p-4 rounded-2xl w-full cursor-pointer hover:shadow-dark hover:shadow-lg ease-in-out duration-300"
    //         >
    //           <div>
    //             <div className="flex justify-between items-center font-medium text-white">
    //               <div className="text-xl font-bold pb-2 mobileview text-white">
    //                 Developers hub
    //               </div>
    //               <KeyboardArrowDownIcon fontSize="large" />
    //             </div>
    //             <div className="text-white">One click-Integration/ NLP SQL Query/ <br/> Execute AUtoML trained models</div>
    //           </div>
    //         </a>
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <div className="builtfor-section">
     <b> Built For</b><br/><br/>
     <button><img src={marketResearchInsights} alt={marketResearchInsights}  /> Market Research/Insights  </button>
     <button><img src={customerSuccess} alt={customerSuccess} /> Customer Success </button>
     <button><img src={marketing} alt={marketing}  /> Marketing</button>
     <button><img src={productManagement} alt={productManagement}  /> Product Management </button>
    </div>
  );
}

export default NavigationLinkSection;
