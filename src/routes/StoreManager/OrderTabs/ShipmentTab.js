import React, { Component } from "react";
import axios from "axios";
import { Table, Popover } from "antd";
import Modal from "react-responsive-modal";
// import NoPayment from "./../../../assets/Images/no-payment.png";
// import CreditCard from "./../../../assets/Images/credit-card.png";
// import OrderInfo from "./../../../assets/Images/order-info.png";
// import OrderShopingBlack from "./../../../assets/Images/order-shoping-black.png";
// import OrderBag from "./../../../assets/Images/order-bag.png";
import OrderHamb from "./../../../assets/Images/order-hamb.png";
import CancelImg from "./../../../assets/Images/cancel.png";
import CardTick from "./../../../assets/Images/card-tick.png";
// import OrderDel from "./../../../assets/Images/order-del.png";
import { authHeader } from "../../../helpers/authHeader";
import config from "../../../helpers/config";
import Pagination from "react-pagination-js";
import "react-pagination-js/dist/styles.css";
import { NotificationManager } from "react-notifications";
import * as translationHI from "../../../translations/hindi";
import * as translationMA from "../../../translations/marathi";

class ShipmentTab extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ShipmentGridData: [],
      filterShipmentStatus: false,
      orderPopoverOverlay: false,
      ShipmentMdlbtn: false,
      ShipmentLoading: false,
      totalCount: 0,
      currentPage: 1,
      postsPerPage: 10,
      statusFilterData: [],
      strStatus: "",
      translateLanguage: {},
      ShipmentOrderItem: [],
      ShipmentOrderId: 0,
      selectedRows: [],
      orderId: 0,
      AirwayBillAWBNo: 0,
      AirwayItemIds: 0,
      createdShoppingTabs: false,
    };
  }

  componentDidMount() {
    this.handleGetShipmentTabGridData();
    this.handleGetShipmentStatusFilterData();
    if (window.localStorage.getItem("translateLanguage") === "hindi") {
      this.state.translateLanguage = translationHI;
    } else if (window.localStorage.getItem("translateLanguage") === "marathi") {
      this.state.translateLanguage = translationMA;
    } else {
      this.state.translateLanguage = {};
    }
  }

  ///-----------------------API function Start--------------------------
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
        SearchText: "",
        PageNo: this.state.currentPage,
        PageSize: this.state.postsPerPage,
        FilterStatus: this.state.strStatus,
      },
    })
      .then(function(res) {
        debugger;
        let status = res.data.message;
        let data = res.data.responseData;
        if (filter === "filter") {
          if (status === "Success") {
            self.setState({
              ShipmentGridData: data.ordersList,
              totalCount: data.totalCount,
              filterShipmentStatus: false,
              ShipmentLoading: false,
            });
          } else {
            self.setState({
              ShipmentGridData: [],
              totalCount: 0,
              filterShipmentStatus: false,
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
  /// handle Update Date and Time
  handleUpdateDateandTime(OrderId) {
    debugger;
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
          NotificationManager.success("Success.");
          self.handleGetShipmentTabGridData();
        } else {
          NotificationManager.error("Failed.");
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }
  /// handle get Order item data by order id
  handleGetOrderItemDataByOrderId(OrderId) {
    debugger;
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/HSOrder/GetItemDetailByOrderID",
      headers: authHeader(),
      params: {
        orderID: OrderId,
      },
    })
      .then(function(res) {
        debugger;
        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success") {
          self.setState({
            ShipmentOrderItem: data.ordersItems,
            ShipmentOrderId: data.invoiceNumber,
            ShipmentMdlbtn: true,
            orderId: OrderId,
          });
        } else {
          self.setState({
            ShipmentOrderItem: [],
            ShipmentOrderId: 0,
            ShipmentMdlbtn: true,
            orderId: OrderId,
          });
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }
  /// Create Shipment AWB
  handleCreateShipmentAWB(e) {
    e.preventDefault();
    let self = this;
    var itemIds = "";
    if (this.state.selectedRows.length > 0) {
      for (let i = 0; i < this.state.selectedRows.length; i++) {
        itemIds += this.state.selectedRows[i].id + ",";
      }
    }
    axios({
      method: "post",
      url: config.apiUrl + "/HSOrder/CreateShipmentAWB",
      headers: authHeader(),
      params: {
        orderID: this.state.orderId,
        itemIDs: itemIds,
      },
    })
      .then(function(res) {
        debugger;
        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success") {
          self.setState({
            AirwayBillAWBNo: data.awbNumber,
            AirwayItemIds: data.itemIDs,
            createdShoppingTabs: true,
          });
        } else {
          self.setState({
            createdShoppingTabs: false,
          });
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }
  ///-----------------------API function End----------------------------

  //// shipment Modale Close
  handleShipmentModalClose() {
    this.setState({
      ShipmentMdlbtn: false,
      createdShoppingTabs: false,
    });
  }
  /// handle check individual status
  handleCheckDeliIndividualStatus() {
    debugger;
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
    });

    this.handleGetShipmentTabGridData();
  };

  render() {
    const TranslationContext = this.state.translateLanguage.default;
    const SelectedRow = {
      onChange: (selectedRowKeys, selectedRows) => {
        this.setState({
          selectedRows,
        });
      },
      onSelect: (record, selected, selectedRow) => {
        //console.log(record, selected, selectedRow);
      },
      onSelectAll: (selected, selectedRows, changeRows) => {
        //console.log(selected, selectedRows, changeRows);
      },
      getCheckboxProps: (record) => ({
        disabled: record.disable === 1,
        name: record.disable,
      }),
    };

    return (
      <>
        {this.state.orderPopoverOverlay && (
          <div className="order-popover-overlay"></div>
        )}
        <div className="table-cntr store dv-table-paging">
          <Table
            className="components-table-demo-nested antd-table-campaign antd-table-order custom-antd-table antd-table-order-mobile"
            columns={[
              {
                title:
                  TranslationContext !== undefined
                    ? TranslationContext.title.invoiceno
                    : "Invoice no.",

                render: (row, item) => {
                  return (
                    <div className="d-flex align-items-center">
                      <p>{item.invoiceNo}</p>
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
                              // {
                              //   title: "AWB. No",
                              //   dataIndex: "AWBNo",
                              // },
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
                className: "table-coloum-hide",
                dataIndex: "deliveryTypeName",
                width: 150,
              },
              {
                title:
                  TranslationContext !== undefined
                    ? TranslationContext.title.status
                    : "Status",
                className:
                  "camp-status-header camp-status-header-statusFilter table-coloum-hide",
                render: (row, item) => {
                  return (
                    <>
                      <p className="order-clr-blue">{item.statusName}</p>
                      {/* {item.selfPickUp && (
                        <p className="order-clr-orange">(Self Pickup)</p>
                      )} */}
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
                                // checked={this.state.CheckBoxAllStatus}
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
                        <button className="btn-cancel-status">
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
                dataIndex: "Partner",
                className: "table-coloum-hide",
                width: 150,
              },
              {
                title:
                  TranslationContext !== undefined
                    ? TranslationContext.title.actions
                    : "Action",
                className: "action-w",
                render: (row, item) => {
                  return (
                    <div className="pickuppendingcustom">
                      {item.actionTypeName === "Pickup Pending" ? (
                        <>
                          <Popover
                            content={
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
                                        <button
                                          type="button"
                                          className="popbtn"
                                          onClick={this.handleUpdateDateandTime.bind(
                                            this,
                                            item.id
                                          )}
                                        >
                                          {TranslationContext !== undefined
                                            ? TranslationContext.button.yes
                                            : "Yes"}
                                        </button>
                                      </td>
                                      <td>
                                        <label style={{ visibility: "hidden" }}>
                                          {TranslationContext !== undefined
                                            ? TranslationContext.label
                                                .pickupdone
                                            : "Pickup Done"}
                                        </label>
                                        <button
                                          type="button"
                                          className="popbtnno"
                                        >
                                          {TranslationContext !== undefined
                                            ? TranslationContext.button.no
                                            : "No"}
                                        </button>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                            }
                            trigger="click"
                            overlayClassName="order-popover order-popover-butns"
                            placement="bottomRight"
                            // onVisibleChange={(visible) =>
                            //   this.setState({ orderPopoverOverlay: visible })
                            // }
                          >
                            <button
                              className={
                                item.actionTypeName === "Pickup Pending"
                                  ? "butn order-grid-butn order-grid-butn-green"
                                  : "butn order-grid-butn"
                              }
                            >
                              {item.actionTypeName}
                            </button>
                          </Popover>
                        </>
                      ) : (
                        <button
                          className={
                            item.actionTypeName === "Payment Done"
                              ? "butn order-grid-butn order-grid-butn-green"
                              : "butn order-grid-butn"
                          }
                          type="button"
                          onClick={this.handleGetOrderItemDataByOrderId.bind(
                            this,
                            item.id
                          )}
                        >
                          {item.actionTypeName}
                        </button>
                      )}
                    </div>
                  );
                },
              },
            ]}
            expandedRowRender={(row, item) => {
              return (
                <div className="innertabcollapse">
                  <div className="row">
                    <div>
                      <label>Customer Name</label>
                      <label>
                        <p>{row.customerName}</p>
                        <p>{row.mobileNumber}</p>
                      </label>
                    </div>

                    <div>
                      <label>Shipping Address</label>
                      <label>{row.shippingAddress}</label>
                    </div>
                  </div>
                  <div className="row">
                    <div>
                      <label>Delivery Type</label>
                      <label>{row.deliveryTypeName}</label>
                    </div>

                    <div>
                      <label>Status</label>
                      <label>{row.statusName}</label>
                    </div>
                  </div>
                  <div className="row">
                    <div>
                      <label>Partner</label>
                      <label>{row.Partner}</label>
                    </div>
                  </div>
                </div>
              );
            }}
            expandIconColumnIndex={7}
            expandIconAsCell={false}
            pagination={false}
            showSizeChanger={false}
            onShowSizeChange={false}
            dataSource={this.state.ShipmentGridData}
            loading={this.state.ShipmentLoading}
          />
          <Pagination
            currentPage={this.state.currentPage}
            totalSize={this.state.totalCount}
            // totalSize={row.customerCount}
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
          <Modal
            open={this.state.ShipmentMdlbtn}
            onClose={this.handleShipmentModalClose.bind(this)}
            center
            modalId="article-popup"
            overlayId="logout-ovrly"
          >
            <div className="">
              <img
                src={CancelImg}
                alt="cancelImg"
                className="cancalImg"
                onClick={this.handleShipmentModalClose.bind(this)}
              />
              <div className="step-progress">
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
                      Article Mapping
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
                      Airway Bill No
                    </a>
                  </li>
                </ul>

                <div className="tab-content store-task-tab-cont orders-tab-cont">
                  <div
                    className={
                      this.state.createdShoppingTabs
                        ? "tab-pane fade"
                        : "tab-pane fade show active"
                    }
                    id="article-Map-tab"
                    role="tabpanel"
                    aria-labelledby="article-Map-tab"
                  >
                    <div className="tabs-content">
                      <form>
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
                            {TranslationContext !== undefined
                              ? TranslationContext.span
                                  .selectanyitemidyouwanttosendforshipment
                              : "Select any item id, you want to send for shipment."}
                          </span>
                          <Table
                            className="components-table-demo-nested antd-table-campaign antd-table-order custom-antd-table order-popover-table"
                            columns={[
                              {
                                title:
                                  TranslationContext !== undefined
                                    ? TranslationContext.title.itemid
                                    : "Article No",
                                dataIndex: "itemID",
                              },
                              {
                                title:
                                  TranslationContext !== undefined
                                    ? TranslationContext.title.itemname
                                    : "Article Name",
                                dataIndex: "itemName",
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
                                    ? TranslationContext.title.quantity
                                    : "Price Paid",
                                dataIndex: "quantity",
                              },
                            ]}
                            scroll={{ y: 240 }}
                            pagination={false}
                            rowSelection={SelectedRow}
                            dataSource={this.state.ShipmentOrderItem}
                          />
                        </div>
                        <div className="dv-status m-t-20">
                          <button
                            className="btn-shipment-popup"
                            style={{ marginRight: "10px" }}
                          >
                            Cancel
                          </button>
                          <button
                            style={{ marginRight: "0px" }}
                            className="btn-shipment-saveNext"
                            onClick={this.handleCreateShipmentAWB.bind(this)}
                          >
                            Save &amp; Next
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                  <div
                    className={
                      this.state.createdShoppingTabs
                        ? "tab-pane fade show active"
                        : "tab-pane fade"
                    }
                    id="airwayBill-tab"
                    role="tabpanel"
                    aria-labelledby="airwayBill-tab"
                  >
                    <div className="tabs-content">
                      <form>
                        <div className="text-center airwaybox">
                          <div className="airwaycontent">
                            <img
                              src={CardTick}
                              alt="CardTick"
                              className="cardtick"
                            />
                            <h2>AWB No - {this.state.AirwayBillAWBNo}</h2>
                            <p>
                              {TranslationContext !== undefined
                                ? TranslationContext.p.successfullymappedto
                                : "Successfully mapped to"}
                            </p>
                            <ul>
                              <li>
                                {TranslationContext !== undefined
                                  ? TranslationContext.li.invoiceno
                                  : "Invoice no."}
                                - {this.state.ShipmentOrderId}
                              </li>
                              <li>
                                {TranslationContext !== undefined
                                  ? TranslationContext.li.itemid
                                  : "Item ID"}
                                - {this.state.AirwayItemIds}
                              </li>
                            </ul>
                          </div>
                        </div>
                        <div className="dv-status m-t-20">
                          <button
                            className="btn-shipment-popup"
                            style={{ marginRight: "10px" }}
                          >
                            Cancel
                          </button>
                          <button
                            style={{ marginRight: "0px" }}
                            className="btn-shipment-saveNext"
                            onClick={this.handleShipmentModalClose.bind(this)}
                          >
                            Done
                          </button>
                        </div>
                      </form>
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
