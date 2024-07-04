import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
// import "./../../styles/navbar.css";
import { Link } from "react-router-dom";

const CompanyModal = ({ handleMouseEnter, closeModal }) => {
  return (
    <div
      className={
        "navItem-box navItem-company w-2/3 max-w-5xl bg-white rounded-xl shadow-xl "
      }
      style={{ zIndex: 100 }}
      onMouseEnter={() => handleMouseEnter("company")}
      onMouseLeave={closeModal}
    >
      <div className="flex justify-center">
        <div className="w-1/2 flex p-8">
          <div className="w-1/2">
            <div className="text-gray text-sm pb-5 font-semibold">ABOUT US</div>
            <div className="space-y-2">
              <div>
                <Link
                  to="/aboutUs"
                  className="flex items-center gap-4 hover:text-green"
                >
                  <LazyLoadImage
                    className="h-8 w-8 rounded-lg"
                    src={"/images/company_company.png"}
                  />
                  <div>Company</div>
                </Link>
              </div>
              {/* <div className="flex items-center gap-4 hover:text-green">
                <LazyLoadImage
                  className="h-8 w-8 rounded-lg"
                  src={"/images/company_careers.png"}
                />
                <div>Careers</div>
              </div> */}
              {/* <div className='flex items-center gap-4'>
                              <LazyLoadImage
                               className='h-8 w-8 bg-gray rounded-lg' src={Company_Aboutus_Presa} />
                              <div>Press</div>
                          </div>*/}
              <div>
                <Link
                  to="/contactus"
                  className="flex items-center gap-4 hover:text-green"
                >
                  <LazyLoadImage
                    className="h-8 w-8 rounded-lg"
                    src={"/images/company_contact.png"}
                  />

                  <div>Contact us</div>
                </Link>
              </div>
              {/* <div className="flex items-center gap-4 hover:text-green">
                <LazyLoadImage
                  className="h-8 w-8 rounded-lg"
                  src={"/images/company_privacy.png"}
                />
                <a
                  href={"/docs/Privacy_Policy.pdf"}
                  target="_blank" rel="noopener noreferrer"
                  rel="noreferrer"
                >
                  Privacy Trust Center
                </a>
              </div> */}
              {/* <div className='flex items-center gap-4'>
                              <LazyLoadImage
                               className='h-8 w-8 rounded-lg' src={Company_Aboutus_OpenSource} />
                              <div>Open Source</div>
                          </div> */}
            </div>
            {/* <div className="text-gray text-sm pt-8 pb-5 font-semibold">
              CSR INITIATIVE
            </div> */}
            {/* <div className="space-y-2">
              <div className="flex items-center gap-4 hover:text-green">
                <LazyLoadImage
                  className="h-8 w-8 rounded-lg"
                  src={"/images/company_womenmark.png"}
                />
                <a
                  href="https://wedistributors.womennovators.com/"
                  target="_blank" rel="noopener noreferrer"
                  rel="noreferrer"
                >
                  Womenmark
                </a>
              </div>
              <div className="flex items-center gap-4 hover:text-green">
                <LazyLoadImage
                  className="h-8 w-8 rounded-lg"
                  src={"/images/company_covid19.png"}
                />
                <a
                  href={"/docs/COVID_Resource_Analysis_Planning_System.pdf"}
                  target="_blank" rel="noopener noreferrer"
                  rel="noreferrer"
                >
                  COVID-19
                </a>
              </div>
              <div className="flex items-center gap-4 hover:text-green">
                <LazyLoadImage
                  className="h-8 w-8 rounded-lg"
                  src={"/images/company_heart.png"}
                />
                <a href={"/docs/Research.pdf"} target="_blank" rel="noopener noreferrer" rel="noreferrer">
                  Heart Attack Prediction
                </a>
              </div>
            </div> */}
          </div>
          <div className="w-1/2">
            <div className="text-gray text-sm pb-5 font-semibold">PARTNERS</div>
            <div className="space-y-2">
              <div className="flex items-center gap-4 hover:text-green">
                <LazyLoadImage
                  className="h-8 w-8 rounded-lg"
                  src={"/images/company_buysell.png"}
                />
                <a
                  href="https://www.rawcubes.com/"
                  target="_blank" rel="noopener noreferrer"
                  rel="noreferrer"
                >
                  Data Management Platform - Rawcubes
                </a>
              </div>
              {/* <div className='flex items-center gap-4'>
                              <LazyLoadImage
                               className='h-8 w-8 rounded-lg' src={Company_Aboutus_Support} />
                              <div>Support Plans</div>
                          </div>
                          <div className='flex items-center gap-4'>
                              <LazyLoadImage
                               className='h-8 w-8 rounded-lg' src={Company_Aboutus_Professional} />
                              <div>Professional Services</div>
                          </div> */}
            </div>
          </div>
        </div>
        <div className="w-1/2 bg-lightGray rounded-r-xl p-8 ">
          <div className="text-gray pb-5 text-sm font-semibold">
            FROM THE BLOG
          </div>
          <div className="flex flex-col gap-5">
            <a
              href="https://business.adobe.com/in/products/real-time-customer-data-platform/RTCDP.html"
              target="_blank" rel="noopener noreferrer"
              rel="noreferrer"
            >
              <div className="flex items-center gap-4">
                <LazyLoadImage
                  className="h-20 w-20 rounded-lg"
                  src={"/images/Blog_Technology_1.jpg"}
                />
                <div className="group">
                  <div className="text-sm p-1 rounded-md text-gray w-min bg-white group-hover:text-green">
                    Technology
                  </div>
                  <div className="text-md tracking-normal text-black group-hover:text-green">
                    Adobe’s Real-time Customer Data Platform
                  </div>
                </div>
              </div>
            </a>
            <a
              href="https://chiefmartec.com/category/the-martech-show/"
              target="_blank" rel="noopener noreferrer"
              rel="noreferrer"
            >
              <div className="flex items-center gap-4 group">
                <LazyLoadImage
                  className="h-20 w-20 rounded-lg"
                  src={"/images/Blog_Marketing_1.jpg"}
                />
                <div>
                  <div className="text-sm p-1 rounded-md text-gray w-min bg-white group-hover:text-green">
                    Marketing
                  </div>
                  <div className="text-md tracking-normal text-black group-hover:text-green">
                    The Martech Show
                  </div>
                </div>
              </div>
            </a>
            <a
              href="https://www.salesforce.com/uk/blog/2016/03/customer-journey-mapping-explained.html"
              target="_blank" rel="noopener noreferrer"
              rel="noreferrer"
            >
              <div className="flex items-center gap-4 group">
                <LazyLoadImage
                  className="h-20 w-20 rounded-lg"
                  src={"/images/Blog_Marketing_2.jpg"}
                />
                <div>
                  <div className="text-sm p-1 rounded-md text-gray w-min bg-white group-hover:text-green">
                    Marketing
                  </div>
                  <div className="text-md tracking-normal text-black group-hover:text-green">
                    What is Customer Journey Mapping?
                  </div>
                </div>
              </div>
            </a>
            <a
              href="https://www.tableau.com/about/blog/2018/11/ask-data-simplifying-analytics-natural-language-98655"
              target="_blank" rel="noopener noreferrer"
              rel="noreferrer"
            >
              <div className="flex items-center gap-4 group">
                <LazyLoadImage
                  className="h-20 w-20 rounded-lg"
                  src={"/images/Blog_Technlogy_2.jpg"}
                />
                <div>
                  <div className="text-sm p-1 rounded-md text-gray w-min bg-white group-hover:text-green">
                    Technology
                  </div>
                  <div className="text-md tracking-normal text-black group-hover:text-green">
                    Text-to-SQL: Business Query
                  </div>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyModal;
