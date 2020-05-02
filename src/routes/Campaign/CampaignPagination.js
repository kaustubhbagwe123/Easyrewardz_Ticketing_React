import React from "react";

const CampaignPagination = ({ postsPerPage, totalGridData }) => {
  const pageNumber = [];

  for (let i = 1; i <= Math.ceil(totalGridData / postsPerPage); i++) {
    pageNumber.push(i);
  }
  return (
    <nav>
      <ul className="pagination">
        {pageNumber.map((number) => (
          <li key={number} className="page-item">
            <a href="!#" className="page-link" style={{display:'none'}}>
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default CampaignPagination;
