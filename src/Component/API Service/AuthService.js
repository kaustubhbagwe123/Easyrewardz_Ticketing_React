import axios from "axios";
import { config } from "../../helpers/config";
export default class AuthService{

    //Login api
    login(emailId,Password){
        axios({
            method: "post",
            url: `${config.apiUrl}/authenticate`,
            data: {
              UserName: username,
              Password: password,
            },
            headers: { 
                'Content-Type': 'application/json',
                "Access-Control-Allow-Methods" : "*"
         }
          })
    }
}