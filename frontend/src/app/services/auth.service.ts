import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { UserLoginDto } from '../classes/user-login-dto';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private http = inject(HttpClient)

  login(user: UserLoginDto) {
    return this.http.post(`localhost:8080/login`, user)
  }

}
