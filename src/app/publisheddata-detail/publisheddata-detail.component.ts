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
    private location: Location,
    private oaiService: OAIService
  ) {}

  ngOnInit(): void {
    this.getDataset();
  }

  getPublication(): void {
    this.oaiService
      .getPublications(null)
      .pipe(
        map(res => {
          console.log(res);
          return res;
        })
      )
      .subscribe(datasets => {
        // this.doi_list = datasets;
        // console.log("gm22", this.doi_list);
      });
  }

  getDataset(): void {
    const id: string = this.route.snapshot.params.id;
    console.log("gm id", id);
    this.oaiService.getOnePublication(id).subscribe(dataset => {
      const item = dataset;
      console.log("====================================+", dataset);
      if (!item) {
        return;
      }
      console.log("====================================+");
      console.log("gm get dataset", item.doi);
      this.doi = item.doi;
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
        additionalType: item.resourceType,
        name: item.title,
        description: item.abstract,
        keywords: "neutron",
        datePublished: item.publicationYear,
        schemaVersion: "http://datacite.org/schema/kernel-4",
        publisher: {
          "@type": "Organization",
          name: item.publisher
        },
        includedInDataCatalog: {
          "@type": "DataCatalog",
          name: "scicat.esss.se"
        },
        distribution: [
          {
            "@type": "DataDownload",
            encodingFormat: "CSV",
            contentURL: item.url
          }
        ],
        url: item.url,
        creator: item.creator
      });
      this.schema$["@id"] = this.doi_link;
      this.schema$["title"] = item.title;
      this.schema$["creator"] = item.creator;
      this.jsonLD = this.getSafeHTML(this.schema$);
      this.trustedUrl = this.sanitizer.bypassSecurityTrustUrl(item.url);
      this.dataUrl = this.sanitizer.bypassSecurityTrustUrl(
        item.dataDescription
      );
      this.dataset = item;
      console.log("======================this.dataset==============+", this.dataset);
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
