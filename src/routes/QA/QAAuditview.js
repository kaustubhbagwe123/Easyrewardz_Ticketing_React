import React,{Component} from 'react';
import RedHeadPhoneIcon from './../../assets/Images/headphone.png'
// import EyeImg from './../../assets/Images/eye.png';
// import BillInvoiceImg from './../../assets/Images/bill-Invoice.png';
import PencilImg from './../../assets/Images/pencil.png';
import MsgImg from './../../assets/Images/msg.png';
import Down1Img from './../../assets/Images/down-1.png';
import BlueDownArrow from './../../assets/Images/down.png';
// import ArrowImg from './../../assets/Images/arrow.png';
// import PlusImg from './../../assets/Images/plus.png';
import RightImg from './../../assets/Images/right.png';
import Up1Img from './../../assets/Images/up-1.png';
import Loading1Img from './../../assets/Images/loading1.png';
import FacebookImg from './../../assets/Images/facebook.png';
import ClipImg from './../../assets/Images/clip.png';
import Headphone2Img from './../../assets/Images/headphone2.png';
import BlackUserIcon from './../../assets/Images/avatar.png'
import NoteIcon from './../../assets/Images/task-new-1.svg';
import RactRightIcon from './../../assets/Images/ract-right.png';
import { Accordion,Card } from 'react-bootstrap';
// import Modal from "react-responsive-modal";
import PageIcon from './../../assets/Images/page-icon.png';
import Demo from "./../../store/Hashtag.js";
 
import BlackHeadphone from "./../../assets/Images/headphone2.png";
import { Collapse, CardBody } from "reactstrap";


class QAAuditview extends Component {
  state = {
    open: false,
    QALeadModel: false,
    collapseUp: true
  }
  QALeadListModelOpen = () => {
    this.setState({ QALeadModel: !this.state.QALeadModel});
  };

  handleUpOpen = () => {
    this.setState({ collapseUp: !this.state.collapseUp });
  };
   
