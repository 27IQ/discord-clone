import { Injectable } from '@angular/core';
import { Client, StompSubscription } from '@stomp/stompjs';
import { Channel } from '../../classes/channel';
import { ChannelType } from '../../enums/channel-type';
import { VoiceJoinEvent } from './messages/voice-join-event';
import { GatewayEvent } from './messages/base/gateway-type';
import { VoiceLeaveEvent } from './messages/voice-leave-event';

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  //TODO change from localhost
  //TODO change to wss when ready
  client = new Client({
    brokerURL: 'ws://localhost:8080/ws/websocket',
    debug: (str) => {
      console.log(str);
    },
    reconnectDelay: 5000,
    heartbeatIncoming: 4000,
    heartbeatOutgoing: 4000,
    onStompError: (frame) => {
      console.error('Broker error:', frame.headers['message'])
      console.error('Details:', frame.body)
    },
    onWebSocketError: (error) => {
      console.error('WebSocket error', error)
    },
  })

  activate() {
    this.client.activate()
  }

  deactivate() {
    this.client.deactivate()
  }

  voiceChannelSubscribtion: StompSubscription | null = null

  voiceJoin(channel: Channel) {
    //TODO change to throw
    if (channel.channelType !== ChannelType.VOICE_CHANNEL)
      return

    this.client.publish({ destination: "/app/chat", body: JSON.stringify({ channelId: channel.id } as VoiceJoinEvent) })
    this.voiceChannelSubscribtion = this.client.subscribe(`/topic/channel.${channel.id}`, (message) => {
      const event: GatewayEvent = JSON.parse(message.body)

      switch (event.type) {
        case "VOICE_JOIN":

          break;
        case "VOICE_LEAVE":

          break;
        default:
          break;
      }
    })
  }

  voiceLeave() {
    //TODO change to throw
    if (this.voiceChannelSubscribtion === null)
      return;

    this.client.publish({ destination: "/app/chat", body: JSON.stringify({} as VoiceLeaveEvent) })
    this.voiceChannelSubscribtion.unsubscribe();
    this.voiceChannelSubscribtion = null
  }

  currentUserIsInChannel() {
    return this.voiceChannelSubscribtion !== null
  }
}
