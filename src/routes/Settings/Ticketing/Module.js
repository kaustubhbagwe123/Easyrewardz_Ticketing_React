import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import Demo from "../../../store/Hashtag";
import { Tabs, Tab } from "react-bootstrap-tabs";
import "react-rangeslider/lib/index.css";
import { authHeader } from "./../../../helpers/authHeader";
import axios from "axios";
import config from "./../../../helpers/config";
import { NotificationManager } from "react-notifications";
import * as translationHI from "../../../translations/hindi";
import * as translationMA from "../../../translations/marathi";

class Module extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: 10,
      modulesNames: [],
      modulesItems: [],
      moduleID: 0,
      activeID: [],
      inactiveID: [],
      moduleIDMyticket: 0,
      modulesItemsMyticket: [],
      selTab: "",
      loading: false,
      translateLanguage: {},
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleGetModulesNames = this.handleGetModulesNames.bind(this);
    this.handleGetModulesItems = this.handleGetModulesItems.bind(this);
    this.handleGetModulesItemsMyTicket = this.handleGetModulesItemsMyTicket.bind(
      this
    );
    this.handleUpdatedModule = this.handleUpdatedModule.bind(this);
  }

  handleChange(value) {
    this.setState({
      value: value,
    });
  }

  componentDidMount() {
    this.handleGetModulesNames();
    if (window.localStorage.getItem("translateLanguage") === "hindi") {
      this.state.translateLanguage = translationHI;
    } else if (window.localStorage.getItem("translateLanguage") === "marathi") {
      this.state.translateLanguage = translationMA;
    } else {
      this.state.translateLanguage = {};
    }
  }

  checkModule = async (moduleItemID, moduleID) => {
    var activeIds = [];
    var inactiveIds = [];
    let modulesItems = [...this.state.modulesItems],
      isActive;
    for (let i = 0; i < modulesItems.length; i++) {
      if (modulesItems[i].moduleItemID === moduleItemID) {
        isActive = modulesItems[i].moduleItemisActive;
        modulesItems[i].moduleItemisActive = !isActive;
      }
    }
    for (let i = 0; i < modulesItems.length; i++) {
      if (modulesItems[i].moduleItemisActive === true) {
        var MID = modulesItems[i].moduleItemID;
        activeIds.push(MID);
      } else {
        var ids = modulesItems[i].moduleItemID;
        inactiveIds.push(ids);
      }
    }
    await this.setState({
      modulesItems,
      activeID: activeIds,
      inactiveID: inactiveIds,
    });
    this.handleUpdatedModule(moduleID);
  };

  checkModuleMyTicket = async (moduleItemID, moduleID) => {
    var activeIds = [];
    var inactiveIds = [];
    let modulesItemsMyticket = [...this.state.modulesItemsMyticket],
      isActive;
    for (let i = 0; i < modulesItemsMyticket.length; i++) {
      if (modulesItemsMyticket[i].moduleItemID === moduleItemID) {
        isActive = modulesItemsMyticket[i].moduleItemisActive;
        modulesItemsMyticket[i].moduleItemisActive = !isActive;
      }
    }
    for (let i = 0; i < modulesItemsMyticket.length; i++) {
      if (modulesItemsMyticket[i].moduleItemisActive === true) {
        var MId = modulesItemsMyticket[i].moduleItemID;
        activeIds.push(MId);
      } else {
        var ids = modulesItemsMyticket[i].moduleItemID;
        inactiveIds.push(ids);
      }
    }

    await this.setState({
      activeID: activeIds,
      inactiveID: inactiveIds,
    });
    this.handleUpdatedModule(moduleID);
  };

  changeModuleTab = async (moduleID) => {
    await this.setState({
      moduleID,
    });
    this.handleGetModulesItems();
  };

  handleUpdatedModule(id) {
    const TranslationContext = this.state.translateLanguage.default;
    let self = this;
    var activeitem = "";
    var inactiveitem = "";

    if (this.state.activeID !== null) {
      for (let i = 0; i < this.state.activeID.length; i++) {
        activeitem += this.state.activeID[i] + ",";
      }
    }

    if (this.state.inactiveID !== null) {
      for (let i = 0; i < this.state.inactiveID.length; i++) {
        inactiveitem += this.state.inactiveID[i] + ",";
      }
    }
    activeitem = activeitem.substring(0, activeitem.length - 1);
    inactiveitem = inactiveitem.substring(0, inactiveitem.length - 1);
    axios({
      method: "post",
      url: config.apiUrl + "/Module/ModifyModuleItems",
      headers: authHeader(),
      params: {
        ModuleID: id,
        ModulesActive: activeitem,
        ModuleInactive: inactiveitem,
      },
    })
      .then(function(res) {
        let Msg = res.data.message;
        if (Msg === "Success") {
          NotificationManager.success(
            TranslationContext !== undefined
              ? TranslationContext.alertmessage.recordupdatedsuccessfully
              : "Record Updated successfully."
          );
        } else {
          NotificationManager.error(
            TranslationContext !== undefined
              ? TranslationContext.alertmessage.recordnotupdated
              : "Record Not Updated."
          );
        }
        self.setState({
          activeID: [],
          inactiveID: [],
        });
      })
      .catch((data) => {
        console.log(data);
      });
  }

  handleGetModulesNames() {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/Module/GetModules",
      headers: authHeader(),
    })
      .then(function(res) {
        let status = res.data.message;
        let data = res.data.responseData;
        let moduleID = data[0].moduleID;
        let selTab = data[0].moduleName;
        let moduleIDMyticket = data[1].moduleID;
        if (status === "Success") {
          self.setState({
            modulesNames: data,
            moduleID,
            moduleIDMyticket,
            selTab,
          });
        } else {
          self.setState({ modulesNames: [] });
        }
        self.handleGetModulesItems();
        self.handleGetModulesItemsMyTicket();
      })
      .catch((data) => {
        console.log(data);
      });
  }
  handleGetModulesItems() {
    let self = this;
    self.setState({ loading: true });
    axios({
      method: "post",
      url: config.apiUrl + "/Module/GetModulesItems",
      headers: authHeader(),
      params: {
        ModuleID: this.state.moduleID,
      },
    })
      .then(function(res) {
        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success") {
          self.setState({ modulesItems: data, loading: false });
        } else {
          self.setState({ modulesItems: [], loading: false });
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }
  handleGetModulesItemsMyTicket() {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/Module/GetModulesItems",
      headers: authHeader(),
      params: {
        ModuleID: this.state.moduleIDMyticket,
      },
    })
      .then(function(res) {
        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success") {
          self.setState({ modulesItemsMyticket: data });
        } else {
          self.setState({ modulesItemsMyticket: [] });
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }

  onModulesChange = async (moduleName) => {
    let selectedArray = this.state.modulesNames.filter(
      (x) => x.moduleName === moduleName
    );
    await this.setState({
      moduleID: selectedArray[0].moduleID,
      selTab: moduleName,
    });
    this.handleGetModulesItems();
  };

  render() {
    const TranslationContext = this.state.translateLanguage.default;
    return (
      <Fragment>
        <div className="container-fluid setting-title setting-breadcrumb">
          <Link to="settings" className="header-path">
            {TranslationContext !== undefined
              ? TranslationContext.link.setting
              : "Settings"}
          </Link>
          <span>&gt;</span>
          <Link to="settings" className="header-path">
            {TranslationContext !== undefined
              ? TranslationContext.a.ticketing
              : "Ticketing"}
          </Link>
          <span>&gt;</span>
          <Link to={Demo.BLANK_LINK} className="active header-path">
            {TranslationContext !== undefined
              ? TranslationContext.strong.modules
              : "Modules"}
          </Link>
        </div>

        <div className="paddmodule">
          <div className="module-tabs">
            <section>
              {this.state.modulesNames.length > 0 && (
                <Tabs
                  onSelect={(index, label) => this.onModulesChange(label)}
                  selected={this.state.selTab}
                >
                  {this.state.modulesNames !== null &&
                    this.state.modulesNames.map((name, i) => (
                      <Tab label={name.moduleName} key={i}>
                        <div className="switch switch-primary">
                          <label className="moduleswitchtext-main">
                            {TranslationContext !== undefined
                              ? TranslationContext.label.fieldname
                              : "Field Name"}
                          </label>
                          <label className="moduleswitchtext-main1">
                            {TranslationContext !== undefined
                              ? TranslationContext.label.showhide
                              : "Show/Hide"}
                          </label>
                        </div>

                        {this.state.loading ? (
                          <div className="loader-icon-cntr">
                            <div className="loader-icon"></div>
                          </div>
                        ) : (
                          this.state.modulesItems !== null &&
                          this.state.modulesItems.map((item, i) => (
                            <div className="module-switch" key={i}>
                              <div className="switch switch-primary">
                                <label className="moduleswitchtext">
                                  {item.moduleItemName}
                                </label>
                                <input
                                  name="moduleItems"
                                  checked={item.moduleItemisActive}
                                  type="checkbox"
                                  id={"i" + item.moduleItemID}
                                  onChange={this.checkModule.bind(
                                    this,
                                    item.moduleItemID,
                                    name.moduleID
                                  )}
                                />
                                <label
                                  htmlFor={"i" + item.moduleItemID}
                                  className="cr"
                                ></label>
                              </div>
                            </div>
                          ))
                        )}
                      </Tab>
                    ))}
                </Tabs>
              )}
            </section>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Module;
