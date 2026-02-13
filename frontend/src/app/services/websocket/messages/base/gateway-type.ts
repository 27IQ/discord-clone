import { VoiceJoinEvent } from "../voice-join-event";
import { VoiceLeaveEvent } from "../voice-leave-event";

export type GatewayEvent =
    | VoiceJoinEvent
    | VoiceLeaveEvent;