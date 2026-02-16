import { MessageType } from "./message/base/message-type"
import { Status } from "./message/base/status"

export interface VoiceEvent {
    type: MessageType,
    status: Status,
    channelId: string
}
