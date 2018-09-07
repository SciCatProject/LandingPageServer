import { Component, Input, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";
import { DatasetService } from "../dataset.service";
import { DomSanitizer, SafeUrl } from "@angular/platform-browser";
import { PublishedData } from "../shared/sdk/models";
import { Observable, of } from "rxjs";

interface MySchema  {
  context : string;
  type: string;
  id: string;
  name: string;
  url: string;
  creator: string;
}

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
      this.doi = decodeURIComponent(dataset.doi);
      this.doi_link = "https://doi.org/" + this.doi;
      this.schema$ = of ( {
        "@context": "http://schema.org",
        "@type": "Dataset",
        "@id": this.doi_link,
        name: dataset.title,
        url: dataset.url,
        creator: dataset.creator
      } ) ;
      this.schema$["@id"] = this.doi_link;
      this.schema$["title"] = dataset.title;
      this.schema$["creator"] = dataset.creator;
      this.trustedUrl = this.sanitizer.bypassSecurityTrustUrl(dataset.url);
      this.dataUrl = this.sanitizer.bypassSecurityTrustUrl(
        "https://github.com/ess-dmsc/ess_file_formats/wiki"
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
}
