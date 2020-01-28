import { InjectionToken, NgModule } from "@angular/core";
import { environment } from "../environments/environment";

export const APP_CONFIG = new InjectionToken<AppConfig>("app.config");

export class AppConfig {
  production: boolean;
  facility: string;
  oaiProviderRoute: string;
  directMongoAccess: boolean;
  useMaterialView: boolean;
}

export const APP_DI_CONFIG: AppConfig = {
  production: environment.production,
  facility: environment["facility"] || null,
  oaiProviderRoute: environment["oaiProviderRoute"] || null,
  directMongoAccess: environment["directMongoAccess"] || false,
  useMaterialView: environment["useMaterialView"] || false
};

@NgModule({
  providers: [
    {
      provide: APP_CONFIG,
      useValue: APP_DI_CONFIG
    }
  ]
})
export class AppConfigModule {
}
