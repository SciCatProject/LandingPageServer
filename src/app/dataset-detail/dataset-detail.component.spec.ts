import { APP_CONFIG } from "../app-config.module";
import { DatasetDetailComponent } from "./dataset-detail.component";
import { DatasetService } from "../dataset.service";
import { FileSizePipe } from "../filesize.pipe";
import { HttpClient } from "@angular/common/http";
import { InMemoryDataService } from "../in-memory-data.service";
import { InMemoryWebApiModule } from "angular-in-memory-web-api";
import { MatCardModule } from "@angular/material";
import { MockDatasetService, MockHttp, MockNgx } from "../MockStubs";
import { NgxJsonLdModule } from "@ngx-lite/json-ld";
import { RouterTestingModule } from "@angular/router/testing";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";

describe("DatasetDetailComponent", () => {
  let component: DatasetDetailComponent;
  let fixture: ComponentFixture<DatasetDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MatCardModule,
        InMemoryWebApiModule.forRoot(InMemoryDataService)
      ],
      declarations: [DatasetDetailComponent, FileSizePipe],
      providers: [
        { provide: HttpClient, useClass: MockHttp },
        { provide: DatasetService, useClass: MockDatasetService },
        { provide: NgxJsonLdModule, useClass: MockNgx },
        { provide: APP_CONFIG }
      ]
    });
    TestBed.compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatasetDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it("should be created", () => {
    expect(component).toBeTruthy();
  });
});
