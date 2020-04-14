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
// import Demo from "../../store/Hashtag";
import { Link } from "react-router-dom";
import { MyContext } from './../../context'

class Settings extends Component {

  componentDidMount() {
    debugger;
    if (this.props.location.tabName) {
      let lowerTabsPane = document.querySelectorAll(
        ".tab-pane"
      );
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
        if ("#" + this.props.location.tabName === upperTabs[i].getAttribute('href')) {
          upperTabs[i].classList.add("active");
        }
      }
  }
  }

  render() {
    const TranslationContext = this.context.state.translateLanguage.default
    return (
      <React.Fragment>
        <div className="container-fluid setting-title">
          <div className="setmainscreen">
          
          {
                    (() => {
                      if (TranslationContext!==undefined) {
                      return TranslationContext.div.setting
                      }
                    else{
                      return "Setting"
                    }
                    })()
                  }
          </div>
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
                  
                  {
                    (() => {
                      if (TranslationContext!==undefined) {
                      return TranslationContext.a.ticketing
                      }
                    else{
                      return "Ticketing"
                    }
                    })()
                  }
                </a>
              </li>
              {/* <li className="nav-item">
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
              </li> */}
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
                className="tab-pane fade show active"
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
                          {
                    (() => {
                      if (TranslationContext!==undefined) {
                      return TranslationContext.strong.hierarchy
                      }
                    else{
                      return "Hierarchy"
                    }
                    })()
                  }
                          </strong>
                          <p>
                            
                            {
                    (() => {
                      if (TranslationContext!==undefined) {
                      return TranslationContext.p.setdesc
                      }
                    else{
                      return "A system in which members of an organization or society are ranked according to relative status or authority."
                    }
                    })()
                  }
                          </p>
                        </div>
                      </Link>
                      <Link to="brands" className="setting-box">
                        <div className="setting-icons">
                          <img src={brand} alt="brand" />
                        </div>
                        <div className="setting-desc">
                          <strong>
                          {
                    (() => {
                      if (TranslationContext!==undefined) {
                      return TranslationContext.strong.brand
                      }
                    else{
                      return "Brand"
                    }
                    })()
                  }
                          </strong>
                          <p>
                            
                            {
                    (() => {
                      if (TranslationContext!==undefined) {
                      return TranslationContext.p.setdesc
                      }
                    else{
                      return "A system in which members of an organization or society are ranked according to relative status or authority."
                    }
                    })()
                  }
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
                          <strong>
                          {
                    (() => {
                      if (TranslationContext!==undefined) {
                      return TranslationContext.strong.store
                      }
                    else{
                      return "Store"
                    }
                    })()
                  }
                          </strong>
                          <p>
                            
                            {
                    (() => {
                      if (TranslationContext!==undefined) {
                      return TranslationContext.p.setdesc
                      }
                    else{
                      return "A system in which members of an organization or society are ranked according to relative status or authority."
                    }
                    })()
                  }
                          </p>
                        </div>
                      </Link>
                      <Link to="categoryMaster" className="setting-box">
                        <div className="setting-icons">
                          <img src={category} alt="category" />
                        </div>
                        <div className="setting-desc">
                          <strong>
                          {
                    (() => {
                      if (TranslationContext!==undefined) {
                      return TranslationContext.strong.category
                      }
                    else{
                      return "Category"
                    }
                    })()
                  }
                          </strong>
                         <p>
                            
                            {
                    (() => {
                      if (TranslationContext!==undefined) {
                      return TranslationContext.p.setdesc
                      }
                    else{
                      return "A system in which members of an organization or society are ranked according to relative status or authority."
                    }
                    })()
                  }
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
                          {
                    (() => {
                      if (TranslationContext!==undefined) {
                      return TranslationContext.strong.priority
                      }
                    else{
                      return "Priority"
                    }
                    })()
                  }
                          </strong>
                          <p>
                            
                            {
                    (() => {
                      if (TranslationContext!==undefined) {
                      return TranslationContext.p.setdesc
                      }
                    else{
                      return "A system in which members of an organization or society are ranked according to relative status or authority."
                    }
                    })()
                  }
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
                            
                            {
                    (() => {
                      if (TranslationContext!==undefined) {
                      return TranslationContext.p.setdesc
                      }
                    else{
                      return "A system in which members of an organization or society are ranked according to relative status or authority."
                    }
                    })()
                  }
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
                          {
                    (() => {
                      if (TranslationContext!==undefined) {
                      return TranslationContext.strong.users
                      }
                    else{
                      return "Users"
                    }
                    })()
                  }
                          </strong>
                         <p>
                            
                            {
                    (() => {
                      if (TranslationContext!==undefined) {
                      return TranslationContext.p.setdesc
                      }
                    else{
                      return "A system in which members of an organization or society are ranked according to relative status or authority."
                    }
                    })()
                  }
                          </p>
                        </div>
                      </Link>
                      <Link to="ticketCRMRole" className="setting-box">
                        <div className="setting-icons">
                          <img src={crmRoles} alt="crm-roles" />
                        </div>
                        <div className="setting-desc">
                          <strong>
                          {
                    (() => {
                      if (TranslationContext!==undefined) {
                      return TranslationContext.strong.crmroles
                      }
                    else{
                      return "CRM Roles"
                    }
                    })()
                  }
                          </strong>
                          <p>
                            
                            {
                    (() => {
                      if (TranslationContext!==undefined) {
                      return TranslationContext.p.setdesc
                      }
                    else{
                      return "A system in which members of an organization or society are ranked according to relative status or authority."
                    }
                    })()
                  }
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
                          {
                    (() => {
                      if (TranslationContext!==undefined) {
                      return TranslationContext.strong.alerts
                      }
                    else{
                      return "Alerts"
                    }
                    })()
                  }
                          </strong>
                          <p>
                            
                            {
                    (() => {
                      if (TranslationContext!==undefined) {
                      return TranslationContext.p.setdesc
                      }
                    else{
                      return "A system in which members of an organization or society are ranked according to relative status or authority."
                    }
                    })()
                  }
                          </p>
                        </div>
                      </Link>
                      <Link to="templates" className="setting-box">
                        <div className="setting-icons icon-small">
                          <img src={templates} alt="templates" />
                        </div>
                        <div className="setting-desc">
                          <strong>
                          {
                    (() => {
                      if (TranslationContext!==undefined) {
                      return TranslationContext.strong.templates
                      }
                    else{
                      return "Templates"
                    }
                    })()
                  }
                          
                          </strong>
                         <p>
                            
                            {
                    (() => {
                      if (TranslationContext!==undefined) {
                      return TranslationContext.p.setdesc
                      }
                    else{
                      return "A system in which members of an organization or society are ranked according to relative status or authority."
                    }
                    })()
                  }
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
                          
                          {
                    (() => {
                      if (TranslationContext!==undefined) {
                      return TranslationContext.strong.reports
                      }
                    else{
                      return "Reports"
                    }
                    })()
                  }
                          </strong>
                          <p>
                            
                            {
                    (() => {
                      if (TranslationContext!==undefined) {
                      return TranslationContext.p.setdesc
                      }
                    else{
                      return "A system in which members of an organization or society are ranked according to relative status or authority."
                    }
                    })()
                  }
                          </p>
                        </div>
                      </Link>
                      <Link to="module" className="setting-box">
                        <div className="setting-icons">
                          <img src={modules} alt="modules" />
                        </div>
                        <div className="setting-desc">
                          <strong>
                          {
                    (() => {
                      if (TranslationContext!==undefined) {
                      return TranslationContext.strong.modules
                      }
                    else{
                      return "Modules"
                    }
                    })()
                  }
                          </strong>
                          <p>
                            
                            {
                    (() => {
                      if (TranslationContext!==undefined) {
                      return TranslationContext.p.setdesc
                      }
                    else{
                      return "A system in which members of an organization or society are ranked according to relative status or authority."
                    }
                    })()
                  }
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
                          {
                    (() => {
                      if (TranslationContext!==undefined) {
                      return TranslationContext.strong.fileupload
                      }
                    else{
                      return "File Upload Logs"
                    }
                    })()
                  }
                          </strong>
                         <p>
                            
                            {
                    (() => {
                      if (TranslationContext!==undefined) {
                      return TranslationContext.p.setdesc
                      }
                    else{
                      return "A system in which members of an organization or society are ranked according to relative status or authority."
                    }
                    })()
                  }
                          </p>
                        </div>
                      </Link>
                      <Link to="blockedemail" className="setting-box">
                        <div className="setting-icons">
                          <img src={fileUpload} alt="file-upload" />
                        </div>
                        <div className="setting-desc">
                          <strong>
                          {
                    (() => {
                      if (TranslationContext!==undefined) {
                      return TranslationContext.strong.blockemailid
                      }
                    else{
                      return "Blocked Email Id"
                    }
                    })()
                  }
                          </strong>
                          <p>
                            
                            {
                    (() => {
                      if (TranslationContext!==undefined) {
                      return TranslationContext.p.setdesc
                      }
                    else{
                      return "A system in which members of an organization or society are ranked according to relative status or authority."
                    }
                    })()
                  }
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
                          {
                    (() => {
                      if (TranslationContext!==undefined) {
                      return TranslationContext.strong.junkwords
                      }
                    else{
                      return "Junk Words"
                    }
                    })()
                  }
                          </strong>
                          <p>
                            
                            {
                    (() => {
                      if (TranslationContext!==undefined) {
                      return TranslationContext.p.setdesc
                      }
                    else{
                      return "A system in which members of an organization or society are ranked according to relative status or authority."
                    }
                    })()
                  }
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
                      <Link to="/store/hierarchyMaster" className="setting-box">
                        <div className="setting-icons">
                          <img src={hierarchy} alt="hierarchy" />
                        </div>
                        <div className="setting-desc">
                          <strong>
                          {
                    (() => {
                      if (TranslationContext!==undefined) {
                      return TranslationContext.strong.hierarchymaster
                      }
                    else{
                      return "Hierarchy Master"
                    }
                    })()
                  }
                          </strong>
                          <p>
                            
                            {
                    (() => {
                      if (TranslationContext!==undefined) {
                      return TranslationContext.p.setdesc
                      }
                    else{
                      return "A system in which members of an organization or society are ranked according to relative status or authority."
                    }
                    })()
                  }
                          </p>
                        </div>
                      </Link>
                      <Link to="/store/itemMaster" className="setting-box">
                        <div className="setting-icons icon-small">
                          <img src={item} alt="item" />
                        </div>
                        <div className="setting-desc">
                          <strong>
                          {
                    (() => {
                      if (TranslationContext!==undefined) {
                      return TranslationContext.strong.itemmaster
                      }
                    else{
                      return "Item Master"
                    }
                    })()
                  }
                          </strong>
                          <p>
                            
                            {
                    (() => {
                      if (TranslationContext!==undefined) {
                      return TranslationContext.p.setdesc
                      }
                    else{
                      return "A system in which members of an organization or society are ranked according to relative status or authority."
                    }
                    })()
                  }
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
                          {
                    (() => {
                      if (TranslationContext!==undefined) {
                      return TranslationContext.strong.department
                      }
                    else{
                      return "Department"
                    }
                    })()
                  }
                          </strong>
                         <p>
                            
                            {
                    (() => {
                      if (TranslationContext!==undefined) {
                      return TranslationContext.p.setdesc
                      }
                    else{
                      return "A system in which members of an organization or society are ranked according to relative status or authority."
                    }
                    })()
                  }
                          </p>
                        </div>
                      </Link>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="setting-cntr">
                      <Link to="/store/storePriority" className="setting-box">
                        <div className="setting-icons">
                          <img src={priority} alt="priority" />
                        </div>
                        <div className="setting-desc">
                          <strong>Priority 
                          {
                    (() => {
                      if (TranslationContext!==undefined) {
                      return TranslationContext.strong.master
                      }
                    else{
                      return "Master"
                    }
                    })()
                  }
                          </strong>
                         <p>
                            
                            {
                    (() => {
                      if (TranslationContext!==undefined) {
                      return TranslationContext.p.setdesc
                      }
                    else{
                      return "A system in which members of an organization or society are ranked according to relative status or authority."
                    }
                    })()
                  }
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
                          {
                    (() => {
                      if (TranslationContext!==undefined) {
                      return TranslationContext.strong.templatesdept
                      }
                    else{
                      return "SLA Template-Department"
                    }
                    })()
                  }
                          </strong>
                          <p>
                            
                            {
                    (() => {
                      if (TranslationContext!==undefined) {
                      return TranslationContext.p.setdesc
                      }
                    else{
                      return "A system in which members of an organization or society are ranked according to relative status or authority."
                    }
                    })()
                  }
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
                          {
                    (() => {
                      if (TranslationContext!==undefined) {
                      return TranslationContext.strong.categorymaster
                      }
                    else{
                      return "Claim Category Master"
                    }
                    })()
                  }
                          </strong>
                          <p>
                            
                            {
                    (() => {
                      if (TranslationContext!==undefined) {
                      return TranslationContext.p.setdesc
                      }
                    else{
                      return "A system in which members of an organization or society are ranked according to relative status or authority."
                    }
                    })()
                  }
                          </p>
                        </div>
                      </Link>
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
                          
                          {
                    (() => {
                      if (TranslationContext!==undefined) {
                      return TranslationContext.strong.crmroles
                      }
                    else{
                      return "CRM Roles"
                    }
                    })()
                  }
                          </strong>
                          <p>
                            
                            {
                    (() => {
                      if (TranslationContext!==undefined) {
                      return TranslationContext.p.setdesc
                      }
                    else{
                      return "A system in which members of an organization or society are ranked according to relative status or authority."
                    }
                    })()
                  }
                          </p>
                        </div>
                      </Link>
                      <Link to="/store/storeusers" className="setting-box">
                        <div className="setting-icons big-icon">
                          <img src={users} alt="users" />
                        </div>
                        <div className="setting-desc">
                          <strong>
                          {
                    (() => {
                      if (TranslationContext!==undefined) {
                      return TranslationContext.strong.users
                      }
                    else{
                      return "Users"
                    }
                    })()
                  }
                          </strong>
                          <p>
                            
                            {
                    (() => {
                      if (TranslationContext!==undefined) {
                      return TranslationContext.p.setdesc
                      }
                    else{
                      return "A system in which members of an organization or society are ranked according to relative status or authority."
                    }
                    })()
                  }
                          </p>
                        </div>
                      </Link>
                      <Link to="/store/storeAlerts" className="setting-box">
                        <div className="setting-icons icon-small">
                          <img src={alert} alt="alert" />
                        </div>
                        <div className="setting-desc">
                          <strong>
                          {
                    (() => {
                      if (TranslationContext!==undefined) {
                      return TranslationContext.strong.alerts
                      }
                    else{
                      return "Alerts"
                    }
                    })()
                  }
                          </strong>
                         <p>
                            
                            {
                    (() => {
                      if (TranslationContext!==undefined) {
                      return TranslationContext.p.setdesc
                      }
                    else{
                      return "A system in which members of an organization or society are ranked according to relative status or authority."
                    }
                    })()
                  }
                          </p>
                        </div>
                      </Link>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="setting-cntr">
                      <Link to="/store/storereports" className="setting-box">
                        <div className="setting-icons icon-small">
                          <img src={reports} alt="reports" />
                        </div>
                        <div className="setting-desc">
                          <strong>
                          {
                    (() => {
                      if (TranslationContext!==undefined) {
                      return TranslationContext.strong.reports
                      }
                    else{
                      return "Reports"
                    }
                    })()
                  }
                          </strong>
                          <p>
                            
                            {
                    (() => {
                      if (TranslationContext!==undefined) {
                      return TranslationContext.p.setdesc
                      }
                    else{
                      return "A system in which members of an organization or society are ranked according to relative status or authority."
                    }
                    })()
                  }
                          </p>
                        </div>
                      </Link>
                      <Link to="/store/storeModule" className="setting-box">
                        <div className="setting-icons">
                          <img src={modules} alt="modules" />
                        </div>
                        <div className="setting-desc">
                          <strong>
                          {
                    (() => {
                      if (TranslationContext!==undefined) {
                      return TranslationContext.strong.modulesettings
                      }
                    else{
                      return "Module Settings"
                    }
                    })()
                  }
                          </strong>
                         <p>
                            
                            {
                    (() => {
                      if (TranslationContext!==undefined) {
                      return TranslationContext.p.setdesc
                      }
                    else{
                      return "A system in which members of an organization or society are ranked according to relative status or authority."
                    }
                    })()
                  }
                          </p>
                        </div>
                      </Link>
                      <Link to="fileuploadlogs" className="setting-box">
                        <div className="setting-icons">
                          <img src={fileUpload} alt="file-upload" />
                        </div>
                        <div className="setting-desc">
                          <strong>
                          {
                    (() => {
                      if (TranslationContext!==undefined) {
                      return TranslationContext.strong.fileUpload
                      }
                    else{
                      return "File Upload Logs"
                    }
                    })()
                  }
                          </strong>
                         <p>
                            
                            {
                    (() => {
                      if (TranslationContext!==undefined) {
                      return TranslationContext.p.setdesc
                      }
                    else{
                      return "A system in which members of an organization or society are ranked according to relative status or authority."
                    }
                    })()
                  }
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
                          <strong>
                          {
                    (() => {
                      if (TranslationContext!==undefined) {
                      return TranslationContext.strong.hierarchy
                      }
                    else{
                      return "Hierarchy"
                    }
                    })()
                  }
                          </strong>
                          <p>
                            
                            {
                    (() => {
                      if (TranslationContext!==undefined) {
                      return TranslationContext.p.setdesc
                      }
                    else{
                      return "A system in which members of an organization or society are ranked according to relative status or authority."
                    }
                    })()
                  }
                          </p>
                        </div>
                      </Link>
                      <Link to="qaCRMRoles" className="setting-box">
                        <div className="setting-icons">
                          <img src={crmRoles} alt="crm-roles" />
                        </div>
                        <div className="setting-desc">
                          <strong>
                          {
                    (() => {
                      if (TranslationContext!==undefined) {
                      return TranslationContext.strong.crmroles
                      }
                    else{
                      return "CRM Roles"
                    }
                    })()
                  }
                          </strong>
                          <p>
                            
                            {
                    (() => {
                      if (TranslationContext!==undefined) {
                      return TranslationContext.p.setdesc
                      }
                    else{
                      return "A system in which members of an organization or society are ranked according to relative status or authority."
                    }
                    })()
                  }
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
                          {
                    (() => {
                      if (TranslationContext!==undefined) {
                      return TranslationContext.strong.users
                      }
                    else{
                      return "Users"
                    }
                    })()
                  }
                          </strong>
                          <p>
                            
                            {
                    (() => {
                      if (TranslationContext!==undefined) {
                      return TranslationContext.p.setdesc
                      }
                    else{
                      return "A system in which members of an organization or society are ranked according to relative status or authority."
                    }
                    })()
                  }
                          </p>
                        </div>
                      </Link>
                      <Link to="QaAuditParameters" className="setting-box">
                        <div className="setting-icons icon-small">
                          <img src={audit} alt="audit" />
                        </div>
                        <div className="setting-desc">
                          <strong>
                          {
                    (() => {
                      if (TranslationContext!==undefined) {
                      return TranslationContext.strong.auditparameters
                      }
                    else{
                      return "Audit Parameters"
                    }
                    })()
                  }
                          </strong>
                          <p>
                            
                            {
                    (() => {
                      if (TranslationContext!==undefined) {
                      return TranslationContext.p.setdesc
                      }
                    else{
                      return "A system in which members of an organization or society are ranked according to relative status or authority."
                    }
                    })()
                  }
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
                          {
                    (() => {
                      if (TranslationContext!==undefined) {
                      return TranslationContext.strong.reports
                      }
                    else{
                      return "Reports"
                    }
                    })()
                  }
                          </strong>
                          <p>
                            
                            {
                    (() => {
                      if (TranslationContext!==undefined) {
                      return TranslationContext.p.setdesc
                      }
                    else{
                      return "A system in which members of an organization or society are ranked according to relative status or authority."
                    }
                    })()
                  }
                          </p>
                        </div>
                      </Link>
                      <Link to="fileuploadlogs" className="setting-box">
                        <div className="setting-icons">
                          <img src={fileUpload} alt="file-upload" />
                        </div>
                        <div className="setting-desc">
                          <strong>
                          {
                    (() => {
                      if (TranslationContext!==undefined) {
                      return TranslationContext.strong.fileupload
                      }
                    else{
                      return "File Upload Logs"
                    }
                    })()
                  }
                          </strong>
                          <p>
                            
                            {
                    (() => {
                      if (TranslationContext!==undefined) {
                      return TranslationContext.p.setdesc
                      }
                    else{
                      return "A system in which members of an organization or society are ranked according to relative status or authority."
                    }
                    })()
                  }
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
                          {
                    (() => {
                      if (TranslationContext!==undefined) {
                      return TranslationContext.strong.elements
                      }
                    else{
                      return "Elements"
                    }
                    })()
                  }
                          </strong>
                          <p>
                            
                            {
                    (() => {
                      if (TranslationContext!==undefined) {
                      return TranslationContext.p.setdesc
                      }
                    else{
                      return "A system in which members of an organization or society are ranked according to relative status or authority."
                    }
                    })()
                  }
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
                          {
                    (() => {
                      if (TranslationContext!==undefined) {
                      return TranslationContext.strong.language
                      }
                    else{
                      return "Language"
                    }
                    })()
                  }
                          </strong>
                          <p>
                            
                            {
                    (() => {
                      if (TranslationContext!==undefined) {
                      return TranslationContext.p.setdesc
                      }
                    else{
                      return "A system in which members of an organization or society are ranked according to relative status or authority."
                    }
                    })()
                  }
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
                          {
                    (() => {
                      if (TranslationContext!==undefined) {
                      return TranslationContext.strong.theme
                      }
                    else{
                      return "Theme"
                    }
                    })()
                  }
                          </strong>
                          <p>
                            
                            {
                    (() => {
                      if (TranslationContext!==undefined) {
                      return TranslationContext.p.setdesc
                      }
                    else{
                      return "A system in which members of an organization or society are ranked according to relative status or authority."
                    }
                    })()
                  }
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
                          {
                    (() => {
                      if (TranslationContext!==undefined) {
                      return TranslationContext.strong.rules
                      }
                    else{
                      return "Rules"
                    }
                    })()
                  }
                          </strong>
                          <p>
                            
                            {
                    (() => {
                      if (TranslationContext!==undefined) {
                      return TranslationContext.p.setdesc
                      }
                    else{
                      return "A system in which members of an organization or society are ranked according to relative status or authority."
                    }
                    })()
                  }
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
                          {
                    (() => {
                      if (TranslationContext!==undefined) {
                      return TranslationContext.strong.configuration
                      }
                    else{
                      return "Configuration"
                    }
                    })()
                  }
                          </strong>
                         <p>
                            
                            {
                    (() => {
                      if (TranslationContext!==undefined) {
                      return TranslationContext.p.setdesc
                      }
                    else{
                      return "A system in which members of an organization or society are ranked according to relative status or authority."
                    }
                    })()
                  }
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
Settings.contextType = MyContext;
export default Settings;
