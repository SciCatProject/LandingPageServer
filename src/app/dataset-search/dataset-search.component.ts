import {Component, OnInit} from '@angular/core';

import {Observable, Subject} from 'rxjs';

import {debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';

import {Dataset} from '../dataset';
import {DatasetService} from '../dataset.service';

@Component({
  selector: 'dataset-search',
  templateUrl: './dataset-search.component.html',
  styleUrls: ['./dataset-search.component.css']
})
export class DatasetSearchComponent implements OnInit {
  datasets: Observable<Dataset[]>;
  private searchTerms = new Subject<string>();

  constructor(private datasetService: DatasetService) {
  }

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.datasets = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.datasetService.searchHeroes(term)),
    );
  }
}
