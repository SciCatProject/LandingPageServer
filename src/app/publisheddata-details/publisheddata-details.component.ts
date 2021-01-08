import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { PublishedData } from '../shared/sdk/models';
import { map } from 'rxjs/operators';
import { APP_CONFIG, AppConfig } from '../app-config.module';
import { DatasourceService } from '../datasource.service';

@Component({
  selector: 'app-publisheddata-details',
  templateUrl: './publisheddata-details.component.html',
  styleUrls: ['./publisheddata-details.component.scss'],
})
export class PublisheddataDetailsComponent implements OnInit {
  publication$: Observable<PublishedData>;
  publicationJson$: Observable<string>;
  downloadLink$: Observable<string>;

  doiBaseUrl = this.appConfig.doiBaseUrl;
  productionMode = this.appConfig.production;
  accessDataHref = this.appConfig.accessDataHref;
  show = false;

  onPidClick(pid: string): void {
    const encodedPid = encodeURIComponent(pid);
    window.open(
      this.appConfig.scicatBaseUrl + '/datasets/' + encodedPid,
      '_blank'
    );
  }

  isUrl(dataDescription: string): boolean {
    return dataDescription.includes('http');
  }

  constructor(
    @Inject(APP_CONFIG) public appConfig: AppConfig,
    private datasourceService: DatasourceService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const params = this.route.snapshot.params;
    const id: string =
      Object.keys(params).length === 2 // for case where doi string is not url encoded
        ? params.id1 + '/' + params.id2
        : params.id;

    this.publication$ = this.datasourceService.getPublication(id);
    this.publicationJson$ = this.publication$.pipe(
      map(({ thumbnail, ...publication }) =>
        JSON.stringify(publication, null, 2)
      )
    );
    this.downloadLink$ = this.publication$.pipe(
      map((publication) =>
        publication.downloadLink
          ? publication.downloadLink
          : this.accessDataHref
      )
    );
  }
}
