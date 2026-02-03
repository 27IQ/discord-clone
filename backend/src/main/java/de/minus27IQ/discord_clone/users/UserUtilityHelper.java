package de.minus27IQ.discord_clone.users;

import org.springframework.security.core.context.SecurityContextHolder;

public class UserUtilityHelper {

    public static User getUserByAuth() {
        return (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    }
}
