package de.minus27IQ.discord_clone.users;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class UserInitializer {

    @Bean
    CommandLineRunner initUsers(UserRepository userRepository,
            PasswordEncoder passwordEncoder) {
        return args -> {

            // TODO add detection so it only runs in dev

            if (userRepository.existsByUsername("testo")) {
                return;
            }

            User testo = new User();
            testo.setUsername("testo");
            testo.setPassword(passwordEncoder.encode("12345678"));

            userRepository.save(testo);

            System.out.println("Users created");
        };
    }
}
