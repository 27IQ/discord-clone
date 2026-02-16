package de.minus27IQ.discord_clone.channels.dto;

import java.util.List;
import java.util.UUID;

import de.minus27IQ.discord_clone.channels.Channel;
import de.minus27IQ.discord_clone.channels.base.ChannelType;
import de.minus27IQ.discord_clone.users.User;
import de.minus27IQ.discord_clone.users.dto.UserResponse;

public record ChannelResponse(UUID id, String name, ChannelType channelType, List<UserResponse> activeUsers) {
    public ChannelResponse(Channel channel, List<User> activeUsers) {
        this(channel.getId(), channel.getName(), channel.getChannelType(), UserResponse.fromUsers(activeUsers));
    }
}