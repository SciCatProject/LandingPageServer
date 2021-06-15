import { NgModule } from "@angular/core";
import { CommonModule, DatePipe } from "@angular/common";
import { PublisheddataDetailsComponent } from "./publisheddata-details.component";
import { PublisheddataDetailsRoutingModule } from "./publisheddata-details-routing.module";
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { FlexLayoutModule } from "@angular/flex-layout";
import { PipesModule } from "../shared/pipes/pipes.module";
import { DatasourceService } from "../datasource.service";
import { OAIService } from "../oai.service";
import { PublishedDataService } from "../published-data.service";
import { AppConfigModule } from "../app-config.module";

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
  ],
  providers: [DatasourceService, DatePipe, OAIService, PublishedDataService],
})
export class PublisheddataDetailsModule {}
