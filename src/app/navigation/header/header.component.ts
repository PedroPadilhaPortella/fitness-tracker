import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NavbarItem } from '../../interfaces/navbar-item.interface';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @Input('items') navbarItems: NavbarItem[] = [];
  @Output('sidenav-toggle') sidenavToggle = new EventEmitter<void>();

  onToggleSidenav() {
    this.sidenavToggle.emit();
  }
}
