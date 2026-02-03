package de.minus27IQ.discord_clone.guilds.dto;

import java.util.List;
import java.util.UUID;

import de.minus27IQ.discord_clone.guilds.Channel;
import de.minus27IQ.discord_clone.guilds.Guild;
import de.minus27IQ.discord_clone.users.dto.UserResponse;

public record GuildRespone(UUID id, String name, List<Channel> channels, List<UserResponse> members,
        UserResponse foundingMember) {
    public GuildRespone(Guild guild) {
        this(guild.getId(), guild.getName(), guild.getChannels(), UserResponse.fromUsers(guild.getMembers()),
                new UserResponse(guild.getFoundingMember()));
    }

    public static List<GuildRespone> fromGuilds(List<Guild> guilds) {
        return guilds.stream()
                .map(GuildRespone::new)
                .toList();
    }
}
