import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";

import { DashboardComponent } from "./dashboard.component";
import { APP_CONFIG } from "../app-config.module";
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
        {
          provide: APP_CONFIG,
          useValue: {
            facility: "ess",
            directMongoAccess: true,
          },
        },
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
