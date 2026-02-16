package de.minus27IQ.discord_clone.channels;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import de.minus27IQ.discord_clone.guilds.Guild;

@Repository
public interface ChannelRepository extends JpaRepository<Channel, UUID> {
    List<Channel> findByGuild(Guild guild);
}
