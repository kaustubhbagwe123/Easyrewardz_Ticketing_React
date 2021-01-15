import React, { Component } from "react";
import axios from "axios";
import {
  Table,
  Popover,
  Popconfirm,
  Collapse,
  Spin,
  Checkbox,
  Empty,
} from "antd";
import OrderInfo from "./../../../assets/Images/order-info.png";
import Deliver from "./../../../assets/Images/icons8-delivery.svg";
import OrderHamb from "./../../../assets/Images/order-hamb.png";
import Info from "./../../../assets/Images/Info-black.png";
import OrderDel from "./../../../assets/Images/order-del.png";
import { authHeader } from "../../../helpers/authHeader";
import config from "../../../helpers/config";
import Pagination from "react-pagination-js";
import "react-pagination-js/dist/styles.css";
import * as translationHI from "../../../translations/hindi";
import * as translationMA from "../../../translations/marathi";
import { NotificationManager } from "react-notifications";
import InfoIcon from "./../../../assets/Images/info-icon.png";
import CancelImg from "./../../../assets/Images/cancel.png";
import CircleCancelImg from "./../../../assets/Images/Circle-cancel.png";
import Modal from "react-responsive-modal";

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
class ShoppingBagTab extends Component {
  constructor(props) {
    super(props);

    this.state = {
      shoppingBagGridData: [],
      filterShoppingStatus: false,
      orderPopoverOverlay: false,
      filterShoppingDeliveryType: false,
      totalCount: 0,
      currentPage: 1,
      postsPerPage: 10,
      statusFilterData: [],
      strStatus: "",
      ShopBagLoading: false,
      DeliveryStatusFilter: [],
      deliveryStrStatus: "",
      translateLanguage: {},
      ShopCancelComment: "",
      invoiceNo: "",
      amountNo: "",
      orderSearchText: "",
      activePanel: [],
      isMobileView: false,
      ShareCustomerData: false,
      ShopItemData: [],
      OrdStoreCode: "",
      ordItemPopupClose: false,
      MobCancelCommentMdl: false,
      OrdShopId: "",
      popUpClicking: false,
      ItemShareCustomer: false,
      itemId: 0,
    };
  }

