import { CacheException } from './cache-exception';

describe('CacheException', () => {
  it('should create an instance', () => {
    expect(new CacheException("")).toBeTruthy();
  });
});
