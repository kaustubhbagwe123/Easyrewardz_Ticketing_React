import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import Demo from "./../../../store/Hashtag.js";
import ReactTable from "react-table";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import DeleteIcon from "./../../../assets/Images/red-delete-icon.png";
import FileUpload from "./../../../assets/Images/file.png";
import DelBlack from "./../../../assets/Images/del-black.png";
import { ProgressBar } from "react-bootstrap";
import UploadCancel from "./../../../assets/Images/upload-cancel.png";
import { UncontrolledPopover, PopoverBody } from "reactstrap";
import DelBigIcon from "./../../../assets/Images/del-big.png";
import { Popover, Select as Aselect } from "antd";
import SweetAlert from "react-bootstrap-sweetalert";
import Select from "react-select";
import axios from "axios";
import config from "./../../../helpers/config";
import { authHeader } from "../../../helpers/authHeader";
import { NotificationManager } from "react-notifications";
import ActiveStatus from "../../activeStatus.js";
import Modal from "react-responsive-modal";

const { Option } = Aselect;
const NEW_ITEM = "NEW_ITEM";

class DepartmentMaster extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fileName: "",
      activeData: ActiveStatus(),
      selectStatus: 0,
      brandData: [],
      StoreCode: [],
      selectedBrand: [],
      selectedStoreCode: [],
      list1Value: "",
      showList1: false,
      departmentData: [],
      departmentGrid: [],
      listFunction: "",
      ShowFunction: false,
      department_Id: 0,
      function_Id: 0,
      functionData: [],
      statusCompulsory: "",
      functionCompulsory: "",
      departmentCompulsory: "",
      storeCodeCompulsory: "",
      editDepartment: {},
      departmentMapId: 0,
      brandColor: "",
      sortHeader: "",
      StatusModel: false,
      sroleNameFilterCheckbox: "",
      screatedByFilterCheckbox: "",
      sisRoleActiveFilterCheckbox: "",
      sortFilterBrandName: [],
      sortFilterStoreCode: [],
      sortFilterDepartmentName: [],
      sortFilterFunction: [],
      sortFilterCreatedBy: [],
      sortFilterStatus: [],
      editBrandCompulsory: "Please Select Brand.",
      editStoreCompulsory: "Please Select Store.",
      editDepartmentCompulsory: "Please Select Department.",
      editFunctionCompulsory: "Please Select Function.",
      editSaveLoading: false,
      editmodel: false,
    };
    this.handleGetDepartmentGridData = this.handleGetDepartmentGridData.bind(
      this
    );
    this.handleGetBrandData = this.handleGetBrandData.bind(this);
    this.handleGetStoreCodeData = this.handleGetStoreCodeData.bind(this);
    this.handleAddDepartment = this.handleAddDepartment.bind(this);
    this.handleGetDepartmentList = this.handleGetDepartmentList.bind(this);
    this.handleAddFunction = this.handleAddFunction.bind(this);
    this.handleGetFunction = this.handleGetFunction.bind(this);
    this.toggleEditModal = this.toggleEditModal.bind(this);
  }

  componentDidMount() {
    this.handleGetBrandData();
    this.handleGetDepartmentList();
    this.handleGetDepartmentGridData();
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

  ////handle Brand change
  handleBrandChange = (data, e) => {
    if (e === null) {
      e = [];
      this.setState({ selectedBrand: e, StoreCode: [] });
    } else {
      this.setState({ selectedBrand: e });
      setTimeout(() => {
        if (this.state.selectedBrand) {
          this.handleGetStoreCodeData(data);
        }
      }, 1);
    }
  };

  /// handle Store code change
  handleStoreCodeChange = e => {
    this.setState({ selectedStoreCode: e });
  };
  ////handle status change drop-down
  handleStatusChange = e => {
    let value = e.target.value;
    this.setState({ selectStatus: value });
  };
  ////handle detapartment onchange
  handleDepartmentChange = value => {
    debugger;
    if (value !== NEW_ITEM) {
      this.setState({
        list1Value: value,
        functionData: []
      });
      setTimeout(() => {
        if (this.state.list1Value) {
          this.handleGetFunction("Add");
        }
      }, 1);
    } else {
      this.setState({ showList1: true });
    }
  };
  ////handle function change name
  handleFunctionOnChange = value => {
    debugger;
    if (value !== NEW_ITEM) {
      this.setState({ listFunction: value });
    } else {
      this.setState({ ShowFunction: true });
    }
  };

  toggleEditModal() {
    this.setState({ editmodel: false });
  }
  ///Get data for department update
  hanldeEditDepartment(rowData) {
    debugger;
    var editDepartment = {};

    editDepartment.brandID = rowData.brandID;
    editDepartment.brandName = rowData.brandName;
    this.handleGetStoreCodeData(rowData.brandID);

    editDepartment.storeID = rowData.storeID;
    editDepartment.storeCode = rowData.storeCode;

    editDepartment.departmentID = rowData.departmentID;
    editDepartment.departmentName = rowData.departmentName;
    this.handleGetFunction(rowData.departmentID);

    editDepartment.functionID = rowData.functionID;
    editDepartment.functionName = rowData.functionName;

    editDepartment.status = rowData.status;

    this.setState({
      editmodel: true,
      editDepartment,
      departmentMapId: rowData.departmentBrandMappingID
    });
  }
  //// handle Edit change data
  handleModalEditData = e => {
    debugger;

    var name = e.target.name;
    var value = e.target.value;
    var editDepartment = this.state.editDepartment;
    editDepartment[name] = value;
    this.setState({ editDepartment });

    if (name === "brandID") {
      this.handleGetStoreCodeData(value);
    } else if (name === "departmentID") {
      this.handleGetFunction(value);
    }
  };
  /// status open modal
  // StatusOpenModel(data, header) {
  // debugger;
  // if (
  //   this.state.sortFilterBrandName.length === 0 ||
  //   this.state.sortFilterStoreCode.length === 0 ||
  //   this.state.sortFilterDepartmentName.length === 0 ||
  //   this.state.sortFilterFunction.length === 0 ||
  //   this.state.sortFilterCreatedBy.length === 0 ||
  //   this.state.sortFilterStatus.length === 0
  // ) {
  //   return false;
  // }
  // if (data === "brandName") {
  //   if (
  //     this.state.screatedByFilterCheckbox !== "" ||
  //     this.state.sisRoleActiveFilterCheckbox !== ""
  //   ) {
  //     this.setState({
  //       StatusModel: true,
  //       sortColumn: data,
  //       sortHeader: header
  //     });
  //   } else {
  //     this.setState({
  //       screatedByFilterCheckbox: "",
  //       sisRoleActiveFilterCheckbox: "",
  //       StatusModel: true,
  //       sortColumn: data,
  //       sortHeader: header
  //     });
  //   }
  // }
  // if (data === "createdBy") {
  //   if (
  //     this.state.sroleNameFilterCheckbox !== "" ||
  //     this.state.sisRoleActiveFilterCheckbox !== ""
  //   ) {
  //     this.setState({
  //       StatusModel: true,
  //       sortColumn: data,
  //       sortHeader: header
  //     });
  //   } else {
  //     this.setState({
  //       sroleNameFilterCheckbox: "",
  //       sisRoleActiveFilterCheckbox: "",
  //       StatusModel: true,
  //       sortColumn: data,
  //       sortHeader: header
  //     });
  //   }
  // }
  // if (data === "isRoleActive") {
  //   if (
  //     this.state.screatedByFilterCheckbox !== "" ||
  //     this.state.sroleNameFilterCheckbox !== ""
  //   ) {
  //     this.setState({
  //       StatusModel: true,
  //       sortColumn: data,
  //       sortHeader: header
  //     });
  //   } else {
  //     this.setState({
  //       sroleNameFilterCheckbox: "",
  //       screatedByFilterCheckbox: "",
  //       StatusModel: true,
  //       sortColumn: data,
  //       sortHeader: header
  //     });
  //   }
  // }
  // }
  // --------------------------API---------------------------------
  ////Get Detapartment grid data
  handleGetDepartmentGridData() {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/StoreDepartment/GetDeparmentBrandMappingList",
      headers: authHeader()
    })
      .then(res => {
        debugger;
        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success") {
          self.setState({ departmentGrid: data });
        } else {
          self.setState({ departmentGrid: [] });
        }
      })
      .catch(res => {
        console.log(res);
      });
  }
  ////get Brand data for dropdown
  handleGetBrandData() {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/Brand/GetBrandList",
      headers: authHeader()
    })
      .then(res => {
        debugger;
        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success") {
          self.setState({ brandData: data });
        } else {
          self.setState({ brandData: [] });
        }
      })
      .catch(response => {
        console.log(response);
      });
  }
  ////get Brand data for dropdown
  handleGetStoreCodeData(data) {
    debugger;
    let self = this;
    var finalBrandId = "";
    var brand_Ids = "";
    if (data === "add") {
      if (this.state.selectedBrand !== null) {
        for (let i = 0; i < this.state.selectedBrand.length; i++) {
          finalBrandId += this.state.selectedBrand[i].brandID + ",";
          var brand_Ids = finalBrandId.substring(",", finalBrandId.length - 1);
        }
      }
    } else {
      brand_Ids = data;
    }
    axios({
      method: "post",
      url: config.apiUrl + "/StoreDepartment/GetStoreCodeByBrandID",
      headers: authHeader(),
      params: {
        BrandIDs: brand_Ids
      }
    })
      .then(res => {
        debugger;
        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success") {
          self.setState({ StoreCode: data });
        } else {
          self.setState({ StoreCode: [] });
        }
      })
      .catch(response => {
        console.log(response);
      });
  }
  ////get Department data for dropdown
  handleGetDepartmentList() {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/StoreDepartment/getDepartmentList",
      headers: authHeader()
    })
      .then(res => {
        debugger;
        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success") {
          self.setState({ departmentData: data });
        } else {
          self.setState({ departmentData: [] });
        }
      })
      .catch(response => {
        console.log(response);
      });
  }

  ///hanlde Add new Department
  handleAddDepartment(value) {
    debugger;
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/StoreDepartment/AddStoreDepartment",
      headers: authHeader(),
      params: {
        DepartmentName: value
      }
    })
      .then(function(res) {
        debugger;
        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success") {
          NotificationManager.success("Department added successfully.");
          self.setState({
            department_Id: data
          });
          self.handleGetDepartmentList();
        } else {
          NotificationManager.error("Department not added.");
        }
      })
      .catch(data => {
        console.log(data);
      });
  }
  ////handle Get function by Department Id
  handleGetFunction(check) {
    debugger;
    let self = this;
    var finalDepartmentId = 0;
    if (check === "Add") {
      finalDepartmentId = this.state.list1Value;
    } else {
      finalDepartmentId = parseInt(this.state.editDepartment.departmentID);
    }
    axios({
      method: "post",
      url: config.apiUrl + "/StoreDepartment/getFunctionNameByDepartmentId",
      headers: authHeader(),
      params: {
        DepartmentId: finalDepartmentId
      }
    })
      .then(function(res) {
        debugger;
        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success") {
          self.setState({ functionData: data });
        } else {
          self.setState({ functionData: [] });
        }
      })
      .catch(data => {
        console.log(data);
      });
  }
  ////handle add function base on Department Id
  handleAddFunction(value) {
    debugger;
    let self = this;
    var finalId = 0;
    if (this.state.department_Id === 1) {
      finalId = this.state.list1Value;
    } else {
      finalId = this.state.department_Id;
    }
    axios({
      method: "post",
      url: config.apiUrl + "/StoreDepartment/AddStoreFunction",
      headers: authHeader(),
      params: {
        DepartmentID: finalId,
        FunctionName: value
      }
    })
      .then(function(res) {
        debugger;
        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success") {
          NotificationManager.success("Function added successfully.");
          self.handleGetFunction("Add");
          self.setState({
            function_Id: data
          });
        } else {
          NotificationManager.error("Function not added.");
        }
      })
      .catch(data => {
        console.log(data);
      });
  }
  /// handle create Department
  handleCreateDepartment() {
    debugger;
    let self = this;
    if (
      this.state.selectedBrand !== null &&
      this.state.selectedStoreCode !== null &&
      (this.state.list1Value > 0 || this.state.list1Value !== "") &&
      (this.state.listFunction > 0 || this.state.listFunction !== "") &&
      this.state.selectStatus.length > 0
    ) {
      var activeStatus = 0;
      var departmentData = 0;
      var functionData = 0;
      var brandIds = "";
      var storeIds = "";
      //// multi Brand Ids
      if (this.state.selectedBrand !== null) {
        for (let i = 0; i < this.state.selectedBrand.length; i++) {
          brandIds += this.state.selectedBrand[i].brandID + ",";
        }
      }
      /// multi Store Ids
      if (this.state.selectedStoreCode !== null) {
        for (let i = 0; i < this.state.selectedStoreCode.length; i++) {
          storeIds += this.state.selectedStoreCode[i].storeID + ",";
        }
      }
      if (isNaN(this.state.list1Value)) {
        departmentData = this.state.department_Id;
      } else {
        departmentData = this.state.list1Value;
      }

      if (isNaN(this.state.listFunction)) {
        functionData = this.state.function_Id;
      } else {
        functionData = this.state.listFunction;
      }

      if (this.state.selectStatus === "Active") {
        activeStatus = 1;
      } else {
        activeStatus = 0;
      }

      axios({
        method: "post",
        url: config.apiUrl + "/StoreDepartment/CreateDepartment",
        headers: authHeader(),
        data: {
          BrandID: brandIds,
          StoreID: storeIds,
          DepartmentID: departmentData,
          FunctionID: functionData,
          Status: activeStatus
        }
      })
        .then(function(res) {
          debugger;
          let status = res.data.message;
          if (status === "Success") {
            self.handleGetDepartmentGridData();
            NotificationManager.success("Department added successfully.");
            self.setState({
              selectedBrand: [],
              selectedStoreCode: [],
              list1Value: "",
              listFunction: "",
              selectStatus: 0,
              brandCompulsory: "",
              storeCodeCompulsory: "",
              departmentCompulsory: "",
              functionCompulsory: "",
              statusCompulsory: ""
            });
          } else if (status === "Record Already Exists") {
            NotificationManager.error("Record Already Exists.");
          } else {
            NotificationManager.error(status);
          }
        })
        .catch(data => {
          console.log(data);
        });
    } else {
      this.setState({
        brandCompulsory: "Please Select Brand",
        storeCodeCompulsory: "Please Select Store Code",
        departmentCompulsory: "Please Selet Department",
        functionCompulsory: "Please Select Function",
        statusCompulsory: "Please Select Status"
      });
    }
  }
  //// handle update department
  handleUpdateDepartment() {
    debugger;
    let self = this;
    var activeStatus = 0;
    if (this.state.editDepartment.status === "Active") {
      activeStatus = 1;
    } else {
      activeStatus = 0;
    }
    this.setState({ editSaveLoading: true });
    var brd=parseInt(this.state.editDepartment.brandID);
    axios({
      method: "post",
      url: config.apiUrl + "/StoreDepartment/UpdateBrandDepartmentMapping",
      headers: authHeader(),
      params: {
        DepartmentBrandID: this.state.departmentMapId,
        BrandID: parseInt(this.state.editDepartment.brandID),
        StoreID: parseInt(this.state.editDepartment.storeID),
        DepartmentID: parseInt(this.state.editDepartment.departmentID),
        FunctionID: parseInt(this.state.editDepartment.functionID),
        Status: activeStatus
      }
    })
      .then(function(res) {
        debugger;
        let status = res.data.message;
        if (status === "Success") {
          self.handleGetDepartmentGridData();
          NotificationManager.success("Department updated successfully.");
          self.setState({
            editSaveLoading: false
          })
        }
      })
      .catch(data => {
        console.log(data);
      });
  }
  //// delete Department by DepartmentId
  handleDeleteDepartmentData(department_Id) {
    debugger;
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/StoreDepartment/DeleteBrandDepartmentMapping",
      headers: authHeader(),
      params: {
        DepartmentBrandMappingID: department_Id
      }
    })
      .then(function(res) {
        debugger;
        let status = res.data.message;
        if (status === "Success") {
          self.handleGetDepartmentGridData();
          NotificationManager.success("Department deleted successfully.");
        }
      })
      .catch(data => {
        console.log(data);
      });
  }

  render() {
    const departmentList = this.state.departmentData.map((item, i) => (
      <Option key={i} value={item.departmentID}>
        {item.departmentName}
      </Option>
    ));
    const functionList = this.state.functionData.map((item, j) => (
      <Option key={j} value={item.functionID}>
        {item.funcationName}
      </Option>
    ));

    return (
      <Fragment>
        <div className="container-fluid setting-title setting-breadcrumb">
          <Link to="/admin/settings" className="header-path">
            Settings
          </Link>
          <span>&gt;</span>
          <Link
            to={{
              pathname: "/admin/settings",
              tabName: "store-tab"
            }}
            className="header-path"
          >
            Store
          </Link>
          <span>&gt;</span>
          <Link to={Demo.BLANK_LINK} className="active header-path">
            Department Master
          </Link>
        </div>

        <div className="container-fluid">
          <div className="store-settings-cntr">
            <div className="row">
              <div className="col-md-8">
                <div className="table-cntr table-height deptMaster">
                  <ReactTable
                    data={this.state.departmentGrid}
                    columns={[
                      {
                        Header: (
                          <span
                          // className={this.state.brandColor}
                          // onClick={this.StatusOpenModel.bind(
                          //   this,
                          //   "brandName",
                          //   "Brand Name"
                          // )}
                          >
                            Brand Name <FontAwesomeIcon icon={faCaretDown} />
                          </span>
                        ),
                        accessor: "brandName"
                      },
                      {
                        Header: (
                          <span>
                            Store Code
                            <FontAwesomeIcon icon={faCaretDown} />
                          </span>
                        ),
                        accessor: "storeCode"
                      },
                      {
                        Header: (
                          <span>
                            Department Name
                            <FontAwesomeIcon icon={faCaretDown} />
                          </span>
                        ),
                        accessor: "departmentName"
                      },
                      {
                        Header: (
                          <span>
                            Function
                            <FontAwesomeIcon icon={faCaretDown} />
                          </span>
                        ),
                        accessor: "functionName"
                      },
                      {
                        Header: (
                          <span>
                            Created By
                            <FontAwesomeIcon icon={faCaretDown} />
                          </span>
                        ),
                        accessor: "createdBy"
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
                          var ids = row.original["departmentBrandMappingID"];
                          return (
                            <div>
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
                                          onClick={this.handleDeleteDepartmentData.bind(
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
                                  src={DeleteIcon}
                                  alt="del-icon"
                                  className="downloadaction"
                                  style={{ marginRight: "5px" }}
                                />
                              </Popover>
                              <button
                                className="react-tabel-button ReNewBtn"
                                type="button"
                                onClick={this.hanldeEditDepartment.bind(
                                  this,
                                  row.original
                                )}
                              >
                                EDIT
                              </button>
                            </div>
                          );
                        }
                      }
                    ]}
                    minRows={2}
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
                <div className="right-sect-div right-sect-collapse">
                  <h3>CREATE DEPARTMENT</h3>
                  <div className="div-cntr">
                    <label>Brand</label>
                    <Select
                      getOptionLabel={option => option.brandName}
                      getOptionValue={option => option.brandID}
                      options={this.state.brandData}
                      placeholder="Select"
                      // menuIsOpen={true}
                      closeMenuOnSelect={false}
                      name="selectedBrand"
                      onChange={this.handleBrandChange.bind(this, "add")}
                      value={this.state.selectedBrand}
                      // showNewOptionAtTop={false}
                      isMulti
                    />
                    {this.state.selectedBrand.length === 0 && (
                      <p style={{ color: "red", marginBottom: "0px" }}>
                        {this.state.brandCompulsory}
                      </p>
                    )}
                  </div>
                  <div className="div-cntr">
                    <label>Store Code</label>
                    <Select
                      getOptionLabel={option => option.storeName}
                      getOptionValue={option => option.storeID}
                      options={this.state.StoreCode}
                      placeholder="Select"
                      // menuIsOpen={true}
                      closeMenuOnSelect={false}
                      name="selectedStoreCode"
                      onChange={this.handleStoreCodeChange.bind(this)}
                      value={this.state.selectedStoreCode}
                      // showNewOptionAtTop={false}
                      isMulti
                    />
                    {this.state.selectedStoreCode.length === 0 && (
                      <p style={{ color: "red", marginBottom: "0px" }}>
                        {this.state.storeCodeCompulsory}
                      </p>
                    )}
                  </div>
                  <div className="div-cntr">
                    <label>Department</label>
                    <Aselect
                      showSearch={true}
                      value={this.state.list1Value}
                      style={{ width: "100%" }}
                      onChange={this.handleDepartmentChange}
                    >
                      {departmentList}
                      <Option value={NEW_ITEM}>
                        <span className="sweetAlert-inCategory">+ ADD NEW</span>
                      </Option>
                    </Aselect>
                    {this.state.list1Value === "" && (
                      <p style={{ color: "red", marginBottom: "0px" }}>
                        {this.state.departmentCompulsory}
                      </p>
                    )}

                    <SweetAlert
                      show={this.state.showList1}
                      style={{ width: "320px" }}
                      title="Add New Department"
                      text="Enter new Department"
                      showCancelButton
                      type="input"
                      inputPlaceholder="Enter Department Name"
                      animation="slide-from-top"
                      validationMsg="Please enter a department!"
                      onConfirm={inputValue => {
                        debugger;
                        inputValue = inputValue.trim();
                        if (inputValue.length >= 0 && inputValue.length <= 50) {
                          if (inputValue !== "") {
                            this.setState({
                              showList1: false,
                              list1Value: inputValue
                            });
                            this.handleAddDepartment(inputValue);
                          } else {
                            this.setState({
                              showList1: false,
                              list1Value: inputValue
                            });
                          }
                        }
                      }}
                      onCancel={() => {
                        this.setState({ showList1: false });
                      }}
                      onEscapeKey={() => this.setState({ showList1: false })}
                      onOutsideClick={() => this.setState({ showList1: false })}
                    />
                  </div>
                  <div className="div-cntr">
                    <label>Function</label>

                    <Aselect
                      showSearch={true}
                      value={this.state.listFunction}
                      style={{ width: "100%" }}
                      onChange={this.handleFunctionOnChange}
                    >
                      {functionList}
                      <Option value={NEW_ITEM}>
                        <span className="sweetAlert-inCategory">+ ADD NEW</span>
                      </Option>
                    </Aselect>
                    {this.state.listFunction === "" && (
                      <p style={{ color: "red", marginBottom: "0px" }}>
                        {this.state.functionCompulsory}
                      </p>
                    )}
                    <SweetAlert
                      show={this.state.ShowFunction}
                      style={{ width: "320px" }}
                      title="Add New Function"
                      text="Enter new Function"
                      showCancelButton
                      type="input"
                      inputPlaceholder="Enter Function"
                      animation="slide-from-top"
                      validationMsg="Please Enter Function!"
                      onConfirm={inputValue => {
                        inputValue = inputValue.trim();
                        if (inputValue !== "") {
                          this.setState({
                            ShowFunction: false,
                            listFunction: inputValue
                          });
                          this.handleAddFunction(inputValue);
                        } else {
                          this.setState({
                            ShowFunction: false,
                            listFunction: inputValue
                          });
                        }
                      }}
                      onCancel={() => {
                        this.setState({ ShowFunction: false });
                      }}
                      onEscapeKey={() => this.setState({ ShowFunction: false })}
                      onOutsideClick={() =>
                        this.setState({ ShowFunction: false })
                      }
                    />
                  </div>
                  <div className="div-cntr">
                    <label>Status</label>
                    <select
                      name="selectStatus"
                      value={this.state.selectStatus}
                      onChange={this.handleStatusChange}
                    >
                      <option>Select</option>
                      {this.state.activeData !== null &&
                        this.state.activeData.map((item, j) => (
                          <option key={j} value={item.ActiveID}>
                            {item.ActiveName}
                          </option>
                        ))}
                    </select>
                    {this.state.selectStatus === 0 && (
                      <p style={{ color: "red", marginBottom: "0px" }}>
                        {this.state.statusCompulsory}
                      </p>
                    )}
                  </div>
                  <div className="btn-coll">
                    <button
                      className="butn"
                      onClick={this.handleCreateDepartment.bind(this)}
                    >
                      ADD
                    </button>
                  </div>
                </div>
                <div className="right-sect-div">
                  <div className="d-flex justify-content-between align-items-center pb-2">
                    <h3 className="pb-0">Bulk Upload</h3>
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
                </div>
              </div>
              <Modal
                open={this.state.editmodel}
                onClose={this.toggleEditModal}
                modalId="storeEditModal"
              >
                <div className="edtpadding">
                  <label className="popover-header-text">Edit Department</label>
                  <div className="pop-over-div">
                    <label className="edit-label-1">Brand</label>
                    <select
                      className="store-create-select"
                      name="brandID"
                      value={this.state.editDepartment.brandID}
                      onChange={this.handleModalEditData}
                    >
                      <option value={0}>Select</option>
                      {this.state.brandData !== null &&
                        this.state.brandData.map((item, i) => (
                          <option
                            key={i}
                            value={item.brandID}
                            className="select-category-placeholder"
                          >
                            {item.brandName}
                          </option>
                        ))}
                    </select>
                    {this.state.editDepartment.brandID === "0" && (
                      <p style={{ color: "red", marginBottom: "0px" }}>
                        {this.state.editBrandCompulsory}
                      </p>
                    )}
                  </div>
                  <div className="pop-over-div">
                    <label className="edit-label-1">Store Code</label>
                    <select
                      className="store-create-select"
                      name="storeID"
                      value={this.state.editDepartment.storeID}
                      onChange={this.handleModalEditData}
                    >
                      <option value={0}>Select</option>
                      {this.state.StoreCode !== null &&
                        this.state.StoreCode.map((item, j) => (
                          <option
                            key={j}
                            value={item.storeID}
                            className="select-category-placeholder"
                          >
                            {item.storeName}
                          </option>
                        ))}
                    </select>
                    {this.state.editDepartment.storeID === "0" && (
                      <p style={{ color: "red", marginBottom: "0px" }}>
                        {this.state.editStoreCompulsory}
                      </p>
                    )}
                  </div>
                  <div className="pop-over-div">
                    <label className="edit-label-1">Department</label>
                    <select
                      className="store-create-select"
                      name="departmentID"
                      value={this.state.editDepartment.departmentID}
                      onChange={this.handleModalEditData}
                    >
                      <option value={0}>Select</option>
                      {this.state.departmentData !== null &&
                        this.state.departmentData.map((item, j) => (
                          <option
                            key={j}
                            value={item.departmentID}
                            className="select-category-placeholder"
                          >
                            {item.departmentName}
                          </option>
                        ))}
                    </select>
                    {this.state.editDepartment.departmentID === "0" && (
                      <p style={{ color: "red", marginBottom: "0px" }}>
                        {this.state.editDepartmentCompulsory}
                      </p>
                    )}
                  </div>
                  <div className="pop-over-div">
                    <label className="edit-label-1">Function</label>
                    <select
                      className="store-create-select"
                      name="functionID"
                      value={this.state.editDepartment.functionID}
                      onChange={this.handleModalEditData}
                    >
                      <option value={0}>Select</option>
                      {this.state.functionData !== null &&
                        this.state.functionData.map((item, j) => (
                          <option
                            key={j}
                            value={item.functionID}
                            className="select-category-placeholder"
                          >
                            {item.funcationName}
                          </option>
                        ))}
                    </select>
                    {this.state.editDepartment.functionID === "0" && (
                      <p style={{ color: "red", marginBottom: "0px" }}>
                        {this.state.editFunctionCompulsory}
                      </p>
                    )}
                  </div>
                  <div className="pop-over-div">
                    <label className="edit-label-1">Status</label>
                    <select
                      className="store-create-select"
                      name="status"
                      value={
                        this.state.editDepartment.status === "Active"
                          ? "Active"
                          : "InActive"
                      }
                      onChange={this.handleModalEditData}
                    >
                      <option value="Active">Active</option>
                      <option value="InActive">InActive</option>
                    </select>
                  </div>
                  <br />
                  <div>
                    <a
                      className="pop-over-cancle"
                      onClick={this.toggleEditModal}
                    >
                      CANCEL
                    </a>
                    <button
                      className="pop-over-button"
                      type="button"
                      onClick={this.handleUpdateDepartment.bind(this)}
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
                      SAVE
                    </button>
                  </div>
                </div>
              </Modal>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default DepartmentMaster;
