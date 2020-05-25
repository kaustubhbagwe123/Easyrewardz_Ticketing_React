import React, { Component, Fragment } from "react";
import Demo from "../../store/Hashtag";
import { Link } from "react-router-dom";
import ReactTable from "react-table";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Popover } from "antd";
import { MyContext } from "./../../context";

class ChatThemes extends Component {
  hide(e, id) {
    debugger;
    // document.getElementById(id).style.display="none";
    document.getElementById(id).parentElement.parentElement.parentElement.parentElement.parentElement.style.display = "none";
  }
  show(e, id) {
    debugger;
    if (document.getElementById(id))
      // document.getElementById(id).style.display="block";
      document.getElementById(id).parentElement.parentElement.parentElement.parentElement.parentElement.style.display = "block";
  }
  render() {
    const TranslationContext = this.context.state.translateLanguage.default
    const dataChatRules = [
      {
        id: "D1",
        themeCode: "Theme_Arbo",
        themeName: "Arbo Cement",
        deactive: (
          <div className="crm-margin-div chatpadtoggle">
            <div className="switch switch-primary d-inline m-r-10">
              <input type="checkbox" id="Notification-c1" />
              <label
                htmlFor="Notification-c1"
                className="cr cr-float-auto"
              ></label>
            </div>
          </div>
        )
      },
      {
        id: "D2",
        themeCode: "Theme_Boo",
        themeName: "BooCosmos",
        deactive: (
          <div className="crm-margin-div chatpadtoggle">
            <div className="switch switch-primary d-inline m-r-10">
              <input type="checkbox" id="Notification-c2" />
              <label
                htmlFor="Notification-c2"
                className="cr cr-float-auto"
              ></label>
            </div>
          </div>
        )
      },
      {
        id: "D3",
        themeCode: "Theme_Arch",
        themeName: "Archstone",
        deactive: (
          <div className="crm-margin-div chatpadtoggle">
            <div className="switch switch-primary d-inline m-r-10">
              <input type="checkbox" id="Notification-c3" />
              <label
                htmlFor="Notification-c3"
                className="cr cr-float-auto"
              ></label>
            </div>
          </div>
        )
      },
      {
        id: "D4",
        themeCode: "Theme_Boost",
        themeName: "Boost",
        deactive: (
          <div className="crm-margin-div chatpadtoggle">
            <div className="switch switch-primary d-inline m-r-10">
              <input type="checkbox" id="Notification-c4" />
              <label
                htmlFor="Notification-c4"
                className="cr cr-float-auto"
              ></label>
            </div>
          </div>
        )
      },
      {
        id: "D5",
        themeCode: "Theme_CC",
        themeName: "Cream City",
        deactive: (
          <div className="crm-margin-div chatpadtoggle">
            <div className="switch switch-primary d-inline m-r-10">
              <input type="checkbox" id="Notification-c5" />
              <label
                htmlFor="Notification-c5"
                className="cr cr-float-auto"
              ></label>
            </div>
          </div>
        )
      },
      {
        id: "D6",
        themeCode: "Theme_EMt",
        themeName: "EMinente",
        deactive: (
          <div className="crm-margin-div chatpadtoggle">
            <div className="switch switch-primary d-inline m-r-10">
              <input type="checkbox" id="Notification-c6" />
              <label
                htmlFor="Notification-c6"
                className="cr cr-float-auto"
              ></label>
            </div>
          </div>
        )
      },
      {
        id: "D7",
        themeCode: "Theme_F&F",
        themeName: "Floss & Flirt",
        deactive: (
          <div className="crm-margin-div chatpadtoggle">
            <div className="switch switch-primary d-inline m-r-10">
              <input type="checkbox" id="Notification-c7" />
              <label
                htmlFor="Notification-c7"
                className="cr cr-float-auto"
              ></label>
            </div>
          </div>
        )
      },
      {
        id: "D8",
        themeCode: "Theme_Dellin",
        themeName: "Dellin",
        deactive: (
          <div className="crm-margin-div chatpadtoggle">
            <div className="switch switch-primary d-inline m-r-10">
              <input type="checkbox" id="Notification-c8" />
              <label
                htmlFor="Notification-c8"
                className="cr cr-float-auto"
              ></label>
            </div>
          </div>
        )
      },
      {
        id: "D9",
        themeCode: "Theme_Emp",
        themeName: "Empire",
        deactive: (
          <div className="crm-margin-div chatpadtoggle">
            <div className="switch switch-primary d-inline m-r-10">
              <input type="checkbox" id="Notification-c9" />
              <label
                htmlFor="Notification-c9"
                className="cr cr-float-auto"
              ></label>
            </div>
          </div>
        )
      },
      {
        id: "D10",
        themeCode: "Theme_Flo",
        themeName: "Flourish",
        deactive: (
          <div className="crm-margin-div chatpadtoggle">
            <div className="switch switch-primary d-inline m-r-10">
              <input type="checkbox" id="Notification-c9" />
              <label
                htmlFor="Notification-c9"
                className="cr cr-float-auto"
              ></label>
            </div>
          </div>
        )
      },
      {
        id: "D11",
        themeCode: "Theme_De",
        themeName: "De'pise",
        deactive: (
          <div className="crm-margin-div chatpadtoggle">
            <div className="switch switch-primary d-inline m-r-10">
              <input type="checkbox" id="Notification-c9" />
              <label
                htmlFor="Notification-c9"
                className="cr cr-float-auto"
              ></label>
            </div>
          </div>
        )
      },
      {
        id: "D12",
        themeCode: "Theme_En",
        themeName: "Enclave",
        deactive: (
          <div className="crm-margin-div chatpadtoggle">
            <div className="switch switch-primary d-inline m-r-10">
              <input type="checkbox" id="Notification-c9" />
              <label
                htmlFor="Notification-c9"
                className="cr cr-float-auto"
              ></label>
            </div>
          </div>
        )
      }
    ];

    const columnsChatRules = [
      {
        Header: (
          <span>
            
            {
                                    (() => {
                                      if (TranslationContext !== undefined) {
                                        return TranslationContext.span.themecode
                                      }
                                      else {
                                        return "Theme Code"
                                      }
                                    })()
                                  }
                              
            <FontAwesomeIcon icon={faCaretDown} />
          </span>
        ),
        accessor: "themeCode"
      },
      {
        Header: (
          <span>
            
            {
                                    (() => {
                                      if (TranslationContext !== undefined) {
                                        return TranslationContext.span.themename
                                      }
                                      else {
                                        return "Theme Name"
                                      }
                                    })()
                                  }
            <FontAwesomeIcon icon={faCaretDown} />
          </span>
        ),
        accessor: "themeName"
      },
      {
        Header: (
          <span>
            
            {
                                    (() => {
                                      if (TranslationContext !== undefined) {
                                        return TranslationContext.span.activateslashdeactivate
                                      }
                                      else {
                                        return "Activate/Deactivate"
                                      }
                                    })()
                                  }
            <FontAwesomeIcon icon={faCaretDown} />
          </span>
        ),
        accessor: "deactive"
      },
      {
        Header: <span>
          
          {
                                    (() => {
                                      if (TranslationContext !== undefined) {
                                        return TranslationContext.span.action
                                      }
                                      else {
                                        return "Actions"
                                      }
                                    })()
                                  }
          </span>,
        accessor: "actiondept",
        Cell: row => {
          var ids = row.original["id"];
          return (
            <div>

              <Popover content={<div className="edtpadding" id={"edtpadding" + ids}>
                <div className="d-flex">
                  <div>
                    <div className="">
                      <label className="popover-header-text">
                        
                        {
                                    (() => {
                                      if (TranslationContext !== undefined) {
                                        return TranslationContext.label.themeedit
                                      }
                                      else {
                                        return "EDIT THEME"
                                      }
                                    })()
                                  }
                        </label>
                    </div>
                    <div className="pop-over-div">
                      <label className="edit-label-1">
                        
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
                        className="txt-edit-popover"
                        placeholder="Enter Theme Code"
                        maxLength={10}
                      />
                    </div>
                    <div className="pop-over-div">
                      <label className="edit-label-1">
                        
                        
                        {
                                    (() => {
                                      if (TranslationContext !== undefined) {
                                        return TranslationContext.label.themecode
                                      }
                                      else {
                                        return "Theme Name"
                                      }
                                    })()
                                  }
                        </label>
                      <input
                        type="text"
                        className="txt-edit-popover"
                        placeholder="Enter Theme Name"
                        maxLength={25}
                      />
                    </div>
                    <div className="pop-over-div" style={{ width: "170px" }}>
                      <label className="edit-label-1">
                        
                        {
                                    (() => {
                                      if (TranslationContext !== undefined) {
                                        return TranslationContext.label.themeicon
                                      }
                                      else {
                                        return "Theme Icon"
                                      }
                                    })()
                                  }
                        </label>
                      <div className="custom-file txt-edit-popover">
                        <input type="file" className="custom-file-input" />
                        <label className="custom-file-label">Theme.png</label>
                      </div>
                    </div>
                    <br />
                    <div>
                      <a href="#!" className="pop-over-cancle canblue" onClick={() => this.hide(this, "edtpadding" + ids)}>CANCEL</a>
                      <button className="pop-over-button">
                        
                        {
                                    (() => {
                                      if (TranslationContext !== undefined) {
                                        return TranslationContext.button.save
                                      }
                                      else {
                                        return "SAVE"
                                      }
                                    })()
                                  }
            </button>
                    </div>
                  </div>
                </div>
              </div>} placement="bottom" trigger="click" >
                <button className="react-tabel-button editre" id={ids} onClick={() => this.show(this, "edtpadding" + ids)}>
                  
                  {
                                    (() => {
                                      if (TranslationContext !== undefined) {
                                        return TranslationContext.button.edit
                                      }
                                      else {
                                        return "EDIT"
                                      }
                                    })()
                                  }
                </button>
              </Popover>
            </div>
          );
        }
      }
    ];

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
                                        return TranslationContext.link.themes
                                      }
                                      else {
                                        return "Themes"
                                      }
                                    })()
                                  }
          </Link>
        </div>

        <div className="container-fluid">
          <div className="store-settings-cntr">
            <div className="row">
              <div className="col-md-8">
                <div className="table-cntr table-height chatThemes ChatElementReact">
                  <ReactTable
                    data={dataChatRules}
                    columns={columnsChatRules}
                    // resizable={false}
                    defaultPageSize={15}
                    showPagination={false}
                  />
                  <div className="position-relative1">
                    <div className="pagi">
                    <ul>
                        <li>
                          <a href={Demo.BLANK_LINK}>&lt;</a>
                        </li>
                        <li>
                          <a href={Demo.BLANK_LINK}>
                            
                            {
                                    (() => {
                                      if (TranslationContext !== undefined) {
                                        return TranslationContext.a.one
                                      }
                                      else {
                                        return "1"
                                      }
                                    })()
                                  }
                            </a>
                        </li>
                        <li className="active">
                          <a href={Demo.BLANK_LINK}>
                            
                            {
                                    (() => {
                                      if (TranslationContext !== undefined) {
                                        return TranslationContext.a.two
                                      }
                                      else {
                                        return "2"
                                      }
                                    })()
                                  }
                            </a>
                        </li>
                        <li>
                          <a href={Demo.BLANK_LINK}>
                          {
                                    (() => {
                                      if (TranslationContext !== undefined) {
                                        return TranslationContext.a.three
                                      }
                                      else {
                                        return "3"
                                      }
                                    })()
                                  }
                          </a>
                        </li>
                        <li>
                          <a href={Demo.BLANK_LINK}>
                            
                            {
                                    (() => {
                                      if (TranslationContext !== undefined) {
                                        return TranslationContext.a.four
                                      }
                                      else {
                                        return "4"
                                      }
                                    })()
                                  }
                            </a>
                        </li>
                        <li>
                          <a href={Demo.BLANK_LINK}>

                            {
                                    (() => {
                                      if (TranslationContext !== undefined) {
                                        return TranslationContext.a.five
                                      }
                                      else {
                                        return "5"
                                      }
                                    })()
                                  }
                            </a>
                        </li>
                        <li>
                          <a href={Demo.BLANK_LINK}>
                          {
                                    (() => {
                                      if (TranslationContext !== undefined) {
                                        return TranslationContext.a.six
                                      }
                                      else {
                                        return "6"
                                      }
                                    })()
                                  }
                          </a>
                        </li>
                        <li>
                          <a href={Demo.BLANK_LINK}>&gt;</a>
                        </li>
                      </ul>
                    </div>
                    <div className="item-selection">
                    <select>
                        <option>
                        {
                                    (() => {
                                      if (TranslationContext !== undefined) {
                                        return TranslationContext.option.thirty
                                      }
                                      else {
                                        return "30"
                                      }
                                    })()
                                  }

                        </option>
                        <option>
                        {
                                    (() => {
                                      if (TranslationContext !== undefined) {
                                        return TranslationContext.option.fifty
                                      }
                                      else {
                                        return "50"
                                      }
                                    })()
                                  }

                        </option>
                        <option>

                        {
                                    (() => {
                                      if (TranslationContext !== undefined) {
                                        return TranslationContext.option.hundred
                                      }
                                      else {
                                        return "100"
                                      }
                                    })()
                                  }
                        </option>
                      </select>
                      <p>

