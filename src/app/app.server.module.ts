import { NgModule } from "@angular/core";
import { ServerModule } from "@angular/platform-server";
import { ModuleMapLoaderModule } from "@nguniversal/module-map-ngfactory-loader";

import { AppModule } from "./app.module";
import { AppComponent } from "./app.component";
import { NgxJsonLdModule } from "@ngx-lite/json-ld";

@NgModule({
  imports: [
    AppModule,
    ServerModule,
    ModuleMapLoaderModule,
    NgxJsonLdModule
  ],
  providers: [
    // Add universal-only providers here
  ],
  bootstrap: [AppComponent]
})
export class AppServerModule {}
