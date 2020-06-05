import React, { Component } from "react";
import axios from "axios";
import { Table, Popover, Popconfirm, Select } from "antd";
import Modal from "react-responsive-modal";
import NoPayment from "./../../../assets/Images/no-payment.png";
import CreditCard from "./../../../assets/Images/credit-card.png";
import OrderInfo from "./../../../assets/Images/order-info.png";
import OrderShopingBlack from "./../../../assets/Images/order-shoping-black.png";
import OrderBag from "./../../../assets/Images/order-bag.png";
import OrderHamb from "./../../../assets/Images/order-hamb.png";
import CancelImg from "./../../../assets/Images/cancel.png";
import StepZilla from "react-stepzilla";
import CardTick from "./../../../assets/Images/card-tick.png";
import OrderDel from "./../../../assets/Images/order-del.png";
import { authHeader } from "../../../helpers/authHeader";
import config from "../../../helpers/config";

class ShipmentTab extends Component {
  constructor(props) {
    super(props);

    this.state = {
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
      filterShipmentStatus: false,
      orderPopoverOverlay: false,
      ShipmentMdlbtn: false,
    };
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

  render() {
    return (
      <>
        {this.state.orderPopoverOverlay && (
          <div className="order-popover-overlay"></div>
        )}
        <div className="table-cntr store">
          <Table
            className="components-table-demo-nested antd-table-campaign antd-table-order custom-antd-table"
            columns={[
              {
                title: "Invoice no.",
                render: (row, item) => {
                  return (
                    <div className="d-flex align-items-center">
                      <p>{item.InvoiceNo}</p>
                    </div>
                  );
                },
              },
              {
                title: "Customer",
                render: (row, item) => {
                  return (
                    <div>
                      <p>{item.CustomerName},</p>
                      <p className="order-small-font">{item.CustomerNumber}</p>
                    </div>
                  );
                },
              },
              {
                title: "Items",
                render: (row, item) => {
                  return (
                    <div className="d-flex align-items-center">
                      <p>{item.Items}</p>
                      <Popover
                        content={
                          <Table
                            className="components-table-demo-nested antd-table-campaign antd-table-order custom-antd-table"
                            columns={[
                              {
                                title: "Item ID",
                                dataIndex: "ItemID",
                              },
                              {
                                title: "Item Name",
                                dataIndex: "ItemName",
                                width: 150,
                              },
                              {
                                title: "Item Price",
                                dataIndex: "ItemPrice",
                              },
                              {
                                title: "Quantity",
                                dataIndex: "Quantity",
                              },
                              {
                                title: "AWB. No",
                                dataIndex: "AWBNo",
                              },
                            ]}
                            scroll={{ y: 240 }}
                            pagination={false}
                            dataSource={this.state.itemPopupDate}
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
                title: "Shipping address",
                render: (row, item) => {
                  return (
                    <p className="order-small-font">
                      {item.Address === "" ? "—NIL—" : item.Address}
                    </p>
                  );
                },
                width: 250,
                className: "white-space-init",
              },
              {
                title: "Delivery Type",
                dataIndex: "DeliveryTyper",
                width: 150,
              },
              {
                title: "Status",
                className: "camp-status-header camp-status-header-statusFilter",
                render: (row, item) => {
                  return (
                    <>
                      <p className="order-clr-blue">{item.Status}</p>
                      {item.selfPickUp && (
                        <p className="order-clr-orange">(Self Pickup)</p>
                      )}
                    </>
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
                            <span className="ch1-text">Shipment Assigned</span>
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
                            <span className="ch1-text">Assign Shipment</span>
                          </label>
                        </li>
                        <li>
                          <input
                            type="checkbox"
                            id="Inproress101"
                            className="ch1"
                            // onChange={this.handleCheckCampIndividualStatus.bind(
                            //   this
                            // )}
                            name="CampallStatus"
                            attrIds={101}
                          />
                          <label htmlFor="Inproress101">
                            <span className="ch1-text">Shipment Delivered</span>
                          </label>
                        </li>
                        <li>
                          <input
                            type="checkbox"
                            id="Inproress102"
                            className="ch1"
                            // onChange={this.handleCheckCampIndividualStatus.bind(
                            //   this
                            // )}
                            name="CampallStatus"
                            attrIds={101}
                          />
                          <label htmlFor="Inproress102">
                            <span className="ch1-text">Shipment Pickedup</span>
                          </label>
                        </li>
                      </ul>
                      <div className="dv-status">
                        <button className="btn-apply-status">Apply</button>
                        <button className="btn-cancel-status">Cancel</button>
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
                title: "Partner",
                dataIndex: "Partner",
                width: 150,
              },
              {
                title: "Action",
                render: (row, item) => {
                  return (
                    <div>
                      {item.Action === "Pickup Pending" ? (
                        <>
                          <Popover
                            overlayClassName="pickuppendingcustom"
                            content={
                              <div className="pickuppending-table">
                                <table>
                                  <tbody>
                                    <tr>
                                      <td>
                                        <label>Pickup Date:</label>
                                        <input
                                          type="text"
                                          className="form-control"
                                        />
                                      </td>
                                      <td>
                                        <label>Pickup Time:</label>
                                        <input
                                          type="text"
                                          className="form-control"
                                        />
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>
                                        <label>Pickup Done</label>
                                        <button
                                          type="button"
                                          className="popbtn"
                                        >
                                          Yes
                                        </button>
                                      </td>
                                      <td>
                                        <label style={{ visibility: "hidden" }}>
                                          Pickup Done
                                        </label>
                                        <button
                                          type="button"
                                          className="popbtnno"
                                        >
                                          No
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
                                item.Action === "Payment Done"
                                  ? "butn order-grid-butn order-grid-butn-green"
                                  : "butn order-grid-butn"
                              }
                            >
                              {item.Action}
                              <Popover content={<p>hi</p>}></Popover>
                            </button>
                          </Popover>
                        </>
                      ) : (
                        <button
                          className={
                            item.Action === "Payment Done"
                              ? "butn order-grid-butn order-grid-butn-green"
                              : "butn order-grid-butn"
                          }
                          type="button"
                          onClick={this.handleShipmentModalOpen.bind(this)}
                        >
                          {item.Action}
                        </button>
                      )}
                    </div>
                  );
                },
              },
            ]}
            pagination={{ defaultPageSize: 10, showSizeChanger: true }}
            showSizeChanger={true}
            onShowSizeChange={true}
            dataSource={this.state.ShipmentGridData}
          />
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
              <input
                type="checkbox"
                style={{ position: "absolute", top: "48px", left: "40px" }}
              />
              <input
                type="checkbox"
                style={{ position: "absolute", top: "48px", left: "211px" }}
              />
              <div className="step-progress">
                <StepZilla
                  steps={steps}
                  //startAtStep={3}
                  stepsNavigation={false}
                  backButtonText="Cancel"
                  nextButtonText="Save / Next"
                  onStepChange={this.handleChange}
                />
              </div>
            </div>
          </Modal>
        </div>
      </>
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

export default ShipmentTab;
