import { NgModule } from "@angular/core";
import { CommonModule, DatePipe } from "@angular/common";
import { PublisheddataDetailsComponent } from "./publisheddata-details.component";
import { PublisheddataDetailsRoutingModule } from "./publisheddata-details-routing.module";
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { FlexLayoutModule } from "@ngbracket/ngx-layout";
import { PipesModule } from "../shared/pipes/pipes.module";
import { DatasourceService } from "../datasource.service";
import { AppConfigModule } from "../app-config.module";
import { DialogModule } from "../shared/modules/dialog/dialog.module";
import { RetrieveService } from "../retrieve.service";
import { PublishedDataService } from "../published-data.service";
import { OAIService } from "../oai.service";
import { HttpClientModule } from "@angular/common/http";

@NgModule({
  declarations: [PublisheddataDetailsComponent],
  imports: [
    AppConfigModule,
    CommonModule,
    FlexLayoutModule,
    MatButtonModule,
    MatCardModule,
    PipesModule,
    PublisheddataDetailsRoutingModule,
    DialogModule,
    HttpClientModule,
  ],
  providers: [
    AppConfigModule,
    DatasourceService,
    DatePipe,
    OAIService,
    PublishedDataService,
    RetrieveService,
    HttpClientModule,
  ],
})
export class PublisheddataDetailsModule {}
