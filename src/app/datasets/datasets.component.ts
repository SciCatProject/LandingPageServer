"use strict";
import { APP_CONFIG, AppConfig } from "../app-config.module";
import { Component, Inject, OnInit } from "@angular/core";
import { DatasetService } from "../dataset.service";
import { HttpClient } from "@angular/common/http";
import { PublishedData } from "../shared/sdk/models";
import { Router } from "@angular/router";
import { map } from "rxjs/operators";

interface MyType {
  doi: string;
  value: string;
}

interface PublishedDataType {
  affiliation: string;
  creator: string;
  doi: string;
  publicationYear: number;
  publisher: string;
  resourceType: string;
}

@Component({
  selector: "app-datasets",
  templateUrl: "./datasets.component.html",
  styleUrls: ["./datasets.component.scss"]
})
export class DatasetsComponent implements OnInit {
  datasets: PublishedData[];
  doi: string;
  doi_list: MyType[];
  dataset: PublishedDataType;

  constructor(
    @Inject(APP_CONFIG) private appConfig: AppConfig,
    private http: HttpClient,
    private router: Router,
    private datasetService: DatasetService
  ) {}

  ngOnInit() {
    this.getDatasets();
  }

  getDatasets(): void {
    this.datasetService
      .getDatasets()
      .pipe(
        map(res => {
          console.log(res);
          return res.map(x => ({
            doi: x.doi.replace("/", "%252F").replace("/", "%252F"),
            value: x.doi
          }));
        })
      )
      .subscribe(datasets => {
        this.doi_list = datasets;
        console.log("gm22", this.doi_list);
      });
  }

  delete(dataset: PublishedData): void {
    this.datasetService.deleteDataset(dataset).subscribe(() => {
      this.datasets = this.datasets.filter(h => h !== dataset);
    });
  }

  onSelect(event) {
    this.router.navigateByUrl("/detail/" + this.dataset.doi);
  }
}
