import { Component, Inject, OnInit } from "@angular/core";
import { DatasetService } from "../dataset.service";
import { PublishedData } from "../shared/sdk/models";
import { APP_CONFIG, AppConfig } from "../app-config.module";
import { HttpClient, HttpHeaders } from "@angular/common/http";
const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" })
};

@Component({
  selector: "app-datasets",
  templateUrl: "./datasets.component.html",
  styleUrls: ["./datasets.component.css"]
})
export class DatasetsComponent implements OnInit {
  datasets: PublishedData[];

  constructor(
    @Inject(APP_CONFIG) private appConfig: AppConfig,
    private http: HttpClient,
    private datasetService: DatasetService
  ) {}

  ngOnInit() {
    this.getDatasets();
  }

  getDatasets(): void {
    this.datasetService
      .getDatasets()
      .subscribe(datasets => (this.datasets = datasets));
  }

  add(name: string): void {
    name = name.trim();
    if (!name) {
      return;
    }
    this.datasetService.addDataset(name).subscribe(dataset => {
      this.datasets.push(dataset);
    });
  }

  delete(dataset: PublishedData): void {
    this.datasetService.deleteDataset(dataset).subscribe(() => {
      this.datasets = this.datasets.filter(h => h !== dataset);
    });
  }
}
