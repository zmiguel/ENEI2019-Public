import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxAdminLteModule } from 'ngx-admin-lte';


import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';

import { ValueComponent } from './value/value.component';
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

@NgModule({
   declarations: [
      AppComponent,
      ValueComponent,
      LoginComponent,
      DashboardComponent,
      ProfileComponent,
      HomeComponent,
      NavigationComponent,
      CalendarComponent
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
      AuthGuard
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
