import React from "react";
import Demo from "./../../store/Hashtag";

const ChildTablePagination = ({ ChildPostsPerPage, childTotalGridRecord }) => {
  const pageNumber = [];

  for (let i = 1; i <= Math.ceil(childTotalGridRecord / ChildPostsPerPage); i++) {
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

