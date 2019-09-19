import React, { Component } from "react";
import { Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import Layout from "./../Component/layout";
import MyTicket from "./MyTicket";
import TicketSystem from "./TicketSystem";
import Chatbot from "./Chatbot";
import Claim from "./Claim";
import MyTicketList from "./MyTicketList";
import ClaimTabTicketView from "./ClaimTabTicketView";
import Settings from "./Settings/Settings";
import PrioritySettings from "./Settings/PrioritySetting";
import TicketHierarchy from "./Settings/TicketHierarchy";
import QADashboardSearch from "./QA/QADashboardSearch";
import ChatDashboard from "./Chat/ChatDashboard";
import QAAuditview from "./QA/QAAuditview";
import KnowledgeBase from "./KnowledgeBase";
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
        <Route exact path={`${match.url}/claim`} component={Claim} />
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
        <Route
          exact
          path={`${match.url}/ticketHierarchy`}
          component={TicketHierarchy}
        />
        <Route exact path={`${match.url}/settings`} component={Settings} />
        <Route
          exact
          path={`${match.url}/priority-settings`}
          component={PrioritySettings}
        />
        <Route exact path={`${match.url}/qaDashboardSearch`} component={QADashboardSearch} />
         
         
        <Route exact path={`${match.url}/knowledgebase`} component={KnowledgeBase} />
        <Route
          exact
          path={`${match.url}/qaDashboardSearch`}
          component={QADashboardSearch}
        />
        <Route
          exact
          path={`${match.url}/chatdashboard`}
          component={ChatDashboard}
        />
        <Route
          exact
          path={`${match.url}/qaauditview`}
          component={QAAuditview}
        />
       
         
      </Layout>
    );
  }
}

export default App;
