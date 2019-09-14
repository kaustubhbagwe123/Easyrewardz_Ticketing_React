import React, { Component } from "react";
import "jquery";
import "popper.js/dist/popper";
import "bootstrap";

class Settings extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="container-fluid setting-title">
          <p className="font-weight-bold">Settings</p>
        </div>
        <div className="container-fluid">
          <div className="setting-tabs">
            <ul class="nav nav-tabs" role="tablist">
              <li class="nav-item">
                <a
                  class="nav-link active"
                  data-toggle="tab"
                  href="#ticketing-tab"
                  role="tab"
                  aria-controls="ticketing-tab"
                  aria-selected="true"
                >
                  Ticketing
                </a>
              </li>
              <li class="nav-item">
                <a
                  class="nav-link"
                  data-toggle="tab"
                  href="#store-tab"
                  role="tab"
                  aria-controls="store-tab"
                  aria-selected="false"
                >
                  Store
                </a>
              </li>
              <li class="nav-item">
                <a
                  class="nav-link"
                  data-toggle="tab"
                  href="#qa-tab"
                  role="tab"
                  aria-controls="qa-tab"
                  aria-selected="false"
                >
                  QA
                </a>
              </li>
            </ul>
            <div class="tab-content">
              <div
                class="tab-pane fade show active"
                id="ticketing-tab"
                role="tabpanel"
                aria-labelledby="ticketing-tab"
              >
                <div className="row">
                  <div className="col-md-3">
                    <div className="setting-cntr">
                      <div className="setting-box">
                        <div
                          style={{
                            backgroundColor: "red",
                            width: 25,
                            height: 25,
                            flex: "0 0 25px"
                          }}
                        ></div>
                        <div className="setting-desc">
                          <strong>Hierarchy</strong>
                          <p>
                            A system in which members of an organization or
                            society are ranked according to relative status or
                            authority.
                          </p>
                        </div>
                      </div>
                      <div className="setting-box">
                        <div
                          style={{
                            backgroundColor: "red",
                            width: 25,
                            height: 25,
                            flex: "0 0 25px"
                          }}
                        ></div>
                        <div className="setting-desc">
                          <strong>Brand</strong>
                          <p>
                            A system in which members of an organization or
                            society are ranked according to relative status or
                            authority.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="setting-cntr">
                      <div className="setting-box">
                        <div
                          style={{
                            backgroundColor: "red",
                            width: 25,
                            height: 25,
                            flex: "0 0 25px"
                          }}
                        ></div>
                        <div className="setting-desc">
                          <strong>Store</strong>
                          <p>
                            A system in which members of an organization or
                            society are ranked according to relative status or
                            authority.
                          </p>
                        </div>
                      </div>
                      <div className="setting-box">
                        <div
                          style={{
                            backgroundColor: "red",
                            width: 25,
                            height: 25,
                            flex: "0 0 25px"
                          }}
                        ></div>
                        <div className="setting-desc">
                          <strong>Category</strong>
                          <p>
                            A system in which members of an organization or
                            society are ranked according to relative status or
                            authority.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="setting-cntr">
                      <div className="setting-box">
                        <div
                          style={{
                            backgroundColor: "red",
                            width: 25,
                            height: 25,
                            flex: "0 0 25px"
                          }}
                        ></div>
                        <div className="setting-desc">
                          <strong>Priority</strong>
                          <p>
                            A system in which members of an organization or
                            society are ranked according to relative status or
                            authority.
                          </p>
                        </div>
                      </div>
                      <div className="setting-box">
                        <div
                          style={{
                            backgroundColor: "red",
                            width: 25,
                            height: 25,
                            flex: "0 0 25px"
                          }}
                        ></div>
                        <div className="setting-desc">
                          <strong>SLA</strong>
                          <p>
                            A system in which members of an organization or
                            society are ranked according to relative status or
                            authority.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="setting-cntr">
                      <div className="setting-box">
                        <div
                          style={{
                            backgroundColor: "red",
                            width: 25,
                            height: 25,
                            flex: "0 0 25px"
                          }}
                        ></div>
                        <div className="setting-desc">
                          <strong>Users</strong>
                          <p>
                            A system in which members of an organization or
                            society are ranked according to relative status or
                            authority.
                          </p>
                        </div>
                      </div>
                      <div className="setting-box">
                        <div
                          style={{
                            backgroundColor: "red",
                            width: 25,
                            height: 25,
                            flex: "0 0 25px"
                          }}
                        ></div>
                        <div className="setting-desc">
                          <strong>CRM Roles</strong>
                          <p>
                            A system in which members of an organization or
                            society are ranked according to relative status or
                            authority.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-3">
                    <div className="setting-cntr">
                      <div className="setting-box">
                        <div
                          style={{
                            backgroundColor: "red",
                            width: 25,
                            height: 25,
                            flex: "0 0 25px"
                          }}
                        ></div>
                        <div className="setting-desc">
                          <strong>Alerts</strong>
                          <p>
                            A system in which members of an organization or
                            society are ranked according to relative status or
                            authority.
                          </p>
                        </div>
                      </div>
                      <div className="setting-box">
                        <div
                          style={{
                            backgroundColor: "red",
                            width: 25,
                            height: 25,
                            flex: "0 0 25px"
                          }}
                        ></div>
                        <div className="setting-desc">
                          <strong>Templates</strong>
                          <p>
                            A system in which members of an organization or
                            society are ranked according to relative status or
                            authority.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="setting-cntr">
                      <div className="setting-box">
                        <div
                          style={{
                            backgroundColor: "red",
                            width: 25,
                            height: 25,
                            flex: "0 0 25px"
                          }}
                        ></div>
                        <div className="setting-desc">
                          <strong>Reports</strong>
                          <p>
                            A system in which members of an organization or
                            society are ranked according to relative status or
                            authority.
                          </p>
                        </div>
                      </div>
                      <div className="setting-box">
                        <div
                          style={{
                            backgroundColor: "red",
                            width: 25,
                            height: 25,
                            flex: "0 0 25px"
                          }}
                        ></div>
                        <div className="setting-desc">
                          <strong>Modules</strong>
                          <p>
                            A system in which members of an organization or
                            society are ranked according to relative status or
                            authority.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="setting-cntr">
                      <div className="setting-box">
                        <div
                          style={{
                            backgroundColor: "red",
                            width: 25,
                            height: 25,
                            flex: "0 0 25px"
                          }}
                        ></div>
                        <div className="setting-desc">
                          <strong>File Upload Logs</strong>
                          <p>
                            A system in which members of an organization or
                            society are ranked according to relative status or
                            authority.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                class="tab-pane fade"
                id="store-tab"
                role="tabpanel"
                aria-labelledby="store-tab"
              >
                <div className="row">
                  <div className="col-md-3">
                    <div className="setting-cntr">
                      <div className="setting-box">
                        <div
                          style={{
                            backgroundColor: "red",
                            width: 25,
                            height: 25,
                            flex: "0 0 25px"
                          }}
                        ></div>
                        <div className="setting-desc">
                          <strong>Hierarchy Master</strong>
                          <p>
                            A system in which members of an organization or
                            society are ranked according to relative status or
                            authority.
                          </p>
                        </div>
                      </div>
                      <div className="setting-box">
                        <div
                          style={{
                            backgroundColor: "red",
                            width: 25,
                            height: 25,
                            flex: "0 0 25px"
                          }}
                        ></div>
                        <div className="setting-desc">
                          <strong>Item Master</strong>
                          <p>
                            A system in which members of an organization or
                            society are ranked according to relative status or
                            authority.
                          </p>
                        </div>
                      </div>
                      <div className="setting-box">
                        <div
                          style={{
                            backgroundColor: "red",
                            width: 25,
                            height: 25,
                            flex: "0 0 25px"
                          }}
                        ></div>
                        <div className="setting-desc">
                          <strong>Department</strong>
                          <p>
                            A system in which members of an organization or
                            society are ranked according to relative status or
                            authority.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="setting-cntr">
                      <div className="setting-box">
                        <div
                          style={{
                            backgroundColor: "red",
                            width: 25,
                            height: 25,
                            flex: "0 0 25px"
                          }}
                        ></div>
                        <div className="setting-desc">
                          <strong>Priority Master</strong>
                          <p>
                            A system in which members of an organization or
                            society are ranked according to relative status or
                            authority.
                          </p>
                        </div>
                      </div>
                      <div className="setting-box">
                        <div
                          style={{
                            backgroundColor: "red",
                            width: 25,
                            height: 25,
                            flex: "0 0 25px"
                          }}
                        ></div>
                        <div className="setting-desc">
                          <strong>SLA Template-Department</strong>
                          <p>
                            A system in which members of an organization or
                            society are ranked according to relative status or
                            authority.
                          </p>
                        </div>
                      </div>
                      <div className="setting-box">
                        <div
                          style={{
                            backgroundColor: "red",
                            width: 25,
                            height: 25,
                            flex: "0 0 25px"
                          }}
                        ></div>
                        <div className="setting-desc">
                          <strong>Claim Category Master</strong>
                          <p>
                            A system in which members of an organization or
                            society are ranked according to relative status or
                            authority.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="setting-cntr">
                      <div className="setting-box">
                        <div
                          style={{
                            backgroundColor: "red",
                            width: 25,
                            height: 25,
                            flex: "0 0 25px"
                          }}
                        ></div>
                        <div className="setting-desc">
                          <strong>CRM Roles</strong>
                          <p>
                            A system in which members of an organization or
                            society are ranked according to relative status or
                            authority.
                          </p>
                        </div>
                      </div>
                      <div className="setting-box">
                        <div
                          style={{
                            backgroundColor: "red",
                            width: 25,
                            height: 25,
                            flex: "0 0 25px"
                          }}
                        ></div>
                        <div className="setting-desc">
                          <strong>Users</strong>
                          <p>
                            A system in which members of an organization or
                            society are ranked according to relative status or
                            authority.
                          </p>
                        </div>
                      </div>
                      <div className="setting-box">
                        <div
                          style={{
                            backgroundColor: "red",
                            width: 25,
                            height: 25,
                            flex: "0 0 25px"
                          }}
                        ></div>
                        <div className="setting-desc">
                          <strong>Alerts</strong>
                          <p>
                            A system in which members of an organization or
                            society are ranked according to relative status or
                            authority.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="setting-cntr">
                      <div className="setting-box">
                        <div
                          style={{
                            backgroundColor: "red",
                            width: 25,
                            height: 25,
                            flex: "0 0 25px"
                          }}
                        ></div>
                        <div className="setting-desc">
                          <strong>Reports</strong>
                          <p>
                            A system in which members of an organization or
                            society are ranked according to relative status or
                            authority.
                          </p>
                        </div>
                      </div>
                      <div className="setting-box">
                        <div
                          style={{
                            backgroundColor: "red",
                            width: 25,
                            height: 25,
                            flex: "0 0 25px"
                          }}
                        ></div>
                        <div className="setting-desc">
                          <strong>Module Settings</strong>
                          <p>
                            A system in which members of an organization or
                            society are ranked according to relative status or
                            authority.
                          </p>
                        </div>
                      </div>
                      <div className="setting-box">
                        <div
                          style={{
                            backgroundColor: "red",
                            width: 25,
                            height: 25,
                            flex: "0 0 25px"
                          }}
                        ></div>
                        <div className="setting-desc">
                          <strong>File Upload Logs</strong>
                          <p>
                            A system in which members of an organization or
                            society are ranked according to relative status or
                            authority.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                class="tab-pane fade"
                id="qa-tab"
                role="tabpanel"
                aria-labelledby="qa-tab"
              >
                <div className="row">
                  <div className="col-md-3">
                    <div className="setting-cntr">
                      <div className="setting-box">
                        <div
                          style={{
                            backgroundColor: "red",
                            width: 25,
                            height: 25,
                            flex: "0 0 25px"
                          }}
                        ></div>
                        <div className="setting-desc">
                          <strong>Hierarchy</strong>
                          <p>
                            A system in which members of an organization or
                            society are ranked according to relative status or
                            authority.
                          </p>
                        </div>
                      </div>
                      <div className="setting-box">
                        <div
                          style={{
                            backgroundColor: "red",
                            width: 25,
                            height: 25,
                            flex: "0 0 25px"
                          }}
                        ></div>
                        <div className="setting-desc">
                          <strong>CRM Roles</strong>
                          <p>
                            A system in which members of an organization or
                            society are ranked according to relative status or
                            authority.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="setting-cntr">
                      <div className="setting-box">
                        <div
                          style={{
                            backgroundColor: "red",
                            width: 25,
                            height: 25,
                            flex: "0 0 25px"
                          }}
                        ></div>
                        <div className="setting-desc">
                          <strong>Users</strong>
                          <p>
                            A system in which members of an organization or
                            society are ranked according to relative status or
                            authority.
                          </p>
                        </div>
                      </div>
                      <div className="setting-box">
                        <div
                          style={{
                            backgroundColor: "red",
                            width: 25,
                            height: 25,
                            flex: "0 0 25px"
                          }}
                        ></div>
                        <div className="setting-desc">
                          <strong>Audit Parameters</strong>
                          <p>
                            A system in which members of an organization or
                            society are ranked according to relative status or
                            authority.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="setting-cntr">
                      <div className="setting-box">
                        <div
                          style={{
                            backgroundColor: "red",
                            width: 25,
                            height: 25,
                            flex: "0 0 25px"
                          }}
                        ></div>
                        <div className="setting-desc">
                          <strong>Reports</strong>
                          <p>
                            A system in which members of an organization or
                            society are ranked according to relative status or
                            authority.
                          </p>
                        </div>
                      </div>
                      <div className="setting-box">
                        <div
                          style={{
                            backgroundColor: "red",
                            width: 25,
                            height: 25,
                            flex: "0 0 25px"
                          }}
                        ></div>
                        <div className="setting-desc">
                          <strong>File Upload Logs</strong>
                          <p>
                            A system in which members of an organization or
                            society are ranked according to relative status or
                            authority.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Settings;
