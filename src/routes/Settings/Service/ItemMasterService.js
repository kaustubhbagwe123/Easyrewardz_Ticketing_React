import React, { Component } from "react";
import axios from "axios";
import { authHeader } from "./../../../helpers/authHeader";
import config from "./../../../helpers/config";

export default class ItemMasterService {
  ////  get item list
  async GetItemList() {
    return axios({
      method: "post",
      url: config.apiUrl + "/SLA/GetSLA",
      headers: authHeader()
    });
  }
  
}
 