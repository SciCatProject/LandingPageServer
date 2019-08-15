import { Injectable, Inject } from "@angular/core";
import { Jsonp } from "@angular/http";
import { APP_CONFIG, AppConfig } from "./app-config.module";
import { catchError } from "rxjs/operators";
import { Observable } from "rxjs";
import { PublishedData } from "./shared/sdk/models";


@Injectable({
  providedIn: "root",
})
export class OAIService {
  constructor(
    @Inject(APP_CONFIG) private appConfig: AppConfig,
    private jsonp: Jsonp
    ) {}


   getPublications() {
    const OAIServerUri = this.appConfig.oaiProviderRoute;
    return this.jsonp.request(OAIServerUri );
  }
}
