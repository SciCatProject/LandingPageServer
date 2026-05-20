import { TestBed } from "@angular/core/testing";
import { AppConfig, AppConfigService } from "./app-config.service";
import { provideHttpClient } from "@angular/common/http";
import {
  HttpTestingController,
  provideHttpClientTesting,
} from "@angular/common/http/testing";

describe("AppConfigService", () => {
  let service: AppConfigService;
  let httpTesting: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AppConfigService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });
    httpTesting = TestBed.inject(HttpTestingController);
    service = TestBed.inject(AppConfigService);
  });

  it("should be created", () => {
    expect(httpTesting).toBeTruthy();
    expect(service).toBeTruthy();
  });

  it("should load app config from backend", async () => {
    const mockConfig = {
      production: false,
      logoWidth: "500",
      facility: "test-facility",
      oaiProviderRoute: "test-oai",
      doiBaseUrl: "test-doi",
      directMongoAccess: false,
      accessDataHref: "test-access",
      accessInstructions: "test-instructions",
      scicatBaseUrl: "test-scicat",
      logoBanner: "test-logo",
      lbBaseUrl: "test-lb",
      statusMessage: "test-status",
      statusCode: "INFO",
      contactEmail: "test-contact",
    };
    const configPromise = service.loadAppConfig();
    const req = httpTesting.expectOne("/config");
    expect(req.request.method).toBe("GET");
    req.flush(mockConfig);
    await configPromise;
    console.log("Config loaded:", service.getConfig());
    expect(service.getConfig()).toEqual(mockConfig as AppConfig);
  });

  it("should set defaults for status banner and help if not provided", async () => {
    const mockConfig = {
      production: false,
      logoWidth: "500",
      facility: "test-facility",
      oaiProviderRoute: "test-oai",
      doiBaseUrl: "test-doi",
      directMongoAccess: false,
      accessDataHref: "test-access",
      accessInstructions: "test-instructions",
      scicatBaseUrl: "test-scicat",
      logoBanner: "test-logo",
      lbBaseUrl: "test-lb",
    };
    const configPromise = service.loadAppConfig();
    const req = httpTesting.expectOne("/config");
    expect(req.request.method).toBe("GET");
    req.flush(mockConfig);
    await configPromise;
    const config = service.getConfig();
    expect(config.statusMessage).toBe("");
    expect(config.statusCode).toBe("NONE");
    expect(config.contactEmail).toBe("");
  });
});
