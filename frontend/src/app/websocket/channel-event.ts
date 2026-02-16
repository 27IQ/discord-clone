import { Channel } from "../classes/channel"
import { Crud } from "./message/base/crud"
import { MessageType } from "./message/base/message-type"

export interface ChannelEvent {
    type: MessageType
    crud: Crud
    channelId?: string
    channel?: Channel
}
