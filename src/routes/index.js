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
import Alerts from "./Settings/Alerts";
import TestingDemo from "./TestingDemo";
import Templates from "./Settings/Ticketing/Templates";
import AddSearchMyTicket from "./AddSearchMyTicket";
import ClaimCategoryMaster from "./Settings/Store/ClaimCategoryMaster";
import TicketCRMRole from "./Settings/Ticketing/TicketCRMRole";
import StoreCRMRole from "./Settings/Ticketing/StoreCRMRole";
import StoreUsers from "./Settings/Ticketing/StoreUsers";
import StoreAlerts from "./Settings/Ticketing/StoreAlerts";
import Reports from "./Settings/Ticketing/Reports";
import StoreReports from "./Settings/Ticketing/StoreReports";
import Module  from "./Settings/Ticketing/Module";
import StoreModule from "./Settings/Ticketing/StoreModule";
import DepartmentMaster from "./Settings/Store/DepartmentMaster";
import CreateSLA from "./Settings/Ticketing/CreateSLA";
import SlaTemplateDepartment from "./Settings/Ticketing/SlaTemplateDepartment";
import StorePriority from "./Settings/Ticketing/StorePriority";
import StoreMaster from "./Settings/Ticketing/StoreMaster";
import QaHierarchyMaster from "./QA/QaHierarchyMaster";
import QaCrmRoles from "./QA/QaCrmRoles";
import CategoryMaster from "./Settings/Ticketing/CategoryMaster";
import QAReports from "./QA/QAReports";
import ChatElements from "./Chat/ChatElements";
import ChatLanguage from "./Chat/ChatLanguage";
import ChatRules from "./Chat/ChatRules";
import ChatThemes from "./Chat/ChatThemes";
import ChatConfigureBrand from "./Chat/ChatConfigureBrand";
import QaUserMaster from "./QA/QaUserMaster";
import QaAuditParameters from "./QA/QaAuditParameters";
import HistoricalChat from "./Chat/HistoricalChat";
import UserProfile from "./UserProfile";
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
        <Route exact path={`${match.url}/ticketCRMRole`} component={TicketCRMRole} />
        <Route exact path={`${match.url}/storeCRMRole`} component={StoreCRMRole} />
        <Route exact path={`${match.url}/storeUsers`} component={StoreUsers} />
        <Route exact path={`${match.url}/storeAlerts`} component={StoreAlerts} />
        <Route exact path={`${match.url}/reports`} component={Reports} />
        <Route exact path={`${match.url}/storeReports`} component={StoreReports} />
        <Route exact path={`${match.url}/module`} component={Module} />
        <Route exact path={`${match.url}/storeModule`} component={StoreModule} />
        <Route exact path={`${match.url}/departmentMaster`} component={DepartmentMaster} />
        <Route exact path={`${match.url}/sLA`} component={CreateSLA} />
        <Route exact path={`${match.url}/slaTemplateDepartment`} component={SlaTemplateDepartment} />
        <Route exact path={`${match.url}/storePriority`} component={StorePriority} />
        <Route exact path={`${match.url}/storeMaster`} component={StoreMaster} />
        <Route exact path={`${match.url}/storeMaster`} component={StoreMaster} />
        <Route exact path={`${match.url}/qaHierarchyMaster`} component={QaHierarchyMaster} />
        <Route exact path={`${match.url}/qaCrmRoles`} component={QaCrmRoles} />
        <Route exact path={`${match.url}/categoryMaster`} component={CategoryMaster} />
        <Route exact path={`${match.url}/qaReports`} component={QAReports} />
        <Route exact path={`${match.url}/chatElements`} component={ChatElements} />
        <Route exact path={`${match.url}/chatLanguage`} component={ChatLanguage} />
        <Route exact path={`${match.url}/chatRules`} component={ChatRules} />
        <Route exact path={`${match.url}/chatThemes`} component={ChatThemes} />
        <Route exact path={`${match.url}/chatConfigureBrand`} component={ChatConfigureBrand} />
        <Route exact path={`${match.url}/qAUserMaster`} component={QaUserMaster} />
        <Route exact path={`${match.url}/qAAuditParameters`} component={QaAuditParameters} />
        <Route exact path={`${match.url}/historicalChat`} component={HistoricalChat} />
        <Route exact path={`${match.url}/userProfile`} component={UserProfile} />
      </Layout>
    );
  }
}

export default App;
