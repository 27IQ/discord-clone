package de.minus27IQ.discord_clone.websocket.messages;

import java.util.UUID;

import de.minus27IQ.discord_clone.guilds.dto.GuildResponse;
import de.minus27IQ.discord_clone.websocket.messages.base.BaseEnvelope;
import de.minus27IQ.discord_clone.websocket.messages.base.Crud;
import de.minus27IQ.discord_clone.websocket.messages.base.MessageType;

public record GuildEvent(MessageType type, Crud crud, UUID guildId, GuildResponse guild)
        implements BaseEnvelope {

    @Override
    public MessageType getType() {
        return type;
    }
}
