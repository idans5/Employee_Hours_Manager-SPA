import { WorkLine } from './../_models/workLine';
import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class WorkLineService {
  baseUrl = environment.apiUrl + 'workLines/';
  jwtHelper = new JwtHelperService();

constructor( private http: HttpClient ) { }


// tslint:disable-next-line: typedef
addWorkLine(model: any) {
    return this.http.post(this.baseUrl , model);
}

getData(): Observable<any[]> {
  return this.http.get<any[]>(this.baseUrl + 'table');
}

}
