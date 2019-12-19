import { APP_CONFIG } from "../app-config.module";
import { DashboardComponent } from "./dashboard.component";
import { DatasetService } from "../dataset.service";
import { MockDatasetService, MockPublishedDataApi, MockOAIervice } from "../MockStubs";
import { PublishedDataApi } from "../shared/sdk/services/custom";
import { RouterTestingModule } from "@angular/router/testing";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { OAIService } from "../oai.service";
import { InMemoryDataService } from "../in-memory-data.service";
import { InMemoryWebApiModule } from "angular-in-memory-web-api";

describe("DashboardComponent", () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule,
        InMemoryWebApiModule.forRoot(InMemoryDataService),
      ],
      declarations: [DashboardComponent ],
      providers: [
        { provide: OAIService, useClass: MockOAIervice},
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

  afterEach(() => {
    fixture.destroy();
  });

  it("should be created", () => {
    console.log ("should be created");
    expect(component).toBeTruthy();
  });
  
});
