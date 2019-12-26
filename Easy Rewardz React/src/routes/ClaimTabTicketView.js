import React, { Component, Fragment } from "react";
import Modal from "react-responsive-modal";
import { Drawer } from 'antd';
import HeadphoneImg from "./../assets/Images/headphone.png";
import Headphone2Img from "./../assets/Images/headphone2.png";
import DownImg from "./../assets/Images/down.png";
import DownWhiteImg from "./../assets/Images/down-white.png";
import LoadingImg from "./../assets/Images/loading.png";
import EyeImg from "./../assets/Images/eye.png";
import BillInvoiceImg from "./../assets/Images/bill-Invoice.png";
// import Down1Img from "./../assets/Images/down-1.png";
import ArrowImg from "./../assets/Images/arrow.png";
import PlusImg from "./../assets/Images/plus.png";
import CancelImg from "./../assets/Images/cancel.png";
import PencilImg from "./../assets/Images/pencil.png";
import TableArrowIcon from "./../assets/Images/table-arr.png";
import InfoIcon from "./../assets/Images/info-icon.png";
import BlackLeftArrow from "./../assets/Images/black-left-arrow.png";
import BataShoesIcon from "./../assets/Images/bata.png";
import StoreIcon from "./../assets/Images/store.png";
import CustomerIcon from "./../assets/Images/customer-icon.png";
import CrossIcon from "./../assets/Images/cancel.png";
import HistoricalTable from "./HistoricalTable";
import HeadPhone3 from "./../assets/Images/headphone3.png";
import TikcetSystemStoreModal from "./../routes/TicketSystemStoreModal";

