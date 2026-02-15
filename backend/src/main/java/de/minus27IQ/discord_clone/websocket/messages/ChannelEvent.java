package de.minus27IQ.discord_clone.websocket.messages;

import java.util.UUID;

import de.minus27IQ.discord_clone.channels.dto.ChannelResponse;
import de.minus27IQ.discord_clone.websocket.messages.base.BaseEnvelope;
import de.minus27IQ.discord_clone.websocket.messages.base.Crud;
import de.minus27IQ.discord_clone.websocket.messages.base.MessageType;

public record ChannelEvent(MessageType type, Crud crud, UUID channelId, ChannelResponse channel)
        implements BaseEnvelope {

    @Override
    public MessageType getType() {
        return type;
    }
}
