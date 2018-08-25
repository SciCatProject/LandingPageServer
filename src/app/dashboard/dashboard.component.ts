import { Component, OnInit } from "@angular/core";
import { DatasetService } from "../dataset.service";
import { PublishedData } from "../shared/sdk/models";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"]
})
export class DashboardComponent implements OnInit {
  datasets: PublishedData[] = [];

  constructor(private datasetService: DatasetService) {}

  ngOnInit() {
    this.getDatasets();
  }

  getDatasets(): void {
    this.datasetService.getDatasets().subscribe(datasets => {
      console.log("gm datasets", datasets);
      this.datasets = datasets.slice(1, 5);
    });
  }
}
