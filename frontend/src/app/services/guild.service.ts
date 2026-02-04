import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GuildService {

  private http = inject(HttpClient)


  //TODO change localhost
  getCurrentUsersGuilds() {
    return this.http.get(`http://localhost:8080/api/guilds/myguilds`, { withCredentials: true })
  }

  //TODO change this shit to not use a path variable empty body on post looks stupid
  createNewGuild(name: string) {
    return this.http.post(`http://localhost:8080/api/guilds/create/${name}`, "", { withCredentials: true })
  }

  getGuildById(id: string) {
    return this.http.get(`http://localhost:8080/api/guilds/guild/${id}`, { withCredentials: true })
  }
}
