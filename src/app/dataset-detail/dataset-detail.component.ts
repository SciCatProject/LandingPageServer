import { ActivatedRoute } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { DatasetService } from "../dataset.service";
import { Observable } from "rxjs";
import { PublishedData } from "../shared/sdk/models";
import { map } from "rxjs/operators";

@Component({
  selector: "app-dataset-detail",
  templateUrl: "./dataset-detail.component.html",
  styleUrls: ["./dataset-detail.component.css"]
})
export class DatasetDetailComponent implements OnInit {
  dataset$: Observable<PublishedData>;
  datasetJson$: Observable<string>;

  doiBaseUrl = "https://doi.org/";

  constructor(
    private datasetService: DatasetService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id: string = this.route.snapshot.params.id;
    this.dataset$ = this.datasetService.getDataset(id);
    this.datasetJson$ = this.dataset$.pipe(
      map(({ thumbnail, ...dataset }) => JSON.stringify(dataset, null, 2))
    );
  }
}
