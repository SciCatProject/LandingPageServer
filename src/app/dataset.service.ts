import { Inject, Injectable, Optional } from "@angular/core";
import { APP_BASE_HREF } from "@angular/common";
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { Observable, of } from "rxjs";

import { catchError, map, tap } from "rxjs/operators";

import { PublishedDataApi } from "./shared/sdk/services/custom";
import { MessageService } from "./message.service";
import { PublishedData } from "./shared/sdk/models";

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" })
};

@Injectable()
export class DatasetService {
  limit = 1000;
  private datasetsUrl = "api/datasets"; // URL to web api

  detailFilter = {
    limit: this.limit
  };

  filter = {
    limit: this.limit
  };

  constructor(
    private rds: PublishedDataApi,
    private http: HttpClient,
    private messageService: MessageService,
    @Optional()
    @Inject(APP_BASE_HREF)
    origin: string
  ) {
    this.datasetsUrl = `${origin}${this.datasetsUrl}`;
  }

  /** GET datasets from the server */
  getDatasets(): Observable<PublishedData[]> {
    console.log("gm get datasets");
    return this.rds.find();
  }

  /** GET dataset by id. Will 404 if id not found */
  getDataset(id: string): Observable<PublishedData> {
    return this.rds.findById(id, this.detailFilter);
  }

  /* GET datasets whose name contains search term */
  searchDatasets(term: string): Observable<PublishedData[]> {
    if (!term.trim()) {
      // if not search term, return empty dataset array.
      return of([]);
    }
    return this.rds
      .find();
  }

  //////// Save methods //////////

  /** POST: add a new dataset to the server */
  addDataset(name: string): Observable<PublishedData> {
    const dataset = { name };

    return this.rds.create(dataset).pipe(
      tap((dataset1: PublishedData) =>
        this.log(`added hero w/ id=${dataset1.doi}`)
      ),
      catchError(this.handleError<PublishedData>("addDataset"))
    );
  }

  /** DELETE: delete the dataset from the server */
  deleteDataset(dataset: PublishedData | string): Observable<PublishedData> {
    const id = typeof dataset === "string" ? dataset : dataset.doi;

    return this.rds.deleteById(id);
  }

  /** PUT: update the dataset on the server */
  updateDataset(dataset: PublishedData): Observable<any> {
    return this.rds.patchOrCreate(dataset).pipe(
      tap(_ => this.log(`updated hero id=${dataset.doi}`)),
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

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a DatasetService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`DatasetService: ${message}`);
  }
}
