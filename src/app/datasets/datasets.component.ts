import {Component, OnInit} from '@angular/core';

import {Dataset} from '../dataset';
import {DatasetService} from '../dataset.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './datasets.component.html',
  styleUrls: ['./datasets.component.css']
})
export class DatasetsComponent implements OnInit {
  heroes: Dataset[];

  constructor(private heroService: DatasetService) {
  }

  ngOnInit() {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getDatasets()
      .subscribe(heroes => this.heroes = heroes);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) {
      return;
    }
    this.heroService.addDataset(name)
      .subscribe(hero => {
        this.heroes.push(hero);
      });
  }

  delete(hero: Dataset): void {
    this.heroService.deleteDataset(hero)
      .subscribe(() => {
        this.heroes = this.heroes.filter(h => h !== hero);
      });
  }

}
