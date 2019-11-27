import React, { Component } from "react";
import {Link} from 'react-router-dom'

class OffilinePurchase extends Component {
  render() {
    const {change}=this.props;
    return (
    <div class="custom-artboard">
        <div className="checkout-cart cc-right">
          <label>Enter Purchase Order Details</label>
          <div className="payment-mode">
            <form>
              <div className="cheque-details">
                <div className="row">
                  <div className="col-12 col-sm-12">
                    <label>Order Number</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Order Number"
                    ></input>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12 col-sm-6">
                    <label>Order Amount</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Order"
                    ></input>
                  </div>
                  <div className="col-12 col-sm-6">
                    <label>Order Date</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Order Date"
                    ></input>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12 col-sm-12">
                    <label>Order Issued By</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Order Issued By"
                    ></input>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12 col-sm-12">
                    <label>Order Raised to</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Order Raised to"
                    ></input>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12 col-sm-12">
                    <Link to="POstatus">
                    <button
                      type="submit"
                      className="btn-primary"
                      style={{
                        width: "100%",
                        marginTop: "10px"
                      }}
                      
                    >
                      Submit
                    </button></Link>
                  </div>
                </div>
                <Link to="#!" className="backbtn" onClick={() => change("OFFLINE_MODE")}>
                  Back
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default OffilinePurchase;
