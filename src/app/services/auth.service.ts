import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthData } from '../interfaces/auth-modal.interface';
import { User } from '../interfaces/user.interface';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private user!: User | null;
  authChange = new Subject<boolean>(); 

  constructor(private router: Router) { }

  getUser(): User {
    return { ...this.user } as User;
  }

  isAuth() {
    return this.user != null;
  }

  registerUser(data: AuthData) {
    this.user = {
      email: data.email,
      userId: Math.round(Math.random() * 1000).toString()
    }
    this.authChange.next(true);
    this.router.navigate(['/training']);
  }

  login(data: AuthData) {
    this.user = {
      email: data.email,
      userId: Math.round(Math.random() * 1000).toString()
    }
    this.authChange.next(true);
    this.router.navigate(['/training']);
  }

  logout() {
    this.user = null;
    this.authChange.next(false);
    this.router.navigate(['/login']);
  }
}
