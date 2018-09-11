import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { JwtModule } from '@auth0/angular-jwt';



import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';

import { HttpClient } from '../../node_modules/@types/selenium-webdriver/http';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { AuthService } from './services/auth.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { Router, RouterModule } from '@angular/router';
import { appRoutes } from './routes';
import { AuthGuard } from './guards/auth.guard';
import { NavigationComponent } from './navigation/navigation.component';
import { UserService } from './services/user.service';
import { HomeComponent } from './home/home.component';
import { UsersListComponent } from './users/usersList/usersList.component';
import {User} from './models/user';
import { UserComponent } from './users/user/user.component';
import { FooterComponent } from './footer/footer.component';
import { EditComponent } from './users/edit/edit.component';
import { PreventUnsavedChanges } from './guards/prevent-unsaved-changes.guard';


export function tokenGetter() {
  return localStorage.getItem('token');
}



@NgModule({
   declarations: [
      AppComponent,
      LoginComponent,
      DashboardComponent,
      ProfileComponent,
      NavigationComponent,
      HomeComponent,
      UsersListComponent,
      UserComponent,
      FooterComponent,
      EditComponent
   ],
   imports: [
      BrowserModule,
      HttpClientModule,
      FormsModule,
      RouterModule.forRoot(appRoutes),
      JwtModule.forRoot({
        config: {
          tokenGetter: tokenGetter,
          whitelistedDomains: ['localhost:5000'],
          blacklistedRoutes: ['localhost/login']
        }
      })
    ],
      providers: [
      AuthService,
      AuthGuard,
      UserService,
      PreventUnsavedChanges
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
