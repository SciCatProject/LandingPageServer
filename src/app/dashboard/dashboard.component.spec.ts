import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";

import { DashboardComponent } from "./dashboard.component";
import { Router } from "@angular/router";
import { MatCardModule } from "@angular/material/card";
import { DatePipe } from "@angular/common";
import { DatasourceService } from "../datasource.service";
import {
  MockAppConfigService,
  MockDatasourceService,
} from "../shared/MockStubs";
import { TableModule } from "../shared/modules/table/table.module";
import { HttpClientModule } from "@angular/common/http";
import { APP_DYN_CONFIG } from "../app-config.service";

describe("DashboardComponent", () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  const router = {
    navigateByUrl: jasmine.createSpy("navigateByUrl"),
  };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardComponent],
      imports: [MatCardModule, TableModule, HttpClientModule],
      providers: [
        DatePipe,
        { provide: APP_DYN_CONFIG, useClass: MockAppConfigService },
        { provide: Router, useValue: router },
        { provide: DatasourceService, useClass: MockDatasourceService },
      ],
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

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("uses the configured lighter primary colors for the dashboard title", () => {
    fixture.nativeElement.style.setProperty(
      "--theme-primary-lighter",
      "rgb(210, 220, 230)",
    );
    fixture.nativeElement.style.setProperty(
      "--theme-primary-lighter-contrast",
      "rgb(20, 30, 40)",
    );
    const title = fixture.nativeElement.querySelector(".dashboard-title");
    expect(getComputedStyle(title).backgroundColor).toBe("rgb(210, 220, 230)");
    expect(getComputedStyle(title).color).toBe("rgb(20, 30, 40)");
  });

  describe("#onRowClick()", () => {
    it("should navigate to publication details of the provided doi", () => {
      const param = { doi: "testDOI" };
      component.onRowClick(param);
      expect(router.navigateByUrl).toHaveBeenCalledTimes(1);
      expect(router.navigateByUrl).toHaveBeenCalledWith(
        "/detail/" + encodeURIComponent(param.doi),
      );
    });
  });
});
