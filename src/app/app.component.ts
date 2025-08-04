import { Component, Inject, OnInit } from "@angular/core";
import { LoopBackConfig } from "./shared/sdk";
import { Title } from "@angular/platform-browser";
import {
  APP_DYN_CONFIG,
  AppConfigService,
  AppConfig as Config,
} from "./app-config.service";
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  title = "Public Data Repository";
  showStatusBanner = false;

  config: Config;

  constructor(
    private titleService: Title,
    @Inject(APP_DYN_CONFIG) private appConfigService: AppConfigService,
  ) {
    this.config = this.appConfigService.getConfig();
    const facility = this.config.facility ?? "";
    let status = "test";
    if (this.config.production === true) {
      status = "";
    }
    this.title = facility.toUpperCase() + " Public Data Repository " + status;
    this.titleService.setTitle(this.title);
  }

  ngOnInit() {
    LoopBackConfig.setBaseURL(this.config.lbBaseUrl);
    console.log("API Path: ", LoopBackConfig.getPath());
    console.log("API Version: ", LoopBackConfig.getApiVersion());
    this.showStatusBanner = this.config.statusCode !== "NONE";
  }
}
