import React, { Component } from "react";
// import TableArr from "./../../assets/Images/gray-down-icon.png";
import ChartStatusLive from "./Charts/ChartStatusLive.js";
import DateTimeRangeContainer from "react-advanced-datetimerange-picker";
import LineTotalChat from "./Charts/LineTotalChat";
import moment from "moment";
import { Row, Col } from "react-bootstrap";
import { FormControl } from "react-bootstrap";
import { MyContext } from "./context"

// import Chart from "react-apexcharts";

class ChatDashboard extends Component {
  constructor(props) {
    super(props);
  let now = new Date();
    let start = moment(
      new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0)
    );
    let end = moment(start)
      .add(1, "days")
      .subtract(1, "seconds");
    this.state = {
      start: start,
      end: end,
      chatstatus: true,
      daterange: "Today",
      daterangeszie: "870px",
      good: "70%",
      bad: "30%"
    };
  }

  

  mainDashboard = () => {
    this.props.history.push("/admin/dashboard");
  };
  daterangefunction = () => {
    if (this.state.chatstatus) {
      this.setState({
        chatstatus: false,
        daterange: "Last 7 Days",
        daterangeszie: "838px"
      });
    } else {
      this.setState({
        chatstatus: true,
        daterange: "Today",
        daterangeszie: "870px"
      });
    }
  };
   applyCallback = async (startDate, endDate) => {
    debugger;
    await this.setState({
      start: startDate,
      end: endDate,
    });
     
  };

  render() {
    const TranslationContext = this.context.state.translateLanguage.default
      let now = new Date();
    let start = moment(
      new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0)
    );
    let end = moment(start)
      .add(1, "days")
      .subtract(1, "seconds");
    let ranges = {
      "Today Only": [moment(start), moment(end)],
      "Yesterday Only": [
        moment(start).subtract(1, "days"),
        moment(end).subtract(1, "days")
      ],
      "3 Days": [moment(start).subtract(3, "days"), moment(end)]
    };
     let local = {
      format: "DD-MM-YYYY",
      sundayFirst: false
    };
     let value = `${this.state.start.format(
      "DD-MM-YYYY"
    )} - ${this.state.end.format("DD-MM-YYYY")}`;
    let disabled = false;
    return (
      <div>
        <div className="Chat-main-header dash-dropdowns">
          <div className="row" style={{width: "100%"}}>
           <div className="col-md-6">
           <div className="d-flex dashallbrand1">
           <div>
              <span>
                
                {
                                    (() => {
                                      if (TranslationContext !== undefined) {
                                        return TranslationContext.span.brand
                                      }
                                      else {
                                        return "Brand"
                                      }
                                    })()
                                  }
                <div className="dropdown">
                  <button
                    className="dropdown-toggle dashallbrand"
                    type="button"
                    data-toggle="dropdown"
                  >
                    <span className="EMFCText">
                      
                      {
                                    (() => {
                                      if (TranslationContext !== undefined) {
                                        return TranslationContext.span.all
                                      }
                                      else {
                                        return "All"
                                      }
                                    })()
                                  }
                      </span>
                  </button>
                  <ul className="dropdown-menu">
                    <li>
                      <label htmlFor="one">
                        <input type="checkbox" id="one" className="ch1" />
                        <span className="ch1-text">
                         
                          {
                                    (() => {
                                      if (TranslationContext !== undefined) {
                                        return TranslationContext.span.bata1
                                      }
                                      else {
                                        return "Bata 1"
                                      }
                                    })()
                                  }
                          </span>
                      </label>
                    </li>
                    <li>
                      <label htmlFor="two">
                        <input type="checkbox" id="two" className="ch1" />
                        <span className="ch1-text">
                          
                          {
                                    (() => {
                                      if (TranslationContext !== undefined) {
                                        return TranslationContext.span.bata2
                                      }
                                      else {
                                        return "Bata 2"
                                      }
                                    })()
                                  }
                          
                          </span>
                      </label>
                    </li>
                    <li>
                      <label htmlFor="three">
                        <input type="checkbox" id="three" className="ch1" />
                        <span className="ch1-text">
                          
                          {
                                    (() => {
                                      if (TranslationContext !== undefined) {
                                        return TranslationContext.span.bata3
                                      }
                                      else {
                                        return "Bata 3"
                                      }
                                    })()
                                  }
                          
                          </span>
                      </label>
                    </li>
                    <li>
                      <label htmlFor="four">
                        <input type="checkbox" id="four" className="ch1" />
                        <span className="ch1-text">
                          
                          {
                                    (() => {
                                      if (TranslationContext !== undefined) {
                                        return TranslationContext.span.bata4
                                      }
                                      else {
                                        return "Bata 4"
                                      }
                                    })()
                                  }
                          </span>
                      </label>
                    </li>
                  </ul>
                </div>
              </span>
            </div>
             {/* <div style={{display: "inline"}}>
              <label className="lable-text">
                Brand :<b> All</b>
              </label>
              <img
                src={TableArr}
                alt="down-arrow"
                className="sort-down-arrow"
              />
            </div> */}
             <div>
              <span>
                
                {
                                    (() => {
                                      if (TranslationContext !== undefined) {
                                        return TranslationContext.span.agentcolon
                                      }
                                      else {
                                        return "Agent :"
                                      }
                                    })()
                                  }
                <div className="dropdown">
                  <button
                    className="dropdown-toggle dashallbrand"
                    type="button"
                    data-toggle="dropdown"
                  >
                    <span className="EMFCText">
                      
                      {
                                    (() => {
                                      if (TranslationContext !== undefined) {
                                        return TranslationContext.span.all
                                      }
                                      else {
                                        return "All"
                                      }
                                    })()
                                  }
                      </span>
                  </button>
                  <ul className="dropdown-menu">
                    <li>
                      <label htmlFor="one">
                        <input type="checkbox" id="one" className="ch1" />
                        <span className="ch1-text">
                         
                          {
                                    (() => {
                                      if (TranslationContext !== undefined) {
                                        return TranslationContext.span.bata1
                                      }
                                      else {
                                        return "Bata 1"
                                      }
                                    })()
                                  }
                          </span>
                      </label>
                    </li>
                    <li>
                      <label htmlFor="two">
                        <input type="checkbox" id="two" className="ch1" />
                        <span className="ch1-text">
                         
                          {
                                    (() => {
                                      if (TranslationContext !== undefined) {
                                        return TranslationContext.span.bata2
                                      }
                                      else {
                                        return "Bata 2"
                                      }
                                    })()
                                  }
                          </span>
                      </label>
                    </li>
                    <li>
                      <label htmlFor="three">
                        <input type="checkbox" id="three" className="ch1" />
                        <span className="ch1-text">
                         
                          {
                                    (() => {
                                      if (TranslationContext !== undefined) {
                                        return TranslationContext.span.bata3
                                      }
                                      else {
                                        return "Bata 3"
                                      }
                                    })()
                                  }
                          </span>
                      </label>
                    </li>
                    <li>
                      <label htmlFor="four">
                        <input type="checkbox" id="four" className="ch1" />
                        <span className="ch1-text">
                         
                          {
                                    (() => {
                                      if (TranslationContext !== undefined) {
                                        return TranslationContext.span.bata4
                                      }
                                      else {
                                        return "Bata 4"
                                      }
                                    })()
                                  }
                          </span>
                      </label>
                    </li>
                  </ul>
                </div>
              </span>
            </div>
             {/* <div style={{display: "inline" , marginRight: "10px"}}>
              <label className="lable-text">
                Agent :<b> All</b>
              </label>
              <img
                src={TableArr}
                alt="down-arrow"
                className="sort-down-arrow"
              />
            </div> */}
            </div>
           </div>
            <div className="col-md-6">
              <div className="d-flex" style={{float: "right"}}>
              <span>
                
                {
                                    (() => {
                                      if (TranslationContext !== undefined) {
                                        return TranslationContext.span.datarangecolon
                                      }
                                      else {
                                        return "Date Range :"
                                      }
                                    })()
                                  }
                </span>
              <div className="DashTimeRange">
                <Row className="show-grid" style={{ textAlign: "center" }}>
                  {/* <Col xs={3} /> */}
                  <Col xs={6} md={12} id="DateTimeRangeContainerNoMobileMode">
                    <DateTimeRangeContainer
                      ranges={ranges}
                      start={this.state.start}
                      end={this.state.end}
                      local={local}
                      applyCallback={this.applyCallback}
                      smartMode
                      leftMode
                      // forceMobileMode
                      noMobileMode
                    >
                      <FormControl
                        id="formControlsTextB"
                        type="text"
                        label="Text"
                        placeholder="Enter text"
                        style={{ cursor: "pointer" }}
                        disabled={disabled}
                        value={value}
                      />
                    </DateTimeRangeContainer>
                  </Col>
                  {/* <Col xs={3} md={4} /> */}
                </Row>
              </div>
            </div>
            </div>
          </div>
        </div>
        <div className="float-search-chat" onClick={this.mainDashboard}>
          <small className="back-to-main-dashboa">
            
            {
                                    (() => {
                                      if (TranslationContext !== undefined) {
                                        return TranslationContext.small.backtomaindashboard
                                      }
                                      else {
                                        return "BACK TO MAIN DASHBOARD"
                                      }
                                    })()
                                  }
            </small>
        </div>
        <div className="container-fluid btm-mar">
          <div className="row">
            <div className="col-lg-3">
              <div className="team-mamber-card">
                <p className="card-titel chat-lbl1">
                  
                  {
                                    (() => {
                                      if (TranslationContext !== undefined) {
                                        return TranslationContext.p.teammember
                                      }
                                      else {
                                        return "Team member"
                                      }
                                    })()
                                  }
                  </p>
                <div className="aside-cont-new-1 addmargin">
                  <div className="row">
                    <div className="">
                      <span className="card-content-number">
                        
                        {
                                    (() => {
                                      if (TranslationContext !== undefined) {
                                        return TranslationContext.span.ten
                                      }
                                      else {
                                        return "10"
                                      }
                                    })()
                                  }
                        </span>
                      <br />
                      <small className="card-content-text">
                        
                        
                        {
                                    (() => {
                                      if (TranslationContext !== undefined) {
                                        return TranslationContext.small.totalagent
                                      }
                                      else {
                                        return "TOTAL AGENTS"
                                      }
                                    })()
                                  }
                        </small>
                    </div>
                    <div className="col-md-4">
                      <span
                        className="card-content-number"
                        style={{ paddingLeft: "11px" }}
                      >
                        
                        {
                                    (() => {
                                      if (TranslationContext !== undefined) {
                                        return TranslationContext.span.zeroeight
                                      }
                                      else {
                                        return "08"
                                      }
                                    })()
                                  }

                      </span>
                      <br />
                      <small
                        className="card-content-text"
                        style={{ paddingLeft: "10px" }}
                      >
                        

                        {
                                    (() => {
                                      if (TranslationContext !== undefined) {
                                        return TranslationContext.small.loggedin
                                      }
                                      else {
                                        return "lOGGED IN"
                                      }
                                    })()
                                  }

                      </small>
                    </div>
                    <div className="">
                      <span
                        className="card-content-number"
                        style={{ paddingLeft: "29px" }}
                      >
                       
                         
                        {
                                    (() => {
                                      if (TranslationContext !== undefined) {
                                        return TranslationContext.span.zeroeight
                                      }
                                      else {
                                        return "08"
                                      }
                                    })()
                                  }
                      </span>
                      <br />
                      <small
                        className="card-content-text"
                        style={{ paddingLeft: "28px" }}
                      >
                        
                        {
                                    (() => {
                                      if (TranslationContext !== undefined) {
                                        return TranslationContext.small.offline
                                      }
                                      else {
                                        return "OFFLINE"
                                      }
                                    })()
                                  }

                      </small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="response-speed-card">
                <div className="row">
                  <div className="col-lg-6">
                    <p className="card-titel chat-lbl2">
                      
                      {
                                    (() => {
                                      if (TranslationContext !== undefined) {
                                        return TranslationContext.p.responsespeed
                                      }
                                      else {
                                        return "Response Speed"
                                      }
                                    })()
                                  }
                      </p>
                  </div>
                  <div className="col-lg-6">
                    <select className="response-speed-dropdown select-text">
                      <option>
                      {
                                    (() => {
                                      if (TranslationContext !== undefined) {
                                        return TranslationContext.option.last15mint
                                      }
                                      else {
                                        return "LAST 15 MINS"
                                      }
                                    })()
                                  }

                      </option>
                      <option>LAST 10 MINS
                      {
                                    (() => {
                                      if (TranslationContext !== undefined) {
                                        return TranslationContext.option.last10mint
                                      }
                                      else {
                                        return "LAST 10 MINS"
                                      }
                                    })()
                                  }

                      </option>
                      <option>LAST 5 MINS
                      {
                                    (() => {
                                      if (TranslationContext !== undefined) {
                                        return TranslationContext.option.last5mint
                                      }
                                      else {
                                        return "LAST 5 MINS"
                                      }
                                    })()
                                  }

                      </option>
                      <option>
                      {
                                    (() => {
                                      if (TranslationContext !== undefined) {
                                        return TranslationContext.option.all
                                      }
                                      else {
                                        return "ALL"
                                      }
                                    })()
                                  }

                      </option>
                    </select>
                  </div>
                </div>

                <div className="row response-row">
                  <div className="col-md-3">
                    <span
                      className="card-content-number"
                      style={{ textAlign: "center" }}
                    >
                      
                      {
                                    (() => {
                                      if (TranslationContext !== undefined) {
                                        return TranslationContext.span.ten
                                      }
                                      else {
                                        return "10"
                                      }
                                    })()
                                  }
                      <small className="response-small"> 
                      
                      {
                                    (() => {
                                      if (TranslationContext !== undefined) {
                                        return TranslationContext.small.sec
                                      }
                                      else {
                                        return "Sec"
                                      }
                                    })()
                                  }
                      </small>
                    </span>
                    <br />
                    <small className="response-card-content-text">
                     
                      {
                                    (() => {
                                      if (TranslationContext !== undefined) {
                                        return TranslationContext.small.firstresponse
                                      }
                                      else {
                                        return "FIRST RESPONSE"
                                      }
                                    })()
                                  }
                    </small>
                  </div>
                  <div className="col-md-3">
                    <span className="card-content-number">
                      
                      {
                                    (() => {
                                      if (TranslationContext !== undefined) {
                                        return TranslationContext.span.zeroeight
                                      }
                                      else {
                                        return "08"
                                      }
                                    })()
                                  }
                      <small className="response-small">
                        
                        {
                                    (() => {
                                      if (TranslationContext !== undefined) {
                                        return TranslationContext.small.sec
                                      }
                                      else {
                                        return "Sec"
                                      }
                                    })()
                                  }
                        </small>
                    </span>
                    <br />
                    <small className="response-card-content-text">
                      
                      {
                                    (() => {
                                      if (TranslationContext !== undefined) {
                                        return TranslationContext.small.overallresponse
                                      }
                                      else {
                                        return "OVERALL RESPONSE"
                                      }
                                    })()
                                  }
                    </small>
                  </div>
                  <div className="col-md-3">
                    <span className="card-content-number">
                      
                      {
                                    (() => {
                                      if (TranslationContext !== undefined) {
                                        return TranslationContext.span.zerofive
                                      }
                                      else {
                                        return "05"
                                      }
                                    })()
                                  }
                      <small className="response-small">
                        
                        {
                                    (() => {
                                      if (TranslationContext !== undefined) {
                                        return TranslationContext.small.min
                                      }
                                      else {
                                        return "Min"
                                      }
                                    })()
                                  }
                        </small>
                    </span>
                    <br />
                    <small className="response-card-content-text">
                      
                      {
                                    (() => {
                                      if (TranslationContext !== undefined) {
                                        return TranslationContext.small.overallresponse
                                      }
                                      else {
                                        return "OVERALL RESPONSE"
                                      }
                                    })()
                                  }
                    </small>
                  </div>
                  <div className="col-md-3">
                    <span className="card-content-number">
                      
                      {
                                    (() => {
                                      if (TranslationContext !== undefined) {
                                        return TranslationContext.span.zerotwo
                                      }
                                      else {
                                        return "02"
                                      }
                                    })()
                                  }
                      <small className="response-small">
                        
                        {
                                    (() => {
                                      if (TranslationContext !== undefined) {
                                        return TranslationContext.small.min
                                      }
                                      else {
                                        return "Min"
                                      }
                                    })()
                                  }
                        </small>
                    </span>
                    <br />
                    <small className="response-card-content-text">
                      
                      {
                                    (() => {
                                      if (TranslationContext !== undefined) {
                                        return TranslationContext.small.waitinqueue
                                      }
                                      else {
                                        return "WAIT IN QUEUE"
                                      }
                                    })()
                                  }
                    </small>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3">
              <div className="chat-status-card">
                <p className="card-titel chat-lbl3">Chat Status</p>
                <div className="aside-cont-new-1 removeleft-1">
                  {this.state.chatstatus ? (
                    <div className="row" id="today">
                      <div className="col-md-4" style={{ marginLeft: "20px" }}>
                        <span
                          className="card-content-number"
                          style={{ paddingLeft: "50px" }}
                        >
                         
                          {
                                    (() => {
                                      if (TranslationContext !== undefined) {
                                        return TranslationContext.span.ten
                                      }
                                      else {
                                        return "10"
                                      }
                                    })()
                                  }
                        </span>
                        <br />
                        <small
                          className="card-content-text"
                          style={{ paddingLeft: "10px", width: "150px" }}
                        >
                          
                          {
                                    (() => {
                                      if (TranslationContext !== undefined) {
                                        return TranslationContext.small.assignedandnotreplied
                                      }
                                      else {
                                        return "ASSIGNED & NOT REPLIED"
                                      }
                                    })()
                                  }
                        </small>
                      </div>
                    </div>
                  ) : (
                    <div className="row" id="last7day">
                      <div className="col-md-4" style={{ marginLeft: "25px" }}>
                        <span
                          className="card-content-number"
                          style={{ paddingLeft: "20px" }}
                        >
                          
                          {
                                    (() => {
                                      if (TranslationContext !== undefined) {
                                        return TranslationContext.small.seventysix
                                      }
                                      else {
                                        return "76"
                                      }
                                    })()
                                  }
                        </span>
                        <br />
                        <small
                          className="card-content-text"
                          style={{ paddingLeft: "25px", width: "150px" }}
                        >
                          
                          {
                                    (() => {
                                      if (TranslationContext !== undefined) {
                                        return TranslationContext.small.ocr
                                      }
                                      else {
                                        return "OCR"
                                      }
                                    })()
                                  }
                        </small>
                      </div>
                      <div className="col-md-6" style={{ marginLeft: "18px" }}>
                        <span
                          className="card-content-number"
                          style={{ paddingLeft: "30px" }}
                        >
                          
                          {
                                    (() => {
                                      if (TranslationContext !== undefined) {
                                        return TranslationContext.span.fortyfive
                                      }
                                      else {
                                        return "45"
                                      }
                                    })()
                                  }
                        </span>
                        <br />
                        <small
                          className="card-content-text"
                          style={{ paddingLeft: "10px", width: "150px" }}
                        >
                          
                          {
                                    (() => {
                                      if (TranslationContext !== undefined) {
                                        return TranslationContext.small.chattoticket
                                      }
                                      else {
                                        return "CHAT TO TICKET"
                                      }
                                    })()
                                  }
                        </small>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container-fluid btm-mar">
          <div className="row">
            <div className="col-lg-6">
              <div className="chat-live-card">
                <p className="card-titel chat-lbl4">Chat Status Live</p>
                <div className="row">
                  <div className="chartstatuslive-details-div">
                    <label className="chartstatuslive-details">
                      
                      {
                                    (() => {
                                      if (TranslationContext !== undefined) {
                                        return TranslationContext.label.totalcolon
                                      }
                                      else {
                                        return "Total :"
                                      }
                                    })()
                                  }
                       <b>
                         
                         {
                                    (() => {
                                      if (TranslationContext !== undefined) {
                                        return TranslationContext.b.twohundred
                                      }
                                      else {
                                        return "200"
                                      }
                                    })()
                                  }
                         </b>
                    </label>
                    <label className="chartstatuslive-details">
                       
                      {
                                    (() => {
                                      if (TranslationContext !== undefined) {
                                        return TranslationContext.label.inqueuecolon
                                      }
                                      else {
                                        return "In Queue :"
                                      }
                                    })()
                                  }
                      <b>
                        
                        {
                                    (() => {
                                      if (TranslationContext !== undefined) {
                                        return TranslationContext.b.ninetyfive
                                      }
                                      else {
                                        return "95"
                                      }
                                    })()
                                  }
                      </b>
                    </label>
                    <label className="chartstatuslive-details">
                      
                      {
                                    (() => {
                                      if (TranslationContext !== undefined) {
                                        return TranslationContext.label.ongoingcolon
                                      }
                                      else {
                                        return "Ongoing :"
                                      }
                                    })()
                                  }
                       <b>
                       {
                                    (() => {
                                      if (TranslationContext !== undefined) {
                                        return TranslationContext.b.onehundredfive
                                      }
                                      else {
                                        return "105"
                                      }
                                    })()
                                  }
                       </b>
                    </label>
                  </div>
                  <div className="">
                    <ChartStatusLive />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="chat-score-card">
                <p className="card-titel chat-lbl6">
                  
                  {
                                    (() => {
                                      if (TranslationContext !== undefined) {
                                        return TranslationContext.p.chatsatisfactionscore
                                      }
                                      else {
                                        return "Chat Satisfaction Score"
                                      }
                                    })()
                                  }
                  </p>

                <div className="Chat-Satisfaction-chat">
                  <div
                    className="Chat-Satisfaction-chat-good"
                    style={{ width: this.state.good }}
                  >
                    <label className="Chat-Satisfaction-chat-detail">
                      {this.state.good}
                    </label>
                  </div>
                  <div
                    className="Chat-Satisfaction-chat-bad"
                    style={{ width: this.state.bad }}
                  >
                    <label className="Chat-Satisfaction-chat-detail">
                      {this.state.bad}
                    </label>
                  </div>
                </div>
                <div style={{ marginTop: "10px" }}>
                  <label
                    className="good-bad-text"
                    style={{ float: "left", paddingLeft: "35px" }}
                  >
                    
                    {
                                    (() => {
                                      if (TranslationContext !== undefined) {
                                        return TranslationContext.label.good
                                      }
                                      else {
                                        return "Good"
                                      }
                                    })()
                                  }
                  </label>
                  <label
                    className="good-bad-text"
                    style={{ float: "right", paddingRight: "170px" }}
                  >
                    
                    {
                                    (() => {
                                      if (TranslationContext !== undefined) {
                                        return TranslationContext.label.bad
                                      }
                                      else {
                                        return "Bad"
                                      }
                                    })()
                                  }
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container-fluid btm-mar">
          <div className="row">
            <div className="col-lg-9">
              <div className="total-chat-card">
                <p className="card-titel chat-lbl7">
                 
                  {
                                    (() => {
                                      if (TranslationContext !== undefined) {
                                        return TranslationContext.p.totalchatcoloneveryhours
                                      }
                                      else {
                                        return "Total Chat - Every Hour"
                                      }
                                    })()
                                  }
                  </p>
                <div className="dash-linechart">
                  <LineTotalChat />
                </div>
              </div>
            </div>
            <div className="col-lg-3">
              <div className="missed-chat-card">
                <p className="card-titel chat-lbl5">
                  
                  {
                                    (() => {
                                      if (TranslationContext !== undefined) {
                                        return TranslationContext.p.missedchat
                                      }
                                      else {
                                        return "Missed Chat"
                                      }
                                    })()
                                  }
                  </p>
                <p className="missed-chat-30 team-member-30">
                  
                  {
                                    (() => {
                                      if (TranslationContext !== undefined) {
                                        return TranslationContext.p.thirty
                                      }
                                      else {
                                        return "30"
                                      }
                                    })()
                                  }
                  </p>
                <p className="team-member-center-text teamchat-p">
                  
                  {
                                    (() => {
                                      if (TranslationContext !== undefined) {
                                        return TranslationContext.p.eighteencolonnewvisitor
                                      }
                                      else {
                                        return "18 : New Visitor"
                                      }
                                    })()
                                  }
                  </p>

                <p className="team-member-center-text teamchat-p">
                  
                  {
                                    (() => {
                                      if (TranslationContext !== undefined) {
                                        return TranslationContext.p.twelvecolonreturningvisitor
                                      }
                                      else {
                                        return "12 : Returning Visitor"
                                      }
                                    })()
                                  }
                </p>

                <p className="team-member-p">
                  <small className="missed-chat-small-text">
                    
                    {
                                    (() => {
                                      if (TranslationContext !== undefined) {
                                        return TranslationContext.small.fivecolongold
                                      }
                                      else {
                                        return "05 : Gold"
                                      }
                                    })()
                                  }
                    </small>
                  <small className="missed-chat-small-text">
                    
                    {
                                    (() => {
                                      if (TranslationContext !== undefined) {
                                        return TranslationContext.small.sixcolonplatinum
                                      }
                                      else {
                                        return "06 : Platinum"
                                      }
                                    })()
                                  }
                  </small>
                  <small className="missed-chat-small-text">
                    
                    {
                                    (() => {
                                      if (TranslationContext !== undefined) {
                                        return TranslationContext.small.onecolonsilver
                                      }
                                      else {
                                        return "01 : Sliver"
                                      }
                                    })()
                                  }
                    </small>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}


ChatDashboard.contextType = MyContext;
export default ChatDashboard;
