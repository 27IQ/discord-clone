import { Component, inject, signal } from '@angular/core';
import { GuildService } from '../../services/guild.service';
import { SidebarDataService } from '../../services/data-services/sidebar-data.service';
import { Guild } from '../../classes/guild';
import { Channel } from '../../classes/channel';
import { GuildChannelComponent } from '../guild-channel/guild-channel.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-guild-channel-view',
  imports: [GuildChannelComponent, CommonModule],
  templateUrl: './guild-channel-view.component.html',
  styleUrl: './guild-channel-view.component.css',
})
export class GuildChannelViewComponent {
  guildService = inject(GuildService)
  sideBarDataService = inject(SidebarDataService)
  guild = signal<Guild | null>(null)
  channels = signal<Channel[] | null>(null)


  constructor() {
    const guildId = this.sideBarDataService.currentPageView().id
    // TODO guildId! scary
    this.guildService.getGuildById(guildId!).subscribe({
      next: (response) => {
        this.guild.set(response as Guild)
        this.channels.set(this.guild()!.channels)
        console.log(`guild ${this.guild()!.name} has loaded successfully`)
        console.log(this.guild)
      },
      error: (err) => {
        console.error(err);
      }
    })
  }
}
