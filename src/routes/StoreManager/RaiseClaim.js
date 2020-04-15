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
      ListOfIssueData: [],
      ModalorderNumber: "",
      custAttachOrder: 0,
      orderDetailsData: [],
      OrderSubItem: [],
      OrderSubComponent: [],
      selectedDataRow: [],
      CheckBoxAllItem: {},
      CheckBoxAllOrder: {},
      commentData: [],
      claimPercentage:"",
      fileName: [],
      SrchEmailPhone: "",
      customerId: 0,
      customerData: {},
      SelectedAllOrder: [],
      SelectedAllItem: [],
      selectedOrderData: [],
      SelectedItemData: []
    };
    this.toggle = this.toggle.bind(this);
    this.handleGetBrandList = this.handleGetBrandList.bind(this);
    this.handleGetCategoryList = this.handleGetCategoryList.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
  }
  toggle() {
    this.setState(state => ({ collapse: !state.collapse }));
  }
  handleShowSearchDetails() {
    this.setState({
      SearchDetails: !this.state.SearchDetails
    });
  }

  componentDidMount() {
    this.handleGetBrandList();
    this.handleGetStoreClaimComments();
  }

  handleBrandChange = e => {
    debugger;
    let value = e.target.value;
    this.setState({
      selectBrand: value,
      categoryDropData: [],
      SubCategoryDropData: [],
      ListOfIssueData: [],
      claimComments:""
    });
    setTimeout(() => {
      if (this.state.selectBrand) {
        this.handleGetCategoryList();
      }
    }, 1);
  };

  handleGetBrandList() {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/Brand/GetBrandList",
      headers: authHeader()
    })
      .then(function(res) {
        debugger;
        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success") {
          self.setState({ brandData: data });
        } else {
          self.setState({ brandData: [] });
        }
      })
      .catch(data => {
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
        BrandID: braindID
      }
    })
      .then(function(res) {
        debugger;
        let data = res.data;
        self.setState({ categoryDropData: data });
      })
      .catch(data => {
        console.log(data);
      });
  };

  handleCategoryChange = value => {
    debugger;
    if (value !== NEW_ITEM) {
      this.setState({ list1Value: value, SubCategoryDropData: [] });
      setTimeout(() => {
        if (this.state.list1Value) {
          this.handleGetSubCategoryList(value);
        }
      }, 10);
    } else {
      this.setState({ showList1: true });
    }
  };

  handleGetSubCategoryList = async id => {
    debugger;
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
        CategoryID: Category_Id
      }
    })
      .then(function(res) {
        debugger;
        let data = res.data.responseData;
        self.setState({ SubCategoryDropData: data });
      })
      .catch(data => {
        console.log(data);
      });
  };

  handleSubCatOnChange = value => {
    debugger;
    if (value !== NEW_ITEM) {
      this.setState({ ListOfSubCate: value });
      setTimeout(() => {
        if (this.state.ListOfSubCate) {
          this.handleGetIssueTypeList();
        }
      }, 1);
    } else {
      this.setState({ ShowSubCate: true });
    }
  };

  handleGetIssueTypeList(id) {
    debugger;
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
        SubCategoryID: SubCat_Id
      }
    })
      .then(function(res) {
        debugger;
        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success") {
          self.setState({ ListOfIssueData: data });
        } else {
          self.setState({ ListOfIssueData: [] });
        }
      })
      .catch(data => {
        console.log(data);
      });
  }

  handleIssueOnChange = value => {
    debugger;
    if (value !== NEW_ITEM) {
      this.setState({ ListOfIssue: value });
    } else {
      this.setState({ ShowIssuetype: true });
    }
  };

  handleGetBrandList() {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/Brand/GetBrandList",
      headers: authHeader()
    })
      .then(function(res) {
        debugger;
        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success") {
          self.setState({ brandData: data });
        } else {
          self.setState({ brandData: [] });
        }
      })
      .catch(data => {
        console.log(data);
      });
  }

  handleOrderChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleOrderSearchData(OrdData, e) {
    debugger;
    let self = this;
    var CustID = this.props.custDetails;

    if (OrdData === "1") {
      e.preventDefault();
      if (this.state.custAttachOrder === 0) {
        // if (this.state.orderNumber.length > 0) {
        axios({
          method: "post",
          url: config.apiUrl + "/Order/getOrderListWithItemDetails",
          headers: authHeader(),
          params: {
            OrderNumber: this.state.orderNumber,
            CustomerID: 244
          }
        })
          .then(function(res) {
            debugger;
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
              orderDetailsData: mainData
              // OrderSubItem,
            });
          })
          .catch(data => {
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
            CustomerID: CustID
          }
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
              orderDetailsData: mainData
              // OrderSubItem,
            });
          })
          .catch(data => {
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
          CustomerID: CustID
        }
      })
        .then(function(res) {
          debugger;
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
            orderNumber: ""
          });
        })
        .catch(data => {
          console.log(data);
        });
    }
  }

  handleGetOderItemData(invoiceNumber, rowData, e) {
    debugger;
    if (e.target.checked) {
      this.setState({
        SelectedAllOrder: [],
        SelectedAllItem: [],
        OrderSubItem: [],
        selectedInvoiceNo:""
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
          InvoiceDate: rowData.invoiceDate
        }
      })
        .then(function(res) {
          debugger;
          let Msg = res.data.message;
          let data = res.data.responseData;
          if (Msg === "Success") {
            self.setState({
              OrderSubItem: data
            });
            var selectedInvoiceNo = invoiceNumber;
            const newSelected = Object.assign({}, self.state.CheckBoxAllOrder);
            newSelected[invoiceNumber] = !self.state.CheckBoxAllOrder[
              invoiceNumber
            ];
            self.setState({
              CheckBoxAllOrder: newSelected,
              selectedInvoiceNo
            });
            var selectedRow = [];
            var CselectedRow = [];
            if (self.state.SelectedAllOrder.length === 0) {
              selectedRow.push(rowData);
              var Order_Master = self.state.OrderSubItem.filter(
                x => x.invoiceNumber === invoiceNumber
              );
              if (Order_Master.length > 0) {
                var objCheckBoxAllItem = new Object();
                for (let j = 0; j < Order_Master.length; j++) {
                  objCheckBoxAllItem[Order_Master[j].invoiceNumber] = true;

                  CselectedRow.push(Order_Master[j]);
                }
                self.setState({
                  CheckBoxAllItem: objCheckBoxAllItem
                });
              }
              self.setState({
                SelectedAllOrder: selectedRow,
                SelectedAllItem: CselectedRow
              });
            } else {
              if (newSelected[invoiceNumber] === true) {
                for (var i = 0; i < self.state.SelectedAllOrder.length; i++) {
                  if (self.state.SelectedAllOrder[i] === rowData) {
                    selectedRow = self.state.SelectedAllOrder;
                    selectedRow.push(rowData);
                    var Order_Master = self.state.OrderSubItem.filter(
                      x => x.invoiceNumber === invoiceNumber
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
                        CheckBoxAllItem: objCheckBoxAllItem
                      });
                    }

                    self.setState({
                      SelectedAllOrder: selectedRow,
                      SelectedAllItem: CselectedRow
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
                      x => x.invoiceNumber === invoiceNumber
                    );
                    if (Order_Master.length > 0) {
                      var objCheckBoxAllItem = new Object();
                      for (let j = 0; j < Order_Master.length; j++) {
                        objCheckBoxAllItem[
                          Order_Master[j].invoiceNumber
                        ] = false;
                      }
                      self.setState({
                        CheckBoxAllItem: objCheckBoxAllItem
                      });
                    }

                    self.setState({
                      SelectedAllOrder: selectedRow,
                      SelectedAllItem: []
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
              SelectedAllItem: CselectedRow
            });
          } else {
            var selectedInvoiceNo = invoiceNumber;
            const newSelected = Object.assign({}, self.state.CheckBoxAllOrder);
            newSelected[invoiceNumber] = !self.state.CheckBoxAllOrder[
              invoiceNumber
            ];
            self.setState({
              CheckBoxAllOrder: newSelected,
              selectedInvoiceNo
            });
            var selectedRow = [];
            var CselectedRow = [];
            if (self.state.SelectedAllOrder.length === 0) {
              selectedRow.push(rowData);
              var Order_Master = self.state.OrderSubItem.filter(
                x => x.invoiceNumber === invoiceNumber
              );
              if (Order_Master.length > 0) {
                var objCheckBoxAllItem = new Object();
                for (let j = 0; j < Order_Master.length; j++) {
                  objCheckBoxAllItem[Order_Master[j].invoiceNumber] = true;

                  CselectedRow.push(Order_Master[j]);
                }
                self.setState({
                  CheckBoxAllItem: objCheckBoxAllItem
                });
              }
              self.setState({
                SelectedAllOrder: selectedRow,
                SelectedAllItem: CselectedRow
              });
            } else {
              if (newSelected[invoiceNumber] === true) {
                for (var i = 0; i < self.state.SelectedAllOrder.length; i++) {
                  if (self.state.SelectedAllOrder[i] === rowData) {
                    selectedRow = self.state.SelectedAllOrder;
                    selectedRow.push(rowData);
                    var Order_Master = self.state.OrderSubItem.filter(
                      x => x.invoiceNumber === invoiceNumber
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
                        CheckBoxAllItem: objCheckBoxAllItem
                      });
                    }

                    self.setState({
                      SelectedAllOrder: selectedRow,
                      SelectedAllItem: CselectedRow
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
                      x => x.invoiceNumber === invoiceNumber
                    );
                    if (Order_Master.length > 0) {
                      var objCheckBoxAllItem = new Object();
                      for (let j = 0; j < Order_Master.length; j++) {
                        objCheckBoxAllItem[
                          Order_Master[j].invoiceNumber
                        ] = false;
                      }
                      self.setState({
                        CheckBoxAllItem: objCheckBoxAllItem
                      });
                    }

                    self.setState({
                      SelectedAllOrder: selectedRow,
                      SelectedAllItem: []
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
              OrderSubItem: []
            });
           
          }
        })
        .catch(data => {
          console.log(data);
        });
    } else {
      this.setState({
        SelectedAllOrder: [],
        SelectedAllItem: [],
        OrderSubItem: [],
        selectedInvoiceNo:""
      });
    }
  }

  checkIndividualItem(invoiceNumber, rowData) {
    debugger;
    const newSelected = Object.assign({}, this.state.CheckBoxAllItem);
    newSelected[invoiceNumber] = !this.state.CheckBoxAllItem[invoiceNumber];
    this.setState({
      CheckBoxAllItem: invoiceNumber ? newSelected : false
    });
    var selectedRow = [];
    if (this.state.SelectedAllItem.length === 0) {
      selectedRow.push(rowData);
      this.setState({
        SelectedAllItem: selectedRow
      });
    } else {
      if (newSelected[invoiceNumber] === true) {
        for (var i = 0; i < this.state.SelectedAllItem.length; i++) {
          selectedRow = this.state.SelectedAllItem;
          selectedRow.push(rowData);
          var Order_Master = this.state.OrderSubItem.filter(
            x => x.orderMasterID === this.state.SelectedAllItem[i].orderMasterID
          );
          if (Order_Master.length === selectedRow.length) {
            const newSelected = Object.assign({}, this.state.CheckBoxAllOrder);
            newSelected[Order_Master[0].orderMasterID] = !this.state
              .CheckBoxAllOrder[Order_Master[0].orderMasterID];
            this.setState({
              CheckBoxAllOrder: Order_Master[0].orderMasterID
                ? newSelected
                : false
            });
            var data_master = this.state.orderDetailsData.filter(
              y => y.orderMasterID === Order_Master[0].orderMasterID
            );
            if (data_master.length > 0) {
              var MastOrd = this.state.SelectedAllOrder;
              MastOrd.push(data_master[0]);
              this.setState({
                SelectedAllOrder: MastOrd
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
              x => x.orderMasterID === rowData.orderMasterID
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
                  : false
              });
              var data_master = this.state.orderDetailsData.filter(
                y => y.orderMasterID === Order_Master[0].orderMasterID
              );
              var GetIndex = this.state.orderDetailsData.findIndex(
                y => y.orderMasterID === Order_Master[0].orderMasterID
              );
              if (data_master.length > 0) {
                var MastOrd = this.state.SelectedAllOrder;
                MastOrd.splice(GetIndex, 1);
                this.setState({
                  SelectedAllOrder: MastOrd
                });
              }
            }

            break;
          }
        }
      }
    }
    this.setState({
      SelectedAllItem: selectedRow
    });
    {
      this.props.getItemOrderData(selectedRow);
    }
  }

  handleAddStoreClaimComments() {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/StoreClaim/AddStoreClaimComment?ClaimID=4&Comment="+this.state.claimComments,
      headers: authHeader()
    })
      .then(function(res) {
        debugger;
        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success") {
          NotificationManager.success("Record saved successfully");
        } else {
          NotificationManager.error(res.data.message);
        }
      })
      .catch(data => {
        console.log(data);
      });
  }

  handleOnChange(e) {
    this.setState({ [e.currentTarget.name]: e.currentTarget.value });
  }

  handleGetStoreClaimComments() {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/StoreClaim/GetClaimCommentByClaimID",
      headers: authHeader(),
      params: { ClaimID: 4 }
    })
      .then(function(res) {
        debugger;
        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success") {
          self.setState({ commentData: data });
        } else {
          self.setState({ commentData: [] });
        }
      })
      .catch(data => {
        console.log(data);
      });
  }

  fileUpload(e) {
    debugger;
    var allFiles = [];
    var selectedFiles = e.target.files;
    allFiles.push(selectedFiles[0]);
    this.setState({
      //fileName: e.target.files[0].name
      fileName: allFiles
    });
  }

  handleAddStoreClaim() {
    let self = this;
    const formData = new FormData();

    var paramData = {
      BrandID: this.state.selectBrand,
      CategoryID: this.state.list1Value,
      SubCategoryID:this.state.ListOfSubCate,
      IssueTypeID:this.state.ListOfIssue,
      ClaimPercent:this.state.claimPercentage,
      CustomerID:this.state.customerId,
      OrderIDs:""
    }

    if(this.state.selectedOrderData.length > 0){
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
        TicketSourceID: 30
      };
    }else{
      var OrderData = null
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

    axios({
      method: "post",
      url: config.apiUrl + "/StoreClaim/RaiseClaim",
      headers: authHeader(),
      data: formData
    })
      .then(function(res) {
        debugger;
        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success") {
          NotificationManager.success("Record saved successfully");
        } else {
          NotificationManager.error(res.data.message);
        }
      })
      .catch(data => {
        console.log(data);
      });
  }

  handleSearchCustomer(e) {
    debugger;
    e.preventDefault();
    if (this.state.SrchEmailPhone.length > 0) {
      let self = this;
      axios({
        method: "post",
        url: config.apiUrl + "/Customer/searchCustomer",
        headers: authHeader(),
        params: {
          SearchText: this.state.SrchEmailPhone.trim()
        }
      }).then(function(res) {
          debugger;
          let SearchData = res.data.responseData[0];
          if (SearchData) {
            let GetCustId = SearchData.customerID;
            self.setState({
              customerId: GetCustId
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
        .catch(data => {
          console.log(data);
        });
    } else {
      this.setState({
        searchCompulsion: "Search field is compulsory."
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
        CustomerID: CustId
      }
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
      .catch(data => {
        console.log(data);
      });
  }
  
  handleGetOrderId = (selectParentData, selectChildData) => {
    debugger;
    this.setState({
      selectedOrderData: selectParentData,
      SelectedItemData: selectChildData
      // idSizeArray: idSizeArray
    });
  };

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
          <div className="row" style={{background: "#ecf2f4"}}>
          <div className="col-md-8">
            <label className="claim-ticket">Claim Ticket ID :</label>
            <label className="claim-A22345">
              <b>A22345</b>
            </label>
          </div>
          <div className="col-md-4">
            <div className="btn-margin" style={{float: "right" , marginLeft: "30px" }}>
              <button type="button" className="btn-btn-claim">
                CANCEL
              </button>
              <button type="button" className="btn-claim"
              onClick={this.handleAddStoreClaim.bind(this)}
              >
                SUBMIT CLAIM
              </button>
            </div>
          </div>
        </div>
        <div className="back-color">
          <div className="row">
            <div className="col-md-9" style={{padding:"0"}}>
              <div className="card card-radius">
                 <div className="search-customer-padding">
                 <form name="form" 
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
                    <label className="add-customer-color">
                      ADD NEW CUSTOMER
                    </label>
                  </div>
                  <div className="col-md-12">
                    <div style={{position:"relative"}}>
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
                      />
                    </div>
                  </div>
                  </div>
                  </form>
                  <div className="col-md-12">
                    <div className="claim-status-card">
                      <label>
                        <b>Claim Status: Open</b>
                      </label>
                      <div className="claimplus">
                        <span className="plusline1"></span>
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

                    <Collapse isOpen={this.state.collapse} style={{width:'100%',border:"1px solid #eee",borderRadius:"5px"}}>
                      <Card>
                        <CardBody style={{padding:"15px 0 0"}}>
                          <div className="row">
                            <div className="col-md-6">
                              <label className="orderdetailtext">
                                Order details
                              </label>
                            </div>
                            <div className="col-md-6">
                            <form
                              name="form"
                              onSubmit={this.handleOrderSearchData.bind(this, "1")}
                            >
                              <div>
                              <input
                                type="text"
                                className="searchtext"
                                placeholder="Search Order"
                                name="ModalorderNumber"
                                value={this.state.ModalorderNumber}
                                onChange={this.handleOrderChange.bind(this)}
                              />
                              <img
                                src={SearchBlackImg}
                                alt="Search"
                                className="searchImg-raise"
                                onClick={this.handleShowSearchDetails.bind(this)}
                              />
                              </div>
                              </form>
                            </div>
                          </div>
                          {this.state.SearchDetails ? (
                            <div style={{borderTop:"1px solid #EEE",marginTop:"12px"}}>
                              <div className="reacttableordermodal">
              {/* <ReactTable
                data={dataOrder}
                // columns={columnsOrder}
                columns={[
                  {
                    Header: <span>Invoice Number</span>,
                    accessor: "invoiceNumber",
                    Cell: row => (
                      <div
                        className="filter-checkbox"
                        style={{ marginLeft: "15px" }}
                      >
                        <input
                          type="checkbox"
                          id="fil-number1"
                          name="filter-type"
                          style={{ display: "none" }}
                          //   onChange={() => this.showAddNoteFuncation()}
                        />
                        <label
                          htmlFor="fil-number1"
                          style={{ paddingLeft: "25px" }}
                        >
                          <span className="add-note">BB332398</span>
                        </label>
                      </div>
                    )
                  },
                  {
                    Header: <span>Invoice Date</span>,
                    accessor: "invoiceDate",
                    Cell: row => <label>12 Jan 2019</label>
                  },
                  {
                    Header: <span>Item Count</span>,
                    accessor: "itemCount",
                    Cell: row => <label>02</label>
                  },
                  {
                    Header: <span>Item Price</span>,
                    accessor: "itemPrice",
                    Cell: row => <label>2999</label>
                  },
                  {
                    Header: <span>Price Paid</span>,
                    accessor: "pricePaid",
                    Cell: row => <label>2999</label>
                  },
                  {
                    Header: <span>Store Code</span>,
                    accessor: "storeCode",
                    Cell: row => <label>SB221</label>
                  },
                  {
                    Header: <span>Store Addres</span>,
                    accessor: "storeAddres",
                    Cell: row => (
                      <label>UNIT D-338,| SECOND FLOOR SECTOR 14</label>
                    )
                  },
                  // {
                  //   Header: <span>Discount</span>,
                  //   accessor: "discount",
                  //   Cell: row => <label>25%</label>
                  // }
                ]}
                //resizable={false}
                defaultPageSize={3}
                showPagination={false}
                SubComponent={row => {
                  return (
                    <div className="reactstoreclaim" style={{ padding: "20px" }}>
                      <ReactTable
                        data={dataOrder1}
                        columns={columnsOrder1}
                        defaultPageSize={2}
                        showPagination={false}
                      />
                    </div>
                  );
                }}
              /> */}

                        {/* <Table
                          className="components-table-demo-nested custom-antd-table"
                          columns={[
                            {
                              title: "",
                              // dataIndex: "invoiceNumber",
                              render: (row, data) => {
                                return (
                                  <div className="filter-checkbox">
                                    <input
                                      type="checkbox"
                                      className="d-none"
                                      id={"all" + data.invoiceNumber}
                                      name="AllOrder"
                                      checked={
                                        this.state.selectedInvoiceNo ===
                                        data.invoiceNumber
                                      }
                                      onChange={this.handleGetOderItemData.bind(
                                        this,
                                        data.invoiceNumber,
                                        data
                                      )}
                                    />
                                    <label htmlFor={"all" + data.invoiceNumber}></label>
                                  </div>
                                );
                              }
                            },
                            {
                              title: "Invoice Number",
                              dataIndex: "invoiceNumber"
                            },
                            {
                              title: "Invoice Date",
                              dataIndex: "dateFormat"
                            },
                            {
                              title: "Item Count",
                              dataIndex: "itemCount"
                            },
                            {
                              title: "Item Price",
                              dataIndex: "ordeItemPrice"
                            },
                            {
                              title: "Price Paid",
                              dataIndex: "orderPricePaid"
                            },
                            {
                              title: "Store Code",
                              dataIndex: "storeCode"
                            },
                            {
                              title: "Store Address",
                              dataIndex: "storeAddress"
                            },
                            {
                              title: "Discount",
                              dataIndex: "discount"
                            }
                          ]}
                          dataSource={orderDetailsData}
                          pagination={false}
                        /> */}
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
                                        this.state.selectedInvoiceNo ===
                                        data.invoiceNumber
                                      }
                                      onChange={this.handleGetOderItemData.bind(
                                        this,
                                        data.invoiceNumber,
                                        data
                                      )}
                                    />
                                    <label htmlFor={"all" + data.invoiceNumber}></label>
                                  </div>
                                );
                              }
                            },
                            {
                              title: "Invoice Number",
                              dataIndex: "invoiceNumber"
                            },
                            {
                              title: "Invoice Date",
                              dataIndex: "dateFormat"
                            },
                            {
                              title: "Item Count",
                              dataIndex: "itemCount"
                            },
                            {
                              title: "Item Price",
                              dataIndex: "ordeItemPrice"
                            },
                            {
                              title: "Price Paid",
                              dataIndex: "orderPricePaid"
                            },
                            {
                              title: "Store Code",
                              dataIndex: "storeCode"
                            },
                            {
                              title: "Store Address",
                              dataIndex: "storeAddress"
                            },
                            {
                              title: "Discount",
                              dataIndex: "discount"
                            }
                          ]}
                          expandedRowRender={row => {
                            return (
                              <Table
                                // dataSource={this.state.OrderSubItem}
                                dataSource={this.state.OrderSubItem.filter(
                                  x => x.invoiceNumber === row.invoiceNumber
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
                                            id={"item" + item.invoiceNumber}
                                            name="AllItem"
                                            checked={
                                              this.state.CheckBoxAllItem[
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
                                            htmlFor={"item" + item.invoiceNumber}
                                          ></label>
                                        </div>
                                      );
                                    }
                                  },
                                  {
                                    title: "Article Number",
                                    dataIndex: "articleNumber"
                                  },
                                  {
                                    title: "Article Name",
                                    dataIndex: "articleName"
                                  },
                                  {
                                    title: "Article MRP",
                                    dataIndex: "itemPrice"
                                  },
                                  {
                                    title: "Price Paid",
                                    dataIndex: "pricePaid"
                                  },
                                  {
                                    title: "Discount",
                                    dataIndex: "discount"
                                  }
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
                                    >
                                      UPLOAD FILE
                                    </label>
                                  </button>
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-md-12 uploadsechmargin">
                                  <u>
                                    <a href="#!">DOWNLOAD SAMPLE FILE</a>
                                  </u>
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
                        <option>select</option>
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
                    </div>
                    <div className="form-group col-md-4">
                      <label className="label-6">Claim Category</label>
                      {/* <select
                        id="inputState"
                        className="form-control dropdown-label"
                      >
                        <option>select</option>
                      </select> */}
                      <Select
                          showSearch={true}
                          value={this.state.list1Value}
                          style={{ width: "100%" }}
                          onChange={this.handleCategoryChange}
                          className="form-control dropdown-label"
                        >
                          {list1SelectOptions}
                          <Option value={NEW_ITEM}>
                            <span className="sweetAlert-inCategory">
                              + ADD NEW
                            </span>
                          </Option>
                        </Select>
                        {this.state.list1Value === "" && (
                          <p style={{ color: "red", marginBottom: "0px" }}>
                            {this.state.categoryCompulsion}
                          </p>
                        )}
                    </div>
                    <div className="form-group col-md-4">
                      <label className="label-6">Sub Category</label>
                      {/* <select
                        id="inputState"
                        className="form-control dropdown-label"
                      >
                        <option>select</option>
                      </select> */}
                      <Select
                          showSearch={true}
                          value={this.state.ListOfSubCate}
                          style={{ width: "100%" }}
                          onChange={this.handleSubCatOnChange}
                        >
                          {listSubCategory}
                          <Option value={NEW_ITEM}>
                            <span className="sweetAlert-inCategory">
                              + ADD NEW
                            </span>
                          </Option>
                        </Select>
                        {this.state.ListOfSubCate === "" && (
                          <p style={{ color: "red", marginBottom: "0px" }}>
                            {this.state.subcategoryCompulsion}
                          </p>
                        )}
                    </div>
                    <div className="form-group col-md-4">
                      {/* <label className="label-6">Claim Type</label>
                      <select
                        id="inputState"
                        className="form-control dropdown-label"
                      >
                        <option>select</option>
                      </select> */}
                      <Select
                          showSearch={true}
                          value={this.state.ListOfIssue}
                          style={{ width: "100%" }}
                          onChange={this.handleIssueOnChange}
                        >
                          {listOfIssueType}
                          <Option value={NEW_ITEM}>
                            <span className="sweetAlert-inCategory">
                              + ADD NEW
                            </span>
                          </Option>
                        </Select>
                        {this.state.ListOfIssue === "" && (
                          <p style={{ color: "red", marginBottom: "0px" }}>
                            {this.state.issueCompulsion}
                          </p>
                        )}
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
                    </div>
                    <div className="col-md-4" style={{ marginTop: "44px" }}>
                      {/* <button
                        type="button"
                        className=" form-control btn-btn-claim"
                      >
                        Attach Product Image
                      </button> */}
                      <input
                          id="file-upload"
                          className="d-none file-uploadprofile"
                          type="file"
                          onChange={this.fileUpload.bind(this)}
                        />
                        <label
                          htmlFor="file-upload"
                          className=" form-control btn-btn-claim"
                          // onDrop={this.fileDrop}
                          // onDragOver={this.fileDragOver}
                          // onDragEnter={this.fileDragEnter}
                          // onChange={this.fileUpload.bind(this)}
                        >
                          Attach Product Image
                        </label>
                    </div>
                  </div>
                  <div className="row">
                    <div className="form-group col-md-4">
                      <label className="label-6">Attached Image</label>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <img src={BataShoes} alt="Bata" className="batashoes" />
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <label className="label-6">Comments</label>
                      <hr></hr>
                    </div>
                    <div className="col-md-12">
                      <textarea
                        className="ticket-comments-textarea"
                        placeholder="Add your Comment here"
                        name="claimComments"
                        value={this.state.claimComments}
                        onChange={this.handleOnChange}
                      ></textarea>
                      <div className="commentbt">
                        <button type="button" className="commentbtn"
                        onClick={this.handleAddStoreClaimComments.bind(this)}
                        >
                          <label className="txt">ADD COMMENT</label>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12">
                        <label className="label-6">Comments: 0{this.state.commentData.length}</label>
                    </div>
                  {this.state.commentData.map((value) => (
                  <div>
                  <div className="row">
                    <div className="col-md-1">
                      <img
                        src={Headphone2Img}
                        alt="headphone"
                        className="oval-55 naman"
                      />
                    </div>
                    <div className="col-md-9">
                      <label className="naman-R">{value.name}</label>
                    </div>
                    <div className="col-md-2">
                      <label className="hr-ago">{value.datetime}</label>
                    </div>
                  </div>
                    <div className="col-md-12">
                    <label className="label-6">Comments:</label>
                  </div>
                    <div className="col-md-12">
                    <label>
                      {value.comment}
                    </label>
                    </div>
                    </div>
                  ))}
                  {/* <div className="row">
                    <div className="col-md-1">
                      <img
                        src={Headphone2Img}
                        alt="headphone"
                        className="oval-55 naman"
                      />
                    </div>
                    <div className="col-md-9">
                      <label className="naman-R">Naman.R</label>
                    </div>
                    <div className="col-md-2">
                      <label className="hr-ago">5 hr ago</label>
                    </div>
                  </div> */}
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card card-radius2" style={{padding: "20px"}}>
                <label>
                  <b>CUSTOMER NAME</b>
                </label>
                
                <label>
                <span className="a">A</span>
                {customerData.customerName}</label>
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
                <label>Male</label>
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
