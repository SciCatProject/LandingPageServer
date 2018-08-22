import { Component, OnInit } from "@angular/core";
import { Dataset } from "../dataset";
import { DatasetService } from "../dataset.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"]
})
export class DashboardComponent implements OnInit {
  datasets: Dataset[] = [];

  constructor(private datasetService: DatasetService) {}

  ngOnInit() {
    this.getDatasets();
  }

  getDatasets(): void {
    this.datasetService
      .getDatasets()
      .subscribe(datasets => (this.datasets = datasets.slice(1, 5)));
  }
}
