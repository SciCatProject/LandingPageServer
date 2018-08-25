import { Component, OnInit } from "@angular/core";
import { LoopBackConfig } from "./shared/sdk";
import { UserApi } from "./shared/sdk/services";
import { environment } from "../environments/environment";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  title = "ESS Public Data Repository";
  us: UserApi;

  ngOnInit() {
    LoopBackConfig.setBaseURL(environment.lbBaseURL);
    console.log("gm lb config get path ", LoopBackConfig.getPath());
    if ("lbApiVersion" in environment) {
      const lbApiVersion = environment["lbApiVersion"];
      LoopBackConfig.setApiVersion(lbApiVersion);
    }
  }
}
