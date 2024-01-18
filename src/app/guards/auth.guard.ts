import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

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
    //TODO: use NgRxStore
    if(this.authService.isAuth()) {
      return true;
    } else {
      this.router.navigate(['/login'])
      return false;
    }
  }
}