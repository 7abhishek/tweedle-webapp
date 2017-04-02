import { Injectable } from '@angular/core';
import {FacebookService, FacebookLoginResponse, FacebookInitParams} from 'ng2-facebook-sdk';
@Injectable()
export class AuthService {
  isUserLoggedIn:boolean;
  userId:String;
  constructor(private fb:FacebookService) {
    let fbParams:FacebookInitParams = {
      appId: '1340796362646203',
      xfbml: true,
      version: 'v2.8'
    };
    this.fb.init(fbParams);
    this.isUserLoggedIn = false;
  }

  isUserConnected() {
    return this.fb.getLoginStatus();
  }

  getUserLoginStatus(){
    return this.isUserLoggedIn;
  }

  login():void {
      this.fb.login().then(
        (response: FacebookLoginResponse) => { console.log("response ", response); this.isUserLoggedIn = response.status==="connected";},
        (error: any) => console.error(error)
    );
  }

  getUserDetails(userId:string){
    return this.fb.api("/"+userId+"?fields=id,first_name,picture").then(
        (response:any) => {
          console.log("userDetail Response ", response);
          return Promise.resolve(response);
        },
        (error: any) => console.error(error)
    );
  }

  setUserId(userId:string){
    this.userId = userId;
  }

  getUserId(){
    return this.userId;
  }

}
