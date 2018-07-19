import {Inject, Injectable, Optional} from '@angular/core';
import {APP_BASE_HREF} from '@angular/common';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {Observable, of} from 'rxjs';

import {catchError, map, tap} from 'rxjs/operators';

import {Dataset} from './dataset';
import {MessageService} from './message.service';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable()
export class DatasetService {

  readonly heroesUrl = 'api/heroes';  // URL to web api

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
    @Optional() @Inject(APP_BASE_HREF) origin: string) {
    this.heroesUrl = `${origin}${this.heroesUrl}`;
  }

  /** GET heroes from the server */
  getHeroes(): Observable<Dataset[]> {
    return this.http.get<Dataset[]>(this.heroesUrl)
      .pipe(
        tap(heroes => this.log('fetched datasets')),
        catchError(this.handleError('getHeroes', []))
      );
  }

  /** GET dataset by id. Return `undefined` when id not found */
  getHeroNo404<Data>(id: number): Observable<Dataset> {
    const url = `${this.heroesUrl}/?id=${id}`;
    return this.http.get<Dataset[]>(url)
      .pipe(
        map(heroes => heroes[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} hero id=${id}`);
        }),
        catchError(this.handleError<Dataset>(`getHero id=${id}`))
      );
  }

  /** GET dataset by id. Will 404 if id not found */
  getHero(id: number): Observable<Dataset> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Dataset>(url).pipe(
      tap(_ => this.log(`fetched dataset id=${id}`)),
      catchError(this.handleError<Dataset>(`getHero id=${id}`))
    );
  }

  /* GET heroes whose name contains search term */
  searchHeroes(term: string): Observable<Dataset[]> {
    if (!term.trim()) {
      // if not search term, return empty dataset array.
      return of([]);
    }
    return this.http.get<Dataset[]>(`${this.heroesUrl}/?name=${term}`).pipe(
      tap(_ => this.log(`found heroes matching "${term}"`)),
      catchError(this.handleError<Dataset[]>('searchHeroes', []))
    );
  }

  //////// Save methods //////////

  /** POST: add a new dataset to the server */
  addHero(name: string): Observable<Dataset> {
    const hero = {name};

    return this.http.post<Dataset>(this.heroesUrl, hero, httpOptions).pipe(
      tap((hero: Dataset) => this.log(`added hero w/ id=${hero.id}`)),
      catchError(this.handleError<Dataset>('addHero'))
    );
  }

  /** DELETE: delete the dataset from the server */
  deleteHero(hero: Dataset | number): Observable<Dataset> {
    const id = typeof hero === 'number' ? hero : hero.id;
    const url = `${this.heroesUrl}/${id}`;

    return this.http.delete<Dataset>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted hero id=${id}`)),
      catchError(this.handleError<Dataset>('deleteHero'))
    );
  }

  /** PUT: update the dataset on the server */
  updateHero(hero: Dataset): Observable<any> {
    return this.http.put(this.heroesUrl, hero, httpOptions).pipe(
      tap(_ => this.log(`updated hero id=${hero.id}`)),
      catchError(this.handleError<any>('updateHero'))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
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
