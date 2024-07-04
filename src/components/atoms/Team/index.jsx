import React from "react";
import LeftAlignImage from "./LeftAlignImage";
import "./index.scss";
import RightAlignImage from "./RightAlignImage";
import MobileAlignImage from "./Mobile";

const aboutUs = [
  {
    image: "/images/Team/deepak.jpg",
    information: {
      name: "Deepak Sondhi",
      pos: "Founder & CEO",
      about:
        "Scaled $200M+ different business transformation efforts across prominent Fortune 500 companies in the US, Latin America, Europe, India, and the Asia-Pacific region. He brings industry thought leadership and extensive project experience. He has helped several companies formulate and roll out complex projects, including project conceptualizing, roll-out, and scaling.",
    },
  },
  {
    image: "/images/Team/hardev.jpg",
    information: {
      name: "Hardev Sahu",
      pos: "Founder & Chief Business Officer",
      about:
        "Career spans 25 years of leadership in both established companies and entrepreneurship. Hardev's valiant and ethical approach to work and life has unprecedented success in a diverse business domain that includes information technology, marble and granite mining, healthcare, e-governance, and hospitality.",
    },
  },
  // {
  //   image: "/images/Team/renu_gupta.jpg",
  //   information: {
  //     name: "CS Renu Gupta",
  //     pos: "Founder & Chief Revenue Officer",
  //     about:
  //       "Company Secretary and Semi-Qualified Chartered Accountant who knows how to run and scale business from scratch. Founder & Chairman of 'RG SmartDiscovery LLP' which has worked with 35+ clients and 1M+ users. Co-Founder of “Funcandi” (ML based platform for toys/games recommendation to kids).Ex-Guest Faculty at Great Lakes for Finance & Accounting. Worked as financial consultant for esteemed clients which include Shree RajMahal Jewellers, SPG Associates.",
  //   },
  // },
  {
    image: "/images/Team/gaurav_gupta.jpg",
    information: {
      name: "Gaurav Gupta",
      pos: "Chief Data Scientist",
      about:
        "Built and scaled $100M+ of products at HCL, Nasdaq, Adobe and Microsoft. Technical Architect for few largest tech platforms: Adobe Sensei, Document Cloud(PDF) ML Platform, Personalization(Sophia@Adobe). 15+ years of industrial experience in application development, AI/ML and Blockchain technologies. Founder of “DataPitcher” (Canada based company which leverages Blockchain for data trading) & Co-Founder of “Funcandi” (ML based platform for toys/games recommendation to kids).Member of Faculty Board of Sharda University Uzbekistan.",
    },
  },
  {
    image: "/images/Team/khem.jpg",
    information: {
      name: "Khem Chand",
      pos: "Chief Technology Officer",
      about:
        "20+ years of strong experience with more than $100M revenue impact in Product Offerings, AI/Machine Learning and data products for fortune 500 companies. A specialist in providing Knowledge Graph based domain centric solution for Manufacturing, Financial Services and Post Market Product performance analysis. Subject Matter Expert in implementation of multi-cloud and cloud native strategy for Data Products.",
    },
  },
  {
    image: "/images/Team/chuck.jpg",
    information: {
      name: "Chuck Medhurst",
      pos: "Advisor & Chief Finance Officer",
      about:
        "Held roles in Executive Management, Operations and Finance with over 20 year's experience in Team Leadership, Strategic Planning and Value Proposition Creation, including the funding and successful exit of a VC-backed Digital Services and Cloud Computing startup.",
    },
  },
  {
    image: "/images/Team/kunal.jpg",
    information: {
      name: "Kunal Sondhi",
      pos: "Chief Product Officer",
      about:
        " Lead product engineering and user experience teams to successfully create and sell uniquely positioned offerings for B-Raja (video streaming platform), Rawcubes (data management software) and Infosys (consulting) firms. In his professional career, he has overseen all product management activities relating to research, design, feature prioritization, and product marketing. He brings a natural tendency to be curious to ensure the creation of quality products that customers would want to buy.",
    },
  },
  {
    image: "/images/Team/charles.jpg",
    information: {
      name: "Charles Bachmann",
      pos: "Chief Sales Officer",
      about:
        "15 years of experience in Sales leadership, software development, and with a global service delivery background, he has extensive thought leadership around growth initiatives and driving business outcomes. Specifically, Charles brings passion and expertise in aiding companies alignment of their strategic vision and unique assets with the power of cloud solutions to achieve operational benefit and enable new revenue streams. His focus on client and partner relationships matched with his drive to push differentiated and measured results will be key for our team and more importantly our ConvertML clients.",
    },
  },
];

const Team = () => {
  return (
    <div className="team">
      <h1>Our Founding Team</h1>
      <hr></hr>

      {aboutUs.map((about, index) => {
        if (index % 2 == 0) {
          return <LeftAlignImage data={about} />;
        } else {
          return <RightAlignImage data={about} />;
        }
      })}

      {aboutUs.map((about, index) => {
        if (index == about.length - 1) {
          return <div className="" MobileAlignImage data={about} />;
        }
        return (
          <div className="mobile">
            <MobileAlignImage data={about} />
            <div className="profile-end"></div>
          </div>
        );
      })}
    </div>
  );
};

export default Team;
