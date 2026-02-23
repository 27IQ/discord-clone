import { signal, Signal } from "@angular/core"
import { ReactiveData } from "../services/cache/base/reactive-data"
import { User } from "./user"
import { StompSubscription } from "@stomp/stompjs"
import { GuildEvent } from "../websocket/message/guild-event"
import { MessageType } from "../websocket/message/base/message-type"
import { Crud } from "../websocket/message/base/crud"
import { WsDestinations } from "../websocket/message/ws-destinations"
import { WebsocketService } from "../services/websocket/websocket.service"
import { BaseEnvelope } from "../websocket/message/base/base-envelope"
import { ChannelData } from "./channel"


export class Guild implements ReactiveData<GuildData> {
    data = signal<GuildData>({} as GuildData)
    private userGuildSubscribtion: StompSubscription | undefined = undefined;
    private mainGuildSubscribtion: StompSubscription | undefined = undefined;

    constructor(id: string, private websocketService: WebsocketService) {
        this.data.set({ id: id } as GuildData)
    }

    getData(): Signal<GuildData> {
        return this.data
    }

    getId(): string {
        return this.data().id
    }

    async initialise(): Promise<void> {
        await this.prepareGuild(this.data().id)
    }

    public dispose(): void {
        this.userGuildSubscribtion?.unsubscribe()
        this.userGuildSubscribtion = undefined

        this.mainGuildSubscribtion?.unsubscribe()
        this.mainGuildSubscribtion = undefined
    }

    private async prepareGuild(id: string) {

        this.userGuildSubscribtion = await this.subscribe(`${WsDestinations.TOPIC_USER_GUILD}.${id}`)
        this.mainGuildSubscribtion = await this.subscribe(`${WsDestinations.TOPIC_GUILD}.${id}`)

        const msg: GuildEvent = {
            type: MessageType.GUILD,
            crud: Crud.READ,
            guildId: id,
            guild: undefined,
        };

        console.log(msg)

        this.websocketService.getClient().then((client) => {
            client.publish({
                destination: `${WsDestinations.APP_GUILD}`, body: JSON.stringify(msg)
            })
        })
    }

    private async subscribe(path: string): Promise<StompSubscription> {
        return this.websocketService.getClient().then((client) => {
            return client.subscribe(path, (message) => {

                const envelope = JSON.parse(message.body) as BaseEnvelope;
                switch (envelope.type) {
                    case MessageType.GUILD:
                        this.handleGuildEvent(envelope as GuildEvent);
                        break;

                    default:
                        console.error(`messagetype could not be matched: ${message.body}`)
                }
            });
        })
    }

    private handleGuildEvent(event: GuildEvent) {
        switch (event.crud) {
            case Crud.UPDATE:
                if (!event.guild)
                    return
                this.data.set(event.guild)
                console.log(this.data())
                break

            case Crud.DELETE:
                //TODO implement
                console.warn("not implemented")
                break;
            default:
                console.error(`guildevent could not be matched: ${event}`)
        }
    }
}

export interface GuildSummeryEntry {
    id: string
    name: string
}

export interface GuildData extends GuildSummeryEntry {
    channels: ChannelData[]
    members: User[]
}