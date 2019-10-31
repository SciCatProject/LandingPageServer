import { APP_CONFIG } from "../app-config.module";
// import { PublishedDataDetailService } from "../dataset.service";
 import { PublishedDataDetailComponent } from "./publisheddata-detail.component";
import { HttpClient } from "@angular/common/http";
import { InMemoryDataService } from "../in-memory-data.service";
import { InMemoryWebApiModule } from "angular-in-memory-web-api";
import { MatCardModule } from "@angular/material/card";
 import { MockHttp, MockOAIervice } from "../MockStubs";
import { RouterTestingModule } from "@angular/router/testing";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { LinkyModule } from "ngx-linky";
import { OAIService } from "../oai.service";
import { NO_ERRORS_SCHEMA, inject } from "@angular/core";

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
        LinkyModule
      ],
      declarations: [PublishedDataDetailComponent],
      providers: [
        { provide: OAIService, useClass: MockOAIervice},
        { provide: HttpClient, useClass: MockHttp },
      //  { provide: PublishedDataDetailService, useClass: MockPublishedDataDetailService },
        { provide: APP_CONFIG }
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
