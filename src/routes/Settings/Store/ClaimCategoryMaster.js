import React, { Component } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import TableArr from "./../../../assets/Images/table-arr.png";
import RedDeleteIcon from "./../../../assets/Images/red-delete-icon.png";
// import BlackDeleteIcon from "./../../../assets/Images/del-big.png";
// import UploadIcon from "./../../assets/Images/clip.png";
import BlackInfoIcon from "./../../../assets/Images/Info-black.png";
import { UncontrolledPopover, PopoverBody } from "reactstrap";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import ReactTable from "react-table";
import Demo from "./../../../store/Hashtag";
import DelBigIcon from "./../../../assets/Images/del-big.png";
import FileUpload from "./../../../assets/Images/file.png";
import DelBlack from "./../../../assets/Images/del-black.png";
import UploadCancel from "./../../../assets/Images/upload-cancel.png";
import { ProgressBar } from "react-bootstrap";
import { Select, Popover } from "antd";
import SweetAlert from "react-bootstrap-sweetalert";
// import Dropzone from "react-dropzone";
import {
  NotificationContainer,
  // NotificationManager
} from "react-notifications";
import axios from "axios";
import config from "./../../../helpers/config";
import { authHeader } from "../../../helpers/authHeader";

const { Option } = Select;
const NEW_ITEM = "NEW_ITEM";

