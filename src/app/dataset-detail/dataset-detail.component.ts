import { ActivatedRoute } from "@angular/router";
import { Component, OnInit, Inject } from "@angular/core";
import { DatasetService } from "../dataset.service";
import { Observable } from "rxjs";
import { PublishedData } from "../shared/sdk/models";
import { map } from "rxjs/operators";
import { APP_CONFIG, AppConfig } from "../app-config.module";
import { OAIService } from "../oai.service";

@Component({
  selector: "app-dataset-detail",
  templateUrl: "./dataset-detail.component.html",
  styleUrls: ["./dataset-detail.component.css"],
})
export class DatasetDetailComponent implements OnInit {
  dataset$: Observable<PublishedData>;
  datasetJson$: Observable<string>;

  doiBaseUrl = this.config.doiBaseUrl;
  productionMode = this.config.production;
  accessDataHref = this.config.accessDataHref;

  constructor(
    @Inject(APP_CONFIG) private config: AppConfig,
    private datasetService: DatasetService,
    private route: ActivatedRoute,
    private oaiService: OAIService
  ) {}

  ngOnInit(): void {
    const params = this.route.snapshot.params;
    let id: string;
    if (Object.keys(params).length === 2) {
      // for case where doi string is not url encoded
      id = params.id1 + "/" + params.id2;
    } else {
      id = this.route.snapshot.params.id;
    }

    if (this.config.directMongoAccess) {
      this.dataset$ = this.datasetService.getDataset(id);
      this.datasetJson$ = this.dataset$.pipe(
        map(({ thumbnail, ...dataset }) => JSON.stringify(dataset, null, 2))
      );
    } else {
      this.dataset$ = this.oaiService.findOnePublication(id);
      this.dataset$.subscribe((pub) => {
        document.getElementById("doiValue").innerHTML = "DOI: " + pub.doi;
      });
    }
  }
}
