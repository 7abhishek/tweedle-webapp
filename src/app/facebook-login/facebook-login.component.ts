import { Component, OnInit } from '@angular/core';
import {FacebookService, FacebookLoginResponse, FacebookInitParams} from 'ng2-facebook-sdk';
import {AuthService} from '../auth.service'
import {UserService} from '../user.service'

@Component({
  selector: 'app-facebook-login',
  template: `
    <a  *ngIf="!isLoggedIn" class="btn btn-block btn-social btn-facebook" (click)="login()">
    <span class="fa fa-facebook"></span> Sign in
    </a>
    <div *ngIf="isLoggedIn">
    <app-tweedles></app-tweedles>
    </div>
  `,
  styles: ['a {color:white;}']
})
export class FacebookLoginComponent implements OnInit {
  isLoggedIn:boolean;

  constructor(private fb: FacebookService,private auth:AuthService, private userSerive:UserService) {
    this.isLoggedIn = false;
  }

  ngOnInit(){
    this.auth.isUserConnected().then(
        (response) => {this.isLoggedIn = response.status === "connected";
          this.auth.setUserId(response.authResponse.userID);
          this.auth.getUserDetails(response.authResponse.userID).then(
              (response:any) => {
                console.log(response);
                this.auth.saveUser(response);
              }
          )
          console.log("ngOnInit this isUserLoggedIn ", this.isLoggedIn);}
    );
    this.login();
  }
  login(): void {
    this.fb.login().then(
        (response: FacebookLoginResponse) => {
          console.log(response);
          this.isLoggedIn = response.status==="connected";
          this.auth.setUserId(response.authResponse.userID);
          //this.auth.saveUser(response.authResponse);
        },
        (error: any) => console.error(error)
    );
  }
}
