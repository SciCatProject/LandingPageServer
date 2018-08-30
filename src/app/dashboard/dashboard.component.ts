import { Component, Inject, OnInit } from "@angular/core";
import { DatasetService } from "../dataset.service";
import { PublishedData } from "../shared/sdk/models";
import { PublishedDataApi } from "../shared/sdk/services/custom";
import { APP_CONFIG, AppConfig } from "../app-config.module";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"]
})
export class DashboardComponent implements OnInit {
  datasets: PublishedData[] = [];
  subtitle: string;

  constructor(
    private datasetService: DatasetService,
    @Inject(APP_CONFIG) private appConfig: AppConfig
  ) {
    const facility = this.appConfig.facility;
    this.subtitle = facility.toUpperCase() + ' Public Dataset Access';

  }

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
