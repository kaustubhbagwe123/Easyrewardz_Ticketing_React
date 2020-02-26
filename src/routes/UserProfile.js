import React, { Component, Fragment } from "react";
import ProfileImg from "./../assets/Images/UserIcon.png";
import Modal from "react-responsive-modal";
import CancelImg from "./../assets/Images/Circle-cancel.png";
// import ProfileImg1 from "./../assets/Images/changeprofile.png";
import BlackInfoIcon from "./../assets/Images/Info-black.png";
import { authHeader } from "./../helpers/authHeader";
import axios from "axios";
import config from "./../helpers/config";
import {
  NotificationContainer,
  NotificationManager
} from "react-notifications";

class UserProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      fileName: "",
      selectedFirstName:"",
      selectedLastName:"",
      selectedMobile:"",
      selectedEmailID:"",
      selectedDesignation:0,
      DesignationData: []
    };
    this.handleGetDesignationList=this.handleGetDesignationList.bind(this);
    this.handleEditUserProfile=this.handleEditUserProfile.bind(this);
  }
  componentDidMount(){
    debugger;
    this.handleGetDesignationList();
  }
  onOpenModal = () => {
    this.setState({ open: true });
  };
  onCloseModal() {
    this.setState({ open: false });
  }
  fileUpload = e => {
    this.setState({ fileName: e.target.files[0].name });
  };
  fileDrop = e => {
    this.setState({ fileName: e.dataTransfer.files[0].name });
    e.preventDefault();
  };
  fileDragOver = e => {
    e.preventDefault();
  };
  fileDragEnter = e => {
    e.preventDefault();
  };
  setUserData=(e)=>{
    debugger;
    this.setState({
      [e.target.name]: e.target.value
  
    });
  };
  handleGetDesignationList() {
    debugger;

    let self = this;
   
    axios({
      method: "post",
      url: config.apiUrl + "/Designation/GetDesignationList",
      headers: authHeader()
    }).then(function (res) {
      debugger;
      let designationdata = res.data.responseData;
       let status=res.data.message;
       if(status==="Success"){
        self.setState({
          DesignationData: designationdata
  
        });
       }
      
      
    });
  }

  handleEditUserProfile() {
    debugger;
    let self=this;
    var json={
      UserId:15,
      FirstName:this.state.selectedFirstName,
      LastName:this.state.selectedLastName,
      MobileNo:this.state.selectedMobile,
      EmailId:this.state.selectedEmailID,
      DesignationID:this.state.selectedDesignation
    }
    var formData=new FormData();
    // formData.append("UserId",15);
    // formData.append("FirstName",this.state.selectedFirstName);
    // formData.append("LastName",this.state.selectedLastName);
    // formData.append("MobileNo",this.state.selectedMobile);
    // formData.append("EmailId",this.state.selectedEmailID);
    // formData.append("DesignationID",this.state.selectedDesignation);
    formData.append("UpdateUserProfiledetailsModel",json);
    formData.append("Imagefile",this.state.fileName);

    axios({
      method: "post",
      url: config.apiUrl + "/User/UpdateUserProfileDetails",
      headers: authHeader(),
      data:formData

    }).then(function (res) {
      debugger;
      let msg = res.data.message;
       if(msg==="Success"){
        NotificationManager.success("Profile updated successfully.");
       }
     
    });
  }

  render() {
    return (
      <Fragment>
         <NotificationContainer />
        <div className="container-fluid">
          <div className="profile-settings-cntr">
            <div className="row">
              <div className="col-md-12">
                <div className="profilemain">
                  <div className="half-circle">
                    <div className="imguserupload">
                      <img
                        src={ProfileImg}
                        alt="store-settings"
                        className="profimg"
                      />
                      <div className="uploadtextprofile">
                        <input
                          id="file-upload"
                          //className="d-none file-uploadprofile"
                          type="file"
                          onChange={this.fileUpload}
                        />
                        <label
                          htmlFor="file-upload"
                          onDrop={this.fileDrop}
                          onDragOver={this.fileDragOver}
                          onDragEnter={this.fileDragEnter}
                        >
                          <span className="uploadtextprofile1">Upload</span>
                        </label>
                        {this.state.fileName && (
                          <div className="file-info">
                            <div className="file-cntr">
                              <div className="file-dtls">
                                <p className="file-name">
                                  {this.state.fileName}
                                </p>
                                <div className="del-file" id="del-file-1"></div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="centerprofile col-md-5">
                    <div className="divSpace">
                      <div className="">
                        <label className="designation-name">First Name</label>
                        <input
                          type="text"
                          className="txt-1"
                          placeholder="Enter Name"
                          name="selectedFirstName"
                          value={this.state.selectedFirstName}
                          onChange={this.setUserData.bind(this)}
                        />
                      </div>
                    </div>
                    <div className="divSpace">
                      <div className="">
                        <label className="designation-name">Last Name</label>
                        <input
                          type="text"
                          className="txt-1"
                          placeholder="Enter Name"
                          name="selectedLastName"
                          value={this.state.selectedLastName}
                          onChange={this.setUserData.bind(this)}
                        />
                      </div>
                    </div>
                    <div className="divSpace">
                      <div className="">
                        <label className="reports-to">Mobile No.</label>
                        <input
                          type="text"
                          className="txt-1"
                          placeholder="Enter Mobile Number"
                          name="selectedMobile"
                          value={this.state.selectedMobile}
                          onChange={this.setUserData.bind(this)}
                        />
                      </div>
                    </div>

                    <div className="divSpace">
                      <div className="">
                        <label className="reports-to">Email ID</label>
                        <input
                          type="text"
                          className="txt-1"
                          placeholder="Enter Email"
                          name="selectedEmailID"
                          value={this.state.selectedEmailID}
                          onChange={this.setUserData.bind(this)}
                        />
                      </div>
                    </div>

                    <div className="divSpace">
                      <div className="">
                        <label className="reports-to">Designation</label>
                        <select className="add-select-category"
                          
                          name="selectedDesignation"
                          value={this.state.selectedDesignation}
                          onChange={this.setUserData.bind(this)}
                        >
                          <option>Select Designation</option>
                          {this.state.DesignationData !== null &&
                            this.state.DesignationData.map((item, i) => (
                              <option key={i} value={item.designationID}>
                                {item.designationName}
                              </option>
                            ))}
                        </select>
                      </div>
                    </div>

                    <div className="chatconfigbtn">
                      <button className="CreateADDBtn" onClick={this.handleEditUserProfile.bind(this)}>
                      SAVE
                        {/* <label className="addLable">SAVE</label> */}
                      </button>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-12" style={{ textAlign: "center" }}>
                      <label
                        className="forwardpasstext"
                        onClick={this.onOpenModal.bind(this)}
                      >
                        Change Password
                      </label>
                    </div>
                  </div>
                  <Modal
                    open={this.state.open}
                    onClose={this.onCloseModal.bind(this)}
                    closeIconId="sdsg"
                    modalId="ProfileForgot-popup"
                    overlayId="logout-ovrly"
                  >
                    <img
                      src={CancelImg}
                      alt="cancelImg"
                      className="cancalImg"
                      onClick={this.onCloseModal.bind(this)}
                    />
                    <div className="modalforgotpadding">
                      <div className="divSpace">
                        <label className="Changepasswordheader">
                          Change Password
                        </label>
                      </div>

                      <div className="divSpace">
                        <div className="">
                          <label className="designation-name">
                            Current Password
                          </label>
                          <input
                            type="password"
                            className="txt-1"
                            placeholder="Enter Current Password"
                          />
                        </div>
                      </div>
                      <div className="divSpace">
                        <div className="">
                          <label className="reports-to">New Password</label>
                          <img
                            className="info-icon-cp"
                            src={BlackInfoIcon}
                            alt="info-icon"
                          />
                          <input
                            type="password"
                            className="txt-1"
                            placeholder="Enter New Password"
                          />
                        </div>
                      </div>
                      <div className="chatconfigbtn">
                        <button className="CreateADDBtn">
                          <label className="addLable">SAVE</label>
                        </button>
                      </div>
                    </div>
                    {/* <img
                    src={CancelImg}
                    alt="cancelImg"
                    className="cancalImg"
                    onClick={this.onCloseModal.bind(this)}
                  /> */}
                  </Modal>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default UserProfile;
