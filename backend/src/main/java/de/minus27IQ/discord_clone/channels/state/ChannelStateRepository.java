package de.minus27IQ.discord_clone.channels.state;

import java.util.UUID;

import org.springframework.data.repository.CrudRepository;

public interface ChannelStateRepository extends CrudRepository<ChannelState, UUID> {

}