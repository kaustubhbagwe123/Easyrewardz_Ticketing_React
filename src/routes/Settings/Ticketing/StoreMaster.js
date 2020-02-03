import React, { Component } from "react";
import RedDeleteIcon from "./../../../assets/Images/red-delete-icon.png";
import { UncontrolledPopover, PopoverBody } from "reactstrap";
import DelBigIcon from "./../../../assets/Images/del-big.png";
import FileUpload from "./../../../assets/Images/file.png";
import DelBlack from "./../../../assets/Images/del-black.png";
import DownExcel from "./../../../assets/Images/csv.png";
import UploadCancel from "./../../../assets/Images/upload-cancel.png";
import BlackInfoIcon from "./../../../assets/Images/Info-black.png";
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
      EditBrand: [],
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
      contact_Phone: "",
      loading: false,
<<<<<<< HEAD
      userEditData:{}
      
=======
      updatestoreID: 0,
      updatestoreName: "",
      updatestoreCode: "",
      updatebranName: "",
      updatecityName: "",
      updatestateName: "",
      updatepinCode: 0,
      updatestatus: "",
      updatestrPinCode: "0",
      updatecityID: 0,
      updatestateID: 0,
      updateregionID: 0,
      updatezoneID: 0,
      updatestoreTypeID: 0,
      updatestatusID: false,
      updatebrandIDs: "",
      updatebrandNames: "",
      updatebrand_Names: "",
      updateAddress: "",
      updateEmail: "",
      updatePhone: ""
