import { inject, Injectable } from '@angular/core';
import { ChannelService } from '../channel.service';

@Injectable({
  providedIn: 'root',
})
export class ChannelCacheService {

  private channelService = inject(ChannelService)

  /*public channelCache = new GenericCache<Channel>("channel-cache", () => {
    let out: Channel[] = []
    this.channelService.getCurrentUsersChannels().subscribe({
      next: (response) => {
        out = response as Channel[]
      },
      error: (err) => {
        console.error(err)
      }
    })
    return out;
  })*/
}
