import { InjectionToken, NgModule } from "@angular/core";
import { environment } from "../environments/environment";

export const APP_CONFIG = new InjectionToken<AppConfig>("app.config");

export class AppConfig {
  production = true;
  statusMessage = "";
  statusCode: "INFO" | "WARN" | "NONE" = "NONE";
}

export const APP_DI_CONFIG: AppConfig = {
  production: environment.production,
  statusMessage: environment["statusMessage"] || "",
  statusCode: (["INFO", "WARN", "NONE"].includes(environment["statusCode"])
    ? environment["statusCode"]
    : "NONE") as "INFO" | "WARN" | "NONE",
};

@NgModule({
  providers: [
    {
      provide: APP_CONFIG,
      useValue: APP_DI_CONFIG,
    },
  ],
})
export class AppConfigModule {}
