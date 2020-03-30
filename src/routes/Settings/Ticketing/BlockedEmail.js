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

class BlockEmail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            AddBlockEmailPopup: false,
            BlockEmailData: [],
            loading: false,
            BlockEmailID:0,
            EmailIDs: "",
            Reason: "",
            errors: {}
        };
    }

    componentDidMount() {
      this.handleBlockEmailList();                                        
    }

    AddNewEmailID = () => {
        debugger;
        this.setState({ AddBlockEmailPopup: true, errors: {}, BlockEmailID: 0, EmailIDs: "", Reason:""  });
    };

    handleAddEmailClose = () => {
        this.setState({ AddBlockEmailPopup: false });
    };

    handleValidation() {
      let errors = this.state.errors;
      let formIsValid = true;
      var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if (!this.state.EmailIDs) {
        formIsValid = false;
        errors["EmailIDs"] = "Please enter email id";
      } else {
        var emailIds = this.state.EmailIDs
        var arr = emailIds.split(",");
        arr.forEach(element => {
          if(!re.test(element)){
            formIsValid = false;
            errors["EmailIDs"] = "Invalid email id";
          }
        });
      }
      if (!this.state.Reason){
        formIsValid = false;
        errors["Reason"] = "Please enter reason";
      }      
      this.setState({ errors: errors });
      return formIsValid;
    }

    handleBlockEmailList = () =>{
        let self = this;
        this.setState({ loading: true });
        axios({
          method: "get",
          url: config.apiUrl + "/BlockEmail/ListEmailBlock",
          headers: authHeader()
        }).then(function(res) {
          debugger;
          var status = res.data.message;
          var data = res.data.responseData;   
          if(status === "Success"){
            self.setState({
              BlockEmailData: data          
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

    handleSaveBlockEmail = () =>{
      if (this.handleValidation()) {
        let self = this;
        axios({
          method: "post",
          url: config.apiUrl + "/BlockEmail/AddEmailBlock",
          headers: authHeader(),
          data: {
            EmailID: this.state.EmailIDs,
            Reason: this.state.Reason
          }
        }).then(function(res) {
          if(res.data.message === "Success")
          {
            this.setState({ loading: true });
            NotificationManager.success(
              "Record saved successfully"
            );
            self.handleAddEmailClose();  
            self.handleBlockEmailList();
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

    handleEditBlockEmail(row) {
      this.state.BlockEmailID = row["blockEmailID"];
      this.state.EmailIDs = row["emailID"];
      this.state.Reason = row["reason"];
      this.setState({ AddBlockEmailPopup: true, errors: {} });
    }

    handleUpdateBlockEmail = () =>{
      if(this.handleValidation()) {
        let self = this;
        axios({
          method: "post",
          url: config.apiUrl + "/BlockEmail/UpdateEmailBlock",
          headers: authHeader(),
          data: {
            BlockEmailID: this.state.BlockEmailID,
            EmailID: this.state.EmailIDs,
            Reason: this.state.Reason
          }
        }).then(function(res) {
          if(res.data.message === "Success")
          {
            NotificationManager.success(
              "Record updated successfully"
            );
            self.handleAddEmailClose(); 
            self.handleBlockEmailList();          
          }else{
            NotificationManager.error(
              res.data.message
            );
          }
        }).catch(data => {
          console.log(data);
        });
      }
    }

    handleDeleteBlockEmail(blockEmailID){
      let self = this;
      axios({
        method: "post",
        url: config.apiUrl + "/BlockEmail/DeleteEmailBlock?blockEmailID="+blockEmailID,
        headers: authHeader()
      }).then(function(res) {
        debugger;
        if(res.data.message === "Success")
        {
          NotificationManager.success(
            "Record deleted successfully"
          );
          self.handleBlockEmailList();       
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
        const datablockemail = this.state.BlockEmailData;
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
                    Blocked Email ID
                </Link>
                <div className="reportbutton">
                    <div className="addplus">
                    <button
                        type="button"
                        className="addplusbtnReport"
                        onClick={this.AddNewEmailID}
                    >
                        + Add New
                    </button>
                    </div>
                </div>
                <Modal
                  onClose={this.handleAddEmailClose}
                  open={this.state.AddBlockEmailPopup}
                  modalId="BlockEmailModel"
                  overlayId="logout-ovrly"
                >
                    <div className="setting-tabs alert-tabs">
                    <label style={{marginLeft:"194px", fontSize:"large"}}>Add New Email ID into Block List</label>
                    <img
                      src={CancelImg}
                      alt="CancelImg"
                      className="block-cancelImg"
                      onClick={this.handleAddEmailClose}
                    />
                  </div>
                  <div class="tab-content">
                    <div className="pop-upAddSearchPD">
                      <div className="row row-margin1">
                        <div className="col-md-12">
                          <textarea
                            className="txt-1"
                            placeholder="Enter Email ID"
                            name="EmailIDs"
                            value={this.state.EmailIDs}
                            onChange={this.handleChange}
                          />
                          <p style={{ color: "red", marginBottom: "0px" }}>
                            {this.state.errors["EmailIDs"]}
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
                        <button
                          type="button"
                          className="butn add-cust-butn"
                          onClick={this.state.BlockEmailID === 0? this.handleSaveBlockEmail:this.handleUpdateBlockEmail}
                          disabled={this.state.loading}
                        >
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
                  data={datablockemail}
                  columns={[
                    {
                      Header: (
                        <span>
                          Email Id
                          <FontAwesomeIcon icon={faCaretDown} />
                        </span>
                      ),
                      accessor: "emailID"
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
                            Blocked Date
                        <FontAwesomeIcon icon={faCaretDown} />
                        </span>
                      ),
                        accessor: "blockedDate",
                      },
                    {
                      Header: (
                        <span>
                          Blocked By
                          <FontAwesomeIcon icon={faCaretDown} />
                        </span>
                      ),
                      accessor: "blockedBy",
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
                                        Delete file?
                                      </p>
                                      <p className="mt-1 fs-12">
                                        Are you sure you want to delete this
                                        file?
                                      </p>
                                      <div className="del-can">
                                        <a>CANCEL</a>
                                        <button
                                          className="butn"
                                          onClick={this.handleDeleteBlockEmail.bind(
                                            this,
                                            row.original.blockEmailID
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
                              onClick={this.handleEditBlockEmail.bind(
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

export default BlockEmail;