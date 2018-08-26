import { Component, OnInit } from "@angular/core";
import { DatasetService } from "../dataset.service";
import { PublishedData } from "../shared/sdk/models";
import { PublishedDataApi } from "../shared/sdk/services/custom";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"]
})
export class DashboardComponent implements OnInit {
  datasets: PublishedData[] = [];

  constructor(
    private datasetService: DatasetService,
    private publishedDataApi: PublishedDataApi
  ) {
  }

  ngOnInit() {
    this.publishedDataApi.find().subscribe(dataset => {
      console.log(dataset);
    });
    this.getDatasets();
  }

  getDatasets(): void {
    this.datasetService.getDatasets().subscribe(datasets => {
      console.log("gm datasets", datasets);
      this.datasets = datasets.slice(1, 5);
    });
  }
}
