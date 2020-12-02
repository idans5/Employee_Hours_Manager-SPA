import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Component, OnInit, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { User } from 'src/app/_models/user';
import { EmailValidator, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { AlertifyService } from '../_services/alertify.service';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.css']
})
export class ManagerComponent implements OnInit {
  // @HostListener('window:beforeunload', ['$event'])
  // @Input() user: User;
  @Output() cancelManager = new EventEmitter();
  model: any = {};
  managerForm: FormGroup;

  constructor( public authService: AuthService , private alertify: AlertifyService,
               private router: Router, private fb: FormBuilder) { }

  // tslint:disable-next-line: typedef
  ngOnInit() {

   }
  // tslint:disable-next-line: typedef
  goToTableEmployee() {
    this.router.navigate(['/employeeHours']);
  }

  // tslint:disable-next-line: typedef
  addNewUser() {
    this.router.navigate(['/register']);
  }

  // tslint:disable-next-line: typedef
  loginManager() {
    this.authService.login(this.model).subscribe(next => {
      this.alertify.success('Logged in succsessfully');
    // tslint:disable-next-line: no-shadowed-variable
    }, error => {
      this.alertify.error(error);
    }, () => {
      this.router.navigate(['/workTime']);
    });
  }

  // tslint:disable-next-line: typedef
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.authService.decodedToken = null;
    this.authService.currentUser = null;
    this.alertify.message('logged out');
    this.router.navigate(['/home']);
  }

  // tslint:disable-next-line: typedef
  cancel() {
    this.cancelManager.emit(false);
  }



}
