import { Injectable } from '@angular/core';
import {FacebookService, FacebookLoginResponse, FacebookInitParams} from 'ng2-facebook-sdk';
import {UserService} from './user.service';
import {User} from './models/user';
@Injectable()
export class AuthService {
  isUserLoggedIn:boolean;
  userId:String;
  constructor(private fb:FacebookService, private userservice:UserService) {
    let fbParams:FacebookInitParams = {
      appId: '1340796362646203',
      xfbml: true,
      version: 'v2.8'
    };
    this.fb.init(fbParams);
    this.isUserLoggedIn = false;
    console.log("AuthService constructor this.fb.getLoginStatus() ", this.fb.getLoginStatus());
  }

  isUserConnected() {
    return this.fb.getLoginStatus();
  }

  getUserLoginStatus(){
    return this.isUserLoggedIn;
  }

  saveUser(authResponse){
    console.log("AuthService saveUser authResponse ", authResponse);
    let user:User = new User(authResponse.userID!=undefined?authResponse.userID:authResponse.id, authResponse.first_name, "facebook", authResponse.picture.data.url);
    this.userservice.saveUserDetails(user)
  }

  login():void {
          this.fb.getLoginStatus().then((response) => {
            if(response.status ==="connected"){
              console.log("response ", response);
              this.isUserLoggedIn = response.status==="connected";
              this.setUserId(response.authResponse.userID);
            } else {
              this.fb.login().then(
                  (response: FacebookLoginResponse) => {
                    console.log("response ", response);
                    this.isUserLoggedIn = response.status==="connected";
                    this.setUserId(response.authResponse.userID);
                  },
                  (error: any) => {console.error(error)});
            }
          },
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
