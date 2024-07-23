import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { UsuarioService } from '../../service/usuarios.service';
import { Usuario } from '../../models/Usuario.model';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-nav',
  standalone: true,
  providers: [UsuarioService],
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    RouterOutlet,
    
  ],
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  sidebarClosed = true;
  selectedUser: string = 'Doctor';
  isDrawerOpened = false;
  user!: Usuario | null;
  http = inject(HttpClient);
  usuarios: Usuario[] = [];

  constructor(private router: Router, private route: ActivatedRoute, private servicioUsuarios: UsuarioService) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const userId = +params['id']; // + converts string to number
      this.http.get<Usuario[]>('https://api.escuelajs.co/api/v1/users')
      .subscribe((data) => {
        this.usuarios = data;
        this.usuarios.forEach((usuario) => {
          if (usuario.id === userId) {
            this.user = usuario;
          }
        });
        console.log(`nav ongit ${this.user}`);
      });
    });
  }

  toggleDrawer() {
    this.isDrawerOpened = !this.isDrawerOpened;
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
  }

  abrir() {
    this.sidebarClosed = !this.sidebarClosed;
  }
}