package de.minus27IQ.discord_clone.guilds;

import lombok.RequiredArgsConstructor;

import static de.minus27IQ.discord_clone.guilds.ChannelType.*;

import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import de.minus27IQ.discord_clone.users.User;

import static de.minus27IQ.discord_clone.users.UserUtilityHelper.getUserByAuth;

@RequiredArgsConstructor
@Service
public class GuildService {

    private final GuildRepository guildRepository;
    // private final ChannelRepository channelRepository;

    public UUID createGuild(String guildName) {

        var generalTextChannel = Channel.builder()
                .channelType(TEXT_CHANNEL)
                .name("General")
                .build();

        var generalVoiceChannel = Channel.builder()
                .channelType(VOICE_CHANNEL)
                .name("General")
                .build();

        var foundingMember = getUserByAuth();

        var guild = Guild.builder()
                .foundingMember(foundingMember)
                .members(List.of(foundingMember))
                .channels(List.of(generalTextChannel, generalVoiceChannel))
                .name(guildName)
                .build();

        return guildRepository.save(guild).getId();
    }

    public Guild getGuildById(UUID guildId) throws GuildNotFoundException {
        var guild = guildRepository.findById(guildId);

        if (guild.isEmpty())
            throw new GuildNotFoundException("The guild with UUID: \"" + guildId + "\" was not found.");

        return guild.get();
    }

    @Transactional(readOnly = true)
    public List<Guild> getGuildsForCurrentUser() {
        User user = getUserByAuth();
        return guildRepository.findAllByMembersId(user.getId());
    }
}
