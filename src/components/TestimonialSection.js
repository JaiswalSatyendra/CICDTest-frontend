import React, { useState } from "react";

function TestimonialSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  const data = [
    {
      logo: "/images/ShardaTech.png",
      leftText:
        "With real-time integrated data flows from ConvertML, we can truly understand how people are engaging with our universities and schools",
      name: "Prashant Gupta",
      designation: "CEO Sharda Group",
      rightHead: "42",
      subRightHead: "%",
      rightText:
        "Increase in Engagement of students with our platform within 3 months",
    },
    {
      logo: "/images/Rawcudes.png",
      leftText:
        "ConvertML has enabled us to streamline our data management platform while maintaining flexibility to customize per brand as needed.",
      name: "Deepak Sondhi",
      designation: "Chief Product Officer, Rawcubes",
      rightHead: "4",
      subRightHead: "+",
      rightText:
        "Brands including Royal Enfield and BMW gets onboarded on centralized data management platform",
    },
    {
      logo: "/images/Clapingo.png",
      leftText:
        "With real-time integrated platform from ConvertML, We are able to understand our student's journey for 1:1 learning and take actions",
      name: "Sameer Agarwal",
      designation: "Founder, Clapingo",
      rightHead: "2x",
      rightText: "Increase in ROI for both adults and kids learning.",
    },
    // {
    //   logo: "/images/RoyalEnfeild.png",
    //   leftText:
    //     "The cost of a ConvertML investment completely beat our in-house options out of the water. It streamlines our internal marketing campaigns.",
    //   name: "Karan Chauhan",
    //   designation: "Senior Manager",
    //   rightHead: "73",
    //   subRightHead: "%",
    //   rightText: "Cost savings over building in-house",
    // },
  ];

  return (
    <div className="testimonialSection">
      <div className="container max-w-screen-xl mx-auto min-h-full px-5 pb-20 flex flex-col justify-center items-center gap-10">
        <div className="bg-gradient-to-r from-blue to-pink text-white lg:mx-20 rounded-3xl p-5 flex flex-col md:flex-row gap-20 justify-between ">
          <div className="flex flex-col p-5 justify-between w-full md:w-3/5">
            <div className="space-y-5">
              <img src={data[activeIndex].logo} className="h-16"  alt='convertml' />
              <div className="text-2xl font-bold pb-28">
                &quot;{data[activeIndex].leftText}&quot;
              </div>
            </div>

            <div className="mt-auto">
              <div className="text-xl mb-1">{data[activeIndex].name}</div>
              <div className="opacity-70">{data[activeIndex].designation}</div>
            </div>
          </div>
          <div className="w-full md:w-2/5 flex flex-col justify-between p-5">
            <div>
              <div className="text-7xl font-bold mb-10">
                {data[activeIndex].rightHead}
                <span className="text-3xl">
                  {data[activeIndex].subRightHead}
                </span>
              </div>
              <div className="text-2xl font-semibold">
                {data[activeIndex].rightText}
              </div>
            </div>
            <div className="flex justify-end items-center">
              {/* <div className='w-48 border-2 mr-4'></div>
                            <div className='font-semibold'>
                                Read their story &#62;
                            </div> */}
            </div>
          </div>
        </div>
        <div className="flex lg:justify-center items-center gap-10 overflow-x-scroll lg:overflow-x-hidden">
          <img
            className="w-48 cursor-pointer"
            src={data[0].logo}
            onClick={(e) => setActiveIndex(0)}
            alt="CML Logo"
          />
          <img
            className="w-48 cursor-pointer"
            src={data[1].logo}
            onClick={(e) => setActiveIndex(1)}
            alt="CML Logo"
          />
          <img
            className="w-48 cursor-pointer"
            src={data[2].logo}
            onClick={(e) => setActiveIndex(2)}
            alt="CML Logo"
          />
          {/* <img
            className="w-48 cursor-pointer"
            src={data[3].logo}
            onClick={(e) => setActiveIndex(3)}
            alt=""
          /> */}
        </div>
      </div>
    </div>
  );
}

export default TestimonialSection;
