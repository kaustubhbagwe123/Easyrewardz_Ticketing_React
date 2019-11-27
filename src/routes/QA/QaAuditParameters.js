import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import Demo from "./../../store/Hashtag";
import { Tabs, Tab } from "react-bootstrap-tabs";
import MinusCircle from "./../../assets/Images/minuscircle.png";
import PlusCircle from "./../../assets/Images/pluscircle.png";
import QAAuditParaEmail from "./Tabs/QAAuditParaEmail";
import QAAuditParaSocial from "./Tabs/QAAuditParaSocial";
import QAAuditParaChat from "./Tabs/QAAuditParaChat";

class QaAuditParameters extends Component {
  constructor(props) {
    super(props);

    this.state = {
      AddParameters: true,
      values: [
        {
          parameterName: "",
          marks: ""
        }
      ]
    };
    this.handleChangeToggle = this.handleChangeToggle.bind(this);
  }

  handleAddClick() {
    const value = this.state.values;
    value.unshift({
      parameterName: "",
      marks: ""
    });
    this.setState(prevState => ({
      values: value
    }));
  }

  handleChange(i, e) {
    const { name, value } = e.target;
    let values = [...this.state.values];
    values[i] = { ...values[i], [name]: value };
    this.setState({ values });
  }
  handleRemoveParameter(i) {
    let values = [...this.state.values];
    values.splice(i, 1);
    this.setState({ values });
  }
  CreateParameter() {
    return this.state.values.map((el, i) => (
      <div key={i}>
        {i === this.state.values.length - 1 ? (
          <div className="row m-t-5">
            <div className="col-md-6">
              <label className="call-lbl">Sub Parameter {i + 1}</label>
              <input
                type="text"
                className="call-txt"
                name="parameterName"
                value={el.parameterName || ""}
                placeholder="Enter Parameter Name"
                onChange={this.handleChange.bind(this, i)}
              />
              <img
                src={MinusCircle}
                className="minuscircleCall"
                alt="Info"
              />
              <img
                src={PlusCircle}
                className="pluscircleCall"
                alt="Info"
                onClick={this.handleAddClick.bind(this)}
              />
            </div>
            <div className="col-md-5">
              <select
                className="form-control dropdown-QA"
                name="marks"
                defaultValue={el.marks || ""}
                onChange={this.handleChange.bind(this, i)}
              >
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </select>
              <div
                className="switch switch-primary d-inline m-r-5 switchBtn1"
                style={{ float: "left" }}
              >
                <input
                  type="checkbox"
                  id={"M1-" + i}
                />
                <label htmlFor={"M1-" + i} className="cr cr-float-auto"></label>
              </div>
              <div
                className="switch switch-primary d-inline m-r-5 switchBtn2"
                style={{ float: "left" }}
              >
                <input type="checkbox" id={"F1-" + i} />
                <label htmlFor={"F1-" + i} className="cr cr-float-auto"></label>
              </div>
            </div>
          </div>
        ) : (
          <div className="row m-t-5">
            <div className="col-md-6">
              <label className="call-lbl">Sub Parameter {i + 1}</label>
              <input
                type="text"
                className="call-txt"
                name="parameterName"
                value={el.parameterName || ""}
                placeholder="Enter Parameter Name"
                onChange={this.handleChange.bind(this, i)}
              />
              <img
                src={MinusCircle}
                className="minuscircleCall"
                alt="Info"
                onClick={this.handleRemoveParameter.bind(this, i)}
              />
              {/* <img
              src={PlusCircle}
              className="pluscircleCall"
              alt="Info"
              onClick={this.handleAddClick.bind(this)}
            /> */}
            </div>
            <div className="col-md-5">
              <select
                className="form-control dropdown-QA"
                name="marks"
                defaultValue={el.marks || ""}
                onChange={this.handleChange.bind(this, i)}
              >
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </select>
              <div
                className="switch switch-primary d-inline m-r-5 switchBtn1"
                style={{ float: "left" }}
              >
                <input type="checkbox" id={"M1-" + i} />
                <label htmlFor={"M1-" + i} className="cr cr-float-auto"></label>
              </div>
              <div
                className="switch switch-primary d-inline m-r-5 switchBtn2"
                style={{ float: "left" }}
              >
                <input type="checkbox" id={"F1-" + i} />
                <label htmlFor={"F1-" + i} className="cr cr-float-auto"></label>
              </div>
            </div>
          </div>
        )}
      </div>
    ));
  }
  handleChangeToggle() {
    this.setState({
      AddParameters: !this.state.AddParameters
    });
  }
  render() {
    return (
      <Fragment>
        <div className="container-fluid setting-title setting-breadcrumb">
          <Link to="settings" className="header-path">
            Settings
          </Link>
          <span>&gt;</span>
          <Link to={Demo.BLANK_LINK} className="header-path">
            QA
          </Link>
          <span>&gt;</span>
          <Link to={Demo.BLANK_LINK} className="active header-path">
            AuditParameters
          </Link>
        </div>

        <div className="Store-paddmodule QaAudit">
          <div className="module-tabs">
            <section>
              <Tabs>
                <Tab label="Call">
                  {this.state.AddParameters ? (
                    <div style={{ height: "75vh" }}>
                      <div className="callTab-padding">
                        <label className="call-tab-lbl">
                          No Audit parameters has been added till now.
                          <br />
                          Click below to add parameters
                        </label>
                        <div className="m-t-50">
                          <button
                            className="addBtn-callTab"
                            type="button"
                            onClick={this.handleChangeToggle}
                          >
                            <label className="addLable">ADD PARAMETERS</label>
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="tab-contentCall">
                        <label style={{ fontWeight: "500" }}>
                          Maximum Marks : 100
                        </label>

                        <div className="row">
                          <div className="col-md-6">
                            <div className="card m-t-10 QaAuditScr">
                              <div className="call-tab-div-P call-card-scrolling">
                                <div className="row">
                                  <div className="col-md-7">
                                    <label className="call-lbl">
                                      Parameter Name
                                    </label>
                                    <input
                                      type="text"
                                      className="call-txt"
                                      placeholder="Enter Parameter Name"
                                    />
                                  </div>
                                  <div className="col-md-5">
                                    <label className="call-totalMarks">
                                      Total Marks:
                                      <span className="call-spn">20</span>
                                    </label>
                                  </div>
                                </div>
                                <div className="row m-t-20">
                                  <div className="col-md-6">
                                    <label className="call-lbl">
                                      Add Sub Parameter
                                    </label>
                                  </div>
                                  <div className="col-md-6">
                                    <label className="call-lbl-1 m-r-30">
                                      Marks
                                    </label>
                                    <label className="call-lbl-1 m-r-30">
                                      Mandatory
                                    </label>
                                    <label className="call-lbl-1 m-r-30">
                                      Fatal
                                    </label>
                                  </div>
                                </div>
                                {this.CreateParameter()}
                                <button className="call-btn-save">
                                  <label className="addLable">SAVE</label>
                                </button>
                              </div>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="card m-t-10 call-card-scrolling">
                              <div className="call-twoCard">
                                <button
                                  className="butn-blue assign-btn"
                                  type="button"
                                >
                                  + Add More Parameters
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </Tab>
                <Tab label="Email">
                  <QAAuditParaEmail/>
                </Tab>
                <Tab label="Social">
                  <QAAuditParaSocial />
                </Tab>
                <Tab label="Chat">
                  <QAAuditParaChat />
                </Tab>
              </Tabs>
            </section>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default QaAuditParameters;
