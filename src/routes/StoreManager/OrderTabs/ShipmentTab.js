import React, { Component } from "react";
import axios from "axios";
import {
  Table,
  Popover,
  Popconfirm,
  Spin,
  Tooltip,
  Collapse,
  Empty,
} from "antd";
import Modal from "react-responsive-modal";
import Deliver from "./../../../assets/Images/icons8-delivery.svg";
import OrderHamb from "./../../../assets/Images/order-hamb.png";
import CancelImg from "./../../../assets/Images/cancel.png";
import OrderInfo from "./../../../assets/Images/order-info.png";
import CardTick from "./../../../assets/Images/card-tick.png";
import Info from "./../../../assets/Images/Info-black.png";
import { authHeader } from "../../../helpers/authHeader";
import config from "../../../helpers/config";
import Pagination from "react-pagination-js";
import "react-pagination-js/dist/styles.css";
import OrderDel from "./../../../assets/Images/order-del.png";
import { NotificationManager } from "react-notifications";
import * as translationHI from "../../../translations/hindi";
import * as translationMA from "../../../translations/marathi";
const { Panel } = Collapse;
class ShipmentTab extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ShipmentGridData: [],
      filterShipmentStatus: false,
      filterShipmentDelivery: false,
      filterShipmentPartner: false,
      orderPopoverOverlay: false,
      ShipmentMdlbtn: false,
      ShipmentLoading: false,
      totalCount: 0,
      currentPage: 1,
      postsPerPage: 10,
      statusFilterData: [],
      DeliveryFilterData: [],
      PartnerFilterData: [],
      strStatus: "",
      strDelivery: "",
      strPartner: "",
      translateLanguage: {},
      ShipmentOrderItem: [],
      ShipmentOrderId: 0,
      shipmentCharges: 0,
      orderId: 0,
      AirwayBillAWBNo: 0,
      AirwayItemIds: 0,
      createdShoppingTabs: false,
      airWayBill2ndTab: false,
      IsStoreDelivery: false,
      createShipmentBtnDisbaled: false,
      orderSearchText: "",
      TemplateData: [],
      selectedTemplate: "0",
      createShipmetLoader: false,
      showShipmentCharge: true,
      ShowSelectCourierPartner: false,
      selectCourierPartner: 0,
      ShipCancelComment: "",
      ShipShowTemplate: false,
      isMobileView: false,
      activePanel: [],
      showNewShipmentCharge: false,
    };
  }

  componentDidMount() {
    this.handleGetShipmentTabGridData();
    this.handleGetShipmentStatusFilterData();
    this.handleGetShipmentDeliveryTypeFilterData();
    this.handleGetShipmentPartnerFilterData();
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
  handleShipmentSearch = (searchData) => {
    this.setState({
      orderSearchText: searchData,
      currentPage:1
    });
    setTimeout(() => {
      this.handleGetShipmentTabGridData();
    }, 5);
  };

  ///-----------------------API function Start--------------------------
  /// handle Get shipment grid data
  handleGetShipmentTabGridData(filter) {
    let self = this;
    this.setState({
      ShipmentLoading: true,
    });
    axios({
      method: "post",
      url: config.apiUrl + "/HSOrder/GetShipmentDetails",
      headers: authHeader(),
      data: {
        SearchText: this.state.orderSearchText,
        PageNo: this.state.currentPage,
        PageSize: this.state.postsPerPage,
        FilterStatus: this.state.strStatus,
        FilterDelivery: this.state.strDelivery,
        CourierPartner: this.state.strPartner,
      },
    })
      .then(function(res) {
        let status = res.data.message;
        let data = res.data.responseData;
        if (filter === "filter") {
          if (status === "Success") {
            self.setState({
              ShipmentGridData: data.ordersList,
              totalCount: data.totalCount,
              filterShipmentStatus: false,
              filterShipmentDelivery: false,
              filterShipmentPartner: false,
              ShipmentLoading: false,
            });
          } else {
            self.setState({
              ShipmentGridData: [],
              totalCount: 0,
              filterShipmentStatus: false,
              filterShipmentDelivery: false,
              filterShipmentPartner: false,
              ShipmentLoading: false,
            });
          }
        } else {
          if (status === "Success") {
            self.setState({
              ShipmentGridData: data.ordersList,
              totalCount: data.totalCount,
              ShipmentLoading: false,
            });
          } else {
            self.setState({
              ShipmentGridData: [],
              totalCount: 0,
              ShipmentLoading: false,
            });
          }
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }
  /// handle Get Shipment Status filter
  handleGetShipmentStatusFilterData() {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/HSOrder/GetOrderStatusFilter",
      headers: authHeader(),
      params: {
        pageID: 3,
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
  /// handle Get Delivery Type filter data
  handleGetShipmentDeliveryTypeFilterData() {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/HSOrder/GetShoppingBagDeliveryType",
      headers: authHeader(),
      params: {
        pageID: 3,
      },
    })
      .then(function(res) {
        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success") {
          self.setState({
            DeliveryFilterData: data,
          });
        } else {
          self.setState({
            DeliveryFilterData: [],
          });
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }
  /// handle Get Partner filter data
  handleGetShipmentPartnerFilterData() {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/HSOrder/GetCourierPartnerFilter",
      headers: authHeader(),
      params: {
        pageID: 3,
      },
    })
      .then(function(res) {
        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success") {
          self.setState({
            PartnerFilterData: data,
          });
        } else {
          self.setState({
            PartnerFilterData: [],
          });
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }
  /// handle Update Date and Time
  handleUpdateDateandTime(OrderId) {
    const TranslationContext = this.state.translateLanguage.default;
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/HSOrder/UpdateShipmentPickupPendingData",
      headers: authHeader(),
      params: {
        OrderID: OrderId,
      },
    })
      .then(function(res) {
        let status = res.data.message;
        if (status === "Success") {
          NotificationManager.success(
            TranslationContext !== undefined
              ? TranslationContext.alertmessage.success
              : "Success."
          );
          self.handleGetShipmentTabGridData();
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
  }
  /// handle get Order item data by order id
  handleGetOrderItemDataByOrderId(ordId) {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/HSOrder/GetItemDetailByOrderID",
      headers: authHeader(),
      params: {
        orderID: ordId,
      },
    })
      .then(function(res) {
        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success") {
          self.setState({
            ShipmentOrderItem: data.ordersItems,
            ShipmentOrderId: data.invoiceNumber,
            shipmentCharges: data.shipmentCharges,
            showShipmentCharge: data.isStoreDelivery,
            ShipmentMdlbtn: true,
            airWayBill2ndTab: false,
            orderId: ordId,
            ShowSelectCourierPartner: data.showSelectCourierPartner,
            ShipShowTemplate: data.showTemplate,
          });
          if (data.showTemplate) {
            self.handleGetTemplateData();
          }
        } else {
          self.setState({
            ShipmentOrderItem: [],
            ShipmentOrderId: 0,
            shipmentCharges: 0,
            ShipmentMdlbtn: true,
            showShipmentCharge: true,
            airWayBill2ndTab: false,
            orderId: ordId,
            ShowSelectCourierPartner: false,
            ShipShowTemplate: false,
          });
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }
  /// handle Get Temaplate data
  handleGetTemplateData() {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/HSOrder/GetOrderShippingTemplateName",
      headers: authHeader(),
    })
      .then(function(res) {
        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success") {
          self.setState({
            TemplateData: data.shippingTemplateList,
          });
        } else {
          self.setState({
            TemplateData: [],
          });
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }
  /// handle get AWB Invoice data by order id
  handleGetAWBInvoiceDetailsOrderId(orderId) {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/HSOrder/GetAWBInvoiceDetails",
      headers: authHeader(),
      params: {
        orderID: orderId,
      },
    })
      .then(function(res) {
        let status = res.data.message;
        let data = res.data.responseData;

        if (status === "Success") {
          self.setState({
            AirwayBillAWBNo: data[0].awbNumber,
            AirwayItemIds: data[0].itemIDs,
            ShipmentOrderId: data[0].invoiceNo,
            shipmentCharges: data[0].shipmentCharges,
            showShipmentCharge: data[0].isStoreDelivery,
            showNewShipmentCharge: data[0].showShipmentCharges,
            ShipmentMdlbtn: true,
            airWayBill2ndTab: true,
            createdShoppingTabs: true,
            orderId: orderId,
          });
          if (data[0].isStoreDelivery) {
            self.setState({
              IsStoreDelivery: true,
            });
          }
        } else {
          self.setState({
            AirwayBillAWBNo: 0,
            AirwayItemIds: 0,
            ShipmentOrderId: 0,
            shipmentCharges: 0,
            showShipmentCharge: true,
            ShipmentMdlbtn: true,
            orderId: orderId,
          });
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }
  /// Create Shipment AWB
  handleCreateShipmentAWB() {
    let self = this;
    var itemIds = "";
    if (this.state.ShipmentOrderItem.length > 0) {
      for (let i = 0; i < this.state.ShipmentOrderItem.length; i++) {
        itemIds += this.state.ShipmentOrderItem[i].id + ",";
      }
    }
    this.setState({
      createShipmentBtnDisbaled: true,
      createShipmetLoader: true,
    });

    axios({
      method: "post",
      url: config.apiUrl + "/HSOrder/CreateShipmentAWB",
      headers: authHeader(),
      params: {
        orderID: this.state.orderId,
        itemIDs: itemIds,
        templateID: this.state.ShipShowTemplate
          ? this.state.selectedTemplate
          : 0,
      },
    })
      .then(function(res) {
        let CheckStatus = res.data.status;
        let data = res.data.responseData;
        if (CheckStatus) {
          if (data.status) {
            self.setState({
              AirwayBillAWBNo: data.awbNumber,
              AirwayItemIds: data.itemIDs,
              createdShoppingTabs: true,
              createShipmentBtnDisbaled: false,
              createShipmetLoader: false,
            });
            if (data.isStoreDelivery) {
              self.setState({
                IsStoreDelivery: true,
              });
            }
          } else {
            NotificationManager.error(data.statusMessge);
            self.setState({
              ShipmentMdlbtn: false,
            });
          }
          self.handleGetShipmentTabGridData();
        } else {
          NotificationManager.error(res.data.message);
          self.setState({
            createdShoppingTabs: false,
            createShipmentBtnDisbaled: false,
            createShipmetLoader: false,
            ShipmentMdlbtn: false,
          });
        }
      })
      .catch((data) => {
        self.setState({ createShipmetLoader: false });
        console.log(data);
      });
  }
  /// make shipment Store delivery
  handleMakeShipmentAsStoreDelivery() {
    let self = this;

    var itemIds = "";
    if (this.state.ShipmentOrderItem.length > 0) {
      for (let i = 0; i < this.state.ShipmentOrderItem.length; i++) {
        itemIds += this.state.ShipmentOrderItem[i].id + ",";
      }
    }
    this.setState({
      createShipmentBtnDisbaled: true,
      createShipmetLoader: true,
    });

    axios({
      method: "post",
      url: config.apiUrl + "/HSOrder/MakeShipmentAsStoreDelivery",
      headers: authHeader(),
      params: {
        orderID: this.state.orderId,
        itemIDs: itemIds,
        templateID: this.state.ShipShowTemplate
          ? this.state.selectedTemplate
          : 0,
      },
    })
      .then(function(res) {
        let CheckStatus = res.data.status;
        let data = res.data.responseData;
        if (CheckStatus) {
          if (data.status) {
            self.setState({
              AirwayBillAWBNo: data.awbNumber,
              AirwayItemIds: data.itemIDs,
              createdShoppingTabs: true,
              createShipmentBtnDisbaled: false,
              createShipmetLoader: false,
            });
            if (data.isStoreDelivery) {
              self.setState({
                IsStoreDelivery: true,
              });
            }
          } else {
            NotificationManager.error(data.statusMessge);
            self.setState({
              ShipmentMdlbtn: false,
            });
          }
          self.handleGetShipmentTabGridData();
        } else {
          NotificationManager.error(res.data.message);
          self.setState({
            createdShoppingTabs: false,
            createShipmentBtnDisbaled: false,
            createShipmetLoader: false,
            ShipmentMdlbtn: false,
          });
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }
  /// handle cancel and comment for Shopping bag
  handleCancleAndCommnetShipment(OrdId) {
    const TranslationContext = this.state.translateLanguage.default;
    let self = this;
    if (this.state.ShipCancelComment !== "") {
      axios({
        method: "post",
        url: config.apiUrl + "/HSOrder/CancelOrder",
        headers: authHeader(),
        data: {
          orderID: OrdId,
          cancellationReason: this.state.ShipCancelComment,
        },
      })
        .then(function(res) {
          let status = res.data.message;
          if (status === "Success") {
            self.setState({
              ShipCancelComment: "",
            });
            NotificationManager.success(
              TranslationContext !== undefined
                ? TranslationContext.alertmessage.success
                : "Success."
            );
          } else {
            NotificationManager.error(
              TranslationContext !== undefined
                ? TranslationContext.alertmessage.failed
                : "Failed."
            );
          }
          self.handleGetShipmentTabGridData();
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
  ///-----------------------API function End----------------------------
  handleCreateShipmentCheck() {
    const TranslationContext = this.state.translateLanguage.default;
    if (this.state.ShowSelectCourierPartner) {
      if (
        this.state.selectCourierPartner !== "0" &&
        this.state.selectCourierPartner !== 0
      ) {
        if (this.state.selectCourierPartner === "Store") {
          this.handleCheckShowTemplateData();
        } else {
          this.handleCheckShipmentAWB();
        }
      } else {
        NotificationManager.error(
          TranslationContext !== undefined
            ? TranslationContext.ticketingDashboard.pleaseselectcourierpartner
            : "Please Select Courier Partner."
        );
      }
    } else {
      this.handleCheckShipmentAWB();
    }
  }
  /// handle check template data api function
  handleCheckShowTemplateData() {
    const TranslationContext = this.state.translateLanguage.default;
    if (this.state.ShipShowTemplate) {
      if (this.state.selectedTemplate !== "0") {
        this.handleMakeShipmentAsStoreDelivery();
      } else {
        NotificationManager.error(
          TranslationContext !== undefined
            ? TranslationContext.ticketingDashboard.pleaseselecttemplate
            : "Please Select Template."
        );
      }
    } else {
      this.handleMakeShipmentAsStoreDelivery();
    }
  }
  /// handle check AWB data api function
  handleCheckShipmentAWB() {
    const TranslationContext = this.state.translateLanguage.default;
    if (this.state.ShipShowTemplate) {
      if (this.state.selectedTemplate !== "0") {
        this.handleCreateShipmentAWB();
      } else {
        NotificationManager.error(
          TranslationContext !== undefined
            ? TranslationContext.ticketingDashboard.pleaseselecttemplate
            : "Please Select Template."
        );
      }
    } else {
      this.handleCreateShipmentAWB();
    }
  }

  //// shipment Modale Close
  handleShipmentModalClose(e) {
    e.stopPropagation();
    this.setState({
      ShipmentMdlbtn: false,
      createdShoppingTabs: false,
      airWayBill2ndTab: false,
    });
  }
  /// handle check partner status
  handleCheckPartnerOnchange() {
    var checkboxes = document.getElementsByName("ShipmentPartner");
    var strPartner = "";
    for (var i in checkboxes) {
      if (isNaN(i) === false) {
        if (checkboxes[i].checked === true) {
          if (checkboxes[i].getAttribute("attrIds") !== null)
            strPartner += checkboxes[i].getAttribute("attrIds") + ",";
        }
      }
    }
    this.setState({
      strPartner,
      currentPage: 1,
    });
  }

  /// handle check individual status
  handleCheckDeliIndividualStatus() {
    var checkboxes = document.getElementsByName("ShipmentStatus");
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
      currentPage: 1,
    });
  }
  /// handle Devilery filter change
  handleCheckDeliveryOnchange() {
    var checkboxes = document.getElementsByName("ShipmentDelivery");
    var strDelivery = "";
    for (var i in checkboxes) {
      if (isNaN(i) === false) {
        if (checkboxes[i].checked === true) {
          if (checkboxes[i].getAttribute("attrIds") !== null)
            strDelivery += checkboxes[i].getAttribute("attrIds") + ",";
        }
      }
    }
    this.setState({
      strDelivery,
      currentPage: 1,
    });
  }
  ///handle pagination onchage
  PaginationOnChange = async (numPage) => {
    await this.setState({
      currentPage: numPage,
    });

    this.handleGetShipmentTabGridData();
  };
  /// handle per page item change
  handlePageItemchange = async (e) => {
    await this.setState({
      postsPerPage: e.target.value,
      currentPage: 1,
    });

    this.handleGetShipmentTabGridData();
  };
  /// handle Close Partner filter
  handleClosePartnerFilter() {
    this.setState({
      filterShipmentPartner: false,
    });
  }
  /// handle close Delievry filter
  handleCloseDeliveryFilter() {
    this.setState({
      filterShipmentDelivery: false,
    });
  }
  /// handle close status filter
  handleCloseStatusFilter() {
    this.setState({
      filterShipmentStatus: false,
    });
  }
  /// handle select template data
  handleSelectTemplateDD = (e) => {
    this.setState({
      selectedTemplate: e.target.value,
    });
  };
  handlecollapseChange = (e) => {
    this.state.activePanel = e[e.length - 1];
    this.setState({ activePanel: this.state.activePanel });
  };
  render() {
    const TranslationContext = this.state.translateLanguage.default;
    return (
      <>
        {this.state.orderPopoverOverlay && (
          <div className="order-popover-overlay"></div>
        )}
        <div className="table-cntr store dv-table-paging shipmo">
          <p className="shopi">
            {TranslationContext !== undefined
              ? TranslationContext.label.shipment
              : "Shipment"}
          </p>
          {!this.state.isMobileView ? (
            <Table
              className="components-table-demo-nested antd-table-campaign antd-table-order custom-antd-table antd-table-order-mobile"
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
                        <Tooltip title={item.invoiceNo} placement="bottom">
                          <p className="order-bill-no">
                            {item.invoiceNo.length > 13
                              ? item.invoiceNo.substr(0, 13).concat("...")
                              : item.invoiceNo}
                          </p>
                        </Tooltip>
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
                      ? TranslationContext.title.customer
                      : "Customer",
                  className: "table-coloum-hide",
                  render: (row, item) => {
                    return (
                      <div>
                        <p>{item.customerName},</p>
                        <p className="order-small-font">{item.mobileNumber}</p>
                      </div>
                    );
                  },
                },
                {
                  title:
                    TranslationContext !== undefined
                      ? TranslationContext.title.items
                      : "Items",
                  render: (row, item) => {
                    return (
                      <div className="d-flex align-items-center">
                        <p>{item.ordersItemList.length}</p>
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
                                      ? TranslationContext.title.itemname
                                      : "Item Name",
                                  dataIndex: "itemName",
                                  width: 150,
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
                              dataSource={item.ordersItemList}
                            />
                          }
                          trigger="click"
                          overlayClassName="order-popover-table order-popover order-popover-table-big"
                          onVisibleChange={(visible) =>
                            this.setState({ orderPopoverOverlay: visible })
                          }
                        >
                          <img src={OrderHamb} className="order-hamb" />
                        </Popover>
                      </div>
                    );
                  },
                  width: 100,
                  className: "order-desktop",
                },
                {
                  title:
                    TranslationContext !== undefined
                      ? TranslationContext.title.shippingaddress
                      : "Shipping address",
                  render: (row, item) => {
                    return (
                      <p className="order-small-font">{item.shippingAddress}</p>
                    );
                  },
                  width: 250,
                  className: "white-space-init table-coloum-hide",
                },
                {
                  title:
                    TranslationContext !== undefined
                      ? TranslationContext.title.deliverytype
                      : "Delivery Type",
                  className:
                    "shopping-delivery-header camp-status-header camp-status-header-statusFilter table-coloum-hide order-status-header",
                  dataIndex: "deliveryTypeName",
                  width: 150,
                  filterDropdown: (data, row) => {
                    return (
                      <div className="campaign-status-drpdwn">
                        <ul>
                          {this.state.DeliveryFilterData !== null &&
                            this.state.DeliveryFilterData.map((item, b) => (
                              <li key={b}>
                                <input
                                  type="checkbox"
                                  id={"New" + item.deliveryTypeID}
                                  className="ch1"
                                  onChange={this.handleCheckDeliveryOnchange.bind(
                                    this
                                  )}
                                  name="ShipmentDelivery"
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
                            onClick={this.handleGetShipmentTabGridData.bind(
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
                  filterDropdownVisible: this.state.filterShipmentDelivery,
                  onFilterDropdownVisibleChange: (visible) =>
                    this.setState({ filterShipmentDelivery: visible }),
                  filterIcon: (filtered) => (
                    <span
                      style={{ color: filtered ? "#1890ff" : undefined }}
                    ></span>
                  ),
                },
                {
                  title:
                    TranslationContext !== undefined
                      ? TranslationContext.title.status
                      : "Status",
                  className:
                    "camp-status-header camp-status-header-statusFilter table-coloum-hide order-status-header",
                  render: (row, item) => {
                    return (
                      <div className="d-flex align-items-center">
                        <p>{item.statusName}</p>
                        <Popover
                          content={
                            <div className="order-tab-popover shipment-status-popover">
                              <div className="d-flex align-items-center justify-content-between">
                                <p>
                                  {TranslationContext !== undefined
                                    ? TranslationContext.ticketingDashboard
                                        .expectedpickupdate
                                    : "Expected Pickup Date"}
                                  :
                                </p>
                                <p className="username-mar">
                                  {item.pickupScheduledDate}
                                </p>
                              </div>
                              <div className="d-flex align-items-center justify-content-between">
                                <p>
                                  {TranslationContext !== undefined
                                    ? TranslationContext.ticketingDashboard
                                        .expecteddeliverydate
                                    : "Expected Delivery Date"}
                                  :
                                </p>
                                <p className="username-mar">
                                  {item.estimatedDeliveryDate}
                                </p>
                              </div>
                              {item.showShipmentCharges ? (
                                <div className="d-flex align-items-center justify-content-between">
                                  <p>
                                    {TranslationContext !== undefined
                                      ? TranslationContext.ticketingDashboard
                                          .charges
                                      : "Charges"}
                                    :
                                  </p>
                                  <p className="username-mar">
                                    {item.shippingCharges}
                                  </p>
                                </div>
                              ) : null}
                            </div>
                          }
                          trigger="click"
                          overlayClassName="order-popover shopping-popover-cancel"
                          onVisibleChange={(visible) =>
                            this.setState({ orderPopoverOverlay: visible })
                          }
                        >
                          {item.courierPartner !== "" &&
                          item.courierPartner !== "Store" ? (
                            <img src={OrderInfo} className="order-info" />
                          ) : null}
                        </Popover>
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
                                  onChange={this.handleCheckDeliIndividualStatus.bind(
                                    this
                                  )}
                                  name="ShipmentStatus"
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
                            onClick={this.handleGetShipmentTabGridData.bind(
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
                  filterDropdownVisible: this.state.filterShipmentStatus,
                  onFilterDropdownVisibleChange: (visible) =>
                    this.setState({ filterShipmentStatus: visible }),
                  filterIcon: (filtered) => (
                    <span
                      style={{ color: filtered ? "#1890ff" : undefined }}
                    ></span>
                  ),
                },
                {
                  title:
                    TranslationContext !== undefined
                      ? TranslationContext.title.partner
                      : "Partner",
                  dataIndex: "courierPartner",
                  className:
                    "camp-status-header camp-status-header-statusFilter table-coloum-hide order-status-header partner-shipment-header",
                  width: 150,
                  filterDropdown: (data, row) => {
                    return (
                      <div className="campaign-status-drpdwn">
                        <ul>
                          {this.state.PartnerFilterData !== null &&
                            this.state.PartnerFilterData.map((item, p) => {
                              return (
                                <li key={p}>
                                  <input
                                    type="checkbox"
                                    id={"New" + item}
                                    className="ch1"
                                    onChange={this.handleCheckPartnerOnchange.bind(
                                      this
                                    )}
                                    name="ShipmentPartner"
                                    attrIds={item}
                                  />
                                  <label htmlFor={"New" + item}>
                                    <span className="ch1-text">{item}</span>
                                  </label>
                                </li>
                              );
                            })}
                        </ul>
                        <div className="dv-status">
                          <button
                            className="btn-apply-status"
                            onClick={this.handleGetShipmentTabGridData.bind(
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
                            onClick={this.handleClosePartnerFilter.bind(this)}
                          >
                            {TranslationContext !== undefined
                              ? TranslationContext.button.cancel
                              : "Cancel"}
                          </button>
                        </div>
                      </div>
                    );
                  },
                  filterDropdownVisible: this.state.filterShipmentPartner,
                  onFilterDropdownVisibleChange: (visible) =>
                    this.setState({ filterShipmentPartner: visible }),
                  filterIcon: (filtered) => (
                    <span
                      style={{ color: filtered ? "#1890ff" : undefined }}
                    ></span>
                  ),
                },
                {
                  title:
                    TranslationContext !== undefined
                      ? TranslationContext.title.actions
                      : "Action",
                  className: "action-w",
                  render: (row, item) => {
                    return (
                      <div>
                        <div className="pickuppendingcustom pickup">
                          {item.actionTypeName === "Pickup Pending" ? (
                            <>
                              <Popconfirm
                                title={
                                  <div className="pickuppending-table">
                                    <table>
                                      <tbody>
                                        <tr>
                                          <td>
                                            <label>
                                              {TranslationContext !== undefined
                                                ? TranslationContext.label
                                                    .pickupdate
                                                : "Pickup Date"}
                                              :
                                            </label>
                                            <input
                                              type="text"
                                              className="form-control"
                                              value={item.pickupDate}
                                              disabled={true}
                                            />
                                          </td>
                                          <td>
                                            <label>
                                              {TranslationContext !== undefined
                                                ? TranslationContext.label
                                                    .pickuptime
                                                : "Pickup Time"}
                                              :
                                            </label>
                                            <input
                                              type="text"
                                              className="form-control"
                                              value={item.pickupTime}
                                              disabled={true}
                                            />
                                          </td>
                                        </tr>
                                        <tr>
                                          <td>
                                            <label>
                                              {TranslationContext !== undefined
                                                ? TranslationContext.label
                                                    .pickupdone
                                                : "Pickup Done"}
                                            </label>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </div>
                                }
                                overlayClassName="order-popover order-popover-butns popbtn"
                                placement="bottomRight"
                                onVisibleChange={(visible) =>
                                  this.setState({
                                    orderPopoverOverlay: visible,
                                  })
                                }
                                icon={false}
                                okText={
                                  TranslationContext !== undefined
                                    ? TranslationContext.button.yes
                                    : "Yes"
                                }
                                onConfirm={this.handleUpdateDateandTime.bind(
                                  this,
                                  item.id
                                )}
                                cancelText={
                                  TranslationContext !== undefined
                                    ? TranslationContext.button.no
                                    : "No"
                                }
                              >
                                <button
                                  className={
                                    item.actionTypeName === "Pickup Pending"
                                      ? "butn order-grid-butn order-grid-butn-green"
                                      : "butn order-grid-butn"
                                  }
                                >
                                  {TranslationContext !== undefined
                                    ? TranslationContext.button.pickuppending
                                    : item.actionTypeName}
                                </button>
                              </Popconfirm>
                            </>
                          ) : null}
                          {item.actionTypeName === "Create Shipment" ? (
                            <>
                              <button
                                className={
                                  item.actionTypeName === "Create Shipment"
                                    ? "butn order-grid-butn"
                                    : "butn order-grid-butn order-grid-butn-green"
                                }
                                type="button"
                                onClick={this.handleGetOrderItemDataByOrderId.bind(
                                  this,
                                  item.id
                                )}
                              >
                                {TranslationContext !== undefined
                                  ? TranslationContext.button.createshipment
                                  : item.actionTypeName}
                              </button>
                            </>
                          ) : null}
                          {item.actionTypeName === "Shipment Created" ? (
                            <>
                              <button
                                className={
                                  item.actionTypeName === "Shipment Created"
                                    ? "butn order-grid-butn delibutn"
                                    : "butn order-grid-butn order-grid-butn-green"
                                }
                                type="button"
                                onClick={this.handleGetAWBInvoiceDetailsOrderId.bind(
                                  this,
                                  item.id
                                )}
                              >
                                {TranslationContext !== undefined
                                  ? TranslationContext.button.shipmentcreated
                                  : item.actionTypeName}
                              </button>
                              {item.cancelButtonInShipment && (
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
                                                ? TranslationContext.placeholder
                                                    .entercomment
                                                : "Enter Comment"
                                            }
                                            value={this.state.ShipCancelComment}
                                            name="ShipCancelComment"
                                            onChange={(e) =>
                                              this.setState({
                                                ShipCancelComment:
                                                  e.target.value,
                                              })
                                            }
                                          ></textarea>
                                        </div>
                                      </div>
                                    </>
                                  }
                                  overlayClassName="order-popover order-popover-butns shopping-popover-delete"
                                  placement="bottomRight"
                                  onVisibleChange={(visible) =>
                                    this.setState({
                                      orderPopoverOverlay: visible,
                                      ShipCancelComment: "",
                                    })
                                  }
                                  icon={false}
                                  okText="Remove"
                                  onConfirm={this.handleCancleAndCommnetShipment.bind(
                                    this,
                                    item.id
                                  )}
                                >
                                  <button className="butn order-grid-butn order-del-butn">
                                    <img src={OrderDel} alt="delete icon" />
                                  </button>
                                </Popconfirm>
                              )}
                            </>
                          ) : null}
                        </div>
                        <div className="itemviewmobile">
                          <div className="d-flex align-items-center">
                            <p>{item.ordersItemList.length}</p>
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
                                          ? TranslationContext.title.itemname
                                          : "Item Name",
                                      dataIndex: "itemName",
                                      width: 150,
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
                                  dataSource={item.ordersItemList}
                                />
                              }
                              trigger="click"
                              overlayClassName="order-popover-table order-popover order-popover-table-big"
                              onVisibleChange={(visible) =>
                                this.setState({ orderPopoverOverlay: visible })
                              }
                            >
                              <img src={Info} className="item-img" />
                            </Popover>
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
              dataSource={this.state.ShipmentGridData}
              loading={this.state.ShipmentLoading}
            />
          ) : (
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
              <Spin spinning={this.state.ShipmentLoading}>
                <Collapse
                  bordered={false}
                  className="site-collapse-custom-collapse"
                  expandIconPosition={"right"}
                  destroyInactivePanel={true}
                  onChange={this.handlecollapseChange.bind(this)}
                  activeKey={this.state.activePanel}
                >
                  {this.state.ShipmentGridData.length > 0
                    ? this.state.ShipmentGridData.map((item, key) => {
                        return (
                          <Panel
                            header={
                              <div>
                                <div>
                                  <div className="d-flex align-items-center overflow-hidden namenumbermain">
                                    <p className="order-bill-no">
                                      {item.invoiceNo}
                                    </p>
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
                                  Partner: &nbsp;
                                  <span>{item.courierPartner}</span>
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
                            <div className="row">
                              <div className="col-6 p-0">
                                <span className="addres">
                                  <p>{item.shippingAddress}</p>
                                </span>
                              </div>
                              <div className="col-6 pr-1 text-right">
                                {item.actionTypeName === "Pickup Pending" ? (
                                  <>
                                    <Popconfirm
                                      title={
                                        <div className="pickuppending-table">
                                          <table>
                                            <tbody>
                                              <tr>
                                                <td>
                                                  <label>
                                                    {TranslationContext !==
                                                    undefined
                                                      ? TranslationContext.label
                                                          .pickupdate
                                                      : "Pickup Date"}
                                                    :
                                                  </label>
                                                  <input
                                                    type="text"
                                                    className="form-control"
                                                    value={item.pickupDate}
                                                    disabled={true}
                                                  />
                                                </td>
                                                <td>
                                                  <label>
                                                    {TranslationContext !==
                                                    undefined
                                                      ? TranslationContext.label
                                                          .pickuptime
                                                      : "Pickup Time"}
                                                    :
                                                  </label>
                                                  <input
                                                    type="text"
                                                    className="form-control"
                                                    value={item.pickupTime}
                                                    disabled={true}
                                                  />
                                                </td>
                                              </tr>
                                              <tr>
                                                <td>
                                                  <label>
                                                    {TranslationContext !==
                                                    undefined
                                                      ? TranslationContext.label
                                                          .pickupdone
                                                      : "Pickup Done"}
                                                  </label>
                                                </td>
                                              </tr>
                                            </tbody>
                                          </table>
                                        </div>
                                      }
                                      overlayClassName="order-popover order-popover-butns popbtn"
                                      placement="bottomRight"
                                      onVisibleChange={(visible) =>
                                        this.setState({
                                          orderPopoverOverlay: visible,
                                        })
                                      }
                                      icon={false}
                                      okText={
                                        TranslationContext !== undefined
                                          ? TranslationContext.button.yes
                                          : "Yes"
                                      }
                                      onConfirm={this.handleUpdateDateandTime.bind(
                                        this,
                                        item.id
                                      )}
                                      cancelText={
                                        TranslationContext !== undefined
                                          ? TranslationContext.button.no
                                          : "No"
                                      }
                                    >
                                      <button
                                        className={
                                          item.actionTypeName ===
                                          "Pickup Pending"
                                            ? "butn order-grid-butn order-grid-butn-green"
                                            : "butn order-grid-butn"
                                        }
                                      >
                                        {TranslationContext !== undefined
                                          ? TranslationContext.button
                                              .pickuppending
                                          : item.actionTypeName}
                                      </button>
                                    </Popconfirm>
                                  </>
                                ) : null}
                                {item.actionTypeName === "Create Shipment" ? (
                                  <>
                                    <button
                                      className={
                                        item.actionTypeName ===
                                        "Create Shipment"
                                          ? "butn order-grid-butn"
                                          : "butn order-grid-butn order-grid-butn-green"
                                      }
                                      type="button"
                                      onClick={this.handleGetOrderItemDataByOrderId.bind(
                                        this,
                                        item.id
                                      )}
                                    >
                                      {TranslationContext !== undefined
                                        ? TranslationContext.button
                                            .createshipment
                                        : item.actionTypeName}
                                    </button>
                                  </>
                                ) : null}
                                {item.actionTypeName === "Shipment Created" ? (
                                  <>
                                    <button
                                      className={
                                        item.actionTypeName ===
                                        "Shipment Created"
                                          ? "butn order-grid-butn delibutn"
                                          : "butn order-grid-butn order-grid-butn-green"
                                      }
                                      type="button"
                                      onClick={this.handleGetAWBInvoiceDetailsOrderId.bind(
                                        this,
                                        item.id
                                      )}
                                    >
                                      {TranslationContext !== undefined
                                        ? TranslationContext.button
                                            .shipmentcreated
                                        : item.actionTypeName}
                                    </button>
                                    {item.cancelButtonInShipment && (
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
                                                    this.state.ShipCancelComment
                                                  }
                                                  name="ShipCancelComment"
                                                  onChange={(e) =>
                                                    this.setState({
                                                      ShipCancelComment:
                                                        e.target.value,
                                                    })
                                                  }
                                                ></textarea>
                                              </div>
                                            </div>
                                          </>
                                        }
                                        overlayClassName="order-popover order-popover-butns shopping-popover-delete"
                                        placement="bottomRight"
                                        icon={false}
                                        okText="Remove"
                                        onConfirm={this.handleCancleAndCommnetShipment.bind(
                                          this,
                                          item.id
                                        )}
                                      >
                                        <button className="butn order-grid-butn order-del-butn">
                                          <img
                                            src={OrderDel}
                                            alt="delete icon"
                                          />
                                        </button>
                                      </Popconfirm>
                                    )}
                                  </>
                                ) : null}
                              </div>
                            </div>
                            <div className=""></div>
                          </Panel>
                        );
                      })
                    : null}
                </Collapse>
                {this.state.ShipmentGridData.length === 0 ? (
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
            open={this.state.ShipmentMdlbtn}
            onClose={this.handleShipmentModalClose.bind(this)}
            center
            modalId="article-popup"
            overlayId="logout-ovrly"
            classNames={{ modal: "ShoimentMobile" }}
          >
            <div
              className="closemob"
              style={{ marginBottom: "20px" }}
              onClick={this.handleShipmentModalClose.bind(this)}
            ></div>
            <div>
              <img
                src={CancelImg}
                alt="cancelImg"
                className="cancalImg"
                onClick={this.handleShipmentModalClose.bind(this)}
              />
              <div className="step-progress no-focus">
                <ul className="nav nav-tabs" role="tablist">
                  <li className="nav-item">
                    <a
                      className={
                        this.state.createdShoppingTabs
                          ? "nav-link nav-line disabled-link"
                          : "nav-link nav-line active disabled-link"
                      }
                      data-toggle="tab"
                      href="#article-Map-tab"
                      role="tab"
                      aria-controls="article-Map-tab"
                      aria-selected="true"
                    >
                      <input
                        type="checkbox"
                        className="arti-check"
                        checked={true}
                      />
                      {TranslationContext !== undefined
                        ? TranslationContext.checkbox.articlemapping
                        : "Article Mapping"}
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className={
                        this.state.createdShoppingTabs
                          ? "nav-link active disabled-link"
                          : "nav-link  active disabled-link"
                      }
                      data-toggle="tab"
                      href="#airwayBill-tab"
                      role="tab"
                      aria-controls="airwayBill-tab"
                      aria-selected="false"
                    >
                      <input
                        type="checkbox"
                        className="arti-check"
                        checked={this.state.createdShoppingTabs}
                      />
                      {TranslationContext !== undefined
                        ? TranslationContext.checkbox.AirwayBillNo
                        : "Airway Bill No"}
                    </a>
                  </li>
                </ul>

                <div className="tab-content store-task-tab-cont orders-tab-cont">
                  <div
                    className={
                      this.state.airWayBill2ndTab
                        ? "tab-pane fade"
                        : this.state.createdShoppingTabs
                        ? "tab-pane fade"
                        : "tab-pane fade show active"
                    }
                    id="article-Map-tab"
                    role="tabpanel"
                    aria-labelledby="article-Map-tab"
                  >
                    <Spin
                      tip={
                        TranslationContext !== undefined
                          ? TranslationContext.tip.pleasewait
                          : "Please wait..."
                      }
                      spinning={this.state.createShipmetLoader}
                    >
                      <div className="tabs-content">
                        <div className="article-body">
                          <span style={{ marginBottom: "30px" }}>
                            {TranslationContext !== undefined
                              ? TranslationContext.span
                                  .itemidshownbelowmappedtothisorder
                              : "Item id shown below mapped to this Order"}
                            &nbsp;<b> {this.state.ShipmentOrderId}</b>&nbsp;
                            {TranslationContext !== undefined
                              ? TranslationContext.span.only
                              : "only."}
                            <br />
                          </span>
                          <div className="table-responsive">
                            <Table
                              className="components-table-demo-nested shipment-table-popup antd-table-campaign antd-table-order custom-antd-table order-popover-table table-responsive"
                              columns={[
                                {
                                  title:
                                    TranslationContext !== undefined
                                      ? TranslationContext.title.itemid
                                      : "Article No",
                                  dataIndex: "itemID",
                                  render: (row, item) => {
                                    return (
                                      <p>
                                        <input
                                          type="checkbox"
                                          checked={item.checked}
                                        />
                                        &nbsp;
                                        <Tooltip
                                          title={item.itemID}
                                          placement="bottom"
                                        >
                                          <p className="order-bill-no">
                                            {item.itemID.length > 10
                                              ? item.itemID
                                                  .substr(0, 10)
                                                  .concat("...")
                                              : item.itemID}
                                          </p>
                                        </Tooltip>
                                      </p>
                                    );
                                  },
                                },
                                {
                                  title:
                                    TranslationContext !== undefined
                                      ? TranslationContext.title.itemname
                                      : "Article Name",
                                  dataIndex: "itemName",
                                  render: (row, item) => {
                                    return (
                                      <p>
                                        <Tooltip
                                          title={item.itemName}
                                          placement="bottom"
                                        >
                                          <p className="order-bill-no">
                                            {item.itemName.length > 12
                                              ? item.itemName
                                                  .substr(0, 12)
                                                  .concat("...")
                                              : item.itemName}
                                          </p>
                                        </Tooltip>
                                      </p>
                                    );
                                  },
                                  width: 150,
                                },
                                {
                                  title:
                                    TranslationContext !== undefined
                                      ? TranslationContext.title.itemprice
                                      : "Article MRP",
                                  dataIndex: "itemPrice",
                                },
                                {
                                  title:
                                    TranslationContext !== undefined
                                      ? TranslationContext.title.itemquantity
                                      : "Article Quantity",
                                  dataIndex: "quantity",
                                },
                                {
                                  title: () => (
                                    <>
                                      {this.state.ShipShowTemplate && (
                                        <select
                                          className="shipment-table-dropdown"
                                          name="selectedTemplate"
                                          value={this.state.selectedTemplate}
                                          onChange={this.handleSelectTemplateDD}
                                        >
                                          <option value="0">
                                            {TranslationContext !== undefined
                                              ? TranslationContext
                                                  .ticketingDashboard
                                                  .selecttemplate
                                              : "Select Template"}
                                          </option>
                                          {this.state.TemplateData !== null &&
                                            this.state.TemplateData.map(
                                              (item, j) => (
                                                <option key={j} value={item.id}>
                                                  {item.templateName}
                                                </option>
                                              )
                                            )}
                                        </select>
                                      )}
                                    </>
                                  ),
                                },
                              ]}
                              scroll={{ y: 240 }}
                              pagination={false}
                              dataSource={this.state.ShipmentOrderItem}
                            />
                          </div>
                        </div>
                        <div className="dv-status m-t-20 ship-mar-bot">
                          {this.state.ShowSelectCourierPartner && (
                            <div className="ordDisply">
                              <label>
                                {TranslationContext !== undefined
                                  ? TranslationContext.ticketingDashboard
                                      .selectcourierpartner
                                  : "Select Courier Partner"}
                              </label>
                              <select
                                className="shipment-table-dropdown"
                                onChange={(e) =>
                                  this.setState({
                                    selectCourierPartner: e.target.value,
                                  })
                                }
                                value={this.state.selectCourierPartner}
                              >
                                <option value="0">
                                  {TranslationContext !== undefined
                                    ? TranslationContext.ticketingDashboard
                                        .selectpartner
                                    : "Select Partner"}
                                </option>
                                <option value="Store">Store</option>
                                <option value="courierpartner">
                                  Courier Partner
                                </option>
                              </select>
                            </div>
                          )}

                          <button
                            className="btn-shipment-popup canshio"
                            style={{ marginRight: "10px" }}
                            onClick={this.handleShipmentModalClose.bind(this)}
                          >
                            {TranslationContext !== undefined
                              ? TranslationContext.button.cancel
                              : "Cancel"}
                          </button>
                          <button
                            style={{ marginRight: "0px" }}
                            className={
                              this.state.createShipmentBtnDisbaled
                                ? "btnClickDisabled btn-shipment-saveNext"
                                : "btn-shipment-saveNext"
                            }
                            onClick={this.handleCreateShipmentCheck.bind(this)}
                            disabled={this.state.createShipmentBtnDisbaled}
                          >
                            {TranslationContext !== undefined
                              ? TranslationContext.button.saveandnext
                              : "Save & Next"}
                          </button>
                        </div>
                      </div>
                    </Spin>
                  </div>
                  <div
                    className={
                      this.state.airWayBill2ndTab
                        ? "tab-pane fade show active"
                        : this.state.createdShoppingTabs
                        ? "tab-pane fade show active"
                        : "tab-pane fade"
                    }
                    id="airwayBill-tab"
                    role="tabpanel"
                    aria-labelledby="airwayBill-tab"
                  >
                    <div className="tabs-content">
                      <div className="text-center airwaybox">
                        <div className="airwaycontent">
                          <img
                            src={CardTick}
                            alt="CardTick"
                            className="cardtick"
                          />
                          <h2>
                            {this.state.IsStoreDelivery ? (
                              "Courier Partner - Store"
                            ) : (
                              <>
                                {TranslationContext !== undefined
                                  ? TranslationContext.title.awbno
                                  : "AWB No"}
                                - {this.state.AirwayBillAWBNo}
                              </>
                            )}
                          </h2>
                          <p className="success">
                            {TranslationContext !== undefined
                              ? TranslationContext.p.successfullymappedto
                              : "Successfully mapped to"}
                          </p>
                          <ul className="mobileul">
                            <li className="success1">
                              {TranslationContext !== undefined
                                ? TranslationContext.p.successfullymappedto
                                : "Successfully mapped to"}
                            </li>

                            <li>
                              {TranslationContext !== undefined
                                ? TranslationContext.label.orderid
                                : "Order ID"} 
                              - {this.state.ShipmentOrderId}
                            </li>
                            <li>
                              {TranslationContext !== undefined
                                ? TranslationContext.li.itemid
                                : "Item ID"}
                              {" - "}
                              {/* {this.state.AirwayItemIds} */}

                              <Tooltip
                                title={this.state.AirwayItemIds}
                                placement="bottom"
                              >
                                <p className="shipItemtlTp">
                                  {this.state.AirwayItemIds.length > 20
                                    ? this.state.AirwayItemIds.substr(
                                        0,
                                        20
                                      ).concat("...")
                                    : this.state.AirwayItemIds}
                                </p>
                              </Tooltip>
                            </li>
                          </ul>

                          {this.state.showNewShipmentCharge ? (
                            <p style={{ color: "black" }}>
                              {TranslationContext !== undefined
                                ? TranslationContext.ticketingDashboard
                                    .shipmentcharges
                                : "Shipment Charges "}
                              : {this.state.shipmentCharges}
                            </p>
                          ) : null}
                        </div>
                      </div>
                      <div className="dv-status m-t-20 ship-mar-bot">
                        <button
                          className="btn-shipment-popup canshio"
                          style={{ marginRight: "10px" }}
                          onClick={this.handleShipmentModalClose.bind(this)}
                        >
                          {TranslationContext !== undefined
                            ? TranslationContext.button.cancel
                            : "Cancel"}
                        </button>
                        <button
                          style={{ marginRight: "0px" }}
                          className="btn-shipment-saveNext"
                          onClick={this.handleShipmentModalClose.bind(this)}
                        >
                          {TranslationContext !== undefined
                            ? TranslationContext.button.done
                            : "Done"}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Modal>
        </div>
      </>
    );
  }
}

export default ShipmentTab;
