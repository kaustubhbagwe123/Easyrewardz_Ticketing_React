import React, { Component } from 'react'
import { Table } from 'react-bootstrap';

class TableDemo extends Component {
    render() {
        return (
            <div className="oderDetails-table">
                <Table responsive>
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
                </Table>
            </div>
        )
    }
}

export default TableDemo
