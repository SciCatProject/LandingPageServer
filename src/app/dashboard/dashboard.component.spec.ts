import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";

import { DashboardComponent } from "./dashboard.component";
import { APP_CONFIG } from "../app-config.module";
import { Router } from "@angular/router";
import { MatCardModule } from "@angular/material/card";
import { SharedModule } from "../shared/shared.module";
import { DatePipe } from "@angular/common";
import { DatasourceService } from "../datasource.service";
import { MockDatasourceService } from "../shared/MockStubs";

describe("DashboardComponent", () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  const router = {
    navigateByUrl: jasmine.createSpy("navigateByUrl"),
  };

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [DashboardComponent],
        imports: [MatCardModule, SharedModule],
        providers: [
          DatePipe,
          {
            provide: APP_CONFIG,
            useValue: {
              facility: "ess",
              directMongoAccess: true,
            },
          },
          { provide: Router, useValue: router },
          { provide: DatasourceService, useClass: MockDatasourceService },
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  describe("#onRowClick()", () => {
    it("should navigate to publication details of the provided doi", () => {
      const param = { doi: "testDOI" };
      component.onRowClick(param);
      expect(router.navigateByUrl).toHaveBeenCalledTimes(1);
      expect(router.navigateByUrl).toHaveBeenCalledWith(
        "/detail/" + encodeURIComponent(param.doi)
      );
    });
  });
});
