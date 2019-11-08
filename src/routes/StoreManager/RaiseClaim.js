import React, { Component, Fragment } from "react";
import { Collapse, CardBody, Card } from "reactstrap";
import TableDemo from "../TableDemo";
import BataShoes from "./../../assets/Images/Bata-shoes.jpg";
import SearchBlueImg from "./../../assets/Images/search-blue.png";
import ArrowImg from "./../../assets/Images/arrow.png";
import PlusImg from "./../../assets/Images/plus.png";
import Headphone2Img from "./../../assets/Images/headphone2.png";
import SearchBlackImg from "./../../assets/Images/searchBlack.png";

class RaiseClaim extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapse: false,
      SearchDetails: true
    };
    this.toggle = this.toggle.bind(this);
  }
  toggle() {
    this.setState(state => ({ collapse: !state.collapse }));
  }
  handleShowSearchDetails() {
    this.setState({
      SearchDetails: !this.state.SearchDetails
    });
  }
  render() {
    return (
      <Fragment>
        <div className="row claim-header-card width">
          <div className="col-md-9">
            <label className="claim-ticket">Claim Ticket ID :</label>
            <label className="claim-A22345">
              <b>A22345</b>
            </label>
          </div>
          <div className="col-md-3">
            <div className="btn-margin">
              <button type="button" className="btn-btn-claim">
                CANCEL
              </button>
              <button type="button" className="btn-claim">
                SUBMIT CLAIM
              </button>
            </div>
          </div>
        </div>
        <div className="back-color">
          <div className="row width">
            <div className="col-md-9-card">
              <div className="card card-radius">
                <div className="search-customer-padding">
                  <div className="first-margin">
                    <label className="label-color">
                      <b>SEARCH CUSTOMER BY</b>
                    </label>
                    <label>
                      (PHONE NUMBER, EMAIL ID, ORDER ID)
                      <span className="span-color">*</span>
                    </label>
                    <label className="add-customer-color">
                      ADD NEW CUSTOMER
                    </label>
                  </div>
                  <div className="row">
                    <div className="col-md-9">
                      <input
                        type="text"
                        className="search-mobile-textbox"
                        placeholder="Enter Phone Number"
                      />
                      <img
                        src={SearchBlueImg}
                        alt="Search"
                        className="searchImg"
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12 claim-status-card">
                      <label>
                        <b>Claim Status: Open</b>
                      </label>
                      <div className="claimplus">
                        <span className="plusline1"></span>
                        <img
                          src={ArrowImg}
                          alt="Arrow"
                          className="arrow-img-1"
                        />
                        <span className="plusline2"></span>
                        <img
                          src={PlusImg}
                          alt="Plush"
                          className="plush-img-1"
                          onClick={this.toggle}
                        />
                      </div>
                    </div>

                    <Collapse isOpen={this.state.collapse} style={{width:'100%'}}>
                      <Card>
                        <CardBody style={{padding:"15px 5px 15px 20px"}}>
                          <div className="row">
                            <div className="col-md-6">
                              <label className="orderdetailtext">
                                Order details
                              </label>
                            </div>
                            <div className="col-md-6">
                              <input
                                type="text"
                                className="searchtext"
                                placeholder="Search Order"
                              />
                              <img
                                src={SearchBlackImg}
                                alt="Search"
                                className="searchImg-raise"
                                onClick={this.handleShowSearchDetails.bind(this)}
                              />
                              
                            </div>
                            <span className="Searchline"> </span>
                          </div>
                          {this.state.SearchDetails ? (
                            <div>
                              <TableDemo />
                            </div>
                          ) : (
                            <div className="uploadsearch">
                              <div className="row">
                                <div className="col-md-12 uploadsechmargin">
                                  <label className="uploadsearch-text">
                                    No order found with this number
                                  </label>
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-md-12 uploadsechmargin">
                                  <button
                                    type="button"
                                    className="uploadsearchbtn"
                                  >
                                    <label
                                      for="file-upload"
                                      className="uploadsearchbtn-text"
                                    >
                                      UPLOAD FILE
                                    </label>
                                  </button>
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-md-12 uploadsechmargin">
                                  <u>
                                    <a href="#!">DOWNLOAD SAMPLE FILE</a>
                                  </u>
                                </div>
                              </div>
                            </div>
                          )}
                        </CardBody>
                      </Card>
                    </Collapse>
                  </div>
                  <div className="row margin-claim">
                    <div className="form-group col-md-4">
                      <label className="label-6">Claim Category</label>
                      <select
                        id="inputState"
                        className="form-control dropdown-label"
                      >
                        <option>select</option>
                      </select>
                    </div>
                    <div className="form-group col-md-4">
                      <label className="label-6">Sub Category</label>
                      <select
                        id="inputState"
                        className="form-control dropdown-label"
                      >
                        <option>select</option>
                      </select>
                    </div>
                    <div className="form-group col-md-4">
                      <label className="label-6">Claim Type</label>
                      <select
                        id="inputState"
                        className="form-control dropdown-label"
                        style={{ width: "260px" }}
                      >
                        <option>select</option>
                      </select>
                    </div>
                  </div>
                  <div className="row margin-claim">
                    <div className="form-group col-md-4">
                      <label className="label-6"> Claim Asked for %</label>
                      <input
                        type="text"
                        className="form-control textBox"
                        placeholder="Claim Percentage"
                      />
                    </div>
                    <div className="col-md-4" style={{ marginTop: "44px" }}>
                      <button
                        type="button"
                        className=" form-control btn-btn-claim"
                      >
                        Attach Product Image
                      </button>
                    </div>
                  </div>
                  <div className="row margin-claim">
                    <div className="form-group col-md-4">
                      <label className="label-6">Attached Image</label>
                    </div>
                  </div>
                  <img src={BataShoes} alt="Bata" className="batashoes" />
                  <div className="row margin-claim">
                    <div className="col-md-12">
                      <label className="label-6">Comments</label>
                      <hr></hr>
                    </div>
                    <div className="col-md-12">
                      <textarea
                        className="ticket-comments-textarea"
                        placeholder="Add your Comment here"
                      ></textarea>
                      <div className="commentbt">
                        <button type="button" className="commentbtn">
                          <label className="txt">ADD COMMENT</label>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="row ">
                    <label className="label-6">Comments: 02</label>
                  </div>
                  <div className="row comment-02-margin">
                    <div className="col-xs-3">
                      <img
                        src={Headphone2Img}
                        alt="headphone"
                        className="oval-55 naman"
                      />
                    </div>
                    <div className="col-md-9">
                      <label className="naman-R">Naman.R</label>
                    </div>
                    <div className="col-md-2 hr-ago-margin">
                      <label className="hr-ago">5 hr ago</label>
                    </div>
                  </div>
                  <div className="row">
                    <label className="label-6">Comments:</label>
                  </div>
                  <div className="row">
                    <label>
                      Hi Diwakar, I really appreciate you joining us at
                      Voucherify! My top priority is that you have a great
                      experince with us and learn how to easily implement
                      successful promo campaigns.
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card card-radius2">
                <label>
                  <b>CUSTOMER NAME</b>
                </label>
                <label>Alankrit</label>
                <br />
                <label>
                  <b>PHONE NUMBER</b>
                </label>
                <label>+91-98734670074</label>
                <br />
                <label>
                  <b>ALTERNATE NUMBER</b>
                </label>
                <label>+91-98734670074</label>
                <br />
                <label>
                  <b>EMAIL</b>
                </label>
                <label>alankrit@easyrewardz.com</label>
                <br />
                <label>
                  <b>ALTERNATE EMAIL</b>
                </label>
                <label>alankrit@easyrewardz.com</label>
                <br />
                <label>
                  <b>GENDER</b>
                </label>
                <label>Male</label>
                <br />
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default RaiseClaim;
