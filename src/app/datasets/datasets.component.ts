import { Component, Inject, OnInit } from "@angular/core";
import { DatasetService } from "../dataset.service";
import { PublishedData } from "../shared/sdk/models";
import { APP_CONFIG, AppConfig } from "../app-config.module";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map } from "rxjs/operators";
import { Router } from "@angular/router";

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
  rows = [];
  dataset: PublishedDataType;

  columns = [{ prop: "doi" }, { prop: "type" }, { prop: "datasetList" }];

  rows1 = this.datasetService
    .getDatasets()
    .pipe(
      map(res => {
        return res.map(x => ({
          affiliation: x.affiliation,
          creator: x.creator,
          doi: x.doi,
          publicationYear: x.publicationYear,
          publisher: x.publisher,
          resourceType: x.resourceType
        }));
      })
    )
    .subscribe(published_data => {
      console.log(published_data);
      this.rows = published_data;
      this.dataset = published_data[0];
      return published_data;
    });

  constructor(
    @Inject(APP_CONFIG) private appConfig: AppConfig,
    private http: HttpClient,
    private router: Router,
    private datasetService: DatasetService
  ) {
  }

  ngOnInit() {
    this.getDatasets();
  }

  getDatasets(): void {
    this.datasetService
      .getDatasets()
      .pipe(
        map(res => {
          return res.map(x => ({
            doi: encodeURIComponent(x.doi),
            value: x.doi
          }));
        })
      )
      .subscribe(datasets => {
        this.doi_list = datasets;
      });
  }


  delete(dataset: PublishedData): void {
    this.datasetService.deleteDataset(dataset).subscribe(() => {
      this.datasets = this.datasets.filter(h => h !== dataset);
    });
  }

  onSelect(event) {
    this.router.navigateByUrl("/detail/" + encodeURIComponent(encodeURIComponent(this.dataset.doi)));
  }
}
