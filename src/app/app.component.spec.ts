import { fakeAsync, TestBed, waitForAsync } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { AppComponent } from "./app.component";
import { MatToolbarModule } from "@angular/material/toolbar";
import { HttpClientModule } from "@angular/common/http";
import { APP_DYN_CONFIG } from "./app-config.service";
import { MockAppConfigService } from "./shared/MockStubs";
import { LoopBackConfig } from "./shared/sdk";
import { StatusMessageModule } from "./shared/modules/status-message/status-message.module";
import { Router } from "@angular/router";
import { By } from "@angular/platform-browser";

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

  it("should set the title from the configured facility", () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual("THE_FACILITY Public Data Repository test");
  });

  it(`should test app config values'`, fakeAsync(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    expect(app.config.scicatBaseUrl).toEqual("https://scicat.eu/scicat");
    expect(app.config.lbBaseUrl).toEqual("https://scicat.eu/api");
    expect(LoopBackConfig.getPath()).toEqual("https://scicat.eu/api");
  }));

  it(`should navigate to home when clicking the title'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();

    const router = TestBed.inject(Router);
    const navigateSpy = spyOn(router, "navigate");

    const titleEl = fixture.debugElement.query(By.css(".title-click"));
    expect(titleEl).toBeTruthy();

    titleEl.nativeElement.click();
    expect(navigateSpy).toHaveBeenCalledWith(["/"]);
  });

  it("should render footer message links from config", () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();

    const footerLinks = fixture.debugElement.query(By.css(".footer-links"));
    const anchors = footerLinks.queryAll(By.css("a"));

    expect(footerLinks.nativeElement.textContent).toContain(
      "For more information visit SciCat:",
    );
    expect(footerLinks.query(By.css("strong")).nativeElement.textContent).toBe(
      "SciCat",
    );
    expect(anchors.length).toBe(2);
    expect(anchors[0].nativeElement.textContent).toBe("Data policy");
    expect(anchors[0].nativeElement.href).toBe("https://scicat.eu/data-policy");
    expect(anchors[1].nativeElement.textContent).toBe("Documentation");
    expect(anchors[1].nativeElement.href).toBe(
      "https://scicat.eu/documentation",
    );
  });
});
