package de.minus27IQ.discord_clone.channels.dto;

import java.util.List;
import java.util.UUID;

import de.minus27IQ.discord_clone.channels.Channel;

public record ChannelIdResponse(UUID id) {
    public ChannelIdResponse(Channel channel) {
        this(channel.getId());
    }

    public static List<ChannelIdResponse> fromChannels(List<Channel> channels) {
        return channels.stream()
                .map(ChannelIdResponse::new)
                .toList();
    }
}
