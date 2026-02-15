package de.minus27IQ.discord_clone.guilds.dto;

import java.util.List;
import java.util.UUID;

import de.minus27IQ.discord_clone.channels.dto.ChannelIdResponse;
import de.minus27IQ.discord_clone.guilds.Guild;

public record GuildResponse(UUID id, String name, List<ChannelIdResponse> channels) {
    public GuildResponse(Guild guild) {
        this(guild.getId(), guild.getName(), ChannelIdResponse.fromChannels(guild.getChannels()));
    }

    public static List<GuildResponse> fromGuilds(List<Guild> guilds) {
        return guilds.stream()
                .map(GuildResponse::new)
                .toList();
    }
}
