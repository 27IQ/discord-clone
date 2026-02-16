import { Component, inject, input, OnDestroy, OnInit, signal } from '@angular/core';
import { Channel, ChannelIdDTO } from '../../classes/channel';
import { CommonModule } from '@angular/common';
import { GuildChannelUserPreviewComponent } from '../guild-channel-user-preview/guild-channel-user-preview.component';
import { WebsocketService } from '../../services/websocket/websocket.service';
import { StompSubscription } from '@stomp/stompjs';
import { ChannelType } from '../../enums/channel-type';
import { ChannelEvent } from '../../websocket/channel-event';
import { BaseEnvelope } from '../../websocket/message/base/base-envelope';
import { MessageType } from '../../websocket/message/base/message-type';
import { Crud } from '../../websocket/message/base/crud';
import { VoiceEvent } from '../../websocket/voice-event';
import { Status } from '../../websocket/message/base/status';

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
  userChannelSubscribtion: StompSubscription | null = null;
  mainChannelSubscribtion: StompSubscription | null = null;

  connected = false

  ngOnInit(): void {
    this.prepareChannel()
  }

  ngOnDestroy(): void {
    this.userChannelSubscribtion?.unsubscribe()
    this.userChannelSubscribtion = null

    this.mainChannelSubscribtion?.unsubscribe()
    this.mainChannelSubscribtion = null
  }

  interact() {
    switch (this.channel().channelType) {
      case ChannelType.VOICE_CHANNEL:
        {
          //TODO this should check the username when receiving channel events to determine the connected variable
          if (!this.connected) {
            this.joinChannel()
            this.connected = true
          } else {
            this.leaveChannel()
            this.connected = false
          }
          break;
        }
      case ChannelType.TEXT_CHANNEL:
        //TODO implement text channels
        break;

      default:
        break;
    }
  }

  joinChannel() {
    const msg: VoiceEvent = {
      type: MessageType.VOICE,
      status: Status.START,
      channelId: this.channelId().id,
    };

    this.websocketService.client.publish({
      destination: "/app/channel", body: JSON.stringify(msg)
    })
  }

  leaveChannel() {
    const msg: VoiceEvent = {
      type: MessageType.VOICE,
      status: Status.END,
      channelId: this.channelId().id,
    };

    this.websocketService.client.publish({
      destination: "/app/channel", body: JSON.stringify(msg)
    })
  }

  prepareChannel() {

    this.userChannelSubscribtion = this.subscribe("/user/topic/channel")
    this.mainChannelSubscribtion = this.subscribe("/topic/channel")

    const msg: ChannelEvent = {
      type: MessageType.CHANNEL,
      crud: Crud.READ,
      channelId: this.channelId().id,
      channel: undefined,
    };

    this.websocketService.client.publish({
      destination: "/app/channel", body: JSON.stringify(msg)
    })
  }

  subscribe(path: string) {
    return this.websocketService.client.subscribe(`${path}.${this.channelId().id}`, (message) => {

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
  }

  handleChannelEvent(event: ChannelEvent) {
    switch (event.crud) {
      case Crud.UPDATE:
        if (!event.channel)
          return
        this.channel.set(event.channel)
        console.log(this.channel())
        break

      case Crud.DELETE:
        //TODO implement
        console.warn("not implemented")
        break;
    }
  }
}