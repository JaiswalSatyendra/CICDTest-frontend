import React, { useState } from "react";

const withConvertML = "/videos/with_convertml.m4v";
const withoutConvertML = "/videos/without_convertml.m4v";

function DataPipeline() {
  const [activeImage, setActiveImage] = useState(withConvertML);
  return (
    <div className="dataPipeline  mx-auto min-h-full h-full flex flex-col justify-center items-center bg-black text-white py-10 px-5">
      <h2 className="text-5xl font-bold pb-5">
       The Leading Customer Experience Platform
      </h2>
      <div className="text-xl pb-5">
       Fast and Effortless CDP for your growing customer needs.
      </div>

      <div className="flex justify-center items-center w-full">
        {activeImage === withConvertML ? (
          <video
            className="h-72 w-fit md:h-124"
            autoPlay
            loop
            muted
            playsInline
            src={withConvertML}
          ></video>
        ) : (
          <video
            className="h-72 w-fit md:h-124"
            autoPlay
            loop
            muted
            playsInline
            src={withoutConvertML}
          ></video>
        )}
      </div>
      <div className="min-w-max text-center flex justify-center items-center bg-violet text-md md:text-lg font-medium mt-4 rounded-full">
        <div
          className={
            (activeImage === withoutConvertML ? "bg-pink" : "") +
            " px-5 md:px-8 py-3 rounded-full cursor-pointer"
          }
          onClick={() => setActiveImage(withoutConvertML)}
        >
          Without ConvertML
        </div>
        <div
          className={
            (activeImage === withConvertML ? "bg-pink" : "") +
            "  px-5 md:px-8 py-3 rounded-full cursor-pointer"
          }
          onClick={() => setActiveImage(withConvertML)}
        >
          With ConvertML
        </div>
      </div>
    </div>
  );
}

export default DataPipeline;
