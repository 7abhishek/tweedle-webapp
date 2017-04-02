import { Component, OnInit } from '@angular/core';
import {FacebookService, FacebookLoginResponse, FacebookInitParams} from 'ng2-facebook-sdk';

@Component({
  selector: 'app-facebook-login',
  template: `
    <a class="btn btn-block btn-social btn-facebook" (click)="login()">
    <span class="fa fa-facebook"></span> Sign in
    </a>
  `,
  styles: ['a {color:white;}']
})
export class FacebookLoginComponent implements OnInit {
  isLoggedIn:boolean;

  constructor(private fb: FacebookService) {
    this.isLoggedIn = false;
  }

  ngOnInit(){

  }
  login(): void {
    this.fb.login().then(
        (response: FacebookLoginResponse) => { console.log(response); this.isLoggedIn = response.status==="connected";},
        (error: any) => console.error(error)
    );
  }
}
