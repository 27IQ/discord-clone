package de.minus27IQ.discord_clone.guilds;

import java.util.List;
import java.util.UUID;

import de.minus27IQ.discord_clone.users.User;
import jakarta.persistence.CascadeType;
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
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Data
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@Builder
public class Guild {

    @Id
    @GeneratedValue
    private UUID id;

    private String name;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Channel> channels;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "guild_members", joinColumns = @JoinColumn(name = "guild_id"), inverseJoinColumns = @JoinColumn(name = "user_id"))
    private List<User> members;

    @ManyToOne(fetch = FetchType.LAZY)
    private User foundingMember;
}
