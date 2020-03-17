import React, { Component, useState } from "react";
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
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import Sorting from "./../../../assets/Images/sorting.png";

class Templates extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ConfigTabsModal: false,
      template: [],
      TemplateName: "",
      TemplateIsActive: "true",
      TemplateSubject: "",
      editorContent: "",
      slaIssueType: [],
      selectedSlaIssueType: [],
      selectedIssueTypeCommaSeperated: "",
      editStatus: "",
      editIssueType: [],
      templateEdit: {},
      templatenamecopulsion: "",
      issurtupeCompulsion: "",
      statusCompulsion: "",
      // templatesubjectCompulsion: "",
      templatebodyCompulsion: "",
      StatusModel: false,
      sortColumn: "",
      sortAllData: [],
      sortIssueType: [],
      updatedTemplatename: "",
      updatedArray: [],
      updatedStatus: "",
      rowData: {},
      editmodel: false,
      isEdit: false,
      isLoading: false,
      editSaveLoading: false,
      issueColor: "",
      editTemplateName: "",
      editIssueTypeSelect: "",
      issueColor: ""
    };

    this.handleGetTemplate = this.handleGetTemplate.bind(this);
    this.handleTemplateName = this.handleTemplateName.bind(this);
    this.handleTemplateSubject = this.handleTemplateSubject.bind(this);
    this.handleGetSLAIssueType = this.handleGetSLAIssueType.bind(this);
    this.StatusOpenModel = this.StatusOpenModel.bind(this);
    this.StatusCloseModel = this.StatusCloseModel.bind(this);
    this.handleUpdateTemplate = this.handleUpdateTemplate.bind(this);
    this.toggleEditModal = this.toggleEditModal.bind(this);
  }

  componentDidMount() {
    this.handleGetTemplate();
    this.handleGetSLAIssueType();
  }
  callBackEdit = (templateName, arraydata, templateStatus, rowData) => {
    debugger;
    // this.setState({RoleName,updateRoleisActive:Status})
    this.state.updatedTemplatename = templateName;
    this.state.updatedArray = arraydata;
    this.state.updatedStatus = templateStatus;
    this.state.rowData = rowData;
  };

  handleUpdateTemplate() {
    debugger;
    let self = this;
    var activeStatus = false;
    var issuetype = "";

    if (self.state.templateEdit.template_Status === "true") {
      activeStatus = true;
    } else {
      activeStatus = false;
    }

    if (this.state.editIssueType.length > 0) {
      for (let i = 0; i < this.state.editIssueType.length; i++) {
        issuetype += this.state.editIssueType[i].issueTypeID + ",";
      }
    }
    var issue = issuetype.substring(0, issuetype.length - 1);
    this.setState({ editSaveLoading: true });
    axios({
      method: "post",
      url: config.apiUrl + "/Template/ModifyTemplate",
      headers: authHeader(),
      params: {
        TemplateID: self.state.templateEdit.template_ID,
        TemplateName: self.state.templateEdit.TemplateName.trim(),
        issueType: issue,
        templateSubject: this.state.TemplateSubject,
        templateContent: this.state.editorContent,
        isTemplateActive: activeStatus
      }
    })
      .then(function(res) {
        debugger;
        let status = res.data.message;
        if (status === "Success") {
          NotificationManager.success(
            "Template update successfully.",
            "",
            1000
          );
          self.handleGetTemplate();
          self.setState({ editSaveLoading: false, ConfigTabsModal: false });
        } else {
          self.setState({ editSaveLoading: false, ConfigTabsModal: false });
          NotificationManager.error("Template not update.", "", 1000);
        }
      })
      .catch(data => {
        self.setState({ editSaveLoading: false, ConfigTabsModal: false });
        console.log(data);
      });
  }

  sortStatusAtoZ() {
    debugger;
    var itemsArray = [];
    itemsArray = this.state.template;

    itemsArray.sort(function(a, b) {
      return a.ticketStatus > b.ticketStatus ? 1 : -1;
    });

    this.setState({
      brantemplatedData: itemsArray
    });
    this.StatusCloseModel();
  }
  sortStatusZtoA() {
    debugger;
    var itemsArray = [];
    itemsArray = this.state.template;
    itemsArray.sort((a, b) => {
      return a.ticketStatus < b.ticketStatus;
    });
    this.setState({
      template: itemsArray
    });
    this.StatusCloseModel();
  }

  StatusOpenModel(data) {
    debugger;

    this.setState({ StatusModel: true, sortColumn: data });
  }
  StatusCloseModel() {
    this.setState({ StatusModel: false });
  }

  setSortCheckStatus = (column, e) => {
    debugger;

    var itemsArray = [];
    var data = e.currentTarget.value;
    this.setState({
      issueColor: ""
    });
    if (column === "all") {
      itemsArray = this.state.sortAllData;
    } else if (column === "issueTypeName") {
      this.state.template = this.state.sortAllData;
      itemsArray = this.state.template.filter(a => a.issueTypeName === data);
      this.setState({
        issueColor: "sort-column"
      });
    }

    this.setState({
      template: itemsArray
    });
    this.StatusCloseModel();
  };

  setTemplateEditData(editdata) {
    debugger;
    var templateEdit = {};
    templateEdit.template_ID = editdata.templateID;
    templateEdit.TemplateName = editdata.templateName;
    templateEdit.issue_Type = editdata.issueType;
    templateEdit.template_Status = editdata.templateStatus;
    var TemplateSubject = editdata.templateSubject;
    var editorContent = editdata.templateContent;

    var itypeData = editdata.issueTypeID.split(",");
    var iSelect = [];

    for (let i = 0; i < itypeData.length; i++) {
      var idata = this.state.slaIssueType.filter(
        x => x.issueTypeID == itypeData[i]
      );

      iSelect.push(idata[0]);
    }

    if (editdata.template_Status === "Active") {
      templateEdit.template_Status = "true";
    } else {
      templateEdit.template_Status = "false";
    }

    this.setState({
      TemplateSubject,
      editorContent,
      templateEdit,
      editIssueType: iSelect,
      editmodel: true,
      isEdit: true
    });
  }
  handleOnChangeEditData = e => {
    debugger;
    var name = e.target.name;
    var value = e.target.value;
    var data = this.state.templateEdit;
    if (name === "TemplateName" && value === "") {
      data[name] = value;
      this.setState({ editTemplateName: "Please Enter Templates Name" });
    } else {
      data[name] = value;
      this.setState({ editTemplateName: "" });
    }
    data[name] = value;

    this.setState({
      templateEdit: data
    });
  };
  setIssueType = e => {
    debugger;
    if (e === null) {
      e = [];
      this.setState({ selectedSlaIssueType: e });
    } else {
      if (e !== null) {
        var selectedIssueTypeCommaSeperated = Array.prototype.map
          .call(e, s => s.issueTypeID)
          .toString();
      }
      this.setState({
        selectedSlaIssueType: e,
        selectedIssueTypeCommaSeperated
      });
    }
  };

  setEditIssueType = e => {
    debugger;
    if (e) {
      if (e.length === 0) {
        this.setState({
          editIssueTypeSelect: "Please Select Issue Type",
          editIssueType: e
        });
      }
      else
      {
        this.setState({
          editIssueType: e,
          editIssueTypeSelect: ""
        });
      }
    } else {
      this.setState({
        editIssueType: e,
        editIssueTypeSelect: "Please Select Issue Type"
      });
    }
  };

  handleTemplateName(e) {
    debugger;
    this.setState({
      TemplateName: e.target.value
    });
  }
  onEditorChange = evt => {
    debugger;
    var newContent = evt.editor.getData();
    this.setState({
      editorContent: newContent
    });
  };
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
    var data = "template";
    axios({
      method: "post",
      url: config.apiUrl + "/SLA/GetIssueType",
      headers: authHeader(),
      params: {
        SearchText: data
      }
    })
      .then(function(res) {
        debugger;
        let slaIssueType = res.data.responseData;
        if (slaIssueType !== null && slaIssueType !== undefined) {
          self.setState({ slaIssueType });
        }
      })
      .catch(data => {
        console.log(data);
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
    })
      .then(function(res) {
        debugger;
        let status = res.data.message;
        if (status === "Success") {
          NotificationManager.success(
            "Template deleted successfully.",
            "",
            1000
          );
          self.handleGetTemplate();
        } else {
          NotificationManager.error("Template not deleted.", "", 1000);
        }
      })
      .catch(data => {
        console.log(data);
      });
  }

  createTemplate() {
    debugger;
    if (this.state.editorContent.length > 0) {
      let self = this;
      this.setState({ ConfigTabsModal: false });
      var TemplateIsActive;
      if (this.state.TemplateIsActive === "true") {
        TemplateIsActive = true;
      } else if (this.state.TemplateIsActive === "false") {
        TemplateIsActive = false;
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
      })
        .then(function(res) {
          debugger;
          let status = res.data.message;
          if (status === "Success") {
            NotificationManager.success(
              "Template added successfully.",
              "",
              1000
            );
            self.handleGetTemplate();
            self.setState({
              TemplateSubject: "",
              editorContent: "",
              TemplateName: "",
              selectedSlaIssueType: [],
              // templatesubjectCompulsion: "",
              templatebodyCompulsion: ""
            });
          } else {
            NotificationManager.error("Template not added.", "", 1000);
          }
        })
        .catch(data => {
          console.log(data);
        });
    } else {
      this.setState({
        // templatesubjectCompulsion: "Please Enter Subject",
        templatebodyCompulsion: "Please Enter Descriptions"
      });
    }
  }

  handleGetTemplate() {
    debugger;
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/Template/GetTemplate",
      headers: authHeader()
    })
      .then(function(res) {
        debugger;
        let template = res.data.responseData;

        if (template !== null) {
          self.state.sortAllData = template;
          var unique = [];
          var distinct = [];
          for (let i = 0; i < template.length; i++) {
            if (!unique[template[i].issueTypeName]) {
              distinct.push(template[i].issueTypeName);
              unique[template[i].issueTypeName] = 1;
            }
          }
          for (let i = 0; i < distinct.length; i++) {
            self.state.sortIssueType.push({ issueTypeName: distinct[i] });
          }
        }
        if (template !== null && template !== undefined) {
          self.setState({ template });
        }
      })
      .catch(data => {
        console.log(data);
      });
  }

  handleConfigureTabsOpen() {
    debugger;
    if (
      this.state.TemplateName.length > 0 &&
      this.state.selectedSlaIssueType !== null
    ) {
      this.setState({ ConfigTabsModal: true });
    } else {
      this.setState({
        templatenamecopulsion: "Please Enter Template Name",
        issurtupeCompulsion: "Plaese Select IssueType"
      });
    }
  }
  handleConfigureTabsClose() {
    this.setState({ ConfigTabsModal: false });
  }

  toggleEditModal() {
    this.setState({ editmodel: false });
  }
  CustomNoDataComponent = () => {
    if (this.state.isLoading) {
      return null;
    }
    return <div className="rt-noData">No rows found</div>;
  };
  handleEditSave = e => {
    this.setState({ ConfigTabsModal: true, editmodel: false });
  };
  render() {
    return (
      <React.Fragment>
        <div className="position-relative d-inline-block">
          <Modal
            show={this.state.StatusModel}
            onHide={this.StatusCloseModel.bind(this)}
            //onClose={this.StatusCloseModel}
            //open={this.state.StatusModel}
            modalId="Status-popup"
            overlayId="logout-ovrly"
          >
            <div className="status-drop-down">
              <div className="sort-sctn">
                <div className="d-flex">
                  <a
                    href="#!"
                    onClick={this.sortStatusAtoZ.bind(this)}
                    className="sorting-icon"
                  >
                    <img src={Sorting} alt="sorting-icon" />
                  </a>
                  <p>SORT BY A TO Z</p>
                </div>
                <div className="d-flex">
                  <a
                    href="#!"
                    onClick={this.sortStatusZtoA.bind(this)}
                    className="sorting-icon"
                  >
                    <img src={Sorting} alt="sorting-icon" />
                  </a>
                  <p>SORT BY Z TO A</p>
                </div>
              </div>
              <div className="filter-type">
                <p>FILTER BY TYPE</p>
                <div className="filter-checkbox">
                  <input
                    type="checkbox"
                    name="filter-type"
                    id={"fil-open"}
                    value="all"
                    onChange={this.setSortCheckStatus.bind(this, "all")}
                  />
                  <label htmlFor={"fil-open"}>
                    <span className="table-btn table-blue-btn">ALL</span>
                  </label>
                </div>
                {this.state.sortColumn === "issueTypeName"
                  ? this.state.sortIssueType !== null &&
                    this.state.sortIssueType.map((item, i) => (
                      <div className="filter-checkbox">
                        <input
                          type="checkbox"
                          name="filter-type"
                          id={"fil-open" + item.issueTypeName}
                          value={item.issueTypeName}
                          onChange={this.setSortCheckStatus.bind(
                            this,
                            "issueTypeName"
                          )}
                        />
                        <label htmlFor={"fil-open" + item.issueTypeName}>
                          <span className="table-btn table-blue-btn">
                            {item.issueTypeName}
                          </span>
                        </label>
                      </div>
                    ))
                  : null}
              </div>
            </div>
          </Modal>
        </div>

        <div className="container-fluid setting-title setting-breadcrumb">
          <Link to="settings" className="header-path">
            Settings
          </Link>
          <span>&gt;</span>
          <Link to="settings" className="header-path">
            Ticketing
          </Link>
          <span>&gt;</span>
          <Link to={Demo.BLANK_LINK} className="header-path active">
            Templates
          </Link>
        </div>
        <div className="container-fluid">
          <div className="store-settings-cntr settingtable">
            <div className="row">
              <div className="col-md-8">
                <div className="table-cntr table-height template-table">
                  <ReactTable
                    minRows={2}
                    data={this.state.template}
                    columns={[
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
                          <span
                            className={this.state.issueColor}
                            onClick={this.StatusOpenModel.bind(
                              this,
                              "issueTypeName"
                            )}
                          >
                            Issue Type
                            <FontAwesomeIcon icon={faCaretDown} />
                          </span>
                        ),

                        accessor: "issueTypeCount",
                        //Cell: props => <span className="number">{props.value}</span>
                        Cell: row => {
                          if (row.original.issueTypeCount === 1) {
                            return (
                              <span>
                                <label>{row.original.issueTypeName}</label>
                              </span>
                            );
                          } else {
                            return (
                              <span>
                                <label>{row.original.issueTypeCount}</label>
                              </span>
                            );
                          }
                        }
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
                                            onClick={this.deleteTemplate.bind(
                                              this,
                                              row.original.templateID
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
                                    src={DeleteIcon}
                                    alt="del-icon"
                                    className="del-btn"
                                    id={ids}
                                  />
                                </Popover>

                                <button
                                  className="react-tabel-button editre"
                                  id="p-edit-pop-2"
                                  onClick={this.setTemplateEditData.bind(
                                    this,
                                    row.original
                                  )}
                                >
                                  EDIT
                                </button>
                              </span>
                            </>
                          );
                        }

                        //  className:"action-template",
                      }
                    ]}
                    resizable={false}
                    defaultPageSize={5}
                    showPagination={true}
                  />
                  {/* <div className="position-relative1">
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
                        value={this.state.TemplateName}
                        onChange={this.handleTemplateName}
                      />
                      {this.state.TemplateName.length === 0 && (
                        <p style={{ color: "red", marginBottom: "0px" }}>
                          {this.state.templatenamecopulsion}
                        </p>
                      )}
                    </div>
                    <div className="divSpace">
                      <div className="dropDrownSpace">
                        <label className="reports-to">Issue Type</label>

                        <div className="normal-dropdown mt-0 dropdown-setting temp-multi schedule-multi">
                          <Select
                            getOptionLabel={option => option.issueTypeName}
                            getOptionValue={
                              option => option.issueTypeID //id
                            }
                            options={this.state.slaIssueType}
                            placeholder="Select"
                            // menuIsOpen={true}
                            closeMenuOnSelect={false}
                            onChange={this.setIssueType.bind(this)}
                            value={this.state.selectedSlaIssueType}
                            // showNewOptionAtTop={false}
                            isMulti
                          />
                        </div>
                        {this.state.selectedSlaIssueType.length === 0 && (
                          <p style={{ color: "red", marginBottom: "0px" }}>
                            {this.state.issurtupeCompulsion}
                          </p>
                        )}
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
                      <button
                        className="CreateADDBtn"
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
                              <label className="template-text">
                                TEMPLATE NAME : COMPLAINT STATUS
                              </label>
                            </div>
                            <div className="col-md-3">
                              <img
                                src={CancelImg}
                                alt="CancelImg"
                                className="cancelImg-config"
                                onClick={this.handleConfigureTabsClose.bind(
                                  this
                                )}
                              />
                            </div>
                          </div>
                        </Modal.Header>
                        <div className="temp-sub">
                          <label className="designation-name">
                            Template Subject
                          </label>
                          <input
                            type="text"
                            className="txt-1"
                            placeholder="Enter Template Subject"
                            onChange={this.handleTemplateSubject}
                            value={this.state.TemplateSubject}
                          />
                          {/* {this.state.TemplateSubject && (
                            <p style={{ color: "red", marginBottom: "0px" }}>
                              {this.state.templatesubjectCompulsion}
                            </p>
                          )} */}
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
                            {this.state.editorContent && (
                              <p style={{ color: "red", marginBottom: "0px" }}>
                                {this.state.templatebodyCompulsion}
                              </p>
                            )}
                          </div>
                          <div className="config-button">
                            <button
                              className="config-buttontext"
                              disabled={this.state.editSaveLoading}
                              onClick={
                                this.state.isEdit
                                  ? this.handleUpdateTemplate.bind(this)
                                  : this.createTemplate.bind(this)
                              }
                              type="submit"
                            >
                              {this.state.editSaveLoading ? (
                                <FontAwesomeIcon
                                  className="circular-loader"
                                  icon={faCircleNotch}
                                  spin
                                />
                              ) : (
                                ""
                              )}
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
          <div className="editmodal">
            <Modal
              show={this.state.editmodel}
              onHide={this.toggleEditModal}
              Id="tampleteEditModal"
            >
              <div className="edtpadding">
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
                    name="TemplateName"
                    value={this.state.templateEdit.TemplateName}
                    onChange={this.handleOnChangeEditData}
                  />
                </div>
                {this.state.templateEdit.TemplateName == "" && (
                  <p style={{ color: "red", marginBottom: "0px" }}>
                    {this.state.editTemplateName}
                  </p>
                )}
                <div className="pop-over-div">
                  <label className="edit-label-1">Issue Type</label>
                  <Select
                    getOptionLabel={option => option.issueTypeName}
                    getOptionValue={
                      option => option.issueTypeID //id
                    }
                    options={this.state.slaIssueType}
                    placeholder="Select"
                    closeMenuOnSelect={false}
                    onChange={this.setEditIssueType}
                    value={this.state.editIssueType}
                    isMulti
                  />
                </div>
                {this.state.editIssueType!==null && (
                  <p style={{ color: "red", marginBottom: "0px" }}>
                    {this.state.editIssueTypeSelect}
                  </p>
                )}
                <div className="pop-over-div">
                  <label className="edit-label-1">Status</label>
                  <select
                    id="inputStatus"
                    className="edit-dropDwon dropdown-setting"
                    name="template_Status"
                    value={this.state.templateEdit.template_Status}
                    onChange={this.handleOnChangeEditData}
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
                <br />
                <div className="text-center">
                  <a className="pop-over-cancle" onClick={this.toggleEditModal}>
                    CANCEL
                  </a>
                  <button className="pop-over-button FlNone">
                    <label
                      className="pop-over-btnsave-text"
                      onClick={this.handleEditSave}
                    >
                      SAVE
                    </label>
                  </button>
                </div>
              </div>
            </Modal>
          </div>
        </div>
        <NotificationContainer />
      </React.Fragment>
    );
  }
}

export default Templates;
