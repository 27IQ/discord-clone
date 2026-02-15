package de.minus27IQ.discord_clone.guilds;

import java.util.List;
import java.util.UUID;

import de.minus27IQ.discord_clone.channels.Channel;
import de.minus27IQ.discord_clone.users.User;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@Builder
@Setter
@Getter
public class Guild {

    @Id
    @GeneratedValue
    private UUID id;

    private String name;

    @OneToMany(mappedBy = "guild", fetch = FetchType.LAZY)
    private List<Channel> channels;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "guild_members", joinColumns = @JoinColumn(name = "guild_id"), inverseJoinColumns = @JoinColumn(name = "user_id"))
    private List<User> members;

    @ManyToOne(fetch = FetchType.LAZY)
    private User foundingMember;
}
