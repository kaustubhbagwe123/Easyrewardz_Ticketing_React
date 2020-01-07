import React, { Component } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Popover } from "antd";
// import Modal from "react-responsive-modal";
import ReactTable from "react-table";
// import "react-table/react-table.css";
import DelBigIcon from "./../../assets/Images/del-big.png";
import FileUpload from "./../../assets/Images/file.png";
import DelBlack from "./../../assets/Images/del-black.png";
import UploadCancel from "./../../assets/Images/upload-cancel.png";
import DownExcel from "./../../assets/Images/csv.png";
import { ProgressBar } from "react-bootstrap";
import Demo from "./../../store/Hashtag";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import LetterBox from "./../../assets/Images/SecuredLetter2.png";
import SmsImg from "./../../assets/Images/Sms.png";
import NotificationImg from "./../../assets/Images/Notification.png";
import RedDeleteIcon from "./../../assets/Images/red-delete-icon.png";
import BlackInfoIcon from "./../../assets/Images/Info-black.png";
import CancelImg from "./../../assets/Images/Circle-cancel.png";
import { Checkbox } from "antd";
import CKEditor from "react-ckeditor-component";
import Modal from "react-bootstrap/Modal";

class Alerts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fileName: "",
      AddAlertTabsPopup: false,
      content: "",
      tabIndex:0
    };
    this.updateContent = this.updateContent.bind(this);
    this.onChange = this.onChange.bind(this);
    this.handleAddAlertTabsOpen = this.handleAddAlertTabsOpen.bind(this);
    this.handleAddAlertTabsClose = this.handleAddAlertTabsClose.bind(this);
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
  handleAddAlertTabsOpen() {
    this.setState({ AddAlertTabsPopup: true,tabIndex:0 });
  }
  handleAddAlertTabsClose() {
    this.setState({ AddAlertTabsPopup: false });
  }
  updateContent(newContent) {
    this.setState({
      content: newContent
    });
  }
  onChange(evt) {
    var newContent = evt.editor.getData();
    this.setState({
      content: newContent
    });
  }
  handleTabChange(index){
    this.setState({
      tabIndex:index
    })
  }
  render() {
    const data = [
      {
        id: "A1",
        alertType: "New Ticket Creation",
        communicationMode: (
          <div>
            <img src={LetterBox} alt="Letter" className="alert-tableImge" />
            <img src={SmsImg} alt="Sms" className="alert-tableImge" />
            <img
              src={NotificationImg}
              alt="Notification"
              className="alert-tableImge"
            />
          </div>
        ),

        status: "Active"
      },
      {
        id: "A2",
        alertType: "New Ticket Creation",
        communicationMode: (
          <div>
            <img src={LetterBox} alt="Letter" className="alert-tableImge" />
            <img src={SmsImg} alt="Sms" className="alert-tableImge" />
            <img
              src={NotificationImg}
              alt="Notification"
              className="alert-tableImge"
            />
          </div>
        ),

        status: "Inactive"
      },
      {
        id: "A3",
        alertType: "New Ticket Creation",
        communicationMode: (
          <div>
            <img src={LetterBox} alt="Letter" className="alert-tableImge" />
            <img src={SmsImg} alt="Sms" className="alert-tableImge" />
            <img
              src={NotificationImg}
              alt="Notification"
              className="alert-tableImge"
            />
          </div>
        ),

        status: "Active"
      },
      {
        id: "A4",
        alertType: "New Ticket Creation",
        communicationMode: (
          <div>
            <img src={LetterBox} alt="Letter" className="alert-tableImge" />
            <img src={SmsImg} alt="Sms" className="alert-tableImge" />
            <img
              src={NotificationImg}
              alt="Notification"
              className="alert-tableImge"
            />
          </div>
        ),

        status: "Inactive"
      },
      {
        id: "A5",
        alertType: "New Ticket Creation",
        communicationMode: (
          <div>
            <img src={LetterBox} alt="Letter" className="alert-tableImge" />
            <img src={SmsImg} alt="Sms" className="alert-tableImge" />
            <img
              src={NotificationImg}
              alt="Notification"
              className="alert-tableImge"
            />
          </div>
        ),

        status: "Active"
      }
    ];

    const columns = [
      {
        Header: (
          <span className="table-column">
            Alert Type
            <FontAwesomeIcon icon={faCaretDown} />
          </span>
        ),
        accessor: "alertType"
      },
      {
        Header: "Communication Mode",
        accessor: "communicationMode",
        className: "communication-labelHeader",
        sortable: false,
        Cell: props => <span className="number">{props.value}</span>
      },
      {
        id: "createdBy",
        Header: (
          <span className="table-column">
            Created by
            <FontAwesomeIcon icon={faCaretDown} />
          </span>
        ),
        Cell: row => {
          var ids = row.original["id"];
          return (
            <div>
              <span>
                Admin
                <Popover content={popoverData} placement="bottom" >
                  <img
                    className="info-icon-cp"
                    src={BlackInfoIcon}
                    alt="info-icon"
                    id={ids}
                  />
                </Popover>
              </span>
            </div>
          );
        }
        // accessor: "createdBy"
      },
      {
        Header: (
          <span className="table-column">
            Status
            <FontAwesomeIcon icon={faCaretDown} />
          </span>
        ),
        accessor: "status"
      },
      {
        Header: "Actions",
        // accessor: "action",
        sortable: false,
        Cell: row => {
          var ids = row.original["id"];
          return (
            <>
              <span>
                <Popover content={ActionDelete} placement="bottom" trigger="click">
                  <img
                    src={RedDeleteIcon}
                    alt="del-icon"
                    className="del-btn"
                    id={ids}
                  />
                </Popover>
                <Popover content={ActionEditBtn} placement="bottom" trigger="click">
                  <button className="react-tabel-button" id="p-edit-pop-2">
                    <label className="Table-action-edit-button-text">
                      EDIT
                    </label>
                  </button>
                </Popover>
              </span>
            </>
          );
        }
      }
    ];
    const popoverData = (
      <>
        <div>
          <b>
            <p className="title">Created By: Admin</p>
          </b>
          <p className="sub-title">Created Date: 12 March 2018</p>
        </div>
        <div>
          <b>
            <p className="title">Updated By: Manager</p>
          </b>
          <p className="sub-title">Updated Date: 12 March 2018</p>
        </div>
      </>
    );
    const ActionDelete = (
      <div className="d-flex general-popover popover-body">
        <div className="del-big-icon">
          <img src={DelBigIcon} alt="del-icon" />
        </div>
        <div>
          <p className="font-weight-bold blak-clr">Delete file?</p>
          <p className="mt-1 fs-12">
            Are you sure you want to delete this file?
          </p>
          <div className="del-can">
            <a href={Demo.BLANK_LINK}>CANCEL</a>
            <button className="butn">Delete</button>
          </div>
        </div>
      </div>
    );
    const ActionEditBtn = (
      <div className="edtpadding">
        <div className="">
          <label className="popover-header-text">EDIT ALERTS</label>
        </div>
        <div className="pop-over-div">
          <label className="edit-label-1">Alert Type</label>
          <input
            type="text"
            className="txt-edit-popover"
            placeholder="Enter Alert Type"
            maxLength="25"
          />
        </div>
        {/* <div className="pop-over-div">
          <label className="edit-label-1">Issue Type</label>
          <select id="inputStatus" className="edit-dropDwon dropdown-setting">
            <option>Select</option>
            <option>Admin</option>
          </select>
        </div> */}
        <div className="pop-over-div">
          <label className="edit-label-1">Status</label>
          <select id="inputStatus" className="edit-dropDwon dropdown-setting">
            <option>Active</option>
            <option>Inactive</option>
          </select>
        </div>
        <br />
        <div>
          <label className="pop-over-cancle">CANCEL</label>
          <button className="pop-over-button">
            <label className="pop-over-btnsave-text">SAVE</label>
          </button>
        </div>
      </div>
    );
    return (
      <React.Fragment>
        <div className="container-fluid setting-title setting-breadcrumb">
          <Link to="settings" className="header-path">Settings</Link>
          <span>&gt;</span>
          <Link to={Demo.BLANK_LINK} className="header-path">Ticketing</Link>
          <span>&gt;</span>
          <Link to={Demo.BLANK_LINK} className="active header-path">
            Alerts
          </Link>
        </div>
        <div className="container-fluid">
          <div className="store-settings-cntr">
            <div className="row">
              <div className="col-md-8">
                <div className="table-cntr table-height alertsTable">
                  <ReactTable
                    data={data}
                    columns={columns}
                    // resizable={false}
                    defaultPageSize={5}
                    showPagination={false}
                  />

                  <div className="position-relative">
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
                          <a href={Demo.BLANK_LINK}>&gt;</a>
                        </li>
                      </ul>
                    </div>
                    <div className="item-selection">
                      <select>
                        <option>30</option>
                        <option>50</option>
                        <option>100</option>
                      </select>
                      <p>Items per page</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="right-sect-div">
                  <h3>Create ALERTS</h3>
                  <div className="div-cntr">
                    <label>Alert Type</label>
                    <input type="text" placeholder="Enter alert type" maxLength="25" />
                  </div>
                  <h4>Communication Mode</h4>
                  <div className="div-cntr">
                    <label>Email</label>
                    <br />
                    <Checkbox>Customer</Checkbox>
                    <Checkbox>Internal</Checkbox>
                    <Checkbox>Store</Checkbox>
                  </div>
                  <div className="div-cntr">
                    <label>SMS</label>
                    <br />
                    <Checkbox>Customer</Checkbox>
                  </div>
                  <div className="div-cntr">
                    <label>Notification</label>
                    <br />
                    <Checkbox>Internal</Checkbox>
                  </div>
                  <div className="div-cntr">
                    <label>Status</label>
                    <select>
                      <option>Active</option>
                      <option>Inactive</option>
                    </select>
                  </div>
                  <button
                    className="butn"
                    onClick={this.handleAddAlertTabsOpen}
                  >
                    Next
                  </button>
                  <Modal
                    size="lg"
                    show={this.state.AddAlertTabsPopup}
                    onHide={this.handleAddAlertTabsClose}
                  >
                    <Modal.Header>
                      <div className="setting-tabs alert-tabs">
                        <ul
                          className="nav nav-tabs margin-Alerttab"
                          role="tablist"
                        >
                          <li className="nav-item">
                            <a
                              className={`nav-link ${this.state.tabIndex === 0 && 'active'}`}
                              data-toggle="tab"
                              href="#email-tab"
                              role="tab"
                              aria-controls="email-tab"
                              aria-selected="true"
                            >
                              Email
                            </a>
                          </li>
                          <li className="nav-item">
                            <a
                              className={`nav-link ${this.state.tabIndex === 1 && 'active'}`}
                              data-toggle="tab"
                              href="#sms-tab"
                              role="tab"
                              aria-controls="sms-tab"
                              aria-selected="false"
                            >
                              SMS
                            </a>
                          </li>
                          <li className="nav-item">
                            <a
                               className={`nav-link ${this.state.tabIndex === 2 && 'active'}`}
                              data-toggle="tab"
                              href="#notification-tab"
                              role="tab"
                              aria-controls="notification-tab"
                              aria-selected="false"
                            >
                              Notification
                            </a>
                          </li>
                        </ul>
                        <img
                          src={CancelImg}
                          alt="CancelImg"
                          className="cancelImg-alert"
                          onClick={this.handleAddAlertTabsClose.bind(this)}
                        />
                      </div>
                    </Modal.Header>
                    <Modal.Body>
                      <div className="tab-content">
                        <div
                          className={`tab-pane fade ${this.state.tabIndex === 0 && 'show active'}`}
                          id="email-tab"
                          role="tabpanel"
                          aria-labelledby="email-tab"
                        >
                          <div className="position-relative-alert">
                            <ul className="nav alert-nav-tabs3" role="tablist">
                              <li className="nav-item">
                                <a
                                  className="nav-link active"
                                  data-toggle="tab"
                                  href="#customer-tab"
                                  role="tab"
                                  aria-controls="customer-tab"
                                  aria-selected="true"
                                >
                                  Customer
                                </a>
                              </li>
                              <li className="nav-item">
                                <a
                                  className="nav-link"
                                  data-toggle="tab"
                                  href="#Internal-tab"
                                  role="tab"
                                  aria-controls="Internal-tab"
                                  aria-selected="false"
                                >
                                  Internal
                                </a>
                              </li>
                              <li className="nav-item">
                                <a
                                  className="nav-link"
                                  data-toggle="tab"
                                  href="#ticket-tab"
                                  role="tab"
                                  aria-controls="ticket-tab"
                                  aria-selected="false"
                                >
                                  Store
                                </a>
                              </li>
                            </ul>
                          </div>
                          <div className="tab-content p-0 alert-p1">
                            <div
                              className="tab-pane fade show active"
                              id="customer-tab"
                              role="tabpanel"
                              aria-labelledby="customer-tab"
                            >
                              <label className="alert-main-popuplbl">
                                Compose your Email
                              </label>
                              <div className="div-padding-alert">
                                <div className="form-group row">
                                  <label className="label-color-alert">
                                    To
                                  </label>
                                  <div className="col-sm-6 m-t1">
                                    <input
                                      type="text"
                                      className="textbox-email-editor"
                                    />
                                  </div>
                                </div>
                                <div className="form-group row">
                                  <label className="label-color-alert">
                                    CC
                                  </label>
                                  <div className="col-sm-6 m-t1">
                                    <input
                                      type="text"
                                      className="textbox-email-editor text-box2"
                                    />
                                  </div>
                                </div>
                                <div className="form-group row">
                                  <label className="label-color-alert">
                                    BCC
                                  </label>
                                  <div className="col-sm-6 m-t1">
                                    <input
                                      type="text"
                                      className="textbox-email-editor text-box3"
                                    />
                                  </div>
                                </div>
                                <div className="form-group row">
                                  <label className="label-color-alert">
                                    Subject
                                  </label>
                                  <div className="col-sm-6">
                                    <input
                                      type="text"
                                      className="textbox-email-editor text-box4"
                                    />
                                  </div>
                                </div>
                              </div>
                              <CKEditor
                                content={this.state.content}
                                events={{
                                  // "blur": this.onBlur,
                                  // "afterPaste": this.afterPaste,
                                  change: this.onChange,
                                  items: this.fileUpload
                                }}
                              />
                              <div className="div-button1">
                                <button
                                  className="butn-2"
                                  type="submit"
                                  id="sms-tab"
                                  onClick={this.handleTabChange.bind(this,1)}
                                >
                                  SAVE & NEXT
                                </button>
                              </div>
                            </div>
                            <div
                              className="tab-pane fade"
                              id="Internal-tab"
                              role="tabpanel"
                              aria-labelledby="Internal-tab"
                            >
                              Internal
                            </div>
                            <div
                              className="tab-pane fade"
                              id="ticket-tab"
                              role="tabpanel"
                              aria-labelledby="ticket-tab"
                            >
                              Store
                            </div>
                          </div>
                        </div>
                        <div id="sms-tab" 
                        className={`tab-pane fade ${this.state.tabIndex === 1 && 'show active'}`}
                        >
                          <div className="sms-mainLabel alert-p1">
                            <label className="alert-main-popuplbl">
                              Compose your SMS
                            </label>
                            <textarea
                              rows="10"
                              className="text-areaModel"
                            ></textarea>
                            <div className="div-button1">
                              <button className="butn-2" type="submit" onClick={this.handleTabChange.bind(this,2)}>
                                SAVE & NEXT
                              </button>
                            </div>
                          </div>
                        </div>
                        <div id="notification-tab"
                        className={`tab-pane fade ${this.state.tabIndex === 2 && 'show active'}`}
                         >
                          <div className="sms-mainLabel alert-p1">
                            <label className="alert-main-popuplbl">
                              Compose your Notification
                            </label>
                            <textarea
                              rows="10"
                              className="text-areaModel"
                            ></textarea>
                            <div className="div-button1">
                              <button className="butn-2" type="submit">
                                SAVE & NEXT
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Modal.Body>
                  </Modal>
                </div>
                <div className="right-sect-div">
                  <div className="d-flex justify-content-between align-items-center pb-2">
                    <h3 className="pb-0">Bulk Upload</h3>
                    <div className="down-excel">
                      <p>Template</p>
                      <a href={Demo.BLANK_LINK}>
                        <img src={DownExcel} alt="download icon" />
                      </a>
                    </div>
                  </div>
                  <input
                    id="file-upload"
                    className="file-upload d-none"
                    type="file"
                    onChange={this.fileUpload}
                  />
                  <label
                    htmlFor="file-upload"
                    onDrop={this.fileDrop}
                    onDragOver={this.fileDragOver}
                    onDragEnter={this.fileDragEnter}
                  >
                    <div className="file-icon">
                      <img src={FileUpload} alt="file-upload" />
                    </div>
                    <span>Add File</span> or Drop File here
                  </label>
                  {this.state.fileName && (
                    <div className="file-info">
                      <div className="file-cntr">
                        <div className="file-dtls">
                          <p className="file-name">{this.state.fileName}</p>
                          <div className="del-file" id="del-file-1">
                            <img src={DelBlack} alt="delete-black" />
                          </div>
                        </div>
                        <div>
                          <span className="file-size">122.6kb</span>
                        </div>
                      </div>
                      <div className="file-cntr">
                        <div className="file-dtls">
                          <p className="file-name">{this.state.fileName}</p>
                          <a className="file-retry" href={Demo.BLANK_LINK}>
                            Retry
                          </a>
                        </div>
                        <div>
                          <span className="file-failed">Failed</span>
                        </div>
                      </div>
                      <div className="file-cntr">
                        <div className="file-dtls">
                          <p className="file-name pr-0">
                            {this.state.fileName}
                          </p>
                        </div>
                        <div>
                          <div className="d-flex align-items-center mt-2">
                            <ProgressBar className="file-progress" now={60} />
                            <div className="cancel-upload">
                              <img src={UploadCancel} alt="upload cancel" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  <button className="butn">ADD</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Alerts;
