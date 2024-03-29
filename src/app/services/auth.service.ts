import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthData } from '../interfaces/auth-modal.interface';
import { LoggedUser, User } from '../interfaces/user.interface';
import { Subject, catchError, map, switchMap, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private EXPIRE_DATE = 1000 * 60 * 60 * 6 // 6 HOURS
  private isAuthenticate = false
  private loggedUser: LoggedUser | null = null

  loggedUserChange = new Subject<LoggedUser | null>();

  constructor(
    private http: HttpClient,
    private router: Router,
  ) { }

  isAuth() {
    return this.isAuthenticate 
    && this.loggedUser 
    && (this.loggedUser.espireDate > new Date().getTime());
  }

  registerUser(data: AuthData) {
    return this.http.get<User[]>('http://localhost:3000/users').pipe(
      switchMap((users) => {
        const user = { ...data, id: Math.round(Math.random() * 1000).toString()}
        const emailAlreadyTaken = users.find((usr) => usr.email === user.email)
        if (emailAlreadyTaken) throw new Error('Email already taken');
        return this.http.post<User>('http://localhost:3000/users', user)
      }),
      map((user) => {
        return { email: user.email, id: user.id, espireDate: this.setExpireDate() } as LoggedUser;
      }),
      switchMap((user) => {
        return this.storeLoginSession(user);
      }),
      tap((user) => {
        this.isAuthenticate = true;
        this.loggedUser = user;
        this.loggedUserChange.next(user);
        this.router.navigate(['/training']);
        this.manageExpireDate();
      })
    )
  }

  login(data: AuthData) {
    return this.http.get<User[]>('http://localhost:3000/users')
    .pipe(
      map((users) => {
        const user = users.find(user => user.email == data.email && user.password == data.password);
        if(!user) throw new Error('User not found');
        return { email: user.email, id: user.id, espireDate: this.setExpireDate() } as LoggedUser;
      }),
      switchMap((user) => {
        return this.storeLoginSession(user);
      }),
      tap((user) => {
        this.isAuthenticate = true;
        this.loggedUser = user;
        this.loggedUserChange.next(user);
        this.router.navigate(['/training']);
        this.manageExpireDate();
      })
    );
  }

  logout() {
    this.http.delete(`http://localhost:3000/loggedUsers/${this.loggedUser?.id}`)
    .subscribe((response) => {
      this.isAuthenticate = false;
      this.loggedUser = null;
      this.loggedUserChange.next(null);
      this.router.navigate(['/login']);
    })
  }

  private storeLoginSession(loggedUser: LoggedUser) {
    return this.http.get<LoggedUser[]>('http://localhost:3000/loggedUsers').pipe(
      switchMap((loggedUsers) => {
        const userAlreadyLogged = loggedUsers.find((user) => user.email == loggedUser.email);
        if(userAlreadyLogged) {
          return this.http.put<LoggedUser>(`http://localhost:3000/loggedUsers/${loggedUser.id}`, loggedUser);
        } else {
          return this.http.post<LoggedUser>('http://localhost:3000/loggedUsers', loggedUser);
        }
      })
    )
  }

  private setExpireDate(): number {
    // return new Date().setDate(new Date().getDate() + 1);
    return new Date().setMilliseconds(new Date().getMilliseconds() + this.EXPIRE_DATE);
  }

  private manageExpireDate() {
    setTimeout(() => {
      this.isAuthenticate = false;
      this.loggedUser = null;
      this.loggedUserChange.next(null);
      this.router.navigate(['/login'])
    }, this.EXPIRE_DATE);
  }
}
