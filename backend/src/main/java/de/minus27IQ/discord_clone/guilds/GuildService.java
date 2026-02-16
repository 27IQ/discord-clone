package de.minus27IQ.discord_clone.guilds;

import lombok.RequiredArgsConstructor;

import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import de.minus27IQ.discord_clone.channels.Channel;
import de.minus27IQ.discord_clone.channels.ChannelRepository;
import de.minus27IQ.discord_clone.users.User;

import static de.minus27IQ.discord_clone.channels.base.ChannelType.*;
import static de.minus27IQ.discord_clone.users.UserUtilityHelper.getUserByAuth;

@RequiredArgsConstructor
@Service
public class GuildService {

    private final GuildRepository guildRepository;
    private final ChannelRepository channelRepository;

    public Guild createGuild(String guildName) {

        return createGuild(guildName, getUserByAuth());
    }

    public Guild createGuild(String guildName, User foundingMember) {
        var guild = Guild.builder()
                .foundingMember(foundingMember)
                .members(List.of(foundingMember))
                .name(guildName)
                .build();

        guild = guildRepository.save(guild);

        var generalTextChannel = Channel.builder()
                .channelType(TEXT_CHANNEL)
                .name("General")
                // .members(List.of(foundingMember))
                .guild(guild)
                .build();

        var generalVoiceChannel = Channel.builder()
                .channelType(VOICE_CHANNEL)
                .name("General")
                // .members(List.of(foundingMember))
                .guild(guild)
                .build();

        channelRepository.save(generalTextChannel);
        channelRepository.save(generalVoiceChannel);

        // guild.setChannels(List.of(generalTextChannel, generalVoiceChannel));

        return guildRepository.save(guild);
    }

    public Guild getGuildById(UUID guildId) throws GuildNotFoundException {
        var guild = guildRepository.findById(guildId);

        if (guild.isEmpty())
            throw new GuildNotFoundException("The guild with UUID: \"" + guildId + "\" was not found.");

        return guild.get();
    }

    public void joinGuild(UUID guildId) {
        joinGuild(guildId, getUserByAuth());
    }

    public void joinGuild(UUID guildId, User user) {
        var guildOp = guildRepository.findById(guildId);

        guildOp.ifPresent((guild) -> {
            guild.getMembers().add(user);
            guildRepository.save(guild);
        });
    }

    @Transactional(readOnly = true)
    public List<Guild> getGuildsForCurrentUser() {
        User user = getUserByAuth();
        return guildRepository.findAllByMembersId(user.getId());
    }
}
