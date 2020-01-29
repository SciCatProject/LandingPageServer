"use strict";
import { APP_CONFIG, AppConfig } from "../app-config.module";
import { ActivatedRoute } from "@angular/router";
import { Component, Inject, Input, OnInit } from "@angular/core";
import { DomSanitizer, SafeHtml, SafeUrl } from "@angular/platform-browser";
import { DatasetService } from "../dataset.service";
import { Location } from "@angular/common";
import { Observable } from "rxjs";
import { PublishedData } from "../shared/sdk/models";
import { OAIService } from "../oai.service";

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}
@Component({
  selector: "app-publisheddata-detail",
  templateUrl: "./publisheddata-detail.component.html",
  styleUrls: ["./publisheddata-detail.component.css"]
})
export class PublishedDataDetailComponent implements OnInit {
  @Input()
  pub: PublishedData;
  trustedUrl: SafeUrl;
  dataUrl: SafeUrl;
  doi: string;
  schema$: Observable<any>;
  jsonLD: SafeHtml;
  window = window.location.href;
  badgeDoi: string;
  thumbnail: any;
  tiles: Tile[] = [
    { text: "", cols: 1, rows: 1, color: "lightblue" },
    { text: "", cols: 2, rows: 1, color: "lightgreen" },
    { text: "", cols: 1, rows: 1, color: "lightpink" },
    { text: "", cols: 1, rows: 1, color: "#DDBDF1" },
    { text: "", cols: 1, rows: 1, color: "#DDBDF1" },
    { text: "", cols: 1, rows: 1, color: "#DDBDF1" }
  ];

  constructor(
    private route: ActivatedRoute,
    private datasetService: DatasetService,
    private sanitizer: DomSanitizer,
    private location: Location,
    private oaiService: OAIService,
    @Inject(APP_CONFIG) private appConfig: AppConfig
  ) {}

  ngOnInit(): void {
    const params = this.route.snapshot.params;
    let id: string;
    if (Object.keys(params).length === 2) {
      // for case where doi string is not url encoded
      id = (params.id1 + "/" + params.id2);
    } else {
      id = this.route.snapshot.params.id;
    }
    let dataObs$ = null;
    if (this.appConfig.directMongoAccess) {
      dataObs$ = this.datasetService.getDataset(id);
    } else {
      dataObs$ = this.oaiService.findOnePublication(id);
    }

    dataObs$.subscribe(pub => {
      this.pub = pub;
      document.getElementById("doiValue").innerHTML = "DOI: " + pub.doi;
      this.badgeDoi =
        "https://img.shields.io/static/v1?label=DOI&message=" +
        pub.doi +
        "&color=green";
      this.thumbnail = this.sanitizer.bypassSecurityTrustUrl(pub.thumbnail);
      console.log("pub", pub);
      console.log("id", id);
    });
  }

  goBack(): void {
    this.location.back();
  }

  getSafeHTML(value: {}) {
    // If value convert to JSON and escape / to prevent script tag in JSON
    const json = value ? JSON.stringify(value, null, 2) : "";
    const html = `${json}`;
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }
}
