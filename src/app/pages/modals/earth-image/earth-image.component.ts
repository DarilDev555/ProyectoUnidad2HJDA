import { Dialog } from '@angular/cdk/dialog';
import { Component, Inject, inject } from '@angular/core';
import { MatDialogTitle, MatDialogContent, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EarthImage } from '../../../models/EarthImage.model';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogActions } from '@angular/material/dialog';
import { MatDialogClose } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-earth-image',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatGridListModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogActions,
    MatDialogClose,
  ],
  templateUrl: './earth-image.component.html',
  styleUrl: './earth-image.component.css'
})
export class EarthImageComponent {
  readonly dialogRef = inject(MatDialogRef<EarthImageComponent>);
  readonly data = inject<EarthImage>(MAT_DIALOG_DATA);

  key = 'eb7gzG7y007tNe7B2tTI6Qrn252M9W7greuAhPvR';
  
  constructor() { }



  obternerImagen(fecha: string, image: string): string {
    const ruta = `https://api.nasa.gov/EPIC/archive/natural/${this.obtenerFecha(fecha)}/png/${image}.png?api_key=${this.key}`;
    console.log(ruta);
    return ruta;
  }

  obtenerFecha(fecha: string): string {
    const fechaNueva = new Date(fecha);
    const dia = fechaNueva.getDate() < 10 ? '0' + fechaNueva.getDate() : '' + fechaNueva.getDate();
    const mes = fechaNueva.getMonth() < 10 ? '0' + (fechaNueva.getMonth() + 1) : '' + (fechaNueva.getMonth() + 1);
    const year = '' + fechaNueva.getFullYear();
    return `${year}/${mes}/${dia}`;
  }

}
