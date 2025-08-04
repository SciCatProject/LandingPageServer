import { Component, Inject, Output, EventEmitter } from "@angular/core";
import {
  APP_DYN_CONFIG,
  AppConfig,
  AppConfigService,
} from "src/app/app-config.service";

@Component({
  selector: "app-status-banner",
  templateUrl: "./status-banner.component.html",
  styleUrls: ["./status-banner.component.scss"],
})
export class StatusBannerComponent {
  @Output() dismiss = new EventEmitter<void>();
  appConfig: AppConfig;

  constructor(
    @Inject(APP_DYN_CONFIG) public appConfigService: AppConfigService,
  ) {
    this.appConfig = this.appConfigService.getConfig();
  }

  onDismiss() {
    this.dismiss.emit();
  }
}
