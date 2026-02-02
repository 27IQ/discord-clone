import { Guild } from './guild';

describe('Guild', () => {
  it('should create an instance', () => {
    expect(new Guild("1", "G")).toBeTruthy();
  });
});
