import React, { Component } from "react";
import axios from "axios";
import {
  Table,
  Popover,
  Popconfirm,
  Tooltip,
  Spin,
  Collapse,
  Empty,
} from "antd";
import Modal from "react-responsive-modal";
import NoPayment from "./../../../assets/Images/no-payment.png";
import Info from "./../../../assets/Images/Info-black.png";
import OrderInfo from "./../../../assets/Images/order-info.png";
import OrderShopingBlack from "./../../../assets/Images/order-shoping-black.png";
import OrderBag from "./../../../assets/Images/order-bag.png";
import OrderShopingGreen from "./../../../assets/Images/green-icon.png";
import OrderHamb from "./../../../assets/Images/order-hamb.png";
import { authHeader } from "../../../helpers/authHeader";
import config from "../../../helpers/config";
import Pagination from "react-pagination-js";
import "react-pagination-js/dist/styles.css";
import moment from "moment";
import DatePicker from "react-datepicker";
import * as translationHI from "../../../translations/hindi";
import * as translationMA from "../../../translations/marathi";
import { NotificationManager } from "react-notifications";
import InfoIcon from "./../../../assets/Images/info-icon.png";
import CircleCancelImg from "./../../../assets/Images/Circle-cancel.png";

const { Panel } = Collapse;

