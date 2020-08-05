import Demo from "./../../../store/Hashtag.js";
import React, { Component } from "react";
import DelBigIcon from "./../../../assets/Images/del-big.png";
import FileUpload from "./../../../assets/Images/file.png";
import DelBlack from "./../../../assets/Images/del-black.png";
import DownExcel from "./../../../assets/Images/csv.png";
import UploadCancel from "./../../../assets/Images/upload-cancel.png";
import { ProgressBar } from "react-bootstrap";
import { UncontrolledPopover, PopoverBody } from "reactstrap";
import { Link } from "react-router-dom";
import ReactTable from "react-table";
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { formatSizeUnits } from "./../../../helpers/CommanFuncation";
import Dropzone from "react-dropzone";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import axios from "axios";
import config from "./../../../helpers/config";
import { authHeader } from "../../../helpers/authHeader";
import Modal from "react-responsive-modal";
import Sorting from "./../../../assets/Images/sorting.png";
import matchSorter from "match-sorter";
import { CSVLink } from "react-csv";
import * as translationHI from "./../../../translations/hindi";
import * as translationMA from "./../../../translations/marathi";
import { Spin } from "antd";

class ItemMaster extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fileName: "",
      itemData: [],
      file: {},
      fileValidation: "",
      isErrorBulkUpload: false,
      isShowProgress: false,
      sortAllData: [],
      sbrandNameFilterCheckbox: "",
      sitemCodeFilterCheckbox: "",
      sitemNameFilterCheckbox: "",
      sdepartmentNameFilterCheckbox: "",
      sitemCategoryFilterCheckbox: "",
      sitemSubCategoryFilterCheckbox: "",
      sitemGroupFilterCheckbox: "",
      sortFilterbrandName: [],
      sortFilteritemCode: [],
      sortFilteritemName: [],
      sortFilterdepartmentName: [],
      sortFilteritemCategory: [],
      sortFilteritemSubCategory: [],
      sortFilteritemGroup: [],
      sortbrandName: [],
      sortitemCode: [],
      sortitemName: [],
      sortdepartmentName: [],
      sortitemCategory: [],
      sortitemSubCategory: [],
      sortitemGroup: [],
      sortColumn: "",
      sortHeader: "",
      filterTxtValue: "",
      StatusModel: false,
      tempitemData: [],
      isortA: false,
      isATOZ: true,
      translateLanguage: {},
      bulkuploadLoading: false,
    };

    this.handleGetItem = this.handleGetItem.bind(this);
    this.StatusOpenModel = this.StatusOpenModel.bind(this);
    this.StatusCloseModel = this.StatusCloseModel.bind(this);
  }

  componentDidMount() {
    this.handleGetItem();
    if (window.localStorage.getItem("translateLanguage") === "hindi") {
      this.state.translateLanguage = translationHI;
    } else if (window.localStorage.getItem("translateLanguage") === "marathi") {
      this.state.translateLanguage = translationMA;
    } else {
      this.state.translateLanguage = {};
    }
  }
  fileUpload = (file) => {
    debugger;
    if (file) {
      var fileName = file[0].name;
      var fileSize = formatSizeUnits(file[0].size);
      this.setState({
        fileName,
        fileSize,
        file: file[0],
        fileValidation: "",
      });
    }
  };

  fileDragOver = (e) => {
    e.preventDefault();
  };
  fileDragEnter = (e) => {
    e.preventDefault();
  };
  ////handel get item data
  handleGetItem() {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/Item/GetItemList",
      headers: authHeader(),
    })
      .then((response) => {
        debugger;
        var message = response.data.message;
        var data = response.data.responseData;

        if (message === "Success") {
          self.setState({ itemData: data });
          self.state.sortAllData = data;
          var unique = [];
          var distinct = [];
          for (let i = 0; i < data.length; i++) {
            if (!unique[data[i].brandName] && data[i].brandName !== "") {
              distinct.push(data[i].brandName);
              unique[data[i].brandName] = 1;
            }
          }
          for (let i = 0; i < distinct.length; i++) {
            self.state.sortbrandName.push({ brandName: distinct[i] });
            self.state.sortFilterbrandName.push({ brandName: distinct[i] });
          }

          var unique = [];
          var distinct = [];
          for (let i = 0; i < data.length; i++) {
            if (!unique[data[i].itemCode] && data[i].itemCode !== "") {
              distinct.push(data[i].itemCode);
              unique[data[i].itemCode] = 1;
            }
          }
          for (let i = 0; i < distinct.length; i++) {
            self.state.sortitemCode.push({ itemCode: distinct[i] });
            self.state.sortFilteritemCode.push({ itemCode: distinct[i] });
          }
          var unique = [];
          var distinct = [];
          for (let i = 0; i < data.length; i++) {
            if (!unique[data[i].itemName] && data[i].itemName !== "") {
              distinct.push(data[i].itemName);
              unique[data[i].itemName] = 1;
            }
          }
          for (let i = 0; i < distinct.length; i++) {
            self.state.sortitemName.push({ itemName: distinct[i] });
            self.state.sortFilteritemName.push({ itemName: distinct[i] });
          }
          var unique = [];
          var distinct = [];
          for (let i = 0; i < data.length; i++) {
            if (
              !unique[data[i].departmentName] &&
              data[i].departmentName !== ""
            ) {
              distinct.push(data[i].departmentName);
              unique[data[i].departmentName] = 1;
            }
          }
          for (let i = 0; i < distinct.length; i++) {
            self.state.sortdepartmentName.push({ departmentName: distinct[i] });
            self.state.sortFilterdepartmentName.push({
              departmentName: distinct[i],
            });
          }
          var unique = [];
          var distinct = [];
          for (let i = 0; i < data.length; i++) {
            if (!unique[data[i].itemCategory] && data[i].itemCategory !== "") {
              distinct.push(data[i].itemCategory);
              unique[data[i].itemCategory] = 1;
            }
          }
          for (let i = 0; i < distinct.length; i++) {
            self.state.sortitemCategory.push({ itemCategory: distinct[i] });
            self.state.sortFilteritemCategory.push({
              itemCategory: distinct[i],
            });
          }
          var unique = [];
          var distinct = [];
          for (let i = 0; i < data.length; i++) {
            if (
              !unique[data[i].itemSubCategory] &&
              data[i].itemSubCategory !== ""
            ) {
              distinct.push(data[i].itemSubCategory);
              unique[data[i].itemSubCategory] = 1;
            }
          }
          for (let i = 0; i < distinct.length; i++) {
            self.state.sortitemSubCategory.push({
              itemSubCategory: distinct[i],
            });
            self.state.sortFilteritemSubCategory.push({
              itemSubCategory: distinct[i],
            });
          }
          var unique = [];
          var distinct = [];
          for (let i = 0; i < data.length; i++) {
            if (!unique[data[i].itemGroup] && data[i].itemGroup !== "") {
              distinct.push(data[i].itemGroup);
              unique[data[i].itemGroup] = 1;
            }
          }
          for (let i = 0; i < distinct.length; i++) {
            self.state.sortitemGroup.push({ itemGroup: distinct[i] });
            self.state.sortFilteritemGroup.push({ itemGroup: distinct[i] });
          }
        } else {
          self.setState({ itemData: [] });
        }
      })
      .catch((response) => {
        console.log(response);
      });
  }

  updateUploadProgress(value) {
    this.setState({ progressValue: value });
  }

  handleBulkUpload() {
    const TranslationContext = this.state.translateLanguage.default;
    debugger;
    let self = this;
    if (this.state.fileName) {
      this.setState({
        bulkuploadLoading: true,
      });
      const formData = new FormData();
      formData.append("file", this.state.file);
      // this.setState({ isShowProgress: true });
      axios({
        method: "post",
        url: config.apiUrl + "/Item/BulkUploadItem",
        headers: authHeader(),
        data: formData,
        // onUploadProgress: (ev = ProgressEvent) => {
        //   const progress = (ev.loaded / ev.total) * 100;
        //   this.updateUploadProgress(Math.round(progress));
        // },
      })
        .then((response) => {
          var status = response.data.message;
          var itemData = response.data.responseData;
          if (status === "Success") {
            NotificationManager.success(
              TranslationContext !== undefined
                ? TranslationContext.alertmessage.fileuploadedsuccessfully
                : "File uploaded successfully."
            );
            self.setState({ fileName: "", fileSize: "" });
            self.handleGetItem();
            //self.setState(itemData);
            self.setState({
              isErrorBulkUpload: false,
              isShowProgress: false,
              bulkuploadLoading: false,
            });
          } else {
            // self.setState({ isErrorBulkUpload: true, isShowProgress: false });
            self.setState({ bulkuploadLoading: false });
            NotificationManager.error(
              TranslationContext !== undefined
                ? TranslationContext.alertmessage.filenotuploaded
                : "File not uploaded."
            );
          }
        })
        .catch((response) => {
          self.setState({ isErrorBulkUpload: true, bulkuploadLoading: false });
          console.log(response);
        });
    } else {
      this.setState({ fileValidation: "Please Select File." });
    }
  }
  DeleteBulkUploadFile = () => {
    const TranslationContext = this.state.translateLanguage.default;
    debugger;
    this.setState({
      file: {},
      fileName: "",
      fileSize: "",
      isErrorBulkUpload: false,
      isShowProgress: false,
    });
    NotificationManager.success(
      TranslationContext !== undefined
        ? TranslationContext.alertmessage.filedeletedsuccessfully
        : "File deleted successfully."
    );
  };

  sortStatusZtoA() {
    debugger;
    var itemsArray = [];
    itemsArray = this.state.itemData;

    if (this.state.sortColumn === "itemCode") {
      itemsArray.sort((a, b) => {
        if (a.itemCode < b.itemCode) return 1;
        if (a.itemCode > b.itemCode) return -1;
        return 0;
      });
    }
    if (this.state.sortColumn === "brandName") {
      itemsArray.sort((a, b) => {
        if (a.brandName < b.brandName) return 1;
        if (a.brandName > b.brandName) return -1;
        return 0;
      });
    }
    if (this.state.sortColumn === "itemName") {
      itemsArray.sort((a, b) => {
        if (a.itemName < b.itemName) return 1;
        if (a.itemName > b.itemName) return -1;
        return 0;
      });
    }
    if (this.state.sortColumn === "departmentName") {
      itemsArray.sort((a, b) => {
        if (a.departmentName < b.departmentName) return 1;
        if (a.departmentName > b.departmentName) return -1;
        return 0;
      });
    }
    if (this.state.sortColumn === "itemCategory") {
      itemsArray.sort((a, b) => {
        if (a.itemCategory < b.itemCategory) return 1;
        if (a.itemCategory > b.itemCategory) return -1;
        return 0;
      });
    }
    if (this.state.sortColumn === "itemSubCategory") {
      itemsArray.sort((a, b) => {
        if (a.itemSubCategory < b.itemSubCategory) return 1;
        if (a.itemSubCategory > b.itemSubCategory) return -1;
        return 0;
      });
    }

    if (this.state.sortColumn === "itemGroup") {
      itemsArray.sort((a, b) => {
        if (a.itemGroup < b.itemGroup) return 1;
        if (a.itemGroup > b.itemGroup) return -1;
        return 0;
      });
    }
    this.setState({
      isortA: true,
      isATOZ: false,
      itemData: itemsArray,
    });
    setTimeout(() => {
      this.StatusCloseModel();
    }, 10);
  }

  sortStatusAtoZ() {
    debugger;
    var itemsArray = [];
    itemsArray = this.state.itemData;

    if (this.state.sortColumn === "itemCode") {
      itemsArray.sort((a, b) => {
        if (a.itemCode < b.itemCode) return -1;
        if (a.itemCode > b.itemCode) return 1;
        return 0;
      });
    }
    if (this.state.sortColumn === "brandName") {
      itemsArray.sort((a, b) => {
        if (a.brandName < b.brandName) return -1;
        if (a.brandName > b.brandName) return 1;
        return 0;
      });
    }
    if (this.state.sortColumn === "itemName") {
      itemsArray.sort((a, b) => {
        if (a.itemName < b.itemName) return -1;
        if (a.itemName > b.itemName) return 1;
        return 0;
      });
    }
    if (this.state.sortColumn === "departmentName") {
      itemsArray.sort((a, b) => {
        if (a.departmentName < b.departmentName) return -1;
        if (a.departmentName > b.departmentName) return 1;
        return 0;
      });
    }
    if (this.state.sortColumn === "itemCategory") {
      itemsArray.sort((a, b) => {
        if (a.itemCategory < b.itemCategory) return -1;
        if (a.itemCategory > b.itemCategory) return 1;
        return 0;
      });
    }
    if (this.state.sortColumn === "itemSubCategory") {
      itemsArray.sort((a, b) => {
        if (a.itemSubCategory < b.itemSubCategory) return -1;
        if (a.itemSubCategory > b.itemSubCategory) return 1;
        return 0;
      });
    }
    if (this.state.sortColumn === "itemGroup") {
      itemsArray.sort((a, b) => {
        if (a.itemGroup < b.itemGroup) return -1;
        if (a.itemGroup > b.itemGroup) return 1;
        return 0;
      });
    }

    this.setState({
      isortA: true,
      isATOZ: true,
      itemData: itemsArray,
    });
    setTimeout(() => {
      this.StatusCloseModel();
    }, 10);
  }

  StatusOpenModel(data, header) {
    debugger;

    if (
      this.state.sortFilterbrandName.length === 0 ||
      this.state.sortFilteritemCode.length === 0 ||
      this.state.sortFilteritemName.length === 0 ||
      this.state.sortFilterdepartmentName.length === 0 ||
      this.state.sortFilteritemCategory.length === 0 ||
      this.state.sortFilteritemSubCategory.length === 0 ||
      this.state.sortFilteritemGroup.length === 0
    ) {
      return false;
    }
    this.setState({ isortA: false });
    if (data === "itemCode") {
      if (
        this.state.sbrandNameFilterCheckbox !== "" ||
        this.state.sitemNameFilterCheckbox !== "" ||
        this.state.sdepartmentNameFilterCheckbox !== "" ||
        this.state.sitemCategoryFilterCheckbox !== "" ||
        this.state.sitemSubCategoryFilterCheckbox !== "" ||
        this.state.sitemGroupFilterCheckbox !== ""
      ) {
        this.setState({
          StatusModel: true,
          sortColumn: data,
          sortHeader: header,
        });
      } else {
        this.setState({
          sbrandNameFilterCheckbox: "",
          sitemNameFilterCheckbox: "",
          sdepartmentNameFilterCheckbox: "",
          sitemCategoryFilterCheckbox: "",
          sitemSubCategoryFilterCheckbox: "",
          sitemGroupFilterCheckbox: "",
          StatusModel: true,
          sortColumn: data,
          sortHeader: header,
        });
      }
    }
    if (data === "brandName") {
      if (
        this.state.sitemCodeFilterCheckbox !== "" ||
        this.state.sitemNameFilterCheckbox !== "" ||
        this.state.sdepartmentNameFilterCheckbox !== "" ||
        this.state.sitemCategoryFilterCheckbox !== "" ||
        this.state.sitemSubCategoryFilterCheckbox !== "" ||
        this.state.sitemGroupFilterCheckbox !== ""
      ) {
        this.setState({
          StatusModel: true,
          sortColumn: data,
          sortHeader: header,
        });
      } else {
        this.setState({
          sitemCodeFilterCheckbox: "",
          sitemNameFilterCheckbox: "",
          sdepartmentNameFilterCheckbox: "",
          sitemCategoryFilterCheckbox: "",
          sitemSubCategoryFilterCheckbox: "",
          sitemGroupFilterCheckbox: "",
          StatusModel: true,
          sortColumn: data,
          sortHeader: header,
        });
      }
    }
    if (data === "itemName") {
      if (
        this.state.sitemCodeFilterCheckbox !== "" ||
        this.state.sbrandNameFilterCheckbox !== "" ||
        this.state.sdepartmentNameFilterCheckbox !== "" ||
        this.state.sitemCategoryFilterCheckbox !== "" ||
        this.state.sitemSubCategoryFilterCheckbox !== "" ||
        this.state.sitemGroupFilterCheckbox !== ""
      ) {
        this.setState({
          StatusModel: true,
          sortColumn: data,
          sortHeader: header,
        });
      } else {
        this.setState({
          sitemCodeFilterCheckbox: "",
          sbrandNameFilterCheckbox: "",
          sdepartmentNameFilterCheckbox: "",
          sitemCategoryFilterCheckbox: "",
          sitemSubCategoryFilterCheckbox: "",
          sitemGroupFilterCheckbox: "",
          StatusModel: true,
          sortColumn: data,
          sortHeader: header,
        });
      }
    }
    if (data === "departmentName") {
      if (
        this.state.sitemCodeFilterCheckbox !== "" ||
        this.state.sbrandNameFilterCheckbox !== "" ||
        this.state.sitemNameFilterCheckbox !== "" ||
        this.state.sitemCategoryFilterCheckbox !== "" ||
        this.state.sitemSubCategoryFilterCheckbox !== "" ||
        this.state.sitemGroupFilterCheckbox !== ""
      ) {
        this.setState({
          StatusModel: true,
          sortColumn: data,
          sortHeader: header,
        });
      } else {
        this.setState({
          sitemCodeFilterCheckbox: "",
          sbrandNameFilterCheckbox: "",
          sitemNameFilterCheckbox: "",
          sitemCategoryFilterCheckbox: "",
          sitemSubCategoryFilterCheckbox: "",
          sitemGroupFilterCheckbox: "",
          StatusModel: true,
          sortColumn: data,
          sortHeader: header,
        });
      }
    }
    if (data === "itemCategory") {
      if (
        this.state.sitemCodeFilterCheckbox !== "" ||
        this.state.sbrandNameFilterCheckbox !== "" ||
        this.state.sitemNameFilterCheckbox !== "" ||
        this.state.sdepartmentNameFilterCheckbox !== "" ||
        this.state.sitemSubCategoryFilterCheckbox !== "" ||
        this.state.sitemGroupFilterCheckbox !== ""
      ) {
        this.setState({
          StatusModel: true,
          sortColumn: data,
          sortHeader: header,
        });
      } else {
        this.setState({
          sitemCodeFilterCheckbox: "",
          sbrandNameFilterCheckbox: "",
          sitemNameFilterCheckbox: "",
          sdepartmentNameFilterCheckbox: "",
          sitemSubCategoryFilterCheckbox: "",
          sitemGroupFilterCheckbox: "",
          StatusModel: true,
          sortColumn: data,
          sortHeader: header,
        });
      }
    }
    if (data === "itemSubCategory") {
      if (
        this.state.sitemCodeFilterCheckbox !== "" ||
        this.state.sbrandNameFilterCheckbox !== "" ||
        this.state.sitemNameFilterCheckbox !== "" ||
        this.state.sitemCategoryFilterCheckbox !== "" ||
        this.state.sdepartmentNameFilterCheckbox !== "" ||
        this.state.sitemGroupFilterCheckbox !== ""
      ) {
        this.setState({
          StatusModel: true,
          sortColumn: data,
          sortHeader: header,
        });
      } else {
        this.setState({
          sitemCodeFilterCheckbox: "",
          sbrandNameFilterCheckbox: "",
          sitemNameFilterCheckbox: "",
          sitemCategoryFilterCheckbox: "",
          sdepartmentNameFilterCheckbox: "",
          sitemGroupFilterCheckbox: "",
          StatusModel: true,
          sortColumn: data,
          sortHeader: header,
        });
      }
    }
    if (data === "itemGroup") {
      if (
        this.state.sitemCodeFilterCheckbox !== "" ||
        this.state.sbrandNameFilterCheckbox !== "" ||
        this.state.sitemNameFilterCheckbox !== "" ||
        this.state.sitemCategoryFilterCheckbox !== "" ||
        this.state.sitemSubCategoryFilterCheckbox !== "" ||
        this.state.sdepartmentNameFilterCheckbox !== ""
      ) {
        this.setState({
          StatusModel: true,
          sortColumn: data,
          sortHeader: header,
        });
      } else {
        this.setState({
          sitemCodeFilterCheckbox: "",
          sbrandNameFilterCheckbox: "",
          sitemNameFilterCheckbox: "",
          sitemCategoryFilterCheckbox: "",
          sitemSubCategoryFilterCheckbox: "",
          sdepartmentNameFilterCheckbox: "",
          StatusModel: true,
          sortColumn: data,
          sortHeader: header,
        });
      }
    }
  }
  StatusCloseModel() {
    this.setState({
      sortFilterbrandName: this.state.sortbrandName,
      sortFilteritemCode: this.state.sortitemCode,
      sortFilteritemName: this.state.sortitemName,
      sortFilterdepartmentName: this.state.sortdepartmentName,
      sortFilteritemCategory: this.state.sortitemCategory,
      sortFilteritemSubCategory: this.state.sortitemSubCategory,
      sortFilteritemGroup: this.state.sortitemGroup,
    });
    if (this.state.tempitemData.length > 0) {
      this.setState({
        StatusModel: false,
        itemData: this.state.tempitemData,
        filterTxtValue: "",
      });
      if (this.state.sortColumn === "itemCode") {
        if (this.state.sitemCodeFilterCheckbox === "") {
        } else {
          this.setState({
            sbrandNameFilterCheckbox: "",
            sitemNameFilterCheckbox: "",
            sdepartmentNameFilterCheckbox: "",
            sitemCategoryFilterCheckbox: "",
            sitemSubCategoryFilterCheckbox: "",
            sitemGroupFilterCheckbox: "",
          });
        }
      }
      if (this.state.sortColumn === "brandName") {
        if (this.state.sbrandNameFilterCheckbox === "") {
        } else {
          this.setState({
            sitemCodeFilterCheckbox: "",
            sitemNameFilterCheckbox: "",
            sdepartmentNameFilterCheckbox: "",
            sitemCategoryFilterCheckbox: "",
            sitemSubCategoryFilterCheckbox: "",
            sitemGroupFilterCheckbox: "",
          });
        }
      }
      if (this.state.sortColumn === "itemName") {
        if (this.state.sitemNameFilterCheckbox === "") {
        } else {
          this.setState({
            sitemCodeFilterCheckbox: "",
            sbrandNameFilterCheckbox: "",
            sdepartmentNameFilterCheckbox: "",
            sitemCategoryFilterCheckbox: "",
            sitemSubCategoryFilterCheckbox: "",
            sitemGroupFilterCheckbox: "",
          });
        }
      }
      if (this.state.sortColumn === "departmentName") {
        if (this.state.sdepartmentNameFilterCheckbox === "") {
        } else {
          this.setState({
            sitemCodeFilterCheckbox: "",
            sbrandNameFilterCheckbox: "",
            sitemNameFilterCheckbox: "",
            sitemCategoryFilterCheckbox: "",
            sitemSubCategoryFilterCheckbox: "",
            sitemGroupFilterCheckbox: "",
          });
        }
      }
      if (this.state.sortColumn === "itemCategory") {
        if (this.state.sitemCategoryFilterCheckbox === "") {
        } else {
          this.setState({
            sitemCodeFilterCheckbox: "",
            sbrandNameFilterCheckbox: "",
            sitemNameFilterCheckbox: "",
            sdepartmentNameFilterCheckbox: "",
            sitemSubCategoryFilterCheckbox: "",
            sitemGroupFilterCheckbox: "",
          });
        }
      }
      if (this.state.sortColumn === "itemSubCategory") {
        if (this.state.sitemSubCategoryFilterCheckbox === "") {
        } else {
          this.setState({
            sitemCodeFilterCheckbox: "",
            sbrandNameFilterCheckbox: "",
            sitemNameFilterCheckbox: "",
            sitemCategoryFilterCheckbox: "",
            sdepartmentNameFilterCheckbox: "",
            sitemGroupFilterCheckbox: "",
          });
        }
      }
      if (this.state.sortColumn === "itemGroup") {
        if (this.state.sitemGroupFilterCheckbox === "") {
        } else {
          this.setState({
            sitemCodeFilterCheckbox: "",
            sbrandNameFilterCheckbox: "",
            sitemNameFilterCheckbox: "",
            sitemCategoryFilterCheckbox: "",
            sitemSubCategoryFilterCheckbox: "",
            sdepartmentNameFilterCheckbox: "",
          });
        }
      }
    } else {
      this.setState({
        StatusModel: false,
        sortHeader: this.state.isortA ? this.state.sortHeader : "",
        itemData: this.state.isortA
          ? this.state.itemData
          : this.state.sortAllData,
        filterTxtValue: "",
        sortFilteritemCode: this.state.sortitemCode,
        sortFilterbrandName: this.state.sortbrandName,
        sortFilteritemName: this.state.sortitemName,
        sortFilterdepartmentName: this.state.sortdepartmentName,
        sortFilteritemCategory: this.state.sortitemCategory,
        sortFilteritemSubCategory: this.state.sortitemSubCategory,
        sortFilteritemGroup: this.state.sortitemGroup,
      });
    }
  }
  setSortCheckStatus = (column, type, e) => {
    debugger;

    var itemsArray = [];

    var sbrandNameFilterCheckbox = this.state.sbrandNameFilterCheckbox;
    var sitemCodeFilterCheckbox = this.state.sitemCodeFilterCheckbox;
    var sitemNameFilterCheckbox = this.state.sitemNameFilterCheckbox;
    var sdepartmentNameFilterCheckbox = this.state
      .sdepartmentNameFilterCheckbox;
    var sitemCategoryFilterCheckbox = this.state.sitemCategoryFilterCheckbox;
    var sitemSubCategoryFilterCheckbox = this.state
      .sitemSubCategoryFilterCheckbox;
    var sitemGroupFilterCheckbox = this.state.sitemGroupFilterCheckbox;

    if (column === "itemCode" || column === "all") {
      if (type === "value" && type !== "All") {
        sitemCodeFilterCheckbox = sitemCodeFilterCheckbox.replace("all", "");
        sitemCodeFilterCheckbox = sitemCodeFilterCheckbox.replace("all,", "");
        if (
          sitemCodeFilterCheckbox
            .split(",")
            .find((word) => word === e.currentTarget.value)
        ) {
          sitemCodeFilterCheckbox = sitemCodeFilterCheckbox.replace(
            new RegExp(
              e.currentTarget.value +
                ",".replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&"),
              "g"
            ),
            ""
          );
        } else {
          sitemCodeFilterCheckbox += e.currentTarget.value + ",";
        }
      } else {
        if (sitemCodeFilterCheckbox.includes("all")) {
          sitemCodeFilterCheckbox = "";
        } else {
          if (this.state.sortColumn === "itemCode") {
            for (let i = 0; i < this.state.sortitemCode.length; i++) {
              sitemCodeFilterCheckbox +=
                this.state.sortitemCode[i].itemCode + ",";
            }
            sitemCodeFilterCheckbox += "all";
          }
        }
      }
    }
    if (column === "brandName" || column === "all") {
      if (type === "value" && type !== "All") {
        sbrandNameFilterCheckbox = sbrandNameFilterCheckbox.replace("all", "");
        sbrandNameFilterCheckbox = sbrandNameFilterCheckbox.replace("all,", "");
        if (
          sbrandNameFilterCheckbox
            .split(",")
            .find((word) => word === e.currentTarget.value)
        ) {
          sbrandNameFilterCheckbox = sbrandNameFilterCheckbox.replace(
            new RegExp(
              e.currentTarget.value +
                ",".replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&"),
              "g"
            ),
            ""
          );
        } else {
          sbrandNameFilterCheckbox += e.currentTarget.value + ",";
        }
      } else {
        if (sbrandNameFilterCheckbox.includes("all")) {
          sbrandNameFilterCheckbox = "";
        } else {
          if (this.state.sortColumn === "brandName") {
            for (let i = 0; i < this.state.sortbrandName.length; i++) {
              sbrandNameFilterCheckbox +=
                this.state.sortbrandName[i].brandName + ",";
            }
            sbrandNameFilterCheckbox += "all";
          }
        }
      }
    }
    if (column === "itemName" || column === "all") {
      if (type === "value" && type !== "All") {
        sitemNameFilterCheckbox = sitemNameFilterCheckbox.replace("all", "");
        sitemNameFilterCheckbox = sitemNameFilterCheckbox.replace("all,", "");
        if (
          sitemNameFilterCheckbox
            .split(",")
            .find((word) => word === e.currentTarget.value)
        ) {
          sitemNameFilterCheckbox = sitemNameFilterCheckbox.replace(
            new RegExp(
              e.currentTarget.value +
                ",".replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&"),
              "g"
            ),
            ""
          );
        } else {
          sitemNameFilterCheckbox += e.currentTarget.value + ",";
        }
      } else {
        if (sitemNameFilterCheckbox.includes("all")) {
          sitemNameFilterCheckbox = "";
        } else {
          if (this.state.sortColumn === "itemName") {
            for (let i = 0; i < this.state.sortitemName.length; i++) {
              sitemNameFilterCheckbox +=
                this.state.sortitemName[i].itemName + ",";
            }
            sitemNameFilterCheckbox += "all";
          }
        }
      }
    }
    if (column === "departmentName" || column === "all") {
      if (type === "value" && type !== "All") {
        sdepartmentNameFilterCheckbox = sdepartmentNameFilterCheckbox.replace(
          "all",
          ""
        );
        sdepartmentNameFilterCheckbox = sdepartmentNameFilterCheckbox.replace(
          "all,",
          ""
        );
        if (
          sdepartmentNameFilterCheckbox
            .split(",")
            .find((word) => word === e.currentTarget.value)
        ) {
          sdepartmentNameFilterCheckbox = sdepartmentNameFilterCheckbox.replace(
            new RegExp(
              e.currentTarget.value +
                ",".replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&"),
              "g"
            ),
            ""
          );
        } else {
          sdepartmentNameFilterCheckbox += e.currentTarget.value + ",";
        }
      } else {
        if (sdepartmentNameFilterCheckbox.includes("all")) {
          sdepartmentNameFilterCheckbox = "";
        } else {
          if (this.state.sortColumn === "departmentName") {
            for (let i = 0; i < this.state.sortdepartmentName.length; i++) {
              sdepartmentNameFilterCheckbox +=
                this.state.sortdepartmentName[i].departmentName + ",";
            }
            sdepartmentNameFilterCheckbox += "all";
          }
        }
      }
    }
    if (column === "itemCategory" || column === "all") {
      if (type === "value" && type !== "All") {
        sitemCategoryFilterCheckbox = sitemCategoryFilterCheckbox.replace(
          "all",
          ""
        );
        sitemCategoryFilterCheckbox = sitemCategoryFilterCheckbox.replace(
          "all,",
          ""
        );
        if (
          sitemCategoryFilterCheckbox
            .split(",")
            .find((word) => word === e.currentTarget.value)
        ) {
          sitemCategoryFilterCheckbox = sitemCategoryFilterCheckbox.replace(
            new RegExp(
              e.currentTarget.value +
                ",".replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&"),
              "g"
            ),
            ""
          );
        } else {
          sitemCategoryFilterCheckbox += e.currentTarget.value + ",";
        }
      } else {
        if (sitemCategoryFilterCheckbox.includes("all")) {
          sitemCategoryFilterCheckbox = "";
        } else {
          if (this.state.sortColumn === "itemCategory") {
            for (let i = 0; i < this.state.sortitemCategory.length; i++) {
              sitemCategoryFilterCheckbox +=
                this.state.sortitemCategory[i].itemCategory + ",";
            }
            sitemCategoryFilterCheckbox += "all";
          }
        }
      }
    }
    if (column === "itemSubCategory" || column === "all") {
      if (type === "value" && type !== "All") {
        sitemSubCategoryFilterCheckbox = sitemSubCategoryFilterCheckbox.replace(
          "all",
          ""
        );
        sitemSubCategoryFilterCheckbox = sitemSubCategoryFilterCheckbox.replace(
          "all,",
          ""
        );
        if (
          sitemSubCategoryFilterCheckbox
            .split(",")
            .find((word) => word === e.currentTarget.value)
        ) {
          sitemSubCategoryFilterCheckbox = sitemSubCategoryFilterCheckbox.replace(
            new RegExp(
              e.currentTarget.value +
                ",".replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&"),
              "g"
            ),
            ""
          );
        } else {
          sitemSubCategoryFilterCheckbox += e.currentTarget.value + ",";
        }
      } else {
        if (sitemSubCategoryFilterCheckbox.includes("all")) {
          sitemSubCategoryFilterCheckbox = "";
        } else {
          if (this.state.sortColumn === "itemSubCategory") {
            for (let i = 0; i < this.state.sortitemSubCategory.length; i++) {
              sitemSubCategoryFilterCheckbox +=
                this.state.sortitemSubCategory[i].itemSubCategory + ",";
            }
            sitemSubCategoryFilterCheckbox += "all";
          }
        }
      }
    }
    if (column === "itemGroup" || column === "all") {
      if (type === "value" && type !== "All") {
        sitemGroupFilterCheckbox = sitemGroupFilterCheckbox.replace("all", "");
        sitemGroupFilterCheckbox = sitemGroupFilterCheckbox.replace("all,", "");
        if (
          sitemGroupFilterCheckbox
            .split(",")
            .find((word) => word === e.currentTarget.value)
        ) {
          sitemGroupFilterCheckbox = sitemGroupFilterCheckbox.replace(
            new RegExp(
              e.currentTarget.value +
                ",".replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&"),
              "g"
            ),
            ""
          );
        } else {
          sitemGroupFilterCheckbox += e.currentTarget.value + ",";
        }
      } else {
        if (sitemGroupFilterCheckbox.includes("all")) {
          sitemGroupFilterCheckbox = "";
        } else {
          if (this.state.sortColumn === "itemGroup") {
            for (let i = 0; i < this.state.sortitemGroup.length; i++) {
              sitemGroupFilterCheckbox +=
                this.state.sortitemGroup[i].itemGroup + ",";
            }
            sitemGroupFilterCheckbox += "all";
          }
        }
      }
    }

    var allData = this.state.sortAllData;

    this.setState({
      sbrandNameFilterCheckbox,
      sitemCodeFilterCheckbox,
      sitemNameFilterCheckbox,
      sdepartmentNameFilterCheckbox,
      sitemCategoryFilterCheckbox,
      sitemSubCategoryFilterCheckbox,
      sitemGroupFilterCheckbox,
    });
    if (column === "all") {
      itemsArray = this.state.sortAllData;
    } else if (column === "itemCode") {
      var sItems = sitemCodeFilterCheckbox.split(",");
      if (sItems.length > 0) {
        for (let i = 0; i < sItems.length; i++) {
          if (sItems[i] !== "") {
            var tempFilterData = allData.filter(
              (a) => a.itemCode === sItems[i]
            );
            if (tempFilterData.length > 0) {
              for (let j = 0; j < tempFilterData.length; j++) {
                itemsArray.push(tempFilterData[j]);
              }
            }
          }
        }
      }
    } else if (column === "brandName") {
      var sItems = sbrandNameFilterCheckbox.split(",");
      if (sItems.length > 0) {
        for (let i = 0; i < sItems.length; i++) {
          if (sItems[i] !== "") {
            var tempFilterData = allData.filter(
              (a) => a.brandName === sItems[i]
            );
            if (tempFilterData.length > 0) {
              for (let j = 0; j < tempFilterData.length; j++) {
                itemsArray.push(tempFilterData[j]);
              }
            }
          }
        }
      }
    } else if (column === "itemName") {
      var sItems = sitemNameFilterCheckbox.split(",");
      if (sItems.length > 0) {
        for (let i = 0; i < sItems.length; i++) {
          if (sItems[i] !== "") {
            var tempFilterData = allData.filter(
              (a) => a.itemName === sItems[i]
            );
            if (tempFilterData.length > 0) {
              for (let j = 0; j < tempFilterData.length; j++) {
                itemsArray.push(tempFilterData[j]);
              }
            }
          }
        }
      }
    } else if (column === "departmentName") {
      var sItems = sdepartmentNameFilterCheckbox.split(",");
      if (sItems.length > 0) {
        for (let i = 0; i < sItems.length; i++) {
          if (sItems[i] !== "") {
            var tempFilterData = allData.filter(
              (a) => a.departmentName === sItems[i]
            );
            if (tempFilterData.length > 0) {
              for (let j = 0; j < tempFilterData.length; j++) {
                itemsArray.push(tempFilterData[j]);
              }
            }
          }
        }
      }
    } else if (column === "itemCategory") {
      var sItems = sitemCategoryFilterCheckbox.split(",");
      if (sItems.length > 0) {
        for (let i = 0; i < sItems.length; i++) {
          if (sItems[i] !== "") {
            var tempFilterData = allData.filter(
              (a) => a.itemCategory === sItems[i]
            );
            if (tempFilterData.length > 0) {
              for (let j = 0; j < tempFilterData.length; j++) {
                itemsArray.push(tempFilterData[j]);
              }
            }
          }
        }
      }
    } else if (column === "itemSubCategory") {
      var sItems = sitemSubCategoryFilterCheckbox.split(",");
      if (sItems.length > 0) {
        for (let i = 0; i < sItems.length; i++) {
          if (sItems[i] !== "") {
            var tempFilterData = allData.filter(
              (a) => a.itemSubCategory === sItems[i]
            );
            if (tempFilterData.length > 0) {
              for (let j = 0; j < tempFilterData.length; j++) {
                itemsArray.push(tempFilterData[j]);
              }
            }
          }
        }
      }
    } else if (column === "itemGroup") {
      var sItems = sitemGroupFilterCheckbox.split(",");
      if (sItems.length > 0) {
        for (let i = 0; i < sItems.length; i++) {
          if (sItems[i] !== "") {
            var tempFilterData = allData.filter(
              (a) => a.itemGroup === sItems[i]
            );
            if (tempFilterData.length > 0) {
              for (let j = 0; j < tempFilterData.length; j++) {
                itemsArray.push(tempFilterData[j]);
              }
            }
          }
        }
      }
    }

    this.setState({
      isATOZ: true,
      tempitemData: itemsArray,
    });
  };
  filteTextChange(e) {
    debugger;
    this.setState({ filterTxtValue: e.target.value });

    if (this.state.sortColumn === "itemCode") {
      var sortFilteritemCode = matchSorter(
        this.state.sortitemCode,
        e.target.value,
        { keys: ["itemCode"] }
      );
      if (sortFilteritemCode.length > 0) {
        this.setState({ sortFilteritemCode });
      } else {
        this.setState({
          sortFilteritemCode: [],
        });
      }
    }
    if (this.state.sortColumn === "brandName") {
      var sortFilterbrandName = matchSorter(
        this.state.sortbrandName,
        e.target.value,
        { keys: ["brandName"] }
      );
      if (sortFilterbrandName.length > 0) {
        this.setState({ sortFilterbrandName });
      } else {
        this.setState({
          sortFilterbrandName: [],
        });
      }
    }
    if (this.state.sortColumn === "itemName") {
      var sortFilteritemName = matchSorter(
        this.state.sortitemName,
        e.target.value,
        {
          keys: ["itemName"],
        }
      );
      if (sortFilteritemName.length > 0) {
        this.setState({ sortFilteritemName });
      } else {
        this.setState({
          sortFilteritemName: [],
        });
      }
    }
    if (this.state.sortColumn === "departmentName") {
      var sortFilterdepartmentName = matchSorter(
        this.state.sortdepartmentName,
        e.target.value,
        {
          keys: ["departmentName"],
        }
      );
      if (sortFilterdepartmentName.length > 0) {
        this.setState({ sortFilterdepartmentName });
      } else {
        this.setState({
          sortFilterdepartmentName: [],
        });
      }
    }
    if (this.state.sortColumn === "itemCategory") {
      var sortFilteritemCategory = matchSorter(
        this.state.sortitemCategory,
        e.target.value,
        {
          keys: ["itemCategory"],
        }
      );
      if (sortFilteritemCategory.length > 0) {
        this.setState({ sortFilteritemCategory });
      } else {
        this.setState({
          sortFilteritemCategory: [],
        });
      }
    }
    if (this.state.sortColumn === "itemSubCategory") {
      var sortFilteritemSubCategory = matchSorter(
        this.state.sortitemSubCategory,
        e.target.value,
        {
          keys: ["itemSubCategory"],
        }
      );
      if (sortFilteritemSubCategory.length > 0) {
        this.setState({ sortFilteritemSubCategory });
      } else {
        this.setState({
          sortFilteritemSubCategory: [],
        });
      }
    }
    if (this.state.sortColumn === "itemGroup") {
      var sortFilteritemGroup = matchSorter(
        this.state.sortitemGroup,
        e.target.value,
        {
          keys: ["itemGroup"],
        }
      );
      if (sortFilteritemGroup.length > 0) {
        this.setState({ sortFilteritemGroup });
      } else {
        this.setState({
          sortFilteritemGroup: [],
        });
      }
    }
  }
  handleClearSearch() {
    this.setState({
      sbrandNameFilterCheckbox: "",
      sitemCodeFilterCheckbox: "",
      sitemNameFilterCheckbox: "",
      sdepartmentNameFilterCheckbox: "",
      sitemCategoryFilterCheckbox: "",
      sitemSubCategoryFilterCheckbox: "",
      sitemGroupFilterCheckbox: "",
      filterTxtValue: "",
      sortHeader: "",
      sortColumn: "",
      StatusModel: false,
      itemData: this.state.sortAllData,
      tempitemData: [],
    });
  }

  render() {
    const TranslationContext = this.state.translateLanguage.default;
    return (
      <React.Fragment>
        <NotificationContainer />
        <div className="container-fluid setting-title setting-breadcrumb">
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
                style={{
                  margin: "0 25px",
                  textDecoration: "underline",
                  color: "#2561A8",
                  cursor: "pointer",
                }}
                onClick={this.handleClearSearch.bind(this)}
              >
                {TranslationContext !== undefined
                  ? TranslationContext.a.clearsearch
                  : "clear search"}
              </a>
              <div className="filter-type">
                <p>
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
                        this.state.sitemCodeFilterCheckbox.includes("all") ||
                        this.state.sbrandNameFilterCheckbox.includes("all") ||
                        this.state.sitemNameFilterCheckbox.includes("all") ||
                        this.state.sdepartmentNameFilterCheckbox.includes(
                          "all"
                        ) ||
                        this.state.sitemCategoryFilterCheckbox.includes(
                          "all"
                        ) ||
                        this.state.sitemSubCategoryFilterCheckbox.includes(
                          "all"
                        ) ||
                        this.state.sitemGroupFilterCheckbox.includes("all")
                      }
                      onChange={this.setSortCheckStatus.bind(this, "all")}
                    />

                    <label htmlFor={"fil-open"}>
                      <span className="table-btn table-blue-btn">ALL</span>
                    </label>
                  </div>
                  {this.state.sortColumn === "itemCode"
                    ? this.state.sortFilteritemCode !== null &&
                      this.state.sortFilteritemCode.map((item, i) => (
                        <div className="filter-checkbox">
                          <input
                            type="checkbox"
                            name="filter-type"
                            id={"fil-open" + item.itemCode}
                            value={item.itemCode}
                            checked={
                              this.state.sitemCodeFilterCheckbox
                                .split(",")
                                .find((word) => word === item.itemCode) || false
                            }
                            onChange={this.setSortCheckStatus.bind(
                              this,
                              "itemCode",
                              "value"
                            )}
                          />
                          <label htmlFor={"fil-open" + item.itemCode}>
                            <span className="table-btn table-blue-btn">
                              {item.itemCode}
                            </span>
                          </label>
                        </div>
                      ))
                    : null}

                  {this.state.sortColumn === "brandName"
                    ? this.state.sortFilterbrandName !== null &&
                      this.state.sortFilterbrandName.map((item, i) => (
                        <div className="filter-checkbox">
                          <input
                            type="checkbox"
                            name="filter-type"
                            id={"fil-open" + item.brandName}
                            value={item.brandName}
                            checked={
                              this.state.sbrandNameFilterCheckbox
                                .split(",")
                                .find((word) => word === item.brandName) ||
                              false
                            }
                            onChange={this.setSortCheckStatus.bind(
                              this,
                              "brandName",
                              "value"
                            )}
                          />
                          <label htmlFor={"fil-open" + item.brandName}>
                            <span className="table-btn table-blue-btn">
                              {item.brandName}
                            </span>
                          </label>
                        </div>
                      ))
                    : null}

                  {this.state.sortColumn === "itemName"
                    ? this.state.sortFilteritemName !== null &&
                      this.state.sortFilteritemName.map((item, i) => (
                        <div className="filter-checkbox">
                          <input
                            type="checkbox"
                            name="filter-type"
                            id={"fil-open" + item.itemName}
                            value={item.itemName}
                            checked={
                              this.state.sitemNameFilterCheckbox
                                .split(",")
                                .find((word) => word === item.itemName) || false
                            }
                            onChange={this.setSortCheckStatus.bind(
                              this,
                              "itemName",
                              "value"
                            )}
                          />
                          <label htmlFor={"fil-open" + item.itemName}>
                            <span className="table-btn table-blue-btn">
                              {item.itemName}
                            </span>
                          </label>
                        </div>
                      ))
                    : null}

                  {this.state.sortColumn === "departmentName"
                    ? this.state.sortFilterdepartmentName !== null &&
                      this.state.sortFilterdepartmentName.map((item, i) => (
                        <div className="filter-checkbox">
                          <input
                            type="checkbox"
                            name="filter-type"
                            id={"fil-open" + item.departmentName}
                            value={item.departmentName}
                            checked={
                              this.state.sdepartmentNameFilterCheckbox
                                .split(",")
                                .find((word) => word === item.departmentName) ||
                              false
                            }
                            onChange={this.setSortCheckStatus.bind(
                              this,
                              "departmentName",
                              "value"
                            )}
                          />
                          <label htmlFor={"fil-open" + item.departmentName}>
                            <span className="table-btn table-blue-btn">
                              {item.departmentName}
                            </span>
                          </label>
                        </div>
                      ))
                    : null}
                  {this.state.sortColumn === "itemCategory"
                    ? this.state.sortFilteritemCategory !== null &&
                      this.state.sortFilteritemCategory.map((item, i) => (
                        <div className="filter-checkbox">
                          <input
                            type="checkbox"
                            name="filter-type"
                            id={"fil-open" + item.itemCategory}
                            value={item.itemCategory}
                            checked={
                              this.state.sitemCategoryFilterCheckbox
                                .split(",")
                                .find((word) => word === item.itemCategory) ||
                              false
                            }
                            onChange={this.setSortCheckStatus.bind(
                              this,
                              "itemCategory",
                              "value"
                            )}
                          />
                          <label htmlFor={"fil-open" + item.itemCategory}>
                            <span className="table-btn table-blue-btn">
                              {item.itemCategory}
                            </span>
                          </label>
                        </div>
                      ))
                    : null}
                  {this.state.sortColumn === "itemSubCategory"
                    ? this.state.sortFilteritemSubCategory !== null &&
                      this.state.sortFilteritemSubCategory.map((item, i) => (
                        <div className="filter-checkbox">
                          <input
                            type="checkbox"
                            name="filter-type"
                            id={"fil-open" + item.itemSubCategory}
                            value={item.itemSubCategory}
                            checked={
                              this.state.sitemSubCategoryFilterCheckbox
                                .split(",")
                                .find(
                                  (word) => word === item.itemSubCategory
                                ) || false
                            }
                            onChange={this.setSortCheckStatus.bind(
                              this,
                              "itemSubCategory",
                              "value"
                            )}
                          />
                          <label htmlFor={"fil-open" + item.itemSubCategory}>
                            <span className="table-btn table-blue-btn">
                              {item.itemSubCategory}
                            </span>
                          </label>
                        </div>
                      ))
                    : null}
                  {this.state.sortColumn === "itemGroup"
                    ? this.state.sortFilteritemGroup !== null &&
                      this.state.sortFilteritemGroup.map((item, i) => (
                        <div className="filter-checkbox">
                          <input
                            type="checkbox"
                            name="filter-type"
                            id={"fil-open" + item.itemGroup}
                            value={item.itemGroup}
                            checked={
                              this.state.sitemGroupFilterCheckbox
                                .split(",")
                                .find((word) => word === item.itemGroup) ||
                              false
                            }
                            onChange={this.setSortCheckStatus.bind(
                              this,
                              "itemGroup",
                              "value"
                            )}
                          />
                          <label htmlFor={"fil-open" + item.itemGroup}>
                            <span className="table-btn table-blue-btn">
                              {item.itemGroup}
                            </span>
                          </label>
                        </div>
                      ))
                    : null}
                </div>
              </div>
            </div>
          </Modal>

          <Link to="/store/settings" className="header-path">
            {TranslationContext !== undefined
              ? TranslationContext.link.setting
              : "Settings"}
          </Link>
          <span>&gt;</span>
          <Link
            to={{
              pathname: "/store/settings",
              tabName: "store-tab",
            }}
            className="header-path"
          >
            {TranslationContext !== undefined
              ? TranslationContext.link.store
              : "Store"}
          </Link>
          <span>&gt;</span>
          <Link to={Demo.BLANK_LINK} className="active header-path">
            {TranslationContext !== undefined
              ? TranslationContext.link.itemmaster
              : "Item Master"}
          </Link>
        </div>
        <div className="container-fluid">
          <div className="store-settings-cntr item-settings-cntr">
            <div className="row">
              <div className="col-md-8">
                <div className="table-cntr table-height StoreItemMasterReact setting-table-des settings-align">
                  <ReactTable
                    data={this.state.itemData}
                    columns={[
                      {
                        Header: (
                          <span
                            className={
                              this.state.sortHeader === "Brand Name"
                                ? "sort-column"
                                : ""
                            }
                            onClick={this.StatusOpenModel.bind(
                              this,
                              "brandName",
                              TranslationContext !== undefined
                                ? TranslationContext.span.brandname
                                : "Brand Name"
                            )}
                          >
                            {TranslationContext !== undefined
                              ? TranslationContext.span.brandname
                              : "Brand Name"}

                            <FontAwesomeIcon
                              icon={
                                this.state.isATOZ === false &&
                                this.state.sortHeader === "Brand Name"
                                  ? faCaretUp
                                  : faCaretDown
                              }
                            />
                          </span>
                        ),
                        sortable: false,
                        accessor: "brandName",
                      },
                      {
                        Header: (
                          <span
                            className={
                              this.state.sortHeader === "Item Code"
                                ? "sort-column"
                                : ""
                            }
                            onClick={this.StatusOpenModel.bind(
                              this,
                              "itemCode",
                              TranslationContext !== undefined
                                ? TranslationContext.span.itemcode
                                : "Item Code"
                            )}
                          >
                            {TranslationContext !== undefined
                              ? TranslationContext.span.itemcode
                              : "Item Code"}

                            <FontAwesomeIcon
                              icon={
                                this.state.isATOZ === false &&
                                this.state.sortHeader === "Item Code"
                                  ? faCaretUp
                                  : faCaretDown
                              }
                            />
                          </span>
                        ),
                        sortable: false,
                        accessor: "itemCode",
                      },
                      {
                        Header: (
                          <span
                            className={
                              this.state.sortHeader === "Item Name"
                                ? "sort-column"
                                : ""
                            }
                            onClick={this.StatusOpenModel.bind(
                              this,
                              "itemName",
                              TranslationContext !== undefined
                                ? TranslationContext.span.itemname
                                : "Item Name"
                            )}
                          >
                            {TranslationContext !== undefined
                              ? TranslationContext.span.itemname
                              : "Item Name"}
                            <FontAwesomeIcon
                              icon={
                                this.state.isATOZ == false &&
                                this.state.sortHeader === "Item Name"
                                  ? faCaretUp
                                  : faCaretDown
                              }
                            />
                          </span>
                        ),
                        sortable: false,
                        accessor: "itemName",
                      },
                      {
                        Header: (
                          <span
                            className={
                              this.state.sortHeader === "Department Name"
                                ? "sort-column"
                                : ""
                            }
                            onClick={this.StatusOpenModel.bind(
                              this,
                              "departmentName",
                              TranslationContext !== undefined
                                ? TranslationContext.span.departmentname
                                : "Department Name"
                            )}
                          >
                            {TranslationContext !== undefined
                              ? TranslationContext.span.departmentname
                              : "Department Name"}

                            <FontAwesomeIcon
                              icon={
                                this.state.isATOZ === false &&
                                this.state.sortHeader === "Department Name"
                                  ? faCaretUp
                                  : faCaretDown
                              }
                            />
                          </span>
                        ),
                        sortable: false,
                        accessor: "departmentName",
                      },
                      {
                        Header: (
                          <span
                            className={
                              this.state.sortHeader === "Item Cat"
                                ? "sort-column"
                                : ""
                            }
                            onClick={this.StatusOpenModel.bind(
                              this,
                              "itemCategory",
                              TranslationContext !== undefined
                                ? TranslationContext.span.itemcat
                                : "Item Cat"
                            )}
                          >
                            {TranslationContext !== undefined
                              ? TranslationContext.span.itemcat
                              : "Item Cat"}

                            <FontAwesomeIcon
                              icon={
                                this.state.isATOZ === false &&
                                this.state.sortHeader === "Item Cat"
                                  ? faCaretUp
                                  : faCaretDown
                              }
                            />
                          </span>
                        ),
                        sortable: false,
                        accessor: "itemCategory",
                      },
                      {
                        Header: (
                          <span
                            className={
                              this.state.sortHeader === "Item Sub Cat"
                                ? "sort-column"
                                : ""
                            }
                            onClick={this.StatusOpenModel.bind(
                              this,
                              "itemSubCategory",
                              TranslationContext !== undefined
                                ? TranslationContext.span.itemsubcat
                                : "Item Sub Cat"
                            )}
                          >
                            {TranslationContext !== undefined
                              ? TranslationContext.span.itemsubcat
                              : "Item Sub Cat"}

                            <FontAwesomeIcon
                              icon={
                                this.state.isATOZ === false &&
                                this.state.sortHeader === "Item Sub Cat"
                                  ? faCaretUp
                                  : faCaretDown
                              }
                            />
                          </span>
                        ),
                        sortable: false,
                        accessor: "itemSubCategory",
                      },
                      {
                        Header: (
                          <span
                            className={
                              this.state.sortHeader === "Item Group"
                                ? "sort-column"
                                : ""
                            }
                            onClick={this.StatusOpenModel.bind(
                              this,
                              "itemGroup",
                              TranslationContext !== undefined
                                ? TranslationContext.span.itemgroup
                                : "Item Group"
                            )}
                          >
                            {TranslationContext !== undefined
                              ? TranslationContext.span.itemgroup
                              : "Item Group"}

                            <FontAwesomeIcon
                              icon={
                                this.state.isATOZ === false &&
                                this.state.sortHeader === "Item Group"
                                  ? faCaretUp
                                  : faCaretDown
                              }
                            />
                          </span>
                        ),
                        sortable: false,
                        accessor: "itemGroup",
                      },
                    ]}
                    defaultPageSize={10}
                    minRows={2}
                    showPagination={true}
                  />
                </div>
              </div>
              <div className="col-md-4">
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
                        filename={"ItemMaster.csv"}
                        data={config.itemMasterTemplate}
                      >
                        <img src={DownExcel} alt="download icon" />
                      </CSVLink>
                    </div>
                  </div>
                  <Spin
                    tip="Please wait..."
                    spinning={this.state.bulkuploadLoading}
                  >
                    <div className="mainfileUpload">
                      <Dropzone onDrop={this.fileUpload}>
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
                            </span>{" "}
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

                    {this.state.fileValidation ? (
                      <p style={{ color: "red", marginBottom: "0px" }}>
                        {this.state.fileValidation}
                      </p>
                    ) : null}
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
                                      {TranslationContext !== undefined
                                        ? TranslationContext.a.cancel
                                        : "CANCEL"}
                                    </a>
                                    <button
                                      className="butn"
                                      onClick={this.DeleteBulkUploadFile}
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
                        {this.state.isErrorBulkUpload ? (
                          <div className="file-cntr">
                            <div className="file-dtls">
                              <p className="file-name">{this.state.fileName}</p>
                              <span
                                className="file-retry"
                                onClick={this.handleBulkUpload.bind(this)}
                              >
                                Retry
                              </span>
                            </div>
                            <div>
                              <span className="file-failed">Failed</span>
                            </div>
                          </div>
                        ) : null}
                        {this.state.isShowProgress ? (
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
                                  now={60}
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
                      onClick={this.handleBulkUpload.bind(this)}
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
        </div>
      </React.Fragment>
    );
  }
}

export default ItemMaster;
