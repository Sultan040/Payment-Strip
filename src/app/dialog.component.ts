import { Component, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  template: `
    <h1 mat-dialog-title>Payment</h1>
    <div mat-dialog-content>
      {{ data.type | uppercase }}: {{ data.message }}
    </div>
    <div mat-dialog-actions>
      <button mat-button mat-dialog-close>OK</button>
    </div>
  `,
})
export class DialogComponent {
  constructor(
    private dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { type: 'error' | 'success'; message?: string }
  ) {}
}
