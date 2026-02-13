import { Component, inject, input } from '@angular/core';
import { Channel } from '../../classes/channel';
import { CommonModule } from '@angular/common';
import { GuildChannelUserPreviewComponent } from '../guild-channel-user-preview/guild-channel-user-preview.component';
import { ChannelType } from '../../enums/channel-type';
import { WebsocketService } from '../../services/websocket/websocket.service';

@Component({
  selector: 'app-guild-channel',
  imports: [CommonModule, GuildChannelUserPreviewComponent],
  templateUrl: './guild-channel.component.html',
  styleUrl: './guild-channel.component.css',
})
export class GuildChannelComponent {
  websocketService = inject(WebsocketService)
  channel = input.required<Channel>()

  joinChannel() {
    switch (this.channel().channelType) {
      case ChannelType.VOICE_CHANNEL:
        this.websocketService.voiceJoin(this.channel())
        break;
      case ChannelType.TEXT_CHANNEL:
        //TODO implement text channels
        break;

      default:
        break;
    }
  }
}
