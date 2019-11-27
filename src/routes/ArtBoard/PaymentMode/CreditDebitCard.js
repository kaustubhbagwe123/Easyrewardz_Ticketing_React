import React, { Component } from "react";
import { Link } from "react-router-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faUnlockalt } from "@fortawesome/free-solid-svg-icons";
import visa from "../../../assets/Images/visa.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
<<<<<<< HEAD
import { faUnlockAlt, faInfo, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
=======
import { faUnlockAlt, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
>>>>>>> 87cf9956995434be31979d6f420b9f3ed566a17d

class CreditDebitCard extends Component {
  render() {
    const { change } = this.props;
    return (
    <div class="custom-artboard">
        <div className="checkout-cart cc-right">
          <label>Enter Card Details</label>
          <div className="">
            <form>
              <div className="cheque-details">
                <div className="row">
                  <div className="col-12 col-sm-12">
                    <label>Cardholder Name</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Cardholder Name"
                    ></input>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12 col-sm-12">
                    <label>Card Number</label>
                    <div className="input-group cardnumber" style={{background: "#fff"}}>
                        <input
                        type="password"
                        className="form-control"
                        placeholder="Enter"
                        ></input>
                        <span className="input-group-addon">
                        <img src={visa} style={{ width: "" }} alt="Visa" />
                        </span>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12 col-sm-6">
                    <label>Expiry Date</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Card Number"
                    ></input>
                  </div>
                  <div className="col-12 col-sm-6">
                    <label>CVV <FontAwesomeIcon icon={faInfoCircle} className="" /></label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Cheque Date"
                    ></input>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12">
                  <h5 className="rememberme">
                    <input type="checkbox"></input> Save my card for future
                    payments
                  </h5>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12 col-sm-12">                    
                    <Link to="Congratulation">
                    <button
                      type="submit"
                      className="btn-primary"
                      style={{
                        width: "100%",
                        marginTop: "10px"
                      }}
                      
                    >
                      <FontAwesomeIcon icon={faUnlockAlt} className="" style={{color: "#fff" , marginRight: "3px"}} /> Pay
                      Securely
                    </button></Link>
                  </div>
                </div>
                <Link
                  to="#!"
                  className="backbtn"
                  onClick={() => change("PAYMENTMODE_OPTION")}
                >
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

export default CreditDebitCard;
