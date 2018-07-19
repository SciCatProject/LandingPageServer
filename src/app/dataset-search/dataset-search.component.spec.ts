import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DatasetSearchComponent} from './dataset-search.component';
import {RouterTestingModule} from '@angular/router/testing';

describe('DatasetSearchComponent', () => {
  let component: DatasetSearchComponent;
  let fixture: ComponentFixture<DatasetSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [DatasetSearchComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatasetSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
