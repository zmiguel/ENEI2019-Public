import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  @ViewChild('editForm') editForm: NgForm;
  user: User;
  constructor(private userService: UserService, private route: ActivatedRoute, private authService: AuthService) { }

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
 updateUser() {
   console.log(this.user.id);
    this.userService.updateUser(this.user.id, this.user).subscribe(
      next => {
        console.log(this.user);
        this.editForm.reset(this.user);
      }, error => {
        console.log(error);
      }
    );
 }
}
