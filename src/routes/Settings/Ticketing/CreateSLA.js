import React, { Component } from "react";
import { Link } from "react-router-dom";
import RedDeleteIcon from "./../../../assets/Images/red-delete-icon.png";
import { UncontrolledPopover, PopoverBody } from "reactstrap";
import Demo from "../../../store/Hashtag.js";
import DelBigIcon from "./../../../assets/Images/del-big.png";
import FileUpload from "./../../../assets/Images/file.png";
import DelBlack from "./../../../assets/Images/del-black.png";
import Correct from "./../../../assets/Images/correct.png";
import UploadCancel from "./../../../assets/Images/upload-cancel.png";
import DownExcel from "./../../../assets/Images/csv.png";
import { ProgressBar } from "react-bootstrap";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Popover } from "antd";
import ReactTable from "react-table";
import BlackInfoIcon from "./../../../assets/Images/Info-black.png";
import { authHeader } from "./../../../helpers/authHeader";
import axios from "axios";
import config from "./../../../helpers/config";
// import DropdownList from "react-widgets/lib/DropdownList";
import {
  NotificationContainer,
  NotificationManager
} from "react-notifications";
import { CSVLink } from "react-csv";

class CreateSLA extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fileName: "",
      sla: [],
      slaIssueType: [],
      selectedSlaIssueType: 0,
      updateIssueTypeId: 0,
      updateSlaisActive: "",
      updateSlaTarget: [],
      SlaIsActive: "true",
      // SLABreachPercentHigh: 0,
      // SLABreachPercentMedium: 0,
      // SLABreachPercentLow: 0,
      // PriorityRespondValueHigh: 0,
      // PriorityRespondValueMedium: 0,
      // PriorityRespondValueLow: 0,
      // PriorityResolutionValueHigh: 0,
      // PriorityResolutionValueMedium: 0,
      // PriorityResolutionValueLow: 0,
      // PriorityRespondDurationHigh: "M",
      // PriorityRespondDurationMedium: "M",
      // PriorityRespondDurationLow: "M",
      // PriorityResolutionDurationHigh: "M",
      // PriorityResolutionDurationMedium: "M",
      // PriorityResolutionDurationLow: "M",
      value: null,
      PriorityData: [],
      FinalDataOfSlaTarget: [],
      finalData: [],
      indiSla: '',
      // searchSla: '',
      searchedSla: [],
      slaShow: false,
      slaOvrlayShow: false,
    };

    this.handleGetSLA = this.handleGetSLA.bind(this);
    this.handleGetSLAIssueType = this.handleGetSLAIssueType.bind(this);
    this.handleSlaButton = this.handleSlaButton.bind(this);
    this.handleGetPriorityList = this.handleGetPriorityList.bind(this);
  }

  componentDidMount() {
    this.handleGetSLA();
    this.handleGetSLAIssueType();
    this.handleGetPriorityList();
  }

  selectIndividualSLA = async (issueId, event) => {
    debugger;
    var indiSla = this.state.indiSla;
    var separator = ",";
    if (event.target.checked) {
      // indiSla += issueId + ",";
      var values = indiSla.split(separator);
      var flag = values.includes(issueId.toString());
      if (!flag) {
        values.unshift(issueId);
        indiSla = values.join(separator);
      }
      await this.setState({
        indiSla
      });
      document.getElementById('issueTypeValue').textContent = (this.state.indiSla.split(',').length - 1) + ' selected';
    } else {
      // var indiSla = this.state.indiSla;
      // var separator = ",";
      var values = indiSla.split(separator);
      for (var i = 0; i < values.length; i++) {
        if (values[i] === issueId) {
          values.splice(i, 1);
          indiSla = values.join(separator);
        }
      }
      await this.setState({
        indiSla
      });
      if (this.state.indiSla.split(',').length - 1 !== 0) {
        document.getElementById('issueTypeValue').textContent = (this.state.indiSla.split(',').length - 1) + ' selected';
      } else {
        document.getElementById('issueTypeValue').textContent = 'Select';
      }
    }
  };

  selectAboveIndividualSLA = async (issueId, event) => {
    debugger;
    if (event.target.checked) {
      var indiSla = this.state.indiSla;
      var separator = ",";
      var values = indiSla.split(separator);
      var flag = values.includes(issueId.toString());
      if (!flag) {
        values.unshift(issueId);
        indiSla = values.join(separator);
      }
      await this.setState({
        indiSla
      });
      document.getElementById('issueTypeValue').textContent = (this.state.indiSla.split(',').length - 1) + ' selected';
    } else {
      var indiSla = this.state.indiSla;
      var separator = ",";
      var values = indiSla.split(separator);
      for (var i = 0; i < values.length; i++) {
        if (values[i] === issueId) {
          values.splice(i, 1);
          indiSla = values.join(separator);
        }
      }
      await this.setState({
        indiSla
      });
      if (this.state.indiSla.split(',').length - 1 !== 0) {
        document.getElementById('issueTypeValue').textContent = (this.state.indiSla.split(',').length - 1) + ' selected';
      } else {
        document.getElementById('issueTypeValue').textContent = 'Select';
      }
    }
  };

  selectAllSLA = async event => {
    debugger;
    var indiSla = '';
    var checkboxes = document.getElementsByName("allSla");
    document.getElementById("issueTypeValue").textContent = "All Selected";
    for (var i in checkboxes) {
      if (checkboxes[i].checked === false) {
        checkboxes[i].checked = true;
      }
    }
    if (this.state.slaIssueType !== null) {
      this.state.slaIssueType.forEach(allSlaId);
      function allSlaId(item) {
        indiSla += item.issueTypeID + ',';
      }
    }
    await this.setState({
      indiSla
    });
  };

  selectNoSLA = async event => {
    debugger;
    var checkboxes = document.getElementsByName("allSla");
    document.getElementById("issueTypeValue").textContent = "Select";
    for (var i in checkboxes) {
      if (checkboxes[i].checked === true) {
        checkboxes[i].checked = false;
      }
    }
    await this.setState({
      indiSla: ''
    });
  };
  selectNoAboveSLA = async event => {
    debugger;
    var checkboxes = document.getElementsByName("searchedSla");
    for (var i in checkboxes) {
      if (checkboxes[i].checked === true) {
        checkboxes[i].checked = false;
      }
    }
  };

  handleSlaTargets = (i, e) => {
    debugger;
    const { name, value } = e.target;

    let finalData = [...this.state.finalData];
    finalData[i] = {
      ...finalData[i],
      [name]: value
    };
    this.setState({ finalData });
  };
  handleSlaTargetsDropdowns(e) {
    debugger;

    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleGetSLAIssueType() {
    debugger;
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/SLA/GetIssueType",
      headers: authHeader()
    }).then(function (res) {
      debugger;
      let slaIssueType = res.data.responseData;
      let selectedSlaIssueType = slaIssueType[0].issueTypeID;
      if (slaIssueType !== null && slaIssueType !== undefined) {
        self.setState({ slaIssueType, selectedSlaIssueType });
      }
    });
  }

  handleCreate(issueTypeName) {
    let { slaIssueType, value } = this.state;

    let newOption = {
      issueTypeName,
      issueTypeID: slaIssueType.length + 1
    };

    this.setState({
      value: newOption, // select new option
      slaIssueType: [...slaIssueType, newOption] // add new option to our dataset
    });
  }
  handleGetSLA() {
    debugger;
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/SLA/GetSLA",
      headers: authHeader(),
      params: {
        SLAFor: 1
      }
    }).then(function (res) {
      debugger;
      let status = res.data.message;
      let data = res.data.responseData;
      if (status === "Success") {
        self.setState({ sla: data });
      } else {
        self.setState({ sla: [] });
      }
    });
  }
  handleGetPriorityList() {
    debugger;
    let self = this;
    axios({
      method: "get",
      url: config.apiUrl + "/Priority/GetPriorityList",
      headers: authHeader()
    }).then(function (res) {
      debugger;
      let status = res.data.message;
      let data = res.data.responseData;
      let temp = [];

      if (status === "Success") {
        for (let i = 0; i < data.length; i++) {
          let tempData = {};

          tempData.priorityID = data[i].priorityID;
          tempData.priortyName = data[i].priortyName;
          tempData.SlaBreach = "";
          tempData.Rerspondtime = "";
          tempData.RerspondType = 'M';
          tempData.ResolveTime = "";
          tempData.ResolveType = "M";

          temp.push(tempData);
        }
        self.setState({ PriorityData: data, finalData: temp });
      } else {
        self.setState({ PriorityData: [] });
      }
    });
  }

  handleSlaIssueType = e => {
    let slaIssueType = e.currentTarget.value;
    this.setState({ selectedSlaIssueType: slaIssueType });
  };
  handleUpdateSlaIssueType = e => {
    let updateSlaIssueType = e.currentTarget.value;
    this.setState({ updateIssueTypeId: updateSlaIssueType });
  };
  handleUpdateSlaisActive = e => {
    let updateSlaisActive = e.currentTarget.value;
    this.setState({ updateSlaisActive });
  };
  handleSlaIsActive = e => {
    let SlaIsActive = e.currentTarget.value;
    this.setState({ SlaIsActive });
  };
  handleUpdateSla(slaId) {
    debugger;
    let SLAisActive;
    if (this.state.updateSlaisActive === "true") {
      SLAisActive = true;
    } else if (this.state.updateSlaisActive === "false") {
      SLAisActive = false;
    }
    axios({
      method: "post",
      url: config.apiUrl + "/SLA/ModifySLA",
      headers: authHeader(),
      params: {
        SLAID: slaId,
        IssueTypeID: this.state.updateIssueTypeId,
        isActive: SLAisActive
      }
    }).then(res => {
      debugger;
      let status = res.data.message;
      if (status === "Success") {
        NotificationManager.success("SLA updated successfully.");
        this.handleGetSLA();
      } else {
        NotificationManager.error("SLA not updated.");
      }
    });
  }
  updateSla(individualData) {
    debugger;
    let updateIssueTypeId = individualData.issueTpeID,
      slaIsActive = individualData.isSLAActive,
      updateSlaisActive,
      updateSlaTarget = individualData.slaTarget;
    if (slaIsActive === "Inactive") {
      updateSlaisActive = "false";
    } else {
      updateSlaisActive = "true";
    }
    this.setState({
      updateIssueTypeId,
      updateSlaisActive,
      updateSlaTarget
    });
  }
  createSla() {
    debugger;
    let self = this;
    let SlaIsActive;
    let indiSla = this.state.indiSla;
    let commaSeperatedSla = indiSla.substring(0, indiSla.length - 1);
    if (this.state.SlaIsActive === "true") {
      SlaIsActive = true;
    } else if (this.state.SlaIsActive === "false") {
      SlaIsActive = false;
    }
    var data = this.state.finalData;

    var paramData = [];
    for (let i = 0; i < data.length; i++) {
      var temp = {};
      temp.PriorityID = data[i].priorityID;
      temp.SLABreachPercent = data[i].SlaBreach;
      temp.PriorityRespondValue = data[i].Rerspondtime;
      temp.PriorityRespondDuration = data[i].RerspondType;
      temp.PriorityResolutionValue = data[i].ResolveTime;
      temp.PriorityResolutionDuration = data[i].ResolveType
      paramData.push(temp)
    }

    axios({
      method: "post",
      url: config.apiUrl + "/SLA/CreateSLA",
      headers: authHeader(),
      data: {
        IssueTypeID: commaSeperatedSla,
        isSLAActive: SlaIsActive,
        SLATarget: paramData,
        SLAFor: 1
      }
    }).then(function (res) {
      debugger;
      let status = res.data.message;
      if (status === "Success") {
        NotificationManager.success("SLA added successfully.");
        self.setState({
          selectedSlaIssueType: 0,
          SlaIsActive: "true"
        });
        self.handleGetSLA();
        self.handleGetPriorityList();
        self.selectNoSLA();
        self.selectNoAboveSLA();
      } else {
        NotificationManager.error("SLA not added.");
      }
    });
  }

  deleteSLA(deleteId) {
    debugger;
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/SLA/DeleteSLA",
      headers: authHeader(),
      params: {
        SLAID: deleteId
      }
    }).then(function (res) {
      debugger;
      let status = res.data.message;
      if (status === "Success") {
        NotificationManager.success("SLA deleted successfully.");
        self.handleGetSLA();
      } else {
        NotificationManager.error("SLA not deleted.");
      }
    });
  }

  fileUpload = e => {
    this.setState({ fileName: e.target.files[0].name });
  };
  handleAddNoteCheck = e => {

  };
  handleSearchSla = e => {
    debugger;
    // this.setState({
    //   searchSla: e.target.value
    // });
    let self = this;
    if (e.target.value.length > 3) {
      axios({
        method: "post",
        url: config.apiUrl + "/SLA/SearchIssueType",
        headers: authHeader(),
        params: {
          SearchText: e.target.value
        }
      }).then(function (res) {
        debugger;
        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success") {
          self.setState({
            searchedSla: data
          });
        } else {
          self.setState({
            searchedSla: []
          });
        }
      });
    }
  };
  handleSlaButton() {
    debugger;
    // let ele = document.getElementsByClassName('dropdown-menu')[0];
    // let overlay = document.getElementById('overlaySla');
    // let bool = ele.classList.contains('show');
    // let boolOverlay = overlay.classList.contains('show');
    // if (bool) {
    //   ele.classList.remove('show');
    // } else {
    //   ele.classList.add('show');
    // }
    // if (boolOverlay) {
    //   overlay.classList.remove('show');
    // } else {
    //   overlay.classList.add('show');
    // }
    let slaShowOriginal = this.state.slaShow;
    let slaShow = !slaShowOriginal;
    let slaOvrlayShowOriginal = this.state.slaOvrlayShow;
    let slaOvrlayShow = !slaOvrlayShowOriginal;
    this.setState({
      slaShow,
      slaOvrlayShow
    })
  };

  render() {
    // const { slaIssueType, value } = this.state;
    return (
      <React.Fragment>
        <div className="container-fluid setting-title setting-breadcrumb">
          <Link to="settings" className="header-path">
            Settings
          </Link>
          <span>&gt;</span>
          <Link to="settings" className="header-path">
            Ticketing
          </Link>
          <span>&gt;</span>
          <Link to={Demo.BLANK_LINK} className="active header-path">
            SLA
          </Link>
        </div>
        <div className="container-fluid">
          <div className="store-settings-cntr">
            <div className="row">
              <div className="col-md-8">
                <div className="table-cntr table-height TicketSlaReact">
                  <ReactTable
                    data={this.state.sla}
                    columns={[
                      {
                        Header: (
                          <span>
                            Issue Type
                            <FontAwesomeIcon icon={faCaretDown} />
                          </span>
                        ),
                        accessor: "issueTpeName"
                      },
                      {
                        Header: (
                          <span>
                            SLA by Priority
                            <FontAwesomeIcon icon={faCaretDown} />
                          </span>
                        ),
                        accessor: "slaTarget",
                        Cell: row => {
                          var ids = row.original["id"];
                          let slaTarget = row.original.slaTarget,
                            priorityNameComma = "",
                            priorityName = "";
                          for (let i = 0; i < slaTarget.length; i++) {
                            priorityNameComma +=
                              slaTarget[i].priorityName + ",";
                          }
                          priorityName = priorityNameComma.substring(
                            0,
                            priorityNameComma.length - 1
                          );
                          return (
                            <div>
                              <span>
                                <label>{priorityName}</label>
                                {priorityName.length > 0 ? (
                                  <Popover
                                    content={
                                      <div className="general-popover created-popover">
                                        <div>
                                          <label className="slatargettext-1">
                                            SLA TARGETS
                                          </label>
                                        </div>
                                        <div>
                                          <label className="createhead-text-1">
                                            Priority
                                          </label>
                                          <label className="createhead-text-1">
                                            %SLA
                                          </label>
                                          <label className="createhead-text-1">
                                            Respond
                                          </label>
                                          <label className="createhead-text-1">
                                            Resolve
                                          </label>
                                        </div>
                                        {slaTarget !== null &&
                                          slaTarget.map((item, i) => (
                                            <div key={i}>
                                              <label className="slatemp-textpopup-1">
                                                {item.priorityName}
                                              </label>
                                              <label className="slatemp-textpopup-1">
                                                {item.slaBreachPercent}
                                              </label>
                                              <label className="slatemp-textpopup-1">
                                                {item.priorityRespond}
                                              </label>
                                              <label className="slatemp-textpopup-1">
                                                {item.priorityResolution}
                                              </label>
                                            </div>
                                          ))}
                                      </div>
                                    }
                                    placement="bottom"
                                  >
                                    <img
                                      className="info-icon"
                                      src={BlackInfoIcon}
                                      alt="info-icon"
                                      id={ids}
                                    />
                                  </Popover>
                                ) : (
                                    ""
                                  )}
                              </span>
                            </div>
                          );
                        }
                      },
                      {
                        Header: (
                          <span>
                            Created By
                            <FontAwesomeIcon icon={faCaretDown} />
                          </span>
                        ),
                        accessor: "createdBy",
                        Cell: row => {
                          var ids = row.original["id"];
                          return (
                            <div>
                              <span>
                                {row.original.createdBy}
                                <Popover
                                  content={
                                    <>
                                      <div>
                                        <b>
                                          <p className="title">
                                            Created By: {row.original.createdBy}
                                          </p>
                                        </b>
                                        <p className="sub-title">
                                          Created Date:{" "}
                                          {row.original.createdDate}
                                        </p>
                                      </div>
                                      <div>
                                        <b>
                                          <p className="title">
                                            Updated By:{" "}
                                            {row.original.modifiedBy}
                                          </p>
                                        </b>
                                        <p className="sub-title">
                                          Updated Date:{" "}
                                          {row.original.modifiedDate}
                                        </p>
                                      </div>
                                    </>
                                  }
                                  placement="bottom"
                                >
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
                      },

                      {
                        Header: (
                          <span>
                            Status
                            <FontAwesomeIcon icon={faCaretDown} />
                          </span>
                        ),
                        accessor: "isSLAActive"
                      },
                      {
                        Header: <span>Actions</span>,
                        accessor: "actiondept",
                        Cell: row => {
                          var ids = row.original["id"];
                          return (
                            <>
                              <span>
                                <Popover
                                  content={
                                    <div className="d-flex general-popover popover-body">
                                      <div className="del-big-icon">
                                        <img src={DelBigIcon} alt="del-icon" />
                                      </div>
                                      <div>
                                        <p className="font-weight-bold blak-clr">
                                          Delete file?
                                        </p>
                                        <p className="mt-1 fs-12">
                                          Are you sure you want to delete this
                                          file?
                                        </p>
                                        <div className="del-can">
                                          <a href={Demo.BLANK_LINK}>CANCEL</a>
                                          <button
                                            className="butn"
                                            onClick={this.deleteSLA.bind(
                                              this,
                                              row.original.slaid
                                            )}
                                          >
                                            Delete
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  }
                                  placement="bottom"
                                  trigger="click"
                                >
                                  <img
                                    src={RedDeleteIcon}
                                    alt="del-icon"
                                    className="del-btn"
                                    id={ids}
                                  />
                                </Popover>
                                <Popover
                                  content={
                                    <div className="edtpadding">
                                      <label className="popover-header-text">
                                        EDIT SLA
                                      </label>

                                      <div className="pop-over-div">
                                        <label className="edit-label-1">
                                          Issue Type
                                        </label>
                                        <select
                                          id="inputStatus"
                                          className="edit-dropDwon dropdown-setting"
                                          value={this.state.updateIssueTypeId}
                                          onChange={
                                            this.handleUpdateSlaIssueType
                                          }
                                        >
                                          {this.state.slaIssueType !== null &&
                                            this.state.slaIssueType.map(
                                              (item, i) => (
                                                <option
                                                  key={i}
                                                  value={item.issueTypeID}
                                                >
                                                  {item.issueTypeName}
                                                </option>
                                              )
                                            )}
                                        </select>
                                      </div>

                                      {this.state.updateSlaTarget.length >
                                        0 && (
                                          <div className="pop-over-div m-t-10">
                                            <div>
                                              <label className="slatargettext-1">
                                                SLA TARGETS
                                            </label>
                                            </div>
                                            <div>
                                              <label className="createhead-text-1">
                                                Priority
                                            </label>
                                              <label className="createhead-text-1">
                                                %SLA
                                            </label>
                                              <label className="createhead-text-1">
                                                Respond
                                            </label>
                                              <label className="createhead-text-1">
                                                Resolve
                                            </label>
                                            </div>
                                            {this.state.updateSlaTarget !==
                                              null &&
                                              this.state.updateSlaTarget.map(
                                                (item, i) => (
                                                  <div key={i}>
                                                    <label className="slatemp-textpopup-1">
                                                      {item.priorityName}
                                                    </label>
                                                    <label className="slatemp-textpopup-1">
                                                      {item.slaBreachPercent}
                                                    </label>
                                                    <label className="slatemp-textpopup-1">
                                                      {item.priorityRespond}
                                                    </label>
                                                    <label className="slatemp-textpopup-1">
                                                      {item.priorityResolution}
                                                    </label>
                                                  </div>
                                                )
                                              )}
                                          </div>
                                        )}

                                      <div className="pop-over-div">
                                        <label className="edit-label-1">
                                          Status
                                        </label>
                                        <select
                                          id="inputStatus"
                                          className="edit-dropDwon dropdown-setting"
                                          value={this.state.updateSlaisActive}
                                          onChange={
                                            this.handleUpdateSlaisActive
                                          }
                                        >
                                          <option value="true">Active</option>
                                          <option value="false">
                                            Inactive
                                          </option>
                                        </select>
                                      </div>
                                      <br />
                                      <div>
                                        <label className="pop-over-cancle">
                                          CANCEL
                                        </label>
                                        <button className="pop-over-button">
                                          <label
                                            className="pop-over-btnsave-text"
                                            onClick={this.handleUpdateSla.bind(
                                              this,
                                              row.original.slaid
                                            )}
                                          >
                                            SAVE
                                          </label>
                                        </button>
                                      </div>
                                    </div>
                                  }
                                  placement="bottom"
                                  trigger="click"
                                >
                                  <button
                                    className="react-tabel-button"
                                    id="p-edit-pop-2"
                                    onClick={this.updateSla.bind(
                                      this,
                                      row.original
                                    )}
                                  >
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
                    ]}
                    // resizable={false}
                    defaultPageSize={10}
                    showPagination={true}
                  />
                  {/* <div className="position-relative">
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
                  </div> */}
                </div>
              </div>
              <div className="col-md-4">
                <div className="store-col-2">
                  <div className="createSpace">
                    <label className="Create-store-text">CREATE SLA</label>
                    <div className="divSpace">
                      <div className="dropDrownSpace issuetype-cusdrp">
                        <label className="reports-to">Issue Type</label>
                        <div className="dropdown">
                          <button
                            className="btn issuesladrop"
                            type="button"
                            // data-toggle="dropdown"
                            id="issueTypeValue"
                            onClick={this.handleSlaButton}
                          >
                            Select
                            <span className="caret"></span>
                          </button>
                          <div className={this.state.slaShow ? "dropdown-menu dropdown-menu-sla show" : "dropdown-menu dropdown-menu-sla"}>
                            <div className="cat-mainbox">
                              <input
                                type="text"
                                className="searchf"
                                placeholder="Search"
                                maxLength={10}
                                name="store_code"
                                onChange={this.handleSearchSla}
                              />
                              <div className="filter-checkbox category-scroll">
                                <ul>
                                  {this.state.searchedSla !== null &&
                                    this.state.searchedSla.map((item, i) => (
                                      <li key={i}>
                                        <input
                                          type="checkbox"
                                          id={"j" + item.issueTypeID}
                                          name="searchedSla"
                                          style={{ display: "none" }}
                                          onChange={this.handleAddNoteCheck}
                                          onChange={this.selectAboveIndividualSLA.bind(this, item.issueTypeID)}
                                        />
                                        <label
                                          htmlFor={"j" + item.issueTypeID}
                                          style={{ paddingLeft: "25px" }}
                                        >
                                          <span className="add-note">{item.issueTypeName}</span>
                                        </label>
                                      </li>
                                    ))}
                                </ul>
                              </div>
                              <div className="category-button">
                                <ul>
                                  <li>
                                    <label onClick={this.selectAllSLA.bind(this)}>Select All</label>
                                  </li>
                                  <li>
                                    <label onClick={this.selectNoSLA.bind(this)}>Clear</label>
                                  </li>
                                </ul>
                              </div>
                              <div className="category-box category-scroll">
                                <ul>
                                  {this.state.slaIssueType !== null &&
                                    this.state.slaIssueType.map((item, i) => (
                                      <li key={i}>
                                        <input type="checkbox" id={"i" + item.issueTypeID} name="allSla" onChange={this.selectIndividualSLA.bind(this, item.issueTypeID)} />
                                        <label htmlFor={"i" + item.issueTypeID}>{item.issueTypeName} <img src={Correct} alt="Checked" /></label>
                                        <span>{item.categoryName}</span>
                                        <span>{item.subCategoryName}</span>
                                      </li>
                                    ))}
                                  {/* <li>
                                    <input type="checkbox" id="uio" />
                                    <label htmlFor="uio">Broken Shoe <img src={Correct} alt="Checked" /></label>
                                    <span>Defective article</span>
                                    <span>Complaint</span>
                                  </li>
                                  <li>
                                    <label>Broken Shoe <img src={Correct} alt="Checked" /></label>
                                    <span>Defective article</span>
                                    <span>Complaint</span>
                                  </li>
                                  <li>
                                    <label>Broken Shoe <img src={Correct} alt="Checked" /></label>
                                    <span>Defective article</span>
                                    <span>Complaint</span>
                                  </li>
                                  <li>
                                    <label>Broken Shoe <img src={Correct} alt="Checked" /></label>
                                    <span>Defective article</span>
                                    <span>Complaint</span>
                                  </li> */}
                                </ul>
                              </div>
                            </div>
                            <div className="category-buttonbtm">
                              <ul>
                                <li>
                                  <button
                                    className="cancel"
                                    onClick={this.handleSlaButton}
                                  >
                                    Cancel
                                    </button>
                                </li>
                                <li style={{ float: "right" }}>
                                  <button
                                    className="done"
                                    onClick={this.handleSlaButton}
                                  >Done
                                    </button>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="slatargetRow">
                      <label className="slatargettext">SLA Targets</label>
                    </div>
                    <div className="slatargetRow-1">
                      <label className="createhead-text-new">Priority</label>
                      <label className="createhead-text">
                        %SLA <br /> Breach
                      </label>
                      <label className="createhead-text">Rerspond</label>
                      <label className="createhead-text">Resolve</label>
                    </div>
                    {this.state.finalData !== null &&
                      this.state.finalData.map((item, i) => (
                        <div className="slatargetRow-1" key={i}>
                          <div className="sla-div">
                            <label className="createhead-text-1">
                              {item.priortyName}
                            </label>
                          </div>
                          <div className="sla-div-1">
                            <div className="inner-div">
                              <input
                                type="text"
                                placeholder="30"
                                className="text-box-crt-sla"
                                name="SlaBreach"
                                value={item.SlaBreach || ""}
                                autoComplete="off"
                                onChange={this.handleSlaTargets.bind(this, i)}
                              />
                            </div>
                            <div className="inner-div-2-1">
                              <label className="pers-lable">%</label>
                            </div>
                          </div>
                          <div className="sla-div-1">
                            <div className="inner-div">
                              <input
                                type="text"
                                placeholder="30"
                                className="text-box-crt-sla"
                                name="Rerspondtime"
                                value={item.Rerspondtime}
                                autoComplete="off"
                                onChange={this.handleSlaTargets.bind(this, i)}
                              />
                            </div>
                            <div className="inner-div-2">
                              <select
                                className="pers-lable-select"
                                name="RerspondType"
                                value={item.RerspondType}
                                onChange={this.handleSlaTargets.bind(this, i)}
                              >
                                <option value="M">M</option>
                                <option value="H">H</option>
                                <option value="D">D</option>
                              </select>
                            </div>
                          </div>
                          <div className="sla-div-1">
                            <div className="inner-div">
                              <input
                                type="text"
                                placeholder="30"
                                className="text-box-crt-sla"
                                autoComplete="off"
                                name="ResolveTime"
                                value={item.ResolveTime || ""}
                                onChange={this.handleSlaTargets.bind(this, i)}
                              />
                            </div>
                            <div className="inner-div-2">
                              <select
                                className="pers-lable-select"
                                name="ResolveType"
                                value={item.ResolveType}
                                onChange={this.handleSlaTargets.bind(this, i)}
                              >
                                <option value="M">M</option>
                                <option value="H">H</option>
                                <option value="D">D</option>
                              </select>
                            </div>
                          </div>
                        </div>
                      ))}


                    <div className="divSpace-3">
                      <div className="dropDrownSpace">
                        <label className="reports-to">Status</label>
                        <select
                          className="store-create-select"
                          value={this.state.SlaIsActive}
                          onChange={this.handleSlaIsActive}
                        >
                          <option value="true">Active</option>
                          <option value="false">Inactive</option>
                        </select>
                      </div>
                    </div>
                    <div className="btnSpace">
                      <button
                        className="addBtn-ticket-hierarchy"
                        type="button"
                        onClick={this.createSla.bind(this)}
                      >
                        ADD
                      </button>
                    </div>
                  </div>
                </div>
                <br />
                <div className="store-col-2">
                  <div className="right-sect-div">
                    <br />
                    <h3>Bulk Upload</h3>
                    <div className="down-excel">
                      <p>Template</p>
                      <CSVLink filename={"SLA.csv"} data={config.slaTemplate}>
                        <img src={DownExcel} alt="download icon" />
                      </CSVLink>
                    </div>
                    <input
                      id="file-upload"
                      className="file-upload d-none"
                      type="file"
                      onChange={this.fileUpload.bind(this)}
                    />
                    <label htmlFor="file-upload">
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
                            <UncontrolledPopover
                              trigger="legacy"
                              placement="auto"
                              target="del-file-1"
                              className="general-popover delete-popover"
                            >
                              <PopoverBody className="d-flex">
                                <div className="del-big-icon">
                                  <img src={DelBigIcon} alt="del-icon" />
                                </div>
                                <div>
                                  <p className="font-weight-bold blak-clr">
                                    Delete file?
                                  </p>
                                  <p className="mt-1 fs-12">
                                    Are you sure you want to delete this file?
                                  </p>
                                  <div className="del-can">
                                    <a href={Demo.BLANK_LINK}>CANCEL</a>
                                    <button className="butn">Delete</button>
                                  </div>
                                </div>
                              </PopoverBody>
                            </UncontrolledPopover>
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
                    <br />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <NotificationContainer />
        <div id="overlaySla" className={this.state.slaOvrlayShow ? 'show' : ''}  onClick={this.handleSlaButton} />
      </React.Fragment>
    );
  }
}
export default CreateSLA;
