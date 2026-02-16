package de.minus27IQ.discord_clone.dev;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import de.minus27IQ.discord_clone.guilds.GuildService;
import de.minus27IQ.discord_clone.users.User;
import de.minus27IQ.discord_clone.users.UserRepository;

@Configuration
public class DevDataInitializer {

    @Bean
    CommandLineRunner initUsers(UserRepository userRepository,
            GuildService guildService, PasswordEncoder passwordEncoder) {
        return args -> {

            // TODO add detection so it only runs in dev

            if (userRepository.existsByUsername("testo")) {
                return;
            }

            var testo = User.builder()
                    .username("testo")
                    .password(passwordEncoder.encode("12345678"))
                    .build();

            var testo2 = User.builder()
                    .username("testo2")
                    .password(passwordEncoder.encode("12345678"))
                    .build();

            testo = userRepository.save(testo);
            testo2 = userRepository.save(testo2);

            System.out.println("Users created");

            var guild = guildService.createGuild("foof", testo);
            guildService.joinGuild(guild.getId(), testo2);
        };
    }
}
