package de.minus27IQ.discord_clone.users.dto;

import java.util.List;
import java.util.UUID;

import de.minus27IQ.discord_clone.users.User;

public record UserResponse(UUID id, String username) {
    public UserResponse(User user) {
        this(user.getId(), user.getUsername());
    }

    public static List<UserResponse> fromUsers(List<User> users) {
        return users.stream()
                .map(UserResponse::new)
                .toList();
    }
}