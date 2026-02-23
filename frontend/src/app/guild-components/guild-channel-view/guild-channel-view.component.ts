import { Component, inject, OnInit, Signal } from "@angular/core";
import { CommonModule } from "@angular/common";
import { GuildCacheService } from "../../services/cache/guild-cache.service";
import { SidebarDataService } from "../../services/data-services/sidebar-data.service";
import { ChannelData } from "../../classes/channel";
import { ChannelCacheService } from "../../services/cache/channel-cache.service";
import { GuildChannelComponent } from "../guild-channel/guild-channel.component";


@Component({
  selector: 'app-guild-channel-view',
  standalone: true,
  imports: [GuildChannelComponent, CommonModule],
  templateUrl: './guild-channel-view.component.html',
  styleUrl: './guild-channel-view.component.css',
})
export class GuildChannelViewComponent implements OnInit {
  sideBarDataService = inject(SidebarDataService);
  guildCacheService = inject(GuildCacheService);
  channelCacheService = inject(ChannelCacheService)

  guildId = this.sideBarDataService.currentPageView().id!;
  channels: Signal<ChannelData>[] = []

  async ngOnInit(): Promise<void> {

    const guildCache = await this.guildCacheService.getCache()
    const guild = guildCache.getSignal(this.guildId)

    if (!guild) {
      console.error("guild is undefined")
      return
    }

    const channelIds = guild().channels

    const channelCache = await this.channelCacheService.getCache()

    const out = channelIds
      .map((id) => channelCache.getSignal(id.id))
      .filter((signal) => signal !== undefined)

    this.channels = out
  }
}