class ClaimTabTicketView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ClaimDetailsModal: false,
      ClaimOpen: false,
      headPhoneTable: false,
      storeproductsearch: false,
      profilemodal: false,
      storemodal:false
    };
    this.handleClaimDetailsModalOpen = this.handleClaimDetailsModalOpen.bind(this);
    this.handleClaimDetailsModalClose = this.handleClaimDetailsModalClose.bind(this);
    this.onCloseModal=this.onCloseModal.bind(this)
  }

  hanleChange = () => {
    this.props.history.push("/admin/myticket");
  };

  afterOpenModal() {
    this.subtitle.style.color = "#f00";
  }
  handleClaimDetailsModalOpen() {
    this.setState({ ClaimDetailsModal: true });
  }
  handleClaimDetailsModalClose() {
    this.setState({ ClaimDetailsModal: false });
  }
  onCloseModal() {
    this.setState({ ClaimOpen: false });
  }
  onOpenModal(){
    this.setState({ ClaimOpen: true });
  };
  HandleHeadePhoneModalOpen() {
    this.setState({ headPhoneTable: true });
  }
  HandleHeadePhoneModalClose() {
    this.setState({ headPhoneTable: false });
  }

  HandleProfileModalOpen() {
    this.setState({ profilemodal: true });
  }
  HandleProfileModalClose() {
    this.setState({ profilemodal: false });
  }
  HandleStoreModalOpen() {
    this.setState({ storemodal: true });
  }
  HandleStoreModalClose() {
    this.setState({ storemodal: false });
  }
  render() {
    return (
      <Fragment>
        <div className="head-header">
          <div className="head-header-1">
            <div className="row">
              <div className="col-3 col-sm-3">
                <img src={HeadphoneImg} alt="headphone" className="headphone" />
                <label className="id-abc-1234">
                  ID - ABC1234
                  <span className="updated-2-d-ago">Updated 2d ago</span>
                </label>
                <img
                  src={LoadingImg}
                  alt="Loading"
                  className="loading-rectangle"
                  onClick={this.onOpenModal.bind(this)}
                />
              </div>

              <div className="historical-model">
                <Modal
                  open={this.state.ClaimOpen}
                  onClose={this.onCloseModal}
                  closeIconId="sdsg"
                  modalId="Historical-popup"
                  overlayId="logout-ovrly"
                >
                  <label className="lblHistorical">Historical Ticket</label>
                  <img
                    src={CancelImg}
                    alt="cancelImg"
                    className="cancalImg"
                    onClick={this.onCloseModal}
                  />
                  <HistoricalTable />
                </Modal>
              </div>

              <div
                className="col-9 col-sm-9"
                onClick={this.HandleHeadePhoneModalOpen.bind(this)}
              >
                <div style={{float: "right"}}>
                  <img src={Headphone2Img} alt="headphone" className="oval-55" />
                <label className="naman-r">Naman.R</label>
                <img src={DownImg} alt="down" className="down-header" />
                <button type="button" className="myticket-submit-solve-button">
                  <label className="myticket-submit-solve-button-text">
                    SUBMIT AS SOLVED
                  </label>
                  <img
                    src={DownWhiteImg}
                    alt="headphone"
                    className="down-white"
                  />
                </button>
                </div>
              </div>
              <Modal
                open={this.state.headPhoneTable}
                onClose={this.HandleHeadePhoneModalClose.bind(this)}
                closeIconId="close"
                modalId="HeadePhone-popup"
                overlayId="logout-ovrly"
              >
                <div className="myTicket-table remov">
                  <table>
                    <thead>
                      <tr>
                        <th>Emp Id</th>
                        <th>Name</th>
                        <th>Designation</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>9938</td>
                        <td>Rashmi.C</td>
                        <td>Agent</td>
                      </tr>
                      <tr>
                        <td>3234</td>
                        <td>Juhi.H</td>
                        <td>Agent</td>
                      </tr>
                      <tr>
                        <td>3234</td>
                        <td>Nidhi.J</td>
                        <td>Agent</td>
                      </tr>
                      <tr>
                        <td>2343</td>
                        <td>Abhishek.C</td>
                        <td>Agent</td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="button-margin">
                    <button type="button" className="btn btn-outline-primary">
                      SELECT
                    </button>
                  </div>
                </div>
              </Modal>
            </div>
          </div>
        </div>
        <div className="card-rectangle">
          <div className="rectangle-box">
            <div className="row">
              <div className="col-md-3">
                <div style={{padding: "15px"}}>
                  <label className="mobile-number">Mobile Number</label>
                <br />
                <label className="mobile-no">+91 9873470074</label>
                <img
                  src={EyeImg}
                  alt="eye"
                  className="eyeImg"
                  onClick={this.HandleProfileModalOpen.bind(this)}
                />
                <Modal
                  open={this.state.profilemodal}
                  onClose={this.HandleProfileModalClose.bind(this)}
                  modalId="profile-popup"
                  overlayId="logout-ovrly"
                >
                  <div className="profilemodalmaindiv">
                    <div style={{ float: "right" }}>
                      <img
                        src={CrossIcon}
                        alt="cross-icon"
                        className="pro-cross-icn"
                        onClick={this.HandleProfileModalClose.bind(this)}
                      />
                    </div>
                    <div className="row profilemodalrow">
                      <div className="col-md-6">
                        <label className="profilemodal-text">Name</label>
                        <label className="profilemodal-textval">
                          Diwakar Monga
                        </label>
                      </div>
                      <div className="col-md-6">
                        <label className="profilemodal-text">Mobile</label>
                        <label className="profilemodal-textval">
                          +91 9873470074
                        </label>
                      </div>
                    </div>
                    <div className="row profilemodalrow-1">
                      <div className="col-md-6">
                        <label className="profilemodal-text">Email</label>
                        <label className="profilemodal-textval">
                          monga24@gmail.com
                        </label>
                      </div>
                      <div className="col-md-6">
                        <input
                          type="text"
                          className="alternumber"
                          placeholder="Alternate Number"
                        />
                      </div>
                    </div>
                    <div className="row" style={{ marginLeft: "15px" }}>
                      <div className="openticketbox profilemodalrow-1">
                        <label className="open-tickets-box-text">
                          04
                          <small className="open-tickets-box-textval">
                            Open Tickets
                          </small>
                        </label>
                      </div>
                      <div className="openticketbox-2 profilemodalrow-1">
                        <label className="open-tickets-box-text">
                          11
                          <small className="open-tickets-box-textval">
                            Total Tickets
                          </small>
                        </label>
                      </div>
                    </div>
                    <div className="row profilemodal-row-3">
                      <img src={CustomerIcon} alt="customer-icon" />
                      <label className="full-profile-view-text">
                        FULL PROFILE VIEW
                      </label>
                    </div>
                  </div>
                </Modal>
                <div className="" style={{display: "inline", marginLeft: "5px"}}>
                  <img src={BillInvoiceImg} alt="eye" className="billImg" />
                </div>
                <div className="card-space-1">
                  <label className="target-closure-date">
                    Target Closure Date &nbsp;
                  </label>
                  <label className="Date-target">28 March 19</label>
                </div>
                <div className="mobilenumber-resp">
                  <span className="line-respo"></span>
                  <label className="respo">Response</label>
                  <label className="resol">
                    <span className="line-resol"></span>
                    Resolution
                  </label>
                </div>
                <progress
                  style={{ width: "100%" }}
                  value="50"
                  max="100"
                ></progress>
                <p className="logout-label font-weight-bold prog-indi-1">
                  2 day
                </p>
                </div>
              </div>

              <div className="col-md-5">
                <div className="mid-sec">
                  <div className="row mob-pad">
                  <div className="col-md-4">
                    <div className="form-group">
                      <label className="label-4">Status</label>
                      <select className="rectangle-9 select-category-placeholder">
                        <option>Select</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-4 dropdrown">
                    <div className="form-group">
                      <label className="label-4">Priority</label>
                      <select className="rectangle-9 select-category-placeholder">
                        <option>Select</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-4 dropdrown">
                    <div className="form-group">
                      <label className="label-4">Brand</label>
                      <select className="rectangle-9 select-category-placeholder">
                        <option>Select</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-4">
                    <div className="">
                      <label className="label-4">Category</label>
                      <select className="rectangle-9 select-category-placeholder">
                        <option>Select</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-4 dropdrown">
                    <div className="">
                      <label className="label-4">Sub Category</label>
                      <select className="rectangle-9 select-category-placeholder">
                        <option>Select</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-4 dropdrown">
                    <div className="">
                      <label className="label-4">Issue Type</label>
                      <select className="rectangle-9 select-category-placeholder">
                        <option>Select</option>
                      </select>
                    </div>
                  </div>
                </div>
                </div>
              </div>

              <div className="col-md-4">
                <div style={{padding: "15px 0"}}>
                  <div className="">
                  <div className="form-group">
                    <label className="label-4 storeSpacing">Store</label>
                    <label
                      className="bata-rajouri-garden"
                      onClick={this.HandleStoreModalOpen.bind(this)}
                    >
                      Bata Rajouri Garden &nbsp;
                      <img
                        src={PencilImg}
                        alt="Pencile"
                        className="pencilImg"
                      />
                    </label>
                    <Modal
                      open={this.state.storemodal}
                      onClose={this.HandleStoreModalClose.bind(this)}
                      modalId="ticket-store-modal"
                      overlayId="layout-ticket-store-modal"
                    >
                      <div className="profilemodalmaindiv">
                        <div style={{ float: "" }}>
                          <img
                            src={CrossIcon}
                            alt="cross-icon"
                            className="pro-cross-icn-1"
                            onClick={this.HandleStoreModalClose.bind(this)}
                          />
                        </div>
                        <TikcetSystemStoreModal />
                      </div>
                    </Modal>
                  </div>
                  <div className="">
                    <label className="label-4 storeSpacing">Product</label>
                    <label
                      className="bata-rajouri-garden"
                      onClick={this.HandleStoreModalOpen.bind(this)}
                    >
                      Red Tennis Coca Cola White Monogr...&nbsp;
                      <img
                        src={PencilImg}
                        alt="Pencile"
                        className="pencilImg"
                      />
                    </label>
                  </div>
                </div>
                 </div>
              </div>
            </div>
          </div>
        </div>
        <div>
        <div style={{padding: "15px" , background:"#fff"}}>
          <div className="rectangle-3 text-editor">
            <div className="row">
              <label className="ticket-title-where">Ticket Title:</label>
            </div>
            <div className="row">
              <label className="label-2">Where can I see my reward?</label>
            </div>
            <div className="row">
              <label className="ticket-title-where">Ticket Details:</label>
            </div>
            <div className="row">
              <label className="label-3">
                Where I can see details of my rewards in the ‘Rewards’ tab
                within the ‘Refer and Earn Rewards’ screen.You will also get
                details of which of your friends have joined, which friends have
                transacted etc. on the same tab.
              </label>
            </div>
            <div className="row">
              <div className="mask1">
                <div className="mail-mask">
                  <select className="my-tic-email">
                    <option>Email</option>
                    <option>Facebook</option>
                    <option>SMS</option>
                  </select>
                   <div className="mob-float" style={{display: "inline" , float: "right"}}>
                    <img src={ArrowImg} alt="Arrow" className="arrow-img" />
                    <div className="line-1"></div>
                    <img src={PlusImg} alt="Plush" className="plush-img" />
                   </div>
                  
                </div>
              </div>
            </div>
            <div className="row msg-row">
              <div className="col-md-2">
                <label className="messages-04-1">Messages: 04</label>
              </div>
              <div className="col-md-2">
                <label className="notes-00">Notes: 04</label>
              </div>
              <div className="col-md-2">
                <label className="task-03">Task: 03</label>
              </div>
              <div className="col-md-2">
                <label className="claim-00-1">Claim: 03</label>
              </div>
            </div>
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
                  <tr onClick={this.handleClaimDetailsModalOpen}>
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
                      <img
                        className="info-icon"
                        src={InfoIcon}
                        alt="info-icon"
                      />
                    </td>
                    <td>N Rampal</td>
                    <td>
                      12 March 2018
                      <img
                        className="info-icon"
                        src={InfoIcon}
                        alt="info-icon"
                      />
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
                      <span>
                        Hope this help, Please rate us (1 new comment)
                      </span>
                    </td>
                    <td>
                      Defective article
                      <img
                        className="info-icon"
                        src={InfoIcon}
                        alt="info-icon"
                      />
                    </td>
                    <td>N Rampal</td>
                    <td>
                      12 March 2018
                      <img
                        className="info-icon"
                        src={InfoIcon}
                        alt="info-icon"
                      />
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
                      <img
                        className="info-icon"
                        src={InfoIcon}
                        alt="info-icon"
                      />
                    </td>
                    <td>N Rampal</td>
                    <td>
                      12 March 2018
                      <img
                        className="info-icon"
                        src={InfoIcon}
                        alt="info-icon"
                      />
                    </td>
                    <td>G. Bansal</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          </div>
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
                onClick={this.handleClaimDetailsModalClose}
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
            <div className="claim-status-table" style={{ marginLeft: "20px",marginRight:'10px' }}>
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

export default ClaimTabTicketView;
