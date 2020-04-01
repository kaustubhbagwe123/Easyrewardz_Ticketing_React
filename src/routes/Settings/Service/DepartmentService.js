import axios from "axios";
import { authHeader } from "./../../../helpers/authHeader";
import config from "./../../../helpers/config";

export default class DepartmentService {
  ////Get Detaptment grid data
  async GetDetapartmentGridData() {
    return axios({
      method: "post",
      url: config.apiUrl + "/Department/GetSLA",
      headers: authHeader()
    });
  }

  ////Get Brand List
  async GetBrandData() {
    return axios({
      method: "post",
      url: config.apiUrl + "/Brand/GetBrandList",
      headers: authHeader()
    });
  }
}
