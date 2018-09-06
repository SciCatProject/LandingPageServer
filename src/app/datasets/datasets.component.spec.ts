import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { DatasetsComponent } from "./datasets.component";

import { RouterTestingModule } from "@angular/router/testing";
import { InMemoryWebApiModule } from "angular-in-memory-web-api";
import { InMemoryDataService } from "../in-memory-data.service";
import {
  MockDatasetService,
  MockHttp,
  MockPublishedDataApi
} from "../MockStubs";
import { DatasetService } from "../dataset.service";
import { APP_CONFIG } from "../app-config.module";
import { HttpClient } from "@angular/common/http";
import { PublishedDataApi } from "../shared/sdk/services/custom";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";

describe("DatasetsComponent", () => {
  let component: DatasetsComponent;
  let fixture: ComponentFixture<DatasetsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        NgxDatatableModule,
        InMemoryWebApiModule.forRoot(InMemoryDataService)
      ],
      declarations: [DatasetsComponent],
      providers: [
        { provide: HttpClient, useClass: MockHttp },
        { provide: PublishedDataApi, useClass: MockPublishedDataApi },
        { provide: DatasetService, useClass: MockDatasetService },
        { provide: APP_CONFIG }
      ]
    });
    TestBed.compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatasetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should be created", () => {
    expect(component).toBeTruthy();
  });
});
