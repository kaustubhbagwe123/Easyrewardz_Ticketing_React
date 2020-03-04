import React, { Component } from "react";
import ArrowImg from "./../../assets/Images/arrow.png";
import SearchBlackImg from "./../../assets/Images/searchBlack.png";
import NotFoundImg from "./../../assets/Images/notFound.png";
import Modal from "react-responsive-modal";
import ReactTable from "react-table";
import MinusImg from "./../../assets/Images/minus.png";
import DatePicker from "react-datepicker";
import axios from "axios";
import moment from "moment";
import config from "./../../helpers/config";
import ReactAutocomplete from "react-autocomplete";
import {
  NotificationContainer,
  NotificationManager
} from "react-notifications";
import matchSorter from "match-sorter";
import { authHeader } from "../../helpers/authHeader";
import SimpleReactValidator from "simple-react-validator";
import { Table } from "antd";

class TicketSystemOrder extends Component {
  constructor(props) {
    super(props);

    this.state = {
      SearchOrderDetails: false,
      AddManualOrderHideShow: false,
      OrderTable: false,
      AddManuallyData: false,
      AddManualSaveTbl: false,
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
      custAttachOrder: 0,
      SwitchBtnStatus: false,
      OrdItmBtnStatus: false,
      purchaseFrmStorAddress: "",
      TicketSourceData: [],
      modeOfPayment: [],
      SearchItem: [],
      orderDetailsData: [],
      OrderSubItem: [],
      OrderSubComponent: [],
      selectedDataRow: [],
      CheckOrderID: {},
      StorAddress: {},
      purchaseFrmStorName: {},
      customerdetails: {},
      modeData: {},
      orderMasterID: false,
      filterAll: "",
      filtered: [],
      orderItem: false,
      purchaseFrmStorID: 0,
      validOrdernumber: "",
      validMdlOrdernumber: "",
      expanded: {},
      expandedOrderPopup: {},
      validPurchaseStoreName: "",
      ModalorderNumber: "",
      // requiredSize: "",
      ChannelOfPurchaseData: [],
      idSizeArray: [],
      CheckBoxAllOrder: {},
      CheckBoxAllItem: {},
      SelectedAllOrder: [],
      SelectedAllItem: []
    };
    this.validator = new SimpleReactValidator();
    this.onFilteredChange = this.onFilteredChange.bind(this);
    this.filterAll = this.filterAll.bind(this);
    this.handleOrderTableClose = this.handleOrderTableClose.bind(this);
    this.handleGetTicketSourceList = this.handleGetTicketSourceList.bind(this);
    this.handleModeOfPaymentDropDown = this.handleModeOfPaymentDropDown.bind(
      this
    );
    this.handleGetManuallyTableData = this.handleGetManuallyTableData.bind(
      this
    );
    this.handleGetChannelOfPurchaseList = this.handleGetChannelOfPurchaseList.bind(
      this
    );
  }

  componentDidMount() {
    this.handleModeOfPaymentDropDown();
    this.handleGetTicketSourceList();
    this.handleGetChannelOfPurchaseList();
  }

  handleRequireSize(e, rowData) {
    debugger;

    var id = rowData.orderItemID;
    var value = document.getElementById("requireSizeTxt" + id).value;
    var index = this.state.OrderSubItem.findIndex(
      x => x.orderItemID === rowData.orderItemID
    );

    var OrderSubItem = this.state.OrderSubItem;
    OrderSubItem[index].requireSize = value;

    this.setState({ OrderSubItem });
  }

