package de.minus27IQ.discord_clone.configs;

import com.github.benmanes.caffeine.cache.Cache;
import com.github.benmanes.caffeine.cache.Caffeine;

import java.util.Set;
import java.util.UUID;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class CacheConfig {

    @Bean
    public Cache<UUID, Set<UUID>> channelCache() {
        return Caffeine.newBuilder()
                .maximumSize(10_000)
                .build();
    }
}
