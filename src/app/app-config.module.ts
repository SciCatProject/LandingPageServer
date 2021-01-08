import { InjectionToken, NgModule } from '@angular/core';
import { environment } from '../environments/environment';

export const APP_CONFIG = new InjectionToken<AppConfig>('app.config');

export class AppConfig {
  production: boolean;
  facility: string;
  oaiProviderRoute: string;
  doiBaseUrl: string;
  directMongoAccess: boolean;
  accessDataHref: string;
  accessInstructions: string;
  scicatBaseUrl: string;
}

export const APP_DI_CONFIG: AppConfig = {
  production: environment.production,
  facility: environment.facility || null,
  oaiProviderRoute: environment.oaiProviderRoute || null,
  doiBaseUrl: environment.doiBaseUrl || null,
  directMongoAccess: environment.directMongoAccess || false,
  accessDataHref: environment.accessDataHref || null,
  accessInstructions: environment.accessInstructions || null,
  scicatBaseUrl: environment.scicatBaseUrl || null,
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
