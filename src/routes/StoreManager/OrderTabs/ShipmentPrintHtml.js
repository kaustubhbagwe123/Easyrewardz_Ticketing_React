import React, { Component } from "react";
import { Table } from "antd";

class ShipmentPrintHtml extends Component {
  constructor(props) {
    super(props);

    this.state = {
      orderCustDetails: {},
      orderLabelDetails: {},
      orderLabelItemsDetails: [],
      orderTemplateDetails: {},
      orderTotalPrice: "",
    };
  }
  componentDidMount() {
    var OrderShipmentData = JSON.parse(
      window.localStorage.getItem("OrderShipment")
    );
    if (OrderShipmentData !== "" && OrderShipmentData !== null) {
      setTimeout(() => {
        this.setState({
          orderCustDetails: OrderShipmentData.orderCustDetails,
          orderLabelDetails: OrderShipmentData.orderLabelDetails,
          orderLabelItemsDetails: OrderShipmentData.orderLabelItemsDetails,
          orderTemplateDetails: OrderShipmentData.orderTemplateDetails,
          orderTotalPrice: OrderShipmentData.totalPrice,
        });
      }, 200);
    } else {
      this.setState({
        orderCustDetails: {},
        orderLabelDetails: {},
        orderLabelItemsDetails: [],
        orderTemplateDetails: {},
        orderTotalPrice: "",
      });
    }
    window.localStorage.removeItem("OrderShipment");
  }
  /// handle print label
  handlePrintLabel() {
   document.getElementById("printbtn").style.display="none"
    window.print();
  }
  render() {
    return (
      <div className="row ordWidth">
        <div className="col-md-2"></div>
        <div className="col-md-8">
          <div className="ordMainhtml">
            <div className="ord2tbl">
              <div className="ordRow">
                <label className="ordShipdt">
                  Date:
                  <p className="ordMl">
                    &nbsp;{this.state.orderCustDetails.orderCreatedOn}
                  </p>
                </label>
              </div>
              <div className="row ordMtb">
                <div className="col-md-6">
                  <label>Deliver To</label>
                </div>
                <div className="col-md-6 txtRight">
                  <label>Shipped By (If undelivered, return to)</label>
                </div>
              </div>
              <div className="row custStoreMt">
                <div className="col-md-6">
                  <label className="shipFsw">
                    {this.state.orderCustDetails.customerName}
                  </label>
                </div>
                <div className="col-md-6 txtRight">
                  <label className="shipFsw">
                    {this.state.orderCustDetails.storeName}
                  </label>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <label className="ordShipLabel">
                    {this.state.orderCustDetails.shippingAddress}
                  </label>
                  <label className="ordShipLabel">
                    {this.state.orderCustDetails.city}, &nbsp;
                    {this.state.orderCustDetails.state},&nbsp;
                    {this.state.orderCustDetails.pinCode},&nbsp;
                    {this.state.orderCustDetails.country}
                  </label>

                  <label className="ordShipLabel">
                    lat: <p>{this.state.orderCustDetails.latitude}</p>
                  </label>
                  <label className="ordShipLabel">
                    long: <p>{this.state.orderCustDetails.longitude}</p>
                  </label>
                  <label className="ordShipLabel">
                    Mobile No: <p>{this.state.orderCustDetails.mobileNumber}</p>
                  </label>
                </div>
                <div className="col-md-6 txtRight">
                  <label className="ordLeftMb ordShipLabel">
                    {this.state.orderCustDetails.address}
                  </label>
                  <label className="ordLeftMb ordShipLabel">
                    {this.state.orderCustDetails.cityName},&nbsp;
                    {this.state.orderCustDetails.stateName},&nbsp;
                    {this.state.orderCustDetails.pincodeID},&nbsp;
                    {this.state.orderCustDetails.countryName}
                  </label>

                  <label>
                    Mobile No: {this.state.orderCustDetails.storePhoneNo}
                  </label>
                </div>
              </div>
            </div>
            <div className="ord3tbl">
              <div className="row ordbrdLbl">
                <div className="col-md-3">
                  <label>
                    Order Id: <p>{this.state.orderLabelDetails.orderID}</p>
                  </label>
                </div>
                <div className="col-md-9">
                  <label className="requstId">
                    Request_Id: <p>{this.state.orderLabelDetails.requestID}</p>
                  </label>
                </div>
              </div>
            </div>
            <div className="ord3tbl" style={{ marginTop: "25px" }}>
              <label className="ordFw">PREPAID</label>
              <div className="row">
                <div className="col-md-6">
                  <label>
                    Shipment Weight:
                    <p>{this.state.orderTemplateDetails.weight}</p>
                  </label>
                </div>
                <div className="col-md-6">
                  <label className="requstId" style={{marginRight:"20px"}}>
                    Dimensions:
                    <p>{this.state.orderTemplateDetails.dimensions}</p>
                  </label>
                </div>
              </div>
            </div>
            <div className="ord4tbl">
              {/* <table className="table-bordered">
                <thead>
                  <tr>
                    <th>SKU</th>
                    <th style={{ width: "375px" }}>Item</th>
                    <th>QTY </th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.orderLabelItemsDetails !== null &&
                    this.state.orderLabelItemsDetails.map((item, i) => (
                      <tr key={i}>
                        <td>{item.sku}</td>
                        <td>{item.itemName}</td>
                        <td>{item.quantity}</td>
                        <td>{item.itemPrice}</td>
                      </tr>
                    ))}
                  <tr>
                    <td colSpan="2"></td>
                    <td align="right">Total </td>
                    <td align="center">{this.state.orderTotalPrice}</td>
                  </tr>
                </tbody>
              </table> */}
              <Table
                className="components-table-demo-nested antd-table-campaign antd-table-order custom-antd-table"
                columns={[
                  {
                    title: "SKU",
                    dataIndex: "sku",
                    key: "sku",
                  },
                  {
                    title: "Item",
                    dataIndex: "itemName",
                    key: "itemName",
                    width: 60,
                    render: (row, item) => {
                      return (
                        <p className="ordTxtwrap">
                          {item.itemName}
                        </p>
                      );
                    },
                  },
                  {
                    title: "QTY",
                    dataIndex: "quantity",
                    key: "quantity",
                    render: (row, item) => {
                      return (
                        <p className="ordTxtAlign">
                          {item.quantity}
                        </p>
                      );
                    },
                  },
                  {
                    title: "Price",
                    dataIndex: "itemPrice",
                    key: "itemPrice",
                    render: (row, item) => {
                      return (
                        <p className="ordTxtAlign">
                          {item.itemPrice}
                        </p>
                      );
                    },
                  },
                ]}
                rowKey="sku"
                pagination={false}
                dataSource={this.state.orderLabelItemsDetails}
              />
              <div className="ordTblDiv">
                <label className="ordTbltotal m-r-5 ord-mr-15">Total:</label>
                <label className="ordTbltotal ord-mr-60">
                  {this.state.orderTotalPrice}
                </label>
              </div>
            </div>
            
              <div className="btnTA">
                <button
                  className="btnPrintLbl"
                  id ="printbtn"
                  onClick={this.handlePrintLabel.bind(this)}
                >
                  Print Label
                </button>
              </div>
             
          </div>
        </div>
        <div className="col-md-2"></div>
      </div>
    );
  }
}

export default ShipmentPrintHtml;
