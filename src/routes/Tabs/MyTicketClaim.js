import React, { Component, Fragment } from "react";
import InfoIcon from "./../../assets/Images/info-icon.png";
import HeadPhone3 from "./../../assets/Images/headphone3.png";
import BlackLeftArrow from "./../../assets/Images/black-left-arrow.png";
import BataShoesIcon from "./../../assets/Images/bata.png";
import { Drawer } from "antd";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { authHeader } from "./../../helpers/authHeader";
import config from "./../../helpers/config";
import ReactTable from "react-table";
import StoreImg from "./../../assets/Images/store.png";
import moment from "moment";
import {
  NotificationContainer,
  NotificationManager
} from "react-notifications";

class MyTicketClaim extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ClaimDetailsModal: false,
      claimAddComment: "",
      claimDetailsData: []
    };

    this.handleGetClaimTabDetails = this.handleGetClaimTabDetails.bind(this);
  }

  componentDidMount() {
    debugger;
    var Id = this.props.claimData;
    this.handleGetClaimTabDetails(Id.ticket_Id);
  }

  handleGetClaimTabDetails(ticket_Id) {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/Task/getclaimlist",
      headers: authHeader(),
      params: {
        TicketId: ticket_Id
      }
    }).then(function(res) {
      debugger;
      let status = res.data.message;
      let data = res.data.responseData;
      if (status === "Record Not Found") {
        self.setState({ claimDetailsData: [] });
      } else {
        self.setState({ claimDetailsData: data });
      }
    });
  }

  handleClaimDetailsModalOpen() {
    this.setState({ ClaimDetailsModal: true });
  }
  handleClaimDetailsModalClose() {
    this.setState({ ClaimDetailsModal: false });
  }
  HandleRowClickDraw = () => {
    return {
      onClick: e => {
        this.handleClaimDetailsModalOpen();
      }
    };
  };
  handleClaimOnChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  handleClaimAddComments() {
    debugger;
    var claimData = this.props.claimData;

    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/Task/AddComment",
      headers: authHeader(),
      params: {
        CommentForId: claimData.ClaimTab,
        Comment: this.state.claimAddComment.trim(),
        Id: 1
      }
    }).then(function(res) {
      debugger;
      let status = res.data.status;
      if (status === true) {
        NotificationManager.success("Comment added successfully.");
      } else {
        NotificationManager.error("Comment not added.");
      }
    });
  }
  render() {
    const dataOrder = [
      {
        taskTitle: "Store door are not working",
        assignTo: "G.Bansal"
      },
      {
        taskTitle: "Supplies are not coming on time",
        assignTo: "A.Bansal"
      },
      {
        taskTitle: "Supplies are not coming on time",
        assignTo: "G.Bansal"
      },
      {
        taskTitle: "Supplies are not coming on time",
        assignTo: "A.Bansal"
      },
      {
        taskTitle: "Supplies are not coming on time",
        assignTo: "A.Bansal"
      }
    ];

    const dataOrder1 = [
      {
        taskTitle: "Store door are not working",
        assignTo: "G.Bansal"
      },
      {
        taskTitle: "Supplies are not coming on time",
        assignTo: "A.Bansal"
      },
      {
        taskTitle: "Supplies are not coming on time",
        assignTo: "G.Bansal"
      },
      {
        taskTitle: "Supplies are not coming on time",
        assignTo: "A.Bansal"
      },
      {
        taskTitle: "Supplies are not coming on time",
        assignTo: "A.Bansal"
      }
    ];

    const columnsOrder1 = [
      {
        Header: <span>SKU</span>,
        accessor: "Sku",
        Cell: row => (
          <span className="add-note">BB332398</span>
          // <div className="filter-checkbox" style={{ marginLeft: "15px" }}>
          //   <input
          //     type="checkbox"
          //     id="fil-number12"
          //     name="filter-type"
          //     style={{ display: "none" }}
          //   //   onChange={() => this.showAddNoteFuncation()}
          //   />
          //   <label htmlFor="fil-number12" style={{ paddingLeft: "25px" }}>
          //     <span className="add-note">BB332398</span>
          //   </label>
          // </div>
        )
      },
      {
        Header: <span>Product Name</span>,
        accessor: "ProName",
        Cell: row => <label>Paper Bag Big</label>
      },
      {
        Header: <span>Price</span>,
        accessor: "Price",
        Cell: row => <label>2999</label>
      },
      {
        Header: <span>Price Paid</span>,
        accessor: "pricePa1",
        Cell: row => <label>2999</label>
      },
      {
        Header: <span>Discount</span>,
        accessor: "dis1",
        Cell: row => <label>0.00</label>
      },
      {
        Header: <span>MOP</span>,
        accessor: "reqSiz",
        Cell: row => <label>Cash</label>
      }
    ];

    const dataTicketClaim = [
      {
        id: "Ta1",
        claimIssue: (
          <label>
            Need to change my shipping address
            <span style={{ display: "block", fontSize: "11px" }}>
              Hope this help, Please rate us
            </span>
          </label>
        ),
        status: <span className="table-btn table-blue-btn">Open</span>,

        creationOn: (
          <div>
            <span>
              12 March 2018
              <img className="info-icon" src={InfoIcon} alt="info-icon" />
              {/* <Popover content={popoverData1} placement="bottom">
              <img
                className="info-icon"
                src={InfoIcon}
                alt="info-icon"
                
              />
            </Popover> */}
            </span>
          </div>
        )
      },
      {
        id: "Ta2",
        claimIssue: (
          <label>
            Need to change my shipping address
            <span style={{ display: "block", fontSize: "11px" }}>
              Hope this help, Please rate us(1 new comment)
            </span>
          </label>
        ),
        status: <span className="table-btn table-yellow-btn">New</span>,
        creationOn: (
          <div>
            <span>
              12 March 2018
              <img className="info-icon" src={InfoIcon} alt="info-icon" />
              {/* <Popover content={popoverData1} placement="bottom">
              <img
                className="info-icon"
                src={InfoIcon}
                alt="info-icon"
                
              />
            </Popover> */}
            </span>
          </div>
        )
      },
      {
        id: "Ta3",
        claimIssue: (
          <label>
            Need to change my shipping address
            <span style={{ display: "block", fontSize: "11px" }}>
              Hope this help, Please rate us
            </span>
          </label>
        ),
        status: <span className="table-btn table-green-btn">Solved</span>,
        creationOn: (
          <div>
            <span>
              12 March 2018
              <img className="info-icon" src={InfoIcon} alt="info-icon" />
              {/* <Popover content={popoverData1} placement="bottom">
              <img
                className="info-icon"
                src={InfoIcon}
                alt="info-icon"
                
              />
            </Popover> */}
            </span>
          </div>
        )
      }
    ];

    const columnsTicketClaim = [
      {
        Header: <span>ID</span>,
        accessor: "ticketClaimID",
        Cell: row => (
          <span>
            <img src={HeadPhone3} alt="HeadPhone" className="headPhone3" />
            {row.original.ticketClaimID}
          </span>
        )
      },
      {
        Header: <span>Status</span>,
        accessor: "taskStatus",
        Cell: row => {
          // <span className="table-btn table-green-btn">
          //   {row.original.taskStatus}
          // </span>
          if (row.original.taskStatus === "New") {
            return (
              <span className="table-btn table-yellow-btn">
                {row.original.taskStatus}
              </span>
            );
          } else if (row.original.taskStatus === "Resolved") {
            return (
              <span className="table-btn table-green-btn">
                {row.original.taskStatus}
              </span>
            );
          }
        }
      },
      {
        Header: <span>Claim Issue Type</span>,
        accessor: "claimIssueType"
      },
      {
        Header: (
          <span>
            Category
            <FontAwesomeIcon icon={faCaretDown} />
          </span>
        ),
        accessor: "category",
        Cell: props => (
          <span>
            <label>{props.original.category} </label>
            <img className="info-icon" src={InfoIcon} alt="info-icon" />
            {/* <Popover content={} placement="bottom">
              <img className="info-icon" src={InfoIcon} alt="info-icon" />
            </Popover> */}
          </span>
        )
      },
      {
        Header: (
          <span>
            Raised By
            <FontAwesomeIcon icon={faCaretDown} />
          </span>
        ),
        accessor: "raisedBy"
        // Cell: row => <label>N Rampal</label>
      },
      {
        Header: (
          <span>
            Creation on
            <FontAwesomeIcon icon={faCaretDown} />
          </span>
        ),
        accessor: "dateformat",
        Cell: props => (
          <div>
            <span>
              {moment(props.original.creation_on).format("DD MMMM YYYY")}
              <img className="info-icon" src={InfoIcon} alt="info-icon" />
              {/* <Popover content={popoverData1} placement="bottom">
              <img
                className="info-icon"
                src={InfoIcon}
                alt="info-icon"
                
              />
            </Popover> */}
            </span>
          </div>
        )
      },
      {
        Header: (
          <span>
            Assign to
            <FontAwesomeIcon icon={faCaretDown} />
          </span>
        ),
        accessor: "assignName"
        // Cell: row => <label>A. Bansal</label>
      }
    ];
    return (
      <Fragment>
        <div className="table-cntr mt-3 MyTicketClaimReact">
          <ReactTable
            data={this.state.claimDetailsData}
            columns={columnsTicketClaim}
            // resizable={false}
            defaultPageSize={3}
            showPagination={false}
            getTrProps={this.HandleRowClickDraw}
          />
        </div>
        <div className="DrawerModal">
          <Drawer
            className="claimTab-drawerModal"
            placement={"right"}
            closable={false}
            // onClose={this.handleClaimDetailsModalClose}
            visible={this.state.ClaimDetailsModal}
          >
            <div style={{ marginLeft: "20px" }}>
              <img
                src={BlackLeftArrow}
                alt="black-left-arrow-icon"
                className="black-left-arrow"
                onClick={this.handleClaimDetailsModalClose.bind(this)}
              />
              <label className="claim-details">Claim Details</label>
            </div>
            <hr className="claimline" />
            <div className="claimrowmargin">
              <label className="id-a-22134">ID - A22134</label>
            </div>

            <div className="row">
              <div className=" col-md-8" style={{ marginLeft: "25px" }}>
                <div className="row">
                  <div className="col-md-3">
                    <label className="claim-category">CLAIM CATEGORY</label>
                  </div>
                  <div className="col-md-3">
                    <label className="claim-category">SUB CATEGORY</label>
                  </div>
                  <div className="col-md-3">
                    <label className="claim-category">CLAIM TYPE</label>
                  </div>
                  <div className="col-md-3">
                    <label className="claim-category">CLAIM ASKED FOR</label>
                  </div>
                </div>
                <div className="row recent">
                  <div className="col-md-3">
                    <label className="recent-orders">RECENT ORDERS</label>
                  </div>
                  <div className="col-md-3">
                    <label className="recent-orders">REFUND</label>
                  </div>
                  <div className="col-md-3">
                    <label className="recent-orders">REFUND</label>
                  </div>
                  <div className="col-md-3">
                    <label className="recent-orders">10</label>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-3">
                    <label className="claim-category">CUSTOMER NAME</label>
                  </div>
                  <div className="col-md-3">
                    <label className="claim-category">PHONE NUMBER</label>
                  </div>
                  <div className="col-md-3">
                    <label className="claim-category">EMAIL</label>
                  </div>
                  <div className="col-md-3">
                    <label className="claim-category">GENDER</label>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-3">
                    <label className="refund">REFUND</label>
                  </div>
                  <div className="col-md-3">
                    <label className="recent-orders">RECENT ORDERS</label>
                  </div>
                  <div className="col-md-3">
                    <label className="refund">REFUND</label>
                  </div>
                  <div className="col-md-3">
                    <label className="refund">10</label>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div>
                  <label className="attached-image">ATTACHED IMAGES</label>
                </div>
                <div className="batashoes-icon">
                  <img src={BataShoesIcon} alt="bata-icon"></img>
                </div>
              </div>
            </div>
            <br />
            <div
              className="claim-status-table"
              style={{ marginLeft: "20px", marginRight: "10px" }}
            >
              <div className="claim-status-table-header">
                <label className="claim-status-open">Claim Status : Open</label>
              </div>

              <div className="row">
                <label className="order-details">Order details</label>
              </div>

              <hr />
              <div className="borderless" style={{ marginLeft: "10px" }}>
                <div className="reacttableclaimdrawer">
                  <ReactTable
                    data={dataOrder}
                    // columns={columnsOrder}
                    columns={[
                      {
                        Header: <span>Invoice Number</span>,
                        accessor: "invoiceNumber",
                        Cell: row => (
                          <span className="add-note">BB332398</span>
                          // <div
                          //   className="filter-checkbox"
                          //   style={{ marginLeft: "15px" }}
                          // >
                          //   <input
                          //     type="checkbox"
                          //     id="fil-number1"
                          //     name="filter-type"
                          //     style={{ display: "none" }}
                          //   />
                          //   <label
                          //     htmlFor="fil-number1"
                          //     style={{ paddingLeft: "25px" }}
                          //   >
                          //     <span className="add-note">BB332398</span>
                          //   </label>
                          // </div>
                        )
                      },
                      {
                        Header: <span>Invoice Date</span>,
                        accessor: "invoiceDate",
                        Cell: row => <label>12 Jan 2019</label>
                      },
                      {
                        Header: <span>Item Count</span>,
                        accessor: "itemCount",
                        Cell: row => <label>02</label>
                      },
                      {
                        Header: <span>Item Price</span>,
                        accessor: "itemPrice",
                        Cell: row => <label>2999</label>
                      },
                      {
                        Header: <span>Price Paid</span>,
                        accessor: "pricePaid",
                        Cell: row => <label>2999</label>
                      },
                      {
                        Header: <span>Store Code</span>,
                        accessor: "storeCode",
                        Cell: row => <label>SB221</label>
                      },
                      {
                        Header: <span>Store Addres</span>,
                        accessor: "storeAddres",
                        Cell: row => (
                          <label>UNIT D-338,| SECOND FLOOR SECTOR 14</label>
                        )
                      }
                    ]}
                    //resizable={false}
                    defaultPageSize={3}
                    showPagination={false}
                    SubComponent={row => {
                      return (
                        <div
                          className="reacttableclaimdrawe"
                          style={{ padding: "20px" }}
                        >
                          <ReactTable
                            data={dataOrder1}
                            columns={columnsOrder1}
                            defaultPageSize={2}
                            showPagination={false}
                          />
                        </div>
                      );
                    }}
                  />
                </div>
                {/* <table className="table">
                  <tbody>
                    <tr>
                      <td>
                        <label className="invoice-number">Invoice number</label>
                      </td>
                      <td>
                        <label className="invoice-date">Invoice Date</label>
                      </td>
                      <td>
                        <label className="item-count">Item Count</label>
                      </td>
                      <td>
                        <label className="item-price">Item Price</label>
                      </td>
                      <td>
                        <label className="price-paid">Price Paid</label>
                      </td>
                      <td>
                        <label className="store-code">Store Code</label>
                      </td>
                      <td>
                        <label className="store-address">Store Address</label>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <label className="bb-332398">BB332398</label>
                      </td>
                      <td>
                        <label className="bb-332398">12 Jan 2019</label>
                      </td>
                      <td>
                        <label className="bb-332398">02</label>
                      </td>
                      <td>
                        <label className="bb-332398">2999</label>
                      </td>
                      <td>
                        <label className="bb-332398">2999</label>
                      </td>
                      <td>
                        <label className="bb-332398">SB221</label>
                      </td>
                      <td>
                        <label className="bb-332398">
                          UNIT D-338, | SECOND FLO
                        </label>
                      </td>
                    </tr>
                  </tbody>
                </table> */}
              </div>
              {/* <div className="row" style={{ marginLeft: "15px" }}>
                <div className="claim-SKU-details-table">
                  <table className="table borderless">
                    <tbody>
                      <tr>
                        <td>
                          <label className="invoice-number">SKU</label>
                        </td>
                        <td>
                          <label className="invoice-number">Product Name</label>
                        </td>
                        <td>
                          <label className="invoice-number">Price</label>
                        </td>
                        <td>
                          <label className="invoice-number">Price Paid</label>
                        </td>
                        <td>
                          <label className="invoice-number">Discount</label>
                        </td>
                        <td>
                          <label className="invoice-number">MOP</label>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <label className="bb-332398">BB332398</label>
                        </td>
                        <td>
                          <label className="bb-332398">Paper Bag Big</label>
                        </td>
                        <td>
                          <label className="bb-332398">2999</label>
                        </td>
                        <td>
                          <label className="bb-332398">2999</label>
                        </td>
                        <td>
                          <label className="bb-332398">0.00</label>
                        </td>
                        <td>
                          <label className="bb-332398">Cash</label>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <label className="bb-332398">BB332398</label>
                        </td>
                        <td>
                          <label className="bb-332398">Paper Bag Big</label>
                        </td>
                        <td>
                          <label className="bb-332398">03</label>
                        </td>
                        <td>
                          <label className="bb-332398">03</label>
                        </td>
                        <td>
                          <label className="bb-332398">0.00</label>
                        </td>
                        <td>
                          <label className="bb-332398">Cash</label>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="claim-status-row"></div>
              </div> */}
            </div>
            <br />
            <div className="row removemarg" style={{ marginLeft: "5px" }}>
              <div className="col-md-5">
                <textarea
                  className="Add-Comments-textarea"
                  placeholder="Add Comments"
                  name="claimAddComment"
                  value={this.state.claimAddComment}
                  onChange={this.handleClaimOnChange}
                ></textarea>
                <div className="row">
                  <div className="col-md-5">
                    <button
                      className="add-comment-button add-comment-text"
                      type="button"
                      onClick={this.handleClaimAddComments.bind(this)}
                    >
                      ADD COMMENT
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="varunoverflow">
                  <div className="row m-t-20 mx-0">
                    <div className="col-xs-6" style={{ display: "contents" }}>
                      <div className="storeImg-drawer">
                        <img
                          src={StoreImg}
                          alt="headphone"
                          className="storeImg"
                        />
                      </div>
                      <label className="varun-taskDrawer">
                        Varun Nagpal
                        <span className="addTask-time-ago">2hr ago</span>
                      </label>

                      <label className="task-drawer-lnl">
                        Hi Diwakar, I really appreciate you joining us at
                        Voucherify! My top priority
                      </label>
                    </div>
                  </div>
                  <div className="row m-t-20 mx-0">
                    <div className="col-xs-6" style={{ display: "contents" }}>
                      <div className="storeImg-drawer">
                        <img
                          src={StoreImg}
                          alt="headphone"
                          className="storeImg"
                        />
                      </div>
                      <label className="varun-taskDrawer">
                        Varun Nagpal
                        <span className="addTask-time-ago">2hr ago</span>
                      </label>

                      <label className="task-drawer-lnl">
                        Hi Diwakar, I really appreciate you joining us at
                        Voucherify! My top priority
                      </label>
                    </div>
                  </div>
                  <div className="row m-t-20 mx-0">
                    <div className="col-xs-6" style={{ display: "contents" }}>
                      <div className="storeImg-drawer">
                        <img
                          src={StoreImg}
                          alt="headphone"
                          className="storeImg"
                        />
                      </div>
                      <label className="varun-taskDrawer">
                        Varun Nagpal
                        <span className="addTask-time-ago">2hr ago</span>
                      </label>

                      <label className="task-drawer-lnl">
                        Hi Diwakar, I really appreciate you joining us at
                        Voucherify! My top priority
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* <div
              className="row"
              style={{ marginLeft: "5px", marginRight: "0px" }}
            >
              <div className="col-md-5">
                <button className="add-comment-button">
                  <label className="add-comment-text">ADD COMMENT</label>
                </button>
              </div>
            </div> */}
          </Drawer>
        </div>
        <NotificationContainer />
      </Fragment>
    );
  }
}

export default MyTicketClaim;
