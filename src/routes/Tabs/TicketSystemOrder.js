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
    })
      .then(function(res) {
        debugger;
        let data = res.data.responseData;
        self.setState({ ChannelOfPurchaseData: data });
      })
      .catch(data => {
        console.log(data);
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
    })
      .then(function(res) {
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
      })
      .catch(data => {
        console.log(data);
      });
  }
  handleGetManuallyTableData() {
    debugger;
    let self = this;
    axios({
      method: "post",
      headers: authHeader(),
      url: config.apiUrl + "/Master/getPaymentMode"
    })
      .then(function(res) {
        debugger;
        let finalData = res.data.data;
        self.setState({ finalData: finalData });
      })
      .catch(data => {
        console.log(data);
      });
  }

  handleOrderSearchData(OrdData, e) {
    debugger;
    e.preventDefault();
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
          })
            .then(function(res) {
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
            })
            .catch(data => {
              console.log(data);
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
          })
            .then(function(res) {
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
            })
            .catch(data => {
              console.log(data);
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
      })
        .then(function(res) {
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
        })
        .catch(data => {
          console.log(data);
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
        })
          .then(function(res) {
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
          })
          .catch(data => {
            console.log(data);
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
      })
        .then(function(res) {
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
        })
        .catch(data => {
          console.log(data);
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
    })
      .then(function(res) {
        let modeData = res.data.responseData;
        self.setState({ modeData: modeData });
      })
      .catch(data => {
        console.log(data);
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
              <Table
                className="components-table-demo-nested custom-antd-table"
                columns={[
                  {
                    title: "",
                    dataIndex: "orderMasterID",
                    render: (row, data) => {
                      // debugger;
                      return (
                        <div className="filter-checkbox">
                          <input
                            type="checkbox"
                            className="d-none"
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
                          <label htmlFor={"all" + data.orderMasterID}></label>
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
              />
            </div>
            <div
              id="Modalordertable"
              className="varunoverflow"
              style={{ display: "none" }}
            >
              <Table
                className="components-table-demo-nested custom-antd-table"
                columns={[
                  {
                    title: "",
                    dataIndex: "orderMasterID",
                    render: (row, data) => {
                      // debugger;
                      return (
                        <div className="filter-checkbox">
                          <input
                            type="checkbox"
                            className="d-none"
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
                          <label htmlFor={"all" + data.orderMasterID}></label>
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
                      dataSource={this.state.OrderSubItem.filter(
                        x => x.orderMasterID === row.orderMasterID
                      )}
                      columns={[
                        {
                          title: "",
                          dataIndex: "orderMasterID",
                          render: (row, item) => {
                            // debugger;
                            return (
                              <div className="filter-checkbox">
                                <input
                                  type="checkbox"
                                  className="d-none"
                                  id={"item" + item.orderItemID}
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
                                <label
                                  htmlFor={"item" + item.orderItemID}
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
                        },
                        {
                          title: "Required Size",
                          dataIndex: "requireSize",
                          render: (data, record) => {
                            return (
                              <div>
                                <input
                                  type="text"
                                  id={"requireSizeTxt" + record.orderItemID}
                                  value={record.requireSize || ""}
                                  name="requiredSize"
                                  className="order-input"
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
                    />
                  );
                }}
                pagination={false}
                dataSource={orderDetailsData}
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
                  <form
                    name="form"
                    onSubmit={this.handleOrderSearchData.bind(this, 1)}
                  >
                    <div>
                      <input
                        type="text"
                        className="systemordersearch"
                        placeholder="Search Order By Order Number"
                        name="orderNumber"
                        value={this.state.orderNumber}
                        autoComplete="off"
                        onChange={this.handleOrderChange.bind(this)}
                        disabled={
                          this.state.custAttachOrder === 1 ? true : false
                        }
                      />

                      <img
                        src={SearchBlackImg}
                        alt="Search"
                        className="systemorder-imgsearch"
                        onClick={this.handleOrderSearchData.bind(this, 1)}
                        // disabled={this.state.custAttachOrder === 1 ? true : false}
                      />
                    </div>
                  </form>
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
                    // onChange={this.handleNumberOnchange}
                    onChange={this.handleManuallyOnchange}
                    autoComplete="off"
                    maxLength={10}
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
                    // onChange={this.handleNumberOnchange}
                    onChange={this.handleManuallyOnchange}
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
                      dataIndex: "orderMasterID",
                      render: (row, data) => {
                        // debugger;
                        return (
                          <div className="filter-checkbox">
                            <input
                              className="d-none"
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
                            <label htmlFor={"all" + data.orderMasterID}></label>
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
                />
              </div>

              <div
                id="ordertable"
                className="order-detc2"
                style={{ display: "none" }}
              >
                <Table
                  className="components-table-demo-nested custom-antd-table"
                  columns={[
                    {
                      title: "",
                      dataIndex: "orderMasterID",
                      render: (row, data) => {
                        // debugger;
                        return (
                          <div className="filter-checkbox">
                            <input
                              type="checkbox"
                              id={"all" + data.orderMasterID}
                              name="AllOrder"
                              checked={
                                this.state.CheckBoxAllOrder[
                                  data.orderMasterID
                                ] === true
                              }
                              className="d-none"
                              onChange={this.onCheckMasterAllChange.bind(
                                this,
                                data.orderMasterID,
                                data
                              )}
                            />
                            <label htmlFor={"all" + data.orderMasterID}></label>
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
                        dataSource={this.state.OrderSubItem.filter(
                          x => x.orderMasterID === row.orderMasterID
                        )}
                        columns={[
                          {
                            title: "",
                            dataIndex: "orderMasterID",
                            render: (row, item) => {
                              debugger;
                              return (
                                <div className="filter-checkbox">
                                  <input
                                    type="checkbox"
                                    className="d-none"
                                    id={"item" + item.orderItemID}
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
                                  <label
                                    htmlFor={"item" + item.orderItemID}
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
                          },
                          {
                            title: "Required Size",
                            dataIndex: "requireSize",
                            render: (data, record) => {
                              return (
                                <div>
                                  <input
                                    type="text"
                                    id={"requireSizeTxt" + record.orderItemID}
                                    value={record.requireSize || ""}
                                    name="requiredSize"
                                    className="order-input"
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
                      />
                    );
                  }}
                  pagination={false}
                  dataSource={orderDetailsData}
                />
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
