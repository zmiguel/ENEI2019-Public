import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(next: ActivatedRouteSnapshot): boolean {

    const roles = next.data['roles'] as Array<String>;

    if (roles) {
      const match = this.authService.roleMatch(roles);
      if (match) {
        return true;
      } else {
        this.router.navigate(['dashboard']);
        console.log("não tens acesso a esta página");
      }
    }
    if (this.authService.loggedIn()) {
      return true;
    }

    console.log("you shall not pass");
    this.router.navigate(['/login']);
    return false;
  }
}
