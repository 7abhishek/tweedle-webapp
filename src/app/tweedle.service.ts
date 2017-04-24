import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http'
import * as Rx from 'rxjs/Rx';
import {TweedleRequest} from './models/tweedleRequest';

@Injectable()
export class TweedleService {

  private subject: Rx.Subject<MessageEvent>;
  private url:string;
  private tweedleUrl:string = "http://74.207.229.25:9000/";
  private currentTweedle:TweedleRequest;
  constructor(private http:Http) {
    this.url="ws://localhost:9000/test";
  }


  saveTweedle(tweedle:TweedleRequest) {
    console.log("save Tweedle ", tweedle);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.tweedleUrl+"tweedle",  tweedle, options)
        .map((data) => {console.log("saveTweedle ", data);})
        .catch(this.handleError);
  }

  private handleError (error: Response | any) {
    // In a real world app, we might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Promise.reject(errMsg);
  }

  getTweedles(userId){
    return this.http.get(this.tweedleUrl+"tweedles/"+userId).map((data) => data.json());
  }

  getWsInstance() {
    if (!this.subject) {
      this.subject = this.create(this.url);
      console.log("Successfully connected: ", this.url, this.subject);
    }
    return this.subject;
  }

  private create(url:string): Rx.Subject<MessageEvent> {
    let ws = new WebSocket(url);
    console.log("WebSocket created ", ws);
    let observable = Rx.Observable.create(
        (obs: Rx.Observer<MessageEvent>) => {
          ws.onmessage = obs.next.bind(obs);
          ws.onerror = obs.error.bind(obs);
          ws.onclose = obs.complete.bind(obs);
          return ws.close.bind(ws);
        });
    let observer = {
      next: (tweedle: TweedleRequest) => {
        if (ws.readyState === WebSocket.OPEN) {
          console.log("websocket readyState , sending data ", JSON.stringify(tweedle));
          ws.send(JSON.stringify(tweedle));
        }
      }
    };
    return Rx.Subject.create(observer, observable);
  }


  fromWebSocket(address, protocol, openObserver) {
  var ws = new WebSocket(address, protocol);
  console.log("websocket ", ws);
  var observer = Rx.Subscriber.create(function (data) {
    if (ws.readyState === WebSocket.OPEN) { ws.send(data); }
  });

  // Handle the data
  var observable = Rx.Observable.create (function (obs) {
    // Handle open
    if (openObserver) {
      ws.onopen = function (e) {
        openObserver.next(e);
        //openObserver.complete();
      };
    }

    // Handle messages
    ws.onmessage = obs.next.bind(obs);
    ws.onerror = obs.error.bind(obs);
    ws.onclose = obs.complete.bind(obs);

    // Return way to unsubscribe
    return ws.close.bind(ws);
  });

  return Rx.Subject.create(observer, observable);
}


  startStreamingAndAnalysis(tweedle){
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.tweedleUrl+"start",  tweedle, options)
        .map((data) => {console.log("saveTweedle ", data);})
        .catch(this.handleError);
  }


  setCurrentTweedle(tweedle){
    console.log("setting current tweedle ", tweedle);
    this.currentTweedle = tweedle;
  }

  getCurrentTweedle(){
    return this.currentTweedle;
  }

  stopTweedle(tweedle){
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.tweedleUrl+"stop",  tweedle , options)
        .map((data) => {console.log("stopTweedle ", data);})
        .catch(this.handleError);
  }
}
