import React from "react";
import Demo from "./../../store/Hashtag";

const CampaignPagination = ({ postsPerPage, totalGridData }) => {
  const pageNumber = [];

  for (let i = 1; i <= Math.ceil(totalGridData / postsPerPage); i++) {
    pageNumber.push(i);
  }
  return (
    <nav>
      <ul className="pagination custpagination">
        {pageNumber.map((number) => (
          <li key={number} className="page-item">
            <a href={Demo.BLANK_LINK} className="page-link" style={{display:"none"}}>
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default CampaignPagination;
