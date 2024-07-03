import React from "react";
import "../styles/potentialCustomer.css";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import  logoThumbnailimg from "../assets/img/logoThumbnail.png"

const row1 = [
  {
    logo: "/images/Women.png",
    percent: "80%",
    type: "Engagement",
  },
  {
    logo: "/images/Clapingo.png",
    percent: "34%",
    type: "Purchases",
  },
  {
    logo: "/images/fun-candy.png",
    percent: "87.35%",
    type: "Conversion Rate",
  },
  {
    logo: "/images/ShardaHospital.png",
    percent: "12.5%",
    type: "Sign ups",
  },
  {
    logo: "/images/FunCandy.png",
    percent: "40%",
    type: "Leads Generation",
  },
  {
    logo: "/images/ShardaTech.png",
    percent: "70%",
    type: "Engagement",
  },
  {
    logo: "/images/VCJ.png",
    percent: "56%",
    type: "Sign Ups",
  },
  {
    logo: "/images/ShardaUniversity.png",
    percent: "32%",
    type: "Purchases",
  },
  {
    logo: "/images/Rawcudes.png",
    percent: "60%",
    type: "Engagement",
  },
];

function PotentialCustomer() {
  return (
    <div className="potentialCustomer max-w-fit py-5 px-5 flex flex-col gap-5 relative overflow-x-hidden">
      <div className="row1 flex gap-4 items-center ">
        {row1.map((item, index) => {
          return (
            <div
              key={item.type + "row1" + index}
              className="logoThumbnail1 h-28 lg:h-36 w-96 lg:w-128 p-5 rounded-xl flex justify-between items-center gap-10 lg:gap-12"
            >
              {/* <div
                className="h-28 w-32 lg:w-60 bg-no-repeat bg-contain bg-center"
                style={{ backgroundImage: `url(${item.logo})` }}
              ></div> */}
                <div
                className="h-28 w-32 lg:w-60 bg-no-repeat bg-contain bg-center">
                  <img src={logoThumbnailimg}  alt='convertml'/>
                </div>
              {/* <div className="w-20 lg:w-28 relative flex flex-col items-end">
                <div className="text-2xl lg:text-4xl font-bold text-green flex">
                  <div className="-mr-4 lg:-mr-2">{item.percent}</div>
                  <ArrowDropUpIcon sx={{ color: "green", fontSize: 48 }} />
                </div>
                <div className="text-xs absolute -bottom-6 right-0 w-32 text-center font-semibold bg-yellow rounded-md">
                  {item.type}
                </div>
              </div> */}
            </div>
          );
        })}
      </div>
      {/* <div className="row2 flex gap-4 justify-end items-center">
        {row2.map((item, index) => {
          return (
            <div
              key={item.type + "row2" + index}
              className="logoThumbnail h-28 lg:h-36 w-96 lg:w-128 p-5 rounded-xl flex justify-between items-center gap-10 lg:gap-12"
            >
              <div
                className="h-28 w-32 lg:w-60 bg-no-repeat bg-contain bg-center"
                style={{ backgroundImage: `url(${item.logo})` }}
              ></div>
              <div className="w-20 lg:w-28 relative flex flex-col items-end">
                <div className="text-2xl lg:text-4xl font-bold text-green flex">
                  <div className="-mr-4 lg:-mr-2">{item.percent}</div>
                  <ArrowDropUpIcon sx={{ color: "green", fontSize: 48 }} />
                </div>
                <div className="text-xs absolute -bottom-6 right-0 w-32 text-center font-semibold bg-yellow rounded-md">
                  {item.type}
                </div>
              </div>
            </div>
          );
        })}
      </div> */}
    </div>
  );
}

export default PotentialCustomer;
