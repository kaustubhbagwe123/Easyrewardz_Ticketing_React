import React, { Component, Fragment } from "react";
import Demo from "../../../store/Hashtag";
import { Link } from "react-router-dom";
import ReactTable from "react-table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import Modal from "react-responsive-modal";
import CancelImg from "./../../../assets/Images/Circle-cancel.png";
import { Popover } from "antd";
import BlackInfoIcon from "./../../../assets/Images/Info-black.png";
import RedDeleteIcon from "./../../../assets/Images/red-delete-icon.png";
import DelBigIcon from "./../../../assets/Images/del-big.png";
import { authHeader } from "../../../helpers/authHeader";
import axios from "axios";
import config from "../../../helpers/config";
import {
  NotificationManager
} from "react-notifications";

class JunkWords extends Component {
    constructor(props) {
        super(props);
        this.state = {
            AddJunkWordsPopup: false,
            JunkWordsData: [],
            loading: false,
            JunkKeywordID:0,
            JunkWords: "",
            Reason: "",
            errors: {}
        };
    }

    componentDidMount() {
      this.handleJunkWordsList();                                        
    }

    AddNewJunkWords = () => {
        this.setState({ AddJunkWordsPopup: true, errors: {}, JunkKeywordID: 0, JunkWords: "", Reason:""  });
    };

    handleAddJunkClose = () => {
        this.setState({ AddJunkWordsPopup: false });
    };

    handleValidation() {
      let errors = this.state.errors;
      let formIsValid = true;
      if (!this.state.JunkWords) {
        formIsValid = false;
        errors["JunkWords"] = "Please enter junk words";
      } 
      if (!this.state.Reason){
        formIsValid = false;
        errors["Reason"] = "Please enter reason";
      }      
      this.setState({ errors: errors });
      return formIsValid;
    }

    handleJunkWordsList = () =>{
        let self = this;
        this.setState({ loading: true });
        axios({
          method: "get",
          url: config.apiUrl + "/JunkWords/ListJunkWords",
          headers: authHeader()
        }).then(function(res) {
          debugger;
          var status = res.data.message;
          var data = res.data.responseData;   
          if(status === "Success"){
            self.setState({
              JunkWordsData: data          
            });
          }
          self.setState({
            loading: false    
          });       
        }).catch(data => {
          console.log(data);
        });
    }

    handleChange = e =>{
      this.setState({ [e.currentTarget.name]: e.currentTarget.value });
    }

    handleSaveJunkWords = () =>{
      if (this.handleValidation()) {
        let self = this;
        axios({
          method: "post",
          url: config.apiUrl + "/JunkWords/AddJunkWords",
          headers: authHeader(),
          data: {
            JunkKeyword: this.state.JunkWords,
            Reason: this.state.Reason
          }
        }).then(function(res) {
          if(res.data.message === "Success")
          {
            self.setState({ loading: true });
            NotificationManager.success(
              "Record saved successfully"
            );
            self.handleJunkWordsList();
            self.handleAddJunkClose();  
          }
          else{
            NotificationManager.error(
              res.data.message
            );
          }
        }).catch(data => {
          console.log(data);
        });
      }
    }

    handleEditJunkWords(row) {
      this.state.JunkKeywordID = row["junkKeywordID"];
      this.state.JunkWords = row["junkKeyword"];
      this.state.Reason = row["reason"];
      this.setState({ AddJunkWordsPopup: true, errors: {} });
    }

    handleUpdateJunkWords = () =>{
      if(this.handleValidation()) {
        let self = this;
        axios({
          method: "post",
          url: config.apiUrl + "/JunkWords/UpdateJunkWords",
          headers: authHeader(),
          data: {
            JunkKeywordID: this.state.JunkKeywordID,
            JunkKeyword: this.state.JunkWords,
            Reason: this.state.Reason
          }
        }).then(function(res) {
          if(res.data.message === "Success")
          {
            NotificationManager.success(
              "Record updated successfully"
            );
            self.handleAddJunkClose();
            self.handleJunkWordsList();            
          }
          else{
            NotificationManager.error(
              res.data.message
            );
          }
        }).catch(data => {
          console.log(data);
        });
      }
    }

    handleDeleteJunkWords(junkKeywordID){
      let self = this;
      axios({
        method: "post",
        url: config.apiUrl + "/JunkWords/DeleteJunkWords?junkKeywordID="+junkKeywordID,
        headers: authHeader()
      }).then(function(res) {
        if(res.data.message === "Success")
        {
          NotificationManager.success(
            "Record deleted successfully"
          );
          self.handleJunkWordsList();      
        }
        else{
          NotificationManager.error(
            res.data.message
          );
        }
      }).catch(data => {
        console.log(data);
      });
    }

