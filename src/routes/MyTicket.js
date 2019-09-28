import React, { Component } from "react";
import Modal from "react-responsive-modal";
import HistoricalTable from "./HistoricalTable";
import HeadphoneImg from "./../assets/Images/headphone.png";
import Headphone2Img from "./../assets/Images/headphone2.png";
import BlackUserIcon from "./../assets/Images/avatar.png";
import DownImg from "./../assets/Images/down.png";
import DownWhiteImg from "./../assets/Images/down-white.png";
import LoadingImg from "./../assets/Images/loading.png";
import EyeImg from "./../assets/Images/eye.png";
import BillInvoiceImg from "./../assets/Images/bill-Invoice.png";
import MsgImg from "./../assets/Images/msg.png";
// import Down1Img from "./../assets/Images/down-1.png";
import ArrowImg from "./../assets/Images/arrow.png";
import PlusImg from "./../assets/Images/plus.png";
import RightImg from "./../assets/Images/right.png";
import Up1Img from "./../assets/Images/up-1.png";
import Loading1Img from "./../assets/Images/loading1.png";
import FacebookImg from "./../assets/Images/facebook.png";
import ClipImg from "./../assets/Images/clip.png";
import PencilImg from "./../assets/Images/pencil.png";
import CancelImg from "./../assets/Images/cancel.png";
import { Collapse, CardBody, Card } from "reactstrap";
import CustomerIcon from "./../assets/Images/customer-icon.png";
import CrossIcon from "./../assets/Images/cancel.png";
import TikcetSystemStoreModal from './../routes/TicketSystemStoreModal';
 

