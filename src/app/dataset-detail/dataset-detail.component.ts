import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';

import {Dataset} from '../dataset';
import {DatasetService} from '../dataset.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './dataset-detail.component.html',
  styleUrls: ['./dataset-detail.component.css']
})
export class DatasetDetailComponent implements OnInit {
  @Input() dataset: Dataset;

  constructor(
    private route: ActivatedRoute,
    private datasetService: DatasetService,
    private location: Location
  ) {
  }

  ngOnInit(): void {
    this.getHero();
  }

  getHero(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.datasetService.getDataset(id)
      .subscribe(hero => this.dataset = hero);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.datasetService.updateDataset(this.dataset)
      .subscribe(() => this.goBack());
  }
}
