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

class Claim extends Component {
  constructor(props) {
    super(props);
    this.state = {
      raisedByMeData: [],
      assignToMeData: []
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
      onClick: e => {
        var claimID = column.original["claimID"];
        this.handleRedirectToViewStoreClaim(claimID); 
        // "/store/claimApproveReject"
       }
      }
    };

  handleRedirectToViewStoreClaim(claimID) {
    debugger;
    this.props.history.push({
      pathname: "claimApproveReject",
      state: { ClaimID: claimID }
    })
  }

  handleGetClaimData(tabFor) {
    debugger;
    this.setState({ isloading: true });
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/StoreClaim/GetClaimList",
      headers: authHeader(),
      params: { tab_For: tabFor }
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
      .catch(response => {
        self.setState({ isloading: false });
        console.log(response, "---handleGetTaskData");
      });
  }

  render() {
    // const dataStoreRaise = [
    //   {
    //     id: "Cl1",
    //     status: <span className="table-btn table-blue-btn">Open</span>,
    //     claimIsType: <label>Borken shoes in 30 days</label>,
    //     assignTo: <label>A. Bansal</label>
    //   },
    //   {
    //     id: "Cl2",
    //     status: <span className="table-btn table-blue-btn">New</span>,
    //     claimIsType: <label>Wrong Size</label>,
    //     assignTo: <label>G. Bansal</label>
    //   },
    //   {
    //     id: "Cl3",
    //     status: <span className="table-btn table-green-btn">Solved</span>,
    //     claimIsType: <label>Borken shoes in 30 days</label>,
    //     assignTo: <label>G. Bansal</label>
    //   },
    //   {
    //     id: "Cl4",
    //     status: <span className="table-btn table-blue-btn">Open</span>,
    //     claimIsType: (
    //       <label>
    //         Need to change my shipping address
    //         <span className="hope">Hope this help,Please rate us</span>
    //       </label>
    //     ),
    //     assignTo: <label>A. Bansal</label>
    //   },
    //   {
    //     id: "Cl5",
    //     status: <span className="table-btn table-blue-btn">Open</span>,
    //     claimIsType: (
    //       <label>
    //         Need to change my shipping address
    //         <span className="hope">Hope this help,Please rate us</span>
    //       </label>
    //     ),
    //     assignTo: <label>G. Bansal</label>
    //   },
    //   {
    //     id: "Cl5",
    //     status: <span className="table-btn table-green-btn">New</span>,
    //     claimIsType: (
    //       <label>
    //         Need to change my shipping address
    //         <span className="hope">Hope this help,Please rate us</span>
    //       </label>
    //     ),
    //     assignTo: <label>G. Bansal</label>
    //   },
    //   {
    //     id: "Cl5",
    //     status: <span className="table-btn table-green-btn">Solved</span>,
    //     claimIsType: (
    //       <label>
    //         Need to change my shipping address
    //         <span className="hope">Hope this help,Please rate us</span>
    //       </label>
    //     ),
    //     assignTo: <label>G. Bansal</label>
    //   }
    // ];

    // const columnsStoreRaise = [
    //   {
    //     Header: <span>ID</span>,
    //     accessor: "id",
    //     Cell: row => (
    //       <span>
    //         <img src={HeadphoneImg} alt="HeadPhone" className="headPhone3" />
    //         <label>ABC1234</label>
    //       </span>
    //     )
    //   },
    //   {
    //     Header: <span>Status</span>,
    //     accessor: "status"
    //   },
    //   {
    //     Header: <span>Claim Issue Type</span>,
    //     accessor: "claimIsType"
    //   },
    //   {
    //     Header: (
    //       <span>
    //         Category
    //         <FontAwesomeIcon icon={faCaretDown} />
    //       </span>
    //     ),
    //     accessor: "Cate",
    //     Cell: row => {
    //       var ids = row.original["id"];
    //       return (
    //         <div>
    //           <span>
    //             Defective article
    //             <Popover content={popoverData} placement="bottom">
    //               <img
    //                 className="info-icon"
    //                 src={InfoIcon}
    //                 alt="info-icon"
    //                 id={ids}
    //               />
    //             </Popover>
    //           </span>
    //         </div>
    //       );
    //     }
    //   },
    //   {
    //     Header: (
    //       <span>
    //         Raised by
    //         <FontAwesomeIcon icon={faCaretDown} />
    //       </span>
    //     ),
    //     accessor: "raiseBy",
    //     Cell: row => <span>N Rampal</span>
    //   },
    //   {
    //     Header: (
    //       <span>
    //         Creation on
    //         <FontAwesomeIcon icon={faCaretDown} />
    //       </span>
    //     ),
    //     accessor: "creaOn",
    //     Cell: row => {
    //       var ids = row.original["id"];
    //       return (
    //         <div>
    //           <span>
    //             12 March 2019
    //             <Popover content={popoverDataDate} placement="bottom">
    //               <img
    //                 className="info-icon"
    //                 src={InfoIcon}
    //                 alt="info-icon"
    //                 id={ids}
    //               />
    //             </Popover>
    //           </span>
    //         </div>
    //       );
    //     }
    //   },
    //   {
    //     Header: (
    //       <span>
    //         Assign to
    //         <FontAwesomeIcon icon={faCaretDown} />
    //       </span>
    //     ),
    //     accessor: "assignTo"
    //   }
    // ];

    // const popoverData = (
    //   <>
    //     <div>
    //       <b>
    //         <p className="title">Category</p>
    //       </b>
    //       <p className="sub-title">Defective article</p>
    //     </div>
    //     <div>
    //       <b>
    //         <p className="title">Sub Category</p>
    //       </b>
    //       <p className="sub-title">Customer wants refund</p>
    //     </div>
    //     <div>
    //       <b>
    //         <p className="title">Type</p>
    //       </b>
    //       <p className="sub-title">Delivery</p>
    //     </div>
    //   </>
    // );
    // const popoverDataDate = (
    //   <>
    //     <div className="dash-creation-popup-cntr">
    //       <ul className="dash-creation-popup">
    //         <li className="title">Creation details</li>
    //         <li>
    //           <p>Naman Created</p>
    //           <p>2 Hrs ago</p>
    //         </li>
    //         <li>
    //           <p>Assigned to Vikas</p>
    //           <p>1.5 Hrs ago</p>
    //         </li>
    //         <li>
    //           <p>Vikas updated</p>
    //           <p>1 Hr ago</p>
    //         </li>
    //         <li>
    //           <p>Response time remaining by</p>
    //           <p>30 mins</p>
    //         </li>
    //         <li>
    //           <p>Response overdue by</p>
    //           <p>1 Hr</p>
    //         </li>
    //         <li>
    //           <p>Resolution overdue by</p>
    //           <p>2 Hrs</p>
    //         </li>
    //       </ul>
    //     </div>
    //   </>
    // );

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
                {/* <ReactTable
                  data={dataStoreRaise}
                  columns={columnsStoreRaise}
                  // resizable={false}
                  defaultPageSize={8}
                  showPagination={false}
                  getTrProps={this.HandleRowClickPage}
                /> */}
                {this.state.isloading === true ? (
                  <div className="loader-icon-cntr">
                    <div className="loader-icon"></div>
                  </div>
                ) : (
                  <div className="table-cntr raisereactTable">
                    <ReactTable
                      data={this.state.raisedByMeData}
                      columns={[
                        {
                          Header: <span>ID <FontAwesomeIcon icon={faCaretDown} /></span>,
                          accessor: "claimID"
                        },
                        {
                          Header: <span>Status <FontAwesomeIcon icon={faCaretDown} /></span>,
                          accessor: "status",
                          Cell: row => {
                            return (
                              <span className="table-btn table-blue-btn">
                                <label>{row.original.status}</label>
                              </span>
                            );
                          }
                        },
                        {
                          Header: <span>Claim Issue Type <FontAwesomeIcon icon={faCaretDown} /></span>,
                          accessor: "issueTypeName"
                        },
                        {
                          Header: (
                            <span>
                              Category <FontAwesomeIcon icon={faCaretDown} />
                            </span>
                          ),
                          accessor: "categoryName",
                          Cell: row => {
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
                                  <p className="sub-title">{row.original.categoryName}</p>
                                    </div>
                                    <div>
                                      <b>
                                        <p className="title">Sub Category</p>
                                      </b>
                                      <p className="sub-title">{row.original.subCategoryName}</p>
                                    </div>
                                    <div>
                                      <b>
                                        <p className="title">Type</p>
                                      </b>
                                      <p className="sub-title">{row.original.issueTypeName}</p>
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
                          }
                        },
                        {
                          Header: (
                            <span>
                              Raised by <FontAwesomeIcon icon={faCaretDown} />
                            </span>
                          ),
                          accessor: "raiseBy"
                        },
                        {
                          Header: (
                            <span>
                              Creation on <FontAwesomeIcon icon={faCaretDown} />
                            </span>
                          ),
                          accessor: "creationOn	",
                          Cell: row =>  {
                            return (
                            <div>
                              <span>
                               {row.original.creationOn}
                                <Popover content={<div className="dash-creation-popup-cntr">
                                  <ul className="dash-creation-popup">
                                    <li className="title">Creation details</li>
                                    <li>
                                      <p>Naman Created</p>
                                      <p>2 Hrs ago</p>
                                    </li>
                                    <li>
                                      <p>Assigned to Vikas</p>
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
                                </div>} placement="bottom">
                                </Popover>
                              </span>
                            </div>
                          );
                        }
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
                        }
                      ]}
                      // resizable={false}
                      defaultPageSize={10}
                      minRows={2}
                      showPagination={true}
                      getTrProps={this.HandleRowClickPage}
                    />
                  </div>
                )}
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
          </div>
          <div
            className="tab-pane fade"
            id="assigned-to-me-tab"
            role="tabpanel"
            aria-labelledby="assigned-to-me-tab"
          >
            <div className="main-Claimdiv">
              <div className="table-cntr StoreRaiseReact">
                {/* <ReactTable
                  data={dataStoreRaise}
                  columns={columnsStoreRaise}
                  // resizable={false}
                  defaultPageSize={8}
                  showPagination={false}
                />
                 <div className="position-relative">
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
                  {this.state.isloading === true ? (
                  <div className="loader-icon-cntr">
                    <div className="loader-icon"></div>
                  </div>
                  ) : (
                    <div className="table-cntr raisereactTable">
                      <ReactTable
                        data={this.state.assignToMeData}
                        columns={[
                          {
                            Header: <span>ID <FontAwesomeIcon icon={faCaretDown} /></span>,
                            accessor: "claimID"
                          },
                          {
                            Header: <span>Status <FontAwesomeIcon icon={faCaretDown} /></span>,
                            accessor: "status",
                            Cell: row => {
                              return (
                                <span className="table-btn table-blue-btn">
                                  <label>{row.original.status}</label>
                                </span>
                              );
                            }
                          },
                          {
                            Header: <span>Claim Issue Type <FontAwesomeIcon icon={faCaretDown} /></span>,
                            accessor: "issueTypeName"
                          },
                          {
                            Header: (
                              <span>
                                Category <FontAwesomeIcon icon={faCaretDown} />
                              </span>
                            ),
                            accessor: "categoryName",
                            Cell: row => {
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
                                        <p className="sub-title">Defective article</p>
                                      </div>
                                      <div>
                                        <b>
                                          <p className="title">Sub Category</p>
                                        </b>
                                        <p className="sub-title">Customer wants refund</p>
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
                            }
                          },
                          {
                            Header: (
                              <span>
                                Raised by <FontAwesomeIcon icon={faCaretDown} />
                              </span>
                            ),
                            accessor: "raiseBy"
                          },
                          {
                            Header: (
                              <span>
                                Creation on <FontAwesomeIcon icon={faCaretDown} />
                              </span>
                            ),
                            accessor: "creationOn	",
                            Cell: row =>  {
                              return (
                              <div>
                                <span>
                                {row.original.creationOn}
                                  <Popover content={<div className="dash-creation-popup-cntr">
                                    <ul className="dash-creation-popup">
                                      <li className="title">Creation details</li>
                                      <li>
                                        <p>Naman Created</p>
                                        <p>2 Hrs ago</p>
                                      </li>
                                      <li>
                                        <p>Assigned to Vikas</p>
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
                                  </div>} placement="bottom">
                                  </Popover>
                                </span>
                              </div>
                            );
                          }
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
                          }
                        ]}
                        // resizable={false}
                        defaultPageSize={10}
                        minRows={2}
                        showPagination={true}
                        getTrProps={this.HandleRowClickPage}
                      />
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
