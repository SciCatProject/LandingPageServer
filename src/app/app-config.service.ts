import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { timeout } from "rxjs/operators";
import { environment } from "../environments/environment";
import { InjectionToken } from "@angular/core";

export const APP_DYN_CONFIG = new InjectionToken<AppConfig>("app.dyn.config");

export interface AppConfig {
  production: boolean;
  facility: string;
  oaiProviderRoute: string;
  doiBaseUrl: string;
  directMongoAccess: boolean;
  accessDataHref: string;
  accessInstructions: string;
  scicatBaseUrl: string;
  showLogoBanner: boolean;
  logoBanner: string | null;
  logoWidth?: string;
  retrieveToEmail: RetrieveDestinations | undefined;
}

export class RetrieveDestinations {
  title: string;
  option: string;
  username: string;
  confirmMessage: string | undefined;
}

@Injectable({ providedIn: "root" })
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
    // Use old default if not provided

    (this.appConfig as AppConfig).logoWidth =
      (this.appConfig as AppConfig)?.logoWidth ?? "412";
  }

  getConfig(): AppConfig {
    return this.appConfig as AppConfig;
  }
}
