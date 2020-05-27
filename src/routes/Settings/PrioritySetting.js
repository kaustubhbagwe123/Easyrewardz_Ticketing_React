import React, { Component } from "react";
import "jquery";
import "popper.js/dist/popper";
import Demo from "../../store/Hashtag.js";
import "bootstrap";
import TableArr from "./../../assets/Images/table-arr.png";
import InfoIconGray from "./../../assets/Images/info-icon-gray.png";
import InfoIcon from "./../../assets/Images/info-icon.png";
import TaskIconBlue from "./../../assets/Images/task-icon-blue.png";
import TaskIconGray from "./../../assets/Images/task-icon-gray.png";
import CliamIconBlue from "./../../assets/Images/cliam-icon-blue.png";
import { MyContext } from './../../context'

class PrioritySettings extends Component {
  render() {
       const TranslationContext = this.context.state.translateLanguage.default
    return (
      <React.Fragment>
        <div className="container-fluid setting-title setting-breadcrumb">
          <a href={Demo.BLANK_LINK} className="header-path">Settings</a>
          <span>&gt;</span>
          <a href={Demo.BLANK_LINK} className="header-path">Ticketing</a>
          <span>&gt;</span>
          <a href={Demo.BLANK_LINK} className="header-path active">
            
            {
                                    (() => {
                                      if (TranslationContext !== undefined) {
                                        return TranslationContext.a.priority
                                      }
                                      else {
                                        return "Priority"
                                      }
                                    })()
                                  }

          </a>
        </div>
        <div className="container-fluid">
          <div className="setting-tabs">
            <table>
              <thead>
                <tr>
                  <th></th>
                  <th>
                     
                    {
                                    (() => {
                                      if (TranslationContext !== undefined) {
                                        return TranslationContext.th.priorityname
                                      }
                                      else {
                                        return "Priority Name"
                                      }
                                    })()
                                  }
                    <img src={TableArr} alt="table-arr" />
                  </th>
                  <th>
                    
                    {
                                    (() => {
                                      if (TranslationContext !== undefined) {
                                        return TranslationContext.th.createdby
                                      }
                                      else {
                                        return "Created By"
                                      }
                                    })()
                                  }
                    
                    <img src={TableArr} alt="table-arr" />
                  </th>
                  <th>
                  {
                                    (() => {
                                      if (TranslationContext !== undefined) {
                                        return TranslationContext.th.createddate
                                      }
                                      else {
                                        return "Created Date"
                                      }
                                    })()
                                  }

                     <img src={TableArr} alt="table-arr" />
                  </th>
                  <th>
                  {
                                    (() => {
                                      if (TranslationContext !== undefined) {
                                        return TranslationContext.th.status
                                      }
                                      else {
                                        return "Status"
                                      }
                                    })()
                                  }
                     <img src={TableArr} alt="table-arr" />
                  </th>
                  <th>

                  {
                                    (() => {
                                      if (TranslationContext !== undefined) {
                                        return TranslationContext.th.action
                                      }
                                      else {
                                        return "Actions"
                                      }
                                    })()
                                  }
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="pink-bg">
                  <td></td>
                  <td>

                  {
                                    (() => {
                                      if (TranslationContext !== undefined) {
                                        return TranslationContext.td.high
                                      }
                                      else {
                                        return "High"
                                      }
                                    })()
                                  }
                  </td>
                  <td>
                    
                    {
                                    (() => {
                                      if (TranslationContext !== undefined) {
                                        return TranslationContext.td.admin
                                      }
                                      else {
                                        return "Admin"
                                      }
                                    })()
                                  }
                    <img
                      className="info-icon"
                      src={InfoIconGray}
                      alt="info-icon-gray"
                    />
                  </td>
                  <td>

                  {
                                    (() => {
                                      if (TranslationContext !== undefined) {
                                        return TranslationContext.td.twentythreeMaynineteen
                                      }
                                      else {
                                        return "23-May-19"
                                      }
                                    })()
                                  }
                  </td>
                  <td>
                  {
                                    (() => {
                                      if (TranslationContext !== undefined) {
                                        return TranslationContext.td.active
                                      }
                                      else {
                                        return "Active"
                                      }
                                    })()
                                  }

                  </td>
                  <td>

                  {
                                    (() => {
                                      if (TranslationContext !== undefined) {
                                        return TranslationContext.td.high
                                      }
                                      else {
                                        return "High"
                                      }
                                    })()
                                  }

                  </td>
                </tr>
                <tr className="orange-bg">
                  <td>

                  {
                                    (() => {
                                      if (TranslationContext !== undefined) {
                                        return TranslationContext.td.abc
                                      }
                                      else {
                                        return "ABC1234"
                                      }
                                    })()
                                  }
                  </td>
                  <td>
                    <span className="table-btn table-blue-btn">
                    {
                                    (() => {
                                      if (TranslationContext !== undefined) {
                                        return TranslationContext.span.open
                                      }
                                      else {
                                        return "Open"
                                      }
                                    })()
                                  }
                    </span>
                  </td>
                  <td className="table-img-cntr"></td>
                  <td className="black-clr">
                    
                    {
                                    (() => {
                                      if (TranslationContext !== undefined) {
                                        return TranslationContext.td.needtochangemyshippingaddress
                                      }
                                      else {
                                        return "Need to change my shipping address"
                                      }
                                    })()
                                  }
                    
                    {" "}
                    <span>
                    {
                                    (() => {
                                      if (TranslationContext !== undefined) {
                                        return TranslationContext.span.hopethishelppleaserateus
                                      }
                                      else {
                                        return "Hope this help, Please rate us"
                                      }
                                    })()
                                  }

                    </span>
                  </td>
                  <td>
                   
                    
                    {
                                    (() => {
                                      if (TranslationContext !== undefined) {
                                        return TranslationContext.td.defectivearticle
                                      }
                                      else {
                                        return "Defective article"
                                      }
                                    })()
                                  }
                    
                    {" "}
                    <img className="info-icon" src={InfoIcon} alt="info-icon" />
                  </td>
                  <td>
                  {
                                    (() => {
                                      if (TranslationContext !== undefined) {
                                        return TranslationContext.td.high
                                      }
                                      else {
                                        return "High"
                                      }
                                    })()
                                  }

                  </td>
                  <td>
                  {
                                    (() => {
                                      if (TranslationContext !== undefined) {
                                        return TranslationContext.td.nraman
                                      }
                                      else {
                                        return "N Rampal"
                                      }
                                    })()
                                  }

                  </td>
                  <td>
                    
                    {
                                    (() => {
                                      if (TranslationContext !== undefined) {
                                        return TranslationContext.td.twelvemarcheighty
                                      }
                                      else {
                                        return "12 March 2018"
                                      }
                                    })()
                                  }
                    {" "}
                    <img className="info-icon" src={InfoIcon} alt="info-icon" />
                  </td>
                </tr>
                <tr className="blue-bg">
                  <td>
                  {
                                    (() => {
                                      if (TranslationContext !== undefined) {
                                        return TranslationContext.td.abc
                                      }
                                      else {
                                        return "ABC123"
                                      }
                                    })()
                                  }

                  </td>
                  <td>
                    <span className="table-btn table-yellow-btn">New
                    
                    </span>
                  </td>
                  <td className="table-img-cntr">
                    <img
                      className="task-icon-1"
                      src={TaskIconBlue}
                      alt="task-icon-blue"
                    />
                  </td>
                  <td className="black-clr">
                    
                    {
                                    (() => {
                                      if (TranslationContext !== undefined) {
                                        return TranslationContext.td.needtochangemyshippingaddress
                                      }
                                      else {
                                        return "Need to change my shipping address"
                                      }
                                    })()
                                  }
                    
                    {" "}
                    <span>
                      
                      {
                                    (() => {
                                      if (TranslationContext !== undefined) {
                                        return TranslationContext.span.hopethishelppleaserateusonenewcomment
                                      }
                                      else {
                                        return "Hope this help, Please rate us(1 new comment)"
                                      }
                                    })()
                                  }
                      </span>
                  </td>
                  <td>
                  {
                                    (() => {
                                      if (TranslationContext !== undefined) {
                                        return TranslationContext.td.defectivearticle
                                      }
                                      else {
                                        return "Defective article"
                                      }
                                    })()
                                  }
                    {" "}
                    <img className="info-icon" src={InfoIcon} alt="info-icon" />
                  </td>
                  <td>
                  {
                                    (() => {
                                      if (TranslationContext !== undefined) {
                                        return TranslationContext.td.high
                                      }
                                      else {
                                        return "High"
                                      }
                                    })()
                                  }

                  </td>
                  <td>
                  {
                                    (() => {
                                      if (TranslationContext !== undefined) {
                                        return TranslationContext.td.nraman
                                      }
                                      else {
                                        return "N Rampal"
                                      }
                                    })()
                                  }

                  </td>
                  <td>
                    
                    {
                                    (() => {
                                      if (TranslationContext !== undefined) {
                                        return TranslationContext.td.twelvemarcheighty
                                      }
                                      else {
                                        return "12 March 2018"
                                      }
                                    })()
                                  }
                    {" "}
                    <img className="info-icon" src={InfoIcon} alt="info-icon" />
                  </td>
                </tr>
                <tr>
                  <td>

                  {
                                    (() => {
                                      if (TranslationContext !== undefined) {
                                        return TranslationContext.td.abc
                                      }
                                      else {
                                        return "ABC1234"
                                      }
                                    })()
                                  }
                  </td>
                  <td>
                    <span className="table-btn table-yellow-btn">
                    
                    {
                                    (() => {
                                      if (TranslationContext !== undefined) {
                                        return TranslationContext.span.new
                                      }
                                      else {
                                        return "New"
                                      }
                                    })()
                                  }
                    </span>
                  </td>
                  <td className="table-img-cntr">
                    <img
                      className="task-icon-1"
                      src={TaskIconGray}
                      alt="task-icon-gray"
                    />
                  </td>
                  <td>
   
                  {
                                    (() => {
                                      if (TranslationContext !== undefined) {
                                        return TranslationContext.td.needtochangemyshippingaddress
                                      }
                                      else {
                                        return "Need to change my shipping address"
                                      }
                                    })()
                                  }


                    {" "}
                    <span>
                    {
                                    (() => {
                                      if (TranslationContext !== undefined) {
                                        return TranslationContext.td.hopethishelppleaserateus
                                      }
                                      else {
                                        return "Hope this help, Please rate us"
                                      }
                                    })()
                                  }


                    </span>
                  </td>
                  <td>
                  {
                                    (() => {
                                      if (TranslationContext !== undefined) {
                                        return TranslationContext.td.defectivearticle
                                      }
                                      else {
                                        return "Defective article"
                                      }
                                    })()
                                  }
                    {" "}
                    <img className="info-icon" src={InfoIcon} alt="info-icon" />
                  </td>
                  <td>
                  {
                                    (() => {
                                      if (TranslationContext !== undefined) {
                                        return TranslationContext.td.high
                                      }
                                      else {
                                        return "High"
                                      }
                                    })()
                                  }

                  </td>
                  <td>
                  {
                                    (() => {
                                      if (TranslationContext !== undefined) {
                                        return TranslationContext.td.nraman
                                      }
                                      else {
                                        return "N Rampal"
                                      }
                                    })()
                                  }

                  </td>
                  <td>
                  {
                                    (() => {
                                      if (TranslationContext !== undefined) {
                                        return TranslationContext.td.twelvemarcheighty
                                      }
                                      else {
                                        return "12 March 2018"
                                      }
                                    })()
                                  }
                    {" "}
                    <img className="info-icon" src={InfoIcon} alt="info-icon" />
                  </td>
                </tr>
                <tr>
                  <td>
                  {
                                    (() => {
                                      if (TranslationContext !== undefined) {
                                        return TranslationContext.td.abc
                                      }
                                      else {
                                        return "ABC123"
                                      }
                                    })()
                                  }

                  </td>
                  <td>
                    <span className="table-btn table-green-btn">
                      
                      {
                                    (() => {
                                      if (TranslationContext !== undefined) {
                                        return TranslationContext.span.solved
                                      }
                                      else {
                                        return "Solved"
                                      }
                                    })()
                                  }
                      </span>
                  </td>
                  <td className="table-img-cntr">
                    <img
                      className="claim-icon"
                      src={CliamIconBlue}
                      alt="cliam-icon-blue"
                    />
                    <img
                      className="task-icon-1"
                      src={TaskIconGray}
                      alt="task-icon-gray"
                    />
                  </td>
                  <td>
                  {
                                    (() => {
                                      if (TranslationContext !== undefined) {
                                        return TranslationContext.td.needtochangemyshippingaddress
                                      }
                                      else {
                                        return "Need to change my shipping address"
                                      }
                                    })()
                                  }
                   {" "}
                    <span>
                    {
                                    (() => {
                                      if (TranslationContext !== undefined) {
                                        return TranslationContext.td.hopethishelppleaserateus
                                      }
                                      else {
                                        return "Hope this help, Please rate us"
                                      }
                                    })()
                                  }
                    </span>
                  </td>
                  <td>
                  {
                                    (() => {
                                      if (TranslationContext !== undefined) {
                                        return TranslationContext.td.defectivearticle
                                      }
                                      else {
                                        return "Defective article"
                                      }
                                    })()
                                  }
                   {" "}
                    <img className="info-icon" src={InfoIcon} alt="info-icon" />
                  </td>
                  <td>

                  {
                                    (() => {
                                      if (TranslationContext !== undefined) {
                                        return TranslationContext.td.high
                                      }
                                      else {
                                        return "High"
                                      }
                                    })()
                                  }
                  </td>
                  <td>

                  {
                                    (() => {
                                      if (TranslationContext !== undefined) {
                                        return TranslationContext.td.nraman
                                      }
                                      else {
                                        return "N Rampal"
                                      }
                                    })()
                                  }
                  </td>
                  <td>
                  {
                                    (() => {
                                      if (TranslationContext !== undefined) {
                                        return TranslationContext.td.twelvemarcheighty
                                      }
                                      else {
                                        return "12 March 2018"
                                      }
                                    })()
                                  }
                    {" "}
                    <img className="info-icon" src={InfoIcon} alt="info-icon" />
                  </td>
                </tr>
                <tr>
                  <td>
                  {
                                    (() => {
                                      if (TranslationContext !== undefined) {
                                        return TranslationContext.td.abc
                                      }
                                      else {
                                        return "ABC123"
                                      }
                                    })()
                                  }
                  </td>
                  <td>
                    <span className="table-btn table-green-btn">
                    {
                                    (() => {
                                      if (TranslationContext !== undefined) {
                                        return TranslationContext.span.solved
                                      }
                                      else {
                                        return "Solved"
                                      }
                                    })()
                                  }
                    </span>
                  </td>
                  <td className="table-img-cntr"></td>
                  <td>
                  {
                                    (() => {
                                      if (TranslationContext !== undefined) {
                                        return TranslationContext.td.needtochangemyshippingaddress
                                      }
                                      else {
                                        return "Need to change my shipping address"
                                      }
                                    })()
                                  }
                    {" "}
                    <span>
                    {
                                    (() => {
                                      if (TranslationContext !== undefined) {
                                        return TranslationContext.td.hopethishelppleaserateus
                                      }
                                      else {
                                        return "Hope this help, Please rate us"
                                      }
                                    })()
                                  }
                      </span>
                  </td>
                  <td>
                  {
                                    (() => {
                                      if (TranslationContext !== undefined) {
                                        return TranslationContext.td.defectivearticle
                                      }
                                      else {
                                        return "Defective article"
                                      }
                                    })()
                                  }
                    {" "}
                    <img className="info-icon" src={InfoIcon} alt="info-icon" />
                  </td>
                  <td>

                  {
                                    (() => {
                                      if (TranslationContext !== undefined) {
                                        return TranslationContext.td.high
                                      }
                                      else {
                                        return "High"
                                      }
                                    })()
                                  }
                  </td>
                  <td>
                  {
                                    (() => {
                                      if (TranslationContext !== undefined) {
                                        return TranslationContext.td.nraman
                                      }
                                      else {
                                        return "N Rampal"
                                      }
                                    })()
                                  }
                  </td>
                  <td>
                  {
                                    (() => {
                                      if (TranslationContext !== undefined) {
                                        return TranslationContext.td.twelvemarcheighty
                                      }
                                      else {
                                        return "12 March 2018"
                                      }
                                    })()
                                  }
                    {" "}
                    <img className="info-icon" src={InfoIcon} alt="info-icon" />
                  </td>
                </tr>
                <tr>
                  <td>
                  {
                                    (() => {
                                      if (TranslationContext !== undefined) {
                                        return TranslationContext.td.abc
                                      }
                                      else {
                                        return "ABC123"
                                      }
                                    })()
                                  }
                  </td>
                  <td>
                    <span className="table-btn table-green-btn">
                    {
                                    (() => {
                                      if (TranslationContext !== undefined) {
                                        return TranslationContext.span.solved
                                      }
                                      else {
                                        return "Solved"
                                      }
                                    })()
                                  }
                      </span>
                  </td>
                  <td className="table-img-cntr"></td>
                  <td>
                  {
                                    (() => {
                                      if (TranslationContext !== undefined) {
                                        return TranslationContext.td.needtochangemyshippingaddress
                                      }
                                      else {
                                        return "Need to change my shipping address"
                                      }
                                    })()
                                  }
                    {" "}
                    <span>
                    {
                                    (() => {
                                      if (TranslationContext !== undefined) {
                                        return TranslationContext.td.hopethishelppleaserateus
                                      }
                                      else {
                                        return "Hope this help, Please rate us"
                                      }
                                    })()
                                  }
                    </span>
                  </td>
                  <td>
                  {
                                    (() => {
                                      if (TranslationContext !== undefined) {
                                        return TranslationContext.td.defectivearticle
                                      }
                                      else {
                                        return "Defective article"
                                      }
                                    })()
                                  }
                    {" "}
                    <img className="info-icon" src={InfoIcon} alt="info-icon" />
                  </td>
                  <td>
                  {
                                    (() => {
                                      if (TranslationContext !== undefined) {
                                        return TranslationContext.td.high
                                      }
                                      else {
                                        return "High"
                                      }
                                    })()
                                  }
                  </td>
                  <td>

                  {
                                    (() => {
                                      if (TranslationContext !== undefined) {
                                        return TranslationContext.td.nraman
                                      }
                                      else {
                                        return "N Rampal"
                                      }
                                    })()
                                  }
                  </td>
                  <td>
                  {
                                    (() => {
                                      if (TranslationContext !== undefined) {
                                        return TranslationContext.td.twelvemarcheighty
                                      }
                                      else {
                                        return "12 March 2018"
                                      }
                                    })()
                                  }
                    {" "}
                    <img className="info-icon" src={InfoIcon} alt="info-icon" />
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="pagi">
              <ul>
                <li>
                  <a href={Demo.BLANK_LINK}>&lt;</a>
                </li>
                <li>
                  <a href={Demo.BLANK_LINK}>1
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
                  <a href={Demo.BLANK_LINK}>7
                  {
                                    (() => {
                                      if (TranslationContext !== undefined) {
                                        return TranslationContext.a.seven
                                      }
                                      else {
                                        return "7"
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
          </div>
        </div>
      </React.Fragment>
    );
  }
}

PrioritySettings.contextType = MyContext;
export default PrioritySettings;
