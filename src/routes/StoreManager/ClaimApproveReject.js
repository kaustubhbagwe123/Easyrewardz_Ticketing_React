import React, { Component, Fragment } from "react";
import { Collapse, CardBody, Card } from "reactstrap";
import TableDemo from "../TableDemo";
import BataShoes from "./../../assets/Images/Bata-shoes.jpg";
import ArrowImg from "./../../assets/Images/arrow.png";
import PlusImg from "./../../assets/Images/plus.png";
import Headphone2Img from "./../../assets/Images/headphone2.png";
import SearchBlackImg from "./../../assets/Images/searchBlack.png";
import DownImg from "./../../assets/Images/down.png";
import storeImg from "./../../assets/Images/store.png";

class ClaimApproveReject extends Component {
  constructor(props) {
    super(props);

    this.state = {
        collapse: false,
        SearchDetails: true
    };
    
  }
  handleToggle() {
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
          <div className="col-md-7">
            <label className="claim-title1">Claim Ticket ID :</label>
            <label className="claim-A22345">
              A22345
            </label>
            <label className="claim-title1">Task ID :</label>
            <label className="claim-A22345">
              A22345
            </label>
            <label className="claim-title1">Ticket ID :</label>
            <label className="claim-A22345">
              A22345
            </label>
          </div>
          <div className="col-md-5">
            {/* <div className="oval-approve">
              <img src={StoreIcon} style={{ padding: "1px",width:"22px",height:"18px" }} alt="store-icon"/>
              </div> */}
              <div className="oval-5-1-new-store" style={{marginLeft:"30px",marginRight:"15px"}}>
                <img src={storeImg} alt="headphone" className="storeImg-11" />
              </div>
              <label className="naman-R">Naman.R</label>
              <img src={DownImg} alt="down" className="down-header" />
            <div className="btn-approrej">
               
              <button type="button" className="btn-approrej1">
                APPROVE CLAIM
              </button>
              <button type="button" className="btn-approrej1">
                REJECT CLAIM
              </button>
            </div>
          </div>
        </div>
        <div className="back-color">
          <div className="row width">
            <div className="col-md-9-card">
              <div className="card card-radius">
                <div className="search-customer-padding">
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
                          onClick={this.handleToggle.bind(this)}
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

                    {/* <Collapse isOpen={this.state.collapse}>
                      <Card style={{ marginRight: "31px" }}>
                        <CardBody style={{ marginRight: "-162px" }}>
                          <div className="row">
                            <div className="col-md-6">
                              <label className="claim-A22345">
                                Order details
                              </label>
                            </div>
                            <div className="col-md-6">
                              <input
                                type="text"
                                className="search-order"
                                placeholder="Search Order"
                              />
                              <img
                                src={SearchBlackImg}
                                alt="Search"
                                className="searchImg-2"
                              />
                            </div>
                            <TableDemo />
                          </div>
                        </CardBody>
                      </Card>
                    </Collapse> */}
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
                  <img src={BataShoes} alt="Bata" className="claim-bataShoes" />


                  <div className="row ">
                    <label className="label-6">Comments By Store</label>
                  </div>
                  <div className="row comment-02-margin">
                    <div className="col-xs-3">
                      <img src={Headphone2Img} alt="headphone" className="oval-55 naman" />
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
                    <div className="col-md-12" style={{marginLeft:'-13px'}}>
                    <label className="claim-comment">
                      Hi Diwakar, I really appreciate you joining us at
                      Voucherify! My top priority is that you have a great
                      experince with us and learn how to easily implement
                      successful promo campaigns.
                    </label>
                    <hr/>
                  </div>
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
                </div>
              </div>

                <div className="card card-radius">
                  <div className="search-customer-padding">

                    <div className="row margin-claim">
                    <div className="form-group col-md-4">
                      <label className="label-6"> Claim Asked for %</label>
                      <input
                        type="text"
                        className="form-control textBox"
                        placeholder="Claim Percentage"
                      />
                    </div>
                    </div>
              
                  <div className="row margin-claim">
                    <div className="col-md-12">
                      <label className="label-6">Comments By Approval</label>
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
                    <label className="label-6">Comments By Approval: 02</label>
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
                    <div className="col-md-12" style={{marginLeft:'-13px'}}>
                    <label className="claim-comment">
                      Hi Diwakar, I really appreciate you joining us at
                      Voucherify! My top priority is that you have a great
                      experince with us and learn how to easily implement
                      successful promo campaigns.
                    </label>
                    <hr/>
                  </div>
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
                </div>
                </div>
            </div>
            
            <div className="col-md-3">
              <div className="card card-radius2 cardbor">
                <div className="alankrit">
                  <label><b>CUSTOMER NAME</b></label>
                  <label>
                    <span className="a">
                        A 
                    </span>
                        Alankrit
                  </label>
                </div>
                <div className="alankrit">
                  <label><b>PHONE NUMBER</b></label>
                  <label>+91-98734670074</label>
                </div>
                <div className="alankrit">
                  <label><b>ALTERNATE NUMBER</b></label>
                  <label>+91-98734670074</label>
                </div>
                <div className="alankrit">
                  <label><b>EMAIL</b></label>
                  <label>alankrit@easyrewardz.com</label>
                </div>
                <div className="alankrit">
                  <label><b>ALTERNATE EMAIL</b></label>
                  <label>alankrit@easyrewardz.com</label>
                </div>
                <div className="alankrit">
                  <label><b>GENDER</b></label>
                  <label>Male</label>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default ClaimApproveReject;
