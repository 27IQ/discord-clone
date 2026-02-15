import { Component, inject, input, OnDestroy, OnInit, signal } from '@angular/core';
import { Channel, ChannelIdDTO } from '../../classes/channel';
import { CommonModule } from '@angular/common';
import { GuildChannelUserPreviewComponent } from '../guild-channel-user-preview/guild-channel-user-preview.component';
import { WebsocketService } from '../../services/websocket/websocket.service';
import { StompSubscription } from '@stomp/stompjs';
import { MessageType } from '../../classes/messages/message-type';
import { Crud } from '../../classes/messages/crud';
import { BaseEnvelope } from '../../classes/messages/base-envelope';
import { ChannelEvent } from '../../classes/messages/channel-event';

@Component({
  selector: 'app-guild-channel',
  imports: [CommonModule, GuildChannelUserPreviewComponent],
  templateUrl: './guild-channel.component.html',
  styleUrl: './guild-channel.component.css',
})
export class GuildChannelComponent implements OnInit, OnDestroy {

  websocketService = inject(WebsocketService)
  channelId = input.required<ChannelIdDTO>()
  channel = signal<Channel>(new Channel())
  channelSubscribtion: StompSubscription | null = null;

  ngOnInit(): void {
    this.prepareChannel()
  }

  ngOnDestroy(): void {
    this.channelSubscribtion?.unsubscribe()
  }

  joinChannel() {
    switch (this.channel().channelType) {
      case ChannelType.VOICE_CHANNEL:
        //this.websocketService.voiceJoin(this.channel())
        break;
      case ChannelType.TEXT_CHANNEL:
        //TODO implement text channels
        break;

      default:
        break;
    }
  }

  prepareChannel() {

    this.channelSubscribtion = this.websocketService.client.subscribe(`/user/topic/channel.${this.channelId().id}`, (message) => {

      const envelope = (JSON.parse(message.body) as BaseEnvelope);

      switch (envelope.type) {
        case MessageType.CHANNEL:
          this.handleChannelEvent(envelope as ChannelEvent)
          break

        case MessageType.MESSAGE:
          //TODO implement
          console.warn("not implemented")
          break

        default:

      }
    })

    this.websocketService.client.publish({
      destination: "/app/channel", body: JSON.stringify(new ChannelEvent(MessageType.CHANNEL, Crud.READ, this.channelId().id))
    })
  }

  handleChannelEvent(event: ChannelEvent) {
    switch (event.crud) {
      case Crud.UPDATE:
        if (!event.channel)
          return
        this.channel.set(event.channel)
        break

      case Crud.DELETE:
        //TODO implement
        console.warn("not implemented")
        break;
    }
  }
}
