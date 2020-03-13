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
import { Link } from "react-router-dom";

class UserProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      fileName: [],
      selectedUserID: 0,
      selectedProfilePicture: "",
      selectedFirstName: "",
      selectedLastName: "",
      selectedMobile: "",
      selectedEmailID: "",
      selectedDesignation: "",
      DesignationData: [],
      ProfileData: [],
      fileNameCompulsion: "",
      FirstNameCompulsion: "",
      LastNameCompulsion: "",
      MobileCompulsion: "",
      EmailIDCompulsion: "",
      DesignationCompulsion: ""
    };
    this.handleGetDesignationList = this.handleGetDesignationList.bind(this);
    this.handleEditUserProfile = this.handleEditUserProfile.bind(this);
    this.handleGetUserProfileData = this.handleGetUserProfileData.bind(this);
    this.redirectToChangePassword=this.redirectToChangePassword.bind(this);
  }
  componentDidMount() {
    debugger;
   
    this.handleGetUserProfileData();
    this.handleGetDesignationList();
  }
  onOpenModal = () => {
    this.setState({ open: true });
  };
  onCloseModal() {
    this.setState({ open: false });
  }
  fileUpload(e) {
    debugger;
    var allFiles = [];
    var selectedFiles = e.target.files;
    allFiles.push(selectedFiles[0]);
    this.setState({
      //fileName: e.target.files[0].name
      fileName: allFiles
    });
  }
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
  setUserData = e => {
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
    })
      .then(function(res) {
        debugger;
        let designationdata = res.data.responseData;
        let status = res.data.message;
        if (status === "Success") {
          self.setState({
            DesignationData: designationdata
          });
        }
      })
      .catch(data => {
        console.log(data);
      });
  }

  setGetProfileData = data => {
    debugger;
    let self = this;
    var userData = data[0];
    this.state.selectedUserID = userData.userId;
    this.state.selectedFirstName = userData.firstName;
    this.state.selectedLastName = userData.lastName;
    this.state.selectedMobile = userData.mobileNo;
    this.state.selectedEmailID = userData.emailId;
    this.state.selectedDesignation = userData.designationID;
    this.state.selectedProfilePicture = userData.profilePicture;
    // var image=this.state.selectedProfilePicture.split("/");
    // var img=image[image.length-1];
    // var array=[];
    // array.push({name:img})

    self.setState({
      selectedUserID: userData.userId,
      selectedFirstName: userData.firstName,
      selectedLastName: userData.lastName,
      selectedMobile: userData.mobileNo,
      selectedEmailID: userData.emailId,
      selectedDesignation: userData.designationID,
      //fileName:array
    });
  };

  handleGetUserProfileData() {
    debugger;

    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/User/GetUserProfileDetail",
      headers: authHeader()
    })
      .then(function(res) {
        debugger;
        var status = res.data.message;
        var userdata = res.data.responseData;
        if (status === "Success") {
           

          self.setState({
            ProfileData: userdata
          });
          self.setGetProfileData(userdata);
        } else {
          self.setState({
            ProfileData: []
          });
        }
      })
      .catch(data => {
        console.log(data);
      });
  }

  handleEditUserProfile() {
    debugger;
    if (
     
      // this.state.fileName.length > 0 &&
      this.state.selectedFirstName.length > 0 &&
      this.state.selectedLastName.length > 0 &&
      this.state.selectedMobile.length > 0 &&
      this.state.selectedEmailID.length > 0 &&
      this.state.selectedDesignation > 0
    ) {
      let self = this;
      var json = {
        UserId: this.state.selectedUserID,
        FirstName: this.state.selectedFirstName,
        LastName: this.state.selectedLastName,
        MobileNo: this.state.selectedMobile,
        EmailId: this.state.selectedEmailID,
        DesignationID: this.state.selectedDesignation
      };
      const formData = new FormData();

      formData.append("UpdateUserProfiledetailsModel", JSON.stringify(json));
      formData.append("file", this.state.fileName[0]);

      axios({
        method: "post",
        url: config.apiUrl + "/User/UpdateUserProfileDetails",
        headers: authHeader(),
        data: formData
      })
        .then(function(res) {
          debugger;
          let msg = res.data.message;
          if (msg === "Success") {
            NotificationManager.success("Profile updated successfully.", '', 1000);
            setTimeout(function() {
              self.props.history.push("/admin/dashboard");
            }, 1000);
          }
        })
        .catch(data => {
          console.log(data);
        });
    } else {
      this.setState({
        // fileNameCompulsion: "Please select profile picture.",
        FirstNameCompulsion: "Please enter first name.",
        LastNameCompulsion: "Please enter last name.",
        MobileCompulsion: "Please enter mobile number.",
        EmailIDCompulsion: "Please enter emailID.",
        DesignationCompulsion: "Please select designation."
      });
    }
  }

  redirectToChangePassword(){
    debugger;
    
    setTimeout(function() {
      this.props.history.push("/changePassword");
    }, 400);
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
                        src={
                          this.state.selectedProfilePicture ===
                            "https://localhost:44357/Resources/Images/" &&
                          "https://erbelltkt.dcdev.brainvire.net/Resources/Images/"
                            ? ProfileImg
                            : this.state.selectedProfilePicture
                        }
                        alt="store-settings"
                        className="profimg"
                      />
                      {/* <img
                            src={
                              item.Type === "docx"
                                ? require("./../assets/Images/word.png")
                                : item.Type === "xlsx"
                                ? require("./../assets/Images/TxtIcon.png")
                                : require("./../assets/Images/thumbticket.png")
                            }
                            title={item.name}
                            alt="thumb"
                            className="thumbtick"
                          /> */}
                      <div className="uploadtextprofile">
                        <br></br>
                        <input
                          id="file-upload"
                          className="d-none file-uploadprofile"
                          type="file"
                          onChange={this.fileUpload.bind(this)}
                        />
                        <label
                          htmlFor="file-upload"
                          onDrop={this.fileDrop}
                          onDragOver={this.fileDragOver}
                          onDragEnter={this.fileDragEnter}
                          onChange={this.fileUpload.bind(this)}
                        >
                          {/* <div className="file-icon">
                        <img src="{FileUpload}" alt="file-upload" />
                      </div> */}
                          <span className="uploadtextprofile1">Upload Photo</span>
                        </label>
                        {/* <label
                          htmlFor="file-upload"
                          onDrop={this.fileDrop}
                          onDragOver={this.fileDragOver}
                          onDragEnter={this.fileDragEnter}
                          
                        >
                         
                          <span className="uploadtextprofile1"  >Upload</span>
                        </label> */}
                        {this.state.fileName[0] && (
                          <div className="file-info">
                            <div className="file-cntr">
                              <div className="file-dtls">
                                <p className="file-name">
                                  {this.state.fileName[0].name}
                                </p>
                                <div className="del-file" id="del-file-1"></div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                      {this.state.fileName.length === 0 && (
                        <p style={{ color: "red", marginBottom: "0px" }}>
                          {this.state.fileNameCompulsion}
                        </p>
                      )}
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
                        {this.state.selectedFirstName.length === 0 && (
                          <p style={{ color: "red", marginBottom: "0px" }}>
                            {this.state.fileNameCompulsion}
                          </p>
                        )}
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
                        {this.state.selectedLastName.length === 0 && (
                          <p style={{ color: "red", marginBottom: "0px" }}>
                            {this.state.LastNameCompulsion}
                          </p>
                        )}
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
                        {this.state.selectedMobile.length === 0 && (
                          <p style={{ color: "red", marginBottom: "0px" }}>
                            {this.state.MobileCompulsion}
                          </p>
                        )}
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
                        {this.state.selectedEmailID.length === 0 && (
                          <p style={{ color: "red", marginBottom: "0px" }}>
                            {this.state.EmailIDCompulsion}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="divSpace">
                      <div className="">
                        <label className="reports-to">Designation</label>
                        <select
                          className="add-select-category"
                          name="selectedDesignation"
                          value={this.state.selectedDesignation}
                          onChange={this.setUserData.bind(this)}
                        >
                          <option value="">Select Designation</option>
                          {this.state.DesignationData !== null &&
                            this.state.DesignationData.map((item, i) => (
                              <option key={i} value={item.designationID}>
                                {item.designationName}
                              </option>
                            ))}
                        </select>
                        {this.state.selectedDesignation === "" && (
                          <p style={{ color: "red", marginBottom: "0px" }}>
                            {this.state.DesignationCompulsion}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="chatconfigbtn">
                      <button
                        className="CreateADDBtn"
                        onClick={this.handleEditUserProfile.bind(this)}
                      >
                        SAVE
                      </button>
                    </div>
                  </div>
                  <div className="userChangePW" 
                  //onClick={this.redirectToChangePassword}
                  >
                     <Link to="/changePassword">Change Password</Link>
                    
                    </div>

                  {/* <div className="row">
                    <div className="col-md-12" style={{ textAlign: "center" }}>
                      <label
                        className="forwardpasstext"
                        onClick={this.onOpenModal.bind(this)}
                      >
                        Change Password
                      </label>
                    </div>
                  </div> */}
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
