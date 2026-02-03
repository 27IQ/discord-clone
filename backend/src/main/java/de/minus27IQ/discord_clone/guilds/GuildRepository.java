package de.minus27IQ.discord_clone.guilds;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GuildRepository extends JpaRepository<Guild, UUID> {

    List<Guild> findAllByMembersId(UUID userId);
}
