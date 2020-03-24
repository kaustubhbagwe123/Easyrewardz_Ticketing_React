import React, { Component, useState } from "react";
import ReactTable from "react-table";
import Demo from "../../../store/Hashtag";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import InfoImg from "./../../../assets/Images/icons8-info.svg";
// import DeleteIcon from "./../../../assets/Images/red-delete-icon.png";
import DelBigIcon from "./../../../assets/Images/del-big.png";
import Cancel from "./../../../assets/Images/cancel.png";
import Correct from "./../../../assets/Images/correct.png";
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
      // selectedSlaIssueType: [],
      // selectedIssueTypeCommaSeperated: "",
      editStatus: "",
      editIssueType: [],
      templateEdit: {},
      templatenamecopulsion: "",
      issurtupeCompulsory: "",
      statusCompulsion: "",
      // templatesubjectCompulsion: "",
      // templatebodyCompulsion: "",
      StatusModel: false,
      sortColumn: "",
      sortAllData: [],
      sortIssueType: [],
      sortName: [],
      sortCreatedBy: [],
      sortStatus: [],
      updatedTemplatename: "",
      updatedArray: [],
      updatedStatus: "",
      rowData: {},
      editmodel: false,
      isEdit: false,
      isLoading: false,
      editSaveLoading: false,
      slaOvrlayShow: false,
      slaShow: false,
      issueColor: "",
      nameColor: "",
      createdColor: "",
      statusColor: "",
      sortHeader: "",
      editTemplateName: "",
      editIssueTypeSelect: "",
      issueColor: "",
      SearchText: "",
      indiSla: "",
      AssignToData: [],
      placeholderData: []
    };

    this.handleGetTemplate = this.handleGetTemplate.bind(this);
    this.handleTemplateName = this.handleTemplateName.bind(this);
    this.handleTemplateSubject = this.handleTemplateSubject.bind(this);
    this.handleGetSLAIssueType = this.handleGetSLAIssueType.bind(this);
    this.StatusOpenModel = this.StatusOpenModel.bind(this);
    this.StatusCloseModel = this.StatusCloseModel.bind(this);
    this.handleUpdateTemplate = this.handleUpdateTemplate.bind(this);
    this.toggleEditModal = this.toggleEditModal.bind(this);
    this.handleSlaButton = this.handleSlaButton.bind(this);
    this.handleGetAgentList = this.handleGetAgentList.bind(this);
    this.handlePlaceholderList = this.handlePlaceholderList.bind(this);
  }

  componentDidMount() {
    this.handleGetTemplate();
    this.handleGetSLAIssueType();
    this.handlePlaceholderList();
    
  }
  callBackEdit = (templateName, arraydata, templateStatus, rowData) => {
    debugger;
    // this.setState({RoleName,updateRoleisActive:Status})
    this.state.updatedTemplatename = templateName;
    this.state.updatedArray = arraydata;
    this.state.updatedStatus = templateStatus;
    this.state.rowData = rowData;
  };

  handlePlaceholderList() {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/Template/GetMailParameter",
      headers: authHeader(),
      params: {
        AlertID: 8
      }
    })
      .then(function(res) {
        debugger;
        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success") {
          self.setState({
            placeholderData: data
          });
        } else {
          self.setState({
            placeholderData: []
          });
        }
      })
      .catch(data => {
        console.log(data);
      });
  }

  setPlaceholderValue(e) {
    debugger;
    let ckData = this.state.editorContent;
    let matchedArr = this.state.placeholderData.filter(
      x => x.mailParameterID == e.currentTarget.value
    );
    let placeholderName = matchedArr[0].parameterName;
    ckData += placeholderName;
    this.setState({ editorContent: ckData });
  }

  handleUpdateTemplate() {
    debugger;
    let self = this;
    var activeStatus = false;
    var issuetype = "";

    if (self.state.templateEdit.template_Status === "Active") {
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
            "Template update successfully."
          );
          self.handleGetTemplate();
          self.setState({ editSaveLoading: false, ConfigTabsModal: false,editorContent:"",TemplateSubject:"" });
        } else {
          self.setState({ editSaveLoading: false, ConfigTabsModal: false });
          NotificationManager.error("Template not update.");
        }
      })
      .catch(data => {
        self.setState({ editSaveLoading: false, ConfigTabsModal: false ,TemplateSubject:"",editorContent:""});
        console.log(data);
      });
  }

  handleGetAgentList() {
    debugger;
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/User/GetUserList",
      headers: authHeader()
    })
      .then(function(res) {
        debugger;
        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success") {
          self.setState({
            AssignToData: data
          });
          self.checkAllAgentStart();
        } else {
          self.setState({
            AssignToData: []
          });
        }
      })
      .catch(data => {
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

  StatusOpenModel(data, header) {
    this.setState({ StatusModel: true, sortColumn: data, sortHeader: header });
  }
  StatusCloseModel() {
    this.setState({ StatusModel: false });
  }
  setAssignedToValue(e) {
    debugger;
    // let assign = e.currentTarget.value;
    let ckData = this.state.editorContent;
    let matchedArr = this.state.AssignToData.filter(
      x => x.userID == e.currentTarget.value
    );
    let userName = matchedArr[0].fullName;
    ckData += "@" + userName;
    this.setState({ editorContent: ckData });
  }
  setSortCheckStatus = (column, e) => {
    debugger;

    var itemsArray = [];
    var data = e.currentTarget.value;
    this.setState({
      issueColor: "",
      nameColor: "",
      createdColor: "",
      statusColor: ""
    });
    if (column === "all") {
      itemsArray = this.state.sortAllData;
    } else if (column === "issueTypeName") {
      this.state.template = this.state.sortAllData;
      itemsArray = this.state.template.filter(a => a.issueTypeName === data);
      this.setState({
        issueColor: "sort-column"
      });
    } else if (column === "templateName") {
      this.state.template = this.state.sortAllData;
      itemsArray = this.state.template.filter(a => a.templateName === data);
      this.setState({
        nameColor: "sort-column"
      });
    } else if (column === "createdBy") {
      this.state.template = this.state.sortAllData;
      itemsArray = this.state.template.filter(a => a.createdBy === data);
      this.setState({
        createdColor: "sort-column"
      });
    } else if (column === "templateStatus") {
      this.state.template = this.state.sortAllData;
      itemsArray = this.state.template.filter(a => a.templateStatus === data);
      this.setState({
        statusColor: "sort-column"
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
    templateEdit=editdata;
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

    // if (editdata.template_Status === "Active") {
    //   templateEdit.template_Status = "true";
    // } else {
    //   templateEdit.template_Status = "false";
    // }

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
  // setIssueType = e => {
  //   debugger;
  //   if (e === null) {
  //     e = [];
  //     this.setState({ selectedSlaIssueType: e });
  //   } else {
  //     if (e !== null) {
  //       var selectedIssueTypeCommaSeperated = Array.prototype.map
  //         .call(e, s => s.issueTypeID)
  //         .toString();
  //     }
  //     this.setState({
  //       selectedSlaIssueType: e,
  //       selectedIssueTypeCommaSeperated
  //     });
  //   }
  // };
  selectIndividualSLA = async (issueId, event) => {
    debugger;
    var indiSla = this.state.indiSla;
    var separator = ",";
    var values = indiSla.split(separator);
    if (event.target.checked) {
      // indiSla += issueId + ",";
      var flag = values.includes(issueId.toString());
      if (!flag) {
        values.unshift(issueId);
        indiSla = values.join(separator);
      }
      await this.setState({
        indiSla
      });
      document.getElementById("issueTypeValue").textContent =
        this.state.indiSla.split(",").length - 1 + " selected";
    } else {
      // var indiSla = this.state.indiSla;
      // var separator = ",";
      // var values = indiSla.split(separator);
      for (var i = 0; i < values.length; i++) {
        if (values[i] == issueId) {
          values.splice(i, 1);
          indiSla = values.join(separator);
        }
      }
      await this.setState({
        indiSla
      });
      if (this.state.indiSla.split(",").length - 1 !== 0) {
        document.getElementById("issueTypeValue").textContent =
          this.state.indiSla.split(",").length - 1 + " selected";
      } else {
        document.getElementById("issueTypeValue").textContent = "Select";
      }
    }
  };
  selectAboveIndividualSLA = async (issueId, event) => {
    debugger;
    var indiSla = this.state.indiSla;
    var separator = ",";
    var values = indiSla.split(separator);
    if (event.target.checked) {
      var flag = values.includes(issueId.toString());
      if (!flag) {
        values.unshift(issueId);
        indiSla = values.join(separator);
      }
      await this.setState({
        indiSla
      });
      document.getElementById("issueTypeValue").textContent =
        this.state.indiSla.split(",").length - 1 + " selected";
    } else {
      // var indiSla = this.state.indiSla;
      // var separator = ",";
      // var values = indiSla.split(separator);
      for (var i = 0; i < values.length; i++) {
        if (values[i] === issueId) {
          values.splice(i, 1);
          indiSla = values.join(separator);
        }
      }
      await this.setState({
        indiSla
      });
      if (this.state.indiSla.split(",").length - 1 !== 0) {
        document.getElementById("issueTypeValue").textContent =
          this.state.indiSla.split(",").length - 1 + " selected";
      } else {
        document.getElementById("issueTypeValue").textContent = "Select";
      }
    }
  };
  handleSearchSla = async e => {
    debugger;
    if (e.target.value.length > 3) {
      await this.setState({
        SearchText: e.target.value
      });
      this.handleGetSLAIssueType();
    } else {
      await this.setState({
        SearchText: ""
      });
      this.handleGetSLAIssueType();
    }
  };
  handleClearSearchSla = async e => {
    debugger;
    await this.setState({
      SearchText: ""
    });
    document.getElementById("SlaInput").value = "";
    this.handleGetSLAIssueType();
  };
  selectAllSLA = async event => {
    debugger;
    var indiSla = "";
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
        indiSla += item.issueTypeID + ",";
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
      indiSla: ""
    });
  };

  handleSlaButton() {
    debugger;
    let slaShowOriginal = this.state.slaShow;
    let slaShow = !slaShowOriginal;
    let slaOvrlayShowOriginal = this.state.slaOvrlayShow;
    let slaOvrlayShow = !slaOvrlayShowOriginal;
    this.setState({
      slaShow,
      slaOvrlayShow
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

  setEditIssueType = e => {
    debugger;
    if (e) {
      if (e.length === 0) {
        this.setState({
          editIssueTypeSelect: "Please Select Issue Type",
          editIssueType: e
        });
      } else {
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
    axios({
      method: "post",
      url: config.apiUrl + "/SLA/GetIssueType",
      headers: authHeader(),
      params: {
        SearchText: this.state.SearchText
      }
    })
      .then(function(res) {
        debugger;
        let slaIssueType = res.data.responseData;
        if (slaIssueType !== null && slaIssueType !== undefined) {
          self.setState({ slaIssueType });
          // self.setState({ slaIssueType, selectedSlaIssueType });
          var checkboxes = document.getElementsByName("allSla");
          for (var i in checkboxes) {
            if (checkboxes[i].checked === true) {
              checkboxes[i].checked = false;
            }
          }
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
            "Template deleted successfully."
          );
          self.handleGetTemplate();
        } else {
          NotificationManager.error("Template not deleted.");
        }
      })
      .catch(data => {
        console.log(data);
      });
  }

  createTemplate() {
    debugger;
    // if (
    //   this.state.editorContent.length > 0 &&
    //   this.state.editorContent.length <= 499
    // ) {
      // if (this.state.editorContent.length > 0) {
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
            issueTypes: this.state.indiSla,
            isTemplateActive: TemplateIsActive
          }
        })
          .then(function(res) {
            debugger;
            let status = res.data.message;
            if (status === "Success") {
              NotificationManager.success(
                "Template added successfully."
              );
              self.handleGetTemplate();
              self.setState({
                TemplateSubject: "",
                editorContent: "",
                TemplateName: "",
                indiSla: "",
                SearchText: "",
                templatenamecopulsion:"",
                issurtupeCompulsory:""
                // selectedSlaIssueType: [],
                // templatesubjectCompulsion: "",
                // templatebodyCompulsion: ""
              });
              self.selectNoSLA();
            } else {
              NotificationManager.error("Template Not Added.");
            }
          })
          .catch(data => {
            console.log(data);
          });
      // } else {
      //   NotificationManager.error("Please Enter Descriptions.");
      //   // this.setState({
      //   //   // templatesubjectCompulsion: "Please Enter Subject",
      //   //   // templatebodyCompulsion: "Please Enter Descriptions"
      //   // });
      // }
    // } else {
    //   NotificationManager.error(
    //     "Only 500 characters Allow In Descriptions."
    //   );
    // }
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

          var unique = [];
          var distinct = [];
          for (let i = 0; i < template.length; i++) {
            if (!unique[template[i].templateName]) {
              distinct.push(template[i].templateName);
              unique[template[i].templateName] = 1;
            }
          }
          for (let i = 0; i < distinct.length; i++) {
            self.state.sortName.push({ templateName: distinct[i] });
          }

          var unique = [];
          var distinct = [];
          for (let i = 0; i < template.length; i++) {
            if (!unique[template[i].createdBy]) {
              distinct.push(template[i].createdBy);
              unique[template[i].createdBy] = 1;
            }
          }
          for (let i = 0; i < distinct.length; i++) {
            self.state.sortCreatedBy.push({ createdBy: distinct[i] });
          }

          var unique = [];
          var distinct = [];
          for (let i = 0; i < template.length; i++) {
            if (!unique[template[i].templateStatus]) {
              distinct.push(template[i].templateStatus);
              unique[template[i].templateStatus] = 1;
            }
          }
          for (let i = 0; i < distinct.length; i++) {
            self.state.sortStatus.push({ templateStatus: distinct[i] });
          }
        }
        debugger;
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
      this.state.indiSla !== ""
      // this.state.selectedSlaIssueType !== null
    ) {
      this.setState({ ConfigTabsModal: true });
      this.handleGetAgentList();
    } else {
      this.setState({
        templatenamecopulsion: "Please Enter Template Name",
        issurtupeCompulsory: "Plaese Select IssueType"
      });
    }
  }
  handleConfigureTabsClose() {
    debugger;
    this.setState({ ConfigTabsModal: false,editorContent:"",TemplateSubject:"" });
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
                <label style={{ color: "#0066cc", fontWeight: "bold" }}>
                  {this.state.sortHeader}
                </label>
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
              <a
                href=""
                style={{ margin: "0 25px", textDecoration: "underline" }}
                onClick={this.setSortCheckStatus.bind(this, "all")}
              >
                clear search
              </a>
              <div className="filter-type">
                <p>FILTER BY TYPE</p>
                <div className="FTypeScroll">
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

                  {this.state.sortColumn === "templateName"
                    ? this.state.sortName !== null &&
                      this.state.sortName.map((item, i) => (
                        <div className="filter-checkbox">
                          <input
                            type="checkbox"
                            name="filter-type"
                            id={"fil-open" + item.templateName}
                            value={item.templateName}
                            onChange={this.setSortCheckStatus.bind(
                              this,
                              "templateName"
                            )}
                          />
                          <label htmlFor={"fil-open" + item.templateName}>
                            <span className="table-btn table-blue-btn">
                              {item.templateName}
                            </span>
                          </label>
                        </div>
                      ))
                    : null}

                  {this.state.sortColumn === "createdBy"
                    ? this.state.sortCreatedBy !== null &&
                      this.state.sortCreatedBy.map((item, i) => (
                        <div className="filter-checkbox">
                          <input
                            type="checkbox"
                            name="filter-type"
                            id={"fil-open" + item.createdBy}
                            value={item.createdBy}
                            onChange={this.setSortCheckStatus.bind(
                              this,
                              "createdBy"
                            )}
                          />
                          <label htmlFor={"fil-open" + item.createdBy}>
                            <span className="table-btn table-blue-btn">
                              {item.createdBy}
                            </span>
                          </label>
                        </div>
                      ))
                    : null}

                  {this.state.sortColumn === "templateStatus"
                    ? this.state.sortStatus !== null &&
                      this.state.sortStatus.map((item, i) => (
                        <div className="filter-checkbox">
                          <input
                            type="checkbox"
                            name="filter-type"
                            id={"fil-open" + item.templateStatus}
                            value={item.templateStatus}
                            onChange={this.setSortCheckStatus.bind(
                              this,
                              "templateStatus"
                            )}
                          />
                          <label htmlFor={"fil-open" + item.templateStatus}>
                            <span className="table-btn table-blue-btn">
                              {item.templateStatus}
                            </span>
                          </label>
                        </div>
                      ))
                    : null}
                </div>
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
                          <span
                            className={this.state.nameColor}
                            onClick={this.StatusOpenModel.bind(
                              this,
                              "templateName",
                              "Template Name"
                            )}
                          >
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
                              "issueTypeName",
                              "IssueType"
                            )}
                          >
                            Issue Type
                            <FontAwesomeIcon icon={faCaretDown} />
                          </span>
                        ),

                        accessor: "issueTypeCount",
                        // Cell: props => <span className="number">{props.value}</span>
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
                          <span
                            className={this.state.createdColor}
                            onClick={this.StatusOpenModel.bind(
                              this,
                              "createdBy",
                              "Created By"
                            )}
                          >
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
                          <span
                            className={this.state.statusColor}
                            onClick={this.StatusOpenModel.bind(
                              this,
                              "templateStatus",
                              "Status"
                            )}
                          >
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
                        maxLength={50}
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
                      <div className="divSpace">
                        <div className="dropDrownSpace issuetype-cusdrp">
                          <label className="reports-to">Issue Type</label>
                          <div className="dropdown">
                            <button
                              className="btn issuesladrop"
                              type="button"
                              id="issueTypeValue"
                              onClick={this.handleSlaButton}
                            >
                              Select
                              <span className="caret"></span>
                            </button>
                            {this.state.indiSla === "" && (
                              <p style={{ color: "red", marginBottom: "0px" }}>
                                {this.state.issurtupeCompulsory}
                              </p>
                            )}
                            <div
                              className={
                                this.state.slaShow
                                  ? "dropdown-menu dropdown-menu-sla show"
                                  : "dropdown-menu dropdown-menu-sla"
                              }
                            >
                              <div className="cat-mainbox">
                                <div className="sla-cancel-search">
                                  <input
                                    type="text"
                                    className="searchf"
                                    placeholder="Search"
                                    maxLength={25}
                                    name="store_code"
                                    onChange={this.handleSearchSla}
                                    id="SlaInput"
                                  />

                                  <img
                                    src={Cancel}
                                    alt="cancelimg"
                                    onClick={this.handleClearSearchSla}
                                  />
                                </div>

                                <div className="category-button">
                                  <ul>
                                    <li>
                                      <label
                                        onClick={this.selectAllSLA.bind(this)}
                                      >
                                        Select All
                                      </label>
                                    </li>
                                    <li>
                                      <label
                                        onClick={this.selectNoSLA.bind(this)}
                                      >
                                        Clear
                                      </label>
                                    </li>
                                  </ul>
                                </div>
                                <div className="category-box category-scroll">
                                  <ul>
                                    {this.state.slaIssueType !== null &&
                                      this.state.slaIssueType.map((item, i) => (
                                        <li key={i}>
                                          <input
                                            type="checkbox"
                                            id={"i" + item.issueTypeID}
                                            name="allSla"
                                            onChange={this.selectIndividualSLA.bind(
                                              this,
                                              item.issueTypeID
                                            )}
                                          />
                                          <label
                                            htmlFor={"i" + item.issueTypeID}
                                          >
                                            {item.issueTypeName}{" "}
                                            <div>
                                              <img
                                                src={Correct}
                                                alt="Checked"
                                              />
                                            </div>
                                          </label>
                                          <span>{item.brandName}</span>
                                          <span>{item.categoryName}</span>
                                          <span>{item.subCategoryName}</span>
                                        </li>
                                      ))}
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
                                    >
                                      Done
                                    </button>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* <div className="dropDrownSpace">
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
                      </div> */}
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
                        className="big-modal-placeholder"
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
                            maxLength={50}
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
                          <div className="tic-det-ck-user template-user myticlist-expand-sect">
                            <select
                              className="add-select-category"
                              value="0"
                              onChange={this.setAssignedToValue.bind(this)}
                            >
                              <option value="0">Users</option>
                              {this.state.AssignToData !== null &&
                                this.state.AssignToData.map((item, i) => (
                                  <option key={i} value={item.userID}>
                                    {item.fullName}
                                  </option>
                                ))}
                            </select>
                          </div>
                          <div className="tic-det-ck-user template-user myticlist-expand-sect placeholder-alert">
                            <select
                              className="add-select-category"
                              value="0"
                              onChange={this.setPlaceholderValue.bind(
                                this
                              )}
                            >
                              <option value="0">Placeholders</option>
                              {this.state.placeholderData !== null &&
                                this.state.placeholderData.map((item, i) => (
                                  <option key={i} value={item.mailParameterID}>
                                    {item.description}
                                  </option>
                                ))}
                            </select>
                          </div>
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
                            {/* {this.state.editorContent && (
                              <p style={{ color: "red", marginBottom: "0px" }}>
                                {this.state.templatebodyCompulsion}
                              </p>
                            )} */}
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
                {this.state.editIssueType !== null && (
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
        {/* <NotificationContainer /> */}
      </React.Fragment>
    );
  }
}

export default Templates;
