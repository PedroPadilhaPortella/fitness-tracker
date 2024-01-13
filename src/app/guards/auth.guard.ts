import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor(
    private authService: AuthService,
    private router: Router,
    ) {}

  canLoad(): boolean {
    return this.canActivate();
  }

  canActivate(): boolean {
    if(this.authService.isAuth()) {
      return true;
    } else {
      this.router.navigate(['/login'])
      return false;
    }
  }
}