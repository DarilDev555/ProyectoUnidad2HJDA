import { Component, inject, signal, ChangeDetectionStrategy } from '@angular/core'; // Import ChangeDetectionStrategy
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

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    FormsModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush, // Use ChangeDetectionStrategy here
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private router: Router, private dialog: MatDialog) {} // Inyectar MatDialog

  hide = signal(true);
  user: string = '';
  password: string = '';
  errorMessage = signal('');
  authenticationError = signal(false); // Nueva variable para el error de autenticación

  http = inject(HttpClient);
  usuarios: Usuario[] = [];

  ngOnInit(): void {
    this.http.get<{ results: Usuario[] }>('https://randomuser.me/api/?results=10')
      .subscribe((data) => {
        console.log(data.results[0].login); // Inspect the response structure
        this.usuarios = data.results;
      });
  }

  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  ingresar() {
    let userFound = false;
    this.usuarios.forEach((usuario) => {
      if (usuario.login.username === this.user && usuario.login.password === this.password) {
        this.router.navigate(['epic']);
        userFound = true;
      }
    });

    if (!userFound) {
      this.updateErrorMessage();
      this.authenticationError.set(true); // Establecer error de autenticación a verdadero
      this.openErrorModal(); // Abrir el modal de error
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
