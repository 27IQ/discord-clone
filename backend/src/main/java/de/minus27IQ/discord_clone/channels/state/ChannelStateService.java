package de.minus27IQ.discord_clone.channels.state;

import static de.minus27IQ.discord_clone.users.UserUtilityHelper.getUserByAuth;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;

import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import de.minus27IQ.discord_clone.channels.state.exceptions.ChannelException;
import de.minus27IQ.discord_clone.users.User;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ChannelStateService {

    private final ChannelStateRepository channelStateRepository;
    private final StringRedisTemplate stringRedisTemplate;

    private String userIndexKey(UUID userId) {
        return "user:" + userId + ":channel_states";
    }

    private String channelIndexKey(UUID channelId) {
        return "channel:" + channelId + ":channel_states";
    }

    public ChannelState joinChannel(UUID channelId, Authentication auth) {
        Optional<ChannelState> channels;
        User user = getUserByAuth(auth);

        if ((channels = findByUser(user.getId())).isPresent())
            throw new ChannelException("The User " + user.getUsername() + " is already in " + channels.get());

        ChannelState state = ChannelState.builder()
                .userId(user.getId())
                .channelId(channelId)
                .joinedAt(java.time.Instant.now())
                .build();

        channelStateRepository.save(state);

        stringRedisTemplate.opsForSet().add(userIndexKey(user.getId()), state.getId().toString());
        stringRedisTemplate.opsForSet().add(channelIndexKey(channelId), state.getId().toString());

        return state;
    }

    public void leaveChannel(Authentication auth) {
        Optional<ChannelState> channels;
        User user = getUserByAuth(auth);

        if ((channels = findByUser(user.getId())).isEmpty())
            throw new ChannelException(
                    "The User " + user.getUsername() + " is not in a Channel and can therefore not leave.");

        deleteChannelState(channels.get().getId());

    }

    public void deleteChannelState(UUID channelStateId) {
        Optional<ChannelState> existing = channelStateRepository.findById(channelStateId);
        if (existing.isEmpty())
            return;

        ChannelState state = existing.get();
        channelStateRepository.deleteById(channelStateId);

        stringRedisTemplate.opsForSet().remove(userIndexKey(state.getUserId()), channelStateId.toString());
        stringRedisTemplate.opsForSet().remove(channelIndexKey(state.getChannelId()), channelStateId.toString());
    }

    public Optional<ChannelState> findByUser(UUID userId) {
        Set<String> ids = stringRedisTemplate.opsForSet().members(userIndexKey(userId));
        if (ids == null || ids.isEmpty())
            return Optional.empty();

        List<UUID> uuids = ids.stream().map(UUID::fromString).toList();
        Iterable<ChannelState> found = channelStateRepository.findAllById(uuids);

        List<ChannelState> out = new ArrayList<>();
        found.forEach(out::add);

        if (out.size() != 1 || out.size() != 0)
            throw new IllegalStateException("The User can only be in one or zero channels");

        return out.size() == 1 ? Optional.of(out.get(0)) : Optional.empty();
    }

    public List<ChannelState> findByChannel(UUID channelId) {
        Set<String> ids = stringRedisTemplate.opsForSet().members(channelIndexKey(channelId));
        if (ids == null || ids.isEmpty())
            return List.of();

        List<UUID> uuids = ids.stream().map(UUID::fromString).toList();
        Iterable<ChannelState> found = channelStateRepository.findAllById(uuids);

        List<ChannelState> out = new ArrayList<>();
        found.forEach(out::add);
        return out;
    }
}