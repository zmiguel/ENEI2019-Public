import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { User } from '../models/user';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  jwtHelper = new JwtHelperService();
  decodedToken: any;

  user: User;
  constructor(private userService: UserService, private route: ActivatedRoute, private authService: AuthService) { }

  ngOnInit() {
    this.decodedToken = this.jwtHelper.decodeToken(localStorage.getItem('token'));
    this.loadUser();
  }

 // members/...
 loadUser() {
    // o mais é para garantir que a route retorna um inteiro
   this.userService.getUser(this.decodedToken.nameid).subscribe((user: User) => {
     this.user = user;
   }, error => {
     console.log(error);
   });
 }

}
