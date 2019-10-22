import React, { Component } from "react";
import TableArr from "./../../assets/Images/table-arr.png";
import RedDeleteIcon from "./../../assets/Images/red-delete-icon.png";
import BlackDeleteIcon from "./../../assets/Images/del-big.png";
// import UploadIcon from "./../../assets/Images/clip.png";
// import CrossIcon from "./../../assets/Images/cross-icon.png";
import { UncontrolledPopover , PopoverBody } from "reactstrap";
import Demo from "../../store/Hashtag.js";
import DelBigIcon from "./../../assets/Images/del-big.png";
import FileUpload from "./../../assets/Images/file.png";
import DelBlack from "./../../assets/Images/del-black.png";
import UploadCancel from "./../../assets/Images/upload-cancel.png";
import { ProgressBar } from "react-bootstrap";
import {Link} from 'react-router-dom';
import { Select} from "antd";
import SweetAlert from "react-bootstrap-sweetalert";
 
const { Option } = Select;
const NEW_ITEM = "NEW_ITEM";

// const Option = Select.Option;

class CategoryMaster extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fileName: "",
      catmulti:false,
        listOfCategory: ["Complaint 1", "Complaint 2","Complaint 3","Complaint 4"],
        listOfSubCategory: ["Complaint 1", "Complaint 2","Complaint 3","Complaint 4"],
        list1Value: "",
        showList1: false,
        ListOfSubCate:"",
        ShowSubCate:false
      }
  }

  HandleMultiSelect(){
    this.setState({ catmulti: true });
  }
  fileUpload = e => {
    this.setState({ fileName: e.target.files[0].name });
  };
  // addItem = () => {
  //   const { items} = this.state;
  //   this.setState({
  //     items: [...items, `Complaint ${index++}`],
  //   });
  // };
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
  render() {
    const { list1Value,ListOfSubCate } = this.state;
    const editbool = false;
    const tooltipDelay = { show: 50, hide: 100 };
    const list1SelectOptions = this.state.listOfCategory.map(o => (
      <Option key={o}>{o}</Option>
    ));
    const listSubCategory = this.state.listOfSubCategory.map(o => (
      <Option key={o}>{o}</Option>
    ));
    return (
      <React.Fragment>
        <div className="container-fluid setting-title setting-breadcrumb">
          <Link to={Demo.BLANK_LINK}>Settings</Link>
          <span>&gt;</span>
          <Link to={Demo.BLANK_LINK}>Ticketing</Link>
          <span>&gt;</span>
          <Link to={Demo.BLANK_LINK} className="active">
            Category Master
          </Link>
        </div>
        <div className="container-fluid">
          <div className="store-settings-cntr">
            <div className="row">
              <div className="col-md-8">
                <div className="table-cntr table-height category-master">
                  <table>
                    <thead>
                      <tr>
                        <th>
                          Brand Name <img src={TableArr} alt="table-arr" />
                        </th>
                        <th>
                          Category <img src={TableArr} alt="table-arr" />
                        </th>
                        <th>
                          Sub Category <img src={TableArr} alt="table-arr" />
                        </th>
                        <th>
                          Issue Type <img src={TableArr} alt="table-arr" />
                        </th>
                        <th>
                          Status <img src={TableArr} alt="table-arr" />
                        </th>

                        {/* <th></th> */}
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <label className="table-data-text">Bata</label>
                        </td>
                        <td>
                          <label className="table-data-text">Complaint</label>
                        </td>
                        <td>
                          <label className="table-data-text">
                            Defective article
                          </label>
                        </td>
                        <td>
                          <label className="table-data-text">
                            Broken Shoes
                          </label>
                        </td>

                        <td>
                          <label className="table-data-text">Active</label>
                        </td>

                        <td>
                          <div className="row">
                            <div className="del-btn" id="del1">
                              <img src={RedDeleteIcon} alt="del-icon" />
                            </div>
                            <UncontrolledPopover
                              trigger="legacy"
                              placement="bottom"
                              target="del1"
                              className="general-popover delete-popover"
                              delay={tooltipDelay}
                            >
                              <PopoverBody className="d-flex">
                                <div className="del-big-icon">
                                  <img src={BlackDeleteIcon} alt="del-icon" />
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
                            <div className="list-edit-button-margin btn-del-pop">
                              <button
                                className="Table-action-edit-button"
                                id="edit-pop-1"
                              >
                                <label className="Table-action-edit-button-text">
                                  EDIT
                                </label>
                              </button>
                              <UncontrolledPopover
                                trigger="legacy"
                                placement="bottom"
                                target="edit-pop-1"
                                className="general-popover delete-popover"
                                delay={tooltipDelay}
                                flip={editbool}
                              >
                                <PopoverBody className="d-flex">
                                  <div>
                                    <div className="">
                                      <label className="popover-header-text">
                                        EDIT CATEGORY
                                      </label>
                                    </div>
                                    <div className=" pop-over-div">
                                      <label className="pop-over-lbl-text">
                                        Brand Name
                                      </label>
                                      <select className="pop-over-select">
                                        <option>Bata</option>
                                      </select>
                                    </div>
                                    <div className=" pop-over-div">
                                      <label className="pop-over-lbl-text">
                                        Category
                                      </label>
                                      <select className="pop-over-select">
                                        <option>Complaint</option>
                                      </select>
                                    </div>
                                    <div className=" pop-over-div">
                                      <label className="pop-over-lbl-text">
                                        Sub Category
                                      </label>
                                      <select className="pop-over-select">
                                        <option>Defective Article</option>
                                      </select>
                                    </div>
                                    <div className=" pop-over-div">
                                      <label className="pop-over-lbl-text">
                                        Issue Type
                                      </label>
                                      <select className="pop-over-select">
                                        <option>Broken Shoes</option>
                                      </select>
                                    </div>

                                    <div className="pop-over-div">
                                      <label className="pop-over-lbl-text">
                                        Status
                                      </label>
                                      <select className="pop-over-select">
                                        <option>Active</option>
                                        <option>Inactive</option>
                                      </select>
                                    </div>
                                    <br />
                                    <div>
                                      <label className="pop-over-cancle">
                                        CANCEL
                                      </label>
                                      <button className="pop-over-button">
                                        <label className="pop-over-btnsave-text">
                                          SAVE
                                        </label>
                                      </button>
                                    </div>
                                  </div>
                                </PopoverBody>
                              </UncontrolledPopover>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <label className="table-data-text">Bata</label>
                        </td>
                        <td>
                          <label className="table-data-text">Complaint</label>
                        </td>
                        <td>
                          <label className="table-data-text">
                            Defective article
                          </label>
                        </td>
                        <td>
                          <label className="table-data-text">
                            Broken Shoes
                          </label>
                        </td>

                        <td>
                          <label className="table-data-text">Inactive</label>
                        </td>

                        <td>
                          <div className="row">
                            <div className="del-btn" id="del2">
                              <img src={RedDeleteIcon} alt="del-icon" />
                            </div>
                            <UncontrolledPopover
                              trigger="legacy"
                              placement="bottom"
                              target="del2"
                              className="general-popover delete-popover"
                              delay={tooltipDelay}
                            >
                              <PopoverBody className="d-flex">
                                <div className="del-big-icon">
                                  <img src={BlackDeleteIcon} alt="del-icon" />
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
                            <div className=" list-edit-button-margin btn-del-pop">
                              <button
                                className="Table-action-edit-button"
                                id="edit-pop-2"
                              >
                                <label className="Table-action-edit-button-text">
                                  EDIT
                                </label>
                              </button>
                              <UncontrolledPopover
                                trigger="legacy"
                                placement="bottom"
                                target="edit-pop-2"
                                className="general-popover delete-popover"
                                delay={tooltipDelay}
                                flip={editbool}
                              >
                                <PopoverBody className="d-flex">
                                  <div>
                                    <div className="">
                                      <label className="popover-header-text">
                                        EDIT CATEGORY
                                      </label>
                                    </div>
                                    <div className=" pop-over-div">
                                      <label className="pop-over-lbl-text">
                                        Brand Name
                                      </label>
                                      <select className="pop-over-select">
                                        <option>Bata</option>
                                      </select>
                                    </div>
                                    <div className=" pop-over-div">
                                      <label className="pop-over-lbl-text">
                                        Category
                                      </label>
                                      <select className="pop-over-select">
                                        <option>Complaint</option>
                                      </select>
                                    </div>
                                    <div className=" pop-over-div">
                                      <label className="pop-over-lbl-text">
                                        Sub Category
                                      </label>
                                      <select className="pop-over-select">
                                        <option>Defective Article</option>
                                      </select>
                                    </div>
                                    <div className=" pop-over-div">
                                      <label className="pop-over-lbl-text">
                                        Issue Type
                                      </label>
                                      <select className="pop-over-select">
                                        <option>Broken Shoes</option>
                                      </select>
                                    </div>

                                    <div className="pop-over-div">
                                      <label className="pop-over-lbl-text">
                                        Status
                                      </label>
                                      <select className="pop-over-select">
                                        <option>Active</option>
                                        <option>Inactive</option>
                                      </select>
                                    </div>
                                    <br />
                                    <div>
                                      <label className="pop-over-cancle">
                                        CANCEL
                                      </label>
                                      <button className="pop-over-button">
                                        <label className="pop-over-btnsave-text">
                                          SAVE
                                        </label>
                                      </button>
                                    </div>
                                  </div>
                                </PopoverBody>
                              </UncontrolledPopover>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <label className="table-data-text">Bata</label>
                        </td>
                        <td>
                          <label className="table-data-text">Complaint</label>
                        </td>
                        <td>
                          <label className="table-data-text">
                            Defective article
                          </label>
                        </td>
                        <td>
                          <label className="table-data-text">
                            Broken Shoes
                          </label>
                        </td>

                        <td>
                          <label className="table-data-text">Active</label>
                        </td>

                        <td>
                          <div className="row">
                            <div className="del-btn" id="del3">
                              <img src={RedDeleteIcon} alt="del-icon" />
                            </div>
                            <UncontrolledPopover
                              trigger="legacy"
                              placement="bottom"
                              target="del3"
                              className="general-popover delete-popover"
                              delay={tooltipDelay}
                            >
                              <PopoverBody className="d-flex">
                                <div className="del-big-icon">
                                  <img src={BlackDeleteIcon} alt="del-icon" />
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
                            <div className=" list-edit-button-margin btn-del-pop">
                              <button
                                className="Table-action-edit-button"
                                id="edit-pop-3"
                              >
                                <label className="Table-action-edit-button-text">
                                  EDIT
                                </label>
                              </button>
                              <UncontrolledPopover
                                trigger="legacy"
                                placement="auto"
                                target="edit-pop-3"
                                className="general-popover delete-popover"
                                delay={tooltipDelay}
                                flip={editbool}
                              >
                                <PopoverBody className="d-flex">
                                  <div>
                                    <div className="">
                                      <label className="popover-header-text">
                                        EDIT CATEGORY
                                      </label>
                                    </div>
                                    <div className=" pop-over-div">
                                      <label className="pop-over-lbl-text">
                                        Brand Name
                                      </label>
                                      <select className="pop-over-select">
                                        <option>Bata</option>
                                      </select>
                                    </div>
                                    <div className=" pop-over-div">
                                      <label className="pop-over-lbl-text">
                                        Category
                                      </label>
                                      <select className="pop-over-select">
                                        <option>Complaint</option>
                                      </select>
                                    </div>
                                    <div className=" pop-over-div">
                                      <label className="pop-over-lbl-text">
                                        Sub Category
                                      </label>
                                      <select className="pop-over-select">
                                        <option>Defective Article</option>
                                      </select>
                                    </div>
                                    <div className=" pop-over-div">
                                      <label className="pop-over-lbl-text">
                                        Issue Type
                                      </label>
                                      <select className="pop-over-select">
                                        <option>Broken Shoes</option>
                                      </select>
                                    </div>

                                    <div className="pop-over-div">
                                      <label className="pop-over-lbl-text">
                                        Status
                                      </label>
                                      <select className="pop-over-select">
                                        <option>Active</option>
                                        <option>Inactive</option>
                                      </select>
                                    </div>
                                    <br />
                                    <div>
                                      <label className="pop-over-cancle">
                                        CANCEL
                                      </label>
                                      <button className="pop-over-button">
                                        <label className="pop-over-btnsave-text">
                                          SAVE
                                        </label>
                                      </button>
                                    </div>
                                  </div>
                                </PopoverBody>
                              </UncontrolledPopover>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <label className="table-data-text">Bata</label>
                        </td>
                        <td>
                          <label className="table-data-text">Complaint</label>
                        </td>
                        <td>
                          <label className="table-data-text">
                            Defective article
                          </label>
                        </td>
                        <td>
                          <label className="table-data-text">
                            Broken Shoes
                          </label>
                        </td>

                        <td>
                          <label className="table-data-text">Inative</label>
                        </td>

                        <td>
                          <div className="row">
                            <div className="del-btn" id="del4">
                              <img src={RedDeleteIcon} alt="del-icon" />
                            </div>
                            <UncontrolledPopover
                              trigger="legacy"
                              placement="bottom"
                              target="del4"
                              className="general-popover delete-popover"
                              delay={tooltipDelay}
                            >
                              <PopoverBody className="d-flex">
                                <div className="del-big-icon">
                                  <img src={BlackDeleteIcon} alt="del-icon" />
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
                            <div className=" list-edit-button-margin btn-del-pop">
                              <button
                                className="Table-action-edit-button"
                                id="edit-pop-4"
                              >
                                <label className="Table-action-edit-button-text">
                                  EDIT
                                </label>
                              </button>
                              <UncontrolledPopover
                                trigger="legacy"
                                placement="auto"
                                target="edit-pop-4"
                                className="general-popover delete-popover"
                                delay={tooltipDelay}
                                flip={editbool}
                              >
                                <PopoverBody className="d-flex">
                                  <div>
                                    <div className="">
                                      <label className="popover-header-text">
                                        EDIT CATEGORY
                                      </label>
                                    </div>
                                    <div className=" pop-over-div">
                                      <label className="pop-over-lbl-text">
                                        Brand Name
                                      </label>
                                      <select className="pop-over-select">
                                        <option>Bata</option>
                                      </select>
                                    </div>
                                    <div className=" pop-over-div">
                                      <label className="pop-over-lbl-text">
                                        Category
                                      </label>
                                      <select className="pop-over-select">
                                        <option>Complaint</option>
                                      </select>
                                    </div>
                                    <div className=" pop-over-div">
                                      <label className="pop-over-lbl-text">
                                        Sub Category
                                      </label>
                                      <select className="pop-over-select">
                                        <option>Defective Article</option>
                                      </select>
                                    </div>
                                    <div className=" pop-over-div">
                                      <label className="pop-over-lbl-text">
                                        Issue Type
                                      </label>
                                      <select className="pop-over-select">
                                        <option>Broken Shoes</option>
                                      </select>
                                    </div>

                                    <div className="pop-over-div">
                                      <label className="pop-over-lbl-text">
                                        Status
                                      </label>
                                      <select className="pop-over-select">
                                        <option>Active</option>
                                        <option>Inactive</option>
                                      </select>
                                    </div>
                                    <br />
                                    <div>
                                      <label className="pop-over-cancle">
                                        CANCEL
                                      </label>
                                      <button className="pop-over-button">
                                        <label className="pop-over-btnsave-text">
                                          SAVE
                                        </label>
                                      </button>
                                    </div>
                                  </div>
                                </PopoverBody>
                              </UncontrolledPopover>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <label className="table-data-text">Bata</label>
                        </td>
                        <td>
                          <label className="table-data-text">Complaint</label>
                        </td>
                        <td>
                          <label className="table-data-text">
                            Defective article
                          </label>
                        </td>
                        <td>
                          <label className="table-data-text">
                            Broken Shoes
                          </label>
                        </td>

                        <td>
                          <label className="table-data-text">Active</label>
                        </td>

                        <td>
                          <div className="row">
                            <div className="del-btn" id="del5">
                              <img src={RedDeleteIcon} alt="del-icon" />
                            </div>
                            <UncontrolledPopover
                              trigger="legacy"
                              placement="bottom"
                              target="del5"
                              className="general-popover delete-popover"
                              delay={tooltipDelay}
                            >
                              <PopoverBody className="d-flex">
                                <div className="del-big-icon">
                                  <img src={BlackDeleteIcon} alt="del-icon" />
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
                            <div className=" list-edit-button-margin btn-del-pop">
                              <button
                                className="Table-action-edit-button"
                                id="edit-pop-5"
                              >
                                <label className="Table-action-edit-button-text">
                                  EDIT
                                </label>
                              </button>
                              <UncontrolledPopover
                                trigger="legacy"
                                placement="auto"
                                target="edit-pop-5"
                                className="general-popover delete-popover"
                                delay={tooltipDelay}
                                flip={editbool}
                              >
                                <PopoverBody className="d-flex">
                                  <div>
                                    <div className="">
                                      <label className="popover-header-text">
                                        EDIT CATEGORY
                                      </label>
                                    </div>
                                    <div className=" pop-over-div">
                                      <label className="pop-over-lbl-text">
                                        Brand Name
                                      </label>
                                      <select className="pop-over-select">
                                        <option>Bata</option>
                                      </select>
                                    </div>
                                    <div className=" pop-over-div">
                                      <label className="pop-over-lbl-text">
                                        Category
                                      </label>
                                      <select className="pop-over-select">
                                        <option>Complaint</option>
                                      </select>
                                    </div>
                                    <div className=" pop-over-div">
                                      <label className="pop-over-lbl-text">
                                        Sub Category
                                      </label>
                                      <select className="pop-over-select">
                                        <option>Defective Article</option>
                                      </select>
                                    </div>
                                    <div className=" pop-over-div">
                                      <label className="pop-over-lbl-text">
                                        Issue Type
                                      </label>
                                      <select className="pop-over-select">
                                        <option>Broken Shoes</option>
                                      </select>
                                    </div>

                                    <div className="pop-over-div">
                                      <label className="pop-over-lbl-text">
                                        Status
                                      </label>
                                      <select className="pop-over-select">
                                        <option>Active</option>
                                        <option>Inactive</option>
                                      </select>
                                    </div>
                                    <br />
                                    <div>
                                      <label className="pop-over-cancle">
                                        CANCEL
                                      </label>
                                      <button className="pop-over-button">
                                        <label className="pop-over-btnsave-text">
                                          SAVE
                                        </label>
                                      </button>
                                    </div>
                                  </div>
                                </PopoverBody>
                              </UncontrolledPopover>
                            </div>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
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
                        <label className="reports-to"> Category</label>
                        <Select
                          showSearch={true}
                          value={list1Value}
                          style={{ width: 293 }}
                          onChange={this.onChangeList1}
                        >
                          {list1SelectOptions}
                          <Option value={NEW_ITEM}>
                            <span className="sweetAlert-inCategory">+ ADD NEW</span>
                          </Option>
                        </Select>

                        <SweetAlert
                          show={this.state.showList1}
                          style={{width:'320px'}}
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
                        <label className="reports-to">Sub Category</label>
                        <Select
                          showSearch={true}
                          value={ListOfSubCate}
                          style={{ width: 293 }}
                          onChange={this.onChangeListSubCate}
                        >
                          {listSubCategory}
                          <Option value={NEW_ITEM}>
                            <span className="sweetAlert-inCategory">+ ADD NEW</span>
                          </Option>
                        </Select>

                        <SweetAlert
                          show={this.state.ShowSubCate}
                          style={{width:'320px'}}
                          title="Add New Sub Category"
                          text="Enter new Category"
                          showCancelButton
                          type="input"
                          inputPlaceholder="Enter Category Name"
                          animation="slide-from-top"
                          validationMsg="Please enter a category!"
                          onConfirm={inputValue => {
                            inputValue = inputValue.trim();
                            if (this.state.listOfSubCategory.includes(inputValue)) {
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
                        {/* <select
                          id="inputState"
                          className="form-control dropdown-setting"
                        >
                          <option>Defective Article</option>
                        </select> */}
                      </div>
                    </div>
                    <div className="divSpace">
                      <div className="dropDrownSpace">
                        <label className="reports-to">Issue Type</label>
                        <select
                          id="inputState"
                          className="form-control dropdown-setting"
                        >
                          <option>Broken Shoes</option>
                        </select>
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