import React, { Component, Fragment } from "react";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Popover } from "antd";
import ReactTable from "react-table";
import InfoIcon from "./../../assets/Images/info-icon.png";
import HeadphoneImg from "./../../assets/Images/headphone3.png";
import Demo from "./../../store/Hashtag";
import axios from "axios";
import config from "../../helpers/config";
import { authHeader } from "../../helpers/authHeader";
import SearchIcon from "../../assets/Images/search-icon.png";
import { Collapse, CardBody, Card } from "reactstrap";

class Claim extends Component {
  constructor(props) {
    super(props);
    this.state = {
      raisedByMeData: [],
      assignToMeData: [],
    };
  }

  componentDidMount() {
    this.handleGetClaimData(1);
  }

  handlePageChange() {
    this.props.history.push("raiseClaim");
  }
  // handleChangeStoreTask = () => {
  //   this.props.history.push("/store/claimApproveReject");
  // };
  HandleRowClickPage = (rowInfo, column) => {
    return {
      onClick: (e) => {
        var claimID = column.original["claimID"];
        this.handleRedirectToViewStoreClaim(claimID);
        // "/store/claimApproveReject"
      },
    };
  };

  handleRedirectToViewStoreClaim(claimID) {
    debugger;
    this.props.history.push({
      pathname: "claimApproveReject",
      state: { ClaimID: claimID },
    });
  }

