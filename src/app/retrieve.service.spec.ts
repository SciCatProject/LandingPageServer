import { TestBed, waitForAsync } from "@angular/core/testing";
import { APP_CONFIG, AppConfigModule } from "./app-config.module";
import { DatasourceService } from "./datasource.service";
import { RetrieveService } from "./retrieve.service";
import { MockAppConfigService, MockDatasourceService } from "./shared/MockStubs";
import { Job } from "./shared/sdk";
import { HttpClientModule } from "@angular/common/http";
import { APP_DYN_CONFIG, AppConfigService } from "./app-config.service";

describe("ArchivingService", () => {
  let service: RetrieveService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, AppConfigModule],
      providers: [
        {provide: APP_DYN_CONFIG, useClass: MockAppConfigService},
        RetrieveService,
        { provide: DatasourceService, useClass: MockDatasourceService },
        {
          provide: APP_CONFIG,
          useValue: {
            production: false,
          }
        }
      ],
    });
    service = TestBed.inject(RetrieveService);
  }));

  afterEach(() => {
    jasmine.clock().uninstall();
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  describe("#retriveDialogOptions()", () => {
    it("should return dialog options based on config", () => {
      expect(service.retriveDialogOptions()).toEqual({
        width: "auto",
        data: {
          title: "An email",
          confirmMessage: "aMessage"
        },
      });
    });
  });

  describe("#retrieve()", () => {
    it("should return dialog options based on config", () => {
      jasmine.clock().install();
      jasmine.clock().mockDate(new Date("2023-01-01"));
      const postJobSpy = spyOn(service["datasourceService"], "postJob");
      service.retrieve("test@email.com", ["pid1", "pid2"]);
      expect(postJobSpy).toHaveBeenCalledOnceWith(
        new Job({
          jobParams: {
            username: "lp_service",
            option: "URLs"
          },
          emailJobInitiator: "test@email.com",
          creationTime: new Date("2023-01-01"),
          datasetList: [
            {pid: "pid1", files: []},
            {pid: "pid2", files: []}
          ],
          type: "public",
        })
      );
    });
  });

});
