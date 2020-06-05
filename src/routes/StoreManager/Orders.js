import React, { Component, Fragment } from "react";
import { Table, Popover, Popconfirm, Select } from "antd";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import StepZilla from "react-stepzilla";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ReactTable from "react-table";
import OrderHamb from "./../../assets/Images/order-hamb.png";
import OrderSearch from "./../../assets/Images/order-search.png";
import OrderInfo from "./../../assets/Images/order-info.png";
import OrderShopingBlack from "./../../assets/Images/order-shoping-black.png";
import OrderBag from "./../../assets/Images/order-bag.png";
import CreditCard from "./../../assets/Images/credit-card.png";
import NoPayment from "./../../assets/Images/no-payment.png";
import CancelImg from "./../../assets/Images/cancel.png";
import CardTick from "./../../assets/Images/card-tick.png";
import Demo from "./../../store/Hashtag";
import axios from "axios";
import config from "../../helpers/config";
import { authHeader } from "../../helpers/authHeader";
import OrderDel from "../../assets/Images/order-del.png";
import { Collapse, CardBody, Card } from "reactstrap";
import ClaimStatus from "../../routes/ClaimStatus";
import DatePicker from "react-datepicker";
import moment from "moment";
import "./../../assets/css/orders.css";
import Pagination from "react-pagination-js";
import "react-pagination-js/dist/styles.css";
import Modal from "react-responsive-modal";
import OrderTab from "./OrderTabs/OrderTab";
import DeliveredTab from "./OrderTabs/DeliveredTab";
import ShoppingBagTab from "./OrderTabs/ShoppingBagTab";
import ShipmentTab from "./OrderTabs/ShipmentTab";
import ShipmentAssignedTab from "./OrderTabs/ShipmentAssignedTab";

