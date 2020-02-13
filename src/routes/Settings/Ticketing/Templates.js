import React, { Component } from "react";
import ReactTable from "react-table";
import Demo from "../../../store/Hashtag";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import InfoImg from "./../../../assets/Images/icons8-info.svg";
// import DeleteIcon from "./../../../assets/Images/red-delete-icon.png";
import DelBigIcon from "./../../../assets/Images/del-big.png";
// import { UncontrolledPopover, PopoverBody } from "reactstrap";
import { Popover } from "antd";
import { Link } from "react-router-dom";
// import BlackInfoIcon from "./../../../assets/Images/Info-black.png";
import DeleteIcon from "./../../../assets/Images/red-delete-icon.png";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import CancelImg from "./../../../assets/Images/Circle-cancel.png";
import CKEditor from "react-ckeditor-component";
import Modal from "react-bootstrap/Modal";
import { authHeader } from "./../../../helpers/authHeader";
import axios from "axios";
import config from "./../../../helpers/config";
import {
  NotificationContainer,
  NotificationManager
} from "react-notifications";
import Select from "react-select";

class Templates extends Component {
  constructor(props) {
    super(props)

    this.state = {
      ConfigTabsModal: false,
      template: [],
      TemplateName: '',
      TemplateIsActive: 'true',
      TemplateSubject: '',
      editorContent: '',
      slaIssueType: [],
      selectedSlaIssueType: [],
      selectedIssueTypeCommaSeperated: "",
      editStatus: "",
      editIssueType: [],

      templateEdit: {}
    }

    this.handleGetTemplate = this.handleGetTemplate.bind(this);
    this.handleTemplateName = this.handleTemplateName.bind(this);
    this.handleTemplateSubject = this.handleTemplateSubject.bind(this);
    this.handleGetSLAIssueType = this.handleGetSLAIssueType.bind(this);
  }

  componentDidMount() {
    this.handleGetTemplate();
    this.handleGetSLAIssueType();
  }


  setTemplateEditData(editdata) {
    debugger;
    var templateEdit = editdata;
    templateEdit.template_ID = editdata.templateID;
    templateEdit.template_Name = editdata.templateName;
    templateEdit.issue_Type = editdata.issueType;
    templateEdit.template_Status = editdata.templateStatus;

    var editIssueType = templateEdit.issue_Type.split(',').map(Number);



    if (templateEdit.template_Status === "Active") {
      templateEdit.template_Status = "true";
    }
    else {
      templateEdit.template_Status = "false";
    }


    this.setState({
      templateEdit, editIssueType
    })

  }
  handleOnChangeEditData = e => {
    debugger;
    var name = e.target.name;
    var value = e.target.value;

    var data = this.state.templateEdit;
    data[name] = value;

    this.setState({
      EditTemp: data
    });

  };
  setIssueType = e => {
    debugger;
    if (e !== null) {
      var selectedIssueTypeCommaSeperated = Array.prototype.map
        .call(e, s => s.issueTypeID)
        .toString();
    }
    this.setState({
      selectedSlaIssueType: e,
      selectedIssueTypeCommaSeperated
    });
  };

  setEditIssueType = e => {
    debugger;

    this.setState({
      editIssueType: e

    });
  };


