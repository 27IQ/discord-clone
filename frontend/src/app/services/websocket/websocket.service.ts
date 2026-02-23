import { Injectable } from '@angular/core';
import { Client } from '@stomp/stompjs';

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {

  private resolveGate!: () => void;
  private gate: Promise<void>

  private client: Client

  constructor() {
    this.gate = new Promise<void>((resolve) => {
      this.resolveGate = resolve;
    });

    this.client = new Client({
      //TODO change from localhost
      //TODO change to wss when ready
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
      onConnect: () => {
        this.resolveGate()
      }
    })
  }

  public async getClient(): Promise<Client> {
    await this.gate
    return this.client
  }

  public activate() {
    this.client.activate()
  }
}
