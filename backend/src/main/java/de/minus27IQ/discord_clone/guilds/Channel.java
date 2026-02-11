package de.minus27IQ.discord_clone.guilds;

import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;

import java.util.List;
import java.util.UUID;

import de.minus27IQ.discord_clone.users.User;
import jakarta.persistence.Entity;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Data
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@Builder
public class Channel {

    @Id
    @GeneratedValue
    private UUID id;

    private String name;

    @Enumerated(value = EnumType.STRING)
    private ChannelType channelType;

    @OneToMany(fetch = FetchType.LAZY)
    private List<User> members;
}