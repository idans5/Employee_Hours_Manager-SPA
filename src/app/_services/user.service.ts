import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './../_models/user';
import { environment } from './../../environments/environment';

@Injectable()
export class UserService {
  baseUrl = environment.apiUrl;

constructor(private http: HttpClient) { }

getUser(): Observable<User> {
  return this.http.get<User>(this.baseUrl + 'users/' + 'me');
}

}
