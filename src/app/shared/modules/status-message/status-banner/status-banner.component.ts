import { Component, Inject, Output, EventEmitter } from "@angular/core";
import { APP_CONFIG, AppConfig } from "src/app/app-config.module";

@Component({
  selector: "app-status-banner",
  templateUrl: "./status-banner.component.html",
  styleUrls: ["./status-banner.component.scss"]
})
export class StatusBannerComponent {
  @Output() dismiss = new EventEmitter<void>();

  constructor(@Inject(APP_CONFIG) public appConfig: AppConfig) { }

  onDismiss() {
    this.dismiss.emit();
  }
}
