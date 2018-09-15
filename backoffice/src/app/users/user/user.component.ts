import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  user: User;
  constructor(private userService: UserService, private route: ActivatedRoute) { }

  ngOnInit() {
     this.loadUser();
  }

  // members/...
  loadUser() {
     // o mais é para garantir que a route retorna um inteiro
    this.userService.getUser(+this.route.snapshot.params['id']).subscribe((user: User) => {
      this.user = user;
    }, error => {
      console.log(error);
    });
  }

}
