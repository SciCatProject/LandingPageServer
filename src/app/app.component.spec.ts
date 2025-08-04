import { fakeAsync, TestBed, waitForAsync } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { AppComponent } from "./app.component";
import { MatToolbarModule } from "@angular/material/toolbar";
import { HttpClientModule } from "@angular/common/http";
import { APP_DYN_CONFIG } from "./app-config.service";
import { MockAppConfigService } from "./shared/MockStubs";
import { LoopBackConfig } from "./shared/sdk";
import { StatusMessageModule } from "./shared/modules/status-message/status-message.module";

describe("AppComponent", () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        MatToolbarModule,
        RouterTestingModule,
        HttpClientModule,
        StatusMessageModule,
      ],
      declarations: [AppComponent],
      providers: [{ provide: APP_DYN_CONFIG, useClass: MockAppConfigService }],
    }).compileComponents();
  }));

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

  it(`should test app config values'`, fakeAsync(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    expect(app.config.scicatBaseUrl).toEqual("https://scicat.esss.se");
    expect(app.config.lbBaseUrl).toEqual("https://scicat.esss.se/api");
    expect(LoopBackConfig.getPath()).toEqual("https://scicat.esss.se/api");
  }));
});
