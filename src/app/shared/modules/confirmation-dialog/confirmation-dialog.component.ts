import { Component} from "@angular/core";
import { MatLegacyDialogRef as MatDialogRef } from "@angular/material/legacy-dialog";

@Component({
  selector: "app-dialog",
  templateUrl: "./confirmation-dialog.component.html",
  styleUrls: ["./confirmation-dialog.component.scss"]
})
export class ConfirmationDialogComponent {
  public confirmMessage: string;

  constructor(
    public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
  ) {}

  onNoClick(): void {
    this.dialogRef.close(false);
  }

}