  componentDidMount() {
    this.handleGetShoppingBagGridData();
    this.handleGetShoppingBagStatusFilterData();
    this.handleGetShoppingBagDeliveryStatus();
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
  handleShoppingBagSearch = (searchData) => {
    this.setState({
      orderSearchText: searchData,
      currentPage: 1,
    });
    setTimeout(() => {
      this.handleGetShoppingBagGridData();
    }, 5);
  };
  ////   -------------------API Function start-------------------------------
  /// handle Get Order Tab Grid Data
  handleGetShoppingBagGridData(filter) {
    debugger;
    let self = this;
    this.setState({
      ShopBagLoading: true,
    });
    axios({
      method: "post",
      url: config.apiUrl + "/HSOrder/GetShoppingBagDetails",
      headers: authHeader(),
      data: {
        SearchText: this.state.orderSearchText,
        PageNo: this.state.currentPage,
        PageSize: this.state.postsPerPage,
        FilterStatus: this.state.strStatus,
        FilterDelivery: this.state.deliveryStrStatus,
      },
    })
      .then(function(res) {
        let status = res.data.message;
        let data = res.data.responseData;

        if (filter === "filter") {
          if (status === "Success") {
            self.setState({
              shoppingBagGridData: data.shoppingBagList,
              totalCount: data.totalShoppingBag,
              filterOrderStatus: false,
              filterShoppingDeliveryType: false,
              ShopBagLoading: false,
            });
          } else {
            self.setState({
              shoppingBagGridData: [],
              totalCount: 0,
              filterOrderStatus: false,
              filterShoppingDeliveryType: false,
              ShopBagLoading: false,
            });
          }
        } else {
          if (status === "Success") {
            self.setState({
              shoppingBagGridData: data.shoppingBagList,
              totalCount: data.totalShoppingBag,
              ShopBagLoading: false,
            });
          } else {
            self.setState({
              shoppingBagGridData: [],
              totalCount: 0,
              ShopBagLoading: false,
            });
          }
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }
  /// handle Get Shopping bag status filter
  handleGetShoppingBagStatusFilterData() {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/HSOrder/GetOrderStatusFilter",
      headers: authHeader(),
      params: {
        pageID: 1,
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
  /// handle Get Shopping bag delivery status filter
  handleGetShoppingBagDeliveryStatus() {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/HSOrder/GetShoppingBagDeliveryType",
      headers: authHeader(),
      params: {
        pageID: 1,
      },
    })
      .then(function(res) {
        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success") {
          self.setState({
            DeliveryStatusFilter: data,
          });
        } else {
          self.setState({
            DeliveryStatusFilter: [],
          });
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }

  /// handle cancel and comment for Shopping bag
  handleCancleAndCommnetShopBag(item) {
    const TranslationContext = this.state.translateLanguage.default;
    let self = this;
    if (this.state.ShopCancelComment !== "") {
      axios({
        method: "post",
        url: config.apiUrl + "/HSOrder/UpdateShipmentBagCancelData",
        headers: authHeader(),
        params: {
          ShoppingID: item.shoppingID,
          CancelComment: this.state.ShopCancelComment,
          SharewithCustomer: this.state.ShareCustomerData,
          CustomerName: item.customerName,
          CustomerMob: item.mobileNumber,
        },
      })
        .then(function(res) {
          let status = res.data.message;
          if (status === "Success") {
            self.setState({
              ShopCancelComment: "",
              ShareCustomerData: false,
              MobCancelCommentMdl: false,
            });
            NotificationManager.success(
              TranslationContext !== undefined
                ? TranslationContext.alertmessage.success
                : "Success."
            );
            self.handleGetShoppingBagGridData();
          } else {
            NotificationManager.error(
              TranslationContext !== undefined
                ? TranslationContext.alertmessage.failed
                : "Failed."
            );
          }
        })
        .catch((data) => {
          console.log(data);
        });
    } else {
      NotificationManager.error(
        TranslationContext !== undefined
          ? TranslationContext.alertmessage.pleaseentercomment
          : "Please Enter Comment."
      );
    }
  }
  /// convert to Order
  handleConvertToOrder(ShopId, e) {
    const TranslationContext = this.state.translateLanguage.default;
    e.stopPropagation();
    let self = this;
    if (this.state.invoiceNo !== "" && this.state.amountNo !== "") {
      axios({
        method: "post",
        url: config.apiUrl + "/HSOrder/InsertOrderDetails",
        headers: authHeader(),
        data: {
          ShoppingID: ShopId,
          InvoiceNo: this.state.invoiceNo,
          Amount: this.state.amountNo,
        },
      })
        .then(function(res) {
          let status = res.data.message;
          if (status === "Success") {
            self.setState({
              invoiceNo: "",
              amountNo: "",
            });
            NotificationManager.success(
              TranslationContext !== undefined
                ? TranslationContext.alertmessage.success
                : "Success."
            );
            self.handleGetShoppingBagGridData();
          } else {
            NotificationManager.error(status);
          }
        })
        .catch((data) => {
          console.log(data);
        });
    } else {
      if (this.state.invoiceNo === "") {
        NotificationManager.error(
          TranslationContext !== undefined
            ? TranslationContext.alertmessage.pleaseenterorderid
            : "Please Enter Order Id."
        );
      } else {
        NotificationManager.error(
          TranslationContext !== undefined
            ? TranslationContext.alertmessage.pleaseenteramount
            : "Please Enter Amount."
        );
      }
    }
  }
  /// handle push to poss data
  handlePushToPossData(ShopId) {
    const TranslationContext = this.state.translateLanguage.default;
    var self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/HSOrder/PushOrderToPoss",
      headers: authHeader(),
      data: {
        ShoppingID: ShopId,
      },
    })
      .then(function(res) {
        let status = res.data.message;
        if (status === "Success" && res.data.responseData.result === "true") {
          NotificationManager.success(
            TranslationContext !== undefined
              ? TranslationContext.alertmessage.orderconfirmed
              : "Order Confirmed"
          );
          self.handleGetShoppingBagGridData();
        } else {
          NotificationManager.error(
            TranslationContext !== undefined
              ? TranslationContext.alertmessage.orderfailed
              : "Order Failed"
          );
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

    this.handleGetShoppingBagGridData();
  };
  /// handle per page item change
  handlePageItemchange = async (e) => {
    await this.setState({
      postsPerPage: e.target.value,
      currentPage: 1,
    });

    this.handleGetShoppingBagGridData();
  };
  /// handle check individual status
  handleCheckShopBagIndividualStatus() {
    var checkboxes = document.getElementsByName("ShopBagStatus");
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
  /// handle check individual Deliverystatus
  handleCheckShopBagDeliveryStatus() {
    var checkboxes = document.getElementsByName("shopBagDeliveryStatus");
    var deliveryStrStatus = "";
    for (var i in checkboxes) {
      if (isNaN(i) === false) {
        if (checkboxes[i].checked === true) {
          if (checkboxes[i].getAttribute("attrIds") !== null)
            deliveryStrStatus += checkboxes[i].getAttribute("attrIds") + ",";
        }
      }
    }
    this.setState({
      deliveryStrStatus,
    });
  }
  /// close status filter
  handleCloseStatusFilter() {
    this.setState({
      filterShoppingStatus: false,
    });
  }
  /// close delivery filter
  handleCloseDeliveryFilter() {
    this.setState({
      filterShoppingDeliveryType: false,
    });
  }
  ///handle text onchange
  handleTextOnchage = (e) => {
    var name = e.target.name;
    if (name === "amountNo") {
      var reg = /^[0-9\b]+$/;
      if (e.target.value === "" || reg.test(e.target.value)) {
        this.setState({
          [e.target.name]: e.target.value,
        });
      } else {
        e.target.value = "";
      }
    } else {
      this.setState({
        [e.target.name]: e.target.value,
      });
    }
  };
  //// clear order data
  handleClearOrderData() {
    this.setState({
      invoiceNo: "",
      amountNo: "",
    });
  }
  handlecollapseChange = (e) => {
    this.state.activePanel = e[e.length - 1];
    this.setState({ activePanel: this.state.activePanel });
  };
  /// push to poss notification
  handlePushToPosNotification() {
    NotificationManager.success("Order has been Pushed to Pos");
  }
  /// handle check box check
  handleCheckBox(e) {
    this.setState({
      ShareCustomerData: e.target.checked,
    });
  }
  handleStoreOrderItemData(OrderData) {
    this.setState({
      ShopItemData: [],
      OrdStoreCode: OrderData.storeCode,
      ordItemPopupClose: true,
      OrdShopId: OrderData.shoppingBagNo,
      itemId: OrderData.id,
    });
  }
  /// handle check order item data with item id
  handleCheckOrderItemData(itemId) {
    if (this.state.ShopItemData.length > 0) {
      var ordItem = this.state.ShopItemData.filter((x) => x.skuId === itemId);
      if (ordItem.length === 0) {
        setTimeout(() => {
          this.handleOrdItemOpen(itemId);
        }, 50);
      } else {
        document.getElementById(
          "ord" + itemId + this.state.OrdShopId + "Itm"
        ).style.display = "block";
        dragElement(
          document.getElementById("ord" + itemId + this.state.OrdShopId + "Itm")
        );
      }
    } else {
      setTimeout(() => {
        this.handleOrdItemOpen(itemId);
      }, 50);
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
        StoreCode: this.state.OrdStoreCode,
        SKUItemCodes: itemId,
      },
    })
      .then(function(res) {
        var status = res.data.message;
        var data = res.data.responseData.data;
        if (status === "Success" && data.length > 0) {
          var OrdData = self.state.ShopItemData;
          OrdData.push(data[0]);
          self.setState({
            ShopItemData: OrdData,
            popUpClicking: false,
          });
          document.getElementById(
            "ord" + itemId + self.state.OrdShopId + "Itm"
          ).style.display = "block";
          dragElement(
            document.getElementById(
              "ord" + itemId + self.state.OrdShopId + "Itm"
            )
          );
        } else {
          NotificationManager.error("Record not found.");
          self.setState({
            popUpClicking: false,
          });
        }
      })
      .catch((data) => {
        self.setState({
          popUpClicking: false,
        });
        console.log(data);
      });
  }

  /// handle Update Order Item
  handleShoppingItemUpdate(data) {
    const TranslationContext = this.state.translateLanguage.default;
    var self = this;

    var ord_item = [];

    var ItemData = this.state.shoppingBagGridData.filter(
      (x) => x.shoppingBagNo === this.state.OrdShopId
    )[0].shoppingBagItemList;

    for (let i = 0; i < ItemData.length; i++) {
      var items = {};
      items["ID"] = ItemData[i].id;
      items["ItemID"] = ItemData[i].itemID;
      items["Availableqty"] = ItemData[i].selectAvailableqty;
      items["ShoppingID"] = data.shoppingID;
      items["CustomerName"] = data.customerName;
      items["CustomerMob"] = data.mobileNumber;

      ord_item.push(items);
    }
    axios({
      method: "post",
      url: config.apiUrl + "/HSOrder/UpdateShoppingAvailableQty",
      headers: authHeader(),
      data: {
        shoppingAvailableQty: ord_item,
      },
    })
      .then(function(res) {
        var status = res.data.message;
        if (status === "Success") {
          NotificationManager.success(
            TranslationContext !== undefined
              ? TranslationContext.alertmessage.updatedsuccessfully
              : "Updated successfully."
          );
          self.setState({
            orderPopoverOverlay: false,
            ordItemPopupClose: false,
          });
          self.handleGetShoppingBagGridData();
        } else {
          NotificationManager.error(
            TranslationContext !== undefined
              ? TranslationContext.alertmessage.datanotupdated
              : "Data not updated."
          );
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
      ShopItemData: [],
      OrdShopId: "",
      popUpClicking: false,
    });
  }
  /// handle close item pop modal
  handleCloseItemPop(itemId) {
    document.getElementById(
      "ord" + itemId + this.state.OrdShopId + "Itm"
    ).style.display = "none";
    this.setState({
      popUpClicking: false,
    });
  }
  handleMobCancelCommentOpen = () => {
    this.setState({
      MobCancelCommentMdl: true,
    });
  };
  handleMobCancelCommentClose = () => {
    this.setState({
      MobCancelCommentMdl: false,
    });
  };
  handleSelectAbldQty(items, e) {
    this.state.shoppingBagGridData
      .filter((x) => x.shoppingBagNo === this.state.OrdShopId)[0]
      .shoppingBagItemList.filter(
        (x) => x.itemID === items.itemID
      )[0].selectAvailableqty = e.target.value;
    this.setState({
      shoppingBagGridData: this.state.shoppingBagGridData,
    });
  }

  render() {
    const TranslationContext = this.state.translateLanguage.default;

    return (
      <>
        {this.state.orderPopoverOverlay && (
          <div className="order-popover-overlay"></div>
        )}
        <div className="table-cntr store dv-table-paging shopbag">
          <p className="shopi">
            {TranslationContext !== undefined
              ? TranslationContext.a.shoppingbag
              : "Shopping Bag"}
          </p>
          {!this.state.isMobileView ? (
            <Table
              className="components-table-demo-nested antd-table-campaign antd-table-order antd-table-order-mobile custom-antd-table"
              columns={[
                {
                  title:
                    TranslationContext !== undefined
                      ? TranslationContext.title.shoppingbagno
                      : "Shopping Bag No.",
                  dataIndex: "shoppingBagNo",
                  key: "shoppingBagNo",
                  render: (row, item) => {
                    return (
                      <div className="namenumbermain">
                        <label>{item.shoppingBagNo}</label>
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
                        <p>{item.shoppingBagItemList.length}</p>
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
                                  },
                                  {
                                    title:
                                      TranslationContext !== undefined
                                        ? TranslationContext.title.quantity
                                        : "Quantity",
                                    dataIndex: "quantity",
                                  },
                                  {
                                    title:
                                      TranslationContext !== undefined
                                        ? TranslationContext.title.properties
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
                                  {
                                    title:
                                      TranslationContext !== undefined
                                        ? TranslationContext.ticketingDashboard
                                            .availableqty
                                        : "Available Qty",
                                    dataIndex: "availableqty",
                                    className:
                                      item.showAvailableQuantity &&
                                      item.statusName.toLowerCase() !==
                                        "reorder" &&
                                      item.statusName.toLowerCase() !==
                                        "cancelled"
                                        ? "order-desktop"
                                        : "ordItmDis",
                                    render: (row, item) => {
                                      return (
                                        <div>
                                          {item.showAvailableQuantity &&
                                          item.itemName.toLowerCase() !==
                                            "delivery charge" ? (
                                            <select
                                              className="shopBagAblQty"
                                              onChange={this.handleSelectAbldQty.bind(
                                                this,
                                                item
                                              )}
                                              value={item.selectAvailableqty}
                                            >
                                              {item.availableqty !== null &&
                                                item.availableqty.map(
                                                  (data, q) => (
                                                    <option value={data}>
                                                      {data}
                                                    </option>
                                                  )
                                                )}
                                            </select>
                                          ) : null}
                                        </div>
                                      );
                                    },
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
                              {item.showAvailableQuantity &&
                              item.statusName.toLowerCase() !== "reorder" &&
                              item.statusName.toLowerCase() !== "cancelled" ? (
                                <div className="popShpBagDiv">
                                  {/* <Checkbox
                                    onChange={(e) =>
                                      this.setState({
                                        ItemShareCustomer: e.target.checked,
                                      })
                                    }
                                    defaultValue={this.state.ItemShareCustomer}
                                  >
                                    {TranslationContext !== undefined
                                      ? TranslationContext.ticketingDashboard
                                          .sharedetailswithcustomer
                                      : "Share Details with Customer"}
                                  </Checkbox> */}

                                  <button
                                    className="btn-updateShopBg"
                                    onClick={this.handleShoppingItemUpdate.bind(
                                      this,
                                      item
                                    )}
                                    style={{ marginBottom: "8px" }}
                                  >
                                    {TranslationContext !== undefined
                                      ? TranslationContext.label.update
                                      : "Update"}
                                  </button>
                                </div>
                              ) : null}

                              {this.state.ShopItemData !== null &&
                                this.state.ShopItemData.map((data, i) => (
                                  <div
                                    id={
                                      "ord" +
                                      data.skuId +
                                      this.state.OrdShopId +
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
                                        {this.state.ShopItemData !== null &&
                                          this.state.ShopItemData.filter(
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
                                                  href={item.defaultImageUrl}
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
                              ? "order-popover-table order-popover shopping-bag-popover-item order-popover-table-big"
                              : "order-popover-table order-popover shopping-bag-popover-item order-popover-table-big OrdItem"
                          }
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
                      </div>
                    );
                  },
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
                      <div className="d-flex align-items-center">
                        <p
                          className={
                            item.statusName === "Cancelled"
                              ? "order-clr-pink"
                              : ""
                          }
                        >
                          {item.statusName}
                        </p>
                        {item.isPushToPoss &&
                        item.posShoppingBagStatusList.length > 0 ? (
                          <Popover
                            content={
                              <div className="order-tab-popover">
                                {item.posShoppingBagStatusList !== null &&
                                  item.posShoppingBagStatusList.map(
                                    (data, i) => (
                                      <div
                                        className="popover-input-cntr ordShopI"
                                        key={i}
                                      >
                                        <div className="col-md-12">
                                          <div className="viercmdcmpbrd">
                                            <label className="viewcmtUser">
                                              {data.status}
                                            </label>
                                            <label className="ordDateShop">
                                              {data.date}
                                            </label>
                                          </div>
                                        </div>
                                      </div>
                                    )
                                  )}
                              </div>
                            }
                            trigger="click"
                            overlayClassName="order-popover shopping-popover-cancel"
                            onVisibleChange={(visible) =>
                              this.setState({ orderPopoverOverlay: visible })
                            }
                          >
                            <img src={OrderInfo} className="order-info" />
                          </Popover>
                        ) : (
                          <>
                            {item.statusName === "Cancelled" ? (
                              <Popover
                                content={
                                  <div className="order-tab-popover">
                                    <div className="d-flex align-items-center justify-content-between">
                                      <p>{item.canceledOn}</p>
                                      <p className="username-mar">
                                        {item.userName}
                                      </p>
                                    </div>
                                    <p className="shopping-popover-cancel-info">
                                      {item.canceledComment}
                                    </p>
                                  </div>
                                }
                                trigger="click"
                                overlayClassName="order-popover shopping-popover-cancel"
                                onVisibleChange={(visible) =>
                                  this.setState({
                                    orderPopoverOverlay: visible,
                                  })
                                }
                              >
                                <img src={OrderInfo} className="order-info" />
                              </Popover>
                            ) : (
                              ""
                            )}
                          </>
                        )}
                      </div>
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
                                  onChange={this.handleCheckShopBagIndividualStatus.bind(
                                    this
                                  )}
                                  name="ShopBagStatus"
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
                            onClick={this.handleGetShoppingBagGridData.bind(
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
                  filterDropdownVisible: this.state.filterShoppingStatus,
                  onFilterDropdownVisibleChange: (visible) =>
                    this.setState({ filterShoppingStatus: visible }),
                  filterIcon: (filtered) => (
                    <span
                      style={{ color: filtered ? "#1890ff" : undefined }}
                    ></span>
                  ),
                },
                {
                  title:
                    TranslationContext !== undefined
                      ? TranslationContext.title.deliverytype
                      : "Delivery type",
                  className:
                    "camp-status-header camp-status-header-statusFilter order-status-header shopping-delivery-header order-desktop",
                  render: (row, item) => {
                    return <p>{item.deliveryTypeName}</p>;
                  },
                  filterDropdown: (data, row) => {
                    return (
                      <div className="campaign-status-drpdwn">
                        <ul>
                          {this.state.DeliveryStatusFilter !== null &&
                            this.state.DeliveryStatusFilter.map((item, d) => (
                              <li key={d}>
                                <input
                                  type="checkbox"
                                  id={"New" + item.deliveryTypeID}
                                  className="ch1"
                                  onChange={this.handleCheckShopBagDeliveryStatus.bind(
                                    this
                                  )}
                                  name="shopBagDeliveryStatus"
                                  attrIds={item.deliveryTypeID}
                                />
                                <label htmlFor={"New" + item.deliveryTypeID}>
                                  <span className="ch1-text">
                                    {item.deliveryTypeName}
                                  </span>
                                </label>
                              </li>
                            ))}
                        </ul>
                        <div className="dv-status">
                          <button
                            className="btn-apply-status"
                            onClick={this.handleGetShoppingBagGridData.bind(
                              this,
                              "filter"
                            )}
                          >
                            {TranslationContext !== undefined
                              ? TranslationContext.button.viewsearch
                              : "Apply"}
                          </button>
                          <button
                            className="btn-cancel-status"
                            onClick={this.handleCloseDeliveryFilter.bind(this)}
                          >
                            {TranslationContext !== undefined
                              ? TranslationContext.button.cancel
                              : "Cancel"}
                          </button>
                        </div>
                      </div>
                    );
                  },
                  filterDropdownVisible: this.state.filterShoppingDeliveryType,
                  onFilterDropdownVisibleChange: (visible) =>
                    this.setState({ filterShoppingDeliveryType: visible }),
                  filterIcon: (filtered) => (
                    <span
                      style={{ color: filtered ? "#1890ff" : undefined }}
                    ></span>
                  ),
                },
                {
                  title:
                    TranslationContext !== undefined
                      ? TranslationContext.title.pickupdateandtime
                      : "Pickup Date & Time",
                  render: (row, item) => {
                    return (
                      <div>
                        {item.pickupDate === "" && item.pickupTime === "" ? (
                          <p className="order-clr-blue">-NIL-</p>
                        ) : (
                          <>
                            <p className="order-clr-blue">{item.pickupDate},</p>
                            <p className="order-clr-blue order-more-small-font">
                              {item.pickupTime}
                            </p>
                          </>
                        )}
                      </div>
                    );
                  },
                  className: "pick-up-date order-desktop",
                },
                {
                  title:
                    TranslationContext !== undefined
                      ? TranslationContext.title.pickupdateandtime
                      : "Address",
                  render: (row, item) => {
                    return (
                      <p className="order-small-font">
                        {item.address === "" ? "-NIL-" : item.address}
                      </p>
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
                        <div className="d-flex convert">
                          {item.isPushToPoss &&
                          item.statusName !== "Reorder" ? (
                            <>
                              {item.statusName === "Cancelled" ? null : (
                                <>
                                  {item.isPosPushed ? (
                                    <button
                                      className="butn order-grid-butn order-grid-butn-green"
                                      onClick={this.handlePushToPosNotification.bind(
                                        this
                                      )}
                                    >
                                      {TranslationContext !== undefined
                                        ? TranslationContext.ticketingDashboard
                                            .pushtoposs
                                        : "Push To Pos"}
                                    </button>
                                  ) : (
                                    <>
                                      <button
                                        className="butn order-grid-butn order-grid-butn-yellow"
                                        onClick={this.handlePushToPossData.bind(
                                          this,
                                          item.shoppingID
                                        )}
                                      >
                                        {TranslationContext !== undefined
                                          ? TranslationContext
                                              .ticketingDashboard.pushtoposs
                                          : "Push To Pos"}
                                      </button>
                                      <Popconfirm
                                        title={
                                          <>
                                            <div className="popover-input-cntr">
                                              <div>
                                                <p>
                                                  {TranslationContext !==
                                                  undefined
                                                    ? TranslationContext.p
                                                        .comment
                                                    : "Comment"}
                                                </p>
                                                <textarea
                                                  placeholder={
                                                    TranslationContext !==
                                                    undefined
                                                      ? TranslationContext
                                                          .placeholder
                                                          .entercomment
                                                      : "Enter Comment"
                                                  }
                                                  value={
                                                    this.state.ShopCancelComment
                                                  }
                                                  name="ShopCancelComment"
                                                  onChange={
                                                    this.handleTextOnchage
                                                  }
                                                ></textarea>
                                              </div>
                                              <div>
                                                <Checkbox
                                                  onChange={this.handleCheckBox.bind(
                                                    this
                                                  )}
                                                  defaultValue={
                                                    this.state.ShareCustomerData
                                                  }
                                                >
                                                  {TranslationContext !==
                                                  undefined
                                                    ? TranslationContext
                                                        .ticketingDashboard
                                                        .sharedetailswithcustomer
                                                    : "Share Details with Customer"}
                                                </Checkbox>
                                              </div>
                                            </div>
                                          </>
                                        }
                                        overlayClassName="order-popover order-popover-butns shopping-popover-delete"
                                        placement="bottomRight"
                                        onVisibleChange={(visible) =>
                                          this.setState({
                                            orderPopoverOverlay: visible,
                                          })
                                        }
                                        icon={false}
                                        okText="Cancel Bag"
                                        cancelText="Close"
                                        onConfirm={this.handleCancleAndCommnetShopBag.bind(
                                          this,
                                          item
                                        )}
                                      >
                                        <button className="butn order-grid-butn order-del-butn">
                                          <img
                                            src={OrderDel}
                                            alt="delete icon"
                                          />
                                        </button>
                                      </Popconfirm>
                                    </>
                                  )}
                                </>
                              )}
                            </>
                          ) : (
                            <>
                              {item.actionTypeName !== "" &&
                              item.statusName.toLowerCase() !== "reorder" ? (
                                <>
                                  <Popconfirm
                                    title={
                                      <>
                                        <div className="popover-input-cntr">
                                          <div>
                                            <p>
                                              {TranslationContext !== undefined
                                                ? TranslationContext.p.orderid
                                                : "Order Id"}
                                            </p>
                                            <input
                                              type="text"
                                              placeholder="Enter Order Id"
                                              name="invoiceNo"
                                              value={this.state.invoiceNo}
                                              onChange={this.handleTextOnchage}
                                              autoComplete="off"
                                            />
                                          </div>
                                          <div>
                                            <p>
                                              {TranslationContext !== undefined
                                                ? TranslationContext.p.amount
                                                : "Amount"}
                                            </p>
                                            <input
                                              type="text"
                                              placeholder={
                                                TranslationContext !== undefined
                                                  ? TranslationContext
                                                      .placeholder.amount
                                                  : "Enter Amount"
                                              }
                                              name="amountNo"
                                              value={this.state.amountNo}
                                              onChange={this.handleTextOnchage}
                                              autoComplete="off"
                                            />
                                          </div>
                                        </div>
                                      </>
                                    }
                                    overlayClassName="order-popover order-popover-butns"
                                    placement="bottomRight"
                                    onVisibleChange={(visible) =>
                                      this.setState({
                                        orderPopoverOverlay: visible,
                                      })
                                    }
                                    icon={false}
                                    okText="Done"
                                    onConfirm={this.handleConvertToOrder.bind(
                                      this,
                                      item.shoppingID
                                    )}
                                  >
                                    <button
                                      className="butn order-grid-butn"
                                      onClick={this.handleClearOrderData.bind(
                                        this
                                      )}
                                    >
                                      {TranslationContext !== undefined
                                        ? TranslationContext.button
                                            .convertoorder
                                        : "Convert to Order"}
                                    </button>
                                  </Popconfirm>
                                  <Popconfirm
                                    title={
                                      <>
                                        <div className="popover-input-cntr">
                                          <div>
                                            <p>
                                              {TranslationContext !== undefined
                                                ? TranslationContext.p.comment
                                                : "Comment"}
                                            </p>
                                            <textarea
                                              placeholder={
                                                TranslationContext !== undefined
                                                  ? TranslationContext
                                                      .placeholder.entercomment
                                                  : "Enter Comment"
                                              }
                                              value={
                                                this.state.ShopCancelComment
                                              }
                                              name="ShopCancelComment"
                                              onChange={this.handleTextOnchage}
                                            ></textarea>
                                          </div>
                                          <div>
                                            <Checkbox
                                              onChange={this.handleCheckBox.bind(
                                                this
                                              )}
                                              defaultValue={
                                                this.state.ShareCustomerData
                                              }
                                            >
                                              {TranslationContext !== undefined
                                                ? TranslationContext
                                                    .ticketingDashboard
                                                    .sharedetailswithcustomer
                                                : "Share Details with Customer"}
                                            </Checkbox>
                                          </div>
                                        </div>
                                      </>
                                    }
                                    overlayClassName="order-popover order-popover-butns shopping-popover-delete"
                                    placement="bottomRight"
                                    onVisibleChange={(visible) =>
                                      this.setState({
                                        orderPopoverOverlay: visible,
                                      })
                                    }
                                    icon={false}
                                    okText="Cancel Bag"
                                    cancelText="Close"
                                    onConfirm={this.handleCancleAndCommnetShopBag.bind(
                                      this,
                                      item
                                    )}
                                  >
                                    <button className="butn order-grid-butn order-del-butn">
                                      <img src={OrderDel} alt="delete icon" />
                                    </button>
                                  </Popconfirm>
                                </>
                              ) : null}
                            </>
                          )}
                        </div>
                        {/* Mobile Device item view */}
                        <div className="itemviewmobile">
                          <div className="d-flex align-items-center">
                            <Popover
                              content={
                                <Table
                                  className="components-table-demo-nested antd-table-campaign antd-table-order custom-antd-table mobpopover"
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
                              }
                              trigger="click"
                              placement="bottom"
                              overlayClassName="order-popover-table order-popover shopping-bag-popover-item"
                              onVisibleChange={(visible) =>
                                this.setState({ orderPopoverOverlay: visible })
                              }
                            >
                              <img
                                src={OrderHamb}
                                className="order-hamb iteminfo"
                              />
                              <img src={Info} className="item-img" />
                            </Popover>
                            <p>{item.shoppingBagItemList.length}</p>
                          </div>
                        </div>
                      </div>
                    );
                  },
                },
              ]}
              pagination={false}
              showSizeChanger={false}
              onShowSizeChange={false}
              dataSource={this.state.shoppingBagGridData}
              loading={this.state.ShopBagLoading}
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
              <Spin spinning={this.state.ShopBagLoading}>
                <Collapse
                  bordered={false}
                  className="site-collapse-custom-collapse shbag"
                  expandIconPosition={"right"}
                  destroyInactivePanel={true}
                  onChange={this.handlecollapseChange.bind(this)}
                  activeKey={this.state.activePanel}
                >
                  {this.state.shoppingBagGridData.length > 0
                    ? this.state.shoppingBagGridData.map((item, key) => {
                        return (
                          <Panel
                            header={
                              <div className="shopbagne">
                                <div className="namenumbermain">
                                  <label>{item.shoppingBagNo}</label>
                                  <div className="namenumber">
                                    <p>{item.customerName}</p>
                                    <p>{item.mobileNumber}</p>
                                  </div>
                                </div>
                                <div className="itemviewmobile">
                                  <div className="d-flex align-items-center">
                                    <Popover
                                      content={
                                        <Table
                                          className="components-table-demo-nested antd-table-campaign antd-table-order custom-antd-table mobpopover"
                                          columns={[
                                            {
                                              title:
                                                TranslationContext !== undefined
                                                  ? TranslationContext.title
                                                      .itemid
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
                                            },
                                            {
                                              title:
                                                TranslationContext !== undefined
                                                  ? TranslationContext.title
                                                      .quantity
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
                                      }
                                      trigger="click"
                                      placement="bottom"
                                      overlayClassName="order-popover-table order-popover shopping-bag-popover-item"
                                    >
                                      <img
                                        src={OrderHamb}
                                        className="order-hamb iteminfo"
                                      />
                                      <img src={Info} className="item-img" />
                                    </Popover>
                                    <p>{item.shoppingBagItemList.length}</p>
                                  </div>
                                </div>
                              </div>
                            }
                          >
                            <div className="row">
                              <div className="col-8 p-0">
                                <span className="date">
                                  {item.date} {item.time}
                                </span>
                              </div>
                              <div className="col-4 p-0 text-right">
                                <span className="stname">
                                  {item.statusName}
                                </span>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-12 p-0">
                                <span className="delivery">
                                  <img
                                    src={Deliver}
                                    alt="Delivery"
                                    className="delivery"
                                    width="20px"
                                  />
                                  {item.deliveryTypeName}
                                </span>
                              </div>
                            </div>
                            <div className="row mb-2">
                              <div className="col-6 p-0">
                                <span className="addres">
                                  <p>{item.address}</p>
                                </span>
                              </div>
                              <div className="col-6 p-0 text-right">
                                <label className="date linehei">
                                  Pickup
                                  <span style={{ display: "block" }}>
                                    {item.pickupDate} {item.pickupTime}
                                  </span>
                                </label>
                              </div>
                            </div>
                            {item.isPushToPoss ? (
                              <>
                                {item.isPosPushed ? (
                                  <button
                                    className="butn order-grid-butn order-grid-butn-green"
                                    onClick={this.handlePushToPosNotification.bind(
                                      this
                                    )}
                                  >
                                    {TranslationContext !== undefined
                                      ? TranslationContext.ticketingDashboard
                                          .ispushtoposs
                                      : "Push To Pos"}
                                  </button>
                                ) : (
                                  <>
                                    <div className="ordShopCanl">
                                      <button
                                        className="butn order-grid-butn order-grid-butn-yellow"
                                        onClick={this.handlePushToPossData.bind(
                                          this,
                                          item.shoppingID
                                        )}
                                      >
                                        {TranslationContext !== undefined
                                          ? TranslationContext
                                              .ticketingDashboard.ispushtoposs
                                          : "Push To Pos"}
                                      </button>

                                      <Modal
                                        open={this.state.MobCancelCommentMdl}
                                        onClose={
                                          this.handleMobCancelCommentClose
                                        }
                                        center
                                        modalId="ordShopCancelModal"
                                        overlayId="Pincode-ovrly"
                                      >
                                        <div className="shopCancel">
                                          <div>
                                            <div className="ordShopDivLbl">
                                              <p>
                                                {TranslationContext !==
                                                undefined
                                                  ? TranslationContext.p.comment
                                                  : "Comment"}
                                              </p>
                                              <img
                                                src={CancelImg}
                                                alt="Cancel icon"
                                                className=""
                                                onClick={
                                                  this
                                                    .handleMobCancelCommentClose
                                                }
                                              />
                                            </div>
                                            <textarea
                                              placeholder={
                                                TranslationContext !== undefined
                                                  ? TranslationContext
                                                      .placeholder.entercomment
                                                  : "Enter Comment"
                                              }
                                              value={
                                                this.state.ShopCancelComment
                                              }
                                              name="ShopCancelComment"
                                              onChange={this.handleTextOnchage}
                                            ></textarea>
                                          </div>
                                          <div>
                                            <Checkbox
                                              onChange={this.handleCheckBox.bind(
                                                this
                                              )}
                                              defaultValue={
                                                this.state.ShareCustomerData
                                              }
                                            >
                                              {TranslationContext !== undefined
                                                ? TranslationContext
                                                    .ticketingDashboard
                                                    .sharedetailswithcustomer
                                                : "Share Details with Customer"}
                                            </Checkbox>
                                          </div>
                                          <div className="ordShopbtnDiv">
                                            <button
                                              className="butn shopCancelBtnOrd"
                                              onClick={
                                                this.handleMobCancelCommentClose
                                              }
                                            >
                                              {TranslationContext !== undefined
                                                ? TranslationContext.button
                                                    .close
                                                : "Close"}
                                            </button>
                                            <button
                                              className="butn shopRemoveBtn"
                                              onClick={this.handleCancleAndCommnetShopBag.bind(
                                                this,
                                                item
                                              )}
                                            >
                                              {TranslationContext !== undefined
                                                ? TranslationContext
                                                    .ticketingDashboard
                                                    .cancelbag
                                                : "Cancel Bag"}
                                            </button>
                                          </div>
                                        </div>
                                      </Modal>
                                      <button
                                        className="butn order-grid-butn order-del-butn dels"
                                        onClick={
                                          this.handleMobCancelCommentOpen
                                        }
                                      >
                                        <img
                                          src={OrderDel}
                                          alt="delete iconn"
                                        />
                                      </button>
                                    </div>
                                  </>
                                )}
                              </>
                            ) : (
                              <>
                                {item.actionTypeName !== "" ? (
                                  <div className="row">
                                    <div className="col-6 p-0">
                                      <Modal
                                        open={this.state.MobCancelCommentMdl}
                                        onClose={
                                          this.handleMobCancelCommentClose
                                        }
                                        center
                                        modalId="ordShopCancelModal"
                                        overlayId="Pincode-ovrly"
                                      >
                                        <div className="shopCancel">
                                          <div>
                                            <div className="ordShopDivLbl">
                                              <p>
                                                {TranslationContext !==
                                                undefined
                                                  ? TranslationContext.p.comment
                                                  : "Comment"}
                                              </p>
                                              <img
                                                src={CancelImg}
                                                alt="Cancel icon"
                                                className=""
                                                onClick={
                                                  this
                                                    .handleMobCancelCommentClose
                                                }
                                              />
                                            </div>

                                            <textarea
                                              placeholder={
                                                TranslationContext !== undefined
                                                  ? TranslationContext
                                                      .placeholder.entercomment
                                                  : "Enter Comment"
                                              }
                                              value={
                                                this.state.ShopCancelComment
                                              }
                                              name="ShopCancelComment"
                                              onChange={this.handleTextOnchage}
                                            ></textarea>
                                          </div>
                                          <div>
                                            <Checkbox
                                              onChange={this.handleCheckBox.bind(
                                                this
                                              )}
                                              defaultValue={
                                                this.state.ShareCustomerData
                                              }
                                            >
                                              {TranslationContext !== undefined
                                                ? TranslationContext
                                                    .ticketingDashboard
                                                    .sharedetailswithcustomer
                                                : "Share Details with Customer"}
                                            </Checkbox>
                                          </div>
                                          <div className="ordShopbtnDiv">
                                            <button
                                              className="butn shopCancelBtnOrd"
                                              onClick={
                                                this.handleMobCancelCommentClose
                                              }
                                            >
                                              {TranslationContext !== undefined
                                                ? TranslationContext.button
                                                    .close
                                                : "Close"}
                                            </button>
                                            <button
                                              className="butn shopRemoveBtn"
                                              onClick={this.handleCancleAndCommnetShopBag.bind(
                                                this,
                                                item
                                              )}
                                            >
                                              {TranslationContext !== undefined
                                                ? TranslationContext
                                                    .ticketingDashboard
                                                    .cancelbag
                                                : "Cancel Bag"}
                                            </button>
                                          </div>
                                        </div>
                                      </Modal>
                                      <button
                                        className="butn order-grid-butn order-del-butn dels"
                                        onClick={
                                          this.handleMobCancelCommentOpen
                                        }
                                      >
                                        <img
                                          src={OrderDel}
                                          alt="delete iconn"
                                        />
                                      </button>
                                    </div>
                                    <div className="col-6 p-0">
                                      <Popconfirm
                                        title={
                                          <>
                                            <div className="popover-input-cntr">
                                              <div>
                                                <p>
                                                  {TranslationContext !==
                                                  undefined
                                                    ? TranslationContext.p
                                                        .orderid
                                                    : "Order Id"}
                                                </p>
                                                <input
                                                  type="text"
                                                  placeholder="Enter Order Id"
                                                  name="invoiceNo"
                                                  value={this.state.invoiceNo}
                                                  onChange={
                                                    this.handleTextOnchage
                                                  }
                                                  autoComplete="off"
                                                />
                                              </div>
                                              <div>
                                                <p>
                                                  {TranslationContext !==
                                                  undefined
                                                    ? TranslationContext.p
                                                        .amount
                                                    : "Amount"}
                                                </p>
                                                <input
                                                  type="text"
                                                  placeholder={
                                                    TranslationContext !==
                                                    undefined
                                                      ? TranslationContext
                                                          .placeholder.amount
                                                      : "Enter Amount"
                                                  }
                                                  name="amountNo"
                                                  value={this.state.amountNo}
                                                  onChange={
                                                    this.handleTextOnchage
                                                  }
                                                  autoComplete="off"
                                                />
                                              </div>
                                            </div>
                                          </>
                                        }
                                        overlayClassName="order-popover order-popover-butns"
                                        placement="bottomRight"
                                        icon={false}
                                        okText="Done"
                                        onConfirm={this.handleConvertToOrder.bind(
                                          this,
                                          item.shoppingID
                                        )}
                                      >
                                        <button
                                          className="butn order-grid-butn convertbt"
                                          onClick={this.handleClearOrderData.bind(
                                            this
                                          )}
                                        >
                                          {TranslationContext !== undefined
                                            ? TranslationContext.button
                                                .convertoorder
                                            : "Convert to Order"}
                                        </button>
                                      </Popconfirm>
                                    </div>
                                  </div>
                                ) : null}
                              </>
                            )}
                          </Panel>
                        );
                      })
                    : null}
                </Collapse>

                {this.state.shoppingBagGridData.length === 0 ? (
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
        </div>
      </>
    );
  }
}

export default ShoppingBagTab;
