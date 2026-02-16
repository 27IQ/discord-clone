import { Channel } from "../channel";
import { BaseEnvelope } from "./base-envelope";
import { Crud } from "./crud";
import { MessageType } from "./message-type";

export class ChannelEvent implements BaseEnvelope {

    type: MessageType
    crud: Crud
    channelId?: string
    channel?: Channel

    constructor(type: MessageType, crud: Crud, channelId?: string, channel?: Channel) {
        this.type = type
        this.crud = crud
        this.channelId = channelId
        this.channel = channel
    }
}
