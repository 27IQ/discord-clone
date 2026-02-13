import { CacheEvent } from './cache-event';
import { CacheTransaction } from './cache-transaction';

describe('CacheTransaction', () => {
  it('should create an instance', () => {
    expect(new CacheTransaction(CacheEvent.UPDATE, "")).toBeTruthy();
  });
});
