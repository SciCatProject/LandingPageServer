import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { DashboardComponent } from "./dashboard.component";

import { RouterTestingModule } from "@angular/router/testing";

import { DatasetSearchComponent } from "../dataset-search/dataset-search.component";
import { MockDatasetService, MockPublishedDataApi } from "../MockStubs";
import { DatasetService } from "../dataset.service";
import { PublishedDataApi } from "../shared/sdk/services/custom";
import { APP_CONFIG } from "../app-config.module";

describe("DashboardComponent", () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [DashboardComponent, DatasetSearchComponent],
      providers: [
        { provide: PublishedDataApi, useClass: MockPublishedDataApi },
        { provide: DatasetService, useClass: MockDatasetService },
        {
          provide: APP_CONFIG,
          useValue: {
            facility: "ESS"
          }
        }
      ]
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
