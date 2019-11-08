import React, { Component } from "react";
import { Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import Layout from "./../Component/layout";
import MyTicket from "./MyTicket";
import TicketSystem from "./TicketSystem";
import Chatbot from "./Chatbot";
import MyTicketList from "./MyTicketList";
import ClaimTabTicketView from "./ClaimTabTicketView";
import Settings from "./Settings/Settings";
import PrioritySettings from "./Settings/PrioritySetting";
import ChatDashboard from "./Chat/ChatDashboard";
import QAAuditview from "./QA/QAAuditview";
import KnowledgeBase from "./KnowledgeBase";
import HierarchyMaster from "./Settings/Store/HierarchyMaster";
import FileUploadLogs from "./Settings/FileUploadLogs";
import ItemMaster from "./Settings/Store/ItemMaster";
import TicketHierarchy from "./Settings/Ticketing/TicketHierarchy";
import Brands from "./Settings/Ticketing/Brands";
import Users from "./Settings/Ticketing/Users";
import SLATemplate from "./SLATemplate";
import Store_CRMRoles from "./Store_CRMRoles";
import CreatePriority from "./CreatePriority";
import ClaimCategoryMaster from "./ClaimCategoryMaster";
import Alerts from "./Settings/Alerts";
import TestingDemo from "./TestingDemo";
import Templates from "./Settings/Ticketing/Templates";
import AddSearchMyTicket from "./AddSearchMyTicket";
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
        <Route
          exact
          path={`${match.url}/knowledgebase`}
          component={KnowledgeBase}
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

        <Route
          exact
          path={`${match.url}/hierarchyMaster`}
          component={HierarchyMaster}
        />
        <Route exact path={`${match.url}/itemMaster`} component={ItemMaster} />
        <Route exact path={`${match.url}/users`} component={Users} />
        <Route
          exact
          path={`${match.url}/fileUploadLogs`}
          component={FileUploadLogs}
        />
        <Route exact path={`${match.url}/brands`} component={Brands} />
        <Route
          exact
          path={`${match.url}/slaTemplate`}
          component={SLATemplate}
        />
        <Route
          exact
          path={`${match.url}/claimCategoryMaster`}
          component={ClaimCategoryMaster}
        />
        <Route
          exact
          path={`${match.url}/store_CRMRoles`}
          component={Store_CRMRoles}
        />
        <Route
          exact
          path={`${match.url}/priority`}
          component={CreatePriority}
        />
        <Route exact path={`${match.url}/alerts`} component={Alerts} />
        <Route
          exact
          path={`${match.url}/TestingDemo`}
          component={TestingDemo}
        />
        <Route exact path={`${match.url}/templates`} component={Templates} />
        <Route exact path={`${match.url}/addSearchMyTicket`} component={AddSearchMyTicket} />
      </Layout>
    );
  }
}

export default App;
