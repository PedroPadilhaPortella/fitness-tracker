import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NavbarItem } from '../../interfaces/navbar-item.interface';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent {
  @Input('items') navbarItems: NavbarItem[] = [];
  @Output('sidenav-close') sidenavClose = new EventEmitter<void>();

  onCloseSidenav() {
    this.sidenavClose.emit();
  }
}
