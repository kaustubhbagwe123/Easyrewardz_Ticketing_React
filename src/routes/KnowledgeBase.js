import React ,{Component} from 'react';
import Demo from "../store/Hashtag.js";
import SerachIcon from './../assets/Images/serach-icon-left.png';
import DownArrowIcon from './../assets/Images/down-1.png'



class KnowledgeBase extends Component {
  constructor(props) {
      super(props)
  
      this.state = {
        headerfirst: "block",
        headersecound: "none"
      }
      this.HandelFirstTabClick=this.HandelFirstTabClick.bind(this);
      this.HandelSecoundTabClick=this.HandelSecoundTabClick.bind(this);

  }
  

  HandelFirstTabClick() {
    this.setState({ headerfirst: "block", headersecound: "none" });
  }

  HandelSecoundTabClick() {
      this.setState({ headerfirst: "none", headersecound: "block" });
  }

  render() {
    return (
      <>
        <div className="kb-header">
          <div>
            <a href={Demo.BLANK_LINK} onClick={this.HandelFirstTabClick}>
              <label className="header-new-submissions">New Submissions</label>
            </a>
            <a href={Demo.BLANK_LINK} onClick={this.HandelSecoundTabClick}>
              <label className="header-new-submissions-1">
                Knowledge Base List
              </label>
            </a>
            <button className="kb-Header-button">
              <label className="add-new-kb">Add New KB</label>
            </button>
          </div>
        </div>
        <div
          className="main-content-kb"
          style={{ display: this.state.headerfirst }}
        >
          <div className="main-content-margin">
            <div className="row" style={{ padding: "35px 35px 10px 35px" }}>
              <label className="main-conenet-point">02 ITEMS</label>
              <small className="clear-search">Clear Search</small>

              <label className="search-KB">SEARCH</label>
              <img src={SerachIcon} alt="serach-icon" className="searchicon" />
            </div>
            <div className="kb-table" style={{ padding: "0px 30px 0px 20px" }}>
              <table className="table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Details</th>
                    <th>Type</th>
                    <th>Category</th>
                    <th>Sub catogory</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <label className="table-id-data">ABC1234</label>
                    </td>
                    <td>
                      <p className="table-details-data">
                        Can I purchase a domain through Google?Google can help
                        you purchase a domain through one of our domain host
                        partners. During sign up, just select the option to…
                      </p>
                      <img
                        src={DownArrowIcon}
                        alt="down-arrow-icon"
                        className="down-icon-kb"
                      />
                    </td>
                    <td>
                      <label className="table-type-return">return</label>
                    </td>
                    <td>
                      <label className="table-category">
                        defective article
                      </label>
                    </td>
                    <td>
                      <label className="table-subcategory">
                        pain in feet/knee/leg
                      </label>
                    </td>
                    <td>
                      <button className="reject-button">
                        <label className="reject-button-text">reject</label>
                      </button>
                      <button className="aprove-button">
                        <label className="approve-button-text">APPROVE</label>
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label className="table-id-data">ABC1234</label>
                    </td>
                    <td>
                      <p className="table-details-data">
                        Can I still use the previous version of Sites? If your
                        company is using any previous version of Sites, there
                        will be no disruption. Keep editing and sharing your
                        Sites as youIf your company is using any previous
                        version of Sites, there will be no disruption. Keep
                        editing and sharing your Sites as youIf your company is
                        using any previous version of Sites, there will be no
                        disruption. Keep editing and sharing your Sites as you
                        If your company is using any previous version of Sites,
                      </p>
                      <img
                        src={DownArrowIcon}
                        alt="down-arrow-icon"
                        className="down-icon-kb"
                      />
                    </td>
                    <td>
                      <label className="table-type-return">return</label>
                    </td>
                    <td>
                      <label className="table-category">
                        defective article
                      </label>
                    </td>
                    <td>
                      <label className="table-subcategory">
                        pain in feet/knee/leg
                      </label>
                    </td>
                    <td>
                      <button className="reject-button">
                        <label className="reject-button-text">reject</label>
                      </button>
                      <button className="aprove-button">
                        <label className="approve-button-text">APPROVE</label>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div
          className="main-content-kb"
          style={{ display: this.state.headersecound }}
        >
          <div className="main-content-margin">
            <div className="row" style={{ padding: "35px 35px 10px 35px" }}>
              <label className="main-conenet-point">02 ITEMS</label>
              <small className="clear-search">Clear Search</small>

              <label className="search-KB">SEARCH</label>
              <img src={SerachIcon} alt="serach-icon" className="searchicon" />
            </div>
            <div className="kb-table" style={{ padding: "0px 30px 0px 20px" }}>
              <table className="table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Details</th>
                    <th>Type</th>
                    <th>Category</th>
                    <th>Sub catogory</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <label className="table-id-data">ABC1234</label>
                    </td>
                    <td>
                      <p className="table-details-data">
                        Can I purchase a domain through Google?Google can help
                        you purchase a domain through one of our domain host
                        partners. During sign up, just select the option to…
                      </p>
                      <img
                        src={DownArrowIcon}
                        alt="down-arrow-icon"
                        className="down-icon-kb"
                      />
                    </td>
                    <td>
                      <label className="table-type-return">return</label>
                    </td>
                    <td>
                      <label className="table-category">
                        defective article
                      </label>
                    </td>
                    <td>
                      <label className="table-subcategory">
                        pain in feet/knee/leg
                      </label>
                    </td>
                    <td>
                      <button className="reject-button-1">
                        <label className="reject-button-text">DELETE</label>
                      </button>
                      {/* <button className="aprove-button">
                        <label className="approve-button-text">APPROVE</label>
                      </button> */}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label className="table-id-data">NA</label>
                    </td>
                    <td>
                      <p className="table-details-data">
                        Can I still use the previous version of Sites? If your
                        company is using any previous version of Sites, there
                        will be no disruption. Keep editing and sharing your
                        Sites as youIf your company is using any previous
                        version of Sites, there will be no disruption. Keep
                        editing and sharing your Sites as youIf your company is
                        using any previous version of Sites, there will be no
                        disruption. Keep editing and sharing your Sites as you
                        If your company is using any previous version of Sites,
                      </p>
                      <img
                        src={DownArrowIcon}
                        alt="down-arrow-icon"
                        className="down-icon-kb"
                      />
                    </td>
                    <td>
                      <label className="table-type-return">return</label>
                    </td>
                    <td>
                      <label className="table-category">
                        defective article
                      </label>
                    </td>
                    <td>
                      <label className="table-subcategory">
                        pain in feet/knee/leg
                      </label>
                    </td>
                    <td>
                      <button className="reject-button">
                        <label className="reject-button-text">reject</label>
                      </button>
                      <button className="aprove-button">
                        <label className="approve-button-text">EDIT</label>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default KnowledgeBase;