    render(){
        const datajunkwords = this.state.JunkWordsData;
        return (
          <Fragment>
            <div className="container-fluid setting-title setting-breadcrumb">
                <Link to="settings" className="header-path">
                    Settings
                </Link>
                <span>&gt;</span>
                <Link to="settings" className="header-path">
                    Ticketing
                </Link>
                <span>&gt;</span>
                <Link to={Demo.BLANK_LINK} className="active header-path">
                    Junk Words
                </Link>
                <div className="reportbutton">
                    <div className="addplus">
                    <button
                        type="button"
                        className="addplusbtnReport"
                        onClick={this.AddNewJunkWords}
                    >
                        + Add New
                    </button>
                    </div>
                </div>
                <Modal
                  onClose={this.handleAddJunkClose}
                  open={this.state.AddJunkWordsPopup}
                  modalId="BlockEmailModel"
                  overlayId="logout-ovrly"
                >
                    <div className="setting-tabs alert-tabs">
                    <label style={{marginLeft:"227px", fontSize:"large"}}>Add New Junk Words</label>
                    <img
                      src={CancelImg}
                      alt="CancelImg"
                      className="block-cancelImg"
                      onClick={this.handleAddJunkClose}
                    />
                  </div>
                  <div class="tab-content">
                    <div className="pop-upAddSearchPD">
                      <div className="row row-margin1">
                        <div className="col-md-12">
                          <textarea
                            className="txt-1"
                            placeholder="Junk Words"
                            name="JunkWords"
                            value={this.state.JunkWords}
                            onChange={this.handleChange}
                          />
                          <p style={{ color: "red", marginBottom: "0px" }}>
                            {this.state.errors["JunkWords"]}
                          </p>
                        
                        </div>
                        
                      </div>
                      <div className="row row-margin1">
                        <div className="col-md-12">
                          <textarea
                            className="txt-1"
                            placeholder="Reason"
                            name="Reason"
                            value={this.state.Reason}
                            onChange={this.handleChange}
                          />
                          <p style={{ color: "red", marginBottom: "0px" }}>
                            {this.state.errors["Reason"]}
                          </p>
                        </div>
                      </div>
                      <div className="btn-block">
                        
                        {/* <Link onClick={this.handleAddCustomerSave}> */}
                        <button
                          type="button"
                          className="butn add-cust-butn"
                          onClick={this.state.JunkKeywordID === 0? this.handleSaveJunkWords:this.handleUpdateJunkWords}
                          disabled={this.state.loading}>
                            SAVE
                          {/* {this.state.loading ? (
                            <FontAwesomeIcon
                              className="circular-loader"
                              icon={faCircleNotch}
                              spin
                            />
                          ) : (
                            ""
                          )}
                          {this.state.loading ? "Please Wait ..." : "SAVE"} */}
                        </button>
                        {/* </Link> */}
                      </div>
                    </div>
                  </div>
                  </Modal>

            </div>
            <div className="container-fluid">
             <div className="store-settings-cntr settingtable reactreport">
              <div style={{ backgroundColor: "#fff" }}>
              {this.state.loading === true ? (
                <div className="loader-icon"></div>
              ) : (
                <ReactTable
                  data={datajunkwords}
                  columns={[
                    {
                      Header: (
                        <span>
                          Junk Words
                          <FontAwesomeIcon icon={faCaretDown} />
                        </span>
                      ),
                      accessor: "junkKeyword"
                    },
                    {
                      Header: (
                        <span>
                          Reason
                          <FontAwesomeIcon icon={faCaretDown} />
                        </span>
                      ),
                      accessor: "reason"
                    },
                    {
                      Header: (
                        <span>
                            Entered Date
                        <FontAwesomeIcon icon={faCaretDown} />
                        </span>
                      ),
                        accessor: "enteredDate",
                      },
                    {
                      Header: (
                        <span>
                          Entered By
                          <FontAwesomeIcon icon={faCaretDown} />
                        </span>
                      ),
                      accessor: "enteredBy",
                      Cell: row => {
                        var ids = row.original["Id"];
                        return (
                          <div>
                            <span>
                              Admin
                              <Popover
                                content={
                                  <>
                                    <div>
                                      <b>
                                        <p className="title">
                                          Updated By: {row.original.modifiedBy}
                                        </p>
                                      </b>
                                      <p className="sub-title">
                                        Updated Date:{" "}
                                        {row.original.modifiedDate}
                                      </p>
                                    </div>
                                  </>
                                }
                                placement="bottom"
                              >
                                <img
                                  className="info-icon-cp"
                                  src={BlackInfoIcon}
                                  alt="info-icon"
                                  id={ids}
                                />
                              </Popover>
                            </span>
                          </div>
                        );
                      }
                    },
                    {
                      Header: <span>Actions</span>,
                      accessor: "actionReport",
                      Cell: row => (
                        <div className="report-action">
                          <div>
                              <Popover
                                content={
                                  <div className="samdel d-flex general-popover popover-body">
                                    <div className="del-big-icon">
                                      <img src={DelBigIcon} alt="del-icon" />
                                    </div>
                                    <div>
                                      <p className="font-weight-bold blak-clr">
                                        Delete record?
                                      </p>
                                      <p className="mt-1 fs-12">
                                        Are you sure you want to delete this
                                        record?
                                      </p>
                                      <div className="del-can">
                                        <a>CANCEL</a>
                                        <button
                                          className="butn"
                                          onClick={this.handleDeleteJunkWords.bind(
                                            this,
                                            row.original.junkKeywordID
                                          )}
                                        >
                                          Delete
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                }
                                placement="bottom"
                                trigger="click"
                              >
                                <img
                                  src={RedDeleteIcon}
                                  alt="del-icon"
                                  className="del-btn"
                                />
                              </Popover>
                          </div>
                          <div>                    
                            <button
                              className="react-tabel-button editre"
                              id="p-edit-pop-2"
                              onClick={this.handleEditJunkWords.bind(
                                this,
                                row.original
                              )}
                            >
                              EDIT
                            </button>
                          </div>
                        </div>
                      )
                    }
                  ]}
                  resizable={false}
                  defaultPageSize={10}
                  showPagination={true}
                  minRows={1}
                />
              )}
              
            </div>
             </div>
            </div>
          </Fragment> 
        )
    }
}

export default JunkWords;