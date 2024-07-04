import React, { useState, useEffect } from "react";
//import ActionSection from "../components/ActionSection";
import Footer from "../components/Footer";
import Navbar from "../components/molecules/Navbar";
import TestimonialSection from "../components/TestimonialSection";

function CustomersPage() {
  const [customerData, setCustomerData] = useState([]);
  const [Filter, setFilter] = useState("");
  const [customerFilteredData, setCustomerFilteredData] = useState([]);
  useEffect(() => {
    setCustomerData([
      {
        image: "/images/customerImage1.png",
        title: "Churn Prediction",
        content:
          "Predict which customer are likely to cancel and proactively take actions on them.",
        tags: ["Sales", "Marketing", "Product", ""],
      },
      {
        image: "/images/customerImage2.png",
        title: "Lead Conversion",
        content: "Predict which leads have the most propensity to convert.",
        tags: ["Sales", "Marketing", "Product", ""],
      },
      {
        image: "/images/customerImage3.png",
        title: "Dynamic Pricing",
        content:
          "Predict willingness to pay and setup Uber-like dynamic pricing.",
        tags: ["Sales", "Finance", "Operations", ""],
      },
      {
        image: "/images/customerImage4.png",
        title: "Employee Attrition",
        content:
          "Predict which employees are at risk of leaving and engage with them more closely.",
        tags: ["Operations", "Finance", "Product", ""],
      },
      {
        image: "/images/customerImage5.png",
        title: "Cross Selling",
        content:
          "Predict future cost selling oppurtunities with existing customers.",
        tags: ["Sales", "Marketing", "Finance", ""],
      },
      {
        image: "/images/customerImage6.png",
        title: "Credit Risk Scoring",
        content:
          "Predict loan repayment and default rates on new inbound customers.",
        tags: ["Sales", "Finance", "Operations", ""],
      },
      {
        image: "/images/customerImage7.png",
        title: "Sales Funnel",
        content:
          "We leverages 3D charts like Sankey, Funnel for stretching from early-stage brand discovery to final purchase.",
        tags: ["Sales", "Marketing", "Product", ""],
      },
      {
        image: "/images/customerImage8.png",
        title: "Fraud Detection",
        content:
          "Instantly predict fraudulent transactions and proactively take action.",
        tags: ["Finance", "Operations", ""],
      },
      {
        image: "/images/customerImage9.png",
        title: "Hyper-Personalization",
        content:
          "We leverages artificial intelligence (AI and real-time data to deliver more relevant concent, product, and service information.",
        tags: ["Sales", "Marketing", "Product", ""],
      },
      {
        image: "/images/customerImage10.png",
        title: "Customer Segmentation",
        content:
          "Live, RFM and Static segmentation can help you divide your customers based on common characteristics.",
        tags: ["Sales", "Marketing", "Product", ""],
      },
    ]);
  }, []);

  useEffect(() => {
    let filteredData = [];
    customerData.map(function (data, index) {
      data.tags.filter(function (tag) {
        if (tag === Filter) {
          filteredData.push(data);
          setCustomerFilteredData(filteredData);
        }
        return 0;
      });
      return 0;
    });
  }, [Filter, customerData]);

  return (
    <div className="customerPage">
      <Navbar />
      <div className="bg-black min-h-full pt-10">
        <div className="text-white container max-w-screen-xl mx-auto py-10 px-5">
          <h1 className="text-5xl pt-16 lg:px-10 text-center tracking-normal font-semibold">
            Whatever your business, let Machine Learning guide your decisions.
          </h1>
          <h3 className="text-xl lg:px-60 py-12 font-medium text-center">
            Find out how no-code machine learning can transform your business
            and change how to make data-driven decisions.
          </h3>
        </div>
      </div>
      <div className="container max-w-screen-xl mx-auto py-10 pb-20 relative flex flex-col items-center justify-center">
        <div className="w-3/5 min-w-max bg-white flex flex-col justify-center items-center gap-6 py-8 px-4 relative -top-24 rounded-xl shadow-gray shadow-lg">
          <h2 className="text-3xl font-semibold">Functions</h2>
          <div className="flex justify-center items-center bg-blue text-white font-semibold tracking-normal rounded-md">
            <div
              className="py-2 px-5 cursor-pointer"
              onClick={() => setFilter("")}
            >
              All
            </div>
            <div
              className="py-2 px-5 cursor-pointer"
              onClick={() => setFilter("Sales")}
            >
              Sales
            </div>
            <div
              className="py-2 px-5 cursor-pointer"
              onClick={() => setFilter("Finance")}
            >
              Finance
            </div>
            <div
              className="py-2 px-5 cursor-pointer"
              onClick={() => setFilter("Operations")}
            >
              Operations
            </div>
            <div
              className="py-2 px-5 cursor-pointer"
              onClick={() => setFilter("Product")}
            >
              Product
            </div>
            <div
              className="py-2 px-5 cursor-pointer"
              onClick={() => setFilter("Marketing")}
            >
              Marketing
            </div>
          </div>
        </div>
        <div className="flex flex-wrap justify-center items-center gap-10">
          {customerFilteredData.map(function (data, index) {
            return (
              <div className="w-96 h-118 border-2 rounded-2xl p-5 flex justify-between flex-col ">
                <img className="h-40 mx-auto" src={data.image}  alt='convertml' />
                <h2 className="text-2xl tracking-normal font-semibold py-5">
                  {data.title}
                </h2>
                <p className="text-lg tracking-normal">{data.content}</p>
                <div className="pt-2 flex justify-start items-center gap-2">
                  {data.tags.map(function (tag, index) {
                    return tag === "" ? (
                      ""
                    ) : (
                      <div className="bg-black text-white text-md py-1 px-2 font-medium rounded-md">
                        {tag}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <TestimonialSection />
      {/* <ActionSection /> */}
      <Footer />
    </div>
  );
}

export default CustomersPage;
