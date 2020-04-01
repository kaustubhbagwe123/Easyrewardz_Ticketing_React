import axios from "axios";
import { authHeader } from "./../../../helpers/authHeader";
import config from "./../../../helpers/config";

export default class ItemMasterService {
  ////  get item list
  async GetItemList() {
    return axios({
      method: "post",
      url: config.apiUrl + "/Item/GetItem",
      headers: authHeader()
    });
  }
  ////bulk upload API
  async BulkUploadItem(formData) {
    return axios({
      method: "post",
      url: config.apiUrl + "/Item/BulkUploadItem",
      headers: authHeader(),
      data: formData
    });
  }
}
