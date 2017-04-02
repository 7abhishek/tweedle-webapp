import { Component, OnInit } from '@angular/core';
import {FacebookService, FacebookLoginResponse, FacebookInitParams} from 'ng2-facebook-sdk';
import {AuthService} from './auth.service'
import {User} from './models/user'
import {UserService} from './user.service'
import { ChartsModule } from 'ng2-charts/ng2-charts';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    title:string;
    isUserLoggedIn:boolean;
    userId:string;
    userName:string;
    userPicture:string;
    constructor(private fb:FacebookService, private auth: AuthService, private userservice:UserService) {
        this.title = "Tweedle";
        console.log("this ", this);
    }

    isUserConnected(){
        this.auth.isUserConnected().then(
            (response) => {this.isUserLoggedIn = response.status === "connected";
                this.userId = response.authResponse.userID;
                console.log("response ", response);
            }
        );
    }

    saveUser(){
        console.log("saveUser called");
        let user:User = new User(this.userId, this.userName, "facebook", this.userPicture);
        console.log(this.userservice.saveUserDetails(user));
    }

    ngOnInit() {
        console.log("isUserConnected is called");
        this.auth.isUserConnected().then(
            (response) => {this.isUserLoggedIn = response.status === "connected";
                this.userId = response.authResponse.userID;
                this.auth.setUserId(response.authResponse.userID);
                this.auth.getUserDetails(this.userId).then(
                    (response:any) => {
                        console.log(response);
                        this.userName = response.first_name;
                        this.userPicture = response.picture.data.url;
                        this.saveUser();
                    }
                )
                console.log("ngOnInit this isUserLoggedIn ", this.isUserLoggedIn, this.userId);}
        );

    }




}
