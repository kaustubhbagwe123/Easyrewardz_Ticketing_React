import React, { Component, Fragment } from "react";
import Demo from "../../store/Hashtag";
import { Link } from "react-router-dom";
import ReactTable from "react-table";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MinusCircle from "./../../assets/Images/minuscircle.png";
import PlusCircle from "./../../assets/Images/pluscircle.png";
import { Popover } from "antd";
import { MyContext } from "./../../context";

class ChatRules extends Component {
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
        ruleCode: "Rul_WelMSG",
        ruleName: "Welcome Message",
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
        ruleCode: "Rul_Conf",
        ruleName: "Confirm Email",
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
        ruleCode: "Rul_Ask",
        ruleName: "Ask Name",
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
        ruleCode: "Rul_WelMSG",
        ruleName: "Welcome Message",
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

        ruleCode: "Rul_Conf",
        ruleName: "Confirm Email",
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

        ruleCode: "Rul_Ask",
        ruleName: "Ask Name",
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

        ruleCode: "Rul_WelMSG",
        ruleName: "Welcome Message",
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

        ruleCode: "Rul_Conf",
        ruleName: "Confirm Email",
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

        ruleCode: "Rul_Ask",
        ruleName: "Ask Name",
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
                                        return TranslationContext.span.rulecode
                                      }
                                      else {
                                        return "Rule Code"
                                      }
                                    })()
                                  }
            <FontAwesomeIcon icon={faCaretDown} />
          </span>
        ),
        accessor: "ruleCode"
      },
      {
        Header: (
          <span>
            
            {
                                    (() => {
                                      if (TranslationContext !== undefined) {
                                        return TranslationContext.span.rulename
                                      }
                                      else {
                                        return "Rule Name"
                                      }
                                    })()
                                  }
            <FontAwesomeIcon icon={faCaretDown} />
          </span>
        ),
        accessor: "ruleName"
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
                                        return TranslationContext.span.editrule
                                      }
                                      else {
                                        return "EDIT RULE"
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
                                        return TranslationContext.label.rulecode
                                      }
                                      else {
                                        return "Rule Code"
                                      }
                                    })()
                                  }
                      </label>
                      <input
                        type="text"
                        className="txt-edit-popover"
                        placeholder="Enter Rule Code"
                        maxLength={10}
                      />
                    </div>
                    <div className="pop-over-div">
                      <label className="edit-label-1">
                        
                        {
                                    (() => {
                                      if (TranslationContext !== undefined) {
                                        return TranslationContext.label.rulename
                                      }
                                      else {
                                        return "Rule Name"
                                      }
                                    })()
                                  }
                        </label>
                      <input
                        type="text"
                        className="txt-edit-popover"
                        placeholder="Enter Rule Name"
                        maxLength={25}
                      />
                    </div>
                    <div className="pop-over-div">
                      <label className="edit-label-1">
                        
                        {
                                    (() => {
                                      if (TranslationContext !== undefined) {
                                        return TranslationContext.label.descriptionslashcontent
                                      }
                                      else {
                                        return "Description/Content"
                                      }
                                    })()
                                  }
                        </label>
                      <textarea
                        className="shortcutarea"
                        placeholder="Description/Content"
                        rows="6"
                        style={{ resize: "none" }}
                      ></textarea>
                    </div>
                    <div className="pop-over-div dropDrownSpace1" style={{ width: "170px" }}>
                      <label className="edit-label-1">
                        
                        {
                                    (() => {
                                      if (TranslationContext !== undefined) {
                                        return TranslationContext.label.options
                                      }
                                      else {
                                        return "Option"
                                      }
                                    })()
                                  }
                        </label>
                      <input
                        type="text"
                        className="txt-edit-popoverchat"
                        placeholder="Update Name"
                      />
                      <img
                        src={MinusCircle}
                        className="minuscircleoption"
                        alt="Info"
                      />
                      <input type="text" className="txt-edit-popover" placeholder="Skip" />
                      <img
                        src={MinusCircle}
                        className="minuscircleoption"
                        alt="Info"
                      />
                      <img
                        src={PlusCircle}
                        className="pluscircleoption"
                        alt="Info"
                      />
                    </div>
                    <br />
                    <div>
                      <a className="pop-over-cancle canblue" onClick={() => this.hide(this, "edtpadding" + ids)}>CANCEL</a>
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
                                        return TranslationContext.link.rules
                                      }
                                      else {
                                        return "Rules"
                                      }
                                    })()
                                  }
          </Link>
        </div>

        <div className="container-fluid">
          <div className="store-settings-cntr">
            <div className="row">
              <div className="col-md-8">
                <div className="table-cntr table-height chatRules">
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
                                        return TranslationContext.label.createrule
                                      }
                                      else {
                                        return "CREATE RULE"
                                      }
                                    })()
                                  }
                    </label>
                    <div className="div-padding-1">
                      <label className="designation-name">
                        
                        {
                                    (() => {
                                      if (TranslationContext !== undefined) {
                                        return TranslationContext.label.rulecode
                                      }
                                      else {
                                        return "Rule Code"
                                      }
                                    })()
                                  }
                        </label>
                      <input
                        type="text"
                        className="txt-1"
                        placeholder="Enter Rule Code"
                        maxLength="10"
                      />
                    </div>
                    <div className="divSpace">
                      <div className="dropDrownSpace">
                        <label className="reports-to">
                        {
                                    (() => {
                                      if (TranslationContext !== undefined) {
                                        return TranslationContext.label.rulename
                                      }
                                      else {
                                        return "Rule Name"
                                      }
                                    })()
                                  }
                        </label>
                        <input
                          type="text"
                          className="txt-1"
                          placeholder="Enter Rule Name"
                          maxLength="25"
                        />
                      </div>
                    </div>

                    <div className="dropDrownSpace">
                      <label className="reports-to">
                        
                        {
                                    (() => {
                                      if (TranslationContext !== undefined) {
                                        return TranslationContext.label.descriptionslashcontent
                                      }
                                      else {
                                        return "Description/Content"
                                      }
                                    })()
                                  }
                        </label>
                      <textarea
                        className="shortcutarea"
                        placeholder="Description/Content"
                        rows="6"
                        style={{ resize: "none" }}
                      ></textarea>
                    </div>

                    <div className="divSpace">
                      <div className="dropDrownSpace1">
                        <label className="reports-to">
                          
                          {
                                    (() => {
                                      if (TranslationContext !== undefined) {
                                        return TranslationContext.label.options
                                      }
                                      else {
                                        return "Options"
                                      }
                                    })()
                                  }
                          </label>
                        <input
                          type="text"
                          className="txt-12"
                          placeholder="Update Name"
                        />
                        <img
                          src={MinusCircle}
                          className="minuscircleoption"
                          alt="Info"
                        />
                        <input type="text" className="txt-1" placeholder="Skip" />
                        <img
                          src={MinusCircle}
                          className="minuscircleoption"
                          alt="Info"
                        />
                        <img
                          src={PlusCircle}
                          className="pluscircleoption"
                          alt="Info"
                        />
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

ChatRules.contextType = MyContext; 
export default ChatRules;
