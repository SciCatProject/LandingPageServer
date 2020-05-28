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
      if (id === "10.16907/7eb141d3-11f1-47a6-9d0e-76f8832ed1b2") {
        this.accessDataHref =
          "https://doi2.psi.ch/datasets/das/work/p16/p16628/20181012_lungs/large_volume_360/R2-6/stitching/fileexportTools/";
      } else if (id === "10.16907/05a50450-767f-421d-9832-342b57c201af") {
        this.accessDataHref =
          "https://doi2.psi.ch/datasets/das/work/p15/p15869/compression/";
      }
      this.dataset$ = this.oaiService.findOnePublication(id);
      this.dataset$.subscribe((pub) => {
        document.getElementById("doiValue").innerHTML = "DOI: " + pub.doi;
      });
    }
  }
}
