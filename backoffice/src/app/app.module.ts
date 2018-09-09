import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxAdminLteModule } from 'ngx-admin-lte';


import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';

import { HttpClient } from '../../node_modules/@types/selenium-webdriver/http';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { AuthService } from './services/auth.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { HomeComponent } from './home/home.component';
import { Router, RouterModule } from '@angular/router';
import { appRoutes } from './routes';
import { AuthGuard } from './guards/auth.guard';
import { NavigationComponent } from './navigation/navigation.component';
import { CalendarComponent } from './calendar/calendar.component';
import { UserService } from './services/user.service';
import { UsersModule } from './admin/users/users.module';
import { UsersComponent } from './admin/users/users.component';
import { UserComponent } from './admin/users/user/user.component';

@NgModule({
   declarations: [
      AppComponent,
      LoginComponent,
      DashboardComponent,
      ProfileComponent,
      HomeComponent,
      NavigationComponent,
      CalendarComponent,
      UsersComponent,
      UserComponent
   ],
   imports: [
      BrowserModule,
      NgxAdminLteModule,
      HttpClientModule,
      FormsModule,
      RouterModule.forRoot(appRoutes)
    ],
      providers: [
      AuthService,
      AuthGuard,
      UserService
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
