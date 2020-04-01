import axios from "axios";
import { authHeader } from "./../../../helpers/authHeader";
import config from "./../../../helpers/config";

export default class StoreCRMRoleService {
  ////Get CRM grid data
  async GetCRMGridData() {
    return axios({
      method: "post",
      url: config.apiUrl + "/CRMRole/GetCRMRoles",
      headers: authHeader()
    });
  }

  //// Delete CRM Role
  async DeleteCRMData(Id) {
    return axios({
      method: "post",
      url: config.apiUrl + "/CRMRole/DeleteCRMRole",
      headers: authHeader(),
      params: {
        CRMRoleID: Id
      }
    });
  }
  ////Create Update CRM role
  async CreateUpdateCRM(
    CRMRoleID,
    RoleName,
    RoleisActive,
    ModulesEnabled,
    ModulesDisabled
  )
   {
    debugger
    return axios({
      method: "post",
      url: config.apiUrl + "/CRMRole/CreateUpdateCRMRole",
      headers: authHeader(),
      params: {
        CRMRoleID: CRMRoleID,
        RoleName: RoleName,
        RoleisActive: RoleisActive,
        ModulesEnabled: ModulesEnabled,
        ModulesDisabled: ModulesDisabled
      }
    });
  }
}
