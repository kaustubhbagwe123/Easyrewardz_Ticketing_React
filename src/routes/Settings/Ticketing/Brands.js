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
import ActiveStatus from "../../activeStatus";
class Brands extends Component {
  constructor(props) {
    super(props);

    this.state = {
      brandData: [],
      brandEditData: {},
      brand_Code: "",
      brand_name: "",
      selectedStatus: 0,
      loading: false,
      activeData: ActiveStatus(),
      brandcodeCompulsion:"",
      brandnameCompulsion:"",
      statusCompulsion:""
    };
    this.handleGetBrandList = this.handleGetBrandList.bind(this);
  }
  hide(e, id) {
    debugger;
    // document.getElementById(id).style.display="none";
    document.getElementById(id).parentElement.parentElement.parentElement.parentElement.parentElement.style.display = "none";
  }
  show(e, id) {
    debugger;
    if (document.getElementById(id))
      // document.getElementById(id).style.display="block";
      document.getElementById(id).parentElement.parentElement.parentElement.parentElement.parentElement.style.display = "block";
  }
  componentDidMount() {
    this.handleGetBrandList();
  }
  handleBrandOnchange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  handleActiveStatus = e => {
    let value = e.target.value;
    this.setState({ selectedStatus: value });
  };
  handleOnChangeData = e => {
    debugger;
    var name = e.target.name;
    var value = e.target.value;

    var data = this.state.brandEditData;
    data[name] = value;

    this.setState({
      brandEditTemp: data
    });
  };

  handleGetBrandList() {
    debugger;
    let self = this;
    this.setState({ loading: true });
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
          brandData: data, loading: false
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
    if(
      this.state.brand_Code.length > 0 &&
      this.state.brand_name.length > 0 &&
      this.state.selectedStatus !== 0 
    ){
    let self = this;
    var activeStatus = 0;
    var status = this.state.selectedStatus;
    if (status === "Active") {
      activeStatus = 1;
    } else {
      activeStatus = 0;
    }
    axios({
      method: "post",
      url: config.apiUrl + "/Brand/AddBrand",
      headers: authHeader(),
      data: {
        BrandCode: this.state.brand_Code.trim(),
        BrandName: this.state.brand_name.trim(),
        IsActive: activeStatus
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
          selectedStatus: 0
        });
      }
    });
  }else{
    this.setState({
      brandcodeCompulsion:"Please Enter Brand Code",
      brandnameCompulsion:"Please Enter Brand Name",
      statusCompulsion:"Please Select Status"
    });
  }
  }
  handleDeleteBrandData(brand_Id) {
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
      let status = res.data.statusCode;
      if (status === 1010) {
        self.handleGetBrandList();
        NotificationManager.success("Brand delete successfully.");
      }else{
        NotificationManager.error(res.data.message);
      }
    });
  }
  handleUpdateData(brand_Id) {
    debugger;
    let self = this;
    var activeStatus = 0;
    var status = this.state.brandEditData.brand_status;
    if (status === "Active") {
      activeStatus = 1;
    } else {
      activeStatus = 0;
    }
    axios({
      method: "post",
      url: config.apiUrl + "/Brand/UpdateBrand",
      headers: authHeader(),
      data: {
        BrandID: brand_Id,
        BrandCode: this.state.brandEditData.brand_Code.trim(),
        BrandName: this.state.brandEditData.brand_name.trim(),
        IsActive: activeStatus
      }
    }).then(function(res) {
      debugger;
      let status = res.data.message;
      if (status === "Success") {
        self.handleGetBrandList();
        NotificationManager.success("Brand updated successfully.");
        self.setState({
          brand_Code: "",
          brand_name: "",
          selectedStatus: 1
        });
      }
    });
  }
  handleGetDataForEdit(e) {
    debugger;
    var brandEditData = e;
    brandEditData.brand_Code = brandEditData.brandCode;
    brandEditData.brand_name = brandEditData.brandName;
    brandEditData.brand_status = brandEditData.status;

    this.setState({
      brandEditData
    });
  }

  render() {
    const { brandData } = this.state;
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
            Brands
          </Link>
        </div>
        <div className="container-fluid">
          <div className="store-settings-cntr">
            <div className="row">
              <div className="col-md-8">
              {this.state.loading === true ? (
              <div className="loader-icon"></div>
            ) : (
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
                                    <div className="samdel d-flex general-popover popover-body" id={"samdel" + brand_ID}>
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
                                          <a href="#!" className="canblue" onClick={() => this.hide(this, "samdel" + brand_ID)}>CANCEL</a>
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
                                    onClick={() => this.show(this, "samdel" + brand_ID)}
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
                                          value={
                                            this.state.brandEditData.brand_Code
                                          }
                                          onChange={this.handleOnChangeData}
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
                                          value={
                                            this.state.brandEditData.brand_name
                                          }
                                          onChange={this.handleOnChangeData}
                                        />
                                      </div>
                                      <div className="pop-over-div">
                                        <label className="edit-label-1">
                                          Status
                                        </label>
                                        <select
                                          className="edit-dropDwon dropdown-setting"
                                          name="brand_status"
                                          value={
                                            this.state.brandEditData.brand_status
                                          }
                                          onChange={this.handleOnChangeData}
                                        >
                                          <option>select</option>
                                          {this.state.activeData !== null &&
                                            this.state.activeData.map(
                                              (item, j) => (
                                                <option
                                                  key={j}
                                                  value={item.ActiveID}
                                                >
                                                  {item.ActiveName}
                                                </option>
                                              )
                                            )}
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
                                        <button
                                          className="pop-over-button"
                                          type="button"
                                          onClick={this.handleUpdateData.bind(
                                            this,
                                            brand_ID
                                          )}
                                        >
                                          SAVE
                                        </button>
                                      </div>
                                    </div>
                                  }
                                  placement="bottom"
                                  trigger="click"
                                >
                                  <button
                                    className="react-tabel-button"
                                    // type="button"
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
            )}
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
                       {this.state.brand_Code.length === 0 && (
                    <p style={{ color: "red", marginBottom: "0px" }}>
                      {this.state.brandcodeCompulsion}
                    </p>
                  )}
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
                         {this.state.brand_name.length === 0 && (
                    <p style={{ color: "red", marginBottom: "0px" }}>
                      {this.state.brandnameCompulsion}
                    </p>
                  )}
                      </div>
                    </div>
                    <div className="dropDrownSpace">
                      <label className="reports-to">Status</label>
                      <select
                        className="form-control dropdown-setting"
                        name="selectedStatus"
                        value={this.state.selectedStatus}
                        onChange={this.handleActiveStatus}
                      >
                        <option>select</option>
                        {this.state.activeData !== null &&
                          this.state.activeData.map((item, j) => (
                            <option key={j} value={item.ActiveID}>
                              {item.ActiveName}
                            </option>
                          ))}
                      </select>
                      {this.state.selectedStatus === 0 && (
                    <p style={{ color: "red", marginBottom: "0px" }}>
                      {this.state.statusCompulsion}
                    </p>
                  )}
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
