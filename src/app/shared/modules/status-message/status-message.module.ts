import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { StatusBannerComponent } from "./status-banner/status-banner.component";
import { MatIconModule } from "@angular/material/icon";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonModule } from "@angular/material/button";

@NgModule({
  declarations: [StatusBannerComponent],
  imports: [CommonModule, MatToolbarModule, MatButtonModule, MatIconModule],
  exports: [StatusBannerComponent],
})
export class StatusMessageModule {}
