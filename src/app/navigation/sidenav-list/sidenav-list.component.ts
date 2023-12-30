import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent {
  @Output('sidenav-close') sidenavClose = new EventEmitter<void>();

  onCloseSidenav() {
    this.sidenavClose.emit();
  }
}
