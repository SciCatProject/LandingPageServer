import { APP_CONFIG, AppConfig } from "./app-config.module";
import { Component, Inject, OnInit } from "@angular/core";
import { LoopBackConfig } from "./shared/sdk";
import { Title } from "@angular/platform-browser";
import { environment } from "../environments/environment";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  title = "Public Data Repository";

  constructor(
    private titleService: Title,
    @Inject(APP_CONFIG) public appConfig: AppConfig
  ) {
    const facility = this.appConfig.facility;
    let status = "test";
    if (this.appConfig.production === true) {
      status = "";
    }
    this.title = facility.toUpperCase() + " Public Data Repository " + status;
    this.titleService.setTitle(this.title);
  }

  ngOnInit() {
    LoopBackConfig.setBaseURL(environment.lbBaseURL);
    console.log("API Path: ", LoopBackConfig.getPath());
    console.log("API Version: ", LoopBackConfig.getApiVersion());
  }
}
