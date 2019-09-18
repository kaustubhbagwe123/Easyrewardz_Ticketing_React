import React, { Component } from 'react'
import { Collapse, CardBody, Card } from 'reactstrap';
import TableDemo from './TableDemo';
import BataShoes from './../assets/Images/Bata-shoes.jpg';
import SearchBlueImg from './../assets/Images/search-blue.png'
import ArrowImg from './../assets/Images/arrow.png'
import PlusImg from './../assets/Images/plus.png'
import Headphone2Img from './../assets/Images/headphone2.png'
import SearchBlackImg from './../assets/Images/searchBlack.png'

class Claim extends Component {
    constructor(props) {
        super(props)
        this.state = {
            collapse: false
        }
        this.toggle = this.toggle.bind(this);
    }
    toggle() {
        this.setState(state => ({ collapse: !state.collapse }));
    }
    render() {
        return (
            <div>
                <div className="row claim-header-card">
                    <div className="col-md-9">
                        <label className="claim-ticket">Claim Ticket ID :</label>
                        <label className="claim-A22345"><b>A22345</b></label>
                    </div>
                    <div className="col-md-3">
                        <div className="btn-margin">
                            <button type="button" className="btn-btn-claim">CANCEL</button>
                            <button type="button" className="btn-claim">SUBMIT CLAIM</button>
                        </div>
                    </div>
                </div>
                <div className="back-color">
                    <div className="row">
                        <div className="col-md-9-card">
                            <div className="card card-radius">
                                <div className="search-customer-padding">
                                    <div className="first-margin">
                                        <label className="label-color"><b>SEARCH CUSTOMER BY</b></label>
                                        <label>
                                            (PHONE NUMBER, EMAIL ID, ORDER ID)<span className="span-color">*</span>
                                        </label>
                                        <label className="add-customer-color">
                                            ADD NEW CUSTOMER
                                </label>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-9">
                                            <input type="text" className="search-mobile-textbox" placeholder="Enter Phone Number" />
                                            <img src={SearchBlueImg} alt="Search" className="searchImg" />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="claim-status-card">
                                            <label><b>Claim Status: Open</b></label>
                                            <div className="line-2"></div>
                                            <img src={ArrowImg} alt="Arrow" className="arrow-img-1" />
                                            <div className="line-3"></div>
                                            <img src={PlusImg} alt="Plush" className="plush-img-1" onClick={this.toggle} />
                                        </div>

                                        <Collapse isOpen={this.state.collapse}>
                                            <Card style={{ marginRight: '31px' }}>
                                                <CardBody style={{ marginRight: '-162px' }}>
                                                    <div className="row">
                                                        <div className="col-md-6">
                                                            <label className="claim-A22345">Order details</label>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <input type="text" className="search-order" placeholder="Search Order" />
                                                            <img src={SearchBlackImg} alt="Search" className="searchImg-2"/>
                                                        </div>
                                                        <TableDemo />
                                                    </div>
                                                </CardBody>
                                            </Card>
                                        </Collapse>
                                    </div>
                                    <div className="row margin-claim">
                                        <div className="form-group col-md-4">
                                            <label className="label-6">Claim Category</label>
                                            <select id="inputState" className="form-control dropdown-label">
                                                <option>select</option>
                                            </select>
                                        </div>
                                        <div className="form-group col-md-4">
                                            <label className="label-6">Sub Category</label>
                                            <select id="inputState" className="form-control dropdown-label">
                                                <option>select</option>
                                            </select>
                                        </div>
                                        <div className="form-group col-md-4">
                                            <label className="label-6">Claim Type</label>
                                            <select id="inputState" className="form-control dropdown-label">
                                                <option>select</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="row margin-claim">
                                        <div className="form-group col-md-4">
                                            <label className="label-6"> Claim Asked for %</label>
                                            <input type="text" className="form-control textBox" placeholder="Claim Percentage" />
                                        </div>
                                        <div className="col-md-4" style={{ marginTop: '24px' }}>
                                            <button type="button" className=" form-control btn-btn-claim">Attach Product Image</button>
                                        </div>
                                    </div>
                                    <div className="row margin-claim">
                                        <div className="form-group col-md-4">
                                            <label className="label-6">Attached Image</label>
                                           
                                        </div>
                                        
                                    </div>
                                    <img src={BataShoes} alt="Bata" className="batashoes"/>
                                    <div className="row margin-claim">
                                        <div className="col-md-12">
                                            <label className="label-6">Comments</label>
                                            <hr></hr>
                                        </div>
                                        <div className="col-md-12">
                                        <textarea className="ticket-comments-textarea" placeholder="Add your Comment here"></textarea>
                                        </div>
                                    </div>
                                    <div className="row ">
                                        <label className="label-6">Comments: 02</label>
                                    </div>
                                    <div className="row comment-02-margin">
                                        <div className="col-xs-3">
                                        <img src={Headphone2Img} alt="headphone" className="oval-55"/>
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
                                            Hi Diwakar, I really appreciate you joining us at Voucherify! My top priority is that you
                                             have a great experince with us and learn how to easily implement successful promo campaigns.
                                        </label>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="card card-radius2">
                                <label><b>CUSTOMER NAME</b></label>
                                <label>Alankrit</label><br />
                                <label><b>PHONE NUMBER</b></label>
                                <label>+91-98734670074</label><br />
                                <label><b>ALTERNATE NUMBER</b></label>
                                <label>+91-98734670074</label><br />
                                <label><b>EMAIL</b></label>
                                <label>alankrit@easyrewardz.com</label><br />
                                <label><b>ALTERNATE EMAIL</b></label>
                                <label>alankrit@easyrewardz.com</label><br />
                                <label><b>GENDER</b></label>
                                <label>Male</label>
                                <br/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Claim
