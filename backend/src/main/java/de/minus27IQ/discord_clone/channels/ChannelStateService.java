package de.minus27IQ.discord_clone.channels;

import java.util.Collection;
import java.util.List;

import java.util.Set;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;

import com.github.benmanes.caffeine.cache.Cache;

import de.minus27IQ.discord_clone.users.User;
import de.minus27IQ.discord_clone.users.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ChannelStateService {

    private final Cache<UUID, Set<UUID>> cache;
    private final UserRepository userRepository;

    private Set<UUID> bucket(UUID key) {
        return cache.get(key, k -> ConcurrentHashMap.newKeySet());
    }

    public boolean add(UUID key, UUID value) {
        return bucket(key).add(value);
    }

    public int addAll(UUID key, Collection<UUID> values) {
        Set<UUID> b = bucket(key);
        int before = b.size();

        b.addAll(values);

        return b.size() - before;
    }

    public boolean removeElement(UUID key, UUID value) {
        Set<UUID> b = cache.getIfPresent(key);

        if (b == null) {
            bucket(key);
            return false;
        }

        boolean removed = b.remove(value);
        return removed;
    }

    public int removeElements(UUID key, Collection<UUID> values) {
        Set<UUID> b = cache.getIfPresent(key);

        if (b == null) {
            bucket(key);
            return 0;
        }

        int removed = 0;

        for (UUID v : values)
            if (b.remove(v))
                removed++;

        return removed;
    }

    public List<UUID> getSnapshot(UUID key) {
        Set<UUID> b = cache.getIfPresent(key);

        if (b == null)
            return List.of();

        return List.copyOf(b);
    }

    public List<User> getSnapshotAndConvert(UUID key) {
        List<UUID> userIds = getSnapshot(key);
        return userRepository.findAllById(userIds);
    }

    public boolean contains(UUID key, UUID value) {
        Set<UUID> b = cache.getIfPresent(key);
        return b != null && b.contains(value);
    }

    public void touch(UUID key) {
        bucket(key);
    }
}
