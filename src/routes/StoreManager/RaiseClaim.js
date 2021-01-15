import React, { Component, Fragment } from "react";
import { Collapse, CardBody, Card, Input } from "reactstrap";
import SearchBlueImg from "./../../assets/Images/search-blue.png";
import PlusImg from "./../../assets/Images/plus.png";
import SearchBlackImg from "./../../assets/Images/searchBlack.png";
import axios from "axios";
import config from "../../helpers/config";
import { authHeader } from "../../helpers/authHeader";
import { Table, message } from "antd";
import { NotificationManager } from "react-notifications";
import { Link } from "react-router-dom";
import ReactAutocomplete from "react-autocomplete";
import DatePicker from "react-datepicker";
import SimpleReactValidator from "simple-react-validator";
import * as translationHI from "../../translations/hindi";
import * as translationMA from "../../translations/marathi";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class RaiseClaim extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      collapse: false,
      SearchDetails: true,
      selectBrand: 0,
      categoryDropData: [],
      ListOfIssueData: [],
      brandData: [],
      SubCategoryDropData: [],
      ModalorderNumber: "",
      custAttachOrder: 0,
      orderDetailsData: [],
      OrderSubItem: [],
      OrderSubComponent: [],
      selectedDataRow: [],
      CheckBoxAllItem: {},
      CheckBoxAllOrder: {},
      commentData: [],
      claimPercentage: "",
      fileName: [],
      SrchEmailPhone: "",
      customerId: 0,
      customerData: {},
      SelectedAllOrder: [],
      SelectedAllItem: [],
      selectedOrderData: [],
      SelectedItemData: [],
      list1Value: "",
      ListOfSubCate: "",
      ListOfIssue: "",
      issueCompulsion: "",
      subcategoryCompulsion: "",
      categoryCompulsion: "",
      errors: {},
      files: [],
      imageUrl: "",
      taskId: 0,
      ticketId: 0,
      commentCount: 0,
      showManual: false,
      ChannelOfPurchaseData: [],
      modeData: [],
      purchaseFrmStorName: {},
      StorAddress: {},
      OrderCreatDate: "",
      orderId: "",
      billId: "",
      productBarCode: "",
      orderMRP: "",
      pricePaid: "",
      discount: "",
      orderNumber: "",
      message: "",
      size: "",
      requiredSize: "",
      selectedTicketSource: 0,
      SearchItem: [],
      translateLanguage: {},
      isSubmit: false,
      isStoreSelect: false,
      validPurchaseStoreName: "",
      showClaimUI: false,
    };
    this.toggle = this.toggle.bind(this);
    this.handleGetBrandList = this.handleGetBrandList.bind(this);
    this.handleGetCategoryList = this.handleGetCategoryList.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.validator = new SimpleReactValidator();
  }
  toggle() {
    this.setState((state) => ({ collapse: !state.collapse }));
  }
  handleShowSearchDetails() {
    this.setState({
      SearchDetails: !this.state.SearchDetails,
    });
  }

  componentDidMount() {
    if (this.props.location.state) {
      var taskId = this.props.location.state.taskId;
      var ticketId = this.props.location.state.ticketId;
      this.setState({ taskId, ticketId });
      this.handleGetStoreAndCustomerById(ticketId);
    }

    this.handleGetBrandList();
    this.handleModeOfPaymentDropDown();
    this.handleGetChannelOfPurchaseList();

    if (window.localStorage.getItem("translateLanguage") === "hindi") {
      this.state.translateLanguage = translationHI;
    } else if (window.localStorage.getItem("translateLanguage") === "marathi") {
      this.state.translateLanguage = translationMA;
    } else {
      this.state.translateLanguage = {};
    }
  }

  ////handle add manullay order
  hadleAddManuallyOrderData() {
    const TranslationContext = this.state.translateLanguage.default;

    if (this.validator.allValid()) {
      let self = this;
      var CustID = this.state.customerId;

      this.setState({ saveLoader: true });
      if (this.state.isStoreSelect === false) {
        this.setState({
          validPurchaseStoreName:
            "Please select valid purchase from store name",
        });
        return false;
      }
      axios({
        method: "post",
        url: config.apiUrl + "/Order/createOrder",
        headers: authHeader(),
        data: {
          ProductBarCode: this.state.productBarCode,
          OrderNumber: this.state.orderId,
          BillID: this.state.billId,
          TicketSourceID: this.state.selectedTicketSource,
          ModeOfPaymentID: this.state.modeOfPayment,
          TransactionDate: this.state.OrderCreatDate,
          InvoiceNumber: "",
          InvoiceDate: this.state.OrderCreatDate,
          OrderPrice: this.state.orderMRP,
          PricePaid: this.state.pricePaid,
          CustomerID: CustID,
          PurchaseFromStoreId: this.state.purchaseFrmStorID,
          Discount: this.state.discount,
          Size: this.state.size,
          RequireSize: this.state.requiredSize,
        },
      })
        .then(function(res) {
          let status = res.data.message;
          if (status === "Success") {
            let data = res.data.responseData;
            NotificationManager.success(
              TranslationContext !== undefined
                ? TranslationContext.ticketingDashboard
                    .neworderaddedsuccessfully
                : "New Order added successfully."
            );

            self.setState({
              orderNumber: data,
              productBarCode: "",
              billId: "",
              orderId: "",
              selectedTicketSource: 0,
              modeOfPayment: 0,
              OrderCreatDate: "",
              orderMRP: "",
              pricePaid: "",
              purchaseFrmStorName: {},
              discount: "",
              size: "",
              requiredSize: "",
              message: "Success",
              saveLoader: false,
            });
            setTimeout(() => {
              self.handleOrderSearchData(self);
            }, 100);
          } else {
            NotificationManager.error(
              TranslationContext !== undefined
                ? TranslationContext.ticketingDashboard.ordernotadded
                : "Order not added."
            );
            self.setState({
              saveLoader: false,
            });
          }
        })
        .catch((data) => {
          console.log(data);
        });
    } else {
      this.validator.showMessages();
      this.forceUpdate();
    }
  }

  ////handle select store
  HandleSelectdata(e, field, value, id) {
    let SearchData = this.state.SearchData;
    SearchData[field] = value;

    var StorAddress = this.state.StorAddress;
    StorAddress["address"] = id.address;
    var Store_Id = id.storeID;

    this.setState({
      SearchData,
      StorAddress,
      purchaseFrmStorID: Store_Id,
      isStoreSelect: true,
      validPurchaseStoreName: "",
    });
  }

  ////handle get purchase store name
  handlePurchaseStoreName(field, e) {
    let self = this;
    let SearchData = this.state.purchaseFrmStorName;
    SearchData[field] = e.target.value;
    this.state.StorAddress["address"] = "";
    if (SearchData[field].length > 3) {
      this.setState({
        SearchData,
        SearchItem: [],
        StorAddress: this.state.StorAddress,
        isStoreSelect: false,
        validPurchaseStoreName: "",
      });
      axios({
        method: "post",
        url: config.apiUrl + "/Store/getStores",
        headers: authHeader(),
        params: {
          SearchText: SearchData[field],
        },
      })
        .then(function(res) {
          let status = res.data.message;
          var data = res.data.responseData;
          if (status === "Success") {
            self.setState({
              SearchItem: data,
            });
          } else {
            self.setState({
              SearchItem: [],
            });
          }
        })
        .catch((data) => {
          console.log(data);
        });
    } else {
      self.setState({
        SearchData,
        SearchItem: [],
        StorAddress: this.state.StorAddress,
        isStoreSelect: false,
        validPurchaseStoreName: "",
      });
    }
  }

  ////handle mode of payment dropdown
  handleModeOfPaymentDropDown() {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/Master/getPaymentMode",
      headers: authHeader(),
    })
      .then(function(res) {
        let modeData = res.data.responseData;
        self.setState({ modeData: modeData });
      })
      .catch((data) => {
        console.log(data);
      });
  }

  //// handle get channel of purchase
  handleGetChannelOfPurchaseList() {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/Master/GetChannelOfPurchaseList",
      headers: authHeader(),
    })
      .then(function(res) {
        let data = res.data.responseData;
        self.setState({ ChannelOfPurchaseData: data });
      })
      .catch((data) => {
        console.log(data);
      });
  }

  ////handle get store and customer information by ticket id
  handleGetStoreAndCustomerById(ticketId) {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/StoreClaim/GetOrderwithCustomerDetailByTicketID",
      headers: authHeader(),
      params: { TicketID: ticketId },
    })
      .then(function(response) {
        var message = response.data.message;
        var responseData = response.data.responseData;
        if (message == "Success" && responseData) {
          var customerId = responseData[0].customerID;

          var customerData = {};
          customerData.customerName = responseData[0].customerName;
          customerData.customerPhoneNumber =
            responseData[0].customerPhoneNumber;
          customerData.customerEmailId = responseData[0].emailID;
          customerData.gender = responseData[0].gender;
          customerData.altEmailID = responseData[0].alternateEmailID;
          customerData.altNumber = responseData[0].customerAlternateNumber;
          var SrchEmailPhone = responseData[0].customerPhoneNumber;
          self.setState({
            customerId,
            customerData,
            SrchEmailPhone,
          });

          self.handleOrderSearchData(self);
        }
      })
      .catch((response) => {
        console.log(response, "---handleGetStoreAndCustomerById");
      });
  }

  handleGetCliamComment() {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/Brand/GetBrandList",
      headers: authHeader(),
    })
      .then(function(response) {
        var message = response.data.message;
        var responseData = response.data.responseData;
        if (message == "Success" && responseData) {
        }
      })
      .catch((response) => {
        console.log(response, "---handleGetStoreAndCustomerById");
      });
  }
  handleBrandChange = (e) => {
    let value = e.target.value;
    if (value !== "0") {
      this.state.errors["Brand"] = "";
      this.setState({
        errors: this.state.errors,
        selectBrand: value,
        categoryDropData: [],
        SubCategoryDropData: [],
        ListOfIssueData: [],
        claimComments: "",
      });
      setTimeout(() => {
        if (this.state.selectBrand) {
          this.handleGetCategoryList();
        }
      }, 1);
    } else {
      this.state.errors["Brand"] = "Please select Brand";
      this.setState({
        errors: this.state.errors,
        selectBrand: value,
        categoryDropData: [],
        SubCategoryDropData: [],
        ListOfIssueData: [],
        claimComments: "",
      });
    }
  };
  handlePercentageOnChange = (e) => {
    const input = e.target.value;

    if (!isNaN(input)) {
      this.setState({ claimPercentage: input });
    } else {
      this.setState({ claimPercentage: "" });
    }
  };
  handleGetBrandList() {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/Brand/GetBrandList",
      headers: authHeader(),
    })
      .then(function(res) {
        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success") {
          self.setState({ brandData: data });
        } else {
          self.setState({ brandData: [] });
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }

  handleGetCategoryList = async (id, type) => {
    let self = this;
    var braindID;
    if (type == "edit") {
      braindID = this.state.editCategory.brandID;
    } else {
      if (id) {
        braindID = id;
      } else {
        braindID = this.state.selectBrand;
      }
    }
    await axios({
      method: "post",
      url: config.apiUrl + "/Category/GetClaimCategoryListByBrandID",
      headers: authHeader(),
      params: {
        BrandID: braindID,
      },
    })
      .then(function(res) {
        let data = res.data;
        self.setState({ categoryDropData: data });
      })
      .catch((data) => {
        console.log(data);
      });
  };

  handleCategoryChange = (e) => {
    var value = e.target.value;
    if (value !== "0") {
      this.state.errors["Category"] = "";
      this.setState({
        list1Value: value,
        SubCategoryDropData: [],
        errors: this.state.errors,
      });
      setTimeout(() => {
        if (this.state.list1Value) {
          this.handleGetSubCategoryList(value);
        }
      }, 10);
    } else {
      this.state.errors["Category"] = "Please select claim category";
      this.setState({ showList1: true, errors: this.state.errors });
    }
  };

  handleGetSubCategoryList = async (id) => {
    let self = this;
    var Category_Id = "";
    if (id === "edit") {
      Category_Id = this.state.editCategory.categoryID;
    } else {
      Category_Id = this.state.list1Value;
    }
    await axios({
      method: "post",
      url: config.apiUrl + "/Category/GetClaimSubCategoryByCategoryID",
      headers: authHeader(),
      params: {
        CategoryID: Category_Id,
      },
    })
      .then(function(res) {
        let data = res.data.responseData;
        self.setState({ SubCategoryDropData: data });
      })
      .catch((data) => {
        console.log(data);
      });
  };

  handleSubCatOnChange = (e) => {
    var value = e.target.value;
    if (value !== "0") {
      this.state.errors["SubCategory"] = "";
      this.setState({ ListOfSubCate: value, errors: this.state.errors });
      setTimeout(() => {
        if (this.state.ListOfSubCate) {
          this.handleGetIssueTypeList();
        }
      }, 1);
    } else {
      this.state.errors["SubCategory"] = "Please select sub category";
      this.setState({ errors: this.state.errors });
    }
  };

  handleGetIssueTypeList(id) {
    let self = this;
    var SubCat_Id = 0;
    if (id === "edit") {
      SubCat_Id = this.state.editCategory.subCategoryID;
    } else {
      SubCat_Id = this.state.ListOfSubCate;
    }
    axios({
      method: "post",
      url: config.apiUrl + "/Category/GetClaimIssueTypeList",
      headers: authHeader(),
      params: {
        SubCategoryID: SubCat_Id,
      },
    })
      .then(function(res) {
        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success") {
          self.setState({ ListOfIssueData: data });
        } else {
          self.setState({ ListOfIssueData: [] });
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }

  handleIssueOnChange = (e) => {
    const value = e.target.value;
    if (value !== "0") {
      this.state.errors["IssueType"] = "";
      this.setState({ ListOfIssue: value, errors: this.state.errors });
    } else {
      this.state.errors["IssueType"] = "Please select claim type";
      this.setState({ errors: this.state.errors });
    }
  };

  handleOrderChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleOrderSearchData(e) {
    let self = this;
    var CustID = this.state.customerId;

    if (CustID > 0) {
      if (this.state.ticketId == 0) {
        if (typeof e.preventDefault !== "undefined") {
          e.preventDefault();
        }
      }
      axios({
        method: "post",
        url: config.apiUrl + "/Order/getOrderListWithItemDetails",
        headers: authHeader(),
        params: {
          OrderNumber: this.state.orderNumber,
          CustomerID: CustID,
        },
      })
        .then(function(res) {
          let message = res.data.message;
          let mainData = res.data.responseData;
          if (message === "Success" && mainData) {
            self.setState({
              SearchDetails: true,
              orderDetailsData: mainData,
            });
          } else {
            self.setState({
              SearchDetails: false,
              orderDetailsData: mainData,
            });
          }
        })
        .catch((data) => {
          console.log(data);
        });
    } else {
      e.preventDefault();
      this.setState({ searchCompulsion: "Search field is compulsory." });
      return false;
    }
  }

  handleGetOderItemData(invoiceNumber, rowData, e) {
    if (e.target.checked) {
      this.setState({
        SelectedAllOrder: [],
        SelectedAllItem: [],
        OrderSubItem: [],
        selectedInvoiceNo: "",
      });
      let self = this;
      var CustID = this.state.customerId;
      axios({
        method: "post",
        url: config.apiUrl + "/Order/getOrderItemDetailsList",
        headers: authHeader(),
        data: {
          OrderMasterID: rowData.orderMasterID,
          OrderNumber: rowData.invoiceNumber,
          CustomerID: CustID,
          StoreCode: rowData.storeCode,
          InvoiceDate: rowData.invoiceDate,
        },
      })
        .then(function(res) {
          let Msg = res.data.message;
          let data = res.data.responseData;
          if (Msg === "Success") {
            self.setState({
              OrderSubItem: data,
            });
            var selectedInvoiceNo = invoiceNumber;
            const newSelected = Object.assign({}, self.state.CheckBoxAllOrder);
            newSelected[invoiceNumber] = !self.state.CheckBoxAllOrder[
              invoiceNumber
            ];
            self.setState({
              CheckBoxAllOrder: newSelected,
              selectedInvoiceNo,
            });
            var selectedRow = [];
            var CselectedRow = [];
            if (self.state.SelectedAllOrder.length === 0) {
              selectedRow.push(rowData);
              var Order_Master = self.state.OrderSubItem.filter(
                (x) => x.invoiceNumber === invoiceNumber
              );
              if (Order_Master.length > 0) {
                var objCheckBoxAllItem = new Object();
                for (let j = 0; j < Order_Master.length; j++) {
                  objCheckBoxAllItem[Order_Master[j].articleNumber] = true;

                  CselectedRow.push(Order_Master[j]);
                }
                self.setState({
                  CheckBoxAllItem: objCheckBoxAllItem,
                });
              }
              self.setState({
                SelectedAllOrder: selectedRow,
                SelectedAllItem: CselectedRow,
              });
            } else {
              if (newSelected[invoiceNumber] === true) {
                for (var i = 0; i < self.state.SelectedAllOrder.length; i++) {
                  if (self.state.SelectedAllOrder[i] === rowData) {
                    selectedRow = self.state.SelectedAllOrder;
                    selectedRow.push(rowData);
                    var Order_Master = self.state.OrderSubItem.filter(
                      (x) => x.invoiceNumber === invoiceNumber
                    );
                    if (Order_Master.length > 0) {
                      var objCheckBoxAllItem = new Object();
                      for (let j = 0; j < Order_Master.length; j++) {
                        objCheckBoxAllItem[
                          Order_Master[j].invoiceNumber
                        ] = true;

                        CselectedRow.push(Order_Master[j]);
                      }
                      self.setState({
                        CheckBoxAllItem: objCheckBoxAllItem,
                      });
                    }

                    self.setState({
                      SelectedAllOrder: selectedRow,
                      SelectedAllItem: CselectedRow,
                    });

                    break;
                  }
                }
              } else {
                for (var i = 0; i < self.state.SelectedAllOrder.length; i++) {
                  if (self.state.SelectedAllOrder[i] === rowData) {
                    selectedRow = self.state.SelectedAllOrder;
                    selectedRow.splice(i, 1);
                    var Order_Master = self.state.OrderSubItem.filter(
                      (x) => x.invoiceNumber === invoiceNumber
                    );
                    if (Order_Master.length > 0) {
                      var objCheckBoxAllItem = new Object();
                      for (let j = 0; j < Order_Master.length; j++) {
                        objCheckBoxAllItem[
                          Order_Master[j].invoiceNumber
                        ] = false;
                      }
                      self.setState({
                        CheckBoxAllItem: objCheckBoxAllItem,
                      });
                    }

                    self.setState({
                      SelectedAllOrder: selectedRow,
                      SelectedAllItem: [],
                    });

                    break;
                  }
                }
              }
            }

            {
              self.handleGetOrderId(selectedRow, CselectedRow);
            }
            self.setState({
              SelectedAllOrder: selectedRow,
              SelectedAllItem: CselectedRow,
            });
          } else {
            var selectedInvoiceNo = invoiceNumber;
            const newSelected = Object.assign({}, self.state.CheckBoxAllOrder);
            newSelected[invoiceNumber] = !self.state.CheckBoxAllOrder[
              invoiceNumber
            ];
            self.setState({
              CheckBoxAllOrder: newSelected,
              selectedInvoiceNo,
            });
            var selectedRow = [];
            var CselectedRow = [];
            if (self.state.SelectedAllOrder.length === 0) {
              selectedRow.push(rowData);
              var Order_Master = self.state.OrderSubItem.filter(
                (x) => x.invoiceNumber === invoiceNumber
              );
              if (Order_Master.length > 0) {
                var objCheckBoxAllItem = new Object();
                for (let j = 0; j < Order_Master.length; j++) {
                  objCheckBoxAllItem[Order_Master[j].invoiceNumber] = true;

                  CselectedRow.push(Order_Master[j]);
                }
                self.setState({
                  CheckBoxAllItem: objCheckBoxAllItem,
                });
              }
              self.setState({
                SelectedAllOrder: selectedRow,
                SelectedAllItem: CselectedRow,
              });
            } else {
              if (newSelected[invoiceNumber] === true) {
                for (var i = 0; i < self.state.SelectedAllOrder.length; i++) {
                  if (self.state.SelectedAllOrder[i] === rowData) {
                    selectedRow = self.state.SelectedAllOrder;
                    selectedRow.push(rowData);
                    var Order_Master = self.state.OrderSubItem.filter(
                      (x) => x.invoiceNumber === invoiceNumber
                    );
                    if (Order_Master.length > 0) {
                      var objCheckBoxAllItem = new Object();
                      for (let j = 0; j < Order_Master.length; j++) {
                        objCheckBoxAllItem[
                          Order_Master[j].invoiceNumber
                        ] = true;

                        CselectedRow.push(Order_Master[j]);
                      }
                      self.setState({
                        CheckBoxAllItem: objCheckBoxAllItem,
                      });
                    }

                    self.setState({
                      SelectedAllOrder: selectedRow,
                      SelectedAllItem: CselectedRow,
                    });

                    break;
                  }
                }
              } else {
                for (var i = 0; i < self.state.SelectedAllOrder.length; i++) {
                  if (self.state.SelectedAllOrder[i] === rowData) {
                    selectedRow = self.state.SelectedAllOrder;
                    selectedRow.splice(i, 1);
                    var Order_Master = self.state.OrderSubItem.filter(
                      (x) => x.invoiceNumber === invoiceNumber
                    );
                    if (Order_Master.length > 0) {
                      var objCheckBoxAllItem = new Object();
                      for (let j = 0; j < Order_Master.length; j++) {
                        objCheckBoxAllItem[
                          Order_Master[j].invoiceNumber
                        ] = false;
                      }
                      self.setState({
                        CheckBoxAllItem: objCheckBoxAllItem,
                      });
                    }

                    self.setState({
                      SelectedAllOrder: selectedRow,
                      SelectedAllItem: [],
                    });

                    break;
                  }
                }
              }
            }

            {
              self.handleGetOrderId(selectedRow, CselectedRow);
            }

            self.setState({
              CheckBoxAllOrder: newSelected,
              selectedInvoiceNo,
              OrderSubItem: [],
            });
          }
        })
        .catch((data) => {
          console.log(data);
        });
    } else {
      this.setState({
        SelectedAllOrder: [],
        SelectedAllItem: [],
        OrderSubItem: [],
        selectedInvoiceNo: "",
      });
    }
  }

  checkIndividualItem(articleNumber, rowData) {
    const newSelected = Object.assign({}, this.state.CheckBoxAllItem);
    newSelected[articleNumber] = !this.state.CheckBoxAllItem[articleNumber];
    this.setState({
      CheckBoxAllItem: newSelected,
    });
    var selectedRow = [];
    if (this.state.SelectedAllItem.length === 0) {
      selectedRow.push(rowData);
      this.setState({
        SelectedAllItem: selectedRow,
      });
    } else {
      if (newSelected[articleNumber] === true) {
        for (var i = 0; i < this.state.SelectedAllItem.length; i++) {
          selectedRow = this.state.SelectedAllItem;
          selectedRow.push(rowData);
          var Order_Master = this.state.OrderSubItem.filter(
            (x) =>
              x.orderMasterID === this.state.SelectedAllItem[i].orderMasterID
          );

          break;
        }
      } else {
        for (var j = 0; j < this.state.SelectedAllItem.length; j++) {
          if (this.state.SelectedAllItem[j] === rowData) {
            selectedRow = this.state.SelectedAllItem;
            selectedRow.splice(j, 1);

            var Order_Master = this.state.OrderSubItem.filter(
              (x) => x.orderMasterID === rowData.orderMasterID
            );

            if (Order_Master.length !== selectedRow.length) {
              const newSelected = Object.assign(
                {},
                this.state.CheckBoxAllOrder
              );
              newSelected[Order_Master[0].orderMasterID] = false;
              this.setState({
                CheckBoxAllOrder: Order_Master[0].orderMasterID
                  ? newSelected
                  : false,
              });
            }

            break;
          }
        }
      }
    }
    this.setState({
      SelectedAllItem: selectedRow,
    });
  }

  handleOnChange(e) {
    if (e.currentTarget.value !== "") {
      if (e.currentTarget.name === "claimPercentage") {
        this.state.errors["ClaimPercent"] = "";
        this.setState({
          errors: this.state.errors,
        });

        if (isNaN(e.currentTarget.value)) {
          return false;
        }
        var splitText = e.currentTarget.value.split(".");
        var index = e.currentTarget.value.indexOf(".");
        if (parseFloat(e.currentTarget.value) <= 100) {
          if (index != -1) {
            if (splitText) {
              if (splitText[1].length <= 2) {
                if (index != -1 && splitText.length === 2) {
                  this.setState({ claimPercentage: e.currentTarget.value });
                }
              } else {
                return false;
              }
            } else {
              this.setState({ claimPercentage: e.currentTarget.value });
            }
          } else {
            this.setState({ claimPercentage: e.currentTarget.value });
          }
        } else {
          this.setState({ claimPercentage: "" });
        }
      } else {
        this.setState({
          [e.currentTarget.name]: e.currentTarget.value,
          searchCompulsion: "",
        });
      }
    } else {
      if (e.currentTarget.name === "claimPercentage") {
        this.state.errors["ClaimPercent"] = "Please select claim percentage";
        this.setState({
          [e.currentTarget.name]: e.currentTarget.value,
          errors: this.state.errors,
        });
      } else {
        this.setState({
          [e.currentTarget.name]: e.currentTarget.value,
          searchCompulsion: "Search field is compulsory.",
        });
      }
    }
  }

  fileUpload(e) {
    var allFiles = [];
    var selectedFiles = e.target.files;
    if (selectedFiles.length > 0) {
      var imageFile = e.target.files[0];
      var fileName = imageFile.name;
      var allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i;
      if (!allowedExtensions.exec(fileName)) {
        alert(
          "Please upload file having extensions .jpeg/.jpg/.png/.gif only."
        );
        return false;
      } else {
        this.state.errors["productImg"] = "";
        allFiles.push(selectedFiles[0]);
        this.setState({
          errors: this.state.errors,
          fileName: allFiles,
        });

        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
          this.setState({
            imageUrl: reader.result,
          });
        };
        if (file) {
          reader.readAsDataURL(file);
          this.setState({
            imageUrl: reader.result,
          });
        } else {
          this.setState({
            imageUrl: "",
          });
        }
      }
    } else {
      if (this.state.fileName.length == 0) {
        this.state.errors["productImg"] = "Please select product image";
        this.setState({ errors: this.state.errors });
      }
    }
  }

  handleValidation() {
    let errors = this.state.errors;
    let formIsValid = true;
    if (this.state.selectBrand == 0) {
      formIsValid = false;
      errors["Brand"] = "Please select Brand";
    } else {
      if (!this.state.list1Value) {
        formIsValid = false;
        errors["Category"] = "Please select claim category";
      } else {
        if (!this.state.ListOfSubCate) {
          formIsValid = false;
          errors["SubCategory"] = "Please select sub category";
        } else {
          if (!this.state.ListOfIssue) {
            formIsValid = false;
            errors["IssueType"] = "Please select claim type";
          }
        }
      }
    }
    if (this.state.customerId == 0) {
      formIsValid = false;
      this.setState({ searchCompulsion: "Search field is compulsory." });
    } else {
      this.setState({ searchCompulsion: "" });
    }
    if (this.state.fileName.length > 0) {
      formIsValid = true;
    } else {
      errors["productImg"] = "Please select product image";
      formIsValid = false;
    }
    if (!this.state.claimPercentage) {
      formIsValid = false;
      errors["ClaimPercent"] = "Please select claim percentage";
    }
    return formIsValid;
  }

  handleAddStoreClaim() {
    if (this.handleValidation()) {
      const formData = new FormData();
      var selectedRow = "";
      if (this.state.SelectedItemData.length === 0) {
        for (let j = 0; j < this.state.selectedOrderData.length; j++) {
          selectedRow +=
            this.state.selectedOrderData[j]["orderMasterID"] + "|0|1,";
        }
      } else {
        for (let i = 0; i < this.state.SelectedItemData.length; i++) {
          selectedRow +=
            this.state.SelectedItemData[i]["orderItemID"] +
            "|" +
            this.state.SelectedItemData[i]["requireSize"] +
            "|0,";
        }
      }

      var paramData = {
        BrandID: this.state.selectBrand,
        CategoryID: this.state.list1Value,
        SubCategoryID: this.state.ListOfSubCate,
        IssueTypeID: this.state.ListOfIssue,
        ClaimPercent: this.state.claimPercentage,
        CustomerID: this.state.customerId,
        OrderItemID: selectedRow.substring(",", selectedRow.length - 1),
        OrderIDs: "",
        TicketID: this.state.ticketId,
        TaskID: this.state.taskId,
      };
      if (this.state.selectedOrderData.length > 0) {
        var order_data = this.state.selectedOrderData[0];
        var OrderData = {
          OrderMasterID: order_data.orderMasterID,
          OrderNumber: order_data.invoiceNumber,
          InvoiceDate: order_data.invoiceDate,
          OrderPrice: order_data.ordeItemPrice,
          PricePaid: order_data.orderPricePaid,
          CustomerID: this.state.customerId,
          Discount: order_data.discount,
          StoreCode: order_data.storeCode,
          TransactionDate: order_data.invoiceDate,
          ModeOfPaymentID: 1,
          TicketSourceID: 30,
        };
      } else {
        var OrderData = null;
      }

      var order_itemData = [];
      for (let i = 0; i < this.state.SelectedItemData.length; i++) {
        var item_data = {};
        item_data["OrderItemID"] = this.state.SelectedItemData[i][
          "orderItemID"
        ];
        item_data["OrderMasterID"] = this.state.SelectedItemData[i][
          "orderMasterID"
        ];
        item_data["ItemName"] = this.state.SelectedItemData[i]["itemName"];
        item_data["InvoiceNumber"] = this.state.SelectedItemData[i][
          "invoiceNumber"
        ];
        item_data["InvoiceDate"] = this.state.SelectedItemData[i][
          "invoiceDate"
        ];
        item_data["ItemCount"] = this.state.SelectedItemData[i]["itemCount"];
        item_data["ItemPrice"] = this.state.SelectedItemData[i]["itemPrice"];
        item_data["PricePaid"] = this.state.SelectedItemData[i]["pricePaid"];
        item_data["Size"] = this.state.SelectedItemData[i]["size"];
        item_data["RequireSize"] = this.state.SelectedItemData[i][
          "requireSize"
        ];
        item_data["Discount"] = this.state.SelectedItemData[i]["discount"];
        item_data["ArticleNumber"] = this.state.SelectedItemData[i][
          "articleNumber"
        ];
        item_data["ArticleName"] = this.state.SelectedItemData[i]["itemName"];

        order_itemData.push(item_data);
      }

      formData.append("file", this.state.fileName[0]);
      formData.append("storeClaimMaster", JSON.stringify(paramData));
      formData.append("orderDetails", JSON.stringify(OrderData));
      formData.append("orderItemDetails", JSON.stringify(order_itemData));
      let self = this;
      this.setState({ isSubmit: true });
      axios({
        method: "post",
        url: config.apiUrl + "/StoreClaim/RaiseClaim",
        headers: authHeader(),
        data: formData,
      })
        .then(function(res) {
          let status = res.data.message;
          self.setState({ isSubmit: false });
          if (status === "Success") {
            NotificationManager.success("Claim has been raised successfully");
            self.props.history.push("/store/claim");
          } else {
            NotificationManager.error(status);
          }
        })
        .catch((data) => {
          self.setState({ isSubmit: false });
          console.log(data);
        });
    } else {
      this.setState({
        errors: this.state.errors,
      });
    }
  }

  handleSearchCustomer(e) {
    const TranslationContext = this.state.translateLanguage.default;
    e.preventDefault();
    if (this.state.SrchEmailPhone !== "") {
      let self = this;
      axios({
        method: "post",
        url: config.apiUrl + "/Customer/searchCustomer",
        headers: authHeader(),
        params: {
          SearchText: this.state.SrchEmailPhone.trim(),
        },
      })
        .then(function(res) {
          var msg = res.data.message;
          if (msg === "Success") {
            let SearchData = res.data.responseData[0];
            let GetCustId = SearchData.customerID;
            self.setState({
              customerId: GetCustId,
              showClaimUI: true,
            });
            self.handleGetCustomerData(GetCustId);
          } else {
            self.setState({
              customerId: 0,
              customerData: {},
              showClaimUI: false,
            });
            NotificationManager.error(
              TranslationContext !== undefined
                ? TranslationContext.ticketingDashboard.customernotexist
                : "Customer not exist."
            );
          }
          document.getElementById("OrdPurchaseData").value = "";
          self.setState({
            orderId: "",
            billId: "",
            productBarCode: "",
            selectedTicketSource: "",
            modeOfPayment: "",
            OrderCreatDate: "",
            orderMRP: "",
            pricePaid: "",
            discount: "",
            size: "",
            requiredSize: "",
            purchaseFrmStorName: {},
            StorAddress: {},
          });
        })
        .catch((data) => {
          console.log(data);
        });
    } else {
      this.setState({
        searchCompulsion: "Search field is compulsory.",
      });
    }
  }

  handleGetCustomerData(CustId) {
    this.setState({ loading: true });
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/Customer/getcustomerdetailsbyid",
      headers: authHeader(),
      params: {
        CustomerID: CustId,
      },
    })
      .then(function(res) {
        var CustMsg = res.data.message;
        var data = res.data.responseData;
        if (CustMsg === "Success") {
          self.setState({ customerData: data, loading: false });
        } else {
          self.setState({ customerData: {}, loading: false });
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }

  handleGetOrderId = (selectParentData, selectChildData) => {
    this.setState({
      selectedOrderData: selectParentData,
      SelectedItemData: selectChildData,
    });
  };

  handleAddOrder() {
    this.setState({ showManual: !this.state.showManual });
  }
  setTicketSourceValue = (e) => {
    let value = e.currentTarget.value;
    this.setState({ selectedTicketSource: value });
  };
  handleManuallyOnchange = (e) => {
    e.preventDefault();
    this.setState({ [e.currentTarget.name]: e.currentTarget.value });
  };
  setModePaymentValue = (e) => {
    let dataValue = e.currentTarget.value;
    this.setState({ modeOfPayment: dataValue });
  };
  handleByDateCreate = (date) => {
    this.setState({ OrderCreatDate: date });
  };
  handleNumberOnchange = (e) => {
    var values = e.target.value;
    var names = e.target.name;

    if (isNaN(values)) {
      return false;
    }
    var splitText = values.split(".");
    var index = values.indexOf(".");
    if (index !== -1) {
      if (splitText) {
        if (splitText[1].length <= 2) {
          if (index !== -1 && splitText.length === 2) {
            if (names === "orderMRP") {
              this.setState({ orderMRP: values });
            } else if (names === "pricePaid") {
              this.setState({ pricePaid: values });
            } else if (names === "discount") {
              this.setState({ discount: values });
            } else if (names === "size") {
              this.setState({ size: values });
            } else if (names === "requiredSize") {
              this.setState({ requiredSize: values });
            }
          }
        } else {
          return false;
        }
      } else {
        if (names === "orderMRP") {
          this.setState({ orderMRP: values });
        } else if (names === "pricePaid") {
          this.setState({ pricePaid: values });
        } else if (names === "discount") {
          this.setState({ discount: values });
        } else if (names === "size") {
          this.setState({ size: values });
        } else if (names === "requiredSize") {
          this.setState({ requiredSize: values });
        }
      }
    } else {
      if (names === "orderMRP") {
        this.setState({ orderMRP: values });
      } else if (names === "pricePaid") {
        this.setState({ pricePaid: values });
      } else if (names === "discount") {
        this.setState({ discount: values });
      } else if (names === "size") {
        this.setState({ size: values });
      } else if (names === "requiredSize") {
        this.setState({ requiredSize: values });
      }
    }
  };
  render() {
    const TranslationContext = this.state.translateLanguage.default;
    const { orderDetailsData, customerData } = this.state;

    return (
      <Fragment>
        <div className="raiseclaim">
          <div className="row" style={{ background: "#ecf2f4", margin: 0 }}>
            <div className="col-md-8"></div>
            {this.state.showClaimUI ? (
              <div className="col-md-4">
                <div
                  className="btn-margin"
                  style={{ float: "right", marginLeft: "30px" }}
                >
                  <Link to={"/store/claim"}>
                    <button type="button" className="btn-btn-claim">
                      {TranslationContext !== undefined
                        ? TranslationContext.button.cancel
                        : "CANCEL"}
                    </button>
                  </Link>
                  <button
                    type="button"
                    className="btn-claim"
                    onClick={this.handleAddStoreClaim.bind(this)}
                    style={{ width: "155px" }}
                    disabled={this.state.isSubmit}
                  >
                    {this.state.isSubmit ? (
                      <FontAwesomeIcon
                        className="circular-loader"
                        icon={faCircleNotch}
                        spin
                      />
                    ) : null}
                    {TranslationContext !== undefined
                      ? TranslationContext.button.submitclaim
                      : "SUBMIT CLAIM"}
                  </button>
                </div>
              </div>
            ) : null}
          </div>
          <div className="back-color">
            <div className="row m-0">
              <div className="col-md-9" style={{ padding: "0" }}>
                <div className="card card-radius">
                  <div className="search-customer-padding">
                    <form
                      name="form"
                      onSubmit={this.handleSearchCustomer.bind(this)}
                    >
                      <div>
                        <div className="col-md-12">
                          <label className="label-color">
                            <b>
                              {TranslationContext !== undefined
                                ? TranslationContext.label.searchcustomerby
                                : "SEARCH CUSTOMER BY"}
                            </b>
                          </label>
                          <label>
                            {TranslationContext !== undefined
                              ? TranslationContext.div.phonenumberemailidorderid
                              : "(PHONE NUMBER, EMAIL ID, ORDER ID)"}
                            <span className="span-color">*</span>
                          </label>
                        </div>
                        <div className="col-md-12">
                          <div style={{ position: "relative" }}>
                            <input
                              type="text"
                              className="search-mobile-textbox"
                              placeholder={
                                TranslationContext !== undefined
                                  ? TranslationContext.placeholder
                                      .entercustomerdetails
                                  : "Enter Customer Details"
                              }
                              name="SrchEmailPhone"
                              value={this.state.SrchEmailPhone}
                              onChange={this.handleOnChange}
                              autoComplete="off"
                            />
                            <img
                              src={SearchBlueImg}
                              alt="Search"
                              className="searchImg"
                              onClick={this.handleSearchCustomer.bind(this)}
                            />
                          </div>
                          {this.state.searchCompulsion !== "" ? (
                            <p style={{ color: "red", marginBottom: "0px" }}>
                              {this.state.searchCompulsion}
                            </p>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                    </form>
                    {this.state.showClaimUI ? (
                      <div>
                        <div className="col-md-12">
                          <div className="claim-status-card">
                            <label>
                              <b>
                                {TranslationContext !== undefined
                                  ? TranslationContext.label.claimstatusopen
                                  : "Claim Status: Open"}
                              </b>
                            </label>
                            <div className="claimplus">
                              <span className="plusline2"></span>
                              <img
                                src={PlusImg}
                                alt="Plush"
                                className="plush-img-1"
                                onClick={this.toggle}
                              />
                            </div>
                          </div>

                          <Collapse
                            isOpen={this.state.collapse}
                            style={{
                              width: "100%",
                              border: "1px solid #eee",
                              borderRadius: "5px",
                            }}
                          >
                            <Card className="w-100">
                              <CardBody style={{ padding: "15px 0 0" }}>
                                {this.state.showManual ? null : (
                                  <div className="row m-0">
                                    <div className="col-md-6">
                                      <label className="orderdetailtext">
                                        {TranslationContext !== undefined
                                          ? TranslationContext.label
                                              .orderdetails
                                          : "Order details"}
                                      </label>
                                    </div>
                                    <div className="col-md-6">
                                      <form
                                        name="form"
                                        onSubmit={this.handleOrderSearchData.bind(
                                          this
                                        )}
                                      >
                                        <div>
                                          <input
                                            type="text"
                                            className="searchtext"
                                            placeholder={
                                              TranslationContext !== undefined
                                                ? TranslationContext.label
                                                    .searchorder
                                                : "Search Order"
                                            }
                                            name="orderNumber"
                                            value={this.state.orderNumber}
                                            onChange={this.handleOrderChange.bind(
                                              this
                                            )}
                                          />
                                          <img
                                            src={SearchBlackImg}
                                            alt="Search"
                                            className="searchImg-raise"
                                            onClick={this.handleOrderSearchData.bind(
                                              this
                                            )}
                                          />
                                        </div>
                                      </form>
                                    </div>
                                  </div>
                                )}
                                {this.state.SearchDetails ? (
                                  <div
                                    style={{
                                      borderTop: "1px solid #EEE",
                                      marginTop: "12px",
                                    }}
                                  >
                                    <div className="reacttableordermodal">
                                      <Table
                                        className="components-table-demo-nested custom-antd-table"
                                        dataSource={orderDetailsData}
                                        columns={[
                                          {
                                            title: "",

                                            render: (row, data) => {
                                              return (
                                                <div className="filter-checkbox">
                                                  <input
                                                    type="checkbox"
                                                    className="d-none"
                                                    id={
                                                      "all" + data.invoiceNumber
                                                    }
                                                    name="AllOrder"
                                                    checked={
                                                      this.state
                                                        .selectedInvoiceNo ===
                                                      data.invoiceNumber
                                                    }
                                                    onChange={this.handleGetOderItemData.bind(
                                                      this,
                                                      data.invoiceNumber,
                                                      data
                                                    )}
                                                  />
                                                  <label
                                                    htmlFor={
                                                      "all" + data.invoiceNumber
                                                    }
                                                  ></label>
                                                </div>
                                              );
                                            },
                                          },
                                          {
                                            title:
                                              TranslationContext !== undefined
                                                ? TranslationContext.span
                                                    .invoicenumber
                                                : "Invoice Number",
                                            dataIndex: "invoiceNumber",
                                          },
                                          {
                                            title:
                                              TranslationContext !== undefined
                                                ? TranslationContext.span
                                                    .invoicedate
                                                : "Invoice Date",
                                            dataIndex: "dateFormat",
                                          },
                                          {
                                            title:
                                              TranslationContext !== undefined
                                                ? TranslationContext.span
                                                    .itemcount
                                                : "Item Count",
                                            dataIndex: "itemCount",
                                          },
                                          {
                                            title:
                                              TranslationContext !== undefined
                                                ? TranslationContext.span
                                                    .itemprice
                                                : "Item Price",
                                            dataIndex: "ordeItemPrice",
                                          },
                                          {
                                            title:
                                              TranslationContext !== undefined
                                                ? TranslationContext.span
                                                    .pricepaid
                                                : "Price Paid",
                                            dataIndex: "orderPricePaid",
                                          },
                                          {
                                            title:
                                              TranslationContext !== undefined
                                                ? TranslationContext.span
                                                    .storecode
                                                : "Store Code",
                                            dataIndex: "storeCode",
                                          },
                                          {
                                            title:
                                              TranslationContext !== undefined
                                                ? TranslationContext.span
                                                    .storeaddress
                                                : "Store Address",
                                            dataIndex: "storeAddress",
                                          },
                                          {
                                            title:
                                              TranslationContext !== undefined
                                                ? TranslationContext.span
                                                    .discount
                                                : "Discount",
                                            dataIndex: "discount",
                                          },
                                        ]}
                                        expandedRowRender={(row) => {
                                          return (
                                            <Table
                                              dataSource={this.state.OrderSubItem.filter(
                                                (x) =>
                                                  x.invoiceNumber ===
                                                  row.invoiceNumber
                                              )}
                                              columns={[
                                                {
                                                  title: "",

                                                  render: (row, item) => {
                                                    return (
                                                      <div className="filter-checkbox">
                                                        <input
                                                          type="checkbox"
                                                          className="d-none"
                                                          id={
                                                            "item" +
                                                            item.articleNumber
                                                          }
                                                          name="AllItem"
                                                          checked={
                                                            this.state
                                                              .CheckBoxAllItem[
                                                              item.articleNumber
                                                            ] === true
                                                          }
                                                          onChange={this.checkIndividualItem.bind(
                                                            this,
                                                            item.articleNumber,
                                                            item
                                                          )}
                                                        />
                                                        <label
                                                          htmlFor={
                                                            "item" +
                                                            item.articleNumber
                                                          }
                                                        ></label>
                                                      </div>
                                                    );
                                                  },
                                                },
                                                {
                                                  title:
                                                    TranslationContext !==
                                                    undefined
                                                      ? TranslationContext.span
                                                          .articlenumber
                                                      : "Article Number",
                                                  dataIndex: "articleNumber",
                                                },
                                                {
                                                  title:
                                                    TranslationContext !==
                                                    undefined
                                                      ? TranslationContext.span
                                                          .articlename
                                                      : "Article Name",
                                                  dataIndex: "articleName",
                                                },
                                                {
                                                  title:
                                                    TranslationContext !==
                                                    undefined
                                                      ? TranslationContext.span
                                                          .itemprice
                                                      : "Article MRP",
                                                  dataIndex: "itemPrice",
                                                },
                                                {
                                                  title:
                                                    TranslationContext !==
                                                    undefined
                                                      ? TranslationContext.span
                                                          .pricepaid
                                                      : "Price Paid",
                                                  dataIndex: "pricePaid",
                                                },
                                                {
                                                  title:
                                                    TranslationContext !==
                                                    undefined
                                                      ? TranslationContext.span
                                                          .discount
                                                      : "Discount",
                                                  dataIndex: "discount",
                                                },
                                              ]}
                                              pagination={false}
                                            />
                                          );
                                        }}
                                        pagination={false}
                                      />
                                    </div>
                                  </div>
                                ) : this.state.showManual ? (
                                  <div>
                                    <div className="row m-b-10 m-l-10 m-r-10 m-t-10">
                                      <div className="col-md-6">
                                        <label className="addmanuallytext">
                                          {TranslationContext !== undefined
                                            ? TranslationContext.label
                                                .addmanually
                                            : "Add Manually"}
                                        </label>
                                      </div>
                                    </div>
                                    <div className="row m-b-10 m-l-10 m-r-10">
                                      <div className="col-md-6">
                                        <input
                                          type="text"
                                          className="addmanuallytext1"
                                          placeholder={
                                            TranslationContext !== undefined
                                              ? TranslationContext.label.orderid
                                              : "Order ID"
                                          }
                                          name="orderId"
                                          maxLength={10}
                                          value={this.state.orderId}
                                          onChange={this.handleManuallyOnchange}
                                        />
                                        {this.validator.message(
                                          "OrderId",
                                          this.state.orderId,
                                          "required"
                                        )}
                                      </div>
                                      <div className="col-md-6">
                                        <input
                                          type="text"
                                          className="addmanuallytext1"
                                          placeholder={
                                            TranslationContext !== undefined
                                              ? TranslationContext.label.billid
                                              : "Bill ID"
                                          }
                                          name="billId"
                                          maxLength={10}
                                          value={this.state.billId}
                                          onChange={this.handleManuallyOnchange}
                                        />
                                        {this.validator.message(
                                          "BillId",
                                          this.state.billId,
                                          "required"
                                        )}
                                      </div>
                                    </div>

                                    <div className="row m-b-10 m-l-10 m-r-10">
                                      <div className="col-md-6">
                                        <input
                                          type="text"
                                          className="addmanuallytext1"
                                          placeholder={
                                            TranslationContext !== undefined
                                              ? TranslationContext.label
                                                  .productbarcode
                                              : "Product Bar Code"
                                          }
                                          name="productBarCode"
                                          maxLength={10}
                                          value={this.state.productBarCode}
                                          onChange={this.handleManuallyOnchange}
                                          autoComplete="off"
                                        />
                                        {this.validator.message(
                                          "ProductBarCode",
                                          this.state.productBarCode,
                                          "required"
                                        )}
                                      </div>
                                      <div className="col-md-6">
                                        <select
                                          value={
                                            this.state.selectedTicketSource
                                          }
                                          onChange={this.setTicketSourceValue}
                                          className="category-select-system dropdown-label"
                                        >
                                          <option>
                                            {TranslationContext !== undefined
                                              ? TranslationContext.option
                                                  .channelofpurchase
                                              : "Channel Of Purchase"}
                                          </option>
                                          {this.state.ChannelOfPurchaseData !==
                                            null &&
                                            this.state.ChannelOfPurchaseData.map(
                                              (item, i) => (
                                                <option
                                                  key={i}
                                                  value={
                                                    item.channelOfPurchaseID
                                                  }
                                                >
                                                  {item.nameOfChannel}
                                                </option>
                                              )
                                            )}
                                        </select>
                                        {this.validator.message(
                                          "ChannelOfPurchaseData",
                                          this.state.ChannelOfPurchaseData,
                                          "required"
                                        )}
                                      </div>
                                    </div>

                                    <div className="row m-b-10 m-l-10 m-r-10">
                                      <div className="col-md-6">
                                        <select
                                          className="category-select-system dropdown-label"
                                          value={this.state.modeOfPayment}
                                          onChange={this.setModePaymentValue}
                                        >
                                          <option
                                            value=""
                                            className="select-sub-category-placeholder"
                                          >
                                            {TranslationContext !== undefined
                                              ? TranslationContext.option
                                                  .modeofpayment
                                              : "Mode Of Payment"}
                                          </option>
                                          {this.state.modeData !== null &&
                                            this.state.modeData.map(
                                              (item, i) => (
                                                <option
                                                  key={i}
                                                  value={item.paymentModeID}
                                                  className="select-category-placeholder"
                                                >
                                                  {item.paymentModename}
                                                </option>
                                              )
                                            )}
                                        </select>
                                        {this.validator.message(
                                          "ModeOfPayment",
                                          this.state.modeOfPayment,
                                          "required"
                                        )}
                                      </div>
                                      <div className="col-md-6 dapic">
                                        <DatePicker
                                          selected={this.state.OrderCreatDate}
                                          onChange={this.handleByDateCreate}
                                          placeholderText="Date"
                                          showMonthDropdown
                                          showYearDropdown
                                          className="addmanuallytext1"
                                        />
                                        {this.validator.message(
                                          "Date",
                                          this.state.OrderCreatDate,
                                          "required"
                                        )}
                                      </div>
                                    </div>

                                    <div className="row m-b-10 m-l-10 m-r-10">
                                      <div className="col-md-6">
                                        <input
                                          type="text"
                                          className="addmanuallytext1"
                                          placeholder={
                                            TranslationContext !== undefined
                                              ? TranslationContext.label.mrp
                                              : "MRP"
                                          }
                                          name="orderMRP"
                                          value={this.state.orderMRP}
                                          onChange={this.handleNumberOnchange}
                                          autoComplete="off"
                                          maxLength={10}
                                        />
                                        {this.validator.message(
                                          "mrp",
                                          this.state.orderMRP,
                                          "required"
                                        )}
                                      </div>
                                      <div className="col-md-6">
                                        <input
                                          type="text"
                                          className="addmanuallytext1"
                                          placeholder={
                                            TranslationContext !== undefined
                                              ? TranslationContext.label
                                                  .pricepaid
                                              : "Price Paid"
                                          }
                                          name="pricePaid"
                                          value={this.state.pricePaid}
                                          onChange={this.handleNumberOnchange}
                                          autoComplete="off"
                                          maxLength={10}
                                        />
                                        {this.validator.message(
                                          "PricePaid",
                                          this.state.pricePaid,
                                          "required"
                                        )}
                                      </div>
                                    </div>

                                    <div className="row m-b-10 m-l-10 m-r-10">
                                      <div className="col-md-6">
                                        <input
                                          type="text"
                                          className="addmanuallytext1"
                                          placeholder={
                                            TranslationContext !== undefined
                                              ? TranslationContext.label
                                                  .discount
                                              : "Discount"
                                          }
                                          name="discount"
                                          value={this.state.discount}
                                          onChange={this.handleNumberOnchange}
                                          autoComplete="off"
                                          maxLength={10}
                                        />
                                        {this.validator.message(
                                          "Discount",
                                          this.state.discount,
                                          "required"
                                        )}
                                      </div>
                                      <div className="col-md-6">
                                        <input
                                          type="text"
                                          className="addmanuallytext1"
                                          placeholder={
                                            TranslationContext !== undefined
                                              ? TranslationContext.label.size
                                              : "Size"
                                          }
                                          name="size"
                                          value={this.state.size}
                                          onChange={this.handleManuallyOnchange}
                                          autoComplete="off"
                                          maxLength={10}
                                        />
                                        {this.validator.message(
                                          "size",
                                          this.state.size,
                                          "required"
                                        )}
                                      </div>
                                    </div>

                                    <div className="row m-b-10 m-l-10 m-r-10">
                                      <div className="col-md-6">
                                        <input
                                          type="text"
                                          className="addmanuallytext1"
                                          placeholder={
                                            TranslationContext !== undefined
                                              ? TranslationContext.label
                                                  .requiredsize
                                              : "Required Size"
                                          }
                                          name="requiredSize"
                                          value={this.state.requiredSize}
                                          onChange={this.handleManuallyOnchange}
                                        />
                                        {this.validator.message(
                                          "RequiredSize",
                                          this.state.requiredSize,
                                          "required"
                                        )}
                                      </div>
                                      <div className="col-md-6">
                                        <ReactAutocomplete
                                          wrapperStyle={{
                                            display: "block",
                                            position: "relative",
                                          }}
                                          getItemValue={(item) =>
                                            item.storeName
                                          }
                                          items={this.state.SearchItem}
                                          renderItem={(item, isHighlighted) => (
                                            <div
                                              style={{
                                                background: isHighlighted
                                                  ? "lightgray"
                                                  : "white",
                                              }}
                                              value={item.storeID}
                                            >
                                              {item.storeName}
                                            </div>
                                          )}
                                          renderInput={(props) => {
                                            return (
                                              <input
                                                placeholder={
                                                  TranslationContext !==
                                                  undefined
                                                    ? TranslationContext.label
                                                        .purchasefromstorename
                                                    : "Purchase from Store name"
                                                }
                                                className="addmanuallytext1 dropdown-next-div"
                                                type="text"
                                                {...props}
                                              />
                                            );
                                          }}
                                          onChange={this.handlePurchaseStoreName.bind(
                                            this,
                                            "store"
                                          )}
                                          onSelect={this.HandleSelectdata.bind(
                                            this,
                                            (item) => item.storeID,
                                            "store"
                                          )}
                                          value={
                                            this.state.purchaseFrmStorName[
                                              "store"
                                            ]
                                          }
                                        />

                                        {this.validator.message(
                                          "PurchaseFrmStorAddress",
                                          this.state.purchaseFrmStorName[
                                            "store"
                                          ],
                                          "required"
                                        )}
                                        {this.state.isStoreSelect === false && (
                                          <p
                                            style={{
                                              color: "red",
                                              marginBottom: "0px",
                                            }}
                                          >
                                            {this.state.validPurchaseStoreName}
                                          </p>
                                        )}
                                      </div>
                                    </div>

                                    <div className="row m-b-10 m-l-10 m-r-10">
                                      <div className="col-md-6">
                                        <input
                                          type="text"
                                          className="addmanuallytext1"
                                          placeholder={
                                            TranslationContext !== undefined
                                              ? TranslationContext.label
                                                  .purchasefromstoreaddres
                                              : "Purchase from Store Addres"
                                          }
                                          name="purchaseFrmStorAddress"
                                          value={this.state.StorAddress.address}
                                          readOnly
                                          id="OrdPurchaseData"
                                        />
                                      </div>
                                    </div>

                                    <div className="row m-b-10 m-l-10 m-r-10">
                                      <div className="col-md-3">
                                        <button
                                          type="button"
                                          className="addmanual m-t-15"
                                          onClick={this.hadleAddManuallyOrderData.bind(
                                            this
                                          )}
                                        >
                                          {TranslationContext !== undefined
                                            ? TranslationContext.button.save
                                            : "SAVE"}
                                        </button>
                                      </div>
                                      <div className="col-md-3">
                                        <button
                                          type="button"
                                          className="addmanual m-t-15"
                                          onClick={this.handleAddOrder.bind(
                                            this
                                          )}
                                        >
                                          {TranslationContext !== undefined
                                            ? TranslationContext.button.cancel
                                            : "CANCEL"}
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                ) : (
                                  <div className="uploadsearch uploadsearch-space">
                                    <div className="row">
                                      <div className="col-md-12 uploadsechmargin">
                                        <label className="uploadsearch-text">
                                          {TranslationContext !== undefined
                                            ? TranslationContext.label
                                                .noorderfoundwiththisnumber
                                            : "No order found with this number"}
                                        </label>
                                      </div>
                                    </div>
                                    <div className="row">
                                      <div className="col-md-12 uploadsechmargin">
                                        <button
                                          type="button"
                                          className="uploadsearchbtn"
                                        >
                                          <label
                                            className="uploadsearchbtn-text"
                                            onClick={this.handleAddOrder.bind(
                                              this
                                            )}
                                          >
                                            {TranslationContext !== undefined
                                              ? TranslationContext.label
                                                  .addmanually
                                              : "ADD MANUALLY"}
                                          </label>
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </CardBody>
                            </Card>
                          </Collapse>
                        </div>
                        <div className="row m-0 w-100">
                          <div className="form-group col-md-4">
                            <label className="label-6">
                              {TranslationContext !== undefined
                                ? TranslationContext.label.brand
                                : "Brand"}
                            </label>
                            <select
                              id="inputState"
                              className="form-control dropdown-label"
                              value={this.state.selectBrand}
                              onChange={this.handleBrandChange}
                            >
                              <option value={0}>
                                {TranslationContext !== undefined
                                  ? TranslationContext.option.select
                                  : "select"}
                              </option>
                              {this.state.brandData !== null &&
                                this.state.brandData.map((item, i) => (
                                  <option
                                    key={i}
                                    value={item.brandID}
                                    className="select-category-placeholder"
                                  >
                                    {item.brandName}
                                  </option>
                                ))}
                            </select>
                            <p style={{ color: "red", marginBottom: "0px" }}>
                              {this.state.errors["Brand"]}
                            </p>
                          </div>
                          <div className="form-group col-md-4">
                            <label className="label-6">
                              {TranslationContext !== undefined
                                ? TranslationContext.label.claimcategory
                                : "Claim Category"}
                            </label>
                            <select
                              id="inputState"
                              className="form-control dropdown-label"
                              onChange={this.handleCategoryChange}
                              value={this.state.list1Value}
                            >
                              <option value={0}>
                                {TranslationContext !== undefined
                                  ? TranslationContext.option.select
                                  : "select"}
                              </option>
                              {this.state.categoryDropData !== null &&
                                this.state.categoryDropData.map((item, i) => (
                                  <option
                                    key={i}
                                    value={item.categoryID}
                                    className="select-category-placeholder"
                                  >
                                    {item.categoryName}
                                  </option>
                                ))}
                            </select>

                            <p style={{ color: "red", marginBottom: "0px" }}>
                              {this.state.errors["Category"]}
                            </p>
                          </div>
                          <div className="form-group col-md-4">
                            <label className="label-6">
                              {TranslationContext !== undefined
                                ? TranslationContext.label.subcategory
                                : "Sub Category"}
                            </label>

                            <select
                              id="inputState"
                              className="form-control dropdown-label"
                              onChange={this.handleSubCatOnChange}
                              value={this.state.ListOfSubCate}
                            >
                              <option value={0}>
                                {TranslationContext !== undefined
                                  ? TranslationContext.option.select
                                  : "select"}
                              </option>
                              {this.state.SubCategoryDropData !== null &&
                                this.state.SubCategoryDropData.map(
                                  (item, i) => (
                                    <option
                                      key={i}
                                      value={item.subCategoryID}
                                      className="select-category-placeholder"
                                    >
                                      {item.subCategoryName}
                                    </option>
                                  )
                                )}
                            </select>
                            <p style={{ color: "red", marginBottom: "0px" }}>
                              {this.state.errors["SubCategory"]}
                            </p>
                          </div>
                          <div className="form-group col-md-4">
                            <label className="label-6">
                              {TranslationContext !== undefined
                                ? TranslationContext.option.claimtype
                                : "Claim Type"}
                            </label>
                            <select
                              id="inputState"
                              className="form-control dropdown-label"
                              onChange={this.handleIssueOnChange}
                              value={this.state.ListOfIssue}
                            >
                              <option value={0}>
                                {TranslationContext !== undefined
                                  ? TranslationContext.option.select
                                  : "select"}
                              </option>
                              {this.state.ListOfIssueData !== null &&
                                this.state.ListOfIssueData.map((item, i) => (
                                  <option
                                    key={i}
                                    value={item.issueTypeID}
                                    className="select-category-placeholder"
                                  >
                                    {item.issueTypeName}
                                  </option>
                                ))}
                            </select>
                            <p style={{ color: "red", marginBottom: "0px" }}>
                              {this.state.errors["IssueType"]}
                            </p>
                          </div>
                        </div>
                        <div className="row m-0">
                          <div className="form-group col-md-4">
                            <label className="label-6">
                              {TranslationContext !== undefined
                                ? TranslationContext.label.claimaskedfor
                                : "Claim Asked for %"}
                            </label>
                            <input
                              type="text"
                              className="form-control textBox"
                              placeholder={
                                TranslationContext !== undefined
                                  ? TranslationContext.label.claimpercentage
                                  : "Claim Percentage"
                              }
                              name="claimPercentage"
                              onKeyUp={this.handlePercentageOnChange}
                              value={this.state.claimPercentage}
                              onChange={this.handleOnChange}
                              autoComplete="off"
                            />
                            <p style={{ color: "red", marginBottom: "0px" }}>
                              {this.state.errors["ClaimPercent"]}
                            </p>
                          </div>
                          <div
                            className="col-md-4"
                            style={{ marginTop: "44px" }}
                          >
                            <input
                              id="file-upload"
                              className="d-none file-uploadprofile"
                              type="file"
                              accept="image/*"
                              onChange={this.fileUpload.bind(this)}
                            />
                            <label
                              htmlFor="file-upload"
                              className=" form-control btn-btn-claim"
                              style={{ marginTop: "0" }}
                            >
                              {TranslationContext !== undefined
                                ? TranslationContext.label.attachproductimage
                                : "Attach Product Image"}
                            </label>
                            <p style={{ color: "red", marginBottom: "0px" }}>
                              {this.state.errors["productImg"]}
                            </p>
                          </div>
                        </div>
                        <div className="row m-0">
                          <div className="form-group col-md-4">
                            <label className="label-6">
                              {TranslationContext !== undefined
                                ? TranslationContext.label.attachedimage
                                : "Attached Image"}
                            </label>
                          </div>
                        </div>
                        <div className="col-md-12">
                          {this.state.imageUrl ? (
                            <img
                              src={this.state.imageUrl}
                              alt="Bata"
                              className="batashoes"
                            />
                          ) : null}
                        </div>
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
              {this.state.showClaimUI ? (
                <>
                  <div className="col-md-3">
                    <div
                      className="card card-radius2"
                      style={{ padding: "20px" }}
                    >
                      <label>
                        <b>
                          {TranslationContext !== undefined
                            ? TranslationContext.b.customername
                            : "CUSTOMER NAME"}
                        </b>
                      </label>

                      <label>
                        {customerData.customerName ? (
                          <span className="a">
                            {customerData.customerName.charAt(0).toUpperCase()}
                          </span>
                        ) : (
                          ""
                        )}
                        {customerData.customerName}
                      </label>
                      <br />
                      <label>
                        <b>
                          {TranslationContext !== undefined
                            ? TranslationContext.b.phonenumber
                            : "PHONE NUMBER"}
                        </b>
                      </label>
                      <label>{customerData.customerPhoneNumber}</label>
                      <br />
                      <label>
                        <b>
                          {TranslationContext !== undefined
                            ? TranslationContext.b.alternatenumber
                            : "ALTERNATE NUMBER"}
                        </b>
                      </label>
                      <label>{customerData.altNumber}</label>
                      <br />
                      <label>
                        <b>
                          {TranslationContext !== undefined
                            ? TranslationContext.b.email
                            : "EMAIL"}
                        </b>
                      </label>
                      <label>{customerData.customerEmailId}</label>
                      <br />
                      <label>
                        <b>
                          {TranslationContext !== undefined
                            ? TranslationContext.b.alternateemail
                            : "ALTERNATE EMAIL"}
                        </b>
                      </label>
                      <label>{customerData.altEmailID}</label>
                      <br />
                      <label>
                        <b>
                          {TranslationContext !== undefined
                            ? TranslationContext.b.gender
                            : "GENDER"}
                        </b>
                      </label>
                      {this.state.ticketId > 0 ? (
                        <label>{customerData.gender}</label>
                      ) : (
                        <label>
                          {customerData.genderID == 1
                            ? "MALE"
                            : customerData.genderID == 2
                            ? "FEMALE"
                            : "OTHER"}
                        </label>
                      )}
                      <br />
                    </div>
                  </div>
                </>
              ) : null}
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default RaiseClaim;
