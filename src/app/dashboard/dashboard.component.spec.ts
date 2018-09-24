import { APP_CONFIG } from "../app-config.module";
import { DashboardComponent } from "./dashboard.component";
import { DatasetService } from "../dataset.service";
import { MockDatasetService, MockPublishedDataApi } from "../MockStubs";
import { PublishedDataApi } from "../shared/sdk/services/custom";
import { RouterTestingModule } from "@angular/router/testing";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";

describe("DashboardComponent", () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [DashboardComponent ],
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
    console.log ("should be created");
    expect(component).toBeTruthy();
  });
});
