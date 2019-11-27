import React, { Component } from "react";
import { Link } from "react-router-dom";
import { faCreditCard, faLaptop } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class PaymentMode extends Component {
  render() {
    const {change}=this.props;
    return (
    <div class="custom-artboard">
        <div className="checkout-cart cc-right">
          <label>Choose Payment Mode</label>
          <div className="payment-mode">
            <div>
              <Link to="#!">
                <FontAwesomeIcon
                  icon={faCreditCard}
                    onClick={()=>change('OFFLINE_MODE')}
                />
                Offline Mode
              </Link>
            </div>
            <div>
              <Link to="#!">
                <FontAwesomeIcon
                  icon={faLaptop}
                    onClick={()=>change('ONLINEPAYMENT_MODE')}
                />
                Online Mode
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PaymentMode;
