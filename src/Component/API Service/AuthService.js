import axios from "axios";
import { config } from "../../helpers/config";
import { faSdCard } from "@fortawesome/free-solid-svg-icons";
export default class AuthService{

    //Login api
    // login(emailId,password){
      
    //     const requestOptions = {
    //         method: "POST",
    //         header: {
    //           "Content-Type": "application/json",
    //           "Access-Control-Allow-Methods": "*"
    //         },
    //         body: ""
    //       };
    //       let self = this;

    //       axios(config.apiUrl + "/authenticate", requestOptions, {
    //         params: {
    //           X_Authorized_Programcode:Aj3zce2TzWs=,
    //           X_Authorized_Domainname: ,
    //           X_Authorized_applicationid: ,
    //           X_Authorized_userId:emailId,
    //           X_Authorized_password:password,
    //         }
    //       }).then(function(res) {
    //         debugger;
    //         let BrandData = res.data.responseData;
    //         self.setState({ BrandData: BrandData }); ///problem not working setstat undefined
    //       });
    // }
}