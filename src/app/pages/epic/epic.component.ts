import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../../models/Usuario.model';

import { TableEpicComponent } from '../../components/table-epic/table-epic.component';
import { NavComponent } from '../../components/nav/nav.component';

@Component({
  selector: 'app-epic',
  standalone: true,
  imports: [
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    FormsModule,
    TableEpicComponent,
    NavComponent,
    
  ],
  templateUrl: './epic.component.html',
  styleUrl: './epic.component.css'
})
export class EpicComponent {
  title = 'NASA EPIC API';
}