>>>>>>> e3ae6f57018f74657c0890cbe997cd0ce7fa653f
    };
    this.handleGetStoreMasterData = this.handleGetStoreMasterData.bind(this);
    this.handleGetBrandList = this.handleGetBrandList.bind(this);
    this.handleGetStateList = this.handleGetStateList.bind(this);
    this.handleGetCityList = this.handleGetCityList.bind(this);
    this.handleGetRegionList = this.handleGetRegionList.bind(this);
    this.handleGetStoreTypeList = this.handleGetStoreTypeList.bind(this);
    this.handleUpdateData=this.handleUpdateData.bind(this);
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
    this.setState({ loading: true });
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
          storeData: data,
          loading: false
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
        finalBrandId += this.state.selectedBrand[i].brandID + ",";
      }
    }
    axios({
      method: "post",
      url: config.apiUrl + "/Store/createstore",
      headers: authHeader(),
      data: {
        BrandIDs: finalBrandId,
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

  handleUpdateData(id) {
    debugger;
    let self = this;
    var activeStatus = 0;
    var finalBrandId = "";
    var status = this.state.userEditData.status_ID;
    if (status === "true") {
      activeStatus = 1;
    } else {
      activeStatus = 0;
    }
    if (this.state.userEditData.brand_IDs !== null) {
      for (let i = 0; i < this.state.selectedBrand.length; i++) {
        finalBrandId += this.state.userEditData.brand_IDs[i].brandID + ",";
      }
    }
    axios({
      method: "post",
      url: config.apiUrl + "/Store/editstore",
      headers: authHeader(),
      data: {
        StoreID:id,
        BrandIDs: "25,26",
        StoreCode: this.state.userEditData.store_Code.trim(),
        StoreName: this.state.userEditData.store_Name.trim(),
        StateID: this.state.userEditData.state_ID,
        CityID: this.state.userEditData.city_ID,
        PincodeID: this.state.userEditData.pin_Code,
        Address: this.state.userEditData.address_,
        RegionID: this.state.userEditData.region_ID,
        ZoneID: this.state.userEditData.zone_ID,
        StoreTypeID: this.state.userEditData.storeType_ID,
        StoreEmailID: this.state.userEditData.email_,
        StorePhoneNo: this.state.userEditData.phoneNumber_,
        IsActive: activeStatus
      }
    }).then(function(res) {
      debugger;
      let status = res.data.message;
      if (status === "Success") {
        self.handleGetStoreMasterData();
        NotificationManager.success("Store updated successfully.");
        self.setState({
          store_code: "",
          store_name: "",
          selectedBrand: [],
          pin_code: "",
          address_: "",
          selectCcity_IDity: 0,
          region_ID: 0,
          zone_ID: 0,
          storeType_ID: 0,
          email_: "",
          phoneNumber_: ""
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
    debugger;
<<<<<<< HEAD
    
    this.setState({ selectedBrand: e });
=======
    this.setState({ selectedBrand: e });
  };
  handleEditBrandChange = e => {
    debugger;
    let value = e.target.value;
    this.setState({ EditBrand: value });
>>>>>>> e3ae6f57018f74657c0890cbe997cd0ce7fa653f
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

    this.setStoreUpdateData(data);
  }
  setStoreUpdateData(individualData) {
    debugger;
<<<<<<< HEAD
      var userEditData= individualData; 
     userEditData.store_ID=userEditData.storeID;
    userEditData.store_Name=userEditData.storeName;
    userEditData.store_Code=userEditData.storeCode;
    userEditData.brand_Name=userEditData.brandName;
    userEditData.city_Name=userEditData.cityName;
    userEditData.state_Name=userEditData.stateName;
    userEditData.pin_Code=userEditData.pinCode;
    userEditData.status_=userEditData.status;
    userEditData.strPin_Code=userEditData.strPinCode;
    userEditData.city_ID=userEditData.cityID;
    userEditData.state_ID=userEditData.stateID;
    userEditData.region_ID=userEditData.regionID;
    userEditData.zone_ID=userEditData.zoneID;
    userEditData.storeType_ID=userEditData.storeTypeID;
    userEditData.status_ID=userEditData.statusID;
    userEditData.brand_IDs=userEditData.brandIDs;
    userEditData.brandNames_=userEditData.brandNames;
    userEditData.brand_Names_=userEditData.brand_Names;
    userEditData.address_=userEditData.address;
    userEditData.email_=userEditData.email;
    userEditData.phoneNumber_=userEditData.phoneNumber;
        
  
    this.setState({
      userEditData
    })
    
=======

    let updatestoreID = individualData.storeID,
      updatestoreName = individualData.storeName,
      updatestoreCode = individualData.storeCode,
      updatebranName = individualData.brandName,
      updatecityName = individualData.cityName,
      updatestateName = individualData.stateName,
      updatepinCode = individualData.pinCode,
      updatestatus = individualData.status,
      updatestrPinCode = individualData.strPinCode,
      updatecityID = individualData.cityID,
      updatestateID = individualData.stateID,
      updateregionID = individualData.regionID,
      updatezoneID = individualData.zoneID,
      updatestoreTypeID = individualData.storeTypeID,
      updatestatusID = individualData.statusID,
      updatebrandIDs = individualData.brandIDs,
      updatebrandNames = individualData.brandNames,
      updatebrand_Names = individualData.brand_Names,
      selectState = updatestateID,
      selectCity = updatecityID,
      selectRegion = updateregionID,
      selectZone = updatezoneID,
      store_type = updatestoreTypeID,
      selectStatus = updatestatusID,
      EditBrand = updatebrandIDs;

    this.setState({
      updatestoreID,
      updatestoreName,
      updatestoreCode,
      updatebranName,
      updatecityName,
      updatestateName,
      updatepinCode,
      updatestatus,
      updatestrPinCode,
      updatecityID,
      updatestateID,
      updateregionID,
      updatezoneID,
      updatestoreTypeID,
      updatestatusID,
      updatebrandIDs,
      updatebrandNames,
      updatebrand_Names,
      selectState,
      selectCity,
      selectRegion,
      selectZone,
      store_type,
      selectStatus,
      EditBrand
    });
>>>>>>> e3ae6f57018f74657c0890cbe997cd0ce7fa653f
  }
  handleOnChangeEditData = e => {
    debugger;
    var name = e.target.name;
    var value = e.target.value;

    var data = this.state.userEditData;
    data[name] = value;

    this.setState({
      EditTemp: data
    });
    setTimeout(() => {
      if (this.state.userEditData.status_ID) {
        this.handleGetCityList();
      }
    }, 1);
  };
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
                {this.state.loading === true ? (
                  <div className="loader-icon"></div>
                ) : (
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
                          accessor: "brand_Names",
                          Cell: row => {
                            if (isNaN(row.original.brand_Names)) {
                              return (
                                <div>
                                  <span>
                                    {row.original["brand_Names"]}

                                    <Popover
                                      content={
                                        <div>
                                          <div>
                                            <p className="title">
                                              Brand Name: &nbsp;
                                              <b>
                                                {row.original["brandNames"]}
                                              </b>
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
                          }
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
                          accessor: "strPinCode"
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
                            debugger;
                            var ids = row.original["storeID"];
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
                                        <div className="div-padding-1">
<<<<<<< HEAD
                      <label className="designation-name">Brand</label>
                      <Select
                        getOptionLabel={option => option.brandName}
                        getOptionValue={option => option.brandID}
                        options={this.state.brandData}
                        placeholder="Select"
                        // menuIsOpen={true}
                        name="brand_IDs"
                        closeMenuOnSelect={false}
                        onChange={this.handleOnChangeEditData}
                        value={this.state.userEditData.brand_IDs}
                        // showNewOptionAtTop={false}
                        isMulti
                      />
                    </div>
=======
                                          <label className="designation-name">
                                            Brand
                                          </label>
                                          <Select
                                            getOptionLabel={option =>
                                              option.brandName
                                            }
                                            getOptionValue={option =>
                                              option.brandID
                                            }
                                            options={this.state.brandData}
                                            placeholder="Select"
                                            // menuIsOpen={true}
                                            closeMenuOnSelect={false}
                                            onChange={this.handleBrandChange}
                                            value={this.state.EditBrand}
                                            // showNewOptionAtTop={false}
                                            isMulti
                                          />
                                        </div>
>>>>>>> e3ae6f57018f74657c0890cbe997cd0ce7fa653f
                                        <div className="pop-over-div">
                                          <label className="edit-label-1">
                                            Store Code
                                          </label>
                                          <input
                                            type="text"
                                            className="txt-1"
                                            
                                            placeholder="Enter Store Code"
                                            name="store_Code"
                                            maxLength={10}
                                            value={this.state.userEditData.store_Code}
                                            onChange={this.handleOnChangeEditData}
                                          
                                          />
                                        </div>
                                        <div className="pop-over-div">
                                          <label className="edit-label-1">
                                            Store Name
                                          </label>
                                          <input
                                            type="text"
                                            className="txt-1"
                                            placeholder="Enter Store Name"
                                            name="store_Name"
                                            maxLength={100}
                                            value={this.state.userEditData.store_Name}
                                            onChange={this.handleOnChangeEditData}
                                          />
                                        </div>
                                        <div className="pop-over-div">
                                          <label className="edit-label-1">
                                            State
                                          </label>
                                          <select
                                            className="store-create-select"
                                            name="state_ID"
                                            value={this.state.userEditData.state_ID}
                                            onChange={this.handleOnChangeEditData}
                                          >
<<<<<<< HEAD
                                            <option >select</option>
=======
                                            <option
                                              value={this.state.updatestateID}
                                            >
                                              {this.state.updatestateName}
                                            </option>
>>>>>>> e3ae6f57018f74657c0890cbe997cd0ce7fa653f
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
<<<<<<< HEAD
                                          <select className="edit-dropDwon dropdown-setting"
                                          name="city_ID"
                                          value={this.state.userEditData.city_ID}
                                          onChange={this.handleOnChangeEditData}
                                          >
                                            <option >select</option>
=======
                                          <select
                                            className="edit-dropDwon dropdown-setting"
                                            value={this.state.selectCity}
                                            onChange={this.handleCityChange}
                                          >
                                            <option
                                              value={this.state.updatecityID}
                                            >
                                              {this.state.updatecityName}
                                            </option>
>>>>>>> e3ae6f57018f74657c0890cbe997cd0ce7fa653f
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
                                            className="txt-1"
                                            placeholder="Enter Pin Code"
                                            name="pin_Code"
                                            maxLength={11}
                                            value={this.state.userEditData.pin_Code}
                                            onChange={this.handleOnChangeEditData}
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
                                            name="address_"
                                            maxLength={250}
<<<<<<< HEAD
                                            value={this.state.userEditData.address_}
                                            onChange={this.handleOnChangeEditData}
=======
>>>>>>> e3ae6f57018f74657c0890cbe997cd0ce7fa653f
                                          ></textarea>
                                        </div>
                                        <div className="pop-over-div">
                                          <label className="edit-label-1">
                                            Region
                                          </label>
                                          <select
<<<<<<< HEAD
                        className="store-create-select"
                        name="region_ID"
                        value={this.state.userEditData.region_ID}
                        onChange={this.handleOnChangeEditData}
                      >
                        <option>Select</option>
                        {this.state.regionData !== null &&
                          this.state.regionData.map((item, s) => (
                            <option key={s} value={item.regionID}>
                              {item.regionName}
                            </option>
                          ))}
                      </select>
=======
                                            className="store-create-select"
                                            value={this.state.selectRegion}
                                            onChange={this.handleRegionChange}
                                          >
                                            <option>Select</option>
                                            {this.state.regionData !== null &&
                                              this.state.regionData.map(
                                                (item, s) => (
                                                  <option
                                                    key={s}
                                                    value={item.regionID}
                                                  >
                                                    {item.regionName}
                                                  </option>
                                                )
                                              )}
                                          </select>
>>>>>>> e3ae6f57018f74657c0890cbe997cd0ce7fa653f
                                        </div>
                                        <div className="pop-over-div">
                                          <label className="edit-label-1">
                                            Zone
                                          </label>
                                          <select
<<<<<<< HEAD
                        className="store-create-select"
                        name="zone_ID"
                        value={this.state.userEditData.zone_ID}
                        onChange={this.handleOnChangeEditData}
                      >
                        <option>Select</option>
                        {this.state.zoneData !== null &&
                          this.state.zoneData.map((item, s) => (
                            <option key={s} value={item.zoneID}>
                              {item.zoneName}
                            </option>
                          ))}
                      </select>
=======
                                            className="store-create-select"
                                            value={this.state.selectZone}
                                            onChange={this.handleZoneChange}
                                          >
                                            <option>Select</option>
                                            {this.state.zoneData !== null &&
                                              this.state.zoneData.map(
                                                (item, s) => (
                                                  <option
                                                    key={s}
                                                    value={item.zoneID}
                                                  >
                                                    {item.zoneName}
                                                  </option>
                                                )
                                              )}
                                          </select>
>>>>>>> e3ae6f57018f74657c0890cbe997cd0ce7fa653f
                                        </div>
                                        <div className="pop-over-div">
                                          <label className="edit-label-1">
                                            Store Type
                                          </label>
                                          <select
<<<<<<< HEAD
                        className="store-create-select"
                        name="storeType_ID"
                        value={this.state.userEditData.storeType_ID}
                        onChange={this.handleOnChangeEditData}
                      >
                        <option>Select</option>
                        {this.state.storeTypeData !== null &&
                          this.state.storeTypeData.map((item, t) => (
                            <option key={t} value={item.storeTypeID}>
                              {item.storeTypeName}
                            </option>
                          ))}
                      </select>
=======
                                            className="store-create-select"
                                            value={this.state.store_type}
                                            onChange={
                                              this.handleStoreTypeChange
                                            }
                                          >
                                            <option>Select</option>
                                            {this.state.storeTypeData !==
                                              null &&
                                              this.state.storeTypeData.map(
                                                (item, t) => (
                                                  <option
                                                    key={t}
                                                    value={item.storeTypeID}
                                                  >
                                                    {item.storeTypeName}
                                                  </option>
                                                )
                                              )}
                                          </select>
>>>>>>> e3ae6f57018f74657c0890cbe997cd0ce7fa653f
                                        </div>
                                        <div className="pop-over-div">
                                          <label className="edit-label-1">
                                            Contact Details:Email
                                          </label>
                                          <input
                                            type="text"
                                            className="txt-1"
                                            placeholder="Enter email id"
                                            name="email_"
                                            maxLength={100}
<<<<<<< HEAD
                                            value={this.state.userEditData.email_}
                                            onChange={this.handleOnChangeEditData}
=======
>>>>>>> e3ae6f57018f74657c0890cbe997cd0ce7fa653f
                                          />
                                        </div>
                                        <div className="pop-over-div">
                                          <label className="edit-label-1">
                                            Contact Details:Phone
                                          </label>
                                          <input
                                            type="text"
                                            className="txt-1"
                                            placeholder="Enter phone no"
                                            name="phoneNumber_"
                                            maxLength={10}
                                            value={this.state.userEditData.phoneNumber_}
                                            onChange={this.handleOnChangeEditData}
                                          />
                                        </div>
                                        <div className="pop-over-div">
                                          <label className="edit-label-1">
                                            Status
                                          </label>
                                          <select
<<<<<<< HEAD
                        className="form-control dropdown-setting"
                        name="status_ID"
                        value={this.state.userEditData.status_ID}
                        onChange={this.handleOnChangeEditData}
                      >
                        <option value="true">Active</option>
                        <option value="false" >Inactive</option>
                      </select>
=======
                                            className="form-control dropdown-setting"
                                            value={this.state.selectStatus}
                                            onChange={this.handleStatusChange}
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
>>>>>>> e3ae6f57018f74657c0890cbe997cd0ce7fa653f
                                        </div>
                                        <br />
                                        <div>
                                          <a
                                            className="pop-over-cancle"
                                            href={Demo.BLANK_LINK}
                                          >
                                            CANCEL
                                          </a>
                                          <button className="pop-over-button"
                                          onClick={this.handleUpdateData.bind(this,row.original.storeID)}
                                          >
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
                )}
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
