import React, { Component } from "react";
import { Link } from "react-router-dom";
import { faCreditCard,faLaptop } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class OfflineMode extends Component {
  render() {
    const {change}=this.props;
    return (
    <div className="custom-artboard">
        <div className="checkout-cart cc-right">
          <label>Choose Offline Mode</label>
          <div className="payment-mode">
            <div>
              <Link to="#!">
                <FontAwesomeIcon
                  icon={faCreditCard}
                  onClick={()=>change('OFFLINECHEQUE_MODE')}
                />
                Cheque
              </Link>
            </div>
            <div>
              <Link to="#!">
                <FontAwesomeIcon
                  icon={faLaptop}
                  onClick={()=>change('OFFLINEPURCHASE_MODE')}
                />
                Purchase Order
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

export default OfflineMode;
