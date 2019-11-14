import React, { Component } from "react";
import { Route } from "react-router-dom";
import StoreLayout from "./../StoreManager/storelayout";
import StoreDashboard from "./StoreDashboard";
import StoreMaster from "./StoreMaster";
import StoreTask from "./StoreTask";
import StoreTaskView from "./StoreTaskView";
import CategoryMaster from "./CategoryMaster";
// import CreateSLA from "../Settings/Ticketing/CreateSLA";
import EditStoreTask from "./EditStoreTask";
import StoreTaskByTicket from "./StoreTaskByTicket";
import RaiseClaim from "./RaiseClaim";
import Claim from "./Claim";
import ClaimApproveReject from "./ClaimApproveReject";
import StoreAddTask from "./StoreAddTask";
// import StoreCRMRole from "../Settings/Ticketing/StoreCRMRole";
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
       
        {/* <Route exact path={`${match.url}/sla`} component={CreateSLA} /> */}
        <Route exact path={`${match.url}/editStoreTask`} component={EditStoreTask} />
        <Route exact path={`${match.url}/storeTaskByTicket`} component={StoreTaskByTicket} />
        <Route exact path={`${match.url}/raiseClaim`} component={RaiseClaim} />
        <Route exact path={`${match.url}/claim`} component={Claim} />
        <Route exact path={`${match.url}/claimApproveReject`} component={ClaimApproveReject} />
        <Route exact path={`${match.url}/storeAddTask`} component={StoreAddTask} />
      </StoreLayout>
    );
  }
}
export default StoreApp;
