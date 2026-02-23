package de.minus27IQ.discord_clone.channels;

import static de.minus27IQ.discord_clone.users.UserUtilityHelper.getUserByAuth;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.stereotype.Service;

import de.minus27IQ.discord_clone.guilds.Guild;
import de.minus27IQ.discord_clone.guilds.GuildRepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ChannelService {

    private final ChannelRepository channelRepository;
    private final GuildRepository guildRepository;

    public List<Channel> getChannelsOfUser() {
        var user = getUserByAuth();
        var guilds = guildRepository.findAllByMembersId(user.getId());

        List<Channel> channels = new LinkedList<>();

        for (Guild guild : guilds) {
            channels.addAll(getChannelsOfGuild(guild.getId()));
        }

        return channels;
    }

    public List<Channel> getChannelsOfGuild(UUID guildId) {
        var guild = guildRepository.findById(guildId);

        if (guild.isEmpty())
            throw new IllegalArgumentException("The provided id does not link to a guild");

        return channelRepository.findByGuild(guild.get());
    }

    public Optional<Channel> getChannelById(UUID channelId) {
        return channelRepository.findById(channelId);
    }
}
