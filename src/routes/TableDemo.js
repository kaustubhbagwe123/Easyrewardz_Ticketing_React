import React, { Component } from "react";
import ReactTable from "react-table";
// import { Table } from 'react-bootstrap';

class TableDemo extends Component {
  render() {
    const dataorder = [
      {
        statusNew: (
          <span className="table-b table-blue-btn">
            <label>Open</label>
          </span>
        )
      },
      {
        statusNew: (
          <span className="table-b table-yellow-btn">
            <label>New</label>
          </span>
        )
      },
      {
        statusNew: (
          <span className="table-b table-green-btn">
            <label>Solved</label>
          </span>
        )
      },
      {
        statusNew: (
          <span className="table-b table-blue-btn">
            <label>Open</label>
          </span>
        )
      },
      {
        statusNew: (
          <span className="table-b table-blue-btn">
            <label>Open</label>
          </span>
        )
      }
    ];

    const columnsorder = [
      {
        Header: <span>Invoice Number</span>,
        accessor: "InvoiceNumber",
        Cell: props => (
          <span>
            <label>BB33476</label>
          </span>
        )
      },
      {
        Header: <span>Invoice Date</span>,
        accessor: "InvoiceDate",
        Cell: props => <label>02</label>
      },
      {
        Header: <span>Item Count</span>,
        accessor: "ItemCount",
        Cell: props => (
          <span>
            <label>2999</label>
          </span>
        )
      },
      {
        Header: <span>Item Price</span>,
        accessor: "Item Price",
        Cell: props => (
          <span>
            <label>@2999</label>
          </span>
        )
      },
      {
        Header: <span>Price Paid</span>,
        accessor: "PricePaid",
        Cell: props => (
          <span>
            <label>SB221</label>
          </span>
        )
      },
      {
        Header: <span>Store Code</span>,
        accessor: "StoreCode",
        Cell: props => (
          <span>
            <label>SB221</label>
          </span>
        )
      },
      {
        Header: <span>Store Address</span>,
        accessor: "StoreAddres",
        Cell: props => (
          <span>
            <label>Paper Bag</label>
          </span>
        )
      },
      {
        Header: <span>Product Name</span>,
        accessor: "ProductName",
        Cell: props => (
          <span>
            <label>01</label>
          </span>
        )
      },
      {
        Header: <span>Number Of Item</span>,
        accessor: "Number Of Item",
        Cell: props => (
          <span>
            <label>13 May 2049</label>
          </span>
        )
      }
    ];

    return (
      <div className="oderDetails-table">
        <ReactTable
          data={dataorder}
          columns={columnsorder}
          // resizable={false}
          defaultPageSize={5}
          showPagination={false}
        />
        {/* <Table responsive>
                    <thead>
                        <tr>
                            <th>Invoice Number</th>
                            <th>Invoice Date</th>
                            <th>Item Count</th>
                            <th>Item Price</th>
                            <th>Price Paid</th>
                            <th>Store Code</th>
                            <th>Store Address</th>
                            <th>Product Name</th>
                            <th>No of Item</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>BB33476</td>
                            <td>12 Jan 2019</td>
                            <td>02</td>
                            <td>2999</td>
                            <td>@2999</td>
                            <td>SB221</td>
                            <td>SB221</td>
                            <td>Paper Bag</td>
                            <td>01</td>
                        </tr>
                        <tr>
                            <td>BB33476</td>
                            <td>12 Jan 2019</td>
                            <td>02</td>
                            <td>2999</td>
                            <td>@2999</td>
                            <td>SB221</td>
                            <td>SB221</td>
                            <td>Paper Bag</td>
                            <td>02</td>
                        </tr>
                        <tr>
                            <td>BB33476</td>
                            <td>12 Jan 2019</td>
                            <td>02</td>
                            <td>2999</td>
                            <td>@2999</td>
                            <td>SB221</td>
                            <td>SB221</td>
                            <td>Paper Bag</td>
                            <td>03</td>
                        </tr>
                    </tbody>
                </Table> */}
      </div>
    );
  }
}

export default TableDemo;
