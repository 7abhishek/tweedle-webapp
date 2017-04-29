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

    ngOnInit() {

    }




}
