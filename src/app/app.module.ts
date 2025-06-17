import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatToolbarModule } from "@angular/material/toolbar";
import { AppConfigModule } from "./app-config.module";
import { SDKBrowserModule } from "./shared/sdk";
import { StatusMessageModule } from "./shared/modules/status-message/status-message.module";

@NgModule({
  declarations: [AppComponent],
  imports: [
    AppConfigModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    MatToolbarModule,
    StatusMessageModule,
    SDKBrowserModule.forRoot(),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
