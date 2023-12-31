import { Component } from '@angular/core';
import { NavbarItem } from './interfaces/navbar-item.interface'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  navBarItems: NavbarItem[] = [
    { name: 'SignUp', route: '/signup', icon: 'face'},
    { name: 'Login', route: '/login', icon: 'input'},
    { name: 'Training', route: '/training', icon: 'fitness_center'},
    { name: 'Logout', route: null, icon: 'eject'},
  ]
}

