import { Component, OnInit } from '@angular/core';
import {TweedleService} from '../tweedle.service';
import {AuthService} from '../auth.service';
import * as Rx from 'rxjs/Rx';

@Component({
  selector: 'app-tweedles',
  templateUrl: './tweedles.component.html',
  styleUrls: ['./tweedles.component.css']
})
export class TweedlesComponent implements OnInit {

  tweedles;

  constructor(private tweedleService:TweedleService, private auth:AuthService) {

  }

  ngOnInit() {
    let userId = this.auth.getUserId()!=undefined ? this.auth.getUserId() : this.auth.login();
    console.log("TweedlesComponent userId ", userId);
    this.tweedles = [{name:"brexit",trackTerms:"brexit", userId:"11223344"}, {name:"coldplay",trackTerms:"ColdplaySingapore", userId:"11223344"}];
    this.tweedleService.getTweedles(userId).subscribe((res) => this.tweedles=res);
  }
  setTweedle(tweedle){
    this.tweedleService.setCurrentTweedle(tweedle);
  }
}
