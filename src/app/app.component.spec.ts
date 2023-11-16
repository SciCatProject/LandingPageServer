import { TestBed, waitForAsync } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { AppComponent } from "./app.component";
import { APP_CONFIG } from "./app-config.module";
import { MatToolbarModule } from "@angular/material/toolbar";
import { HttpClientModule } from "@angular/common/http";
import { APP_DYN_CONFIG, AppConfig, AppConfigService } from "./app-config.service";
import { MockAppConfigService } from "./shared/MockStubs";

describe("AppComponent", () => {
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [MatToolbarModule, RouterTestingModule, HttpClientModule],
        declarations: [AppComponent],
        providers: [
          {
            provide: APP_CONFIG,
            useValue: {
              production: false,
            },
          },
          {provide: APP_DYN_CONFIG, useClass: MockAppConfigService},
        ],
      }).compileComponents();
    })
  );

  it("should create the app", () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'ESS Public Data Repository test'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual("ESS Public Data Repository test");
  });
});
