import React, { Component } from "react";
import down from "./../../assets/Images/collapsedown.png";
import collapseUp from "./../../assets/Images/collapseUp.png";
import { Collapse, CardBody, Card } from "reactstrap";
import CampaignTable1 from "./Tables/Campaign-row1";

class Campaign extends Component {
  constructor(props) {
    super(props);
    this.state = {
      FirstCollapse: false,
      TwoCollapse:false

    };
    this.firstActionOpenClps = this.firstActionOpenClps.bind(this);
    this.twoActionOpenClps=this.twoActionOpenClps.bind(this);
  }
  firstActionOpenClps() {
    this.setState(state => ({ FirstCollapse: !state.FirstCollapse }));
  }
  twoActionOpenClps(){
    this.setState(state => ({TwoCollapse:!state.TwoCollapse}));
  }
  render() {
    const ImgChange = this.state.FirstCollapse ? (
      <img src={collapseUp} alt="collapseUp" />
    ) : (
      <img src={down} alt="collapse down" />
    );
    const ImgChangeTwo = this.state.TwoCollapse ? (
      <img src={collapseUp} alt="collapseUp" />
    ) : (
      <img src={down} alt="collapse down" />
    );
    /**Header Name change**/  
    const HeaderNameChange=this.state.FirstCollapse
    ? "Campaign Type" : "Customer Name";
    
    /**Hide clode button with header**/ 

    return (
      <div>
        <div className="table-cntr store">
          <table>
            <thead>
              <tr>
                <th>{HeaderNameChange}</th>
                <th>Contacts</th>
                <th>Campaign Script</th>
                <th>Campaign End Date</th>
                <th>Campaign Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Aniversery</td>
                <td>10</td>
                <td>Hello Mr/Mrs ......, Greetings for the day........</td>
                <td>12-Aug-19</td>
                <td>
                  <button className="closebtn" type="button">
                    <label className="hdrcloselabel">Close</label>
                  </button>
                </td>
                <td>
                  <div onClick={this.firstActionOpenClps}>{ImgChange}</div>
                </td>
              </tr>
              <tr className="table-cntr-card">
                <td colSpan="6" style={{ padding: "0", paddingLeft: "7px" }}>
                  <Collapse isOpen={this.state.FirstCollapse}>
                    <Card>
                      <CardBody>
                        <CampaignTable1/>
                      </CardBody>
                    </Card>
                  </Collapse>
                </td>
              </tr>
              <tr>
                <td>Birthday</td>
                <td>13</td>
                <td>Hello Mr/Mrs ......, Greetings for the day........</td>
                <td>13-Aug-19</td>
                <td>
                  <button className="closebtn" type="button">
                    <label className="hdrcloselabel">Close</label>
                  </button>
                </td>
                <td>
                  <div onClick={this.twoActionOpenClps}>{ImgChangeTwo}</div>
                </td>
              </tr>
              <tr className="table-cntr-card">
                <td colSpan="6" style={{ padding: "0", paddingLeft: "7px" }}>
                  <Collapse isOpen={this.state.TwoCollapse}>
                    <Card>
                      <CardBody>
                        <CampaignTable1/>
                      </CardBody>
                    </Card>
                  </Collapse>
                </td>
              </tr>
              <tr>
                <td>EOSS</td>
                <td>20</td>
                <td>Hello Mr/Mrs ......, Greetings for the day........</td>
                <td>13-Aug-19</td>
                <td>
                  <button className="closebtn" type="button">
                    <label className="hdrcloselabel">Close</label>
                  </button>
                </td>
                <td>
                  <img src={down} alt="collapse down" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default Campaign;
