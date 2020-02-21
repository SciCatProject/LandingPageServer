import { APP_BASE_HREF } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { Inject, Injectable, Optional } from "@angular/core";
import { Observable, of } from "rxjs";
import { PublishedData } from "./shared/sdk/models";
import { PublishedDataApi } from "./shared/sdk/services/custom";
import { catchError, tap } from "rxjs/operators";

@Injectable()
export class DatasetService {
  limit = 1000;
  detailFilter = {
    limit: this.limit
  };
  filter = {
    limit: this.limit
  };
  private datasetsUrl = "api/datasets"; // URL to web api

  constructor(
    private rds: PublishedDataApi,
    private http: HttpClient,
    @Optional()
    @Inject(APP_BASE_HREF)
    origin: string
  ) {
    this.datasetsUrl = `${origin}${this.datasetsUrl}`;
  }

  /** GET datasets from the server */
  getDatasets(params): Observable<PublishedData[]> {
    console.log("gm get datasets");
    return this.rds.find(params);
  }

    count(): Observable<any> {
      return this.rds.count();
    }

  /** GET dataset by id. Will 404 if id not found */
  getDataset(id: string): Observable<PublishedData> {
    return this.rds.findById(
      id.replace("/", "%2F").replace("/", "%2F"),
      this.detailFilter
    );
  }

  /* GET datasets whose name contains search term */
  searchDatasets(term: string): Observable<PublishedData[]> {
    if (!term.trim()) {
      // if not search term, return empty dataset array.
      return of([]);
    }
    return this.rds.find({ limit: 5 });
  }

  //////// Save methods //////////

  /** DELETE: delete the dataset from the server */
  deleteDataset(dataset: PublishedData | string): Observable<PublishedData> {
    const id = typeof dataset === "string" ? dataset : dataset.doi;

    return this.rds.deleteById(id);
  }

  /** PUT: update the dataset on the server */
  updateDataset(dataset: PublishedData): Observable<any> {
    return this.rds.patchOrCreate(dataset).pipe(
      tap(_ => console.log(`updated hero id=${dataset.doi}`)),
      catchError(this.handleError<any>("updateDataset"))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead


      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