  QALeadListModelClose = () => {
    this.setState({ QALeadModel: false });
  };
  handlePageChange(){
    this.props.history.push("dashboard")
  }
  render() {
 
    return (
      <>
        <div className="qa-header">
          <div className="row">
            <div className="col-md-4 qa-flex">
              <div>
                <label className="header-text">ID - ABC1234</label>
                <img
                  src={RedHeadPhoneIcon}
                  alt="red-herdphone-icon"
                  className="read-herdphone-icon"
                />
                <label className="small-text-header">Updated 2d ago</label>
              </div>
            </div>
            <div className="col-md-8">
              <button className="button-audit-done" onClick={this.handlePageChange.bind(this)}>
                <label className="button-audit-done-text">AUDIT DONE</label>
              </button>
            </div>
          </div>
        </div>

        <div className="card-rectangle">
          <div className="rectangle-box">
            <div className="row">
              <div className="col-md-3">
                <div className="row removelinespace">
                  <div>
                    <label className="mobile-number">Customer Name</label>
                    <br />

                    <label className="mobile-no">Naman Rampal</label>
                  </div>
                  <div style={{ marginLeft: "75px" }}>
                    <label className="mobile-number">Gender</label>
                    <br />
                    <label className="mobile-no">Male</label>
                  </div>
                </div>

                <div className="removelinespace">
                  <label className="mobile-number">Mobile Number</label>
                  <br />
                  <label className="mobile-no">+91 9873470074</label>
                </div>
                <div className="removelinespace">
                  <label className="mobile-number">Email ID</label>
                  <br />
                  <label className="mobile-no">naman.kreative@gmail.com</label>
                </div>
              </div>
              <div className="vl"></div>
              <div className="col-md-6">
                <div className="row" style={{ paddingLeft: "20px" }}>
                  <div className="col-md-4">
                    <div className="form-group">
                      <label className="label-4">Status</label>
                      <input
                        type="text"
                        className="qa-textbox"
                        placeholder="Closed"
                      />
                    </div>
                  </div>
                  <div className="col-md-4 dropdrown">
                    <div className="form-group">
                      <label className="label-4">Priority</label>
                      <input
                        type="text"
                        className="qa-textbox"
                        placeholder="High"
                      />
                    </div>
                  </div>
                  <div className="col-md-4 dropdrown">
                    <div className="form-group">
                      <label className="label-4">Type</label>
                      <input
                        type="text"
                        className="qa-textbox"
                        placeholder="Payment"
                      />
                    </div>
                  </div>
                </div>
                <div className="row drop-card">
                  <div className="col-md-4">
                    <div className="form-group">
                      <label className="label-4">Category</label>
                      <input
                        type="text"
                        className="qa-textbox"
                        placeholder="Offline"
                      />
                    </div>
                  </div>
                  <div className="col-md-4 dropdrown">
                    <div className="form-group">
                      <label className="label-4">Sub Category</label>
                      <input
                        type="text"
                        className="qa-textbox"
                        placeholder="Card Issue"
                      />
                    </div>
                  </div>
                </div>
                <div className="v2"></div>
                <div className="row data-store">
                  <div className="col-md-12">
                    <label className="label-4 storeSpacing">Store</label>
                    <label className="bata-rajouri-garden">
                      Bata Raj ouri Garden &nbsp;
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
        <div className="removerowmargin">
          <div className="row">
            <div className="QA-card-2">
              <div className="row">
                <div className="col-md-9">
                  <label className="ticket-title-text">Ticket Title:</label>
                  <br />
                  <p className="ticket-title-text-p">
                    Need to change my shipping address
                  </p>
                </div>
                <div className="col-md-3">
                  <div className="row">
                    <div className="QALeadList-Over-yellow">
                      <img
                        src={BlackHeadphone}
                        alt="Black-headphone"
                        className="Black-headphone"
                      />
                    </div>
                    <div style={{ marginLeft: "10px",fontWeight:"600" }}>
                      <label>Naman.R</label>
                    </div>
                    <div style={{ marginLeft: "10px" }}>
                      <img
                        src={BlueDownArrow}
                        alt="blue-down-arrow"
                        className="bluedownarrow"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-9">
                  <label className="ticket-title-text">Ticket Details:</label>
                  <br />
                  <p className="ticket-title-text-p">
                    You can always print a e-ticket using PNR Number from the
                    website of IRCTC, kindly login and click on print E Ticket.
                    The list of ticket will be shown there. If you have
                    travelled and not taken a printout then kindly search you
                    registered email ID for the ticket.
                  </p>
                </div>
              </div>
              <div className="row msg-row" style={{ marginLeft: "20px" }}>
                <div className="col-md-2">
                  <label className="messages-04">All:05</label>
                </div>
                <div
                  className="col-md-2"
                  style={{ marginLeft: "-19", marginRight: "28px" }}
                >
                  <a href={Demo.BLANK_LINK}>
                    <label className="messages-04-new-text">Messages: 04</label>
                  </a>
                </div>
                <div className="col-md-2">
                  <a href={Demo.BLANK_LINK}>
                    <label className="messages-04-new-text">Notes: 00</label>
                  </a>
                </div>
                <div className="col-md-2">
                  <a href={Demo.BLANK_LINK}>
                    <label className="messages-04-new-text">Comments: 00</label>
                  </a>
                </div>
              </div>
              <hr />

              <div
                className="row message-header"
                style={{ marginLeft: "20px" }}
              >
                <div className="col-md-3">
                  <label className="message-new-1">User</label>
                </div>
                <div className="col-md-8">
                  <label className="message-new-1">Message</label>
                </div>
              </div>
              <div className="row top-margin">
                <div className="col-md-5">
                  <div className="v3-new-1"></div>
                </div>
                <div className="col-md-2">
                  <label className="today-02-new-1">TODAY 02</label>
                </div>
                <div className="col-md-5">
                  <div className="v4-new-1"></div>
                </div>
              </div>
              <div className="row top-margin">
                <div className="col-md-5">
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
                      style={{ marginLeft: "66px" }}
                    />
                  </div>
                </div>
                <div className="col-md-5">
                  <label className="i-have-solved-this-i message-content">
                    I Have solved this issue
                  </label>
                </div>
                <div className="col-md-2">
                  <img
                    src={Up1Img}
                    alt="up"
                    className="up-1-1"
                    onClick={this.handleUpOpen}
                  />
                </div>
              </div>

              <Collapse isOpen={this.state.collapseUp}>
                <Card>
                  <CardBody>
                    <div className="row">
                      <div className="card-details-QA">
                        <div className="screen-shot-2018-05-03-at-2-29-59-pm">
                          <label className="label-5">Dear Matthew,</label>
                          <label className="label-5">
                            We're always working to make Shopify exactly what
                            you need for your retails business. Your feedback
                            helps us decide which features to build, and what
                            improvements should be made to our platform.
                            <br />
                            <br />
                            To help us make Shopify the best it can be, we want
                            your feedback today, take a few minutes to fill out
                            survays before Tuesday,July 7th.
                          </label>
                        </div>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </Collapse>

              <div
                className="row row-spacing new-top-bottom-margin"
                style={{ marginBottom: "18px", marginTop: "22px" }}
              >
                <div className="col-xs-3">
                  <img
                    src={Headphone2Img}
                    alt="headphone"
                    className="oval-56"
                  />
                </div>
                <div className="col-xs-9">
                  <label className="rashmi-c">Naman.R</label>
                </div>
                <div className="col-md-8">
                  <label className="hi-diwakar-i-really1">
                    <p style={{ marginLeft: "141px" }}>
                      <img src={PageIcon} alt="clip" className="clip" /> &nbsp;
                      &nbsp; This is an note added by agent to team{" "}
                    </p>
                  </label>
                </div>

                <div className="col-md-2"></div>
              </div>

              <div className="row">
                <div className="col-md-5">
                  <div className="v3-1-1"></div>
                </div>
                <div className="col-md-2">
                  <label className="yesterday-02-new">YESTERDAY 02</label>
                </div>
                <div className="col-md-5">
                  <div className="v6-1-1"></div>
                </div>
              </div>
              <div
                className="row new-top-bottom-margin"
                style={{ marginLeft: "35px", marginBottom: "18px" }}
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
                  <label className="hi-naman-please-hel-new">
                    Hi @Naman Please help customer with voucher Issue
                  </label>
                </div>
              </div>

              <div
                className="row row-spacing new-top-bottom-margin"
                style={{ marginBottom: "18px" }}
              >
                <div className="col-xs-3">
                  <img
                    src={Headphone2Img}
                    alt="headphone"
                    className="oval-56"
                  />
                </div>
                <div className="col-xs-9">
                  <label className="rashmi-c">Rashmi.C</label>
                  <img
                    src={FacebookImg}
                    alt="facebook"
                    className="facebook"
                    style={{ marginLeft: "117px" }}
                  />
                </div>
                <div className="col-md-8">
                  <label className="hi-diwakar-i-really1-1">
                    <img src={ClipImg} alt="clip" className="clip-icon-new" />

                    <p className="message-details-new">
                      Hi Diwakar, I really appreciate you joining us at
                      Voucherify! My top priority is that you have a great
                      experience.
                    </p>
                  </label>
                </div>

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
                    style={{ marginLeft: "123px" }}
                  />
                </div>
                <div className="col-md-8">
                  <label className="need-to-change-my-sh">
                    Need to change my shipping address
                  </label>
                </div>
              </div>
              <br />
            </div>
            <div className="QA-card-3">
              <div className="row">
                <div className="margin-audit-detials">
                  <img src={NoteIcon} alt="Note-Icon" className="note-icon" />
                  <label className="audit-details">Audit Details</label>
                </div>
                <div className="audit-score-box">
                  <label className="">Audit Score</label>
                  <label className="percentage">95%</label>
                </div>
              </div>
              <div className="audit-line-2"></div>
              <div className="newmargin">
                <label className="qa-lead">QA Lead</label>
                <div
                  className="row qa-detials-row"
                  onClick={this.QALeadListModelOpen}
                >
                  <div className="audit-oval-5">
                    <img
                      src={RactRightIcon}
                      alt="right-icon"
                      className="ract-right-icon"
                    />
                  </div>
                  <label className="name-text">Rachita</label>
                  <img
                    src={Down1Img}
                    alt="down-arrow-icon"
                    className="down-icon"
                  />
                </div>
              </div>
              <div className="audit-line-2"></div>
              {this.state.QALeadModel ? (
                <div className="QALeadListModal">
                  <div className="row" style={{ marginLeft: "15px" }}>
                    <div className="QALeadList-Over-yellow">
                      <img
                        src={RactRightIcon}
                        alt="right-icon"
                        className="ract-right-icon"
                      />
                    </div>
                    <label className="name-text">Abhishak</label>
                  </div>

                  <div
                    className="row"
                    style={{ marginLeft: "16px", marginTop: "10px" }}
                  >
                    <div className="QALeadList-Over-yellow">
                      <img
                        src={RactRightIcon}
                        alt="right-icon"
                        className="ract-right-icon"
                      />
                    </div>
                    <label className="name-text">Rashmi</label>
                  </div>
                </div>
              ) : null}
              <div className="collapdata">
                <Accordion defaultActiveKey="0">
                  <Card>
                    <Accordion.Toggle as={Card.Header} eventKey="0">
                      <div className="row">
                        <div className="col-md-10">
                          <label className="collap-head-text">VERBIAGES</label>
                        </div>
                        <div
                          className="col-md-2"
                          style={{ textAlign: "right" }}
                        >
                          <img src={Down1Img} alt="down-arrow" />
                        </div>
                      </div>
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="0">
                      <Card.Body>
                        <div>
                          <div
                            className="row collapsebutton"
                            style={{ marginTop: "10px" }}
                          >
                            <label className="collapse-text-1">
                              Opening Procedure
                            </label>

                            <div
                              className="btn-group"
                              id="status"
                              data-toggle="buttons"
                              style={{ marginLeft: "101px" }}
                            >
                              <label className="btn btn-default btn-on btn-xs active ">
                                <input
                                  type="radio"
                                  value="1"
                                  name="multifeatured_module[module_id][status]"
                                  
                                />
                                YES
                              </label>
                              <label className="btn btn-default btn-off btn-xs ">
                                <input
                                  type="radio"
                                  value="0"
                                  name="multifeatured_module[module_id][status]"
                                />
                                NO
                              </label>
                            </div>
                          </div>
                          <div
                            className="row collapsebutton"
                            style={{ marginTop: "10px" }}
                          >
                            <label className="collapse-text-1">
                              Closing Procedure
                            </label>

                            <div
                              className="btn-group"
                              id="status"
                              data-toggle="buttons"
                              style={{ marginLeft: "108px" }}
                            >
                              <label className="btn btn-default btn-on btn-xs active ">
                                <input
                                  type="radio"
                                  value="1"
                                  name="multifeatured_module[module_id][status]"
                                 
                                />
                                YES
                              </label>
                              <label className="btn btn-default btn-off btn-xs ">
                                <input
                                  type="radio"
                                  value="0"
                                  name="multifeatured_module[module_id][status]"
                                />
                                NO
                              </label>
                              <label className="btn btn-default btn-off btn-xs ">
                                <input
                                  type="radio"
                                  value="0"
                                  name="multifeatured_module[module_id][status]"
                                />
                                NA
                              </label>
                            </div>
                          </div>
                          <div
                            className="row collapsebutton"
                            style={{ marginTop: "10px" }}
                          >
                            <label className="collapse-text-1">
                              Hold/ Unhold procedure / Dead Air
                            </label>

                            <div
                              className="btn-group"
                              id="status"
                              data-toggle="buttons"
                              style={{ marginLeft: "19px" }}
                            >
                              <label className="btn btn-default btn-on btn-xs active ">
                                <input
                                  type="radio"
                                  value="1"
                                  name="multifeatured_module[module_id][status]"
                                  
                                />
                                YES
                              </label>
                              <label className="btn btn-default btn-off btn-xs ">
                                <input
                                  type="radio"
                                  value="0"
                                  name="multifeatured_module[module_id][status]"
                                />
                                NO
                              </label>
                              <label className="btn btn-default btn-off btn-xs ">
                                <input
                                  type="radio"
                                  value="0"
                                  name="multifeatured_module[module_id][status]"
                                />
                                NA
                              </label>
                            </div>
                          </div>
                          <div
                            className="row collapsebutton"
                            style={{ marginTop: "10px" }}
                          >
                            <label className="collapse-text-1">
                              Transfer procedure
                            </label>

                            <div
                              className="btn-group"
                              id="status"
                              data-toggle="buttons"
                              style={{ marginLeft: "104px" }}
                            >
                              <label className="btn btn-default btn-on btn-xs active ">
                                <input
                                  type="radio"
                                  value="1"
                                  name="multifeatured_module[module_id][status]"
                                
                                />
                                YES
                              </label>
                              <label className="btn btn-default btn-off btn-xs ">
                                <input
                                  type="radio"
                                  value="0"
                                  name="multifeatured_module[module_id][status]"
                                />
                                NO
                              </label>
                              <label className="btn btn-default btn-off btn-xs ">
                                <input
                                  type="radio"
                                  value="0"
                                  name="multifeatured_module[module_id][status]"
                                />
                                NA
                              </label>
                            </div>
                          </div>
                        </div>
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>
                  <Card>
                    <Accordion.Toggle as={Card.Header} eventKey="1">
                      <div className="row">
                        <div className="col-md-10">
                          <label className="collap-head-text">
                            PROFESSIONALISM & COURTESY
                          </label>
                        </div>
                        <div
                          className="col-md-2"
                          style={{ textAlign: "right" }}
                        >
                          <img src={Down1Img} alt="down-arrow" />
                        </div>
                      </div>
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="1">
                      <Card.Body>
                        <div>
                          <div
                            className="row collapsebutton"
                            style={{ marginTop: "10px" }}
                          >
                            <label className="collapse-text-1">
                              Energy/ Enthusiasm
                            </label>

                            <div
                              className="btn-group"
                              id="status"
                              data-toggle="buttons"
                              style={{ marginLeft: "100px" }}
                            >
                              <label className="btn btn-default btn-on btn-xs active ">
                                <input
                                  type="radio"
                                  value="1"
                                  name="multifeatured_module[module_id][status]"
                              
                                />
                                YES
                              </label>
                              <label className="btn btn-default btn-off btn-xs ">
                                <input
                                  type="radio"
                                  value="0"
                                  name="multifeatured_module[module_id][status]"
                                />
                                NO
                              </label>
                            </div>
                          </div>
                          <div
                            className="row collapsebutton"
                            style={{ marginTop: "10px" }}
                          >
                            <label className="collapse-text-1">
                              Confidence
                            </label>

                            <div
                              className="btn-group"
                              id="status"
                              data-toggle="buttons"
                              style={{ marginLeft: "145px" }}
                            >
                              <label className="btn btn-default btn-on btn-xs active ">
                                <input
                                  type="radio"
                                  value="1"
                                  name="multifeatured_module[module_id][status]"
                                  
                                />
                                YES
                              </label>
                              <label className="btn btn-default btn-off btn-xs ">
                                <input
                                  type="radio"
                                  value="0"
                                  name="multifeatured_module[module_id][status]"
                                />
                                NO
                              </label>
                            </div>
                          </div>
                          <div
                            className="row collapsebutton"
                            style={{ marginTop: "10px" }}
                          >
                            <label className="collapse-text-1">
                              Polite and Professionalism
                            </label>

                            <div
                              className="btn-group"
                              id="status"
                              data-toggle="buttons"
                              style={{ marginLeft: "64px" }}
                            >
                              <label className="btn btn-default btn-on btn-xs active ">
                                <input
                                  type="radio"
                                  value="1"
                                  name="multifeatured_module[module_id][status]"
                               
                                />
                                YES
                              </label>
                              <label className="btn btn-default btn-off btn-xs ">
                                <input
                                  type="radio"
                                  value="0"
                                  name="multifeatured_module[module_id][status]"
                                />
                                NO
                              </label>
                            </div>
                          </div>
                          <div
                            className="row collapsebutton"
                            style={{ marginTop: "10px" }}
                          >
                            <label className="collapse-text-1">
                              Apology/ Empathy
                            </label>

                            <div
                              className="btn-group"
                              id="status"
                              data-toggle="buttons"
                              style={{ marginLeft: "107px" }}
                            >
                              <label className="btn btn-default btn-on btn-xs active ">
                                <input
                                  type="radio"
                                  value="1"
                                  name="multifeatured_module[module_id][status]"
                                
                                />
                                YES
                              </label>
                              <label className="btn btn-default btn-off btn-xs ">
                                <input
                                  type="radio"
                                  value="0"
                                  name="multifeatured_module[module_id][status]"
                                />
                                NO
                              </label>
                            </div>
                          </div>
                          <div
                            className="row collapsebutton"
                            style={{ marginTop: "10px" }}
                          >
                            <label className="collapse-text-1">
                              Assurance/ reassurance
                            </label>

                            <div
                              className="btn-group"
                              id="status"
                              data-toggle="buttons"
                              style={{ marginLeft: "78px" }}
                            >
                              <label className="btn btn-default btn-on btn-xs active ">
                                <input
                                  type="radio"
                                  value="1"
                                  name="multifeatured_module[module_id][status]"
                                  
                                />
                                YES
                              </label>
                              <label className="btn btn-default btn-off btn-xs ">
                                <input
                                  type="radio"
                                  value="0"
                                  name="multifeatured_module[module_id][status]"
                                />
                                NO
                              </label>
                            </div>
                          </div>
                          <div
                            className="row collapsebutton"
                            style={{ marginTop: "10px" }}
                          >
                            <label className="collapse-text-1">
                              Acknowledgement
                            </label>

                            <div
                              className="btn-group"
                              id="status"
                              data-toggle="buttons"
                              style={{ marginLeft: "104px" }}
                            >
                              <label className="btn btn-default btn-on btn-xs active ">
                                <input
                                  type="radio"
                                  value="1"
                                  name="multifeatured_module[module_id][status]"
                                 
                                />
                                YES
                              </label>
                              <label className="btn btn-default btn-off btn-xs ">
                                <input
                                  type="radio"
                                  value="0"
                                  name="multifeatured_module[module_id][status]"
                                />
                                NO
                              </label>
                            </div>
                          </div>
                        </div>
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>
                  <Card>
                    <Accordion.Toggle as={Card.Header} eventKey="2">
                      <div className="row">
                        <div className="col-md-10">
                          <label className="collap-head-text">
                            COMMUNICATION SKILLS
                          </label>
                        </div>
                        <div
                          className="col-md-2"
                          style={{ textAlign: "right" }}
                        >
                          <img src={Down1Img} alt="down-arrow" />
                        </div>
                      </div>
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="2">
                      <Card.Body> </Card.Body>
                    </Accordion.Collapse>
                  </Card>
                  <Card>
                    <Accordion.Toggle as={Card.Header} eventKey="3">
                      <div className="row">
                        <div className="col-md-10">
                          <label className="collap-head-text">
                            ISSUE IDENTIFICATION & RESOLUTION
                          </label>
                        </div>
                        <div
                          className="col-md-2"
                          style={{ textAlign: "right" }}
                        >
                          <img src={Down1Img} alt="down-arrow" />
                        </div>
                      </div>
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="3">
                      <Card.Body></Card.Body>
                    </Accordion.Collapse>
                  </Card>
                  <Card>
                    <Accordion.Toggle as={Card.Header} eventKey="4">
                      <div className="row">
                        <div className="col-md-10">
                          <label className="collap-head-text">
                            DOCUMENTATION
                          </label>
                        </div>
                        <div
                          className="col-md-2"
                          style={{ textAlign: "right" }}
                        >
                          <img src={Down1Img} alt="down-arrow" />
                        </div>
                      </div>
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="4">
                      <Card.Body></Card.Body>
                    </Accordion.Collapse>
                  </Card>
                </Accordion>
              </div>

              <div style={{ marginLeft: "28px" }}>
                <button className="calculate-button">
                  <label className="calculate-button-text">
                    CALCULATE &nbsp; SCORE
                  </label>
                </button>
              </div>
              <br />

              {/* <Modal
                open={this.state.QALeadModel}
                onClose={this.QALeadListModelClose}
                modalId="QALeadList"
                overlayId="QALeadList-logout-ovrly"
              >
                <div>
                  <div className="row" style={{ marginLeft: "5px" }}>
                    <div className="QALeadList-Over-yellow">
                      <img
                        src={RactRightIcon}
                        alt="right-icon"
                        className="ract-right-icon"
                      />
                    </div>
                    <label className="name-text">Abhishak</label>
                  </div>

                  <div
                    className="row"
                    style={{ marginLeft: "5px", marginTop: "10px" }}
                  >
                    <div className="QALeadList-Over-yellow">
                      <img
                        src={RactRightIcon}
                        alt="right-icon"
                        className="ract-right-icon"
                      />
                    </div>
                    <label className="name-text">Rashmi</label>
                  </div>
                </div>
              </Modal> */}
            </div>
          </div>
        </div>
      </>
    );
  }
}


export default QAAuditview;