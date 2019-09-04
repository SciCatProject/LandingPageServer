import { Injectable, Inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { APP_CONFIG, AppConfig } from "./app-config.module";
import { catchError, map } from "rxjs/operators";
import { Observable } from "rxjs";
import { PublishedData } from "./shared/sdk/models";

@Injectable({
  providedIn: "root"
})
export class OAIService {
  constructor(
    @Inject(APP_CONFIG) private appConfig: AppConfig,
    private httpClient: HttpClient
  ) {}

  requestJsonp(url, params) {
    url = url + "/" + params;
    return this.httpClient
      .jsonp(url, "callback")
      .pipe(map((response: PublishedData) => response));
  }

  getPublications(params) {
    const OAIServerUri = this.appConfig.oaiProviderRoute;
    console.log("OAIServerUri", OAIServerUri);
    return this.requestJsonp("http://127.0.0.1:3001/scicat/Publication", params);
  }

  getOnePublication(params) {
    const OAIServerUri = this.appConfig.oaiProviderRoute;
    console.log("OAIServerUri", OAIServerUri);
    return (this.requestJsonp("http://127.0.0.1:3001/scicat/Publication", params)).pipe(map((response: PublishedData) => response));
  }
}

