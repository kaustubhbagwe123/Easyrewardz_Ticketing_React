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
import { Popover, Spin } from "antd";
import ReactTable from "react-table";
import config from "../../../helpers/config";
import axios from "axios";
import Select from "react-select";
import { NotificationManager } from "react-notifications";
import { authHeader } from "../../../helpers/authHeader";
import ActiveStatus from "../../activeStatus";
import ZoneType from "./ZoneType";
import { CSVLink } from "react-csv";
import Modal from "react-responsive-modal";
import Sorting from "./../../../assets/Images/sorting.png";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import matchSorter from "match-sorter";
import { formatSizeUnits } from "./../../../helpers/CommanFuncation";
import Dropzone from "react-dropzone";
import * as translationHI from "./../../../translations/hindi";
import * as translationMA from "./../../../translations/marathi";

class StoreMaster extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
      sortBrandName: [],
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
      brandnameColor: "",
      sortHeader: "",
      bulkuploadCompulsion: "",
      fileName: "",
      fileN: [],
      sortFilterStoreName: [],
      sortFilterStoreCode: [],
      sortFilterCity: [],
      sortFilterState: [],
      sortFilterPincode: [],
      sortFilterBrandName: [],
      filterTxtValue: "",
      sFilterCheckbox: "",
      tempstoreData: [],
      isFileUploadFail: false,
      progressValue: 0,
      fileSize: "",
      showProgress: false,
      sstoreNameFilterCheckbox: "",
      sstoreCodeFilterCheckbox: "",
      scityNameFilterCheckbox: "",
      sstateNameFilterCheckbox: "",
      sstrPinCodeFilterCheckbox: "",
      isortA: false,
      sortregionName: [],
      sortzone: [],
      sortstoreTypeName: [],
      sortemail: [],
      sortphoneNumber: [],
      sortstatus: [],
      sortFilterregionName: [],
      sortFilterzone: [],
      sortFilterstoreTypeName: [],
      sortFilteremail: [],
      sortFilterphoneNumber: [],
      sortFilterstatus: [],
      sregionNameFilterCheckbox: "",
      szoneFilterCheckbox: "",
      sstoreTypeNameFilterCheckbox: "",
      semailFilterCheckbox: "",
      sphoneNumberFilterCheckbox: "",
      sstatusFilterCheckbox: "",
      bulkuploadLoading: false,
      translateLanguage: {},
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
    this.hanldeAddBulkUpload = this.hanldeAddBulkUpload.bind(this);
  }
  componentDidMount() {
    this.handleGetStoreMasterData();
    this.handleGetBrandList();
    this.handleGetStateList();
    this.handleGetRegionList();
    this.handleGetStoreTypeList();
    if (window.localStorage.getItem("translateLanguage") === "hindi") {
      this.state.translateLanguage = translationHI;
    } else if (window.localStorage.getItem("translateLanguage") === "marathi") {
      this.state.translateLanguage = translationMA;
    } else {
      this.state.translateLanguage = {};
    }
  }
  hanldeAddBulkUpload() {
    const TranslationContext = this.state.translateLanguage.default;
    if (this.state.fileN.length > 0 && this.state.fileN !== []) {
      if (this.state.fileN[0].path.split(".")[1] === "csv") {
        let self = this;
        this.setState({
          bulkuploadLoading: true,
        });
        const formData = new FormData();

        formData.append("file", this.state.fileN[0]);
        // this.setState({ showProgress: true });
        axios({
          method: "post",
          url: config.apiUrl + "/Store/BulkUploadStore",
          headers: authHeader(),
          data: formData,
          // onUploadProgress: (ev = ProgressEvent) => {
          //   const progress = (ev.loaded / ev.total) * 100;
          //   this.updateUploadProgress(Math.round(progress));
          // }
        })
          .then(function(res) {
            debugger;
            let status = res.data.message;
            if (status === "Success") {
              NotificationManager.success(
                TranslationContext !== undefined
                  ? TranslationContext.alertmessage.fileuploadedsuccessfully
                  : "File uploaded successfully."
              );
              self.setState({
                fileName: "",
                fileSize: "",
                fileN: [],
                bulkuploadLoading: false,
              });
              self.handleGetStoreMasterData();
            } else {
              self.setState({
                bulkuploadLoading: false,
                // showProgress: false,
                // isFileUploadFail: true,
                // progressValue: 0
              });
              NotificationManager.error(
                TranslationContext !== undefined
                  ? TranslationContext.alertmessage.filenotuploaded
                  : "File not uploaded."
              );
            }
          })
          .catch((data) => {
            if (data.message) {
              this.setState({
                showProgress: false,
                isFileUploadFail: true,
                bulkuploadLoading: false,
              });
            }
            console.log(data);
          });
      } else {
        NotificationManager.error("Only CSV files allowed.");
      }
    } else {
      this.setState({
        bulkuploadCompulsion: "Please select file.",
      });
    }
  }
  sortStatusZtoA() {
    var itemsArray = [];
    itemsArray = this.state.storeData;
    var headerName = "";

    if (this.state.sortColumn === "storeName") {
      itemsArray.sort((a, b) => {
        if (a.storeName < b.storeName) return 1;
        if (a.storeName > b.storeName) return -1;
        return 0;
      });
    }
    if (this.state.sortColumn === "storeCode") {
      itemsArray.sort((a, b) => {
        if (a.storeCode < b.storeCode) return 1;
        if (a.storeCode > b.storeCode) return -1;
        return 0;
      });
    }
    if (this.state.sortColumn === "cityName") {
      itemsArray.sort((a, b) => {
        if (a.cityName < b.cityName) return 1;
        if (a.cityName > b.cityName) return -1;
        return 0;
      });
    }
    if (this.state.sortColumn === "stateName") {
      itemsArray.sort((a, b) => {
        if (a.stateName < b.stateName) return 1;
        if (a.stateName > b.stateName) return -1;
        return 0;
      });
    }
    if (this.state.sortColumn === "strPinCode") {
      itemsArray.sort((a, b) => {
        if (a.strPinCode < b.strPinCode) return 1;
        if (a.strPinCode > b.strPinCode) return -1;
        return 0;
      });
    }
    if (this.state.sortColumn === "regionName") {
      itemsArray.sort((a, b) => {
        if (a.regionName < b.regionName) return 1;
        if (a.regionName > b.regionName) return -1;
        return 0;
      });
    }
    if (this.state.sortColumn === "zone") {
      itemsArray.sort((a, b) => {
        if (a.zone < b.zone) return 1;
        if (a.zone > b.zone) return -1;
        return 0;
      });
    }
    if (this.state.sortColumn === "storeTypeName") {
      itemsArray.sort((a, b) => {
        if (a.storeTypeName < b.storeTypeName) return 1;
        if (a.storeTypeName > b.storeTypeName) return -1;
        return 0;
      });
    }
    if (this.state.sortColumn === "email") {
      itemsArray.sort((a, b) => {
        if (a.email < b.email) return 1;
        if (a.email > b.email) return -1;
        return 0;
      });
    }
    if (this.state.sortColumn === "phoneNumber") {
      itemsArray.sort((a, b) => {
        if (a.phoneNumber < b.phoneNumber) return 1;
        if (a.phoneNumber > b.phoneNumber) return -1;
        return 0;
      });
    }
    if (this.state.sortColumn === "status") {
      itemsArray.sort((a, b) => {
        if (a.status < b.status) return 1;
        if (a.status > b.status) return -1;
        return 0;
      });
    }

    this.setState({
      isortA: true,
      storeData: itemsArray,
    });
    setTimeout(() => {
      this.StatusCloseModel();
    }, 10);
  }

  sortStatusAtoZ() {
    var itemsArray = [];
    itemsArray = this.state.storeData;
    var headerName = "";

    if (this.state.sortColumn === "storeName") {
      itemsArray.sort((a, b) => {
        if (a.storeName < b.storeName) return -1;
        if (a.storeName > b.storeName) return 1;
        return 0;
      });
    }
    if (this.state.sortColumn === "storeCode") {
      itemsArray.sort((a, b) => {
        if (a.storeCode < b.storeCode) return -1;
        if (a.storeCode > b.storeCode) return 1;
        return 0;
      });
    }
    if (this.state.sortColumn === "cityName") {
      itemsArray.sort((a, b) => {
        if (a.cityName < b.cityName) return -1;
        if (a.cityName > b.cityName) return 1;
        return 0;
      });
    }
    if (this.state.sortColumn === "stateName") {
      itemsArray.sort((a, b) => {
        if (a.stateName < b.stateName) return -1;
        if (a.stateName > b.stateName) return 1;
        return 0;
      });
    }
    if (this.state.sortColumn === "strPinCode") {
      itemsArray.sort((a, b) => {
        if (a.strPinCode < b.strPinCode) return -1;
        if (a.strPinCode > b.strPinCode) return 1;
        return 0;
      });
    }
    if (this.state.sortColumn === "regionName") {
      itemsArray.sort((a, b) => {
        if (a.regionName < b.regionName) return -1;
        if (a.regionName > b.regionName) return 1;
        return 0;
      });
    }
    if (this.state.sortColumn === "zone") {
      itemsArray.sort((a, b) => {
        if (a.zone < b.zone) return -1;
        if (a.zone > b.zone) return 1;
        return 0;
      });
    }
    if (this.state.sortColumn === "storeTypeName") {
      itemsArray.sort((a, b) => {
        if (a.storeTypeName < b.storeTypeName) return -1;
        if (a.storeTypeName > b.storeTypeName) return 1;
        return 0;
      });
    }
    if (this.state.sortColumn === "email") {
      itemsArray.sort((a, b) => {
        if (a.email < b.email) return -1;
        if (a.email > b.email) return 1;
        return 0;
      });
    }
    if (this.state.sortColumn === "phoneNumber") {
      itemsArray.sort((a, b) => {
        if (a.phoneNumber < b.phoneNumber) return -1;
        if (a.phoneNumber > b.phoneNumber) return 1;
        return 0;
      });
    }
    if (this.state.sortColumn === "status") {
      itemsArray.sort((a, b) => {
        if (a.status < b.status) return -1;
        if (a.status > b.status) return 1;
        return 0;
      });
    }
    this.setState({
      isortA: true,
      storeData: itemsArray,
    });
    setTimeout(() => {
      this.StatusCloseModel();
    }, 10);
  }
  StatusOpenModel(data, header) {
    // this.setState({ StatusModel: true, sortColumn: data, sortHeader: header });

    if (
      this.state.sortFilterStoreName.length === 0 ||
      this.state.sortFilterStoreCode.length === 0 ||
      this.state.sortFilterCity.length === 0 ||
      this.state.sortFilterState.length === 0 ||
      this.state.sortFilterPincode.length === 0 ||
      this.state.sortFilterregionName === 0 ||
      this.state.sortFilterzone === 0 ||
      this.state.sortFilterstoreTypeName === 0 ||
      this.state.sortFilteremail === 0 ||
      this.state.sortFilterphoneNumber === 0 ||
      this.state.sortFilterstatus === 0
    ) {
      return false;
    }
    // this.setState({ StatusModel: true, sortColumn: data, sortHeader: header });
    if (data === "storeName") {
      if (
        this.state.sstoreCodeFilterCheckbox !== "" ||
        this.state.scityNameFilterCheckbox !== "" ||
        this.state.sstateNameFilterCheckbox !== "" ||
        this.state.sstrPinCodeFilterCheckbox !== "" ||
        this.state.sregionNameFilterCheckbox != "" ||
        this.state.szoneFilterCheckbox != "" ||
        this.state.sstoreTypeNameFilterCheckbox != "" ||
        this.state.semailFilterCheckbox != "" ||
        this.state.sphoneNumberFilterCheckbox != "" ||
        this.state.sstatusFilterCheckbox != ""
      ) {
        this.setState({
          StatusModel: true,
          sortColumn: data,
          sortHeader: header,
        });
      } else {
        this.setState({
          sstoreCodeFilterCheckbox: "",
          scityNameFilterCheckbox: "",
          sstateNameFilterCheckbox: "",
          sstrPinCodeFilterCheckbox: "",
          sregionNameFilterCheckbox: "",
          szoneFilterCheckbox: "",
          sstoreTypeNameFilterCheckbox: "",
          semailFilterCheckbox: "",
          sphoneNumberFilterCheckbox: "",
          sstatusFilterCheckbox: "",

          StatusModel: true,
          sortColumn: data,
          sortHeader: header,
        });
      }
    }
    if (data === "storeCode") {
      if (
        this.state.sstoreNameFilterCheckbox !== "" ||
        this.state.scityNameFilterCheckbox !== "" ||
        this.state.sstateNameFilterCheckbox !== "" ||
        this.state.sstrPinCodeFilterCheckbox !== "" ||
        this.state.sregionNameFilterCheckbox != "" ||
        this.state.szoneFilterCheckbox != "" ||
        this.state.sstoreTypeNameFilterCheckbox != "" ||
        this.state.semailFilterCheckbox != "" ||
        this.state.sphoneNumberFilterCheckbox != "" ||
        this.state.sstatusFilterCheckbox != ""
      ) {
        this.setState({
          StatusModel: true,
          sortColumn: data,
          sortHeader: header,
        });
      } else {
        this.setState({
          sstoreNameFilterCheckbox: "",
          scityNameFilterCheckbox: "",
          sstateNameFilterCheckbox: "",
          sstrPinCodeFilterCheckbox: "",
          sregionNameFilterCheckbox: "",
          szoneFilterCheckbox: "",
          sstoreTypeNameFilterCheckbox: "",
          semailFilterCheckbox: "",
          sphoneNumberFilterCheckbox: "",
          sstatusFilterCheckbox: "",
          StatusModel: true,
          sortColumn: data,
          sortHeader: header,
        });
      }
    }
    if (data === "cityName") {
      if (
        this.state.sstoreNameFilterCheckbox !== "" ||
        this.state.sstoreCodeFilterCheckbox !== "" ||
        this.state.sstateNameFilterCheckbox !== "" ||
        this.state.sstrPinCodeFilterCheckbox !== "" ||
        this.state.sregionNameFilterCheckbox !== "" ||
        this.state.szoneFilterCheckbox !== "" ||
        this.state.sstoreTypeNameFilterCheckbox !== "" ||
        this.state.semailFilterCheckbox !== "" ||
        this.state.sphoneNumberFilterCheckbox !== "" ||
        this.state.sstatusFilterCheckbox !== ""
      ) {
        this.setState({
          StatusModel: true,
          sortColumn: data,
          sortHeader: header,
        });
      } else {
        this.setState({
          sstoreNameFilterCheckbox: "",
          sstoreCodeFilterCheckbox: "",
          sstateNameFilterCheckbox: "",
          sstrPinCodeFilterCheckbox: "",
          sregionNameFilterCheckbox: "",
          szoneFilterCheckbox: "",
          sstoreTypeNameFilterCheckbox: "",
          semailFilterCheckbox: "",
          sphoneNumberFilterCheckbox: "",
          sstatusFilterCheckbox: "",

          StatusModel: true,
          sortColumn: data,
          sortHeader: header,
        });
      }
    }
    if (data === "stateName") {
      if (
        this.state.sstoreNameFilterCheckbox !== "" ||
        this.state.scityNameFilterCheckbox !== "" ||
        this.state.sstoreCodeFilterCheckbox !== "" ||
        this.state.sstrPinCodeFilterCheckbox !== "" ||
        this.state.sregionNameFilterCheckbox !== "" ||
        this.state.szoneFilterCheckbox !== "" ||
        this.state.sstoreTypeNameFilterCheckbox !== "" ||
        this.state.semailFilterCheckbox !== "" ||
        this.state.sphoneNumberFilterCheckbox !== "" ||
        this.state.sstatusFilterCheckbox !== ""
      ) {
        this.setState({
          StatusModel: true,
          sortColumn: data,
          sortHeader: header,
        });
      } else {
        this.setState({
          sstrPinCodeFilterCheckbox: "",
          sstoreCodeFilterCheckbox: "",
          scityNameFilterCheckbox: "",
          sstoreNameFilterCheckbox: "",
          sregionNameFilterCheckbox: "",
          szoneFilterCheckbox: "",
          sstoreTypeNameFilterCheckbox: "",
          semailFilterCheckbox: "",
          sphoneNumberFilterCheckbox: "",
          sstatusFilterCheckbox: "",

          StatusModel: true,
          sortColumn: data,
          sortHeader: header,
        });
      }
    }
    if (data === "strPinCode") {
      if (
        this.state.sstateNameFilterCheckbox !== "" ||
        this.state.scityNameFilterCheckbox !== "" ||
        this.state.sstoreCodeFilterCheckbox !== "" ||
        this.state.sstoreNameFilterCheckbox !== "" ||
        this.state.sregionNameFilterCheckbox !== "" ||
        this.state.szoneFilterCheckbox !== "" ||
        this.state.sstoreTypeNameFilterCheckbox !== "" ||
        this.state.semailFilterCheckbox !== "" ||
        this.state.sphoneNumberFilterCheckbox !== "" ||
        this.state.sstatusFilterCheckbox !== ""
      ) {
        this.setState({
          StatusModel: true,
          sortColumn: data,
          sortHeader: header,
        });
      } else {
        this.setState({
          sstoreNameFilterCheckbox: "",
          sstoreCodeFilterCheckbox: "",
          scityNameFilterCheckbox: "",
          sstateNameFilterCheckbox: "",
          sregionNameFilterCheckbox: "",
          szoneFilterCheckbox: "",
          sstoreTypeNameFilterCheckbox: "",
          semailFilterCheckbox: "",
          sphoneNumberFilterCheckbox: "",
          sstatusFilterCheckbox: "",
          StatusModel: true,
          sortColumn: data,
          sortHeader: header,
        });
      }
    }
    if (data === "regionName") {
      if (
        this.state.sstateNameFilterCheckbox !== "" ||
        this.state.scityNameFilterCheckbox !== "" ||
        this.state.sstoreCodeFilterCheckbox !== "" ||
        this.state.sstoreNameFilterCheckbox !== "" ||
        this.state.sstrPinCodeFilterCheckbox !== "" ||
        this.state.szoneFilterCheckbox !== "" ||
        this.state.sstoreTypeNameFilterCheckbox !== "" ||
        this.state.semailFilterCheckbox !== "" ||
        this.state.sphoneNumberFilterCheckbox !== "" ||
        this.state.sstatusFilterCheckbox !== ""
      ) {
        this.setState({
          StatusModel: true,
          sortColumn: data,
          sortHeader: header,
        });
      } else {
        this.setState({
          sstoreNameFilterCheckbox: "",
          sstoreCodeFilterCheckbox: "",
          scityNameFilterCheckbox: "",
          sstateNameFilterCheckbox: "",
          sstrPinCodeFilterCheckbox: "",
          szoneFilterCheckbox: "",
          sstoreTypeNameFilterCheckbox: "",
          semailFilterCheckbox: "",
          sphoneNumberFilterCheckbox: "",
          sstatusFilterCheckbox: "",
          StatusModel: true,
          sortColumn: data,
          sortHeader: header,
        });
      }
    }
    if (data === "zone") {
      if (
        this.state.sstateNameFilterCheckbox !== "" ||
        this.state.scityNameFilterCheckbox !== "" ||
        this.state.sstoreCodeFilterCheckbox !== "" ||
        this.state.sstoreNameFilterCheckbox !== "" ||
        this.state.sstrPinCodeFilterCheckbox !== "" ||
        this.state.sregionNameFilterCheckbox !== "" ||
        this.state.sstoreTypeNameFilterCheckbox !== "" ||
        this.state.semailFilterCheckbox !== "" ||
        this.state.sphoneNumberFilterCheckbox !== "" ||
        this.state.sstatusFilterCheckbox !== ""
      ) {
        this.setState({
          StatusModel: true,
          sortColumn: data,
          sortHeader: header,
        });
      } else {
        this.setState({
          sstoreNameFilterCheckbox: "",
          sstoreCodeFilterCheckbox: "",
          scityNameFilterCheckbox: "",
          sstateNameFilterCheckbox: "",
          sstrPinCodeFilterCheckbox: "",
          sregionNameFilterCheckbox: "",
          sstoreTypeNameFilterCheckbox: "",
          semailFilterCheckbox: "",
          sphoneNumberFilterCheckbox: "",
          sstatusFilterCheckbox: "",
          StatusModel: true,
          sortColumn: data,
          sortHeader: header,
        });
      }
    }
    if (data === "storeTypeName") {
      if (
        this.state.sstateNameFilterCheckbox !== "" ||
        this.state.scityNameFilterCheckbox !== "" ||
        this.state.sstoreCodeFilterCheckbox !== "" ||
        this.state.sstoreNameFilterCheckbox !== "" ||
        this.state.sstrPinCodeFilterCheckbox !== "" ||
        this.state.szoneFilterCheckbox !== "" ||
        this.state.sregionNameFilterCheckbox !== "" ||
        this.state.semailFilterCheckbox !== "" ||
        this.state.sphoneNumberFilterCheckbox !== "" ||
        this.state.sstatusFilterCheckbox !== ""
      ) {
        this.setState({
          StatusModel: true,
          sortColumn: data,
          sortHeader: header,
        });
      } else {
        this.setState({
          sstoreNameFilterCheckbox: "",
          sstoreCodeFilterCheckbox: "",
          scityNameFilterCheckbox: "",
          sstateNameFilterCheckbox: "",
          sstrPinCodeFilterCheckbox: "",
          szoneFilterCheckbox: "",
          sregionNameFilterCheckbox: "",
          semailFilterCheckbox: "",
          sphoneNumberFilterCheckbox: "",
          sstatusFilterCheckbox: "",
          StatusModel: true,
          sortColumn: data,
          sortHeader: header,
        });
      }
    }
    if (data === "email") {
      if (
        this.state.sstateNameFilterCheckbox !== "" ||
        this.state.scityNameFilterCheckbox !== "" ||
        this.state.sstoreCodeFilterCheckbox !== "" ||
        this.state.sstoreNameFilterCheckbox !== "" ||
        this.state.sstrPinCodeFilterCheckbox !== "" ||
        this.state.szoneFilterCheckbox !== "" ||
        this.state.sregionNameFilterCheckbox !== "" ||
        this.state.sstoreTypeNameFilterCheckbox !== "" ||
        this.state.sphoneNumberFilterCheckbox !== "" ||
        this.state.sstatusFilterCheckbox !== ""
      ) {
        this.setState({
          StatusModel: true,
          sortColumn: data,
          sortHeader: header,
        });
      } else {
        this.setState({
          sstoreNameFilterCheckbox: "",
          sstoreCodeFilterCheckbox: "",
          scityNameFilterCheckbox: "",
          sstateNameFilterCheckbox: "",
          sstrPinCodeFilterCheckbox: "",
          szoneFilterCheckbox: "",
          sregionNameFilterCheckbox: "",
          sstoreTypeNameFilterCheckbox: "",
          sphoneNumberFilterCheckbox: "",
          sstatusFilterCheckbox: "",
          StatusModel: true,
          sortColumn: data,
          sortHeader: header,
        });
      }
    }
    if (data === "phoneNumber") {
      if (
        this.state.sstateNameFilterCheckbox !== "" ||
        this.state.scityNameFilterCheckbox !== "" ||
        this.state.sstoreCodeFilterCheckbox !== "" ||
        this.state.sstoreNameFilterCheckbox !== "" ||
        this.state.sstrPinCodeFilterCheckbox !== "" ||
        this.state.szoneFilterCheckbox !== "" ||
        this.state.sregionNameFilterCheckbox !== "" ||
        this.state.sstoreTypeNameFilterCheckbox !== "" ||
        this.state.semailFilterCheckbox !== "" ||
        this.state.sstatusFilterCheckbox !== ""
      ) {
        this.setState({
          StatusModel: true,
          sortColumn: data,
          sortHeader: header,
        });
      } else {
        this.setState({
          sstoreNameFilterCheckbox: "",
          sstoreCodeFilterCheckbox: "",
          scityNameFilterCheckbox: "",
          sstateNameFilterCheckbox: "",
          sstrPinCodeFilterCheckbox: "",
          szoneFilterCheckbox: "",
          sregionNameFilterCheckbox: "",
          sstoreTypeNameFilterCheckbox: "",
          semailFilterCheckbox: "",
          sstatusFilterCheckbox: "",
          StatusModel: true,
          sortColumn: data,
          sortHeader: header,
        });
      }
    }
    if (data === "status") {
      if (
        this.state.sstateNameFilterCheckbox !== "" ||
        this.state.scityNameFilterCheckbox !== "" ||
        this.state.sstoreCodeFilterCheckbox !== "" ||
        this.state.sstoreNameFilterCheckbox !== "" ||
        this.state.sstrPinCodeFilterCheckbox !== "" ||
        this.state.szoneFilterCheckbox !== "" ||
        this.state.sregionNameFilterCheckbox !== "" ||
        this.state.sstoreTypeNameFilterCheckbox !== "" ||
        this.state.semailFilterCheckbox !== "" ||
        this.state.sphoneNumberFilterCheckbox !== ""
      ) {
        this.setState({
          StatusModel: true,
          sortColumn: data,
          sortHeader: header,
        });
      } else {
        this.setState({
          sstoreNameFilterCheckbox: "",
          sstoreCodeFilterCheckbox: "",
          scityNameFilterCheckbox: "",
          sstateNameFilterCheckbox: "",
          sstrPinCodeFilterCheckbox: "",
          szoneFilterCheckbox: "",
          sregionNameFilterCheckbox: "",
          sstoreTypeNameFilterCheckbox: "",
          semailFilterCheckbox: "",
          sphoneNumberFilterCheckbox: "",
          StatusModel: true,
          sortColumn: data,
          sortHeader: header,
        });
      }
    }
  }
  StatusCloseModel() {
    if (this.state.tempstoreData.length > 0) {
      this.setState({
        StatusModel: false,
        storeData: this.state.tempstoreData,
        filterTxtValue: "",
        sortFilterStoreName: this.state.sortStoreName,
        sortFilterStoreCode: this.state.sortStoreCode,
        sortFilterCity: this.state.sortCity,
        sortFilterState: this.state.sortState,
        sortFilterPincode: this.state.sortPincode,
        sortFilterregionName: this.state.sortregionName,
        sortFilterzone: this.state.sortzone,
        sortFilterstoreTypeName: this.state.sortstoreTypeName,
        sortFilteremail: this.state.sortemail,
        sortFilterphoneNumber: this.state.sortphoneNumber,
        sortFilterstatus: this.state.sortstatus,
      });
      if (this.state.sortColumn === "storeName") {
        if (this.state.sstoreNameFilterCheckbox === "") {
        } else {
          this.setState({
            sstoreCodeFilterCheckbox: "",
            scityNameFilterCheckbox: "",
            sstateNameFilterCheckbox: "",
            sstrPinCodeFilterCheckbox: "",
            sregionNameFilterCheckbox: "",
            szoneFilterCheckbox: "",
            sstoreTypeNameFilterCheckbox: "",
            semailFilterCheckbox: "",
            sphoneNumberFilterCheckbox: "",
            sstatusFilterCheckbox: "",
          });
        }
      }
      if (this.state.sortColumn === "storeCode") {
        if (this.state.sstoreCodeFilterCheckbox === "") {
        } else {
          this.setState({
            sstoreNameFilterCheckbox: "",
            scityNameFilterCheckbox: "",
            sstateNameFilterCheckbox: "",
            sstrPinCodeFilterCheckbox: "",
            sregionNameFilterCheckbox: "",
            szoneFilterCheckbox: "",
            sstoreTypeNameFilterCheckbox: "",
            semailFilterCheckbox: "",
            sphoneNumberFilterCheckbox: "",
            sstatusFilterCheckbox: "",
          });
        }
      }
      if (this.state.sortColumn === "cityName") {
        if (this.state.scityNameFilterCheckbox === "") {
        } else {
          this.setState({
            sstoreNameFilterCheckbox: "",
            sstoreCodeFilterCheckbox: "",
            sstateNameFilterCheckbox: "",
            sstrPinCodeFilterCheckbox: "",
            sregionNameFilterCheckbox: "",
            szoneFilterCheckbox: "",
            sstoreTypeNameFilterCheckbox: "",
            semailFilterCheckbox: "",
            sphoneNumberFilterCheckbox: "",
            sstatusFilterCheckbox: "",
          });
        }
      }
      if (this.state.sortColumn === "stateName") {
        if (this.state.sstateNameFilterCheckbox === "") {
        } else {
          this.setState({
            sstoreNameFilterCheckbox: "",
            sstoreCodeFilterCheckbox: "",
            scityNameFilterCheckbox: "",
            sstrPinCodeFilterCheckbox: "",
            sregionNameFilterCheckbox: "",
            szoneFilterCheckbox: "",
            sstoreTypeNameFilterCheckbox: "",
            semailFilterCheckbox: "",
            sphoneNumberFilterCheckbox: "",
            sstatusFilterCheckbox: "",
          });
        }
      }
      if (this.state.sortColumn === "strPinCode") {
        if (this.state.sstrPinCodeFilterCheckbox === "") {
        } else {
          this.setState({
            sstoreNameFilterCheckbox: "",
            sstoreCodeFilterCheckbox: "",
            scityNameFilterCheckbox: "",
            sstateNameFilterCheckbox: "",
            sregionNameFilterCheckbox: "",
            szoneFilterCheckbox: "",
            sstoreTypeNameFilterCheckbox: "",
            semailFilterCheckbox: "",
            sphoneNumberFilterCheckbox: "",
            sstatusFilterCheckbox: "",
          });
        }
      }
      if (this.state.sortColumn === "regionName") {
        if (this.state.sregionNameFilterCheckbox === "") {
        } else {
          this.setState({
            sstoreNameFilterCheckbox: "",
            sstoreCodeFilterCheckbox: "",
            scityNameFilterCheckbox: "",
            sstateNameFilterCheckbox: "",
            sstrPinCodeFilterCheckbox: "",
            szoneFilterCheckbox: "",
            sstoreTypeNameFilterCheckbox: "",
            semailFilterCheckbox: "",
            sphoneNumberFilterCheckbox: "",
            sstatusFilterCheckbox: "",
          });
        }
      }
      if (this.state.sortColumn === "zone") {
        if (this.state.szoneFilterCheckbox === "") {
        } else {
          this.setState({
            sstoreNameFilterCheckbox: "",
            sstoreCodeFilterCheckbox: "",
            scityNameFilterCheckbox: "",
            sstateNameFilterCheckbox: "",
            sstrPinCodeFilterCheckbox: "",
            sregionNameFilterCheckbox: "",
            sstoreTypeNameFilterCheckbox: "",
            semailFilterCheckbox: "",
            sphoneNumberFilterCheckbox: "",
            sstatusFilterCheckbox: "",
          });
        }
      }
      if (this.state.sortColumn === "storeTypeName") {
        if (this.state.sstoreTypeNameFilterCheckbox === "") {
        } else {
          this.setState({
            sstoreNameFilterCheckbox: "",
            sstoreCodeFilterCheckbox: "",
            scityNameFilterCheckbox: "",
            sstateNameFilterCheckbox: "",
            sstrPinCodeFilterCheckbox: "",
            sregionNameFilterCheckbox: "",
            szoneFilterCheckbox: "",
            semailFilterCheckbox: "",
            sphoneNumberFilterCheckbox: "",
            sstatusFilterCheckbox: "",
          });
        }
      }
      if (this.state.sortColumn === "email") {
        if (this.state.semailFilterCheckbox === "") {
        } else {
          this.setState({
            sstoreNameFilterCheckbox: "",
            sstoreCodeFilterCheckbox: "",
            scityNameFilterCheckbox: "",
            sstateNameFilterCheckbox: "",
            sstrPinCodeFilterCheckbox: "",
            sregionNameFilterCheckbox: "",
            szoneFilterCheckbox: "",
            sstoreTypeNameFilterCheckbox: "",
            sphoneNumberFilterCheckbox: "",
            sstatusFilterCheckbox: "",
          });
        }
      }
      if (this.state.sortColumn === "phoneNumber") {
        if (this.state.sphoneNumberFilterCheckbox === "") {
        } else {
          this.setState({
            sstoreNameFilterCheckbox: "",
            sstoreCodeFilterCheckbox: "",
            scityNameFilterCheckbox: "",
            sstateNameFilterCheckbox: "",
            sstrPinCodeFilterCheckbox: "",
            sregionNameFilterCheckbox: "",
            szoneFilterCheckbox: "",
            sstoreTypeNameFilterCheckbox: "",
            semailFilterCheckbox: "",
            sstatusFilterCheckbox: "",
          });
        }
      }
      if (this.state.sortColumn === "status") {
        if (this.state.sstatusFilterCheckbox === "") {
        } else {
          this.setState({
            sstoreNameFilterCheckbox: "",
            sstoreCodeFilterCheckbox: "",
            scityNameFilterCheckbox: "",
            sstateNameFilterCheckbox: "",
            sstrPinCodeFilterCheckbox: "",
            sregionNameFilterCheckbox: "",
            szoneFilterCheckbox: "",
            sstoreTypeNameFilterCheckbox: "",
            semailFilterCheckbox: "",
            sphoneNumberFilterCheckbox: "",
          });
        }
      }
    } else {
      if (this.state.isortA) {
        this.setState({
          StatusModel: false,
          storeData: this.state.storeData,
          filterTxtValue: "",
          sortFilterStoreName: this.state.sortStoreName,
          sortFilterStoreCode: this.state.sortStoreCode,
          sortFilterCity: this.state.sortCity,
          sortFilterState: this.state.sortState,
          sortFilterPincode: this.state.sortPincode,
          sortFilterregionName: this.state.sortregionName,
          sortFilterzone: this.state.sortzone,
          sortFilterstoreTypeName: this.state.sortstoreTypeName,
          sortFilteremail: this.state.sortemail,
          sortFilterphoneNumber: this.state.sortphoneNumber,
          sortFilterstatus: this.state.sortstatus,
        });
      } else {
        this.setState({
          StatusModel: false,
          storeData: this.state.sortAllData,
          filterTxtValue: "",
          sortFilterStoreName: this.state.sortStoreName,
          sortFilterStoreCode: this.state.sortStoreCode,
          sortFilterCity: this.state.sortCity,
          sortFilterState: this.state.sortState,
          sortFilterPincode: this.state.sortPincode,
          sortFilterregionName: this.state.sortregionName,
          sortFilterzone: this.state.sortzone,
          sortFilterstoreTypeName: this.state.sortstoreTypeName,
          sortFilteremail: this.state.sortemail,
          sortFilterphoneNumber: this.state.sortphoneNumber,
          sortFilterstatus: this.state.sortstatus,
        });
      }
    }
  }

  setSortCheckStatus = (column, type, e) => {
    var itemsArray = [];

    var sstoreNameFilterCheckbox = this.state.sstoreNameFilterCheckbox;
    var sstoreCodeFilterCheckbox = this.state.sstoreCodeFilterCheckbox;
    var scityNameFilterCheckbox = this.state.scityNameFilterCheckbox;
    var sstateNameFilterCheckbox = this.state.sstateNameFilterCheckbox;
    var sstrPinCodeFilterCheckbox = this.state.sstrPinCodeFilterCheckbox;
    var sregionNameFilterCheckbox = this.state.sregionNameFilterCheckbox;
    var szoneFilterCheckbox = this.state.szoneFilterCheckbox;
    var sstoreTypeNameFilterCheckbox = this.state.sstoreTypeNameFilterCheckbox;
    var semailFilterCheckbox = this.state.semailFilterCheckbox;
    var sphoneNumberFilterCheckbox = this.state.sphoneNumberFilterCheckbox;
    var sstatusFilterCheckbox = this.state.sstatusFilterCheckbox;

    if (column === "storeName" || column === "all") {
      if (type === "value" && type !== "All") {
        sstoreNameFilterCheckbox = sstoreNameFilterCheckbox.replace("all", "");
        sstoreNameFilterCheckbox = sstoreNameFilterCheckbox.replace("all,", "");
        if (sstoreNameFilterCheckbox.includes(e.currentTarget.value)) {
          sstoreNameFilterCheckbox = sstoreNameFilterCheckbox.replace(
            e.currentTarget.value + ",",
            ""
          );
        } else {
          sstoreNameFilterCheckbox += e.currentTarget.value + ",";
        }
      } else {
        if (sstoreNameFilterCheckbox.includes("all")) {
          sstoreNameFilterCheckbox = "";
        } else {
          if (this.state.sortColumn === "storeName") {
            for (let i = 0; i < this.state.sortStoreName.length; i++) {
              sstoreNameFilterCheckbox +=
                this.state.sortStoreName[i].storeName + ",";
            }
            sstoreNameFilterCheckbox += "all";
          }
        }
      }
    }
    if (column === "storeCode" || column === "all") {
      if (type === "value" && type !== "All") {
        sstoreCodeFilterCheckbox = sstoreCodeFilterCheckbox.replace("all", "");
        sstoreCodeFilterCheckbox = sstoreCodeFilterCheckbox.replace("all,", "");
        if (sstoreCodeFilterCheckbox.includes(e.currentTarget.value)) {
          sstoreCodeFilterCheckbox = sstoreCodeFilterCheckbox.replace(
            e.currentTarget.value + ",",
            ""
          );
        } else {
          sstoreCodeFilterCheckbox += e.currentTarget.value + ",";
        }
      } else {
        if (sstoreCodeFilterCheckbox.includes("all")) {
          sstoreCodeFilterCheckbox = "";
        } else {
          if (this.state.sortColumn === "storeCode") {
            for (let i = 0; i < this.state.sortStoreCode.length; i++) {
              sstoreCodeFilterCheckbox +=
                this.state.sortStoreCode[i].storeCode + ",";
            }
            sstoreCodeFilterCheckbox += "all";
          }
        }
      }
    }
    if (column === "cityName" || column === "all") {
      if (type === "value" && type !== "All") {
        scityNameFilterCheckbox = scityNameFilterCheckbox.replace("all", "");
        scityNameFilterCheckbox = scityNameFilterCheckbox.replace("all,", "");
        if (scityNameFilterCheckbox.includes(e.currentTarget.value)) {
          scityNameFilterCheckbox = scityNameFilterCheckbox.replace(
            e.currentTarget.value + ",",
            ""
          );
        } else {
          scityNameFilterCheckbox += e.currentTarget.value + ",";
        }
      } else {
        if (scityNameFilterCheckbox.includes("all")) {
          scityNameFilterCheckbox = "";
        } else {
          if (this.state.sortColumn === "cityName") {
            for (let i = 0; i < this.state.sortCity.length; i++) {
              scityNameFilterCheckbox += this.state.sortCity[i].cityName + ",";
            }
            scityNameFilterCheckbox += "all";
          }
        }
      }
    }
    if (column === "stateName" || column === "all") {
      if (type === "value" && type !== "All") {
        sstateNameFilterCheckbox = sstateNameFilterCheckbox.replace("all", "");
        sstateNameFilterCheckbox = sstateNameFilterCheckbox.replace("all,", "");
        if (sstateNameFilterCheckbox.includes(e.currentTarget.value)) {
          sstateNameFilterCheckbox = sstateNameFilterCheckbox.replace(
            e.currentTarget.value + ",",
            ""
          );
        } else {
          sstateNameFilterCheckbox += e.currentTarget.value + ",";
        }
      } else {
        if (sstateNameFilterCheckbox.includes("all")) {
          sstateNameFilterCheckbox = "";
        } else {
          if (this.state.sortColumn === "stateName") {
            for (let i = 0; i < this.state.sortState.length; i++) {
              sstateNameFilterCheckbox +=
                this.state.sortState[i].stateName + ",";
            }
            sstateNameFilterCheckbox += "all";
          }
        }
      }
    }
    if (column === "strPinCode" || column === "all") {
      if (type === "value" && type !== "All") {
        sstrPinCodeFilterCheckbox = sstrPinCodeFilterCheckbox.replace(
          "all",
          ""
        );
        sstrPinCodeFilterCheckbox = sstrPinCodeFilterCheckbox.replace(
          "all,",
          ""
        );
        if (sstrPinCodeFilterCheckbox.includes(e.currentTarget.value)) {
          sstrPinCodeFilterCheckbox = sstrPinCodeFilterCheckbox.replace(
            e.currentTarget.value + ",",
            ""
          );
        } else {
          sstrPinCodeFilterCheckbox += e.currentTarget.value + ",";
        }
      } else {
        if (sstrPinCodeFilterCheckbox.includes("all")) {
          sstrPinCodeFilterCheckbox = "";
        } else {
          if (this.state.sortColumn === "strPinCode") {
            for (let i = 0; i < this.state.sortPincode.length; i++) {
              sstrPinCodeFilterCheckbox +=
                this.state.sortPincode[i].strPinCode + ",";
            }
            sstrPinCodeFilterCheckbox += "all";
          }
        }
      }
    }
    if (column === "regionName" || column === "all") {
      if (type === "value" && type !== "All") {
        sregionNameFilterCheckbox = sregionNameFilterCheckbox.replace(
          "all",
          ""
        );
        sregionNameFilterCheckbox = sregionNameFilterCheckbox.replace(
          "all,",
          ""
        );
        if (sregionNameFilterCheckbox.includes(e.currentTarget.value)) {
          sregionNameFilterCheckbox = sregionNameFilterCheckbox.replace(
            e.currentTarget.value + ",",
            ""
          );
        } else {
          sregionNameFilterCheckbox += e.currentTarget.value + ",";
        }
      } else {
        if (sregionNameFilterCheckbox.includes("all")) {
          sregionNameFilterCheckbox = "";
        } else {
          if (this.state.sortColumn === "regionName") {
            for (let i = 0; i < this.state.sortregionName.length; i++) {
              sregionNameFilterCheckbox +=
                this.state.sortregionName[i].regionName + ",";
            }
            sregionNameFilterCheckbox += "all";
          }
        }
      }
    }
    if (column === "zone" || column === "all") {
      if (type === "value" && type !== "All") {
        szoneFilterCheckbox = szoneFilterCheckbox.replace("all", "");
        szoneFilterCheckbox = szoneFilterCheckbox.replace("all,", "");
        if (szoneFilterCheckbox.includes(e.currentTarget.value)) {
          szoneFilterCheckbox = szoneFilterCheckbox.replace(
            e.currentTarget.value + ",",
            ""
          );
        } else {
          szoneFilterCheckbox += e.currentTarget.value + ",";
        }
      } else {
        if (szoneFilterCheckbox.includes("all")) {
          szoneFilterCheckbox = "";
        } else {
          if (this.state.sortColumn === "zone") {
            for (let i = 0; i < this.state.sortzone.length; i++) {
              szoneFilterCheckbox += this.state.sortzone[i].zone + ",";
            }
            szoneFilterCheckbox += "all";
          }
        }
      }
    }
    if (column === "storeTypeName" || column === "all") {
      if (type === "value" && type !== "All") {
        sstoreTypeNameFilterCheckbox = sstoreTypeNameFilterCheckbox.replace(
          "all",
          ""
        );
        sstoreTypeNameFilterCheckbox = sstoreTypeNameFilterCheckbox.replace(
          "all,",
          ""
        );
        if (sstoreTypeNameFilterCheckbox.includes(e.currentTarget.value)) {
          sstoreTypeNameFilterCheckbox = sstoreTypeNameFilterCheckbox.replace(
            e.currentTarget.value + ",",
            ""
          );
        } else {
          sstoreTypeNameFilterCheckbox += e.currentTarget.value + ",";
        }
      } else {
        if (sstoreTypeNameFilterCheckbox.includes("all")) {
          sstoreTypeNameFilterCheckbox = "";
        } else {
          if (this.state.sortColumn === "storeTypeName") {
            for (let i = 0; i < this.state.sortzone.length; i++) {
              sstoreTypeNameFilterCheckbox +=
                this.state.sortzone[i].storeTypeName + ",";
            }
            sstoreTypeNameFilterCheckbox += "all";
          }
        }
      }
    }
    if (column === "email" || column === "all") {
      if (type === "value" && type !== "All") {
        semailFilterCheckbox = semailFilterCheckbox.replace("all", "");
        semailFilterCheckbox = semailFilterCheckbox.replace("all,", "");
        if (semailFilterCheckbox.includes(e.currentTarget.value)) {
          semailFilterCheckbox = semailFilterCheckbox.replace(
            e.currentTarget.value + ",",
            ""
          );
        } else {
          semailFilterCheckbox += e.currentTarget.value + ",";
        }
      } else {
        if (semailFilterCheckbox.includes("all")) {
          semailFilterCheckbox = "";
        } else {
          if (this.state.sortColumn === "email") {
            for (let i = 0; i < this.state.sortemail.length; i++) {
              semailFilterCheckbox += this.state.sortemail[i].email + ",";
            }
            semailFilterCheckbox += "all";
          }
        }
      }
    }
    if (column === "phoneNumber" || column === "all") {
      if (type === "value" && type !== "All") {
        sphoneNumberFilterCheckbox = sphoneNumberFilterCheckbox.replace(
          "all",
          ""
        );
        sphoneNumberFilterCheckbox = sphoneNumberFilterCheckbox.replace(
          "all,",
          ""
        );
        if (sphoneNumberFilterCheckbox.includes(e.currentTarget.value)) {
          sphoneNumberFilterCheckbox = sphoneNumberFilterCheckbox.replace(
            e.currentTarget.value + ",",
            ""
          );
        } else {
          sphoneNumberFilterCheckbox += e.currentTarget.value + ",";
        }
      } else {
        if (sphoneNumberFilterCheckbox.includes("all")) {
          sphoneNumberFilterCheckbox = "";
        } else {
          if (this.state.sortColumn === "phoneNumber") {
            for (let i = 0; i < this.state.sortemail.length; i++) {
              sphoneNumberFilterCheckbox +=
                this.state.sortemail[i].phoneNumber + ",";
            }
            sphoneNumberFilterCheckbox += "all";
          }
        }
      }
    }
    if (column === "status" || column === "all") {
      if (type === "value" && type !== "All") {
        sstatusFilterCheckbox = sstatusFilterCheckbox.replace("all", "");
        sstatusFilterCheckbox = sstatusFilterCheckbox.replace("all,", "");
        if (sstatusFilterCheckbox.includes(e.currentTarget.value)) {
          sstatusFilterCheckbox = sstatusFilterCheckbox.replace(
            e.currentTarget.value + ",",
            ""
          );
        } else {
          sstatusFilterCheckbox += e.currentTarget.value + ",";
        }
      } else {
        if (sstatusFilterCheckbox.includes("all")) {
          sstatusFilterCheckbox = "";
        } else {
          if (this.state.sortColumn === "status") {
            for (let i = 0; i < this.state.sortemail.length; i++) {
              sstatusFilterCheckbox += this.state.sortemail[i].status + ",";
            }
            sstatusFilterCheckbox += "all";
          }
        }
      }
    }

    var allData = this.state.sortAllData;

    this.setState({
      storeNameColor: "",
      storeCodecolor: "",
      cityColor: "",
      stateColor: "",
      pincodeColor: "",
      brandnameColor: "",
      sstoreNameFilterCheckbox,
      sstoreCodeFilterCheckbox,
      scityNameFilterCheckbox,
      sstateNameFilterCheckbox,
      sstrPinCodeFilterCheckbox,
      sregionNameFilterCheckbox,
      szoneFilterCheckbox,
      sstoreTypeNameFilterCheckbox,
      semailFilterCheckbox,
      sphoneNumberFilterCheckbox,
      sstatusFilterCheckbox,
    });
    if (column === "all") {
      itemsArray = this.state.sortAllData;
    } else if (column === "storeName") {
      var sItems = sstoreNameFilterCheckbox.split(",");
      if (sItems.length > 0) {
        for (let i = 0; i < sItems.length; i++) {
          if (sItems[i] !== "") {
            var tempFilterData = allData.filter(
              (a) => a.storeName === sItems[i]
            );
            if (tempFilterData.length > 0) {
              for (let j = 0; j < tempFilterData.length; j++) {
                itemsArray.push(tempFilterData[j]);
              }
            }
          }
        }
      }
    } else if (column === "storeCode") {
      var sItems = sstoreCodeFilterCheckbox.split(",");

      if (sItems.length > 0) {
        for (let i = 0; i < sItems.length; i++) {
          if (sItems[i] !== "") {
            var tempFilterData = allData.filter(
              (a) => a.storeCode === sItems[i]
            );
            if (tempFilterData.length > 0) {
              for (let j = 0; j < tempFilterData.length; j++) {
                itemsArray.push(tempFilterData[j]);
              }
            }
          }
        }
      }
    } else if (column === "cityName") {
      var sItems = scityNameFilterCheckbox.split(",");
      if (sItems.length > 0) {
        for (let i = 0; i < sItems.length; i++) {
          if (sItems[i] !== "") {
            var tempFilterData = allData.filter(
              (a) => a.cityName === sItems[i]
            );
            if (tempFilterData.length > 0) {
              for (let j = 0; j < tempFilterData.length; j++) {
                itemsArray.push(tempFilterData[j]);
              }
            }
          }
        }
      }
    } else if (column === "stateName") {
      var sItems = sstateNameFilterCheckbox.split(",");
      if (sItems.length > 0) {
        for (let i = 0; i < sItems.length; i++) {
          if (sItems[i] !== "") {
            var tempFilterData = allData.filter(
              (a) => a.stateName === sItems[i]
            );
            if (tempFilterData.length > 0) {
              for (let j = 0; j < tempFilterData.length; j++) {
                itemsArray.push(tempFilterData[j]);
              }
            }
          }
        }
      }
    } else if (column === "strPinCode") {
      var sItems = sstrPinCodeFilterCheckbox.split(",");
      if (sItems.length > 0) {
        for (let i = 0; i < sItems.length; i++) {
          if (sItems[i] !== "") {
            var tempFilterData = allData.filter(
              (a) => a.strPinCode === sItems[i]
            );
            if (tempFilterData.length > 0) {
              for (let j = 0; j < tempFilterData.length; j++) {
                itemsArray.push(tempFilterData[j]);
              }
            }
          }
        }
      }
    } else if (column === "regionName") {
      var sItems = sregionNameFilterCheckbox.split(",");
      if (sItems.length > 0) {
        for (let i = 0; i < sItems.length; i++) {
          if (sItems[i] !== "") {
            var tempFilterData = allData.filter(
              (a) => a.regionName === sItems[i]
            );
            if (tempFilterData.length > 0) {
              for (let j = 0; j < tempFilterData.length; j++) {
                itemsArray.push(tempFilterData[j]);
              }
            }
          }
        }
      }
    } else if (column === "zone") {
      var sItems = szoneFilterCheckbox.split(",");
      if (sItems.length > 0) {
        for (let i = 0; i < sItems.length; i++) {
          if (sItems[i] !== "") {
            var tempFilterData = allData.filter((a) => a.zone === sItems[i]);
            if (tempFilterData.length > 0) {
              for (let j = 0; j < tempFilterData.length; j++) {
                itemsArray.push(tempFilterData[j]);
              }
            }
          }
        }
      }
    } else if (column === "storeTypeName") {
      var sItems = sstoreTypeNameFilterCheckbox.split(",");
      if (sItems.length > 0) {
        for (let i = 0; i < sItems.length; i++) {
          if (sItems[i] !== "") {
            var tempFilterData = allData.filter(
              (a) => a.storeTypeName === sItems[i]
            );
            if (tempFilterData.length > 0) {
              for (let j = 0; j < tempFilterData.length; j++) {
                itemsArray.push(tempFilterData[j]);
              }
            }
          }
        }
      }
    } else if (column === "email") {
      var sItems = semailFilterCheckbox.split(",");
      if (sItems.length > 0) {
        for (let i = 0; i < sItems.length; i++) {
          if (sItems[i] !== "") {
            var tempFilterData = allData.filter((a) => a.email === sItems[i]);
            if (tempFilterData.length > 0) {
              for (let j = 0; j < tempFilterData.length; j++) {
                itemsArray.push(tempFilterData[j]);
              }
            }
          }
        }
      }
    } else if (column === "phoneNumber") {
      var sItems = sphoneNumberFilterCheckbox.split(",");
      if (sItems.length > 0) {
        for (let i = 0; i < sItems.length; i++) {
          if (sItems[i] !== "") {
            var tempFilterData = allData.filter(
              (a) => a.phoneNumber === sItems[i]
            );
            if (tempFilterData.length > 0) {
              for (let j = 0; j < tempFilterData.length; j++) {
                itemsArray.push(tempFilterData[j]);
              }
            }
          }
        }
      }
    } else if (column === "status") {
      var sItems = sstatusFilterCheckbox.split(",");
      if (sItems.length > 0) {
        for (let i = 0; i < sItems.length; i++) {
          if (sItems[i] !== "") {
            var tempFilterData = allData.filter((a) => a.status === sItems[i]);
            if (tempFilterData.length > 0) {
              for (let j = 0; j < tempFilterData.length; j++) {
                itemsArray.push(tempFilterData[j]);
              }
            }
          }
        }
      }
    }
    // else if (column === "brandNames") {
    //   var sItems = sFilterCheckbox.split(",");
    //   if (sItems.length > 0) {
    //     for (let i = 0; i < sItems.length; i++) {
    //       if (sItems[i] !== "") {
    //         var tempFilterData = allData.filter(
    //           a => a.brandNames === sItems[i]
    //         );
    //         if (tempFilterData.length > 0) {
    //           for (let j = 0; j < tempFilterData.length; j++) {
    //             itemsArray.push(tempFilterData[j]);
    //           }
    //         }
    //       }
    //     }
    //   }
    //   this.setState({
    //     brandnameColor: "sort-column"
    //   });
    // }

    this.setState({
      tempstoreData: itemsArray,
    });
    // this.StatusCloseModel();
  };

  handleGetStoreMasterData() {
    let self = this;
    this.setState({ loading: true });
    axios({
      method: "post",
      url: config.apiUrl + "/Store/StoreList",
      headers: authHeader(),
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
          if (distinct[i]) {
            self.state.sortStoreName.push({ storeName: distinct[i] });
            self.state.sortFilterStoreName.push({ storeName: distinct[i] });
          }
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
          if (distinct[i]) {
            self.state.sortStoreCode.push({ storeCode: distinct[i] });
            self.state.sortFilterStoreCode.push({ storeCode: distinct[i] });
          }
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
          if (distinct[i]) {
            self.state.sortCity.push({ cityName: distinct[i] });
            self.state.sortFilterCity.push({ cityName: distinct[i] });
          }
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
          if (distinct[i]) {
            self.state.sortState.push({ stateName: distinct[i] });
            self.state.sortFilterState.push({ stateName: distinct[i] });
          }
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
          if (distinct[i]) {
            self.state.sortPincode.push({ strPinCode: distinct[i] });
            self.state.sortFilterPincode.push({ strPinCode: distinct[i] });
          }
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
          self.state.sortFilterBrandName.push({ brandNames: distinct[i] });
        }

        var unique = [];
        var distinct = [];
        for (let i = 0; i < data.length; i++) {
          if (!unique[data[i].regionName]) {
            distinct.push(data[i].regionName);
            unique[data[i].regionName] = 1;
          }
        }
        for (let i = 0; i < distinct.length; i++) {
          if (distinct[i]) {
            self.state.sortregionName.push({ regionName: distinct[i] });
            self.state.sortFilterregionName.push({ regionName: distinct[i] });
          }
        }

        var unique = [];
        var distinct = [];
        for (let i = 0; i < data.length; i++) {
          if (!unique[data[i].zone]) {
            distinct.push(data[i].zone);
            unique[data[i].zone] = 1;
          }
        }
        for (let i = 0; i < distinct.length; i++) {
          if (distinct[i]) {
            self.state.sortzone.push({ zone: distinct[i] });
            self.state.sortFilterzone.push({ zone: distinct[i] });
          }
        }

        var unique = [];
        var distinct = [];
        for (let i = 0; i < data.length; i++) {
          if (!unique[data[i].storeTypeName]) {
            distinct.push(data[i].storeTypeName);
            unique[data[i].storeTypeName] = 1;
          }
        }
        for (let i = 0; i < distinct.length; i++) {
          if (distinct[i]) {
            self.state.sortstoreTypeName.push({ storeTypeName: distinct[i] });
            self.state.sortFilterstoreTypeName.push({
              storeTypeName: distinct[i],
            });
          }
        }

        var unique = [];
        var distinct = [];
        for (let i = 0; i < data.length; i++) {
          if (!unique[data[i].email]) {
            distinct.push(data[i].email);
            unique[data[i].email] = 1;
          }
        }
        for (let i = 0; i < distinct.length; i++) {
          if (distinct[i]) {
            self.state.sortemail.push({ email: distinct[i] });
            self.state.sortFilteremail.push({ email: distinct[i] });
          }
        }

        var unique = [];
        var distinct = [];
        for (let i = 0; i < data.length; i++) {
          if (!unique[data[i].phoneNumber]) {
            distinct.push(data[i].phoneNumber);
            unique[data[i].phoneNumber] = 1;
          }
        }
        for (let i = 0; i < distinct.length; i++) {
          if (distinct[i]) {
            self.state.sortphoneNumber.push({ phoneNumber: distinct[i] });
            self.state.sortFilterphoneNumber.push({ phoneNumber: distinct[i] });
          }
        }

        var unique = [];
        var distinct = [];
        for (let i = 0; i < data.length; i++) {
          if (!unique[data[i].status]) {
            distinct.push(data[i].status);
            unique[data[i].status] = 1;
          }
        }
        for (let i = 0; i < distinct.length; i++) {
          if (distinct[i]) {
            self.state.sortstatus.push({ status: distinct[i] });
            self.state.sortFilterstatus.push({ status: distinct[i] });
          }
        }
      }
      if (status === "Success") {
        if (data !== null) {
          self.setState({
            storeData: data,
            loading: false,
          });
        } else {
          self.setState({
            storeData: [],
            loading: false,
          });
        }
      } else {
        self.setState({
          storeData: [],
          loading: false,
        });
      }
    });
  }
  handleGetBrandList() {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/Brand/GetBrandList",
      headers: authHeader(),
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
      headers: authHeader(),
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
        StateId: stateId,
      },
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
      headers: authHeader(),
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
      headers: authHeader(),
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
    const TranslationContext = this.state.translateLanguage.default;

    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/Store/deleteStore",
      headers: authHeader(),
      params: {
        StoreID: store_Id,
      },
    }).then(function(res) {
      let status = res.data.message;
      if (status === "Record deleted Successfully") {
        self.handleGetStoreMasterData();
        NotificationManager.success(
          TranslationContext !== undefined
            ? TranslationContext.alertmessage.storedeletedsuccessfully
            : "Store deleted successfully."
        );
      }
    });
  }
  handleSubmitData() {
    const TranslationContext = this.state.translateLanguage.default;

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
          IsActive: activeStatus,
        },
      }).then(function(res) {
        let status = res.data.message;
        if (status === "Success") {
          self.handleGetStoreMasterData();
          NotificationManager.success(
            TranslationContext !== undefined
              ? TranslationContext.alertmessage.storeaddedsuccessfully
              : "Store added successfully."
          );
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
            cityData: [],
          });
        } else {
          NotificationManager.error(
            TranslationContext !== undefined
              ? TranslationContext.alertmessage.storenotadded
              : "Store Not added."
          );
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
        statusCompulsion: "Please Select Status.",
      });
    }
  }

  handleUpdateData() {
    const TranslationContext = this.state.translateLanguage.default;

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
      if (status === "Active") {
        activeStatus = 1;
      } else {
        activeStatus = 0;
      }
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
          IsActive: activeStatus,
        },
      })
        .then(function(res) {
          let status = res.data.message;
          if (status === "Success") {
            self.handleGetStoreMasterData();
            NotificationManager.success(
              TranslationContext !== undefined
                ? TranslationContext.alertmessage.storeupdatedsuccessfully
                : "Store updated successfully."
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
        .catch((response) => {
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
  fileUpload = (e) => {
    var allFiles = [];
    var selectedFiles = e;
    if (selectedFiles) {
      allFiles.push(selectedFiles[0]);

      var fileSize = formatSizeUnits(selectedFiles[0].size);
      this.setState({
        fileSize,
        fileN: allFiles,
        fileName: allFiles[0].name,
        bulkuploadCompulsion: "",
      });
    }
  };
  fileDrop = (e) => {
    var allFiles = [];
    var selectedFiles = e.target.files;
    allFiles.push(selectedFiles[0]);
    this.setState({
      fileN: allFiles,
      fileName: allFiles[0].name,
    });
    // this.setState({ fileName: e.dataTransfer.files[0].name });
    e.preventDefault();
  };
  fileDragOver = (e) => {
    e.preventDefault();
  };
  fileDragEnter = (e) => {
    e.preventDefault();
  };
  handleBrandChange = (e) => {
    if (e === null) {
      e = [];
    }
    this.setState({ selectedBrand: e });
  };
  handleEditBrandChange = (e) => {
    let value = e.target.value;
    this.setState({ EditBrand: value });
  };

  handleStateChange = (e) => {
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
      var data = this.state.brandData.filter((x) => x.brandID == mBrandData[i]);
      if (data.length > 0) {
        modalSelectedBrand.push(data[0]);
      }
    }

    this.handleGetCityList(individualData.stateID);

    this.setState({
      editmodel: true,
      userEditData,
      modalSelectedBrand,
    });
  }
  handleOnChangeEditData = (e) => {
    var name = e.target.name;
    var value = e.target.value;

    var data = this.state.userEditData;
    data[name] = value;

    this.setState({
      EditTemp: data,
    });
    setTimeout(() => {
      if (this.state.userEditData.status_ID) {
        this.handleGetCityList();
      }
    }, 1);
  };
  handleCityChange = (e) => {
    let value = parseInt(e.target.value);
    this.setState({ selectCity: value });
  };

  handleZoneChange = (e) => {
    let value = parseInt(e.target.value);
    this.setState({ selectZone: value });
  };

  handleRegionChange = (e) => {
    let value = parseInt(e.target.value);
    this.setState({ selectRegion: value });
  };

  handleStoreTypeChange = (e) => {
    let value = parseInt(e.target.value);
    this.setState({ store_type: value });
  };

  handleStatusChange = (e) => {
    let value = e.target.value;
    this.setState({ selectStatus: value });
  };

  hanldeOnChangeData = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  hanldeOnEmailChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
    var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if (e.target.value == "") {
      this.setState({
        emailFlag: true,
      });
    } else if (reg.test(e.target.value) == false) {
      this.setState({
        emailFlag: false,
      });
    } else {
      this.setState({
        emailFlag: true,
      });
    }
  };
  hanldeOnPhoneChange = (e) => {
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
          phoneFlag: true,
        });
      } else {
        this.setState({
          phoneFlag: false,
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
          phoneFlag: true,
        });
      } else {
        this.setState({
          phoneFlag: false,
        });
      }
    }
  };
  hanldeOnPinCodeChange = (e) => {
    var reg = /^[0-9\b]+$/;
    if (e.target.value === "" || reg.test(e.target.value)) {
      this.setState({ [e.target.name]: e.target.value });
    } else {
      e.target.value = "";
    }
    if (e.target.value.length == 6 || e.target.value.length == 0) {
      this.setState({
        pinCodeFlag: true,
      });
    } else {
      this.setState({
        pinCodeFlag: false,
      });
    }
  };
  toggleEditModal() {
    this.setState({ editmodel: false });
  }

  callBackEdit = (RoleName, Status, rowData) => {
    // this.setState({RoleName,updateRoleisActive:Status})
    // this.state.RoleName = RoleName;
    // this.state.updateRoleisActive = Status;
    // this.state.rowData = rowData;
  };

  handleModalEditData = (e) => {
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
          EditEmailFlag: true,
        });
      } else if (reg.test(e.target.value) == false) {
        this.setState({
          EditEmailFlag: false,
        });
      } else {
        this.setState({
          EditEmailFlag: true,
        });
      }
    }
  };

  handleModalBrandChange = (e) => {
    this.setState({ modalSelectedBrand: e });
  };

  filteTextChange(e) {
    this.setState({ filterTxtValue: e.target.value });

    if (this.state.sortColumn === "storeName") {
      var sortFilterStoreName = matchSorter(
        this.state.sortStoreName,
        e.target.value,
        { keys: ["storeName"] }
      );
      if (sortFilterStoreName.length > 0) {
        this.setState({ sortFilterStoreName });
      } else {
        this.setState({
          sortFilterStoreName: this.state.sortStoreName,
        });
      }
    }
    if (this.state.sortColumn === "storeCode") {
      var sortFilterStoreCode = matchSorter(
        this.state.sortStoreCode,
        e.target.value,
        { keys: ["storeCode"] }
      );
      if (sortFilterStoreCode.length > 0) {
        this.setState({ sortFilterStoreCode });
      } else {
        this.setState({
          sortFilterStoreCode: this.state.sortStoreCode,
        });
      }
    }
    if (this.state.sortColumn === "cityName") {
      var sortFilterCity = matchSorter(this.state.sortCity, e.target.value, {
        keys: ["cityName"],
      });
      if (sortFilterCity.length > 0) {
        this.setState({ sortFilterCity });
      } else {
        this.setState({
          sortFilterCity: this.state.sortCity,
        });
      }
    }
    if (this.state.sortColumn === "stateName") {
      var sortFilterState = matchSorter(this.state.sortState, e.target.value, {
        keys: ["stateName"],
      });
      if (sortFilterState.length > 0) {
        this.setState({ sortFilterState });
      } else {
        this.setState({
          sortFilterState: this.state.sortState,
        });
      }
    }
    if (this.state.sortColumn === "strPinCode") {
      var sortFilterPincode = matchSorter(
        this.state.sortPincode,
        e.target.value,
        {
          keys: ["strPinCode"],
        }
      );
      if (sortFilterPincode.length > 0) {
        this.setState({ sortFilterPincode });
      } else {
        this.setState({
          sortFilterPincode: this.state.sortPincode,
        });
      }
    }
    if (this.state.sortColumn === "regionName") {
      var sortFilterregionName = matchSorter(
        this.state.sortregionName,
        e.target.value,
        {
          keys: ["regionName"],
        }
      );
      if (sortFilterregionName.length > 0) {
        this.setState({ sortFilterregionName });
      } else {
        this.setState({
          sortFilterregionName: this.state.sortregionName,
        });
      }
    }
    if (this.state.sortColumn === "zone") {
      var sortFilterzone = matchSorter(this.state.sortzone, e.target.value, {
        keys: ["zone"],
      });
      if (sortFilterzone.length > 0) {
        this.setState({ sortFilterzone });
      } else {
        this.setState({
          sortFilterzone: this.state.sortzone,
        });
      }
    }
    if (this.state.sortColumn === "storeTypeName") {
      var sortFilterstoreTypeName = matchSorter(
        this.state.sortstoreTypeName,
        e.target.value,
        {
          keys: ["storeTypeName"],
        }
      );
      if (sortFilterstoreTypeName.length > 0) {
        this.setState({ sortFilterstoreTypeName });
      } else {
        this.setState({
          sortFilterstoreTypeName: this.state.sortstoreTypeName,
        });
      }
    }
    if (this.state.sortColumn === "email") {
      var sortFilteremail = matchSorter(this.state.sortemail, e.target.value, {
        keys: ["storeTypeName"],
      });
      if (sortFilteremail.length > 0) {
        this.setState({ sortFilteremail });
      } else {
        this.setState({
          sortFilteremail: this.state.sortemail,
        });
      }
    }
    if (this.state.sortColumn === "phoneNumber") {
      var sortFilterphoneNumber = matchSorter(
        this.state.sortphoneNumber,
        e.target.value,
        {
          keys: ["phoneNumber"],
        }
      );
      if (sortFilterphoneNumber.length > 0) {
        this.setState({ sortFilterphoneNumber });
      } else {
        this.setState({
          sortFilterphoneNumber: this.state.sortphoneNumber,
        });
      }
    }
    if (this.state.sortColumn === "status") {
      var sortFilterstatus = matchSorter(
        this.state.sortstatus,
        e.target.value,
        {
          keys: ["status"],
        }
      );
      if (sortFilterstatus.length > 0) {
        this.setState({ sortFilterstatus });
      } else {
        this.setState({
          sortFilterstatus: this.state.sortstatus,
        });
      }
    }
    // if (this.state.sortColumn === "brandNames") {
    //   var sortFilterBrandName = matchSorter(
    //     this.state.sortBrandName,
    //     e.target.value,
    //     {
    //       keys: ["brandNames"],
    //     }
    //   );
    //   if (sortFilterBrandName.length > 0) {
    //     this.setState({ sortFilterBrandName });
    //   } else {
    //     this.setState({
    //       sortFilterBrandName: this.state.sortBrandName,
    //     });
    //   }
    // }
  }
  updateUploadProgress(value) {
    this.setState({ progressValue: value });
  }
  handleDeleteBulkupload = (e) => {
    const TranslationContext = this.state.translateLanguage.default;

    this.setState({
      fileN: [],
      fileName: "",
    });
    NotificationManager.success(
      TranslationContext !== undefined
        ? TranslationContext.alertmessage.filedeletedsuccessfully
        : "File deleted successfully."
    );
  };

  render() {
    const TranslationContext = this.state.translateLanguage.default;
    const { storeData } = this.state;
    return (
      <React.Fragment>
        <div className="position-relative d-inline-block">
          <Modal
            onClose={this.StatusCloseModel}
            open={this.state.StatusModel}
            modalId="Status-popup"
            overlayId="logout-ovrly"
          >
            <div className="status-drop-down">
              <div className="sort-sctn">
                <label style={{ color: "#0066cc", fontWeight: "bold" }}>
                  {this.state.sortHeader}
                </label>
                <div className="d-flex">
                  <a
                    href="#!"
                    onClick={this.sortStatusAtoZ.bind(this)}
                    className="sorting-icon"
                  >
                    <img src={Sorting} alt="sorting-icon" />
                  </a>
                  <p>
                    {TranslationContext !== undefined
                      ? TranslationContext.p.sortatoz
                      : "SORT BY A TO Z"}
                  </p>
                </div>
                <div className="d-flex">
                  <a
                    href="#!"
                    onClick={this.sortStatusZtoA.bind(this)}
                    className="sorting-icon"
                  >
                    <img src={Sorting} alt="sorting-icon" />
                  </a>
                  <p>
                    {TranslationContext !== undefined
                      ? TranslationContext.p.sortztoa
                      : "SORT BY Z TO A"}
                  </p>
                </div>
              </div>
              <a
                href=""
                style={{ margin: "0 25px", textDecoration: "underline" }}
                onClick={this.setSortCheckStatus.bind(this, "all")}
              >
                {TranslationContext !== undefined
                  ? TranslationContext.a.clearsearch
                  : "clear search"}
              </a>
              <div className="filter-type">
                <p>
                  {" "}
                  {TranslationContext !== undefined
                    ? TranslationContext.p.filterbytype
                    : "FILTER BY TYPE"}
                </p>
                <input
                  type="text"
                  style={{ display: "block" }}
                  value={this.state.filterTxtValue}
                  onChange={this.filteTextChange.bind(this)}
                />
                <div className="FTypeScroll">
                  <div className="filter-checkbox">
                    <input
                      type="checkbox"
                      name="filter-type"
                      id={"fil-open"}
                      value="all"
                      checked={
                        this.state.sstoreNameFilterCheckbox.includes("all") ||
                        this.state.sstoreCodeFilterCheckbox.includes("all") ||
                        this.state.scityNameFilterCheckbox.includes("all") ||
                        this.state.sstateNameFilterCheckbox.includes("all") ||
                        this.state.sstrPinCodeFilterCheckbox.includes("all") ||
                        this.state.sortFilterregionName.includes("all") ||
                        this.state.sortFilterzone.includes("all") ||
                        this.state.sortFilterstoreTypeName.includes("all") ||
                        this.state.sortFilteremail.includes("all") ||
                        this.state.sortFilterphoneNumber.includes("all") ||
                        this.state.sortFilterstatus.includes("all")
                      }
                      onChange={this.setSortCheckStatus.bind(this, "all")}
                    />
                    <label htmlFor={"fil-open"}>
                      <span className="table-btn table-blue-btn">ALL</span>
                    </label>
                  </div>
                  {this.state.sortColumn === "storeName"
                    ? this.state.sortFilterStoreName !== null &&
                      this.state.sortFilterStoreName.map((item, i) => (
                        <div className="filter-checkbox">
                          <input
                            type="checkbox"
                            name="filter-type"
                            id={"fil-open" + item.storeName}
                            value={item.storeName}
                            checked={this.state.sstoreNameFilterCheckbox.includes(
                              item.storeName
                            )}
                            onChange={this.setSortCheckStatus.bind(
                              this,
                              "storeName",
                              "value"
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
                    ? this.state.sortFilterStoreCode !== null &&
                      this.state.sortFilterStoreCode.map((item, i) => (
                        <div className="filter-checkbox">
                          <input
                            type="checkbox"
                            name="filter-type"
                            id={"fil-open" + item.storeCode}
                            value={item.storeCode}
                            checked={this.state.sstoreCodeFilterCheckbox.includes(
                              item.storeCode
                            )}
                            onChange={this.setSortCheckStatus.bind(
                              this,
                              "storeCode",
                              "value"
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
                    ? this.state.sortFilterCity !== null &&
                      this.state.sortFilterCity.map((item, i) => (
                        <div className="filter-checkbox">
                          <input
                            type="checkbox"
                            name="filter-type"
                            id={"fil-open" + item.cityName}
                            value={item.cityName}
                            checked={this.state.scityNameFilterCheckbox.includes(
                              item.cityName
                            )}
                            onChange={this.setSortCheckStatus.bind(
                              this,
                              "cityName",
                              "value"
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
                    ? this.state.sortFilterState !== null &&
                      this.state.sortFilterState.map((item, i) => (
                        <div className="filter-checkbox">
                          <input
                            type="checkbox"
                            name="filter-type"
                            id={"fil-open" + item.stateName}
                            value={item.stateName}
                            checked={this.state.sstateNameFilterCheckbox.includes(
                              item.stateName
                            )}
                            onChange={this.setSortCheckStatus.bind(
                              this,
                              "stateName",
                              "value"
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
                    ? this.state.sortFilterPincode !== null &&
                      this.state.sortFilterPincode.map((item, i) => (
                        <div className="filter-checkbox">
                          <input
                            type="checkbox"
                            name="filter-type"
                            id={"fil-open" + item.strPinCode}
                            value={item.strPinCode}
                            checked={this.state.sstrPinCodeFilterCheckbox.includes(
                              item.strPinCode
                            )}
                            onChange={this.setSortCheckStatus.bind(
                              this,
                              "strPinCode",
                              "value"
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
                  {this.state.sortColumn === "regionName"
                    ? this.state.sortFilterregionName !== null &&
                      this.state.sortFilterregionName.map((item, i) => (
                        <div className="filter-checkbox">
                          <input
                            type="checkbox"
                            name="filter-type"
                            id={"fil-open" + item.regionName}
                            value={item.regionName}
                            checked={this.state.sregionNameFilterCheckbox.includes(
                              item.regionName
                            )}
                            onChange={this.setSortCheckStatus.bind(
                              this,
                              "regionName",
                              "value"
                            )}
                          />
                          <label htmlFor={"fil-open" + item.regionName}>
                            <span className="table-btn table-blue-btn">
                              {item.regionName}
                            </span>
                          </label>
                        </div>
                      ))
                    : null}
                  {this.state.sortColumn === "zone"
                    ? this.state.sortFilterzone !== null &&
                      this.state.sortFilterzone.map((item, i) => (
                        <div className="filter-checkbox">
                          <input
                            type="checkbox"
                            name="filter-type"
                            id={"fil-open" + item.zone}
                            value={item.zone}
                            checked={this.state.szoneFilterCheckbox.includes(
                              item.zone
                            )}
                            onChange={this.setSortCheckStatus.bind(
                              this,
                              "zone",
                              "value"
                            )}
                          />
                          <label htmlFor={"fil-open" + item.zone}>
                            <span className="table-btn table-blue-btn">
                              {item.zone}
                            </span>
                          </label>
                        </div>
                      ))
                    : null}
                  {this.state.sortColumn === "storeTypeName"
                    ? this.state.sortFilterstoreTypeName !== null &&
                      this.state.sortFilterstoreTypeName.map((item, i) => (
                        <div className="filter-checkbox">
                          <input
                            type="checkbox"
                            name="filter-type"
                            id={"fil-open" + item.storeTypeName}
                            value={item.storeTypeName}
                            checked={this.state.sstoreTypeNameFilterCheckbox.includes(
                              item.storeTypeName
                            )}
                            onChange={this.setSortCheckStatus.bind(
                              this,
                              "storeTypeName",
                              "value"
                            )}
                          />
                          <label htmlFor={"fil-open" + item.storeTypeName}>
                            <span className="table-btn table-blue-btn">
                              {item.storeTypeName}
                            </span>
                          </label>
                        </div>
                      ))
                    : null}
                  {this.state.sortColumn === "email"
                    ? this.state.sortFilteremail !== null &&
                      this.state.sortFilteremail.map((item, i) => (
                        <div className="filter-checkbox">
                          <input
                            type="checkbox"
                            name="filter-type"
                            id={"fil-open" + item.email}
                            value={item.email}
                            checked={this.state.semailFilterCheckbox.includes(
                              item.email
                            )}
                            onChange={this.setSortCheckStatus.bind(
                              this,
                              "email",
                              "value"
                            )}
                          />
                          <label htmlFor={"fil-open" + item.email}>
                            <span className="table-btn table-blue-btn">
                              {item.email}
                            </span>
                          </label>
                        </div>
                      ))
                    : null}
                  {this.state.sortColumn === "phoneNumber"
                    ? this.state.sortFilterphoneNumber !== null &&
                      this.state.sortFilterphoneNumber.map((item, i) => (
                        <div className="filter-checkbox">
                          <input
                            type="checkbox"
                            name="filter-type"
                            id={"fil-open" + item.phoneNumber}
                            value={item.phoneNumber}
                            checked={this.state.sphoneNumberFilterCheckbox.includes(
                              item.phoneNumber
                            )}
                            onChange={this.setSortCheckStatus.bind(
                              this,
                              "phoneNumber",
                              "value"
                            )}
                          />
                          <label htmlFor={"fil-open" + item.phoneNumber}>
                            <span className="table-btn table-blue-btn">
                              {item.phoneNumber}
                            </span>
                          </label>
                        </div>
                      ))
                    : null}
                  {this.state.sortColumn === "status"
                    ? this.state.sortFilterstatus !== null &&
                      this.state.sortFilterstatus.map((item, i) => (
                        <div className="filter-checkbox">
                          <input
                            type="checkbox"
                            name="filter-type"
                            id={"fil-open" + item.status}
                            value={item.status}
                            checked={this.state.sstatusFilterCheckbox.includes(
                              item.status
                            )}
                            onChange={this.setSortCheckStatus.bind(
                              this,
                              "status",
                              "value"
                            )}
                          />
                          <label htmlFor={"fil-open" + item.status}>
                            <span className="table-btn table-blue-btn">
                              {item.status}
                            </span>
                          </label>
                        </div>
                      ))
                    : null}
                  {/* {this.state.sortColumn === "brandNames"
                    ? this.state.sortFilterBrandName !== null &&
                      this.state.sortFilterBrandName.map((item, i) => (
                        <div className="filter-checkbox">
                          <input
                            type="checkbox"
                            name="filter-type"
                            id={"fil-open" + item.brandNames}
                            value={item.brandNames}
                            onChange={this.setSortCheckStatus.bind(
                              this,
                              "brandNames",
                              "value"
                            )}
                          />
                          <label htmlFor={"fil-open" + item.brandNames}>
                            <span className="table-btn table-blue-btn">
                              {item.brandNames}
                            </span>
                          </label>
                        </div>
                      ))
                    : null} */}
                </div>
              </div>
            </div>
          </Modal>
        </div>
        <div className="container-fluid setting-title setting-breadcrumb">
          <Link to="settings" className="header-path">
            {TranslationContext !== undefined
              ? TranslationContext.link.setting
              : "Settings"}
          </Link>
          <span>&gt;</span>
          <Link to="settings" className="header-path">
            {TranslationContext !== undefined
              ? TranslationContext.link.ticketing
              : "Ticketing"}
          </Link>
          <span>&gt;</span>
          <Link to={Demo.BLANK_LINK} className="header-path active">
            {TranslationContext !== undefined
              ? TranslationContext.link.storemaster
              : "Store Master"}
          </Link>
        </div>
        <div className="container-fluid">
          <div className="store-settings-cntr settingtable">
            <div className="row">
              <div className="col-md-8">
                {this.state.loading === true ? (
                  <div className="loader-icon loader-icon-height"></div>
                ) : (
                  <div className="table-cntr table-height TicketStoreReact settings-align">
                    <ReactTable
                      data={storeData}
                      columns={[
                        {
                          Header: (
                            <span
                              className={this.state.storeNameColor}
                              onClick={this.StatusOpenModel.bind(
                                this,
                                "storeName",
                                TranslationContext !== undefined
                                  ? TranslationContext.span.storename
                                  : "Store Name"
                              )}
                            >
                              {TranslationContext !== undefined
                                ? TranslationContext.span.storename
                                : "Store Name"}

                              <FontAwesomeIcon icon={faCaretDown} />
                            </span>
                          ),
                          sortable: false,
                          accessor: "storeName",
                          width: 120,
                        },
                        {
                          Header: (
                            <span
                              className={this.state.storeCodecolor}
                              onClick={this.StatusOpenModel.bind(
                                this,
                                "storeCode",
                                TranslationContext !== undefined
                                  ? TranslationContext.span.storecode
                                  : "Store Code"
                              )}
                            >
                              {TranslationContext !== undefined
                                ? TranslationContext.span.storecode
                                : "Store Code"}
                              <FontAwesomeIcon icon={faCaretDown} />
                            </span>
                          ),
                          sortable: false,
                          accessor: "storeCode",
                          width: 120,
                        },
                        {
                          Header: (
                            <span
                              className={this.state.brandnameColor}
                              // onClick={this.StatusOpenModel.bind(
                              //   this,
                              //   "brandNames",
                              //   "Brand Names"
                              // )}
                            >
                              {TranslationContext !== undefined
                                ? TranslationContext.span.brandname
                                : "Brand Name"}

                              {/* <FontAwesomeIcon icon={faCaretDown} /> */}
                            </span>
                          ),
                          accessor: "brand_Names",
                          width: 125,
                          sortable: false,
                          Cell: (row) => {
                            if (isNaN(row.original.brand_Names)) {
                              return (
                                <div>
                                  <span className="one-liner">
                                    {row.original["brand_Names"]}

                                    <Popover
                                      content={
                                        <div className="settings-created-by-popover">
                                          <div>
                                            <p className="title">
                                              {TranslationContext !== undefined
                                                ? TranslationContext.p.brandname
                                                : "Brand Name"}
                                              : &nbsp;
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
                          },
                        },
                        {
                          Header: (
                            <span
                              className={this.state.cityColor}
                              onClick={this.StatusOpenModel.bind(
                                this,
                                "cityName",
                                TranslationContext !== undefined
                                  ? TranslationContext.span.city
                                  : "City"
                              )}
                            >
                              {TranslationContext !== undefined
                                ? TranslationContext.span.city
                                : "City"}
                              <FontAwesomeIcon icon={faCaretDown} />
                            </span>
                          ),
                          sortable: false,
                          accessor: "cityName",
                        },
                        {
                          Header: (
                            <span
                              className={this.state.stateColor}
                              onClick={this.StatusOpenModel.bind(
                                this,
                                "stateName",
                                TranslationContext !== undefined
                                  ? TranslationContext.span.state
                                  : "State"
                              )}
                            >
                              {TranslationContext !== undefined
                                ? TranslationContext.span.state
                                : "State"}

                              <FontAwesomeIcon icon={faCaretDown} />
                            </span>
                          ),
                          accessor: "stateName",
                        },
                        {
                          Header: (
                            <span
                              className={this.state.pincodeColor}
                              onClick={this.StatusOpenModel.bind(
                                this,
                                "strPinCode",
                                TranslationContext !== undefined
                                  ? TranslationContext.span.pincode
                                  : "Pin code"
                              )}
                            >
                              {TranslationContext !== undefined
                                ? TranslationContext.span.pincode
                                : "Pin code"}

                              <FontAwesomeIcon icon={faCaretDown} />
                            </span>
                          ),
                          sortable: false,
                          accessor: "strPinCode",
                        },
                        {
                          Header: (
                            <span
                            // className={this.state.pincodeColor}
                            // onClick={this.StatusOpenModel.bind(
                            //   this,
                            //   "strPinCode",
                            //   "Pin Code"
                            // )}
                            >
                              {TranslationContext !== undefined
                                ? TranslationContext.span.address
                                : "Address"}
                              <FontAwesomeIcon icon={faCaretDown} />
                            </span>
                          ),
                          sortable: false,
                          accessor: "address",
                          minWidth: 250,
                        },
                        {
                          Header: (
                            <span
                              // className={this.state.pincodeColor}
                              onClick={this.StatusOpenModel.bind(
                                this,
                                "regionName",
                                TranslationContext !== undefined
                                  ? TranslationContext.span.region
                                  : "Region"
                              )}
                            >
                              {TranslationContext !== undefined
                                ? TranslationContext.span.region
                                : "Region"}

                              <FontAwesomeIcon icon={faCaretDown} />
                            </span>
                          ),
                          sortable: false,
                          accessor: "regionName",
                        },
                        {
                          Header: (
                            <span
                              // className={this.state.pincodeColor}
                              onClick={this.StatusOpenModel.bind(
                                this,
                                "zone",
                                TranslationContext !== undefined
                                  ? TranslationContext.span.zone
                                  : "Zone"
                              )}
                            >
                              {TranslationContext !== undefined
                                ? TranslationContext.span.zone
                                : "Zone"}
                              <FontAwesomeIcon icon={faCaretDown} />
                            </span>
                          ),
                          sortable: false,
                          accessor: "zone",
                        },
                        {
                          Header: (
                            <span
                              // className={this.state.pincodeColor}
                              onClick={this.StatusOpenModel.bind(
                                this,
                                "storeTypeName",
                                TranslationContext !== undefined
                                  ? TranslationContext.span.storetype
                                  : "Store Type"
                              )}
                            >
                              {TranslationContext !== undefined
                                ? TranslationContext.span.storetype
                                : "Store Type"}
                              <FontAwesomeIcon icon={faCaretDown} />
                            </span>
                          ),
                          sortable: false,
                          width: 115,
                          accessor: "storeTypeName",
                        },
                        {
                          Header: (
                            <span
                              // className={this.state.pincodeColor}
                              onClick={this.StatusOpenModel.bind(
                                this,
                                "email",
                                TranslationContext !== undefined
                                  ? TranslationContext.span.emailid
                                  : "Email ID"
                              )}
                            >
                              {TranslationContext !== undefined
                                ? TranslationContext.span.emailid
                                : "Email ID"}

                              <FontAwesomeIcon icon={faCaretDown} />
                            </span>
                          ),
                          sortable: false,
                          accessor: "email",
                          minWidth: 220,
                        },
                        {
                          Header: (
                            <span
                              // className={this.state.pincodeColor}
                              onClick={this.StatusOpenModel.bind(
                                this,
                                "phoneNumber",
                                TranslationContext !== undefined
                                  ? TranslationContext.span.phonenumber
                                  : "Phone No"
                              )}
                            >
                              {TranslationContext !== undefined
                                ? TranslationContext.span.phonenumber
                                : "Phone No"}
                              <FontAwesomeIcon icon={faCaretDown} />
                            </span>
                          ),
                          sortable: false,
                          accessor: "phoneNumber",
                          minWidth: 120,
                        },
                        {
                          Header: (
                            <span
                              // className={this.state.pincodeColor}
                              onClick={this.StatusOpenModel.bind(
                                this,
                                "status",
                                TranslationContext !== undefined
                                  ? TranslationContext.span.status
                                  : "Status"
                              )}
                            >
                              {TranslationContext !== undefined
                                ? TranslationContext.span.status
                                : "Status"}
                              <FontAwesomeIcon icon={faCaretDown} />
                            </span>
                          ),
                          sortable: false,
                          accessor: "status",
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
                          Header: (
                            <span>
                              {TranslationContext !== undefined
                                ? TranslationContext.span.actions
                                : "Actions"}
                            </span>
                          ),
                          accessor: "actiondept",
                          sortable: false,
                          minWidth: 140,
                          Cell: (row) => {
                            var ids = row.original["storeID"];
                            return (
                              <>
                                <span className="settings-align-actions">
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
                                            {TranslationContext !== undefined
                                              ? TranslationContext.p.deletefile
                                              : "Delete file"}
                                            ?
                                          </p>
                                          <p className="mt-1 fs-12">
                                            {TranslationContext !== undefined
                                              ? TranslationContext.p
                                                  .areyousureyouwanttodeletethisfile
                                              : "Are you sure you want to delete this file"}
                                            ?
                                          </p>
                                          <div className="del-can">
                                            <a href={Demo.BLANK_LINK}>
                                              {" "}
                                              {TranslationContext !== undefined
                                                ? TranslationContext.a.cancel
                                                : "CANCEL"}
                                            </a>
                                            <button
                                              className="butn"
                                              type="button"
                                              onClick={this.handleDeleteStore.bind(
                                                this,
                                                ids
                                              )}
                                            >
                                              {TranslationContext !== undefined
                                                ? TranslationContext.button
                                                    .delete
                                                : "Delete"}
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
                                    {TranslationContext !== undefined
                                      ? TranslationContext.mybutton.edit
                                      : "EDIT"}
                                  </button>
                                </span>
                              </>
                            );
                          },
                        },
                      ]}
                      resizable={false}
                      minRows={2}
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
                    <label className="Create-store-text">
                      {TranslationContext !== undefined
                        ? TranslationContext.label.createstore
                        : "CREATE STORE"}
                    </label>
                    <div className="div-padding-1">
                      <label className="designation-name">
                        {TranslationContext !== undefined
                          ? TranslationContext.label.brand
                          : "Brand"}
                      </label>
                      <Select
                        getOptionLabel={(option) => option.brandName}
                        getOptionValue={(option) => option.brandID}
                        options={this.state.brandData}
                        placeholder={
                          TranslationContext !== undefined
                            ? TranslationContext.placeholder.select
                            : "Select"
                        }
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
                      <label className="designation-name">
                        {TranslationContext !== undefined
                          ? TranslationContext.label.storecode
                          : "Store Code"}
                      </label>
                      <input
                        type="text"
                        className="txt-1"
                        placeholder={
                          TranslationContext !== undefined
                            ? TranslationContext.placeholder.enterstorecode
                            : "Enter Store Code"
                        }
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
                      <label className="designation-name">
                        {TranslationContext !== undefined
                          ? TranslationContext.label.storename
                          : "Store Name"}
                      </label>
                      <input
                        type="text"
                        className="txt-1"
                        placeholder={
                          TranslationContext !== undefined
                            ? TranslationContext.placeholder.enterstorename
                            : "Enter Store Name"
                        }
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
                      <label className="designation-name">
                        {TranslationContext !== undefined
                          ? TranslationContext.label.storename
                          : "State"}
                      </label>
                      <select
                        className="store-create-select"
                        value={this.state.selectState}
                        onChange={this.handleStateChange}
                      >
                        <option value={0}>
                          {TranslationContext !== undefined
                            ? TranslationContext.option.select
                            : "Select"}
                        </option>
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
                      <label className="designation-name">
                        {TranslationContext !== undefined
                          ? TranslationContext.label.city
                          : "City"}
                      </label>
                      <select
                        className="store-create-select"
                        value={this.state.selectCity}
                        onChange={this.handleCityChange}
                      >
                        <option value="0">
                          {" "}
                          {TranslationContext !== undefined
                            ? TranslationContext.option.select
                            : "Select"}
                        </option>
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
                      <label className="designation-name">
                        {TranslationContext !== undefined
                          ? TranslationContext.label.pincode
                          : "Pin Code"}
                      </label>
                      <input
                        type="text"
                        className="txt-1"
                        placeholder={
                          TranslationContext !== undefined
                            ? TranslationContext.placeholder.enterpincode
                            : "Enter Pin Code"
                        }
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
                      <label className="designation-name">
                        {TranslationContext !== undefined
                          ? TranslationContext.label.address
                          : "Address"}
                      </label>
                      <textarea
                        cols="31"
                        rows="3"
                        className="store-create-textarea"
                        placeholder={
                          TranslationContext !== undefined
                            ? TranslationContext.placeholder.enteraddress
                            : "Enter address"
                        }
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
                      <label className="designation-name">
                        {TranslationContext !== undefined
                          ? TranslationContext.label.region
                          : "Region"}
                      </label>
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
                      <label className="designation-name">
                        {TranslationContext !== undefined
                          ? TranslationContext.label.zone
                          : "Zone"}
                      </label>
                      <select
                        className="store-create-select"
                        value={this.state.selectZone}
                        onChange={this.handleZoneChange}
                      >
                        <option value="0">
                          {TranslationContext !== undefined
                            ? TranslationContext.option.select
                            : "Select"}
                        </option>
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
                      <label className="designation-name">
                        {TranslationContext !== undefined
                          ? TranslationContext.label.storetype
                          : "Store Type"}
                      </label>
                      <select
                        className="store-create-select"
                        value={this.state.store_type}
                        onChange={this.handleStoreTypeChange}
                      >
                        <option value="0">
                          {TranslationContext !== undefined
                            ? TranslationContext.option.select
                            : "Select"}
                        </option>
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
                        {TranslationContext !== undefined
                          ? TranslationContext.label.contactdetailsemails
                          : "Contact Details: Email ID"}
                      </label>
                      <input
                        type="text"
                        className="txt-1"
                        placeholder={
                          TranslationContext !== undefined
                            ? TranslationContext.placeholder.enteremailid
                            : "Enter email id"
                        }
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
                        {TranslationContext !== undefined
                          ? TranslationContext.label.contactdetailsphones
                          : "Contact Details: Phone No"}
                      </label>
                      <input
                        type="text"
                        className="txt-1"
                        placeholder={
                          TranslationContext !== undefined
                            ? TranslationContext.placeholder.enterphoneno
                            : "Enter phone no"
                        }
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
                      <label className="designation-name">
                        {TranslationContext !== undefined
                          ? TranslationContext.label.status
                          : "Status"}
                      </label>
                      <select
                        className="form-control dropdown-setting"
                        value={this.state.selectStatus}
                        onChange={this.handleStatusChange}
                      >
                        <option value="">
                          {TranslationContext !== undefined
                            ? TranslationContext.option.select
                            : "select"}
                        </option>
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
                        {TranslationContext !== undefined
                          ? TranslationContext.button.add
                          : "ADD"}
                      </button>
                    </div>
                  </div>
                </div>
                <br />
                <div className="right-sect-div">
                  <div className="d-flex justify-content-between align-items-center pb-2">
                    <h3 className="pb-0">
                      {TranslationContext !== undefined
                        ? TranslationContext.h3.bulkupload
                        : "Bulk Upload"}
                    </h3>
                    <div className="down-excel">
                      <p>
                        {TranslationContext !== undefined
                          ? TranslationContext.p.template
                          : "Template"}
                      </p>
                      <CSVLink
                        filename={"Store.csv"}
                        data={config.storeTemplate}
                      >
                        <img src={DownExcel} alt="download icon" />
                      </CSVLink>
                    </div>
                  </div>
                  <Spin
                    tip={
                      TranslationContext !== undefined
                        ? TranslationContext.tip.pleasewait
                        : "Please wait..."
                    }
                    spinning={this.state.bulkuploadLoading}
                  >
                    <div className="mainfileUpload">
                      <Dropzone onDrop={this.fileUpload.bind(this)}>
                        {({ getRootProps, getInputProps }) => (
                          <div {...getRootProps()}>
                            <input
                              {...getInputProps()}
                              className="file-upload d-none"
                            />
                            <div className="file-icon">
                              <img src={FileUpload} alt="file-upload" />
                            </div>
                            <span className={"fileupload-span"}>
                              {TranslationContext !== undefined
                                ? TranslationContext.span.addfile
                                : "Add File"}
                            </span>
                            {TranslationContext !== undefined
                              ? TranslationContext.div.or
                              : "or"}
                            {TranslationContext !== undefined
                              ? TranslationContext.div.dropfilehere
                              : "Drop File here"}
                          </div>
                        )}
                      </Dropzone>
                    </div>
                    {this.state.fileN.length === 0 && (
                      <p style={{ color: "red", marginBottom: "0px" }}>
                        {this.state.bulkuploadCompulsion}
                      </p>
                    )}
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
                                    {TranslationContext !== undefined
                                      ? TranslationContext.p.deletefile
                                      : "Delete file"}
                                    ?
                                  </p>
                                  <p className="mt-1 fs-12">
                                    {TranslationContext !== undefined
                                      ? TranslationContext.p
                                          .areyousureyouwanttodeletethisfile
                                      : "Are you sure you want to delete this file"}
                                    ?
                                  </p>
                                  <div className="del-can">
                                    <a href={Demo.BLANK_LINK}>
                                      {" "}
                                      {TranslationContext !== undefined
                                        ? TranslationContext.a.cancel
                                        : "CANCEL"}
                                    </a>
                                    <button
                                      className="butn"
                                      onClick={this.handleDeleteBulkupload}
                                    >
                                      {TranslationContext !== undefined
                                        ? TranslationContext.button.delete
                                        : "Delete"}
                                    </button>
                                  </div>
                                </div>
                              </PopoverBody>
                            </UncontrolledPopover>
                          </div>
                          <div>
                            <span className="file-size">
                              {this.state.fileSize}
                            </span>
                          </div>
                        </div>
                        {this.state.fileN.length > 0 &&
                        this.state.isFileUploadFail ? (
                          <div className="file-cntr">
                            <div className="file-dtls">
                              <p className="file-name">{this.state.fileName}</p>
                              <a
                                className="file-retry"
                                onClick={this.hanldeAddBulkUpload.bind(this)}
                              >
                                {TranslationContext !== undefined
                                  ? TranslationContext.span.retry
                                  : "Retry"}
                              </a>
                            </div>
                            <div>
                              <span className="file-failed">
                                {TranslationContext !== undefined
                                  ? TranslationContext.span.failed
                                  : "Failed"}
                              </span>
                            </div>
                          </div>
                        ) : null}
                        {this.state.showProgress ? (
                          <div className="file-cntr">
                            <div className="file-dtls">
                              <p className="file-name pr-0">
                                {this.state.fileName}
                              </p>
                            </div>
                            <div>
                              <div className="d-flex align-items-center mt-2">
                                <ProgressBar
                                  className="file-progress"
                                  now={this.state.progressValue}
                                />
                                <div className="cancel-upload">
                                  <img src={UploadCancel} alt="upload cancel" />
                                </div>
                              </div>
                            </div>
                          </div>
                        ) : null}
                      </div>
                    )}
                    <button
                      className="butn"
                      onClick={this.hanldeAddBulkUpload.bind(this)}
                    >
                      {TranslationContext !== undefined
                        ? TranslationContext.button.add
                        : "ADD"}
                    </button>
                  </Spin>
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
              <label className="popover-header-text">
                {TranslationContext !== undefined
                  ? TranslationContext.label.editstore
                  : "EDIT STORE"}
              </label>
              <div className="row">
                <div className="col-md-6">
                  <div className="div-padding-1">
                    <label className="edit-label-1">
                      {" "}
                      {TranslationContext !== undefined
                        ? TranslationContext.label.brand
                        : "Brand"}
                    </label>
                    <Select
                      getOptionLabel={(option) => option.brandName}
                      getOptionValue={(option) => option.brandID}
                      options={this.state.brandData}
                      placeholder={
                        TranslationContext !== undefined
                          ? TranslationContext.placeholder.select
                          : "Select"
                      }
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
                    <label className="edit-label-1">
                      {" "}
                      {TranslationContext !== undefined
                        ? TranslationContext.label.storecode
                        : "Store Code"}
                    </label>
                    <input
                      type="text"
                      className="txt-1"
                      placeholder={
                        TranslationContext !== undefined
                          ? TranslationContext.placeholder.enterstorecode
                          : "Enter Store Code"
                      }
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
                    <label className="edit-label-1">
                      {" "}
                      {TranslationContext !== undefined
                        ? TranslationContext.label.storename
                        : "Store Name"}
                    </label>
                    <input
                      type="text"
                      className="txt-1"
                      placeholder={
                        TranslationContext !== undefined
                          ? TranslationContext.placeholder.enterstorename
                          : "Enter Store Name"
                      }
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
                    <label className="edit-label-1">
                      {TranslationContext !== undefined
                        ? TranslationContext.label.storename
                        : "State"}
                    </label>
                    <select
                      className="store-create-select"
                      name="state_ID"
                      value={this.state.userEditData.state_ID}
                      onChange={this.handleModalEditData}
                    >
                      <option value={0}>
                        {TranslationContext !== undefined
                          ? TranslationContext.option.select
                          : "Select"}
                      </option>
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
                    <label className="edit-label-1">
                      {TranslationContext !== undefined
                        ? TranslationContext.label.city
                        : "City"}
                    </label>
                    <select
                      className="edit-dropDwon dropdown-setting"
                      name="city_ID"
                      value={this.state.userEditData.city_ID}
                      onChange={this.handleModalEditData}
                    >
                      <option value={0}>
                        {TranslationContext !== undefined
                          ? TranslationContext.option.select
                          : "Select"}
                      </option>
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
                    <label className="edit-label-1">
                      {TranslationContext !== undefined
                        ? TranslationContext.label.pincode
                        : "Pin Code"}
                    </label>
                    <input
                      type="text"
                      className="txt-1"
                      placeholder={
                        TranslationContext !== undefined
                          ? TranslationContext.placeholder.enterpincode
                          : "Enter Pin Code"
                      }
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
                    <label className="edit-label-1">
                      {" "}
                      {TranslationContext !== undefined
                        ? TranslationContext.label.status
                        : "Status"}
                    </label>
                    <select
                      className="form-control dropdown-setting"
                      name="status_ID"
                      value={
                        this.state.userEditData.status_ID === "Active" ||
                        this.state.userEditData.status_ID === true
                          ? "Active"
                          : "Inactive"
                      }
                      onChange={this.handleModalEditData}
                    >
                      <option value={0}>
                        {TranslationContext !== undefined
                          ? TranslationContext.option.select
                          : "select"}
                      </option>
                      <option value="Active">
                        {TranslationContext !== undefined
                          ? TranslationContext.option.active
                          : "Active"}
                      </option>
                      <option value="Inactive">
                        {TranslationContext !== undefined
                          ? TranslationContext.option.inactive
                          : "Inactive"}
                      </option>
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
                    <label className="edit-label-1">
                      {TranslationContext !== undefined
                        ? TranslationContext.label.region
                        : "Region"}
                    </label>
                    <select
                      className="store-create-select"
                      name="region_ID"
                      value={this.state.userEditData.region_ID}
                      onChange={this.handleModalEditData}
                    >
                      <option value={0}>
                        {TranslationContext !== undefined
                          ? TranslationContext.option.select
                          : "select"}
                      </option>
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
                    <label className="edit-label-1">
                      {TranslationContext !== undefined
                        ? TranslationContext.label.zone
                        : "Zone"}
                    </label>
                    <select
                      className="store-create-select"
                      name="zone_ID"
                      value={this.state.userEditData.zone_ID}
                      onChange={this.handleModalEditData}
                    >
                      <option value={0}>
                        {TranslationContext !== undefined
                          ? TranslationContext.option.select
                          : "select"}
                      </option>
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
                    <label className="edit-label-1">
                      {TranslationContext !== undefined
                        ? TranslationContext.label.storetype
                        : "Store Type"}
                    </label>
                    <select
                      className="store-create-select"
                      name="storeType_ID"
                      value={this.state.userEditData.storeType_ID}
                      onChange={this.handleModalEditData}
                    >
                      <option value={0}>
                        {" "}
                        {TranslationContext !== undefined
                          ? TranslationContext.option.select
                          : "Select"}
                      </option>
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
                      {TranslationContext !== undefined
                        ? TranslationContext.label.contactdetailsemails
                        : "Contact Details: Email ID"}
                    </label>
                    <input
                      type="text"
                      className="txt-1"
                      placeholder={
                        TranslationContext !== undefined
                          ? TranslationContext.placeholder.enteremailid
                          : "Enter email id"
                      }
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
                      {TranslationContext !== undefined
                        ? TranslationContext.label.contactdetailsphones
                        : "Contact Details: Phone No"}
                    </label>
                    <input
                      type="text"
                      className="txt-1"
                      placeholder={
                        TranslationContext !== undefined
                          ? TranslationContext.placeholder.enterphoneno
                          : "Enter phone no"
                      }
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
                    <label className="edit-label-1">
                      {" "}
                      {TranslationContext !== undefined
                        ? TranslationContext.label.address
                        : "Address"}
                    </label>
                    <textarea
                      cols="31"
                      rows="3"
                      className="store-create-textarea"
                      placeholder={
                        TranslationContext !== undefined
                          ? TranslationContext.placeholder.enteraddress
                          : "Enter address"
                      }
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
                      {TranslationContext !== undefined
                        ? TranslationContext.button.cancel
                        : "CANCEL"}
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
                        {TranslationContext !== undefined
                          ? TranslationContext.button.save
                          : "SAVE"}
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
