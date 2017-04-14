import { Component, OnInit } from '@angular/core';
import {TweedleService} from '../tweedle.service';
import * as Rx from 'rxjs/Rx';
import { ChartsModule } from 'ng2-charts';

@Component({
  selector: 'app-tweedle-chart',
  templateUrl: './tweedle-chart.component.html',
  styleUrls: ['./tweedle-chart.component.css']
})
export class TweedleChartComponent implements OnInit {

  sentiments:Array<string> = [];
  public chartLabels:string[] = ['Positive','Neutral','Negative'];
  public pieChartData:number[] = [1, 1, 1];
  public chartType:string = 'bar';
  public chartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };

  public chartData:Array<any> = [[0,1,2]];

  constructor(private tweedleService:TweedleService) { }

  ngOnInit() {
    this.requestAnalysis();
  }

  public chartClicked(e:any):void {
    console.log(e);
  }

  public chartHovered(e:any):void {
    console.log(e);
  }

  updatePieChart(sentiment){
    this.pieChartData[0] =  sentiment["positive"];
    this.pieChartData[1] =  sentiment["neutral"];
    this.pieChartData[2] =  sentiment["negative"];
    console.log("updatePieChart ",this.pieChartData);
    let barChartData = [sentiment["positive"],sentiment["neutral"],sentiment["negative"]];
    this.chartData = barChartData;
  }
  requestAnalysis(){
    let tweedle = this.tweedleService.getCurrentTweedle();
    var socket = this.tweedleService.fromWebSocket('ws://localhost:9000/test', 'tweedle-protocol', Rx.Subscriber.create(function () {
      console.log("socket ", socket);
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
}
