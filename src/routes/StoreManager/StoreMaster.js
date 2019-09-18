import React,{Component} from 'react'; 
import TableArr from './../../assets/Images/table-arr.png'
import RedDeleteIcon from './../../assets/Images/red-delete-icon.png';
import BlackDeleteIcon from './../../assets/Images/delete.svg';
import UploadIcon from './../../assets/Images/clip.png';
import CrossIcon from './../../assets/Images/cross-icon.png';
 

class StoreMaster extends Component
{
    render(){

        return (
          <>
            <div className="breadcrumbs-row">
              <div className="breadcrumbs-row-padding">
                <label className="settings-ticketing">
                  Settings > Ticketing >
                </label>
                <label className="storemaster-text">&nbsp;Store Master</label>
              </div>
            </div>
            <br />
            <div className="bottom-margin-class">
              <div className="row">
                <div className="store-col-1">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>
                          Store Name <img src={TableArr} alt="table-arr" />
                        </th>
                        <th>
                          Store Code <img src={TableArr} alt="table-arr" />
                        </th>
                        <th>
                          Brand Name <img src={TableArr} alt="table-arr" />
                        </th>
                        <th>
                          City <img src={TableArr} alt="table-arr" />
                        </th>
                        <th>
                          State <img src={TableArr} alt="table-arr" />
                        </th>
                        <th>
                          Pincode <img src={TableArr} alt="table-arr" />
                        </th>
                        {/* <th></th> */}
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <label className="table-data-text">Bata Store</label>
                        </td>
                        <td>
                          <label className="table-data-text">12345</label>
                        </td>
                        <td>
                          <label className="table-data-text">Bata</label>
                        </td>
                        <td>
                          <label className="table-data-text">Gurgaon</label>
                        </td>
                        <td>
                          <label className="table-data-text">Haryana</label>
                        </td>
                        <td>
                          <label className="table-data-text">122007</label>
                        </td>
                        <td>
                          <div className="row">
                            <div>
                              <img
                                src={RedDeleteIcon}
                                alt="delete-icon"
                                className="red-delete-icon-size"
                              />
                            </div>
                            <div className=" list-edit-button-margin">
                              <button className="Table-action-edit-button">
                                <label className="Table-action-edit-button-text">
                                  EDIT
                                </label>
                              </button>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <label className="table-data-text">Bata Store</label>
                        </td>
                        <td>
                          <label className="table-data-text">12345</label>
                        </td>
                        <td>
                          <label className="table-data-text">Bata</label>
                        </td>
                        <td>
                          <label className="table-data-text">Gurgaon</label>
                        </td>
                        <td>
                          <label className="table-data-text">Haryana</label>
                        </td>
                        <td>
                          <label className="table-data-text">122007</label>
                        </td>
                        <td>
                          <div className="row">
                            <div>
                              <img
                                src={RedDeleteIcon}
                                alt="delete-icon"
                                className="red-delete-icon-size"
                              />
                            </div>
                            <div className=" list-edit-button-margin">
                              <button className="Table-action-edit-button">
                                <label className="Table-action-edit-button-text">
                                  EDIT
                                </label>
                              </button>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <label className="table-data-text">Bata Store</label>
                        </td>
                        <td>
                          <label className="table-data-text">12345</label>
                        </td>
                        <td>
                          <label className="table-data-text">Bata</label>
                        </td>
                        <td>
                          <label className="table-data-text">Gurgaon</label>
                        </td>
                        <td>
                          <label className="table-data-text">Haryana</label>
                        </td>
                        <td>
                          <label className="table-data-text">122007</label>
                        </td>
                        <td>
                          <div className="row">
                            <div>
                              <img
                                src={RedDeleteIcon}
                                alt="delete-icon"
                                className="red-delete-icon-size"
                              />
                            </div>
                            <div className=" list-edit-button-margin">
                              <button className="Table-action-edit-button">
                                <label className="Table-action-edit-button-text">
                                  EDIT
                                </label>
                              </button>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <label className="table-data-text">Bata Store</label>
                        </td>
                        <td>
                          <label className="table-data-text">12345</label>
                        </td>
                        <td>
                          <label className="table-data-text">Bata</label>
                        </td>
                        <td>
                          <label className="table-data-text">Gurgaon</label>
                        </td>
                        <td>
                          <label className="table-data-text">Haryana</label>
                        </td>
                        <td>
                          <label className="table-data-text">122007</label>
                        </td>
                        <td>
                          <div className="row">
                            <div>
                              <img
                                src={RedDeleteIcon}
                                alt="delete-icon"
                                className="red-delete-icon-size"
                              />
                            </div>
                            <div className=" list-edit-button-margin">
                              <button className="Table-action-edit-button">
                                <label className="Table-action-edit-button-text">
                                  EDIT
                                </label>
                              </button>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <label className="table-data-text">Bata Store</label>
                        </td>
                        <td>
                          <label className="table-data-text">12345</label>
                        </td>
                        <td>
                          <label className="table-data-text">Bata</label>
                        </td>
                        <td>
                          <label className="table-data-text">Gurgaon</label>
                        </td>
                        <td>
                          <label className="table-data-text">Haryana</label>
                        </td>
                        <td>
                          <label className="table-data-text">122007</label>
                        </td>
                      
                        <td>
                          <div className="row">
                            <div>
                              <img
                                src={RedDeleteIcon}
                                alt="delete-icon"
                                className="red-delete-icon-size"
                              />
                            </div>
                            <div className=" list-edit-button-margin">
                              <button className="Table-action-edit-button">
                                <label className="Table-action-edit-button-text">
                                  EDIT
                                </label>
                              </button>
                            </div>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div>
                  <div className="store-col-2">
                    <br />
                    <div className="row">
                      <label className="Create-store-text">CREATE STORE</label>
                    </div>
                    <br />
                    <div className="row">
                      <label className="store-create-lable-text">Brand</label>
                    </div>
                    <div className="row">
                      <select className="store-create-select">
                        <option>Bata</option>
                      </select>
                    </div>
                    <div className="store-create-margin">
                      <div className="row">
                        <label className="store-create-lable-text">
                          Store Code
                        </label>
                      </div>
                      <div className="row">
                        <input
                          type="text"
                          className="store-create-textbox"
                          placeholder="231122"
                        />
                      </div>
                    </div>

                    <div className="store-create-margin">
                      <div className="row">
                        <label className="store-create-lable-text">
                          Store Name
                        </label>
                      </div>
                      <div className="row">
                        <input
                          type="text"
                          className="store-create-textbox"
                          placeholder="Bata Store"
                        />
                      </div>
                    </div>
                    <div className="store-create-margin">
                      <div className="row">
                        <label className="store-create-lable-text">State</label>
                      </div>
                      <div className="row">
                        <select className="store-create-select">
                          <option>Delhi</option>
                        </select>
                      </div>
                    </div>
                    <div className="store-create-margin">
                      <div className="row">
                        <label className="store-create-lable-text">City</label>
                      </div>
                      <div className="row">
                        <select className="store-create-select">
                          <option>Delhi</option>
                        </select>
                      </div>
                    </div>
                    <div className="store-create-margin">
                      <div className="row">
                        <label className="store-create-lable-text">
                          Pin Code
                        </label>
                      </div>
                      <div className="row">
                        <input
                          type="text"
                          className="store-create-textbox"
                          placeholder="110006"
                        />
                      </div>
                    </div>
                    <div className="store-create-margin">
                      <div className="row">
                        <label className="store-create-lable-text">
                          Address
                        </label>
                      </div>
                      <div className="row">
                        <textarea
                          cols="31"
                          rows="3"
                          className="store-create-textarea"
                          placeholder="Near Palm Court Bulilding,Sector 14 Gurgaon,Haryan"
                        ></textarea>
                      </div>
                    </div>

                    <div className="store-create-margin">
                      <div className="row">
                        <label className="store-create-lable-text">
                          Region
                        </label>
                      </div>
                      <div className="row">
                        <select className="store-create-select">
                          <option>Delhi</option>
                        </select>
                      </div>
                    </div>
                    <div className="store-create-margin">
                      <div className="row">
                        <label className="store-create-lable-text">Zone</label>
                      </div>
                      <div className="row">
                        <select className="store-create-select">
                          <option>North</option>
                        </select>
                      </div>
                    </div>
                    <div className="store-create-margin">
                      <div className="row">
                        <label className="store-create-lable-text">
                          Store Type
                        </label>
                      </div>
                      <div className="row">
                        <select className="store-create-select">
                          <option>Retail</option>
                        </select>
                      </div>
                    </div>
                    <div className="store-create-margin">
                      <div className="row">
                        <label className="store-create-lable-text">
                          Contact Details:Email
                        </label>
                      </div>
                      <div className="row">
                        <input
                          type="text"
                          className="store-create-textbox"
                          placeholder="batastore@gmail.com"
                        />
                      </div>
                    </div>
                    <div className="store-create-margin">
                      <div className="row">
                        <label className="store-create-lable-text">
                          Contact Details:Phone
                        </label>
                      </div>
                      <div className="row">
                        <input
                          type="text"
                          className="store-create-textbox"
                          placeholder="9876543210"
                        />
                      </div>
                    </div>
                    <div className="store-create-margin">
                      <div className="row">
                        <label className="store-create-lable-text">
                          Status
                        </label>
                      </div>
                      <div className="row">
                        <select className="store-create-select">
                          <option>Active</option>
                        </select>
                      </div>
                    </div>
                    <br />
                    <div className="store-create-margin">
                      <div className="row">
                        <button className="store-create-button">
                          <label className="store-create-button-text">
                            ADD
                          </label>
                        </button>
                      </div>
                    </div>
                    <br />
                    <br />
                  </div>
                  <br />
                  <div className="store-col-2">
                    <br />
                    <div className="row">
                      <label className="Create-store-text">BULK UPLOAD</label>
                    </div>
                    <div className="store-create-margin">
                      <div className="row rectangle-upload">
                        <div className="upload-icon-center">
                          <img
                            src={UploadIcon}
                            alt="upload-icon"
                            className="upload-icon"
                          />
                        </div>

                        <div className="row upload-add-text">
                          Add File &nbsp;
                          <span className="upload-add-text1">
                            or Drop File here
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="store-create-margin">
                      <div className="row">
                        <div className="store-create-oval"></div>
                        <div className="store-upload-details-div">
                          <label className="store-upload-details-text">
                            Chat agent user type file.CSV
                          </label>
                          <div className="upload-file-memory">
                            <span>122.6kb</span>
                          </div>
                        </div>
                        <div className="store-upload-details-div-2">
                          <img
                            src={BlackDeleteIcon}
                            alt="delete-icon"
                            className="store-icons-8-delete"
                          />
                        </div>
                      </div>
                      <div className="row">
                        <div className="store-create-oval"></div>
                        <div className="store-upload-details-div">
                          <label className="store-upload-details-text">
                            Supervisor type file.CSV
                          </label>
                          <div className="file-upload-faild-text">
                            <span>Faild</span>
                          </div>
                        </div>
                        <div className="store-upload-details-div-4">
                          <label className="file-upload-retry-text">
                            Retry
                          </label>
                        </div>
                      </div>
                      <div className="row">
                        <div className="store-create-oval"></div>
                        <div className="store-upload-details-div">
                          <label className="store-upload-details-text">
                            Chat agent 25 Oct type file.CSV
                          </label>
                          <div className="file-upload-progress">
                            <div className="file-upload-progress-status"></div>
                          </div>
                        </div>
                        <div className="store-upload-details-div-3">
                          <img
                            src={CrossIcon}
                            alt="cross-icon"
                            className="store-create-cross-icon"
                          />
                        </div>
                      </div>
                      <br />
                      <div className="store-create-margin">
                        <div className="row">
                          <button className="store-create-button">
                            <label className="store-create-button-text">
                              ADD
                            </label>
                          </button>
                        </div>
                      </div>
                    </div>
                    <br />
                  </div>
                </div>
              </div>
            </div>
          </>
        );
    }

}

export default StoreMaster;