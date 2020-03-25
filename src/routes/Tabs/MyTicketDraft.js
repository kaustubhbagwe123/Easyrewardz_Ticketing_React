import React, { Component, Fragment } from "react";
import ReactTable from "react-table";
import InfoIcon from "./../../assets/Images/info-icon.png";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Popover } from "antd";
// import axios from "axios";
// import config from "./../../helpers/config";
import moment from "moment";

class MyTicketDraft extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ticketDetailID: 0,
      customerId:0
    };
  }
  ////handle Row click
  hanldeRowClick = (rowInfo, column) => {
    // debugger;
    if ((rowInfo, column)) {
      return {
        onClick: e => {
          var Id = column.original["ticketId"];
          var CustId = column.original["customerID"];
          var self = this;
          self.setState({
            ticketDetailID: Id,
            customerId:CustId
          });
          setTimeout(function() {
            self.props.history.push({
              pathname: "ticketsystem",
              state: self.state
            });
          }, 1000);
        }
      };
    }
    return {};
  };

  render() {
    var dataDraft = this.props.draftData;
    return (
      <Fragment>
        <div className="container-fluid mt-3">
          <div
            className="MyTicketListReact cus-head"
            style={{ backgroundColor: "#fff" }}
          >
            <ReactTable
              data={dataDraft}
              columns={[
                {
                  Header: <span>TicketTitle</span>,
                  accessor: "ticketTitle"
                },
                {
                  Header: <span>TicketDetail</span>,
                  accessor: "ticketDescription"
                },
                {
                  Header: (
                    <span>
                      Category <FontAwesomeIcon icon={faCaretDown} />
                    </span>
                  ),
                  accessor: "categoryName",
                  Cell: row => {
                    var ids = row.original["ticketId"];
                    return (
                      <span>
                        <label>{row.original.categoryName}</label>
                        <Popover
                          content={
                            <div className="dash-creation-popup-cntr">
                              <ul className="dash-category-popup dashnewpopup">
                                <li>
                                  <p>Category</p>
                                  <p>{row.original.categoryName}</p>
                                </li>
                                <li>
                                  <p>Sub Category</p>
                                  <p>{row.original.subCategoryName}</p>
                                </li>
                                <li>
                                  <p>Type</p>
                                  <p>{row.original.issueTypeName}</p>
                                </li>
                              </ul>
                            </div>
                          }
                          placement="bottom"
                        >
                          <img
                            className="info-icon"
                            src={InfoIcon}
                            alt="info-icon"
                            id={ids}
                          />
                        </Popover>
                      </span>
                    );
                  }
                },
                {
                  Header: (
                    <span>
                      Draft Creation Date
                      <FontAwesomeIcon icon={faCaretDown} />
                    </span>
                  ),
                  accessor: "createdDate",
                  Cell: props => (
                    <span>
                      <label>
                        {moment(props.original.createdDate).format(
                          "DD MMM YYYY"
                        )}
                      </label>
                    </span>
                  )
                }
              ]}
              defaultPageSize={5}
              getTrProps={this.hanldeRowClick}
              showPagination={true}
              minRows={2}
            />
            {/* <div className="position-relative">
            <div className="pagi">
              <ul>
                <li>
                  <a href={Demo.BLANK_LINK}>&lt;</a>
                </li>
                <li>
                  <a href={Demo.BLANK_LINK}>1</a>
                </li>
                <li className="active">
                  <a href={Demo.BLANK_LINK}>2</a>
                </li>
                <li>
                  <a href={Demo.BLANK_LINK}>3</a>
                </li>
                <li>
                  <a href={Demo.BLANK_LINK}>4</a>
                </li>
                <li>
                  <a href={Demo.BLANK_LINK}>5</a>
                </li>
                <li>
                  <a href={Demo.BLANK_LINK}>6</a>
                </li>
                <li>
                  <a href={Demo.BLANK_LINK}>&gt;</a>
                </li>
              </ul>
            </div>
            <div className="item-selection">
              <select>
                <option>30</option>
                <option>50</option>
                <option>100</option>
              </select>
              <p>Items per page</p>
            </div>
          </div> */}
          </div>
        </div>
      </Fragment>
    );
  }
}

export default MyTicketDraft;
