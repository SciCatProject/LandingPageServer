import { ActivatedRoute } from "@angular/router";
import { Component, OnInit, Inject } from "@angular/core";
import { Observable } from "rxjs";
import { PublishedData } from "../shared/sdk/models";
import { map } from "rxjs/operators";
import { APP_CONFIG, AppConfig } from "../app-config.module";
import { DatasourceService } from "../datasource.service";
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import { Dataset, Organization, Person, WithContext } from "schema-dts";
import { DialogComponent } from "../shared/modules/dialog/dialog.component";
import { MatDialog } from "@angular/material/dialog";
import { RetrieveService } from "../retrieve.service";
import * as fileSize from "filesize";
import { APP_DYN_CONFIG, AppConfigService, AppConfig as Config } from "../app-config.service";

@Component({
  selector: "app-publisheddata-details",
  templateUrl: "./publisheddata-details.component.html",
  styleUrls: ["./publisheddata-details.component.scss"],
})
export class PublisheddataDetailsComponent implements OnInit {
  publication$ = new Observable<PublishedData>();
  publicationJson$ = new Observable<string>();

  doiBaseUrl: string;
  productionMode = this.appConfig.production;
  accessDataHref: string;
  show = false;

  config: Config;
  constructor(
    @Inject(APP_CONFIG) public appConfig: AppConfig,
    @Inject(APP_DYN_CONFIG) private appConfigService: AppConfigService,
    private datasourceService: DatasourceService,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    public dialog: MatDialog,
    private retrieveSrc: RetrieveService,
  ) {
    this.config = this.appConfigService.getConfig();
    this.accessDataHref = this.config.accessDataHref;
    this.doiBaseUrl = this.config.doiBaseUrl;

  }

  onPidClick(pid: string): void {
    const encodedPid = encodeURIComponent(pid);
    window.open(
      this.config.scicatBaseUrl + "/datasets/" + encodedPid,
      "_blank"
    );
  }

  isUrl(dataDescription: string): boolean {
    return dataDescription.includes("http");
  }

  getSafeHTML(value: {}): SafeHtml {
    const json = value ? JSON.stringify(value, null, 2) : "";
    const html = `<script type="application/ld+json">${json}</script>`;
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  schemaDotOrg(publication: PublishedData): WithContext<Dataset> {
    const name = publication.creator ? publication.creator.slice(-1)[0]: "";
    const nameSplit = name ? name.split(" "): [];
    const familyName = nameSplit.pop();
    const creator: Person =  {
      "name": name,
      "givenName": nameSplit.join(" "),
      "familyName": familyName,
      "@type": "Person"
    };
    const organization: Organization = {
      "@type": "Organization",
      "name": publication.publisher
    };

    return {
      "@context": "https://schema.org",
      "@type": "Dataset",
      "@id": this.doiBaseUrl + publication.doi,
      "name": publication.title,
      "creator": creator,
      "description": publication.dataDescription,
      "datePublished": `${publication.publicationYear}`,
      "publisher": organization,
      "license": "http://creativecommons.org/licenses/by-sa/4.0/"
    };
  }

  ngOnInit(): void {
    const params = this.route.snapshot.params;
    const id: string =
      Object.keys(params).length === 2 // for case where doi string is not url encoded
        ? params.id1 + "/" + params.id2
        : params.id;

    this.publication$ = this.datasourceService.getPublication(id);
    this.publicationJson$ = this.publication$.pipe(
      map(({ thumbnail, ...publication }) =>
        JSON.stringify(publication, null, 2)
      )
    );
  }

  accessData(publication: PublishedData): void {
    if (publication.downloadLink) {
      window.open(publication.downloadLink);
    } else if (this.config.retrieveToEmail && this.config.directMongoAccess) {
      const dialogOptions = this.retrieveSrc.retriveDialogOptions();
      if (this.config.retrieveToEmail.confirmMessage){
        const size = publication.sizeOfArchive? `You are about to submit a data request for ${fileSize(publication.sizeOfArchive)}<br>`: "";
        dialogOptions.data.confirmMessage = `${size}${this.config.retrieveToEmail.confirmMessage}`;
      }
      const dialogRef = this.dialog.open(DialogComponent, dialogOptions);
      dialogRef.afterClosed().subscribe((result) => {
        if (result)
          this.retrieveSrc.retrieve(result.email, publication.pidArray).subscribe();
      });
    } else {
      window.open(this.accessDataHref);
    }
  }

}
