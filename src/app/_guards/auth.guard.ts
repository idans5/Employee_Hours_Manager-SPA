import {AuthService} from '../_services/auth.service';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { CanActivate, Router, CanActivateChild } from '@angular/router';
import { AlertifyService } from '../_services/alertify.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(
  private authService: AuthService,
  private router: Router,
  private alertify: AlertifyService
  ) {}

  canActivateChild(): boolean  {
    if (this.authService.currentUser.isAdmin) {
      return true;
    }
    this.alertify.error('Sorry, you are not a manager!!!');
    this.router.navigate(['/home']);
    return false;
  }


  canActivate(): boolean  {
    if (this.authService.loggedIn()) {
      return true;
    }
    this.alertify.error('Sorry, you do not have permission!!!');
    this.router.navigate(['/home']);
    return false;
  }

  // CanActivateChild(): boolean  {
  //   if (this.authService.currentUser.isAdmin) {
  //     return true;
  //   }
  //   this.alertify.error('You shall not pass!!!');
  //   this.router.navigate(['/home']);
  //   return false;
  // }

}
