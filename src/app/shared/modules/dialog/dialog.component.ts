import { Component, Inject } from "@angular/core";
import { UntypedFormControl } from "@angular/forms";
import { ErrorStateMatcher } from "@angular/material/core";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from "@angular/material/dialog";
import { ConfirmationDialogComponent } from "../confirmation-dialog/confirmation-dialog.component";

class ErrorStateMatcherOnUpdate implements ErrorStateMatcher {
  isErrorState(control: UntypedFormControl | null): boolean {
    return !!(control && control.invalid && (control.dirty || control.touched));
  }
}
@Component({
  selector: "app-dialog",
  templateUrl: "./dialog.component.html",
  styleUrls: ["./dialog.component.scss"],
})
export class DialogComponent {
  matcher = new ErrorStateMatcherOnUpdate();

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private confirmationDialog: MatDialog,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  confirm(data) {
    if (data.confirmMessage) {
      this.dialogRef.updateSize("0", "0");
      const dialogRefConf = this.confirmationDialog.open(
        ConfirmationDialogComponent,
        { width: "auto", disableClose: true },
      );
      dialogRefConf.componentInstance.confirmMessage = `Recipient email: ${data.email}<br>${data.confirmMessage}`;
      dialogRefConf.afterClosed().subscribe((result) => {
        if (result) this.dialogRef.close(data);
        else this.dialogRef.close();
      });
    } else this.dialogRef.close(data);
  }
}
