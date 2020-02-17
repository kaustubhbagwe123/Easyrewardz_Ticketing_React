import React, { Component } from "react";
import RedDeleteIcon from "./../../../assets/Images/red-delete-icon.png";
import { UncontrolledPopover, PopoverBody } from "reactstrap";
import Demo from "./../../../store/Hashtag.js";
import DelBigIcon from "./../../../assets/Images/del-big.png";
import FileUpload from "./../../../assets/Images/file.png";
import DelBlack from "./../../../assets/Images/del-black.png";
import UploadCancel from "./../../../assets/Images/upload-cancel.png";
import { ProgressBar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Select } from "antd";
import SweetAlert from "react-bootstrap-sweetalert";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Popover } from "antd";
import DownExcel from "./../../../assets/Images/csv.png";
import ReactTable from "react-table";
import {
  NotificationContainer,
  NotificationManager
} from "react-notifications";
import { authHeader } from "../../../helpers/authHeader";
import config from "../../../helpers/config";
import axios from "axios";
import ActiveStatus from "../../activeStatus";
import { CSVLink, CSVDownload } from "react-csv";
const { Option } = Select;
const NEW_ITEM = "NEW_ITEM";

// const Option = Select.Option;

class CategoryMaster extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fileName: "",
      catmulti: false,
      activeData: ActiveStatus(),
      list1Value: "",
      inputValue: "",
      showList1: false,
      ListOfSubCate: "",
      ListOfIssue: "",
      ShowSubCate: false,
      ShowIssuetype: false,
      loading: false,
      categoryGridData: [],
      brandData: [],
      categoryDropData: [],
      SubCategoryDropData: [],
      ListOfIssueData: [],
      selectStatus: 0,
      category_Id: 0,
      selectBrand: 0,
      subCategory_Id: 0,
      issueType_Id: 0,
      selectetedParameters: {}
    };
    this.handleGetCategoryGridData = this.handleGetCategoryGridData.bind(this);
    this.handleGetBrandList = this.handleGetBrandList.bind(this);
    this.handleGetCategoryList = this.handleGetCategoryList.bind(this);
    this.handleGetSubCategoryList = this.handleGetSubCategoryList.bind(this);
    this.handleAddCategory = this.handleAddCategory.bind(this);
    this.handleAddSubCategory = this.handleAddSubCategory.bind(this);
    this.handleAddIssueType = this.handleAddIssueType.bind(this);
    this.handleGetIssueTypeList=this.handleGetIssueTypeList.bind(this)
  }
  componentDidMount() {
    this.handleGetCategoryGridData();
    this.handleGetBrandList();
  }
  handleGetCategoryGridData() {
    let self = this;
    this.setState({ loading: true });
    axios({
      method: "get",
      url: config.apiUrl + "/Category/ListCategorybrandmapping",
      headers: authHeader()
    }).then(function(res) {
      debugger;
      var status = res.data.message;
      var data = res.data.responseData;
      if (status === "Success") {
        self.setState({
          categoryGridData: data,
          loading: false
        });
      } else {
        self.setState({
          categoryGridData: []
        });
      }
    });
  }
  handleGetBrandList() {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/Brand/GetBrandList",
      headers: authHeader()
    }).then(function(res) {
      debugger;
      let status = res.data.message;
      let data = res.data.responseData;
      if (status === "Success") {
        self.setState({ brandData: data });
      } else {
        self.setState({ brandData: [] });
      }
    });
  }

  handleGetCategoryList() {
    debugger;
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/Category/GetCategoryList",
      headers: authHeader(),
      params: {
        BrandID: this.state.selectBrand
      }
    }).then(function(res) {
      debugger;
      // let status=
      let data = res.data;
      self.setState({ categoryDropData: data });
    });
  }

  handleGetSubCategoryList() {
    debugger;
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/SubCategory/GetSubCategoryByCategoryID",
      headers: authHeader(),
      params: {
        CategoryID: this.state.list1Value
      }
    }).then(function(res) {
      debugger;
      let data = res.data.responseData;
      self.setState({ SubCategoryDropData: data });
    });
  }

  handleGetIssueTypeList() {
    debugger;
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/IssueType/GetIssueTypeList",
      headers: authHeader(),
      params: {
        SubCategoryID: this.state.ListOfSubCate
      }
    }).then(function(res) {
      debugger;
      let status = res.data.message;
      let data = res.data.responseData;
      if (status === "Success") {
        self.setState({ ListOfIssueData: data });
      } else {
        self.setState({ ListOfIssueData: [] });
      }
    });
  }

  handleDeleteCategoryData(category_Id) {
    debugger;
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/Category/DeleteCategory",
      headers: authHeader(),
      params: {
        CategoryID: category_Id
      }
    }).then(function(res) {
      debugger;
      let status = res.data.message;
      if (status === "Success") {
        self.handleGetCategoryGridData();
        NotificationManager.success("Category deleted successfully.");
      }
    });
  }

  handleAddCategory(value) {
    debugger;
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/Category/AddCategory",
      headers: authHeader(),
      params: {
        category: value,
        BrandID:this.state.selectBrand
      }
    }).then(function(res) {
      debugger;
      let status = res.data.message;
      let data = res.data.responseData;
      if (status === "Success") {
        NotificationManager.success("Category added successfully.");
        self.setState({
          category_Id: data,
          // inputValue: "",
          // list1Value: ""
        });
        self.handleGetCategoryList()
      } else {
        NotificationManager.error("Category not added.");
      }
    });
  }
  handleAddSubCategory(value) {
    debugger;
    let self = this;
    // var finalId = 0;
    // if (this.state.category_Id === 1) {
    //   finalId = this.state.list1Value;
    // } else {
    //   finalId = this.state.category_Id;
    // }
    axios({
      method: "post",
      url: config.apiUrl + "/SubCategory/AddSubCategory",
      headers: authHeader(),
      params: {
        categoryID: this.state.list1Value,
        SubcategoryName: value
      }
    }).then(function(res) {
      debugger;
      let status = res.data.message;
      let data = res.data.responseData;
      if (status === "Success") {
        NotificationManager.success("SubCategory added successfully.");
        self.setState({
          subCategory_Id: data
        });
        self.handleGetSubCategoryList()
      } else {
        NotificationManager.error("SubCategory not added.");
      }
    });
  }

  handleAddIssueType(value) {
    debugger;
    let self = this;
    // var finalId = 0;
    // if (this.state.subCategory_Id === 0) {
    //   finalId = this.state.ListOfSubCate;
    // } else {
    //   finalId = this.state.subCategory_Id;
    // }
    axios({
      method: "post",
      url: config.apiUrl + "/IssueType/AddIssueType",
      headers: authHeader(),
      params: {
        SubcategoryID: this.state.ListOfSubCate,
        IssuetypeName: value
      }
    }).then(function(res) {
      debugger;
      let status = res.data.message;
      let data = res.data.responseData;
      if (status === "Success") {
        NotificationManager.success("Issue Type added successfully.");
        self.setState({
          issueType_Id: data
        });
        self.handleGetIssueTypeList();
      } else {
        NotificationManager.error("Issue Type not added.");
      }
    });
  }

  handleSubmitData() {
    debugger;
    let self = this;
    var activeStatus = 0;
    var categorydata = 0;
    var subCategoryData = 0;
    var IssueData = 0;
    var status = this.state.selectStatus;
    if (status === "Active") {
      activeStatus = 1;
    } else {
      activeStatus = 0;
    }
    if (isNaN(this.state.list1Value)) {
      categorydata = this.state.category_Id;
    } else {
      categorydata = this.state.list1Value;
    }

    if (isNaN(this.state.ListOfSubCate)) {
      subCategoryData = this.state.subCategory_Id;
    } else {
      subCategoryData = this.state.ListOfSubCate;
    }

    if (isNaN(this.state.ListOfIssue)) {
      IssueData = this.state.issueType_Id;
    } else {
      IssueData = this.state.ListOfIssue;
    }

    axios({
      method: "post",
      url: config.apiUrl + "/Category/CreateCategorybrandmapping",
      headers: authHeader(),
      data: {
        BraindID: this.state.selectBrand,
        CategoryID: categorydata,
        SubCategoryID: subCategoryData,
        IssueTypeID: IssueData,
        Status: activeStatus
      }
    }).then(function(res) {
      debugger;
      let status = res.data.message;
      if (status === "Success") {
        self.handleGetCategoryGridData();
        NotificationManager.success("Category added successfully.");
        self.setState({
          selectBrand: 0,
          list1Value: "",
          ListOfSubCate: "",
          ListOfIssue: "",
          selectStatus: 0
        });
      }
    });
  }

  HandleMultiSelect() {
    this.setState({ catmulti: true });
  }
  fileUpload = e => {
    this.setState({ fileName: e.target.files[0].name });
  };
  handleCategoryChange = value => {
    debugger;
    if (value !== NEW_ITEM) {
      this.setState({ list1Value: value, SubCategoryDropData: [] });
      setTimeout(() => {
        if (this.state.list1Value) {
          this.handleGetSubCategoryList();
        }
      }, 1); 
    } else {
      this.setState({ showList1: true });
    }
  };

  handleSubCatOnChange = value => {
    debugger;
    if (value !== NEW_ITEM) {
      this.setState({ ListOfSubCate: value });
      setTimeout(() => {
        if (this.state.ListOfSubCate) {
          this.handleGetIssueTypeList();
        }
      }, 1);
    } else {
      this.setState({ ShowSubCate: true });
    }
  };
  handleIssueOnChange = value => {
    if (value !== NEW_ITEM) {
      this.setState({ ListOfIssue: value });
    } else {
      this.setState({ ShowIssuetype: true });
    }
  };
  handleBrandChange = e => {
    let value = e.target.value;
    this.setState({
      selectBrand: value,
      categoryDropData: [],
      SubCategoryDropData: [],
      ListOfIssueData:[]
    });
    setTimeout(() => {
      if (this.state.selectBrand) {
        this.handleGetCategoryList();
      }
    }, 1);
  };
  handleEditDropDownChange = e => {
    debugger;
    let name = e.target.name;
    let value = e.target.value;
    this.setState({ name: value });
  };
  handleStatusChange = e => {
    let value = e.target.value;
    this.setState({ selectStatus: value });
  };

  render() {
    const { categoryGridData } = this.state;
    const list1SelectOptions = this.state.categoryDropData.map((item, o) => (
      <Option key={o} value={item.categoryID}>
        {item.categoryName}
      </Option>
    ));
    const listSubCategory = this.state.SubCategoryDropData.map((item, o) => (
      <Option key={o} value={item.subCategoryID}>
        {item.subCategoryName}
      </Option>
    ));
    const listOfIssueType = this.state.ListOfIssueData.map((item, i) => (
      <Option key={i} value={item.issueTypeID}>
        {item.issueTypeName}
      </Option>
    ));
    return (
      <React.Fragment>
        <NotificationContainer />
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
            Category Master
          </Link>
        </div>
        <div className="container-fluid">
          <div className="store-settings-cntr">
            <div className="row">
              <div className="col-md-8">
                {this.state.loading === true ? (
                  <div className="loader-icon"></div>
                ) : (
                  <div className="table-cntr table-height TicketCategoyMasReact">
                    <ReactTable
                      data={categoryGridData}
                      columns={[
                        {
                          Header: (
                            <span>
                              Brand Name
                              <FontAwesomeIcon icon={faCaretDown} />
                            </span>
                          ),
                          accessor: "brandName"
                        },
                        {
                          Header: (
                            <span>
                              Category
                              <FontAwesomeIcon icon={faCaretDown} />
                            </span>
                          ),
                          accessor: "categoryName"
                        },
                        {
                          Header: (
                            <span>
                              Sub Cat
                              <FontAwesomeIcon icon={faCaretDown} />
                            </span>
                          ),
                          accessor: "subCategoryName"
                        },
                        {
                          Header: (
                            <span>
                              Issue Type
                              <FontAwesomeIcon icon={faCaretDown} />
                            </span>
                          ),
                          accessor: "issueTypeName"
                        },
                        {
                          Header: (
                            <span>
                              Status
                              <FontAwesomeIcon icon={faCaretDown} />
                            </span>
                          ),
                          accessor: "statusName"
                        },
                        {
                          Header: <span>Actions</span>,
                          accessor: "actiondept",
                          Cell: row => {
                            var ids = row.original["brandCategoryMappingID"];
                            return (
                              <>
                                <span>
                                  <Popover
                                    content={
                                      <div className="d-flex general-popover popover-body">
                                        <div className="del-big-icon">
                                          <img
                                            src={DelBigIcon}
                                            alt="del-icon"
                                          />
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
                                              type="button"
                                              onClick={this.handleDeleteCategoryData.bind(
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
                                    />
                                  </Popover>
                                  <Popover
                                    content={
                                      <div className="edtpadding">
                                        <label className="popover-header-text">
                                          EDIT CATEGORY
                                        </label>
                                        <div className="pop-over-div">
                                          <label className="edit-label-1">
                                            Brand Name
                                          </label>
                                          <select
                                            className="store-create-select"
                                            value={this.state.selectBrand}
                                            onChange={
                                              this.handleEditDropDownChange
                                            }
                                            name="selectBrand"
                                          >
                                            <option>Select</option>
                                            {this.state.brandData !== null &&
                                              this.state.brandData.map(
                                                (item, i) => (
                                                  <option
                                                    key={i}
                                                    value={item.brandID}
                                                    className="select-category-placeholder"
                                                  >
                                                    {item.brandName}
                                                  </option>
                                                )
                                              )}
                                          </select>
                                        </div>

                                        <div className="pop-over-div">
                                          <label className="reports-to reports-dis">
                                            Category
                                          </label>
                                          <Select
                                            showSearch={true}
                                            value={this.state.list1Value}
                                            style={{ width: "100%" }}
                                            onChange={this.handleCategoryChange}
                                          >
                                            {list1SelectOptions}
                                            <Option value={NEW_ITEM}>
                                              <span className="sweetAlert-inCategory">
                                                + ADD NEW
                                              </span>
                                            </Option>
                                          </Select>

                                          <SweetAlert
                                            show={this.state.showList1}
                                            style={{ width: "320px" }}
                                            title="Add New Category"
                                            text="Enter new Category"
                                            showCancelButton
                                            type="input"
                                            inputPlaceholder="Enter Category Name"
                                            animation="slide-from-top"
                                            validationMsg="Please enter a category!"
                                            onConfirm={inputValue => {
                                              debugger;
                                              inputValue = inputValue.trim();
                                              if (inputValue !== "") {
                                                this.setState({
                                                  showList1: false,
                                                  list1Value: inputValue
                                                });
                                                this.handleAddCategory(
                                                  inputValue
                                                );
                                              } else {
                                                this.setState({
                                                  showList1: false,
                                                  list1Value: inputValue
                                                });
                                              }
                                            }}
                                            onCancel={() => {
                                              this.setState({
                                                showList1: false
                                              });
                                            }}
                                            onEscapeKey={() =>
                                              this.setState({
                                                showList1: false
                                              })
                                            }
                                            onOutsideClick={() =>
                                              this.setState({
                                                showList1: false
                                              })
                                            }
                                          />
                                        </div>
                                        <div className="pop-over-div">
                                          <label className="edit-label-1">
                                            Sub-Category
                                          </label>
                                          <select
                                            id="inputStatus"
                                            className="edit-dropDwon dropdown-setting"
                                          >
                                            <option>Bata</option>
                                            <option>Bata1</option>
                                            <option>Bata3</option>
                                          </select>
                                        </div>
                                        <div className="pop-over-div">
                                          <label className="edit-label-1">
                                            Issue Type
                                          </label>
                                          <select
                                            id="inputStatus"
                                            className="edit-dropDwon dropdown-setting"
                                          >
                                            <option>Bata</option>
                                            <option>Bata1</option>
                                            <option>Bata3</option>
                                          </select>
                                        </div>
                                        <div className="pop-over-div">
                                          <label className="edit-label-1">
                                            Status
                                          </label>
                                          <select
                                            id="inputStatus"
                                            className="edit-dropDwon dropdown-setting"
                                          >
                                            <option>Active</option>
                                            <option>Inactive</option>
                                          </select>
                                        </div>
                                        <br />
                                        <div>
                                          <a
                                            className="pop-over-cancle"
                                            href={Demo.BLANK_LINK}
                                            style={{ marginRight: "20px" }}
                                          >
                                            CANCEL
                                          </a>
                                          <button className="pop-over-button">
                                            SAVE
                                          </button>
                                        </div>
                                      </div>
                                    }
                                    placement="bottom"
                                    trigger="click"
                                  >
                                    <button className="react-tabel-button">
                                      EDIT
                                    </button>
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
                )}
              </div>
              <div className="col-md-4">
                <div className="store-col-2">
                  <div className="createSpace cus-cs">
                    <label className="Create-store-text">CREATE CATEGORY</label>
                    <div className="divSpace">
                      <div className="dropDrownSpace">
                        <label className="reports-to">Brand Name</label>
                        <select
                          className="store-create-select"
                          value={this.state.selectBrand}
                          onChange={this.handleBrandChange}
                        >
                          <option>Select</option>
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
                      </div>
                    </div>
                    <div className="divSpace">
                       <div className="dropDrownSpace">
                        <label className="reports-to reports-dis">
                          Category
                        </label>
                        <Select
                          showSearch={true}
                          value={this.state.list1Value}
                          style={{ width: "100%" }}
                          onChange={this.handleCategoryChange}
                        >
                          {list1SelectOptions}
                          <Option value={NEW_ITEM}>
                            <span className="sweetAlert-inCategory">
                              + ADD NEW
                            </span>
                          </Option>
                        </Select>

                        <SweetAlert
                          show={this.state.showList1}
                          style={{ width: "320px" }}
                          title="Add New Category"
                          text="Enter new Category"
                          showCancelButton
                          type="input"
                          inputPlaceholder="Enter Category Name"
                          animation="slide-from-top"
                          validationMsg="Please enter a category!"
                          onConfirm={inputValue => {
                            debugger;
                            inputValue = inputValue.trim();
                            if (inputValue !== "") {
                              this.setState({
                                showList1: false,
                                list1Value: inputValue
                              });
                              this.handleAddCategory(inputValue);
                            } else {
                              this.setState({
                                showList1: false,
                                list1Value: inputValue
                              });
                            }
                          }}
                          onCancel={() => {
                            this.setState({ showList1: false});
                          }}
                          onEscapeKey={() =>
                            this.setState({ showList1: false})
                          }
                          onOutsideClick={() =>
                            this.setState({ showList1: false})
                          }
                        />
                      </div>
                    </div>
                    <div className="divSpace">
                      <div className="dropDrownSpace">
                        <label className="reports-to reports-dis">
                          Sub Category
                        </label>
                        <Select
                          showSearch={true}
                          value={this.state.ListOfSubCate}
                          style={{ width: "100%" }}
                          onChange={this.handleSubCatOnChange}
                        >
                          {listSubCategory}
                          <Option value={NEW_ITEM}>
                            <span className="sweetAlert-inCategory">
                              + ADD NEW
                            </span>
                          </Option>
                        </Select>

                        <SweetAlert
                          show={this.state.ShowSubCate}
                          style={{ width: "320px" }}
                          title="Add New Sub Category"
                          text="Enter new Category"
                          showCancelButton
                          type="input"
                          inputPlaceholder="Enter Category Name"
                          animation="slide-from-top"
                          validationMsg="Please enter a category!"
                          onConfirm={inputValue => {
                            debugger;
                            inputValue = inputValue.trim();
                            if (inputValue !== "") {
                              this.setState({
                                ShowSubCate: false,
                                ListOfSubCate: inputValue
                              });
                              this.handleAddSubCategory(inputValue);
                            } else {
                              this.setState({
                                ShowSubCate: false,
                                ListOfSubCate: inputValue
                              });
                            }
                          }}
                          onCancel={() => {
                            this.setState({ ShowSubCate: false });
                          }}
                          onEscapeKey={() =>
                            this.setState({ ShowSubCate: false })
                          }
                          onOutsideClick={() =>
                            this.setState({ ShowSubCate: false })
                          }
                        />
                      </div>
                    </div>
                    <div className="divSpace">
                      <div className="dropDrownSpace">
                        <label className="reports-to">Issue Type</label>
                        <Select
                          showSearch={true}
                          value={this.state.ListOfIssue}
                          style={{ width: "100%" }}
                          onChange={this.handleIssueOnChange}
                        >
                          {listOfIssueType}
                          <Option value={NEW_ITEM}>
                            <span className="sweetAlert-inCategory">
                              + ADD NEW
                            </span>
                          </Option>
                        </Select>
                        <SweetAlert
                          show={this.state.ShowIssuetype}
                          style={{ width: "320px" }}
                          title="Add New Issue type"
                          text="Enter new Issue Type"
                          showCancelButton
                          type="input"
                          inputPlaceholder="Enter Issue Type"
                          animation="slide-from-top"
                          validationMsg="Please Enter Issue Type!"
                          onConfirm={inputValue => {
                            inputValue = inputValue.trim();
                            if (inputValue !== "") {
                              this.setState({
                                ShowIssuetype: false,
                                ListOfIssue: inputValue
                              });
                              this.handleAddIssueType(inputValue);
                            } else {
                              this.setState({
                                ShowIssuetype: false,
                                ListOfIssue: inputValue
                              });
                            }
                          }}
                          onCancel={() => {
                            this.setState({ ShowIssuetype: false });
                          }}
                          onEscapeKey={() =>
                            this.setState({ ShowIssuetype: false })
                          }
                          onOutsideClick={() =>
                            this.setState({ ShowIssuetype: false })
                          }
                        />
                      </div>
                    </div>
                    <div className="divSpace">
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
                      </div>
                    </div>
                    <div className="btnSpace">
                      <button
                        className="addBtn-ticket-hierarchy"
                        type="button"
                        onClick={this.handleSubmitData.bind(this)}
                      >
                        ADD
                      </button>
                    </div>
                    <br />
                  </div>
                </div>
                <br />
                <div className="store-col-2">
                  <div className="right-sect-div">
                    <br />
                    <h3>Bulk Upload</h3>
                    <div className="down-excel">
                      <p>Template</p>
                      <CSVLink
                        filename={"Category.csv"}
                        data={config.categoryTemplate}
                      >
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
      </React.Fragment>
    );
  }
}

export default CategoryMaster;
