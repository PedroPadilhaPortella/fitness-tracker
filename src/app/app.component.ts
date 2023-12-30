import { Component } from '@angular/core';

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
  ]
}

interface NavbarItem {
  name: string;
  route: string;
  icon: string;
}