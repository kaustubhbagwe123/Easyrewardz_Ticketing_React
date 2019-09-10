import React, { Component } from "react";
import { Route} from "react-router-dom";
import Dashboard from "./Dashboard";
import Layout from "./../Component/layout";
import MyTicket from "./MyTicket";
import TicketSystem from "./TicketSystem";
import Chatbot from './Chatbot'
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
      </Layout>
    );
  }
}

export default App;
