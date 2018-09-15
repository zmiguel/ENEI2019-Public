import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import { ActivatedRoute } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-user',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  user: User;
  jwtHelper = new JwtHelperService();
  decodedToken: any;
  constructor(private userService: UserService, private route: ActivatedRoute) { }

  ngOnInit() {
     this.loadUser();
  }

  // members/...
  loadUser() {
    this.decodedToken = this.jwtHelper.decodeToken(localStorage.getItem('token'));

     this.userService.getUser(+this.decodedToken['nameid']).subscribe((user: User) => {
      this.user = user;
    }, error => {
      console.log(error);
    });
  }

}
