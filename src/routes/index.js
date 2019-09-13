import React, { Component } from "react";
import { Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import Layout from "./../Component/layout";
import MyTicket from "./MyTicket";
import TicketSystem from "./TicketSystem";
import StoreDashboard from "./StoreDashboard";
import Chatbot from "./Chatbot";
import Claim from "./Claim";
import MyTicketList from "./MyTicketList";
import ClaimTabTicketView from './ClaimTabTicketView';
import TicketHierarchy from "./Settings/TicketHierarchy";
import StoreMaster from "./Settings/StoreMaster";
import ClaimTabTicketView from "./ClaimTabTicketView";
import Settings from "./Settings";
import StoreMaster from "./../Component/Settings/StoreMaster";
// import Aux from "./../Component/Aux";

export class App extends Component {
  render() {
    const { match } = this.props;
    return (
      <Layout>
        <Route exact path={`${match.url}/dashboard`} component={Dashboard} />
        <Route exact path={`${match.url}/myticket`} component={MyTicket} />
        <Route
          exact
          path={`${match.url}/ticketSystem`}
          component={TicketSystem}
        />
        <Route exact path={`${match.url}/chatbot`} component={Chatbot} />
        <Route
          exact
          path={`${match.url}/store-dashboard`}
          component={StoreDashboard}
        />
        <Route exact path={`${match.url}/claim`} component={Claim} />
        <Route exact path={`${match.url}/myTicketList`} component={MyTicketList} />
        <Route exact path={`${match.url}/claimTabTicketView`} component={ClaimTabTicketView } />
        <Route exact path={`${match.url}/ticketHierarchy`} component={TicketHierarchy } />
        <Route exact path={`${match.url}/storemaster`} component={StoreMaster} />

        <Route
          exact
          path={`${match.url}/myTicketList`}
          component={MyTicketList}
        />
        <Route
          exact
          path={`${match.url}/claimTabTicketView`}
          component={ClaimTabTicketView}
        />
        <Route exact path={`${match.url}/settings`} component={Settings} />
        <Route
          exact
          path={`${match.url}/storemaster`}
          component={StoreMaster}
        />
      </Layout>
    );
  }
}

export default App;
