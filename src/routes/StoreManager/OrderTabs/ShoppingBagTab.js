import React, { Component } from "react";
import axios from "axios";
import { Table, Popover, Popconfirm } from "antd";
import OrderInfo from "./../../../assets/Images/order-info.png";
import OrderHamb from "./../../../assets/Images/order-hamb.png";
import OrderDel from "./../../../assets/Images/order-del.png";
import { authHeader } from "../../../helpers/authHeader";
import config from "../../../helpers/config";
import Pagination from "react-pagination-js";
import "react-pagination-js/dist/styles.css";
import * as translationHI from '../../../translations/hindi'
import * as translationMA from '../../../translations/marathi'

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
      translateLanguage: {}
    };
  }

  componentDidMount() {
    this.handleGetShoppingBagGridData();
    this.handleGetShoppingBagStatusFilterData();

    if(window.localStorage.getItem("translateLanguage") === "hindi"){
      this.state.translateLanguage = translationHI
     }
     else if(window.localStorage.getItem("translateLanguage") === 'marathi'){
       this.state.translateLanguage = translationMA
     }
     else{
       this.state.translateLanguage = {}
     }

  }

  ////   -------------------API Function start-------------------------------
  /// handle Get Order Tab Grid Data
  handleGetShoppingBagGridData(filter) {
    debugger;
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/HSOrder/GetShoppingBagDetails",
      headers: authHeader(),
      data: {
        SearchText: "",
        PageNo: this.state.currentPage,
        PageSize: this.state.postsPerPage,
        FilterStatus: this.state.strStatus,
        FilterDelivery: "",
      },
    })
      .then(function(res) {
        debugger;
        let status = res.data.message;
        let data = res.data.responseData;
        if (filter === "filter") {
          if (status === "Success") {
            self.setState({
              shoppingBagGridData: data.shoppingBagList,
              totalCount: data.totalShoppingBag,
              filterOrderStatus: false,
            });
          } else {
            self.setState({
              shoppingBagGridData: [],
              totalCount: 0,
              filterOrderStatus: false,
            });
          }
        } else {
          if (status === "Success") {
            self.setState({
              shoppingBagGridData: data.shoppingBagList,
              totalCount: data.totalCount,
            });
          } else {
            self.setState({
              shoppingBagGridData: [],
              totalCount: 0,
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

  ///-------------------API function end--------------------------------

  ///handle pagination onchage
  PaginationOnChange = async (numPage) => {
    debugger;
    await this.setState({
      currentPage: numPage,
    });

    this.handleGetShoppingBagGridData();
  };
  /// handle per page item change
  handlePageItemchange = async (e) => {
    await this.setState({
      postsPerPage: e.target.value,
    });

    this.handleGetShoppingBagGridData();
  };
  /// handle check individual status
  handleCheckDeliIndividualStatus() {
    debugger;
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

  render() {
    const TranslationContext = this.state.translateLanguage.default;
    return (
      <>
        {this.state.orderPopoverOverlay && (
          <div className="order-popover-overlay"></div>
        )}
        <div className="table-cntr store dv-table-paging">
          <Table
            className="components-table-demo-nested antd-table-campaign antd-table-order custom-antd-table"
            columns={[
              {
                title: TranslationContext!==undefined?TranslationContext.title.shoppingbagno:"Shopping Bag No.",
                dataIndex: "shoppingBagNo",
              },
              {
                title:  TranslationContext!==undefined?TranslationContext.title.date:"Date",
                render: (row, item) => {
                  return (
                    <div>
                      <p>{item.date}</p>
                      <p className="order-small-font">{item.time}</p>
                    </div>
                  );
                },
              },
              {
                title: TranslationContext!==undefined?TranslationContext.title.customer:"Customer",
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
                title: TranslationContext!==undefined?TranslationContext.title.items:"Items",
                render: (row, item) => {
                  return (
                    <div className="d-flex align-items-center">
                      <p>{item.shoppingBagItemList.length}</p>
                      <Popover
                        content={
                          <Table
                            className="components-table-demo-nested antd-table-campaign antd-table-order custom-antd-table"
                            columns={[
                              {
                                title:  TranslationContext!==undefined?TranslationContext.title.itemid:"Item ID",
                                dataIndex: "itemID",
                              },
                              {
                                title: TranslationContext!==undefined?TranslationContext.title.itemname:"Item Name",
                                dataIndex: "itemName",
                                width: 150,
                              },
                              {
                                title: TranslationContext!==undefined?TranslationContext.title.itemprice:"Item Price",
                                dataIndex: "itemPrice",
                              },
                              {
                                title: TranslationContext!==undefined?TranslationContext.title.quantity:"Quantity",
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
                        overlayClassName="order-popover-table order-popover"
                        onVisibleChange={(visible) =>
                          this.setState({ orderPopoverOverlay: visible })
                        }
                      >
                        <img src={OrderHamb} className="order-hamb" />
                      </Popover>
                    </div>
                  );
                },
              },
              {
                title: TranslationContext!==undefined?TranslationContext.title.status:"Status",
                className:
                  "camp-status-header camp-status-header-statusFilter order-status-header",
                render: (row, item) => {
                  return (
                    <div className="d-flex align-items-center">
                      <p
                        className={
                          item.statusName === "Cancelled" ? "order-clr-pink" : ""
                        }
                      >
                        {item.statusName}
                      </p>
                      {item.statusName === "Cancelled" ? (
                        <Popover
                          content={
                            <div className="order-tab-popover">
                              <div className="d-flex align-items-center justify-content-between">
                                <p>{item.canceledOn}</p>
                                <p>{item.userName}</p>
                              </div>
                              <p className="shopping-popover-cancel-info">
                               {item.canceledComment}
                              </p>
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
                        ""
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
                                onChange={this.handleCheckDeliIndividualStatus.bind(
                                  this
                                )}
                                // checked={this.state.CheckBoxAllStatus}
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
                          onClick={this.handleGetShoppingBagGridData.bind(
                            this,
                            "filter"
                          )}
                        >
                          {TranslationContext!==undefined?TranslationContext.button.apply:"Apply"}
                          
                        </button>
                        <button className="btn-cancel-status">
                        {TranslationContext!==undefined?TranslationContext.button.cancel:"Cancel"}
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
                title: "Delivery type",
                className:
                  "camp-status-header camp-status-header-statusFilter order-status-header shopping-delivery-header",
                render: (row, item) => {
                  return (
                    <p
                      className={
                        item.deliveryTypeName === "Store Delivery"
                          ? "order-clr-green"
                          : "order-clr-blue"
                      }
                    >
                      {item.deliveryTypeName}
                    </p>
                  );
                },
                filterDropdown: (data, row) => {
                  return (
                    <div className="campaign-status-drpdwn">
                      <ul>
                        <li>
                          <input
                            type="checkbox"
                            id="Campall-status"
                            className="ch1"
                            // onChange={this.handleCheckCampAllStatus.bind(this)}
                            // checked={this.state.CheckBoxAllStatus}
                            name="CampallStatus"
                          />
                          <label htmlFor="Campall-status">
                            <span className="ch1-text">
                            {TranslationContext!==undefined?TranslationContext.span.storedelivery:"Store Delivery"}
                            </span>
                          </label>
                        </li>
                        <li>
                          <input
                            type="checkbox"
                            id="New100"
                            className="ch1"
                            // onChange={this.handleCheckCampIndividualStatus.bind(
                            //   this
                            // )}
                            name="CampallStatus"
                            attrIds={100}
                          />
                          <label htmlFor="New100">
                            <span className="ch1-text">
                            {TranslationContext!==undefined?TranslationContext.span.selfpickedup:"Self Picked Up"}
                            </span>
                          </label>
                        </li>
                      </ul>
                      <div className="dv-status">
                        <button className="btn-apply-status">
                        {TranslationContext!==undefined?TranslationContext.button.apply:"Apply"}
                        </button>
                        <button className="btn-cancel-status">
                        {TranslationContext!==undefined?TranslationContext.button.cancel:"Cancel"}
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
                title:  TranslationContext!==undefined?TranslationContext.title.pickupdateandtime:"Pickup Date & Time",
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
                className: "pick-up-date",
              },
              {
                title:TranslationContext!==undefined?TranslationContext.title.pickupdateandtime:"Address",
                render: (row, item) => {
                  return (
                    <p className="order-small-font">
                      {item.address === "" ? "-NIL-" : item.address}
                    </p>
                  );
                },
                className: "white-space-init",
              },
              {
                title: TranslationContext!==undefined?TranslationContext.title.actions:"Action",
                render: (row, item) => {
                  return (
                    <div className="d-flex">
                      <Popconfirm
                        title={
                          <>
                            <div className="popover-input-cntr">
                              <div>
                                <p>
                                {TranslationContext!==undefined?TranslationContext.p.orderid:"Order Id"}
                                </p>
                                <input
                                  type="text"
                                  placeholder="Enter Order Id"
                                />
                              </div>
                              <div>
                                <p>
                                {TranslationContext!==undefined?TranslationContext.p.amount:"Amount"}
                                </p>
                                <input type="text" placeholder={TranslationContext!==undefined?TranslationContext.placeholder.amount:"Enter Amount"} />
                              </div>
                            </div>
                          </>
                        }
                        overlayClassName="order-popover order-popover-butns"
                        placement="bottomRight"
                        onVisibleChange={(visible) =>
                          this.setState({ orderPopoverOverlay: visible })
                        }
                        icon={false}
                        okText="Done"
                      >
                        <button className="butn order-grid-butn">
                        {TranslationContext!==undefined?TranslationContext.button.convertoorder:"Convert to Order"}
                          
                        </button>
                      </Popconfirm>
                      <Popconfirm
                        title={
                          <>
                            <div className="popover-input-cntr">
                              <div>
                                <p>
                                {TranslationContext!==undefined?TranslationContext.p.comment:"Comment"}
                                </p>
                                <textarea placeholder="Enter Comment"></textarea>
                              </div>
                            </div>
                          </>
                        }
                        overlayClassName="order-popover order-popover-butns shopping-popover-delete"
                        placement="bottomRight"
                        onVisibleChange={(visible) =>
                          this.setState({ orderPopoverOverlay: visible })
                        }
                        icon={false}
                        okText="Remove"
                      >
                        <button className="butn order-grid-butn order-del-butn">
                          <img src={OrderDel} alt="delete icon" />
                        </button>
                      </Popconfirm>
                    </div>
                  );
                },
              },
            ]}
            pagination={false}
            showSizeChanger={false}
            onShowSizeChange={false}
            dataSource={this.state.shoppingBagGridData}
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
              {TranslationContext!==undefined?TranslationContext.p.itemsperpage:"Items per page"}
              </p>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default ShoppingBagTab;
