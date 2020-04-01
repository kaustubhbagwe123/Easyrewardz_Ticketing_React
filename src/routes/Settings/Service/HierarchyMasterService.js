import axios from "axios";
import { authHeader } from "./../../../helpers/authHeader";
import config from "./../../../helpers/config";

export default class HierarchyMasterService {
  //  get item list
  async GetItemList() {
    return axios({
      method: "post",
      url: config.apiUrl + "/Hierarchy/ListHierarchy",
      headers: authHeader(),
      params: {
        HierarchyFor: 2
      }
    });
  }

  //  get report list dropdown
  async GetReportListDropDown() {
    return axios({
      method: "post",
      url: config.apiUrl + "/Designation/GetDesignationList",
      headers: authHeader(),
      params: {
        hierarchyFor: 2
      }
    });
  }

  //  create item
  async CreateItem(designation_name, ReportId, activeStatus) {
    return axios({
      method: "post",
      url: config.apiUrl + "/Hierarchy/CreateHierarchy",
      headers: authHeader(),
      data: {
        DesignationName: designation_name.trim(),
        ReportToDesignation: ReportId,
        IsActive: activeStatus,
        HierarchyFor: 2
      }
    });
  }

  //  delete item
  async DeleteItem(hierarchy_Id) {
    return axios({
      method: "post",
      url: config.apiUrl + "/Hierarchy/CreateHierarchy",
      headers: authHeader(),
      data: {
        DesignationID: hierarchy_Id,
        Deleteflag: 1,
        HierarchyFor: 2
      }
    });
  }

  //  update item
  async UpdateItem(designationID, updateDesignation, updateReprtTo, activeStatus) {
    return axios({
      method: "post",
      url: config.apiUrl + "/Hierarchy/CreateHierarchy",
      headers: authHeader(),
      data: {
        DesignationID: designationID,
        DesignationName: updateDesignation.trim(),
        ReportToDesignation: updateReprtTo,
        IsActive: activeStatus,
        HierarchyFor: 2
      }
    });
  }
  
}
 