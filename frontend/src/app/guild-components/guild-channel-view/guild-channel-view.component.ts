import { Component, inject, signal } from '@angular/core';
import { GuildService } from '../../services/guild.service';
import { SidebarDataService } from '../../services/data-services/sidebar-data.service';
import { GuildSummeryEntry } from '../../classes/guild';
import { Channel, ChannelIdDTO } from '../../classes/channel';
import { GuildChannelComponent } from '../guild-channel/guild-channel.component';
import { CommonModule } from '@angular/common';
import { ChannelCacheService } from '../../services/cache/channel-cache.service';
import { WebsocketService } from '../../services/websocket/websocket.service';

@Component({
  selector: 'app-guild-channel-view',
  imports: [GuildChannelComponent, CommonModule],
  templateUrl: './guild-channel-view.component.html',
  styleUrl: './guild-channel-view.component.css',
})
export class GuildChannelViewComponent {
  guildService = inject(GuildService)
  sideBarDataService = inject(SidebarDataService)
  guild = signal<GuildSummeryEntry>({} as GuildSummeryEntry)
  channelCache = inject(ChannelCacheService)
  websocketService = inject(WebsocketService)
  channelIds = signal<ChannelIdDTO[] | undefined>(undefined)

  constructor() {
    const guildId = this.sideBarDataService.currentPageView().id
    // TODO guildId! scary
    this.guildService.getGuildById(guildId!).subscribe({
      next: (response) => {
        this.guild.set(response as GuildSummeryEntry)
        this.guildService.getChannelsByGuildId(this.guild().id).subscribe({
          next: (response) => {
            this.channelIds.set(response as ChannelIdDTO[])

            //TODO this is shit

            this.channelIds()!.forEach((channelId) => {
              try {
                this.channelCache.cache.register(new Channel(channelId.id, this.websocketService))
              } catch (error) {
                console.error(error)
              }
            })
          },
          error: (err) => {
            console.error(err)
          }
        })
      },
      error: (err) => {
        console.error(err);
      }
    })
  }
}
