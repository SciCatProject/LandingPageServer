import {Component, OnInit} from "@angular/core";

import {Dataset} from "../dataset";
import {DatasetService} from "../dataset.service";

@Component({
  selector: "app-datasets",
  templateUrl: "./datasets.component.html",
  styleUrls: ["./datasets.component.css"]
})
export class DatasetsComponent implements OnInit {
  datasets: Dataset[];

  constructor(private datasetService: DatasetService) {
  }

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

  delete(dataset: Dataset): void {
    this.datasetService.deleteDataset(dataset).subscribe(() => {
      this.datasets = this.datasets.filter(h => h !== dataset);
    });
  }
}
