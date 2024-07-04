import React from "react";

const Pagination = ({ postPerPage, totalPosts, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav
      style={{
        display: "flex",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <ul
        style={{
          display: "flex",
          flexDirection: "row",
          width: "15%",
          alignItems: "center",
          justifyContent: "space-around",
          margin: "2vw",
        }}
      >
        {pageNumbers.map((number) => (
          <li
            onClick={() => paginate(number)}
            key={number}
            style={{
              cursor: "pointer",
              border: "1px solid #1A75FF",
              backgroundColor: "#ffffff",
              color: "#1A75FF",
              padding: "0.5vw 1vw",
              marginLeft: "0.5vw",
            }}
          >
            <a className="page-link">{number}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
