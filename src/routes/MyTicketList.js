import React, { Component, Fragment } from "react";
import Demo from "../store/Hashtag.js";
import SearchIcon from "./../assets/Images/search-icon.png";
import TableArr from "./../assets/Images/table-arr.png";
import InfoIcon from "./../assets/Images/info-icon.png";
import TaskIconBlue from "./../assets/Images/task-icon-blue.png";
import TaskIconGray from "./../assets/Images/task-icon-gray.png";
import CliamIconBlue from "./../assets/Images/cliam-icon-blue.png";
import HeadPhone3 from "./../assets/Images/headphone3.png";
import BlackLeftArrow from "./../assets/Images/black-left-arrow.png";
import SearchBlackImg from "./../assets/Images/searchBlack.png";
import Headphone2Img from "./../assets/Images/headphone2.png";
import Modal from "react-bootstrap/Modal";
class MyTicketList extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      AssignModal:false
    }
  }
  
  hanleChange = () => {
    this.props.history.push("/admin/addSearchMyTicket");
  };
  hanleChange_MyTicket = () => {
    this.props.history.push("/admin/myticket");
  };
  handleAssignModalOpen(){
    this.setState({ AssignModal: true });
  }
  handleAssignModalClose(){
    this.setState({AssignModal:false});
  }
  render() {
    return (
      <Fragment>
        <div className="myticketlist-header">
          <table className="table">
            <tbody>
              <tr style={{ display: "contents" }}>
                <td
                  style={{
                    paddingLeft: "6px",
                    paddingTop: "6px",
                    paddingRight: "5px"
                  }}
                >
                  <div className="Escalation04-box1 ">
                    Escalation:{" "}
                    <label className="oval04">
                      <label style={{ color: "white", padding: "5px" }}>
                        04
                      </label>
                    </label>
                  </div>
                </td>

                <td style={{ paddingTop: "19px", paddingLeft: "1px" }}>
                  <label className="header-list-text">New: 09</label>{" "}
                </td>
                <td style={{ paddingTop: "19px" }}>
                  <label className="header-list-text">Open: 10</label>
                </td>
                <td style={{ paddingTop: "19px" }}>
                  <label className="header-list-text">Resolved: 15</label>{" "}
                </td>
                <td style={{ paddingTop: "19px" }}>
                  <label className="header-list-text">
                    Reassigned by me: 03
                  </label>
                </td>
                <td style={{ paddingTop: "19px" }}>
                  <label className="header-list-text">Closed: 12</label>
                </td>
                <td style={{ paddingTop: "19px" }}>
                  <label className="header-list-text">All: 56</label>
                </td>
                <td style={{ paddingTop: "19px" }}>
                  <label className="header-list-text">Follow Up: 03</label>
                </td>
                <td style={{ paddingTop: "19px" }}>
                  <label className="header-list-text">Draft: 05</label>
                </td>
                <td style={{ paddingTop: "18px" }}>
                  <button
                    className="myTicket-btn-A"
                    type="button"
                    onClick={this.handleAssignModalOpen.bind(this)}
                  >
                    A
                  </button>
                </td>
                <td style={{ paddingTop: "6px" }}>
                  <div>
                    <button
                      className="Add-ticket-button"
                      type="button"
                      onClick={this.hanleChange}
                    >
                      <label className="add-tickets">Add Tickets</label>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <Modal
          size="lg"
          show={this.state.AssignModal}
          // onHide={this.handleAssignModalClose.bind(this)}
          className="assign-modal-KBase"
        >
          <Modal.Header>
            <div className="assign-modal-header">
              <img
                src={BlackLeftArrow}
                alt="black-left-arrow-icon"
                className="black-left-arrow"
                onClick={this.handleAssignModalClose.bind(this)}
              />
              <label className="claim-details">Assign Tickets To</label>
              <img
                src={SearchBlackImg}
                alt="SearchBlack"
                className="black-left-arrow srch-mleft-spc"
              />
            </div>
          </Modal.Header>
          <Modal.Body>
            <div className="assign-modal-div">
              <input
                type="text"
                className="txt-1 txt-btmSpace"
                placeholder="First Name"
              />
              <input
                type="text"
                className="txt-1 txt-btmSpace"
                placeholder="Last Name"
              />
              <input
                type="text"
                className="txt-1 txt-btmSpace"
                placeholder="Email"
              />
              <div className="txt-btmSpace">
                <select
                  id="inputState"
                  className="form-control dropdown-setting"
                >
                  <option>Select</option>
                  <option>Designation</option>
                </select>
              </div>
              <button className="butn assign-btn" type="button">
                SEARCH
              </button>
              <a href="#!" className="anchorTag-clear">
                CLEAR
              </a>
            </div>
            <div className="assign-modal-body">
              <table>
                <thead>
                  <tr>
                    <th>Agent</th>
                    <th>Designation</th>
                    <th>Email</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <img
                        src={Headphone2Img}
                        alt="headphone"
                        className="oval-55 assign-hdphone"
                      />
                      Naman.R
                    </td>
                    <td>Supply</td>
                    <td>naman@flipkart.com</td>
                  </tr>
                  <tr>
                    <td>
                      <img
                        src={Headphone2Img}
                        alt="headphone"
                        className="oval-55 assign-hdphone"
                      />
                      Nidhi.J
                    </td>
                    <td>Supply</td>
                    <td>naman@flipkart.com</td>
                  </tr>
                  <tr>
                    <td>
                      <img
                        src={Headphone2Img}
                        alt="headphone"
                        className="oval-55 assign-hdphone"
                      />
                      Rashmi.C
                    </td>
                    <td>Supply</td>
                    <td>naman@flipkart.com</td>
                  </tr>
                  <tr>
                    <td>
                      <img
                        src={Headphone2Img}
                        alt="headphone"
                        className="oval-55 assign-hdphone"
                      />
                      Juhi.H
                    </td>
                    <td>Supply</td>
                    <td>naman@flipkart.com</td>
                  </tr>
                </tbody>
              </table>
              <textarea className="assign-modal-textArea" placeholder="Add Remarks"></textarea>
              <button className="assign-butn btn-assign-tikcet" type="button">
                ASSIGN TICKETS
              </button>
            </div>
          </Modal.Body>
        </Modal>
        <div className="container-fluid" style={{ marginTop: "30px" }}>
          <div className="table-cntr mt-3">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>
                    Status <img src={TableArr} alt="table-arr" />
                  </th>
                  <th className="table-img-cntr"></th>
                  <th>
                    Subject<span>/Lastest Message</span>
                  </th>
                  <th>
                    Category <img src={TableArr} alt="table-arr" />
                  </th>
                  <th>
                    Priority <img src={TableArr} alt="table-arr" />
                  </th>
                  <th>
                    Assignee <img src={TableArr} alt="table-arr" />
                  </th>
                  <th>
                    Creation on <img src={TableArr} alt="table-arr" />
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr onClick={this.hanleChange_MyTicket}>
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
                    Need to change my shipping address{" "}
                    <span>Hope this help, Please rate us</span>
                  </td>
                  <td>
                    Defective article{" "}
                    <img className="info-icon" src={InfoIcon} alt="info-icon" />
                  </td>
                  <td>High</td>
                  <td>Naman</td>
                  <td>
                    12 March 2018{" "}
                    <img className="info-icon" src={InfoIcon} alt="info-icon" />
                  </td>
                </tr>
                <tr onClick={this.hanleChange_MyTicket}>
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
                  <td className="table-img-cntr">
                    {/* <img
                          className="task-icon-1"
                          src="Images/task-icon-blue.png"
                          alt="missing"
                        /> */}
                  </td>
                  <td>
                    Need to change my shipping address{" "}
                    <span>Hope this help, Please rate us (1 new comment)</span>
                  </td>
                  <td>
                    Defective article{" "}
                    <img className="info-icon" src={InfoIcon} alt="info-icon" />
                  </td>
                  <td>High</td>
                  <td>Rashmi</td>
                  <td>
                    12 March 2018{" "}
                    <img className="info-icon" src={InfoIcon} alt="info-icon" />
                  </td>
                </tr>

                <tr onClick={this.hanleChange_MyTicket}>
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
                    <img
                      className="task-icon-1"
                      src={TaskIconBlue}
                      alt="task-icon-blue"
                    />
                  </td>
                  <td>
                    Need to change my shipping address{" "}
                    <span>Hope this help, Please rate us</span>
                  </td>
                  <td>
                    Defective article{" "}
                    <img className="info-icon" src={InfoIcon} alt="info-icon" />
                  </td>
                  <td>High</td>
                  <td>Shalini</td>
                  <td>
                    12 March 2018{" "}
                    <img className="info-icon" src={InfoIcon} alt="info-icon" />
                  </td>
                </tr>

                <tr onClick={this.hanleChange_MyTicket}>
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
                  <td className="table-img-cntr">
                    <img
                      className="task-icon-1"
                      src={TaskIconGray}
                      alt="task-icon-gray"
                    />
                  </td>
                  <td>
                    Need to change my shipping address{" "}
                    <span>Hope this help, Please rate us</span>
                  </td>
                  <td>
                    Defective article{" "}
                    <img className="info-icon" src={InfoIcon} alt="info-icon" />
                  </td>
                  <td>High</td>
                  <td>Vikash</td>
                  <td>
                    12 March 2018{" "}
                    <img className="info-icon" src={InfoIcon} alt="info-icon" />
                  </td>
                </tr>

                <tr onClick={this.hanleChange_MyTicket}>
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
                  <td className="table-img-cntr">
                    <img
                      className="claim-icon"
                      src={CliamIconBlue}
                      alt="cliam-icon-blue"
                    />
                    <img
                      className="task-icon-1"
                      src={TaskIconGray}
                      alt="task-icon-gray"
                    />
                  </td>
                  <td>
                    Need to change my shipping address{" "}
                    <span>Hope this help, Please rate us</span>
                  </td>
                  <td>
                    Defective article{" "}
                    <img className="info-icon" src={InfoIcon} alt="info-icon" />
                  </td>
                  <td>High</td>
                  <td>Nidhi</td>
                  <td>
                    12 March 2018{" "}
                    <img className="info-icon" src={InfoIcon} alt="info-icon" />
                  </td>
                </tr>

                <tr onClick={this.hanleChange_MyTicket}>
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
                  <td className="table-img-cntr">
                    {/* <img
                          className="task-icon-1"
                          src="Images/task-icon-blue.png"
                          alt="missing"
                        /> */}
                  </td>
                  <td>
                    Need to change my shipping address{" "}
                    <span>Hope this help, Please rate us (1 new comment)</span>
                  </td>
                  <td>
                    Defective article{" "}
                    <img className="info-icon" src={InfoIcon} alt="info-icon" />
                  </td>
                  <td>High</td>
                  <td>Mansi</td>
                  <td>
                    12 March 2018{" "}
                    <img className="info-icon" src={InfoIcon} alt="info-icon" />
                  </td>
                </tr>

                <tr onClick={this.hanleChange_MyTicket}>
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
                  <td>High</td>
                  <td>Naman</td>
                  <td>
                    12 March 2018
                    <img className="info-icon" src={InfoIcon} alt="info-icon" />
                  </td>
                </tr>
                <tr onClick={this.hanleChange_MyTicket}>
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
                  <td>High</td>
                  <td>Akriti</td>
                  <td>
                    12 March 2018
                    <img className="info-icon" src={InfoIcon} alt="info-icon" />
                  </td>
                </tr>
                <tr onClick={this.hanleChange_MyTicket}>
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
                  <td>High</td>
                  <td>Juhi</td>
                  <td>
                    12 March 2018
                    <img className="info-icon" src={InfoIcon} alt="info-icon" />
                  </td>
                </tr>

                <tr onClick={this.hanleChange_MyTicket}>
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
                  <td className="table-img-cntr">
                    {/* <img
                          className="task-icon-1"
                          src="Images/task-icon-blue.png"
                          alt="missing"
                        /> */}
                  </td>
                  <td>
                    Need to change my shipping address
                    <span>Hope this help, Please rate us (1 new comment)</span>
                  </td>
                  <td>
                    Defective article
                    <img className="info-icon" src={InfoIcon} alt="info-icon" />
                  </td>
                  <td>High</td>
                  <td>Shalini</td>
                  <td>
                    12 March 2018
                    <img className="info-icon" src={InfoIcon} alt="info-icon" />
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="pagi">
              <ul>
                <li>
                  <a href={Demo.BLANK_LINK}>&lt;</a>
                </li>
                <li>
                  <a href={Demo.BLANK_LINK}>1</a>
                </li>
                <li className="active">
                  <a href={Demo.BLANK_LINK}>2</a>
                </li>
                <li>
                  <a href={Demo.BLANK_LINK}>3</a>
                </li>
                <li>
                  <a href={Demo.BLANK_LINK}>4</a>
                </li>
                <li>
                  <a href={Demo.BLANK_LINK}>5</a>
                </li>
                <li>
                  <a href={Demo.BLANK_LINK}>6</a>
                </li>
                <li>
                  <a href={Demo.BLANK_LINK}>7</a>
                </li>
                <li>
                  <a href={Demo.BLANK_LINK}>&gt;</a>
                </li>
              </ul>
            </div>
            <div className="float-search">
              <small>Search Tickets</small>
              <img className="search-icon" src={SearchIcon} alt="search-icon" />
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default MyTicketList;
