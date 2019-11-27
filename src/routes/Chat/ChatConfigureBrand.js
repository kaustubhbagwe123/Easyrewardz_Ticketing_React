import React, { Component, Fragment } from "react";
import Demo from "./../../store/Hashtag.js";
import { Link } from "react-router-dom";
import ChatTheme from "./../../assets/Images/chattheme.png";
import ChatTheme1 from "./../../assets/Images/chattheme1.png";
import ChatBataLogo from "./../../assets/Images/chatbatalogo.png";
import PlusPopUp from "./../../assets/Images/Pluspopup.png";
import Modal from "react-responsive-modal";

class ChatConfigureBrand extends Component {
  constructor(props) {
    super(props);

    this.state = {
      PlusButtonModal: false
    };
  }

  HandlePlusButtonModalOpen() {
    this.setState({ PlusButtonModal: true });
  }
  HandlePlusButtonModalClose() {
    this.setState({ PlusButtonModal: false });
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
            Chat
          </Link>
          <span>&gt;</span>
          <Link to={Demo.BLANK_LINK} className="active header-path">
            Configure Brand
          </Link>
        </div>

        <div className="container-fluid">
          <div className="setting-chat-config">
            <div className="row">
              <div className="col-md-4 chat-config-center">
                <div className="table-cntr table-height">
                  <div className="createHierarchyMask">
                    <div className="chatconfigpadding">
                      <label className="create-department">CREATE BRAND</label>
                      <div className="divSpace">
                        <div className="">
                          <label className="designation-name">Brand Code</label>
                          <input
                            type="text"
                            className="txt-1"
                            placeholder="Enter Brand Code"
                          />
                        </div>
                      </div>
                      <div className="divSpace">
                        <div className="">
                          <label className="reports-to">Brand Name</label>
                          <input
                            type="text"
                            className="txt-1"
                            placeholder="Enter Brand Name"
                          />
                        </div>
                      </div>

                      <div className="divSpace">
                        <div className="">
                          <label className="reports-to">Brand Logo</label>
                          <input
                            type="file"
                            className="txt-1"
                            placeholder="Enter Language Name"
                          />
                        </div>
                      </div>

                      <div className="bataimgborder">
                        <div className="">
                          <img
                            src={ChatBataLogo}
                            alt="store-settings"
                            className="ChatBataLogo"
                          />
                        </div>
                      </div>

                      <div className="divSpace">
                        <div className="">
                          <label className="reports-to">Language</label>
                          <select className="txt-1 edit-dropDwon dropdown-setting">
                            <option>Active</option>
                            <option>Inactive</option>
                          </select>
                        </div>
                      </div>

                      <div className="divSpace">
                        <div className="">
                          <label className="reports-to">Theme</label>
                          <div className="ChatThemeflex">
                            <div>
                              <img
                                src={ChatTheme}
                                alt="store-settings"
                                className="ChatConfigtheme"
                              />
                              <label>Theme1</label>
                            </div>
                            <div>
                              <img
                                src={ChatTheme1}
                                alt="store-settings"
                                className="ChatConfigtheme"
                              />
                              <label>Theme2</label>
                            </div>
                            <div>
                              <img
                                src={PlusPopUp}
                                alt="store-settings"
                                className="ChatConfigthemelast"
                                onClick={this.HandlePlusButtonModalOpen.bind(
                                  this
                                )}
                              />
                              <Modal
                                open={this.state.PlusButtonModal}
                                onClose={this.HandlePlusButtonModalClose.bind(
                                  this
                                )}
                                modalId="pluspopup"
                                overlayId="logout-ovrly"
                              >
                                <div className="chatconfigpadding">
                                  <label className="create-department">
                                    ADD THEME
                                  </label>
                                  <div className="divSpace">
                                    <div className="">
                                      <label className="designation-name">
                                        Theme Code
                                      </label>
                                      <input
                                        type="text"
                                        className="txt-1"
                                        placeholder="Enter Brand Code"
                                      />
                                    </div>
                                  </div>
                                  <div className="divSpace">
                                    <div className="">
                                      <label className="reports-to">
                                        Theme Name
                                      </label>
                                      <input
                                        type="text"
                                        className="txt-1"
                                        placeholder="Enter Brand Name"
                                      />
                                    </div>
                                  </div>
                                  <div className="divSpace">
                                    <div className="">
                                      <label className="reports-to">
                                        Theme Style(CSS File Only)
                                      </label>
                                      <input
                                        type="file"
                                        className="txt-1"
                                        placeholder="bata_branding.css"
                                      />
                                    </div>
                                  </div>
                                  <div className="chatconfigbtn">
                                    <button className="CreateADDBtn" onClick={this.HandlePlusButtonModalClose.bind(this)}>
                                      <label className="addLable">ADD</label>
                                    </button>
                                  </div>
                                </div>
                              </Modal>
                              <label>Theme3</label>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="chatconfigbtn">
                        <button className="CreateADDBtn">
                          <label className="addLable">ADD</label>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default ChatConfigureBrand;
