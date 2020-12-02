import { User } from './../_models/user';
import { environment } from './../../environments/environment';
import { Injectable, ChangeDetectorRef } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { timer, Subject, interval } from 'rxjs';


export interface Entry {
  created: Date;
}

export interface TimeSpan {
  hours: number;
  minutes: number;
  seconds: number;
}

@Injectable({
  providedIn: 'root'
})

export class WorkTimeService {
clock;
private counter = timer(0, 1000);
// tslint:disable-next-line: no-inferrable-types
isRun: boolean = true;
model: any = {};
entries: Entry[] = [];
hour: any;
min: any;
helper: any;

constructor(private http: HttpClient) { }

  // tslint:disable-next-line: typedef
  runningClock() {
    this.counter.subscribe(() => {
      this.helperToTransport();
    });
  }

  // tslint:disable-next-line: typedef
  helperToTransport() {
    const date = new Date();
    let second: number | string = date.getSeconds();
    let minute: number | string = date.getMinutes();
    const hour: number | string = date.getHours();
    if (second < 10) {
      second = '0' + second;
    }
    if (minute < 0) {
      minute = '0' + minute;
    }
    this.clock = hour + ':' + minute + ':' + second;
  }

  // tslint:disable-next-line: typedef
  laodInterval() {
    interval(1000);
  }

  // tslint:disable-next-line: typedef
  addEntry() {
    this.entries.push({
      created: new Date(),
    });
    this.isRun = false;
  }

  getElapsedTime(entry: Entry): TimeSpan {
    let totalSeconds = Math.floor((new Date().getTime() - entry.created.getTime()) / 1000);

    let hours = 0;
    let minutes = 0;
    let seconds = 0;

    if (totalSeconds >= 3600) {
      hours = Math.floor(totalSeconds / 3600);
      totalSeconds -= 3600 * hours;
    }

    if (totalSeconds >= 60) {
      minutes = Math.floor(totalSeconds / 60);
      totalSeconds -= 60 * minutes;
    }

    seconds = totalSeconds;

    return {
      hours,
      minutes,
      seconds
    };
  }


}
