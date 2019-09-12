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
// import Aux from "./../Component/Aux";

export class App extends Component {
  render() {
    // const {match} = this.props;
    return (
      <Layout>
        <Route exact path={`/dashboard`} component={Dashboard} />
        <Route exact path={`/myticket`} component={MyTicket} />
        <Route exact path={`/ticketSystem`} component={TicketSystem} />
        <Route exact path={`/chatbot`} component={Chatbot} />
        <Route exact path={`/store-dashboard`} component={StoreDashboard} />
        <Route exact path={`/claim`} component={Claim} />
        <Route exact path={`/myTicketList`} component={MyTicketList} />
        <Route exact path={`/ClaimTabTicketView`} component={ClaimTabTicketView } />

      </Layout>
    );
  }
}

export default App;
