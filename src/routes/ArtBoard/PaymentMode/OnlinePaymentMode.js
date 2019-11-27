import React, { Component } from "react";
import { Link } from "react-router-dom";
import { faCreditCard, faLaptop } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import visa from "./../../../assets/Images/visa.png";
import master from './../../../assets/Images/master.png'

class OnlinePaymentMode extends Component {
  render() {
      const {change}=this.props
    return (
    <div class="custom-artboard">
        <div className="checkout-cart cc-right">
          <label>Choose Payment Mode</label>
          <div className="payment-mode">
            <div className="credit-carddet">
              <h3>Saved Cards</h3>
              <div className="cards">
                <span>
                  <img src={visa} style={{ width: "" }} alt="Visa" />
                </span>
                <div className="carddet">
                  <h4>**** **** **** 9876</h4>
                  <p>Axis Bank</p>
                </div>
              </div>
              <div className="cards">
                <span>
                  <img src={master} style={{ width: "" }} alt="Master" />
                </span>
                <div className="carddet">
                  <h4>**** **** **** 3544</h4>
                  <p>HDFC Bank</p>
                </div>
              </div>
            </div>
            <div>
              <Link to="#!">
                <FontAwesomeIcon icon={faCreditCard} onClick={()=>change('CREDITDEBIT_MODE')} />
                Credit Card/Debit Card
              </Link>
            </div>
            <div>
              <Link to="#!">
                <FontAwesomeIcon icon={faLaptop} />
                Net Banking
              </Link>
            </div>
            <div>
              <Link to="#!">
                <FontAwesomeIcon icon={faLaptop} />
                Paypal
              </Link>
            </div>
            <div>
              <Link to="#!">
                <FontAwesomeIcon icon={faLaptop} />
                Bhim UPI
              </Link>
            </div>
          </div>
          <Link to="#!" className="backbtn" onClick={() => change("PAYMENT_MODE")}>
                  Back
                </Link>
        </div>
      </div>
    );
  }
}

export default OnlinePaymentMode;
