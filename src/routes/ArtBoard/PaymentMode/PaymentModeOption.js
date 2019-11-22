import React, { Component } from "react";
import { Link } from "react-router-dom";
import { faCreditCard, faLaptop } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


class PaymentModeOption extends Component {
  render() {
    const { change } = this.props;
    return (
      <div>
        <div className="checkout-cart cc-right">
          <label>Choose Payment Mode</label>
          <div className="payment-mode">
            <div>
              <Link to="#!">
                <FontAwesomeIcon
                  icon={faCreditCard}
                  onClick={() => change("CREDITDEBIT_MODE")}
                />
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
          <Link
            to="#!"
            className="backbtn"
            onClick={() => change("PAYMENT_MODE")}
          >
            Back
          </Link>
        </div>
      </div>
    );
  }
}

export default PaymentModeOption;
