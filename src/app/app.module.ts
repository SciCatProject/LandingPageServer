import { APP_ID, Inject, NgModule, PLATFORM_ID } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

import { HttpClientInMemoryWebApiModule } from "angular-in-memory-web-api";
import { InMemoryDataService } from "./in-memory-data.service";

import { AppRoutingModule } from "./app-routing.module";

import { AppComponent } from "./app.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { DatasetDetailComponent } from "./dataset-detail/dataset-detail.component";
import { DatasetsComponent } from "./datasets/datasets.component";
import { DatasetSearchComponent } from "./dataset-search/dataset-search.component";
import { DatasetService } from "./dataset.service";
import { MessageService } from "./message.service";
import { MessagesComponent } from "./messages/messages.component";
import { isPlatformBrowser } from "@angular/common";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatButtonModule } from "@angular/material";

import { SDKBrowserModule } from "./shared/sdk/index";
import { UserApi } from "./shared/sdk/services";

@NgModule({
  imports: [
    BrowserModule.withServerTransition({ appId: "landing-page-server" }),
    FormsModule,
    AppRoutingModule,
    MatButtonModule,
    HttpClientModule,
    SDKBrowserModule.forRoot(),
    BrowserAnimationsModule,
    HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, {
      dataEncapsulation: false
    })
  ],
  declarations: [
    AppComponent,
    DashboardComponent,
    DatasetsComponent,
    DatasetDetailComponent,
    MessagesComponent,
    DatasetSearchComponent
  ],
  providers: [DatasetService, UserApi, MessageService],
  bootstrap: [AppComponent]
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
