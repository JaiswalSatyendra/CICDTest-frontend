import React from "react";

function TrustBuildingSection() {
  return (
    <div className="trustBuildingSection py-4 bg-black">
      <div className="container max-w-screen-xl mx-auto min-h-full px-20 py-10 flex flex-col lg:flex-row justify-center items-center gap-28 ">
        <div className="flex flex-row lg:flex-col justify-center items-center gap-10 w-full lg:w-1/3">
          <div className="bg-white h-40 w-64 rounded-lg p-5 flex justify-center items-center">
            <a
              href="https://www.theonevalley.com/"
              target="_blank" rel="noopener noreferrer" 
            >
              <img src={"/images/oneValleyLogo.png"}  alt='convertml' />
            </a>
          </div>
        </div>
        <div className="w-full lg:w-2/3 text-center lg:text-left text-5xl font-bold text-white">
          <div>
           Mentored by "One Valley, California, USA"
          </div>
        </div>
      </div>
    </div>
  );
}

export default TrustBuildingSection;
