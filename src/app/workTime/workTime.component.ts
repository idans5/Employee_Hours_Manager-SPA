import { WorkTimeService } from './../_services/workTime.service';
import { WorkLineService } from './../_services/workLine.service';
import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { Router  } from '@angular/router';

import { DatePipe } from '@angular/common';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { timer, Subject, interval } from 'rxjs';

// const counter = timer(0, 1000);

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'app-workTime',
  templateUrl: './workTime.component.html',
  styleUrls: ['./workTime.component.scss']
})

export class WorkTimeComponent implements OnInit {

  constructor(  private router: Router , public auth: AuthService, public workT: WorkTimeService,
                private WorkL: WorkLineService , private alertify: AlertifyService,
                private Dp: DatePipe, private changeDetector: ChangeDetectorRef) { }


  // tslint:disable-next-line: typedef tslint:disable-next-line: use-lifecycle-interface
  ngOnInit() {
    this.workT.runningClock();

    this.laodusernameAndDate();

    this.workT.laodInterval();
  }


  // tslint:disable-next-line: typedef
  laodusernameAndDate(){
    this.workT.model.username = this.auth.currentUser.username;
    this.workT.model.date = this.Dp.transform(new Date(), 'M/d/yy');
  }

  // tslint:disable-next-line: typedef
startTimer() {
    this.workT.addEntry();
    this.workT.helper = new Date().getTime();
    this.workT.model.start = this.Dp.transform(new Date(), 'h:mm a');
    this.workT.isRun = false;
  }

// tslint:disable-next-line: typedef
exitAndSave() {
  this.workT.model.exit = this.Dp.transform(new Date(), 'h:mm a');
  this.calculateAll();
  this.createNewWorkLine();
  this.router.navigate(['/home']);
  this.workT.isRun = true;
  this.workT.entries = [];
  this.workT.hour = {};
  this.workT.min = {};
  this.workT.helper = {};
  // clearInterval(this.workT.interval);
  }


transform(value: number, args?: any): string {

    // tslint:disable-next-line: prefer-const
    let hours = Math.floor(value / 60);
    // tslint:disable-next-line: prefer-const
    let minutes = (value - hours * 60);

    if (hours < 10 && minutes < 10) {
        return '0' + hours + ' : 0' + (value - hours * 60);
    }
    if (hours > 10 && minutes > 10) {
        return '0' + hours + ' : ' + (value - hours * 60);
    }
    if (hours > 10 && minutes < 10) {
        return hours + ' : 0' + (value - hours * 60);
    }
    if (minutes > 10) {
        return '0' + hours + ' : ' + (value - hours * 60);
    }
  }

  // tslint:disable-next-line: typedef
calculateAll() {
      // tslint:disable-next-line: radix
      const seconds = Math.abs(((new Date().getTime() - this.workT.helper) / 1000));
      // tslint:disable-next-line: radix
      const sec = parseInt(seconds.toString());
      // tslint:disable-next-line: radix
      this.workT.min = parseInt((sec / 60).toString());
      // tslint:disable-next-line: radix
      this.workT.hour = parseInt((this.workT.min / 60).toString());
      while (this.workT.min > 59)
      {
        this.workT.min = this.workT.min / 60 ;
      }
      if (this.workT.hour < 10 ) {
        this.workT.hour = ('0' + this.workT.hour.toString());
      }
      if (this.workT.min < 10 ) {
        this.workT.min = ('0' + this.workT.min.toString());
      }
      this.workT.model.total = (this.workT.hour.toString() + ':' + this.workT.min.toString());
  }


  // tslint:disable-next-line: typedef
createNewWorkLine() {
    if (this.workT.hour > 12) {
      this.alertify.error('you have passed the 12 hours allowed, Your working hours have not been saved');
      return; }
    this.WorkL.addWorkLine(this.workT.model).subscribe(() => {
      this.workT.model = {};
      this.alertify.success('Registration successful');
    }, error => {
      this.alertify.error(error);
    });
  }

}
