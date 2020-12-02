import { Component, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { Subject, interval } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

export interface Entry {
  created: Date;
}

export interface TimeSpan {
  hours: number;
  minutes: number;
  seconds: number;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {

  constructor( private changeDetector: ChangeDetectorRef) { }

  entries: Entry[] = [];

  private destroyed$ = new Subject();

  ngOnInit() {
    interval(1000).subscribe(() => {
      if (!this.changeDetector['destroyed']) {
        this.changeDetector.detectChanges();
      }
    });

    this.changeDetector.detectChanges();
  }

  // tslint:disable-next-line: typedef
  OnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  // tslint:disable-next-line: typedef
  addEntry() {
    this.entries.push({
      created: new Date(),
    });
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
