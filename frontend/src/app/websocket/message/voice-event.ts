import { BaseEnvelope } from "./base/base-envelope";
import { Status } from "./base/status";

export interface VoiceEvent extends BaseEnvelope {
    status: Status,
    channelId: string
}
