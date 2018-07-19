import {Component, OnInit} from '@angular/core';

import {Dataset} from '../dataset';
import {DatasetService} from '../dataset.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './datasets.component.html',
  styleUrls: ['./datasets.component.css']
})
export class DatasetsComponent implements OnInit {
  datasets: Dataset[];

  constructor(private datasetService: DatasetService) {
  }

  ngOnInit() {
    this.getDatasets();
  }

  getDatasets (): void {
    this.datasetService.getDatasets()
      .subscribe(heroes => this.datasets = heroes);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) {
      return;
    }
    this.datasetService.addDataset(name)
      .subscribe(hero => {
        this.datasets.push(hero);
      });
  }

  delete(hero: Dataset): void {
    this.datasetService.deleteDataset(hero)
      .subscribe(() => {
        this.datasets = this.datasets.filter(h => h !== hero);
      });
  }

}
