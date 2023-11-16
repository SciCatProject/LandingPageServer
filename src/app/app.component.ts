import { APP_CONFIG, AppConfig } from "./app-config.module";
import { Component, Inject, OnInit } from "@angular/core";
import { LoopBackConfig } from "./shared/sdk";
import { Title } from "@angular/platform-browser";
import { environment } from "../environments/environment";
import { APP_DYN_CONFIG, AppConfigService ,  AppConfig as Config } from "./app-config.service";
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  title = "Public Data Repository";

  config: Config;

  constructor(
    private titleService: Title,
    @Inject(APP_CONFIG) public appConfig: AppConfig,
    @Inject(APP_DYN_CONFIG) private appConfigService: AppConfigService,
  ) {
    this.config = this.appConfigService.getConfig();
    const facility = this.config.facility  ?? "";
    let status = "test";
    if (this.appConfig.production === true) {
      status = "";
    }
    this.title = facility.toUpperCase() + " Public Data Repository " + status;
    this.titleService.setTitle(this.title);
  }

  ngOnInit() {
    LoopBackConfig.setBaseURL(this.config.scicatBaseUrl);
    console.log("API Path: ", LoopBackConfig.getPath());
    console.log("API Version: ", LoopBackConfig.getApiVersion());
  }
}