class ClaimCategoryMaster extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fileName: "",
      catmulti: false,
      list1Value: "",
      showList1: false,
      ListOfSubCate: "",
      ShowSubCate: false,
      brandData: [],
      brandId: 0,
      categoryId: 0,
      subCategoryId: 0,
      IssueTypeId: 0,
      isbrandValid: "",
      claimCategoryData: [],
      categoryData: [],
      subCategoryData: [],
      issueTypeData: []
    };
  }
  componentDidMount() {
    this.handleGetBrandList();
    this.handleGetClaimCategoryList();
  }

  HandleMultiSelect() {
    this.setState({ catmulti: true });
  }
  fileUpload = e => {
    this.setState({ fileName: e.target.files[0].name });
  };
  onChangeList1 = value => {
    if (value !== NEW_ITEM) {
      this.setState({ list1Value: value });
    } else {
      this.setState({ showList1: true });
    }
  };
  onConfirm = inputValue => {
    inputValue = inputValue.trim();
    if (this.state.listOfCategory.includes(inputValue)) {
      this.setState({
        showList1: false,
        list1Value: inputValue
      });
    } else {
      this.setState({
        showList1: false,
        listOfCategory: [inputValue, ...this.state.listOfCategory],
        list1Value: inputValue
      });
    }
  };
  onConfirm = inputValue => {
    inputValue = inputValue.trim();
    if (this.state.listOfSubCategory.includes(inputValue)) {
      this.setState({
        ShowSubCate: false,
        ListOfSubCate: inputValue
      });
    } else {
      this.setState({
        ShowSubCate: false,
        listOfSubCategory: [inputValue, ...this.state.listOfSubCategory],
        ListOfSubCate: inputValue
      });
    }
  };
  onChangeListSubCate = value => {
    if (value !== NEW_ITEM) {
      this.setState({ ListOfSubCate: value });
    } else {
      this.setState({ ShowSubCate: true });
    }
  };
  handleBrandChange = async e => {
    debugger;
    if (e.target.value !== "select") {
      await this.setState({
        brandId: Number(e.target.value)
      });
      this.handleGetCategoryByBrandId();
    } else {
      this.setState({ isbrandValid: "Please Select Brand." });
    }
  };
  // --------------------------------------API-----------------------------------
  ////handle get cliam category listing
  handleGetClaimCategoryList() {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/Category/GetClaimCategoryList",
      headers: authHeader()
    }).then(response => {
        debugger;
        var claimCategoryData = response.data.responseData;
        var status = response.data.status;
        if (status && claimCategoryData.length > 0) {
          self.setState({ claimCategoryData });
        }
      })
      .catch(response => {
        console.log(response, "-----Claim Category List");
      });
  }
  ////handle get brand listing
  handleGetBrandList() {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/Brand/GetBrandList",
      headers: authHeader()
    }).then(response => {
        var brandData = response.data.responseData;
        var status = response.data.status;
        if (status && brandData.length > 0) {
          self.setState({ brandData });
        }
      })
      .catch(response => {
        console.log(response, "-----Get Brand List");
      });
  }
  ///handle get category listing by brand id
  handleGetCategoryByBrandId() {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/Category/GetClaimCategoryListByBrandID",
      headers: authHeader(),
      params: {
        BrandID: this.state.brandId
      }
    }).then(response => {
        var categoryData = response.data.responseData;
        var status = response.data.status;
        if (status && categoryData.length > 0) {
          self.setState({ categoryData });
        }
      })
      .catch(response => {
        console.log(response, "-----Get Category List");
      });
  }
  ///handle get sub category listing by category id
  handleGetSubCategoryByCateId() {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/Category/BulkUploadItem",
      headers: authHeader(),
      params: {
        BrandID: this.state.categoryId
      }
    }).then(response => {
        var subCategoryData = response.data.responseData;
        var status = response.data.status;
        if (status && subCategoryData.length > 0) {
          self.setState({ subCategoryData });
        }
      })
      .catch(response => {
        console.log(response, "-----get sub category list");
      });
  }
  ///handle get issue type listing by sub category id
  handleGetCategoryByBrandId() {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/Category/BulkUploadItem",
      headers: authHeader(),
      params: {
        BrandID: this.state.subCategoryId
      }
    }).then(response => {
        var issueTypeData = response.data.responseData;
        var status = response.data.status;
        if (status && issueTypeData.length > 0) {
          self.setState({ issueTypeData });
        }
      })
      .catch(response => {
        console.log(response, "-----get issue type list");
      });
  }
  ////handle add cateogry by brand id and category name
  handleAddCategoryByBrandId(categoryName) {
    let self = this; 
    axios({
      method: "post",
      url: config.apiUrl + "/Category/AddClaimCategory ",
      headers: authHeader(),
      params: {
        BrandID: this.state.brandId,
        CategoryName: categoryName
      }
    }).then(response => {
        var issueTypeData = response.data.responseData;
        var status = response.data.status;
        if (status && issueTypeData.length > 0) {
          self.setState({ issueTypeData });
        }
      })
      .catch(response => {
        console.log(response, "-----add category");
      });
  }
  ///handle add sub category by category id and sub category name
  handleAddSubCategoryByCateId(subCateName) {
    let self = this; 
    axios({
      method: "post",
      url: config.apiUrl + "/Category/BulkUploadItem",
      headers: authHeader(),
      params: {
        BrandID: this.state.categoryId,
        CategoryName: subCateName
      }
    }).then(response => {
        var issueTypeData = response.data.responseData;
        var status = response.data.status;
        if (status && issueTypeData.length > 0) {
          self.setState({ issueTypeData });
        }
      })
      .catch(response => {
        console.log(response, "-----add sub category");
      });
  }

  handleAddSubCategoryByCateId(issueTypeName) {
    let self = this;

   axios({
      method: "post",
      url: config.apiUrl + "/Category/BulkUploadItem",
      headers: authHeader(),
      params: {
        BrandID: this.state.subCategoryId,
        CategoryName: issueTypeName
      }
    }).then(response => {
        var issueTypeData = response.data.responseData;
        var status = response.data.status;
        if (status && issueTypeData.length > 0) {
          self.setState({ issueTypeData });
        }
      })
      .catch(response => {
        console.log(response, "-----add issue Type");
      });
  }
  render() {
    const { list1Value, ListOfSubCate } = this.state;

    // const list1SelectOptions = this.state.listOfCategory.map(o => (
    //   <Option key={o}>{o}</Option>
    // ));
    // const listSubCategory = this.state.listOfSubCategory.map(o => (
    //   <Option key={o}>{o}</Option>
    // ));

    const columns = [
      {
        Header: (
          <span className="table-column">
            Brand Name
            <FontAwesomeIcon icon={faCaretDown} />
          </span>
        ),
        accessor: "brandName"
      },
      {
        Header: (
          <span className="table-column">
            Claim Category
            <FontAwesomeIcon icon={faCaretDown} />
          </span>
        ),
        accessor: "claimCategory"
      },
      {
        // id: "createdBy",
        Header: (
          <span className="table-column">
            Claim Sub Cat
            <FontAwesomeIcon icon={faCaretDown} />
          </span>
        ),
        accessor: "claimSubCat"
      },
      {
        // id: "createdBy",
        Header: (
          <span className="table-column">
            Claim Issue Type
            <FontAwesomeIcon icon={faCaretDown} />
          </span>
        ),
        Cell: row => {
          var ids = row.original["id"];
          return (
            <div>
              Broken Shoes
              <Popover content={ClaimIssueTyep} placement="bottom">
                <img
                  className="info-icon-cp"
                  src={BlackInfoIcon}
                  alt="info-icon"
                  id={ids}
                />
              </Popover>
            </div>
          );
        }
        // accessor: "claimIssueType"
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
                  <button
                    className="react-tabel-button editre"
                    id="p-edit-pop-2"
                  >
                    EDIT
                  </button>
                </Popover>
              </span>
            </>
          );
        }
      }
    ];
    const ClaimIssueTyep = (
      <div className="claim-padding">
        <b>
          <p className="title">Claim Issue type: Active</p>
        </b>
        <p className="sub-title">Broken Shoes</p>
      </div>
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
          <label className="popover-header-text">EDIT CLAIM CATEGORY</label>
        </div>
        <div className=" pop-over-div">
          <label className="pop-over-lbl-text">Brand Name</label>
          <select className="pop-over-select">
            <option>Bata</option>
          </select>
        </div>
        <div className=" pop-over-div">
          <label className="pop-over-lbl-text">Claim Category</label>
          <select className="pop-over-select">
            <option>Exchange</option>
          </select>
        </div>
        <div className=" pop-over-div">
          <label className="pop-over-lbl-text">Claim Sub Category</label>
          <select className="pop-over-select">
            <option>Defective Article</option>
          </select>
        </div>
        <div className=" pop-over-div">
          <label className="pop-over-lbl-text">Claim Issue Type</label>
          <select className="pop-over-select">
            <option>Broken Shoes</option>
          </select>
        </div>

        <div className="pop-over-div">
          <label className="pop-over-lbl-text">Status</label>
          <select className="pop-over-select">
            <option>Active</option>
            <option>Inactive</option>
          </select>
        </div>
        <br />
        <div>
          <a className="pop-over-cancle" href={Demo.BLANK_LINK}>
            CANCEL
          </a>
          <button className="pop-over-button">SAVE</button>
        </div>
      </div>
    );
    return (
      <React.Fragment>
        <NotificationContainer />
        <div className="container-fluid setting-title setting-breadcrumb">
          <Link to="/admin/settings" className="header-path">
            Settings
          </Link>
          <span>&gt;</span>
          <Link to={Demo.BLANK_LINK} className="header-path">
            Store
          </Link>
          <span>&gt;</span>
          <Link to={Demo.BLANK_LINK} className="active header-path">
            Claim Category Master
          </Link>
        </div>
        <div className="container-fluid">
          <div className="store-settings-cntr">
            <div className="row">
              <div className="col-md-8">
                <div className="table-cntr table-height claim-tableData">
                  <ReactTable
                    data={this.state.claimCategoryData}
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
                <div className="store-col-2">
                  <div className="createSpace">
                    <label className="Create-store-text">
                      CREATE CLAIM CATEGORY
                    </label>
                    <div className="dropDrownSpace">
                      <label className="reports-to">Brand Name</label>
                      <select
                        id="inputState"
                        className="store-create-select"
                        onChange={this.handleBrandChange}
                      >
                        <option value="select">Select</option>
                        {this.state.brandData !== null &&
                          this.state.brandData.map((item, i) => (
                            <option
                              key={i}
                              value={Number(item.brandID)}
                              className="select-category-placeholder"
                            >
                              {item.brandName}
                            </option>
                          ))}
                      </select>
                      {this.state.isbrandValid ? (
                        <p style={{ color: "red", marginBottom: "0px" }}>
                          {this.state.brandCompulsion}
                        </p>
                      ) : null}
                    </div>
                    <div className="dropDrownSpace">
                      <label className="reports-to reports-dis">
                        Claim Category
                      </label>
                      <Select
                        showSearch={true}
                        value={list1Value}
                        style={{ width: "100%" }}
                        onChange={this.onChangeList1}
                      >
                        {/* {list1SelectOptions} */}
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
                          inputValue = inputValue.trim();
                          if (this.state.listOfCategory.includes(inputValue)) {
                            this.setState({
                              showList1: false,
                              list1Value: inputValue
                            });
                          } else {
                            this.setState({
                              showList1: false,
                              listOfCategory: [
                                inputValue,
                                ...this.state.listOfCategory
                              ],
                              list1Value: inputValue
                            });
                          }
                        }}
                        onCancel={() => {
                          this.setState({ showList1: false });
                        }}
                        onEscapeKey={() => this.setState({ showList1: false })}
                        onOutsideClick={() =>
                          this.setState({ showList1: false })
                        }
                      />
                    </div>

                    <div className="dropDrownSpace">
                      <label className="reports-to reports-dis">
                        Claim Sub Category
                      </label>
                      <Select
                        showSearch={true}
                        value={ListOfSubCate}
                        style={{ width: "100%" }}
                        onChange={this.onChangeListSubCate}
                      >
                        {/* {listSubCategory} */}
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
                          inputValue = inputValue.trim();
                          if (
                            this.state.listOfSubCategory.includes(inputValue)
                          ) {
                            this.setState({
                              ShowSubCate: false,
                              ListOfSubCate: inputValue
                            });
                          } else {
                            this.setState({
                              ShowSubCate: false,
                              listOfSubCategory: [
                                inputValue,
                                ...this.state.listOfSubCategory
                              ],
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
                    <div className="dropDrownSpace">
                      <label className="reports-to">Claim Issue Type</label>
                      <select id="inputState" className="store-create-select">
                        <option>Broken Shoes</option>
                      </select>
                    </div>
                    <div className="divSpace-3">
                      <div className="dropDrownSpace">
                        <label className="reports-to">Status</label>
                        <select className="store-create-select">
                          <option>Active</option>
                          <option>Inactive</option>
                        </select>
                      </div>
                    </div>
                    <div className="btnSpace">
                      <button className="addBtn-ticket-hierarchy">ADD</button>
                    </div>
                  </div>
                </div>
                <br />
                <div className="store-col-2">
                  <div className="right-sect-div">
                    <br />
                    <h3>Bulk Upload</h3>
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

export default ClaimCategoryMaster;