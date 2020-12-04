import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublisheddataDetailsComponent } from './publisheddata-details.component';
import { APP_CONFIG } from '../app-config.module';
import { OAIService } from '../oai.service';
import {
  MockOAIService,
  MockPublishedDataService,
  MockActivatedRoute,
} from '../shared/MockStubs';
import { PublishedDataService } from '../published-data.service';
import { ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';

describe('PublisheddataDetailsComponent', () => {
  let component: PublisheddataDetailsComponent;
  let fixture: ComponentFixture<PublisheddataDetailsComponent>;

  const scicatBaseUrl = 'https://scicat.esss.se';

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PublisheddataDetailsComponent],
      imports: [MatCardModule, MatListModule],
      providers: [
        {
          provide: APP_CONFIG,
          useValue: {
            doiBaseUrl: 'https://doi.org/',
            production: false,
            accessDataHref: null,
            directMongoAccess: true,
            facility: 'ess',
            accessInstructions:
              'Instructions: Login with brightness username and password',
            scicatBaseUrl,
          },
        },
        { provide: ActivatedRoute, useClass: MockActivatedRoute },
        { provide: OAIService, useClass: MockOAIService },
        { provide: PublishedDataService, useClass: MockPublishedDataService },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublisheddataDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('#onPidClick()', () => {
    it('should call window.open', () => {
      const openSpy = spyOn(window, 'open');

      const testPid = '20.500.12269/TEST-PID';
      const encodedPid = encodeURIComponent(testPid);

      component.onPidClick(testPid);

      expect(openSpy).toHaveBeenCalledTimes(1);
      expect(openSpy).toHaveBeenCalledWith(
        scicatBaseUrl + '/datasets/' + encodedPid,
        '_blank'
      );
    });
  });

  describe('#isUrl()', () => {
    it('should return false if dataDescription is not URL', () => {
      const dataDescription = 'Not URL';

      const isUrl = component.isUrl(dataDescription);

      expect(isUrl).toEqual(false);
    });

    it('should return true if dataDescription is URL', () => {
      const dataDescription = 'https://github.com/ess-dmsc/ess_file_formats/wiki/NeXus';

      const isUrl = component.isUrl(dataDescription);

      expect(isUrl).toEqual(true);
    });
  });
});
