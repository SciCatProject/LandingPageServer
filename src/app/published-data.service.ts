import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { LoopBackFilter, PublishedData } from "./shared/sdk/models";
import { PublishedDataApi } from "./shared/sdk/services/custom";

@Injectable()
export class PublishedDataService {
  constructor(private rds: PublishedDataApi) {}

  /** GET datasets from the server */
  getPublications(params: string): Observable<PublishedData[]> {
    const filterParams: LoopBackFilter = JSON.parse(params);
    return this.rds.find(filterParams);
  }

  count(): Observable<{ count: number }> {
    return this.rds.count();
  }

  /** GET dataset by id. Will 404 if id not found */
  getPublication(id: string): Observable<PublishedData> {
    const encodedId = encodeURIComponent(id);
    return this.rds.findById(encodedId);
  }
}
