import { Injectable } from '@angular/core';
import { Client } from '@stomp/stompjs';

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
}
