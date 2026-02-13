package de.minus27IQ.discord_clone.websocket.messages;

import java.util.UUID;

import de.minus27IQ.discord_clone.websocket.messages.base.BaseEnvelope;
import de.minus27IQ.discord_clone.websocket.messages.base.MessageType;

public record VoiceJoinEvent(MessageType type, UUID channelId, UUID user) implements BaseEnvelope {

    @Override
    public MessageType getType() {
        return type;
    }

}
