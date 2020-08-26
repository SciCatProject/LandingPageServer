import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';
import { APP_CONFIG } from '../app-config.module';
import { Router } from '@angular/router';
import { PublishedDataService } from '../published-data.service';
import { MockPublishedDataService, MockOAIService } from '../shared/MockStubs';
import { OAIService } from '../oai.service';
import { MatCardModule } from '@angular/material/card';
import { SharedModule } from '../shared/shared.module';
import { DatePipe } from '@angular/common';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  const router = {
    navigateByUrl: jasmine.createSpy('navigateByUrl'),
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardComponent],
      imports: [MatCardModule, SharedModule],
      providers: [
        DatePipe,
        {
          provide: APP_CONFIG,
          useValue: {
            facility: 'ess',
            directMongoAccess: true,
          },
        },
        { provide: Router, useValue: router },
        { provide: OAIService, useClass: MockOAIService },
        { provide: PublishedDataService, useClass: MockPublishedDataService },
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

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('#onRowClick()', () => {
    it('should navigate to publication details of the provided doi', () => {
      const param = { doi: 'testDOI' };
      component.onRowClick(param);
      expect(router.navigateByUrl).toHaveBeenCalledTimes(1);
      expect(router.navigateByUrl).toHaveBeenCalledWith(
        '/detail/' + encodeURIComponent(param.doi)
      );
    });
  });
});
