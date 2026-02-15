package de.minus27IQ.discord_clone.channels.state;

import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;

import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.Instant;
import java.util.UUID;

@RedisHash("channel_state")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@Builder
@Setter
@Getter
public class ChannelState {
    @Id
    @GeneratedValue
    private UUID id;

    @Column(unique = true)
    private UUID userId;
    private UUID channelId;

    private Instant joinedAt;
}
