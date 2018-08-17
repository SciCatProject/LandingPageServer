import {async, ComponentFixture, TestBed} from "@angular/core/testing";

import {DashboardComponent} from "./dashboard.component";

import {RouterTestingModule} from "@angular/router/testing";

import {DatasetSearchComponent} from "../dataset-search/dataset-search.component";
import {MockDatasetService} from "../MockStubs";
import {DatasetService} from "../dataset.service";

describe("DashboardComponent", () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [DashboardComponent, DatasetSearchComponent],
      providers: [{ provide: DatasetService, useClass: MockDatasetService }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should be created", () => {
    expect(component).toBeTruthy();
  });
});
