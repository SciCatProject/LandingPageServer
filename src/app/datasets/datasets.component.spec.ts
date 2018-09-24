import { APP_CONFIG } from "../app-config.module";
import { DatasetService } from "../dataset.service";
import { DatasetsComponent } from "./datasets.component";
import { HttpClient } from "@angular/common/http";
import { InMemoryDataService } from "../in-memory-data.service";
import { InMemoryWebApiModule } from "angular-in-memory-web-api";
import { MatCardModule } from "@angular/material";
import { MockDatasetService, MockHttp, MockPublishedDataApi } from "../MockStubs";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { PublishedDataApi } from "../shared/sdk/services/custom";
import { RouterTestingModule } from "@angular/router/testing";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";

describe("DatasetsComponent", () => {
  let component: DatasetsComponent;
  let fixture: ComponentFixture<DatasetsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        NgxDatatableModule,
        MatCardModule,
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
