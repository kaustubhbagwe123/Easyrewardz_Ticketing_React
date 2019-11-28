import React, { Component, Fragment } from "react";
import ProfileImg from "./../assets/Images/profileimg.png";
import Modal from "react-responsive-modal";
import CancelImg from "./../assets/Images/Circle-cancel.png";
// import ProfileImg1 from "./../assets/Images/changeprofile.png";
import BlackInfoIcon from "./../assets/Images/Info-black.png";

class UserProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      fileName: ""
    };
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
  render() {
    return (
      <Fragment>
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
                          className="d-none file-uploadprofile"
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

                  <div className="centerprofile col-md-6">
                    <div className="divSpace">
                      <div className="">
                        <label className="designation-name">Name</label>
                        <input
                          type="text"
                          className="txt-1"
                          placeholder="Enter Name"
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
                        />
                      </div>
                    </div>

                    <div className="divSpace">
                      <div className="">
                        <label className="reports-to">Designation</label>
                        <input
                          type="text"
                          className="txt-1"
                          placeholder="Enter Designation"
                        />
                      </div>
                    </div>

                    <div className="chatconfigbtn">
                      <button className="CreateADDBtn">
                        <label className="addLable">SAVE</label>
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
