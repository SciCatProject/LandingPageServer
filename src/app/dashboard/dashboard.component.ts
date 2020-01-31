import { APP_CONFIG, AppConfig } from "../app-config.module";
import { Component, Inject, OnInit } from "@angular/core";
import { DatasetService } from "../dataset.service";
import { OAIService } from "../oai.service";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { PublishedData } from "../shared/sdk";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"]
})
export class DashboardComponent implements OnInit {
  subtitle: string;
  publications$: Observable<PublishedData[]>;

  onClick(doi: string): void {
    this.router.navigateByUrl("/detail/" + encodeURIComponent(doi));
  }

  constructor(
    @Inject(APP_CONFIG) private appConfig: AppConfig,
    private datasetService: DatasetService,
    private oaiService: OAIService,
    private router: Router
  ) {
    const facility = this.appConfig.facility;
    this.subtitle = facility.toUpperCase() + " Public Dataset Access";
  }

  ngOnInit() {
    if (this.appConfig.directMongoAccess) {
      this.publications$ = this.datasetService.getDatasets();
    } else {
      this.publications$ = this.oaiService.getPublications(null);
    }
  }
}
