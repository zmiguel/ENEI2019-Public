import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  constructor(private AuthService: AuthService, private router: Router) { }

  nome= 'Henrique Dias';

  ngOnInit() {
  }
  profile() {
    this.router.navigate(['/profile']);
  }
  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
    console.log('logged out!');
  }

}
