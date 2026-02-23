import { inject, Injectable } from '@angular/core';
import { Channel, ChannelData, ChannelIdDTO } from '../../classes/channel';
import { GenericCacheService } from './base/generic-cache-service';
import { ChannelService } from '../channel.service';
import { WebsocketService } from '../websocket/websocket.service';

@Injectable({
  providedIn: 'root',
})
export class ChannelCacheService extends GenericCacheService<ChannelData, Channel> {
  private channelService = inject(ChannelService)
  private websocketService = inject(WebsocketService)

  constructor() {
    super()
    this.initialise()
  }

  protected override initialise(): void {
    console.log('initialising channel cache ...');
    this.channelService.getCurrentUsersChannels().subscribe({
      next: (response) => {
        const channelIds = response as ChannelIdDTO[]
        channelIds.forEach((id) => {
          this.cache.register(new Channel(id.id, this.websocketService))
        })
        this.resolveGate();
      },
      error: (err) => {
        console.log(err)
        this.resolveGate();
      }
    })
  }
}
