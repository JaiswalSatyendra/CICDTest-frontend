import React from "react";
import "./../../styles/navbar.css";
import "./ProductModal.scss";

const SolutionModal = ({ handleMouseEnter, closeModal, toggleModal }) => {
  return (
    <div className="navItem-box navItem-product bg-white rounded-xl shadow-xl">
      <div
        className="flex"
        style={{ zIndex: 100 }}
        onMouseEnter={() => handleMouseEnter("product")}
        onMouseLeave={closeModal}
      >
        <div className="w-6/8 p-8">
          <div className="text-gray pb-2 font-semibold">ConvertML Solutions Provides </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-4">
              <img alt='convertml' 
                className="h-14 w-14 bg-gray rounded-lg"
                src={"/images/Product_marketing.png"}
              />
              <div className="group">
                <div className="text-md font-semibold group-hover:text-green">
                  Marketing
                </div>
                <div className="text-md tracking-normal text-gray group-hover:text-green">
                  Personalized and real-time customer experiences.
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <img alt='convertml' 
                className="h-14 w-14 bg-gray rounded-lg"
                src={"/images/Product_product.png"}
              />
              <div className="group">
                <div className="text-md font-semibold group-hover:text-green">
                  Product
                </div>
                <div className="text-md tracking-normal text-gray group-hover:text-green">
                  Data-driven decision making teams.
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <img alt='convertml' 
                className="h-14 w-14 rounded-lg"
                src={"/images/Product_engineering.png"}
              />
              <div className="group">
                <div className="text-md font-semibold group-hover:text-green">
                  Engineering
                </div>
                <div className="text-md tracking-normal text-gray group-hover:text-green">
                  The single platform to collect and manage your data.
                </div>
              </div>
            </div>
          </div> 
          
        </div>
         
         
      </div>
    </div>
  );
};

export default SolutionModal;
