import React, { Component, useState } from "react";
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
import { CSVLink } from "react-csv";
import Modal from "react-responsive-modal";
import Sorting from "./../../../assets/Images/sorting.png";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";

// import StoreEditContent from "./../../CommanComponent/StoreEditContent";

class StoreMaster extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fileName: "",
      selectState: 0,
      selectCity: 0,
      selectedBrand: [],
      EditBrand: [],
      selectStatus: "",
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
      userEditData: {},
      store_codeCompulsion: "",
      store_nameCompulsion: "",
      pin_codeCompulsion: "",
      store_AddressCompulsion: "",
      RegionCompulsion: "",
      ZoneCompulsion: "",
      store_typeCompulsion: "",
      contact_emailCompulsion: "",
      contact_PhoneCompulsion: "",
      StateCompulsion: "",
      CityCompulsion: "",
      brandCompulsion: "",
      statusCompulsion: "",
      StatusModel: false,
      sortAllData: [],
      sortStoreName: [],
      sortStoreCode: [],
      sortCity: [],
      sortState: [],
      sortPincode: [],
      sortBrandName:[],
      sortColumn: "",
      editmodel: false,
      modalSelectedBrand: [],
      editSaveLoading: false,
      emailFlag: true,
      EditEmailFlag: true,
      pinCodeFlag: true,
      phoneFlag: true,
      EditPhoneFlag: true,
      editBrandValidation: "",
      editStoreCodeValidation: "",
      editStoreNameValidation: "",
      editStateValidation: "",
      editCityValidation: "",
      editPinCodeValidation: "",
      editStoreAddressValidation: "",
      editRegionValidation: "",
      editZoneValidation: "",
      editStoreTypeValidation: "",
      editContactEmailValidation: "",
      editContactPhoneValidation: "",
      editStatusValidation: "",
      storeNameColor: "",
      storeCodecolor: "",
      cityColor: "",
      stateColor: "",
      pincodeColor: "",
      brandnameColor:"",
      sortHeader:""
    };
    this.handleGetStoreMasterData = this.handleGetStoreMasterData.bind(this);
    this.handleGetBrandList = this.handleGetBrandList.bind(this);
    this.handleGetStateList = this.handleGetStateList.bind(this);
    this.handleGetCityList = this.handleGetCityList.bind(this);
    this.handleGetRegionList = this.handleGetRegionList.bind(this);
    this.handleGetStoreTypeList = this.handleGetStoreTypeList.bind(this);
    this.handleUpdateData = this.handleUpdateData.bind(this);
    this.StatusOpenModel = this.StatusOpenModel.bind(this);
    this.StatusCloseModel = this.StatusCloseModel.bind(this);
    this.toggleEditModal = this.toggleEditModal.bind(this);
  }
  componentDidMount() {
    debugger;
    this.handleGetStoreMasterData();
    this.handleGetBrandList();
    this.handleGetStateList();
    this.handleGetRegionList();
    this.handleGetStoreTypeList();
  }

  sortStatusAtoZ() {
    var itemsArray = [];
    itemsArray = this.state.hierarchyData;

    itemsArray.sort(function(a, b) {
      return a.ticketStatus > b.ticketStatus ? 1 : -1;
    });

    this.setState({
      hierarchyData: itemsArray
    });
    this.StatusCloseModel();
  }
  sortStatusZtoA() {
    var itemsArray = [];
    itemsArray = this.state.hierarchyData;
    itemsArray.sort((a, b) => {
      return a.ticketStatus < b.ticketStatus;
    });
    this.setState({
      hierarchyData: itemsArray
    });
    this.StatusCloseModel();
  }

  StatusOpenModel(data,header) {
    this.setState({ StatusModel: true, sortColumn: data,sortHeader:header});
  }
  StatusCloseModel() {
    this.setState({ StatusModel: false });
  }

  setSortCheckStatus = (column, e) => {
    var itemsArray = [];
    var data = e.currentTarget.value;
    this.setState({
      storeNameColor: "",
      storeCodecolor: "",
      cityColor: "",
      stateColor: "",
      pincodeColor: "",
      brandnameColor: ""
    });
    if (column === "all") {
      itemsArray = this.state.sortAllData;
    } else if (column === "storeName") {
      this.state.storeData = this.state.sortAllData;
      itemsArray = this.state.storeData.filter(a => a.storeName === data);
      this.setState({
        storeNameColor: "sort-column"
      });
    } else if (column === "storeCode") {
      this.state.storeData = this.state.sortAllData;
      itemsArray = this.state.storeData.filter(a => a.storeCode === data);
      this.setState({
        storeCodecolor: "sort-column"
      });
    } else if (column === "cityName") {
      this.state.storeData = this.state.sortAllData;
      itemsArray = this.state.storeData.filter(a => a.cityName === data);
      this.setState({
        cityColor: "sort-column"
      });
    } else if (column === "stateName") {
      this.state.storeData = this.state.sortAllData;
      itemsArray = this.state.storeData.filter(a => a.stateName === data);
      this.setState({
        stateColor: "sort-column"
      });
    } else if (column === "strPinCode") {
      this.state.storeData = this.state.sortAllData;
      itemsArray = this.state.storeData.filter(a => a.strPinCode === data);
      this.setState({
        pincodeColor: "sort-column"
      });
    }else if (column === "brandNames") {
      this.state.storeData = this.state.sortAllData;
      itemsArray = this.state.storeData.filter(a => a.brandNames === data);
      this.setState({
        brandnameColor: "sort-column"
      });
    }


    this.setState({
      storeData: itemsArray
    });
    this.StatusCloseModel();
  };

  handleGetStoreMasterData() {
    debugger;
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

      if (data !== null) {
        self.state.sortAllData = data;
        var unique = [];
        var distinct = [];
        for (let i = 0; i < data.length; i++) {
          if (!unique[data[i].storeName]) {
            distinct.push(data[i].storeName);
            unique[data[i].storeName] = 1;
          }
        }
        for (let i = 0; i < distinct.length; i++) {
          self.state.sortStoreName.push({ storeName: distinct[i] });
        }

        var unique = [];
        var distinct = [];
        for (let i = 0; i < data.length; i++) {
          if (!unique[data[i].storeCode]) {
            distinct.push(data[i].storeCode);
            unique[data[i].storeCode] = 1;
          }
        }
        for (let i = 0; i < distinct.length; i++) {
          self.state.sortStoreCode.push({ storeCode: distinct[i] });
        }

        var unique = [];
        var distinct = [];
        for (let i = 0; i < data.length; i++) {
          if (!unique[data[i].cityName]) {
            distinct.push(data[i].cityName);
            unique[data[i].cityName] = 1;
          }
        }
        for (let i = 0; i < distinct.length; i++) {
          self.state.sortCity.push({ cityName: distinct[i] });
        }

        var unique = [];
        var distinct = [];
        for (let i = 0; i < data.length; i++) {
          if (!unique[data[i].stateName]) {
            distinct.push(data[i].stateName);
            unique[data[i].stateName] = 1;
          }
        }
        for (let i = 0; i < distinct.length; i++) {
          self.state.sortState.push({ stateName: distinct[i] });
        }

        var unique = [];
        var distinct = [];
        for (let i = 0; i < data.length; i++) {
          if (!unique[data[i].strPinCode]) {
            distinct.push(data[i].strPinCode);
            unique[data[i].strPinCode] = 1;
          }
        }
        for (let i = 0; i < distinct.length; i++) {
          self.state.sortPincode.push({ strPinCode: distinct[i] });
        }

        var unique = [];
        var distinct = [];
        for (let i = 0; i < data.length; i++) {
          if (!unique[data[i].brandNames]) {
            distinct.push(data[i].brandNames);
            unique[data[i].brandNames] = 1;
          }
        }
        for (let i = 0; i < distinct.length; i++) {
          self.state.sortBrandName.push({ brandNames: distinct[i] });
        }
      }

      if (status === "Success") {
        if (data !== null) {
          self.setState({
            storeData: data,
            loading: false
          });
        } else {
          self.setState({
            storeData: [],
            loading: false
          });
        }
      } else {
        self.setState({
          storeData: [],
          loading: false
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
      let status = res.data.message;
      let data = res.data.responseData;
      if (status === "Success") {
        self.setState({ stateData: data });
      } else {
        self.setState({ stateData: [] });
      }
    });
  }
  handleGetCityList(id) {
    let self = this;
    var stateId;
    if (id) {
      stateId = id;
    } else {
      stateId = this.state.selectState;
    }
    axios({
      method: "post",
      url: config.apiUrl + "/Master/getcitylist",
      headers: authHeader(),
      params: {
        StateId: stateId
      }
    }).then(function(res) {
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
      if (status === "Record deleted Successfully") {
        self.handleGetStoreMasterData();
        NotificationManager.success("Store deleted successfully.", "", 1000);
      }
    });
  }
  handleSubmitData() {
    debugger;
    if (
      this.state.selectedBrand !== null &&
      this.state.store_code.length > 0 &&
      this.state.store_name.length > 0 &&
      this.state.pin_code.length > 0 &&
      this.state.store_Address.length > 0 &&
      this.state.selectRegion > 0 &&
      this.state.selectZone > 0 &&
      this.state.store_type > 0 &&
      this.state.contact_email.length > 0 &&
      this.state.contact_Phone.length > 0 &&
      this.state.selectState > 0 &&
      this.state.selectCity > 0 &&
      this.state.selectStatus !== "" &&
      this.state.emailFlag === true &&
      this.state.phoneFlag === true &&
      this.state.pinCodeFlag === true
    ) {
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
          Address: this.state.store_Address.trim(),
          RegionID: this.state.selectRegion,
          ZoneID: this.state.selectZone,
          StoreTypeID: this.state.store_type,
          StoreEmailID: this.state.contact_email.trim(),
          StorePhoneNo: this.state.contact_Phone,
          IsActive: activeStatus
        }
      }).then(function(res) {
        debugger;
        let status = res.data.message;
        if (status === "Success") {
          self.handleGetStoreMasterData();
          NotificationManager.success("Store added successfully.", "", 1000);
          self.setState({
            store_code: "",
            store_name: "",
            selectedBrand: [],
            pin_code: "",
            store_Address: "",
            selectCity: 0,
            selectState: 0,
            selectRegion: 0,
            selectZone: 0,
            store_type: 0,
            selectStatus: "",
            contact_email: "",
            contact_Phone: "",
            store_codeCompulsion: "",
            store_nameCompulsion: "",
            pin_codeCompulsion: "",
            store_AddressCompulsion: "",
            RegionCompulsion: "",
            ZoneCompulsion: "",
            store_typeCompulsion: "",
            contact_emailCompulsion: "",
            contact_PhoneCompulsion: "",
            StateCompulsion: "",
            CityCompulsion: "",
            brandCompulsion: "",
            statusCompulsion: "",
            cityData: []
          });
        } else {
          NotificationManager.error("Store Not added.", "", 1000);
        }
      });
    } else {
      this.setState({
        store_codeCompulsion: "Please Enter Store Code.",
        store_nameCompulsion: "Please Enter Store Name.",
        pin_codeCompulsion: "Please Enter PinCode.",
        store_AddressCompulsion: "Please Enter Address.",
        RegionCompulsion: "Please Select Region.",
        ZoneCompulsion: "Please Select Zone.",
        store_typeCompulsion: "Please Select Store Type.",
        contact_emailCompulsion: "Please Enter EmailID.",
        contact_PhoneCompulsion: "Please Enter Phone Number.",
        StateCompulsion: "Please Select State.",
        CityCompulsion: "Please Select City.",
        brandCompulsion: "Please Select Brand.",
        statusCompulsion: "Please Select Status."
      });
    }
  }

  handleUpdateData() {
    debugger;
    if (
      this.state.modalSelectedBrand !== null &&
      this.state.modalSelectedBrand.length > 0 &&
      this.state.userEditData.store_Code.length > 0 &&
      this.state.userEditData.store_Name.length > 0 &&
      this.state.userEditData.state_ID !== "0" &&
      this.state.userEditData.city_ID !== "0" &&
      this.state.userEditData.strPin_Code.length > 0 &&
      // this.state.userEditData.status_ID === "0" &&
      this.state.userEditData.region_ID !== "0" &&
      this.state.userEditData.zone_ID !== "0" &&
      this.state.userEditData.storeType_ID !== "0" &&
      this.state.userEditData.email_.length > 0 &&
      this.state.EditEmailFlag === true &&
      this.state.EditPhoneFlag === true &&
      this.state.userEditData.phoneNumber_.length > 0 &&
      this.state.userEditData.address_.length > 0
    ) {
      let self = this;
      var activeStatus = 0;
      var finalBrandId = "";
      var status = this.state.userEditData.status_ID;
      if (status === true) {
        activeStatus = 1;
      } else {
        activeStatus = 0;
      }
      debugger;
      if (this.state.modalSelectedBrand.length > 0) {
        for (let i = 0; i < this.state.modalSelectedBrand.length; i++) {
          finalBrandId += this.state.modalSelectedBrand[i].brandID + ",";
        }
      }
      this.setState({ editSaveLoading: true });
      axios({
        method: "post",
        url: config.apiUrl + "/Store/editstore",
        headers: authHeader(),
        data: {
          StoreID: this.state.userEditData.store_ID,
          BrandIDs: finalBrandId,
          StoreCode: this.state.userEditData.store_Code,
          StoreName: this.state.userEditData.store_Name,
          StateID: this.state.userEditData.state_ID,
          CityID: this.state.userEditData.city_ID,
          PincodeID: this.state.userEditData.strPin_Code,
          Address: this.state.userEditData.address_,
          RegionID: this.state.userEditData.region_ID,
          ZoneID: this.state.userEditData.zone_ID,
          StoreTypeID: this.state.userEditData.storeType_ID,
          StoreEmailID: this.state.userEditData.email_,
          StorePhoneNo: this.state.userEditData.phoneNumber_,
          IsActive: activeStatus
        }
      })
        .then(function(res) {
          let status = res.data.message;
          if (status === "Success") {
            self.handleGetStoreMasterData();
            NotificationManager.success(
              "Store updated successfully.",
              "",
              1000
            );

            self.setState({
              editSaveLoading: false,
              editmodel: false,
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
              phoneNumber_: "",
              editBrandValidation: "",
              editStoreCodeValidation: "",
              editStoreNameValidation: "",
              editStateValidation: "",
              editCityValidation: "",
              editPinCodeValidation: "",
              editStoreAddressValidation: "",
              editRegionValidation: "",
              editZoneValidation: "",
              editStoreTypeValidation: "",
              editContactEmailValidation: "",
              editContactPhoneValidation: "",
              // editStatusValidation: ""
            });
          }
        })
        .catch(response => {
          console.log(response);
        });
    } else {
      this.setState({
        editBrandValidation: "Please Select Brand.",
        editStoreCodeValidation: "Please Enter Store Code.",
        editStoreNameValidation: "Please Enter Store Name",
        editStateValidation: "Please Select State.",
        editCityValidation: "Please Select City.",
        editPinCodeValidation: "Please Enter Pin Code.",
        editStoreAddressValidation: "Please Enter Store Address.",
        editRegionValidation: "Please Select Region.",
        editZoneValidation: "Please Select Zone.",
        editStoreTypeValidation: "Please Select Store Type.",
        editContactEmailValidation: "Please Enter EmailID.",
        editContactPhoneValidation: "Please Enter Phone Number.",
        // editStatusValidation: "Please Select Status."
      });
    }
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
    if (e === null) {
      e = [];
    }
    this.setState({ selectedBrand: e });
  };
  handleEditBrandChange = e => {
    let value = e.target.value;
    this.setState({ EditBrand: value });
  };

  handleStateChange = e => {
    debugger;
    let value = parseInt(e.target.value);
    this.setState({ selectState: value, cityData: [] });
    setTimeout(() => {
      if (this.state.selectState) {
        this.handleGetCityList();
      }
    }, 1);
  };

  handleEditStoreMasterData(data) {
    this.setStoreUpdateData(data);
  }
  setStoreUpdateData(individualData) {
    debugger;
    var userEditData = {};
    userEditData.store_ID = individualData.storeID;
    userEditData.store_Name = individualData.storeName;
    userEditData.store_Code = individualData.storeCode;
    userEditData.brand_Name = individualData.brandName;
    userEditData.city_Name = individualData.cityName;
    userEditData.state_Name = individualData.stateName;
    userEditData.pin_Code = individualData.pinCode;
    userEditData.status_ = individualData.status;
    userEditData.strPin_Code = individualData.strPinCode;
    userEditData.city_ID = individualData.cityID;
    userEditData.state_ID = individualData.stateID;
    userEditData.region_ID = individualData.regionID;
    userEditData.zone_ID = individualData.zoneID;
    userEditData.storeType_ID = individualData.storeTypeID;
    userEditData.status_ID = individualData.statusID;
    userEditData.brand_IDs = individualData.brandIDs;
    userEditData.brandNames_ = individualData.brandNames;
    userEditData.brand_Names_ = individualData.brand_Names;
    userEditData.address_ = individualData.address;
    userEditData.email_ = individualData.email;
    userEditData.phoneNumber_ = individualData.phoneNumber;

    var mBrandData = individualData.brandIDs.split(",");
    var modalSelectedBrand = [];
    for (let i = 0; i < mBrandData.length; i++) {
      var data = this.state.brandData.filter(x => x.brandID == mBrandData[i]);
      if (data.length > 0) {
        modalSelectedBrand.push(data[0]);
      }
    }

    this.handleGetCityList(individualData.stateID);

    this.setState({
      editmodel: true,
      userEditData,
      modalSelectedBrand
    });
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
    let value = parseInt(e.target.value);
    this.setState({ selectCity: value });
  };

  handleZoneChange = e => {
    let value = parseInt(e.target.value);
    this.setState({ selectZone: value });
  };

  handleRegionChange = e => {
    let value = parseInt(e.target.value);
    this.setState({ selectRegion: value });
  };

  handleStoreTypeChange = e => {
    let value = parseInt(e.target.value);
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
  hanldeOnEmailChange = e => {
    debugger;
    this.setState({
      [e.target.name]: e.target.value
    });
    var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if (e.target.value == "") {
      this.setState({
        emailFlag: true
      });
    } else if (reg.test(e.target.value) == false) {
      this.setState({
        emailFlag: false
      });
    } else {
      this.setState({
        emailFlag: true
      });
    }
  };
  hanldeOnPhoneChange = e => {
    debugger;
    var name = e.target.name;
    if (name === "phoneNumber_") {
      var reg = /^[0-9\b]+$/;
      if (e.target.value === "" || reg.test(e.target.value)) {
        var value = e.target.value;
        var userEditData = this.state.userEditData;
        userEditData[name] = value;
        this.setState({ userEditData });
      } else {
        e.target.value = "";
      }
      if (e.target.value.length == 10 || e.target.value.length == 0) {
        this.setState({
          phoneFlag: true
        });
      } else {
        this.setState({
          phoneFlag: false
        });
      }
    } else {
      var reg = /^[0-9\b]+$/;
      if (e.target.value === "" || reg.test(e.target.value)) {
        this.setState({ [e.target.name]: e.target.value });
      } else {
        e.target.value = "";
      }
      if (e.target.value.length == 10 || e.target.value.length == 0) {
        this.setState({
          phoneFlag: true
        });
      } else {
        this.setState({
          phoneFlag: false
        });
      }
    }
  };
  hanldeOnPinCodeChange = e => {
    debugger;
    var reg = /^[0-9\b]+$/;
    if (e.target.value === "" || reg.test(e.target.value)) {
      this.setState({ [e.target.name]: e.target.value });
    } else {
      e.target.value = "";
    }
    if (e.target.value.length == 6 || e.target.value.length == 0) {
      this.setState({
        pinCodeFlag: true
      });
    } else {
      this.setState({
        pinCodeFlag: false
      });
    }
  };
  toggleEditModal() {
    this.setState({ editmodel: false });
  }

  callBackEdit = (RoleName, Status, rowData) => {
    debugger;
    // this.setState({RoleName,updateRoleisActive:Status})
    // this.state.RoleName = RoleName;
    // this.state.updateRoleisActive = Status;
    // this.state.rowData = rowData;
  };

  handleModalEditData = e => {
    debugger;

    var name = e.target.name;
    var value = e.target.value;
    var userEditData = this.state.userEditData;
    userEditData[name] = value;
    this.setState({ userEditData });

    if ((name = "state_ID")) {
      this.handleGetCityList(value);
    }
    // Email validation
    if (name === "email_") {
      var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
      if (e.target.value == "") {
        this.setState({
          EditEmailFlag: true
        });
      } else if (reg.test(e.target.value) == false) {
        this.setState({
          EditEmailFlag: false
        });
      } else {
        this.setState({
          EditEmailFlag: true
        });
      }
    }
  };

  handleModalBrandChange = e => {
    this.setState({ modalSelectedBrand: e });
  };

  render() {
    const { storeData } = this.state;
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
              <label style={{color:"#0066cc",fontWeight:"bold"}}>{this.state.sortHeader}</label>
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
              <a href=""
               style={{margin:"0 25px",textDecoration:"underline"}} 
                onClick={this.setSortCheckStatus.bind(this, "all")}
                >clear search</a>
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
                {this.state.sortColumn === "storeName"
                  ? this.state.sortStoreName !== null &&
                    this.state.sortStoreName.map((item, i) => (
                      <div className="filter-checkbox">
                        <input
                          type="checkbox"
                          name="filter-type"
                          id={"fil-open" + item.storeName}
                          value={item.storeName}
                          onChange={this.setSortCheckStatus.bind(
                            this,
                            "storeName"
                          )}
                        />
                        <label htmlFor={"fil-open" + item.storeName}>
                          <span className="table-btn table-blue-btn">
                            {item.storeName}
                          </span>
                        </label>
                      </div>
                    ))
                  : null}

                {this.state.sortColumn === "storeCode"
                  ? this.state.sortStoreCode !== null &&
                    this.state.sortStoreCode.map((item, i) => (
                      <div className="filter-checkbox">
                        <input
                          type="checkbox"
                          name="filter-type"
                          id={"fil-open" + item.storeCode}
                          value={item.storeCode}
                          onChange={this.setSortCheckStatus.bind(
                            this,
                            "storeCode"
                          )}
                        />
                        <label htmlFor={"fil-open" + item.storeCode}>
                          <span className="table-btn table-blue-btn">
                            {item.storeCode}
                          </span>
                        </label>
                      </div>
                    ))
                  : null}

                {this.state.sortColumn === "cityName"
                  ? this.state.sortCity !== null &&
                    this.state.sortCity.map((item, i) => (
                      <div className="filter-checkbox">
                        <input
                          type="checkbox"
                          name="filter-type"
                          id={"fil-open" + item.cityName}
                          value={item.cityName}
                          onChange={this.setSortCheckStatus.bind(
                            this,
                            "cityName"
                          )}
                        />
                        <label htmlFor={"fil-open" + item.cityName}>
                          <span className="table-btn table-blue-btn">
                            {item.cityName}
                          </span>
                        </label>
                      </div>
                    ))
                  : null}

                {this.state.sortColumn === "stateName"
                  ? this.state.sortState !== null &&
                    this.state.sortState.map((item, i) => (
                      <div className="filter-checkbox">
                        <input
                          type="checkbox"
                          name="filter-type"
                          id={"fil-open" + item.stateName}
                          value={item.stateName}
                          onChange={this.setSortCheckStatus.bind(
                            this,
                            "stateName"
                          )}
                        />
                        <label htmlFor={"fil-open" + item.stateName}>
                          <span className="table-btn table-blue-btn">
                            {item.stateName}
                          </span>
                        </label>
                      </div>
                    ))
                  : null}

                {this.state.sortColumn === "strPinCode"
                  ? this.state.sortPincode !== null &&
                    this.state.sortPincode.map((item, i) => (
                      <div className="filter-checkbox">
                        <input
                          type="checkbox"
                          name="filter-type"
                          id={"fil-open" + item.strPinCode}
                          value={item.strPinCode}
                          onChange={this.setSortCheckStatus.bind(
                            this,
                            "strPinCode"
                          )}
                        />
                        <label htmlFor={"fil-open" + item.strPinCode}>
                          <span className="table-btn table-blue-btn">
                            {item.strPinCode}
                          </span>
                        </label>
                      </div>
                    ))
                  : null}

                  
                {this.state.sortColumn === "brandNames"
                  ? this.state.sortBrandName !== null &&
                    this.state.sortBrandName.map((item, i) => (
                      <div className="filter-checkbox">
                        <input
                          type="checkbox"
                          name="filter-type"
                          id={"fil-open" + item.brandNames}
                          value={item.brandNames}
                          onChange={this.setSortCheckStatus.bind(
                            this,
                            "brandNames"
                          )}
                        />
                        <label htmlFor={"fil-open" + item.brandNames}>
                          <span className="table-btn table-blue-btn">
                            {item.brandNames}
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
          <Link to={Demo.BLANK_LINK} className="header-path active">
            Store Master
          </Link>
        </div>
        <div className="container-fluid">
          <div className="store-settings-cntr settingtable">
            <div className="row">
              <div className="col-md-8">
                {this.state.loading === true ? (
                  <div className="loader-icon loader-icon-height"></div>
                ) : (
                  <div className="table-cntr table-height TicketStoreReact">
                    <ReactTable
                      data={storeData}
                      columns={[
                        {
                          Header: (
                            <span
                              className={this.state.storeNameColor}
                              onClick={this.StatusOpenModel.bind(
                                this,
                                "storeName","Store Name"
                              )}
                            >
                              Store Name
                              <FontAwesomeIcon icon={faCaretDown} />
                            </span>
                          ),
                          accessor: "storeName"
                        },
                        {
                          Header: (
                            <span
                              className={this.state.storeCodecolor}
                              onClick={this.StatusOpenModel.bind(
                                this,
                                "storeCode","Store Code"
                              )}
                            >
                              Store Code
                              <FontAwesomeIcon icon={faCaretDown} />
                            </span>
                          ),
                          accessor: "storeCode"
                        },
                        {
                          Header: (
                            <span
                            className={this.state.brandnameColor}
                            onClick={this.StatusOpenModel.bind(
                              this,
                              "brandNames","Brand Names"
                            )}
                            >
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
                            } else {
                              return null;
                            }
                          }
                        },
                        {
                          Header: (
                            <span
                              className={this.state.cityColor}
                              onClick={this.StatusOpenModel.bind(
                                this,
                                "cityName","City"
                              )}
                            >
                              City
                              <FontAwesomeIcon icon={faCaretDown} />
                            </span>
                          ),
                          accessor: "cityName"
                        },
                        {
                          Header: (
                            <span
                              className={this.state.stateColor}
                              onClick={this.StatusOpenModel.bind(
                                this,
                                "stateName","State"
                              )}
                            >
                              State
                              <FontAwesomeIcon icon={faCaretDown} />
                            </span>
                          ),
                          accessor: "stateName"
                        },
                        {
                          Header: (
                            <span
                            className={this.state.pincodeColor}
                            onClick={this.StatusOpenModel.bind(this,"strPinCode","Pin Code")}
                            >
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

                                  <button
                                    className="react-tabel-button ReNewBtn"
                                    type="button"
                                    onClick={this.handleEditStoreMasterData.bind(
                                      this,
                                      row.original
                                    )}
                                  >
                                    EDIT
                                  </button>
                                </span>
                              </>
                            );
                          }
                        }
                      ]}
                      resizable={false}
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
                      {this.state.selectedBrand.length === 0 && (
                        <p style={{ color: "red", marginBottom: "0px" }}>
                          {this.state.brandCompulsion}
                        </p>
                      )}
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
                      {this.state.store_code.length === 0 && (
                        <p style={{ color: "red", marginBottom: "0px" }}>
                          {this.state.store_codeCompulsion}
                        </p>
                      )}
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
                      {this.state.store_name.length === 0 && (
                        <p style={{ color: "red", marginBottom: "0px" }}>
                          {this.state.store_nameCompulsion}
                        </p>
                      )}
                    </div>
                    <div className="div-padding-1">
                      <label className="designation-name">State</label>
                      <select
                        className="store-create-select"
                        value={this.state.selectState}
                        onChange={this.handleStateChange}
                      >
                        <option value={0}>Select</option>
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
                      {this.state.selectState === 0 && (
                        <p style={{ color: "red", marginBottom: "0px" }}>
                          {this.state.StateCompulsion}
                        </p>
                      )}
                    </div>
                    <div className="div-padding-1">
                      <label className="designation-name">City</label>
                      <select
                        className="store-create-select"
                        value={this.state.selectCity}
                        onChange={this.handleCityChange}
                      >
                        <option value="0">Select</option>
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
                      {this.state.selectCity === 0 && (
                        <p style={{ color: "red", marginBottom: "0px" }}>
                          {this.state.CityCompulsion}
                        </p>
                      )}
                    </div>
                    <div className="div-padding-1">
                      <label className="designation-name">Pin Code</label>
                      <input
                        type="text"
                        className="txt-1"
                        placeholder="Enter Pin Code"
                        maxLength={6}
                        name="pin_code"
                        value={this.state.pin_code}
                        onChange={this.hanldeOnPinCodeChange}
                      />
                      {this.state.pinCodeFlag === false && (
                        <p style={{ color: "red", marginBottom: "0px" }}>
                          Please enter valid Pin Code.
                        </p>
                      )}
                      {this.state.pin_code.length === 0 && (
                        <p style={{ color: "red", marginBottom: "0px" }}>
                          {this.state.pin_codeCompulsion}
                        </p>
                      )}
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
                      {this.state.store_Address.length === 0 && (
                        <p style={{ color: "red", marginBottom: "0px" }}>
                          {this.state.store_AddressCompulsion}
                        </p>
                      )}
                    </div>
                    <div className="div-padding-1">
                      <label className="designation-name">Region</label>
                      <select
                        className="store-create-select"
                        value={this.state.selectRegion}
                        onChange={this.handleRegionChange}
                      >
                        <option value="0">Select</option>
                        {this.state.regionData !== null &&
                          this.state.regionData.map((item, s) => (
                            <option key={s} value={item.regionID}>
                              {item.regionName}
                            </option>
                          ))}
                      </select>
                      {this.state.selectRegion === 0 && (
                        <p style={{ color: "red", marginBottom: "0px" }}>
                          {this.state.RegionCompulsion}
                        </p>
                      )}
                    </div>
                    <div className="div-padding-1">
                      <label className="designation-name">Zone</label>
                      <select
                        className="store-create-select"
                        value={this.state.selectZone}
                        onChange={this.handleZoneChange}
                      >
                        <option value="0">Select</option>
                        {this.state.zoneData !== null &&
                          this.state.zoneData.map((item, s) => (
                            <option key={s} value={item.zoneID}>
                              {item.zoneName}
                            </option>
                          ))}
                      </select>
                      {this.state.selectZone === 0 && (
                        <p style={{ color: "red", marginBottom: "0px" }}>
                          {this.state.ZoneCompulsion}
                        </p>
                      )}
                    </div>
                    <div className="div-padding-1">
                      <label className="designation-name">Store Type</label>
                      <select
                        className="store-create-select"
                        value={this.state.store_type}
                        onChange={this.handleStoreTypeChange}
                      >
                        <option value="0">Select</option>
                        {this.state.storeTypeData !== null &&
                          this.state.storeTypeData.map((item, t) => (
                            <option key={t} value={item.storeTypeID}>
                              {item.storeTypeName}
                            </option>
                          ))}
                      </select>
                      {this.state.store_type === 0 && (
                        <p style={{ color: "red", marginBottom: "0px" }}>
                          {this.state.store_typeCompulsion}
                        </p>
                      )}
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
                        onChange={this.hanldeOnEmailChange}
                      />
                      {this.state.emailFlag === false && (
                        <p style={{ color: "red", marginBottom: "0px" }}>
                          Please enter valid Email Id.
                        </p>
                      )}
                      {this.state.contact_email.length === 0 && (
                        <p style={{ color: "red", marginBottom: "0px" }}>
                          {this.state.contact_emailCompulsion}
                        </p>
                      )}
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
                        onChange={this.hanldeOnPhoneChange}
                      />
                      {this.state.phoneFlag === false && (
                        <p style={{ color: "red", marginBottom: "0px" }}>
                          Please enter valid Phone Number.
                        </p>
                      )}
                      {this.state.contact_Phone.length === 0 && (
                        <p style={{ color: "red", marginBottom: "0px" }}>
                          {this.state.contact_PhoneCompulsion}
                        </p>
                      )}
                    </div>
                    <div className="div-padding-1">
                      <label className="designation-name">Status</label>
                      <select
                        className="form-control dropdown-setting"
                        value={this.state.selectStatus}
                        onChange={this.handleStatusChange}
                      >
                        <option value="">select</option>
                        {this.state.activeData !== null &&
                          this.state.activeData.map((item, j) => (
                            <option key={j} value={item.ActiveID}>
                              {item.ActiveName}
                            </option>
                          ))}
                      </select>

                      {this.state.selectStatus === "" && (
                        <p style={{ color: "red", marginBottom: "0px" }}>
                          {this.state.statusCompulsion}
                        </p>
                      )}
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
                      <CSVLink
                        filename={"Store.csv"}
                        data={config.storeTemplate}
                      >
                        <img src={DownExcel} alt="download icon" />
                      </CSVLink>
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
          <Modal
            open={this.state.editmodel}
            onClose={this.toggleEditModal}
            modalId="storeEditModal"
          >
            <div className="edtpadding">
              <label className="popover-header-text">EDIT STORE</label>
              <div className="row">
                <div className="col-md-6">
                  <div className="div-padding-1">
                    <label className="edit-label-1">Brand</label>
                    <Select
                      getOptionLabel={option => option.brandName}
                      getOptionValue={option => option.brandID}
                      options={this.state.brandData}
                      placeholder="Select"
                      // menuIsOpen={true}
                      name="brand_IDs"
                      closeMenuOnSelect={false}
                      // onChange={e => {setBrand(e)}}
                      onChange={this.handleModalBrandChange}
                      value={this.state.modalSelectedBrand}
                      showNewOptionAtTop={false}
                      isMulti
                    />
                    {this.state.modalSelectedBrand.length === 0 && (
                      <p style={{ color: "red", marginBottom: "0px" }}>
                        {this.state.editBrandValidation}
                      </p>
                    )}
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="pop-over-div">
                    <label className="edit-label-1">Store Code</label>
                    <input
                      type="text"
                      className="txt-1"
                      placeholder="Enter Store Code"
                      name="store_Code"
                      maxLength={10}
                      value={this.state.userEditData.store_Code}
                      onChange={this.handleModalEditData}
                    />
                    {this.state.userEditData.store_Code === "" && (
                      <p style={{ color: "red", marginBottom: "0px" }}>
                        {this.state.editStoreCodeValidation}
                      </p>
                    )}
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="pop-over-div">
                    <label className="edit-label-1">Store Name</label>
                    <input
                      type="text"
                      className="txt-1"
                      placeholder="Enter Store Name"
                      name="store_Name"
                      maxLength={100}
                      value={this.state.userEditData.store_Name}
                      onChange={this.handleModalEditData}
                    />
                    {this.state.userEditData.store_Name === "" && (
                      <p style={{ color: "red", marginBottom: "0px" }}>
                        {this.state.editStoreNameValidation}
                      </p>
                    )}
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="pop-over-div">
                    <label className="edit-label-1">State</label>
                    <select
                      className="store-create-select"
                      name="state_ID"
                      value={this.state.userEditData.state_ID}
                      onChange={this.handleModalEditData}
                    >
                      <option value={0}>Select</option>
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
                    {this.state.userEditData.state_ID === "0" && (
                      <p style={{ color: "red", marginBottom: "0px" }}>
                        {this.state.editStateValidation}
                      </p>
                    )}
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="pop-over-div">
                    <label className="edit-label-1">City</label>
                    <select
                      className="edit-dropDwon dropdown-setting"
                      name="city_ID"
                      value={this.state.userEditData.city_ID}
                      onChange={this.handleModalEditData}
                    >
                      <option value={0}>Select</option>
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
                    {this.state.userEditData.city_ID === "0" && (
                      <p style={{ color: "red", marginBottom: "0px" }}>
                        {this.state.editCityValidation}
                      </p>
                    )}
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="pop-over-div">
                    <label className="edit-label-1">Pin Code</label>
                    <input
                      type="text"
                      className="txt-1"
                      placeholder="Enter Pin Code"
                      name="strPin_Code"
                      maxLength={11}
                      value={this.state.userEditData.strPin_Code}
                      onChange={this.handleModalEditData}
                    />
                    {this.state.userEditData.strPin_Code === "" && (
                      <p style={{ color: "red", marginBottom: "0px" }}>
                        {this.state.editPinCodeValidation}
                      </p>
                    )}
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="pop-over-div">
                    <label className="edit-label-1">Status</label>
                    <select
                      className="form-control dropdown-setting"
                      name="status_ID"
                      value={
                        this.state.userEditData.status_ID == true
                          ? "Active"
                          : "Inactive"
                      }
                      onChange={this.handleModalEditData}
                    >
                      <option value={0}>Select</option>
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                    {this.state.userEditData.status_ID === "0" && (
                      <p style={{ color: "red", marginBottom: "0px" }}>
                        {this.state.editStatusValidation}
                      </p>
                    )}
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="pop-over-div">
                    <label className="edit-label-1">Region</label>
                    <select
                      className="store-create-select"
                      name="region_ID"
                      value={this.state.userEditData.region_ID}
                      onChange={this.handleModalEditData}
                    >
                      <option value={0}>Select</option>
                      {this.state.regionData !== null &&
                        this.state.regionData.map((item, s) => (
                          <option key={s} value={item.regionID}>
                            {item.regionName}
                          </option>
                        ))}
                    </select>
                    {this.state.userEditData.region_ID === "0" && (
                      <p style={{ color: "red", marginBottom: "0px" }}>
                        {this.state.editRegionValidation}
                      </p>
                    )}
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="pop-over-div">
                    <label className="edit-label-1">Zone</label>
                    <select
                      className="store-create-select"
                      name="zone_ID"
                      value={this.state.userEditData.zone_ID}
                      onChange={this.handleModalEditData}
                    >
                      <option value={0}>Select</option>
                      {this.state.zoneData !== null &&
                        this.state.zoneData.map((item, s) => (
                          <option key={s} value={item.zoneID}>
                            {item.zoneName}
                          </option>
                        ))}
                    </select>
                    {this.state.userEditData.zone_ID === "0" && (
                      <p style={{ color: "red", marginBottom: "0px" }}>
                        {this.state.editZoneValidation}
                      </p>
                    )}
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="pop-over-div">
                    <label className="edit-label-1">Store Type</label>
                    <select
                      className="store-create-select"
                      name="storeType_ID"
                      value={this.state.userEditData.storeType_ID}
                      onChange={this.handleModalEditData}
                    >
                      <option value={0}>Select</option>
                      {this.state.storeTypeData !== null &&
                        this.state.storeTypeData.map((item, t) => (
                          <option key={t} value={item.storeTypeID}>
                            {item.storeTypeName}
                          </option>
                        ))}
                    </select>
                    {this.state.userEditData.storeType_ID === "0" && (
                      <p style={{ color: "red", marginBottom: "0px" }}>
                        {this.state.editStoreTypeValidation}
                      </p>
                    )}
                  </div>
                </div>
                <div className="col-md-6">
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
                      value={this.state.userEditData.email_}
                      onChange={this.handleModalEditData}
                    />
                    {this.state.EditEmailFlag === false && (
                      <p style={{ color: "red", marginBottom: "0px" }}>
                        Please enter valid Email Id.
                      </p>
                    )}
                    {this.state.userEditData.email_ === "" && (
                      <p style={{ color: "red", marginBottom: "0px" }}>
                        {this.state.editContactEmailValidation}
                      </p>
                    )}
                  </div>
                </div>
                <div className="col-md-6">
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
                      // onChange={this.handleModalEditData}
                      onChange={this.hanldeOnPhoneChange}
                    />
                    {this.state.EditPhoneFlag === false && (
                      <p style={{ color: "red", marginBottom: "0px" }}>
                        Please enter valid Phone Number.
                      </p>
                    )}
                    {this.state.userEditData.phoneNumber_ === "" && (
                      <p style={{ color: "red", marginBottom: "0px" }}>
                        {this.state.editContactPhoneValidation}
                      </p>
                    )}
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="pop-over-div">
                    <label className="edit-label-1">Address</label>
                    <textarea
                      cols="31"
                      rows="3"
                      className="store-create-textarea"
                      placeholder="Enter address"
                      name="address_"
                      maxLength={250}
                      value={this.state.userEditData.address_}
                      onChange={this.handleModalEditData}
                    ></textarea>
                    {this.state.userEditData.address_ === "" && (
                      <p style={{ color: "red", marginBottom: "0px" }}>
                        {this.state.editStoreAddressValidation}
                      </p>
                    )}
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="text-center mt-3">
                    <span
                      className="pop-over-cancle"
                      onClick={this.toggleEditModal}
                    >
                      CANCEL
                    </span>
                    <button
                      className="pop-over-button FlNone"
                      onClick={this.handleUpdateData.bind(this)}
                    >
                      <label className="pop-over-btnsave-text">
                        {this.state.editSaveLoading ? (
                          <FontAwesomeIcon
                            className="circular-loader"
                            icon={faCircleNotch}
                            spin
                          />
                        ) : (
                          ""
                        )}
                        SAVE
                      </label>
                    </button>
                  </div>
                </div>
              </div>
              <br />
            </div>
          </Modal>
        </div>
      </React.Fragment>
    );
  }
}

export default StoreMaster;
