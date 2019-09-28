import React,{Component} from 'react'; 
import TableArr from './../../assets/Images/table-arr.png'
import RedDeleteIcon from './../../assets/Images/red-delete-icon.png';
import BlackDeleteIcon from "./../../assets/Images/del-big.png";  
import { UncontrolledPopover , PopoverBody } from "reactstrap";
import DelBigIcon from "./../../assets/Images/del-big.png";
import FileUpload from "./../../assets/Images/file.png";
import DelBlack from "./../../assets/Images/del-black.png";
import UploadCancel from "./../../assets/Images/upload-cancel.png";
import { ProgressBar } from "react-bootstrap";
import Demo from "../../store/Hashtag.js";
 

class StoreMaster extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fileName: ""
    };
  }

  fileUpload = e => {
    this.setState({ fileName: e.target.files[0].name });
  };

  render() {
    const editbool = false;
    const tooltipDelay = { show: 50, hide: 100 };
    return (
      <>
        <div className="breadcrumbs-row">
          <div className="breadcrumbs-row-padding">
            <label className="settings-ticketing">Settings > Ticketing ></label>
            <label className="storemaster-text">&nbsp;Store Master</label>
          </div>
        </div>
        <br />
        <div className="bottom-margin-class">
          <div className="row">
            <div className="store-col-1 pagin-sort">
              <table className="table">
                <thead>
                  <tr>
                    <th>
                      Store Name <img src={TableArr} alt="table-arr" />
                    </th>
                    <th>
                      Store Code <img src={TableArr} alt="table-arr" />
                    </th>
                    <th>
                      Brand Name <img src={TableArr} alt="table-arr" />
                    </th>
                    <th>
                      City <img src={TableArr} alt="table-arr" />
                    </th>
                    <th>
                      State <img src={TableArr} alt="table-arr" />
                    </th>
                    <th>
                      Pincode <img src={TableArr} alt="table-arr" />
                    </th>
                    {/* <th></th> */}
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <label className="table-data-text">Bata Store</label>
                    </td>
                    <td>
                      <label className="table-data-text">12345</label>
                    </td>
                    <td>
                      <label className="table-data-text">Bata</label>
                    </td>
                    <td>
                      <label className="table-data-text">Gurgaon</label>
                    </td>
                    <td>
                      <label className="table-data-text">Haryana</label>
                    </td>
                    <td>
                      <label className="table-data-text">122007</label>
                    </td>
                    <td>
                      <div className="row">
                        <div className="deletepopover">
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
                        </div>
                        <div className=" list-edit-button-margin btn-del-pop">
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
                      <label className="table-data-text">Bata Store</label>
                    </td>
                    <td>
                      <label className="table-data-text">12345</label>
                    </td>
                    <td>
                      <label className="table-data-text">Bata</label>
                    </td>
                    <td>
                      <label className="table-data-text">Gurgaon</label>
                    </td>
                    <td>
                      <label className="table-data-text">Haryana</label>
                    </td>
                    <td>
                      <label className="table-data-text">122007</label>
                    </td>
                    <td>
                      <div className="row">
                        <div className="deletepopover">
                          <div className="del-btn" id="sm-del2">
                            <img src={RedDeleteIcon} alt="del-icon" />
                          </div>
                          <UncontrolledPopover
                            trigger="legacy"
                            placement="bottom"
                            target="sm-del2"
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
                        </div>
                        <div className=" list-edit-button-margin btn-del-pop">
                          <button
                            className="Table-action-edit-button"
                            id="sm-edit-pop-2"
                          >
                            <label className="Table-action-edit-button-text">
                              EDIT
                            </label>
                          </button>
                          <UncontrolledPopover
                            trigger="legacy"
                            placement="bottom"
                            target="sm-edit-pop-2"
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
                      <label className="table-data-text">Bata Store</label>
                    </td>
                    <td>
                      <label className="table-data-text">12345</label>
                    </td>
                    <td>
                      <label className="table-data-text">Bata</label>
                    </td>
                    <td>
                      <label className="table-data-text">Gurgaon</label>
                    </td>
                    <td>
                      <label className="table-data-text">Haryana</label>
                    </td>
                    <td>
                      <label className="table-data-text">122007</label>
                    </td>
                    <td>
                      <div className="row">
                        <div className="deletepopover">
                          <div className="del-btn" id="sm-del3">
                            <img src={RedDeleteIcon} alt="del-icon" />
                          </div>
                          <UncontrolledPopover
                            trigger="legacy"
                            placement="bottom"
                            target="sm-del3"
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
                        </div>
                        <div className=" list-edit-button-margin btn-del-pop">
                          <button
                            className="Table-action-edit-button"
                            id="sm-edit-pop-3"
                          >
                            <label className="Table-action-edit-button-text">
                              EDIT
                            </label>
                          </button>
                          <UncontrolledPopover
                            trigger="legacy"
                            placement="bottom"
                            target="sm-edit-pop-3"
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
                      <label className="table-data-text">Bata Store</label>
                    </td>
                    <td>
                      <label className="table-data-text">12345</label>
                    </td>
                    <td>
                      <label className="table-data-text">Bata</label>
                    </td>
                    <td>
                      <label className="table-data-text">Gurgaon</label>
                    </td>
                    <td>
                      <label className="table-data-text">Haryana</label>
                    </td>
                    <td>
                      <label className="table-data-text">122007</label>
                    </td>
                    <td>
                      <div className="row">
                        <div className="deletepopover">
                          <div className="del-btn" id="sm-del4">
                            <img src={RedDeleteIcon} alt="del-icon" />
                          </div>
                          <UncontrolledPopover
                            trigger="legacy"
                            placement="bottom"
                            target="sm-del4"
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
                        </div>
                        <div className=" list-edit-button-margin btn-del-pop">
                          <button
                            className="Table-action-edit-button"
                            id="sm-edit-pop-4"
                          >
                            <label className="Table-action-edit-button-text">
                              EDIT
                            </label>
                          </button>
                          <UncontrolledPopover
                            trigger="legacy"
                            placement="bottom"
                            target="sm-edit-pop-4"
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
                      <label className="table-data-text">Bata Store</label>
                    </td>
                    <td>
                      <label className="table-data-text">12345</label>
                    </td>
                    <td>
                      <label className="table-data-text">Bata</label>
                    </td>
                    <td>
                      <label className="table-data-text">Gurgaon</label>
                    </td>
                    <td>
                      <label className="table-data-text">Haryana</label>
                    </td>
                    <td>
                      <label className="table-data-text">122007</label>
                    </td>

                    <td>
                      <div className="row">
                        <div className="deletepopover">
                          <div className="del-btn" id="sm-del5">
                            <img src={RedDeleteIcon} alt="del-icon" />
                          </div>
                          <UncontrolledPopover
                            trigger="legacy"
                            placement="bottom"
                            target="sm-del5"
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
                        </div>
                        <div className=" list-edit-button-margin btn-del-pop">
                          <button
                            className="Table-action-edit-button"
                            id="sm-edit-pop-5"
                          >
                            <label className="Table-action-edit-button-text">
                              EDIT
                            </label>
                          </button>
                          <UncontrolledPopover
                            trigger="legacy"
                            placement="bottom"
                            target="sm-edit-pop-5"
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
            <div>
              <div className="store-col-2">
                <br />
                <div className="row">
                  <label className="Create-store-text">CREATE STORE</label>
                </div>
                <br />
                <div className="row">
                  <label className="store-create-lable-text">Brand</label>
                </div>
                <div className="row">
                  <select className="store-create-select">
                    <option>Bata</option>
                  </select>
                </div>
                <div className="store-create-margin">
                  <div className="row">
                    <label className="store-create-lable-text">
                      Store Code
                    </label>
                  </div>
                  <div className="row">
                    <input
                      type="text"
                      className="store-create-textbox"
                      placeholder="231122"
                    />
                  </div>
                </div>

                <div className="store-create-margin">
                  <div className="row">
                    <label className="store-create-lable-text">
                      Store Name
                    </label>
                  </div>
                  <div className="row">
                    <input
                      type="text"
                      className="store-create-textbox"
                      placeholder="Bata Store"
                    />
                  </div>
                </div>
                <div className="store-create-margin">
                  <div className="row">
                    <label className="store-create-lable-text">State</label>
                  </div>
                  <div className="row">
                    <select className="store-create-select">
                      <option>Delhi</option>
                    </select>
                  </div>
                </div>
                <div className="store-create-margin">
                  <div className="row">
                    <label className="store-create-lable-text">City</label>
                  </div>
                  <div className="row">
                    <select className="store-create-select">
                      <option>Delhi</option>
                    </select>
                  </div>
                </div>
                <div className="store-create-margin">
                  <div className="row">
                    <label className="store-create-lable-text">Pin Code</label>
                  </div>
                  <div className="row">
                    <input
                      type="text"
                      className="store-create-textbox"
                      placeholder="110006"
                    />
                  </div>
                </div>
                <div className="store-create-margin">
                  <div className="row">
                    <label className="store-create-lable-text">Address</label>
                  </div>
                  <div className="row">
                    <textarea
                      cols="31"
                      rows="3"
                      className="store-create-textarea"
                      placeholder="Near Palm Court Bulilding,Sector 14 Gurgaon,Haryan"
                    ></textarea>
                  </div>
                </div>

                <div className="store-create-margin">
                  <div className="row">
                    <label className="store-create-lable-text">Region</label>
                  </div>
                  <div className="row">
                    <select className="store-create-select">
                      <option>Delhi</option>
                    </select>
                  </div>
                </div>
                <div className="store-create-margin">
                  <div className="row">
                    <label className="store-create-lable-text">Zone</label>
                  </div>
                  <div className="row">
                    <select className="store-create-select">
                      <option>North</option>
                    </select>
                  </div>
                </div>
                <div className="store-create-margin">
                  <div className="row">
                    <label className="store-create-lable-text">
                      Store Type
                    </label>
                  </div>
                  <div className="row">
                    <select className="store-create-select">
                      <option>Retail</option>
                    </select>
                  </div>
                </div>
                <div className="store-create-margin">
                  <div className="row">
                    <label className="store-create-lable-text">
                      Contact Details:Email
                    </label>
                  </div>
                  <div className="row">
                    <input
                      type="text"
                      className="store-create-textbox"
                      placeholder="batastore@gmail.com"
                    />
                  </div>
                </div>
                <div className="store-create-margin">
                  <div className="row">
                    <label className="store-create-lable-text">
                      Contact Details:Phone
                    </label>
                  </div>
                  <div className="row">
                    <input
                      type="text"
                      className="store-create-textbox"
                      placeholder="9876543210"
                    />
                  </div>
                </div>
                <div className="store-create-margin">
                  <div className="row">
                    <label className="store-create-lable-text">Status</label>
                  </div>
                  <div className="row">
                    <select className="store-create-select">
                      <option>Active</option>
                    </select>
                  </div>
                </div>
                <br />
                <div className="store-create-margin">
                  <div className="row">
                    <button className="store-create-button">
                      <label className="store-create-button-text">ADD</label>
                    </button>
                  </div>
                </div>
                <br />
                <br />
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
      </>
    );
  }
}

export default StoreMaster;