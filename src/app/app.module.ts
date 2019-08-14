import { APP_ID, Inject, NgModule, PLATFORM_ID } from "@angular/core";
import { AppComponent } from "./app.component";
import { AppConfigModule } from "./app-config.module";
import { AppRoutingModule } from "./app-routing.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { BrowserModule } from "@angular/platform-browser";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { DatasetDetailComponent } from "./dataset-detail/dataset-detail.component";
import { DatasetService } from "./dataset.service";
import { DatasetsComponent } from "./datasets/datasets.component";
import { FileSizePipe } from "./filesize.pipe";
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { LinkyModule } from "ngx-linky";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { NgxJsonLdModule } from "@ngx-lite/json-ld";
import { SDKBrowserModule } from "./shared/sdk/index";
import { ServiceWorkerModule } from "@angular/service-worker";
import { UserApi } from "./shared/sdk/services";
import { WINDOW_PROVIDERS } from "./shared/services/window.service";
import { environment } from "../environments/environment";
import { isPlatformBrowser } from "@angular/common";

@NgModule({
  imports: [
    AppConfigModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule.withServerTransition({ appId: "landing-page-server" }),
    FlexLayoutModule,
    FormsModule,
    HttpClientModule,
    LinkyModule,
    MatButtonModule,
    NgxJsonLdModule,
    MatCardModule,
    SDKBrowserModule.forRoot(),
    ServiceWorkerModule.register("ngsw-worker.js", {
      enabled: environment.production
    })
  ],
  declarations: [
    AppComponent,
    DashboardComponent,
    DatasetDetailComponent,
    DatasetsComponent,
    FileSizePipe
  ],
  providers: [DatasetService, UserApi, WINDOW_PROVIDERS],
  bootstrap: [AppComponent],
  exports: [FileSizePipe]
})
export class AppModule {
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject(APP_ID) private appId: string
  ) {
    const platform = isPlatformBrowser(platformId)
      ? "in the browser"
      : "on the server";
    console.log(`Running ${platform} with appId=${appId}`);
  }
}
