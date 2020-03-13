import React, { Component, useState } from "react";
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
import Modal from "react-responsive-modal";
import Sorting from "./../../../assets/Images/sorting.png";
const { Option } = Select;
const NEW_ITEM = "NEW_ITEM";

// const Option = Select.Option;

// const MyButton = props => {
//   const { children } = props;
//   return (
//     <div style={{ cursor: "pointer" }} {...props}>
//       <button className="react-tabel-button" id="p-edit-pop-2">
//         <label className="Table-action-edit-button-text">{children}</label>
//       </button>
//     </div>
//   );
// };

// const Content = props => {
//   debugger;
//   const { rowData } = props;
//   // const [roleName, setRoleNameValue] = useState(rowData.roleName);
//   // const [status, setStatusValue] = useState(rowData.isRoleActive);
//   const [selectBrand, changeBrandDropdown] = useState(rowData.braindID);

//   // props.callBackEdit(roleName, status, rowData);

//   return (
//     <div>
//       <div className="edtpadding">
//         <label className="popover-header-text">EDIT CATEGORY</label>
//         <div className="pop-over-div">
//           <label className="edit-label-1">Brand Name</label>
//           <select
//             className="store-create-select"
//             value={selectBrand}
//             onChange={props.handleBrandChange}
//             name="selectBrand"
//           >
//             <option>Select</option>
//             {props.brandData !== null &&
//               props.brandData.map((item, i) => (
//                 <option
//                   key={i}
//                   value={item.brandID}
//                   className="select-category-placeholder"
//                 >
//                   {item.brandName}
//                 </option>
//               ))}
//           </select>
//         </div>

