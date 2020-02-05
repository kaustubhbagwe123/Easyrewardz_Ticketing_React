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
import { authHeader } from "./../../helpers/authHeader";
import axios from "axios";
import config from "./../../helpers/config";
import {
  NotificationContainer,
  NotificationManager
} from "react-notifications";

class Alerts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fileName: "",
      AddAlertTabsPopup: false,
      content: "",
      tabIndex:0,
      alert: [],
      updateAlertTypeName: '',
      updateAlertisActive: '',
      emailCust: false,
      emailInt: false,
      emailStore: false,
      smsCust: false,
      notiInt: false,
      selectedAlertType:"",
      selectedEmailCustomer:false,
      selectedEmailInternal:false,
      selectedEmailStore:false,
      selectedSMSCustomer:false,
      selectedNotifInternal:false,
      selectedStatus:"",
      selectedToCustomer:"",
      selectedCCCustomer:"",
      selectedBCCCustomer:"",
      selectedSubjectCustomer:"",
      selectedCKCustomer:"",
      selectedToInternal:"",
      selectedCCInternal:"",
      selectedBCCInternal:"",
      selectedSubjectInternal:"",
      selectedCKInternal:"",
      selectedToStore:"",
      selectedCCStore:"",
      selectedBCCStore:"",
      selectedSubjectStore:"",
      selectedCKStore:"",
      selectedSMSContent:"",
      selectedNotifContent:""


    };
    this.updateContent = this.updateContent.bind(this);
    this.onChange = this.onChange.bind(this);
    this.handleAddAlertTabsOpen = this.handleAddAlertTabsOpen.bind(this);
    this.handleAddAlertTabsClose = this.handleAddAlertTabsClose.bind(this);
    this.handleGetAlert = this.handleGetAlert.bind(this);
    this.handleUpdateAlertTypeName = this.handleUpdateAlertTypeName.bind(this);
    this.handleInsertAlert=this.handleInsertAlert.bind(this);
  }

  componentDidMount() {
    this.handleGetAlert();
    this.handleAlertTabs = this.handleAlertTabs.bind(this);
  }


  setDataOnChangeAlert = e => {
    debugger;


    this.setState({
      [e.target.name]: e.target.value,

    });
    
  };

  setCKEditorCustomer = (evt) => {
    debugger;
    var newContent = evt.editor.getData();
    this.setState({
      selectedCKCustomer: newContent
    });
  }
  setCKEditorInternal = (evt) => {
    debugger;
    var newContent = evt.editor.getData();
    this.setState({
      selectedCKInternal: newContent
    });
  }
  setCKEditorStore = (evt) => {
    debugger;
    var newContent = evt.editor.getData();
    this.setState({
      selectedCKStore: newContent
    });
  }

  handleAlertTabs = e => {
    debugger;
    let check = e.target.checked;
    let val = e.target.value;
    if (val === 'smsCust') {
      this.setState({
        tabIndex: 1
      });
    }
    if (check === true) {
      this.setState({
        [val]: true
      });
    } else {
      this.setState({
        [val]: false
      });
    }
    if(val==='emailCust'){
     
      this.state.selectedEmailCustomer=true;
     
     
    }
    
    if(val==='emailInt'){
      this.state.selectedEmailInternal=true;
     
    }
    if(val==='emailStore'){
      this.state.selectedEmailStore=true;
     
    }
    if(val==='smsCust'){
      this.state.selectedSMSCustomer=true;
     
    }
    if(val==='notiInt'){
      this.state.selectedNotifInternal=true;
     
    }
   
  };

  handleGetAlert() {
    debugger;
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/Alert/GetAlertList",
      headers: authHeader()
    }).then(function(res) {
      debugger;
      let alert = res.data.responseData;
      if (alert !== null && alert !== undefined) {
        self.setState({ alert });
      }
    });
  }
  deleteAlert(deleteId) {
    debugger;
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/Alert/DeleteAlert",
      headers: authHeader(),
      params: {
        AlertID: deleteId
      }
    }).then(function(res) {
      debugger;
      let status = res.data.message;
      if (status === "Success") {
        NotificationManager.success("Alert deleted successfully.");
        self.handleGetAlert();
      } else {
        NotificationManager.error("Alert not deleted.");
      }
    });
  }
  handleUpdateAlert(alertId) {
    debugger;
    let AlertisActive;
      if (this.state.updateAlertisActive === 'true') {
        AlertisActive = true
      } else if (this.state.updateAlertisActive === 'false') {
        AlertisActive = false
      }
      axios({
        method: "post",
        url: config.apiUrl + "/Alert/ModifyAlert",
        headers: authHeader(),
        params: {
          AlertID: alertId,
          AlertTypeName: this.state.updateAlertTypeName,
          isAlertActive: AlertisActive
        }
      }).then((res) => {
        debugger;
        let status = res.data.message;
        if (status === "Success") {
          NotificationManager.success("Alert updated successfully.");
          this.handleGetAlert();
        } else {
          NotificationManager.error("Alert not updated.");
        }
      });
  }

  updateAlert(individualData) {
    debugger;
    let updateAlertId = individualData.alertID, updateAlertTypeName = individualData.alertTypeName, alertIsActive =  individualData.isAlertActive, updateAlertisActive;
    if (alertIsActive === 'Inactive') {
      updateAlertisActive = 'false'
    } else {
      updateAlertisActive = 'true'
    }
    this.setState({
      updateAlertId, updateAlertisActive, updateAlertTypeName
    })
  }

  handleUpdateAlertTypeName(e) {
    debugger;
    this.setState({
      updateAlertTypeName: e.target.value
    });
  }
  handleUpdateAlertisActive = e => {
    let updateAlertisActive = e.currentTarget.value;
    this.setState({ updateAlertisActive });
  };
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
    debugger;
    this.setState({
      tabIndex:index
    })
  }
  handleInsertAlert() {
    debugger;
    let self = this;
    var setstatus=false;
    var status=this.state.selectedStatus;
    if(status==="true"){
      setstatus=true;
    }
    else{
      setstatus=false;
    }
   
    var cust,inter,store,sms,notn;
    var jsondata=[];
    
    cust={
      Communication_Mode:240,
      CommunicationFor:250,
      Content:this.state.selectedCKCustomer,
      ToEmailID:this.state.selectedToCustomer,
      CCEmailID:this.state.selectedCCCustomer,
      BCCEmailID:this.state.selectedBCCCustomer,
      Subject:this.state.selectedSubjectCustomer
    }
    inter= {
      Communication_Mode:240,
      CommunicationFor:251,
      Content:this.state.selectedCKInternal,
      ToEmailID:this.state.selectedToInternal,
      CCEmailID:this.state.selectedCCInternal,
      BCCEmailID:this.state.selectedBCCInternal,
      Subject:this.state.selectedSubjectInternal
    }
    store= {
      Communication_Mode:240,
      CommunicationFor:252,
      Content:this.state.selectedCKStore,
      ToEmailID:this.state.selectedToStore,
      CCEmailID:this.state.selectedCCStore,
      BCCEmailID:this.state.selectedBCCStore,
      Subject:this.state.selectedSubjectStore
    }
    sms={
      Communication_Mode:241,
      CommunicationFor:250,
      Content:this.state.selectedSMSContent
      
    }
    notn= {
      Communication_Mode:242,
      CommunicationFor:251,
      Content:this.state.selectedNotifContent
      
    }

    if(this.state.selectedEmailCustomer===true){
      jsondata.push(cust);
    }
    if(this.state.selectedEmailInternal===true){
      jsondata.push(inter);
    }
    if(this.state.selectedEmailStore===true){
      jsondata.push(store);
    }
    if(this.state.selectedSMSCustomer===true){
      jsondata.push(sms);
    }
    if(this.state.selectedNotifInternal===true){
      jsondata.push(notn);
    }
    
    var json = {
      AlertTypeName:this.state.selectedAlertType,
      isAlertActive:setstatus,
      CommunicationModeDetails:jsondata
    };
    
    axios({
      method: "post",
      url: config.apiUrl + "/Alert/CreateAlert",
      headers: authHeader(),
      data:json
    }).then(function (res) {
      debugger;
      let id = res.data.responseData;
      let Msg = res.data.message;
      if (Msg === "Success") {

        NotificationManager.success("Record Saved successfully.");

      }
      self.handleAddAlertTabsClose();
      
    });
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
        accessor: "alertTypeName"
      },
      {
        Header: "Communication Mode",
        accessor: "modeOfCommunication",
        className: "communication-labelHeader",
        sortable: false,
        Cell: row => {
          return (
            <div>
              {row.original.modeOfCommunication.isByEmail === true && <img src={LetterBox} alt="Letter" className="alert-tableImge" />}
              {row.original.modeOfCommunication.isBySMS === true && <img src={SmsImg} alt="Sms" className="alert-tableImge" />}
              {row.original.modeOfCommunication.isByNotification === true && <img
                src={NotificationImg}
                alt="Notification"
                className="alert-tableImge"
              />}
            </div>
          )
        }
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
                {row.original.createdBy}
                <Popover content={
                  <>
                  <div>
                    <b>
                      <p className="title">Created By: {row.original.createdBy}</p>
                    </b>
                    <p className="sub-title">Created Date: {row.original.createdDate}</p>
                  </div>
                  <div>
                    <b>
                      <p className="title">Updated By: {row.original.modifiedBy}</p>
                    </b>
                    <p className="sub-title">Updated Date: {row.original.modifiedDate}</p>
                  </div>
                </>
                } placement="bottom" >
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
        },
        accessor: "createdBy"
      },
      {
        Header: (
          <span className="table-column">
            Status
            <FontAwesomeIcon icon={faCaretDown} />
          </span>
        ),
        accessor: "isAlertActive"
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
                <Popover content={
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
                      <button className="butn" onClick={this.deleteAlert.bind(this, row.original.alertID)}>Delete</button>
                    </div>
                  </div>
                </div>
                } placement="bottom" trigger="click">
                  <img
                    src={RedDeleteIcon}
                    alt="del-icon"
                    className="del-btn"
                    id={ids}
                  />
                </Popover>
                <Popover content={
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
                      maxLength={25}
                      value={this.state.updateAlertTypeName}
                      onChange={this.handleUpdateAlertTypeName}
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
                    <select id="inputStatus" className="edit-dropDwon dropdown-setting"
                    value={this.state.updateAlertisActive}
                    onChange={this.handleUpdateAlertisActive}
                    >
                      <option value="true">Active</option>
                      <option value="false">Inactive</option>
                    </select>
                  </div>
                  <br />
                  <div>
                  <a className="pop-over-cancle" href={Demo.BLANK_LINK} >CANCEL</a>
                    <button className="pop-over-button">
                      <label className="pop-over-btnsave-text" onClick={this.handleUpdateAlert.bind(this, row.original.alertID)}>SAVE</label>
                    </button>
                  </div>
                </div>
                } placement="bottom" trigger="click">
                  <button className="react-tabel-button" id="p-edit-pop-2">
                    <label className="Table-action-edit-button-text" onClick={this.updateAlert.bind(this, row.original)}>
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
            maxLength={25}
            value={this.state.updateAlertTypeName}
            onChange={this.handleUpdateAlertTypeName}
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
          <select id="inputStatus" className="edit-dropDwon dropdown-setting"
          value={this.state.updateAlertisActive}
          onChange={this.handleUpdateAlertisActive}
          >
            <option value="true">Active</option>
            <option value="false">Inactive</option>
          </select>
        </div>
        <br />
        <div>
        <a className="pop-over-cancle" href={Demo.BLANK_LINK} >CANCEL</a>
          <button className="pop-over-button">
           SAVE
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
                    data={this.state.alert}
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
                    <input type="text" placeholder="Enter alert type" maxLength={25}
                    name="selectedAlertType"
                    value={this.state.selectedAlertType}
                    onChange={this.setDataOnChangeAlert}
                    />
                  </div>
                  <h4>Communication Mode</h4>
                  <div className="div-cntr">
                    <label>Email</label>
                    <br />
                    <Checkbox onChange={this.handleAlertTabs} value="emailCust">Customer</Checkbox>
                    <Checkbox onChange={this.handleAlertTabs} value="emailInt">Internal</Checkbox>
                    <Checkbox onChange={this.handleAlertTabs} value="emailStore">Store</Checkbox>
                  </div>
                  <div className="div-cntr">
                    <label>SMS</label>
                    <br />
                    <Checkbox onChange={this.handleAlertTabs} value="smsCust">Customer</Checkbox>
                  </div>
                  <div className="div-cntr">
                    <label>Notification</label>
                    <br />
                    <Checkbox onChange={this.handleAlertTabs} value="notiInt">Internal</Checkbox>
                  </div>
                  <div className="div-cntr">
                    <label>Status</label>
                    <select
                     name="selectedStatus"
                     value={this.state.selectedStatus}
                     onChange={this.setDataOnChangeAlert}
                    >
                      <option >Select</option>
                      <option value="true">Active</option>
                      <option value="false">Inactive</option>
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
                          {(this.state.emailCust || this.state.emailInt || this.state.emailStore) && <li className="nav-item">
                            <a
                            onClick={this.handleTabChange.bind(this,0)}
                              className={`nav-link ${this.state.tabIndex === 0 && 'active'}`}
                              data-toggle="tab"
                              href="#email-tab"
                              role="tab"
                              aria-controls="email-tab"
                              aria-selected="true"
                            >
                              Email
                            </a>
                          </li>}
                          {this.state.smsCust && <li className="nav-item">
                            <a
                              onClick={this.handleTabChange.bind(this,1)}
                              className={`nav-link ${this.state.tabIndex === 1 && 'active'}`}
                              data-toggle="tab"
                              href="#sms-tab"
                              role="tab"
                              aria-controls="sms-tab"
                              aria-selected="false"
                            >
                              SMS
                            </a>
                          </li>}
                          {this.state.notiInt && <li className="nav-item">
                            <a
                            onClick={this.handleTabChange.bind(this,2)}
                               className={`nav-link ${this.state.tabIndex === 2 && 'active'}`}
                              data-toggle="tab"
                              href="#notification-tab"
                              role="tab"
                              aria-controls="notification-tab"
                              aria-selected="false"
                            >
                              Notification
                            </a>
                          </li>}
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
                        {(this.state.emailCust || this.state.emailInt || this.state.emailStore) && <div
                          className={`tab-pane fade ${this.state.tabIndex === 0 && 'show active'}`}
                          id="email-tab"
                          role="tabpanel"
                          aria-labelledby="email-tab"
                        >
                          <div className="position-relative-alert">
                            <ul className="nav alert-nav-tabs3" role="tablist">
                              {this.state.emailCust && <li className="nav-item">
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
                              </li>}
                              {this.state.emailInt && <li className="nav-item">
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
                              </li>}
                              {this.state.emailStore && <li className="nav-item">
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
                              </li>}
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
                                      name="selectedToCustomer"
                     value={this.state.selectedToCustomer}
                     onChange={this.setDataOnChangeAlert}
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
                                      name="selectedCCCustomer"
                                      value={this.state.selectedCCCustomer}
                                      onChange={this.setDataOnChangeAlert}
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
                                      name="selectedBCCCustomer"
                                      value={this.state.selectedBCCCustomer}
                                      onChange={this.setDataOnChangeAlert}
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
                                      name="selectedSubjectCustomer"
                                      value={this.state.selectedSubjectCustomer}
                                      onChange={this.setDataOnChangeAlert}
                                    />
                                  </div>
                                </div>
                              </div>
                              <CKEditor
                                //content={this.state.content}
                                events={{
                                  // "blur": this.onBlur,
                                  // "afterPaste": this.afterPaste,
                                  //change: this.onChange,
                                  items: this.fileUpload
                                 
                                }}
                              
                               data={this.state.selectedCKCustomer}
                                onChange={this.setCKEditorCustomer}
                              />
                              
                               {/* <div className="div-button1">
                                <button
                                  className="butn-2"
                                  type="submit"
                                  id="sms-tab"
                                  
                                 
                                  onClick={this.handleTabChange.bind(this,1)}
                                >
                                  SAVE & NEXT
                                </button>
                              </div> */}
                         
                             </div>
                            <div
                              className="tab-pane fade"
                              id="Internal-tab"
                              role="tabpanel"
                              aria-labelledby="Internal-tab"
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
                                      name="selectedToInternal"
                                      value={this.state.selectedToInternal}
                                      onChange={this.setDataOnChangeAlert}
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
                                      name="selectedCCInternal"
                                      value={this.state.selectedCCInternal}
                                      onChange={this.setDataOnChangeAlert}
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
                                      name="selectedBCCInternal"
                                      value={this.state.selectedBCCInternal}
                                      onChange={this.setDataOnChangeAlert}
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
                                      name="selectedSubjectInternal"
                                      value={this.state.selectedSubjectInternal}
                                      onChange={this.setDataOnChangeAlert}
                                    />
                                  </div>
                                </div>
                              </div>
                              <CKEditor
                                //content={this.state.content}
                                events={{
                                  // "blur": this.onBlur,
                                  // "afterPaste": this.afterPaste,
                                  //change: this.onChange,
                                  items: this.fileUpload
                                }}
                                name="selectedCKInternal"
                                data={this.state.selectedCKInternal}
                                onChange={this.setCKEditorInternal}
                              />
                             {/* <div className="div-button1">
                                <button
                                  className="butn-2"
                                  type="submit"
                                  id="sms-tab"
                                  onClick={this.handleTabChange.bind(this,1)}
                                  
                                >
                                  SAVE & NEXT
                                </button>
                              </div>*/}
                            </div>
                            <div
                              className="tab-pane fade"
                              id="ticket-tab"
                              role="tabpanel"
                              aria-labelledby="ticket-tab"
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
                                      name="selectedToStore"
                                      value={this.state.selectedToStore}
                                      onChange={this.setDataOnChangeAlert}
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
                                      name="selectedCCStore"
                                      value={this.state.selectedCCStore}
                                      onChange={this.setDataOnChangeAlert}
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
                                      name="selectedBCCStore"
                                      value={this.state.selectedBCCStore}
                                      onChange={this.setDataOnChangeAlert}
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
                                      name="selectedSubjectStore"
                                      value={this.state.selectedSubjectStore}
                                      onChange={this.setDataOnChangeAlert}
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
                                name="selectedCKStore"
                                data={this.state.selectedCKStore}
                                onChange={this.setCKEditorStore}


                              />
                              {/*<div className="div-button1">
                                <button
                                  className="butn-2"
                                  type="submit"
                                  id="sms-tab"
                                  onClick={this.handleTabChange.bind(this,1)}
                                  
                                >
                                  SAVE & NEXT
                                </button>
                              </div>*/}
                            </div>
                          </div>
                        </div>}
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
                              name="selectedSMSContent"
                                      value={this.state.selectedSMSContent}
                                      onChange={this.setDataOnChangeAlert}
                            ></textarea>
                            {/*<div className="div-button1">
                              <button className="butn-2" type="submit" 
                              onClick={this.handleTabChange.bind(this,2)}
                              
                              >
                                SAVE & NEXT
                              </button>
                            </div>*/}
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
                              name="selectedNotifContent"
                                      value={this.state.selectedNotifContent}
                                      onChange={this.setDataOnChangeAlert}
                            ></textarea>
                           {/* <div className="div-button1">
                              <button className="butn-2" type="submit"
                             
                              >
                                SAVE & NEXT
                              </button>
                          </div>*/}
                           
                          </div>
                        </div>
                         <div className="div-button1">
                              <button className="butn-2" type="submit"
                              onClick={this.handleInsertAlert.bind(this)}
                              >
                                SAVE
                              </button>
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
        <NotificationContainer />
      </React.Fragment>
    );
  }
}

export default Alerts;
