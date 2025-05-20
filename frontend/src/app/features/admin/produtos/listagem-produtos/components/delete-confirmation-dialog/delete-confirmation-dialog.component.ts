import {Component, Inject} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-delete-confirmation-dialog',
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './delete-confirmation-dialog.component.html',
  styleUrl: './delete-confirmation-dialog.component.css'
})
export class DeleteConfirmationDialogComponent {
  constructor(
    public dialogReferencia: MatDialogRef<DeleteConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { nome: string }
  ) {
  }

  onCancel(): void {
    this.dialogReferencia.close(false);
  }

  onDelete(): void {
    this.dialogReferencia.close(true);
  }
}
