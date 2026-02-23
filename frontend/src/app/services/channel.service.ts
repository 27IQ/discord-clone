import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ChannelService {
  private http = inject(HttpClient)

  //TODO change localhost
  getCurrentUsersChannels() {
    return this.http.get(`http://localhost:8080/api/channel/getAll`, { withCredentials: true })
  }
}
