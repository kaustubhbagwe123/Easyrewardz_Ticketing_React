import React, { Component } from "react";
import { Link } from "react-router-dom";
class OffileneChequeMode extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       
    }
  }
  
  
  render() {
    const { change } = this.props;
    return (
    <div class="custom-artboard">
        <div className="checkout-cart cc-right">
          <label>Enter Cheque Details</label>
          <div className="payment-mode">
            <form>
              <div className="cheque-details">
                <div className="row">
                  <div className="col-12 col-sm-12">
                    <label>Cheque Number</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Cheque Number"
                    ></input>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12 col-sm-6">
                    <label>Cheque Amount</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Amount"
                    ></input>
                  </div>
                  <div className="col-12 col-sm-6">
                    <label>Cheque Date</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Cheque Date"
                    ></input>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12 col-sm-12">
                    <label>Cheque From Company Name</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Company Name"
                    ></input>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12 col-sm-12">
                    <label>Cheque Paid To Name</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Paid To Name"
                    ></input>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12 col-sm-12">
                    <Link to="Chequestatus">
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

export default OffileneChequeMode;
