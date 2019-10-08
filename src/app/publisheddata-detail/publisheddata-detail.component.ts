"use strict";
import { ActivatedRoute } from "@angular/router";
import { Component, Input, OnInit } from "@angular/core";
import { DatasetService } from "../dataset.service";
import { DomSanitizer, SafeHtml, SafeUrl } from "@angular/platform-browser";
import { Location } from "@angular/common";
import { Observable, of } from "rxjs";
import { map } from "rxjs/operators";
import { PublishedData } from "../shared/sdk/models";
import { OAIService } from "../oai.service";

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
  doi_link: string;
  schema$: Observable<any>;
  jsonLD: SafeHtml;

  constructor(
    private route: ActivatedRoute,
    //private datasetService: DatasetService,
    private sanitizer: DomSanitizer,
    private location: Location,
    private oaiService: OAIService
  ) {}

  ngOnInit(): void {
    const id: string = this.route.snapshot.params.id;
    this.oaiService.findOnePublication(id).subscribe(pub => {
      this.pub = pub;
      console.log("pub", pub);
      console.log("id", id);
    });
  }

 /* goBack(): void {
    this.location.back();
  }

  save(): void {
    this.datasetService
      .updateDataset(this.pub)
      .subscribe(() => this.goBack());
  }*/

  getSafeHTML(value: {}) {
    // If value convert to JSON and escape / to prevent script tag in JSON
    const json = value ? JSON.stringify(value, null, 2) : "";
    const html = `${json}`;
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }
}
