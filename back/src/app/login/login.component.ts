import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  model: any = {};

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  login() {
   this.authService.login(this.model).subscribe(next => {
     console.log('Logged in sucessfully');
   }, error => {
     console.log('Failed to login');
   }, () => {
     this.router.navigate(['/dashboard']);
   });
  }

  loggedIn() {
   return this.authService.loggedIn();
  }

  logout() {
    localStorage.removeItem('token');
    console.log('logged out!');
  }
}
