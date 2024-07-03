import React from "react";

function PredictionProcess() {
  return (
    <div className="predictionProcess py-10 bg-black text-white">
      <div className="container max-w-screen-xl mx-auto min-h-full px-5 py-10 flex flex-col justify-center items-center gap-16">
        <div className="text-5xl text-center flex flex-col gap-2 font-bold">
          <h2 className="lg:px-40">
            The entire process of AI prediction, packed in 3 clicks.
          </h2>
        </div>
        <div className="text-xl font-semibold text-center lg:px-80">
          Designed to be effortless for everyone. No code. No hassle. No
          waiting.
        </div>
        <div className="imageContainer flex flex-col lg:flex-row items-center justify-between gap-20">
          <div className="flex flex-col justify-center items-center">
            <div className="h-118 flex justify-center items-center">
              <img src={"/images/clickImage3.png"} alt='convertml' />
            </div>
            <div>
              <div className="text-center text-2xl font-bold pb-4">Click 1</div>
              <div className="text-lg text-center font-medium">
                Add a CSV file or integrate with your favourite data source in
                minutes.
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-center items-center">
            <div className="h-118 flex justify-center items-center">
              <img src={"/images/clickImage2.png"} alt='convertml' />
            </div>
            <div>
              <div className="text-center text-2xl font-bold pb-4">Click 2</div>
              <div className="text-lg text-center font-medium">
                Pick your prediction column from a drop down, we'll auto built
                the AI.
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-center items-center">
            <div className="h-118 flex justify-center items-center">
              <img src={"/images/clickImage1.png"} alt='convertml'  />
            </div>
            <div>
              <div className="text-center text-2xl font-bold pb-4">Click 3</div>
              <div className="text-lg text-center font-medium">
                Beautifully visualize predicted results, top driver and simulate
                "what-if" scenarios and take action.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PredictionProcess;
