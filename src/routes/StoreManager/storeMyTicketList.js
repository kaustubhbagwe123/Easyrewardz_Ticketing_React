import React, { Component } from "react";
import { Collapse, CardBody, Card } from "reactstrap";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ReactTable from "react-table";
import { Popover } from "antd";
import axios from "axios";
import config from "../../helpers/config";
import CancalImg from "./../../assets/Images/cancal blue.png";
import InfoIcon from "./../../assets/Images/info-icon.png";
import SearchIcon from "./../../assets/Images/search-icon.png";
import { authHeader } from "../../helpers/authHeader";

class storeMyTicketList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      collapseSearch: false,
      SearchTicketData: [],
      ActiveTabId: 101,
      loading: false,
      byNewCount:0,
      byOpenCount:0,
      byResolvedCount:0,
    };
  }

  componentDidMount() {
    this.handleGetStoreTicketGridData();
    this.handleGetStoreTicketTabCount();
  }

  /// handle Get Ticket Drid Data
  handleGetStoreTicketGridData() {
    let self = this;
    this.setState({
      loading: true,
    });
    axios({
      method: "post",
      url: config.apiUrl + "/HSChatTicketing/GetChatTickets",
      headers: authHeader(),
      params: {
        statusID: this.state.ActiveTabId,
      },
    })
      .then(function(res) {
        debugger;
        let Msg = res.data.message;
        let data = res.data.responseData;
        if (Msg === "Success") {
          self.setState({
            SearchTicketData: data,
            loading: false,
          });
        } else {
          self.setState({
            SearchTicketData: [],
            loading: false,
          });
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }
/// handle Get header tab count 
  handleGetStoreTicketTabCount(){
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/HSChatTicketing/ChatTicketStatusCount",
      headers: authHeader(),
    })
      .then(function(res) {
        debugger;
        let Msg = res.data.message;
        let data = res.data.responseData;
        if (Msg === "Success") {
          self.setState({
            byNewCount:data[0].ticketCount,
            byOpenCount:data[1].ticketCount,
            byResolvedCount:data[2].ticketCount,
          });
        } else {
          self.setState({
            SearchTicketData: [],
          });
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }

  /// Handle Toggle Search
  HandleToggleSearch() {
    // this.handleGetSaveSearchList();
    this.setState({ collapseSearch: !this.state.collapseSearch });
    // if (this.state.collapseSearch) {
    //   var paramdata = "";
    //  if (this.state.headerActiveId === 101) {
    //     paramdata = "New";
    //   } else if (this.state.headerActiveId === 102) {
    //     paramdata = "Open";
    //   } else if (this.state.headerActiveId === 103) {
    //     paramdata = "Resolved";
    //   }
    // //   this.handleSearchTicket(paramdata);
    // }
  }

  render() {
    return (
      <div>
        <div className="myticketlist-header">
          <div className="setting-tabs esc esc1">
            <ul
              className="nav nav-tabs upper-tabs es"
              role="tablist"
              style={{ display: "inline" }}
            >
              <li className="nav-item">
                <a
                  className="nav-link"
                  data-toggle="tab"
                  href="#Escalation-tab"
                  role="tab"
                  aria-controls="Escalation-tab"
                  aria-selected="false"
                  name="New"
                  //   onClick={() => {
                  //     this.handleSearchTicket("New");
                  //   }}
                >
                  New:
                  <span className="myTciket-tab-span">
                    {this.state.byNewCount < 9
                      ? "0" + this.state.byNewCount
                      : this.state.byNewCount}
                  </span>
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  data-toggle="tab"
                  href="#Escalation-tab"
                  role="tab"
                  aria-controls="Escalation-tab"
                  aria-selected="false"
                  name="Open"
                  //   onClick={() => {
                  //     this.handleSearchTicket("Open");
                  //   }}
                >
                  Open:{" "}
                  <span className="myTciket-tab-span">
                    {this.state.byOpenCount < 9
                      ? "0" + this.state.byOpenCount
                      : this.state.byOpenCount}
                  </span>
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  data-toggle="tab"
                  href="#Escalation-tab"
                  role="tab"
                  aria-controls="Escalation-tab"
                  aria-selected="false"
                  name="Resolved"
                  //   onClick={() => {
                  //     this.handleSearchTicket("Resolved");
                  //   }}
                >
                  Resolved:{" "}
                  <span className="myTciket-tab-span">
                    {this.state.byResolvedCount < 9
                      ? "0" + this.state.byResolvedCount
                      : this.state.byResolvedCount}
                  </span>
                </a>
              </li>
            </ul>

            <div className="tab-content">
              <div
                className="tab-pane fade show active"
                id="Escalation-tab"
                role="tabpanel"
                aria-labelledby="Escalation-tab"
              >
                <div className="container-fluid">
                  <div
                    className="table-cntr mt-3 mtictab table-responsive"
                    style={{ overflow: "initial" }}
                  >
                    <a
                      href="#!"
                      className="float-search"
                      onClick={this.HandleToggleSearch.bind(this)}
                    >
                      <small>
                        {this.state.collapseSearch
                          ? "Close Search"
                          : "Search Tickets"}
                      </small>
                      {this.state.collapseSearch ? (
                        <img
                          className="search-icon"
                          src={CancalImg}
                          alt="search-icon"
                        />
                      ) : (
                        <img
                          className="search-icon"
                          src={SearchIcon}
                          alt="search-icon"
                        />
                      )}
                    </a>
                    <div>
                      <Collapse isOpen={this.state.collapseSearch}>
                        <Card>
                          <CardBody>
                            <div className="myticlist-expand-sect">
                              <div className="position-relative">
                                <ul
                                  className="nav nav-tabs lower-tabs"
                                  role="tablist"
                                >
                                  <li className="nav-item">
                                    <a
                                      className="nav-link active"
                                      data-toggle="tab"
                                      href="#category-tab"
                                      role="tab"
                                      aria-controls="category-tab"
                                      aria-selected="false"
                                      //   onClick={this.handleAdvSearchFlag}
                                    >
                                      By Category
                                    </a>
                                  </li>
                                </ul>
                                <div className="save-view-search">
                                  <button
                                    type="button"
                                    className="btn-inv"
                                    // onClick={this.ViewSearchData.bind(this, 0)}
                                  >
                                    View Search
                                  </button>
                                </div>
                              </div>

                              <div className="tab-content lower-tabs-pane p-0">
                                <div
                                  className="tab-pane fade show active"
                                  id="category-tab"
                                  role="tabpanel"
                                  aria-labelledby="category-tab"
                                >
                                  <div className="container-fluid">
                                    <div className="row">
                                      <div className="col-md-3 col-sm-6">
                                        <select
                                        //   value={this.state.selectedCategory}
                                        //   onChange={this.setCategoryValue}
                                        >
                                          <option value={0}>Category</option>
                                          {/* {this.state.CategoryData !== null &&
                                            this.state.CategoryData.map(
                                              (item, i) => (
                                                <option
                                                  key={i}
                                                  value={item.categoryID}
                                                >
                                                  {item.categoryName}
                                                </option>
                                              )
                                            )} */}
                                        </select>
                                      </div>
                                      <div className="col-md-3 col-sm-6">
                                        <select
                                        //   value={this.state.selectedSubCategory}
                                        //   onChange={this.setSubCategoryValue}
                                        >
                                          <option value={0}>
                                            Sub Category
                                          </option>
                                          {/* {this.state.SubCategoryData !==
                                            null &&
                                            this.state.SubCategoryData.map(
                                              (item, i) => (
                                                <option
                                                  key={i}
                                                  value={item.subCategoryID}
                                                >
                                                  {item.subCategoryName}
                                                </option>
                                              )
                                            )} */}
                                        </select>
                                      </div>
                                      <div className="col-md-3 col-sm-6">
                                        <select
                                        //   value={this.state.selectedIssueType}
                                        //   onChange={this.setIssueTypeValue}
                                        >
                                          <option value="0">Issue Type</option>
                                          {/* {this.state.IssueTypeData !== null &&
                                            this.state.IssueTypeData.map(
                                              (item, i) => (
                                                <option
                                                  key={i}
                                                  value={item.issueTypeID}
                                                >
                                                  {item.issueTypeName}
                                                </option>
                                              )
                                            )} */}
                                        </select>
                                      </div>
                                      <div className="col-md-3 col-sm-6">
                                        <select
                                        //   value={
                                        //     this.state
                                        //       .selectedTicketStatusByCategory
                                        //   }
                                        //   onChange={
                                        //     this.handleTicketStatusByCategory
                                        //   }
                                        >
                                          <option value="0">
                                            Ticket Status
                                          </option>
                                          {/* {this.state.TicketStatusData !==
                                            null &&
                                            this.state.TicketStatusData.map(
                                              (item, i) => (
                                                <option
                                                  key={i}
                                                  value={item.ticketStatusID}
                                                >
                                                  {item.ticketStatusName}
                                                </option>
                                              )
                                            )} */}
                                        </select>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="container-fluid myticlist-expand-sect">
                                <div className="row common-adv-padd justify-content-between">
                                  <div className="col-auto d-flex align-items-center">
                                    <p className="font-weight-bold mr-3">
                                      <span className="blue-clr">
                                        {/* {this.state.resultCount < 10
                                          ? "0" + this.state.resultCount
                                          : this.state.resultCount} */}
                                        00 &nbsp;
                                      </span>
                                      Results
                                    </p>
                                    <a
                                      href="#!"
                                      className="blue-clr fs-14"
                                      //   onClick={this.clearSearch}
                                    >
                                      CLEAR SEARCH
                                    </a>
                                    &nbsp; &nbsp; &nbsp;
                                  </div>
                                </div>
                              </div>
                            </div>
                          </CardBody>
                        </Card>
                      </Collapse>
                    </div>
                    {this.state.loading === true ? (
                      <div className="loader-icon-cntr">
                        <div className="loader-icon"></div>
                      </div>
                    ) : (
                      <div>
                        <div className="MyTicketListReact cus-head">
                          <ReactTable
                            data={this.state.SearchTicketData}
                            columns={[
                              {
                                Header: (
                                  <span>
                                    <div className="filter-type pink1 pinkmyticket">
                                      <div className="filter-checkbox pink2 pinkmargin">
                                        <input
                                          type="checkbox"
                                          id="fil-aball"
                                          name="ListCheckbox"
                                          //   onChange={this.checkAllCheckbox.bind(
                                          //     this
                                          //   )}
                                        />
                                        <label
                                          htmlFor="fil-aball"
                                          className="ticketid"
                                        >
                                          ID
                                        </label>
                                      </div>
                                    </div>
                                  </span>
                                ),
                                accessor: "ticketID",
                                // Cell: (row) => {
                                //   return (
                                //     <span
                                //       onClick={(e) => this.clickCheckbox(e)}
                                //     >
                                //       <div className="filter-type pink1 pinkmyticket">
                                //         <div className="filter-checkbox pink2 pinkmargin">
                                //           <input
                                //             type="checkbox"
                                //             id={"i" + row.original.ticketID}
                                //             name="ListCheckbox"
                                //             checked={
                                //               this.state.cSelectedRow[
                                //                 row.original.ticketID
                                //               ]
                                //             }
                                //             attrIds={row.original.ticketID}
                                //             onChange={() =>
                                //               this.handelCheckBoxCheckedChange(
                                //                 row.original.ticketID
                                //               )
                                //             }
                                //           />
                                //           <label
                                //             htmlFor={
                                //               "i" + row.original.ticketID
                                //             }
                                //           >
                                //             {row.original.ticketSourceType ===
                                //             "Calls" ? (
                                //               <img
                                //                 src={HeadPhone3}
                                //                 alt="HeadPhone"
                                //                 className="headPhone3"
                                //                 title="Calls"
                                //               />
                                //             ) : row.original
                                //                 .ticketSourceType ===
                                //               "Mails" ? (
                                //               <img
                                //                 src={MailImg}
                                //                 alt="HeadPhone"
                                //                 className="headPhone3"
                                //                 title="Mails"
                                //               />
                                //             ) : row.original
                                //                 .ticketSourceType ===
                                //               "Facebook" ? (
                                //               <img
                                //                 src={FacebookImg}
                                //                 alt="HeadPhone"
                                //                 className="headPhone3"
                                //                 title="Facebook"
                                //               />
                                //             ) : row.original
                                //                 .ticketSourceType ===
                                //               "ChatBot" ? (
                                //               <img
                                //                 src={Chat}
                                //                 alt="HeadPhone"
                                //                 className="headPhone3"
                                //                 title="ChatBot"
                                //               />
                                //             ) : row.original
                                //                 .ticketSourceType ===
                                //               "Twitter" ? (
                                //               <img
                                //                 src={Twitter}
                                //                 alt="HeadPhone"
                                //                 className="headPhone3 black-twitter"
                                //                 title="Twitter"
                                //               />
                                //             ) : null}

                                //             {row.original.ticketID}
                                //           </label>
                                //         </div>
                                //       </div>
                                //     </span>
                                //   );
                                // },
                              },
                              {
                                Header: (
                                  <span>
                                    Status
                                    <FontAwesomeIcon icon={faCaretDown} />
                                  </span>
                                ),
                                accessor: "ticketStatus",
                                Cell: (row) => {
                                  if (row.original.ticketStatus === "Open") {
                                    return (
                                      <span className="table-b table-blue-btn">
                                        <label>
                                          {row.original.ticketStatus}
                                        </label>
                                      </span>
                                    );
                                  } else if (
                                    row.original.ticketStatus === "Resolved"
                                  ) {
                                    return (
                                      <span className="table-b table-green-btn">
                                        <label>
                                          {row.original.ticketStatus}
                                        </label>
                                      </span>
                                    );
                                  } else if (
                                    row.original.ticketStatus === "New"
                                  ) {
                                    return (
                                      <span className="table-b table-yellow-btn">
                                        <label>
                                          {row.original.ticketStatus}
                                        </label>
                                      </span>
                                    );
                                  } else if (
                                    row.original.ticketStatus === "Solved"
                                  ) {
                                    return (
                                      <span className="table-b table-green-btn">
                                        <label>
                                          {row.original.ticketStatus}
                                        </label>
                                      </span>
                                    );
                                  } else {
                                    return (
                                      <span className="table-b table-green-btn">
                                        <label>
                                          {row.original.ticketStatus}
                                        </label>
                                      </span>
                                    );
                                  }
                                },
                              },
                              {
                                Header: <span>Subject</span>,
                                accessor: "message",
                                accessor: "ticketTitle",
                              },
                              {
                                Header: (
                                  <span>
                                    Category
                                    <FontAwesomeIcon icon={faCaretDown} />
                                  </span>
                                ),
                                accessor: "category",
                                sortable: false,
                                Cell: (row) => (
                                  <span className="one-line-outer">
                                    <label className="one-line">
                                      {row.original.category}
                                    </label>
                                    <Popover
                                      content={
                                        <div className="dash-creation-popup-cntr">
                                          <ul className="dash-category-popup dashnewpopup">
                                            <li>
                                              <p>Category</p>
                                              <p>{row.original.category}</p>
                                            </li>
                                            <li>
                                              <p>Sub Category</p>
                                              <p>{row.original.subCategory}</p>
                                            </li>
                                            <li>
                                              <p>Type</p>
                                              <p>{row.original.issueType}</p>
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
                                      />
                                    </Popover>
                                  </span>
                                ),
                              },
                              {
                                Header: (
                                  <span>
                                    Priority
                                    <FontAwesomeIcon icon={faCaretDown} />
                                  </span>
                                ),
                                accessor: "priority",
                                minWidth: 50,
                              },
                              {
                                Header: (
                                  <span>
                                    Assignee
                                    <FontAwesomeIcon icon={faCaretDown} />
                                  </span>
                                ),
                                accessor: "assignTo",
                              },
                              {
                                Header: (
                                  <span>
                                    Creation On
                                    <FontAwesomeIcon icon={faCaretDown} />
                                  </span>
                                ),
                                accessor: "createdOn",
                                Cell: (row) => {
                                  return (
                                    <span className="one-line-outer">
                                      <label className="one-line">
                                        {row.original.createdOn}
                                      </label>
                                      <Popover
                                        content={
                                          <div className="insertpop1">
                                            <ul className="dash-creation-popup">
                                              <li className="title">
                                                Creation details
                                              </li>
                                              <li>
                                                <p>
                                                  {row.original.createdBy}
                                                  &nbsp;Created
                                                </p>
                                                <p>
                                                  {row.original.createdDate}
                                                </p>
                                              </li>

                                              <li>
                                                <p>
                                                  {row.original.updatedBy}
                                                  &nbsp;Updated
                                                </p>
                                                <p>
                                                  {row.original.updatedDate}
                                                </p>
                                              </li>
                                            </ul>
                                          </div>
                                        }
                                        placement="left"
                                      >
                                        <img
                                          className="info-icon info-iconcus"
                                          src={InfoIcon}
                                          alt="info-icon"
                                        />
                                      </Popover>
                                    </span>
                                  );
                                },
                              },
                            ]}
                            resizable={false}
                            defaultPageSize={10}
                            showPagination={true}
                            // getTrProps={this.HandleRowClickPage}
                            minRows={2}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default storeMyTicketList;
