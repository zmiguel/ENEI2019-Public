import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-usersList',
  templateUrl: './usersList.component.html',
  styleUrls: ['./usersList.component.css']
})
export class UsersListComponent implements OnInit {

  users: User[];

  constructor(private UserServive: UserService, private router: Router) { }

  ngOnInit() {
      this.loadUsers();
  }
  loadUsers() {
    this.UserServive.getUsers().subscribe((users: User[]) => {
      this.users = users;
    }, error => {
       console.log('erro a obter lista de utilizadores');
    });
    return this.UserServive.getUsers();
  }

  goTo(id) {
   this.router.navigate(['../user/' + id]);
  }
}
