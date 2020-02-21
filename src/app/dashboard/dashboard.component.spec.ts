import { APP_CONFIG, AppConfigModule } from "../app-config.module";
import { DashboardComponent } from "./dashboard.component";
import { DatasetService } from "../dataset.service";
import { DatePipe } from "@angular/common";
import { MockDatasetService, MockOAIervice } from "../MockStubs";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { OAIService } from "../oai.service";
import { MatListModule } from "@angular/material/list";
import { MatIconModule } from "@angular/material/icon";
import { Router } from "@angular/router";
import { MatCardModule } from "@angular/material";
import { SharedCatanieModule } from "../shared/shared.module";

describe("DashboardComponent", () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  const router = {
    navigateByUrl: jasmine.createSpy("navigateByUrl")
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AppConfigModule, MatIconModule, MatListModule, MatCardModule, SharedCatanieModule],
      declarations: [DashboardComponent],
      providers: [
        DatePipe,
        { provide: OAIService, useClass: MockOAIervice },
        { provide: DatasetService, useClass: MockDatasetService },
        {
          provide: APP_CONFIG,
          useValue: {
            facility: "ESS",
            directMongoAccess: true
          }
        },
        { provide: Router, useValue: router }
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
    console.log("should be created");
    expect(component).toBeTruthy();
  });

  describe("#onRowClick()", () => {
    it("should navigate to publication details of the provided doi", () => {
      const param = {doi: "testDOI"};
      component.onRowClick(param);
      expect(router.navigateByUrl).toHaveBeenCalledTimes(1);
      expect(router.navigateByUrl).toHaveBeenCalledWith(
        "/detail/" + encodeURIComponent(param.doi)
      );
    });
  });
});
