import React from "react";
import Demo from "./../../store/Hashtag";

const ChildTablePagination = ({ postsPerPage, totalGridData }) => {
  const pageNumber = [];

  for (let i = 1; i <= Math.ceil(totalGridData / postsPerPage); i++) {
    pageNumber.push(i);
  }
  return (
    <nav>
      <ul className="pagination">
        {pageNumber.map((number) => (
          <li key={number} className="page-item">
            <a href={Demo.BLANK_LINK} className="page-link">
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default ChildTablePagination;