class Orders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shoppingBagGridData: [
        {
          ShoppingBagNo: "12017768",
          Date: "25 April 2020",
          Time: "11:45 AM",
          CustomerName: "Sandeep",
          CustomerNumber: "+91 9717419325",
          Items: "6",
          Status: "New",
          Deliverytype: "Store Delivery",
          PickupDate: "",
          PickupTime: "",
          Address: "131  Vindya Commercial Complex, Plot No- Sec , Cbd Belapur",
        },
        {
          ShoppingBagNo: "12017890",
          Date: "24 May 2020",
          Time: "12:05 AM",
          CustomerName: "Rahul",
          CustomerNumber: "+91 9717419325",
          Items: "12",
          Status: "Cancelled",
          Deliverytype: "Self Picked Up",
          PickupDate: "12 May",
          PickupTime: "11:30 am",
          Address: "",
        },
      ],
      itemPopupDate: [
        {
          ItemID: "123456",
          ItemName: "Blue Casual shoes",
          ItemPrice: "1299",
          Quantity: "02",
          AWBNo: "44566778",
        },
        {
          ItemID: "123556",
          ItemName: "Black belt",
          ItemPrice: "1500",
          Quantity: "01",
          AWBNo: "44566778",
        },
        {
          ItemID: "123557",
          ItemName: "Sneakers",
          ItemPrice: "899",
          Quantity: "01",
          AWBNo: "44566778",
        },
        {
          ItemID: "123558",
          ItemName: "Brown Bag",
          ItemPrice: "699",
          Quantity: "01",
          AWBNo: "44566778",
        },
        {
          ItemID: "123456",
          ItemName: "Blue Casual shoes",
          ItemPrice: "1299",
          Quantity: "02",
          AWBNo: "44566778",
        },
        {
          ItemID: "123556",
          ItemName: "Black belt",
          ItemPrice: "1500",
          Quantity: "01",
          AWBNo: "44566778",
        },
        {
          ItemID: "123557",
          ItemName: "Sneakers",
          ItemPrice: "899",
          Quantity: "01",
          AWBNo: "44566778",
        },
        {
          ItemID: "123558",
          ItemName: "Brown Bag",
          ItemPrice: "699",
          Quantity: "01",
          AWBNo: "44566778",
        },
      ],
      orderPopoverOverlay: false,
      orderGridData: [
        {
          InvoiceNo: "12017768",
          InvoiceNoIcon: true,
          Date: "25 April 2020",
          Time: "11:45 AM",
          CustomerName: "Sandeep",
          CustomerNumber: "+91 9717419325",
          Items: "6",
          Amount: "Rs 9,294",
          Status: "Ready to Ship",
          Partner: "Blue Dart",
          selfPickUp: true,
          Address: "131  Vindya Commercial Complex, Plot No- Sec , Cbd Belapur",
          Action: "Payment Done",
        },
        {
          InvoiceNo: "12017890",
          InvoiceNoIcon: false,
          Date: "24 May 2020",
          Time: "12:05 AM",
          CustomerName: "Rahul",
          CustomerNumber: "+91 9717419325",
          Items: "12",
          Amount: "Rs 9,294",
          Status: "Order Sync Pending",
          selfPickUp: false,
          Partner: "Blue Dart",
          Address: "",
          Action: "Payment Pending",
        },
      ],
      ShipmentGridData: [
        {
          InvoiceNo: "12017768",
          InvoiceNoIcon: true,
          Date: "25 April 2020",
          Time: "11:45 AM",
          CustomerName: "Sandeep",
          CustomerNumber: "+91 9717419325",
          Items: "6",
          DeliveryTyper: "Store Delivery",
          Status: "Shipment Assigned",
          Partner: "Blue Dart",
          selfPickUp: true,
          Address: "131  Vindya Commercial Complex, Plot No- Sec , Cbd Belapur",
          Action: "Shipment Created",
        },
        {
          InvoiceNo: "12017890",
          InvoiceNoIcon: false,
          Date: "24 May 2020",
          Time: "12:05 AM",
          CustomerName: "Rahul",
          CustomerNumber: "+91 9717419325",
          Items: "12",
          DeliveryTyper: "Store Delivery",
          Status: "Assigned Shipment ",
          selfPickUp: false,
          Partner: "Blue Dart",
          Address: "",
          Action: "Create Shipment",
        },
        {
          InvoiceNo: "12017890",
          InvoiceNoIcon: false,
          Date: "24 May 2020",
          Time: "12:05 AM",
          CustomerName: "Rahul",
          CustomerNumber: "+91 9717419325",
          Items: "12",
          DeliveryTyper: "Store Delivery",
          Status: "",
          selfPickUp: false,
          Partner: "Blue Dart",
          Address: "",
          Action: "Pickup Pending",
        },
      ],

      // deliveredGridData: [
      //   {
      //     InvoiceNo: "12017768",
      //     CustomerName: "Sandeep",
      //     CustomerNumber: "+91 9717419325",
      //     Items: "6",
      //     Date: "25 April 2020",
      //     Time: "11:45 AM",
      //     Status: "Delivered",
      //   },
      //   {
      //     InvoiceNo: "12017768",
      //     CustomerName: "Naman",
      //     CustomerNumber: "+91 9717419325",
      //     Items: "6",
      //     Date: "25 April 2020",
      //     Time: "11:45 AM",
      //     Status: "RTO",
      //   },
      //   {
      //     InvoiceNo: "12017768",
      //     CustomerName: "Sandeep",
      //     CustomerNumber: "+91 9717419325",
      //     Items: "6",
      //     Date: "25 April 2020",
      //     Time: "11:45 AM",
      //     Status: "Self Picked",
      //   },
      // ],
      deliveredGridData: [],
      // shipmentAssignedGridData: [
      //   {
      //     AWSNo: "889667123",
      //     InvoiceNo: "981812345",
      //     CourierPartner: "Blue Dart",
      //     ReferenceNo: "BD12345",
      //   },
      //   {
      //     AWSNo: "889667123",
      //     InvoiceNo: "981812345",
      //     CourierPartner: "Blue Dart",
      //     ReferenceNo: "BD12345",
      //   },
      //   {
      //     AWSNo: "889667123",
      //     InvoiceNo: "981812345",
      //     CourierPartner: "Blue Dart",
      //     ReferenceNo: "",
      //   },
      //   {
      //     AWSNo: "NIL",
      //     InvoiceNo: "981812345",
      //     CourierPartner: "Store",
      //     ReferenceNo: "",
      //   },
      // ],
      filterOrderDeliveredStatus: false,
      filterOrderStatus: false,
      filterShipmentStatus: false,
      totalCount: 0,
      currentPage: 1,
      postsPerPage: 10,
      statusFilterData: [],
      strStatus: "",
      assignCurrentPage: 1,
      assignPostsPerPage: 10,
      shipmentAssignedGridData: [],
      ShipmentMdlbtn: false,
      filterShoppingStatus: false,
      filterShoppingDeliveryType: false,
    };
  }

  componentDidMount() {
    this.handleGetOrderDeliveredData();
    this.handleGetShipmentAssignedData();
  }

  handleGetOrderDeliveredData() {
    debugger;
    let self = this;
    var pageNumber = this.state.currentPage;
    axios({
      method: "post",
      url: config.apiUrl + "/HSOrder/GetOrderDeliveredDetails",
      headers: authHeader(),
      data: {
        SearchText: "",
        PageNo: pageNumber,
        PageSize: this.state.postsPerPage,
        FilterStatus: this.state.strStatus,
      },
    })
      .then(function(res) {
        debugger;
        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success") {
          self.setState({
            deliveredGridData: data.orderDelivereds,
            totalCount: data.totalCount,
          });
        } else {
          self.setState({
            deliveredGridData: [],
            totalCount: 0,
          });
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }

  PaginationOnChange = async (numPage) => {
    debugger;
    await this.setState({
      currentPage: numPage,
    });

    this.handleGetOrderDeliveredData();
  };

  handlePageItemchange = async (e) => {
    await this.setState({
      postsPerPage: e.target.value,
    });

    this.handleGetOrderDeliveredData();
  };

  handleGetOrderStatusFilterData(pageID) {
    debugger;
    let self = this;

    axios({
      method: "post",
      url: config.apiUrl + "/HSOrder/GetOrderStatusFilter",
      headers: authHeader(),
      params: {
        pageID: pageID,
      },
    })
      .then(function(res) {
        debugger;
        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success") {
          self.setState({
            statusFilterData: data,
          });
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }

  handleCheckDeliIndividualStatus() {
    debugger;
    var checkboxes = document.getElementsByName("DeliveredStatus");
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

  handleGetShipmentAssignedData() {
    debugger;
    let self = this;
    var pageNumber = this.state.assignCurrentPage;
    axios({
      method: "post",
      url: config.apiUrl + "/HSOrder/GetShipmentAssignedDetails",
      headers: authHeader(),
      data: {
        SearchText: "",
        PageNo: pageNumber,
        PageSize: this.state.assignPostsPerPage,
        FilterReferenceNo: "",
      },
    })
      .then(function(res) {
        debugger;
        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success") {
          self.setState({
            shipmentAssignedGridData: data.shipmentAssigned,
            totalCount: data.totalCount,
          });
        } else {
          self.setState({
            shipmentAssignedGridData: [],
            totalCount: 0,
          });
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }
  handleShipmentModalOpen() {
    this.setState({
      ShipmentMdlbtn: true,
    });
  }
  handleShipmentModalClose() {
    this.setState({
      ShipmentMdlbtn: false,
    });
  }

  changeOrderDropdown() {
    debugger;
    const orderDropdownValues = document.querySelectorAll(
      ".order-mobile-dropdown-menu .nav-link"
    );
    for (const value of orderDropdownValues) {
      value.classList.remove("active");
    }
  }

  AssignedPaginationOnChange = async (numPage) => {
    debugger;
    await this.setState({
      assignCurrentPage: numPage,
    });

    this.handleGetShipmentAssignedData();
  };

  handleAssignedPageItemchange = async (e) => {
    await this.setState({
      assignPostsPerPage: e.target.value,
    });

    this.handleGetShipmentAssignedData();
  };

  render() {
    const { Option } = Select;
    return (
      <Fragment>
        {this.state.orderPopoverOverlay && (
          <div className="order-popover-overlay"></div>
        )}
        <div className="store-task-tabs orders-tabs-outer">
          <Select
            defaultValue="shopping-bag"
            className="order-mobile-dropdown"
            // open={true}
            dropdownClassName="order-mobile-dropdown-menu"
            onSelect={this.changeOrderDropdown.bind(this)}
            onDropdownVisibleChange={(open) =>
              this.setState({ orderPopoverOverlay: open })
            }
          >
            <Option value="shopping-bag">
              <a
                className="nav-link active"
                data-toggle="tab"
                href="#shopping-bag-tab"
                role="tab"
                aria-controls="shopping-bag-tab"
                aria-selected="true"
              >
                Shopping Bag
              </a>
            </Option>
            <Option value="order">
              <a
                className="nav-link"
                data-toggle="tab"
                href="#order-tab"
                role="tab"
                aria-controls="order-tab"
                aria-selected="false"
              >
                Order
              </a>
            </Option>
            <Option value="shipment">
              <a
                className="nav-link"
                data-toggle="tab"
                href="#shipment-tab"
                role="tab"
                aria-controls="shipment-tab"
                aria-selected="false"
              >
                Shipment
              </a>
            </Option>
            <Option value="delivered">
              <a
                className="nav-link"
                data-toggle="tab"
                href="#delivered-tab"
                role="tab"
                aria-controls="delivered-tab"
                aria-selected="false"
              >
                Delivered
              </a>
            </Option>
            <Option value="shipment-assigned">
              <a
                className="nav-link"
                data-toggle="tab"
                href="#shipment-assigned-tab"
                role="tab"
                aria-controls="shipment-assigned-tab"
                aria-selected="false"
              >
                Shipment Assigned
              </a>
            </Option>
          </Select>
          <ul className="nav nav-tabs" role="tablist">
            <li className="nav-item">
              <a
                className="nav-link active"
                data-toggle="tab"
                href="#shopping-bag-tab"
                role="tab"
                aria-controls="shopping-bag-tab"
                aria-selected="true"
              >
                Shopping Bag
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                data-toggle="tab"
                href="#order-tab"
                role="tab"
                aria-controls="order-tab"
                aria-selected="false"
              >
                Order
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                data-toggle="tab"
                href="#shipment-tab"
                role="tab"
                aria-controls="shipment-tab"
                aria-selected="false"
              >
                Shipment
              </a>
            </li>
            <li
              className="nav-item"
              // onClick={this.handleGetOrderStatusFilterData.bind(this, 4)}
            >
              <a
                className="nav-link"
                data-toggle="tab"
                href="#delivered-tab"
                role="tab"
                aria-controls="delivered-tab"
                aria-selected="false"
              >
                Delivered
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                data-toggle="tab"
                href="#shipment-assigned-tab"
                role="tab"
                aria-controls="shipment-assigned-tab"
                aria-selected="false"
              >
                Shipment Assigned
              </a>
            </li>
          </ul>
          <div className="order-search">
            <input type="text" placeholder="Search..." />
            <img src={OrderSearch} alt="search icon" />
          </div>
        </div>
        <div className="tab-content store-task-tab-cont orders-tab-cont">
          <div
            className="tab-pane fade show active"
            id="shopping-bag-tab"
            role="tabpanel"
            aria-labelledby="shopping-bag-tab"
          >
            <ShoppingBagTab />
          </div>
          <div
            className="tab-pane fade"
            id="order-tab"
            role="tabpanel"
            aria-labelledby="order-tab"
          >
            <OrderTab />
          </div>
          <div
            className="tab-pane fade"
            id="shipment-tab"
            role="tabpanel"
            aria-labelledby="shipment-tab"
          >
            <ShipmentTab />
          </div>
          <div
            className="tab-pane fade"
            id="delivered-tab"
            role="tabpanel"
            aria-labelledby="delivered-tab"
          >
            <DeliveredTab />
          </div>
          <div
            className="tab-pane fade"
            id="shipment-assigned-tab"
            role="tabpanel"
            aria-labelledby="shipment-assigned-tab"
          >
            <ShipmentAssignedTab />
          </div>
        </div>
      </Fragment>
    );
  }
}

const steps = [
  { name: "Article Mapping", component: <Step1 /> },
  { name: "Airway Bill No", component: <Step2 /> },
];

function Step1(props) {
  return (
    <div>
      <div className="tabs-content">
        <form>
          <div className="article-body">
            <span>
              Item id shown below mapped to this Order <b>334335</b> only.
              <br />
              Select any item id, you want to send for shipment.
            </span>
            <Table
              className="components-table-demo-nested antd-table-campaign antd-table-order custom-antd-table order-popover-table"
              columns={[
                {
                  title: "Item ID",
                  dataIndex: "itemID",
                },
                {
                  title: "Item Name",
                  dataIndex: "itemName",
                  width: 150,
                },
                {
                  title: "Item Price",
                  dataIndex: "itemPrice",
                },
                {
                  title: "Quantity",
                  dataIndex: "quantity",
                },
              ]}
              scroll={{ y: 240 }}
              pagination={false}
              // dataSource={item.orderDeliveredItems}
            />
          </div>
        </form>
      </div>
    </div>
  );
}
function Step2(props) {
  return (
    <div>
      <div className="tabs-content">
        <form>
          <div className="text-center airwaybox">
            <div className="airwaycontent">
              <img src={CardTick} alt="CardTick" className="cardtick" />
              <h2>AWB No - 889676467</h2>
              <p>Successfully mapped to</p>
              <ul>
                <li>Invoice No - 909676467</li>
                <li>Item ID - 9096 7646 7990</li>
              </ul>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Orders;
