import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ConfirmationDialogComponent } from "./confirmation-dialog.component";
import { FormsModule } from "@angular/forms";

import { MatLegacyButtonModule as MatButtonModule } from "@angular/material/legacy-button";
import { MatLegacyDialogModule as MatDialogModule } from "@angular/material/legacy-dialog";
import { MatLegacyFormFieldModule as MatFormFieldModule } from "@angular/material/legacy-form-field";
import { MatLegacyInputModule as MatInputModule } from "@angular/material/legacy-input";
import { MatLegacySelectModule as MatSelectModule } from "@angular/material/legacy-select";
import { MatLegacyTooltipModule as MatTooltipModule } from "@angular/material/legacy-tooltip";

@NgModule({
  imports: [
    CommonModule,
    MatDialogModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatFormFieldModule,
    MatTooltipModule,
    FormsModule,
  ],
  declarations: [ConfirmationDialogComponent],
  exports: [ConfirmationDialogComponent],
})
export class ConfirmationDialogModule { }
