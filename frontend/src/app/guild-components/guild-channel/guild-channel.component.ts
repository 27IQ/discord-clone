import { Component, effect, inject, input, Signal } from '@angular/core';
import { ChannelData, ChannelIdDTO } from '../../classes/channel';
import { CommonModule } from '@angular/common';
import { GuildChannelUserPreviewComponent } from '../guild-channel-user-preview/guild-channel-user-preview.component';;
import { ChannelCacheService } from '../../services/cache/channel-cache.service';

@Component({
  selector: 'app-guild-channel',
  imports: [CommonModule, GuildChannelUserPreviewComponent],
  templateUrl: './guild-channel.component.html',
  styleUrl: './guild-channel.component.css',
})
export class GuildChannelComponent {

  channelId = input<ChannelIdDTO>()
  channelCache = inject(ChannelCacheService)
  channel: Signal<ChannelData> | undefined

  constructor() {
    effect(() => {
      const id = this.channelId()
      if (!id) return

      this.channel = this.channelCache.cache.getSignal(id.id)
    })
  }

  interact() {
    if (this.channelId() === undefined)
      return

    const channel = this.channelCache.cache.get(this.channelId()!.id)

    if (!channel) {
      console.error(`channel not in cache`)
      return
    }

    channel.interact()
  }
}