import {inject, async, TestBed} from '@angular/core/testing';

import {MessageService} from './message.service';

describe('MessageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MessageService]
    });
  });

  it('should be created', async(inject([MessageService], (service: MessageService) => {
    expect(service).toBeTruthy();
  })));
});
