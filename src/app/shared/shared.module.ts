import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TableModule } from "./modules/table/table.module";
import { PipesModule } from "./pipes/pipes.module";
import { DialogModule } from "./modules/dialog/dialog.module";
import { ConfirmationDialogModule } from "./modules/confirmation-dialog/confirmation-dialog.module";
import { StatusBannerComponent } from './status-message/status-banner/status-banner.component';

@NgModule({
  declarations: [
    StatusBannerComponent
  ],
  imports: [CommonModule, PipesModule, TableModule, DialogModule, ConfirmationDialogModule],
  exports: [PipesModule, TableModule, DialogModule, ConfirmationDialogModule],
})
export class SharedModule {}
