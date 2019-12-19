"use strict";
import { APP_CONFIG, AppConfig } from "../app-config.module";
import { Component, Inject, OnInit } from "@angular/core";
import { DatasetService } from "../dataset.service";
import { OAIService } from "../oai.service";
import { PublishedData } from "../shared/sdk/models";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"]
})
export class DashboardComponent implements OnInit {
  datasets: PublishedData[] = [];
  subtitle: string;
  doi_list: PublishedData[] = [];

  constructor(
    private datasetService: DatasetService,
    private oaiService: OAIService,
    @Inject(APP_CONFIG) private appConfig: AppConfig
  ) {
    const facility = this.appConfig.facility;
    this.subtitle = facility.toUpperCase() + " Public Dataset Access";
  }

  ngOnInit() {
    this.getPublications();
  }

  getPublications(): void {
    let dataObs$ = null;
    if (this.appConfig.directMongoAccess) {
      dataObs$ = this.datasetService.getDatasets();
    } else {
      dataObs$ = this.oaiService.getPublications(null);
    }
    dataObs$.subscribe(publications => {
      publications.forEach(element => {
        element.doi = encodeURIComponent(element.doi);
        this.doi_list.push(element);
      });
    });
  }
}