  handleGetChannelOfPurchaseList() {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/Master/GetChannelOfPurchaseList",
      headers: authHeader()
    }).then(function(res) {
      debugger;
      let data = res.data.responseData;
      self.setState({ ChannelOfPurchaseData: data });
    });
  }

  handleOrderTableOpen() {
    debugger;
    this.setState({ OrderTable: true });
  }
  handleOrderTableClose() {
    this.setState({ OrderTable: false });
  }
  handleByDateCreate = date => {
    this.setState({ OrderCreatDate: date });
  };

  handleShowSearchOrderDetails() {
    this.setState({
      SearchOrderDetails: !this.state.SearchOrederDetails
    });
  }
  handleOrderChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  setModePaymentValue = e => {
    let dataValue = e.currentTarget.value;
    this.setState({ modeOfPayment: dataValue });
  };
  handleChangeToggle() {
    this.setState({
      AddManuallyData: !this.state.AddManuallyData
    });
  }
  handelCheckBoxCheckedChange = () => {
    this.setState({
      CheckBoxChecked: !this.state.CheckBoxChecked
    });
  };
  handleChangeSaveManualTbl() {
    this.setState({
      AddManualSaveTbl: !this.state.AddManualSaveTbl
    });
  }
  handleManuallyOnchange = e => {
    this.setState({ [e.currentTarget.name]: e.currentTarget.value });
  };
  setTicketSourceValue = e => {
    let ticketSourceValue = e.currentTarget.value;
    this.setState({ selectedTicketSource: ticketSourceValue });
  };
  // handleCheckOrderID(orderMasterID, rowData) {
  //   debugger;
  //   const newSelected = Object.assign({}, this.state.CheckOrderID);
  //   newSelected[orderMasterID] = !this.state.CheckOrderID[orderMasterID];
  //   this.setState({
  //     CheckOrderID: orderMasterID ? newSelected : false
  //   });
  //   var selectedRow = [];
  //   if (this.state.selectedDataRow.length === 0) {
  //     selectedRow.push(rowData);
  //     this.setState({
  //       selectedDataRow: selectedRow
  //     });
  //   } else {
  //     if (newSelected[orderMasterID] === true) {
  //       for (var i = 0; i < this.state.selectedDataRow.length; i++) {
  //         if (this.state.selectedDataRow[i] === rowData) {
  //           selectedRow.splice(i, 1);

  //           break;
  //         } else {
  //           selectedRow = this.state.selectedDataRow;
  //           selectedRow.push(rowData);
  //           break;
  //         }
  //       }
  //     } else {
  //       for (var j = 0; j < this.state.selectedDataRow.length; j++) {
  //         if (this.state.selectedDataRow[j] === rowData) {
  //           selectedRow = this.state.selectedDataRow;
  //           selectedRow.splice(j, 1);
  //           break;
  //         }
  //       }
  //     }
  //   }

  //   this.setState({
  //     selectedDataRow: selectedRow
  //   });
  //   {
  //     this.props.getOrderId(selectedRow, this.state.idSizeArray);
  //   }
  // }

  handleCheckOrder = e => {
    debugger;
    this.setState({
      custAttachOrder: this.state.custAttachOrder === 1 ? 0 : 1,
      orderDetailsData: [],
      SwitchBtnStatus: e.target.checked,
      orderNumber: ""
    });
    {
      this.props.AttachOrder(
        this.state.custAttachOrder,
        this.state.selectedDataRow
      );
    }
  };
  handleGetTicketSourceList() {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/Master/getTicketSources",
      headers: authHeader()
    }).then(function(res) {
      debugger;
      let status = res.data.message;
      let data = res.data.responseData;
      if (status === "Success") {
        self.setState({
          TicketSourceData: data
        });
      } else {
        self.setState({
          TicketSourceData: []
        });
      }
    });
  }
  handleGetManuallyTableData() {
    debugger;
    let self = this;
    axios({
      method: "post",
      headers: authHeader(),
      url: config.apiUrl + "/Master/getPaymentMode"
    }).then(function(res) {
      debugger;
      let finalData = res.data.data;
      self.setState({ finalData: finalData });
    });
  }

  handleOrderSearchData(OrdData) {
    debugger;
    let self = this;
    var CustID = this.props.custDetails;
    if (OrdData === 1) {
      if (this.state.custAttachOrder === 0) {
        if (this.state.orderNumber.length > 0) {
          axios({
            method: "post",
            url: config.apiUrl + "/Order/getOrderListWithItemDetails",
            headers: authHeader(),
            params: {
              OrderNumber: this.state.orderNumber,
              CustomerID: CustID
            }
          }).then(function(res) {
            debugger;
            let Msg = res.data.message;
            let mainData = res.data.responseData;

            var OrderSubItem = [];

            for (let i = 0; i < mainData.length; i++) {
              if (mainData[i].orderItems.length > 0) {
                for (let j = 0; j < mainData[i].orderItems.length; j++) {
                  OrderSubItem.push(mainData[i].orderItems[j]);
                }
              }
            }
            self.setState({
              message: Msg,
              orderDetailsData: mainData,
              OrderSubItem
            });
          });
        } else {
          self.setState({
            validOrdernumber: "Please Enter Order Number"
          });
        }
      }
    } else if (OrdData === 2) {
      if (this.state.custAttachOrder === 0) {
        if (this.state.ModalorderNumber.length > 0) {
          axios({
            method: "post",
            url: config.apiUrl + "/Order/getOrderListWithItemDetails",
            headers: authHeader(),
            params: {
              OrderNumber: this.state.ModalorderNumber,
              CustomerID: CustID
            }
          }).then(function(res) {
            debugger;
            let Msg = res.data.message;
            let mainData = res.data.responseData;

            var OrderSubItem = [];

            for (let i = 0; i < mainData.length; i++) {
              if (mainData[i].orderItems.length > 0) {
                for (let j = 0; j < mainData[i].orderItems.length; j++) {
                  OrderSubItem.push(mainData[i].orderItems[j]);
                }
              }
            }
            self.setState({
              message: Msg,
              orderDetailsData: mainData,
              OrderSubItem
            });
          });
        } else {
          self.setState({
            validMdlOrdernumber: "Please Enter Order Number"
          });
        }
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
      }).then(function(res) {
        debugger;
        let Msg = res.data.message;
        let mainData = res.data.responseData;

        self.handleChangeToggle();
        var OrderSubItem = [];

        for (let i = 0; i < mainData.length; i++) {
          if (mainData[i].orderItems.length > 0) {
            for (let j = 0; j < mainData[i].orderItems.length; j++) {
              OrderSubItem.push(mainData[i].orderItems[j]);
            }
          }
        }
        self.setState({
          message: Msg,
          orderDetailsData: mainData,
          OrderSubItem,
          orderNumber: ""
        });
      });
    }
  }
  hadleAddManuallyOrderData() {
    debugger;
    if (this.validator.allValid()) {
      let self = this;
      var CustID = this.props.custDetails;
      var createdDate = moment(this.state.OrderCreatDate).format("DD-MM-YYYY");
      if (this.state.purchaseFrmStorID > 0) {
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
            TransactionDate: this.state.OrderCreatDate, ///createdDate,
            InvoiceNumber: "",
            InvoiceDate: this.state.OrderCreatDate, //createdDate,
            OrderPrice: this.state.orderMRP,
            PricePaid: this.state.pricePaid,
            CustomerID: CustID,
            PurchaseFromStoreId: this.state.purchaseFrmStorID,
            Discount: this.state.discount,
            Size: this.state.size,
            RequireSize: this.state.requiredSize
          }
        }).then(function(res) {
          debugger;
          let status = res.data.message;

          if (status === "Success") {
            let data = res.data.responseData;
            NotificationManager.success(
              "New Order added successfully.",
              "",
              2000
            );
            self.handleOrderSearchData(data);
            self.handleChangeSaveManualTbl();
            self.setState({
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
              requiredSize: ""
            });
          }
        });
      } else {
        NotificationManager.error("Order not added.");
        self.setState({
          validPurchaseStoreName: "Store name not exist"
        });
      }
    } else {
      this.validator.showMessages();
      this.forceUpdate();
    }
  }
  handlePurchaseStoreName(field, e) {
    debugger;
    let self = this;
    let SearchData = this.state.purchaseFrmStorName;
    SearchData[field] = e.target.value;

    if (SearchData[field].length > 3) {
      axios({
        method: "post",
        url: config.apiUrl + "/Store/getStores",
        headers: authHeader(),
        params: {
          SearchText: SearchData[field]
        }
      }).then(function(res) {
        debugger;
        let status = res.data.message;
        var data = res.data.responseData;
        if (status === "Success") {
          self.setState({
            SearchItem: data
          });
        } else {
          self.setState({
            SearchItem: []
          });
        }
      });
    } else {
      self.setState({
        SearchData
      });
    }
  }
  HandleSelectdata(e, field, value, id) {
    debugger;
    let SearchData = this.state.SearchData;
    SearchData[field] = value;

    var StorAddress = this.state.StorAddress;
    StorAddress["address"] = id.address;
    var Store_Id = id.storeID;

    this.setState({
      SearchData,
      StorAddress,
      purchaseFrmStorID: Store_Id
    });
  }
  handleModeOfPaymentDropDown() {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/Master/getPaymentMode",
      headers: authHeader()
    }).then(function(res) {
      let modeData = res.data.responseData;
      self.setState({ modeData: modeData });
    });
  }
  onFilteredChange(filtered) {
    debugger;
    if (filtered.length > 1 && this.state.filterAll.length) {
      // NOTE: this removes any FILTER ALL filter
      const filterAll = "";
      this.setState({
        filtered: filtered.filter(item => item.id !== "all"),
        filterAll
      });
    } else this.setState({ filtered });
  }

  filterAll(e) {
    debugger;
    const { value } = e.target;
    const filterAll = value;
    const filtered = [{ id: "all", value: filterAll }];

    this.setState({ filterAll, filtered });
  }
  expand_row(row) {
    var expanded = { ...this.state.expanded };
    if (expanded[row.index]) {
      expanded[row.index] = !expanded[row.index];
    } else {
      expanded[row.index] = true;
    }

    this.setState({
      expanded: expanded
    });
  }
  handleNumberOnchange = e => {
    debugger;
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

  handleChangeOrderItem = e => {
    debugger;
    var values = e.target.checked;
    if (values) {
      var x = document.getElementById("ordertable");
      var x1 = document.getElementById("orderitemtable");

      x.style.display = "block";
      x1.style.display = "none";
    } else {
      var i = document.getElementById("ordertable");
      var j = document.getElementById("orderitemtable");
      i.style.display = "none";
      j.style.display = "block ";
    }
    this.setState({
      OrdItmBtnStatus: e.target.checked
    });
  };
  handleChangeModalOrderItem = e => {
    debugger;
    var values = e.target.checked;
    if (values) {
      var x = document.getElementById("Modalordertable");
      var x1 = document.getElementById("Modalorderitemtable");

      x.style.display = "block";
      x1.style.display = "none";
    } else {
      var i = document.getElementById("Modalordertable");
      var j = document.getElementById("Modalorderitemtable");
      i.style.display = "none";
      j.style.display = "block ";
    }
    this.setState({
      OrdItmBtnStatus: e.target.checked
    });
  };

  // -------------------------------Check box selected all code start-------------------------------

  onCheckMasterAllChange(orderMasterID, rowData) {
    debugger;
    const newSelected = Object.assign({}, this.state.CheckBoxAllOrder);
    newSelected[orderMasterID] = !this.state.CheckBoxAllOrder[orderMasterID];
    this.setState({
      CheckBoxAllOrder: orderMasterID ? newSelected : false
    });
    var selectedRow = [];
    var CselectedRow = [];
    if (this.state.SelectedAllOrder.length === 0) {
      selectedRow.push(rowData);
      var Order_Master = this.state.OrderSubItem.filter(
        x => x.orderMasterID === orderMasterID
      );
      if (Order_Master.length > 0) {
        var objCheckBoxAllItem = new Object();
        for (let j = 0; j < Order_Master.length; j++) {
          objCheckBoxAllItem[Order_Master[j].orderItemID] = true;

          CselectedRow.push(Order_Master[j]);
        }
        this.setState({
          CheckBoxAllItem: objCheckBoxAllItem
        });
      }
      this.setState({
        SelectedAllOrder: selectedRow,
        SelectedAllItem: CselectedRow
      });
    } else {
      if (newSelected[orderMasterID] === true) {
        for (var i = 0; i < this.state.SelectedAllOrder.length; i++) {
          if (this.state.SelectedAllOrder[i] === rowData) {
            selectedRow = this.state.SelectedAllOrder;
            selectedRow.push(rowData);
            var Order_Master = this.state.OrderSubItem.filter(
              x => x.orderMasterID === orderMasterID
            );
            if (Order_Master.length > 0) {
              var objCheckBoxAllItem = new Object();
              for (let j = 0; j < Order_Master.length; j++) {
                objCheckBoxAllItem[Order_Master[j].orderItemID] = true;

                CselectedRow.push(Order_Master[j]);
              }
              this.setState({
                CheckBoxAllItem: objCheckBoxAllItem
              });
            }

            this.setState({
              SelectedAllOrder: selectedRow,
              SelectedAllItem: CselectedRow
            });

            break;
          }
        }
      } else {
        for (var i = 0; i < this.state.SelectedAllOrder.length; i++) {
          if (this.state.SelectedAllOrder[i] === rowData) {
            selectedRow = this.state.SelectedAllOrder;
            selectedRow.splice(i, 1);
            var Order_Master = this.state.OrderSubItem.filter(
              x => x.orderMasterID === orderMasterID
            );
            if (Order_Master.length > 0) {
              var objCheckBoxAllItem = new Object();
              for (let j = 0; j < Order_Master.length; j++) {
                objCheckBoxAllItem[Order_Master[j].orderItemID] = false;
              }
              this.setState({
                CheckBoxAllItem: objCheckBoxAllItem
              });
            }

            this.setState({
              SelectedAllOrder: selectedRow,
              SelectedAllItem: []
            });

            break;
          }
        }
      }
    }

    this.setState({
      SelectedAllOrder: selectedRow,
      SelectedAllItem: CselectedRow
    });
    {
      this.props.getParentOrderData(selectedRow, CselectedRow);
    }
  }

  checkIndividualItem(orderItemID, rowData) {
    debugger;
    const newSelected = Object.assign({}, this.state.CheckBoxAllItem);
    newSelected[orderItemID] = !this.state.CheckBoxAllItem[orderItemID];
    this.setState({
      CheckBoxAllItem: orderItemID ? newSelected : false
    });
    var selectedRow = [];
    if (this.state.SelectedAllItem.length === 0) {
      selectedRow.push(rowData);
      this.setState({
        SelectedAllItem: selectedRow
      });
    } else {
      if (newSelected[orderItemID] === true) {
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
  // -------------------------------Check box selected all code end-------------------------------

  render() {
    const { orderDetailsData } = this.state;

    return (
      <div className="ticketSycard">
        <div className="ticketSycard1">
          <div className="row storemainrow">
            <div className="col-12 col-lg-7 col-xl-8">
              <label className="systemstordercustomer">
                Customer Want to attach order
              </label>
            </div>
            <div className="col-12 col-lg-3 col-xl-3">
              <div style={{ display: "flex", marginTop: "4px" }}>
                <label className="orderdetailpopup">Yes</label>
                <div className="switchmargin">
                  <div className="switch switch-primary d-inline m-r-10">
                    <input
                      type="checkbox"
                      id="editDashboard-p-1"
                      value={this.state.custAttachOrder}
                      checked={this.state.SwitchBtnStatus}
                      onChange={this.handleCheckOrder}
                    />
                    <label htmlFor="editDashboard-p-1" className="cr"></label>
                  </div>
                </div>
                <label className="orderdetailpopup">No</label>
              </div>
            </div>
            <div className="col-12 col-lg-2 col-xl-1">
              <div
                // className="storeplusline"
                className={
                  this.state.custAttachOrder === 1
                    ? "storeplusline-12"
                    : "storeplusline"
                }
                onClick={this.handleOrderTableOpen.bind(this)}
                disabled={this.state.custAttachOrder === 1 ? true : false}
              >
                <span className="plusline1"></span>
                <img src={ArrowImg} alt="Arrow" className="arrow-imgtask-1" />
              </div>
            </div>
          </div>
          <Modal
            onClose={this.handleOrderTableClose}
            open={this.state.OrderTable}
            modalId="addOrderTableModal"
            overlayId="logout-ovrly"
          >
            <div
              className="row"
              style={{ marginLeft: "0px", marginRight: "0px" }}
            >
              <div
                className="col-md-12 claim-status-card"
                style={{ height: "54px" }}
              >
                <div className="row">
                  <div className="col-md-6">
                    <label style={{ marginTop: "7px" }}>
                      <b>Customer Want to attach order</b>
                    </label>
                  </div>
                  <div className="col-md-6 d-flex justify-content-end">
                    <div
                      style={{ display: "inline-flex", marginRight: "10px" }}
                    >
                      <label className="orderdetailpopup">Yes</label>
                      <div className="switchmargin">
                        <div className="switch switch-primary d-inline m-r-10">
                          <input
                            type="checkbox"
                            id="editDashboard-p-11"
                            value={this.state.custAttachOrder}
                            checked={this.state.SwitchBtnStatus}
                            onChange={this.handleCheckOrder}
                          />
                          <label
                            htmlFor="editDashboard-p-11"
                            className="cr"
                          ></label>
                        </div>
                      </div>
                      <label className="orderdetailpopup">No</label>
                    </div>

                    <div
                      className="claimplus"
                      onClick={this.handleOrderTableClose.bind(this)}
                    >
                      <span className="plusline12"></span>
                      <span>
                        <img
                          src={MinusImg}
                          alt="Minus"
                          className="minus-imgorder"
                        />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="row m-t-10 m-b-10"
              style={{ marginLeft: "0", marginRight: "0" }}
            >
              <div className="col-md-6">
                <label className="orderdetailpopup">Order Details</label>
              </div>
              <div className="col-md-3">
                <div style={{ float: "right", display: "flex" }}>
                  <label className="orderdetailpopup">Order</label>
                  <div className="orderswitch orderswitchitem">
                    <div className="switch switch-primary d-inline">
                      <input
                        type="checkbox"
                        id="item-11"
                        checked={this.state.OrdItmBtnStatus}
                        onChange={this.handleChangeModalOrderItem}
                      />
                      <label htmlFor="item-11" className="cr ord"></label>
                    </div>
                  </div>
                  <label className="orderdetailpopup">Item</label>
                </div>
              </div>
              <div className="col-md-3">
                <input
                  type="text"
                  className="searchtextpopup"
                  placeholder="Search Order"
                  name="ModalorderNumber"
                  value={this.state.ModalorderNumber}
                  autoComplete="off"
                  onChange={this.handleOrderChange.bind(this)}
                  disabled={this.state.custAttachOrder === 1 ? true : false}
                  // value={this.state.filterAll}
                  // onChange={this.filterAll}
                />
                <img
                  src={SearchBlackImg}
                  alt="Search"
                  className="searchtextimgpopup"
                  onClick={this.handleOrderSearchData.bind(this, 2)}
                />
                {this.state.ModalorderNumber.length === 0 && (
                  <p
                    style={{
                      color: "red",
                      marginBottom: "0px"
                    }}
                  >
                    {this.state.validMdlOrdernumber}
                  </p>
                )}
              </div>
            </div>
            {/* <div className="reacttableordermodal ordermainrow tableSrolling headers-menu"> */}
            <div id="Modalorderitemtable" style={{ display: "block" }}>
              <ReactTable
                data={orderDetailsData}
                onFilteredChange={this.onFilteredChange.bind(this)}
                filtered={this.state.filtered}
                defaultFilterMethod={(filter, row) =>
                  String(row[filter.id]) === filter.value
                }
                columns={[
                  {
                    columns: [
                      {
                        Header: <span></span>,
                        accessor: "orderMasterID",
                        Cell: row => (
                          <div
                            className="filter-checkbox"
                            style={{ marginLeft: "15px" }}
                          >
                            {/* <input
                              type="checkbox"
                              id={"i" + row.original.orderMasterID}
                              style={{ display: "none" }}
                              name="ticket-order"
                              checked={
                                this.state.CheckOrderID[
                                  row.original.orderMasterID
                                ] === true
                              }
                              onChange={this.handleCheckOrderID.bind(
                                this,
                                row.original.orderMasterID,
                                row.original
                              )}
                            />
                            <label
                              htmlFor={"i" + row.original.orderMasterID}
                            ></label> */}
                            <input
                              type="checkbox"
                              id={"all" + row.original.orderMasterID}
                              name="AllOrder"
                              style={{ display: "none" }}
                              checked={
                                this.state.CheckBoxAllOrder[
                                  row.original.orderMasterID
                                ] === true
                              }
                              onChange={this.onCheckMasterAllChange.bind(
                                this,
                                row.original.orderMasterID,
                                row.original
                              )}
                            />
                            <label
                              htmlFor={"all" + row.original.orderMasterID}
                            ></label>
                          </div>
                        )
                      },
                      {
                        Header: <span>Invoice Number</span>,
                        accessor: "invoiceNumber"
                      },
                      {
                        Header: <span>Invoice Date</span>,
                        accessor: "dateFormat"
                      },
                      {
                        Header: <span>Item Count</span>,
                        accessor: "itemCount"
                      },
                      {
                        Header: <span>Item Price</span>,
                        accessor: "ordeItemPrice"
                      },
                      {
                        Header: <span>Price Paid</span>,
                        accessor: "pricePaid"
                      },
                      {
                        Header: <span>Store Code</span>,
                        accessor: "storeCode"
                      },
                      {
                        Header: <span>Store Addres</span>,
                        accessor: "storeAddress"
                      },
                      {
                        Header: <span>Discount</span>,
                        accessor: "discount"
                      }
                    ]
                  },
                  {
                    show: false,
                    Header: "All",
                    id: "all",
                    width: 0,
                    resizable: false,
                    sortable: false,
                    Filter: () => {},
                    getProps: () => {
                      return {
                        // style: { padding: "0px"}
                      };
                    },
                    filterMethod: (filter, rows) => {
                      debugger;
                      var result = matchSorter(rows, filter.value, {
                        keys: [
                          "invoiceNumber",
                          "dateFormat",
                          "itemCount",
                          "itemPrice",
                          "pricePaid",
                          "storeCode",
                          "storeAddress",
                          "discount"
                        ],
                        threshold: matchSorter.rankings.WORD_STARTS_WITH
                      });
                      if (result.length > 0) {
                        debugger;
                        return result;
                      } else {
                        debugger;
                        result = [{ itemPrice: "No Record Found" }];
                        return result;
                      }
                    },
                    filterAll: true
                  }
                ]}
                resizable={false}
                defaultPageSize={3}
                showPagination={false}
              />
            </div>
            <div
              id="Modalordertable"
              className="varunoverflow"
              style={{ display: "none" }}
            >
              <ReactTable
                data={orderDetailsData}
                onFilteredChange={this.onFilteredChange.bind(this)}
                filtered={this.state.filtered}
                defaultFilterMethod={(filter, row) =>
                  String(row[filter.id]) === filter.value
                }
                expanded={this.state.expandedOrderPopup}
                onExpandedChange={(newExpanded, index, event) => {
                  if (newExpanded[index[0]] === false) {
                    newExpanded = {};
                  } else {
                    Object.keys(newExpanded).map(k => {
                      newExpanded[k] = parseInt(k) === index[0] ? {} : false;
                    });
                  }
                  this.setState({
                    ...this.state,
                    expandedOrderPopup: newExpanded
                  });
                }}
                columns={[
                  {
                    columns: [
                      {
                        Header: <span> </span>,
                        accessor: "orderMasterID",
                        Cell: row => (
                          <div
                            className="filter-checkbox"
                            style={{ marginLeft: "15px" }}
                          >
                            {/* <input
                              type="checkbox"
                              id={"i" + row.original.orderMasterID}
                              style={{ display: "none" }}
                              name="ticket-order"
                              checked={
                                this.state.CheckOrderID[
                                  row.original.orderMasterID
                                ] === true
                              }
                              onChange={this.handleCheckOrderID.bind(
                                this,
                                row.original.orderMasterID,
                                row.original
                              )}
                            />
                            <label
                              htmlFor={"i" + row.original.orderMasterID}
                            ></label> */}
                            <input
                              type="checkbox"
                              id={"all" + row.original.orderMasterID}
                              name="AllOrder"
                              style={{ display: "none" }}
                              checked={
                                this.state.CheckBoxAllOrder[
                                  row.original.orderMasterID
                                ] === true
                              }
                              onChange={this.onCheckMasterAllChange.bind(
                                this,
                                row.original.orderMasterID,
                                row.original
                              )}
                            />
                            <label
                              htmlFor={"all" + row.original.orderMasterID}
                            ></label>
                          </div>
                        )
                      },
                      {
                        Header: <span>Invoice Number</span>,
                        accessor: "invoiceNumber"
                      },
                      {
                        Header: <span>Invoice Date</span>,
                        accessor: "dateFormat"
                      },
                      {
                        Header: <span>Item Count</span>,
                        accessor: "itemCount"
                      },
                      {
                        Header: <span>Item Price</span>,
                        accessor: "ordeItemPrice"
                      },
                      {
                        Header: <span>Price Paid</span>,
                        accessor: "pricePaid"
                      },
                      {
                        Header: <span>Store Code</span>,
                        accessor: "storeCode"
                      },
                      {
                        Header: <span>Store Addres</span>,
                        accessor: "storeAddress"
                      },
                      {
                        Header: <span>Discount</span>,
                        accessor: "discount"
                      }
                    ]
                  },
                  {
                    show: false,
                    Header: "All",
                    id: "all",
                    width: 0,
                    resizable: false,
                    sortable: false,
                    Filter: () => {},
                    getProps: () => {
                      return {
                        // style: { padding: "0px"}
                      };
                    },
                    filterMethod: (filter, rows) => {
                      debugger;
                      var result = matchSorter(rows, filter.value, {
                        keys: [
                          "invoiceNumber",
                          "dateFormat",
                          "itemCount",
                          "itemPrice",
                          "pricePaid",
                          "storeCode",
                          "storeAddress",
                          "discount"
                        ],
                        threshold: matchSorter.rankings.WORD_STARTS_WITH
                      });
                      if (result.length > 0) {
                        debugger;
                        return result;
                      } else {
                        debugger;
                        result = [{ itemPrice: "No Record Found" }];
                        return result;
                      }
                    },
                    filterAll: true
                  }
                ]}
                resizable={false}
                defaultPageSize={3}
                showPagination={false}
                SubComponent={row => {
                  return (
                    <div style={{ padding: "20px" }}>
                      <ReactTable
                        data={this.state.OrderSubItem.filter(
                          x => x.orderMasterID === row.original.orderMasterID
                        )}
                        columns={[
                          {
                            Header: <span> </span>,
                            accessor: "orderMasterID",
                            Cell: row => (
                              <div
                                className="filter-checkbox"
                                style={{ marginLeft: "15px" }}
                              >
                                {/* <input
                                  type="checkbox"
                                  id={"order" + row.original.orderItemID}
                                  style={{ display: "none" }}
                                  name="ticket-order"
                                  checked={
                                    this.state.CheckOrderID[
                                      row.original.orderItemID
                                    ] === true
                                  }
                                  onChange={this.handleCheckOrderID.bind(
                                    this,
                                    row.original.orderItemID,
                                    row.original
                                  )}
                                />
                                <label
                                  htmlFor={"order" + row.original.orderItemID}
                                ></label> */}
                                <input
                                  type="checkbox"
                                  id={"item" + row.original.orderItemID}
                                  name="AllItem"
                                  style={{ display: "none" }}
                                  checked={
                                    this.state.CheckBoxAllItem[
                                      row.original.orderItemID
                                    ] === true
                                  }
                                  onChange={this.checkIndividualItem.bind(
                                    this,
                                    row.original.orderItemID,
                                    row.original
                                  )}
                                />
                                <label
                                  htmlFor={"item" + row.original.orderItemID}
                                ></label>
                              </div>
                            )
                          },
                          {
                            Header: <span>Article Number</span>,
                            accessor: "orderMasterID"
                          },
                          {
                            Header: <span>Article Size</span>,
                            accessor: "size"
                          },
                          {
                            Header: <span>Article MRP</span>,
                            accessor: "itemPrice"
                          },
                          {
                            Header: <span>Price Paid</span>,
                            accessor: "pricePaid"
                          },
                          {
                            Header: <span>Discount</span>,
                            accessor: "discount",
                            sortable: true
                          },
                          {
                            Header: <span>Required Size</span>,
                            accessor: "requireSize",
                            Cell: row => {
                              // debugger;
                              return (
                                <div>
                                  <input
                                    type="text"
                                    id={
                                      "requireSizeTxt" +
                                      row.original.orderItemID
                                    }
                                    value={row.original.requireSize || ""}
                                    name="requiredSize"
                                    autoComplete="off"
                                    onChange={() => {
                                      this.handleRequireSize(this, row);
                                    }}
                                  />
                                </div>
                              );
                            }
                          }
                        ]}
                        defaultPageSize={2}
                        showPagination={false}
                      />
                    </div>
                  );
                }}
              />
            </div>
            {/* </div> */}
          </Modal>
          {this.state.AddManuallyData === true ? null : (
            <div>
              <div className="row m-b-10">
                <div
                  className="col-md-11"
                  style={{ marginLeft: "25px", marginTop: "20px" }}
                >
                  <input
                    type="text"
                    className="systemordersearch"
                    placeholder="Search Order By Order Number"
                    name="orderNumber"
                    value={this.state.orderNumber}
                    autoComplete="off"
                    onChange={this.handleOrderChange.bind(this)}
                    disabled={this.state.custAttachOrder === 1 ? true : false}
                  />

                  <img
                    src={SearchBlackImg}
                    alt="Search"
                    className="systemorder-imgsearch"
                    onClick={this.handleOrderSearchData.bind(this, 1)}
                    // disabled={this.state.custAttachOrder === 1 ? true : false}
                  />
                  {this.state.orderNumber.length === 0 && (
                    <p
                      style={{
                        color: "red",
                        marginBottom: "0px"
                      }}
                    >
                      {this.state.validOrdernumber}
                    </p>
                  )}
                </div>
              </div>
              {this.state.message === "Record Not Found" ? (
                <div>
                  <div className="div-notFound">
                    <img
                      src={NotFoundImg}
                      alt="Not Found"
                      className="notFound-addSrch"
                    />
                    <br />
                    <label className="lbl-count-foundData">
                      We couldn't find the order details with
                      <br /> <span> this order Id</span>
                    </label>
                  </div>
                  <div className="addmanualbtn">
                    <button
                      type="button"
                      className="addmanual"
                      onClick={this.handleChangeToggle.bind(this)}
                    >
                      Add Manually
                    </button>
                  </div>
                </div>
              ) : null}
            </div>
          )}

          {this.state.AddManuallyData === true ? (
            <div>
              <div className="row m-b-10 m-l-10 m-r-10 m-t-10">
                <div className="col-md-6">
                  <label className="addmanuallytext">Add Manually</label>
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
                  {/* {this.validator.message(
                    "ProductBarCode",
                    this.state.productBarCode,
                    "required"
                  )} */}
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
                    {this.state.ChannelOfPurchaseData !== null &&
                      this.state.ChannelOfPurchaseData.map((item, i) => (
                        <option key={i} value={item.channelOfPurchaseID}>
                          {item.nameOfChannel}
                        </option>
                      ))}
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
                    <option className="select-sub-category-placeholder">
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
                    // className="form-control"
                  />
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
                  />
                  {/* {this.validator.message(
                    "mrp",
                    this.state.orderMRP,
                    "required"
                  )} */}
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
                  />
                  {/* {this.validator.message(
                    "PricePaid",
                    this.state.pricePaid,
                    "required"
                  )} */}
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
                  />
                  {/* {this.validator.message(
                    "Discount",
                    this.state.discount,
                    "required"
                  )} */}
                </div>
                <div className="col-md-6">
                  <input
                    type="text"
                    className="addmanuallytext1"
                    placeholder="Size"
                    name="size"
                    value={this.state.size}
                    onChange={this.handleNumberOnchange}
                    autoComplete="off"
                  />
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
                    onChange={this.handleNumberOnchange}
                    autoComplete="off"
                  />
                  {/* {this.validator.message(
                    "RequiredSize",
                    this.state.requiredSize,
                    "required"
                  )} */}
                </div>
                <div className="col-md-6">
                  {/* <input
                        type="text"
                        className="addmanuallytext1"
                        placeholder="Purchase from Store name"
                        name="purchaseFrmStorName"
                        value={this.state.purchaseFrmStorName}
                        onChange={this.handleManuallyOnchange}
                      /> */}
                  <ReactAutocomplete
                    wrapperStyle={{ display: "block" }}
                    getItemValue={item => item.storeName}
                    items={this.state.SearchItem}
                    renderItem={(item, isHighlighted) => (
                      <div
                        style={{
                          background: isHighlighted ? "lightgray" : "white"
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
                    onChange={this.handlePurchaseStoreName.bind(this, "store")}
                    onSelect={this.HandleSelectdata.bind(
                      this,
                      item => item.storeID,
                      "store"
                    )}
                    value={this.state.purchaseFrmStorName["store"]}
                  />

                  {this.validator.message(
                    "PurchaseFrmStorAddress",
                    this.state.purchaseFrmStorName["store"],
                    "required"
                  )}
                  {this.state.purchaseFrmStorID === 0 && (
                    <p style={{ color: "red", marginBottom: "0px" }}>
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
                    // onChange={this.handleManuallyOnchange}
                    readOnly
                  />
                </div>
              </div>

              <div className="row m-b-10 m-l-10 m-r-10">
                <div className="col-md-3">
                  <button
                    type="button"
                    className="addmanual m-t-15"
                    onClick={this.hadleAddManuallyOrderData.bind(this)}
                  >
                    SAVE
                  </button>
                </div>
                <div className="col-md-3">
                  <button
                    type="button"
                    className="addmanual m-t-15"
                    onClick={this.handleChangeToggle.bind(this)}
                  >
                    CANCEL
                  </button>
                </div>
              </div>
            </div>
          ) : null}
          {this.state.message === "Success" ? (
            <div className="reacttableordermodal ordermainrow order-det">
              <div
                className="row m-t-10 m-b-10"
                style={{ marginLeft: "0", marginRight: "0" }}
              >
                <div className="col-md-9">
                  <label
                    className="orderdetailpopup"
                    style={{ marginTop: "3px" }}
                  >
                    Order Details
                  </label>
                </div>
                <div className="col-md-3">
                  <div style={{ float: "right", display: "flex" }}>
                    <label
                      className="orderdetailpopup"
                      style={{ marginTop: "3px" }}
                    >
                      Order
                    </label>
                    <div className="orderswitch orderswitchitem">
                      <div className="switch switch-primary d-inline">
                        <input
                          type="checkbox"
                          id="editTasks-p-2"
                          checked={this.state.OrdItmBtnStatus}
                          onChange={this.handleChangeOrderItem}
                        />
                        <label
                          htmlFor="editTasks-p-2"
                          className="cr ord"
                          style={{ top: "5px" }}
                        ></label>
                      </div>
                    </div>
                    <label
                      className="orderdetailpopup"
                      style={{ marginTop: "3px" }}
                    >
                      Item
                    </label>
                  </div>
                </div>
              </div>
              <span className="linestore2"></span>

              <div id="orderitemtable" style={{ display: "block" }}>
                <Table
                  className="components-table-demo-nested custom-antd-table"
                  columns={[
                    {
                      title: "",
                      dataIndex: "invoiceNumber",
                      key: "invoiceNumber",
                      render: (row, data) => {
                        // debugger;
                        return (
                          <div>
                            <input
                              type="checkbox"
                              id={"all" + data.orderMasterID}
                              name="AllOrder"
                              checked={
                                this.state.CheckBoxAllOrder[
                                  data.orderMasterID
                                ] === true
                              }
                              onChange={this.onCheckMasterAllChange.bind(
                                this,
                                data.orderMasterID,
                                data
                              )}
                            />
                            {/* <label
                              htmlFor={"all" + data.orderMasterID}
                            ></label> */}
                          </div>
                        );
                      }
                    },
                    {
                      title: "Invoice Number",
                      dataIndex: "invoiceNumber",
                      key: "invoiceNumber"
                    },
                    {
                      title: "Invoice Date",
                      dataIndex: "dateFormat",
                      key: "dateFormat"
                    },
                    {
                      title: "Item Count",
                      dataIndex: "itemCount",
                      key: "itemCount"
                    },
                    {
                      title: "Item Price",
                      dataIndex: "ordeItemPrice",
                      key: "ordeItemPrice"
                    },
                    {
                      title: "Price Paid",
                      dataIndex: "orderPricePaid",
                      key: "orderPricePaid"
                    },
                    {
                      title: "Store Code",
                      dataIndex: "storeCode",
                      key: "storeCode"
                    },
                    {
                      title: "Store Address",
                      dataIndex: "storeCode",
                      key: "storeAddress"
                    },
                    {
                      title: "Discount",
                      dataIndex: "discount",
                      key: "discount"
                    }
                  ]}
                  dataSource={orderDetailsData}
                  pagination={false}
                />

                {/* <ReactTable
                  data={orderDetailsData}
                  columns={[
                    {
                      Header: <span></span>,
                      accessor: "invoiceNumber",
                      Cell: row => (
                        <div
                          className="filter-checkbox"
                          style={{ marginLeft: "15px" }}
                        >
                         
                          <input
                            type="checkbox"
                            id={"all" + row.original.orderMasterID}
                            style={{ display: "none" }}
                            name="AllOrder"
                            checked={
                              this.state.CheckBoxAllOrder[
                                row.original.orderMasterID
                              ] === true
                            }
                            onChange={this.onCheckMasterAllChange.bind(
                              this,
                              row.original.orderMasterID,
                              row.original
                            )}
                          />
                            <label
                            htmlFor={"all" + row.original.orderMasterID}
                          ></label>
                        </div>
                      )
                    },
                    {
                      Header: <span>Invoice Number</span>,
                      accessor: "invoiceNumber"
                    },
                    {
                      Header: <span>Invoice Date</span>,
                      accessor: "dateFormat"
                    },
                    {
                      Header: <span>Item Count</span>,
                      accessor: "itemCount"
                    },
                    {
                      Header: <span>Item Price</span>,
                      accessor: "ordeItemPrice"
                    },
                    {
                      Header: <span>Price Paid</span>,
                      accessor: "orderPricePaid"
                    },
                    {
                      Header: <span>Store Code</span>,
                      accessor: "storeCode"
                    },
                    {
                      Header: <span>Store Address</span>,
                      accessor: "storeAddress"
                    },
                    {
                      Header: <span>Discount</span>,
                      accessor: "discount"
                    }
                  ]}
                  resizable={false}
                  defaultPageSize={3}
                  showPagination={false}
                /> */}
              </div>

              <div
                id="ordertable"
                className="order-detc2"
                style={{ display: "none" }}
              >
                 <Table
                  className="components-table-demo-nested"
                  columns={[
                    {
                      title: "",
                      dataIndex: "invoiceNumber",
                      key: "invoiceNumber",
                      render: (row, data) => {
                        // debugger;
                        return (
                          <div>
                            <input
                              type="checkbox"
                              id={"all" + data.orderMasterID}
                              name="AllOrder"
                              checked={
                                this.state.CheckBoxAllOrder[
                                  data.orderMasterID
                                ] === true
                              }
                              onChange={this.onCheckMasterAllChange.bind(
                                this,
                                data.orderMasterID,
                                data
                              )}
                            />
                            {/* <label
                              htmlFor={"all" + data.orderMasterID}
                            ></label> */}
                          </div>
                        );
                      }
                    },
                    {
                      title: "Invoice Number",
                      dataIndex: "invoiceNumber",
                      key: "invoiceNumber"
                    },
                    {
                      title: "Invoice Date",
                      dataIndex: "dateFormat",
                      key: "dateFormat"
                    },
                    {
                      title: "Item Count",
                      dataIndex: "itemCount",
                      key: "itemCount"
                    },
                    {
                      title: "Item Price",
                      dataIndex: "ordeItemPrice",
                      key: "ordeItemPrice"
                    },
                    {
                      title: "Price Paid",
                      dataIndex: "orderPricePaid",
                      key: "orderPricePaid"
                    },
                    {
                      title: "Store Code",
                      dataIndex: "storeCode",
                      key: "storeCode"
                    },
                    {
                      title: "Store Address",
                      dataIndex: "storeCode",
                      key: "storeAddress"
                    },
                    {
                      title: "Discount",
                      dataIndex: "discount",
                      key: "discount"
                    }
                  ]}
                  expandedRowRender={record => {
                    return (
                      <Table
                        columns={[
                          {
                            title: "",
                            dataIndex: "orderMasterID",
                            key: "orderMasterID",
                            render: (row, item) => {
                              // debugger;
                              return (
                                <div>
                                  <input
                                    type="checkbox"
                                    id={"item" + item.orderItemID}
                                    // style={{ display: "none" }}
                                    name="AllItem"
                                    checked={
                                      this.state.CheckBoxAllItem[
                                        item.orderItemID
                                      ] === true
                                    }
                                    onChange={this.checkIndividualItem.bind(
                                      this,
                                      item.orderItemID,
                                      item
                                    )}
                                  />
                                  {/* <label
                                    htmlFor={"item" + item.orderItemID}
                                  ></label> */}
                                </div>
                              );
                            }
                          },
                          {
                            title: "Article Number",
                            dataIndex: "orderMasterID",
                            key: "orderMasterID"
                          },
                          {
                            title: "Article Name",
                            dataIndex: "articleNumber",
                            key: "articleNumber"
                          },
                          {
                            title: "Article MRP",
                            dataIndex: "itemPrice",
                            key: "itemPrice"
                          },
                          {
                            title: "Price Paid",
                            dataIndex: "pricePaid",
                            key: "pricePaid"
                          },
                          {
                            title: "Discount",
                            dataIndex: "discount",
                            key: "discount"
                          },
                          {
                            title: "Required Size",
                            dataIndex: "requireSize",
                            key: "requireSize",
                            render: (data, record) => {
                              return (
                                <div>
                                  <input
                                    type="text"
                                    id={"requireSizeTxt" + record.orderItemID}
                                    value={record.requireSize || ""}
                                    name="requiredSize"
                                    autoComplete="off"
                                    onChange={() => {
                                      this.handleRequireSize(this, record);
                                    }}
                                  />
                                </div>
                              );
                            }
                          }
                        ]}
                        // rowSelection={rowSelection}
                        pagination={false}
                        dataSource={this.state.OrderSubItem}
                      />
                    );
                  }}
                  dataSource={orderDetailsData}
                />
                {/* <ReactTable
                  data={orderDetailsData}
                  expanded={this.state.expanded}
                  onExpandedChange={(newExpanded, index, event) => {
                    if (newExpanded[index[0]] === false) {
                      newExpanded = {};
                    } else {
                      Object.keys(newExpanded).map(k => {
                        newExpanded[k] = parseInt(k) === index[0] ? {} : false;
                      });
                    }
                    this.setState({
                      ...this.state,
                      expanded: newExpanded
                    });
                  }}
                  columns={[
                    {
                      Header: <span></span>,
                      accessor: "invoiceNumber",
                      Cell: row => (
                        <div
                          className="filter-checkbox"
                          style={{ marginLeft: "15px" }}
                        >
                          <input
                            type="checkbox"
                            id={"all" + row.original.orderMasterID}
                            style={{ display: "none" }}
                            name="AllOrder"
                            checked={
                              this.state.CheckBoxAllOrder[
                                row.original.orderMasterID
                              ] === true
                            }
                            onChange={this.onCheckMasterAllChange.bind(
                              this,
                              row.original.orderMasterID,
                              row.original
                            )}
                          />
                          <label
                            htmlFor={"all" + row.original.orderMasterID}
                          ></label>
                        </div>
                      )
                    },
                    {
                      Header: <span>Invoice Number</span>,
                      accessor: "invoiceNumber"
                    },
                    {
                      Header: <span>Invoice Date</span>,
                      accessor: "dateFormat"
                    },
                    {
                      Header: <span>Item Count</span>,
                      accessor: "itemCount"
                    },
                    {
                      Header: <span>Item Price</span>,
                      accessor: "ordeItemPrice"
                    },
                    {
                      Header: <span>Price Paid</span>,
                      accessor: "pricePaid"
                    },
                    {
                      Header: <span>Store Code</span>,
                      accessor: "storeCode"
                    },
                    {
                      Header: <span>Store Addres</span>,
                      accessor: "storeAddress"
                    },
                    {
                      Header: <span>Discount</span>,
                      accessor: "discount"
                    }
                  ]}
                  resizable={false}
                  defaultPageSize={3}
                  showPagination={false}
                  SubComponent={row => {
                    return (
                      <div style={{ padding: "20px" }}>
                        <ReactTable
                          data={row.original.orderItems}
                          columns={[
                            {
                              Header: <span> </span>,
                              accessor: "orderMasterID",
                              Cell: row => (
                                <div
                                  className="filter-checkbox"
                                  style={{ marginLeft: "15px" }}
                                >
                                   
                                  <input
                                    type="checkbox"
                                    id={"item" + row.original.orderItemID}
                                    style={{ display: "none" }}
                                    name="AllItem"
                                    checked={
                                      this.state.CheckBoxAllItem[
                                        row.original.orderItemID
                                      ] === true
                                    }
                                    onChange={this.checkIndividualItem.bind(
                                      this,
                                      row.original.orderItemID,
                                      row.original
                                    )}
                                  />
                                  <label
                                    htmlFor={"item" + row.original.orderItemID}
                                  ></label>
                                </div>
                              )
                            },
                            {
                              Header: <span>Article Number</span>,
                              accessor: "orderMasterID"
                            },
                            {
                              Header: <span>Article Name</span>,
                              accessor: "articleNumber"
                            },
                            {
                              Header: <span>Article MRP</span>,
                              accessor: "itemPrice"
                            },
                            {
                              Header: <span>Price Paid</span>,
                              accessor: "pricePaid"
                            },
                            {
                              Header: <span>Discount</span>,
                              accessor: "discount"
                            },
                            {
                              Header: <span>Required Size</span>,
                              accessor: "requireSize"
                            }
                          ]}
                          defaultPageSize={2}
                          showPagination={false}
                        />
                      </div>
                    );
                  }}
                /> */}
              </div>
            </div>
          ) : null}
        </div>
        <NotificationContainer />
      </div>
    );
  }
}

export default TicketSystemOrder;
