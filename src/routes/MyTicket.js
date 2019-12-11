import React, { Component, Fragment } from "react";
import Modal from "react-responsive-modal";
import { faCalculator } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import HistoricalTable from "./HistoricalTable";
import HeadphoneImg from "./../assets/Images/headphone.png";
import Headphone2Img from "./../assets/Images/headphone2.png";
import BlackUserIcon from "./../assets/Images/avatar.png";
import DownImg from "./../assets/Images/down.png";
import DownWhiteImg from "./../assets/Images/down-white.png";
import LoadingImg from "./../assets/Images/loading.png";
import EyeImg from "./../assets/Images/eye.png";
import BillInvoiceImg from "./../assets/Images/bill-Invoice.png";
import MsgImg from "./../assets/Images/msg.png";
import Down1Img from "./../assets/Images/down-1.png";
import ArrowImg from "./../assets/Images/arrow.png";
import PlusImg from "./../assets/Images/plus.png";
import MinusImg from "./../assets/Images/minus.png";
import RightImg from "./../assets/Images/right.png";
import DeleteImg from "./../assets/Images/del-black.png";
import Up1Img from "./../assets/Images/up-1.png";
import Loading1Img from "./../assets/Images/loading1.png";
import FacebookImg from "./../assets/Images/facebook.png";
import ClipImg from "./../assets/Images/clip.png";
import PencilImg from "./../assets/Images/pencil.png";
import CancelImg from "./../assets/Images/cancel.png";
import { Collapse, CardBody, Card } from "reactstrap";
import { Drawer } from "antd";
import CustomerIcon from "./../assets/Images/customer-icon.png";
import CrossIcon from "./../assets/Images/cancel.png";
import TikcetSystemStoreModal from "./../routes/TicketSystemStoreModal";
import StoreIcon from "./../assets/Images/store.png";
// import SendEmail from "./../assets/Images/sendEmail.png";
import MyTicketTask from "./Tabs/MyTicketTask";
import MyTicketClaim from "./Tabs/MyTicketClaim";
import FileUpload from "./../assets/Images/file.png";
import CKEditor from "ckeditor4-react";
import ReactTable from "react-table";
import KnowledgeLogo from "./../assets/Images/knowledge.png";
import DownArrowIcon from "./../assets/Images/down-1.png";
import CopyBlue from "./../assets/Images/copyblue.png";
import ViewBlue from "./../assets/Images/viewblue.png";
import ThumbTick from "./../assets/Images/thumbticket.png";
import AutoSave from "./../assets/Images/AutoSave.png";
import Email1 from "./../assets/Images/SecuredLetter2.png";
import Sms1 from "./../assets/Images/Sms.png";
import Facebook1 from "./../assets/Images/facebook.png";
import Call1 from "./../assets/Images/call.png";

