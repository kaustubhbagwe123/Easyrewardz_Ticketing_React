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
import config from "./../../helpers/config";
import { Link } from "react-router-dom";
import * as translationHI from "../../translations/hindi";
import * as translationMA from "../../translations/marathi";

class Settings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ticketShow: false,
      storeShow: false,
      showReport: true,
      translateLanguage: {},
    };
  }

  componentDidMount() {
    var isReport = document.getElementById("isReport").value||"none";

    if (isReport === "block") {
      this.setState({ showReport: true });
    } else if (isReport === "none") {
      this.setState({ showReport: false });
    }
    if (this.props.location.tabName) {
      let lowerTabsPane = document.querySelectorAll(".tab-pane");
      for (let i = 0; i < lowerTabsPane.length; i++) {
        lowerTabsPane[i].classList.remove("active");
        lowerTabsPane[i].classList.remove("show");
        if (this.props.location.tabName === lowerTabsPane[i].id) {
          lowerTabsPane[i].classList.add("active");
          lowerTabsPane[i].classList.add("show");
        }
      }
      let upperTabs = document.querySelectorAll(".nav-link");
      for (let i = 0; i < upperTabs.length; i++) {
        upperTabs[i].classList.remove("active");
        if (
          "#" + this.props.location.tabName ===
          upperTabs[i].getAttribute("href")
        ) {
          upperTabs[i].classList.add("active");
        }
      }
    }
    var store = window.localStorage.getItem("ERS");
    var ticket = window.localStorage.getItem("ERT");
    if (ticket === "true") {
      this.setState({
        ticketShow: ticket,
      });
    } else {
      this.setState({
        storeShow: store,
      });
    }

    if (window.localStorage.getItem("translateLanguage") === "hindi") {
      this.state.translateLanguage = translationHI;
    } else if (window.localStorage.getItem("translateLanguage") === "marathi") {
      this.state.translateLanguage = translationMA;
    } else {
      this.state.translateLanguage = {};
    }
  }

  render() {
    const TranslationContext = this.state.translateLanguage.default;

    return (
      <React.Fragment>
        <div className="container-fluid setting-title">
          <div className="setmainscreen">
            {TranslationContext !== undefined
              ? TranslationContext.div.setting
              : "Settings"}
          </div>
        </div>
        <div className="container-fluid">
          <div className="setting-tabs">
            <ul className="nav nav-tabs" role="tablist">
              {this.state.ticketShow === "true" ? (
                <li className="nav-item">
                  <a
                    className="nav-link active"
                    data-toggle="tab"
                    href="#ticketing-tab"
                    role="tab"
                    aria-controls="ticketing-tab"
                    aria-selected="true"
                  >
                    {TranslationContext !== undefined
                      ? TranslationContext.a.ticketing
                      : "Ticketing"}
                  </a>
                </li>
              ) : null}
              {this.state.storeShow === "true" ? (
                <li className="nav-item">
                  <a
                    className="nav-link active"
                    data-toggle="tab"
                    href="#store-tab"
                    role="tab"
                    aria-controls="store-tab"
                    aria-selected="false"
                  >
                    {TranslationContext !== undefined
                      ? TranslationContext.a.store
                      : "Store"}
                  </a>
                </li>
              ) : null}

              {/* <li className="nav-item">
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
              </li> */}
            </ul>
            <div className="tab-content">
              <div
                // className={this.state.ticketing_Setting}
                className={
                  this.state.ticketShow === "true"
                    ? "tab-pane fade show active"
                    : "tab-pane fade"
                }
                id="ticketing-tab"
                role="tabpanel"
                aria-labelledby="ticketing-tab"
              >
                <div className="row">
                  <div className="col-md-3">
                    <div className="setting-cntr">
                      <Link to="ticketHierarchy" className="setting-box">
                        <div className="setting-icons">
                          <img src={hierarchy} alt="hierarchy" />
                        </div>
                        <div className="setting-desc">
                          <strong>
                            {TranslationContext !== undefined
                              ? TranslationContext.strong.hierarchy
                              : "Hierarchy"}
                          </strong>
                          <p>
                            {TranslationContext !== undefined
                              ? TranslationContext.p
                                  .asysteminwhichmembersofanorganizationorsocietyarerankedaccordingtorelativestatusorauthority
                              : "A system in which members of an organization or society are ranked according to relative status or authority."}
                          </p>
                        </div>
                      </Link>
                      <Link to="brands" className="setting-box">
                        <div className="setting-icons">
                          <img src={brand} alt="brand" />
                        </div>
                        <div className="setting-desc">
                          <strong>
                            {TranslationContext !== undefined
                              ? TranslationContext.strong.brand
                              : "Brand"}
                          </strong>
                          <p>
                            {TranslationContext !== undefined
                              ? TranslationContext.p
                                  .asysteminwhichmembersofanorganizationorsocietyarerankedaccordingtorelativestatusorauthority
                              : "A system in which members of an organization or society are ranked according to relative status or authority."}
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
                            {TranslationContext !== undefined
                              ? TranslationContext.p
                                  .asysteminwhichmembersofanorganizationorsocietyarerankedaccordingtorelativestatusorauthority
                              : "A system in which members of an organization or society are ranked according to relative status or authority."}
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
                            {TranslationContext !== undefined
                              ? TranslationContext.p
                                  .asysteminwhichmembersofanorganizationorsocietyarerankedaccordingtorelativestatusorauthority
                              : "A system in which members of an organization or society are ranked according to relative status or authority."}
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
                          <strong>
                            {TranslationContext !== undefined
                              ? TranslationContext.strong.priority
                              : "Priority"}
                          </strong>
                          <p>
                            {TranslationContext !== undefined
                              ? TranslationContext.p
                                  .asysteminwhichmembersofanorganizationorsocietyarerankedaccordingtorelativestatusorauthority
                              : "A system in which members of an organization or society are ranked according to relative status or authority."}
                          </p>
                        </div>
                      </Link>
                      <Link to="sla" className="setting-box">
                        <div className="setting-icons">
                          <img src={sla} alt="sla" />
                        </div>
                        <div className="setting-desc">
                          <strong>
                            {TranslationContext !== undefined
                              ? TranslationContext.strong.sla
                              : "SLA"}
                          </strong>
                          <p>
                            {TranslationContext !== undefined
                              ? TranslationContext.p
                                  .asysteminwhichmembersofanorganizationorsocietyarerankedaccordingtorelativestatusorauthority
                              : "A system in which members of an organization or society are ranked according to relative status or authority."}
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
                          <strong>
                            {TranslationContext !== undefined
                              ? TranslationContext.strong.users
                              : "Users"}
                          </strong>
                          <p>
                            {TranslationContext !== undefined
                              ? TranslationContext.p
                                  .asysteminwhichmembersofanorganizationorsocietyarerankedaccordingtorelativestatusorauthority
                              : "A system in which members of an organization or society are ranked according to relative status or authority."}
                          </p>
                        </div>
                      </Link>
                      <Link to="ticketCRMRole" className="setting-box">
                        <div className="setting-icons">
                          <img src={crmRoles} alt="crm-roles" />
                        </div>
                        <div className="setting-desc">
                          <strong>
                            {TranslationContext !== undefined
                              ? TranslationContext.strong.crmroles
                              : "CRM Roles"}
                          </strong>
                          <p>
                            {TranslationContext !== undefined
                              ? TranslationContext.p
                                  .asysteminwhichmembersofanorganizationorsocietyarerankedaccordingtorelativestatusorauthority
                              : "A system in which members of an organization or society are ranked according to relative status or authority."}
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
                          <strong>
                            {TranslationContext !== undefined
                              ? TranslationContext.strong.alerts
                              : "Alerts"}
                          </strong>
                          <p>
                            {TranslationContext !== undefined
                              ? TranslationContext.p
                                  .asysteminwhichmembersofanorganizationorsocietyarerankedaccordingtorelativestatusorauthority
                              : "A system in which members of an organization or society are ranked according to relative status or authority."}
                          </p>
                        </div>
                      </Link>
                      <Link to="templates" className="setting-box">
                        <div className="setting-icons icon-small">
                          <img src={templates} alt="templates" />
                        </div>
                        <div className="setting-desc">
                          <strong>
                            {TranslationContext !== undefined
                              ? TranslationContext.strong.templates
                              : "Templates"}
                          </strong>
                          <p>
                            {TranslationContext !== undefined
                              ? TranslationContext.p
                                  .asysteminwhichmembersofanorganizationorsocietyarerankedaccordingtorelativestatusorauthority
                              : "A system in which members of an organization or society are ranked according to relative status or authority."}
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
                          <strong>
                            {TranslationContext !== undefined
                              ? TranslationContext.strong.reports
                              : "Reports"}
                          </strong>
                          <p>
                            {TranslationContext !== undefined
                              ? TranslationContext.p
                                  .asysteminwhichmembersofanorganizationorsocietyarerankedaccordingtorelativestatusorauthority
                              : "A system in which members of an organization or society are ranked according to relative status or authority."}
                          </p>
                        </div>
                      </Link>
                      <Link to="module" className="setting-box">
                        <div className="setting-icons">
                          <img src={modules} alt="modules" />
                        </div>
                        <div className="setting-desc">
                          <strong>
                            {TranslationContext !== undefined
                              ? TranslationContext.strong.modules
                              : "Modules"}
                          </strong>
                          <p>
                            {TranslationContext !== undefined
                              ? TranslationContext.p
                                  .asysteminwhichmembersofanorganizationorsocietyarerankedaccordingtorelativestatusorauthority
                              : "A system in which members of an organization or society are ranked according to relative status or authority."}
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
                          <strong>
                            {TranslationContext !== undefined
                              ? TranslationContext.strong.fileuploadlogs
                              : "File Upload Logs"}
                          </strong>
                          <p>
                            {TranslationContext !== undefined
                              ? TranslationContext.p
                                  .asysteminwhichmembersofanorganizationorsocietyarerankedaccordingtorelativestatusorauthority
                              : "A system in which members of an organization or society are ranked according to relative status or authority."}
                          </p>
                        </div>
                      </Link>
                      <Link to="blockedemail" className="setting-box">
                        <div className="setting-icons">
                          <img src={fileUpload} alt="file-upload" />
                        </div>
                        <div className="setting-desc">
                          <strong>
                            {TranslationContext !== undefined
                              ? TranslationContext.strong.blockedemailid
                              : "Blocked Email Id"}
                          </strong>
                          <p>
                            {TranslationContext !== undefined
                              ? TranslationContext.p
                                  .asysteminwhichmembersofanorganizationorsocietyarerankedaccordingtorelativestatusorauthority
                              : "A system in which members of an organization or society are ranked according to relative status or authority."}
                          </p>
                        </div>
                      </Link>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="setting-cntr">
                      <Link to="junkwords" className="setting-box">
                        <div className="setting-icons">
                          <img src={fileUpload} alt="file-upload" />
                        </div>
                        <div className="setting-desc">
                          <strong>
                            {TranslationContext !== undefined
                              ? TranslationContext.strong.junkwords
                              : "Junk Words"}
                          </strong>
                          <p>
                            {TranslationContext !== undefined
                              ? TranslationContext.p
                                  .asysteminwhichmembersofanorganizationorsocietyarerankedaccordingtorelativestatusorauthority
                              : "A system in which members of an organization or society are ranked according to relative status or authority."}
                          </p>
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className={
                  this.state.storeShow === "true"
                    ? "tab-pane fade show active"
                    : "tab-pane fade"
                }
                id="store-tab"
                role="tabpanel"
                aria-labelledby="store-tab"
              >
                <div className="row">
                  <div className="col-md-3">
                    <div className="setting-cntr">
                      <Link to="/store/hierarchyMaster" className="setting-box">
                        <div className="setting-icons">
                          <img src={hierarchy} alt="hierarchy" />
                        </div>
                        <div className="setting-desc">
                          <strong>
                            {TranslationContext !== undefined
                              ? TranslationContext.strong.hierarchymaster
                              : "Hierarchy Master"}
                          </strong>
                          <p>
                            {TranslationContext !== undefined
                              ? TranslationContext.p
                                  .asysteminwhichmembersofanorganizationorsocietyarerankedaccordingtorelativestatusorauthority
                              : "A system in which members of an organization or society are ranked according to relative status or authority."}
                          </p>
                        </div>
                      </Link>
                      <Link to="/store/itemMaster" className="setting-box">
                        <div className="setting-icons icon-small">
                          <img src={item} alt="item" />
                        </div>
                        <div className="setting-desc">
                          <strong>
                            {TranslationContext !== undefined
                              ? TranslationContext.strong.itemmaster
                              : "Item Master"}
                          </strong>
                          <p>
                            {TranslationContext !== undefined
                              ? TranslationContext.p
                                  .asysteminwhichmembersofanorganizationorsocietyarerankedaccordingtorelativestatusorauthority
                              : "A system in which members of an organization or society are ranked according to relative status or authority."}
                          </p>
                        </div>
                      </Link>
                      <Link
                        to="/store/departmentMaster"
                        className="setting-box"
                      >
                        <div className="setting-icons icon-small">
                          <img src={department} alt="department" />
                        </div>
                        <div className="setting-desc">
                          <strong>
                            {TranslationContext !== undefined
                              ? TranslationContext.strong.department
                              : "Department"}
                          </strong>
                          <p>
                            {TranslationContext !== undefined
                              ? TranslationContext.p
                                  .asysteminwhichmembersofanorganizationorsocietyarerankedaccordingtorelativestatusorauthority
                              : "A system in which members of an organization or society are ranked according to relative status or authority."}
                          </p>
                        </div>
                      </Link>
                      {config.isHomeShope ? (
                        <Link
                          to="/store/homeshopsetting"
                          className="setting-box"
                        >
                          <div className="setting-icons">
                            <img src={modules} alt="modules" />
                          </div>
                          <div className="setting-desc">
                            <strong>
                              {TranslationContext !== undefined
                                ? TranslationContext.strong.homeshopsettings
                                : "Home Shop Settings"}
                            </strong>
                            <p>
                              {TranslationContext !== undefined
                                ? TranslationContext.p
                                    .asysteminwhichmembersofanorganizationorsocietyarerankedaccordingtorelativestatusorauthority
                                : "A system in which members of an organization or society are ranked according to relative status or authority."}
                            </p>
                          </div>
                        </Link>
                      ) : null}
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="setting-cntr">
                      <Link to="/store/storePriority" className="setting-box">
                        <div className="setting-icons">
                          <img src={priority} alt="priority" />
                        </div>
                        <div className="setting-desc">
                          <strong>
                            {TranslationContext !== undefined
                              ? TranslationContext.strong.prioritymaster
                              : "Priority Master"}
                          </strong>
                          <p>
                            {TranslationContext !== undefined
                              ? TranslationContext.p
                                  .asysteminwhichmembersofanorganizationorsocietyarerankedaccordingtorelativestatusorauthority
                              : "A system in which members of an organization or society are ranked according to relative status or authority."}
                          </p>
                        </div>
                      </Link>
                      <Link
                        to="/store/SlaTemplateDepartment"
                        className="setting-box"
                      >
                        <div className="setting-icons icon-small">
                          <img src={templates} alt="templates" />
                        </div>
                        <div className="setting-desc">
                          <strong>
                            {TranslationContext !== undefined
                              ? TranslationContext.strong.slatemplatedepartment
                              : "SLA Template-Department"}
                          </strong>
                          <p>
                            {TranslationContext !== undefined
                              ? TranslationContext.p
                                  .asysteminwhichmembersofanorganizationorsocietyarerankedaccordingtorelativestatusorauthority
                              : "A system in which members of an organization or society are ranked according to relative status or authority."}
                          </p>
                        </div>
                      </Link>
                      <Link
                        to="/store/claimCategoryMaster"
                        className="setting-box"
                      >
                        <div className="setting-icons">
                          <img src={category} alt="category" />
                        </div>
                        <div className="setting-desc">
                          <strong>
                            {TranslationContext !== undefined
                              ? TranslationContext.strong.claimcategorymaster
                              : "Claim Category Master"}
                          </strong>
                          <p>
                            {TranslationContext !== undefined
                              ? TranslationContext.p
                                  .asysteminwhichmembersofanorganizationorsocietyarerankedaccordingtorelativestatusorauthority
                              : "A system in which members of an organization or society are ranked according to relative status or authority."}
                          </p>
                        </div>
                      </Link>
                      {config.isHomeShope ? (
                        <Link to="/store/chatsettings" className="setting-box">
                          <div className="setting-icons">
                            <img src={modules} alt="modules" />
                          </div>
                          <div className="setting-desc">
                            <strong>
                              {TranslationContext !== undefined
                                ? TranslationContext.strong.chatsetting
                                : "Chat Settings"}
                            </strong>
                            <p>
                              {TranslationContext !== undefined
                                ? TranslationContext.p
                                    .asysteminwhichmembersofanorganizationorsocietyarerankedaccordingtorelativestatusorauthority
                                : "A system in which members of an organization or society are ranked according to relative status or authority."}
                            </p>
                          </div>
                        </Link>
                      ) : null}
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="setting-cntr">
                      <Link to="/store/Storecrmrole" className="setting-box">
                        <div className="setting-icons">
                          <img src={crmRoles} alt="crm-roles" />
                        </div>
                        <div className="setting-desc">
                          <strong>
                            {TranslationContext !== undefined
                              ? TranslationContext.strong.crmroles
                              : "CRM Roles"}
                          </strong>
                          <p>
                            {TranslationContext !== undefined
                              ? TranslationContext.p
                                  .asysteminwhichmembersofanorganizationorsocietyarerankedaccordingtorelativestatusorauthority
                              : "A system in which members of an organization or society are ranked according to relative status or authority."}
                          </p>
                        </div>
                      </Link>
                      <Link to="/store/storeusers" className="setting-box">
                        <div className="setting-icons big-icon">
                          <img src={users} alt="users" />
                        </div>
                        <div className="setting-desc">
                          <strong>
                            {TranslationContext !== undefined
                              ? TranslationContext.strong.users
                              : "Users"}
                          </strong>
                          <p>
                            {TranslationContext !== undefined
                              ? TranslationContext.p
                                  .asysteminwhichmembersofanorganizationorsocietyarerankedaccordingtorelativestatusorauthority
                              : "A system in which members of an organization or society are ranked according to relative status or authority."}
                          </p>
                        </div>
                      </Link>
                      <Link to="/store/storeAlerts" className="setting-box">
                        <div className="setting-icons icon-small">
                          <img src={alert} alt="alert" />
                        </div>
                        <div className="setting-desc">
                          <strong>
                            {TranslationContext !== undefined
                              ? TranslationContext.strong.alerts
                              : "Alerts"}
                          </strong>
                          <p>
                            {TranslationContext !== undefined
                              ? TranslationContext.p
                                  .asysteminwhichmembersofanorganizationorsocietyarerankedaccordingtorelativestatusorauthority
                              : "A system in which members of an organization or society are ranked according to relative status or authority."}
                          </p>
                        </div>
                      </Link>
                      {config.isHomeShope ? (
                        <Link to="/store/cardassets" className="setting-box">
                          <div className="setting-icons">
                            <img src={modules} alt="modules" />
                          </div>
                          <div className="setting-desc">
                            <strong>
                              {TranslationContext !== undefined
                                ? TranslationContext.strong.chatsetting
                                : "Card Assets"}
                            </strong>
                            <p>
                              {TranslationContext !== undefined
                                ? TranslationContext.p
                                    .asysteminwhichmembersofanorganizationorsocietyarerankedaccordingtorelativestatusorauthority
                                : "A system in which members of an organization or society are ranked according to relative status or authority."}
                            </p>
                          </div>
                        </Link>
                      ) : null}
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="setting-cntr">
                      {this.state.showReport && (
                        <Link to="/store/storereports" className="setting-box">
                          <div className="setting-icons icon-small">
                            <img src={reports} alt="reports" />
                          </div>
                          <div className="setting-desc">
                            <strong>
                              {TranslationContext !== undefined
                                ? TranslationContext.strong.reports
                                : "Reports"}
                            </strong>
                            <p>
                              {TranslationContext !== undefined
                                ? TranslationContext.p
                                    .asysteminwhichmembersofanorganizationorsocietyarerankedaccordingtorelativestatusorauthority
                                : "A system in which members of an organization or society are ranked according to relative status or authority."}
                            </p>
                          </div>
                        </Link>
                      )}
                      <Link to="/store/storeModule" className="setting-box">
                        <div className="setting-icons">
                          <img src={modules} alt="modules" />
                        </div>
                        <div className="setting-desc">
                          <strong>
                            {TranslationContext !== undefined
                              ? TranslationContext.strong.modulesettings
                              : "Module Settings"}
                          </strong>
                          <p>
                            {TranslationContext !== undefined
                              ? TranslationContext.p
                                  .asysteminwhichmembersofanorganizationorsocietyarerankedaccordingtorelativestatusorauthority
                              : "A system in which members of an organization or society are ranked according to relative status or authority."}
                          </p>
                        </div>
                      </Link>
                      <Link
                        to="/store/storeFileUploadLogs"
                        className="setting-box"
                      >
                        <div className="setting-icons">
                          <img src={fileUpload} alt="file-upload" />
                        </div>
                        <div className="setting-desc">
                          <strong>
                            {TranslationContext !== undefined
                              ? TranslationContext.strong.fileuploadlogs
                              : "File Upload Logs"}
                          </strong>
                          <p>
                            {TranslationContext !== undefined
                              ? TranslationContext.p
                                  .asysteminwhichmembersofanorganizationorsocietyarerankedaccordingtorelativestatusorauthority
                              : "A system in which members of an organization or society are ranked according to relative status or authority."}
                          </p>
                        </div>
                      </Link>
                      {config.isHomeShope ? (
                        <Link to="/store/orderSetting" className="setting-box">
                          <div className="setting-icons">
                            <img src={modules} alt="modules" />
                          </div>
                          <div className="setting-desc">
                            <strong>{TranslationContext!==undefined?TranslationContext.strong.ordersetting:"Order Settings"}</strong>
                            <p>
                            {TranslationContext !== undefined
                              ? TranslationContext.p
                                  .asysteminwhichmembersofanorganizationorsocietyarerankedaccordingtorelativestatusorauthority
                              : "A system in which members of an organization or society are ranked according to relative status or authority."}
                            </p>
                          </div>
                        </Link>
                      ) : null}
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
                          <strong>
                            {TranslationContext !== undefined
                              ? TranslationContext.strong.hierarchy
                              : "Hierarchy"}
                          </strong>
                          <p>
                            {TranslationContext !== undefined
                              ? TranslationContext.p
                                  .asysteminwhichmembersofanorganizationorsocietyarerankedaccordingtorelativestatusorauthority
                              : "A system in which members of an organization or society are ranked according to relative status or authority."}
                          </p>
                        </div>
                      </Link>
                      <Link to="qaCRMRoles" className="setting-box">
                        <div className="setting-icons">
                          <img src={crmRoles} alt="crm-roles" />
                        </div>
                        <div className="setting-desc">
                          <strong>
                            {TranslationContext !== undefined
                              ? TranslationContext.strong.crmroles
                              : "CRM Roles"}
                          </strong>
                          <p>
                            {TranslationContext !== undefined
                              ? TranslationContext.p
                                  .asysteminwhichmembersofanorganizationorsocietyarerankedaccordingtorelativestatusorauthority
                              : "A system in which members of an organization or society are ranked according to relative status or authority."}
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
                          <strong>
                            {TranslationContext !== undefined
                              ? TranslationContext.strong.users
                              : "Users"}
                          </strong>
                          <p>
                            {TranslationContext !== undefined
                              ? TranslationContext.p
                                  .asysteminwhichmembersofanorganizationorsocietyarerankedaccordingtorelativestatusorauthority
                              : "A system in which members of an organization or society are ranked according to relative status or authority."}
                          </p>
                        </div>
                      </Link>
                      <Link to="QaAuditParameters" className="setting-box">
                        <div className="setting-icons icon-small">
                          <img src={audit} alt="audit" />
                        </div>
                        <div className="setting-desc">
                          <strong>
                            {TranslationContext !== undefined
                              ? TranslationContext.strong.auditparameters
                              : "Audit Parameters"}
                          </strong>
                          <p>
                            {TranslationContext !== undefined
                              ? TranslationContext.p
                                  .asysteminwhichmembersofanorganizationorsocietyarerankedaccordingtorelativestatusorauthority
                              : "A system in which members of an organization or society are ranked according to relative status or authority."}
                          </p>
                        </div>
                      </Link>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="setting-cntr">
                      <Link to="qareports" className="setting-box">
                        <div className="setting-icons icon-small">
                          <img src={reports} alt="reports" />
                        </div>
                        <div className="setting-desc">
                          <strong>
                            {TranslationContext !== undefined
                              ? TranslationContext.strong.reports
                              : "Reports"}
                          </strong>
                          <p>
                            {TranslationContext !== undefined
                              ? TranslationContext.p
                                  .asysteminwhichmembersofanorganizationorsocietyarerankedaccordingtorelativestatusorauthority
                              : "A system in which members of an organization or society are ranked according to relative status or authority."}
                          </p>
                        </div>
                      </Link>
                      <Link to="fileuploadlogs" className="setting-box">
                        <div className="setting-icons">
                          <img src={fileUpload} alt="file-upload" />
                        </div>
                        <div className="setting-desc">
                          <strong>
                            {TranslationContext !== undefined
                              ? TranslationContext.strong.fileuploadlogs
                              : "File Upload Logs"}
                          </strong>
                          <p>
                            {TranslationContext !== undefined
                              ? TranslationContext.p
                                  .asysteminwhichmembersofanorganizationorsocietyarerankedaccordingtorelativestatusorauthority
                              : "A system in which members of an organization or society are ranked according to relative status or authority."}
                          </p>
                        </div>
                      </Link>
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
                          <strong>
                            {TranslationContext !== undefined
                              ? TranslationContext.strong.elements
                              : "Elements"}
                          </strong>
                          <p>
                            {TranslationContext !== undefined
                              ? TranslationContext.p
                                  .asysteminwhichmembersofanorganizationorsocietyarerankedaccordingtorelativestatusorauthority
                              : "A system in which members of an organization or society are ranked according to relative status or authority."}
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
                          <strong>
                            {TranslationContext !== undefined
                              ? TranslationContext.strong.language
                              : "Language"}
                          </strong>
                          <p>
                            {TranslationContext !== undefined
                              ? TranslationContext.p
                                  .asysteminwhichmembersofanorganizationorsocietyarerankedaccordingtorelativestatusorauthority
                              : "A system in which members of an organization or society are ranked according to relative status or authority."}
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
                          <strong>
                            {TranslationContext !== undefined
                              ? TranslationContext.strong.theme
                              : "Theme"}
                          </strong>
                          <p>
                            {TranslationContext !== undefined
                              ? TranslationContext.p
                                  .asysteminwhichmembersofanorganizationorsocietyarerankedaccordingtorelativestatusorauthority
                              : "A system in which members of an organization or society are ranked according to relative status or authority."}
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
                          <strong>
                            {TranslationContext !== undefined
                              ? TranslationContext.strong.rules
                              : "Rules"}
                          </strong>
                          <p>
                            {TranslationContext !== undefined
                              ? TranslationContext.p
                                  .asysteminwhichmembersofanorganizationorsocietyarerankedaccordingtorelativestatusorauthority
                              : "A system in which members of an organization or society are ranked according to relative status or authority."}
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
                          <strong>
                            {TranslationContext !== undefined
                              ? TranslationContext.strong.configuration
                              : "Configuration"}
                          </strong>
                          <p>
                            {TranslationContext !== undefined
                              ? TranslationContext.p
                                  .asysteminwhichmembersofanorganizationorsocietyarerankedaccordingtorelativestatusorauthority
                              : "A system in which members of an organization or society are ranked according to relative status or authority."}
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
