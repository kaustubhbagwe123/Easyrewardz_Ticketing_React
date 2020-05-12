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
import ClaimStatus from "../../routes/ClaimStatus";
import DatePicker from "react-datepicker";
import moment from "moment";

class Claim extends Component {
  constructor(props) {
    super(props);
    this.state = {
      raisedByMeData: [],
      assignToMeData: [],
      statusData: ClaimStatus(),
      claimCategoryName: [],
      claimSubCategoryName: [],
      claimIssueTypeName: [],
      claimUserDate: [],
      categoryID: "",
      subCategoryID: "",
      issueTypeID: "",
      assignToID: 0, 
      raisedByID: 0,
      claimID: "",
      isTicketMapped: "",
      isTaskMapped: "",
      titleID: "",
      taskID: "",
      tabFor: 1,
      statusID: "",
      claimCreateDate: ""
    };
    this.handleOnCategoryChangeData = this.handleOnCategoryChangeData.bind(this);
    this.handleOnSubCategoryChangeData = this.handleOnSubCategoryChangeData.bind(this);
    this.handleOnChangeData = this.handleOnChangeData.bind(this);
  }

  componentDidMount() {
    this.handleGetClaimData(1);
    this.handleGetClaimCategory();
    this.handleGetStoreUser();
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
    this.setState({ isloading: true, FilterCollapse: false, tabFor: tabFor });
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

  handleGetClaimCategory() {
    debugger; 
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/StoreUser/BindStoreClaimCategory",
      params: { BrandIds: "" },
      headers: authHeader()
    })
      .then(function(response) {
        debugger;
        var message = response.data.message;
        var responseData = response.data.responseData;
        if (message === "Success" && responseData.length > 0) {
          self.setState({claimCategoryName: responseData});
        }
      })
      .catch(response => {
        console.log(response);
      });
  }

  handleGetClaimSubCategory() {
    debugger; 
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/StoreUser/BindStoreClaimSubCategory",
      params: { CategoryIDs: this.state.categoryID },
      headers: authHeader()
    })
      .then(function(response) {
        debugger;
        var message = response.data.message;
        var responseData = response.data.responseData;
        if (message === "Success" && responseData.length > 0) {
          self.setState({claimSubCategoryName: responseData});
        }
      })
      .catch(response => {
        console.log(response);
      });
  }

  handleGetClaimIssueType() {
    debugger; 
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/StoreUser/BindStoreClaimIssueType",
      params: { subCategoryIDs: this.state.subCategoryID },
      headers: authHeader()
    })
      .then(function(response) {
        debugger;
        var message = response.data.message;
        var responseData = response.data.responseData;
        if (message === "Success" && responseData.length > 0) {
          self.setState({claimIssueTypeName: responseData});
        }
      })
      .catch(response => {
        console.log(response);
      });
  }

  handleGetStoreUser() {
    debugger; 
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/StoreUser/GetStoreUsers",
      headers: authHeader()
    })
      .then(function(response) {
        debugger;
        var message = response.data.message;
        var responseData = response.data.responseData;
        if (message === "Success" && responseData.length > 0) {
          self.setState({claimUserDate: responseData});
        }
      })
      .catch(response => {
        console.log(response);
      });
  }

  handleOnCategoryChangeData = async (e) => {
    debugger;
    await this.setState({
      [e.target.name]: e.target.value,
      claimSubCategoryName: [],
      claimIssueTypeName: []
    });
    this.handleGetClaimSubCategory();
  }

  handleOnSubCategoryChangeData = async (e) => {
    await this.setState({
      [e.target.name]: e.target.value,
      claimIssueTypeName: []
    });
    this.handleGetClaimIssueType();
  }

  handleOnChangeData(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleClaimCreateDate(name, date) {
    debugger;
    this.setState({ [name]: date });
  }

  handleGetStoreFilterList() {
    debugger; 
    let self = this;
    var finalDate="";
    this.setState({ isloading: true });
    if(this.state.claimCreateDate !== ""){
      finalDate=moment(this.state.claimCreateDate).format('YYYY-MM-DD')
    }else{
      finalDate="";
    }

    axios({
      method: "post",
      url: config.apiUrl + "/StoreDashboard/getstoreDashboardListClaim",
      data: {
        claimID: this.state.claimID === ""?0:parseInt(this.state.claimID),
        ticketID: this.state.titleID === ""?0:parseInt(this.state.titleID),
        claimissueType: this.state.issueTypeID === ""?0:parseInt(this.state.issueTypeID),
        ticketMapped: this.state.isTicketMapped === "yes"?1:0,
        claimsubcat: this.state.subCategoryID === ""?0:parseInt(this.state.subCategoryID),
        assignTo: this.state.assignToID === ""?0:parseInt(this.state.assignToID),
        claimcat: this.state.categoryID === ""?0:parseInt(this.state.categoryID),
        claimraiseddate:finalDate,
        taskID: this.state.taskID === ""?0:parseInt(this.state.taskID),
        claimstatus: this.state.statusID === ""?0:parseInt(this.state.statusID),
        taskmapped: this.state.isTaskMapped === "no"?0:1,
        raisedby: this.state.raisedByID === ""?0:parseInt(this.state.raisedByID)
      },
      headers: authHeader()
    })
      .then(function(response) {
        debugger;
        var message = response.data.message;
        var responseData = response.data.responseData;
        if (message === "Success" && responseData.length > 0) {
          if (self.state.tabFor === 1) {
            self.setState({ raisedByMeData: responseData, isloading: false });
          }
          if (self.state.tabFor === 2) {
            self.setState({ assignToMeData: responseData, isloading: false });
          }
        }else{
          if (self.state.tabFor === 1) {
            self.setState({ raisedByMeData: responseData, isloading: false });
          }
          if (self.state.tabFor === 2) {
            self.setState({ assignToMeData: responseData, isloading: false });
          }
        }
      })
      .catch(response => {
        console.log(response);
      });
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
                                    onClick={this.handleGetStoreFilterList.bind(this)}
                                  >
                                    VIEW SEARCH
                                  </button>
                                </div>
                              </ul>

                              <div className="container-fluid">
                                <div className="row all-row">
                                  <div className="col-md-3">
                                    <input type="text" 
                                    name="claimID"
                                    value={this.state.claimID}
                                    onChange={this.handleOnChangeData} 
                                    autoComplete="off"
                                    placeholder="Claim ID" />
                                    
                                  </div>
                                  <div className="col-md-3">
                                    <select
                                     name="isTicketMapped"
                                     value={this.state.isTicketMapped}
                                     onChange={this.handleOnChangeData} 
                                    >
                                      <option value="">Ticket Mapped</option>
                                      <option value="yes">Yes</option>
                                      <option value="no">No</option>
                                    </select>
                                  </div>
                                  <div className="col-md-3">
                                    <select
                                      name="categoryID"
                                      value={this.state.categoryID}
                                      onChange={this.handleOnCategoryChangeData}
                                    >
                                    <option>Claim Category</option>
                                    {this.state.claimCategoryName !== null &&
                                      this.state.claimCategoryName.map((item, i) => (
                                        <option value={item.categoryID}>{item.categoryName}</option>
                                    ))}
                                    </select>
                                  </div>
                                  <div className="col-md-3">
                                    <select
                                     name="statusID"
                                     value={this.state.statusID}
                                     onChange={this.handleOnChangeData}
                                    >
                                      <option>Claim Status</option>
                                      {this.state.statusData !== null &&
                                        this.state.statusData.map((item, i) => (
                                        <option value={item.claimStatusID}>{item.claimStatusName}</option>
                                      ))}
                                    </select>
                                  </div>
                                  <div className="col-md-3">
                                    <input type="text" 
                                    name="titleID"
                                    value={this.state.titleID}
                                    autoComplete="off"
                                    onChange={this.handleOnChangeData}
                                    placeholder="Title ID" />
                                  </div>
                                  <div className="col-md-3">
                                    <select
                                      name="subCategoryID"
                                      value={this.state.subCategoryID}
                                      onChange={this.handleOnSubCategoryChangeData}
                                    >
                                      <option>Claim Sub Category</option>
                                      {this.state.claimSubCategoryName !== null &&
                                        this.state.claimSubCategoryName.map((item, i) => (
                                         <option value={item.subCategoryID}>{item.subCategoryName}</option>
                                      ))}
                                    </select>
                                  </div>
                                  <div className="col-md-3">
                                  <DatePicker
                                    selected={this.state.claimCreateDate}
                                    value={this.state.claimCreateDate}
                                    onChange={this.handleClaimCreateDate.bind(
                                      this,
                                      "claimCreateDate"
                                    )}
                                    placeholderText="Claim Raised On"
                                    showMonthDropdown
                                    showYearDropdown
                                    dateFormat="dd/MM/yyyy"
                                  />
                                  
                                  </div>
                                  <div className="col-md-3">
                                    <select
                                     name="isTaskMapped"
                                     value={this.state.isTaskMapped}
                                     onChange={this.handleOnChangeData} 
                                    >
                                      <option value="">Task Mapped</option>
                                      <option value="yes">Yes</option>
                                      <option value="no">No</option>
                                    </select>
                                  </div>
                                  <div className="col-md-3">
                                    <select
                                     name="issueTypeID"
                                     value={this.state.issueTypeID}
                                     onChange={this.handleOnChangeData}
                                    >
                                      <option>Claim Issue Type</option>
                                      {this.state.claimIssueTypeName !== null &&
                                        this.state.claimIssueTypeName.map((item, i) => (
                                         <option value={item.issueTypeID}>{item.issueTypeName}</option>
                                      ))}
                                    </select>
                                  </div>
                                  <div className="col-md-3">
                                    <select
                                      name="assignToID"
                                      value={this.state.assignToID}
                                      onChange={this.handleOnChangeData}
                                    >
                                      <option>Assign To</option>
                                      {this.state.claimUserDate !== null &&
                                        this.state.claimUserDate.map((item, i) => (
                                         <option value={item.userID}>{item.userName}</option>
                                      ))}
                                    </select>
                                  </div>
                                  <div className="col-md-3">
                                    <input type="text" 
                                    name="taskID"
                                    value={this.state.taskID}
                                    onChange={this.handleOnChangeData}
                                    autoComplete="off"
                                    placeholder="Task ID" />
                                  </div>
                                  <div className="col-md-3">
                                    <select
                                      name="raisedByID"
                                      value={this.state.raisedByID}
                                      onChange={this.handleOnChangeData}
                                    >
                                      <option>Raised By</option>
                                      {this.state.claimUserDate !== null &&
                                        this.state.claimUserDate.map((item, i) => (
                                         <option value={item.userID}>{item.userName}</option>
                                      ))}
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
                              if(row.original.status !== undefined)
                              {
                              if (row.original.status === "New") {
                                return (
                                  <span className="table-btn table-yellow-btn">
                                    <label>{row.original.status}</label>
                                  </span>
                                );
                              } else if (row.original.status === "Open") {
                                return (
                                  <span className="table-btn table-blue-btn">
                                    <label>{row.original.status}</label>
                                  </span>
                                );
                              } else {
                                return (
                                  <span className="table-btn table-green-btn">
                                    <label>{row.original.status}</label>
                                  </span>
                                );
                              }
                            }
                            else{
                              if (row.original.claimStatus === "New") {
                                return (
                                  <span className="table-btn table-yellow-btn">
                                    <label>{row.original.claimStatus}</label>
                                  </span>
                                );
                              } else if (row.original.claimStatus === "Open") {
                                return (
                                  <span className="table-btn table-blue-btn">
                                    <label>{row.original.claimStatus}</label>
                                  </span>
                                );
                              } else {
                                return (
                                  <span className="table-btn table-green-btn">
                                    <label>{row.original.claimStatus}</label>
                                  </span>
                                );
                              }
                            }
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
                            Cell: (row) => {
                              if (row.original.raiseBy !== undefined) {
                                return row.original.raiseBy
                              }
                              else{
                                return row.original.claimRaisedBy
                              }
                            }
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
                            accessor: "assignTo"
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
                                    onClick={this.handleGetStoreFilterList.bind(this)}
                                  >
                                    VIEW SEARCH
                                  </button>
                                </div>
                              </ul>

                              <div className="container-fluid">
                                <div className="row all-row">
                                  <div className="col-md-3">
                                    <input type="text" 
                                    name="claimID"
                                    value={this.state.claimID}
                                    onChange={this.handleOnChangeData} 
                                    placeholder="Claim ID" />
                                  </div>
                                  <div className="col-md-3">
                                    <select
                                     name="isTicketMapped"
                                     value={this.state.isTicketMapped}
                                     onChange={this.handleOnChangeData} 
                                    >
                                      <option value="">Ticket Mapped</option>
                                      <option value="yes">Yes</option>
                                      <option value="no">No</option>
                                    </select>
                                  </div>
                                  <div className="col-md-3">
                                    <select
                                      name="categoryID"
                                      value={this.state.categoryID}
                                      onChange={this.handleOnCategoryChangeData}
                                    >
                                    <option>Claim Category</option>
                                    {this.state.claimCategoryName !== null &&
                                      this.state.claimCategoryName.map((item, i) => (
                                        <option value={item.categoryID}>{item.categoryName}</option>
                                    ))}
                                    </select>
                                  </div>
                                  <div className="col-md-3">
                                    <select
                                     name="statusID"
                                     value={this.state.statusID}
                                     onChange={this.handleOnChangeData}
                                    >
                                      <option>Claim Status</option>
                                      {this.state.statusData !== null &&
                                        this.state.statusData.map((item, i) => (
                                        <option value={item.claimStatusID}>{item.claimStatusName}</option>
                                      ))}
                                    </select>
                                  </div>
                                  <div className="col-md-3">
                                    <input type="text" 
                                    name="titleID"
                                    value={this.state.titleID}
                                    onChange={this.handleOnChangeData}
                                    placeholder="Title ID" />
                                  </div>
                                  <div className="col-md-3">
                                    <select
                                      name="subCategoryID"
                                      value={this.state.subCategoryID}
                                      onChange={this.handleOnSubCategoryChangeData}
                                    >
                                      <option>Claim Sub Category</option>
                                      {this.state.claimSubCategoryName !== null &&
                                        this.state.claimSubCategoryName.map((item, i) => (
                                         <option value={item.subCategoryID}>{item.subCategoryName}</option>
                                      ))}
                                    </select>
                                  </div>
                                  <div className="col-md-3">
                                  <DatePicker
                                    selected={this.state.claimCreateDate}
                                    value={this.state.claimCreateDate}
                                    onChange={this.handleClaimCreateDate.bind(
                                      this,
                                      "claimCreateDate"
                                    )}
                                    placeholderText="Claim Raised On"
                                    showMonthDropdown
                                    showYearDropdown
                                    dateFormat="dd/MM/yyyy"
                                  />
                                  </div>
                                  <div className="col-md-3">
                                    <select
                                     name="isTaskMapped"
                                     value={this.state.isTaskMapped}
                                     onChange={this.handleOnChangeData} 
                                    >
                                      <option value="">Task Mapped</option>
                                      <option value="yes">Yes</option>
                                      <option value="no">No</option>
                                    </select>
                                  </div>
                                  <div className="col-md-3">
                                    <select
                                     name="issueTypeID"
                                     value={this.state.issueTypeID}
                                     onChange={this.handleOnChangeData}
                                    >
                                      <option>Claim Issue Type</option>
                                      {this.state.claimIssueTypeName !== null &&
                                        this.state.claimIssueTypeName.map((item, i) => (
                                         <option value={item.issueTypeID}>{item.issueTypeName}</option>
                                      ))}
                                    </select>
                                  </div>
                                  <div className="col-md-3">
                                    <select
                                      name="assignToID"
                                      value={this.state.assignToID}
                                      onChange={this.handleOnChangeData}
                                    >
                                      <option>Assign To</option>
                                      {this.state.claimUserDate !== null &&
                                        this.state.claimUserDate.map((item, i) => (
                                         <option value={item.userID}>{item.userName}</option>
                                      ))}
                                    </select>
                                  </div>
                                  <div className="col-md-3">
                                    <input type="text" 
                                    name="taskID"
                                    value={this.state.taskID}
                                    onChange={this.handleOnChangeData}
                                    placeholder="Task ID" />
                                  </div>
                                  <div className="col-md-3">
                                    <select
                                      name="raisedByID"
                                      value={this.state.raisedByID}
                                      onChange={this.handleOnChangeData}
                                    >
                                      <option>Raised By</option>
                                      {this.state.claimUserDate !== null &&
                                        this.state.claimUserDate.map((item, i) => (
                                         <option value={item.userID}>{item.userName}</option>
                                      ))}
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
                              if(row.original.status !== undefined)
                              {
                              if (row.original.status === "New") {
                                return (
                                  <span className="table-btn table-yellow-btn">
                                    <label>{row.original.status}</label>
                                  </span>
                                );
                              } else if (row.original.status === "Open") {
                                return (
                                  <span className="table-btn table-blue-btn">
                                    <label>{row.original.status}</label>
                                  </span>
                                );
                              } else {
                                return (
                                  <span className="table-btn table-green-btn">
                                    <label>{row.original.status}</label>
                                  </span>
                                );
                              }
                              }else{
                              if (row.original.claimStatus === "New") {
                                return (
                                  <span className="table-btn table-yellow-btn">
                                    <label>{row.original.claimStatus}</label>
                                  </span>
                                );
                              } else if (row.original.claimStatus === "Open") {
                                return (
                                  <span className="table-btn table-blue-btn">
                                    <label>{row.original.claimStatus}</label>
                                  </span>
                                );
                              } else {
                                return (
                                  <span className="table-btn table-green-btn">
                                    <label>{row.original.claimStatus}</label>
                                  </span>
                                );
                              }
                            }
                           }
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
