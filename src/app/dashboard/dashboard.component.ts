"use strict";
import { APP_CONFIG, AppConfig } from "../app-config.module";
import { Component, Inject, OnInit } from "@angular/core";
import { DatasetService } from "../dataset.service";
import { OAIService } from "../oai.service";
import { PublishedData } from "../shared/sdk/models";
import { map } from "rxjs/operators";

interface MyType {
  doi: string;
  value: string;
}

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"]
})
export class DashboardComponent implements OnInit {
  datasets: PublishedData[] = [];
  subtitle: string;
  // doi_list: any;
  doi_list: MyType[];

  constructor(
    private datasetService: DatasetService,
    private oaiService: OAIService,
    @Inject(APP_CONFIG) private appConfig: AppConfig
  ) {
    const facility = this.appConfig.facility;
    this.subtitle = facility.toUpperCase() + " Public Dataset Access";
  }

  ngOnInit() {

    // this.getDatasets();
  }

  getPublication(): void {
    this.oaiService
    .getPublications(null)
    .pipe(
      map(res => {
        console.log(res);
        return res;
      })
    )
    .subscribe(datasets => {
    });
  }

  getDatasets(): void {
    this.datasetService
      .getDatasets()
      .pipe(
        map(res => {
          return res.map(x => ({
            doi: x.doi.replace("/", "%252F").replace("/", "%252F"),
            value: x.doi
          }));
        })
      )
      .subscribe(datasets => {
        this.doi_list = datasets;
      });
  }
}

  /*getDatasets(): void {
    this.oaiService
      .get()
      .subscribe(datasets => {
        this.doi_list = datasets;
      });
  }
}*/
