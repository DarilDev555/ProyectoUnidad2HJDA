import { ChangeDetectionStrategy, Component, inject, signal, AfterViewInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { EarthImage } from '../../models/EarthImage.model';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { EarthImageComponent } from '../../pages/modals/earth-image/earth-image.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-table-epic',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    FormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatDatepickerModule,
    EarthImageComponent,
  ],
  templateUrl: './table-epic.component.html',
  styleUrls: ['./table-epic.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableEpicComponent implements AfterViewInit {
  http = inject(HttpClient);
  dataSource = new MatTableDataSource<EarthImage>([]);
  fechaElegida = new Date();
  key = 'eb7gzG7y007tNe7B2tTI6Qrn252M9W7greuAhPvR';

  constructor(public dialog: MatDialog) {}

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = [
    'image',
    'identifier',
    'caption',
    'version',
    'date',
    'lunar_j2000_position',
    'sun_j2000_position',
    'Accion',
  ];

  ngOnInit(): void {
    this.http.get<EarthImage[]>(`https://api.nasa.gov/EPIC/api/natural/images?api_key=${this.key}`).subscribe((data) => {
      this.dataSource.data = data;
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  obtenerFecha(fecha: string): string {
    const fechaNueva = new Date(fecha);
    const dia = fechaNueva.getDate() < 10 ? '0' + fechaNueva.getDate() : '' + fechaNueva.getDate();
    const mes = fechaNueva.getMonth() < 10 ? '0' + (fechaNueva.getMonth() + 1) : '' + (fechaNueva.getMonth() + 1);
    const year = '' + fechaNueva.getFullYear();
    return `${year}/${mes}/${dia}`;
  }

  obtenerFechaGuion(fecha: Date): string {
    const dia = fecha.getDate() < 10 ? '0' + fecha.getDate() : '' + fecha.getDate();
    const mes = fecha.getMonth() < 10 ? '0' + (fecha.getMonth() + 1) : '' + (fecha.getMonth() + 1);
    const year = '' + fecha.getFullYear();
    return `${year}-${mes}-${dia}`;
  }

  obternerImagen(fecha: string, image: string): string {
    const ruta = `https://api.nasa.gov/EPIC/archive/natural/${this.obtenerFecha(fecha)}/png/${image}.png?api_key=${this.key}`;
    console.log(ruta);
    return ruta;
  }

  actualizarFecha(event: any): void {
    this.fechaElegida = event.value;
    this.obtenerDatos(this.fechaElegida);
  }

  obtenerDatos(fecha: Date): void {
    const fechaStr = this.obtenerFechaGuion(fecha);
    this.http
      .get<EarthImage[]>(`https://api.nasa.gov/EPIC/api/natural/date/${fechaStr}?api_key=${this.key}`)
      .subscribe((data) => {
        this.dataSource.data = data;
      });
  }

  editar(){

  }

  borrar(){

  }

  openModal(EarthImage: EarthImage) {
    this.dialog.open(EarthImageComponent, {
  // Ajusta el ancho según tus necesidades
      height: '70vh', // Ajusta la altura según tus necesidades
      data: {
        image: EarthImage.image,
        caption: EarthImage.caption,
        date: EarthImage.date,
        identifier: EarthImage.identifier,
        lunar_j2000_position: EarthImage.lunar_j2000_position,
        sun_j2000_position: EarthImage.sun_j2000_position,
        version: EarthImage.version
      },
    });
  }
  
  
}
