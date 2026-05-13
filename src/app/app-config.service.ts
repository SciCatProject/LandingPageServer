import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { timeout } from "rxjs/operators";
import { environment } from "../environments/environment";
import { InjectionToken } from "@angular/core";

export const APP_DYN_CONFIG = new InjectionToken<AppConfigService>(
  "app.dyn.config",
);

export interface AppConfig {
  production: boolean;
  facility: string;
  oaiProviderRoute: string;
  doiBaseUrl: string;
  directMongoAccess: boolean;
  accessDataHref: string;
  accessInstructions: string;
  scicatBaseUrl: string;
  logoBanner: string | null;
  logoWidth?: string;
  retrieveToEmail: RetrieveDestinations | undefined;
  lbBaseUrl: string | null;
  statusMessage: string;
  statusCode: "INFO" | "WARN" | "NONE";
  contactEmail: string;
  footerMessage?: FooterMessage;
}

export class RetrieveDestinations {
  title: string;
  option: string;
  username: string;
  confirmMessage: string | undefined;
}

interface FooterMessage {
  text: string;
  links: FooterMessageLink[];
}

interface FooterMessageLink {
  label: string;
  url: string;
}

@Injectable({ providedIn: "root" })
export class AppConfigService {
  private appConfig: AppConfig = {} as AppConfig;

  constructor(private http: HttpClient) {}

  async loadAppConfig(): Promise<void> {
    try {
      this.appConfig = (await this.http
        .get("/config")
        .pipe(timeout(2000))
        .toPromise()) as AppConfig;
    } catch (err) {
      console.log("No config available in backend, trying with local config.");
      try {
        this.appConfig = (await this.http
          .get("/assets/config.json")
          .toPromise()) as AppConfig;
      } catch (err) {
        console.log("No config provided, using environment");
        this.appConfig = environment as AppConfig;
      }
    }
    // Use old default if not provided

    this.appConfig.logoWidth = this.appConfig?.logoWidth ?? "412";

    // Parse status-banner related config if exists or set defaults
    this.appConfig = {
      ...this.appConfig,
      statusMessage: this.appConfig["statusMessage"] || "",
      statusCode: (["INFO", "WARN", "NONE"].includes(
        this.appConfig["statusCode"],
      )
        ? this.appConfig["statusCode"]
        : "NONE") as "INFO" | "WARN" | "NONE",
      contactEmail: this.appConfig["contactEmail"] || "",
    };
  }

  getConfig(): AppConfig {
    return this.appConfig;
  }
}
