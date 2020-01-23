import React, { Component } from "react";
import Demo from "../../../store/Hashtag";
import DelBigIcon from "./../../../assets/Images/del-big.png";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Popover } from "antd";
import ReactTable from "react-table";
import BlackInfoIcon from "./../../../assets/Images/Info-black.png";
import { Link } from "react-router-dom";
import RedDeleteIcon from "./../../../assets/Images/red-delete-icon.png";
import config from "../../../helpers/config";
import axios from "axios";
import { authHeader } from "../../../helpers/authHeader";
import {
  NotificationContainer,
  NotificationManager
} from "react-notifications";
class Brands extends Component {
  constructor(props) {
    super(props);

    this.state = {
      brandData: [],
      brandEditData:{},
      brand_Code: "",
      brand_name: "",
      selectedStatus: 0
    };
    this.handleGetBrandList = this.handleGetBrandList.bind(this);
  }
  handleBrandOnchange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  componentDidMount() {
    this.handleGetBrandList();
  }
  handleGetBrandList() {
    debugger;
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/Brand/BrandList",
      headers: authHeader()
    }).then(function(res) {
      debugger;
      let status = res.data.message;
      let data = res.data.responseData;
      if (status === "Success") {
        self.setState({
          brandData: data,
        });
      } else {
        self.setState({
          brandData: []
        });
      }
    });
  }
  handleSubmitData() {
    debugger;
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/Brand/AddBrand",
      headers: authHeader(),
      data: {
        BrandCode: this.state.brand_Code.trim(),
        BrandName: this.state.brand_name.trim(),
        IsActive: this.state.selectedStatus
      }
    }).then(function(res) {
      debugger;
      let status = res.data.message;
      if (status === "Success") {
        self.handleGetBrandList();
        NotificationManager.success("Brand Added successfully.");
        self.setState({
          brand_Code: "",
          brand_name: "",
          selectedStatus: 1
        });
      }
    });
  }
  handleDeleteBrandData(brand_Id) {
    debugger;
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/Brand/DeleteBrand",
      headers: authHeader(),
      params: {
        BrandID: brand_Id
      }
    }).then(function(res) {
      debugger;
      let status = res.data.message;
      if (status === "Success") {
        self.handleGetBrandList();
        NotificationManager.success("Brand delete successfully.");
      }
    });
  }
  handleGetDataForEdit(e, data) {
    debugger;
    var brandEditData=e
    brandEditData.brand_Code=brandEditData.brandCode;
    brandEditData.brand_name=brandEditData.brandName;

    this.setState({
      brandEditData
    })
  }

  render() {
    const { brandData } = this.state;

    // const ActionEditBtn = (
    //   <div className="edtpadding">
    //       <label className="popover-header-text">EDIT BRAND</label>
    //     <div className="pop-over-div">
    //       <label className="edit-label-1">Brand Code</label>
    //       <input
    //         type="text"
    //         className="txt-edit-popover"
    //         placeholder="Enter Brand Code"
    //         maxLength={10}
    //       />
    //     </div>
    //     <div className="pop-over-div">
    //       <label className="edit-label-1">Brand Name</label>
    //       <input
    //         type="text"
    //         className="txt-edit-popover"
    //         placeholder="Enter Brand Name"
    //         maxLength={25}
    //       />
    //     </div>
    //     <div className="pop-over-div">
    //       <label className="edit-label-1">Status</label>
    //       <select id="inputStatus" className="edit-dropDwon dropdown-setting">
    //         <option>Active</option>
    //         <option>Inactive</option>
    //       </select>
    //     </div>
    //     <br />
    //     <div>
    //       <a className="pop-over-cancle" href={Demo.BLANK_LINK}>
    //         CANCEL
    //       </a>
    //       <button className="pop-over-button">
    //         <label className="pop-over-btnsave-text">SAVE</label>
    //       </button>
    //     </div>
    //   </div>
    // );

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
            Brands
          </Link>
        </div>
        <div className="container-fluid">
          <div className="store-settings-cntr">
            <div className="row">
              <div className="col-md-8">
                <div className="table-cntr table-height TicketBrandReact">
                  <ReactTable
                    data={brandData}
                    columns={[
                      {
                        Header: (
                          <span>
                            Brand Code
                            <FontAwesomeIcon icon={faCaretDown} />
                          </span>
                        ),
                        accessor: "brandCode"
                      },
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
                            Brand Added By
                            <FontAwesomeIcon icon={faCaretDown} />
                          </span>
                        ),
                        accessor: "created_By",
                        Cell: row => {
                          debugger;
                          return (
                            <div>
                              <span>
                                {row.original["created_By"]}
                                <Popover
                                  content={
                                    <div>
                                      <div>
                                        <b>
                                          <p className="title">
                                            Created By:{" "}
                                            {row.original["created_By"]}
                                          </p>
                                        </b>
                                        <p className="sub-title">
                                          Created Date:{" "}
                                          {row.original["createdDateFormat"]}
                                        </p>
                                      </div>
                                      <div>
                                        <b>
                                          <p className="title">
                                            Updated By:{" "}
                                            {row.original["modify_By"]}
                                          </p>
                                        </b>
                                        <p className="sub-title">
                                          Updated Date:{" "}
                                          {row.original["modifyDateFormat"]}
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
                          var brand_ID = row.original["brandID"];
                          debugger;
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
                                            type="button"
                                            onClick={this.handleDeleteBrandData.bind(
                                              this,
                                              brand_ID
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
                                        EDIT BRAND
                                      </label>
                                      <div className="pop-over-div">
                                        <label className="edit-label-1">
                                          Brand Code
                                        </label>
                                        <input
                                          type="text"
                                          className="txt-edit-popover"
                                          placeholder="Enter Brand Code"
                                          maxLength={10}
                                          name="brand_Code"
                                          value={this.state.brandEditData.brand_Code}
                                          onChange={this.handleBrandOnchange}
                                        />
                                      </div>
                                      <div className="pop-over-div">
                                        <label className="edit-label-1">
                                          Brand Name
                                        </label>
                                        <input
                                          type="text"
                                          className="txt-edit-popover"
                                          placeholder="Enter Brand Name"
                                          maxLength={25}
                                          name="brand_name"
                                          value={this.state.brandEditData.brand_name}
                                          onChange={this.handleBrandOnchange}
                                        />
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
                                        >
                                          CANCEL
                                        </a>
                                        <button className="pop-over-button">
                                          <label className="pop-over-btnsave-text">
                                            SAVE
                                          </label>
                                        </button>
                                      </div>
                                    </div>
                                  }
                                  placement="bottom"
                                  trigger="click"
                                >
                                  <button
                                    className="react-tabel-button"
                                    type="button"
                                    onClick={this.handleGetDataForEdit.bind(
                                      this,
                                      row.original
                                    )}
                                  >
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
                    defaultPageSize={5}
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
                <div className="createHierarchyMask">
                  <div className="createSpace">
                    <label className="create-department">CREATE BRAND</label>
                    <div className="div-padding-1">
                      <label className="designation-name">Brand Code</label>
                      <input
                        type="text"
                        className="txt-1"
                        placeholder="Enter Brand Code"
                        maxLength={10}
                        name="brand_Code"
                        value={this.state.brand_Code}
                        onChange={this.handleBrandOnchange}
                      />
                    </div>
                    <div className="divSpace">
                      <div className="dropDrownSpace">
                        <label className="reports-to">Brand Name</label>
                        <input
                          type="text"
                          className="txt-1"
                          placeholder="Enter Brand Name"
                          maxLength={25}
                          name="brand_name"
                          value={this.state.brand_name}
                          onChange={this.handleBrandOnchange}
                        />
                      </div>
                    </div>
                    <div className="dropDrownSpace">
                      <label className="reports-to">Status</label>
                      <select
                        className="form-control dropdown-setting"
                        name="selectedStatus"
                        value={this.state.selectedStatus}
                        onChange={this.handleBrandOnchange}
                      >
                        <option value={2}>select</option>
                        <option value={1}>Active</option>
                        <option value={0}>Deactive</option>
                      </select>
                    </div>
                    <div className="btnSpace">
                      <button
                        className="CreateADDBtn"
                        type="button"
                        onClick={this.handleSubmitData.bind(this)}
                      >
                        ADD
                      </button>
                    </div>
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

export default Brands;
