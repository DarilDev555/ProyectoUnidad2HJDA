import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

import { RouterLink, RouterLinkActive } from '@angular/router';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    RouterOutlet,
  ],
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {

  sidebarClosed = true;
  selectedUser: string = 'Doctor';
  isDrawerOpened = false;

  user = {
    name: 'John Doe',
    email: 'johndoe@example.com',
    photoUrl: 'https://via.placeholder.com/50'
  };

  constructor(private router: Router) { }

  toggleDrawer() {
    this.isDrawerOpened = !this.isDrawerOpened;
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
  }

  abrir() {
    this.sidebarClosed = !this.sidebarClosed; // Cambia el estado al hacer clic
  }
}
