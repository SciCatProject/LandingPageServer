import { Component, OnInit } from '@angular/core';
import { Dataset } from '../dataset';
import { DatasetService } from '../dataset.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {
  heroes: Dataset[] = [];

  constructor(private heroService: DatasetService) { }

  ngOnInit() {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getDatasets()
    .subscribe(heroes => this.heroes = heroes.slice(1, 5));
  }
}
