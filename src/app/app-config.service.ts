import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { timeout } from "rxjs/operators";
import { environment } from "../environments/environment";
export interface AppConfig {
    production: boolean;
    facility:string;
    oaiProviderRoute: string;
    doiBaseUrl: string;
    directMongoAccess: boolean;
    accessDataHref: string;
    accessInstructions:string;
    scicatBaseUrl: string;
    showLogoBanner:boolean;
    logoBanner: string | null;
    retrieveToEmail: RetrieveDestinations| undefined;
}

export class RetrieveDestinations {
    title: string;
    option: string;
    username: string;
    confirmMessage?: string;
 }

@Injectable( { providedIn: "root"})
export class AppConfigService {
  private appConfig: object = {};

  constructor(private http: HttpClient) {}

  async loadAppConfig(): Promise<void> {
    try {
      this.appConfig = await this.http
        .get("/config")
        .pipe(timeout(2000))
        .toPromise();
    } catch (err) {
      console.log("No config available in backend, trying with local config.");
      try {
        this.appConfig = await this.http.get("/assets/config.json").toPromise();
      } catch (err) {
        console.log("No config provided, using environment");
        this.appConfig = environment;
      }
    }
  }

  getConfig(): AppConfig {
    return this.appConfig as AppConfig;
  }
}