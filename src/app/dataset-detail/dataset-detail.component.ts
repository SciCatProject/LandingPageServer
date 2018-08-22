import { Component, Input, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";

import { Dataset } from "../dataset";
import { DatasetService } from "../dataset.service";
import { DomSanitizer, SafeUrl } from "@angular/platform-browser";

@Component({
  selector: "app-dataset-detail",
  templateUrl: "./dataset-detail.component.html",
  styleUrls: ["./dataset-detail.component.css"]
})
export class DatasetDetailComponent implements OnInit {
  @Input()
  dataset: Dataset;
  trustedUrl: SafeUrl;

  constructor(
    private route: ActivatedRoute,
    private datasetService: DatasetService,
    private sanitizer: DomSanitizer,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getDataset();
  }

  getDataset(): void {
    const id = +this.route.snapshot.paramMap.get("id");
    this.datasetService
      .getDataset(id)
      .subscribe(dataset => (this.dataset = dataset));
    this.datasetService
      .getDataset(id)
      .subscribe(
        dataset =>
          (this.trustedUrl = this.sanitizer.bypassSecurityTrustUrl(
            dataset.download
          ))
      );
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.datasetService
      .updateDataset(this.dataset)
      .subscribe(() => this.goBack());
  }
}
