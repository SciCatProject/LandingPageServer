import { APP_CONFIG, AppConfigModule } from "../app-config.module";
import { PublishedDataDetailComponent } from "./publisheddata-detail.component";
import { HttpClient } from "@angular/common/http";
import { InMemoryDataService } from "../in-memory-data.service";
import { InMemoryWebApiModule } from "angular-in-memory-web-api";
import { MatCardModule } from "@angular/material/card";
import { MockHttp, MockOAIervice, MockDatasetService } from "../MockStubs";
import { RouterTestingModule } from "@angular/router/testing";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { LinkyModule } from "ngx-linky";
import { OAIService } from "../oai.service";
import { DatasetService } from "../dataset.service";
import { NO_ERRORS_SCHEMA } from "@angular/core";

describe("PublishedDataDetailComponent", () => {
  let component: PublishedDataDetailComponent;
  let fixture: ComponentFixture<PublishedDataDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      imports: [
        RouterTestingModule,
        MatCardModule,
        InMemoryWebApiModule.forRoot(InMemoryDataService),
        LinkyModule,
        AppConfigModule
      ],
      declarations: [PublishedDataDetailComponent],
      providers: [
        { provide: OAIService, useClass: MockOAIervice },
        { provide: DatasetService, useClass: MockDatasetService },
        { provide: HttpClient, useClass: MockHttp },
        { provide: APP_CONFIG, useValue: {directMongoAccess: false} }
      ]
    });
    TestBed.compileComponents();
  }));



  beforeEach(() => {
    fixture = TestBed.createComponent(PublishedDataDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  /*it("should be created",  inject([MockOAIervice], (myService: MockOAIervice) => {
    spyOn(myService, 'getPublications').and.returnValue({subscribe: () => {}});
    expect(component).toBeTruthy();
  }));*/


  it("should create", () => {
    expect(component).toBeTruthy();
  });


});
