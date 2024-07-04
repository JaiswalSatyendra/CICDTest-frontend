import React, { useCallback, useEffect, useRef, useState } from "react"; 
import { blogListData } from "../../../assets/data/blog";
import { Link } from "react-router-dom";
import { Grid } from "@mui/material";

const RightNavbar = () => { 
    const [scroll, setScroll] = useState(false);
    const blogList= blogListData
    useEffect(() => {
        window.addEventListener("scroll", () => {
          setScroll(window.scrollY > 50);
        });
      }, []);
      const sections = document.querySelectorAll("section[id]");
window.addEventListener("scroll", navHighlighter);

function navHighlighter() {  
  let scrollY = window.pageYOffset;  
  sections.forEach(current => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 50;
    const sectionId = current.getAttribute("id");      
    if (
      scrollY > sectionTop &&
      scrollY <= sectionTop + sectionHeight
    ){
      document.querySelector(".localPageNav a[href*=" + sectionId + "]").classList.add("active");
    } else {
      document.querySelector(".localPageNav a[href*=" + sectionId + "]").classList.remove("active");
    }
  });
} 
  return (
    <>
  <div className={scroll ? "page-local-nav-fixed blog-rightnav" : "page-local-nav  blog-rightnav"}>
  <div className="socialMediaIcons" >
  <span className="float-left mt-1">Share</span>
                <a
                  href="https://www.linkedin.com/company/convertml/"
                  target="_blank" rel="noopener noreferrer"
                  rel="noreferrer" 
                > 
                  <img src={"/images/linkden.png"} alt='convertml' />
                  <a />
                </a> 
              </div>
            <h3>Recent Posts</h3>
            <ul>
            {blogList.map((blog) => (
            <li>  <Link to={blog.path}>  {blog.name} </Link> </li>
            ))} 
            </ul>
            </div>
    </>
  );
};

export default RightNavbar;
