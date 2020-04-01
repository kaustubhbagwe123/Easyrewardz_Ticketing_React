import React, { Component, useState } from "react";
import Demo from "./../../../store/Hashtag.js";
import DelBigIcon from "./../../../assets/Images/del-big.png";
import FileUpload from "./../../../assets/Images/file.png";
import DelBlack from "./../../../assets/Images/del-black.png";
import UploadCancel from "./../../../assets/Images/upload-cancel.png";
import DownExcel from "./../../../assets/Images/csv.png";
import { ProgressBar } from "react-bootstrap";
import { UncontrolledPopover, PopoverBody } from "reactstrap";
import ActiveStatus from "../../activeStatus";
import { Link } from "react-router-dom";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import BlackInfoIcon from "./../../../assets/Images/Info-black.png";
import { Popover } from "antd";
import RedDeleteIcon from "./../../../assets/Images/red-delete-icon.png";
import ReactTable from "react-table";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import HierarchyMasterService from "./../../../routes/Settings/Service/HierarchyMasterService";
import { CSVLink } from "react-csv";
import config from "../../../helpers/config";
import {
  NotificationManager
} from "react-notifications";

const MyButton = props => {
  const { children } = props;
  return (
    <div style={{ cursor: "pointer" }} {...props}>
      <button className="react-tabel-button" id="p-edit-pop-2">
        <label className="Table-action-edit-button-text">{children}</label>
      </button>
    </div>
  );
};

const Content = props => {
  const { rowData } = props;
  const [designationName, setDesignationvalue] = useState(
    rowData.designationName
  );
  const [reportTo, setreportToValue] = useState(rowData.reportToDesignation);
  const [status, setStatusValue] = useState(rowData.status);
  const [designationID] = useState(rowData.designationID);
  debugger;
  props.callBackEdit(designationName, reportTo, status, designationID);
  return (
    <div className="edtpadding">
      <label className="popover-header-text">EDIT HIERARCHY</label>
      <div className="pop-over-div">
        <label className="edit-label-1">Designation Name</label>
        <input
          type="text"
          className="txt-edit-popover"
          placeholder="Enter Designation Name"
          maxLength={25}
          name="designation_Name"
          value={designationName}
          onChange={e => setDesignationvalue(e.target.value)}
        />
        {designationName === "" && (
          <p style={{ color: "red", marginBottom: "0px" }}>
            {props.editdesignationNameCompulsion}
          </p>
        )}
      </div>
      <div className="pop-over-div">
        <label className="edit-label-1">Report To</label>
        <select
          className="edit-dropDwon dropdown-setting"
          name="report_To"
          value={reportTo}
          //onChange={this.handleOnChangeData}
          onChange={e => setreportToValue(e.target.value)}
        >
          <option>select</option>
          <option value={0}>Root</option>
          {props.reportToData !== null &&
            props.reportToData.map((item, i) => (
              <option key={i} value={item.designationID}>
                {item.designationName}
              </option>
            ))}
        </select>
        {reportTo === "select" && (
          <p style={{ color: "red", marginBottom: "0px" }}>
            {props.editreportToCompulsion}
          </p>
        )}
      </div>
      <div className="pop-over-div">
        <label className="edit-label-1">Status</label>
        <select
          className="edit-dropDwon dropdown-setting"
          name="designation_status"
          value={status}
          onChange={e => setStatusValue(e.target.value)}
        >
          <option>select</option>
          {props.activeData !== null &&
            props.activeData.map((item, j) => (
              <option key={j} value={item.ActiveID}>
                {item.ActiveName}
              </option>
            ))}
        </select>
        {status === "select" && (
          <p style={{ color: "red", marginBottom: "0px" }}>
            {props.editstatusCompulsion}
          </p>
        )}
      </div>
      <br />
      <div>
        <a className="pop-over-cancle canblue" href={Demo.BLANK_LINK}>
          CANCEL
        </a>
        <button
          className="pop-over-button"
          onClick={e => {
            props.handleUpdateHierarchyData(e, designationID);
          }}
          disabled={props.editSaveLoading}
        >
          <label className="pop-over-btnsave-text">
            {props.editSaveLoading ? (
              <FontAwesomeIcon
                className="circular-loader"
                icon={faCircleNotch}
                spin
              />
            ) : (
              ""
            )}
            SAVE
          </label>
        </button>
      </div>
    </div>
  );
};

