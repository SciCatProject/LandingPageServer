import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatToolbarModule } from "@angular/material/toolbar";
import { AppConfigModule } from "./app-config.module";
import { SDKBrowserModule } from "./shared/sdk";

@NgModule({
  declarations: [AppComponent],
  imports: [
    AppConfigModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    MatToolbarModule,
    SDKBrowserModule.forRoot(),
  ],
  bootstrap: [AppComponent],
})

var unused:string

export class AppModule {}