class MyTicket extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      collapseUp: true,
      profilemodal: false,
      storemodal: false,
      storeproductsearch: false,
      headPhoneTable: false,
      labelModal: false,
      EmailCollapse: false,
      CommentsDrawer: false,
      BillInvoiceModal: false,
      HistOrderShow: true,
      CommentCollapse: false,
      CommentCollapse2: false,
      Comment1Collapse: false,
      KbLink: false,
      fileName: "",
      values: [
        {
          taskTitle: "",
          taskDescription: "",
          department: "",
          type: "",
          assign: ""
        }
      ]
    };
    this.toggleView = this.toggleView.bind(this);
  }

  fileUpload = e => {
    this.setState({ fileName: e.target.files[0].name });
  };
  fileDrop = e => {
    this.setState({ fileName: e.dataTransfer.files[0].name });
    e.preventDefault();
  };
  fileDragOver = e => {
    e.preventDefault();
  };
  fileDragEnter = e => {
    e.preventDefault();
  };
  toggleView() {
    this.setState({
      HistOrderShow: !this.state.HistOrderShow
    });
  }
  HandleKbLinkModalOpen() {
    this.setState({ KbLink: true });
  }
  HandleKbLinkModalClose() {
    this.setState({ KbLink: false });
  }

  HandleClaimPageView() {
    this.props.history.push("claimTabTicketView");
  }
  HandleStoreProductSearchModalOpen() {
    this.setState({ storeproductsearch: true });
  }
  HandleStoreProductSearchModalClose() {
    this.setState({ storeproductsearch: false });
  }
  HandleHeadePhoneModalOpen() {
    this.setState({ headPhoneTable: true });
  }
  HandleHeadePhoneModalClose() {
    this.setState({ headPhoneTable: false });
  }

  HandleStoreModalOpen() {
    this.setState({ storemodal: true });
  }
  HandleStoreModalClose() {
    this.setState({ storemodal: false });
  }
  handleUpOpen() {
    this.setState({ collapseUp: true });
  }
  handleUpClose() {
    this.setState({ collapseUp: false });
  }
  onOpenModal = () => {
    this.setState({ open: true });
  };
  onCloseModal() {
    this.setState({ open: false });
  }
  HandleProfileModalOpen() {
    this.setState({ profilemodal: true });
  }
  HandleProfileModalClose() {
    this.setState({ profilemodal: false });
  }
  HandlelabelModalOpen() {
    this.setState({ labelModal: true });
  }
  HandlelabelModalClose() {
    this.setState({ labelModal: false });
  }
  HandleEmailCollapseOpen() {
    this.setState(state => ({ EmailCollapse: !state.EmailCollapse }));
  }
  handleCommentCollapseOpen() {
    this.setState(state => ({ CommentCollapse: !state.CommentCollapse }));
  }
  handleCommentCollapseClose() {
    this.setState(state => ({ CommentCollapse: false }));
  }
  hanldeCommentOpen2() {
    this.setState({ CommentCollapse2: true });
  }
  hanldeCommentClose2() {
    this.setState({ CommentCollapse2: false });
  }
  handleCommentCollapseOpen2() {
    this.setState(state => ({ CommentCollapse2: !state.CommentCollapse2 }));
    this.handleCommentCollapseClose();
  }
  HandleComment1CollapseOpen() {
    this.setState(state => ({ Comment1Collapse: !state.Comment1Collapse }));
  }
  handleCommentsDrawerOpen() {
    this.setState({ CommentsDrawer: true });
  }
  handleCommentsDrawerClose() {
    this.setState({ CommentsDrawer: false });
  }
  handleBillImgModalOpen() {
    this.setState({ BillInvoiceModal: true });
  }
  handleBillImgModalClose() {
    this.setState({ BillInvoiceModal: false });
  }
  handleSubmitForm(e) {
    e.preventDefault();
  }
  handleAddNewForm() {
    this.setState(prevState => ({
      values: [
        ...prevState.values,
        {
          taskTitle: "",
          taskDescription: "",
          department: "",
          type: "",
          assign: ""
        }
      ]
    }));
  }
  componentWillMount() {
    this.setState({ HistOrderShow: true });
  }
  handleRemoveForm(i) {
    let values = [...this.state.values];
    values.splice(i, 1);
    this.setState({ values });
  }
  CreateUIForm() {
    return this.state.values.map((el, i) => (
      <div key={i}>
        <div className="comment-padding">
          <label className="cmt-lbl" value={el || ""}>
            Task {i + 1}
          </label>
          <img
            src={DeleteImg}
            alt="DeleteImg"
            className="deleteImg"
            onClick={this.handleRemoveForm.bind(this, i)}
          />
          <div className="frm-margin">
            <input
              type="text"
              name="taskTitle"
              className="cmdtxt-2"
              placeholder="Task Title"
              value={el.taskTitle || ""}
              onChange={this.handleChange.bind(this, i)}
            />
          </div>
          <div className="frm-margin1">
            <textarea
              rows="6"
              className="cmt-textarea"
              placeholder="Task Description"
              value={el.taskDescription || ""}
              name="taskDescription"
              onChange={this.handleChange.bind(this, i)}
            ></textarea>
          </div>
          <div className="row frm-margin1">
            <div className="col-md-6">
              <select
                className="cmt-regtangleDDL select-CmtDDl"
                name="department"
                // value={el.department || ""}
                defaultValue={el.department || ""}
                onChange={this.handleChange.bind(this, i)}
              >
                <option>Select</option>
                <option>Department</option>
              </select>
            </div>
            <div className="col-md-6">
              <select
                className="cmt-regtangleDDL select-CmtDDl"
                name="type"
                defaultValue={el.type || ""}
                onChange={this.handleChange.bind(this, i)}
              >
                <option>Select</option>
                <option>Type</option>
              </select>
            </div>
          </div>
          <div className="row frm-margin1">
            <div className="col-md-6">
              <select
                className="cmt-regtangleDDL select-CmtDDl"
                name="assign"
                defaultValue={el.assign || ""}
                onChange={this.handleChange.bind(this, i)}
              >
                <option>Select</option>
                <option>Assign to</option>
              </select>
            </div>
          </div>
        </div>
        <hr />
      </div>
    ));
  }
  handleChange(i, e) {
    const { name, value } = e.target;
    let values = [...this.state.values];
    values[i] = { ...values[i], [name]: value };
    this.setState({ values });
  }
  render() {
    const { open } = this.state;
    const HidecollapsUp = this.state.collapseUp ? (
      <img
        src={Up1Img}
        alt="up"
        className="up-1"
        onClick={this.handleUpClose.bind(this)}
      />
    ) : (
      <img
        src={Down1Img}
        alt="up"
        className="up-1"
        onClick={this.handleUpOpen.bind(this)}
      />
    );
    const HidecollapsUpKbLink = this.state.collapseUp ? (
      <img
        src={Up1Img}
        alt="up"
        className="down-icon-kb1"
        onClick={this.handleUpClose.bind(this)}
      />
    ) : (
      <img
        src={Down1Img}
        alt="up"
        className="down-icon-kb1"
        onClick={this.handleUpOpen.bind(this)}
      />
    );
    const EmailCollapseUpDown = this.state.EmailCollapse ? (
      <img
        src={MinusImg}
        alt="Minus"
        className="minus-img"
        onClick={this.HandleEmailCollapseOpen.bind(this)}
      />
    ) : (
      <img
        src={PlusImg}
        alt="Plush"
        className="plush-img"
        onClick={this.HandleEmailCollapseOpen.bind(this)}
      />
    );
    const data = [
      {
        orderNumber: "BB2213451123",
        MobileNum: <span>9873470074</span>,
        Amount: "13,500",
        purDate: (
          <span>
            <label>23 May 2018</label>
          </span>
        )
      },
      {
        orderNumber: "BB2213451123",
        MobileNum: <span>9873470074</span>,
        Amount: "12,500",
        purDate: (
          <span>
            <label>13 May 2018</label>
          </span>
        )
      },
      {
        orderNumber: "BB2213451123",

        MobileNum: <span>9873470074</span>,
        Amount: "11,500",
        purDate: (
          <span>
            <label>10 May 2019</label>
          </span>
        )
      },
      {
        orderNumber: "BB2213451123",
        MobileNum: <span>9873470074</span>,
        Amount: "15,200",
        purDate: (
          <span>
            <label>21 May 2015</label>
          </span>
        )
      },
      {
        orderNumber: "BB2213451123",
        MobileNum: <span>9873470074</span>,
        Amount: "10,000",
        purDate: (
          <span>
            <label>10 May 2017</label>
          </span>
        )
      }
    ];

    const columns = [
      {
        Header: <span className="historyTable-header">Order Number</span>,
        accessor: "orderNumber"
      },
      {
        id: "createdBy",
        Header: <span className="historyTable-header">Mobile Number</span>,
        accessor: "MobileNum"
      },
      {
        Header: <span className="historyTable-header">Amount</span>,
        accessor: "Amount"
      },
      {
        Header: <span className="historyTable-header">Purchase Date</span>,
        accessor: "purDate"
      }
    ];

    const data1 = [
      {
        sku: (
          <span>
            <div className="filter-type order1checkbox">
              <div className="filter-checkbox order2checkbox">
                <input type="checkbox" id="fil-id" name="filter-type" />
                <label htmlFor="fil-id">BB221345</label>
              </div>
            </div>
          </span>
        ),

        Name: (
          <span>
            <label>
              HUSH PUPPIES{" "}
              <span style={{ display: "block" }}>
                Blue Casual Shoes For Men
              </span>
            </label>
          </span>
        ),
        Price: "4500",
        Quantity: (
          <span>
            <label>01</label>
          </span>
        ),
        Mop: <label>Cash</label>
      },
      {
        sku: (
          <span>
            <div className="filter-type order1checkbox">
              <div className="filter-checkbox order2checkbox">
                <input type="checkbox" id="fil-id1" name="filter-type" />
                <label htmlFor="fil-id1">BB221345</label>
              </div>
            </div>
          </span>
        ),
        Name: (
          <span>
            <label>
              HUSH PUPPIES
              <span style={{ display: "block" }}>
                Blue Casual Shoes For Men
              </span>
            </label>
          </span>
        ),
        Price: "4500",
        Quantity: (
          <span>
            <label>01</label>
          </span>
        ),
        Mop: <label>Cash</label>
      }
    ];

    const columns1 = [
      {
        Header: <span className="historyTable-header ">SKU</span>,
        accessor: "sku"
      },
      {
        id: "createdBy",
        Header: <span className="historyTable-header">Name</span>,
        accessor: "Name"
      },
      {
        Header: <span className="historyTable-header">Price</span>,
        accessor: "Price"
      },
      {
        Header: <span className="historyTable-header">Quantity</span>,
        accessor: "Quantity"
      },
      {
        Header: <span className="historyTable-header">MOP</span>,
        accessor: "Mop"
      }
    ];
    return (
      <Fragment>
        <div className="head-header">
          <div className="head-header-1">
            <div className="row">
              <div className="col-12 col-xs-4 col-sm-4 col-md-3">
                <img src={HeadphoneImg} alt="headphone" className="headphone" />
                <label className="id-abc-1234">
                  ID - ABC1234
                  <span className="updated-2-d-ago">Updated 2d ago</span>
                </label>
                <img
                  src={LoadingImg}
                  alt="Loading"
                  className="loading-rectangle"
                  onClick={this.onOpenModal.bind(this)}
                />
              </div>

              <div className="historical-model">
                <Modal
                  open={open}
                  onClose={this.onCloseModal.bind(this)}
                  closeIconId="sdsg"
                  modalId="Historical-popup"
                  overlayId="logout-ovrly"
                >
                  <label className="lblHistorical">Historical Ticket</label>
                  <img
                    src={CancelImg}
                    alt="cancelImg"
                    className="cancalImg"
                    onClick={this.onCloseModal.bind(this)}
                  />
                  <HistoricalTable />
                </Modal>
              </div>

              <div className="col-12 col-xs-8 col-sm-8 col-md-9">
                <div style={{ float: "right", marginTop: "0px" }}>
                  <img
                    src={Headphone2Img}
                    alt="headphone"
                    className="oval-55"
                  />
                  <label
                    className="naman-r"
                    onClick={this.HandlelabelModalOpen.bind(this)}
                  >
                    Naman.R
                  </label>
                  <img src={DownImg} alt="down" className="down-header" />
                  <button
                    type="button"
                    className="myticket-submit-solve-button"
                    onClick={this.HandleHeadePhoneModalOpen.bind(this)}
                  >
                    <label className="myticket-submit-solve-button-text">
                      SUBMIT AS SOLVED
                    </label>
                    <img
                      src={DownWhiteImg}
                      alt="headphone"
                      className="down-white"
                    />
                  </button>
                </div>
              </div>
              <Modal
                open={this.state.labelModal}
                onClose={this.HandlelabelModalClose.bind(this)}
                closeIconId="close"
                modalId="labelmodel-popup"
                overlayId="logout-ovrly"
              >
                <div className="myTicket-table remov">
                  <table>
                    <thead>
                      <tr>
                        <th>Emp Id</th>
                        <th>Name</th>
                        <th>Designation</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>9938</td>
                        <td>Rashmi.C</td>
                        <td>Agent</td>
                      </tr>
                      <tr>
                        <td>3234</td>
                        <td>Juhi.H</td>
                        <td>Agent</td>
                      </tr>
                      <tr>
                        <td>3234</td>
                        <td>Nidhi.J</td>
                        <td>Agent</td>
                      </tr>
                      <tr>
                        <td>2343</td>
                        <td>Abhishek.C</td>
                        <td>Agent</td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="button-margin">
                    <button type="button" className="btn btn-outline-primary">
                      SELECT
                    </button>
                  </div>
                </div>
              </Modal>
              <Modal
                open={this.state.headPhoneTable}
                onClose={this.HandleHeadePhoneModalClose.bind(this)}
                closeIconId="close"
                modalId="HeadePhone-popup"
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
          </div>
        </div>
        <div className="card-rectangle">
          <div className="rectangle-box">
            <div className="row">
              <div className="col-md-3">
                <div style={{ padding: "15px" }}>
                  <label className="mobile-number">Mobile Number</label>
                  <br />
                  <label className="mobile-no">+91 9873470074</label>
                  <img
                    src={EyeImg}
                    alt="eye"
                    className="eyeImg"
                    onClick={this.HandleProfileModalOpen.bind(this)}
                  />
                  <Modal
                    open={this.state.profilemodal}
                    onClose={this.HandleProfileModalClose.bind(this)}
                    modalId="profile-popup"
                    overlayId="logout-ovrly"
                  >
                    <div className="profilemodalmaindiv">
                      <div style={{ float: "right" }}>
                        <img
                          src={CrossIcon}
                          alt="cross-icon"
                          className="pro-cross-icn"
                          onClick={this.HandleProfileModalClose.bind(this)}
                        />
                      </div>
                      <div className="row profilemodalrow">
                        <div className="col-md-6">
                          <label className="profilemodal-text">Name</label>
                          <label className="profilemodal-textval">
                            Diwakar Monga
                          </label>
                        </div>
                        <div className="col-md-6">
                          <label className="profilemodal-text">Mobile</label>
                          <label className="profilemodal-textval">
                            +91 9873470074
                          </label>
                        </div>
                      </div>
                      <div className="row profilemodalrow-1">
                        <div className="col-md-6">
                          <label className="profilemodal-text">Email</label>
                          <label className="profilemodal-textval">
                            monga24@gmail.com
                          </label>
                        </div>
                        <div className="col-md-6">
                          <input
                            type="text"
                            className="alternumber"
                            placeholder="Alternate Number"
                          />
                        </div>
                      </div>
                      <div className="row" style={{ marginLeft: "15px" }}>
                        <div className="openticketbox profilemodalrow-1">
                          <label className="open-tickets-box-text">
                            04
                            <small className="open-tickets-box-textval">
                              Open Tickets
                            </small>
                          </label>
                        </div>
                        <div className="openticketbox-2 profilemodalrow-1">
                          <label className="open-tickets-box-text">
                            11
                            <small className="open-tickets-box-textval">
                              Total Tickets
                            </small>
                          </label>
                        </div>
                      </div>
                      <div className="row profilemodal-row-3">
                        <img src={CustomerIcon} alt="customer-icon" />
                        <label className="full-profile-view-text">
                          FULL PROFILE VIEW
                        </label>
                      </div>
                    </div>
                  </Modal>
                  <div
                    className=""
                    style={{ display: "inline", marginLeft: "5px" }}
                  >
                    <img
                      src={BillInvoiceImg}
                      alt="eye"
                      className="billImg"
                      onClick={this.handleBillImgModalOpen.bind(this)}
                    />
                    <Modal
                      open={this.state.BillInvoiceModal}
                      onClose={this.handleBillImgModalClose.bind(this)}
                      modalId="BillInvoice-popup"
                      overlayId="logout-ovrly"
                    >
                      <div className="row">
                        <div className="col-md-5">
                          <div className="customerBill">
                            <img
                              src={CustomerIcon}
                              alt="customer-icon"
                              style={{ marginTop: "-10px" }}
                            />
                            <label className="customer-text">CUSTOMER</label>
                          </div>
                          <div className="row">
                            <div className="col-md-6 namepad">
                              <label className="fullna">Full Name</label>
                              <label className="namedi">Diwakar Monga</label>
                            </div>
                            <div className="col-md-6 namepad">
                              <label className="fullna">Mobile Number</label>
                              <label className="namedi">+91 9873470074</label>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-md-6 namepad">
                              <label className="fullna">Email ID</label>
                              <label className="namedi">
                                diwakar@gmail.com
                              </label>
                            </div>
                          </div>
                        </div>

                        <div className="col-md-7 xyz">
                          {this.state.HistOrderShow ? (
                            <div>
                              <div className="histo">
                                <img
                                  src={CustomerIcon}
                                  alt="customer-icon"
                                  style={{ marginTop: "-10px" }}
                                />
                                <label className="customer-text">
                                  HISTORICAL ORDER
                                </label>
                                <img
                                  src={CrossIcon}
                                  alt="cross-icon"
                                  style={{ float: "right" }}
                                  onClick={this.handleBillImgModalClose.bind(
                                    this
                                  )}
                                />
                              </div>
                              <div className="col-md-6">
                                <input
                                  type="text"
                                  className="search-orderhis"
                                  placeholder="Search Order"
                                />
                              </div>
                              <div className="tablehistrical">
                                <ReactTable
                                  data={data}
                                  columns={columns}
                                  // resizable={false}
                                  defaultPageSize={5}
                                  showPagination={false}
                                />
                              </div>

                              <div className="row skipmar">
                                <div className="col-md-5">
                                  <label className="skiptext">
                                    SKIP ATTATCHING ORDER
                                  </label>
                                </div>
                                <div className="col-md-7">
                                  <div className="calnex">
                                    <button type="button" className="calnexbtn">
                                      <label className="calnexbtn-text">
                                        Cancel
                                      </label>
                                    </button>
                                    <button
                                      type="button"
                                      className="calnexbtn1"
                                      onClick={this.toggleView}
                                    >
                                      <label className="calnexbtn1-text">
                                        Next
                                      </label>
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ) : (
                            <div>
                              <div className="row histo">
                                <div className="col-md-7">
                                  <img
                                    src={CustomerIcon}
                                    alt="customer-icon"
                                    style={{ marginTop: "-10px" }}
                                  />
                                  <img
                                    src={DownImg}
                                    alt="down"
                                    className="down-header"
                                  />
                                  <label className="customer-text">
                                    ORDER - BB2213451123
                                  </label>
                                </div>
                                <div className="col-md-5">
                                  <label className="customerOrder-text">
                                    ORDER
                                  </label>
                                  <label className="customerItem-text">
                                    ITEM
                                  </label>
                                  <div className="orderswitch">
                                    <div className="switch switch-primary d-inline">
                                      <input
                                        type="checkbox"
                                        id="editTasks-p-2"
                                      />
                                      <label
                                        htmlFor="editTasks-p-2"
                                        className="cr ord"
                                      ></label>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="tablehistrical tablehistricaldetail">
                                <ReactTable
                                  data={data1}
                                  columns={columns1}
                                  // resizable={false}
                                  defaultPageSize={2}
                                  showPagination={false}
                                />
                              </div>
                              <div className="row skipmar done">
                                <div className="col-md-12">
                                  <div className="calnex">
                                    <button type="button" className="calnexbtn">
                                      <label className="calnexbtn-text">
                                        Cancel
                                      </label>
                                    </button>
                                    <button
                                      type="button"
                                      className="calnexbtn1"
                                      onClick={this.handleBillImgModalClose.bind(
                                        this
                                      )}
                                    >
                                      <label className="calnexbtn1-text">
                                        DONE
                                      </label>
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </Modal>
                  </div>
                  <div className="card-space-1">
                    <label className="target-closure-date">
                      Target Closure Date &nbsp;
                    </label>
                    <label className="Date-target">28 March 19</label>
                  </div>
                  <div className="mobilenumber-resp">
                    <span className="line-respo"></span>
                    <label className="respo">Response</label>
                    <label className="resol">
                      <span className="line-resol"></span>
                      Resolution
                    </label>
                  </div>
                  <progress
                    style={{ width: "100%" }}
                    value="50"
                    max="100"
                  ></progress>
                  <p className="logout-label font-weight-bold prog-indi-1">
                    2 day
                  </p>
                </div>
              </div>
              <div className="col-md-6">
                <div className="mid-sec mid-secnew">
                  <div className="row mob-pad">
                    <div className="col-12 col-xs-12 col-sm-6 col-md-6 col-lg-4">
                      <div className="form-group">
                        <label className="label-4">Status</label>
                        <select className="rectangle-9 select-category-placeholder">
                          <option>Select</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-12 col-xs-12 col-sm-6 col-md-6 col-lg-4 dropdrown">
                      <div className="form-group">
                        <label className="label-4">Priority</label>
                        <select className="rectangle-9 select-category-placeholder">
                          <option>Select</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-12 col-xs-12 col-sm-6 col-md-6 col-lg-4 dropdrown">
                      <div className="form-group">
                        <label className="label-4">Brand</label>
                        <select className="rectangle-9 select-category-placeholder">
                          <option>Select</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-12 col-xs-12 col-sm-6 col-md-6 col-lg-4">
                      <div className="form-group">
                        <label className="label-4">Category</label>
                        <select className="rectangle-9 select-category-placeholder">
                          <option>Select</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-12 col-xs-12 col-sm-6 col-md-6 col-lg-4 dropdrown">
                      <div className="form-group">
                        <label className="label-4">Sub Category</label>
                        <select className="rectangle-9 select-category-placeholder">
                          <option>Select</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-12 col-xs-12 col-sm-6 col-md-6 col-lg-4 dropdrown">
                      <div className="form-group">
                        <label className="label-4">Issue Type</label>
                        <select className="rectangle-9 select-category-placeholder">
                          <option>Select</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-12 col-xs-12 col-sm-6 col-md-6 col-lg-4 dropdrown">
                      <div className="form-group">
                        <label className="label-4">Channel Of Purchase</label>
                        <select className="rectangle-9 select-category-placeholder">
                          <option>Select</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-12 col-xs-12 col-sm-6 col-md-6 col-lg-4 dropdrown">
                      <div className="form-group">
                        <label className="label-4">Ticket Action Type</label>
                        <select className="rectangle-9 select-category-placeholder">
                          <option>Select</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div style={{ padding: "15px 0" }}>
                  <div className="storebox">
                    <div className="form-group">
                      <label className="label-4 storeSpacing">Store</label>
                      <label
                        className="bata-rajouri-garden"
                        onClick={this.HandleStoreModalOpen.bind(this)}
                      >
                        Bata Rajouri Garden &nbsp;
                        <img
                          src={PencilImg}
                          alt="Pencile"
                          className="pencilImg"
                        />
                      </label>
                      <Modal
                        open={this.state.storemodal}
                        onClose={this.HandleStoreModalClose.bind(this)}
                        modalId="ticket-store-modal"
                        overlayId="layout-ticket-store-modal"
                      >
                        <div className="profilemodalmaindiv">
                          <div style={{ float: "" }}>
                            <img
                              src={CrossIcon}
                              alt="cross-icon"
                              className="pro-cross-icn-1"
                              onClick={this.HandleStoreModalClose.bind(this)}
                            />
                          </div>
                          <TikcetSystemStoreModal />
                        </div>
                      </Modal>
                    </div>
                    <div className="">
                      <label className="label-4">Product</label>
                      <label
                        className="bata-rajouri-garden"
                        onClick={this.HandleStoreModalOpen.bind(this)}
                      >
                        Red Tennis Coca Cola White Monogr...&nbsp;
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
        </div>
        <div style={{ padding: "15px", background: "#fff" }}>
          <div className="rectangle-3 text-editor">
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
              <img src={ThumbTick} alt="thumb" className="thumbtick" />
              <img src={ThumbTick} alt="thumb" className="thumbtick" />
            </div>
            <div className="row">
              <div className="mask1">
                <div className="mail-mask">
                  <div class="dropdown" style={{ display: "inherit" }}>
                    <button
                      class="dropdown-toggle my-tic-email"
                      type="button"
                      data-toggle="dropdown"
                    >
                      <img src={Email1} alt="email" className="EMFCImg" />
                          <span className="EMFCText">Email</span>
                      {/* <FontAwesomeIcon icon={faEnvelope} /> Email */}
                    </button>
                    <ul class="dropdown-menu">
                      <li>
                        <a href="#!">
                          <img src={Email1} alt="email" className="EMFCImg" />
                          <span className="EMFCText">Email</span>
                          {/* <FontAwesomeIcon icon={faEnvelope} /> Email */}
                        </a>
                      </li>
                      <li>
                        <a href="#!">
                          <img src={Sms1} alt="sma" className="EMFCImg" />
                          <span className="EMFCText">SMS</span>
                          {/* <FontAwesomeIcon icon={faCommentAlt} /> SMS */}
                        </a>
                      </li>
                      <li>
                        <a href="#!">
                          <img
                            src={Facebook1}
                            alt="facebook"
                            className="EMFCImg"
                          />
                          <span className="EMFCText">Facebook</span>
                          {/* <FontAwesomeIcon icon={faComment} /> Facebook */}
                        </a>
                      </li>
                      <li>
                        <a href="#!">
                          <img src={Call1} alt="call" className="EMFCImg" />
                          <span className="EMFCText">Call</span>
                          {/* <FontAwesomeIcon icon={faPhone} /> Call */}
                        </a>
                      </li>
                    </ul>
                  </div>

                  <div
                    className="mob-float"
                    style={{ display: "inline", float: "right" }}
                  >
                    <img src={ArrowImg} alt="Arrow" className="arrow-img" />
                    <div className="line-1"></div>
                    {EmailCollapseUpDown}
                  </div>
                </div>
              </div>
            </div>
            <div className="myTicketEmail">
              <Collapse isOpen={this.state.EmailCollapse}>
                <a href="#!" className="kblink" style={{ top: "5px" }}>
                  {/* <FontAwesomeIcon icon={faBrain} /> Kb Link */}
                  <img
                    src={KnowledgeLogo}
                    alt="KnowledgeLogo"
                    className="knoim"
                    onClick={this.HandleKbLinkModalOpen.bind(this)}
                  />
                  Kb Link
                </a>
                <div
                  class="dropdown collapbtn"
                  style={{ display: "inherit", top: "5px" }}
                >
                  <button
                    class="dropdown-toggle my-tic-email"
                    type="button"
                    data-toggle="dropdown"
                  >
                    <FontAwesomeIcon icon={faCalculator} /> Template
                  </button>
                  <ul class="dropdown-menu">
                    <li>
                      <a href="#!">Template 1</a>
                    </li>
                    <li>
                      <a href="#!">Template 2</a>
                    </li>
                    <li>
                      <a href="#!">Template 3</a>
                    </li>
                    <li>
                      <a href="#!">Template 4</a>
                    </li>
                  </ul>
                </div>
                <div>
                  <label className="kblink-auto">
                    <img src={AutoSave} alt="Auto" className="autosavekb" />
                    Auto Save
                  </label>
                </div>
                <Card>
                  <CardBody>
                    <div className="">
                      <CKEditor
                        config={{
                          toolbar: [
                            {
                              name: "basicstyles",
                              items: ["Bold", "Italic", "Strike"]
                            },
                            {
                              name: "styles",
                              items: ["Styles", "Format"]
                            },
                            {
                              name: "paragraph",
                              items: ["NumberedList", "BulletedList"]
                            },
                            {
                              name: "links",
                              items: ["Link", "Unlink"]
                            },
                            {
                              name: "insert",
                              items: ["Image", "Table"]
                            },
                            {
                              name: "tools",
                              items: ["Maximize"]
                            },
                            {
                              name: "editing",
                              items: ["Scayt"]
                            }
                          ]
                        }}
                      />
                    </div>
                  </CardBody>
                  <div className="row colladrowa">
                    <div className="col-md-12 colladrow">
                      <ul>
                        <li>
                          <label>To: diwarkar@gmail.com</label>
                        </li>
                        <li>
                          <label className="">
                            <input
                              type="text"
                              className="CCdi"
                              placeholder="CC: diwarkar@gmail.com"
                            />

                            <span className="one">+1</span>
                          </label>
                        </li>
                        <li>
                          <label className="">
                            <input
                              type="text"
                              className="CCdi"
                              placeholder="BCC: diwarkar@gmail.com"
                            />
                            <span className="one">+1</span>
                          </label>
                        </li>
                        <li>
                          <div className="filter-checkbox">
                            <input
                              type="checkbox"
                              id="fil-open"
                              name="filter-type"
                              style={{ display: "none" }}
                            />
                            <label
                              htmlFor="fil-open"
                              style={{ paddingLeft: "25px" }}
                            >
                              <span>Inform Store Note</span>
                            </label>
                          </div>
                        </li>
                        <li>
                          <span>
                            <input
                              id="file-upload"
                              className="file-upload1 d-none"
                              type="file"
                              onChange={this.fileUpload}
                            />
                            <label
                              htmlFor="file-upload"
                              onDrop={this.fileDrop}
                              onDragOver={this.fileDragOver}
                              onDragEnter={this.fileDragEnter}
                            >
                              <img
                                src={FileUpload}
                                alt="file-upload"
                                className="fileup"
                              />
                            </label>
                          </span>
                          <label style={{ color: "#2561a8" }}>3 files</label>
                        </li>
                        <li style={{ float: "right" }}>
                          <button className="sav">Save As Draft</button>
                          <button className="send">Send</button>
                        </li>
                      </ul>
                    </div>
                  </div>
                </Card>
              </Collapse>
            </div>
            <div>
              <Modal
                open={this.state.KbLink}
                onClose={this.HandleKbLinkModalClose.bind(this)}
                modalId="KbLink-popup"
                overlayId="logout-ovrlykb"
              >
                <div className="row" style={{ margin: "0" }}>
                  <div className="col-md-7" style={{ padding: "0" }}>
                    <div className="knokb">
                      <h5>
                        <img
                          src={KnowledgeLogo}
                          alt="KnowledgeLogo"
                          className="knoim1"
                        />
                        KNOWLEGE BASE
                      </h5>
                      <p>Message</p>
                      <div className="textkb">
                        <p className="table-details-data-modal">
                          Can I purchase a domain through Google?
                        </p>
                        {HidecollapsUpKbLink}
                        {/* <img
                          src={DownArrowIcon}
                          alt="down-arrow-icon"
                          className="down-icon-kb1"
                        /> */}
                        <Collapse isOpen={this.state.collapseUp}>
                          <Card>
                            <CardBody>
                              <p>
                                Google can help you purchase a domain through
                                one of our domain host partners. During sign up,
                                just select the option to 'buy a new
                                domain.'We'll then guide you through the process
                                to help you set up G suite for your new domain.
                              </p>
                              <img
                                src={CopyBlue}
                                alt=""
                                className="copyblue-kb"
                              />
                              <a href="#!" className="copyblue-kbtext">
                                Copy
                              </a>
                            </CardBody>
                          </Card>
                        </Collapse>
                      </div>

                      <div className="textkb">
                        <p className="table-details-data-modal">
                          Can I still use the previous version of Sites ?
                        </p>

                        <img
                          src={DownArrowIcon}
                          alt="down-arrow-icon"
                          className="down-icon-kb1"
                        />
                      </div>
                      <div className="textkb">
                        <p className="table-details-data-modal">
                          Can I still use the previous version of Sites ?
                        </p>
                        <img
                          src={DownArrowIcon}
                          alt="down-arrow-icon"
                          className="down-icon-kb1"
                        />
                      </div>
                      <div className="textkb">
                        <p className="table-details-data-modal">
                          Can I still use the previous version of Sites ?
                        </p>
                        <img
                          src={DownArrowIcon}
                          alt="down-arrow-icon"
                          className="down-icon-kb1"
                        />
                      </div>
                      <div className="textkb">
                        <p className="table-details-data-modal">
                          Can I still use the previous version of Sites ?
                        </p>
                        <img
                          src={DownArrowIcon}
                          alt="down-arrow-icon"
                          className="down-icon-kb1"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-5 kblinkright">
                    <div className="knokb-a">
                      <img
                        src={CancelImg}
                        alt="cancelImg"
                        className="cancalImg-kb"
                        onClick={this.HandleKbLinkModalClose.bind(this)}
                      />
                      <h5>KB TEMPLATE</h5>
                      <div className="form-group">
                        <select className="kblinkrectangle-9 select-category-placeholderkblink">
                          <option>Type</option>
                          <option>Type-a</option>
                          <option>Type-b</option>
                        </select>
                      </div>

                      <div className="form-group">
                        <select className="kblinkrectangle-9 select-category-placeholderkblink">
                          <option>Category</option>
                          <option>Category-a</option>
                          <option>Category-b</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <select className="kblinkrectangle-9 select-category-placeholderkblink">
                          <option>Sub-Category</option>
                          <option>Category-a</option>
                          <option>Category-b</option>
                        </select>
                      </div>
                      <div>
                        <button className="kblink-search">SEARCH</button>
                      </div>
                      <div style={{ marginTop: "275px" }}>
                        <a href="#!" className="copyblue-kbtext">
                          VIEW POLICY
                        </a>
                        <img
                          src={ViewBlue}
                          alt="viewpolicy"
                          className="viewpolicy-kb"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </Modal>
            </div>
            <div className="edit-storeTask-header newtab">
              <div className="tab-content">
                <div className="store-header-task">
                  <ul className="nav alert-nav-tabs3" role="tablist">
                    <li className="nav-item fo">
                      <a
                        className="nav-link active"
                        data-toggle="tab"
                        href="#Message-tab"
                        role="tab"
                        aria-controls="Message-tab"
                        aria-selected="true"
                      >
                        Message: 04
                      </a>
                    </li>
                    <li className="nav-item fo">
                      <a
                        className="nav-link"
                        data-toggle="tab"
                        href="#Notes-tab"
                        role="tab"
                        aria-controls="Notes-tab"
                        aria-selected="false"
                      >
                        Notes: 00
                      </a>
                    </li>
                    <li className="nav-item fo">
                      <a
                        className="nav-link"
                        data-toggle="tab"
                        href="#Task-tab"
                        role="tab"
                        aria-controls="Task-tab"
                        aria-selected="false"
                      >
                        Task: 03
                      </a>
                    </li>
                    <li className="nav-item fo">
                      <a
                        className="nav-link"
                        data-toggle="tab"
                        href="#Claim-tab"
                        role="tab"
                        aria-controls="Claim-tab"
                        aria-selected="false"
                      >
                        Claim: 00
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="tab-content p-0">
              <div
                className="tab-pane fade"
                id="Claim-tab"
                role="tabpanel"
                aria-labelledby="Claim-tab"
              >
                <MyTicketClaim />
              </div>
              <div
                className="tab-pane fade show active"
                id="Message-tab"
                role="tabpanel"
                aria-labelledby="Message-tab"
                style={{ marginTop: "10px" }}
              >
                <div className="row message-header">
                  <div className="col-12 col-xs-12 col-sm-3">
                    <label className="user-label">User</label>
                  </div>
                  <div className="col-12 col-xs-12 col-sm-7">
                    <label className="message-label">Message</label>
                  </div>
                  <div className="col-12 col-xs-12 col-sm-2">
                    <label className="action-label">Action</label>
                  </div>
                </div>
                <div className="row top-margin">
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
                <div className="row top-margin">
                  <div className="col-12 col-xs-12 col-sm-4 col-md-3">
                    <div className="row" style={{ marginTop: "0" }}>
                      <div className="oval-5-1">
                        <img
                          src={RightImg}
                          alt="right"
                          className="right-icon"
                        />
                      </div>
                      <label
                        className="solved-by-naman-r"
                        style={{ marginLeft: "7px" }}
                      >
                        Solved by NamanR
                      </label>
                      <img src={MsgImg} alt="right" className="smg-Img1" />
                    </div>
                  </div>
                  <div className="col-12 col-xs-12 col-sm-6 col-md-7">
                    <label className="i-have-solved-this-i">
                      I Have solved this issue
                    </label>
                  </div>
                  <div className="col-12 col-xs-12 col-sm-2 col-md-2 mob-flex">
                    {HidecollapsUp}
                    <label
                      className="comment"
                      onClick={this.handleCommentsDrawerOpen.bind(this)}
                    >
                      Comment
                    </label>
                  </div>
                  <Drawer
                    placement="right"
                    closable={false}
                    onClose={this.handleCommentsDrawerClose.bind(this)}
                    visible={this.state.CommentsDrawer}
                    className="commentsDwarer"
                  >
                    <div className="drawer-header-1">
                      <label className="lblHeader-drawer">Task</label>
                      <button
                        type="button"
                        className="btn-addMoreTask"
                        onClick={this.handleAddNewForm.bind(this)}
                      >
                        ADD MORE TASK
                      </button>
                    </div>
                    <form onSubmit={this.handleSubmitForm.bind(this)}>
                      {this.CreateUIForm()}
                    </form>
                  </Drawer>
                </div>
                <div className="row card-op-out">
                  <div className="col-12 col-xs-12 col-sm-4 col-md-3"></div>
                  <div className="col-12 col-xs-12 col-sm-6 col-md-7">
                    <Collapse isOpen={this.state.collapseUp}>
                      <Card>
                        <CardBody>
                          <div className="card-details">
                            <div className="card-details-1">
                              <label className="label-5">Dear Matthew,</label>
                              <label className="label-5">
                                We're always working to make Shopify exactly
                                what you need for your retails business. Your
                                feedback helps us decide which features to
                                build, and what improvements should be made to
                                our platform.
                                <br />
                                <br />
                                To help us make Shopify the best it can be, we
                                want your feedback today, take a few minutes to
                                fill out survays before Tuesday,July 7th.
                              </label>
                            </div>
                          </div>
                        </CardBody>
                      </Card>
                    </Collapse>
                  </div>
                  <div className="col-12 col-xs-12 col-sm-2"></div>
                </div>

                <div className="row">
                  <div className="col-md-5">
                    <div className="v3"></div>
                  </div>
                  <div className="col-md-2">
                    <label className="yesterday-02">YESTERDAY 02</label>
                  </div>
                  <div className="col-md-5">
                    <div className="v6"></div>
                  </div>
                </div>

                <div className="row new-top-bottom-margin">
                  <div className="col-12 col-xs-12 col-sm-4 col-md-3">
                    <img
                      src={Loading1Img}
                      alt="right"
                      className="oval-loading"
                    />
                    <label className="rashmi-c">
                      Rashmi.C
                      <span>
                        <label className="updated-2-d-ago">
                          Reassign to
                          <label className="lable-name">Naman.R</label>
                        </label>
                      </span>
                    </label>
                  </div>
                  <div className="col-12 col-xs-12 col-sm-6 col-md-7">
                    <label className="hi-naman-please-hel">
                      Hi @Naman Please help customer with voucher Issue
                    </label>
                  </div>
                  <div className="col-12 col-xs-12 col-sm-2 mob-flex">
                    <label
                      className="comment-text"
                      onClick={this.handleCommentCollapseOpen.bind(this)}
                    >
                      Comment
                    </label>
                  </div>
                  <div className="row" style={{ width: "100%" }}>
                    <div className="col-12 col-xs-12 col-sm-4 col-md-3"></div>
                    <div className="col-12 col-xs-12 col-sm-8 col-md-9">
                      <div className="commentcollapseTicket">
                        <Collapse isOpen={this.state.CommentCollapse}>
                          <Card>
                            <CardBody>
                              <div className="commenttextborder">
                                <div className="Commentlabel">
                                  <label className="Commentlabel1">
                                    Comment
                                  </label>
                                </div>
                                <div>
                                  <span className="comment-line"></span>
                                  <img
                                    src={MinusImg}
                                    alt="Minus"
                                    className="CommentMinus-img"
                                  />
                                </div>
                                <div className="commenttextmessage">
                                  <label style={{ marginBottom: "10px" }}>
                                    Hello,
                                  </label>
                                  <label>
                                    I saw a vintage table lamp on your site last
                                    month and I'd bookmarked it to buy it later
                                    for a friend. I can't seem to find it
                                    anymore through.
                                    <br></br>Is it out of stock or do you not
                                    sell those anymore ?
                                  </label>
                                  <label
                                    style={{
                                      marginTop: "10px",
                                      display: "block"
                                    }}
                                  >
                                    Thanks
                                  </label>
                                  <label>Naman Rampal.</label>
                                </div>
                                <div className="SendCommentBtn">
                                  <button
                                    className="SendCommentBtn1"
                                    onClick={this.handleCommentCollapseOpen2.bind(
                                      this
                                    )}
                                  >
                                    SEND
                                  </button>
                                </div>
                              </div>
                            </CardBody>
                          </Card>
                        </Collapse>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="myTicketCommentCollapse myTicketEmail">
                  <Collapse isOpen={this.state.CommentCollapse2}>
                    <div className="col-12" style={{ marginTop: "5px" }}>
                      <div className="mask1">
                        <div className="mail-mask">
                          <div class="dropdown" style={{ display: "inherit" }}>
                            <button
                              class="dropdown-toggle my-tic-email"
                              type="button"
                              data-toggle="dropdown"
                            >
                              <img src={Email1} alt="email" className="EMFCImg" />
                          <span className="EMFCText">Email</span>
                              {/* <FontAwesomeIcon icon={faEnvelope} /> Email */}
                            </button>
                            <ul class="dropdown-menu">
                              <li>
                                <a href="#!">
                                  <img
                                    src={Email1}
                                    alt="email"
                                    className="EMFCImg"
                                  />
                                  <span className="EMFCText">Email</span>
                                  {/* <FontAwesomeIcon icon={faEnvelope} /> Email */}
                                </a>
                              </li>
                              <li>
                                <a href="#!">
                                  <img
                                    src={Sms1}
                                    alt="sms"
                                    className="EMFCImg"
                                  />
                                  <span className="EMFCText">SMS</span>
                                  {/* <FontAwesomeIcon icon={faCommentAlt} /> SMS */}
                                </a>
                              </li>
                              <li>
                                <a href="#!">
                                  <img
                                    src={Facebook1}
                                    alt="facebook"
                                    className="EMFCImg"
                                  />
                                  <span className="EMFCText">Facebook</span>
                                  {/* <FontAwesomeIcon icon={faComment} /> Facebook */}
                                </a>
                              </li>
                              <li>
                                <a href="#!">
                                  <img
                                    src={Call1}
                                    alt="call"
                                    className="EMFCImg"
                                  />
                                  <span className="EMFCText">Call</span>
                                  {/* <FontAwesomeIcon icon={faPhone} /> Call */}
                                </a>
                              </li>
                            </ul>
                          </div>

                          <label className="kblink-auto1">
                            <img
                              src={AutoSave}
                              alt="Auto"
                              className="autosavekb"
                            />
                            Auto Save
                          </label>

                          <a href="#!" className="kblink">
                            <img
                              src={KnowledgeLogo}
                              alt="KnowledgeLogo"
                              className="knoim"
                            />{" "}
                            Kb Link
                          </a>

                          <div
                            class="dropdown collapbtn"
                            style={{ display: "inherit" }}
                          >
                            <button
                              class="dropdown-toggle my-tic-email"
                              type="button"
                              data-toggle="dropdown"
                            >
                              <FontAwesomeIcon icon={faCalculator} /> Template
                            </button>
                            <ul class="dropdown-menu">
                              <li>
                                <a href="#!">Template 1</a>
                              </li>
                              <li>
                                <a href="#!">Template 2</a>
                              </li>
                              <li>
                                <a href="#!">Template 3</a>
                              </li>
                              <li>
                                <a href="#!">Template 4</a>
                              </li>
                            </ul>
                          </div>

                          <h3 className="textbhead">
                            Subject:{" "}
                            <span>Need to change my shipping address</span>
                          </h3>
                          <div
                            className="mob-float"
                            style={{ display: "inline", float: "right" }}
                          >
                            <img
                              src={ArrowImg}
                              alt="Arrow"
                              className="arrow-img"
                            />
                            <div className="line-1"></div>
                            <img
                              src={MinusImg}
                              alt="Minus"
                              className="minus-img"
                              onClick={this.hanldeCommentClose2.bind(this)}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <Card>
                      <CardBody>
                        <div className="col-md-12">
                          <CKEditor
                            config={{
                              toolbar: [
                                {
                                  name: "basicstyles",
                                  items: ["Bold", "Italic", "Strike"]
                                },
                                {
                                  name: "styles",
                                  items: ["Styles", "Format"]
                                },
                                {
                                  name: "paragraph",
                                  items: ["NumberedList", "BulletedList"]
                                },
                                {
                                  name: "links",
                                  items: ["Link", "Unlink"]
                                },
                                {
                                  name: "insert",
                                  items: ["Image", "Table"]
                                },
                                {
                                  name: "tools",
                                  items: ["Maximize"]
                                },
                                {
                                  name: "editing",
                                  items: ["Scayt"]
                                }
                              ]
                            }}
                          />
                        </div>
                      </CardBody>
                      <div className="row colladrowa">
                        <div className="col-md-12 colladrow">
                          <ul style={{ padding: "0 15px" }}>
                            <li>
                              <label>To: diwarkar@gmail.com</label>
                            </li>
                            <li>
                              <label className="">
                                <input
                                  type="text"
                                  className="CCdi"
                                  placeholder="CC: diwarkar@gmail.com"
                                />
                                <span className="one">+1</span>
                              </label>
                            </li>
                            <li>
                              <label className="">
                                <input
                                  type="text"
                                  className="CCdi"
                                  placeholder="BCC: diwarkar@gmail.com"
                                />
                                <span className="one">+1</span>
                              </label>
                            </li>
                            <li>
                              <div className="filter-checkbox">
                                <input
                                  type="checkbox"
                                  id="fil-open1"
                                  name="filter-type"
                                  style={{ display: "none" }}
                                />
                                <label
                                  htmlFor="fil-open1"
                                  style={{ paddingLeft: "25px" }}
                                >
                                  <span>Inform Store Note</span>
                                </label>
                              </div>
                            </li>
                            <li>
                              <span>
                                <input
                                  id="file-upload"
                                  className="file-upload1 d-none"
                                  type="file"
                                  onChange={this.fileUpload}
                                />
                                <label
                                  htmlFor="file-upload"
                                  onDrop={this.fileDrop}
                                  onDragOver={this.fileDragOver}
                                  onDragEnter={this.fileDragEnter}
                                >
                                  <img
                                    src={FileUpload}
                                    alt="file-upload"
                                    className="fileup"
                                  />
                                </label>
                              </span>
                              <label style={{ color: "#2561a8" }}>
                                3 files
                              </label>
                            </li>
                            <li style={{ float: "right" }}>
                              <button className="sav">Save As Draft</button>
                              <button className="send">Send</button>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </Card>
                  </Collapse>
                </div>
                <div className="row row-spacing new-top-bottom-margin">
                  <div className="col-12 col-xs-12 col-sm-4 col-md-3">
                    <img
                      src={Headphone2Img}
                      alt="headphone"
                      className="oval-56"
                    />
                    <label className="rashmi-c">Rashmi.C</label>
                    <img
                      src={FacebookImg}
                      alt="facebook"
                      className="facebook"
                    />
                  </div>
                  <div className="col-12 col-xs-12 col-sm-6 col-md-7">
                    <img src={ClipImg} alt="clip" className="clip" />
                    <label className="hi-diwakar-i-really2">
                      &nbsp; Hi Diwakar, I really appreciate you joining us at
                      Voucherify! My top priority is that you have a great
                      experience.
                    </label>
                  </div>
                  <div className="col-12 col-xs-12 col-sm-2">
                    <label
                      className="comment-text1"
                      onClick={this.hanldeCommentOpen2.bind(this)}
                    >
                      Comment
                    </label>
                  </div>
                </div>
                <div className="row row-spacing new-top-bottom-margin">
                  <div className="col-12 col-xs-12 col-sm-4 col-md-3">
                    <img src={BlackUserIcon} alt="Avatar" className="oval-6" />
                    <label className="rashmi-c">Diwakar</label>
                    <img
                      src={Headphone2Img}
                      alt="headphone"
                      className="headphone1"
                    />
                  </div>
                  <div className="col-12 col-xs-12 col-sm-6 col-md-7">
                    <label className="need-to-change-my-sh">
                      Need to change my shipping address
                    </label>
                  </div>
                  <div className="col-12 col-xs-12 col-sm-2">
                    <label className="reply-comment">
                      Reply
                      <br />
                      Comment
                    </label>
                  </div>
                </div>
              </div>

              <div
                className="tab-pane fade"
                id="Task-tab"
                role="tabpanel"
                aria-labelledby="Task-tab"
              >
                <MyTicketTask />
              </div>
              <div
                className="tab-pane fade"
                id="Notes-tab"
                role="tabpanel"
                aria-labelledby="Notes-tab"
              >
                <div className="row removemarg" style={{ marginTop: "20px" }}>
                  <div className="col-12 col-xs-12 col-sm-5">
                    <textarea
                      className="Add-Notes-textarea"
                      placeholder="Add Notes"
                    ></textarea>
                    <button type="button" className="notesbtn">
                      <label className="notesbtn-text">ADD COMMENT</label>
                    </button>
                  </div>
                  <div className="col-12 col-xs-12 col-sm-7">
                    <div className="row">
                      <div className="col-md-1">
                        <div className="oval-5-1-new">
                          <img
                            src={StoreIcon}
                            style={{ padding: "5px" }}
                            alt="store-icon"
                          />
                        </div>
                      </div>
                      <div className="col-md-11">
                        <div className="row">
                          <label className="varun-nagpal">Varun Nagpal</label>
                        </div>
                        <div className="row">
                          <label className="hi-diwakar-i-really tab">
                            Hi Diwakar, I really appreciate you joining us at
                            Voucherify! My top priority{" "}
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="row" style={{ marginTop: "20px" }}>
                      <div className="col-md-1">
                        <div className="oval-5-1-new">
                          <img
                            src={StoreIcon}
                            style={{ padding: "5px" }}
                            alt="store-icon"
                          />
                        </div>
                      </div>
                      <div className="col-md-11">
                        <div className="row">
                          <label className="varun-nagpal">Varun Nagpal</label>
                        </div>
                        <div className="row">
                          <label className="hi-diwakar-i-really tab">
                            Hi Diwakar, I really appreciate you joining us at
                            Voucherify! My top priority{" "}
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Modal
          open={this.state.profilemodal}
          onClose={this.HandleProfileModalClose.bind(this)}
          modalId="profile-popup"
          overlayId="logout-ovrly"
        >
          <div className="profilemodalmaindiv">
            <div style={{ float: "right" }}>
              <img
                src={CrossIcon}
                alt="cross-icon"
                className="pro-cross-icn"
                onClick={this.HandleProfileModalClose.bind(this)}
              />
            </div>
            <div className="row profilemodalrow">
              <div className="col-md-6">
                <label className="profilemodal-text">Name</label>
                <label className="profilemodal-textval">Diwakar Monga</label>
              </div>
              <div className="col-md-6">
                <label className="profilemodal-text">Mobile</label>
                <label className="profilemodal-textval">+91 9873470074</label>
              </div>
            </div>
            <div className="row profilemodalrow-1">
              <div className="col-md-6">
                <label className="profilemodal-text">Email</label>
                <label className="profilemodal-textval">
                  monga24@gmail.com
                </label>
              </div>
              <div className="col-md-6">
                <input
                  type="text"
                  className="alternumber"
                  placeholder="Alternate Number"
                />
              </div>
            </div>
            <div className="row" style={{ marginLeft: "15px" }}>
              <div className="openticketbox profilemodalrow-1">
                <label className="open-tickets-box-text">
                  04
                  <small className="open-tickets-box-textval">
                    Open Tickets
                  </small>
                </label>
              </div>
              <div className="openticketbox-2 profilemodalrow-1">
                <label className="open-tickets-box-text">
                  11
                  <small className="open-tickets-box-textval">
                    Total Tickets
                  </small>
                </label>
              </div>
            </div>
            <div className="row profilemodal-row-3">
              <img src={CustomerIcon} alt="customer-icon" />
              <label className="full-profile-view-text">
                FULL PROFILE VIEW
              </label>
            </div>
          </div>
        </Modal>
        {/* -----------------------Store and product sreach modal-------------------- */}
        {/* <Modal
          open={this.state.storeproductsearch}
          onClose={this.HandleStoreProductSearchModalClose.bind(this)}
          modalId="storeproductsearchmodal"
          overlayId="layout-storeproductsearchmodal"
        >
          <div className="profilemodalmaindiv">
            <div style={{ float: "" }}>
              <img
                src={CrossIcon}
                alt="cross-icon"
                className="pro-cross-icn-1"
                onClick={this.HandleStoreModalClose.bind(this)}
              />
            </div>
            <TikcetSystemStoreModal />
          </div>
        </Modal> */}
        {/* ---------------------------------------------------------- */}
      </Fragment>
    );
  }
}
export default MyTicket;
