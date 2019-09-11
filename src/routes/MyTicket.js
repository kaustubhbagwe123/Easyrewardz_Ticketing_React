import React, { Component } from 'react';
import Modal from "react-responsive-modal";

class MyTicket extends Component {
        state = {
            open:false             
        };
      
    onOpenModal = () => {
        this.setState({ open: true });
      };
      onCloseModal = () => {
        this.setState({ open: false });
      };
    
    
    render() {
        const {open} = this.state;
        return (
            <div>
                <div className="head-header">
                    <div className="head-header-1">
                        <div className="row">
                            <div className="col-xs-3">
                                <img src="Images/headphone.png" alt="headphone" className="headphone" />
                            </div>
                            <div className="col-xs-9">
                                <label className="id-abc-1234">ID - ABC1234
                                    
                                    <span className="updated-2-d-ago">Updated 2d ago</span>
                                    {/* <button onClick={this.onOpenModal}>Open modal</button> */}
                                </label>
                            </div>
                            
                            <div className="col-xs-9 oval-head">
                                <img src="Images/headphone2.png" alt="headphone" className="oval-55" />
                                <label className="naman-r">Naman.R</label>
                                <img src="Images/down.png" alt="down" className="down-header" />
                                <button type="button" className="btn btn-primary2">Submit As Solved
                                <img src="Images/down-white.png" alt="headphone" className="down-white" />
                                </button>
                            </div>
                        </div>
                        <img src="Images/loading.png" alt="Loading" className="loading-rectangle" onClick={this.onOpenModal}/>
                    </div>
                </div>
                <Modal open={open} onClose={this.onCloseModal} size="sm" >
                    <h4>Historical Ticket</h4>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </p>
                </Modal>
                <div className="card-rectangle">
                    <div className="rectangle-box">
                        <div className="row">
                            <div className="col-md-3">
                                <label className="mobile-number">Mobile Number</label><br />
                                <label className="mobile-no">+91 9873470074</label>
                                <img src="Images/eye.png" alt="eye" className="eyeImg" />
                                <div className="bill-1">
                                    <img src="Images/bill-Invoice.png" alt="eye" className="billImg" />
                                </div>
                                <div className="card-space-1">
                                    <label className="target-closure-date">Target Closure Date &nbsp;</label>
                                    <label className="Date-target">28 March 19</label>
                                </div>
                            </div>
                            <div className="vl"></div>
                            <div className="col-md-6">
                                <div className="row">
                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <label className="label-4">Status</label>
                                            <select className="rectangle-9">
                                                <option>Select</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-md-4 dropdrown">
                                        <div className="form-group">
                                            <label className="label-4">Priority</label>
                                            <select className="rectangle-9">
                                                <option>Select</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-md-4 dropdrown">
                                        <div className="form-group">
                                            <label className="label-4">Brand</label>
                                            <select className="rectangle-9">
                                                <option>Select</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="row drop-card">
                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <label className="label-4">Category</label>
                                            <select className="rectangle-9">
                                                <option>Select</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-md-4 dropdrown">
                                        <div className="form-group">
                                            <label className="label-4">Sub Category</label>
                                            <select className="rectangle-9" >
                                                <option>Select</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-md-4 dropdrown">
                                        <div className="form-group">
                                            <label className="label-4">Issue Type</label>
                                            <select className="rectangle-9">
                                                <option>Select</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="v2"></div>
                                <div className="row data-store">
                                    <div className="col-md-12">
                                        <label className="label-4">Store</label>
                                        <label className="bata-rajouri-garden">BataRajouriGarden</label>
                                    </div>
                                    <div className="col-md-12">
                                        <label className="label-4">Product</label>
                                        <label className="bata-rajouri-garden">RedTennisCocaColaWhiteMonogr…</label>
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
                                Where I can see details of my rewards in the ‘Rewards’ tab within
                                the ‘Refer and Earn Rewards’ screen.You will also get details of which
                                of your friends have joined, which friends have transacted etc. on the same tab.</label>
                        </div>
                        <div className="row">
                            <div className="mask1">
                                <div className="mail-mask">
                                    <img src="Images/msg.png" alt="msg" className="smg-Img" />
                                    <label className="email">Email</label>
                                    <img src="Images/down-1.png" alt="down" className="down-1" />
                                    <img src="Images/arrow.png" alt="Arrow" className="arrow-img" />
                                    <div className="line-1"></div>
                                    <img src="Images/plus.png" alt="Plush" className="plush-img" />
                                </div>
                            </div>
                        </div>
                        <div className="row msg-row">
                            <div className="col-md-2">
                                <label className="messages-04">Messages: 04</label>
                            </div>
                            <div className="col-md-2">
                                <label className="notes-00">Notes: 00</label>
                            </div>
                            <div className="col-md-2">
                                <label className="task-03">Task: 03</label>
                            </div>
                            <div className="col-md-2">
                                <label className="claim-00">Claim: 00</label>
                            </div>
                        </div>
                        <div className="row">
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
                        <div className="row">
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
                        <div className="row">
                            <div className="col-md-4">
                                <img src="Images/right.png" alt="right" className="oval-5" />
                                <label className="solved-by-naman-r">Solved by NamanR</label>
                                <img src="Images/msg.png" alt="right" className="smg-Img" />
                            </div>
                            <div className="col-md-6">
                                <label className="i-have-solved-this-i">I Have solved this issue</label>
                            </div>
                            <div className="col-md-2">
                                <img src="Images/up-1.png" alt="up" className="up-1" />
                                <label className="comment">Comment</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="card-details">
                                <div className="card-details-1">
                                    <label className="label-5">Dear Matthew,</label>
                                    <label className="label-5">We're always working to make Shopify exactly what you need for
                                        your retails business. Your feedback helps us decide which features
                                        to build, and what improvements should be made to our platform.
                                        <br />
                                        <br />
                                        To help us make Shopify the best it can be, we want your
                                        feedback today, take a few minutes to fill out survays before
                                        Tuesday,July 7th.
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-5">
                                <div className="v5"></div>
                            </div>
                            <div className="col-md-2">
                                <label className="yesterday-02">YESTERDAY 02</label>
                            </div>
                            <div className="col-md-5">
                                <div className="v6"></div>
                            </div>
                        </div>
                        <div className="row" style={{ marginLeft: "20px" }}>
                            <div className="col-xs-3">
                                <img src="Images/loading1.png" alt="right" className="oval-loading" />
                            </div>
                            <div className="col-xs-9">
                                <label className="rashmi-c">Rashmi.C
                                    <span className="updated-2-d-ago">Reassign to Naman.R</span>
                                </label>
                            </div>
                            <div className="col-md-8">
                                <label className="hi-naman-please-hel">Hi @Naman Please help customer with voucher Issue</label>
                            </div>
                            <div className="col-md-2">
                                <label className="comment-text">Comment</label>
                            </div>
                        </div>
                        <div className="row row-spacing">
                            <div className="col-xs-3">
                                <img src="Images/headphone2.png" alt="headphone" className="oval-56" />
                            </div>
                            <div className="col-xs-9">
                                <label className="rashmi-c">Rashmi.C</label>
                                <img src="Images/facebook.png" alt="facebook" className="facebook" />
                            </div>
                            <div className="col-md-8">
                                <label className="hi-diwakar-i-really">
                                    <img src="Images/clip.png" alt="clip" className="clip" />&nbsp;
                                    Hi Diwakar, I really appreciate you joining us at Voucherify!
                                    My top priority is that you have a great experience.</label>
                            </div>
                            <label className="comment-text1">Comment</label>
                            <div className="col-md-2">

                            </div>
                        </div>
                        <div className="row row-spacing">
                            <div className="col-xs-3">
                                <img src="Images/avatar.png" alt="Avatar" className="oval-6" />
                            </div>
                            <div className="col-xs-9">
                                <label className="rashmi-c">Diwakar</label>
                                <img src="Images/headphone2.png" alt="headphone" className="headphone1" />
                            </div>
                            <div className="col-md-8">
                                <label className="need-to-change-my-sh">
                                    Need to change my shipping address</label>
                            </div>
                            <label className="reply-comment">
                                Reply<br />
                                Comment
                                </label>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default MyTicket