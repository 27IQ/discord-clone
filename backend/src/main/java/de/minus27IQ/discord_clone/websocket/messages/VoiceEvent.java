package de.minus27IQ.discord_clone.websocket.messages;

import java.util.UUID;

import de.minus27IQ.discord_clone.websocket.messages.base.BaseEnvelope;
import de.minus27IQ.discord_clone.websocket.messages.base.MessageType;
import de.minus27IQ.discord_clone.websocket.messages.base.Status;

public record VoiceEvent(MessageType type, Status status, UUID channelId) implements BaseEnvelope {

    @Override
    public MessageType getType() {
        return type;
    }
}
