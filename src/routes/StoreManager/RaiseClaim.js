import React, { Component, Fragment } from "react";
import { Collapse, CardBody, Card } from "reactstrap";
// import TableDemo from "../TableDemo";
import BataShoes from "./../../assets/Images/Bata-shoes.jpg";
import SearchBlueImg from "./../../assets/Images/search-blue.png";
import ArrowImg from "./../../assets/Images/arrow.png";
import PlusImg from "./../../assets/Images/plus.png";
import Headphone2Img from "./../../assets/Images/headphone2.png";
import SearchBlackImg from "./../../assets/Images/searchBlack.png";
import axios from "axios";
import config from "../../helpers/config";
import { authHeader } from "../../helpers/authHeader";
import { Select, Table } from "antd";
import { NotificationManager } from "react-notifications";
import { Link } from "react-router-dom";
import ReactAutocomplete from "react-autocomplete";
import DatePicker from "react-datepicker";
import SimpleReactValidator from "simple-react-validator";
const { Option } = Select;
const NEW_ITEM = "NEW_ITEM";

class RaiseClaim extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
  }
  ////handle select store
  HandleSelectdata(e, field, value, id) {
    //
    let SearchData = this.state.SearchData;
    SearchData[field] = value;

    var StorAddress = this.state.StorAddress;
    StorAddress["address"] = id.address;
    var Store_Id = id.storeID;

    this.setState({
      SearchData,
      StorAddress,
      purchaseFrmStorID: Store_Id,
    });
  }

  ////handle get purchase store name
  handlePurchaseStoreName(field, e) {
    //
    let self = this;
    let SearchData = this.state.purchaseFrmStorName;
    SearchData[field] = e.target.value;

    if (SearchData[field].length > 3) {
      axios({
        method: "post",
        url: config.apiUrl + "/Store/getStores",
        headers: authHeader(),
        params: {
          SearchText: SearchData[field],
        },
      })
        .then(function(res) {
          //
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
        //
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
        debugger;
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

          self.handleOrderSearchData("1", self);
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

  handleCategoryChange = (value) => {
    if (value !== NEW_ITEM) {
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

  handleSubCatOnChange = (value) => {
    if (value !== NEW_ITEM) {
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

  handleIssueOnChange = (value) => {
    if (value !== NEW_ITEM) {
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

  handleOrderSearchData(OrdData, e) {
    let self = this;
    var CustID = this.state.customerId;
    debugger;
    if (OrdData === "1") {
      if (this.state.ticketId == 0) {
        e.preventDefault();
      }

      if (this.state.custAttachOrder === 0) {
        // if (this.state.orderNumber.length > 0) {
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
            let Msg = res.data.message;
            let mainData = res.data.responseData;

            // var OrderSubItem = [];

            // for (let i = 0; i < mainData.length; i++) {
            //   if (mainData[i].orderItems.length > 0) {
            //     for (let j = 0; j < mainData[i].orderItems.length; j++) {
            //       OrderSubItem.push(mainData[i].orderItems[j]);
            //     }
            //   }
            // }
            self.setState({
              message: Msg,
              orderDetailsData: mainData,
              // OrderSubItem,
            });
          })
          .catch((data) => {
            console.log(data);
          });
        // } else {
        //   self.setState({
        //     validOrdernumber: "Please Enter Order Number"
        //   });
        // }
      }
    } else if (OrdData === "2") {
      if (this.state.custAttachOrder === 0) {
        // if (this.state.ModalorderNumber.length > 0) {
        axios({
          method: "post",
          url: config.apiUrl + "/Order/getOrderListWithItemDetails",
          headers: authHeader(),
          params: {
            OrderNumber: this.state.ModalorderNumber,
            CustomerID: CustID,
          },
        })
          .then(function(res) {
            //
            let Msg = res.data.message;
            let mainData = res.data.responseData;

            // var OrderSubItem = [];

            // for (let i = 0; i < mainData.length; i++) {
            //   if (mainData[i].orderItems.length > 0) {
            //     for (let j = 0; j < mainData[i].orderItems.length; j++) {
            //       OrderSubItem.push(mainData[i].orderItems[j]);
            //     }
            //   }
            // }
            self.setState({
              message: Msg,
              orderDetailsData: mainData,
              // OrderSubItem,
            });
          })
          .catch((data) => {
            console.log(data);
          });
        // } else {
        //   self.setState({
        //     validMdlOrdernumber: "Please Enter Order Number",
        //   });
        // }
      }
    } else {
      axios({
        method: "post",
        url: config.apiUrl + "/Order/getOrderListWithItemDetails",
        headers: authHeader(),
        params: {
          OrderNumber: OrdData,
          CustomerID: CustID,
        },
      })
        .then(function(res) {
          // let Msg = res.data.message;
          let mainData = res.data.responseData;

          self.handleChangeToggle();
          // var OrderSubItem = [];

          // for (let i = 0; i < mainData.length; i++) {
          //   if (mainData[i].orderItems.length > 0) {
          //     for (let j = 0; j < mainData[i].orderItems.length; j++) {
          //       OrderSubItem.push(mainData[i].orderItems[j]);
          //     }
          //   }
          // }
          self.setState({
            message: "Success",
            orderDetailsData: mainData,
            // OrderSubItem,
            orderNumber: "",
          });
        })
        .catch((data) => {
          console.log(data);
        });
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

  checkIndividualItem(invoiceNumber, rowData) {
    const newSelected = Object.assign({}, this.state.CheckBoxAllItem);
    newSelected[invoiceNumber] = !this.state.CheckBoxAllItem[invoiceNumber];
    this.setState({
      CheckBoxAllItem: invoiceNumber ? newSelected : false,
    });
    var selectedRow = [];
    if (this.state.SelectedAllItem.length === 0) {
      selectedRow.push(rowData);
      this.setState({
        SelectedAllItem: selectedRow,
      });
    } else {
      if (newSelected[invoiceNumber] === true) {
        for (var i = 0; i < this.state.SelectedAllItem.length; i++) {
          selectedRow = this.state.SelectedAllItem;
          selectedRow.push(rowData);
          var Order_Master = this.state.OrderSubItem.filter(
            (x) =>
              x.orderMasterID === this.state.SelectedAllItem[i].orderMasterID
          );
          if (Order_Master.length === selectedRow.length) {
            const newSelected = Object.assign({}, this.state.CheckBoxAllOrder);
            newSelected[Order_Master[0].orderMasterID] = !this.state
              .CheckBoxAllOrder[Order_Master[0].orderMasterID];
            this.setState({
              CheckBoxAllOrder: Order_Master[0].orderMasterID
                ? newSelected
                : false,
            });
            var data_master = this.state.orderDetailsData.filter(
              (y) => y.orderMasterID === Order_Master[0].orderMasterID
            );
            if (data_master.length > 0) {
              var MastOrd = this.state.SelectedAllOrder;
              MastOrd.push(data_master[0]);
              this.setState({
                SelectedAllOrder: MastOrd,
              });
            }
          }
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
              var data_master = this.state.orderDetailsData.filter(
                (y) => y.orderMasterID === Order_Master[0].orderMasterID
              );
              var GetIndex = this.state.orderDetailsData.findIndex(
                (y) => y.orderMasterID === Order_Master[0].orderMasterID
              );
              if (data_master.length > 0) {
                var MastOrd = this.state.SelectedAllOrder;
                MastOrd.splice(GetIndex, 1);
                this.setState({
                  SelectedAllOrder: MastOrd,
                });
              }
            }

            break;
          }
        }
      }
    }
    this.setState({
      SelectedAllItem: selectedRow,
    });
    {
      this.props.getItemOrderData(selectedRow);
    }
  }

  handleOnChange(e) {
    if (e.currentTarget.value !== "") {
      if (e.currentTarget.name === "claimPercentage") {
        this.state.errors["ClaimPercent"] = "";
        this.setState({
          [e.currentTarget.name]: e.currentTarget.value,
          errors: this.state.errors,
        });
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
    } else {
      errors["productImg"] = "Please select product image";
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
      var paramData = {
        BrandID: this.state.selectBrand,
        CategoryID: this.state.list1Value,
        SubCategoryID: this.state.ListOfSubCate,
        IssueTypeID: this.state.ListOfIssue,
        ClaimPercent: this.state.claimPercentage,
        CustomerID: this.state.customerId,
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

      var item_data = {};
      var order_itemData = [];
      for (let i = 0; i < this.state.SelectedItemData.length; i++) {
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
      axios({
        method: "post",
        url: config.apiUrl + "/StoreClaim/RaiseClaim",
        headers: authHeader(),
        data: formData,
      })
        .then(function(res) {
          let status = res.data.message;
          let data = res.data.responseData;
          if (status === "Success") {
            NotificationManager.success("Record saved successfully");
            self.props.history.push("/store/claim");
          } else {
            NotificationManager.error(res.data.message);
          }
        })
        .catch((data) => {
          console.log(data);
        });
    } else {
      this.setState({
        errors: this.state.errors,
      });
    }
  }

  handleSearchCustomer(e) {
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
          let SearchData = res.data.responseData[0];
          if (SearchData) {
            let GetCustId = SearchData.customerID;
            self.setState({
              customerId: GetCustId,
              // message: res.data.message
            });
            self.handleGetCustomerData(GetCustId);
          }
          // else {
          //   var filter = Number(self.state.SrchEmailPhone.trim());
          //   if (filter) {
          //     self.setState({
          //       customerPhoneNumber: self.state.SrchEmailPhone.trim()
          //     });
          //   } else {
          //     self.setState({
          //       customerEmailId: self.state.SrchEmailPhone.trim()
          //     });
          //   }
          //   self.setState({
          //     message: res.data.message
          //   });
          //   // NotificationManager.error(res.data.message);
          // }
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
        var customerData = res.data.responseData;
        // CustData.customerPhone = CustData.customerPhoneNumber;
        // CustData.customername = CustData.customerName;
        // CustData.custEmailId = CustData.customerEmailId;
        // CustData.altNo = CustData.altNumber;
        // CustData.altEmail = CustData.altEmailID;
        // CustData.editDOB = CustData.dob;

        if (CustMsg === "Success") {
          self.setState({ customerData: customerData, loading: false });
          self.handleEditCustomerClose();
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
  render() {
    const { orderDetailsData, customerData } = this.state;

    const list1SelectOptions = this.state.categoryDropData.map((item, o) => (
      <Option key={o} value={item.categoryID}>
        {item.categoryName}
      </Option>
    ));

    const listSubCategory = this.state.SubCategoryDropData.map((item, o) => (
      <Option key={o} value={item.subCategoryID}>
        {item.subCategoryName}
      </Option>
    ));

    const listOfIssueType = this.state.ListOfIssueData.map((item, i) => (
      <Option key={i} value={item.issueTypeID}>
        {item.issueTypeName}
      </Option>
    ));

    return (
      <Fragment>
        <div className="raiseclaim">
          <div className="row" style={{ background: "#ecf2f4" }}>
            <div className="col-md-8">
              <label className="claim-ticket">Claim Ticket ID :</label>
              <label className="claim-A22345">
                <b>{this.state.ticketId}</b>
              </label>
            </div>
            <div className="col-md-4">
              <div
                className="btn-margin"
                style={{ float: "right", marginLeft: "30px" }}
              >
                <Link to={"/store/claim"}>
                  <button type="button" className="btn-btn-claim">
                    CANCEL
                  </button>
                </Link>
                <button
                  type="button"
                  className="btn-claim"
                  onClick={this.handleAddStoreClaim.bind(this)}
                >
                  SUBMIT CLAIM
                </button>
              </div>
            </div>
          </div>
          <div className="back-color">
            <div className="row">
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
                            <b>SEARCH CUSTOMER BY</b>
                          </label>
                          <label>
                            (PHONE NUMBER, EMAIL ID, ORDER ID)
                            <span className="span-color">*</span>
                          </label>
                        </div>
                        <div className="col-md-12">
                          <div style={{ position: "relative" }}>
                            <input
                              type="text"
                              className="search-mobile-textbox"
                              placeholder="Enter Phone Number"
                              name="SrchEmailPhone"
                              value={this.state.SrchEmailPhone}
                              onChange={this.handleOnChange}
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
                    <div className="col-md-12">
                      <div className="claim-status-card">
                        <label>
                          <b>Claim Status: Open</b>
                        </label>
                        <div className="claimplus">
                          <span className="plusline1new"></span>
                          <img
                            src={ArrowImg}
                            alt="Arrow"
                            className="arrow-img-1"
                          />
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
                        <Card>
                          <CardBody style={{ padding: "15px 0 0" }}>
                            {this.state.showManual ? null : (
                              <div className="row">
                                <div className="col-md-6">
                                  <label className="orderdetailtext">
                                    Order details
                                  </label>
                                </div>
                                <div className="col-md-6">
                                  <form
                                    name="form"
                                    onSubmit={this.handleOrderSearchData.bind(
                                      this,
                                      "1"
                                    )}
                                  >
                                    <div>
                                      <input
                                        type="text"
                                        className="searchtext"
                                        placeholder="Search Order"
                                        name="ModalorderNumber"
                                        value={this.state.ModalorderNumber}
                                        onChange={this.handleOrderChange.bind(
                                          this
                                        )}
                                      />
                                      <img
                                        src={SearchBlackImg}
                                        alt="Search"
                                        className="searchImg-raise"
                                        onClick={this.handleShowSearchDetails.bind(
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
                                        // dataIndex: "invoiceNumber",
                                        render: (row, data) => {
                                          // //
                                          return (
                                            <div className="filter-checkbox">
                                              <input
                                                type="checkbox"
                                                className="d-none"
                                                id={"all" + data.invoiceNumber}
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
                                        title: "Invoice Number",
                                        dataIndex: "invoiceNumber",
                                      },
                                      {
                                        title: "Invoice Date",
                                        dataIndex: "dateFormat",
                                      },
                                      {
                                        title: "Item Count",
                                        dataIndex: "itemCount",
                                      },
                                      {
                                        title: "Item Price",
                                        dataIndex: "ordeItemPrice",
                                      },
                                      {
                                        title: "Price Paid",
                                        dataIndex: "orderPricePaid",
                                      },
                                      {
                                        title: "Store Code",
                                        dataIndex: "storeCode",
                                      },
                                      {
                                        title: "Store Address",
                                        dataIndex: "storeAddress",
                                      },
                                      {
                                        title: "Discount",
                                        dataIndex: "discount",
                                      },
                                    ]}
                                    expandedRowRender={(row) => {
                                      return (
                                        <Table
                                          // dataSource={this.state.OrderSubItem}
                                          dataSource={this.state.OrderSubItem.filter(
                                            (x) =>
                                              x.invoiceNumber ===
                                              row.invoiceNumber
                                          )}
                                          columns={[
                                            {
                                              title: "",
                                              // dataIndex: "invoiceNumber",
                                              render: (row, item) => {
                                                // //
                                                return (
                                                  <div className="filter-checkbox">
                                                    <input
                                                      type="checkbox"
                                                      className="d-none"
                                                      id={
                                                        "item" +
                                                        item.invoiceNumber
                                                      }
                                                      name="AllItem"
                                                      checked={
                                                        this.state
                                                          .CheckBoxAllItem[
                                                          item.invoiceNumber
                                                        ] === true
                                                      }
                                                      onChange={this.checkIndividualItem.bind(
                                                        this,
                                                        item.invoiceNumber,
                                                        item
                                                      )}
                                                    />
                                                    <label
                                                      htmlFor={
                                                        "item" +
                                                        item.invoiceNumber
                                                      }
                                                    ></label>
                                                  </div>
                                                );
                                              },
                                            },
                                            {
                                              title: "Article Number",
                                              dataIndex: "articleNumber",
                                            },
                                            {
                                              title: "Article Name",
                                              dataIndex: "articleName",
                                            },
                                            {
                                              title: "Article MRP",
                                              dataIndex: "itemPrice",
                                            },
                                            {
                                              title: "Price Paid",
                                              dataIndex: "pricePaid",
                                            },
                                            {
                                              title: "Discount",
                                              dataIndex: "discount",
                                            },
                                          ]}
                                          // rowSelection={rowSelection}
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
                                      Add Manually
                                    </label>
                                  </div>
                                </div>
                                <div className="row m-b-10 m-l-10 m-r-10">
                                  <div className="col-md-6">
                                    <input
                                      type="text"
                                      className="addmanuallytext1"
                                      placeholder="Order ID"
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
                                      placeholder="Bill ID"
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
                                      placeholder="Product Bar Code"
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
                                    {/* <select
                    value={this.state.selectedTicketSource}
                    onChange={this.setTicketSourceValue}
                    className="category-select-system dropdown-label"
                  >
                    <option>Sources</option>
                    {this.state.TicketSourceData !== null &&
                      this.state.TicketSourceData.map((item, i) => (
                        <option key={i} value={item.ticketSourceId}>
                          {item.ticketSourceName}
                        </option>
                      ))}
                  </select> */}
                                    <select
                                      value={this.state.selectedTicketSource}
                                      onChange={this.setTicketSourceValue}
                                      className="category-select-system dropdown-label"
                                    >
                                      <option>Channel Of Purchase</option>
                                      {this.state.ChannelOfPurchaseData !==
                                        null &&
                                        this.state.ChannelOfPurchaseData.map(
                                          (item, i) => (
                                            <option
                                              key={i}
                                              value={item.channelOfPurchaseID}
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
                                        Mode Of Payment
                                      </option>
                                      {this.state.modeData !== null &&
                                        this.state.modeData.map((item, i) => (
                                          <option
                                            key={i}
                                            value={item.paymentModeID}
                                            className="select-category-placeholder"
                                          >
                                            {item.paymentModename}
                                          </option>
                                        ))}
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
                                      placeholder="MRP"
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
                                      placeholder="Price Paid"
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
                                      placeholder="Discount"
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
                                      placeholder="Size"
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
                                      placeholder="Required Size"
                                      name="requiredSize"
                                      value={this.state.requiredSize}
                                      onChange={this.handleManuallyOnchange}
                                      autoComplete="off"
                                    />
                                    {this.validator.message(
                                      "RequiredSize",
                                      this.state.requiredSize,
                                      "required"
                                    )}
                                  </div>
                                  <div className="col-md-6">
                                    <ReactAutocomplete
                                      wrapperStyle={{ display: "block" }}
                                      getItemValue={(item) => item.storeName}
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
                                      renderInput={function(props) {
                                        return (
                                          <input
                                            placeholder="Purchase from Store name"
                                            className="addmanuallytext1"
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
                                        this.state.purchaseFrmStorName["store"]
                                      }
                                    />

                                    {this.validator.message(
                                      "PurchaseFrmStorAddress",
                                      this.state.purchaseFrmStorName["store"],
                                      "required"
                                    )}
                                    {this.state.purchaseFrmStorID === 0 && (
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
                                      placeholder="Purchase from Store Addres"
                                      name="purchaseFrmStorAddress"
                                      value={this.state.StorAddress.address}
                                      readOnly
                                    />
                                  </div>
                                </div>

                                <div className="row m-b-10 m-l-10 m-r-10">
                                  <div className="col-md-3">
                                    <button
                                      type="button"
                                      className="addmanual m-t-15"
                                      // onClick={this.hadleAddManuallyOrderData.bind(
                                      //   this
                                      // )}
                                    >
                                      SAVE
                                    </button>
                                  </div>
                                  <div className="col-md-3">
                                    <button
                                      type="button"
                                      className="addmanual m-t-15"
                                      onClick={this.handleAddOrder.bind(this)}
                                    >
                                      CANCEL
                                    </button>
                                  </div>
                                </div>
                              </div>
                            ) : (
                              <div className="uploadsearch">
                                <div className="row">
                                  <div className="col-md-12 uploadsechmargin">
                                    <label className="uploadsearch-text">
                                      No order found with this number
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
                                        for="file-upload"
                                        className="uploadsearchbtn-text"
                                        onClick={this.handleAddOrder.bind(this)}
                                      >
                                        ADD MANUALLY
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
                    <div className="row">
                      <div className="form-group col-md-4">
                        <label className="label-6">Brand</label>
                        <select
                          id="inputState"
                          className="form-control dropdown-label"
                          value={this.state.selectBrand}
                          onChange={this.handleBrandChange}
                        >
                          <option value={0}>select</option>
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
                        <label className="label-6">Claim Category</label>

                        <Select
                          showSearch={true}
                          value={this.state.list1Value}
                          style={{ width: "100%" }}
                          onChange={this.handleCategoryChange}
                          className="form-control dropdown-label"
                        >
                          {list1SelectOptions}
                        </Select>
                        <p style={{ color: "red", marginBottom: "0px" }}>
                          {this.state.errors["Category"]}
                        </p>
                      </div>
                      <div className="form-group col-md-4">
                        <label className="label-6">Sub Category</label>

                        <Select
                          showSearch={true}
                          value={this.state.ListOfSubCate}
                          style={{ width: "100%" }}
                          onChange={this.handleSubCatOnChange}
                        >
                          {listSubCategory}
                        </Select>
                        <p style={{ color: "red", marginBottom: "0px" }}>
                          {this.state.errors["SubCategory"]}
                        </p>
                      </div>
                      <div className="form-group col-md-4">
                        <label className="label-6">Claim Type</label>

                        <Select
                          showSearch={true}
                          value={this.state.ListOfIssue}
                          style={{ width: "100%" }}
                          onChange={this.handleIssueOnChange}
                        >
                          {listOfIssueType}
                        </Select>
                        <p style={{ color: "red", marginBottom: "0px" }}>
                          {this.state.errors["IssueType"]}
                        </p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="form-group col-md-4">
                        <label className="label-6"> Claim Asked for %</label>
                        <input
                          type="text"
                          className="form-control textBox"
                          placeholder="Claim Percentage"
                          name="claimPercentage"
                          value={this.state.claimPercentage}
                          onChange={this.handleOnChange}
                        />
                        <p style={{ color: "red", marginBottom: "0px" }}>
                          {this.state.errors["ClaimPercent"]}
                        </p>
                      </div>
                      <div className="col-md-4" style={{ marginTop: "44px" }}>
                        <input
                          id="file-upload"
                          className="d-none file-uploadprofile"
                          type="file"
                          onChange={this.fileUpload.bind(this)}
                        />
                        <label
                          htmlFor="file-upload"
                          className=" form-control btn-btn-claim"
                          style={{ marginTop: "0" }}
                        >
                          Attach Product Image
                        </label>
                        <p style={{ color: "red", marginBottom: "0px" }}>
                          {this.state.errors["productImg"]}
                        </p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="form-group col-md-4">
                        <label className="label-6">Attached Image</label>
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
                </div>
              </div>
              <div className="col-md-3">
                <div className="card card-radius2" style={{ padding: "20px" }}>
                  <label>
                    <b>CUSTOMER NAME</b>
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
                    <b>PHONE NUMBER</b>
                  </label>
                  <label>{customerData.customerPhoneNumber}</label>
                  <br />
                  <label>
                    <b>ALTERNATE NUMBER</b>
                  </label>
                  <label>{customerData.altNumber}</label>
                  <br />
                  <label>
                    <b>EMAIL</b>
                  </label>
                  <label>{customerData.customerEmailId}</label>
                  <br />
                  <label>
                    <b>ALTERNATE EMAIL</b>
                  </label>
                  <label>{customerData.altEmailID}</label>
                  <br />
                  <label>
                    <b>GENDER</b>
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
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default RaiseClaim;
