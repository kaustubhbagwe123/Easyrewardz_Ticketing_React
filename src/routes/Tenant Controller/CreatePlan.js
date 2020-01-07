import React, { Component } from "react";

class CreatePlan extends Component {
  render() {
    return (
      <div>
        <div className="container-fluid">
          <div className="createPlan">
            <div className="row">
              <div className="col-md-12">
                <div className="profilemain">
                  <div className="CenterPlan">
                    <div className="row m-b-20">
                      <div className="col-md-12">
                        <label className="createplantext">Create Plan</label>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-12">
                        <label className="PlanName">Plan Name</label>
                        <input
                          type="text"
                          className="txt-1"
                          placeholder="Enterprise"
                          maxLength="25"
                        />
                      </div>
                    </div>
                    <div className="row m-t-10">
                      <div className="col-md-12">
                        <label className="PlanName">Plan Price(Monthly)</label>
                        <div className="input-group">
                            <span class="input-group-addon">₹</span>	
                            <input type="text" class="form-control" placeholder="11999" />
                        </div>
                        {/* <span>₹</span>
                        <input
                          type="text"
                          className="txt-1"
                          placeholder="11999"
                        /> */}
                      </div>
                    </div>

                    <div className="row m-t-10">
                      <div className="col-md-12">
                        <label className="PlanName">Plan Price(Yearly)</label>
                        <div className="input-group">
                            <span class="input-group-addon">₹</span>	
                            <input type="text" class="form-control" placeholder="9999" />
                        </div>
                        {/* <span>₹</span>
                        <input
                          type="text"
                          className="txt-1"
                          placeholder="9999"
                        /> */}
                      </div>
                    </div>

                    <div className="row m-t-10">
                      <div className="col-md-12">
                        <label className="PlanName">Total Users</label>
                        <select className="">
                          <option>1</option>
                          <option>2</option>
                        </select>
                      </div>
                    </div>

                    <div className="row m-t-10">
                      <div className="col-md-12">
                        <label className="PlanName">Plan Status</label>
                        <div className="PlanStatus">
                          <input type="radio" name="logout-status" id="pub" />
                          <label
                            htmlFor="pub"
                            className="logout-label"
                            style={{ marginRight: "25px" }}
                          >
                            Publish
                          </label>

                          <input type="radio" name="logout-status" id="unpub" />
                          <label htmlFor="unpub" className="logout-label">
                            UnPublish
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="row m-t-20">
                      <div className="col-md-12 checkbox-plan">
                        <input
                          type="checkbox"
                          id="popularplan"
                          name="filter-type"
                          style={{ display: "none" }}
                        />
                        <label
                          htmlFor="popularplan"
                          style={{ paddingLeft: "25px" }}
                        >
                          <span className="PlanName">
                            Make it Most Popular plan
                          </span>
                        </label>
                      </div>
                    </div>
                    <div className="row m-t-40">
                        <div className="col-md-6">
                            <div className="cancel">
                            <button>Cancel</button>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="save">
                            <button>Save</button>
                            </div>
                        </div>
                    </div>
                    
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CreatePlan;