  handleGetClaimData(tabFor) {
    debugger;
    this.setState({ isloading: true, FilterCollapse: false });
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/StoreClaim/GetClaimList",
      headers: authHeader(),
      params: { tab_For: tabFor },
    })
      .then(function(response) {
        debugger;
        var message = response.data.message;
        var responseData = response.data.responseData;
        if (message === "Success" && responseData.length > 0) {
          if (tabFor === 1) {
            self.setState({ raisedByMeData: responseData, isloading: false });
          }
          if (tabFor === 2) {
            self.setState({ assignToMeData: responseData, isloading: false });
          }
        } else {
          if (tabFor === 1) {
            self.setState({ raisedByMeData: responseData, isloading: false });
          }
          if (tabFor === 2) {
            self.setState({ assignToMeData: responseData, isloading: false });
          }
        }
      })
      .catch((response) => {
        self.setState({ isloading: false });
        console.log(response, "---handleGetTaskData");
      });
  }

  handleFilterCollapse() {
    this.setState((state) => ({ FilterCollapse: !state.FilterCollapse }));
  }
  render() {
    return (
      <Fragment>
        <div className="store-task-tabs">
          <ul className="nav nav-tabs" role="tablist">
            <li className="nav-item">
              <a
                className="nav-link active"
                data-toggle="tab"
                href="#raised-by-me-tab"
                role="tab"
                aria-controls="raised-by-me-tab"
                aria-selected="true"
                onClick={this.handleGetClaimData.bind(this, 1)}
              >
                Raised by Me
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                data-toggle="tab"
                href="#assigned-to-me-tab"
                role="tab"
                aria-controls="assigned-to-me-tab"
                aria-selected="false"
                onClick={this.handleGetClaimData.bind(this, 2)}
              >
                Assigned To Me
              </a>
            </li>
          </ul>
          <button className="butn" onClick={this.handlePageChange.bind(this)}>
            RAISE CLAIM
          </button>
        </div>
        <div className="tab-content store-task-tab-cont">
          <div
            className="tab-pane fade show active"
            id="raised-by-me-tab"
            role="tabpanel"
            aria-labelledby="raised-by-me-tab"
          >
            <div className="main-Claimdiv">
              <div className="table-cntr StoreRaiseReact">
                {this.state.isloading === true ? (
                  <div className="loader-icon-cntr">
                    <div className="loader-icon"></div>
                  </div>
                ) : (
                  <div>
                    <Collapse isOpen={this.state.FilterCollapse}>
                      <Card>
                        <CardBody>
                          <div className="table-expandable-sctn1">
                            <div className="tab-content p-0">
                              <ul className="nav nav-tabs" role="tablist">
                                <div className="tasksearchdiv">
                                  <button
                                    className="btn-inv"
                                    type="button"
                                    style={{ margin: "10px", width: "180px" }}
                                    // onClick={this.handleViewSearchData.bind(this)}
                                  >
                                    VIEW SEARCH
                                  </button>
                                </div>
                              </ul>

                              <div className="container-fluid">
                                <div className="row all-row">
                                  <div className="col-md-3">
                                    <input type="text" placeholder="Claim ID" />
                                  </div>
                                  <div className="col-md-3">
                                    <select>
                                      <option>Ticket Mapped(Yes-No)</option>
                                    </select>
                                  </div>
                                  <div className="col-md-3">
                                    <select>
                                      <option>Claim Category</option>
                                    </select>
                                  </div>
                                  <div className="col-md-3">
                                    <select>
                                      <option>Claim Status</option>
                                    </select>
                                  </div>
                                  <div className="col-md-3">
                                    <input type="text" placeholder="Title ID" />
                                  </div>
                                  <div className="col-md-3">
                                    <select>
                                      <option>Claim Sub Category</option>
                                    </select>
                                  </div>
                                  <div className="col-md-3">
                                    <select>
                                      <option>Claim Raised On</option>
                                    </select>
                                  </div>
                                  <div className="col-md-3">
                                    <select>
                                      <option>Task Mapped(Yes-No)</option>
                                    </select>
                                  </div>
                                  <div className="col-md-3">
                                    <select>
                                      <option>Claim Issue Type</option>
                                    </select>
                                  </div>
                                  <div className="col-md-3">
                                    <select>
                                      <option>Assign To</option>
                                    </select>
                                  </div>
                                  <div className="col-md-3">
                                    <input type="text" placeholder="Task ID" />
                                  </div>
                                  <div className="col-md-3">
                                    <select>
                                      <option>Raised By</option>
                                    </select>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardBody>
                      </Card>
                    </Collapse>
                    <div
                      className="float-search"
                      onClick={this.handleFilterCollapse.bind(this)}
                    >
                      <small>
                        {this.state.FilterCollapse ? "Close Search" : "Search"}
                      </small>
                      <img
                        className="search-icon"
                        src={SearchIcon}
                        alt="search-icon"
                      />
                    </div>

                    <div className="table-cntr raisereactTable">
                      <ReactTable
                        data={this.state.raisedByMeData}
                        columns={[
                          {
                            Header: (
                              <span>
                                ID <FontAwesomeIcon icon={faCaretDown} />
                              </span>
                            ),
                            accessor: "claimID",
                          },
                          {
                            Header: (
                              <span>
                                Status <FontAwesomeIcon icon={faCaretDown} />
                              </span>
                            ),
                            accessor: "status",
                            Cell: (row) => {
                              return (
                                <span className="table-btn table-blue-btn">
                                  <label>{row.original.status}</label>
                                </span>
                              );
                            },
                          },
                          {
                            Header: (
                              <span>
                                Claim Issue Type{" "}
                                <FontAwesomeIcon icon={faCaretDown} />
                              </span>
                            ),
                            accessor: "issueTypeName",
                          },
                          {
                            Header: (
                              <span>
                                Category <FontAwesomeIcon icon={faCaretDown} />
                              </span>
                            ),
                            accessor: "categoryName",
                            Cell: (row) => {
                              return (
                                <>
                                  {row.original.categoryName}
                                  <Popover
                                    content={
                                      <div className="dash-creation-popup-cntr">
                                        <div>
                                          <b>
                                            <p className="title">Category</p>
                                          </b>
                                          <p className="sub-title">
                                            {row.original.categoryName}
                                          </p>
                                        </div>
                                        <div>
                                          <b>
                                            <p className="title">
                                              Sub Category
                                            </p>
                                          </b>
                                          <p className="sub-title">
                                            {row.original.subCategoryName}
                                          </p>
                                        </div>
                                        <div>
                                          <b>
                                            <p className="title">Type</p>
                                          </b>
                                          <p className="sub-title">
                                            {row.original.issueTypeName}
                                          </p>
                                        </div>
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
                                </>
                              );
                            },
                          },
                          {
                            Header: (
                              <span>
                                Raised by <FontAwesomeIcon icon={faCaretDown} />
                              </span>
                            ),
                            accessor: "raiseBy",
                          },
                          {
                            Header: (
                              <span>
                                Creation on{" "}
                                <FontAwesomeIcon icon={faCaretDown} />
                              </span>
                            ),
                            accessor: "creationOn	",
                            Cell: (row) => {
                              return (
                                <div>
                                  <span>
                                    {row.original.creationOn}
                                    <Popover
                                      content={
                                        <div className="dash-creation-popup-cntr">
                                          <ul className="dash-creation-popup">
                                            <li className="title">
                                              Creation details
                                            </li>
                                            <li>
                                              <p>
                                                {row.original.raiseBy + " "}{" "}
                                                Created
                                              </p>
                                              <p>2 Hrs ago</p>
                                            </li>
                                            <li>
                                              <p>
                                                Assigned to{" "}
                                                {" " + row.original.assignTo}
                                              </p>
                                              <p>1.5 Hrs ago</p>
                                            </li>
                                            <li>
                                              <p>Vikas updated</p>
                                              <p>1 Hr ago</p>
                                            </li>
                                            <li>
                                              <p>Response time remaining by</p>
                                              <p>30 mins</p>
                                            </li>
                                            <li>
                                              <p>Response overdue by</p>
                                              <p>1 Hr</p>
                                            </li>
                                            <li>
                                              <p>Resolution overdue by</p>
                                              <p>2 Hrs</p>
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
                                </div>
                              );
                            },
                          },
                          {
                            Header: (
                              <span>
                                Assign to
                                <FontAwesomeIcon icon={faCaretDown} />
                              </span>
                            ),
                            accessor: "assignTo",
                            // Cell: (props) => (
                            //   <span>
                            //     <label>A, Bansal</label>
                            //   </span>
                            // ),
                          },
                        ]}
                        // resizable={false}
                        defaultPageSize={10}
                        minRows={2}
                        showPagination={true}
                        getTrProps={this.HandleRowClickPage}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div
            className="tab-pane fade"
            id="assigned-to-me-tab"
            role="tabpanel"
            aria-labelledby="assigned-to-me-tab"
          >
            <div className="main-Claimdiv">
              <div className="table-cntr StoreRaiseReact">
                {this.state.isloading === true ? (
                  <div className="loader-icon-cntr">
                    <div className="loader-icon"></div>
                  </div>
                ) : (
                  <div>
                    <Collapse isOpen={this.state.FilterCollapse}>
                      <Card>
                        <CardBody>
                          <div className="table-expandable-sctn1">
                            <div className="tab-content p-0">
                              <ul className="nav nav-tabs" role="tablist">
                                <div className="tasksearchdiv">
                                  <button
                                    className="btn-inv"
                                    type="button"
                                    style={{ margin: "10px", width: "180px" }}
                                    // onClick={this.handleViewSearchData.bind(this)}
                                  >
                                    VIEW SEARCH
                                  </button>
                                </div>
                              </ul>

                              <div className="container-fluid">
                                <div className="row all-row">
                                  <div className="col-md-3">
                                    <input type="text" placeholder="Claim ID" />
                                  </div>
                                  <div className="col-md-3">
                                    <select>
                                      <option>Ticket Mapped(Yes-No)</option>
                                    </select>
                                  </div>
                                  <div className="col-md-3">
                                    <select>
                                      <option>Claim Category</option>
                                    </select>
                                  </div>
                                  <div className="col-md-3">
                                    <select>
                                      <option>Claim Status</option>
                                    </select>
                                  </div>
                                  <div className="col-md-3">
                                    <input type="text" placeholder="Title ID" />
                                  </div>
                                  <div className="col-md-3">
                                    <select>
                                      <option>Claim Sub Category</option>
                                    </select>
                                  </div>
                                  <div className="col-md-3">
                                    <select>
                                      <option>Claim Raised On</option>
                                    </select>
                                  </div>
                                  <div className="col-md-3">
                                    <select>
                                      <option>Task Mapped(Yes-No)</option>
                                    </select>
                                  </div>
                                  <div className="col-md-3">
                                    <select>
                                      <option>Claim Issue Type</option>
                                    </select>
                                  </div>
                                  <div className="col-md-3">
                                    <select>
                                      <option>Assign To</option>
                                    </select>
                                  </div>
                                  <div className="col-md-3">
                                    <input type="text" placeholder="Task ID" />
                                  </div>
                                  <div className="col-md-3">
                                    <select>
                                      <option>Raised By</option>
                                    </select>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardBody>
                      </Card>
                    </Collapse>
                    <div
                      className="float-search"
                      onClick={this.handleFilterCollapse.bind(this)}
                    >
                      <small>Search</small>
                      <img
                        className="search-icon"
                        src={SearchIcon}
                        alt="search-icon"
                      />
                    </div>

                    <div className="table-cntr raisereactTable">
                      <ReactTable
                        data={this.state.assignToMeData}
                        columns={[
                          {
                            Header: (
                              <span>
                                ID <FontAwesomeIcon icon={faCaretDown} />
                              </span>
                            ),
                            accessor: "claimID",
                          },
                          {
                            Header: (
                              <span>
                                Status <FontAwesomeIcon icon={faCaretDown} />
                              </span>
                            ),
                            accessor: "status",
                            Cell: (row) => {
                              return (
                                <span className="table-btn table-blue-btn">
                                  <label>{row.original.status}</label>
                                </span>
                              );
                            },
                          },
                          {
                            Header: (
                              <span>
                                Claim Issue Type{" "}
                                <FontAwesomeIcon icon={faCaretDown} />
                              </span>
                            ),
                            accessor: "issueTypeName",
                          },
                          {
                            Header: (
                              <span>
                                Category <FontAwesomeIcon icon={faCaretDown} />
                              </span>
                            ),
                            accessor: "categoryName",
                            Cell: (row) => {
                              return (
                                <>
                                  {row.original.categoryName}
                                  <Popover
                                    content={
                                      <div className="dash-creation-popup-cntr">
                                        <div>
                                          <b>
                                            <p className="title">Category</p>
                                          </b>
                                          <p className="sub-title">
                                            Defective article
                                          </p>
                                        </div>
                                        <div>
                                          <b>
                                            <p className="title">
                                              Sub Category
                                            </p>
                                          </b>
                                          <p className="sub-title">
                                            Customer wants refund
                                          </p>
                                        </div>
                                        <div>
                                          <b>
                                            <p className="title">Type</p>
                                          </b>
                                          <p className="sub-title">Delivery</p>
                                        </div>
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
                                </>
                              );
                            },
                          },
                          {
                            Header: (
                              <span>
                                Raised by <FontAwesomeIcon icon={faCaretDown} />
                              </span>
                            ),
                            accessor: "raiseBy",
                          },
                          {
                            Header: (
                              <span>
                                Creation on{" "}
                                <FontAwesomeIcon icon={faCaretDown} />
                              </span>
                            ),
                            accessor: "creationOn	",
                            Cell: (row) => {
                              return (
                                <div>
                                  <span>
                                    {row.original.creationOn}
                                    <Popover
                                      content={
                                        <div className="dash-creation-popup-cntr">
                                          <ul className="dash-creation-popup">
                                            <li className="title">
                                              Creation details
                                            </li>
                                            <li>
                                              <p>
                                                {row.original.raiseBy + " "}{" "}
                                                Created
                                              </p>
                                              <p>2 Hrs ago</p>
                                            </li>
                                            <li>
                                              <p>
                                                Assigned to{" "}
                                                {" " + row.original.assignTo}
                                              </p>
                                              <p>1.5 Hrs ago</p>
                                            </li>
                                            <li>
                                              <p>Vikas updated</p>
                                              <p>1 Hr ago</p>
                                            </li>
                                            <li>
                                              <p>Response time remaining by</p>
                                              <p>30 mins</p>
                                            </li>
                                            <li>
                                              <p>Response overdue by</p>
                                              <p>1 Hr</p>
                                            </li>
                                            <li>
                                              <p>Resolution overdue by</p>
                                              <p>2 Hrs</p>
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
                                </div>
                              );
                            },
                          },
                          {
                            Header: (
                              <span>
                                Assign to
                                <FontAwesomeIcon icon={faCaretDown} />
                              </span>
                            ),
                            accessor: "assignTo",
                            // Cell: (props) => (
                            //   <span>
                            //     <label>A, Bansal</label>
                            //   </span>
                            // ),
                          },
                        ]}
                        // resizable={false}
                        defaultPageSize={10}
                        minRows={2}
                        showPagination={true}
                        getTrProps={this.HandleRowClickPage}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}
export default Claim;
