import React, { Component, Fragment } from "react";
import Demo from "./../../store/Hashtag.js";
import { Link } from "react-router-dom";
import ChatTheme from "./../../assets/Images/chattheme.png";
import ChatTheme1 from "./../../assets/Images/chattheme1.png";
import ChatBataLogo from "./../../assets/Images/chatbatalogo.png";
import PlusPopUp from "./../../assets/Images/Pluspopup.png";
import Modal from "react-responsive-modal";
import { MyContext } from "./../../context";

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
    const TranslationContext = this.context.state.translateLanguage.default
    return (
      <Fragment>
        <div className="container-fluid setting-title setting-breadcrumb">
          <Link to="settings" className="header-path">
            
            {
                                    (() => {
                                      if (TranslationContext !== undefined) {
                                        return TranslationContext.link.setting
                                      }
                                      else {
                                        return "Settings"
                                      }
                                    })()
                                  }
          </Link>
          <span>&gt;</span>
          <Link to={Demo.BLANK_LINK} className="header-path">
            
            {
                                    (() => {
                                      if (TranslationContext !== undefined) {
                                        return TranslationContext.link.chat
                                      }
                                      else {
                                        return "Chat"
                                      }
                                    })()
                                  }
          </Link>
          <span>&gt;</span>
          <Link to={Demo.BLANK_LINK} className="active header-path">
            
            {
                                    (() => {
                                      if (TranslationContext !== undefined) {
                                        return TranslationContext.link.ConfigureBrand
                                      }
                                      else {
                                        return "Configure Brand"
                                      }
                                    })()
                                  }
          </Link>
        </div>

        <div className="container-fluid">
          <div className="setting-chat-config">
            <div className="row">
              <div className="col-md-4 chat-config-center">
                <div className="table-cntr table-height">
                  <div className="createHierarchyMask">
                    <div className="chatconfigpadding">
                      <label className="create-department">
                       
                        {
                                    (() => {
                                      if (TranslationContext !== undefined) {
                                        return TranslationContext.label.createbrand
                                      }
                                      else {
                                        return "CREATE BRAND"
                                      }
                                    })()
                                  }
                        </label>
                      <div className="divSpace">
                        <div className="">
                          <label className="designation-name">
                            
                            {
                                    (() => {
                                      if (TranslationContext !== undefined) {
                                        return TranslationContext.label.brandcode
                                      }
                                      else {
                                        return "Brand Code"
                                      }
                                    })()
                                  }
                            </label>
                          <input
                            type="text"
                            className="txt-1"
                            placeholder="Enter Brand Code"
                            maxLength={10}
                          />
                        </div>
                      </div>
                      <div className="divSpace">
                        <div className="">
                          <label className="reports-to">
                            
                            {
                                    (() => {
                                      if (TranslationContext !== undefined) {
                                        return TranslationContext.label.brandname
                                      }
                                      else {
                                        return "Brand Name"
                                      }
                                    })()
                                  }
                            </label>
                          <input
                            type="text"
                            className="txt-1"
                            placeholder="Enter Brand Name"
                            maxLength={25}
                          />
                        </div>
                      </div>

                      <div className="divSpace">
                        <div className="">
                          <label className="reports-to">
                            
                            {
                                    (() => {
                                      if (TranslationContext !== undefined) {
                                        return TranslationContext.label.brandlogo
                                      }
                                      else {
                                        return "Brand Logo"
                                      }
                                    })()
                                  }
                            </label>
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
                          <label className="reports-to">
                            
                            {
                                    (() => {
                                      if (TranslationContext !== undefined) {
                                        return TranslationContext.label.language
                                      }
                                      else {
                                        return "Language"
                                      }
                                    })()
                                  }
                            </label>
                          <select className="txt-1 edit-dropDwon dropdown-setting">
                            <option>
                              
                              {
                                    (() => {
                                      if (TranslationContext !== undefined) {
                                        return TranslationContext.option.active
                                      }
                                      else {
                                        return "Active"
                                      }
                                    })()
                                  }
                              </option>
                            <option>
                              
                              {
                                    (() => {
                                      if (TranslationContext !== undefined) {
                                        return TranslationContext.option.inactive
                                      }
                                      else {
                                        return "Inactive"
                                      }
                                    })()
                                  }
                              </option>
                          </select>
                        </div>
                      </div>

                      <div className="divSpace">
                        <div className="">
                          <label className="reports-to">
                            
                            {
                                    (() => {
                                      if (TranslationContext !== undefined) {
                                        return TranslationContext.label.theme
                                      }
                                      else {
                                        return "Theme"
                                      }
                                    })()
                                  }
                            </label>
                          <div className="ChatThemeflex">
                            <div>
                              <img
                                src={ChatTheme}
                                alt="store-settings"
                                className="ChatConfigtheme"
                              />
                              <label>
                                
                                {
                                    (() => {
                                      if (TranslationContext !== undefined) {
                                        return TranslationContext.label.theme1
                                      }
                                      else {
                                        return "Theme1"
                                      }
                                    })()
                                  }
                                </label>
                            </div>
                            <div>
                              <img
                                src={ChatTheme1}
                                alt="store-settings"
                                className="ChatConfigtheme"
                              />
                              <label>
                                
                                {
                                    (() => {
                                      if (TranslationContext !== undefined) {
                                        return TranslationContext.label.theme2
                                      }
                                      else {
                                        return "Theme2"
                                      }
                                    })()
                                  }
                                </label>
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
                                <div className="chatconfigpadding chatconfigpadd">
                                  <label className="create-department">
                                    
                                    {
                                    (() => {
                                      if (TranslationContext !== undefined) {
                                        return TranslationContext.label.addtheme
                                      }
                                      else {
                                        return "ADD THEME"
                                      }
                                    })()
                                  }
                                  </label>
                                  <div className="divSpace">
                                    <div className="">
                                      <label className="designation-name">
                                        
                                        {
                                    (() => {
                                      if (TranslationContext !== undefined) {
                                        return TranslationContext.label.themecode
                                      }
                                      else {
                                        return "Theme Code"
                                      }
                                    })()
                                  }

                                      </label>
                                      <input
                                        type="text"
                                        className="txt-1"
                                        placeholder="Enter Brand Code"
                                        maxLength={10}
                                      />
                                    </div>
                                  </div>
                                  <div className="divSpace">
                                    <div className="">
                                      <label className="reports-to">
                                        

                                        {
                                    (() => {
                                      if (TranslationContext !== undefined) {
                                        return TranslationContext.label.themename
                                      }
                                      else {
                                        return "Theme Name"
                                      }
                                    })()
                                  }

                                      </label>
                                      <input
                                        type="text"
                                        className="txt-1"
                                        placeholder="Enter Brand Name"
                                        maxLength={25}
                                      />
                                    </div>
                                  </div>
                                  <div className="divSpace">
                                    <div className="">
                                      <label className="reports-to">
                                        
                                        {
                                    (() => {
                                      if (TranslationContext !== undefined) {
                                        return TranslationContext.label.themestyle
                                      }
                                      else {
                                        return "Theme Style(CSS File Only)"
                                      }
                                    })()
                                  }
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
                                     
                                     {
                                    (() => {
                                      if (TranslationContext !== undefined) {
                                        return TranslationContext.button.add
                                      }
                                      else {
                                        return "ADD"
                                      }
                                    })()
                                  }
                                    </button>
                                  </div>
                                </div>
                              </Modal>
                              <label>
                                
                                {
                                    (() => {
                                      if (TranslationContext !== undefined) {
                                        return TranslationContext.label.theme3
                                      }
                                      else {
                                        return "Theme3"
                                      }
                                    })()
                                  }
                                </label>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="chatconfigbtn">
                        <button className="CreateADDBtn">
                        {
                                    (() => {
                                      if (TranslationContext !== undefined) {
                                        return TranslationContext.button.add
                                      }
                                      else {
                                        return "ADD"
                                      }
                                    })()
                                  }
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
ChatConfigureBrand.contextType = MyContext;
export default ChatConfigureBrand;
