import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { LoopBackFilter, PublishedData, Job } from "./shared/sdk/models";
import { PublishedDataApi, JobApi } from "./shared/sdk/services/custom";

@Injectable()
export class PublishedDataService {
  constructor(
    private rds: PublishedDataApi,
    private job: JobApi,
  ) {}

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

  postJob(data: Job): Observable<Job> {
    return this.job.create(data);
  }
}
