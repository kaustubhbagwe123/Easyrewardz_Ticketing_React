import React, { Component } from "react";
import StepZilla from "react-stepzilla";
import congratulation from "../../assets/Images/cong-img.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUnlockAlt,
  faInfo,
  faInfoCircle
} from "@fortawesome/free-solid-svg-icons";

class Chequestatus extends Component {
  render() {
    return (
      <div class="custom-artboard congrats-steps" style={{ padding: "50px 0" }}>
        <div className="congrats-box" style={{ margin: "0 16% 0" }}>
          <div className="row">
            <div className="col-12 col-sm-6">
              <img
                src={congratulation}
                style={{ width: "" }}
                alt="Congratulation"
              />
              <h2>Congratulation!</h2>
              <p>
                Users are more toleant of minor usability issues when they find
                an interface visually appealing. Users are more toleant of minor
                usability issues.
              </p>
            </div>
            <div className="col-12 col-sm-6">
              <h4>Current Status</h4>
              <div className="">
                <div className="step-progress">
                  <StepZilla
                    steps={steps}
                    //startAtStep={4}
                    stepsNavigation={false}
                    backButtonText="Back"
                    nextButtonText="Save / Next"
                    onStepChange={this.handleChange}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const steps = [
  { name: "Cheque Details Received", component: <Step1 /> },
  { name: "Cheque Collected", component: <Step2 /> },
  { name: "Cheque Submitted to Bank", component: <Step3 /> },
  { name: "Payment Received", component: <Step4 /> },
  { name: "Login Details Shared on Email", component: <Step5 /> }
];


function Step1(props) {
  return (
    <div>
    </div>
  );
}

function Step2(props) {
  return (
    <div></div>
  );
}

function Step3(props) {
  return (
    <div></div>
  );
}

function Step4(props) {
  return (
    <div></div>
  );
}

function Step5(props) {
  return (
    <div></div>
  );
}







export default Chequestatus;
