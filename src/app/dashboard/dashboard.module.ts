import { NgModule } from "@angular/core";
import { CommonModule, DatePipe } from "@angular/common";
import { DashboardComponent } from "./dashboard.component";
import { DashboardRoutingModule } from "./dashboard-routing.module";
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatCardModule } from "@angular/material/card";
import { TableModule } from "../shared/modules/table/table.module";
import { DatasourceService } from "../datasource.service";
import { OAIService } from "../oai.service";
import { PublishedDataService } from "../published-data.service";
import { AppConfigModule } from "../app-config.module";

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    AppConfigModule,
    CommonModule,
    FlexLayoutModule,
    DashboardRoutingModule,
    MatCardModule,
    TableModule,
  ],
  providers: [DatasourceService, DatePipe, OAIService, PublishedDataService],
})
export class DashboardModule {}