//         <div className="pop-over-div">
//           <label className="edit-label-1">Category</label>
//           <Select
//             showSearch={true}
//             // value={props.list1Value}
//             style={{ width: "100%" }}
//             // onChange={this.handleCategoryChange}
//           >
//             {props.list1SelectOptions}
//             <Option value={NEW_ITEM}>
//               <span className="sweetAlert-inCategory">+ ADD NEW</span>
//             </Option>
//           </Select>
//         </div>
//         <div className="pop-over-div">
//           <label className="edit-label-1">Sub Category</label>
//           <Select
//             showSearch={true}
//             // value={props.list1Value}
//             style={{ width: "100%" }}
//             // onChange={this.handleCategoryChange}
//           >
//             {props.list1SelectOptions}
//             <Option value={NEW_ITEM}>
//               <span className="sweetAlert-inCategory">+ ADD NEW</span>
//             </Option>
//           </Select>
//         </div>
//         <div className="pop-over-div">
//           <label className="edit-label-1">Issue Type</label>
//           <select id="inputStatus" className="edit-dropDwon dropdown-setting">
//             <option>Bata</option>
//             <option>Bata1</option>
//             <option>Bata3</option>
//           </select>
//         </div>
//         <div className="pop-over-div">
//           <label className="edit-label-1">Status</label>
//           <select id="inputStatus" className="edit-dropDwon dropdown-setting">
//             <option>Active</option>
//             <option>Inactive</option>
//           </select>
//         </div>
//         <br />
//         <div>
//           <a
//             className="pop-over-cancle"
//             href={Demo.BLANK_LINK}
//             style={{ marginRight: "20px" }}
//           >
//             CANCEL
//           </a>
//           <button className="pop-over-button">SAVE</button>
//         </div>
//       </div>
//     </div>
//   );
// };
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
      selectetedParameters: {},
      brandCompulsion: "",
      categoryCompulsion: "",
      subcategoryCompulsion: "",
      issueCompulsion: "",
      statusCompulsion: "",
      StatusModel: false,
      sortColumn: "",
      sortAllData: [],
      sortBrandName: [],
      sortCategory: [],
      sortSubCategory: [],
      sortIssueType: [],
      editmodel: false,
      editCategory: {}
    };
    this.handleGetCategoryGridData = this.handleGetCategoryGridData.bind(this);
    this.handleGetBrandList = this.handleGetBrandList.bind(this);
    this.handleGetCategoryList = this.handleGetCategoryList.bind(this);
    this.handleGetSubCategoryList = this.handleGetSubCategoryList.bind(this);
    this.handleAddCategory = this.handleAddCategory.bind(this);
    this.handleAddSubCategory = this.handleAddSubCategory.bind(this);
    this.handleAddIssueType = this.handleAddIssueType.bind(this);
    this.handleGetIssueTypeList = this.handleGetIssueTypeList.bind(this);
    this.StatusOpenModel = this.StatusOpenModel.bind(this);
    this.StatusCloseModel = this.StatusCloseModel.bind(this);
    this.toggleEditModal = this.toggleEditModal.bind(this);
  }
  componentDidMount() {
    this.handleGetCategoryGridData();
    this.handleGetBrandList();
  }
  sortStatusAtoZ() {
    debugger;
    var itemsArray = [];
    itemsArray = this.state.categoryGridData;

    itemsArray.sort(function(a, b) {
      return a.ticketStatus > b.ticketStatus ? 1 : -1;
    });

    this.setState({
      categoryGridData: itemsArray
    });
    this.StatusCloseModel();
  }
  sortStatusZtoA() {
    debugger;
    var itemsArray = [];
    itemsArray = this.state.categoryGridData;
    itemsArray.sort((a, b) => {
      return a.ticketStatus < b.ticketStatus;
    });
    this.setState({
      categoryGridData: itemsArray
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
    if (column === "all") {
      itemsArray = this.state.sortAllData;
    } else if (column === "brandName") {
      this.state.categoryGridData = this.state.sortAllData;
      itemsArray = this.state.categoryGridData.filter(
        a => a.brandName === data
      );
    } else if (column === "categoryName") {
      this.state.categoryGridData = this.state.sortAllData;
      itemsArray = this.state.categoryGridData.filter(
        a => a.categoryName === data
      );
    } else if (column === "subCategoryName") {
      this.state.categoryGridData = this.state.sortAllData;
      itemsArray = this.state.categoryGridData.filter(
        a => a.subCategoryName === data
      );
    } else if (column === "issueTypeName") {
      this.state.categoryGridData = this.state.sortAllData;
      itemsArray = this.state.categoryGridData.filter(
        a => a.issueTypeName === data
      );
    }

    this.setState({
      categoryGridData: itemsArray
    });
    this.StatusCloseModel();
  };
  handleGetCategoryGridData() {
    debugger;
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

      if (data !== null) {
        self.state.sortAllData = data;
        var unique = [];
        var distinct = [];
        for (let i = 0; i < data.length; i++) {
          if (!unique[data[i].brandName]) {
            distinct.push(data[i].brandName);
            unique[data[i].brandName] = 1;
          }
        }
        for (let i = 0; i < distinct.length; i++) {
          self.state.sortBrandName.push({ brandName: distinct[i] });
        }

        var unique = [];
        var distinct = [];
        for (let i = 0; i < data.length; i++) {
          if (!unique[data[i].categoryName]) {
            distinct.push(data[i].categoryName);
            unique[data[i].categoryName] = 1;
          }
        }
        for (let i = 0; i < distinct.length; i++) {
          self.state.sortCategory.push({ categoryName: distinct[i] });
        }

        var unique = [];
        var distinct = [];
        for (let i = 0; i < data.length; i++) {
          if (!unique[data[i].subCategoryName]) {
            distinct.push(data[i].subCategoryName);
            unique[data[i].subCategoryName] = 1;
          }
        }
        for (let i = 0; i < distinct.length; i++) {
          self.state.sortSubCategory.push({ subCategoryName: distinct[i] });
        }

        var unique = [];
        var distinct = [];
        for (let i = 0; i < data.length; i++) {
          if (!unique[data[i].issueTypeName]) {
            distinct.push(data[i].issueTypeName);
            unique[data[i].issueTypeName] = 1;
          }
        }
        for (let i = 0; i < distinct.length; i++) {
          self.state.sortIssueType.push({ issueTypeName: distinct[i] });
        }
      }

      if (status === "Success") {
        self.setState({
          categoryGridData: data,
          loading: false
        });
      } else {
        self.setState({
          categoryGridData: [],
          loading: false
        });
      }
    }).catch(data => {
      console.log(data);
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
    }).catch(data => {
      console.log(data);
      });
  }

  handleGetCategoryList(id) {
    var braindID;

    if (id) {
      braindID = id;
    } else {
      braindID = this.state.selectBrand;
    }
    debugger;
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/Category/GetCategoryList",
      headers: authHeader(),
      params: {
        BrandID: braindID
      }
    }).then(function(res) {
      debugger;
      // let status=
      let data = res.data;
      self.setState({ categoryDropData: data });
    }).catch(data => {
      console.log(data);
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
    }).catch(data => {
      console.log(data);
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
    }).catch(data => {
      console.log(data);
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
        NotificationManager.success("Category deleted successfully.","",
        2000);
      }
    }).catch(data => {
      console.log(data);
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
        BrandID: this.state.selectBrand
      }
    }).then(function(res) {
      debugger;
      let status = res.data.message;
      let data = res.data.responseData;
      if (status === "Success") {
        NotificationManager.success("Category added successfully.","",
        2000);
        self.setState({
          category_Id: data
          // inputValue: "",
          // list1Value: ""
        });
        self.handleGetCategoryList();
      } else {
        NotificationManager.error("Category not added.");
      }
    }).catch(data => {
      console.log(data);
      });
  }
  handleAddSubCategory(value) {
    debugger;
    let self = this;
    var finalId = 0;
    if (this.state.category_Id === 1) {
      finalId = this.state.list1Value;
    } else {
      finalId = this.state.category_Id;
    }
    axios({
      method: "post",
      url: config.apiUrl + "/SubCategory/AddSubCategory",
      headers: authHeader(),
      params: {
        categoryID: finalId,
        SubcategoryName: value
      }
    }).then(function(res) {
      debugger;
      let status = res.data.message;
      let data = res.data.responseData;
      if (status === "Success") {
        NotificationManager.success("SubCategory added successfully.","",
        2000);
        self.setState({
          subCategory_Id: data
        });
        self.handleGetSubCategoryList();
      } else {
        NotificationManager.error("SubCategory not added.");
      }
    }).catch(data => {
      console.log(data);
      });
  }

  handleAddIssueType(value) {
    debugger;
    let self = this;
    var finalId = 0;
   if (this.state.subCategory_Id === 0) {
      finalId = this.state.ListOfSubCate;
    } else {
      finalId = this.state.subCategory_Id;
    }
    axios({
      method: "post",
      url: config.apiUrl + "/IssueType/AddIssueType",
      headers: authHeader(),
      params: {
        SubcategoryID: finalId,
        IssuetypeName: value
      }
    }).then(function(res) {
      debugger;
      let status = res.data.message;
      let data = res.data.responseData;
      if (status === "Success") {
        NotificationManager.success("Issue Type added successfully.","",
        2000);
        self.setState({
          issueType_Id: data
        });
        self.handleGetIssueTypeList();
      } else {
        NotificationManager.error("Issue Type not added.");
      }
    }).catch(data => {
      console.log(data);
      });
  }

  handleSubmitData() {
    debugger;
    if (
      this.state.selectBrand.length > 0 &&
      (this.state.list1Value > 0 || this.state.list1Value !=="") &&
      (this.state.ListOfSubCate > 0 || this.state.ListOfSubCate !=="") &&
      (this.state.ListOfIssue > 0 || this.state.ListOfIssue !=="") &&
      this.state.selectStatus.length > 0
    ) {
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
          NotificationManager.success("Category added successfully.","",
          2000);
          self.setState({
            selectBrand: 0,
            list1Value: "",
            ListOfSubCate: "",
            ListOfIssue: "",
            selectStatus: 0,
            brandCompulsion: "",
            categoryCompulsion: "",
            subcategoryCompulsion: "",
            issueCompulsion: "",
            statusCompulsion: ""
          });
        }else{
          NotificationManager.error(status,"",
          3000);
        }
      }).catch(data => {
        console.log(data);
        });
    } else {
      this.setState({
        brandCompulsion: "Please Select Brand",
        categoryCompulsion: "Please Select category",
        subcategoryCompulsion: "Please Select SubCategory",
        issueCompulsion: "Please Select IssueType",
        statusCompulsion: "Please Select Status"
      });
    }
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
    debugger
    if (value !== NEW_ITEM) {
      this.setState({ ListOfIssue: value });
    } else {
      this.setState({ ShowIssuetype: true });
    }
  };
  handleBrandChange = e => {
    debugger;
    let value = e.target.value;
    this.setState({
      selectBrand: value,
      categoryDropData: [],
      SubCategoryDropData: [],
      ListOfIssueData: []
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

  callBackEdit = (RoleName, Status, rowData) => {
    debugger;
    // this.setState({RoleName,updateRoleisActive:Status})
    // this.state.RoleName = RoleName;
    // this.state.updateRoleisActive = Status;
    // this.state.rowData = rowData;
  };

  hanldeEditCategory = rowData => {
    debugger;
    var editCategory = {};
    editCategory.brandID = rowData.braindID;
    editCategory.brandName = rowData.brandName;
    this.handleGetCategoryList(rowData.braindID);
    editCategory.categoryID = rowData.categoryID;
    editCategory.categoryName = rowData.categoryName;

    this.handleModalCategoryChange(rowData.categoryID);
    editCategory.subCategoryID = rowData.subCategoryID;
    editCategory.subCategoryName = rowData.subCategoryName;
    this.handleModalSubCatOnChange(rowData.subCategoryID);
    editCategory.issueTypeID = rowData.issueTypeID;
    editCategory.issueTypeName = rowData.issueTypeName;
    editCategory.statusName = rowData.statusName;

    this.setState({ editmodel: true, editCategory });
  };

  toggleEditModal() {
    this.setState({
      editmodel: false,
      categoryDropData: [],
      SubCategoryDropData: [],
      ListOfIssueData: []
    });
  }

  handleModalBrandChange = e => {
    debugger;
    let value = e.target.value;
    var editCategory={};
    editCategory[e.target.name]=value;
    this.setState({
      editCategory,
      categoryDropData: [],
      SubCategoryDropData: [],
      ListOfIssueData: []
    });
    setTimeout(() => {
      if (value) {
        this.handleGetCategoryList(value);
      }
    }, 1);
  };

  handleModalCategoryChange = value => {
    debugger;
    if (value !== NEW_ITEM) {
      var editCategory = this.state.editCategory;
      editCategory["categoryID"] = value;
      this.setState({ editCategory, SubCategoryDropData: [] });
      setTimeout(() => {
        if (value) {
          this.handleGetSubCategoryList();
        }
      }, 1);
    } else {
      this.setState({ showList1: true });
    }
  };
  handleModalSubCatOnChange = value => {
    debugger;
    if (value !== NEW_ITEM) {
      var editCategory = this.state.editCategory;
      editCategory["subCategoryID"] = value;
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
  handleModalIssueOnChange = value => {
    debugger
    if (value !== NEW_ITEM) {
      var editCategory = this.state.editCategory;
      editCategory["issueTypeID"] = value;
      this.setState({ editCategory});
    } else {
      this.setState({ ShowIssuetype: true });
    }
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
        <div className="position-relative d-inline-block">
          <Modal
            onClose={this.StatusCloseModel}
            open={this.state.StatusModel}
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
                {this.state.sortColumn === "brandName"
                  ? this.state.sortBrandName !== null &&
                    this.state.sortBrandName.map((item, i) => (
                      <div className="filter-checkbox">
                        <input
                          type="checkbox"
                          name="filter-type"
                          id={"fil-open" + item.brandName}
                          value={item.brandName}
                          onChange={this.setSortCheckStatus.bind(
                            this,
                            "brandName"
                          )}
                        />
                        <label htmlFor={"fil-open" + item.brandName}>
                          <span className="table-btn table-blue-btn">
                            {item.brandName}
                          </span>
                        </label>
                      </div>
                    ))
                  : null}

                {this.state.sortColumn === "categoryName"
                  ? this.state.sortCategory !== null &&
                    this.state.sortCategory.map((item, i) => (
                      <div className="filter-checkbox">
                        <input
                          type="checkbox"
                          name="filter-type"
                          id={"fil-open" + item.categoryName}
                          value={item.categoryName}
                          onChange={this.setSortCheckStatus.bind(
                            this,
                            "categoryName"
                          )}
                        />
                        <label htmlFor={"fil-open" + item.categoryName}>
                          <span className="table-btn table-blue-btn">
                            {item.categoryName}
                          </span>
                        </label>
                      </div>
                    ))
                  : null}

                {this.state.sortColumn === "subCategoryName"
                  ? this.state.sortSubCategory !== null &&
                    this.state.sortSubCategory.map((item, i) => (
                      <div className="filter-checkbox">
                        <input
                          type="checkbox"
                          name="filter-type"
                          id={"fil-open" + item.subCategoryName}
                          value={item.subCategoryName}
                          onChange={this.setSortCheckStatus.bind(
                            this,
                            "subCategoryName"
                          )}
                        />
                        <label htmlFor={"fil-open" + item.subCategoryName}>
                          <span className="table-btn table-blue-btn">
                            {item.subCategoryName}
                          </span>
                        </label>
                      </div>
                    ))
                  : null}

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
                            <span
                              onClick={this.StatusOpenModel.bind(
                                this,
                                "brandName"
                              )}
                            >
                              Brand Name
                              <FontAwesomeIcon icon={faCaretDown} />
                            </span>
                          ),
                          accessor: "brandName"
                        },
                        {
                          Header: (
                            <span
                              onClick={this.StatusOpenModel.bind(
                                this,
                                "categoryName"
                              )}
                            >
                              Category
                              <FontAwesomeIcon icon={faCaretDown} />
                            </span>
                          ),
                          accessor: "categoryName"
                        },
                        {
                          Header: (
                            <span
                              onClick={this.StatusOpenModel.bind(
                                this,
                                "subCategoryName"
                              )}
                            >
                              Sub Cat
                              <FontAwesomeIcon icon={faCaretDown} />
                            </span>
                          ),
                          accessor: "subCategoryName"
                        },
                        {
                          Header: (
                            <span
                              onClick={this.StatusOpenModel.bind(
                                this,
                                "issueTypeName"
                              )}
                            >
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

                                  <button
                                    className="react-tabel-button ReNewBtn"
                                    type="button"
                                    onClick={this.hanldeEditCategory.bind(
                                      this,
                                      row.original
                                    )}
                                  >
                                    EDIT
                                  </button>
                                  {/* <Popover
                                    content={
                                      <Content
                                        rowData={row.original}
                                        brandData={this.state.brandData}
                                        categoryDropData={
                                          this.state.categoryDropData
                                        }
                                        list1Value={this.state.list1Value}
                                        callBackEdit={this.callBackEdit}
                                        list1SelectOptions={list1SelectOptions}
                                        ShowSubCate={this.state.ShowSubCate}
                                        handleBrandChange={this.handleBrandChange}
                                      />
                                    }
                                    placement="bottom"
                                    trigger="click"
                                  >
                                    <label className="Table-action-edit-button-text">
                                      <MyButton>EDIT</MyButton>
                                    </label>
                                  </Popover> */}
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
                        {this.state.selectBrand === 0 && (
                          <p style={{ color: "red", marginBottom: "0px" }}>
                            {this.state.brandCompulsion}
                          </p>
                        )}
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
                        {this.state.list1Value === "" && (
                          <p style={{ color: "red", marginBottom: "0px" }}>
                            {this.state.categoryCompulsion}
                          </p>
                        )}

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
                            this.setState({ showList1: false });
                          }}
                          onEscapeKey={() =>
                            this.setState({ showList1: false })
                          }
                          onOutsideClick={() =>
                            this.setState({ showList1: false })
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
                        {this.state.ListOfSubCate === "" && (
                          <p style={{ color: "red", marginBottom: "0px" }}>
                            {this.state.subcategoryCompulsion}
                          </p>
                        )}

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
                        {this.state.ListOfIssue === "" && (
                          <p style={{ color: "red", marginBottom: "0px" }}>
                            {this.state.issueCompulsion}
                          </p>
                        )}
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
                        {this.state.selectStatus === 0 && (
                          <p style={{ color: "red", marginBottom: "0px" }}>
                            {this.state.statusCompulsion}
                          </p>
                        )}
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
          <Modal
            open={this.state.editmodel}
            onClose={this.toggleEditModal}
            modalId="categoryEditModal"
          >
            <div className="edtpadding">
              <label className="popover-header-text">EDIT CATEGORY</label>
              <div className="pop-over-div">
                <label className="edit-label-1">Brand Name</label>
                <select
                  className="store-create-select"
                  value={this.state.editCategory.brandID}
                  onChange={this.handleModalBrandChange}
                  name="brandID"
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

              <div className="pop-over-div">
                <div className="divSpace">
                  <div className="dropDrownSpace">
                    <label className="edit-label-1">Category</label>
                    <Select
                      showSearch={true}
                      value={this.state.editCategory.categoryName}
                      style={{ width: "100%" }}
                      onChange={this.handleModalCategoryChange}
                    >
                      {list1SelectOptions}
                      <Option value={NEW_ITEM}>
                        <span className="sweetAlert-inCategory">+ ADD NEW</span>
                      </Option>
                    </Select>
                    {this.state.list1Value === "" && (
                      <p style={{ color: "red", marginBottom: "0px" }}>
                        {this.state.categoryCompulsion}
                      </p>
                    )}

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
                        this.setState({ showList1: false });
                      }}
                      onEscapeKey={() => this.setState({ showList1: false })}
                      onOutsideClick={() => this.setState({ showList1: false })}
                    />
                  </div>
                </div>
              </div>
              <div className="pop-over-div">
                <div className="divSpace">
                  <div className="dropDrownSpace">
                    <label className="edit-label-1">Sub Category</label>
                    <Select
                      showSearch={true}
                      value={this.state.editCategory.subCategoryName}
                      style={{ width: "100%" }}
                      onChange={this.handleModalSubCatOnChange}
                    >
                      {listSubCategory}
                      <Option value={NEW_ITEM}>
                        <span className="sweetAlert-inCategory">+ ADD NEW</span>
                      </Option>
                    </Select>
                    {this.state.ListOfSubCate === "" && (
                      <p style={{ color: "red", marginBottom: "0px" }}>
                        {this.state.subcategoryCompulsion}
                      </p>
                    )}

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
                      onEscapeKey={() => this.setState({ ShowSubCate: false })}
                      onOutsideClick={() =>
                        this.setState({ ShowSubCate: false })
                      }
                    />
                  </div>
                </div>
              </div>
              <div className="pop-over-div">
                <div className="divSpace">
                  <div className="dropDrownSpace">
                    <label className="edit-label-1">Issue Type</label>
                    <Select
                      showSearch={true}
                      value={this.state.editCategory.issueTypeName}
                      style={{ width: "100%" }}
                      onChange={this.handleModalIssueOnChange}
                    >
                      {listOfIssueType}
                      <Option value={NEW_ITEM}>
                        <span className="sweetAlert-inCategory">+ ADD NEW</span>
                      </Option>
                    </Select>
                    {this.state.ListOfIssue === "" && (
                      <p style={{ color: "red", marginBottom: "0px" }}>
                        {this.state.issueCompulsion}
                      </p>
                    )}
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
              </div>
              <div className="pop-over-div">
                <label className="edit-label-1">Status</label>
                <select
                  id="inputStatus"
                  className="edit-dropDwon dropdown-setting"
                  value={this.state.editCategory.statusName}
                  
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
              <br />
              <div className="text-center">
                <a className="pop-over-cancle" onClick={this.toggleEditModal} >
                  CANCEL
                </a>
                <button className="pop-over-button FlNone pop-over-btnsave-text">SAVE</button>
              </div>
            </div>
          </Modal>
        </div>
      </React.Fragment>
    );
  }
}

export default CategoryMaster;
