import { Component, inject, signal } from '@angular/core';
import { GuildService } from '../../services/guild.service';
import { SidebarDataService } from '../../services/data-services/sidebar-data.service';
import { GuildSummeryEntry } from '../../classes/guild';
import { ChannelIdDTO } from '../../classes/channel';
import { GuildChannelComponent } from '../guild-channel/guild-channel.component';
import { CommonModule } from '@angular/common';
import { ChannelCacheService } from '../../services/data-services/channel-cache.service';

@Component({
  selector: 'app-guild-channel-view',
  imports: [GuildChannelComponent, CommonModule],
  templateUrl: './guild-channel-view.component.html',
  styleUrl: './guild-channel-view.component.css',
})
export class GuildChannelViewComponent {
  guildService = inject(GuildService)
  channelCacheService = inject(ChannelCacheService)
  sideBarDataService = inject(SidebarDataService)
  guild = signal<GuildSummeryEntry>({} as GuildSummeryEntry)
  channelIds = signal<ChannelIdDTO[]>([])



  constructor() {
    const guildId = this.sideBarDataService.currentPageView().id
    // TODO guildId! scary
    this.guildService.getGuildById(guildId!).subscribe({
      next: (response) => {
        this.guild.set(response as GuildSummeryEntry)
        this.guildService.getChannelsByGuildId(this.guild().id).subscribe({
          next: (response) => {
            console.log(response)
            this.channelIds.set(response as ChannelIdDTO[])
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
