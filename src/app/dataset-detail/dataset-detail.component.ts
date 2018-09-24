"use strict";
import { ActivatedRoute } from "@angular/router";
import { Component, Input, OnInit } from "@angular/core";
import { DatasetService } from "../dataset.service";
import { DomSanitizer, SafeHtml, SafeUrl } from "@angular/platform-browser";
import { Location } from "@angular/common";
import { Observable, of } from "rxjs";
import { PublishedData } from "../shared/sdk/models";

@Component({
  selector: "app-dataset-detail",
  templateUrl: "./dataset-detail.component.html",
  styleUrls: ["./dataset-detail.component.css"]
})
export class DatasetDetailComponent implements OnInit {
  @Input()
  dataset: PublishedData;
  trustedUrl: SafeUrl;
  dataUrl: SafeUrl;
  doi: string;
  doi_link: string;
  schema$: Observable<any>;
  jsonLD: SafeHtml;

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
    console.log("gm id", id);
    this.datasetService.getDataset(id).subscribe(dataset => {
      console.log("gm get dataset", dataset.doi);
      this.doi = dataset.doi;
      console.log("gm get dataset", this.doi);
      this.doi_link = "https://doi.org/" + this.doi;
      this.schema$ = of({
        "@context": "http://schema.org",
        "@type": "Dataset",
        "@id": this.doi_link,
        identifier: {
          "@type": "PropertyValue",
          propertyID: "doi",
          value: this.doi_link
        },
        additionalType: dataset.resourceType,
        name: dataset.title,
        description: dataset.abstract,
        keywords: "neutron",
        datePublished: dataset.publicationYear,
        schemaVersion: "http://datacite.org/schema/kernel-4",
        publisher: {
          "@type": "Organization",
          name: dataset.publisher
        },
        includedInDataCatalog: {
          "@type": "DataCatalog",
          name: "scicat.esss.se"
        },
        distribution: [
          {
            "@type": "DataDownload",
            encodingFormat: "CSV",
            contentURL: dataset.url
          }
        ],
        url: dataset.url,
        creator: dataset.creator
      });
      this.schema$["@id"] = this.doi_link;
      this.schema$["title"] = dataset.title;
      this.schema$["creator"] = dataset.creator;
      this.jsonLD = this.getSafeHTML(this.schema$);
      this.trustedUrl = this.sanitizer.bypassSecurityTrustUrl(dataset.url);
      this.dataUrl = this.sanitizer.bypassSecurityTrustUrl(
        dataset.dataDescription
      );
      this.dataset = dataset;
    });
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.datasetService
      .updateDataset(this.dataset)
      .subscribe(() => this.goBack());
  }

  getSafeHTML(value: {}) {
    // If value convert to JSON and escape / to prevent script tag in JSON
    const json = value ? JSON.stringify(value, null, 2) : "";
    const html = `${json}`;
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }
}
