import { Component, inject, signal, ChangeDetectionStrategy } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../../models/Usuario.model';
import { MatDialog } from '@angular/material/dialog';
import { ErrorModalComponent } from '../modals/error-modal/error-modal.component';
import { CommonModule } from '@angular/common';
import { UsuarioService } from '../../service/usuarios.service';

@Component({
  selector: 'app-login',
  standalone: true,
  providers: [UsuarioService],
  imports: [
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    FormsModule,
    CommonModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private router: Router, private dialog: MatDialog, private serviceUser: UsuarioService) {}

  hide = signal(true);
  user: string = '';
  password: string = '';
  errorMessage = signal('');
  authenticationError = signal(false);

  http = inject(HttpClient);
  usuarios: Usuario[] = [];  // Inicializar como array vacío

  ngOnInit(): void {
    this.http.get<Usuario[]>('https://api.escuelajs.co/api/v1/users')
      .subscribe((data) => {
        this.usuarios = data; // Asignar directamente a `data`
        console.log(this.usuarios[0]); // Verificar los datos recibidos
      });
  }

  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  ingresar() {
    if (this.usuarios && this.usuarios.length > 0) {
      let userFound = false;
      this.usuarios.forEach((usuario) => {
        if (usuario.name === this.user && usuario.password === this.password) {
          userFound = true;
          console.log(usuario);
          this.router.navigate(['epic', { id: usuario.id }]);
        }
      });
  
      if (!userFound) {
        this.updateErrorMessage();
        this.authenticationError.set(true);
        this.openErrorModal();
      }
    } else {
      this.errorMessage.set('No users loaded. Please try again later.');
      this.authenticationError.set(true);
      this.openErrorModal();
    }
  }
  

  updateErrorMessage() {
    if (!this.user || !this.password) {
      this.errorMessage.set('You must enter a value');
    } else {
      this.errorMessage.set('Invalid username or password');
    }
  }

  openErrorModal() {
    this.dialog.open(ErrorModalComponent);
  }
}
