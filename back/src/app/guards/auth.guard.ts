import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}
  canActivate(): boolean {
    if (this.authService.loggedIn()) {
      return true;
    }
    console.log("you shall not pass");
    this.router.navigate(['/login']);
    return false;
  }
}
