import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { timeout } from "rxjs/operators";
import { light, Theme } from "./theme";
import { APP_DYN_CONFIG, AppConfigService } from "./app-config.service";
import { LoopBackConfig } from "./shared/sdk";

@Injectable()
export class AppThemeService {
  private activeTheme: Theme = light;

  constructor(
    private http: HttpClient,
    @Inject(APP_DYN_CONFIG) private appConfigService: AppConfigService,
  ) {}

  async loadTheme(): Promise<void> {
    const baseUrl = (this.appConfigService.getConfig().lbBaseUrl ?? "").replace(
      /\/+$/,
      "",
    );
    try {
      this.activeTheme = (await this.http
        .get(`${baseUrl}/${LoopBackConfig.getApiVersion()}/admin/theme`)
        .pipe(timeout(2000))
        .toPromise()) as Theme;
    } catch (err) {
      console.log("No theme available in backend, using local theme.");
      this.activeTheme = (await this.http
        .get("/assets/theme.json")
        .toPromise()) as Theme;
    }
    this.setActiveTheme();
  }

  setActiveTheme(): void {
    Object.keys(this.activeTheme.properties).forEach((property) => {
      document.documentElement.style.setProperty(
        property,
        this.activeTheme.properties[property],
      );
    });
  }
}
