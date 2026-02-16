package de.minus27IQ.discord_clone.users;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import static de.minus27IQ.discord_clone.users.UserUtilityHelper.getUserByAuth;

import java.util.List;
import java.util.UUID;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public void addUser(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);
    }

    public User whoAmI() {
        return userRepository
                .findByUsername(getUserByAuth().getUsername())
                .get();
    }
}