import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-error-modal',
  standalone: true,
  imports: [],
  templateUrl: './error-modal.component.html',
  styleUrls: ['./error-modal.component.css']
})
export class ErrorModalComponent {
  constructor(private dialogRef: MatDialogRef<ErrorModalComponent>) {}

  close() {
    this.dialogRef.close();
  }
}