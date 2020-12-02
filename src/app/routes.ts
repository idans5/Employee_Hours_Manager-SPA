import { RegisterComponent } from './register/register.component';
import { EmployeesHoursComponent } from './employeesHours/employeesHours.component';
import { WorkTimeComponent } from './workTime/workTime.component';
import { Routes, CanActivate, CanActivateChild } from '@angular/router';
import { ManagerComponent } from './manager/manager.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './_guards/auth.guard';
import { MemberDetailResolver } from './_resolvers/member-detail.resolver';

export const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'workTime', component: WorkTimeComponent , canActivate: [AuthGuard] },
  {
      path: '',
      runGuardsAndResolvers: 'always',
      canActivateChild : [AuthGuard],
      children: [
          { path: 'manager', component: ManagerComponent },
          { path: 'employeeHours', component: EmployeesHoursComponent },
          { path: 'register', component: RegisterComponent },
          { path: '**', redirectTo: 'home', pathMatch: 'full' },
      ],
    }
];
