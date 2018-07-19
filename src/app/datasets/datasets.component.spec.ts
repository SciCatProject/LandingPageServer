import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DatasetsComponent} from './datasets.component';

import {RouterTestingModule} from '@angular/router/testing';
import {DatasetService} from '../dataset.service';
import {DATASETS} from '../mock-datasets';

describe('DatasetsComponent', () => {
  let component: DatasetsComponent;
  let fixture: ComponentFixture<DatasetsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [DatasetsComponent],
      providers: [{provide: DatasetService, use: DATASETS}]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatasetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
