import { Component, EventEmitter, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent {
  
  @Output('sidenav-close') sidenavClose = new EventEmitter<void>();

  isAuth = false;
  authSubscription!: Subscription;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authSubscription = this.authService.loggedUserChange.subscribe((loggedUser) => {
      this.isAuth = (loggedUser !== null);
    });
  }

  onCloseSidenav() {
    this.sidenavClose.emit();
  }

  logout() {
    this.authService.logout();
    this.onCloseSidenav();
  }

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }
}
