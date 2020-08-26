import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, Inject } from '@angular/core';
import { PublishedDataService } from '../published-data.service';
import { Observable } from 'rxjs';
import { PublishedData } from '../shared/sdk/models';
import { map } from 'rxjs/operators';
import { APP_CONFIG, AppConfig } from '../app-config.module';
import { OAIService } from '../oai.service';

@Component({
  selector: 'app-publisheddata-details',
  templateUrl: './publisheddata-details.component.html',
  styleUrls: ['./publisheddata-details.component.scss'],
})
export class PublisheddataDetailsComponent implements OnInit {
  publication$: Observable<PublishedData>;
  publicationJson$: Observable<string>;

  doiBaseUrl = this.appConfig.doiBaseUrl;
  productionMode = this.appConfig.production;
  accessDataHref = this.appConfig.accessDataHref;
  downloadLink = '';
  show = false;

  constructor(
    @Inject(APP_CONFIG) public appConfig: AppConfig,
    private publishedDataService: PublishedDataService,
    private route: ActivatedRoute,
    private oaiService: OAIService
  ) {}

  ngOnInit(): void {
    const params = this.route.snapshot.params;
    let id: string;
    if (Object.keys(params).length === 2) {
      // for case where doi string is not url encoded
      id = params.id1 + '/' + params.id2;
    } else {
      id = this.route.snapshot.params.id;
    }

    if (this.appConfig.directMongoAccess) {
      this.publication$ = this.publishedDataService.getPublication(id);
      this.publicationJson$ = this.publication$.pipe(
        map(({ thumbnail, ...dataset }) => JSON.stringify(dataset, null, 2))
      );
    } else {
      console.log('access via oai-service');
      this.publication$ = this.oaiService.findOnePublication(id);
      this.publication$.subscribe((pub) => {
        this.downloadLink = pub.downloadLink
          ? pub.downloadLink
          : this.accessDataHref;
      });
    }
  }
}
