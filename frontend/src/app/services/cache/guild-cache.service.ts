import { inject, Injectable } from '@angular/core';
import { Guild, GuildData, GuildSummeryEntry } from '../../classes/guild';
import { GuildService } from '../guild.service';
import { GenericCacheService } from './base/generic-cache-service';
import { WebsocketService } from '../websocket/websocket.service';

@Injectable({
  providedIn: 'root',
})
export class GuildCacheService extends GenericCacheService<GuildData, Guild> {
  private guildService = inject(GuildService)
  private websocketService = inject(WebsocketService)

  constructor() {
    super()
    this.initialise()
  }

  protected override initialise(): void {
    console.log('initialising guild cache ...');
    this.guildService.getCurrentUsersGuilds().subscribe({
      next: (response) => {
        const guilds = response as GuildSummeryEntry[]
        guilds.forEach((guild) => {
          this.cache.register(new Guild(guild.id, this.websocketService));
        })
        this.resolveGate();
      },
      error: (err) => {
        console.error(err);
        this.resolveGate();
      }
    })
  }
}