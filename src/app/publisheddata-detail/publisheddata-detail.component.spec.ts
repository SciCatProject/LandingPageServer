import { APP_CONFIG } from "../app-config.module";
// import { PublishedDataDetailService } from "../dataset.service";
 import { PublishedDataDetailComponent } from "./publisheddata-detail.component";
import { HttpClient } from "@angular/common/http";
import { InMemoryDataService } from "../in-memory-data.service";
import { InMemoryWebApiModule } from "angular-in-memory-web-api";
import { MatCardModule } from "@angular/material/card";
// import { MockPublishedDataDetailService, MockHttp } from "../MockStubs";
import { RouterTestingModule } from "@angular/router/testing";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";

describe("PublishedDataDetailComponent", () => {
  let component: PublishedDataDetailComponent;
  let fixture: ComponentFixture<PublishedDataDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MatCardModule,
        InMemoryWebApiModule.forRoot(InMemoryDataService)
      ],
      declarations: [PublishedDataDetailComponent],
      providers: [
        { provide: HttpClient, /*useClass: MockHttp*/ },
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

  it("should be created", () => {
    expect(component).toBeTruthy();
  });
});
