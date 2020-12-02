import { WorkTimeService } from './_services/workTime.service';
import { UserService } from './_services/user.service';
import { WorkLineService } from './_services/workLine.service';
import { AuthService } from './_services/auth.service';
import { appRoutes } from './routes';
import { NgxTimerModule } from 'ngx-timer';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouteReuseStrategy, RouterModule } from '@angular/router';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { DatePipe } from '@angular/common';
import { JwtModule } from '@auth0/angular-jwt';
import { HttpClientModule } from '@angular/common/http';
import { NgxGalleryModule } from 'ngx-gallery-9';

import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { ManagerComponent } from './manager/manager.component';
import { MemberDetailResolver } from './_resolvers/member-detail.resolver';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ErrorInterceptorProvider } from './_services/error.interceptor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { AuthGuard } from './_guards/auth.guard';
import { AlertifyService } from './_services/alertify.service';
import { WorkTimeComponent } from './workTime/workTime.component';
import { EmployeesHoursComponent } from './employeesHours/employeesHours.component';
import { RegisterComponent } from './register/register.component';

// tslint:disable-next-line: typedef
export function tokenGetter() {
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [
    AppComponent,
      NavComponent,
      ManagerComponent,
      LoginComponent,
      HomeComponent,
      WorkTimeComponent,
      EmployeesHoursComponent,
      RegisterComponent
   ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    BsDropdownModule.forRoot(),
    ButtonsModule.forRoot(),
    HttpClientModule,
    NgxTimerModule,
    TabsModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    NgxGalleryModule,
    JwtModule.forRoot({
      config: {
        tokenGetter,
        allowedDomains: ['localhost:3000'],
        disallowedRoutes: ['localhost:3000/api/auth']
      }
    })
  ],
  providers: [
    AuthService,
    DatePipe,
    ErrorInterceptorProvider,
    AuthGuard,
    WorkLineService,
    UserService,
    MemberDetailResolver,
    AlertifyService,
    WorkTimeService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
