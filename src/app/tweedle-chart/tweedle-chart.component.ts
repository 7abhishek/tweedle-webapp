import { Component, OnInit } from '@angular/core';
import {TweedleService} from '../tweedle.service';
import * as Rx from 'rxjs/Rx';
import { ChartsModule } from 'ng2-charts';
import { TweedleRequest } from './../models/tweedleRequest';


@Component({
  selector: 'app-tweedle-chart',
  templateUrl: './tweedle-chart.component.html',
  styleUrls: ['./tweedle-chart.component.css']
})
export class TweedleChartComponent implements OnInit {


  sentiments:Array<string> = [];
  public chartLabels:string[] = ['Positive','Neutral','Negative'];
  public pieChartData:number[] = [1, 1, 1];
  public chartType:string = 'pie';
  public chartOptions = {
    scaleShowVerticalLines: false,
    responsive: true,
    maintainAspectRatio: false
  };
  tweetCount:number = 0;
  dataFlowing:boolean = false;
  startAnalysis:boolean = false;
  tweedle = this.tweedleService.getCurrentTweedle();

  public chartData:Array<any> = [0,0,0];

  constructor(private tweedleService:TweedleService) { }

  ngOnInit() {
    //this.requestAnalysis();
  }

  public chartClicked(e:any):void {
    console.log(e);
  }

  public chartHovered(e:any):void {
    console.log(e);
  }

  updatePieChart(sentiment) {
    this.dataFlowing = true;
    this.tweetCount = this.tweetCount + 1;
    console.log("updatePieChart ",this.pieChartData);
    let barChartData = [sentiment["positive"],sentiment["neutral"],sentiment["negative"]];
    this.chartData = barChartData;
  }

  requestAnalysis(){
    let tweedle = this.tweedleService.getCurrentTweedle();
    this.tweedleService.startStreamingAndAnalysis(tweedle).subscribe((response) => console.log("start steaming and analysis response", response));
    this.startAnalysis = true;
    console.log("establishing websocket...", tweedle , JSON.stringify(tweedle));
    var socket = this.tweedleService.fromWebSocket('ws://localhost:9000/test', 'tweedle-protocol', Rx.Subscriber.create(function () {
      console.log("socket ", socket, "sending message ", JSON.stringify(tweedle));
      socket.next(JSON.stringify(tweedle));
    }));
    socket.subscribe((e) => {
      console.log("hello ", e);
      this.sentiments.push(e.data);
      let data = JSON.parse(e.data.replace(/"{/g,'{').replace(/}"/g,"}"));
      console.log("data ", data);
      this.updatePieChart(data);
    });

  }

  stopAnalysis(){
    this.startAnalysis = false;
    let tweedle= this.tweedleService.getCurrentTweedle();
    this.tweedleService.stopTweedle(tweedle).subscribe((data) => console.log("response to stop ", data));
  }
}