function dragElement(elmnt) {
  var pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;
  if (document.getElementById(elmnt.id + "header")) {
    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
  } else {
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    elmnt.style.top = elmnt.offsetTop - pos2 + "px";
    elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
  }

  function closeDragElement() {
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

class OrderTab extends Component {
  constructor(props) {
    super(props);

    this.state = {
      orderGridData: [],
      itemPopupDate: [],
      filterOrderStatus: false,
      orderPopoverOverlay: false,
      totalCount: 0,
      currentPage: 1,
      postsPerPage: 10,
      statusFilterData: [],
      strStatus: "",
      OrderTabLoading: false,
      translateLanguage: {},
      shippingAddress: "",
      landmark: "",
      pincode: "",
      city: "",
      Ordstate: "",
      country: "",
      storePinCode: "",
      orderId: 0,
      AddressConf: false,
      pincodeChecAvaibility: false,
      showPinCodereturnMsg: false,
      showPinStatusCodeMsg: true,
      ordSelfPickup: false,
      ordMoveReturn: false,
      orderSearchText: "",
      OrdPickupDate: "",
      OrdPickupTime: "",
      OrdProcessLoader: false,
      ordStateDisabled: false,
      minTime: this.calculateMinTime(new Date()),
      custName: "",
      custMobileNo: "",
      ordGetAddressData: false,
      disCustName: false,
      disCustMobileNo: false,
      disShippingAddress: false,
      disLandmark: false,
      disPincode: false,
      disCity: false,
      disOrdState: false,
      disCountry: false,
      isMobileView: false,
      activePanel: [],
      getAddressMdlMobile: false,
      OrderItemData: [],
      OrdStoreCode: "",
      ordItemPopupClose: false,
      ordOrderId: "",
      popUpClicking: false,
    };
  }

  componentDidMount() {
    this.handleGetOrderTabGridData();
    this.handleGetOrderStatusFilterData();
    this.handleGetCheckServiceData();

    if (window.localStorage.getItem("translateLanguage") === "hindi") {
      this.state.translateLanguage = translationHI;
    } else if (window.localStorage.getItem("translateLanguage") === "marathi") {
      this.state.translateLanguage = translationMA;
    } else {
      this.state.translateLanguage = {};
    }
    window.addEventListener("resize", this.resize.bind(this));
    this.resize();
  }
  resize() {
    if (window.innerWidth <= 760) {
      this.setState({ isMobileView: true });
    } else {
      this.setState({ isMobileView: false });
    }
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.resize.bind(this));
  }
  /// search data
  handleOrderSearch = (searchData) => {
    this.setState({
      orderSearchText: searchData,
      currentPage: 1,
    });
    setTimeout(() => {
      this.handleGetOrderTabGridData();
    }, 5);
  };

  ////   -------------------API Function start-------------------------------
  /// handle Get Order Tab Grid Data
  handleGetOrderTabGridData(filter) {
    let self = this;
    this.setState({
      OrderTabLoading: true,
    });
    axios({
      method: "post",
      url: config.apiUrl + "/HSOrder/GetOrdersDetails",
      headers: authHeader(),
      data: {
        SearchText: this.state.orderSearchText.trim(),
        PageNo: this.state.currentPage,
        PageSize: this.state.postsPerPage,
        FilterStatus: this.state.strStatus,
      },
    })
      .then(function(res) {
        let status = res.data.message;
        let data = res.data.responseData;
        if (filter === "filter") {
          if (status === "Success") {
            self.setState({
              orderGridData: data.ordersList,
              totalCount: data.totalCount,
              filterOrderStatus: false,
              OrderTabLoading: false,
            });
          } else {
            self.setState({
              orderGridData: [],
              totalCount: 0,
              filterOrderStatus: false,
              OrderTabLoading: false,
            });
          }
        } else {
          if (status === "Success") {
            self.setState({
              orderGridData: data.ordersList,
              totalCount: data.totalCount,
              OrderTabLoading: false,
            });
          } else {
            self.setState({
              orderGridData: [],
              totalCount: 0,
              OrderTabLoading: false,
            });
          }
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }
  /// handle Get Order status filter data
  handleGetOrderStatusFilterData() {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/HSOrder/GetOrderStatusFilter",
      headers: authHeader(),
      params: {
        pageID: 2,
      },
    })
      .then(function(res) {
        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success") {
          self.setState({
            statusFilterData: data,
          });
        } else {
          self.setState({
            statusFilterData: [],
          });
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }
  /// handle Sent Payment Link
  handleSentPaymentLink(item) {
    const TranslationContext = this.state.translateLanguage.default;
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/HSOrder/GeneratePaymentLink",
      headers: authHeader(),
      data: {
        InvoiceNumber: item.invoiceNo,
        StoreCode: item.storeCode,
        SentPaymentLinkCount: item.countSendPaymentLink,
      },
    })
      .then(function(res) {
        let status = res.data.message;
        if (status === "Success") {
          self.handleGetOrderTabGridData();
          NotificationManager.success(
            TranslationContext !== undefined
              ? TranslationContext.alertmessage.linksendsuccessfully
              : "Link Sent Successfully."
          );
        } else {
          NotificationManager.error(status);
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }
  /// handle Get Check service data
  handleGetCheckServiceData() {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/HSOrder/GetStorePinCodeByUserID",
      headers: authHeader(),
    })
      .then(function(res) {
        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success") {
          self.setState({
            storePinCode: data,
          });
        } else {
          self.setState({
            storePinCode: "",
          });
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }
  /// handle Submit Check service data
  handleUpdateCheckServiceData(ordId) {
    this.setState({
      pincodeChecAvaibility: true,
      Ordstate: "",
    });
    var self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/HSOrder/CheckCourierAvailibilty",
      headers: authHeader(),
      data: {
        Pickup_postcode: parseInt(this.state.storePinCode),
        Delivery_postcode: parseInt(this.state.pincode),
      },
    })
      .then(function(res) {
        let status = res.data.message;
        var data = res.data.responseData;
        if (status === "Success") {
          if (data.statusCode === "301") {
            self.setState({
              showPinStatusCodeMsg: data.available,
            });
          }
          if (data.available === "true" && data.statusCode === "200") {
            self.setState({
              Ordstate: data.state,
              ordStateDisabled: true,
              showPinCodereturnMsg: false,
            });
          } else {
            self.setState({
              showPinCodereturnMsg: true,
            });
          }
          self.setState({
            pincodeChecAvaibility: false,
            orderId: ordId,
          });
        } else {
          self.setState({
            showPinCodereturnMsg: false,
            showPinStatusCodeMsg: true,
            pincodeChecAvaibility: false,
          });
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }
  handleSetOrderHasBeenReturn() {
    var self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/HSOrder/SetOrderHasBeenReturn",
      headers: authHeader(),
      params: {
        orderID: this.state.orderId,
      },
    })
      .then(function(res) {
        let status = res.data.message;
        if (status === "Success") {
          self.handleGetOrderTabGridData();
          self.setState({
            orderPopoverOverlay: false,
            showPinCodereturnMsg: false,
            pincode: "",
          });
        } else {
          return false;
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }
  /// handle Self pickup data
  handleSubmitSelfPickupData() {
    const TranslationContext = this.state.translateLanguage.default;
    if (this.state.OrdPickupDate !== "" && this.state.OrdPickupTime !== "") {
      var self = this;
      var formatDate = moment(new Date(this.state.OrdPickupDate)).format(
        "DD-MM-YYYY"
      );
      var formatTime = moment(this.state.OrdPickupTime).format("HH:mm");
      axios({
        method: "post",
        url: config.apiUrl + "/HSOrder/SetOrderHasBeenSelfPickUp",
        headers: authHeader(),
        data: {
          OrderID: this.state.orderId,
          PickupDate: formatDate,
          PickupTime: formatTime,
        },
      })
        .then(function(res) {
          let status = res.data.message;
          if (status === "Success") {
            self.handleGetOrderTabGridData();
            NotificationManager.success(
              TranslationContext !== undefined
                ? TranslationContext.ticketingDashboard
                    .theorderhasbeenconvertedtoselfpickup
                : "The order has been converted to self pick up."
            );
          } else {
            return false;
          }
        })
        .catch((data) => {
          console.log(data);
        });
    } else {
      if (this.state.OrdPickupDate === "") {
        NotificationManager.error(
          TranslationContext !== undefined
            ? TranslationContext.ticketingDashboard.pleaseselectpickupdate
            : "Please Select Pickup Date."
        );
      } else {
        NotificationManager.error(
          TranslationContext !== undefined
            ? TranslationContext.ticketingDashboard.pleaseselectpickuptime
            : "Please Select Pickup Time."
        );
      }
    }
  }
  /// handle update Address data
  handleUpdateAddressPending(orderId) {
    const TranslationContext = this.state.translateLanguage.default;
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/HSOrder/UpdateAddressPending",
      headers: authHeader(),
      data: {
        OrderID: orderId,
        ShipmentAddress: this.state.shippingAddress,
        Landmark: this.state.landmark,
        PinCode: this.state.pincode,
        City: this.state.city,
        State: this.state.Ordstate,
        Country: this.state.country,
        CustomerName: this.state.custName,
        MobileNumber: this.state.custMobileNo,
      },
    })
      .then(function(res) {
        let status = res.data.message;
        if (status === "Success") {
          self.handleGetOrderTabGridData();
          self.handleGetCheckServiceData();
          self.setState({
            orderId: 0,
            AddressConf: false,
            shippingAddress: "",
            pincode: "",
            city: "",
            Ordstate: "",
            country: "",
            landmark: "",
            custName: "",
            custMobileNo: "",
          });
          NotificationManager.success(
            TranslationContext !== undefined
              ? TranslationContext.alertmessage.recordupdatedsuccessfully
              : "Record Updated Successfully."
          );
        } else {
          NotificationManager.error(status);
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }
  /// handle Get address pending data
  handleGetAddresspendingData(orderId) {
    let self = this;
    this.setState({
      ordGetAddressData: true,
    });
    axios({
      method: "post",
      url: config.apiUrl + "/HSOrder/GetCustAddressDetails",
      headers: authHeader(),
      params: {
        orderId: orderId,
      },
    })
      .then(function(res) {
        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success") {
          self.handlecheckOrdData(data);
          self.setState({
            custName: data.customerName,
            custMobileNo: data.mobileNumber,
            shippingAddress: data.shippingAddress,
            landmark: data.landmark,
            pincode: data.pinCode,
            city: data.city,
            Ordstate: data.state,
            country: data.country,
            ordGetAddressData: false,
          });
        } else {
          self.setState({
            custName: "",
            custMobileNo: "",
            shippingAddress: "",
            landmark: "",
            pincode: "",
            city: "",
            Ordstate: "",
            country: "",
            ordGetAddressData: false,
          });
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }
  ///-------------------API function end--------------------------------

  ///handle pagination onchage
  PaginationOnChange = async (numPage) => {
    await this.setState({
      currentPage: numPage,
    });

    this.handleGetOrderTabGridData();
  };
  /// handle per page item change
  handlePageItemchange = async (e) => {
    await this.setState({
      postsPerPage: e.target.value,
      currentPage: 1,
    });

    this.handleGetOrderTabGridData();
  };
  /// handle check individual status
  handleCheckDeliIndividualStatus() {
    var checkboxes = document.getElementsByName("orderStatus");
    var strStatus = "";
    for (var i in checkboxes) {
      if (isNaN(i) === false) {
        if (checkboxes[i].checked === true) {
          if (checkboxes[i].getAttribute("attrIds") !== null)
            strStatus += checkboxes[i].getAttribute("attrIds") + ",";
        }
      }
    }
    this.setState({
      strStatus,
    });
  }

  /// handle check data
  handlecheckOrdData(data) {
    if (data.customerName !== "") {
      this.setState({
        disCustName: true,
      });
    }
    if (data.mobileNumber !== "") {
      this.setState({
        disCustMobileNo: true,
      });
    }
    if (data.shippingAddress !== "") {
      this.setState({
        disShippingAddress: true,
      });
    }
    if (data.landmark !== "") {
      this.setState({
        disLandmark: true,
      });
    }
    if (data.pinCode !== "") {
      this.setState({
        disPincode: true,
      });
    }
    if (data.city !== "") {
      this.setState({
        disCity: true,
      });
    }
    if (data.state !== "") {
      this.setState({
        disOrdState: true,
      });
    }
    if (data.country !== "") {
      this.setState({
        disCountry: true,
      });
    }
  }
  /// handle Submit Order adddress data
  handleSubmitOrderAddress(orderId) {
    if (this.state.ordMoveReturn) {
      this.handleSetOrderHasBeenReturn();
    } else {
      if (this.state.ordSelfPickup) {
        this.handleSubmitSelfPickupData();
      } else {
        this.handleAddressPending();
      }
    }

    this.setState({
      orderId: orderId,
    });
  }

  /// handle Address pending data
  handleAddressPending() {
    const TranslationContext = this.state.translateLanguage.default;
    if (this.state.custName === "") {
      NotificationManager.error(
        TranslationContext !== undefined
          ? TranslationContext.alertmessage.pleaseentercustomername
          : "Please enter customer name."
      );
      return false;
    }

    if (this.state.custMobileNo === "") {
      NotificationManager.error(
        TranslationContext !== undefined
          ? TranslationContext.alertmessage.pleaseentermobileno
          : "Please enter mobile no."
      );
      return false;
    }

    if (this.state.shippingAddress === "") {
      NotificationManager.error(
        TranslationContext !== undefined
          ? TranslationContext.alertmessage.pleaseenteraddress
          : "Please enter address."
      );
      return false;
    }

    if (this.state.pincode === "") {
      NotificationManager.error(
        TranslationContext !== undefined
          ? TranslationContext.alertmessage.pleaseenterpincode
          : "Please enter pincode."
      );
      return false;
    } else {
      if (this.state.pincode.length < 6) {
        NotificationManager.error(
          TranslationContext !== undefined
            ? TranslationContext.alertmessage.pleaseentersixdigitpinoce
            : "Please enter 6 digits pincode"
        );
        return false;
      }
    }

    if (this.state.city === "") {
      NotificationManager.error(
        TranslationContext !== undefined
          ? TranslationContext.alertmessage.pleaseentercity
          : "Please enter city."
      );
      return false;
    }

    if (this.state.Ordstate === "") {
      NotificationManager.error(
        TranslationContext !== undefined
          ? TranslationContext.alertmessage.pleaseenterstate
          : "Please enter state."
      );
      return false;
    }

    if (this.state.country === "") {
      NotificationManager.error(
        TranslationContext !== undefined
          ? TranslationContext.alertmessage.pleaseentercountry
          : "Please enter country."
      );
      return false;
    }

    this.setState({
      AddressConf: true,
    });
  }
  handleTextOnchage = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  /// handle Pin code change
  handlePinCodeCheck(ordId, e) {
    var reg = /^[0-9\b]+$/;

    if (e.target.value === "" || reg.test(e.target.value)) {
      this.setState({ pincode: e.target.value, showPinCodereturnMsg: false });
    } else {
      e.target.value = "";
    }
    if (e.target.value.length === 6) {
      setTimeout(() => {
        this.handleUpdateCheckServiceData(ordId);
      }, 100);
    }
  }

  handleAddressMdlModalClose() {
    this.setState({
      AddressConf: false,
    });
  }
  /// handle Close Status filter
  handleCloseStatusFilter() {
    this.setState({
      filterOrderStatus: false,
    });
  }
  /// handle order option change
  handleOrdChangeOptions = (e) => {
    var names = e.target.name;

    if (names === "ordSelfPickup") {
      this.setState({
        ordSelfPickup: true,
        ordMoveReturn: false,
      });
    } else {
      this.setState({
        ordMoveReturn: true,
        ordSelfPickup: false,
      });
      // setTimeout(() => {
      //   this.handleSetOrderHasBeenReturn();
      // }, 5);
    }
  };
  /// handle order date change
  handleOrdDateChange(date) {
    this.setState({
      OrdPickupDate: date,
    });
  }
  /// calculate min time
  calculateMinTime = (date) => {
    let isToday = moment(date).isSame(moment(), "day");
    if (isToday) {
      let nowAddOneHour = moment(new Date())
        .add({ minute: 30 })
        .toDate();
      return nowAddOneHour;
    }
    return moment()
      .startOf("day")
      .toDate();
  };
  /// handle Order pickup time change
  handleOrdPickupTimeChange(time) {
    this.setState({
      minTime: this.calculateMinTime(time),
      OrdPickupTime: time,
    });
  }
  /// clear address order
  handleClearAddressOrder(ordID) {
    this.setState({
      shippingAddress: "",
      pincode: "",
      city: "",
      Ordstate: "",
      country: "",
      landmark: "",
      pincodeChecAvaibility: false,
      showPinCodereturnMsg: false,
    });
    this.handleGetAddresspendingData(ordID);
  }
  /// Onchange for Mobile no
  hanldeMobileNoChange = (e) => {
    var reg = /^[0-9\b]+$/;

    if (e.target.value === "" || reg.test(e.target.value)) {
      this.setState({ [e.target.name]: e.target.value });
    } else {
      e.target.value = "";
    }
  };
  handlecollapseChange = (e) => {
    this.state.activePanel = e[e.length - 1];
    this.setState({ activePanel: this.state.activePanel });
  };
  /// handle get address close modal
  handleGetAddressMdlMobileOpen(itemData) {
    this.setState({
      getAddressMdlMobile: true,
      orderId: itemData.id,
    });
    this.handleGetAddresspendingData(itemData.id);
  }
  /// handle get address close modal
  handleGetAddressMdlMobileClose() {
    this.setState({
      getAddressMdlMobile: false,
    });
  }
  handleStoreOrderItemData(OrderData) {
    this.setState({
      OrderItemData: [],
      OrdStoreCode: OrderData.storeCode,
      ordItemPopupClose: true,
      ordOrderId: OrderData.invoiceNo,
    });
  }
  /// handle check order item data with item id
  handleCheckOrderItemData(itemId) {
    if (this.state.OrderItemData.length > 0) {
      var ordItem = this.state.OrderItemData.filter((x) => x.skuId === itemId);
      if (ordItem.length === 0) {
        this.handleOrdItemOpen(itemId);
      } else {
        document.getElementById(
          "ord" + itemId + this.state.ordOrderId + "Itm"
        ).style.display = "block";
        dragElement(
          document.getElementById(
            "ord" + itemId + this.state.ordOrderId + "Itm"
          )
        );
      }
    } else {
      this.handleOrdItemOpen(itemId);
    }
  }
  /// handle get itam data
  handleOrdItemOpen(itemId) {
    let self = this;
    self.setState({
      popUpClicking: true,
    });
    axios({
      method: "post",
      url: config.apiUrl + "/HSOrder/GetItemDetailsBySKU",
      headers: authHeader(),
      params: {
        StoreCode: this.state.OrdStoreCode, // "2185",
        SKUItemCodes: itemId, //"1000008893966",
      },
    })
      .then(function(res) {
        var status = res.data.message;
        var data = res.data.responseData.data;
        if (status === "Success" && data.length > 0) {
          var OrdData = self.state.OrderItemData;
          OrdData.push(data[0]);
          self.setState({
            OrderItemData: OrdData,
            popUpClicking: true,
          });
          document.getElementById(
            "ord" + itemId + self.state.ordOrderId + "Itm"
          ).style.display = "block";
          dragElement(
            document.getElementById(
              "ord" + itemId + self.state.ordOrderId + "Itm"
            )
          );
        } else {
          // self.setState({
          //   OrderItemData: [],
          // });
          NotificationManager.error("Record not found.");
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }
  /// handle close all item pop modal
  handleCloseAllItemPop() {
    this.setState({
      orderPopoverOverlay: false,
      ordItemPopupClose: false,
      OrderItemData: [],
      ordOrderId: "",
      popUpClicking: false,
    });
  }
  /// handle close item pop modal
  handleCloseItemPop(itemId) {
    document.getElementById(
      "ord" + itemId + this.state.ordOrderId + "Itm"
    ).style.display = "none";
    this.setState({
      popUpClicking: false,
    });
  }

  render() {
    const TranslationContext = this.state.translateLanguage.default;
    return (
      <>
        {this.state.orderPopoverOverlay && (
          <div className="order-popover-overlay"></div>
        )}

        <div className="table-cntr store dv-table-paging ordertab">
          <p className="shopi">
            {TranslationContext !== undefined
              ? TranslationContext.header.order
              : "Order"}
          </p>
          {!this.state.isMobileView ? (
            <Table
              className="components-table-demo-nested antd-table-campaign antd-table-order antd-table-order-mobile custom-antd-table"
              columns={[
                {
                  title:
                    TranslationContext !== undefined
                      ? TranslationContext.label.orderid
                      : "Order ID",
                  key: "invoiceNo",
                  render: (row, item) => {
                    return (
                      <div className="d-flex align-items-center overflow-hidden namenumbermain">
                        <div className="invoice-icon-cntr">
                          <img
                            src={
                              item.sourceOfOrder === "FTP"
                                ? OrderShopingGreen
                                : item.sourceOfOrder === "POS"
                                ? OrderBag
                                : item.sourceOfOrder === "WebBot" ||
                                  item.sourceOfOrder === "Ecom" ||
                                  item.sourceOfOrder === "Bell" ||
                                  item.sourceOfOrder === "WB-INV"
                                ? OrderShopingBlack
                                : null
                            }
                            className={
                              item.sourceOfOrder === "FTP"
                                ? "order-shoping"
                                : item.sourceOfOrder === "POS"
                                ? "order-bag"
                                : item.sourceOfOrder === "WebBot" ||
                                  item.sourceOfOrder === "Ecom" ||
                                  item.sourceOfOrder === "Bell" ||
                                  item.sourceOfOrder === "WB-INV"
                                ? "order-shoping"
                                : null
                            }
                          />
                        </div>

                        <Tooltip title={item.invoiceNo} placement="bottom">
                          <p className="order-bill-no">
                            {item.invoiceNo.length > 13
                              ? item.invoiceNo.substr(0, 13).concat("...")
                              : item.invoiceNo}
                          </p>
                        </Tooltip>

                        {item.isShoppingBagConverted === true && (
                          <Popover
                            content={
                              <>
                                <p className="shopping-num-invoice">
                                  {TranslationContext !== undefined
                                    ? TranslationContext.title.shoppingbagno
                                    : "Shopping bag No"}
                                  :<span>{item.shoppingBagNo}</span>
                                </p>
                                <Table
                                  className="components-table-demo-nested antd-table-campaign antd-table-order custom-antd-table"
                                  columns={[
                                    {
                                      title:
                                        TranslationContext !== undefined
                                          ? TranslationContext.title.itemid
                                          : "Item ID",
                                      dataIndex: "itemID",
                                    },
                                    {
                                      title:
                                        TranslationContext !== undefined
                                          ? TranslationContext.title.itemname
                                          : "Item Name",
                                      dataIndex: "itemName",
                                    },
                                    {
                                      title:
                                        TranslationContext !== undefined
                                          ? TranslationContext.title.itemprice
                                          : "Item Price",
                                      dataIndex: "itemPrice",
                                    },
                                    {
                                      title:
                                        TranslationContext !== undefined
                                          ? TranslationContext.title.quantity
                                          : "Quantity",
                                      dataIndex: "quantity",
                                    },
                                  ]}
                                  scroll={{ y: 240 }}
                                  pagination={false}
                                  dataSource={
                                    item.shoppingBagItemList.length > 0
                                      ? item.shoppingBagItemList
                                      : []
                                  }
                                />
                              </>
                            }
                            trigger="click"
                            overlayClassName="order-popover-table order-popover order-popover-invoice"
                            placement="bottomLeft"
                            onVisibleChange={(visible) =>
                              this.setState({ orderPopoverOverlay: visible })
                            }
                          >
                            <img src={OrderInfo} className="order-info" />
                          </Popover>
                        )}
                        <div className="namenumber">
                          <p>{item.customerName},</p>
                          <p className="order-small-font">
                            {item.mobileNumber}
                          </p>
                        </div>
                      </div>
                    );
                  },
                },
                {
                  title:
                    TranslationContext !== undefined
                      ? TranslationContext.title.date
                      : "Date",
                  render: (row, item) => {
                    return (
                      <div>
                        <p>{item.date}</p>
                        <p className="order-small-font">{item.time}</p>
                      </div>
                    );
                  },
                  className: "order-desktop",
                },
                {
                  title:
                    TranslationContext !== undefined
                      ? TranslationContext.title.customer
                      : "Customer",
                  render: (row, item) => {
                    return (
                      <div>
                        <p>{item.customerName},</p>
                        <p className="order-small-font">{item.mobileNumber}</p>
                      </div>
                    );
                  },
                  className: "order-desktop",
                },
                {
                  title:
                    TranslationContext !== undefined
                      ? TranslationContext.title.items
                      : "Items",
                  render: (row, item) => {
                    return (
                      <div className="d-flex align-items-center">
                        <p>
                          {item.ordersItemList.length > 0
                            ? item.ordersItemList.length
                            : "-NIL-"}
                        </p>
                        {item.ordersItemList.length > 0 ? (
                          <>
                            <Popover
                              content={
                                <>
                                  <img
                                    src={CircleCancelImg}
                                    alt="Cancel"
                                    className="ordcnclimg"
                                    onClick={this.handleCloseAllItemPop.bind(
                                      this,
                                      item.invoiceNo
                                    )}
                                  />
                                  <Table
                                    className="components-table-demo-nested antd-table-campaign antd-table-order custom-antd-table"
                                    columns={[
                                      {
                                        title:
                                          TranslationContext !== undefined
                                            ? TranslationContext.title.itemid
                                            : "Item ID",
                                        dataIndex: "itemID",
                                      },
                                      {
                                        title:
                                          TranslationContext !== undefined
                                            ? TranslationContext.title.itemname
                                            : "Item Name",
                                        dataIndex: "itemName",
                                      },
                                      {
                                        title:
                                          TranslationContext !== undefined
                                            ? TranslationContext.title.itemprice
                                            : "Item Price",
                                        dataIndex: "itemPrice",
                                        className: "order-desktop",
                                      },
                                      {
                                        title:
                                          TranslationContext !== undefined
                                            ? TranslationContext.title.quantity
                                            : "Quantity",
                                        dataIndex: "quantity",
                                        className: "order-desktop",
                                      },
                                      {
                                        title: "Item Price/ Quantity",
                                        className: "order-mobile pick-up-date",
                                        render: (row, item) => {
                                          return (
                                            <p>
                                              {item.itemPrice}/ {item.quantity}
                                            </p>
                                          );
                                        },
                                      },
                                      {
                                        title:
                                          TranslationContext !== undefined
                                            ? TranslationContext.title
                                                .properties
                                            : "Properties",
                                        className: item.showItemProperty
                                          ? "order-desktop"
                                          : "ordItmDis",
                                        render: (row, item) => {
                                          return (
                                            <>
                                              {item.showItemProperty &&
                                              item.itemName.toLowerCase() !==
                                                "delivery charge" ? (
                                                <div className="d-flex align-items-center">
                                                  <img
                                                    src={InfoIcon}
                                                    alt="Info"
                                                    className={
                                                      this.state.popUpClicking
                                                        ? "disabled-link info-icon"
                                                        : "info-icon"
                                                    }
                                                    onClick={this.handleCheckOrderItemData.bind(
                                                      this,
                                                      item.itemID
                                                    )}
                                                  />
                                                </div>
                                              ) : null}
                                            </>
                                          );
                                        },
                                      },
                                    ]}
                                    scroll={{ y: 240 }}
                                    pagination={false}
                                    dataSource={item.ordersItemList}
                                  />
                                  {this.state.OrderItemData !== null &&
                                    this.state.OrderItemData.map((data, i) => (
                                      <div
                                        id={
                                          "ord" +
                                          data.skuId +
                                          this.state.ordOrderId +
                                          "Itm"
                                        }
                                        className="ordItmData itmDb"
                                        key={i}
                                      >
                                        <img
                                          src={CircleCancelImg}
                                          alt="Cancel"
                                          className="ordcnclimg"
                                          onClick={this.handleCloseItemPop.bind(
                                            this,
                                            data.skuId
                                          )}
                                        />

                                        <table>
                                          <thead className="ordItheader">
                                            <tr>
                                              <th>Item Id</th>
                                              <th>Color</th>
                                              <th>Size</th>
                                              <th>Image</th>
                                              <th>Image Url</th>
                                            </tr>
                                          </thead>
                                          <tbody>
                                            {this.state.OrderItemData !==
                                              null &&
                                              this.state.OrderItemData.filter(
                                                (x) => x.skuId === data.skuId
                                              ).map((item, o) => (
                                                <tr key={o}>
                                                  <td>
                                                    <label className="skuIdLbl">
                                                      {item.skuId}
                                                    </label>
                                                  </td>
                                                  <td>{item.colour}</td>
                                                  <td>{item.size}</td>
                                                  <td>
                                                    <img
                                                      src={item.defaultImageUrl}
                                                      alt="Item"
                                                      className="itemOrdImg"
                                                    />
                                                  </td>
                                                  <td>
                                                    <a
                                                      href={
                                                        item.defaultImageUrl
                                                      }
                                                      target="_blank"
                                                    >
                                                      {TranslationContext !==
                                                      undefined
                                                        ? TranslationContext
                                                            .ticketingDashboard
                                                            .clicktodownload
                                                        : "Click to view"}
                                                    </a>
                                                  </td>
                                                </tr>
                                              ))}
                                          </tbody>
                                        </table>
                                      </div>
                                    ))}
                                </>
                              }
                              trigger="click"
                              placement="bottom"
                              overlayClassName={
                                this.state.ordItemPopupClose
                                  ? "order-popover-table order-popover order-popover-table-big"
                                  : "order-popover-table order-popover order-popover-table-big OrdItem"
                              }
                              // overlayClassName="order-popover-table order-popover order-popover-table-big"
                              onVisibleChange={(visible) =>
                                this.setState({ orderPopoverOverlay: visible })
                              }
                            >
                              <img
                                src={OrderHamb}
                                className="order-hamb"
                                onClick={this.handleStoreOrderItemData.bind(
                                  this,
                                  item
                                )}
                              />
                            </Popover>
                          </>
                        ) : null}
                      </div>
                    );
                  },
                  width: 100,
                  className: "order-desktop",
                },
                {
                  title:
                    TranslationContext !== undefined
                      ? TranslationContext.title.amount
                      : "Amount",
                  dataIndex: "amount",
                  width: 150,
                  className: "order-desktop",
                },
                {
                  title:
                    TranslationContext !== undefined
                      ? TranslationContext.title.status
                      : "Status",
                  className:
                    "camp-status-header camp-status-header-statusFilter order-status-header order-desktop",
                  render: (row, item) => {
                    return (
                      <>
                        <p>{item.statusName}</p>
                      </>
                    );
                  },
                  filterDropdown: (data, row) => {
                    return (
                      <div className="campaign-status-drpdwn">
                        <ul>
                          {this.state.statusFilterData !== null &&
                            this.state.statusFilterData.map((item, b) => (
                              <li key={b}>
                                <input
                                  type="checkbox"
                                  id={"New" + item.statusID}
                                  className="ch1"
                                  onChange={this.handleCheckDeliIndividualStatus.bind(
                                    this
                                  )}
                                  name="orderStatus"
                                  attrIds={item.statusID}
                                />
                                <label htmlFor={"New" + item.statusID}>
                                  <span className="ch1-text">
                                    {item.statusName}
                                  </span>
                                </label>
                              </li>
                            ))}
                        </ul>
                        <div className="dv-status">
                          <button
                            className="btn-apply-status"
                            onClick={this.handleGetOrderTabGridData.bind(
                              this,
                              "filter"
                            )}
                          >
                            {TranslationContext !== undefined
                              ? TranslationContext.button.apply
                              : "Apply"}
                          </button>
                          <button
                            className="btn-cancel-status"
                            onClick={this.handleCloseStatusFilter.bind(this)}
                          >
                            {TranslationContext !== undefined
                              ? TranslationContext.button.cancel
                              : "Cancel"}
                          </button>
                        </div>
                      </div>
                    );
                  },
                  filterDropdownVisible: this.state.filterOrderStatus,
                  onFilterDropdownVisibleChange: (visible) =>
                    this.setState({ filterOrderStatus: visible }),
                  filterIcon: (filtered) => (
                    <span
                      style={{ color: filtered ? "#1890ff" : undefined }}
                    ></span>
                  ),
                },
                {
                  title:
                    TranslationContext !== undefined
                      ? TranslationContext.title.shippingaddress
                      : "Shipping address",
                  render: (row, item) => {
                    return (
                      <>
                        <p
                          className={
                            item.shippingAddress === "-NIL-"
                              ? "order-small-font d-inline-block"
                              : "order-small-font"
                          }
                        >
                          {item.shippingAddress}
                        </p>
                        {item.statusName === "Order Sync Pending" ? (
                          ""
                        ) : (
                          <>
                            {item.shippingAddress === "-NIL-" && (
                              <Popconfirm
                                title={
                                  <>
                                    <Spin
                                      tip="Please wait..."
                                      spinning={this.state.ordGetAddressData}
                                    >
                                      <div className="popover-input-cntr">
                                        <div className="row">
                                          <div className="col-md-6">
                                            <p>
                                              {TranslationContext !== undefined
                                                ? TranslationContext.span.name
                                                : "Name"}
                                            </p>
                                            <input
                                              type="text"
                                              placeholder={
                                                TranslationContext !== undefined
                                                  ? TranslationContext.label
                                                      .entername
                                                  : "Enter Name"
                                              }
                                              name="custName"
                                              autoComplete="off"
                                              maxLength={100}
                                              value={this.state.custName}
                                              onChange={this.handleTextOnchage}
                                              className={
                                                this.state.disCustName
                                                  ? "order-grid-btn-disable"
                                                  : ""
                                              }
                                              disabled={
                                                this.state.disCustName
                                                  ? true
                                                  : false
                                              }
                                            />
                                          </div>
                                          <div className="col-md-6">
                                            <p>
                                              {TranslationContext !== undefined
                                                ? TranslationContext.b.mobileno
                                                : "Mobile No"}
                                            </p>
                                            <input
                                              type="text"
                                              placeholder={
                                                TranslationContext !== undefined
                                                  ? TranslationContext
                                                      .placeholder.entermobileno
                                                  : "Enter Mobile No"
                                              }
                                              autoComplete="off"
                                              name="custMobileNo"
                                              value={this.state.custMobileNo}
                                              maxLength={45}
                                              disabled={
                                                this.state.disCustMobileNo
                                                  ? true
                                                  : false
                                              }
                                              className={
                                                this.state.disCustMobileNo
                                                  ? "order-grid-btn-disable"
                                                  : ""
                                              }
                                              onChange={
                                                this.hanldeMobileNoChange
                                              }
                                            />
                                          </div>
                                        </div>
                                        <div>
                                          <p>
                                            {TranslationContext !== undefined
                                              ? TranslationContext.p.address
                                              : "Address"}
                                          </p>
                                          <textarea
                                            placeholder="Enter Address"
                                            name="shippingAddress"
                                            autoComplete="off"
                                            value={this.state.shippingAddress}
                                            disabled={
                                              this.state.disShippingAddress
                                                ? true
                                                : false
                                            }
                                            className={
                                              this.state.disShippingAddress
                                                ? "order-grid-btn-disable"
                                                : ""
                                            }
                                            onChange={this.handleTextOnchage}
                                          ></textarea>
                                        </div>
                                        <div>
                                          <p>
                                            {TranslationContext !== undefined
                                              ? TranslationContext.p.landmark
                                              : "Landmark"}
                                          </p>
                                          <input
                                            type="text"
                                            placeholder={
                                              TranslationContext !== undefined
                                                ? TranslationContext.placeholder
                                                    .enterlandmark
                                                : "Enter Landmark"
                                            }
                                            autoComplete="off"
                                            name="landmark"
                                            value={this.state.landmark}
                                            disabled={
                                              this.state.disLandmark
                                                ? true
                                                : false
                                            }
                                            className={
                                              this.state.disLandmark
                                                ? "order-grid-btn-disable"
                                                : ""
                                            }
                                            onChange={this.handleTextOnchage}
                                          />
                                        </div>
                                        <div className="row">
                                          <div className="col-md-6">
                                            <p>
                                              {TranslationContext !== undefined
                                                ? TranslationContext.p.landmark
                                                : "Pin Code"}
                                            </p>
                                            <input
                                              type="text"
                                              placeholder={
                                                TranslationContext !== undefined
                                                  ? TranslationContext
                                                      .placeholder.enterpincode
                                                  : "Enter Pin Code"
                                              }
                                              name="pincode"
                                              autoComplete="off"
                                              maxLength={6}
                                              value={this.state.pincode}
                                              disabled={
                                                this.state.disPincode
                                                  ? true
                                                  : false
                                              }
                                              className={
                                                this.state.disPincode
                                                  ? "order-grid-btn-disable"
                                                  : ""
                                              }
                                              onChange={this.handlePinCodeCheck.bind(
                                                this,
                                                item.id
                                              )}
                                            />
                                          </div>
                                          <div className="col-md-6">
                                            <p>
                                              {TranslationContext !== undefined
                                                ? TranslationContext.p.city
                                                : "City"}
                                            </p>
                                            <input
                                              type="text"
                                              placeholder={
                                                TranslationContext !== undefined
                                                  ? TranslationContext
                                                      .placeholder.entercity
                                                  : "Enter City"
                                              }
                                              autoComplete="off"
                                              name="city"
                                              value={this.state.city}
                                              disabled={
                                                this.state.disCity
                                                  ? true
                                                  : false
                                              }
                                              className={
                                                this.state.disCity
                                                  ? "order-grid-btn-disable"
                                                  : ""
                                              }
                                              onChange={this.handleTextOnchage}
                                            />
                                          </div>
                                        </div>
                                        <div className="row">
                                          <div className="col-md-6">
                                            <p>
                                              {TranslationContext !== undefined
                                                ? TranslationContext.p.state
                                                : "State"}
                                            </p>
                                            <input
                                              type="text"
                                              placeholder={
                                                TranslationContext !== undefined
                                                  ? TranslationContext
                                                      .placeholder.enterstate
                                                  : "Enter State"
                                              }
                                              name="Ordstate"
                                              autoComplete="off"
                                              value={this.state.Ordstate}
                                              onChange={this.handleTextOnchage}
                                              className={
                                                this.state.disOrdState
                                                  ? "order-grid-btn-disable"
                                                  : ""
                                              }
                                              disabled={
                                                this.state.ordStateDisabled
                                              }
                                            />
                                          </div>
                                          <div className="col-md-6">
                                            <p>
                                              {TranslationContext !== undefined
                                                ? TranslationContext.p.country
                                                : "Country"}
                                            </p>
                                            <input
                                              type="text"
                                              placeholder={
                                                TranslationContext !== undefined
                                                  ? TranslationContext
                                                      .placeholder.entercountry
                                                  : "Enter Country"
                                              }
                                              name="country"
                                              autoComplete="off"
                                              value={this.state.country}
                                              disabled={
                                                this.state.disCountry
                                                  ? true
                                                  : false
                                              }
                                              className={
                                                this.state.disCountry
                                                  ? "order-grid-btn-disable"
                                                  : ""
                                              }
                                              onChange={this.handleTextOnchage}
                                            />
                                          </div>
                                        </div>
                                      </div>
                                      {this.state.pincodeChecAvaibility && (
                                        <p
                                          className="non-deliverable"
                                          style={{ marginBottom: "5px" }}
                                        >
                                          {TranslationContext !== undefined
                                            ? TranslationContext
                                                .ticketingDashboard
                                                .checkingyouravailability
                                            : "Checking your availability."}
                                        </p>
                                      )}
                                      {this.state.showPinCodereturnMsg && (
                                        <>
                                          {this.state.showPinStatusCodeMsg ===
                                          false ? (
                                            <p className="non-deliverable">
                                              {TranslationContext !== undefined
                                                ? TranslationContext
                                                    .ticketingDashboard
                                                    .kidlycheckenteredstatepincode
                                                : "Kidly Check Entered State Pin Code"}
                                            </p>
                                          ) : (
                                            <p className="non-deliverable">
                                              {TranslationContext !== undefined
                                                ? TranslationContext
                                                    .ticketingDashboard
                                                    .enteredpincodeisnondeliverable
                                                : "Entered Pin code is non deliverable"}
                                            </p>
                                          )}

                                          <div className="popover-radio-cntr">
                                            <div>
                                              <input
                                                type="radio"
                                                id="order-returns"
                                                name="ordMoveReturn"
                                                checked={
                                                  this.state.ordMoveReturn
                                                }
                                                onChange={
                                                  this.handleOrdChangeOptions
                                                }
                                              />
                                              <label htmlFor="order-returns">
                                                {TranslationContext !==
                                                undefined
                                                  ? TranslationContext
                                                      .ticketingDashboard
                                                      .moveorderintoreturns
                                                  : "Move Order into Returns"}
                                              </label>
                                            </div>
                                            <div>
                                              <input
                                                type="radio"
                                                id="self-pickup"
                                                name="ordSelfPickup"
                                                checked={
                                                  this.state.ordSelfPickup
                                                }
                                                onChange={
                                                  this.handleOrdChangeOptions
                                                }
                                              />
                                              <label htmlFor="self-pickup">
                                                {TranslationContext !==
                                                undefined
                                                  ? TranslationContext
                                                      .ticketingDashboard
                                                      .convertthisorderinselfpickup
                                                  : "Convert this order in Self Pickup"}
                                              </label>
                                            </div>
                                          </div>
                                          {this.state.ordSelfPickup && (
                                            <>
                                              <div className="row">
                                                <div className="col-md-6">
                                                  <p>
                                                    {TranslationContext !==
                                                    undefined
                                                      ? TranslationContext.title
                                                          .date
                                                      : "Date"}
                                                  </p>

                                                  <DatePicker
                                                    selected={
                                                      this.state.OrdPickupDate
                                                    }
                                                    onChange={(date) =>
                                                      this.handleOrdDateChange(
                                                        date
                                                      )
                                                    }
                                                    placeholderText={
                                                      TranslationContext !==
                                                      undefined
                                                        ? TranslationContext
                                                            .ticketingDashboard
                                                            .enterdate
                                                        : "Enter Date"
                                                    }
                                                    value={
                                                      this.state.OrdPickupDate
                                                    }
                                                    minDate={new Date()}
                                                    showMonthDropdown
                                                    showYearDropdown
                                                    className="txt-1"
                                                    dateFormat="dd/MM/yyyy"
                                                  />
                                                </div>
                                                <div className="col-md-6">
                                                  <p>
                                                    {TranslationContext !==
                                                    undefined
                                                      ? TranslationContext.title
                                                          .time
                                                      : "Time"}
                                                  </p>

                                                  <DatePicker
                                                    selected={
                                                      this.state.OrdPickupTime
                                                    }
                                                    onChange={(time) =>
                                                      this.handleOrdPickupTimeChange(
                                                        time
                                                      )
                                                    }
                                                    showTimeSelect
                                                    showTimeSelectOnly
                                                    timeIntervals={15}
                                                    timeCaption="Time"
                                                    dateFormat="h:mm aa"
                                                    placeholderText={
                                                      TranslationContext !==
                                                      undefined
                                                        ? TranslationContext
                                                            .ticketingDashboard
                                                            .entertime
                                                        : "Enter Time"
                                                    }
                                                    minTime={this.state.minTime}
                                                    maxTime={moment()
                                                      .endOf("day")
                                                      .toDate()}
                                                  />
                                                </div>
                                              </div>
                                            </>
                                          )}
                                        </>
                                      )}
                                    </Spin>
                                  </>
                                }
                                overlayClassName="order-popover order-popover-butns order-popover-address customaddpop"
                                placement="bottomRight"
                                onVisibleChange={(visible) =>
                                  this.setState({
                                    orderPopoverOverlay: visible,
                                  })
                                }
                                icon={false}
                                okText={
                                  TranslationContext !== undefined
                                    ? TranslationContext.button.proceed
                                    : "Proceed"
                                }
                                onConfirm={this.handleSubmitOrderAddress.bind(
                                  this,
                                  item.id
                                )}
                                cancelText={
                                  TranslationContext !== undefined
                                    ? TranslationContext.button.cancel
                                    : "Cancel"
                                }
                                okButtonProps={{
                                  disabled: this.state.pincodeChecAvaibility,
                                }}
                              >
                                <p
                                  style={{ cursor: "pointer" }}
                                  className="order-small-font d-inline-block order-clr-blue ml-1"
                                  onClick={this.handleClearAddressOrder.bind(
                                    this,
                                    item.id
                                  )}
                                >
                                  (
                                  {TranslationContext !== undefined
                                    ? TranslationContext.p.addresspending
                                    : "ADDRESS PENDING"}
                                  )
                                </p>
                              </Popconfirm>
                            )}
                          </>
                        )}
                      </>
                    );
                  },
                  className: "white-space-init order-desktop",
                },
                {
                  title:
                    TranslationContext !== undefined
                      ? TranslationContext.title.actions
                      : "Action",
                  render: (row, item) => {
                    return (
                      <div>
                        <div className="paymnent">
                          {item.actionTypeName === "Payment Details" && (
                            /* ----------------Don't remove thi code--------------------- */
                            // <Popover
                            //   content={
                            //     <div className="order-tab-popover">
                            //       <div className="pay-done">
                            //         <p>
                            //           {TranslationContext !== undefined
                            //             ? TranslationContext.p.viewsearch
                            //             : "Payment Date"}
                            //           :
                            //         </p>
                            //         <span> {item.paymentBillDate}</span>
                            //       </div>
                            //       <div className="pay-done">
                            //         <p>
                            //           {TranslationContext !== undefined
                            //             ? TranslationContext.p.totalamount
                            //             : "Total Amount"}
                            //           :
                            //         </p>
                            //         <span>{item.amount}</span>
                            //       </div>
                            //     </div>
                            //   }
                            //   trigger="click"
                            //   overlayClassName="order-popover order-popover-butns"
                            //   placement="bottomRight"
                            //   onVisibleChange={(visible) =>
                            //     this.setState({ orderPopoverOverlay: visible })
                            //   }
                            // >
                            //   <button className="butn order-grid-butn order-grid-butn-green">
                            //     Payment Done
                            //   </button>
                            // </Popover>
                            /* ----------------Don't remove thi code--------------------- */
                            <button className="butn order-grid-butn order-grid-butn-green">
                              Payment Done
                            </button>
                          )}
                          {item.actionTypeName === "Collect Payment" && (
                            <Popconfirm
                              title={
                                <div className="order-tab-popover">
                                  <div className="no-pay">
                                    <img src={NoPayment} alt="no payment" />
                                  </div>
                                  <p>
                                    {TranslationContext !== undefined
                                      ? TranslationContext.p
                                          .paymentnotcompletedyet
                                      : "Payment not completed yet"}
                                  </p>
                                </div>
                              }
                              overlayClassName="order-popover order-popover-butns order-popover-no-pay"
                              placement="bottomRight"
                              onVisibleChange={(visible) =>
                                this.setState({ orderPopoverOverlay: visible })
                              }
                              icon={false}
                              okText={
                                item.countSendPaymentLink === 0
                                  ? TranslationContext !== undefined
                                    ? TranslationContext.button.sendlink
                                    : "Send Link"
                                  : TranslationContext !== undefined
                                  ? TranslationContext.button.sendlinkagain
                                  : "Send Link Again"
                              }
                              onConfirm={this.handleSentPaymentLink.bind(
                                this,
                                item
                              )}
                              disabled={item.disablePaymentlinkbutton}
                            >
                              <button
                                style={{
                                  display: item.showPaymentLinkPopup
                                    ? "block"
                                    : "none",
                                }}
                                className={
                                  item.showPaymentLinkPopup
                                    ? "butn order-grid-butn"
                                    : "butn order-grid-butn disabled-link"
                                }
                              >
                                {TranslationContext !== undefined
                                  ? TranslationContext.button.collectpayment
                                  : item.actionTypeName}
                              </button>
                            </Popconfirm>
                          )}
                          {item.actionTypeName === "Sync Order" && (
                            <button className="butn order-grid-butn order-grid-butn-yellow">
                              {TranslationContext !== undefined
                                ? TranslationContext.button.syncorder
                                : item.actionTypeName}
                            </button>
                          )}
                          {item.actionTypeName === "Get Address" && (
                            <button className="butn order-grid-butn pickedbutn">
                              {TranslationContext !== undefined
                                ? TranslationContext.button.getaddress
                                : item.actionTypeName}
                            </button>
                          )}
                          {item.actionTypeName === "Ready to Ship" && (
                            <button className="butn order-grid-butn delibutn">
                              {TranslationContext !== undefined
                                ? TranslationContext.button.readytoship
                                : item.actionTypeName}
                            </button>
                          )}

                          {item.actionTypeName === "Update Payment" && (
                            <button className="butn order-grid-butn order-grid-butn-yellow">
                              {TranslationContext !== undefined
                                ? TranslationContext.button.updatepayment
                                : item.actionTypeName}
                            </button>
                          )}
                        </div>
                        <div className="itemviewmobile">
                          <div className="d-flex align-items-center">
                            {item.ordersItemList.length > 0 ? (
                              <>
                                <Popover
                                  content={
                                    <Table
                                      className="components-table-demo-nested antd-table-campaign antd-table-order custom-antd-table"
                                      columns={[
                                        {
                                          title:
                                            TranslationContext !== undefined
                                              ? TranslationContext.title.itemid
                                              : "Item ID",
                                          dataIndex: "itemID",
                                        },
                                        {
                                          title:
                                            TranslationContext !== undefined
                                              ? TranslationContext.title
                                                  .itemname
                                              : "Item Name",
                                          dataIndex: "itemName",
                                        },
                                        {
                                          title:
                                            TranslationContext !== undefined
                                              ? TranslationContext.title
                                                  .itemprice
                                              : "Item Price",
                                          dataIndex: "itemPrice",
                                          className: "order-desktop",
                                        },
                                        {
                                          title:
                                            TranslationContext !== undefined
                                              ? TranslationContext.title
                                                  .quantity
                                              : "Quantity",
                                          dataIndex: "quantity",
                                          className: "order-desktop",
                                        },
                                        {
                                          title: "Item Price/ Quantity",
                                          className:
                                            "order-mobile pick-up-date",
                                          render: (row, item) => {
                                            return (
                                              <p>
                                                {item.itemPrice}/{" "}
                                                {item.quantity}
                                              </p>
                                            );
                                          },
                                        },
                                      ]}
                                      scroll={{ y: 240 }}
                                      pagination={false}
                                      dataSource={item.ordersItemList}
                                    />
                                  }
                                  trigger="click"
                                  placement="bottom"
                                  overlayClassName="order-popover-table order-popover order-popover-table-big"
                                  onVisibleChange={(visible) =>
                                    this.setState({
                                      orderPopoverOverlay: visible,
                                    })
                                  }
                                >
                                  <img
                                    src={OrderHamb}
                                    className="order-hamb iteminfo"
                                  />
                                  <img src={Info} className="item-img" />
                                </Popover>
                                <p>
                                  {item.ordersItemList.length > 0
                                    ? item.ordersItemList.length
                                    : "-NIL-"}
                                </p>
                              </>
                            ) : null}
                          </div>
                        </div>
                      </div>
                    );
                  },
                },
              ]}
              pagination={false}
              dataSource={this.state.orderGridData}
              loading={this.state.OrderTabLoading}
            />
          ) : (
            <>
              {this.state.isMobileView ? (
                <>
                  <Pagination
                    currentPage={this.state.currentPage}
                    totalSize={this.state.totalCount}
                    sizePerPage={this.state.postsPerPage}
                    changeCurrentPage={this.PaginationOnChange}
                    theme="bootstrap"
                  />
                  <div className="position-relative">
                    <div className="item-selection Camp-pagination">
                      <select
                        value={this.state.postsPerPage}
                        onChange={this.handlePageItemchange}
                      >
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                        <option value={30}>30</option>
                      </select>
                      <p>
                        {TranslationContext !== undefined
                          ? TranslationContext.p.itemsperpage
                          : "Items per page"}
                      </p>
                    </div>
                  </div>
                </>
              ) : null}
              <Spin spinning={this.state.OrderTabLoading}>
                <Collapse
                  bordered={false}
                  className="site-collapse-custom-collapse"
                  expandIconPosition={"right"}
                  destroyInactivePanel={true}
                  onChange={this.handlecollapseChange.bind(this)}
                  activeKey={this.state.activePanel}
                >
                  {this.state.orderGridData.length > 0
                    ? this.state.orderGridData.map((item, key) => {
                        return (
                          <Panel
                            header={
                              <div>
                                <div>
                                  <div className="d-flex align-items-center overflow-hidden namenumbermain">
                                    <div className="invoice-icon-cntr numimg">
                                      <img
                                        src={
                                          item.sourceOfOrder === "FTP"
                                            ? OrderShopingGreen
                                            : item.sourceOfOrder === "POS"
                                            ? OrderBag
                                            : item.sourceOfOrder === "WebBot" ||
                                              item.sourceOfOrder === "Ecom" ||
                                              item.sourceOfOrder === "Bell" ||
                                              item.sourceOfOrder === "WB-INV"
                                            ? OrderShopingBlack
                                            : null
                                        }
                                        className={
                                          item.sourceOfOrder === "FTP"
                                            ? "order-shoping"
                                            : item.sourceOfOrder === "POS"
                                            ? "order-bag"
                                            : item.sourceOfOrder === "WebBot" ||
                                              item.sourceOfOrder === "Ecom" ||
                                              item.sourceOfOrder === "Bell" ||
                                              item.sourceOfOrder === "WB-INV"
                                            ? "order-shoping"
                                            : null
                                        }
                                      />
                                    </div>

                                    <label className="order-bill-no">
                                      {item.invoiceNo}
                                    </label>
                                    {item.ordersItemList.length > 0 ? (
                                      <>
                                        <Popover
                                          content={
                                            <Table
                                              className="components-table-demo-nested antd-table-campaign antd-table-order custom-antd-table"
                                              columns={[
                                                {
                                                  title:
                                                    TranslationContext !==
                                                    undefined
                                                      ? TranslationContext.title
                                                          .itemid
                                                      : "Item ID",
                                                  dataIndex: "itemID",
                                                },
                                                {
                                                  title:
                                                    TranslationContext !==
                                                    undefined
                                                      ? TranslationContext.title
                                                          .itemname
                                                      : "Item Name",
                                                  dataIndex: "itemName",
                                                },
                                                {
                                                  title:
                                                    TranslationContext !==
                                                    undefined
                                                      ? TranslationContext.title
                                                          .itemprice
                                                      : "Item Price",
                                                  dataIndex: "itemPrice",
                                                },
                                                {
                                                  title:
                                                    TranslationContext !==
                                                    undefined
                                                      ? TranslationContext.title
                                                          .quantity
                                                      : "Quantity",
                                                  dataIndex: "quantity",
                                                },
                                              ]}
                                              scroll={{ y: 240 }}
                                              pagination={false}
                                              dataSource={item.ordersItemList}
                                            />
                                          }
                                          trigger="click"
                                          placement="bottom"
                                          overlayClassName="order-popover-table order-popover order-popover-table-big"
                                          onVisibleChange={(visible) =>
                                            this.setState({
                                              orderPopoverOverlay: visible,
                                            })
                                          }
                                        >
                                          <div className="mobeye">
                                            <img
                                              src={Info}
                                              className="item-img"
                                            />
                                            <span>
                                              {item.ordersItemList.length}
                                            </span>
                                          </div>
                                        </Popover>
                                      </>
                                    ) : null}

                                    {item.isShoppingBagConverted === true && (
                                      <Popover
                                        content={
                                          <>
                                            <p className="shopping-num-invoice">
                                              {TranslationContext !== undefined
                                                ? TranslationContext.title
                                                    .shoppingbagno
                                                : "Shopping bag No"}
                                              :<span>{item.shoppingBagNo}</span>
                                            </p>
                                            <Table
                                              className="components-table-demo-nested antd-table-campaign antd-table-order custom-antd-table"
                                              columns={[
                                                {
                                                  title:
                                                    TranslationContext !==
                                                    undefined
                                                      ? TranslationContext.title
                                                          .itemid
                                                      : "Item ID",
                                                  dataIndex: "itemID",
                                                },
                                                {
                                                  title:
                                                    TranslationContext !==
                                                    undefined
                                                      ? TranslationContext.title
                                                          .itemname
                                                      : "Item Name",
                                                  dataIndex: "itemName",
                                                },
                                                {
                                                  title:
                                                    TranslationContext !==
                                                    undefined
                                                      ? TranslationContext.title
                                                          .itemprice
                                                      : "Item Price",
                                                  dataIndex: "itemPrice",
                                                },
                                                {
                                                  title:
                                                    TranslationContext !==
                                                    undefined
                                                      ? TranslationContext.title
                                                          .quantity
                                                      : "Quantity",
                                                  dataIndex: "quantity",
                                                },
                                              ]}
                                              scroll={{ y: 240 }}
                                              pagination={false}
                                              dataSource={
                                                item.shoppingBagItemList
                                                  .length > 0
                                                  ? item.shoppingBagItemList
                                                  : []
                                              }
                                            />
                                          </>
                                        }
                                        trigger="click"
                                        overlayClassName="order-popover-table order-popover order-popover-invoice"
                                        placement="bottomLeft"
                                        onVisibleChange={(visible) =>
                                          this.setState({
                                            orderPopoverOverlay: visible,
                                          })
                                        }
                                      >
                                        <img
                                          src={OrderInfo}
                                          className="order-info"
                                        />
                                      </Popover>
                                    )}
                                    <div className="namenumber">
                                      <p>{item.customerName},</p>
                                      <p className="order-small-font">
                                        {item.mobileNumber}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            }
                          >
                            <div className="row">
                              <div className="col-7 p-0">
                                <span className="date">
                                  {item.date} {item.time}
                                </span>
                              </div>
                              <div className="col-5 p-0 text-right">
                                <span className="stname">
                                  {item.statusName}
                                </span>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-12 p-0">
                                <span className="delivery">{item.amount}</span>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-6 p-0">
                                <span className="addres">
                                  <p>{item.shippingAddress}</p>
                                </span>
                              </div>
                              <div className="col-6 pr-1 paybtn text-right">
                                <div>
                                  {item.actionTypeName ===
                                    "Payment Details" && (
                                    /* ----------------Don't remove thi code--------------------- */
                                    // <Popover
                                    //   content={
                                    //     <div className="order-tab-popover">
                                    //       <div className="pay-done">
                                    //         <p>
                                    //           {TranslationContext !== undefined
                                    //             ? TranslationContext.p
                                    //                 .viewsearch
                                    //             : "Payment Date"}
                                    //           :
                                    //         </p>
                                    //         <span> {item.paymentBillDate}</span>
                                    //       </div>
                                    //       <div className="pay-done">
                                    //         <p>
                                    //           {TranslationContext !== undefined
                                    //             ? TranslationContext.p
                                    //                 .totalamount
                                    //             : "Total Amount"}
                                    //           :
                                    //         </p>
                                    //         <span>{item.amount}</span>
                                    //       </div>
                                    //     </div>
                                    //   }
                                    //   trigger="click"
                                    //   overlayClassName="order-popover order-popover-butns"
                                    //   placement="bottomRight"
                                    //   onVisibleChange={(visible) =>
                                    //     this.setState({
                                    //       orderPopoverOverlay: visible,
                                    //     })
                                    //   }
                                    // >
                                    //   <button className="butn order-grid-butn order-grid-butn-green">
                                    //   Payment Done
                                    //   </button>
                                    // </Popover>
                                    /* ----------------Don't remove thi code--------------------- */
                                    <button className="butn order-grid-butn order-grid-butn-green">
                                      Payment Done
                                    </button>
                                  )}
                                  {item.actionTypeName ===
                                    "Collect Payment" && (
                                    <Popconfirm
                                      title={
                                        <div className="order-tab-popover">
                                          <div className="no-pay">
                                            <img
                                              src={NoPayment}
                                              alt="no payment"
                                            />
                                          </div>
                                          <p>
                                            {TranslationContext !== undefined
                                              ? TranslationContext.p
                                                  .paymentnotcompletedyet
                                              : "Payment not completed yet"}
                                          </p>
                                        </div>
                                      }
                                      overlayClassName="order-popover order-popover-butns order-popover-no-pay"
                                      placement="bottomRight"
                                      onVisibleChange={(visible) =>
                                        this.setState({
                                          orderPopoverOverlay: visible,
                                        })
                                      }
                                      icon={false}
                                      okText={
                                        item.countSendPaymentLink === 0
                                          ? TranslationContext !== undefined
                                            ? TranslationContext.button.sendlink
                                            : "Send Link"
                                          : TranslationContext !== undefined
                                          ? TranslationContext.button
                                              .sendlinkagain
                                          : "Send Link Again"
                                      }
                                      onConfirm={this.handleSentPaymentLink.bind(
                                        this,
                                        item
                                      )}
                                      disabled={item.disablePaymentlinkbutton}
                                    >
                                      <button
                                        style={{
                                          display: item.showPaymentLinkPopup
                                            ? "block"
                                            : "none",
                                        }}
                                        className={
                                          item.showPaymentLinkPopup
                                            ? "butn order-grid-butn"
                                            : "butn order-grid-butn disabled-link"
                                        }
                                      >
                                        {TranslationContext !== undefined
                                          ? TranslationContext.button
                                              .collectpayment
                                          : item.actionTypeName}
                                      </button>
                                    </Popconfirm>
                                  )}
                                  {item.actionTypeName === "Sync Order" && (
                                    <button className="butn order-grid-butn order-grid-butn-yellow">
                                      {TranslationContext !== undefined
                                        ? TranslationContext.button.syncorder
                                        : item.actionTypeName}
                                    </button>
                                  )}
                                  {item.actionTypeName === "Get Address" && (
                                    <button
                                      className="butn order-grid-butn pickedbutn"
                                      onClick={this.handleGetAddressMdlMobileOpen.bind(
                                        this,
                                        item
                                      )}
                                    >
                                      {TranslationContext !== undefined
                                        ? TranslationContext.button.getaddress
                                        : item.actionTypeName}
                                    </button>
                                  )}
                                  {item.actionTypeName === "Ready to Ship" && (
                                    <button className="butn order-grid-butn delibutn">
                                      {TranslationContext !== undefined
                                        ? TranslationContext.button.readytoship
                                        : item.actionTypeName}
                                    </button>
                                  )}

                                  {item.actionTypeName === "Update Payment" && (
                                    <button className="butn order-grid-butn order-grid-butn-yellow">
                                      {TranslationContext !== undefined
                                        ? TranslationContext.button
                                            .updatepayment
                                        : item.actionTypeName}
                                    </button>
                                  )}
                                </div>
                              </div>
                            </div>
                          </Panel>
                        );
                      })
                    : null}
                </Collapse>

                {this.state.orderGridData.length === 0 ? (
                  <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                ) : null}
              </Spin>
            </>
          )}
          {!this.state.isMobileView ? (
            <>
              <Pagination
                currentPage={this.state.currentPage}
                totalSize={this.state.totalCount}
                sizePerPage={this.state.postsPerPage}
                changeCurrentPage={this.PaginationOnChange}
                theme="bootstrap"
              />
              <div className="position-relative">
                <div className="item-selection Camp-pagination">
                  <select
                    value={this.state.postsPerPage}
                    onChange={this.handlePageItemchange}
                  >
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={30}>30</option>
                  </select>
                  <p>
                    {TranslationContext !== undefined
                      ? TranslationContext.p.itemsperpage
                      : "Items per page"}
                  </p>
                </div>
              </div>
            </>
          ) : null}

          <Modal
            open={this.state.AddressConf}
            onClose={this.handleAddressMdlModalClose.bind(this)}
            center
            modalId="addressPincode-popup"
            overlayId="Pincode-ovrly"
          >
            <div className="padding-div">
              <h5>
                {TranslationContext !== undefined
                  ? TranslationContext.ticketingDashboard
                      .areyousureyouwanttosave
                  : "Are you sure you want to save?"}
              </h5>
              <div className="main-pincodeDiv">
                <button
                  type="button"
                  className="btn-cancel-status"
                  onClick={this.handleAddressMdlModalClose.bind(this)}
                >
                  {TranslationContext !== undefined
                    ? TranslationContext.button.cancel
                    : "Cancel"}
                </button>
                <button
                  type="button"
                  className="btn-apply-status m-l-40"
                  onClick={this.handleUpdateAddressPending.bind(
                    this,
                    this.state.orderId
                  )}
                >
                  {TranslationContext !== undefined
                    ? TranslationContext.ticketingDashboard.ok
                    : "Ok"}
                </button>
              </div>
            </div>
          </Modal>
          {/* -----------Get Address pending modal for mobile view----------------- */}
          <Modal
            open={this.state.getAddressMdlMobile}
            onClose={this.handleGetAddressMdlMobileClose.bind(this)}
            center
            modalId="addressPincode-popup"
            classNames={{ modal: "getAddressMdlMobile" }}
            overlayId="ordmdl-ovrly"
          >
            <div
              className="closemob"
              style={{ marginBottom: "20px" }}
              onClick={this.handleGetAddressMdlMobileClose.bind(this)}
            ></div>
            <div className="padding-divMobile">
              <div className="popover-input-cntr">
                <div className="row">
                  <div className="col-md-6">
                    <p>
                      {TranslationContext !== undefined
                        ? TranslationContext.span.name
                        : "Name"}
                    </p>
                    <input
                      type="text"
                      placeholder={
                        TranslationContext !== undefined
                          ? TranslationContext.label.entername
                          : "Enter Name"
                      }
                      name="custName"
                      autoComplete="off"
                      maxLength={100}
                      value={this.state.custName}
                      className={
                        this.state.disCustName ? "order-grid-btn-disable" : ""
                      }
                      disabled={this.state.disCustName ? true : false}
                      onChange={this.handleTextOnchage}
                    />
                  </div>
                  <div className="col-md-6">
                    <p>
                      {TranslationContext !== undefined
                        ? TranslationContext.b.mobileno
                        : "Mobile No"}
                    </p>
                    <input
                      type="text"
                      placeholder={
                        TranslationContext !== undefined
                          ? TranslationContext.placeholder.entermobileno
                          : "Enter Mobile No"
                      }
                      autoComplete="off"
                      name="custMobileNo"
                      value={this.state.custMobileNo}
                      maxLength={45}
                      className={
                        this.state.disCustMobileNo
                          ? "order-grid-btn-disable"
                          : ""
                      }
                      disabled={this.state.disCustMobileNo ? true : false}
                      onChange={this.hanldeMobileNoChange}
                    />
                  </div>
                </div>
                <div>
                  <p>
                    {TranslationContext !== undefined
                      ? TranslationContext.p.address
                      : "Address"}
                  </p>
                  <textarea
                    placeholder="Enter Address"
                    name="shippingAddress"
                    value={this.state.shippingAddress}
                    onChange={this.handleTextOnchage}
                    className={
                      this.state.disShippingAddress
                        ? "mobileAddress order-grid-btn-disable"
                        : "mobileAddress"
                    }
                    disabled={this.state.disShippingAddress ? true : false}
                  ></textarea>
                </div>
                <div>
                  <p>
                    {TranslationContext !== undefined
                      ? TranslationContext.p.landmark
                      : "Landmark"}
                  </p>
                  <input
                    type="text"
                    placeholder={
                      TranslationContext !== undefined
                        ? TranslationContext.placeholder.enterlandmark
                        : "Enter Landmark"
                    }
                    name="landmark"
                    value={this.state.landmark}
                    className={
                      this.state.disLandmark ? "order-grid-btn-disable" : ""
                    }
                    disabled={this.state.disLandmark ? true : false}
                    onChange={this.handleTextOnchage}
                  />
                </div>
                <div className="row">
                  <div className="col-6">
                    <p>
                      {TranslationContext !== undefined
                        ? TranslationContext.p.pincode
                        : "Pin Code"}
                    </p>
                    <input
                      type="text"
                      placeholder={
                        TranslationContext !== undefined
                          ? TranslationContext.placeholder.enterpincode
                          : "Enter Pin Code"
                      }
                      name="pincode"
                      autoComplete="off"
                      maxLength={6}
                      value={this.state.pincode}
                      className={
                        this.state.disPincode ? "order-grid-btn-disable" : ""
                      }
                      disabled={this.state.disPincode ? true : false}
                      onChange={this.handlePinCodeCheck.bind(
                        this,
                        this.state.orderId
                      )}
                    />
                  </div>
                  <div className="col-6">
                    <p>
                      {TranslationContext !== undefined
                        ? TranslationContext.p.city
                        : "City"}
                    </p>
                    <input
                      type="text"
                      placeholder={
                        TranslationContext !== undefined
                          ? TranslationContext.placeholder.entercity
                          : "Enter City"
                      }
                      name="city"
                      value={this.state.city}
                      className={
                        this.state.disCity ? "order-grid-btn-disable" : ""
                      }
                      disabled={this.state.disCity ? true : false}
                      onChange={this.handleTextOnchage}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-6">
                    <p>
                      {TranslationContext !== undefined
                        ? TranslationContext.p.state
                        : "State"}
                    </p>
                    <input
                      type="text"
                      placeholder={
                        TranslationContext !== undefined
                          ? TranslationContext.placeholder.enterstate
                          : "Enter State"
                      }
                      name="Ordstate"
                      value={this.state.Ordstate}
                      onChange={this.handleTextOnchage}
                      className={
                        this.state.disOrdState ? "order-grid-btn-disable" : ""
                      }
                      disabled={this.state.ordStateDisabled}
                    />
                  </div>
                  <div className="col-6">
                    <p>
                      {TranslationContext !== undefined
                        ? TranslationContext.p.country
                        : "Country"}
                    </p>
                    <input
                      type="text"
                      placeholder={
                        TranslationContext !== undefined
                          ? TranslationContext.placeholder.entercountry
                          : "Enter Country"
                      }
                      name="country"
                      value={this.state.country}
                      className={
                        this.state.disCountry ? "order-grid-btn-disable" : ""
                      }
                      disabled={this.state.disCountry ? true : false}
                      onChange={this.handleTextOnchage}
                    />
                  </div>
                </div>
              </div>
              {this.state.pincodeChecAvaibility && (
                <p className="non-deliverable" style={{ marginBottom: "5px" }}>
                  {TranslationContext !== undefined
                    ? TranslationContext.ticketingDashboard
                        .checkingyouravailability
                    : "Checking your availability."}
                </p>
              )}
              {this.state.showPinCodereturnMsg && (
                <>
                  {this.state.showPinStatusCodeMsg === false ? (
                    <p className="non-deliverable">
                      {TranslationContext !== undefined
                        ? TranslationContext.ticketingDashboard
                            .kidlycheckenteredstatepincode
                        : "Kidly Check Entered State Pin Code"}
                    </p>
                  ) : (
                    <p className="non-deliverable">
                      {TranslationContext !== undefined
                        ? TranslationContext.ticketingDashboard
                            .enteredpincodeisnondeliverable
                        : "Entered Pin code is non deliverable"}
                    </p>
                  )}

                  <div className="popover-radio-cntr">
                    <div>
                      <input
                        type="radio"
                        id="order-returns"
                        name="ordMoveReturn"
                        checked={this.state.ordMoveReturn}
                        onChange={this.handleOrdChangeOptions}
                      />
                      <label htmlFor="order-returns">
                        {TranslationContext !== undefined
                          ? TranslationContext.ticketingDashboard
                              .moveorderintoreturns
                          : "Move Order into Returns"}
                      </label>
                    </div>
                    <div>
                      <input
                        type="radio"
                        id="self-pickup"
                        name="ordSelfPickup"
                        checked={this.state.ordSelfPickup}
                        onChange={this.handleOrdChangeOptions}
                      />
                      <label htmlFor="self-pickup">
                        {TranslationContext !== undefined
                          ? TranslationContext.ticketingDashboard
                              .convertthisorderinselfpickup
                          : "Convert this order in Self Pickup"}
                      </label>
                    </div>
                  </div>
                  {this.state.ordSelfPickup && (
                    <>
                      <div className="row">
                        <div className="col-md-6">
                          <p>
                            {TranslationContext !== undefined
                              ? TranslationContext.title.date
                              : "Date"}
                          </p>

                          <DatePicker
                            selected={this.state.OrdPickupDate}
                            onChange={(date) => this.handleOrdDateChange(date)}
                            placeholderText={
                              TranslationContext !== undefined
                                ? TranslationContext.ticketingDashboard
                                    .enterdate
                                : "Enter Date"
                            }
                            value={this.state.OrdPickupDate}
                            minDate={new Date()}
                            showMonthDropdown
                            showYearDropdown
                            className="txt-1"
                            dateFormat="dd/MM/yyyy"
                          />
                        </div>
                        <div className="col-md-6">
                          <p>
                            {TranslationContext !== undefined
                              ? TranslationContext.title.time
                              : "Time"}
                          </p>

                          <DatePicker
                            selected={this.state.OrdPickupTime}
                            onChange={(time) =>
                              this.handleOrdPickupTimeChange(time)
                            }
                            showTimeSelect
                            showTimeSelectOnly
                            timeIntervals={15}
                            timeCaption="Time"
                            dateFormat="h:mm aa"
                            placeholderText={
                              TranslationContext !== undefined
                                ? TranslationContext.ticketingDashboard
                                    .entertime
                                : "Enter Time"
                            }
                            minTime={this.state.minTime}
                            maxTime={moment()
                              .endOf("day")
                              .toDate()}
                          />
                        </div>
                      </div>
                    </>
                  )}
                </>
              )}
              <button
                className="mobileProceedOrd"
                onClick={this.handleSubmitOrderAddress.bind(
                  this,
                  this.state.orderId
                )}
              >
                Proceed
              </button>
            </div>
          </Modal>
        </div>
      </>
    );
  }
}

export default OrderTab;
