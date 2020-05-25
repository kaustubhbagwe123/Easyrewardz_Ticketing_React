import React, { Component } from "react";
import SearchBlackImg from "./../../assets/Images/searchBlack.png";
import ChatThumbImg from "./../../assets/Images/chatthumb.png";
import { Drawer } from "antd";
import ReactTable from "react-table";
import { MyContext } from "./../../context";

class HistoricalChat extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ReactChatModel: false
    };
  }

  handleReactChatModelOpen() {
    this.setState({ ReactChatModel: true });
  }
  handleReactChatModelClose() {
    this.setState({ ReactChatModel: false });
  }
  HandleRowClickEvt = () => {
    return {
      onClick: e => {
        this.handleReactChatModelOpen();
      }
    };
  };
  render() {
    const TranslationContext = this.context.state.translateLanguage.default
    const datachat = [
      {
        Chatname: <label className="chatnamereact">Abhishek Verma</label>,
        chatAgent: <label className="chatnamereact">Vikas Kumar</label>,
        chatRating: <label className="chatnamereact">-</label>,
        chatTime: <label className="chatnamereact">3 hrs ago</label>,
        chatmsg: (
          <span>
            <span className="table-bchat">05</span>
            <label className="chatnamereact">
              Lorem ipsum dolar sit amet,consecteture adipiscing elit
            </label>
          </span>
        )
      },
      {
        Chatname: <label className="chatnamereact">Naman Rampal</label>,
        chatAgent: <label className="chatnamereact">Vikas Kumar</label>,
        chatRating: (
          <label className="chatnamereact">
            <img
              src={ChatThumbImg}
              alt="ChatThumb icon"
              className="chatthumb"
            />
          </label>
        ),
        chatTime: <label className="chatnamereact">12 hrs ago</label>,
        chatmsg: (
          <span>
            <span className="table-bchat">43</span>
            <label className="chatnamereact">
              Ut nulla mi, sodales id lectus eu, fermentum vehicula magna
            </label>
          </span>
        )
      },
      {
        Chatname: <label className="chatnamereact">Juhi Handa</label>,
        chatAgent: <label className="chatnamereact">Vikas Kumar</label>,
        chatRating: <label className="chatnamereact">-</label>,
        chatTime: <label className="chatnamereact">Jul 30 12:56 PM</label>,
        chatmsg: (
          <span>
            <span className="table-bchat">34</span>
            <label className="chatnamereact">
              Lorem ipsum dolar sit amet,consecteture adipiscing elit
            </label>
          </span>
        )
      },
      {
        Chatname: <label className="chatnamereact">Akriti Tiwari</label>,
        chatAgent: <label className="chatnamereact">Vikas Kumar</label>,
        chatRating: <label className="chatnamereact">-</label>,
        chatTime: <label className="chatnamereact">Jul 30 12:56 PM</label>,
        chatmsg: (
          <span>
            <span className="table-bchat">23</span>
            <label className="chatnamereact">
              Lorem ipsum dolar sit amet,consecteture adipiscing elit
            </label>
          </span>
        )
      },
      {
        Chatname: <label className="chatnamereact">Mansi Tiwari</label>,
        chatAgent: <label className="chatnamereact">Vikas Kumar</label>,
        chatRating: <label className="chatnamereact">-</label>,
        chatTime: <label className="chatnamereact">Jul 30 12:56 PM</label>,
        chatmsg: (
          <span>
            <span className="table-bchat">23</span>
            <label className="chatnamereact">
              Ut nulla mi, sodales id lectus eu, fermentum vehicula magna
            </label>
          </span>
        )
      },
      {
        Chatname: <label className="chatnamereact">Nidhi Jain</label>,
        chatAgent: <label className="chatnamereact">Vikas Kumar</label>,
        chatRating: (
          <label className="chatnamereact">
            <img
              src={ChatThumbImg}
              alt="ChatThumb icon"
              className="chatthumb"
            />
          </label>
        ),
        chatTime: <label className="chatnamereact">12 hrs ago</label>,
        chatmsg: (
          <span>
            <span className="table-bchat">43</span>
            <label className="chatnamereact">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit
            </label>
          </span>
        )
      }
    ];

    const columnschat = [
      {
        Header: "Name",
        accessor: "Chatname"
      },
      {
        Header: "Agent",
        accessor: "chatAgent"
      },
      {
        Header: "Rating",
        accessor: "chatRating"
      },
      {
        Header: "Time",
        accessor: "chatTime"
      },
      {
        Header: "Message",
        accessor: "chatmsg"
      }
    ];
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-3 p-0">
            <div className="chatbot-left">
              <div className="chat-cntr">
                <p> 
                {
                                    (() => {
                                      if (TranslationContext !== undefined) {
                                        return TranslationContext.p.ongoingchat
                                      }
                                      else {
                                        return "Ongoing Chats"
                                      }
                                    })()
                                  }
                              (03)
                </p>
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
                        <p>2 

                        {
                                    (() => {
                                      if (TranslationContext !== undefined) {
                                        return TranslationContext.p.newmesaage
                                      }
                                      else {
                                        return "New Messages"
                                      }
                                    })()
                                  }
                              
                        </p>
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
                        <p>1 
                        {
                                    (() => {
                                      if (TranslationContext !== undefined) {
                                        return TranslationContext.p.newmesaage
                                      }
                                      else {
                                        return "New Messages"
                                      }
                                    })()
                                  }
                          </p>
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
                        <p>
                        {
                                    (() => {
                                      if (TranslationContext !== undefined) {
                                        return TranslationContext.p.nonewmessage
                                      }
                                      else {
                                        return "No New Messages"
                                      }
                                    })()
                                  }

                        </p>
                        <p>1m:36s</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="chat-cntr">
                <p>
                {
                                    (() => {
                                      if (TranslationContext !== undefined) {
                                        return TranslationContext.p.newchats
                                      }
                                      else {
                                        return "New Chats"
                                      }
                                    })()
                                  }
                   (02)</p>
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
                        <p>
                        {
                                    (() => {
                                      if (TranslationContext !== undefined) {
                                        return TranslationContext.p.waitingforreply
                                      }
                                      else {
                                        return "Waiting for reply"
                                      }
                                    })()
                                  }
                              

                        </p>
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
                        <p>
                        {
                                    (() => {
                                      if (TranslationContext !== undefined) {
                                        return TranslationContext.p.waitingforreply
                                      }
                                      else {
                                        return "Waiting for reply"
                                      }
                                    })()
                                  }
                              

                        </p>
                        <p>1m:36s</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <button className="butn-inv hist-btn">
            {
                                    (() => {
                                      if (TranslationContext !== undefined) {
                                        return TranslationContext.button.myhistricalchat
                                      }
                                      else {
                                        return "My historical chat"
                                      }
                                    })()
                                  }
            </button>
          </div>
          <div className="col-lg-9 p-0">
            <div className="chat-historicalHdr">
              <label className="mychatHistoriLbl">
                
                {
                                    (() => {
                                      if (TranslationContext !== undefined) {
                                        return TranslationContext.label.myhistricalchat
                                      }
                                      else {
                                        return "My Historical Chat"
                                      }
                                    })()
                                  }
                </label>
              <div className="action-part d-flex align-items-center chatSrchHder">
                <input
                  type="text"
                  className="searchtextchat"
                  placeholder="SEARCH"
                />
                <img
                  src={SearchBlackImg}
                  alt="Search"
                  className="searchImg-raisechat"
                />
                <button className="butn cross">&times;</button>
              </div>
            </div>
            <div className="chatreact HistoChat">
              <ReactTable
                data={datachat}
                columns={columnschat}
                // resizable={false}
                defaultPageSize={6}
                showPagination={false}
                getTrProps={this.HandleRowClickEvt}
              />
            </div>
            <Drawer
              className="drawerchat"
              placement={"bottom"}
              closable={false}
              // onClose={this.handleChatDetailModelClose.bind(this)}
              visible={this.state.ReactChatModel}
            >
              <div className="row">
                <div className="col-md-8">
                  <label className="chaton">
                    Chat on Tuesday,July 30,2019 1:01:32 PM
                  </label>
                  <div className="crossdrawer">
                    <label onClick={this.handleReactChatModelClose.bind(this)}>
                      &times;
                    </label>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="name-num ml-2">
                    <label className="mohitdrawer">Mohit Verma</label>
                    <p className="num">+91-9873470074 / mohit90@gmail.com</p>
                  </div>
                  <div className="row">
                    <div className="col-md-6 twotho">
                      <label className="twothous">2000</label>
                      <label className="twothoustext">Last Purchase</label>
                    </div>
                    <div className="col-md-6 twotho">
                      <label className="twothous">02</label>
                      <label className="twothoustext">Open Ticket</label>
                    </div>
                  </div>
                </div>
              </div>
            </Drawer>
          </div>
        </div>
      </div>
    );
  }
}


HistoricalChat.contextType = MyContext;
export default HistoricalChat;