  handleTemplateName(e) {
    debugger;
    this.setState({
      TemplateName: e.target.value
    });
  }
  onEditorChange = (evt) => {
    debugger;
    var newContent = evt.editor.getData();
    this.setState({
      editorContent: newContent
    });
  }
  handleTemplateSubject(e) {
    debugger;
    this.setState({
      TemplateSubject: e.target.value
    });
  }
  handleTemplateIsActive = e => {
    debugger;
    let TemplateIsActive = e.currentTarget.value;
    this.setState({ TemplateIsActive });
  };

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
      if (slaIssueType !== null && slaIssueType !== undefined) {
        self.setState({ slaIssueType });
      }
    });
  }

  deleteTemplate(deleteId) {
    debugger;
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/Template/DeleteTemplate",
      headers: authHeader(),
      params: {
        TemplateID: deleteId
      }
    }).then(function (res) {
      debugger;
      let status = res.data.message;
      if (status === "Success") {
        NotificationManager.success("Template deleted successfully.");
        self.handleGetTemplate();
      } else {
        NotificationManager.error("Template not deleted.");
      }
    });
  }

  createTemplate() {
    debugger;
    let self = this;
    this.setState({ ConfigTabsModal: false })
    let TemplateIsActive;
    if (this.state.TemplateIsActive === 'true') {
      TemplateIsActive = true
    } else if (this.state.TemplateIsActive === 'false') {
      TemplateIsActive = false
    }

    axios({
      method: "post",
      url: config.apiUrl + "/Template/CreateTemplate",
      headers: authHeader(),
      params: {
        TemplateName: this.state.TemplateName,
        TemplateSubject: this.state.TemplateSubject,
        TemplateBody: this.state.editorContent,
        issueTypes: this.state.selectedIssueTypeCommaSeperated,
        isTemplateActive: TemplateIsActive
      }
    }).then(function (res) {
      debugger;
      let status = res.data.message;
      if (status === "Success") {
        NotificationManager.success("Template added successfully.");
        self.handleGetTemplate();
      } else {
        NotificationManager.error("Template not added.");
      }
    });
  }

  handleGetTemplate() {
    debugger;
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/Template/GetTemplate",
      headers: authHeader()
    }).then(function (res) {
      debugger;
      let template = res.data.responseData;
      if (template !== null && template !== undefined) {
        self.setState({ template });
      }
    });
  }

  handleConfigureTabsOpen() {
    this.setState({ ConfigTabsModal: true })
  }
  handleConfigureTabsClose() {
    this.setState({ ConfigTabsModal: false })
  }
  render() {
    const columns = [
      {
        Header: (
          <span>
            Name
            <FontAwesomeIcon icon={faCaretDown} />
          </span>
        ),
        accessor: "templateName"
      },
      {
        Header: (
          <span>
            Issue Type
            <FontAwesomeIcon icon={faCaretDown} />
          </span>
        ),
        accessor: "issueType",
        Cell: props => <span className="number">{props.value}</span>
      },
      {
        id: "createdBy",
        Header: (
          <span>
            Created by
            <FontAwesomeIcon icon={faCaretDown} />
          </span>
        ),
        Cell: row => {
          var ids = row.original["id"];
          return (
            <>
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
                } placement="bottom">
                  <img
                    src={InfoImg}
                    className="info-icon"
                    alt="Info"
                    id={ids}
                  />
                </Popover>
              </span>
            </>
          );
        }
        // accessor: "createdBy"
      },
      {
        Header: (
          <span>
            Status
            <FontAwesomeIcon icon={faCaretDown} />
          </span>
        ),
        accessor: "templateStatus"
      },
      {
        Header: "Actions",
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
                        <button className="butn" onClick={this.deleteTemplate.bind(this, row.original.templateID)}>Delete</button>
                      </div>
                    </div>
                  </div>
                } placement="bottom" trigger="click">
                  <img
                    src={DeleteIcon}
                    alt="del-icon"
                    className="del-btn"
                    id={ids}
                  />
                </Popover>
                <Popover content={<div className="edtpadding">
                  <div className="">
                    <label className="popover-header-text">EDIT TEMPLATES</label>
                  </div>
                  <div className="pop-over-div">
                    <label className="edit-label-1">Name</label>
                    <input
                      type="text"
                      className="txt-edit-popover"
                      placeholder="Enter Name"
                      maxLength={25}
                      name="template_Name"
                      value={this.state.templateEdit.template_Name}
                      onChange={this.handleOnChangeEditData}
                    />
                  </div>
                  <div className="pop-over-div">
                    <label className="edit-label-1">Issue Type</label>
                    <Select
                      getOptionLabel={option =>
                        option.issueTypeName
                      }
                      getOptionValue={
                        option => option.issueTypeID //id
                      }
                      options={
                        this.state
                          .slaIssueType
                      }
                      placeholder="Select"
                      // menuIsOpen={true}
                      closeMenuOnSelect={
                        false
                      }
                      onChange={this.setEditIssueType.bind(
                        this
                      )}
                      value={
                        this.state.editIssueType

                      }

                      // showNewOptionAtTop={false}
                      defaultValue={{ label: "asd", value: 1 }}
                      isMulti
                    />
                  </div>
                  <div className="pop-over-div">
                    <label className="edit-label-1">Status</label>
                    <select id="inputStatus" className="edit-dropDwon dropdown-setting"
                      name="template_Status"
                      value={this.state.templateEdit.template_Status}
                      onChange={this.handleOnChangeEditData}
                    >
                      <option value="true">Active</option>
                      <option value="false">Inactive</option>
                    </select>
                  </div>
                  <br />
                  <div>
                    <a className="pop-over-cancle" onClick={this.hide}>CANCEL</a>
                    <button className="pop-over-button">
                      <label className="pop-over-btnsave-text">SAVE</label>
                    </button>
                  </div>
                </div>} placement="bottom" trigger="click">
                  <button className="react-tabel-button editre" id="p-edit-pop-2"
                    onClick={this.setTemplateEditData.bind(this, row.original)}
                  >
                    EDIT
                    {/* <label className="Table-action-edit-button-text">
                      EDIT
                    </label> */}
                  </button>
                </Popover>
              </span>
            </>
          );
        }

        //  className:"action-template",
      }
    ];


    return (
      <React.Fragment>
        <div className="container-fluid setting-title setting-breadcrumb">
          <Link to="settings" className="header-path">Settings</Link>
          <span>&gt;</span>
          <Link to="settings" className="header-path">Ticketing</Link>
          <span>&gt;</span>
          <Link to={Demo.BLANK_LINK} className="header-path active">
            Templates
          </Link>
        </div>
        <div className="container-fluid">
          <div className="store-settings-cntr">
            <div className="row">
              <div className="col-md-8">
                <div className="table-cntr table-height template-table">
                  <ReactTable
                    data={this.state.template}
                    columns={columns}
                    // resizable={false}
                    defaultPageSize={10}
                    showPagination={false}
                  />
                  <div className="position-relative1">
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
                <div className="createHierarchyMask">
                  <div className="createSpace">
                    <label className="create-department">
                      CREATE TEMPLATES
                    </label>
                    <div className="div-padding-1">
                      <label className="designation-name">Name</label>
                      <input
                        type="text"
                        className="txt-1"
                        placeholder="Enter Name"
                        maxLength={25}
                        onChange={this.handleTemplateName}
                      />
                    </div>
                    <div className="divSpace">
                      <div className="dropDrownSpace">
                        <label className="reports-to">Issue Type</label>
                        {/* <select
                          id="inputState"
                          className="form-control dropdown-setting"
                        >
                          <option>Select</option>
                        </select> */}
                        <div className="normal-dropdown mt-0 dropdown-setting temp-multi schedule-multi">
                          <Select
                            getOptionLabel={option =>
                              option.issueTypeName
                            }
                            getOptionValue={
                              option => option.issueTypeID //id
                            }
                            options={
                              this.state
                                .slaIssueType
                            }
                            placeholder="Select"
                            // menuIsOpen={true}
                            closeMenuOnSelect={
                              false
                            }
                            onChange={this.setIssueType.bind(
                              this
                            )}
                            value={
                              this.state
                                .selectedSlaIssueType
                            }

                            // showNewOptionAtTop={false}
                            isMulti
                          />
                        </div>
                      </div>
                    </div>
                    <div className="divSpace">
                      <div className="dropDrownSpace">
                        <label className="reports-to">Status</label>
                        <select
                          id="inputState"
                          className="form-control dropdown-setting"
                          value={this.state.TemplateIsActive}
                          onChange={this.handleTemplateIsActive}
                        >
                          <option value="true">Active</option>
                          <option value="false">Inactive</option>
                        </select>
                      </div>
                    </div>
                    <div className="btnSpace">
                      <button className="CreateADDBtn"
                        onClick={this.handleConfigureTabsOpen.bind(this)}
                      >
                        CONFIGURE TEMPLATE
                        {/* <label className="addLable">CONFIGURE TEMPLATE</label> */}
                      </button>
                      <Modal
                        size="lg"
                        show={this.state.ConfigTabsModal}
                        onHide={this.handleConfigureTabsClose.bind(this)}
                      >
                        <Modal.Header>
                          <div className="row config-tab">
                            <div className="col-md-9 templateName">
                              <label className="template-text">TEMPLATE NAME : COMPLAINT STATUS</label>
                            </div>
                            <div className="col-md-3">
                              <img src={CancelImg} alt="CancelImg" className="cancelImg-config"
                                onClick={this.handleConfigureTabsClose.bind(this)} />
                            </div>
                          </div>
                        </Modal.Header>
                        <div className="temp-sub">
                          <label className="designation-name">Template Subject</label>
                          <input
                            type="text"
                            className="txt-1"
                            placeholder="Enter Template Subject"
                            maxLength={25}
                            onChange={this.handleTemplateSubject}
                          />
                        </div>
                        <Modal.Body>
                          <div className="template-editor">
                            <CKEditor

                              content={this.state.editorContent}
                              events={{
                                // "blur": this.onBlur,
                                // "afterPaste": this.afterPaste,
                                change: this.onEditorChange,
                                items: this.fileUpload
                              }}
                            />
                          </div>
                          <div className="config-button">
                            <button className="config-buttontext" onClick={this.createTemplate.bind(this)} type="submit">
                              SAVE & NEXT
                              </button>
                          </div>
                        </Modal.Body>
                      </Modal>

                    </div>
                  </div>
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

export default Templates;
