import { Component, Input, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";
import { DatasetService } from "../dataset.service";
import { DomSanitizer, SafeUrl } from "@angular/platform-browser";
import { PublishedData } from "../shared/sdk/models";
import { MatCard} from '@angular/material';

@Component({
  selector: "app-dataset-detail",
  templateUrl: "./dataset-detail.component.html",
  styleUrls: ["./dataset-detail.component.css"]
})
export class DatasetDetailComponent implements OnInit {
  @Input()
  dataset: PublishedData;
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
    const id: string = this.route.snapshot.params.id;
    this.datasetService.getDataset(id).subscribe(dataset => {
      console.log("gm get dataset");
      this.dataset = dataset;
    });
    this.datasetService
      .getDataset(id)
      .subscribe(
        dataset =>
          (this.trustedUrl = this.sanitizer.bypassSecurityTrustUrl(dataset.url))
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