{
              (() => {
                if (TranslationContext !== undefined) {
                  return TranslationContext.p.itemperpage
                }
                else {
                  return "Items per page"
                }
              })()
            }
</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="createHierarchyMask">
                  <div className="createSpace">
                    <label className="create-department">
                      
                      {
                                    (() => {
                                      if (TranslationContext !== undefined) {
                                        return TranslationContext.label.createtheme
                                      }
                                      else {
                                        return "CREATE THEME"
                                      }
                                    })()
                                  }
                              
                      </label>
                    <div className="div-padding-1">
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
                        placeholder="Enter Theme Code"
                        maxLength={10}
                      />
                    </div>
                    <div className="divSpace">
                      <div className="dropDrownSpace">
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
                          placeholder="Enter Theme Name"
                          maxLength={25}
                        />
                      </div>
                    </div>
                    <div className="dropDrownSpace">
                      <label className="reports-to">
                      {
                                    (() => {
                                      if (TranslationContext !== undefined) {
                                        return TranslationContext.label.themestyles
                                      }
                                      else {
                                        return "Theme Style"
                                      }
                                    })()
                                  }
                      <span className="chat-file-upl">
                        
                        {
                                    (() => {
                                      if (TranslationContext !== undefined) {
                                        return TranslationContext.span.themecss
                                      }
                                      else {
                                        return "(CSS File Only)"
                                      }
                                    })()
                                  }
                        </span></label>
                      <div className="custom-file">
                        <input type="file" className="custom-file-input" />
                        <label className="custom-file-label">
                          bata_branding.css
                        </label>
                      </div>
                    </div>
                    <div className="btnSpace">
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
      </Fragment>
    );
  }
}

ChatThemes.contextType = MyContext;
export default ChatThemes;
