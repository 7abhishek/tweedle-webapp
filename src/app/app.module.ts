import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule , JsonpModule} from '@angular/http';
import { FacebookService } from 'ng2-facebook-sdk';

import { AppComponent } from './app.component';
import { FacebookLoginComponent } from './facebook-login/facebook-login.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { AuthService } from './auth.service'
import {UserService } from './user.service'

@NgModule({
    declarations: [
        AppComponent,
        FacebookLoginComponent,
        LoadingSpinnerComponent,
        LoadingSpinnerComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        JsonpModule
    ],
    providers: [FacebookService, AuthService, UserService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
