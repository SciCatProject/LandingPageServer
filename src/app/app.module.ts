import { BrowserModule } from "@angular/platform-browser";
import { APP_INITIALIZER,NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatToolbarModule } from "@angular/material/toolbar";
import { AppConfigModule } from "./app-config.module";
import { SDKBrowserModule } from "./shared/sdk";
import { AppConfigService } from "./app-config.service";
import { HttpClientModule } from "@angular/common/http";


const appConfigInitializerFn = (appConfig: AppConfigService) => {
  return () => appConfig.loadAppConfig();
};


@NgModule({
  declarations: [AppComponent],
  imports: [
    AppConfigModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    MatToolbarModule,
    SDKBrowserModule.forRoot(),
    HttpClientModule
  ],
  bootstrap: [AppComponent],
  providers: [
    { provide: AppConfigService, useClass: AppConfigService},
    {
      provide: APP_INITIALIZER,
      useFactory: appConfigInitializerFn,
      multi: true,
      deps: [AppConfigService],
    },
    HttpClientModule

  ]
})

export class AppModule {}
