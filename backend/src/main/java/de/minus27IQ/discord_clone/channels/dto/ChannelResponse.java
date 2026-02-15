package de.minus27IQ.discord_clone.channels.dto;

import java.util.List;
import java.util.UUID;

import de.minus27IQ.discord_clone.channels.Channel;
import de.minus27IQ.discord_clone.channels.ChannelType;
import de.minus27IQ.discord_clone.users.dto.UserResponse;

public record ChannelResponse(UUID id, String name, ChannelType channelType, List<UserResponse> members) {
    public ChannelResponse(Channel channel) {
        this(channel.getId(), channel.getName(), channel.getChannelType(),
                UserResponse.fromUsers(channel.getMembers()));
    }

    public static List<ChannelResponse> fromChannels(List<Channel> channels) {
        return channels.stream()
                .map(ChannelResponse::new)
                .toList();
    }
}