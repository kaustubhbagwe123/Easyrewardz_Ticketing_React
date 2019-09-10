import React, { Component } from 'react'

class Chatbot extends Component {
    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-3 p-0">
                        <div className="chatbot-left">
                            <div className="chat-cntr">
                                <p>Ongoing Chats (03)</p>
                                <div className="chat-left-height">
                                    <div className="chat-info">
                                        <div className="d-flex align-items-center">
                                            <span className="dark-blue-ini initial">V</span>
                                            <div className="name-num ml-2">
                                                <p>Varun Kumar</p>
                                                <p className="num">+91-9873470074</p>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="mess-time">
                                                <p>2 New Messages</p>
                                                <p>56s</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="chat-info active">
                                        <div className="d-flex align-items-center">
                                            <span className="light-blue-ini initial">M</span>
                                            <div className="name-num ml-2">
                                                <p>Mohit Verma</p>
                                                <p className="num">Mohit90@gmail.com</p>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="mess-time">
                                                <p>1 New Messages</p>
                                                <p>1m:36s</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="chat-info">
                                        <div className="d-flex align-items-center">
                                            <span className="yellow-ini initial">A</span>
                                            <div className="name-num ml-2">
                                                <p>Ankit Gupta</p>
                                                <p className="num">+91-9382838834</p>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="mess-time">
                                                <p>No New Messages</p>
                                                <p>1m:36s</p>
                                            </div>
                                        </div>
                                    </div>
                                </div> 
                            </div>
                            <div className="chat-cntr">
                                <p>New Chats (02)</p>
                                <div className="chat-left-height">
                                    <div className="chat-info">
                                        <div className="d-flex align-items-center">
                                            <span className="green-ini initial">V</span>
                                            <div className="name-num ml-2">
                                                <p>Vipin Kumar</p>
                                                <p className="num">+91-9873470074</p>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="mess-time">
                                                <p>Waiting for reply</p>
                                                <p>56s</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="chat-info">
                                        <div className="d-flex align-items-center">
                                            <span className="orange-ini initial">M</span>
                                            <div className="name-num ml-2">
                                                <p>Mohit Kumar</p>
                                                <p className="num">Mohit90@gmail.com</p>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="mess-time">
                                                <p>Waiting for reply</p>
                                                <p>1m:36s</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                            <button className="butn-inv hist-btn">My historical chat</button>
                    </div>
                    <div className="col-lg-9 p-0">
                        <div className="chatbot-right">
                            <div className="top-tab-act">
                                <ul className="nav nav-tabs" role="tablist">
                                    <li className="nav-item">
                                        <a className="nav-link active" data-toggle="tab" href="#current-chat-tab" role="tab" aria-controls="current-chat-tab" aria-selected="true">Current Chat</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" data-toggle="tab" href="#recent-chat-tab" role="tab" aria-controls="recent-chat-tab" aria-selected="false">Recent Chat (08)</a>
                                    </li>
                                </ul>
                                <div className="action-part d-flex align-items-center">
                                    <select className="butn">
                                        <option value="">ACTION</option>
                                    </select>
                                    <button className="butn cross">&times;</button>
                                </div>
                            </div>
                            <div className="tab-content p-0">
                                <div className="tab-pane fade show active" id="current-chat-tab" role="tabpanel" aria-labelledby="current-chat-tab">
                                    <div className="row m-0">
                                        <div className="col-md-8"></div>
                                        <div className="col-md-4">
                                            <div className="chat-user-det">
                                                <div>
                                                    <div className="d-flex">
                                                        <p className="chat-user-name">Mohit Verma</p>
                                                        <a href="#" className="ml-2">
                                                            <img src="Images/user-info.png" alt="icon missing" />
                                                        </a>
                                                    </div>
                                                    <div className="chat-user-num">
                                                        <a href="tel:+91-9873470074">+91-9873470074</a>
                                                        <span>|</span>
                                                        <a href="mailto:mohit90@gmail.com">mohit90@gmail.com</a>
                                                    </div>
                                                </div>
                                                <div className="mess-time">
                                                    <p>Add visitor notes</p>
                                                    <textarea placeholder="Add Note"></textarea>
                                                </div>
                                                <div>
                                                    <div className="price-tic d-flex">
                                                        <div>
                                                            <p className="blue-clr font-weight-bold">&#8377; 2000</p>
                                                            <p>Last Purchase</p>
                                                        </div>
                                                        <div>
                                                            <p className="blue-clr font-weight-bold">02</p>
                                                            <p>Open Ticket</p>
                                                        </div>
                                                    </div>
                                                    <button className="butn mt-3 w-100">Create Ticket</button>
                                                    <div className="chat-extra-info">
                                                        <div>
                                                            <label className="black-clr">Location</label>
                                                            <p>New Delhi, National Capital Territory of Delhi, India</p>
                                                        </div>
                                                        <div>
                                                            <label className="black-clr">Browser</label>
                                                            <p>Chrome 09</p>
                                                        </div>
                                                        <div>
                                                            <label className="black-clr">Platform</label>
                                                            <p>Window 10</p>
                                                        </div>
                                                        <div>
                                                            <label className="black-clr">Device</label>
                                                            <p>Laptop</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="tab-pane fade" id="recent-chat-tab" role="tabpanel" aria-labelledby="recent-chat-tab">2</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Chatbot
