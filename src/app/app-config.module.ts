import { InjectionToken, NgModule } from "@angular/core";
import { environment } from "../environments/environment";

export const APP_CONFIG = new InjectionToken<AppConfig>("app.config");

export class AppConfig {
  production = true;
  facility = "";
  oaiProviderRoute = "";
  doiBaseUrl = "";
  directMongoAccess = true;
  accessDataHref = "";
  accessInstructions = "";
  scicatBaseUrl = "";
  showLogoBanner = true;
}

export const APP_DI_CONFIG: AppConfig = {
  production: environment.production,
  facility: environment.facility ?? "",
  oaiProviderRoute: environment.oaiProviderRoute ?? "",
  doiBaseUrl: environment.doiBaseUrl ?? "",
  directMongoAccess: environment.directMongoAccess ?? false,
  accessDataHref: environment.accessDataHref ?? "",
  accessInstructions: environment.accessInstructions ?? "",
  scicatBaseUrl: environment.scicatBaseUrl ?? "",
  showLogoBanner: environment.showLogoBanner ?? false
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
