package de.minus27IQ.discord_clone.guilds.dto;

import java.util.List;
import java.util.UUID;

import de.minus27IQ.discord_clone.guilds.Guild;

public record GuildSummaryRespone(UUID id, String name) {
    public GuildSummaryRespone(Guild guild) {
        this(guild.getId(), guild.getName());
    }

    public static List<GuildSummaryRespone> fromGuilds(List<Guild> guilds) {
        return guilds.stream()
                .map(GuildSummaryRespone::new)
                .toList();
    }
}