class HierarchyMaster extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      StatusModel: false,
      designation_name: "",
      selectReportTo: 0,
      selectStatus: 0,
      hierarchyData: [],
      reportToData: [],
      activeData: ActiveStatus(),
      hierarchyEditData: {},
      designationNameCompulsion: "",
      reportToCompulsion: "",
      statusCompulsion: "",
      editdesignationNameCompulsion: "Designation Name field is compulsory.",
      editreportToCompulsion: "ReportTo field is compulsory.",
      editstatusCompulsion: "Status field is compulsory.",
      sortAllData: [],
      sortDesignation: [],
      sortReportTo: [],
      sortCreatedBy: [],
      sortStatus: [],
      sortColumn: "",
      sortHeader: "",
      designationColor: "",
      reportToColor: "",
      createdColor: "",
      statusColor: "",
      updateDesignation: "",
      updateReprtTo: "",
      updateStatus: "",
      rowData: {},
      editSaveLoading: false,
      addSaveLoading: false,
      fileName: "",
      fileN: [],
      bulkuploadCompulsion: "",
      sortFilterDesignation: [],
      sortFilterReportTo: [],
      sortFilterCreatedBy: [],
      sortFilterStatus: [],
      sFilterCheckbox: "",
      filterTxtValue: "",
      isFileUploadFail: false,
      progressValue: 0,
      fileSize: "",
      showProgress: false,
      sdesignationNameFilterCheckbox: "",
      sreportToFilterCheckbox: "",
      screatedbypersonFilterCheckbox: "",
      sstatusFilterCheckbox: ""
    };

    this.togglePopover = this.togglePopover.bind(this);
    this.HierarchyMasterService = new HierarchyMasterService();
    this.StatusOpenModel = this.StatusOpenModel.bind(this);
    this.hanldeGetReportListDropDown = this.hanldeGetReportListDropDown.bind(
      this
    );
    // this.StatusCloseModel = this.StatusCloseModel.bind(this);
  }

  componentDidMount() {
    debugger;
    this.handleGetItem();
    this.hanldeGetReportListDropDown();
  }

  handleOnChangeHierarchyData = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  handleOnReportToChange = e => {
    let value = e.target.value;
    this.setState({ selectReportTo: value });
  };
  handleStatusChange = e => {
    let value = e.target.value;
    this.setState({ selectStatus: value });
  };

  hanldeGetReportListDropDown() {
    this.HierarchyMasterService.GetReportListDropDown()
      .then(response => {
        debugger;
        let status = response.data.message;
        let data = response.data.responseData;
        if (status === "Success") {
          this.setState({
            reportToData: data
          });
        } else {
          this.setState({
            reportToData: []
          });
        }
      })
      .catch(response => {
        console.log(response);
      });
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

  hanldeAddBulkUpload() {
    debugger;
    if (this.state.fileN.length > 0 && this.state.fileN !== []) {
      let self = this;
      const formData = new FormData();

      formData.append("file", this.state.fileN[0]);

      this.setState({ showProgress: true });
      // axios({
      //   method: "post",
      //   url: config.apiUrl + "/Hierarchy/BulkUploadHierarchy",
      //   headers: authHeader(),
      //   data: formData,
      //   // cancelToken: source.token,
      //   onUploadProgress: (ev = ProgressEvent) => {
      //     const progress = (ev.loaded / ev.total) * 100;
      //     this.updateUploadProgress(Math.round(progress));
      //   }
      // })
      //   .then(function(res) {
      //     debugger;
      //     let status = res.data.message;
      //     let data = res.data.responseData;
      //     if (status === "Success") {
      //       NotificationManager.success("File uploaded successfully.");
      //       self.setState({ fileName: "", fileSize: "", fileN: [] });
      //       self.handleGetHierarchyData();
      //     } else {
      //       self.setState({
      //         showProgress: false,
      //         isFileUploadFail: true,
      //         progressValue: 0
      //       });
      //       NotificationManager.error("File not uploaded.");
      //     }
      //   })
      //   .catch(data => {
      //     debugger;
      //     if (data.message) {
      //       this.setState({ showProgress: false, isFileUploadFail: true });
      //     }
      //     console.log(data);
      //   });
    } else {
      this.setState({
        bulkuploadCompulsion: "Please select file."
      });
    }
  }

  callBackEdit = (designationName, reportTo, status, rowData) => {
    debugger;
    // this.setState({RoleName,updateRoleisActive:Status})
    this.state.updateDesignation = designationName;
    this.state.updateReprtTo = reportTo;
    this.state.updateStatus = status;
    this.state.rowData = rowData;
  };

  togglePopover() {
    this.setState({ isOpen: !this.state.isOpen });
  }

  show(e, id) {
    debugger;
    if (document.getElementById(id))
      // document.getElementById(id).style.display="block";
      document.getElementById(
        id
      ).parentElement.parentElement.parentElement.parentElement.parentElement.style.display =
        "block";
  }

  hide(e, id) {
    debugger;
    // document.getElementById(id).style.display="none";
    document.getElementById(
      id
    ).parentElement.parentElement.parentElement.parentElement.parentElement.style.display =
      "none";
  }

  // get item list
  handleGetItem() {
    this.HierarchyMasterService.GetItemList()
      .then(response => {
        debugger;
        let status = response.data.message;
        let data = response.data.responseData;
        if (data !== null) {
          this.state.sortAllData = data;
          var unique = [];
          var distinct = [];
          for (let i = 0; i < data.length; i++) {
            if (!unique[data[i].designationName]) {
              distinct.push(data[i].designationName);
              unique[data[i].designationName] = 1;
            }
          }
          for (let i = 0; i < distinct.length; i++) {
            this.state.sortDesignation.push({ designationName: distinct[i] });
            this.state.sortFilterDesignation.push({
              designationName: distinct[i]
            });
          }

          var unique = [];
          var distinct = [];
          for (let i = 0; i < data.length; i++) {
            if (!unique[data[i].reportTo]) {
              distinct.push(data[i].reportTo);
              unique[data[i].reportTo] = 1;
            }
          }
          for (let i = 0; i < distinct.length; i++) {
            this.state.sortReportTo.push({ reportTo: distinct[i] });
            this.state.sortFilterReportTo.push({ reportTo: distinct[i] });
          }

          var unique = [];
          var distinct = [];
          for (let i = 0; i < data.length; i++) {
            if (!unique[data[i].createdbyperson]) {
              distinct.push(data[i].createdbyperson);
              unique[data[i].createdbyperson] = 1;
            }
          }
          for (let i = 0; i < distinct.length; i++) {
            this.state.sortCreatedBy.push({ createdbyperson: distinct[i] });
            this.state.sortFilterCreatedBy.push({
              createdbyperson: distinct[i]
            });
          }

          var unique = [];
          var distinct = [];
          for (let i = 0; i < data.length; i++) {
            if (!unique[data[i].status]) {
              distinct.push(data[i].status);
              unique[data[i].status] = 1;
            }
          }
          for (let i = 0; i < distinct.length; i++) {
            this.state.sortStatus.push({ status: distinct[i] });
            this.state.sortFilterStatus.push({ status: distinct[i] });
          }
        }
        if (status === "Success" && data) {
          this.setState({
            hierarchyData: data
          });
        } else {
          this.setState({
            hierarchyData: []
          });
        }
      })
      .catch(response => {
        console.log(response);
      });
  }

  // delete item
  handleDeleteHierarchy(hierarchy_Id) {
    debugger;
    this.HierarchyMasterService.DeleteItem(hierarchy_Id)
      .then(response => {
        debugger;
        let status = response.data.message;
        if (status === "Success") {
          this.handleGetItem();
          NotificationManager.success("Designation deleted successfully.");
          this.hanldeGetReportListDropDown();
        } else {
          NotificationManager.error(response.data.message);
        }
      })
      .catch(response => {
        console.log(response);
      });
  }

  handleDeleteBulkupload = e => {
    debugger;
    this.setState({
      fileN: [],
      fileName: ""
    });
    NotificationManager.success("File deleted successfully.");
  };
  updateUploadProgress(value) {
    this.setState({ progressValue: value });
  }

  handleUpdateHierarchyData(e, designationID) {
    debugger;
    if (
      this.state.updateDesignation.length > 0 &&
      this.state.updateReprtTo !== "select" &&
      this.state.updateStatus !== "select"
    ) {
      let self = this;
      var activeStatus = 0;

      if (self.state.updateStatus === "Active") {
        activeStatus = 1;
      } else {
        activeStatus = 0;
      }
      this.setState({ editSaveLoading: true });

      // update item
      this.HierarchyMasterService.UpdateItem(designationID, this.state.updateDesignation, this.state.updateReprtTo, activeStatus)
      .then(response => {
        debugger;
        let status = response.data.message;
          if (status === "Success") {
            this.handleGetItem();
            NotificationManager.success("Hierarchy update successfully.");
            this.hanldeGetReportListDropDown();
            this.setState({ editSaveLoading: false });
          } else {
            this.setState({ editSaveLoading: false });
            NotificationManager.error("Hierarchy not update.");
          }
      })
      .catch(response => {
        console.log(response);
      });

    } else {
      NotificationManager.error("Hierarchy not update.");
      this.setState({
        editdesignationNameCompulsion: "Designation Name field is compulsory.",
        editreportToCompulsion: "ReportTo field is compulsory.",
        editstatusCompulsion: "Status field is compulsory."
      });
    }
  }

  StatusOpenModel(data, header) {
    debugger;

    // this.setState({ StatusModel: true, sortColumn: data, sortHeader: header });
    if (
      this.state.sortFilterDesignation.length === 0 ||
      this.state.sortFilterReportTo.length === 0 ||
      this.state.sortFilterCreatedBy.length === 0 ||
      this.state.sortFilterStatus.length === 0
    ) {
      return false;
    }
    // this.setState({ StatusModel: true, sortColumn: data, sortHeader: header });
    if (data === "designationName") {
      if (
        this.state.sreportToFilterCheckbox !== "" ||
        this.state.screatedbypersonFilterCheckbox !== "" ||
        this.state.sstatusFilterCheckbox !== ""
      ) {
        this.setState({
          StatusModel: true,
          sortColumn: data,
          sortHeader: header
        });
      } else {
        this.setState({
          sreportToFilterCheckbox: "",
          screatedbypersonFilterCheckbox: "",
          sstatusFilterCheckbox: "",
          StatusModel: true,
          sortColumn: data,
          sortHeader: header
        });
      }
    }
    if (data === "reportTo") {
      if (
        this.state.sstatusFilterCheckbox !== "" ||
        this.state.screatedbypersonFilterCheckbox !== "" ||
        this.state.sdesignationNameFilterCheckbox !== ""
      ) {
        this.setState({
          // sdesignationFilterCheckbox: "",
          // smobileNumberFilterCheckbox: "",
          // semailIDFilterCheckbox: "",
          StatusModel: true,
          sortColumn: data,
          sortHeader: header
        });
      } else {
        this.setState({
          sdesignationNameFilterCheckbox: "",
          screatedbypersonFilterCheckbox: "",
          sstatusFilterCheckbox: "",
          StatusModel: true,
          sortColumn: data,
          sortHeader: header
        });
      }
    }
    if (data === "createdbyperson") {
      if (
        this.state.sstatusFilterCheckbox !== "" ||
        this.state.sdesignationNameFilterCheckbox !== "" ||
        this.state.sdesignationNameFilterCheckbox !== ""
      ) {
        this.setState({
          // sdesignationFilterCheckbox: "",
          // suserNameFilterCheckbox: "",
          // semailIDFilterCheckbox: "",
          StatusModel: true,
          sortColumn: data,
          sortHeader: header
        });
      } else {
        this.setState({
          sdesignationNameFilterCheckbox: "",
          sdesignationNameFilterCheckbox: "",
          sstatusFilterCheckbox: "",
          StatusModel: true,
          sortColumn: data,
          sortHeader: header
        });
      }
    }
    if (data === "status") {
      if (
        this.state.sdesignationNameFilterCheckbox !== "" ||
        this.state.sreportToFilterCheckbox !== "" ||
        this.state.screatedbypersonFilterCheckbox !== ""
      ) {
        this.setState({
          StatusModel: true,
          sortColumn: data,
          sortHeader: header
        });
      } else {
        this.setState({
          sdesignationNameFilterCheckbox: "",
          sreportToFilterCheckbox: "",
          screatedbypersonFilterCheckbox: "",
          StatusModel: true,
          sortColumn: data,
          sortHeader: header
        });
      }
    }
  }

  handleSubmitData() {
    debugger;
    if (
      this.state.designation_name.length > 0 &&
      this.state.selectReportTo !== 0 &&
      this.state.selectStatus !== 0
    ) {
      let self = this;
      var activeStatus = 0;
      var status = this.state.selectStatus;
      if (status === "Active") {
        activeStatus = 1;
      } else {
        activeStatus = 0;
      }
      var ReportId = this.state.selectReportTo;
      if (ReportId === "1") {
        ReportId = 0;
      }
      this.setState({ addSaveLoading: true });
      
      // create item
      this.HierarchyMasterService.CreateItem(this.state.designation_name, ReportId, activeStatus)
      .then(response => {
        debugger;
        let status = response.data.message;
          if (status === "Success") {
            this.handleGetItem();
            NotificationManager.success("Hierarchy added successfully.");
            this.hanldeGetReportListDropDown();
            this.setState({
              designation_name: "",
              selectReportTo: 0,
              selectStatus: 0,
              designationNameCompulsion: "",
              reportToCompulsion: "",
              statusCompulsion: "",
              addSaveLoading: false
            });
          } else if (status === "Record Already Exists ") {
            NotificationManager.error("Record Already Exists.");
            this.setState({ addSaveLoading: false });
          }
      })
      .catch(response => {
        console.log(response);
      });
    } else {
      this.setState({
        designationNameCompulsion: "Designation Name field is compulsory.",
        reportToCompulsion: "ReportTo field is compulsory.",
        statusCompulsion: "Status field is compulsory."
      });
    }
  }

  render() {
    const { hierarchyData } = this.state;

    const columnsStorHier = [
      {
        Header: (
          <span>
            Designation
            <FontAwesomeIcon icon={faCaretDown} />
          </span>
        ),
        accessor: "Desig"
      },
      {
        Header: (
          <span>
            Report To
            <FontAwesomeIcon icon={faCaretDown} />
          </span>
        ),
        accessor: "Report"
      },
      {
        Header: (
          <span>
            Created By
            <FontAwesomeIcon icon={faCaretDown} />
          </span>
        ),
        accessor: "creat",
        Cell: row => {
          var ids = row.original["id"];
          return (
            <div>
              <span>
                Admin
                <Popover content={popoverData} placement="bottom">
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
        accessor: "status"
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
                  content={ActionDelete}
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
                  content={ActionEditBtn}
                  placement="bottom"
                  trigger="click"
                >
                  <button className="react-tabel-button editre" id="p-edit-pop-2">
                    EDIT
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
          <label className="popover-header-text">EDIT HIERARCHY</label>
        </div>
        <div className="pop-over-div">
          <label className="edit-label-1">Designation Name</label>
          <input
            type="text"
            className="txt-edit-popover"
            placeholder="Enter Designation Name"
            maxLength={25}
          />
        </div>
        <div className="pop-over-div">
          <label className="edit-label-1">Report To</label>
          <select id="inputStatus" className="edit-dropDwon dropdown-setting">
            <option>1</option>
            <option>2</option>
            <option>3</option>
          </select>
        </div>
        <div className="pop-over-div">
          <label className="edit-label-1">Status</label>
          <select id="inputStatus" className="edit-dropDwon dropdown-setting">
            <option>Status</option>
            <option>Inactive</option>
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
          <Link to="/admin/settings" className="header-path">Settings</Link>
          <span>&gt;</span>
          <Link
            to={{
              pathname: "/admin/settings",
              tabName: "store-tab"
            }}
            className="header-path">Store</Link>
          <span>&gt;</span>
          <Link to={Demo.BLANK_LINK} className="header-path active">
            Hierarchy Master
          </Link>
        </div>
        <div className="container-fluid">
          <div className="store-settings-cntr hiermas">
            <div className="row">
              <div className="col-md-8">
                <div className="table-cntr table-height StoreHierarchyReact">
                  <ReactTable
                    data={hierarchyData}
                    columns={[
                      {
                        Header: (
                          <span
                            className={this.state.designationColor}
                            onClick={this.StatusOpenModel.bind(
                              this,
                              "designationName",
                              "Designation"
                            )}
                          >
                            Designation
                            <FontAwesomeIcon icon={faCaretDown} />
                          </span>
                        ),
                        accessor: "designationName"
                      },
                      {
                        Header: (
                          <span
                            className={this.state.reportToColor}
                            onClick={this.StatusOpenModel.bind(
                              this,
                              "reportTo",
                              "Report To"
                            )}
                          >
                            Report To
                            <FontAwesomeIcon icon={faCaretDown} />
                          </span>
                        ),
                        accessor: "reportTo"
                      },
                      {
                        Header: (
                          <span
                            className={this.state.createdColor}
                            onClick={this.StatusOpenModel.bind(
                              this,
                              "createdbyperson",
                              "Created By"
                            )}
                          >
                            Created By
                            <FontAwesomeIcon icon={faCaretDown} />
                          </span>
                        ),
                        accessor: "createdbyperson",
                        Cell: row => {
                          // var ids = row.original["designationID"];
                          return (
                            <div>
                              <span>
                                {row.original["createdbyperson"]}
                                <Popover
                                  content={
                                    <div>
                                      <div>
                                        <b>
                                          <p className="title">
                                            Created By:&nbsp;
                                            {row.original["createdbyperson"]}
                                          </p>
                                        </b>
                                        <p className="sub-title">
                                          Created Date:&nbsp;
                                          {row.original["createdateformat"]}
                                        </p>
                                      </div>
                                      <div>
                                        <b>
                                          <p className="title">
                                            Updated By:&nbsp;
                                            {row.original["updatedbyperson"]}
                                          </p>
                                        </b>
                                        <p className="sub-title">
                                          Updated Date:&nbsp;
                                          {row.original["updateddateformat"]}
                                        </p>
                                      </div>
                                    </div>
                                  }
                                  placement="bottom"
                                >
                                  <img
                                    className="info-icon-cp"
                                    src={BlackInfoIcon}
                                    alt="info-icon"
                                  />
                                </Popover>
                              </span>
                            </div>
                          );
                        }
                      },
                      {
                        Header: (
                          <span
                            className={this.state.statusColor}
                            onClick={this.StatusOpenModel.bind(
                              this,
                              "status",
                              "Status"
                            )}
                          >
                            Status
                            <FontAwesomeIcon icon={faCaretDown} />
                          </span>
                        ),
                        accessor: "status"
                      },
                      {
                        Header: <span>Actions</span>,
                        accessor: "actiondept",
                        Cell: row => {
                          var ids = row.original["designationID"];
                          return (
                            <>
                              <span>
                                <Popover
                                  content={
                                    <div
                                      className="samdel d-flex general-popover popover-body"
                                      id={"samdel" + ids}
                                    >
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
                                          <a
                                            className="canblue"
                                            onClick={() =>
                                              this.hide(this, "samdel" + ids)
                                            }
                                          >
                                            CANCEL
                                          </a>
                                          <button
                                            className="butn"
                                            type="button"
                                            onClick={this.handleDeleteHierarchy.bind(
                                              this,
                                              ids
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
                                    onClick={() =>
                                      this.show(this, "samdel" + ids)
                                    }
                                  />
                                </Popover>
                                <Popover
                                  content={
                                    <Content
                                      rowData={row.original}
                                      reportToData={this.state.reportToData}
                                      activeData={this.state.activeData}
                                      editdesignationNameCompulsion={
                                        this.state.editdesignationNameCompulsion
                                      }
                                      editSaveLoading={
                                        this.state.editSaveLoading
                                      }
                                      editreportToCompulsion={
                                        this.state.editreportToCompulsion
                                      }
                                      editstatusCompulsion={
                                        this.state.editstatusCompulsion
                                      }
                                      callBackEdit={this.callBackEdit}
                                      handleUpdateHierarchyData={this.handleUpdateHierarchyData.bind(
                                        this
                                      )}
                                    />
                                  }
                                  placement="bottom"
                                  trigger="click"
                                >
                                  {/* <button
                                    className="react-tabel-button"
                                    type="button"
                                    // onClick={() => this.handleGetEditData.bind(
                                    //   this,
                                    //   row.original
                                    // )}
                                  >
                                    EDIT
                                  </button> */}
                                  <label className="Table-action-edit-button-text">
                                    <MyButton>EDIT</MyButton>
                                  </label>
                                </Popover>
                              </span>
                            </>
                          );
                        }
                      }
                    ]}
                    // resizable={false}
                    minRows={1}
                    defaultPageSize={10}
                    showPagination={true}
                  />
                </div>
              </div>
              <div className="col-md-4">
                {/* <div className="right-sect-div">
                  <h3>Create Hierarchy</h3>
                  <div className="div-cntr">
                    <label>Designation Name</label>
                    <input type="text" defaultValue="Store Manager" maxLength={25} />
                  </div>
                  <div className="div-cntr">
                    <label>Report To</label>
                    <select>
                      <option>Select</option>
                      <option>Root</option>
                      <option>Root</option>
                    </select>
                  </div>
                  <div className="div-cntr">
                    <label>Status</label>
                    <select>
                      <option>Active</option>
                      <option>Inactive</option>
                    </select>
                  </div>
                  <button className="butn">ADD</button>
                </div> */}
                <div className="createHierarchyMask">
                  <div className="createSpace">
                    <label className="create-department">
                      CREATE HIERARCHY
                    </label>
                    <div className="div-padding-1">
                      <label className="designation-name">
                        Designation Name
                      </label>
                      <input
                        type="text"
                        className="txt-1"
                        placeholder="Enter Designation Name"
                        maxLength={25}
                        name="designation_name"
                        value={this.state.designation_name}
                        onChange={this.handleOnChangeHierarchyData}
                      />
                      {this.state.designation_name.length === 0 && (
                        <p style={{ color: "red", marginBottom: "0px" }}>
                          {this.state.designationNameCompulsion}
                        </p>
                      )}
                    </div>
                    <div className="divSpace">
                      <div className="dropDrownSpace">
                        <label className="reports-to">Reports To</label>
                        <select
                          className="form-control dropdown-setting"
                          value={this.state.selectReportTo}
                          onChange={this.handleOnReportToChange}
                        >
                          <option>select</option>
                          <option value={1}>Root</option>
                          {this.state.reportToData !== null &&
                            this.state.reportToData.map((item, i) => (
                              <option key={i} value={item.designationID}>
                                {item.designationName}
                              </option>
                            ))}
                        </select>
                        {this.state.selectReportTo === 0 && (
                          <p style={{ color: "red", marginBottom: "0px" }}>
                            {this.state.reportToCompulsion}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="dropDrownSpace">
                      <label className="reports-to">Status</label>
                      <select
                        className="form-control dropdown-setting"
                        value={this.state.selectStatus}
                        onChange={this.handleStatusChange}
                      >
                        <option>select</option>
                        {this.state.activeData !== null &&
                          this.state.activeData.map((item, j) => (
                            <option key={j} value={item.ActiveID}>
                              {item.ActiveName}
                            </option>
                          ))}
                      </select>
                      {this.state.selectStatus === 0 && (
                        <p style={{ color: "red", marginBottom: "0px" }}>
                          {this.state.statusCompulsion}
                        </p>
                      )}
                    </div>
                    <div className="btnSpace">
                      <button
                        className="addBtn-ticket-hierarchy"
                        onClick={this.handleSubmitData.bind(this)}
                        disabled={this.state.addSaveLoading}
                      >
                        <label className="pop-over-btnsave-text">
                          {this.state.addSaveLoading ? (
                            <FontAwesomeIcon
                              className="circular-loader"
                              icon={faCircleNotch}
                              spin
                            />
                          ) : (
                            ""
                          )}
                          ADD
                        </label>
                      </button>
                    </div>
                  </div>
                </div>
                <br />
                <div className="right-sect-div">
                  <div className="d-flex justify-content-between align-items-center pb-2">
                    <h3 className="pb-0">Bulk Upload</h3>
                    <div className="down-excel">
                      <p>Template</p>
                      <CSVLink
                        filename={"Hierarchy.csv"}
                        data={config.hierarchyTemplate}
                      >
                        <img src={DownExcel} alt="download icon" />
                      </CSVLink>
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
                  {this.state.fileN.length === 0 && (
                    <p style={{ color: "red", marginBottom: "0px" }}>
                      {this.state.bulkuploadCompulsion}
                    </p>
                  )}
                  {this.state.fileName && (
                    <div className="file-info">
                      <div className="file-cntr">
                        <div className="file-dtls">
                          <p className="file-name">{this.state.fileName}</p>
                          <div className="del-file" id="del-file-1">
                            <img
                              src={DelBlack}
                              alt="delete-black"
                              onClick={this.togglePopover}
                            />
                          </div>
                          <UncontrolledPopover
                            trigger="legacy"
                            placement="auto"
                            target="del-file-1"
                            className="general-popover delete-popover"
                            isOpen={this.state.isOpen}
                            toggle={this.togglePopover}
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
                                  <a
                                    className="canblue"
                                    onClick={this.togglePopover}
                                  >
                                    CANCEL
                                  </a>
                                  <button
                                    className="butn"
                                    onClick={this.handleDeleteBulkupload}
                                  >
                                    Delete
                                  </button>
                                </div>
                              </div>
                            </PopoverBody>
                          </UncontrolledPopover>
                        </div>
                        <div>
                          <span className="file-size">
                            {this.state.fileSize}
                          </span>
                        </div>
                      </div>
                      {this.state.fileN.length > 0 &&
                      this.state.isFileUploadFail ? (
                        <div className="file-cntr">
                          <div className="file-dtls">
                            <p className="file-name">{this.state.fileName}</p>
                            <a
                              className="file-retry"
                              onClick={this.hanldeAddBulkUpload.bind(this)}
                            >
                              Retry
                            </a>
                          </div>
                          <div>
                            <span className="file-failed">Failed</span>
                          </div>
                        </div>
                      ) : null}
                      {this.state.showProgress ? (
                        <div className="file-cntr">
                          <div className="file-dtls">
                            <p className="file-name pr-0">
                              {this.state.fileName}
                            </p>
                          </div>
                          <div>
                            <div className="d-flex align-items-center mt-2">
                              <ProgressBar
                                className="file-progress"
                                now={this.state.progressValue}
                              />
                              {/* {this.state.progressValue !== 100 ? ( */}
                              <div className="cancel-upload">
                                {/* <img src={UploadCancel} alt="upload cancel" onClick={source.cancel('Operation canceled by the user.')} /> */}
                                <img src={UploadCancel} alt="upload cancel" />
                              </div>
                              {/* ) : null} */}
                            </div>
                          </div>
                        </div>
                      ) : null}
                    </div>
                  )}
                  <button
                    className="butn"
                    onClick={this.hanldeAddBulkUpload.bind(this)}
                  >
                    ADD
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default HierarchyMaster;
