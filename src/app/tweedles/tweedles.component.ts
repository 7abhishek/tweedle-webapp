import { Component, OnInit , ViewChild} from '@angular/core';
import {TweedleService} from '../tweedle.service';
import {AuthService} from '../auth.service';
import * as Rx from 'rxjs/Rx';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { TweedleRequest } from './../models/tweedleRequest';

@Component({
  selector: 'app-tweedles',
  templateUrl: './tweedles.component.html',
  styleUrls: ['./tweedles.component.css']
})
export class TweedlesComponent implements OnInit {

  tweedles;
  @ViewChild('modal')
  modal: ModalComponent;
  selected: string;
  output: string;
  index: number = 0;
  backdropOptions = [true, false, 'static'];
  cssClass: string = '';

  keyboard: boolean = true;
  backdrop: string ='static';
  css: boolean = false;
  newTweedle:string='';
  newTrackTerms:string='';
  newNotify:boolean=false;
  animation = false;

  constructor(private tweedleService:TweedleService, private auth:AuthService) {

  }

  ngOnInit() {
    console.log("modal ", this.modal);
    let userId = this.auth.getUserId()!=undefined ? this.auth.getUserId() : this.auth.login();
    console.log("TweedlesComponent userId ", userId);
    this.tweedles = [];
    this.getTweedles(userId);
  }

  setTweedle(tweedle){
    console.log("setting current Tweedle ", tweedle);
    this.tweedleService.setCurrentTweedle(tweedle);
  }

  openModal(){
    console.log("openModal ", this.modal);
  }

  closed() {
    console.log("closed ");
    this.output = '(closed) ' + this.selected;
    let userId:string = this.auth.getUserId();
    let tweedle:TweedleRequest = new TweedleRequest(userId, this.newTweedle, this.newTrackTerms, this.newNotify);
    console.log("closed ",  tweedle);
    this.tweedleService.saveTweedle(tweedle).subscribe((data) => {
      console.log("response saveTweedle", data);
      this.getTweedles(userId);
    });
  }

  dismissed() {
    console.log("dismissed ");
    this.output = '(dismissed)';
  }

  getTweedles(userId){
      this.tweedleService.getTweedles(userId).subscribe((res) => {
        console.log("res ", res);
        this.tweedles=res;
        console.log(this.tweedles);
      });
  }

  opened() {
    console.log("opened ");
    this.output = '(opened)';
  }
}
