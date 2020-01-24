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
import ReactTable from "react-table";
import {
  NotificationContainer,
  NotificationManager
} from "react-notifications";
import { authHeader } from "../../../helpers/authHeader";
import config from "../../../helpers/config";
import axios from "axios";
const { Option } = Select;
const NEW_ITEM = "NEW_ITEM";

// const Option = Select.Option;

class CategoryMaster extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fileName: "",
      catmulti: false,
      listOfCategory: [
        "Complaint 1",
        "Complaint 2",
        "Complaint 3",
        "Complaint 4"
      ],
      listOfSubCategory: [
        "Complaint 1",
        "Complaint 2",
        "Complaint 3",
        "Complaint 4"
      ],
      listOfIssueType: [
        "IssueType 1",
        "IssueType 2",
        "IssueType 3",
        "IssueType 4"
      ],
      list1Value: "",
      showList1: false,
      ListOfSubCate: "",
      ListOfIssue: "",
      ShowSubCate: false,
      loading: false,
      categoryGridData: []
    };
    this.handleGetCategoryGridData = this.handleGetCategoryGridData.bind(this);
  }
  componentDidMount() {
    this.handleGetCategoryGridData();
  }
  handleGetCategoryGridData() {
    let self = this;
    this.setState({ loading: true });
    axios({
      method: "post",
      url: config.apiUrl + "/Category/ListCategorybrandmapping",
      headers: authHeader()
    }).then(function(res) {
      debugger;
      let status = res.data.message;
      let data = res.data.responseData;
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
  handleDeleteCategoryData(category_Id){
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
  onConfirm = inputValue => {
    inputValue = inputValue.trim();
    if (this.state.listOfIssueType.includes(inputValue)) {
      this.setState({
        ShowSubCate: false,
        ListOfIssue: inputValue
      });
    } else {
      this.setState({
        ShowSubCate: false,
        listOfIssueType: [inputValue, ...this.state.listOfIssueType],
        ListOfIssue: inputValue
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
  onChangeIssue = value => {
    if (value !== NEW_ITEM) {
      this.setState({ ListOfIssue: value });
    } else {
      this.setState({ ShowSubCate: true });
    }
  };
  render() {
    const ActionEditBtn = (
      <div className="edtpadding">
        <div className="">
          <label className="popover-header-text">EDIT CATEGORY</label>
        </div>
        <div className="pop-over-div">
          <label className="edit-label-1">Brand Name</label>
          <select id="inputStatus" className="edit-dropDwon dropdown-setting">
            <option>Bata</option>
            <option>Bata1</option>
            <option>Bata3</option>
          </select>
        </div>

        <div className="pop-over-div">
          <label className="edit-label-1">Category</label>
          <select id="inputStatus" className="edit-dropDwon dropdown-setting">
            <option>Bata</option>
            <option>Bata1</option>
            <option>Bata3</option>
          </select>
        </div>
        <div className="pop-over-div">
          <label className="edit-label-1">Sub-Category</label>
          <select id="inputStatus" className="edit-dropDwon dropdown-setting">
            <option>Bata</option>
            <option>Bata1</option>
            <option>Bata3</option>
          </select>
        </div>
        <div className="pop-over-div">
          <label className="edit-label-1">Issue Type</label>
          <select id="inputStatus" className="edit-dropDwon dropdown-setting">
            <option>Bata</option>
            <option>Bata1</option>
            <option>Bata3</option>
          </select>
        </div>
        <div className="pop-over-div">
          <label className="edit-label-1">Status</label>
          <select id="inputStatus" className="edit-dropDwon dropdown-setting">
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
            <label className="pop-over-btnsave-text">SAVE</label>
          </button>
        </div>
      </div>
    );

    const {
      list1Value,
      ListOfSubCate,
      ListOfIssue,
      categoryGridData
    } = this.state;
    const list1SelectOptions = this.state.listOfCategory.map(o => (
      <Option key={o}>{o}</Option>
    ));
    const listSubCategory = this.state.listOfSubCategory.map(o => (
      <Option key={o}>{o}</Option>
    ));
    const listOfIssueType = this.state.listOfIssueType.map(o => (
      <Option key={o}>{o}</Option>
    ));
    return (
      <React.Fragment>
        <NotificationContainer />
        <div className="container-fluid setting-title setting-breadcrumb">
          <Link to="settings" className="header-path">
            Settings
          </Link>
          <span>&gt;</span>
          <Link to={Demo.BLANK_LINK} className="header-path">
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
                                            <button className="butn" type="button" onClick={this.handleDeleteCategoryData.bind(this,ids)}>
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
                                    content={ActionEditBtn}
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
                  <div className="createSpace">
                    <label className="Create-store-text">CREATE CATEGORY</label>
                    <div className="divSpace">
                      <div className="dropDrownSpace">
                        <label className="reports-to"> Brand Name</label>
                        <select
                          id="inputState"
                          className="form-control dropdown-setting"
                        >
                          <option>Bata</option>
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
                          value={list1Value}
                          style={{ width: "100%" }}
                          onChange={this.onChangeList1}
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
                            inputValue = inputValue.trim();
                            if (
                              this.state.listOfCategory.includes(inputValue)
                            ) {
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
                          value={ListOfSubCate}
                          style={{ width: "100%" }}
                          onChange={this.onChangeListSubCate}
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
                    </div>
                    <div className="divSpace">
                      <div className="dropDrownSpace">
                        <label className="reports-to">Issue Type</label>
                        <Select
                          showSearch={true}
                          value={ListOfIssue}
                          style={{ width: "100%" }}
                          onChange={this.onChangeIssue}
                        >
                          {listOfIssueType}
                          <Option value={NEW_ITEM}>
                            <span className="sweetAlert-inCategory">
                              + ADD NEW
                            </span>
                          </Option>
                        </Select>
                        <SweetAlert
                          show={this.state.ShowSubCate}
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
                            if (
                              this.state.listOfIssueType.includes(inputValue)
                            ) {
                              this.setState({
                                ShowSubCate: false,
                                ListOfIssue: inputValue
                              });
                            } else {
                              this.setState({
                                ShowSubCate: false,
                                listOfIssueType: [
                                  inputValue,
                                  ...this.state.listOfIssueType
                                ],
                                ListOfIssue: inputValue
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
                        <label className="reports-to">Status</label>
                        <select
                          id="inputState"
                          className="form-control dropdown-setting"
                        >
                          <option>Active</option>
                          <option>Inactive</option>
                        </select>
                      </div>
                    </div>
                    <div className="btnSpace">
                      <button className="addBtn-ticket-hierarchy">
                        <label className="addLable">ADD</label>
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
