import { Inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { AppConfig, APP_CONFIG } from "./app-config.module";
import { OAIService } from "./oai.service";
import { PublishedDataService } from "./published-data.service";
import { PublishedData } from "./shared/sdk";

@Injectable({
  providedIn: "root",
})
export class DatasourceService {
  constructor(
    @Inject(APP_CONFIG) private appConfig: AppConfig,
    private oaiService: OAIService,
    private publishedDataService: PublishedDataService
  ) {}

  getPublications(params: string): Observable<PublishedData[]> {
    return this.appConfig.directMongoAccess
      ? this.publishedDataService.getPublications(params)
      : this.oaiService.getPublications(params);
  }

  countPublications(): Observable<number> {
    return this.appConfig.directMongoAccess
      ? this.publishedDataService.count().pipe(map((res) => res.count))
      : this.oaiService.countPublications().pipe(map((res) => res.count));
  }

  getPublication(id: string): Observable<PublishedData> {
    return this.appConfig.directMongoAccess
      ? this.publishedDataService.getPublication(id)
      : this.oaiService.findOnePublication(id);
  }

  queryParams(
    itemsPerPage: number,
    currentPage: number,
    sortColumn: string,
    sortDirection: string
  ): string {
    return this.appConfig.directMongoAccess
      ? JSON.stringify({
          order: sortColumn + " " + sortDirection,
          skip: itemsPerPage * currentPage,
          limit: itemsPerPage,
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
          ")";
  }
}
