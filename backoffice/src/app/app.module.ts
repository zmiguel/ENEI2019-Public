import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';

import { ValueComponent } from './value/value.component';
import { HttpClient } from '../../node_modules/@types/selenium-webdriver/http';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { AuthService } from './services/auth.service';

@NgModule({
   declarations: [
      AppComponent,
      ValueComponent,
      LoginComponent
   ],
   imports: [
      BrowserModule,
      HttpClientModule,
      FormsModule
   ],
   providers: [
       AuthService
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
