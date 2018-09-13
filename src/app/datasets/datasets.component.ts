import { Component, Inject, OnInit } from "@angular/core";
import { DatasetService } from "../dataset.service";
import { PublishedData } from "../shared/sdk/models";
import { APP_CONFIG, AppConfig } from "../app-config.module";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map } from "rxjs/operators";
import { Router } from "@angular/router";

import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "encodeURI"
})
export class EncodeURI implements PipeTransform {
  public transform(uris: any, attribute: string) {
    if (uris === undefined) {
      return "";
    }

    for (let item of uris) {
      item[attribute] = encodeURI(String(item[attribute]));
    }
    return uris;
  }
}

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" })
};

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
  styleUrls: ["./datasets.component.css"]
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
            doi: encodeURIComponent(x.doi),
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
