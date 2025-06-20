import { ComponentFixture, TestBed } from "@angular/core/testing";

import { StatusBannerComponent } from "./status-banner.component";
import { APP_CONFIG } from "src/app/app-config.module";

describe("StatusBannerComponent", () => {
  let component: StatusBannerComponent;
  let fixture: ComponentFixture<StatusBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StatusBannerComponent],
      providers: [
        {
          provide: APP_CONFIG,
          useValue: {
            facility: "ess",
            production: false,
          },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatusBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
