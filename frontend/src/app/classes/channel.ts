import { StompSubscription } from "@stomp/stompjs";
import { ChannelType } from "../enums/channel-type";
import { ChannelEvent } from "../websocket/channel-event";
import { BaseEnvelope } from "../websocket/message/base/base-envelope";
import { Crud } from "../websocket/message/base/crud";
import { MessageType } from "../websocket/message/base/message-type";
import { Status } from "../websocket/message/base/status";
import { VoiceEvent } from "../websocket/voice-event";
import { User } from "./user";
import { Signal, signal } from "@angular/core";
import { WebsocketService } from "../services/websocket/websocket.service";
import { ReactiveData } from "../services/cache/base/reactive-data";

export class Channel implements ReactiveData<ChannelData> {
    private channel = signal<ChannelData>({} as ChannelData)
    private userChannelSubscribtion: StompSubscription | undefined = undefined;
    private mainChannelSubscribtion: StompSubscription | undefined = undefined;

    connected = false

    constructor(id: string, private websocketService: WebsocketService) {
        this.channel.set({ id: id } as ChannelData)
    }

    public initialise(): void {
        this.prepareChannel(this.channel().id)
    }

    public getData(): Signal<ChannelData> {
        return this.channel
    }

    public getId(): string {
        return this.channel().id
    }

    public dispose(): void {
        this.userChannelSubscribtion?.unsubscribe()
        this.userChannelSubscribtion = undefined

        this.mainChannelSubscribtion?.unsubscribe()
        this.mainChannelSubscribtion = undefined
    }

    public interact() {
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

    private joinChannel() {
        const msg: VoiceEvent = {
            type: MessageType.VOICE,
            status: Status.START,
            channelId: this.channel().id,
        };

        this.websocketService.client.publish({
            destination: "/app/channel", body: JSON.stringify(msg)
        })
    }

    private leaveChannel() {
        const msg: VoiceEvent = {
            type: MessageType.VOICE,
            status: Status.END,
            channelId: this.channel().id,
        };

        this.websocketService.client.publish({
            destination: "/app/channel", body: JSON.stringify(msg)
        })
    }

    private prepareChannel(id: string) {

        this.userChannelSubscribtion = this.subscribe(`/user/topic/channel.${id}`)
        this.mainChannelSubscribtion = this.subscribe(`/topic/channel.${id}`)

        const msg: ChannelEvent = {
            type: MessageType.CHANNEL,
            crud: Crud.READ,
            channelId: id,
            channel: undefined,
        };

        this.websocketService.client.publish({
            destination: "/app/channel", body: JSON.stringify(msg)
        })
    }

    private subscribe(path: string) {
        return this.websocketService.client.subscribe(path, (message) => {

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

    private handleChannelEvent(event: ChannelEvent) {
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

export interface ChannelData {
    id: string
    name: string
    channelType: ChannelType;
    activeUsers: User[]
}

export interface ChannelIdDTO {
    id: string
}
