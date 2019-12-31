import { encryption } from "./encryption";

export function authHeader(token = "token") {
  debugger
  if (token === "no") {
    return {
      // Authorization: " TXlXYXlVc2VyOmRlbW8=",
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    };
  } 
else {
    // var token=window.localStorage.getItem('token');
     
      var tokenValue = encryption(window.localStorage.getItem("token"), "desc");
      return { 'X-Authorized-Token': tokenValue, "Content-Type": "application/json" };
     
  }
}
