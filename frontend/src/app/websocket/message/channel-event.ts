import { ChannelData } from "../../classes/channel"
import { BaseEnvelope } from "./base/base-envelope"
import { Crud } from "./base/crud"

export interface ChannelEvent extends BaseEnvelope {
    crud: Crud
    channelId?: string
    channel?: ChannelData
}

