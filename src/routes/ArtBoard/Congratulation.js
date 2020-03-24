import React, { Component } from "react";
import congratulationimg from "../../assets/Images/congratulation-final.jpg";

class Congratulation extends Component {
  render() {
    return (
      <div className="custom-artboard">
        <div className="congratulation-box">
          <img
            src={congratulationimg}
            style={{ width: "" }}
            alt="Congratulation"
          />
          <h2>Congratulation!</h2>
          <p>Your Onboarding is complete. Happy to see you Onboard!</p>
        </div>
      </div>
    );
  }
}

export default Congratulation;
