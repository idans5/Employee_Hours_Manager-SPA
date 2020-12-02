import { User } from './../_models/user';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = environment.apiUrl ;
  jwtHelper = new JwtHelperService();
  decodedToken: any;
  currentUser: User;

constructor( private http: HttpClient ) { }

// tslint:disable-next-line: typedef
login(model: any) {
  return this.http.post(this.baseUrl + 'auth/' + 'login', model).pipe(
    map((response: any) => {
      const user = response;
      if (user) {
        localStorage.setItem('token', user.token);
        localStorage.setItem('user', JSON.stringify(user.user));
        this.decodedToken = this.jwtHelper.decodeToken(user.token);
        this.currentUser = user.user;
      }
    })
  );
  }

  // tslint:disable-next-line: typedef
  loggedIn() {
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }

  // tslint:disable-next-line: typedef
  register(user: User) {
    return this.http.post(this.baseUrl + 'users/' + 'register', user);
  }

  // tslint:disable-next-line: typedef
  isAdmin(){
    return this.currentUser.isAdmin;
  }

}
