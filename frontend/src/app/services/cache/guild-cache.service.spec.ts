import { TestBed } from '@angular/core/testing';

import { GuildCacheService } from './guild-cache.service';

describe('GuildCacheService', () => {
  let service: GuildCacheService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GuildCacheService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
