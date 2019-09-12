import React,{Component} from 'react';
import Modal from "react-modal";
 

class ClaimTabTicketView extends Component {
  constructor(props) {
    Modal.setAppElement("");
    super(props);

    this.state = {
      modalIsOpen: false
    };
    this.openModal = this.openModal.bind(this);

    this.closeModal = this.closeModal.bind(this);
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    this.subtitle.style.color = "#f00";
  }

  /* #region  for Open Modal Method*/
  openModal() {
    this.setState({ modalIsOpen: true });
  }
  /* #endregion */

  /* #region  For Close Modal Method */

  /* #endregion */
  closeModal() {
    this.setState({ modalIsOpen: false });
  }
  render() {
    return (
      <>
        <div className="head-header">
          <div className="head-header-1">
            <div className="row">
              <div className="col-xs-3">
                <img
                  src="Images/headphone.png"
                  alt="headphone"
                  className="headphone"
                />
              </div>
              <div className="col-xs-9">
                <label className="id-abc-1234">
                  ID - ABC1234
                  <span className="updated-2-d-ago">Updated 2d ago</span>
                  {/* <button onClick={this.onOpenModal}>Open modal</button> */}
                </label>
              </div>

              <div className="col-xs-9 oval-head">
                <img
                  src="Images/headphone2.png"
                  alt="headphone"
                  className="oval-55"
                />
                <label className="naman-r">Naman.R</label>
                <img src="Images/down.png" alt="down" className="down-header" />
                <button type="button" className="btn btn-primary2">
                  Submit As Solved
                  <img
                    src="Images/down-white.png"
                    alt="headphone"
                    className="down-white"
                  />
                </button>
              </div>
            </div>
            <img
              src="Images/loading.png"
              alt="Loading"
              className="loading-rectangle"
            />
            {/* <img src="Images/loading.png" alt="Loading" className="loading-rectangle" onClick={this.onOpenModal}/> */}
          </div>
        </div>
        {/* <div className="historical-model">

                
                <Modal open={open} onClose={this.onCloseModal} className="historical-model">
                    <h4>Historical Ticket</h4>
                        <HistoricalTable/>
                </Modal>
                </div> */}
        <div className="card-rectangle">
          <div className="rectangle-box">
            <div className="row">
              <div className="col-md-3">
                <label className="mobile-number">Mobile Number</label>
                <br />
                <label className="mobile-no">+91 9873470074</label>
                <img src="Images/eye.png" alt="eye" className="eyeImg" />
                <div className="bill-1">
                  <img
                    src="Images/bill-Invoice.png"
                    alt="eye"
                    className="billImg"
                  />
                </div>
                <div className="card-space-1">
                  <label className="target-closure-date">
                    Target Closure Date &nbsp;
                  </label>
                  <label className="Date-target">28 March 19</label>
                </div>
                <progress value="50" max="100"></progress>
                <p className="logout-label font-weight-bold prog-indi-1">
                  2 day
                </p>
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
                      <select className="rectangle-9">
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
                    <label className="bata-rajouri-garden">
                      BataRajouriGarden
                    </label>
                  </div>
                  <div className="col-md-12">
                    <label className="label-4">Product</label>
                    <label className="bata-rajouri-garden">
                      RedTennisCocaColaWhiteMonogr…
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
                  <img src="Images/msg.png" alt="msg" className="smg-Img" />
                  <label className="email">Email</label>
                  <img src="Images/down-1.png" alt="down" className="down-1" />
                  <img
                    src="Images/arrow.png"
                    alt="Arrow"
                    className="arrow-img"
                  />
                  <div className="line-1"></div>
                  <img
                    src="Images/plus.png"
                    alt="Plush"
                    className="plush-img"
                  />
                </div>
              </div>
            </div>
            <div className="row msg-row">
              <div className="col-md-2">
                <label className="messages-04-1">Messages: 04</label>
              </div>
              <div className="col-md-2">
                <label className="notes-00">Notes: 00</label>
              </div>
              <div className="col-md-2">
                <label className="task-03">Task: 03</label>
              </div>
              <div className="col-md-2">
                <label className="claim-00-1">Claim: 00</label>
              </div>
            </div>

            <div className="row table-cntr mt-3">
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>
                      Status
                      {/* Status <img src="Images/table-arr.png" alt="missing" /> */}
                    </th>
                    <th className="table-img-cntr"></th>
                    <th>
                      Subject<span>/Lastest Message</span>
                    </th>
                    <th>
                      Category <img src="Images/table-arr.png" alt="missing" />
                    </th>
                    <th>
                      Raised by <img src="Images/table-arr.png" alt="missing" />
                    </th>
                    <th>
                      Creation on{" "}
                      <img src="Images/table-arr.png" alt="missing" />
                    </th>
                    <th>
                      Assign to <img src="Images/table-arr.png" alt="missing" />
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr onClick={this.openModal}>
                    <td>ABC1234</td>
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
                      <img
                        className="info-icon"
                        src="Images/info-icon.png"
                        alt="issing"
                      />
                    </td>
                    <td>N Rampal</td>
                    <td>
                      12 March 2018{" "}
                      <img
                        className="info-icon"
                        src="Images/info-icon.png"
                        alt="missing"
                      />
                    </td>
                    <td>A. Bansal</td>
                  </tr>

                  <tr>
                    <td>ABC1234</td>
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
                      <span>
                        Hope this help, Please rate us (1 new comment)
                      </span>
                    </td>
                    <td>
                      Defective article{" "}
                      <img
                        className="info-icon"
                        src="Images/info-icon.png"
                        alt="imissing"
                      />
                    </td>
                    <td>N Rampal</td>
                    <td>
                      12 March 2018{" "}
                      <img
                        className="info-icon"
                        src="Images/info-icon.png"
                        alt="missing"
                      />
                    </td>
                    <td>G. Bansal</td>
                  </tr>

                  <tr>
                    <td>ABC1234</td>
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
                      Need to change my shipping address{" "}
                      <span>Hope this help, Please rate us</span>
                    </td>
                    <td>
                      Defective article{" "}
                      <img
                        className="info-icon"
                        src="Images/info-icon.png"
                        alt=" missing"
                      />
                    </td>
                    <td>N Rampal</td>
                    <td>
                      12 March 2018{" "}
                      <img
                        className="info-icon"
                        src="Images/info-icon.png"
                        alt="missing"
                      />
                    </td>
                    <td>G. Bansal</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <Modal
          className="CliamDetailsModal"
          onRequestClose={this.closeModal}
          isOpen={this.state.modalIsOpen}
        >
          <br />
          <div className="row">
            <div style={{ marginLeft: "40px" }}>
              <img
                src="Images/black-left-arrow.png"
                alt="back"
                className="black-left-arrow"
              />
            </div>
            <div className="col-md-8">
              <label className="claim-details">Claim Details</label>
            </div>
          </div>
          <hr />
          <div className="claimrowmargin">
            <label className="id-a-22134">ID - A22134</label>
          </div>

          <div className="row">
            <div className=" col-md-8" style={{ marginLeft: "25px" }}>
              <div className="row">
                <div className="col-md-3">
                  <label className="claim-category">CLAIM CATEGORY</label>
                </div>
                <div className="col-md-3">
                  <label className="sub-category">SUB CATEGORY</label>
                </div>
                <div className="col-md-3">
                  <label className="claim-type">CLAIM TYPE</label>
                </div>
                <div className="col-md-3">
                  <label className="claim-asked-for">CLAIM ASKED FOR</label>
                </div>
              </div>
              <div className="row">
                <div className="col-md-3">
                  <label className="recent-orders">RECENT ORDERS</label>
                </div>
                <div className="col-md-3">
                  <label className="refund">REFUND</label>
                </div>
                <div className="col-md-3">
                  <label className="refund">REFUND</label>
                </div>
                <div className="col-md-3">
                  <label className="refund">10</label>
                </div>
              </div>
              <div className="row">
                <div className="col-md-3">
                  <label className="customer-name">CUSTOMER NAME</label>
                </div>
                <div className="col-md-3">
                  <label className="phone-number">PHONE NUMBER</label>
                </div>
                <div className="col-md-3">
                  <label className="email-id">EMAIL</label>
                </div>
                <div className="col-md-3">
                  <label className="gender">GENDER</label>
                </div>
              </div>
              <div className="row">
                <div className="col-md-3">
                  <label className="refund">REFUND</label>
                </div>
                <div className="col-md-3">
                  <label className="recent-orders">RECENT ORDERS</label>
                </div>
                <div className="col-md-3">
                  <label className="refund">REFUND</label>
                </div>
                <div className="col-md-3">
                  <label className="refund">10</label>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div>
                <label className="attached-image">ATTACHED IMAGES</label>
              </div>
              <div>
                <img src="Images/bata.png" alt="bata"></img>
              </div>
            </div>
          </div>
          <br />
          <div className="claim-status-table" style={{ marginLeft: "20px" }}>
            <div className="claim-status-table-header">
              <label className="claim-status-open">Claim Status : Open</label>
            </div>

            <div className="row">
              <label className="order-details">Order details</label>
            </div>

            <hr />
            <div className="table-responsive" style={{ marginLeft: "10px" }}>
              <table className="table borderless">
                <tbody>
                  <tr>
                    <td>
                      <label className="invoice-number">Invoice number</label>
                    </td>
                    <td>
                      <label className="invoice-date">Invoice Date</label>
                    </td>
                    <td>
                      <label className="item-count">Item Count</label>
                    </td>
                    <td>
                      <label className="item-price">Item Price</label>
                    </td>
                    <td>
                      <label className="price-paid">Price Paid</label>
                    </td>
                    <td>
                      <label className="store-code">Store Code</label>
                    </td>
                    <td>
                      <label className="store-address">Store Address</label>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label className="bb-332398">BB332398</label>
                    </td>
                    <td>
                      <label className="bb-332398">12 Jan 2019</label>
                    </td>
                    <td>
                      <label className="bb-332398">02</label>
                    </td>
                    <td>
                      <label className="bb-332398">2999</label>
                    </td>
                    <td>
                      <label className="bb-332398">2999</label>
                    </td>
                    <td>
                      <label className="bb-332398">SB221</label>
                    </td>
                    <td>
                      <label className="bb-332398">
                        UNIT D-338, | SECOND FLO
                      </label>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="row" style={{ marginLeft: "15px" }}>
              <div className="claim-SKU-details-table">
                <table className="table borderless">
                  <tbody>
                    {/* ----------------------Header Start------------------------- */}
                    <tr>
                      <td>
                        <label className="invoice-number">SKU</label>
                      </td>
                      <td>
                        <label className="invoice-number">Product Name</label>
                      </td>
                      <td>
                        <label className="invoice-number">Price</label>
                      </td>
                      <td>
                        <label className="invoice-number">Price Paid</label>
                      </td>
                      <td>
                        <label className="invoice-number">Discount</label>
                      </td>
                      <td>
                        <label className="invoice-number">MOP</label>
                      </td>
                    </tr>
                    {/* -------------------------Header End---------------------------- */}
                    <tr>
                      <td>
                        <label className="bb-332398">BB332398</label>
                      </td>
                      <td>
                        <label className="bb-332398">Paper Bag Big</label>
                      </td>
                      <td>
                        <label className="bb-332398">2999</label>
                      </td>
                      <td>
                        <label className="bb-332398">2999</label>
                      </td>
                      <td>
                        <label className="bb-332398">0.00</label>
                      </td>
                      <td>
                        <label className="bb-332398">Cash</label>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <label className="bb-332398">BB332398</label>
                      </td>
                      <td>
                        <label className="bb-332398">Paper Bag Big</label>
                      </td>
                      <td>
                        <label className="bb-332398">03</label>
                      </td>
                      <td>
                        <label className="bb-332398">03</label>
                      </td>
                      <td>
                        <label className="bb-332398">0.00</label>
                      </td>
                      <td>
                        <label className="bb-332398">Cash</label>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="claim-status-row"></div>
            </div>
          </div>
          <br />
          <div className="row" style={{ marginLeft: "5px" }}>
            <div className="col-md-5">
              <textarea
                className="Add-Comments-textarea"
                placeholder="Add Comments"
              ></textarea>
            </div>
            <div className="col-md-7">
              <div className="row">
                <div className="col-md-2">
                  <div className="oval-5">
                    <img
                      src="Images/store.png"
                      style={{ padding: "2px" }}
                      alt="store"
                    />
                  </div>
                </div>
                <div className="col-md-10">
                  <div className="row">
                    <label className="varun-nagpal">Varun Nagpal</label>
                  </div>
                  <div className="row">
                    <label className="hi-diwakar-i-really">
                      Hi Diwakar, I really appreciate you joining us at
                      Voucherify! My top priority{" "}
                    </label>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-2">
                  <div className="oval-5">
                    <img
                      src="Images/store.png"
                      style={{ padding: "2px" }}
                      alt="store"
                    />
                  </div>
                </div>
                <div className="col-md-10">
                  <div className="row">
                    <label className="varun-nagpal">Varun Nagpal</label>
                  </div>
                  <div className="row">
                    <label className="hi-diwakar-i-really">
                      Hi Diwakar, I really appreciate you joining us at
                      Voucherify! My top priority{" "}
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row" style={{ marginLeft: "5px" }}>
            <div className="col-md-5">
              <button className="add-comment-button">
                <label className="add-comment-text">ADD COMMENT</label>
              </button>
            </div>
          </div>
        </Modal>
      </>
    );
  }
}

export default ClaimTabTicketView;