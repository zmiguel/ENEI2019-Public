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
    if (this.authService.loggedIn)
    {
      this.router.navigate(['/']);
    }
  }
  login() {

    this.authService.login(this.model).subscribe(next => {

    this.router.navigate(['/']);

   }, error => {
     console.log('Failed to login');
   }, () => {
       this.router.navigate(['/']);
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
