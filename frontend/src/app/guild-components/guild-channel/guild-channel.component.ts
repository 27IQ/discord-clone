import { Component, inject, input, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChannelData } from '../../classes/channel';
import { GuildChannelUserPreviewComponent } from '../guild-channel-user-preview/guild-channel-user-preview.component';
import { ChannelCacheService } from '../../services/cache/channel-cache.service';


@Component({
  selector: 'app-guild-channel',
  standalone: true,
  imports: [CommonModule, GuildChannelUserPreviewComponent],
  templateUrl: './guild-channel.component.html',
  styleUrl: './guild-channel.component.css',
})
export class GuildChannelComponent {

  channel = input.required<Signal<ChannelData>>()
  channelCacheService = inject(ChannelCacheService)

  async interact() {
    const id = this.channel()()?.id;
    if (!id) return;

    const channelCache = await this.channelCacheService.getCache()

    const channel = channelCache.get(id);

    if (!channel) {
      console.error(`channel not in cache`);
      return;
    }

    channel.interact();
  }
}