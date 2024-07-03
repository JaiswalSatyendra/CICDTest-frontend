import React from "react";
import "./../../styles/navbar.css";
import "./ProductModal.scss";

const ProductModal = ({ handleMouseEnter, closeModal, toggleModal }) => {
  return (
    <div className="navItem-box navItem-product bg-white rounded-xl shadow-xl">
      <div
        className="flex justify-center"
        style={{ zIndex: 100 }}
        onMouseEnter={() => handleMouseEnter("product")}
        onMouseLeave={closeModal}
      >
        <div className="w-3/8 p-8">
          <div className="text-gray pb-2 font-semibold">CONVERTML FOR...</div>
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
          <div className="text-gray pt-5 pb-2 font-semibold">PRODUCTS</div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-4">
              <img alt='convertml' 
                className="h-14 w-14 rounded-lg"
                src={"/images/Product_Connections.png"}
              />
              <div className="group">
                <div className="text-md font-semibold group-hover:text-green">
                  Connections
                </div>
                <div className="text-md tracking-normal text-gray group-hover:text-green">
                  Integrate 100+ data sources with single click
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <img alt='convertml' 
                className="h-14 w-14 bg-gray rounded-lg"
                src={"/images/Product_protocols.png"}
              />
              <div className="group">
                <div className="text-md font-semibold group-hover:text-green">
                  Protocols
                </div>
                <div className="text-md tracking-normal text-gray group-hover:text-green">
                  Protect the integrity of your data
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <img alt='convertml' 
                className="h-14 w-14 bg-gray rounded-lg"
                src={"/images/Product_personas.png"}
              />
              <div className="group">
                <div className="text-md font-semibold group-hover:text-green">
                  Personas
                </div>
                <div className="text-md tracking-normal text-gray group-hover:text-green">
                  Build real-time user profile & audiences
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-3/8 bg-lightGray rounded-r-xl p-8 ">
          <div className="text-gray pb-2 font-semibold">FEATURES</div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-4">
              <img alt='convertml' 
                className="h-10 w-10 bg-gray rounded-lg"
                src={"/images/Product_FEATURES_Journeys.png"}
              />
              <div className="group">
                <div className="text-md font-semibold group-hover:text-green">
                  Template-Driven
                </div>
                <div className="text-md tracking-normal text-gray group-hover:text-green">
                  Design templates based emails
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <img alt='convertml' 
                className="h-10 w-10 bg-gray rounded-lg"
                src={"/images/Product_FEATURES_functions.png"}
              />
              <div className="group">
                <div className="text-md font-semibold group-hover:text-green">
                  Functions
                </div>
                <div className="text-md tracking-normal text-gray group-hover:text-green">
                  Customize your customer data pipeline
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <img alt='convertml' 
                className="h-10 w-10 bg-gray rounded-lg"
                src={"/images/Product_FEATURES_warehouses.png"}
              />
              <div className="group">
                <div className="text-md font-semibold group-hover:text-green">
                  Warehouses
                </div>
                <div className="text-md tracking-normal text-gray group-hover:text-green">
                  Easily transform & load customer data
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <img alt='convertml' 
                className="h-10 w-10 bg-gray rounded-lg"
                src={"/images/Product_FEATURES_privacy.png"}
              />
              <div className="group">
                <div className="text-md font-semibold group-hover:text-green">
                  Privacy
                </div>
                <div className="text-md tracking-normal text-gray group-hover:text-green">
                  Protect user's privacy
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <img alt='convertml' 
                className="h-10 w-10 bg-gray rounded-lg"
                src={"/images/Product_FEATURES_gdpr.png"}
              />
              <div className="group">
                <div className="text-md font-semibold group-hover:text-green">
                  GDPR
                </div>
                <div className="text-md tracking-normal text-gray group-hover:text-green">
                  Accelerate compliance with GDPR & CCPA
                </div>
              </div>
            </div>
            <hr />
            <div className="flex items-center gap-4 pt-8">
              <img alt='convertml' 
                className="h-10 w-10 rounded-lg"
                src={"/images/Product_FEATURES_catalog.png"}
              />
              <div className="group">
                <div className="text-md font-semibold group-hover:text-green">
                  Catalog
                </div>
                <div className="text-md tracking-normal text-gray group-hover:text-green">
                  Explore our 100+ data integrations
                </div>
              </div>
            </div>
          </div>
          {/* <div
            className="w-fit bg-pink mt-10 ml-auto px-8 text-lg  font-medium text-white rounded-full py-2 cursor-pointer"
            onClick={toggleModal}
          >
            Roadshow
          </div> */}
        </div>
        <div style={{ width: "400px" }}>
          <ul className="subMenu3">
            <li>
              <a className="OMNICHANNEL submenu3Item">
                <span>EMAIL MARKETING AUTOMATION</span>
              </a>
            </li>
            <li>
              <a className="submenu3Item Email">
                <span>Email Marketing</span>
              </a>
            </li>
            <li>
              <a className="submenu3Item SMS">
                <span>GPT based Content Paraphrasing</span>
              </a>
            </li>
            <li>
              <a className="submenu3Item WhatsApp">
                <span>Personalized Experiences</span>
              </a>
            </li>
            <li>
              <a className="submenu3Item webPush">
                <span>Auto-ML for PLG Use-Cases</span>
              </a>
            </li>
            <li>
              <a className="submenu3Item mobilePush">
                <span>GPT based NLP Queries</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
