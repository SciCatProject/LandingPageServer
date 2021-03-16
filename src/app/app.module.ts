import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { PublisheddataDetailsComponent } from "./publisheddata-details/publisheddata-details.component";
import { MatToolbarModule } from "@angular/material/toolbar";
import { AppConfigModule } from "./app-config.module";
import { PublishedDataService } from "./published-data.service";
import { SharedModule } from "./shared/shared.module";
import { MatCardModule } from "@angular/material/card";
import { SDKBrowserModule } from "./shared/sdk";
import { DatePipe } from "@angular/common";
import { MatListModule } from "@angular/material/list";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { FlexLayoutModule } from "@angular/flex-layout";

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    PublisheddataDetailsComponent,
  ],
  imports: [
    AppConfigModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    FlexLayoutModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatListModule,
    MatToolbarModule,
    SDKBrowserModule.forRoot(),
    SharedModule,
  ],
  providers: [DatePipe, PublishedDataService],
  bootstrap: [AppComponent],
})
export class AppModule {}
