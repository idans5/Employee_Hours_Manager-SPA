import { WorkLineService } from './../_services/workLine.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'app-employeesHours',
  templateUrl: './employeesHours.component.html',
  styleUrls: ['./employeesHours.component.scss']
})
export class EmployeesHoursComponent implements OnInit {
  ItemsArray = [];

  constructor( private wL: WorkLineService, private router: Router) { }

  // tslint:disable-next-line: typedef
  ngOnInit() {
      this.wL.getData().subscribe((res: any[]) => {
      this.ItemsArray = res;
    });
  }

  // tslint:disable-next-line: typedef
  toManagerMode() {
    this.router.navigate(['/manager']);
  }

}
