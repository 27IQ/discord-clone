package de.minus27IQ.discord_clone.channels;

import static de.minus27IQ.discord_clone.users.UserUtilityHelper.getUserByAuth;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import de.minus27IQ.discord_clone.guilds.GuildRepository;
import de.minus27IQ.discord_clone.users.User;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ChannelService {

    private final ChannelRepository channelRepository;
    private final GuildRepository guildRepository;

    public List<Channel> getAllChannelsOfAuth(Authentication auth) {
        return getAllChannelsOfUser((User) getUserByAuth(auth));
    }

    public List<Channel> getAllChannelsCurrentUser() {
        return getAllChannelsOfUser((User) getUserByAuth());
    }

    public List<Channel> getAllChannelsOfUser(User user) {
        return channelRepository.findByMembers(user);
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
