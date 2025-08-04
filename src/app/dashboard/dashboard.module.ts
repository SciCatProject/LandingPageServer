import { NgModule } from "@angular/core";
import { CommonModule, DatePipe } from "@angular/common";
import { DashboardComponent } from "./dashboard.component";
import { DashboardRoutingModule } from "./dashboard-routing.module";
import { FlexLayoutModule } from "@ngbracket/ngx-layout";
import { MatCardModule } from "@angular/material/card";
import { TableModule } from "../shared/modules/table/table.module";
import { DatasourceService } from "../datasource.service";
import { OAIService } from "../oai.service";
import { PublishedDataService } from "../published-data.service";
import { HttpClientModule } from "@angular/common/http";

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    DashboardRoutingModule,
    MatCardModule,
    TableModule,
    HttpClientModule,
  ],
  providers: [
    DatasourceService,
    DatePipe,
    OAIService,
    PublishedDataService,
    HttpClientModule,
  ],
})
export class DashboardModule {}