class MyTicket extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      collapseUp: true,
      varMar: "",
      profilemodal: false,
      storemodal: false
    };
  }


  HandleClaimPageView(){

    this.props.history.push("claimTabTicketView");
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

  handleUpOpen() {
    this.setState({ collapseUp: false, varMar: "63%" });
  }
  handleUpClose() {
    this.setState({ collapseUp: true, varMar: "37%" });
  };
  onOpenModal = () => {
    
    this.setState({ open: true });
  }
  onCloseModal() {
    this.setState({ open: false });
  }
  render() {
    const { open } = this.state;
    const HidecollapsUp = this.state.collapseUp ? (
      <img
        src={Up1Img}
        alt="up"
        className="up-1"
        onClick={this.handleUpOpen.bind(this)}
      />
    ) : (
      ""
    );
    return (
      <div>
        <div className="head-header">
          <div className="head-header-1">
            <div className="row">
              <div className="col-xs-3">
                <img src={HeadphoneImg} alt="headphone" className="headphone" />
              </div>
              <div className="col-xs-9">
                <label className="id-abc-1234">
                  ID - ABC1234
                  <span className="updated-2-d-ago">Updated 2d ago</span>
                </label>
                <img
                  src={LoadingImg}
                  alt="Loading"
                  className="loading-rectangle"
                  onClick={this.onOpenModal}
                />
              </div>
             
              <div className="historical-model">
                <Modal
                  open={open}
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

              <div className="col-xs-9 oval-head">
                <img src={Headphone2Img} alt="headphone" className="oval-55" />
                <label className="naman-r">Naman.R</label>
                <img src={DownImg} alt="down" className="down-header" />
                <button type="button" className="myticket-submit-solve-button">
                  <label className="myticket-submit-solve-button-text">
                    Submit As Solved
                  </label>
                  <img
                    src={DownWhiteImg}
                    alt="headphone"
                    className="down-white"
                  />
                </button>
              </div>
            </div>
            <img
              src={LoadingImg}
              alt="Loading"
              className="loading-rectangle"
              onClick={this.onOpenModal.bind(this)}
            />
          </div>
        </div>
        <div className="historical-model">
          <Modal
            open={open}
            onClose={this.onCloseModal.bind(this)}
            closeIconId="sdsg"
            modalId="Historical-popup"
            overlayId="logout-ovrly"
          >
            <h4>Historical Ticket</h4>
            <HistoricalTable />
          </Modal>
        </div>
        <div className="card-rectangle">
          <div className="rectangle-box">
            <div className="row">
              <div className="col-md-3">
                <label className="mobile-number">Mobile Number</label>
                <br />
                <label className="mobile-no">+91 9873470074</label>
                <img
                  src={EyeImg}
                  alt="eye"
                  className="eyeImg"
                  onClick={this.HandleProfileModalOpen.bind(this)}
                />
                <div className="bill-1">
                  <img src={BillInvoiceImg} alt="eye" className="billImg" />
                </div>
                <div className="card-space-1">
                  <label className="target-closure-date">
                    Target Closure Date &nbsp;
                  </label>
                  <label className="Date-target">28 March 19</label>
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
              <div className="vl"></div>
              <div className="col-md-6">
                <div className="row mob-pad" style={{ paddingLeft: "20px" }}>
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
                <div className="row drop-card">
                  <div className="col-md-4">
                    <div className="form-group">
                      <label className="label-4">Category</label>
                      <select className="rectangle-9 select-category-placeholder">
                        <option>Select</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-4 dropdrown">
                    <div className="form-group">
                      <label className="label-4">Sub Category</label>
                      <select className="rectangle-9 select-category-placeholder">
                        <option>Select</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-4 dropdrown">
                    <div className="form-group">
                      <label className="label-4">Issue Type</label>
                      <select className="rectangle-9 select-category-placeholder">
                        <option>Select</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="v2"></div>
                <div className="row data-store">
                  <div className="col-md-12">
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
                  </div>
                  <div className="col-md-12">
                    <label className="label-4 storeSpacing">Product</label>
                    <label className="bata-rajouri-garden">
                      Red Tennis Coca Cola White Monogr…&nbsp;
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
        <div>
          <div className="rectangle-3">
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
                  </select>
                  {/* <img src={MsgImg} alt="msg" className="smg-Img" />
                  <label className="email">Email</label>
                  <img src={Down1Img} alt="down" className="down-1" /> */}
                  <div className="mob-float">
                    <img src={ArrowImg} alt="Arrow" className="arrow-img" />
                    <div className="line-1"></div>
                    <img src={PlusImg} alt="Plush" className="plush-img" />
                  </div>
                </div>
              </div>
            </div>
            <div className="row msg-row">
              <div className="col-md-2 col-3">
                <label className="messages-04">Messages: 04</label>
              </div>
              <div className="col-md-2 col-3">
                <label className="notes-00">Notes: 00</label>
              </div>
              <div className="col-md-2 col-3">
                <label className="task-03">Task: 03</label>
              </div>
              <div className="col-md-2 col-3" onClick={this.HandleClaimPageView.bind(this)} >
                <label className="claim-00">Claim: 00</label>
              </div>
            </div>
            <div className="row message-header">
              <div className="col-md-3">
                <label className="user-label">User</label>
              </div>
              <div className="col-md-8">
                <label className="message-label">Message</label>
              </div>
              <div className="1">
                <label className="action-label">Action</label>
              </div>
            </div>
            <div className="row top-margin">
              <div className="col-md-5">
                <div className="v3"></div>
              </div>
              <div className="col-md-2">
                <label className="today-02">TODAY 02</label>
              </div>
              <div className="col-md-5">
                <div className="v4"></div>
              </div>
            </div>
            <div className="row top-margin">
              <div className="col-md-4">
                <div className="row">
                  <div className="oval-5-1">
                    <img src={RightImg} alt="right" className="right-icon" />
                  </div>
                  <label
                    className="solved-by-naman-r"
                    style={{ marginLeft: "7px" }}
                  >
                    Solved by NamanR
                  </label>
                  <img
                    src={MsgImg}
                    alt="right"
                    className="smg-Img"
                    style={{ marginLeft: "95px" }}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <label className="i-have-solved-this-i">
                  I Have solved this issue
                </label>
              </div>
              <div className="col-md-2 mob-flex">
                {HidecollapsUp}
                <label
                  className="comment"
                  onClick={this.handleUpClose.bind(this)}
                  style={{ marginLeft: this.state.varMar }}
                >
                  Comment
                </label>
              </div>
            </div>
            <div className="row card-op-out">
              <Collapse isOpen={this.state.collapseUp}>
                <Card>
                  <CardBody>
                    <div className="card-details">
                      <div className="card-details-1">
                        <label className="label-5">Dear Matthew,</label>
                        <label className="label-5">
                          We're always working to make Shopify exactly what you
                          need for your retails business. Your feedback helps us
                          decide which features to build, and what improvements
                          should be made to our platform.
                          <br />
                          <br />
                          To help us make Shopify the best it can be, we want
                          your feedback today, take a few minutes to fill out
                          survays before Tuesday,July 7th.
                        </label>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </Collapse>
            </div>
            <div className="row">
              <div className="col-md-5">
                <div className="v3"></div>
              </div>
              <div className="col-md-2">
                <label className="yesterday-02">YESTERDAY 02</label>
              </div>
              <div className="col-md-5">
                <div className="v6"></div>
              </div>
            </div>
            <div
              className="row new-top-bottom-margin"
              style={{ marginLeft: "20px" }}
            >
              <div className="col-xs-3">
                <img src={Loading1Img} alt="right" className="oval-loading" />
              </div>
              <div className="col-xs-9">
                <label className="rashmi-c">
                  Rashmi.C
                  <span>
                    <label className="updated-2-d-ago">
                      Reassign to
                      <label style={{ fontWeight: "bold", color: "black" }}>
                        Naman.R
                      </label>
                    </label>
                  </span>
                </label>
              </div>
              <div className="col-md-8">
                <label className="hi-naman-please-hel">
                  Hi @Naman Please help customer with voucher Issue
                </label>
              </div>
              <div className="col-md-2 mob-flex">
                <label className="comment-text">Comment</label>
              </div>
            </div>
            <div className="row row-spacing new-top-bottom-margin">
              <div className="col-xs-3">
                <img src={Headphone2Img} alt="headphone" className="oval-56" />
              </div>
              <div className="col-xs-9">
                <label className="rashmi-c">Rashmi.C</label>
                <img src={FacebookImg} alt="facebook" className="facebook" />
              </div>
              <div className="col-md-8">
                <img src={ClipImg} alt="clip" className="clip" />
                <label className="hi-diwakar-i-really2">
                  &nbsp; Hi Diwakar, I really appreciate you joining us at
                  Voucherify! My top priority is that you have a great
                  experience.
                </label>
              </div>
              <label className="comment-text1">Comment</label>
              <div className="col-md-2"></div>
            </div>
            <div className="row row-spacing new-top-bottom-margin">
              <div className="col-xs-3">
                <img src={BlackUserIcon} alt="Avatar" className="oval-6" />
              </div>
              <div className="col-xs-9">
                <label className="rashmi-c">Diwakar</label>
                <img
                  src={Headphone2Img}
                  alt="headphone"
                  className="headphone1"
                />
              </div>
              <div className="col-md-8">
                <label className="need-to-change-my-sh">
                  Need to change my shipping address
                </label>
              </div>
              <label className="reply-comment">
                Reply
                <br />
                Comment
              </label>
            </div>
          </div>
        </div>
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
                <label className="profilemodal-textval">Diwakar Monga</label>
              </div>
              <div className="col-md-6">
                <label className="profilemodal-text">Mobile</label>
                <label className="profilemodal-textval">+91 9873470074</label>
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
    );
  }
}
export default MyTicket;
