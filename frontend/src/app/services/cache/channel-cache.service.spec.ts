import { TestBed } from '@angular/core/testing';

import { ChannelCacheService } from './channel-cache.service';

describe('ChannelCacheService', () => {
  let service: ChannelCacheService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChannelCacheService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
