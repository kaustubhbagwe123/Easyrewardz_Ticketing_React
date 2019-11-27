import React, { Component } from "react";
import StepZilla from "react-stepzilla";
import congratulationimg from "../../assets/Images/congratulation-final.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUnlockAlt,
  faInfo,
  faInfoCircle
} from "@fortawesome/free-solid-svg-icons";

class Congratulation extends Component {
  render() {
    return (
      <div class="custom-artboard">
            <div className="congratulation-box">
                <img
                src={congratulationimg}
                style={{ width: "" }}
                alt="Congratulation"
              />
              <h2>Congratulation!</h2>
              <p>
                Your Onboarding is complete. Happy to see you Onboard!
              </p>
            </div>
      </div>
    );
  }
}





export default Congratulation;
