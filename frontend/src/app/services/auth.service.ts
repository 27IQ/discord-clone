import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { UserLoginDto } from '../classes/user-login-dto';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private http = inject(HttpClient)

  //TODO change localhost

  login(user: UserLoginDto) {
    return this.http.post(`http://localhost:8080/api/users/login`, user, { withCredentials: true })
  }

  whoAmI() {
    return this.http.get(`http://localhost:8080/api/users/whoAmI`, { withCredentials: true })
  }

}
