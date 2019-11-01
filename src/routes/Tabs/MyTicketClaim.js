import React, { Component, Fragment } from "react";
import TableArrowIcon from "./../../assets/Images/table-arr.png";
import InfoIcon from "./../../assets/Images/info-icon.png";
import HeadPhone3 from "./../../assets/Images/headphone3.png";
import BlackLeftArrow from "./../../assets/Images/black-left-arrow.png";
import BataShoesIcon from "./../../assets/Images/bata.png";
import StoreIcon from "./../../assets/Images/store.png";
import { Drawer } from "antd";

class MyTicketClaim extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ClaimDetailsModal: false
    };
  }
  handleClaimDetailsModalOpen() {
    this.setState({ ClaimDetailsModal: true });
  }
  handleClaimDetailsModalClose() {
    this.setState({ ClaimDetailsModal: false });
  }
  render() {
    return (
      <Fragment>
        <div className="row table-cntr mt-3">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Status</th>
                <th className="table-img-cntr"></th>
                <th>Claim Issue Type</th>
                <th>
                  Category <img src={TableArrowIcon} alt="table-arr-icon" />
                </th>
                <th>
                  Raised by
                  <img src={TableArrowIcon} alt="table-arr-icon" />
                </th>
                <th>
                  Creation on
                  <img src={TableArrowIcon} alt="table-arr-icon" />
                </th>
                <th>
                  Assign to
                  <img src={TableArrowIcon} alt="table-arr-icon" />
                </th>
              </tr>
            </thead>
            <tbody>
              <tr onClick={this.handleClaimDetailsModalOpen.bind(this)}>
                <td>
                  <img
                    src={HeadPhone3}
                    alt="HeadPhone"
                    className="headPhone3"
                  />
                  ABC1234
                </td>
                <td>
                  <span className="table-btn table-blue-btn">Open</span>
                </td>
                <td className="table-img-cntr"></td>
                <td>
                  Need to change my shipping address
                  <span>Hope this help, Please rate us</span>
                </td>
                <td>
                  Defective article
                  <img className="info-icon" src={InfoIcon} alt="info-icon" />
                </td>
                <td>N Rampal</td>
                <td>
                  12 March 2018
                  <img className="info-icon" src={InfoIcon} alt="info-icon" />
                </td>
                <td>A. Bansal</td>
              </tr>
              <tr>
                <td>
                  <img
                    src={HeadPhone3}
                    alt="HeadPhone"
                    className="headPhone3"
                  />
                  ABC1234
                </td>
                <td>
                  <span className="table-btn table-yellow-btn">New</span>
                </td>
                <td className="table-img-cntr"></td>
                <td>
                  Need to change my shipping address
                  <span>Hope this help, Please rate us (1 new comment)</span>
                </td>
                <td>
                  Defective article
                  <img className="info-icon" src={InfoIcon} alt="info-icon" />
                </td>
                <td>N Rampal</td>
                <td>
                  12 March 2018
                  <img className="info-icon" src={InfoIcon} alt="info-icon" />
                </td>
                <td>G. Bansal</td>
              </tr>

              <tr>
                <td>
                  <img
                    src={HeadPhone3}
                    alt="HeadPhone"
                    className="headPhone3"
                  />
                  ABC1234
                </td>
                <td>
                  <span className="table-btn table-green-btn">Solved</span>
                </td>
                <td className="table-img-cntr">
                  {/* <img
                          className="task-icon-1"
                          src="Images/task-icon-blue.png"
                          alt="missing"
                        /> */}
                </td>
                <td>
                  Need to change my shipping address
                  <span>Hope this help, Please rate us</span>
                </td>
                <td>
                  Defective article
                  <img className="info-icon" src={InfoIcon} alt="info-icon" />
                </td>
                <td>N Rampal</td>
                <td>
                  12 March 2018
                  <img className="info-icon" src={InfoIcon} alt="info-icon" />
                </td>
                <td>G. Bansal</td>
              </tr>
            </tbody>
          </table>
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
                <table className="table">
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
                </table>
              </div>
              <div className="row" style={{ marginLeft: "15px" }}>
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
              </div>
            </div>
            <br />
            <div className="row removemarg" style={{ marginLeft: "5px" }}>
              <div className="col-md-5">
                <textarea
                  className="Add-Comments-textarea"
                  placeholder="Add Comments"
                ></textarea>
              </div>
              <div className="col-md-7">
                <div className="row">
                  <div className="col-md-2">
                    <div className="oval-5-1-new">
                      <img
                        src={StoreIcon}
                        style={{ padding: "5px" }}
                        alt="store-icon"
                      />
                    </div>
                  </div>
                  <div className="col-md-10">
                    <div className="row">
                      <label className="varun-nagpal">Varun Nagpal</label>
                    </div>
                    <div className="row">
                      <label className="hi-diwakar-i-really">
                        Hi Diwakar, I really appreciate you joining us at
                        Voucherify! My top priority{" "}
                      </label>
                    </div>
                  </div>
                </div>
                <div className="row" style={{ marginTop: "20px" }}>
                  <div className="col-md-2">
                    <div className="oval-5-1-new">
                      <img
                        src={StoreIcon}
                        style={{ padding: "5px" }}
                        alt="store-icon"
                      />
                    </div>
                  </div>
                  <div className="col-md-10">
                    <div className="row">
                      <label className="varun-nagpal">Varun Nagpal</label>
                    </div>
                    <div className="row">
                      <label className="hi-diwakar-i-really">
                        Hi Diwakar, I really appreciate you joining us at
                        Voucherify! My top priority{" "}
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="row"
              style={{ marginLeft: "5px", marginRight: "0px" }}
            >
              <div className="col-md-5">
                <button className="add-comment-button">
                  <label className="add-comment-text">ADD COMMENT</label>
                </button>
              </div>
            </div>
          </Drawer>
        </div>
      </Fragment>
    );
  }
}

export default MyTicketClaim;
