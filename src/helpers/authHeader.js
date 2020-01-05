// import { encryption } from "./encryption";

export function authHeader(token = "token") {
  // debugger
  if (token === "no") {
    return {
      // Authorization: " TXlXYXlVc2VyOmRlbW8=",
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    };
  } 
else {
    // Send token in server side with tenanID, ProgramCode, UserId, Password and Domain name
      
      var _token = window.localStorage.getItem("token");
      return { 'X-Authorized-Token': _token, "Content-Type": "application/json" };
     
  }
}
