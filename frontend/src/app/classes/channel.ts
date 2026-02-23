import { StompSubscription } from "@stomp/stompjs";
import { ChannelType } from "../enums/channel-type";
import { BaseEnvelope } from "../websocket/message/base/base-envelope";
import { Crud } from "../websocket/message/base/crud";
import { MessageType } from "../websocket/message/base/message-type";
import { Status } from "../websocket/message/base/status";
import { User } from "./user";
import { Signal, signal } from "@angular/core";
import { WebsocketService } from "../services/websocket/websocket.service";
import { ReactiveData } from "../services/cache/base/reactive-data";
import { VoiceEvent } from "../websocket/message/voice-event";
import { ChannelEvent } from "../websocket/message/channel-event";

export class Channel implements ReactiveData<ChannelData> {
    private data = signal<ChannelData>({} as ChannelData)
    private userChannelSubscribtion: StompSubscription | undefined = undefined;
    private mainChannelSubscribtion: StompSubscription | undefined = undefined;

    connected = false

    constructor(id: string, private websocketService: WebsocketService) {
        this.data.set({ id: id } as ChannelData)
    }

    public async initialise(): Promise<void> {
        await this.prepareChannel(this.data().id)
    }

    public getData(): Signal<ChannelData> {
        return this.data
    }

    public getId(): string {
        return this.data().id
    }

    public dispose(): void {
        this.userChannelSubscribtion?.unsubscribe()
        this.userChannelSubscribtion = undefined

        this.mainChannelSubscribtion?.unsubscribe()
        this.mainChannelSubscribtion = undefined
    }

    public interact() {
        switch (this.data().channelType) {
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
                console.error("unknown channeltype")
        }
    }

    private joinChannel() {
        const msg: VoiceEvent = {
            type: MessageType.VOICE,
            status: Status.START,
            channelId: this.data().id,
        };

        this.websocketService.getClient().then((client) => {
            client.publish({
                destination: "/app/channel", body: JSON.stringify(msg)
            })
        })
    }

    private leaveChannel() {
        const msg: VoiceEvent = {
            type: MessageType.VOICE,
            status: Status.END,
            channelId: this.data().id,
        };

        this.websocketService.getClient().then((client) => {
            client.publish({
                destination: "/app/channel", body: JSON.stringify(msg)
            })
        })
    }

    private async prepareChannel(id: string) {

        this.userChannelSubscribtion = await this.subscribe(`/user/topic/channel.${id}`)
        this.mainChannelSubscribtion = await this.subscribe(`/topic/channel.${id}`)

        const msg: ChannelEvent = {
            type: MessageType.CHANNEL,
            crud: Crud.READ,
            channelId: id,
            channel: undefined,
        };

        this.websocketService.getClient().then((client) => {
            client.publish({
                destination: "/app/channel", body: JSON.stringify(msg)
            })
        })
    }

    private async subscribe(path: string): Promise<StompSubscription> {

        const client = await this.websocketService.getClient()

        return client.subscribe(path, (message) => {

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
                    console.error(`messagetype could not be matched: ${message.body}`)
            }
        })
    }

    private handleChannelEvent(event: ChannelEvent) {
        switch (event.crud) {
            case Crud.UPDATE:
                if (!event.channel)
                    return
                this.data.set(event.channel)
                console.log(this.data())
                break

            case Crud.DELETE:
                //TODO implement
                console.warn("not implemented")
                break;

            default:
                console.error(`ChannelEventType could not be matched: ${event}`)
        }
    }
}

export interface ChannelIdDTO {
    id: string
}

export interface ChannelData extends ChannelIdDTO {
    name: string
    channelType: ChannelType;
    activeUsers: User[]
}
