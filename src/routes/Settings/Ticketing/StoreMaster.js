import React, { Component } from "react";
import RedDeleteIcon from "./../../../assets/Images/red-delete-icon.png";
import { UncontrolledPopover, PopoverBody } from "reactstrap";
import DelBigIcon from "./../../../assets/Images/del-big.png";
import FileUpload from "./../../../assets/Images/file.png";
import DelBlack from "./../../../assets/Images/del-black.png";
import DownExcel from "./../../../assets/Images/csv.png";
import UploadCancel from "./../../../assets/Images/upload-cancel.png";
import { ProgressBar } from "react-bootstrap";
import Demo from "./../../../store/Hashtag.js";
import { Link } from "react-router-dom";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Popover } from "antd";
import ReactTable from "react-table";
import config from "../../../helpers/config";
import axios from "axios";
import Select from "react-select";
import {
  NotificationContainer,
  NotificationManager
} from "react-notifications";
import { authHeader } from "../../../helpers/authHeader";
import ActiveStatus from "../../activeStatus";
import ZoneType from "./ZoneType";

class StoreMaster extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fileName: "",
      selectState: 0,
      selectCity: 0,
      selectedBrand: [],
      selectStatus: 0,
      storeData: [],
      storeEditData: {},
      brandData: [],
      stateData: [],
      cityData: [],
      regionData: [],
      storeTypeData: [],
      activeData: ActiveStatus(),
      zoneData: ZoneType(),
      store_code: "",
      store_name: "",
      pin_code: "",
      store_Address: "",
      selectRegion: 0,
      selectZone: 0,
      store_type: 0,
      contact_email: "",
      contact_Phone: ""
    };
    this.handleGetStoreMasterData = this.handleGetStoreMasterData.bind(this);
    this.handleGetBrandList = this.handleGetBrandList.bind(this);
    this.handleGetStateList = this.handleGetStateList.bind(this);
    this.handleGetCityList = this.handleGetCityList.bind(this);
    this.handleGetRegionList = this.handleGetRegionList.bind(this);
    this.handleGetStoreTypeList = this.handleGetStoreTypeList.bind(this);
  }
  componentDidMount() {
    this.handleGetStoreMasterData();
    this.handleGetBrandList();
    this.handleGetStateList();
    this.handleGetRegionList();
    this.handleGetStoreTypeList();
  }
  handleGetStoreMasterData() {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/Store/StoreList",
      headers: authHeader()
    }).then(function(res) {
      debugger;
      let status = res.data.message;
      let data = res.data.responseData;
      if (status === "Success") {
        self.setState({
          storeData: data
        });
      } else {
        self.setState({
          storeData: []
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
  handleGetStateList() {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/Master/getstatelist",
      headers: authHeader()
    }).then(function(res) {
      debugger;
      let status = res.data.message;
      let data = res.data.responseData;
      if (status === "Success") {
        self.setState({ stateData: data });
      } else {
        self.setState({ stateData: [] });
      }
    });
  }
  handleGetCityList() {
    debugger;

    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/Master/getcitylist",
      headers: authHeader(),
      params: {
        StateId: this.state.selectState
      }
    }).then(function(res) {
      debugger;
      let status = res.data.message;
      let data = res.data.responseData;
      if (status === "Success") {
        self.setState({ cityData: data });
      } else {
        self.setState({ cityData: [] });
      }
    });
  }
  handleGetRegionList() {
    let self = this;
    axios({
      method: "get",
      url: config.apiUrl + "/Master/getregionlist",
      headers: authHeader()
    }).then(function(res) {
      debugger;
      let status = res.data.message;
      let data = res.data.responseData;
      if (status === "Success") {
        self.setState({ regionData: data });
      } else {
        self.setState({ regionData: [] });
      }
    });
  }
  handleGetStoreTypeList() {
    let self = this;
    axios({
      method: "get",
      url: config.apiUrl + "/Master/getstoretypelist",
      headers: authHeader()
    }).then(function(res) {
      debugger;
      let status = res.data.message;
      let data = res.data.responseData;
      if (status === "Success") {
        self.setState({ storeTypeData: data });
      } else {
        self.setState({ storeTypeData: [] });
      }
    });
  }
  handleDeleteStore(store_Id) {
    debugger;
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/Store/deleteStore",
      headers: authHeader(),
      params: {
        StoreID: store_Id
      }
    }).then(function(res) {
      debugger;
      let status = res.data.message;
      if (status === "Success") {
        self.handleGetStoreMasterData();
        NotificationManager.success("Store deleted successfully.");
      }
    });
  }
  handleSubmitData() {
    debugger;
    let self = this;
    var activeStatus = 0;
    var finalBrandId = "";
    var status = this.state.selectStatus;
    if (status === "Active") {
      activeStatus = 1;
    } else {
      activeStatus = 0;
    }
    if (this.state.selectedBrand !== null) {
      for (let i = 0; i < this.state.selectedBrand.length; i++) {
        finalBrandId+= this.state.selectedBrand[i].brandID+ ",";
      }
    }
    axios({
      method: "post",
      url: config.apiUrl + "/Store/createstore",
      headers: authHeader(),
      data: {
        StoreBrand_Id: finalBrandId,
        StoreCode: this.state.store_code.trim(),
        StoreName: this.state.store_name.trim(),
        StateID: this.state.selectState,
        CityID: this.state.selectCity,
        Pincode: this.state.pin_code,
        Address: this.state.store_Address,
        RegionID: this.state.selectRegion,
        ZoneID: this.state.selectZone,
        StoreTypeID: this.state.store_type,
        StoreEmailID: this.state.contact_email,
        StorePhoneNo: this.state.contact_Phone,
        IsActive: activeStatus
      }
    }).then(function(res) {
      debugger;
      let status = res.data.message;
      if (status === "Success") {
        self.handleGetStoreMasterData();
        NotificationManager.success("Store added successfully.");
        self.setState({
          store_code: "",
          store_name: "",
          selectedBrand: [],
          pin_code: "",
          store_Address: "",
          selectCity: 0,
          selectRegion: 0,
          selectZone: 0,
          store_type: 0,
          contact_email: "",
          contact_Phone: ""
        });
      }
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
  handleBrandChange = e => {
    this.setState({ selectedBrand: e });
  };
  handleStateChange = e => {
    let value = e.target.value;
    this.setState({ selectState: value, cityData: [] });
    setTimeout(() => {
      if (this.state.selectState) {
        this.handleGetCityList();
      }
    }, 1);
  };
  handleEditStoreMasterData(data) {
    debugger;
    var storeEditData = data;
    // storeEditData.brand_Id=storeEditData.brandID;
    // storeEditData.brand_Id=storeEditData.brandID;
    // storeEditData.brand_Id=storeEditData.brandID;
    // storeEditData.brand_Id=storeEditData.brandID;
    // storeEditData.brand_Id=storeEditData.brandID;
    // storeEditData.brand_Id=storeEditData.brandID;
    // storeEditData.brand_Id=storeEditData.brandID;
  }
  handleCityChange = e => {
    let value = e.target.value;
    this.setState({ selectCity: value });
  };
  handleZoneChange = e => {
    let value = e.target.value;
    this.setState({ selectZone: value });
  };
  handleRegionChange = e => {
    let value = e.target.value;
    this.setState({ selectRegion: value });
  };
  handleStoreTypeChange = e => {
    let value = e.target.value;
    this.setState({ store_type: value });
  };
  handleStatusChange = e => {
    let value = e.target.value;
    this.setState({ selectStatus: value });
  };
  hanldeOnChangeData = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    const { storeData } = this.state;
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
          <Link to={Demo.BLANK_LINK} className="header-path active">
            Store Master
          </Link>
        </div>
        <div className="container-fluid">
          <div className="store-settings-cntr">
            <div className="row">
              <div className="col-md-8">
                <div className="table-cntr table-height TicketStoreReact">
                  <ReactTable
                    data={storeData}
                    columns={[
                      {
                        Header: (
                          <span>
                            Store Name
                            <FontAwesomeIcon icon={faCaretDown} />
                          </span>
                        ),
                        accessor: "storeName"
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
                            Brand Name
                            <FontAwesomeIcon icon={faCaretDown} />
                          </span>
                        ),
                        accessor: "branName"
                      },
                      {
                        Header: (
                          <span>
                            City
                            <FontAwesomeIcon icon={faCaretDown} />
                          </span>
                        ),
                        accessor: "cityName"
                      },
                      {
                        Header: (
                          <span>
                            State
                            <FontAwesomeIcon icon={faCaretDown} />
                          </span>
                        ),
                        accessor: "stateName"
                      },
                      {
                        Header: (
                          <span>
                            Pincode
                            <FontAwesomeIcon icon={faCaretDown} />
                          </span>
                        ),
                        accessor: "pinCode"
                      },
                      // {
                      //   Header: (
                      //     <span>
                      //       Status
                      //       <FontAwesomeIcon icon={faCaretDown} />
                      //     </span>
                      //   ),
                      //   accessor: "status"
                      // },
                      {
                        Header: <span>Actions</span>,
                        accessor: "actiondept",
                        Cell: row => {
                          var ids = row.original["storeID"];
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
                                            onClick={this.handleDeleteStore.bind(
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
                                    id={ids}
                                  />
                                </Popover>
                                <Popover
                                  content={
                                    <div className="edtpadding">
                                      <label className="popover-header-text">
                                        EDIT STORE
                                      </label>
                                      <div className="pop-over-div">
                                        <label className="edit-label-1">
                                          Brand
                                        </label>
                                        <select
                                          className="store-create-select"
                                          value={this.state.selectedBrand}
                                          onChange={this.handleBrandChange}
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
                                        <label className="edit-label-1">
                                          Store Code
                                        </label>
                                        <input
                                          type="text"
                                          className="txt-edit-popover"
                                          placeholder="Enter Store Code"
                                          maxLength={10}
                                        />
                                      </div>
                                      <div className="pop-over-div">
                                        <label className="edit-label-1">
                                          Store Name
                                        </label>
                                        <input
                                          type="text"
                                          className="txt-edit-popover"
                                          placeholder="Enter Store Name"
                                          maxLength={100}
                                        />
                                      </div>
                                      <div className="pop-over-div">
                                        <label className="edit-label-1">
                                          State
                                        </label>
                                        <select
                                          className="store-create-select"
                                          value={this.state.selectState}
                                          onChange={this.handleStateChange}
                                        >
                                          <option>Select</option>
                                          {this.state.stateData !== null &&
                                            this.state.stateData.map(
                                              (item, i) => (
                                                <option
                                                  key={i}
                                                  value={item.stateID}
                                                  className="select-category-placeholder"
                                                >
                                                  {item.stateName}
                                                </option>
                                              )
                                            )}
                                        </select>
                                      </div>
                                      <div className="pop-over-div">
                                        <label className="edit-label-1">
                                          City
                                        </label>
                                        <select className="edit-dropDwon dropdown-setting">
                                          <option>Select</option>
                                          {this.state.cityData !== null &&
                                            this.state.cityData.map(
                                              (item, i) => (
                                                <option
                                                  key={i}
                                                  value={item.cityID}
                                                  className="select-category-placeholder"
                                                >
                                                  {item.cityName}
                                                </option>
                                              )
                                            )}
                                        </select>
                                      </div>
                                      <div className="pop-over-div">
                                        <label className="edit-label-1">
                                          Pin Code
                                        </label>
                                        <input
                                          type="text"
                                          className="txt-edit-popover"
                                          placeholder="Enter Pin Code"
                                          maxLength={11}
                                        />
                                      </div>
                                      <div className="pop-over-div">
                                        <label className="edit-label-1">
                                          Address
                                        </label>
                                        <textarea
                                          cols="31"
                                          rows="3"
                                          className="store-create-textarea"
                                          placeholder="Enter address"
                                          maxLength={250}
                                        ></textarea>
                                      </div>
                                      <div className="pop-over-div">
                                        <label className="edit-label-1">
                                          Region
                                        </label>
                                        <select
                                          id="inputStatus"
                                          className="edit-dropDwon dropdown-setting"
                                        >
                                          <option>Delhi</option>
                                          <option>2</option>
                                          <option>3</option>
                                        </select>
                                      </div>
                                      <div className="pop-over-div">
                                        <label className="edit-label-1">
                                          Zone
                                        </label>
                                        <select
                                          id="inputStatus"
                                          className="edit-dropDwon dropdown-setting"
                                        >
                                          <option>North</option>
                                          <option>2</option>
                                          <option>3</option>
                                        </select>
                                      </div>
                                      <div className="pop-over-div">
                                        <label className="edit-label-1">
                                          Store Type
                                        </label>
                                        <select
                                          id="inputStatus"
                                          className="edit-dropDwon dropdown-setting"
                                        >
                                          <option>Retail</option>
                                          <option>2</option>
                                          <option>3</option>
                                        </select>
                                      </div>
                                      <div className="pop-over-div">
                                        <label className="edit-label-1">
                                          Contact Details:Email
                                        </label>
                                        <input
                                          type="text"
                                          className="txt-edit-popover"
                                          placeholder="Enter email id"
                                          maxLength={100}
                                        />
                                      </div>
                                      <div className="pop-over-div">
                                        <label className="edit-label-1">
                                          Contact Details:Phone
                                        </label>
                                        <input
                                          type="text"
                                          className="txt-edit-popover"
                                          placeholder="Enter phone no"
                                          maxLength={10}
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
                                          <option>Status</option>
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
                                    onClick={this.handleEditStoreMasterData.bind(
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
              </div>
              <div className="col-md-4">
                <div className="createHierarchyMask">
                  <div className="createSpace">
                    <label className="Create-store-text">CREATE STORE</label>
                    <div className="div-padding-1">
                      <label className="designation-name">Brand</label>
                      <Select
                        getOptionLabel={option => option.brandName}
                        getOptionValue={option => option.brandID}
                        options={this.state.brandData}
                        placeholder="Select"
                        // menuIsOpen={true}
                        closeMenuOnSelect={false}
                        onChange={this.handleBrandChange}
                        value={this.state.selectedBrand}
                        // showNewOptionAtTop={false}
                        isMulti
                      />
                    </div>
                    <div className="div-padding-1">
                      <label className="designation-name">Store Code</label>
                      <input
                        type="text"
                        className="txt-1"
                        placeholder="Enter Store Code"
                        maxLength={10}
                        name="store_code"
                        value={this.state.store_code}
                        onChange={this.hanldeOnChangeData}
                      />
                    </div>
                    <div className="div-padding-1">
                      <label className="designation-name">Store Name</label>
                      <input
                        type="text"
                        className="txt-1"
                        placeholder="Enter Store Name"
                        maxLength={100}
                        name="store_name"
                        value={this.state.store_name}
                        onChange={this.hanldeOnChangeData}
                      />
                    </div>
                    <div className="div-padding-1">
                      <label className="designation-name">State</label>
                      <select
                        className="store-create-select"
                        value={this.state.selectState}
                        onChange={this.handleStateChange}
                      >
                        <option>Select</option>
                        {this.state.stateData !== null &&
                          this.state.stateData.map((item, i) => (
                            <option
                              key={i}
                              value={item.stateID}
                              className="select-category-placeholder"
                            >
                              {item.stateName}
                            </option>
                          ))}
                      </select>
                    </div>
                    <div className="div-padding-1">
                      <label className="designation-name">City</label>
                      <select
                        className="store-create-select"
                        value={this.state.selectCity}
                        onChange={this.handleCityChange}
                      >
                        <option>Select</option>
                        {this.state.cityData !== null &&
                          this.state.cityData.map((item, i) => (
                            <option
                              key={i}
                              value={item.cityID}
                              className="select-category-placeholder"
                            >
                              {item.cityName}
                            </option>
                          ))}
                      </select>
                    </div>
                    <div className="div-padding-1">
                      <label className="designation-name">Pin Code</label>
                      <input
                        type="text"
                        className="txt-1"
                        placeholder="Enter Pin Code"
                        maxLength={11}
                        name="pin_code"
                        value={this.state.pin_code}
                        onChange={this.hanldeOnChangeData}
                      />
                    </div>
                    <div className="div-padding-1">
                      <label className="designation-name">Address</label>
                      <textarea
                        cols="31"
                        rows="3"
                        className="store-create-textarea"
                        placeholder="Enter address"
                        maxLength={250}
                        name="store_Address"
                        value={this.state.store_Address}
                        onChange={this.hanldeOnChangeData}
                      ></textarea>
                    </div>
                    <div className="div-padding-1">
                      <label className="designation-name">Region</label>
                      <select
                        className="store-create-select"
                        value={this.state.selectRegion}
                        onChange={this.handleRegionChange}
                      >
                        <option>Select</option>
                        {this.state.regionData !== null &&
                          this.state.regionData.map((item, s) => (
                            <option key={s} value={item.regionID}>
                              {item.regionName}
                            </option>
                          ))}
                      </select>
                    </div>
                    <div className="div-padding-1">
                      <label className="designation-name">Zone</label>
                      <select
                        className="store-create-select"
                        value={this.state.selectZone}
                        onChange={this.handleZoneChange}
                      >
                        <option>Select</option>
                        {this.state.zoneData !== null &&
                          this.state.zoneData.map((item, s) => (
                            <option key={s} value={item.zoneID}>
                              {item.zoneName}
                            </option>
                          ))}
                      </select>
                    </div>
                    <div className="div-padding-1">
                      <label className="designation-name">Store Type</label>
                      <select
                        className="store-create-select"
                        value={this.state.store_type}
                        onChange={this.handleStoreTypeChange}
                      >
                        <option>Select</option>
                        {this.state.storeTypeData !== null &&
                          this.state.storeTypeData.map((item, t) => (
                            <option key={t} value={item.storeTypeID}>
                              {item.storeTypeName}
                            </option>
                          ))}
                      </select>
                    </div>
                    <div className="div-padding-1">
                      <label className="designation-name">
                        Contact Details:Email
                      </label>
                      <input
                        type="text"
                        className="txt-1"
                        placeholder="Enter email id"
                        maxLength={100}
                        name="contact_email"
                        value={this.state.contact_email}
                        onChange={this.hanldeOnChangeData}
                      />
                    </div>
                    <div className="div-padding-1">
                      <label className="designation-name">
                        Contact Details:Phone
                      </label>
                      <input
                        type="text"
                        className="txt-1"
                        placeholder="Enter phone no"
                        maxLength={10}
                        name="contact_Phone"
                        value={this.state.contact_Phone}
                        onChange={this.hanldeOnChangeData}
                      />
                    </div>
                    <div className="div-padding-1">
                      <label className="designation-name">Status</label>
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
                    <div className="btnSpace">
                      <button
                        className="addBtn-ticket-hierarchy"
                        type="button"
                        onClick={this.handleSubmitData.bind(this)}
                      >
                        ADD
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
                      <a href={Demo.BLANK_LINK}>
                        <img src={DownExcel} alt="download icon" />
                      </a>
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
                  <button className="butn" type="button">
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

export default StoreMaster;
