import React, { Component } from "react";
import { Route } from "react-router-dom";
import StoreLayout from "./../StoreManager/storelayout";
import StoreDashboard from "./StoreDashboard";
import StoreTask from "./StoreTask";
import StoreTaskView from "./StoreTaskView";
import EditStoreTask from "./EditStoreTask";
import StoreTaskByTicket from "./StoreTaskByTicket";
import RaiseClaim from "./RaiseClaim";
import Claim from "./Claim";
import ClaimApproveReject from "./ClaimApproveReject";
import StoreAddTask from "./StoreAddTask";
import HierarchyMaster from "./../Settings/Store/HierarchyMaster";
import StorePriority from "./../Settings/Store/StorePriority";
import StoreCRMRole from "./../Settings/Store/StoreCRMRole";
import StoreReports from "./../Settings/Store/StoreReports";
import ItemMaster from "./../Settings/Store/ItemMaster";
import SlaTemplateDepartment from "./../Settings/Store/SlaTemplateDepartment";
import StoreUsers from "./../Settings/Store/StoreUsers";
import StoreModule from "./../Settings/Store/StoreModule";
import DepartmentMaster from "./../Settings/Store/DepartmentMaster";
import ClaimCategoryMaster from "./../Settings/Store/ClaimCategoryMaster";
import StoreAlerts from "./../Settings/Store/StoreAlerts";
import { NotificationContainer } from "react-notifications";

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
        <Route exact path={`${match.url}/storetask`} component={StoreTask} />
        <Route
          exact
          path={`${match.url}/storetaskview`}
          component={StoreTaskView}
        />

        <Route
          exact
          path={`${match.url}/editStoreTask`}
          component={EditStoreTask}
        />
        <Route
          exact
          path={`${match.url}/storeTaskByTicket`}
          component={StoreTaskByTicket}
        />
        <Route exact path={`${match.url}/raiseClaim`} component={RaiseClaim} />
        <Route exact path={`${match.url}/claim`} component={Claim} />
        <Route
          exact
          path={`${match.url}/claimApproveReject`}
          component={ClaimApproveReject}
        />
        <Route
          exact
          path={`${match.url}/storeAddTask`}
          component={StoreAddTask}
        />
        <Route
          exact
          path={`${match.url}/hierarchyMaster`}
          component={HierarchyMaster}
        />
        <Route
          exact
          path={`${match.url}/storePriority`}
          component={StorePriority}
        />
        <Route
          exact
          path={`${match.url}/storeCRMRole`}
          component={StoreCRMRole}
        />
        <Route
          exact
          path={`${match.url}/storeReports`}
          component={StoreReports}
        />
        <Route exact path={`${match.url}/itemMaster`} component={ItemMaster} />
        <Route
          exact
          path={`${match.url}/slaTemplateDepartment`}
          component={SlaTemplateDepartment}
        />
        <Route exact path={`${match.url}/storeUsers`} component={StoreUsers} />
        <Route
          exact
          path={`${match.url}/storeModule`}
          component={StoreModule}
        />
        <Route
          exact
          path={`${match.url}/departmentMaster`}
          component={DepartmentMaster}
        />
        <Route
          exact
          path={`${match.url}/claimCategoryMaster`}
          component={ClaimCategoryMaster}
        />
        <Route
          exact
          path={`${match.url}/storeAlerts`}
          component={StoreAlerts}
        />
        <NotificationContainer />
      </StoreLayout>
    );
  }
}
export default StoreApp;
