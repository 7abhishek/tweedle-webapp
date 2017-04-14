import { Injectable } from '@angular/core';
import {User} from './models/user'
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class UserService {

  tweedleUrl = "http://localhost:9000";

  constructor (private http: Http) {}


  saveUserDetails(user:User) {
    var headers = new Headers({ 'Content-Type': 'application/json' });
    var options = new RequestOptions({ headers: headers });
    console.log("saveUserDetails called with ", user);
    return this.http.post(this.tweedleUrl+"/login", user, options)
        .subscribe((res:Response) => res.json()); // ...and calling .json() on the response to return data

  }
}
