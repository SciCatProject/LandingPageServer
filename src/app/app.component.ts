import { APP_CONFIG, AppConfig } from "./app-config.module";
import { Component, Inject, OnInit } from "@angular/core";
import { LoopBackConfig } from "./shared/sdk";
import { Title } from "@angular/platform-browser";
import { UserApi } from "./shared/sdk/services";
import { environment } from "../environments/environment";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  title = "Public Data Repository";
  us: UserApi;

  constructor(
    private titleService: Title,
    @Inject(APP_CONFIG) private appConfig: AppConfig
  ) {
    const facility = this.appConfig.facility;
    let status = "test";
    if (this.appConfig.production === true) {
      status = "";
    }
    this.title = facility.toUpperCase() + " Public Data Repository " + status;
    this.setTitle(this.title);
  }

  public setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }

  ngOnInit() {
    LoopBackConfig.setBaseURL(environment.lbBaseURL);
    console.log("gm lb config get path ", LoopBackConfig.getPath());
    console.log("gm lb config get api  ", LoopBackConfig.getApiVersion());
    if ("lbApiVersion" in environment) {
      const lbApiVersion = environment["lbApiVersion"];
      LoopBackConfig.setApiVersion(lbApiVersion);
    }
  }
}
