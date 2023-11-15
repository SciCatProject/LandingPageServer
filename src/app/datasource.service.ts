import { Inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { AppConfig, APP_CONFIG } from "./app-config.module";
import { OAIService } from "./oai.service";
import { PublishedDataService } from "./published-data.service";
import { Job, PublishedData } from "./shared/sdk";
import { AppConfigService, AppConfig as Config } from "./app-config.service";

@Injectable()
export class DatasourceService {
  private directMongoAccess;
  private config: Config;
  constructor(
    @Inject(APP_CONFIG) private appConfig: AppConfig,
    private appConfigService: AppConfigService,
    private oaiService: OAIService,
    private publishedDataService: PublishedDataService
  ) {
    this.config = this.appConfigService.getConfig();
    this.directMongoAccess = this.config.directMongoAccess;
  }

  getPublications(params: string): Observable<PublishedData[]> {
    return this.directMongoAccess
      ? this.publishedDataService.getPublications(params)
      : this.oaiService.getPublications(params);
  }

  countPublications(): Observable<number> {
    return this.directMongoAccess
      ? this.publishedDataService.count().pipe(map((res) => res.count))
      : this.oaiService.countPublications().pipe(map((res) => res.count));
  }

  getPublication(id: string): Observable<PublishedData> {
    return this.directMongoAccess
      ? this.publishedDataService.getPublication(id)
      : this.oaiService.findOnePublication(id);
  }

  postJob(data: Job): Observable<Job> {
    return this.publishedDataService.postJob(data);
  }

  queryParams(
    itemsPerPage: number,
    currentPage: number,
    sortColumn: string,
    sortDirection: string,
    itemFields: Partial<{[key in keyof PublishedData]: boolean}>
  ): string {
    return this.directMongoAccess
      ? JSON.stringify({
          order: sortColumn + " " + sortDirection,
          skip: itemsPerPage * currentPage,
          limit: itemsPerPage,
          fields: itemFields,
        })
      : "(" +
          "skip=" +
          itemsPerPage * currentPage +
          ",limit=" +
          itemsPerPage +
          ",sortField=" +
          sortColumn +
          ",sortDirection=" +
          sortDirection +
          ",excludeFields=" +
          Object.keys(itemFields).filter(k => !itemFields[k]).join("|") +
          ")";
  }
}
