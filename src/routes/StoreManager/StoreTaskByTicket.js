import React, { Component, Fragment } from "react";
import Modal from "react-responsive-modal";
import storeImg from "./../../assets/Images/store.png";
import DownWhiteImg from "./../../assets/Images/down-white.png";
import DownBlueImg from "./../../assets/Images/down.png";
import NoEditImg from "./../../assets/Images/NoEdit.png";

class StoreTaskByTicket extends Component {
  constructor(props) {
    super(props);
    this.state = {
      SubmitBtnReopn: false
    };
  }
  handleSubmitReopnModalOpen() {
    this.setState({ SubmitBtnReopn: true });
  }
  handleSubmitReopnModalClose() {
    this.setState({ SubmitBtnReopn: false });
  }
  render() {
    return (
      <Fragment>
        <div className="edit-storeTask-header">
          <div className="tab-content">
            <div className="store-header-task">
              <ul className="nav alert-nav-tabs3" role="tablist">
                <li className="nav-item">
                  <a
                    className="nav-link active"
                    data-toggle="tab"
                    href="#Task-tab"
                    role="tab"
                    aria-controls="Task-tab"
                    aria-selected="true"
                  >
                    Task
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    data-toggle="tab"
                    href="#Ticket-tab"
                    role="tab"
                    aria-controls="Ticket-tab"
                    aria-selected="false"
                  >
                    Ticket
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="tab-content p-0">
          <div
            className="tab-pane fade show active"
            id="Task-tab"
            role="tabpanel"
            aria-labelledby="Task-tab"
          >
            <div className="headerBtn-store">
              <div className="btnstore-last">
                <div className="oval-5-1-new-store">
                  <img src={storeImg} alt="headphone" className="storeImg-11" />
                </div>
                <label className="naman-r">Naman.R</label>
                <img
                  src={DownBlueImg}
                  alt="headphone"
                  className="ImgBlue-lbl"
                />
                <button type="button" className="raisedClaim-storeBtn">
                  <label className="raisedClaim-lbl">RAISE CLAIM</label>
                </button>
                <button
                  type="button"
                  className="btn-store-resolved"
                  onClick={this.handleSubmitReopnModalOpen.bind(this)}
                >
                  <label className="myticket-submit-solve-button-text">
                    SUBMIT AS RESOLVED
                  </label>
                  <img
                    src={DownWhiteImg}
                    alt="headphone"
                    className="down-white"
                  />
                </button>
              </div>
              <Modal
                open={this.state.SubmitBtnReopn}
                onClose={this.handleSubmitReopnModalClose.bind(this)}
                closeIconId="close"
                modalId="SubmitReopn-popup"
                overlayId="logout-ovrly"
              >
                <div className="store-hdrtMdal">
                  <div className="row">
                    <label className="modal-lbl">
                      Submit as <span className="modal-lbl-1">Solved</span>
                    </label>
                  </div>
                  <div className="row" style={{ marginTop: "8px" }}>
                    <label className="modal-lbl">
                      Submit as <span className="modal-lbl-2">Closed</span>
                    </label>
                  </div>
                </div>
              </Modal>
            </div>
            <div className="row width">
              <div className="col-md-8">
                <div className="card store-card-padding">
                  <label className="store-Edit-lbl"> Task Title</label>
                  <input
                    type="text"
                    className="store-edit-txt"
                    placeholder="Enter Task Title"
                  />
                  <div className="row">
                    <div className="col-md-4 store-mrg">
                      <label className="store-Edit-lbl">Department</label>
                      <select
                        id="inputState"
                        className="form-control dropdown-label"
                      >
                        <option>Select</option>
                        <option>Internet</option>
                      </select>
                    </div>
                    <div className="col-md-4 store-mrg">
                      <label className="store-Edit-lbl">Function</label>
                      <select
                        id="inputState"
                        className="form-control dropdown-label"
                      >
                        <option>Select</option>
                        <option>Wifi</option>
                      </select>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12 store-mrg">
                      <label className="store-Edit-lbl">Task Details</label>
                      <textarea rows="8" className="textarea-store"></textarea>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12 store-mrg">
                      <label className="store-Edit-lbl">Comments</label>
                      <textarea
                        rows="8"
                        className="textarea-store-comments"
                        placeholder="Add your comment here"
                      ></textarea>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12 store-mrg">
                      <label className="store-Edit-lbl">Comments: 02</label>
                      <button className="butn-store">Add Comment</button>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12 store-mrg-1">
                      <div className="oval-5-1-new-store">
                        <img
                          src={storeImg}
                          alt="headphone"
                          className="storeImg-11"
                        />
                      </div>
                      <label className="naman-r-store">Naman.R</label>
                      <label className="store-hrLbl">5 hr ago</label>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12" style={{ marginTop: "3px" }}>
                      <span className="store-comment">Comment :</span>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <p className="store-cmt-comment">
                        Hi Diwakar, I really appreciate you joining us at
                        Voucherify! My top priority is that you have a great
                        experience with us and learn how to easily implement
                        successful promo campaigns.
                      </p>
                      <hr />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="oval-5-1-new-store">
                        <img
                          src={storeImg}
                          alt="headphone"
                          className="storeImg-11"
                        />
                      </div>
                      <label className="naman-r-store">Naman.R</label>
                      <label className="store-hrLbl">5 hr ago</label>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12" style={{ marginTop: "3px" }}>
                      <span className="store-comment">Comment :</span>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <p className="store-cmt-comment">
                        Hi Diwakar, I really appreciate you joining us at
                        Voucherify! My top priority is that you have a great
                        experience with us and learn how to easily implement
                        successful promo campaigns.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card store-card-2">
                  <div className="row">
                    <div className="col-md-6">
                      <label className="store-Edit-lbl">Issue Raised By:</label>
                    </div>
                    <div className="col-md-4">
                      <label className="store-Edit-lbl">Store Name:</label>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="oval-5-1-new-store">
                        <img
                          src={storeImg}
                          alt="headphone"
                          className="storeImg-11"
                        />
                      </div>
                      <label className="store-edit-data-1">Naman Rampal </label>
                    </div>
                    <div className="col-md-6">
                      <label className="store-edit-data">
                        Bata Store Name{" "}
                      </label>
                    </div>
                  </div>
                  <div className="row store-mrg-3">
                    <div className="col-md-6">
                      <label className="store-Edit-lbl">Store Address:</label>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <label className="store-edit-data">
                        Opposite sardar jalebi, Sadar Bazar Rd, Sadar
                        Bazar,Roshan Pura, Gurugram, Haryana 122007{" "}
                      </label>
                    </div>
                  </div>
                  <div className="row store-mrg-3">
                    <div className="col-md-6">
                      <label className="task-clouserDate">
                        Task Closure Date
                      </label>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <label className="store-date">28 March 19 </label>
                      <progress
                        className="progressbar-2"
                        value="60"
                        max="100"
                      ></progress>
                      <p className="progressbar-lbl">2 day</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className="tab-pane fade"
            id="Ticket-tab"
            role="tabpanel"
            aria-labelledby="Ticket-tab"
          >
            <div className="row width">
              <div className="col-md-8">
                <div className="card store-card-padding-ticket">
                  <label className="store-Edit-lbl"> Ticket Title</label>
                  <input
                    type="text"
                    className="store-edit-txt"
                    placeholder="Enter Ticket Title"
                  />
                  <img src={NoEditImg} alt="NoEditImg" className="noEditImg" />
                  <div className="row">
                    <div className="col-md-12 store-mrg">
                      <label className="store-Edit-lbl"> Ticket Details</label>
                      <textarea
                        rows="8"
                        className="textarea-store-comments"
                        placeholder="Add your Ticket Details here"
                      ></textarea>
                      <img
                        src={NoEditImg}
                        alt="NoEditImg"
                        className="noEditImg-1"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card store-card-2">
                  <div className="row">
                    <div className="col-md-6">
                      <label className="store-Edit-lbl">Customer Name:</label>
                    </div>
                    <div className="col-md-4">
                      <label className="store-Edit-lbl">Gender:</label>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <label className="store-edit-data-1">Mayank Arora</label>
                    </div>
                    <div className="col-md-6">
                      <label className="store-edit-data">Male</label>
                    </div>
                  </div>
                  <div className="row store-mrg-3">
                    <div className="col-md-6">
                      <label className="store-Edit-lbl">Mobile Number:</label>
                    </div>
                    <div className="col-md-6">
                      <label className="store-Edit-lbl">Email ID:</label>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <label className="store-edit-data">+91-9888382883</label>
                    </div>
                    <div className="col-md-6">
                      <label className="store-edit-data">
                        naman.kreative@gmail.com
                      </label>
                    </div>
                  </div>
                  <div className="hrMargin">
                    <hr />
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <label className="store-Edit-lbl">Status</label>
                    </div>
                    <div className="col-md-4">
                      <label className="store-Edit-lbl">Priority</label>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <label className="store-edit-data-1">Closed</label>
                    </div>
                    <div className="col-md-6">
                      <label className="store-edit-data">High</label>
                    </div>
                  </div>
                  <div className="row store-mrg-3">
                    <div className="col-md-6">
                      <label className="store-Edit-lbl">Category</label>
                    </div>
                    <div className="col-md-6">
                      <label className="store-Edit-lbl">Sub Category</label>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <label className="store-edit-data">Offline</label>
                    </div>
                    <div className="col-md-6">
                      <label className="store-edit-data">Card Issue</label>
                    </div>
                  </div>
                  <div className="row store-mrg-3">
                    <div className="col-md-6">
                      <label className="store-Edit-lbl">Type</label>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <label className="store-edit-data">Payment</label>
                    </div>
                  </div>
                  <div className="hrMargin">
                    <hr />
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <label className="store-Edit-lbl">Store</label>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <label className="store-edit-data">Bata Rajouri Garden</label>
                    </div>
                  </div>
                   <div className="row store-mrg-3">
                    <div className="col-md-6">
                      <label className="store-Edit-lbl">Product</label>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <label className="store-edit-data">Red Tennis Coca Cola White Shoes</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default StoreTaskByTicket;
