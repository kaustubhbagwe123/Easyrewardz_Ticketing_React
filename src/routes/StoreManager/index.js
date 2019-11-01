import React, { Component } from "react";
import { Route } from "react-router-dom";
import StoreLayout from "./../StoreManager/storelayout";
import StoreDashboard from "./StoreDashboard";
import StoreMaster from "./StoreMaster";
import StoreTask from "./StoreTask";
import StoreTaskView from "./StoreTaskView";
import CreateCRMRoles from "./CreateCRMRoles";
import CategoryMaster from "./CategoryMaster";
import CreateSLA from "./CreateSLA";
import EditStoreTask from "./EditStoreTask";
import StoreTaskByTicket from "./StoreTaskByTicket";
// import "./styles.css";
// import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
export class StoreApp extends Component {
  render() {
    const { match } = this.props;
    return (
      <StoreLayout>
        <Route
          exact
          path={`${match.url}/storeDashboard`}
          component={StoreDashboard}
        />
        <Route
          exact
          path={`${match.url}/storemaster`}
          component={StoreMaster}
        />
        <Route exact path={`${match.url}/storetask`} component={StoreTask} />
        <Route
          exact
          path={`${match.url}/storetaskview`}
          component={StoreTaskView}
        />
        <Route
          exact
          path={`${match.url}/categorymaster`}
          component={CategoryMaster}
        />
        <Route
          exact
          path={`${match.url}/crmroles`}
          component={CreateCRMRoles}
        />
        <Route exact path={`${match.url}/sla`} component={CreateSLA} />
        <Route exact path={`${match.url}/editStoreTask`} component={EditStoreTask} />
        <Route exact path={`${match.url}/storeTaskByTicket`} component={StoreTaskByTicket} />
      
      </StoreLayout>
    );
  }
}
export default StoreApp;
