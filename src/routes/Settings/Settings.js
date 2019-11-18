import React, { Component } from "react";
import "jquery";
import "popper.js/dist/popper";
import "bootstrap";
import storeSettings from "./../../assets/Images/store-settings.png";
import priority from "./../../assets/Images/priority.png";
import users from "./../../assets/Images/users.png";
import category from "./../../assets/Images/category.png";
import hierarchy from "./../../assets/Images/hierarchy.png";
import brand from "./../../assets/Images/brand.png";
import sla from "./../../assets/Images/sla.png";
import crmRoles from "./../../assets/Images/crm-roles.png";
import alert from "./../../assets/Images/alert.png";
import reports from "./../../assets/Images/reports.png";
import fileUpload from "./../../assets/Images/file-upload.png";
import templates from "./../../assets/Images/templates.png";
import modules from "./../../assets/Images/modules.png";
import item from "./../../assets/Images/item.png";
import department from "./../../assets/Images/department.png";
import audit from "./../../assets/Images/audit.png";
import Demo from "../../store/Hashtag";
import { Link } from "react-router-dom";

class Settings extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="container-fluid setting-title">
          <p className="font-weight-bold">Settings</p>
        </div>
        <div className="container-fluid">
          <div className="setting-tabs">
            <ul className="nav nav-tabs" role="tablist">
              <li className="nav-item">
                <a
                  className="nav-link active"
                  data-toggle="tab"
                  href="#ticketing-tab"
                  role="tab"
                  aria-controls="ticketing-tab"
                  aria-selected="true"
                >
                  Ticketing
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  data-toggle="tab"
                  href="#store-tab"
                  role="tab"
                  aria-controls="store-tab"
                  aria-selected="false"
                >
                  Store
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  data-toggle="tab"
                  href="#qa-tab"
                  role="tab"
                  aria-controls="qa-tab"
                  aria-selected="false"
                >
                  QA
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  data-toggle="tab"
                  href="#chat-tab"
                  role="tab"
                  aria-controls="chat-tab"
                  aria-selected="false"
                >
                  Chat
                </a>
              </li>
            </ul>
            <div className="tab-content">
              <div
                className="tab-pane fade show active"
                id="ticketing-tab"
                role="tabpanel"
                aria-labelledby="ticketing-tab"
              >
                <div className="row">
                  <div className="col-md-3">
                    <div className="setting-cntr">
                      <a href="ticketHierarchy" className="setting-box">
                        <div className="setting-icons">
                          <img src={hierarchy} alt="hierarchy" />
                        </div>
                        <div className="setting-desc">
                          <strong>Hierarchy</strong>
                          <p>
                            A system in which members of an organization or
                            society are ranked according to relative status or
                            authority.
                          </p>
                        </div>
                      </a>
                      <Link to="brands" className="setting-box">
                        <div className="setting-icons">
                          <img src={brand} alt="brand" />
                        </div>
                        <div className="setting-desc">
                          <strong>Brand</strong>
                          <p>
                            A system in which members of an organization or
                            society are ranked according to relative status or
                            authority.
                          </p>
                        </div>
                      </Link>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="setting-cntr">
                      <Link to="storeMaster" className="setting-box">
                        <div className="setting-icons">
                          <img src={storeSettings} alt="store-settings" />
                        </div>
                        <div className="setting-desc">
                          <strong>Store</strong>
                          <p>
                            A system in which members of an organization or
                            society are ranked according to relative status or
                            authority.
                          </p>
                        </div>
                      </Link>
                      <Link to="categoryMaster" className="setting-box">
                        <div className="setting-icons">
                          <img src={category} alt="category" />
                        </div>
                        <div className="setting-desc">
                          <strong>Category</strong>
                          <p>
                            A system in which members of an organization or
                            society are ranked according to relative status or
                            authority.
                          </p>
                        </div>
                      </Link>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="setting-cntr">
                      <Link to="Priority" className="setting-box">
                        <div className="setting-icons">
                          <img src={priority} alt="priority" />
                        </div>
                        <div className="setting-desc">
                          <strong>Priority</strong>
                          <p>
                            A system in which members of an organization or
                            society are ranked according to relative status or
                            authority.
                          </p>
                        </div>
                      </Link>
                      <Link to="sla" className="setting-box">
                        <div className="setting-icons">
                          <img src={sla} alt="sla" />
                        </div>
                        <div className="setting-desc">
                          <strong>SLA</strong>
                          <p>
                            A system in which members of an organization or
                            society are ranked according to relative status or
                            authority.
                          </p>
                        </div>
                      </Link>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="setting-cntr">
                      <Link to="users" className="setting-box">
                        <div className="setting-icons big-icon">
                          <img src={users} alt="users" />
                        </div>
                        <div className="setting-desc">
                          <strong>Users</strong>
                          <p>
                            A system in which members of an organization or
                            society are ranked according to relative status or
                            authority.
                          </p>
                        </div>
                      </Link>
                      <Link to="ticketCRMRole" className="setting-box">
                        <div className="setting-icons">
                          <img src={crmRoles} alt="crm-roles" />
                        </div>
                        <div className="setting-desc">
                          <strong>CRM Roles</strong>
                          <p>
                            A system in which members of an organization or
                            society are ranked according to relative status or
                            authority.
                          </p>
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-3">
                    <div className="setting-cntr">
                      <Link to="alerts" className="setting-box">
                        <div className="setting-icons icon-small">
                          <img src={alert} alt="alert" />
                        </div>
                        <div className="setting-desc">
                          <strong>Alerts</strong>
                          <p>
                            A system in which members of an organization or
                            society are ranked according to relative status or
                            authority.
                          </p>
                        </div>
                      </Link>
                      <Link to="templates" className="setting-box">
                        <div className="setting-icons icon-small">
                          <img src={templates} alt="templates" />
                        </div>
                        <div className="setting-desc">
                          <strong>Templates</strong>
                          <p>
                            A system in which members of an organization or
                            society are ranked according to relative status or
                            authority.
                          </p>
                        </div>
                      </Link>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="setting-cntr">
                      <Link to="reports" className="setting-box">
                        <div className="setting-icons icon-small">
                          <img src={reports} alt="reports" />
                        </div>
                        <div className="setting-desc">
                          <strong>Reports</strong>
                          <p>
                            A system in which members of an organization or
                            society are ranked according to relative status or
                            authority.
                          </p>
                        </div>
                      </Link>
                      <Link to="module" className="setting-box">
                        <div className="setting-icons">
                          <img src={modules} alt="modules" />
                        </div>
                        <div className="setting-desc">
                          <strong>Modules</strong>
                          <p>
                            A system in which members of an organization or
                            society are ranked according to relative status or
                            authority.
                          </p>
                        </div>
                      </Link>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="setting-cntr">
                      <Link to="fileuploadlogs" className="setting-box">
                        <div className="setting-icons">
                          <img src={fileUpload} alt="file-upload" />
                        </div>
                        <div className="setting-desc">
                          <strong>File Upload Logs</strong>
                          <p>
                            A system in which members of an organization or
                            society are ranked according to relative status or
                            authority.
                          </p>
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="tab-pane fade"
                id="store-tab"
                role="tabpanel"
                aria-labelledby="store-tab"
              >
                <div className="row">
                  <div className="col-md-3">
                    <div className="setting-cntr">
                      <Link to="hierarchyMaster" className="setting-box">
                        <div className="setting-icons">
                          <img src={hierarchy} alt="hierarchy" />
                        </div>
                        <div className="setting-desc">
                          <strong>Hierarchy Master</strong>
                          <p>
                            A system in which members of an organization or
                            society are ranked according to relative status or
                            authority.
                          </p>
                        </div>
                      </Link>
                      <Link to="itemMaster" className="setting-box">
                        <div className="setting-icons icon-small">
                          <img src={item} alt="item" />
                        </div>
                        <div className="setting-desc">
                          <strong>Item Master</strong>
                          <p>
                            A system in which members of an organization or
                            society are ranked according to relative status or
                            authority.
                          </p>
                        </div>
                      </Link>
                      <a href="departmentMaster" className="setting-box">
                        <div className="setting-icons icon-small">
                          <img src={department} alt="department" />
                        </div>
                        <div className="setting-desc">
                          <strong>Department</strong>
                          <p>
                            A system in which members of an organization or
                            society are ranked according to relative status or
                            authority.
                          </p>
                        </div>
                      </a>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="setting-cntr">
                      <a href="storePriority" className="setting-box">
                        <div className="setting-icons">
                          <img src={priority} alt="priority" />
                        </div>
                        <div className="setting-desc">
                          <strong>Priority Master</strong>
                          <p>
                            A system in which members of an organization or
                            society are ranked according to relative status or
                            authority.
                          </p>
                        </div>
                      </a>
                      <a href="SlaTemplateDepartment" className="setting-box">
                        <div className="setting-icons icon-small">
                          <img src={templates} alt="templates" />
                        </div>
                        <div className="setting-desc">
                          <strong>SLA Template-Department</strong>
                          <p>
                            A system in which members of an organization or
                            society are ranked according to relative status or
                            authority.
                          </p>
                        </div>
                      </a>
                      <Link to="claimCategoryMaster" className="setting-box">
                        <div className="setting-icons">
                          <img src={category} alt="category" />
                        </div>
                        <div className="setting-desc">
                          <strong>Claim Category Master</strong>
                          <p>
                            A system in which members of an organization or
                            society are ranked according to relative status or
                            authority.
                          </p>
                        </div>
                      </Link>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="setting-cntr">
                      <a href="Storecrmrole" className="setting-box">
                        <div className="setting-icons">
                          <img src={crmRoles} alt="crm-roles" />
                        </div>
                        <div className="setting-desc">
                          <strong>CRM Roles</strong>
                          <p>
                            A system in which members of an organization or
                            society are ranked according to relative status or
                            authority.
                          </p>
                        </div>
                      </a>
                      <a href="storeusers" className="setting-box">
                        <div className="setting-icons big-icon">
                          <img src={users} alt="users" />
                        </div>
                        <div className="setting-desc">
                          <strong>Users</strong>
                          <p>
                            A system in which members of an organization or
                            society are ranked according to relative status or
                            authority.
                          </p>
                        </div>
                      </a>
                      <Link to="storeAlerts" className="setting-box">
                        <div className="setting-icons icon-small">
                          <img src={alert} alt="alert" />
                        </div>
                        <div className="setting-desc">
                          <strong>Alerts</strong>
                          <p>
                            A system in which members of an organization or
                            society are ranked according to relative status or
                            authority.
                          </p>
                        </div>
                      </Link>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="setting-cntr">
                      <Link to="storereports" className="setting-box">
                        <div className="setting-icons icon-small">
                          <img src={reports} alt="reports" />
                        </div>
                        <div className="setting-desc">
                          <strong>Reports</strong>
                          <p>
                            A system in which members of an organization or
                            society are ranked according to relative status or
                            authority.
                          </p>
                        </div>
                      </Link>
                      <Link to="storeModule" className="setting-box">
                        <div className="setting-icons">
                          <img src={modules} alt="modules" />
                        </div>
                        <div className="setting-desc">
                          <strong>Module Settings</strong>
                          <p>
                            A system in which members of an organization or
                            society are ranked according to relative status or
                            authority.
                          </p>
                        </div>
                      </Link>
                      <Link to="fileuploadlogs" className="setting-box">
                        <div className="setting-icons">
                          <img src={fileUpload} alt="file-upload" />
                        </div>
                        <div className="setting-desc">
                          <strong>File Upload Logs</strong>
                          <p>
                            A system in which members of an organization or
                            society are ranked according to relative status or
                            authority.
                          </p>
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="tab-pane fade"
                id="qa-tab"
                role="tabpanel"
                aria-labelledby="qa-tab"
              >
                <div className="row">
                  <div className="col-md-3">
                    <div className="setting-cntr">
                      <Link to="qaHierarchyMaster" className="setting-box">
                        <div className="setting-icons">
                          <img src={hierarchy} alt="hierarchy" />
                        </div>
                        <div className="setting-desc">
                          <strong>Hierarchy</strong>
                          <p>
                            A system in which members of an organization or
                            society are ranked according to relative status or
                            authority.
                          </p>
                        </div>
                      </Link>
                      <Link to="qaCRMRoles" className="setting-box">
                        <div className="setting-icons">
                          <img src={crmRoles} alt="crm-roles" />
                        </div>
                        <div className="setting-desc">
                          <strong>CRM Roles</strong>
                          <p>
                            A system in which members of an organization or
                            society are ranked according to relative status or
                            authority.
                          </p>
                        </div>
                      </Link>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="setting-cntr">
                      <Link to="QaUsermaster" className="setting-box">
                        <div className="setting-icons big-icon">
                          <img src={users} alt="users" />
                        </div>
                        <div className="setting-desc">
                          <strong>Users</strong>
                          <p>
                            A system in which members of an organization or
                            society are ranked according to relative status or
                            authority.
                          </p>
                        </div>
                      </Link>
                      <a href={Demo.BLANK_LINK} className="setting-box">
                        <div className="setting-icons icon-small">
                          <img src={audit} alt="audit" />
                        </div>
                        <div className="setting-desc">
                          <strong>Audit Parameters</strong>
                          <p>
                            A system in which members of an organization or
                            society are ranked according to relative status or
                            authority.
                          </p>
                        </div>
                      </a>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="setting-cntr">
                      <Link to="qareports" className="setting-box">
                        <div className="setting-icons icon-small">
                          <img src={reports} alt="reports" />
                        </div>
                        <div className="setting-desc">
                          <strong>Reports</strong>
                          <p>
                            A system in which members of an organization or
                            society are ranked according to relative status or
                            authority.
                          </p>
                        </div>
                      </Link>
                      <a href="fileuploadlogs" className="setting-box">
                        <div className="setting-icons">
                          <img src={fileUpload} alt="file-upload" />
                        </div>
                        <div className="setting-desc">
                          <strong>File Upload Logs</strong>
                          <p>
                            A system in which members of an organization or
                            society are ranked according to relative status or
                            authority.
                          </p>
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="tab-pane fade"
                id="chat-tab"
                role="tabpanel"
                aria-labelledby="chat-tab"
              >
                <div className="row">
                  <div className="col-md-3">
                    <div className="setting-cntr">
                      <Link to="ChatElements" className="setting-box">
                        <div className="setting-icons">
                          <img src={hierarchy} alt="hierarchy" />
                        </div>
                        <div className="setting-desc">
                          <strong>Elements</strong>
                          <p>
                            A system in which members of an organization or
                            society are ranked according to relative status or
                            authority.
                          </p>
                        </div>
                      </Link>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="setting-cntr">
                      <Link to="chatLanguage" className="setting-box">
                        <div className="setting-icons">
                          <img src={storeSettings} alt="store-settings" />
                        </div>
                        <div className="setting-desc">
                          <strong>Language</strong>
                          <p>
                            A system in which members of an organization or
                            society are ranked according to relative status or
                            authority.
                          </p>
                        </div>
                      </Link>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="setting-cntr">
                      <Link to="chatThemes" className="setting-box">
                        <div className="setting-icons">
                          <img src={priority} alt="priority" />
                        </div>
                        <div className="setting-desc">
                          <strong>Theme</strong>
                          <p>
                            A system in which members of an organization or
                            society are ranked according to relative status or
                            authority.
                          </p>
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-3">
                    <div className="setting-cntr">
                      <Link to="ChatRules" className="setting-box">
                        <div className="setting-icons icon-small">
                          <img src={brand} alt="brand" />
                        </div>
                        <div className="setting-desc">
                          <strong>Rules</strong>
                          <p>
                            A system in which members of an organization or
                            society are ranked according to relative status or
                            authority.
                          </p>
                        </div>
                      </Link>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="setting-cntr">
                      <Link to="ChatConfigureBrand" className="setting-box">
                        <div className="setting-icons icon-small">
                          <img src={category} alt="category" />
                        </div>
                        <div className="setting-desc">
                          <strong>Configuration</strong>
                          <p>
                            A system in which members of an organization or
                            society are ranked according to relative status or
                            authority.
                          </p>
                        </div>
                      </Link>
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
