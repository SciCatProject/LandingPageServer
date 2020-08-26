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
});
