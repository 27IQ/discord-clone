import { UserLoginDto } from './user-login-dto';

describe('UserLoginDto', () => {
  it('should create an instance', () => {
    expect(new UserLoginDto("testo", "12345678")).toBeTruthy();
  });
});
