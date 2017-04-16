import { Component, OnInit, AfterViewInit, ApplicationRef } from '@angular/core';
import { WindowRefService } from '../window-ref.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html?v=122',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit, AfterViewInit {
  refresh:boolean=true;
  constructor(private window: WindowRefService, private ref: ApplicationRef,private activatedRoute:ActivatedRoute) {
    if(this.refresh){
     console.log("activatedRoute ", activatedRoute);
    }
  }

  ngOnInit() {
    var window = this.window.nativeWindow();
    if(typeof window.impress === "function"){
      console.log("ngOnInit window.impress ", window.impress, window.impress!==undefined, window);
      window.impress().init();
    }
  }

  ngAfterViewInit(){
    var window = this.window.nativeWindow();
    if(typeof window.impress === "function"){
      console.log("ngAfterViewInit window.impress ", window.impress, window.impress!==undefined, window);
      window.impress().init();
    }

  }

}
